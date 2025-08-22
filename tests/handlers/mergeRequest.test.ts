import axios from 'axios';
import { handleMergeRequest } from '../../src/handlers/mergeRequest';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('handleMergeRequest', () => {
  const mockPayload = {
    object_attributes: {
      title: 'Test MR',
      url: 'https://gitlab.com/test/mr/1',
      assignee_ids: [123]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GITLAB_USER_ID = '123';
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
  });

  it('should send Slack notification for assigned merge request', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    await handleMergeRequest(mockPayload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://hooks.slack.com/test',
      { text: '🔍 *Review Requested*\n>Test MR\nhttps://gitlab.com/test/mr/1' }
    );
  });

  it('should handle merge request with no assignees', async () => {
    const payloadWithoutAssignees = {
      object_attributes: {
        title: 'Test MR',
        url: 'https://gitlab.com/test/mr/1',
        assignee_ids: []
      }
    };

    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    await handleMergeRequest(payloadWithoutAssignees);

    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it('should handle Slack notification failure', async () => {
    const error = new Error('Slack API error');
    mockedAxios.post.mockRejectedValueOnce(error);

    await expect(handleMergeRequest(mockPayload)).rejects.toThrow('Slack API error');
  });

  it('should handle missing Slack webhook URL', async () => {
    delete process.env.SLACK_WEBHOOK_URL;

    // Mock axios to throw when URL is undefined
    mockedAxios.post.mockRejectedValueOnce(new Error('URL is undefined'));

    await expect(handleMergeRequest(mockPayload)).rejects.toThrow('URL is undefined');
  });

  it('should handle missing GitLab user ID', async () => {
    delete process.env.GITLAB_USER_ID;

    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    await handleMergeRequest(mockPayload);

    expect(mockedAxios.post).toHaveBeenCalled();
  });
});
