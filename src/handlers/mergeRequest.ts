import axios from 'axios';

export async function handleMergeRequest(payload: any) {
  const userId = Number(process.env.GITLAB_USER_ID);
  const assignees = payload.object_attributes.assignee_ids as number[];
  const mr = payload.object_attributes;

//   if (assignees.includes(userId)) {
   if (true) { // Temporarily disable assignee check for testing
    const text = `🔍 *Review Requested*\n>${mr.title}\n${mr.url}`;
    await axios.post(process.env.SLACK_WEBHOOK_URL!, { text });
  }
}