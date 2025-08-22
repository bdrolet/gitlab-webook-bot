import axios from 'axios';

export async function handleMergeRequest(payload: any) {
  try {
    const userId = Number(process.env.GITLAB_USER_ID);
    const assignees = payload.object_attributes.assignee_ids as number[];
    const mr = payload.object_attributes;

    console.log('Processing merge request:', mr.title);
    console.log('SLACK_WEBHOOK_URL:', process.env.SLACK_WEBHOOK_URL ? 'Set' : 'Not set');

//   if (assignees.includes(userId)) {
   if (true) { // Temporarily disable assignee check for testing
    const text = `🔍 *Review Requested*\n>${mr.title}\n${mr.url}`;
    console.log('Sending Slack notification:', text);
    
    try {
      await axios.post(process.env.SLACK_WEBHOOK_URL!, { text });
      console.log('Slack notification sent successfully');
    } catch (slackError: any) {
      console.error('Failed to send Slack notification:', slackError.message);
      throw slackError;
    }
  }
  } catch (error: any) {
    console.error('Error in handleMergeRequest:', error.message);
    throw error;
  }
}