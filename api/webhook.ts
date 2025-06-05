// api/webhook.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";

// We use a plain CommonJS export so Vercel sees it unambiguously:
const handler = (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};

module.exports = handler;