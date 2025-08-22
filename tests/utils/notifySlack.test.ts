import axios from 'axios';
import { notifySlack } from '../../src/utils/notifySlack';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('notifySlack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
  });

  it('should send Slack notification successfully', async () => {
    const message = 'Test notification';
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    await notifySlack(message);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://hooks.slack.com/test',
      { text: 'Test notification' }
    );
  });

  it('should handle Slack API error', async () => {
    const message = 'Test notification';
    const error = new Error('Slack API error');
    mockedAxios.post.mockRejectedValueOnce(error);

    await expect(notifySlack(message)).rejects.toThrow('Slack API error');
  });

  it('should handle missing Slack webhook URL', async () => {
    delete process.env.SLACK_WEBHOOK_URL;
    const message = 'Test notification';

    // Mock axios to throw when URL is undefined
    mockedAxios.post.mockRejectedValueOnce(new Error('URL is undefined'));

    await expect(notifySlack(message)).rejects.toThrow('URL is undefined');
  });
});
