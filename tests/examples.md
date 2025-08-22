# Test Examples

This file contains examples of how to write different types of tests for the GitLab Webhook Bot.

## Unit Test Example

```typescript
// tests/handlers/example.test.ts
import { exampleFunction } from '../../src/handlers/example';

describe('exampleFunction', () => {
  beforeEach(() => {
    // Setup before each test
    jest.clearAllMocks();
  });

  it('should handle success case', async () => {
    // Arrange
    const input = 'test input';
    const expectedOutput = 'expected result';

    // Act
    const result = await exampleFunction(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  it('should handle error case', async () => {
    // Arrange
    const input = 'invalid input';

    // Act & Assert
    await expect(exampleFunction(input)).rejects.toThrow('Invalid input');
  });
});
```

## Integration Test Example

```typescript
// tests/app.test.ts
import request from 'supertest';
import app from '../src/app';

describe('API Endpoint', () => {
  it('should handle valid request', async () => {
    const response = await request(app)
      .post('/endpoint')
      .send({ data: 'test' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});
```

## Mock Example

```typescript
// Mock external dependencies
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock environment variables
beforeEach(() => {
  process.env.API_KEY = 'test-key';
});

afterEach(() => {
  delete process.env.API_KEY;
});

// Mock API responses
mockedAxios.post.mockResolvedValueOnce({ status: 200, data: 'success' });
mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));
```

## Test Data Example

```typescript
// tests/mocks/exampleData.ts
export const mockUser = {
  id: 123,
  name: 'Test User',
  email: 'test@example.com'
};

export const mockWebhookPayload = {
  event_type: 'user.created',
  user: mockUser,
  timestamp: '2024-01-01T00:00:00Z'
};
```

## Best Practices

1. **Test Structure**: Use the AAA pattern (Arrange, Act, Assert)
2. **Descriptive Names**: Test names should clearly describe the scenario
3. **Isolation**: Each test should be independent and not rely on other tests
4. **Mocking**: Mock external dependencies to avoid real API calls
5. **Coverage**: Aim for high test coverage, especially for business logic
6. **Edge Cases**: Test both success and failure scenarios
7. **Cleanup**: Use beforeEach/afterEach to reset state between tests
