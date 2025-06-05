import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

const handler = (req: VercelRequest, res: VercelResponse) => {
  // delegate to your Express app
  return app(req as any, res as any);
};

// *This* is what Vercel will invoke:
module.exports = handler;