// src/index.ts
import app from './app';

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`⚡️ Local server listening on http://localhost:${port}/webhook`)
);