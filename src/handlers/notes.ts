import axios from 'axios';

export async function handleNoteEvent(payload: any) {
  const note = payload.object_attributes;
  const isOnMR = note.noteable_type === 'MergeRequest';
  const isReply = note.in_reply_to_id !== null;
  const mentionsYou = note.note.includes(`<@${process.env.GITLAB_USER_ID}>`);
  const url = note.url;

  if (isOnMR && (isReply || mentionsYou)) {
    const text = `💬 *Comment Alert*\n>${note.note}\n${url}`;
    await axios.post(process.env.SLACK_WEBHOOK_URL!, { text });
  }
}