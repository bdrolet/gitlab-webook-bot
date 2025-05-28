import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { handleMergeRequest } from './handlers/mergeRequest';
import { handleNoteEvent } from './handlers/notes';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/webhook', async (req: Request, res: Response) => {
  const gitlabEvent = req.header('x-gitlab-event') ?? '';
  console.log(`Received GitLab event: ${gitlabEvent}`);
  try {
    switch (gitlabEvent) {
      case 'Merge Request Hook':
        await handleMergeRequest(req.body);
        break;
      case 'Note Hook':
        await handleNoteEvent(req.body);
        break;
      default:
        console.log(`Unhandled event: ${gitlabEvent}`);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook listener running on port ${port}`);
});