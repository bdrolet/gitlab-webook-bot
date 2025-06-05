// api/webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

// A single handler function, exported via CommonJS
const handler = (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};

module.exports = handler;