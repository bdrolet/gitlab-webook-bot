import request from 'supertest';
import app from '../src/app';

// Mock the handlers
jest.mock('../src/handlers/mergeRequest');
jest.mock('../src/handlers/notes');

const { handleMergeRequest } = require('../src/handlers/mergeRequest');
const { handleNoteEvent } = require('../src/handlers/notes');

describe('Webhook Endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    handleMergeRequest.mockResolvedValue(undefined);
    handleNoteEvent.mockResolvedValue(undefined);
  });

  describe('POST /webhook', () => {
    it('should handle merge request webhook with header', async () => {
      const payload = {
        object_kind: 'merge_request',
        object_attributes: {
          title: 'Test MR',
          url: 'https://gitlab.com/test/mr/1'
        }
      };

      const response = await request(app)
        .post('/webhook')
        .set('x-gitlab-event', 'Merge Request Hook')
        .send(payload);

      expect(response.status).toBe(200);
      expect(handleMergeRequest).toHaveBeenCalledWith(payload);
      expect(handleNoteEvent).not.toHaveBeenCalled();
    });

    it('should handle merge request webhook with object_kind fallback', async () => {
      const payload = {
        object_kind: 'merge_request',
        object_attributes: {
          title: 'Test MR',
          url: 'https://gitlab.com/test/mr/1'
        }
      };

      const response = await request(app)
        .post('/webhook')
        .send(payload);

      expect(response.status).toBe(200);
      expect(handleMergeRequest).toHaveBeenCalledWith(payload);
    });

    it('should handle note webhook with header', async () => {
      const payload = {
        object_kind: 'note',
        object_attributes: {
          note: 'Test comment',
          noteable_type: 'MergeRequest'
        }
      };

      const response = await request(app)
        .post('/webhook')
        .set('x-gitlab-event', 'Note Hook')
        .send(payload);

      expect(response.status).toBe(200);
      expect(handleNoteEvent).toHaveBeenCalledWith(payload);
      expect(handleMergeRequest).not.toHaveBeenCalled();
    });

    it('should handle note webhook with object_kind fallback', async () => {
      const payload = {
        object_kind: 'note',
        object_attributes: {
          note: 'Test comment',
          noteable_type: 'MergeRequest'
        }
      };

      const response = await request(app)
        .post('/webhook')
        .send(payload);

      expect(response.status).toBe(200);
      expect(handleNoteEvent).toHaveBeenCalledWith(payload);
    });

    it('should handle unknown event type', async () => {
      const payload = {
        object_kind: 'push',
        object_attributes: {}
      };

      const response = await request(app)
        .post('/webhook')
        .send(payload);

      expect(response.status).toBe(200);
      expect(handleMergeRequest).not.toHaveBeenCalled();
      expect(handleNoteEvent).not.toHaveBeenCalled();
    });

    it('should handle handler errors gracefully', async () => {
      const payload = {
        object_kind: 'merge_request',
        object_attributes: {}
      };

      handleMergeRequest.mockRejectedValue(new Error('Handler error'));

      const response = await request(app)
        .post('/webhook')
        .send(payload);

      expect(response.status).toBe(500);
    });

    it('should handle malformed payload', async () => {
      const payload = {};

      const response = await request(app)
        .post('/webhook')
        .send(payload);

      expect(response.status).toBe(200);
    });
  });
});
