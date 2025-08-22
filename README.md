# GitLab Webhook Bot

A GitLab webhook listener in Node.js + TypeScript that routes MR review requests and comment alerts to Slack (and optionally Pushbullet), letting you stay on top of your code reviews with zero friction.

## Features

- **GitLab Webhook Integration**: Listens for merge request and comment events
- **Slack Notifications**: Sends alerts to Slack channels
- **Pushbullet Support**: Optional mobile notifications via Pushbullet
- **TypeScript**: Full type safety and modern JavaScript features
- **Automated Testing**: GitHub Actions runs tests on every commit
- **Automated Deployment**: Vercel deployment via GitHub Actions when tests pass

## Testing

This project includes comprehensive test coverage with **100% code coverage** across all handlers, utilities, and endpoints.

### Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode (great for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

- **Unit Tests**: Individual function testing for handlers and utilities
- **Integration Tests**: End-to-end webhook endpoint testing
- **Mock Data**: Realistic GitLab webhook payloads for testing
- **Error Scenarios**: Comprehensive error handling and edge case testing

### Test Structure

```
tests/
├── handlers/          # Handler function tests
├── utils/            # Utility function tests  
├── mocks/            # Mock GitLab webhook data
├── app.test.ts       # Integration tests
└── setup.ts          # Test configuration
```

### Running Tests

```bash
# Run specific test files
npm test tests/handlers/mergeRequest.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="merge request"

# Generate coverage report
npm run test:coverage
```

For detailed testing information, see [tests/README.md](tests/README.md).

A GitLab webhook listener built with **Node.js** and **TypeScript** that forwards Merge Request review requests and comment alerts to Slack, so you can stay on top of your code reviews with zero friction.

---

## Features

* 🔍 **Review Requests**: Notifies you in Slack when you're assigned to review a Merge Request.
* 💬 **Comment Alerts**: Sends Slack notifications for replies or mentions on MR comments you've made.
* 📲 **Slack Integration**: Real-time notifications in your Slack workspace.
* ⚙️ **Configurable** via environment variables.
* 🚀 **Easy Deployment**: Deployed on Vercel with automatic scaling.

---

## Prerequisites

* [Node.js](https://nodejs.org) v14 or higher
* npm (or yarn)
* A GitLab project with webhook permissions
* A Slack workspace with rights to create an Incoming Webhook
* A Vercel account for deployment

---

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/gitlab-webhook-bot.git
cd gitlab-webhook-bot
npm install
```

---

## Configuration

1. Create a `.env` file in the project root:

   ```dotenv
   PORT=3000
   GITLAB_USER_ID=<Your GitLab numeric user ID>
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXX
   ```

2. Ensure `.env` is in your `.gitignore`.

---

## Development

* **Start with hot reload**:

  ```bash
  npm run dev
  ```

* **Test locally**:

  ```bash
  curl -X POST http://localhost:3000/webhook \
    -H "Content-Type: application/json" \
    -d '{"object_kind": "merge_request", "object_attributes": {"title": "Test MR", "url": "https://gitlab.com/test/-/merge_requests/123", "assignee_ids": [123]}}'
  ```

* **Run tests**:

  ```bash
  # Run all tests
  npm test
  
  # Run tests in watch mode during development
  npm run test:watch
  
  # Check test coverage
  npm run test:coverage
  ```

---

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

3. Add environment variables:
   ```bash
   vercel env add SLACK_WEBHOOK_URL
   vercel env add GITLAB_USER_ID
   ```

4. Redeploy after adding environment variables:
   ```bash
   vercel --prod
   ```

5. Your webhook will be available at:
   ```
   https://gitlab-webhook-bot.vercel.app/webhook
   ```

---

## GitLab Webhook Setup

1. Go to your GitLab project → **Settings** → **Webhooks**
2. Add new webhook with these settings:
   - **URL**: `https://gitlab-webhook-bot.vercel.app/webhook`
   - **Name**: `GitLab Webhook Bot - Notifications`
   - **Description**: `Automatically sends Slack notifications for merge requests, comments, and other GitLab events. Monitors project activity and keeps the team informed in real-time.`
   - **Trigger**: Select the events you want (Merge Request events, Note events, etc.)
   - **SSL verification**: Enable (recommended)

---

## Testing

### Test Slack Notifications

Send a test webhook payload to verify Slack integration:

```bash
curl -X POST https://gitlab-webhook-bot.vercel.app/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object_kind": "merge_request",
    "object_attributes": {
      "title": "Test MR for Slack",
      "url": "https://gitlab.com/test/project/-/merge_requests/123",
      "assignee_ids": [123]
    }
  }'
```

### Monitor Logs

View deployment logs:
```bash
vercel logs https://gitlab-webhook-bot.vercel.app
```

---

## Project Structure

```
gitlab-webhook-bot/
├── api/                    # Vercel serverless functions
│   └── webhook.ts         # Main webhook handler
├── src/
│   ├── app.ts             # Express app configuration
│   ├── handlers/          # Event handlers
│   │   ├── mergeRequest.ts # Merge request notifications
│   │   └── notes.ts       # Comment/note notifications
│   └── utils/             # Utility functions
│       └── notifySlack.ts # Slack notification logic
├── tests/                  # Test suite
│   ├── handlers/          # Handler function tests
│   ├── utils/             # Utility function tests
│   ├── mocks/             # Mock GitLab webhook data
│   └── app.test.ts        # Integration tests
├── vercel.json            # Vercel configuration
├── jest.config.js         # Jest configuration
└── package.json
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SLACK_WEBHOOK_URL` | Your Slack incoming webhook URL | Yes |
| `GITLAB_USER_ID` | Your GitLab numeric user ID | Yes |
| `PORT` | Local development port (default: 3000) | No |

---

## Contributing

1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```

2. Commit your changes:
   ```bash
   git commit -m "Add feature or fix"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/YourFeatureName
   ```

4. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

```
