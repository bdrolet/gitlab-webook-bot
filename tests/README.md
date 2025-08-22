# Testing Guide

This directory contains comprehensive tests for the GitLab Webhook Bot.

## Test Structure

```
tests/
├── setup.ts                 # Global test configuration
├── app.test.ts             # Integration tests for webhook endpoint
├── handlers/               # Unit tests for handler functions
│   ├── mergeRequest.test.ts
│   └── notes.test.ts
├── utils/                  # Unit tests for utility functions
│   ├── notifySlack.test.ts
│   └── notifyPushbullet.test.ts
└── mocks/                  # Mock data for testing
    └── gitlabWebhooks.ts
```

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

## Test Coverage

### Unit Tests
- **Handler Functions**: Test individual business logic for merge requests and notes
- **Utility Functions**: Test Slack and Pushbullet notification functions
- **Error Handling**: Test various error scenarios and edge cases

### Integration Tests
- **Webhook Endpoint**: Test the complete webhook flow with different event types
- **Request/Response**: Test HTTP status codes and response handling
- **Event Routing**: Test proper routing of different GitLab event types

### Mock Data
- **GitLab Webhooks**: Realistic payloads for different event types
- **External APIs**: Mocked responses for Slack and Pushbullet APIs

## Test Scenarios

### Merge Request Handler
- ✅ Sends notification for assigned merge requests
- ✅ Handles merge requests with no assignees
- ✅ Handles Slack API failures gracefully
- ✅ Handles missing environment variables

### Notes Handler
- ✅ Sends notification for mentions on merge requests
- ✅ Sends notification for replies on merge requests
- ✅ Ignores notes not on merge requests
- ✅ Ignores notes without mentions or replies
- ✅ Handles Slack API failures gracefully

### Webhook Endpoint
- ✅ Routes merge request events correctly
- ✅ Routes note events correctly
- ✅ Handles unknown event types gracefully
- ✅ Returns proper HTTP status codes
- ✅ Handles handler errors gracefully

### Utility Functions
- ✅ Slack notifications work correctly
- ✅ Pushbullet notifications work correctly
- ✅ Error handling for missing credentials
- ✅ Error handling for API failures

## Environment Variables for Testing

Create a `.env.test` file with test values:
```env
GITLAB_USER_ID=123
SLACK_WEBHOOK_URL=https://hooks.slack.com/test
PUSHBULLET_TOKEN=test-token
```

## Adding New Tests

1. **Unit Tests**: Create test files in the appropriate subdirectory
2. **Integration Tests**: Add to `app.test.ts` for webhook endpoint testing
3. **Mock Data**: Add new mock payloads to `mocks/gitlabWebhooks.ts`
4. **Test Coverage**: Ensure new functionality has corresponding tests

## Best Practices

- Use descriptive test names that explain the scenario
- Test both success and failure cases
- Mock external dependencies to avoid real API calls
- Use realistic test data that matches actual GitLab webhooks
- Test edge cases and error conditions
- Maintain high test coverage for critical business logic
