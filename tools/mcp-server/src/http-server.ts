import express, { type Express } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpServer } from './server.js';
import { authMiddleware } from './middleware/auth.js';
import { RateLimiter } from './middleware/rate-limiter.js';

const PORT = parseInt(process.env.PORT || '3100', 10);
const app: Express = express();
const limiter = new RateLimiter(100, 60_000);

app.use(express.json());

// Welcome page
app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(getWelcomePage());
});

// Health check — no auth required
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: '0.4.0' });
});

// Rate limiting middleware
app.use('/mcp', (req, res, next) => {
  const clientId = req.ip || 'unknown';
  if (!limiter.isAllowed(clientId)) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }
  next();
});

// Auth middleware (only on /mcp)
app.use('/mcp', authMiddleware);

// MCP endpoint
app.post('/mcp', async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  const server = createMcpServer();
  await server.connect(transport);
  await transport.handleRequest(req, res);
});

app.listen(PORT, () => console.log(`tucu-ui MCP remote server on :${PORT}`));

export { app };

function getWelcomePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>tucu-ui MCP Server</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 640px;
      padding: 3rem 2rem;
      text-align: center;
    }
    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 2rem;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
    }
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #6366f1, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .version {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      background: #1e1e2e;
      border: 1px solid #333;
      border-radius: 6px;
      font-size: 0.75rem;
      color: #a78bfa;
      margin-bottom: 1.5rem;
    }
    p {
      color: #a3a3a3;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .endpoints {
      text-align: left;
      background: #141414;
      border: 1px solid #262626;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .endpoints h3 {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #737373;
      margin-bottom: 1rem;
    }
    .endpoint {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 0;
      border-bottom: 1px solid #1e1e1e;
    }
    .endpoint:last-child { border-bottom: none; }
    .method {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      min-width: 48px;
      text-align: center;
    }
    .get { background: #064e3b; color: #6ee7b7; }
    .post { background: #1e3a5f; color: #7dd3fc; }
    .path { font-family: 'SF Mono', Menlo, monospace; font-size: 0.9rem; color: #e5e5e5; }
    .desc { margin-left: auto; font-size: 0.8rem; color: #737373; }
    .links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .links a {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.6rem 1.2rem;
      background: #1e1e2e;
      border: 1px solid #333;
      border-radius: 8px;
      color: #e5e5e5;
      text-decoration: none;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .links a:hover {
      border-color: #6366f1;
      background: #1a1a2e;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">T</div>
    <h1>tucu-ui MCP Server</h1>
    <span class="version">v0.4.0</span>
    <p>
      Model Context Protocol server for the
      <strong>@e-burgos/tucu-ui</strong> component library.
      Provides AI agents with tools, resources, and prompts to generate
      production-ready UI code.
    </p>
    <div class="endpoints">
      <h3>Endpoints</h3>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/mcp</span>
        <span class="desc">MCP protocol (auth required)</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/health</span>
        <span class="desc">Health check</span>
      </div>
    </div>
    <div class="links">
      <a href="https://www.npmjs.com/package/@e-burgos/tucu-ui-mcp">npm</a>
      <a href="https://github.com/e-burgos/tucu-ui">GitHub</a>
      <a href="https://tucu-ui.netlify.app">Docs</a>
    </div>
  </div>
</body>
</html>`;
}
