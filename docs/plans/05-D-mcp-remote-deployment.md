# Plan 05-D — Remote Deployment

> **Estado:** 🔲 PENDIENTE  
> **Spec:** [05-tucu-ui-mcp-agentic-server.md](../specs/05-tucu-ui-mcp-agentic-server.md)  
> **Prerequisito:** Plan 05-C

## Objetivo

Agregar transporte HTTP remoto (Streamable HTTP) con Express 5.x para acceso sin instalación local, autenticación Bearer con comparación constant-time, rate limiting, containerización con Docker, deploy en Fly.io, y CI/CD con GitHub Actions.

## Fases de Implementación

### Fase 1 — Streamable HTTP Transport (Express 5.x)

**Archivo:** `tools/mcp-server/src/http-server.ts`

**Implementación:**

```typescript
import express from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpServer } from './server.js';
import { authMiddleware } from './middleware/auth.js';
import { RateLimiter } from './middleware/rate-limiter.js';

const PORT = parseInt(process.env.PORT || '3100', 10);
const app = express();
const limiter = new RateLimiter(100, 60_000);

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
app.all('/mcp', async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  const server = createMcpServer();
  await server.connect(transport);
  await transport.handleRequest(req, res);
});

app.listen(PORT, () => console.log(`tucu-ui MCP remote server on :${PORT}`));
```

**Actualizar `package.json`:**

```json
{
  "bin": {
    "tucu-ui-mcp": "dist/index.js",
    "tucu-ui-mcp-http": "dist/http-server.js"
  },
  "scripts": {
    "start:http": "tsx src/http-server.ts"
  }
}
```

**Dependencias adicionales:**

```json
{
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.0"
  }
}
```

### Fase 2 — Authentication (Bearer Token + constant-time)

**Archivo:** `tools/mcp-server/src/middleware/auth.ts`

**Implementación:**

```typescript
import { Request, Response, NextFunction } from 'express';
import { timingSafeEqual } from 'crypto';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const MCP_API_KEY = process.env.MCP_API_KEY;

  // No key configured = open access (dev mode)
  if (!MCP_API_KEY) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized — Bearer token required' });
    return;
  }

  const token = authHeader.slice(7);

  // Constant-time comparison to prevent timing attacks
  if (token.length !== MCP_API_KEY.length ||
      !timingSafeEqual(Buffer.from(token), Buffer.from(MCP_API_KEY))) {
    res.status(403).json({ error: 'Forbidden — invalid token' });
    return;
  }

  next();
}
```

**Environment variables:**

- `MCP_API_KEY` — Bearer token (opcional, sin él = open access)
- `PORT` — Puerto HTTP (default: 3100)

### Fase 3 — Rate Limiting

**Archivo:** `tools/mcp-server/src/middleware/rate-limiter.ts`

**Implementación:**

```typescript
interface TokenBucket {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private buckets: Map<string, TokenBucket> = new Map();

  constructor(
    private maxRequests = 100,
    private windowMs = 60_000
  ) {}

  isAllowed(clientId: string): boolean {
    const now = Date.now();
    const bucket = this.buckets.get(clientId);

    if (!bucket || now > bucket.resetAt) {
      this.buckets.set(clientId, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    if (bucket.count >= this.maxRequests) return false;

    bucket.count++;
    return true;
  }
}
```

Rate limit está hardcodeado a 100 requests/60s. No se configura vía env var.

### Fase 4 — Docker

**Archivo:** `tools/mcp-server/Dockerfile`

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY tsconfig*.json ./
COPY src/ ./src/
RUN pnpm build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Security: non-root user
RUN addgroup -g 1001 -S mcpuser && \
    adduser -S mcpuser -u 1001 -G mcpuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

USER mcpuser
EXPOSE 3100

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3100/health || exit 1

CMD ["node", "dist/http-server.js"]
```

**Archivo:** `tools/mcp-server/.dockerignore`

```
node_modules
dist
*.md
.git
```

**Archivo:** `tools/mcp-server/docker-compose.yml`

```yaml
version: '3.8'
services:
  tucu-ui-mcp:
    build: .
    ports:
      - '3100:3100'
    environment:
      - PORT=3100
      - MCP_API_KEY=${MCP_API_KEY:-}
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'wget', '--spider', 'http://localhost:3100/health']
      interval: 30s
      timeout: 3s
      retries: 3
```

### Fase 5 — Fly.io

**Archivo:** `tools/mcp-server/fly.toml`

```toml
app = "tucu-ui-mcp"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[http_service]
  internal_port = 3100
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 0

[checks]
  [checks.health]
    port = 3100
    type = "http"
    interval = "30s"
    timeout = "3s"
    path = "/health"
```

**Deploy manual:**

```bash
cd tools/mcp-server
fly secrets set MCP_API_KEY=<random-64-char>
fly deploy
```

### Fase 6 — NX Targets & npm Publish

**Actualizar `project.json`:**

```json
{
  "targets": {
    "build": { "executor": "@nx/js:tsc" },
    "serve": { "command": "tsx tools/mcp-server/src/index.ts" },
    "serve:http": { "command": "tsx tools/mcp-server/src/http-server.ts" },
    "docker:build": { "command": "docker build -t tucu-ui-mcp ." },
    "docker:run": { "command": "docker run -p 3100:3100 tucu-ui-mcp" },
    "publish": { "command": "npm publish --access public" }
  }
}
```

**Actualizar `package.json`:**

```json
{
  "name": "@e-burgos/tucu-ui-mcp",
  "version": "0.4.0",
  "description": "MCP Agentic Server for @e-burgos/tucu-ui component library",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/e-burgos/tucu-ui",
    "directory": "tools/mcp-server"
  },
  "keywords": ["mcp", "model-context-protocol", "tucu-ui", "component-library", "ai-tools"],
  "files": ["dist", "README.md", "LICENSE"],
  "publishConfig": {
    "access": "public"
  }
}
```

### Fase 7 — Client Configuration Templates

**Archivo:** `tools/mcp-server/configs/vscode-mcp.json`

```json
{
  "servers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"]
    }
  }
}
```

**Archivo:** `tools/mcp-server/configs/cursor-mcp.json`

```json
{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"]
    }
  }
}
```

**Archivo:** `tools/mcp-server/configs/claude-desktop.json`

```json
{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"]
    }
  }
}
```

**Archivo:** `tools/mcp-server/configs/remote-http.json`

```json
{
  "mcpServers": {
    "tucu-ui-remote": {
      "url": "https://tucu-ui-mcp.fly.dev/mcp",
      "headers": {
        "Authorization": "Bearer ${input:tucu-ui-mcp-token}"
      }
    }
  }
}
```

### Fase 8 — CI/CD (GitHub Actions)

**Archivo:** `.github/workflows/deploy-mcp.yml`

```yaml
name: Deploy MCP Server
on:
  push:
    branches: [main]
    paths: ['tools/mcp-server/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm nx build tucu-ui-mcp

      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        working-directory: tools/mcp-server
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

**Secrets requeridos en GitHub:**

- `FLY_API_TOKEN` — Token de Fly.io para deploy automático

### Fase 9 — Verificación

1. **HTTP server:** `curl http://localhost:3100/health` → `{"status":"ok","version":"0.4.0"}`
2. **MCP over HTTP:** POST a `/mcp` con initialize → responde correctamente
3. **Auth (sin token):** Request sin header Authorization cuando `MCP_API_KEY` está configurado → 401
4. **Auth (token inválido):** Bearer token incorrecto → 403
5. **Auth (constant-time):** Usa `timingSafeEqual`, no `===`
6. **Rate limit:** 101 requests rápidos desde mismo IP → último rechazado con 429
7. **Docker build:** `docker build -t tucu-ui-mcp .` exitoso, image <150MB
8. **Docker run:** `docker run -p 3100:3100 tucu-ui-mcp` + health check pasa
9. **Non-root user:** Container corre como `mcpuser` (UID 1001)
10. **Fly.io:** `fly deploy` exitoso, auto-sleep funcional
11. **CI/CD:** Push a `main` con cambios en `tools/mcp-server/` triggerea deploy
12. **npm pack:** `npm pack` genera .tgz con dist/, README, LICENSE
13. **npx:** `npx @e-burgos/tucu-ui-mcp` inicia server stdio correctamente

## Resultado

```
tools/mcp-server/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── fly.toml
├── README.md
├── LICENSE
├── configs/
│   ├── vscode-mcp.json
│   ├── cursor-mcp.json
│   ├── claude-desktop.json
│   └── remote-http.json
├── src/
│   ├── index.ts              (stdio entry — existente)
│   ├── http-server.ts        (HTTP entry — Express 5.x)
│   ├── server.ts             (factory — existente)
│   └── middleware/
│       ├── auth.ts           (Bearer + timingSafeEqual)
│       └── rate-limiter.ts   (token bucket 100/60s)
├── package.json              (actualizado: bin, publishConfig, files, keywords)
└── project.json              (actualizado: serve:http, docker:*, publish)

.github/workflows/
└── deploy-mcp.yml            (CI/CD → Fly.io)
```

## Notas

- El server HTTP es **stateless** — cada request crea una conexión MCP nueva
- Rate limiting es in-memory (100 req/60s hardcodeado, se reinicia con el container)
- La autenticación es opcional — sin `MCP_API_KEY` el server es open access (dev mode)
- Auth usa `timingSafeEqual` para prevenir timing attacks
- Solo se soporta `Authorization: Bearer <token>` (no `x-api-key`)
- El endpoint `/health` **nunca** requiere auth (para Docker healthcheck / Fly.io checks)
- Docker usa `node:22-alpine` con usuario non-root `mcpuser` (UID 1001)
- Fly.io con `auto_stop_machines = "stop"` y `min_machines_running = 0` para cero costo idle
- CI/CD se triggerea solo con cambios en `tools/mcp-server/**` en branch `main`
