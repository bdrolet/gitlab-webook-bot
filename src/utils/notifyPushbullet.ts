import axios from 'axios';

export async function pushbulletNotify(title: string, body: string) {
  await axios.post(
    'https://api.pushbullet.com/v2/pushes',
    { type: 'note', title, body },
    { headers: { 'Access-Token': process.env.PUSHBULLET_TOKEN! } }
  );
}