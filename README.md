# GitLab Webhook Notifier

A GitLab webhook listener built with **Node.js** and **TypeScript** that forwards Merge Request review requests and comment alerts to Slack (and optionally Pushbullet for Android), so you can stay on top of your code reviews with zero friction.

---

## Features

* 🔍 **Review Requests**: Notifies you in Slack when you’re assigned to review a Merge Request.
* 💬 **Comment Alerts**: Sends Slack notifications for replies or mentions on MR comments you’ve made.
* 📲 **Optional Pushbullet**: Get notifications on your Pixel 8 (or any device running Pushbullet).
* ⚙️ **Configurable** via environment variables.
* 🚀 **Easy Deployment**: Supports Vercel, Render, Heroku, Google Cloud Run, and more.

---

## Prerequisites

* [Node.js](https://nodejs.org) v14 or higher
* npm (or yarn)
* A GitLab project with webhook permissions
* A Slack workspace with rights to create an Incoming Webhook
* (Optional) A [Pushbullet](https://www.pushbullet.com) account and Access Token

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
   # Optional Pushbullet settings:
   PUSHBULLET_TOKEN=<Your Pushbullet Access Token>
   ```

2. Ensure `.env` is in your `.gitignore`.

---

## Development

* **Start with hot reload**:

  ```bash
  npm run dev
  ```

* **Expose locally with ngrok** (optional):

  ```bash
  ngrok http 3000
  ```

* **Configure GitLab Webhook**:

  * **URL**: `https://<your-tunnel>.ngrok.io/webhook`
  * **Triggers**: Merge Request events, Note events

---

## Deployment

### Vercel

1. Push your project to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Set environment variables in the Vercel dashboard.
4. Deploy; update your GitLab webhook URL to `https://<your-vercel-url>/api/webhook`.

### Render

1. Create a new **Web Service** in [Render](https://render.com).
2. Connect to your GitHub repo.
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `node dist/index.js`
5. Add your environment variables.
6. Update the GitLab webhook URL to the Render service endpoint.

*(Other platforms follow similar steps—just configure build/start commands and env vars.)*

---

## Contributing

1. Fork the repository and create your feature branch:

   ```bash
   ```

git checkout -b feature/YourFeatureName

````
2. Commit your changes:
   ```bash
git commit -m "Add feature or fix"
````

3. Push to your fork:

   ```bash
   ```

git push origin feature/YourFeatureName

```
4. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

```
