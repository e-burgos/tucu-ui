import express, { type Express } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpServer } from './server.js';
import { authMiddleware } from './middleware/auth.js';
import { RateLimiter } from './middleware/rate-limiter.js';

const PORT = parseInt(process.env.PORT || '3100', 10);
const app: Express = express();
const limiter = new RateLimiter(100, 60_000);

app.use(express.json());

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

app.listen(PORT, () =>
  console.log(`tucu-ui MCP remote server on :${PORT}`)
);

export { app };
