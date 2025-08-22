// tests/setup.ts
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set default test environment variables if not present
process.env.GITLAB_USER_ID = process.env.GITLAB_USER_ID || '123';
process.env.SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/test';
process.env.PUSHBULLET_TOKEN = process.env.PUSHBULLET_TOKEN || 'test-token';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
