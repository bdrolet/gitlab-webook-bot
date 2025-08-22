import axios from 'axios';
import { handleNoteEvent } from '../../src/handlers/notes';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('handleNoteEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GITLAB_USER_ID = '123';
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
  });

  it('should send Slack notification for note on merge request with mention', async () => {
    const mockPayload = {
      object_attributes: {
        note: 'Hey <@123>, please review this',
        noteable_type: 'MergeRequest',
        in_reply_to_id: null,
        url: 'https://gitlab.com/test/mr/1'
      }
    };

    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    await handleNoteEvent(mockPayload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://hooks.slack.com/test',
      { text: '💬 *Comment Alert*\n>Hey <@123>, please review this\nhttps://gitlab.com/test/mr/1' }
    );
  });

  it('should send Slack notification for reply on merge request', async () => {
    const mockPayload = {
      object_attributes: {
        note: 'This is a reply',
        noteable_type: 'MergeRequest',
        in_reply_to_id: 456,
        url: 'https://gitlab.com/test/mr/1'
      }
    };

    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    await handleNoteEvent(mockPayload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://hooks.slack.com/test',
      { text: '💬 *Comment Alert*\n>This is a reply\nhttps://gitlab.com/test/mr/1' }
    );
  });

  it('should not send notification for note not on merge request', async () => {
    const mockPayload = {
      object_attributes: {
        note: 'This is a commit comment',
        noteable_type: 'Commit',
        in_reply_to_id: null,
        url: 'https://gitlab.com/test/commit/1'
      }
    };

    await handleNoteEvent(mockPayload);

    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('should not send notification for note without mention or reply', async () => {
    const mockPayload = {
      object_attributes: {
        note: 'This is a regular comment',
        noteable_type: 'MergeRequest',
        in_reply_to_id: null,
        url: 'https://gitlab.com/test/mr/1'
      }
    };

    await handleNoteEvent(mockPayload);

    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('should handle Slack notification failure gracefully', async () => {
    const mockPayload = {
      object_attributes: {
        note: 'Hey <@123>, please review this',
        noteable_type: 'MergeRequest',
        in_reply_to_id: null,
        url: 'https://gitlab.com/test/mr/1'
      }
    };

    const error = new Error('Slack API error');
    mockedAxios.post.mockRejectedValueOnce(error);

    // Should throw error since there's no try-catch in the function
    await expect(handleNoteEvent(mockPayload)).rejects.toThrow('Slack API error');
  });
});
