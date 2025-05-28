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
  try {
    if (event === 'Merge Request Hook') {
      await handleMergeRequest(req.body);
    } else if (event === 'Note Hook') {
      await handleNoteEvent(req.body);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default app;