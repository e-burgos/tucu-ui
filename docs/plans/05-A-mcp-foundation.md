# Plan 05-A — MCP Foundation (Core + Component Discovery)

> **Estado:** ✅ COMPLETADO  
> **Spec:** [05-tucu-ui-mcp-agentic-server.md](../specs/05-tucu-ui-mcp-agentic-server.md)  
> **Branch:** `feat/mcp-agentic-server`

## Objetivo

Crear la base del MCP server: scaffolding NX, transporte stdio, registry de componentes, fuzzy search, y 4 tools de discovery.

## Fases de Implementación

### Fase 1 — Project Scaffolding

**Archivos a crear:**

| Archivo | Propósito |
|---------|-----------|
| `tools/mcp-server/package.json` | Package con deps: @modelcontextprotocol/sdk, zod, tsx, typescript |
| `tools/mcp-server/project.json` | NX project: targets build (tsc) y serve (tsx) |
| `tools/mcp-server/tsconfig.json` | Extends root, references tsconfig.lib.json |
| `tools/mcp-server/tsconfig.lib.json` | ESNext module, bundler resolution, ES2022 target |

**Configuración clave:**
```json
{
  "name": "@e-burgos/tucu-ui-mcp",
  "version": "0.1.0",
  "type": "module",
  "bin": { "tucu-ui-mcp": "dist/index.js" }
}
```

**Verificar:** `pnpm-workspace.yaml` ya incluye `tools/*`.

### Fase 2 — Component Registry

**Archivo:** `tools/mcp-server/src/data/component-registry.ts`

**Estructura:**
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

**Categorías (17):** buttons, inputs, feedback, navigation, layout, data-display, overlays, forms, charts, icons, typography, media, utilities, surfaces, disclosure, macOS, macOS-layout

**Meta:** 60+ componentes con variantes correctas. Incluir warnings explícitos para variantes inválidas comunes.

**Funciones exportadas:**
- `getCategories(): string[]`
- `getComponentByName(name: string): ComponentRegistryEntry | undefined`
- `getComponentsByCategory(category: string): ComponentRegistryEntry[]`

### Fase 3 — Fuzzy Search Utility

**Archivo:** `tools/mcp-server/src/utils/fuzzy-search.ts`

**Implementación:**
- Levenshtein distance (matrix-based)
- Scoring tiers:
  - exact match → 1.0
  - prefix match → 0.9
  - contains → 0.7
  - fuzzy (distance-based) → 0.3–0.6
- Interface `SearchResult<T>` con `item`, `score`, `matchType`
- Función genérica: `fuzzySearch<T>(items, query, getSearchableText, limit?)`

### Fase 4 — MCP Server Core

**Archivos:**

| Archivo | Propósito |
|---------|-----------|
| `tools/mcp-server/src/server.ts` | Factory `createMcpServer()` → crea McpServer, registra tools |
| `tools/mcp-server/src/index.ts` | Entry point: `#!/usr/bin/env node`, crea server + StdioServerTransport |

**Patrón del server:**
```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// server.ts
export function createMcpServer(): McpServer {
  const server = new McpServer({ name: 'tucu-ui-mcp', version: '0.1.0' });
  registerComponentTools(server);
  return server;
}

// index.ts
const server = createMcpServer();
await server.connect(new StdioServerTransport());
```

### Fase 5 — Component Tools (4 tools)

**Archivo:** `tools/mcp-server/src/tools/component-tools.ts`

**Función:** `registerComponentTools(server: McpServer): void`

| Tool | Input (Zod) | Comportamiento |
|------|-------------|----------------|
| `list_components` | `category?: string, limit?: number` | Lista componentes, filtra por categoría |
| `get_component` | `name: string` | Detalle completo, fuzzy fallback |
| `search_components` | `query: string, category?: string, limit?: number` | Búsqueda fuzzy sobre nombre+descripción |
| `get_props` | `component: string` | Solo variants + warnings + example |

**Return format (todas las tools):**
```typescript
{ content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
```

### Fase 6 — Tests

**Archivos:**
- `tools/mcp-server/tests/fuzzy-search.test.ts`
- `tools/mcp-server/tests/component-tools.test.ts`

**Framework:** vitest

**Tests fuzzy-search:**
```typescript
import { describe, it, expect } from 'vitest';
import { fuzzySearch } from '../src/utils/fuzzy-search.js';

describe('fuzzySearch', () => {
  const items = [{ name: 'Button' }, { name: 'Badge' }, { name: 'InputSearcher' }];
  const getText = (i: { name: string }) => i.name;

  it('exact match scores 1.0', () => {
    const [result] = fuzzySearch(items, 'Button', getText);
    expect(result.score).toBe(1.0);
    expect(result.matchType).toBe('exact');
  });

  it('prefix match scores 0.9', () => {
    const [result] = fuzzySearch(items, 'Butt', getText);
    expect(result.score).toBe(0.9);
    expect(result.matchType).toBe('prefix');
  });

  it('fuzzy match finds typos', () => {
    const results = fuzzySearch(items, 'Buton', getText);
    expect(results[0].item.name).toBe('Button');
  });

  it('returns empty for completely unrelated query', () => {
    const results = fuzzySearch(items, 'zzzzz', getText);
    expect(results).toHaveLength(0);
  });
});
```

**Tests component-tools:**
```typescript
import { describe, it, expect } from 'vitest';
import { createMcpServer } from '../src/server.js';

describe('Component Tools', () => {
  it('list_components returns 60+ components', async () => {
    // Integration test verifying tool registration and execution
  });

  it('get_component with exact name returns full entry', async () => {});
  it('get_component with typo uses fuzzy fallback', async () => {});
  it('search_components finds by partial name', async () => {});
  it('get_props returns only variants + warnings + example', async () => {});
  it('Button variants are solid/ghost/transparent ONLY', async () => {});
});
```

**Agregar devDependency:** `"vitest": "^2.0.0"`

**NX target test:**
```json
{
  "test": {
    "command": "vitest run",
    "options": { "cwd": "tools/mcp-server" }
  }
}
```

### Fase 7 — Verificación

1. **TypeScript:** `pnpm nx build tucu-ui-mcp` — 0 errores
2. **Tests:** `pnpm nx test tucu-ui-mcp` — 100% pass
3. **Handshake:** Server responde a `initialize` con serverInfo correcto
4. **Tools/list:** Retorna 4 tools con nombres y descriptions
5. **Tools/call:** `search_components({query: "input"})` → encuentra Input, InputSearcher
6. **Variantes correctas:** Button muestra `solid/ghost/transparent`, NUNCA `primary/outline`

## Resultado

```
tools/mcp-server/
├── package.json
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
├── tests/
│   ├── fuzzy-search.test.ts
│   └── component-tools.test.ts
└── src/
    ├── index.ts
    ├── server.ts
    ├── data/
    │   └── component-registry.ts
    ├── tools/
    │   └── component-tools.ts
    └── utils/
        └── fuzzy-search.ts
```

## Dependencias

```json
{
  "@modelcontextprotocol/sdk": "^1.12.0",
  "zod": "^3.23.0",
  "tsx": "^4.19.0",
  "typescript": "~5.7.0",
  "vitest": "^2.0.0"
}
```
