// api/webhook.ts

import app from "../src/app";

// Export a single CommonJS handler; use `any` for req/res so the build won't try to resolve @vercel/node
const handler = (req: any, res: any) => {
  return app(req, res);
};

module.exports = handler;