// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import { handleMergeRequest } from './handlers/mergeRequest';
import { handleNoteEvent } from './handlers/notes';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const event = req.header('x-gitlab-event');
  const objectKind = req.body.object_kind;
  console.log("request body:", req.body);
  console.log("x-gitlab-event header:", event);
  console.log("object_kind from body:", objectKind);
  
  try {
    // Check header first, then fall back to object_kind for testing
    if (event === 'Merge Request Hook' || objectKind === 'merge_request') {
      console.log('Handling merge request event');
      await handleMergeRequest(req.body);
    } else if (event === 'Note Hook' || objectKind === 'note') {
      console.log('Handling note event');
      await handleNoteEvent(req.body);
    } else {
      console.log('Unknown event type:', event || objectKind);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default app;