# Spec 05 — Tucu UI MCP Agentic Server

> **Versión:** 1.0  
> **Estado:** En implementación  
> **Branch:** `feat/mcp-agentic-server`  
> **Target release:** v2.1.0

---

## Resumen

Crear un **MCP (Model Context Protocol) Server** para `@e-burgos/tucu-ui` que permita a agentes de IA (GitHub Copilot, Cursor, Claude, etc.) consumir el catálogo de componentes, generar código con las variantes y props correctas, y acceder a recursos de documentación — todo vía el protocolo estándar MCP.

## Motivación

Los agentes de IA cometen errores frecuentes al usar tucu-ui:

- **Variantes inválidas:** Inventan `variant="primary"`, `size="lg"` causando runtime crashes (`Cannot read properties of undefined (reading '0')`)
- **Catálogo desconocido:** No conocen los 95+ componentes disponibles
- **Convenciones ignoradas:** No respetan tokens, layouts, routing patterns del design system
- **Imports incorrectos:** Generan imports de módulos inexistentes
- **Props fabricadas:** Inventan props que no existen en los componentes

Un MCP server resuelve esto entregando al agente un **source of truth** consultable en tiempo real con variantes correctas, ejemplos validados, y generación de código determinista.

## Objetivos

1. **Zero errores de variante** — Los agentes NUNCA producen código con variantes inválidas
2. **Discovery completo** — Todo el catálogo es consultable con fuzzy search
3. **Generación determinista** — Mismo input → mismo output (testable)
4. **Integración universal** — VS Code, Cursor, Claude Desktop, HTTP remoto
5. **Zero-config para usuarios** — `npx @e-burgos/tucu-ui-mcp` y listo

---

## Stack Técnico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| `@modelcontextprotocol/sdk` | ^1.12.0 | SDK oficial MCP (server + transports) |
| `zod` | ^3.23.0 | Validación de schemas para tool inputs |
| `express` | ^5.x | HTTP server (deployment remoto) |
| TypeScript | ~5.7.0 | Tipado estricto, ESM modules |
| `tsx` | ^4.19.0 | Dev server (serve target) |
| Node.js | >=22 | Runtime |

**Module system:** ESM (`"type": "module"`, `moduleResolution: "bundler"`)

---

## Arquitectura

```
tools/mcp-server/
├── package.json                 — @e-burgos/tucu-ui-mcp
├── project.json                 — NX project (build, serve, serve:http, docker:*, publish)
├── tsconfig.json                — Extends root
├── tsconfig.lib.json            — ESNext module, bundler resolution
├── Dockerfile                   — Multi-stage build (Fase F)
├── fly.toml                     — Fly.io config (Fase F)
├── .dockerignore
├── README.md
├── configs/                     — Client configuration templates
│   ├── vscode-mcp.json
│   ├── cursor-mcp.json
│   └── claude-desktop.json
├── src/
│   ├── index.ts                 — Entry point (stdio transport)
│   ├── http-server.ts           — Entry point (HTTP/SSE transport, remote)
│   ├── server.ts                — McpServer factory + tool/resource/prompt registration
│   ├── middleware/
│   │   ├── auth.ts              — Bearer token auth (constant-time comparison)
│   │   └── rate-limiter.ts      — Token bucket rate limiter
│   ├── tools/
│   │   ├── component-tools.ts   — 4 tools: list, get, search, props
│   │   └── generation-tools.ts  — 5 tools: generate_*, search_icons
│   ├── resources/
│   │   ├── index.ts             — Resource registration
│   │   ├── catalog.ts
│   │   ├── tokens.ts
│   │   ├── forms.ts
│   │   ├── routing.ts
│   │   ├── layouts.ts
│   │   ├── theme.ts
│   │   ├── charts.ts
│   │   ├── icons.ts
│   │   ├── migration.ts
│   │   ├── best-practices.ts
│   │   ├── changelog.ts
│   │   └── quickstart.ts
│   ├── prompts/
│   │   ├── index.ts             — Prompt registration
│   │   ├── create-component.ts
│   │   ├── create-form.ts
│   │   ├── create-page.ts
│   │   ├── debug-variant.ts
│   │   ├── migrate-component.ts
│   │   ├── theme-setup.ts
│   │   ├── accessibility-check.ts
│   │   └── performance-review.ts
│   ├── data/
│   │   ├── component-registry.ts — 60+ componentes con variantes
│   │   ├── theme-registry.ts     — Tokens, presets, layouts
│   │   ├── icon-registry.ts      — Catálogo Lucide + custom icons
│   │   └── form-patterns.ts      — Patrones de formulario predefinidos
│   └── utils/
│       ├── fuzzy-search.ts       — Levenshtein + scoring tiers
│       ├── code-generator.ts     — Template interpolation helpers
│       └── version.ts            — Version from package.json
└── tests/
    ├── component-tools.test.ts
    ├── generation-tools.test.ts
    ├── resources.test.ts
    ├── prompts.test.ts
    └── fuzzy-search.test.ts
```

---

## Decisiones Técnicas

| # | Decisión | Alternativa descartada | Justificación |
|---|----------|----------------------|---------------|
| 1 | `@modelcontextprotocol/sdk` | Implementación custom | SDK oficial, mantenido por Anthropic, tipado TS |
| 2 | Zod para validación | io-ts, superstruct | Ya en el monorepo, excelente con TypeScript |
| 3 | Static registries (hardcoded) | Dynamic AST scanning | Determinismo, zero runtime deps, testable |
| 4 | Levenshtein distance | Full-text search (lunr) | Lightweight, no deps, suficiente para ~100 items |
| 5 | TypeScript ESM | CJS | Futuro del ecosistema Node, compatible con SDK |
| 6 | NX project (`tools/`) | Package independiente | Comparte tsconfig, scripts, CI del monorepo |
| 7 | stdio transport (local) | Named pipes | Estándar MCP, compatible con todos los clientes |
| 8 | Streamable HTTP (remote) | SSE legacy | Protocolo MCP más reciente, bidireccional |
| 9 | Express 5.x para HTTP | Fastify, raw http | Familiar, async errors built-in, ecosystem |
| 10 | `MCP_API_KEY` para auth | OAuth2, API key mgmt | Simple, suficiente para single-purpose server |
| 11 | Fly.io para remote hosting | Vercel/Railway/AWS | $0/mes (free tier: 3 shared VMs), auto-sleep |
| 12 | Docker multi-stage build | Raw Node.js deploy | Reproducible, portable, non-root user |
| 13 | GitHub Actions CI/CD | Manual deploy | Auto-deploy on push to main, registry rebuild |
| 14 | Constant-time auth (`timingSafeEqual`) | Simple `===` | Previene timing attacks, security best practice |
| 15 | String template generation | AST-based codegen | Simplicidad, legible, suficiente para snippets |

---

## Fases de Implementación

### Fase A — Foundation (MCP Core + Component Discovery)

**Objetivo:** Proyecto NX funcional con 4 tools de discovery y fuzzy search.

**Proyecto:** `tools/mcp-server/` como package NX en el monorepo.

**Entry point (stdio):**

```typescript
// src/index.ts
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './server.js';

const server = createMcpServer();
const transport = new StdioServerTransport();
await server.connect(transport);
```

**Server factory:**

```typescript
// src/server.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerComponentTools } from './tools/component-tools.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'tucu-ui-mcp',
    version: '0.1.0',
  });
  registerComponentTools(server);
  return server;
}
```

#### Component Registry

**Archivo:** `src/data/component-registry.ts`

**Interface:**

```typescript
export interface ComponentRegistryEntry {
  name: string;
  category: string;
  description: string;
  importPath: string;
  variants?: Record<string, string[]>;
  example: string;
  relatedComponents?: string[];
  themeAware: boolean;
  warnings?: string[];
}
```

**Categorías (17):**
buttons, inputs, feedback, navigation, layout, data-display, overlays, forms, charts, icons, typography, media, utilities, surfaces, disclosure, macOS, macOS-layout

**Ejemplo de entry:**

```typescript
{
  name: 'Button',
  category: 'buttons',
  description: 'Primary interactive button with multiple variants and sizes',
  importPath: "@e-burgos/tucu-ui",
  variants: {
    variant: ['solid', 'ghost', 'transparent'],
    size: ['large', 'medium', 'small', 'mini', 'tiny'],
  },
  example: '<Button variant="solid" size="medium" onClick={handleClick}>Label</Button>',
  relatedComponents: ['IconButton', 'ButtonGroup'],
  themeAware: true,
  warnings: ['NEVER use variant="primary", "outline", "destructive" — will crash at runtime'],
}
```

#### Tools (4)

| Tool | Input (Zod) | Output | Descripción |
|------|-------------|--------|-------------|
| `list_components` | `{ category?: string, limit?: number }` | Array de `{ name, category, description }` | Lista componentes, filtrable por categoría |
| `get_component` | `{ name: string }` | Full `ComponentRegistryEntry` | Detalle completo incluyendo variantes, example, warnings |
| `search_components` | `{ query: string, category?: string, limit?: number }` | Array de `{ component, score, matchType }` | Búsqueda fuzzy con scoring |
| `get_props` | `{ component: string }` | `{ variants, warnings, example }` | Solo variantes válidas (para validación rápida) |

**Output format (todas las tools):**

```typescript
{ content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
```

#### Fuzzy Search

**Archivo:** `src/utils/fuzzy-search.ts`

**Algoritmo:** Levenshtein distance (matrix-based, sin dependencias externas)

**Scoring tiers:**
- `exact` = 1.0 (coincidencia exacta case-insensitive)
- `prefix` = 0.9 (query es prefix del nombre)
- `contains` = 0.7 (query aparece en el nombre)
- `fuzzy` = 0.3–0.6 (basado en Levenshtein distance normalizada)

**Interface genérica:**

```typescript
export function fuzzySearch<T>(
  items: T[],
  query: string,
  getSearchableText: (item: T) => string,
  limit?: number
): SearchResult<T>[];

interface SearchResult<T> {
  item: T;
  score: number;
  matchType: 'exact' | 'prefix' | 'contains' | 'fuzzy';
}
```

#### NX Project Config

```json
// project.json
{
  "name": "tucu-ui-mcp",
  "root": "tools/mcp-server",
  "sourceRoot": "tools/mcp-server/src",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "options": {
        "outputPath": "tools/mcp-server/dist",
        "tsConfig": "tools/mcp-server/tsconfig.lib.json",
        "main": "tools/mcp-server/src/index.ts"
      }
    },
    "serve": {
      "command": "tsx tools/mcp-server/src/index.ts"
    }
  }
}
```

---

### Fase B — Generation Tools + Theme

**Objetivo:** 5 tools de generación de código + registries de theme, icons, y form patterns.

#### Theme Registry

**Archivo:** `src/data/theme-registry.ts`

```typescript
export interface ThemeToken {
  name: string;
  cssVariable: string;
  description: string;
  defaultValue: string;
}

export interface ThemePreset {
  name: string;
  description: string;
  tokens: Record<string, string>;
}

export interface LayoutVariant {
  name: string;
  component: string;
  description: string;
  props: Record<string, string>;
  example: string;
}
```

**Tokens (8 categorías):** background, foreground, primary, secondary, muted, accent, border, ring

**Presets (6):** default, ocean, forest, sunset, midnight, lavender

**Layouts (4):** DashboardLayout, SidebarLayout, FullPageLayout, StackedLayout

#### Icon Registry

**Archivo:** `src/data/icon-registry.ts`

```typescript
export interface IconEntry {
  name: string;
  category: string;
  keywords: string[];
  importFrom: string;
}
```

**Categorías:** actions, navigation, media, communication, files, social, devices

**Keywords:** Mapeo semántico (ej: "trash" → delete, remove, discard)

#### Form Patterns

**Archivo:** `src/data/form-patterns.ts`

```typescript
export interface FormPattern {
  name: string;
  description: string;
  fields: FormFieldPattern[];
  validationSchema: string; // Zod schema code
  fullExample: string;
}

export interface FormFieldPattern {
  name: string;
  component: string; // tucu-ui input component
  type: string;
  validation: string;
}
```

**Patrones (6):**
1. Login form (email + password)
2. Registration form (name + email + password + confirm)
3. Contact form (name + email + subject + message)
4. Settings form (various inputs, selects, toggles)
5. Search/filter form (InputSearcher + Select + DatePicker)
6. CRUD form (dynamic fields based on entity)

#### Tools (5)

##### `generate_component`

```typescript
Input: {
  component: z.string(),       // Component name
  props: z.record(z.string()).optional(), // Custom props
  withWrapper: z.boolean().optional(),    // Wrap in container
  theme: z.string().optional(),           // Theme preset
}
Output: {
  code: string,      // Ready-to-use JSX
  imports: string[], // Required imports
  warnings: string[] // Any variant warnings
}
```

##### `generate_form`

```typescript
Input: {
  pattern: z.string().optional(),   // Predefined pattern name
  fields: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'email', 'password', 'number', 'select', 'textarea', 'checkbox', 'date']),
    label: z.string(),
    required: z.boolean().optional(),
    options: z.array(z.string()).optional(),
  })).optional(),
  withValidation: z.boolean().optional(), // Include Zod schema
  variant: z.string().optional(),         // Input variant
}
Output: {
  componentCode: string,   // Form component
  validationCode: string,  // Zod schema
  imports: string[],       // Required imports
  types: string,           // TypeScript interfaces
}
```

##### `generate_page`

```typescript
Input: {
  name: z.string(),
  layout: z.enum(['dashboard', 'sidebar', 'fullpage', 'stacked']),
  sections: z.array(z.object({
    type: z.enum(['hero', 'cards', 'table', 'form', 'chart', 'list']),
    title: z.string().optional(),
  })),
  withRouting: z.boolean().optional(),
  architecture: z.enum(['standalone', 'mfe']).optional(),
}
Output: {
  pageCode: string,
  routeConfig: string,
  imports: string[],
}
```

##### `generate_chart`

```typescript
Input: {
  type: z.enum(['line', 'bar', 'area', 'pie', 'donut', 'composed', 'radar', 'scatter']),
  dataShape: z.object({
    xKey: z.string(),
    yKeys: z.array(z.string()),
    sampleData: z.array(z.record(z.unknown())).optional(),
  }),
  responsive: z.boolean().optional(),
  withTheme: z.boolean().optional(),
  withTooltip: z.boolean().optional(),
  withLegend: z.boolean().optional(),
}
Output: {
  componentCode: string,
  imports: string[],
  sampleData: string,
}
```

##### `search_icons`

```typescript
Input: {
  query: z.string(),
  category: z.string().optional(),
  limit: z.number().optional(),
}
Output: {
  results: Array<{
    name: string,
    category: string,
    importStatement: string,
    usage: string,
  }>
}
```

**Reglas de generación:**
- Código es **determinista** — mismo input → mismo output
- Templates usan string interpolation (no AST)
- `generate_form` sigue patrón de tucu-ui `Form` wrapper (react-hook-form)
- Charts usan tokens CSS de tucu-ui (`hsl(var(--primary))`)
- NUNCA produce variantes inválidas

---

### Fase C — Resources + Prompts + Distribution

#### Resources (12)

| # | URI | Fuente | Descripción |
|---|-----|--------|-------------|
| 1 | `tucu://catalog` | component-registry.ts | Catálogo completo en JSON |
| 2 | `tucu://tokens` | theme-registry.ts | Design tokens (CSS variables + valores) |
| 3 | `tucu://forms` | form-patterns.ts | Patrones + validación + useFormContext |
| 4 | `tucu://routing` | Generated | Guía routing: standalone + MFE, ReactRouter |
| 5 | `tucu://layouts` | Generated | Layouts disponibles + configuración + props |
| 6 | `tucu://theme` | Generated | useTheme hook, presets, dark/light switch |
| 7 | `tucu://charts` | Generated | Recharts: tipos, props, theming, performance |
| 8 | `tucu://icons` | icon-registry.ts | Catálogo completo de iconos con categorías |
| 9 | `tucu://migration` | Generated | Breaking changes entre versiones |
| 10 | `tucu://best-practices` | Generated | Do's/Don'ts, anti-patterns, warnings |
| 11 | `tucu://changelog` | Generated | Últimas versiones + cambios |
| 12 | `tucu://quickstart` | Generated | Setup rápido: install, provider, primer componente |

**Formato:** Markdown estructurado embebido en JSON (legible por agentes).

**Patrón de registro:**

```typescript
server.resource(
  'component-catalog',
  'tucu://catalog',
  { description: 'Complete component catalog with variants and examples' },
  async () => ({
    contents: [{
      uri: 'tucu://catalog',
      mimeType: 'application/json',
      text: JSON.stringify(componentRegistry, null, 2)
    }]
  })
);
```

#### Prompts (8)

| # | Prompt | Argumentos | Genera |
|---|--------|-----------|--------|
| 1 | `create-component` | `component: string, context?: string` | Componente con props correctas y warnings |
| 2 | `create-form` | `fields: string, validation?: string` | Formulario con Form + inputs + Zod schema |
| 3 | `create-page` | `name: string, layout: string, sections?: string` | Página con layout y routing |
| 4 | `debug-variant` | `error: string, component?: string` | Diagnóstico de "Cannot read properties of undefined" |
| 5 | `migrate-component` | `component: string, fromVersion: string, toVersion: string` | Guía migración con breaking changes |
| 6 | `theme-setup` | `preset?: string, darkMode?: string` | Configura ThemeProvider + tokens |
| 7 | `accessibility-check` | `component: string, code?: string` | Auditoría aria-labels, keyboard nav, contrast |
| 8 | `performance-review` | `code: string` | Renders innecesarios, bundle size, memoization |

**Ejemplo — `debug-variant` template:**

```typescript
export function getDebugVariantPrompt(error: string, component?: string): string {
  return `You are debugging a tucu-ui runtime error.

ERROR: ${error}
${component ? `COMPONENT: ${component}` : ''}

COMMON CAUSE: Using invalid variant values. tucu-ui components crash with
"Cannot read properties of undefined (reading '0')" when given variants
that don't exist.

VALID VARIANTS:
- Button/IconButton: variant = "solid" | "ghost" | "transparent"
- Button/IconButton: size = "large" | "medium" | "small" | "mini" | "tiny"
- Badge: variant = "solid" | "ghost" | "outline" | "soft"
- Input/Select: variant = "solid" | "ghost" | "transparent"
- Alert: variant = "error" | "success" | "info" | "warning"

INVALID (will crash):
- variant="primary", "secondary", "destructive", "outline" (on Button)
- size="lg", "sm", "md", "xs"

Please identify the invalid prop and suggest the correct replacement.`;
}
```

**Patrón de registro de prompts:**

```typescript
server.prompt(
  'debug-variant',
  'Diagnose invalid variant runtime errors in tucu-ui components',
  {
    error: z.string().describe('The error message or stack trace'),
    component: z.string().optional().describe('Component name if known'),
  },
  async ({ error, component }) => ({
    messages: [{
      role: 'user',
      content: { type: 'text', text: getDebugVariantPrompt(error, component) }
    }]
  })
);
```

#### Distribution (npm)

**Package:** `@e-burgos/tucu-ui-mcp`

**package.json (relevante):**

```json
{
  "name": "@e-burgos/tucu-ui-mcp",
  "version": "0.4.0",
  "type": "module",
  "description": "MCP Agentic Server for @e-burgos/tucu-ui component library",
  "license": "MIT",
  "bin": {
    "tucu-ui-mcp": "dist/index.js",
    "tucu-ui-mcp-http": "dist/http-server.js"
  },
  "files": ["dist", "README.md", "LICENSE"],
  "keywords": ["mcp", "model-context-protocol", "tucu-ui", "component-library", "ai-tools"],
  "repository": {
    "type": "git",
    "url": "https://github.com/e-burgos/tucu-ui",
    "directory": "tools/mcp-server"
  },
  "publishConfig": { "access": "public" }
}
```

**Configuraciones de clientes:**

VS Code (`.vscode/mcp.json`):
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

Cursor (`.cursor/mcp.json`):
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

Claude Desktop (`claude_desktop_config.json`):
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

Remote HTTP:
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

---

### Fase D — Remote Deployment

**Objetivo:** Acceso remoto via HTTP sin instalación local, containerizado y desplegado en Fly.io.

#### HTTP Transport

```typescript
// src/http-server.ts
import express from 'express';
import { createMcpServer } from './server.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { authMiddleware } from './middleware/auth.js';
import { RateLimiter } from './middleware/rate-limiter.js';
import { VERSION } from './utils/version.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3100', 10);
const rateLimiter = new RateLimiter();

app.use(express.json());

// Health check (no auth required)
app.get('/health', (_, res) => res.json({ status: 'ok', version: VERSION }));

// Auth + Rate limiting for MCP endpoint
app.use('/mcp', authMiddleware);
app.use('/mcp', (req, res, next) => {
  const clientId = req.ip || 'unknown';
  if (!rateLimiter.isAllowed(clientId)) {
    res.status(429).json({ error: 'Rate limit exceeded' });
    return;
  }
  next();
});

// MCP endpoint (Streamable HTTP — stateless)
app.all('/mcp', async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  const server = createMcpServer();
  await server.connect(transport);
  await transport.handleRequest(req, res);
});

app.listen(PORT, () => console.log(`tucu-ui MCP remote server on :${PORT}`));
```

#### Autenticación (Bearer Token + constant-time)

```typescript
// src/middleware/auth.ts
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

#### Rate Limiting

```typescript
// src/middleware/rate-limiter.ts
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

**Environment variables:**
- `MCP_API_KEY` — Bearer token (opcional, sin él = open access)
- `PORT` — Puerto HTTP (default: 3100)

#### Docker

```dockerfile
# Dockerfile
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

#### Fly.io

```toml
# fly.toml
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

**Deploy:** `fly secrets set MCP_API_KEY=<random-64-char>`

#### CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy-mcp.yml
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

#### NX Targets (completos)

```json
{
  "build": { "executor": "@nx/js:tsc" },
  "serve": { "command": "tsx tools/mcp-server/src/index.ts" },
  "serve:http": { "command": "tsx tools/mcp-server/src/http-server.ts" },
  "docker:build": { "command": "docker build -t tucu-ui-mcp ." },
  "docker:run": { "command": "docker run -p 3100:3100 tucu-ui-mcp" },
  "publish": { "command": "npm publish --access public" }
}
```

---

## Métricas de Éxito

| Métrica | Target | Cómo se mide |
|---------|--------|--------------|
| Tools registradas | 9 | `tools/list` count |
| Resources registrados | 12 | `resources/list` count |
| Prompts registrados | 8 | `prompts/list` count |
| Componentes en registry | 60+ | `list_components` sin filtro |
| Fuzzy search accuracy | >90% | Tests con typos comunes |
| Código generado válido | 100% | Tests: nunca variantes inválidas |
| Docker image size | <150MB | `docker images` output |
| Cold start (stdio) | <500ms | Medición con `time` |
| Response time (HTTP) | <200ms | Health check + tool calls |
| Build (CI) | <60s | GitHub Actions timing |

---

## Criterios de Aceptación

### Fase A ✅ COMPLETADA

- [x] Server responde al handshake MCP (`initialize`)
- [x] 4 tools registradas y funcionales
- [x] Fuzzy search encuentra componentes con typos
- [x] TypeScript compila sin errores
- [x] Registry tiene 60+ componentes con variantes correctas

### Fase B

- [ ] 5 tools de generación producen código válido
- [ ] Código generado usa variantes correctas (NUNCA las inválidas)
- [ ] Formularios generados incluyen validación Zod + Form wrapper
- [ ] Charts generados incluyen theming con tokens CSS
- [ ] `search_icons` retorna resultados relevantes

### Fase C

- [ ] 12 resources registrados y retornan contenido útil
- [ ] 8 prompts registrados con argumentos correctos
- [ ] `tucu://catalog` retorna JSON del catálogo completo
- [ ] `tucu://quickstart` es legible y actionable por agentes
- [ ] `debug-variant` diagnostica errores de variante correctamente
- [ ] `create-component` genera template útil con variantes válidas
- [ ] `theme-setup` configura ThemeProvider correctamente
- [ ] Package publicable como npm (`npm pack` genera .tgz correcto)
- [ ] `npx @e-burgos/tucu-ui-mcp` inicia server stdio
- [ ] Configs de VS Code, Cursor, Claude Desktop funcionan

### Fase D

- [ ] Server accesible via HTTP (`/mcp` endpoint)
- [ ] Health check: `GET /health` → `200 { "status": "ok" }`
- [ ] Auth: Request sin token → 401, token inválido → 403
- [ ] Rate limit: >100 req/min → 429
- [ ] Docker build exitoso, image <150MB
- [ ] Fly.io deploy funcional con auto-sleep
- [ ] CI/CD deploya automáticamente en push a main

---

## Riesgos y Mitigaciones

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Registry desactualizado vs librería | Alto — variantes incorrectas | Media | CI verifica registry vs exports reales |
| SDK MCP breaking changes | Medio — build rota | Baja | Pin versión, test en CI, update manual |
| Fly.io free tier limits | Bajo — server caído temp. | Media | Auto-sleep + monitor uptime |
| Rate limiting in-memory | Bajo — pérdida en restart | Alta | Aceptable para MVP, Redis en futuro |
| Docker image bloat | Bajo — deploy lento | Baja | Multi-stage build, prune devDeps |
| Express vulnerability | Alto — security issue | Baja | Dependabot, versión pinned, min deps |

---

## Planes de Implementación

| Plan | Fases | Estado | Archivo |
|------|-------|--------|---------|
| **05-A** | A (Foundation) | ✅ Completado | [05-A-mcp-foundation.md](../plans/05-A-mcp-foundation.md) |
| **05-B** | B (Generation + Theme) | 🔲 Pendiente | [05-B-mcp-generation-and-theme.md](../plans/05-B-mcp-generation-and-theme.md) |
| **05-C** | C (Resources + Prompts + Distribution) | 🔲 Pendiente | [05-C-mcp-resources-distribution.md](../plans/05-C-mcp-resources-distribution.md) |
| **05-D** | D (Remote Deployment) | 🔲 Pendiente | [05-D-mcp-remote-deployment.md](../plans/05-D-mcp-remote-deployment.md) |

---

## Dependencias del Proyecto

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0",
    "zod": "^3.23.0",
    "express": "^5.0.0"
  },
  "devDependencies": {
    "tsx": "^4.19.0",
    "typescript": "~5.7.0",
    "@types/express": "^5.0.0",
    "vitest": "^2.0.0"
  }
}
```

---

## Notas

- Las variantes válidas son **CRÍTICAS**. El registry debe reflejar exactamente lo que la librería soporta.
- El MCP server es **read-only** para Fases A–C. No modifica el filesystem del usuario.
- La Fase D introduce deployment pero sigue siendo read-only (solo sirve datos).
- La generación de código es **determinista** — mismo input → mismo output (testable).
- El server HTTP es **stateless** — cada request crea una conexión MCP nueva.
- Auth es **opcional** — sin `MCP_API_KEY` el server es open access (dev mode).
- El endpoint `/health` **nunca** requiere auth (para Docker healthcheck / Fly.io checks).
