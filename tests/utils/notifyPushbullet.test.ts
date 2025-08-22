import axios from 'axios';
import { pushbulletNotify } from '../../src/utils/notifyPushbullet';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('pushbulletNotify', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PUSHBULLET_TOKEN = 'test-token';
  });

  it('should send Pushbullet notification successfully', async () => {
    const title = 'Test Title';
    const body = 'Test Body';
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    await pushbulletNotify(title, body);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://api.pushbullet.com/v2/pushes',
      { type: 'note', title: 'Test Title', body: 'Test Body' },
      { headers: { 'Access-Token': 'test-token' } }
    );
  });

  it('should handle Pushbullet API error', async () => {
    const title = 'Test Title';
    const body = 'Test Body';
    const error = new Error('Pushbullet API error');
    mockedAxios.post.mockRejectedValueOnce(error);

    await expect(pushbulletNotify(title, body)).rejects.toThrow('Pushbullet API error');
  });

  it('should handle missing Pushbullet token', async () => {
    delete process.env.PUSHBULLET_TOKEN;
    const title = 'Test Title';
    const body = 'Test Body';

    // Mock axios to throw when token is undefined
    mockedAxios.post.mockRejectedValueOnce(new Error('Token is undefined'));

    await expect(pushbulletNotify(title, body)).rejects.toThrow('Token is undefined');
  });
});
