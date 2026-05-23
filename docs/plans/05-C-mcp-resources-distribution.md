# Plan 05-C — Resources + Prompts + Distribution

> **Estado:** 🔲 PENDIENTE  
> **Spec:** [05-tucu-ui-mcp-agentic-server.md](../specs/05-tucu-ui-mcp-agentic-server.md)  
> **Prerequisito:** Plan 05-B

## Objetivo

Exponer 12 resources estáticos consultables, 8 prompts para workflows guiados, y preparar el package para distribución npm con configuraciones para VS Code, Cursor y Claude Desktop.

## Fases de Implementación

### Fase 1 — Resource Infrastructure

**Archivo:** `tools/mcp-server/src/resources/index.ts`

**Patrón de registro:**
```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerResources(server: McpServer): void {
  server.resource(
    'component-catalog',
    'tucu://catalog',
    { description: 'Complete component catalog with variants and examples' },
    async () => ({
      contents: [{ uri: 'tucu://catalog', mimeType: 'application/json', text: '...' }]
    })
  );
  // ... more resources
}
```

### Fase 2 — Resources (12)

Cada resource es un archivo separado que exporta una función `getContent(): string`.

| # | Archivo | URI | Contenido |
|---|---------|-----|-----------|
| 1 | `resources/catalog.ts` | `tucu://catalog` | JSON del component registry completo |
| 2 | `resources/tokens.ts` | `tucu://tokens` | Design tokens (CSS variables + valores) |
| 3 | `resources/forms.ts` | `tucu://forms` | Form patterns + validación + useFormContext |
| 4 | `resources/routing.ts` | `tucu://routing` | Guía routing: standalone + MFE, ReactRouter |
| 5 | `resources/layouts.ts` | `tucu://layouts` | Layouts disponibles + configuración + props |
| 6 | `resources/theme.ts` | `tucu://theme` | useTheme hook, presets, dark/light switch |
| 7 | `resources/charts.ts` | `tucu://charts` | Recharts: tipos, props, theming, performance |
| 8 | `resources/icons.ts` | `tucu://icons` | Catálogo de iconos con categorías |
| 9 | `resources/migration.ts` | `tucu://migration` | Breaking changes entre versiones |
| 10 | `resources/best-practices.ts` | `tucu://best-practices` | Do's/Don'ts, anti-patterns, warnings |
| 11 | `resources/changelog.ts` | `tucu://changelog` | Últimas versiones + cambios |
| 12 | `resources/quickstart.ts` | `tucu://quickstart` | Setup rápido: install, provider, primer componente |

**Formato de contenido:** Markdown estructurado embebido en JSON (legible por agentes).

**Ejemplo de resource:**
```typescript
// resources/quickstart.ts
export function getQuickStartContent(): string {
  return `# Quick Start — @e-burgos/tucu-ui

## Installation
\`\`\`bash
pnpm add @e-burgos/tucu-ui
\`\`\`

## Setup
\`\`\`tsx
import { ThemeProvider } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* your app */}
    </ThemeProvider>
  );
}
\`\`\`

## First Component
\`\`\`tsx
import { Button } from '@e-burgos/tucu-ui';

<Button variant="solid" size="medium">Click me</Button>
\`\`\`

## Important Warnings
- NEVER use variant="primary" or "outline" — causes runtime crash
- NEVER use size="lg" or "sm" — use "large", "medium", "small", "mini", "tiny"
- ALWAYS import from '@e-burgos/tucu-ui' (single entry point)
`;
}
```

### Fase 3 — Prompt Infrastructure

**Archivo:** `tools/mcp-server/src/prompts/index.ts`

**Patrón de registro:**
```typescript
export function registerPrompts(server: McpServer): void {
  server.prompt(
    'create-component',
    'Guided workflow to create a new component usage with correct variants',
    [
      { name: 'component', description: 'Component name', required: true },
      { name: 'context', description: 'Usage context', required: false },
    ],
    async ({ component, context }) => ({
      messages: [
        { role: 'user', content: { type: 'text', text: `...prompt template...` } }
      ]
    })
  );
}
```

### Fase 4 — Prompts (8)

| # | Prompt | Argumentos | Propósito |
|---|--------|-----------|-----------|
| 1 | `create-component` | `component`, `context?` | Genera componente con props correctas |
| 2 | `create-form` | `fields`, `validation?` | Genera formulario con Form + inputs + Zod |
| 3 | `create-page` | `name`, `layout`, `sections?` | Genera página con layout y routing |
| 4 | `debug-variant` | `error`, `component?` | Diagnostica "Cannot read properties of undefined" |
| 5 | `migrate-component` | `component`, `fromVersion`, `toVersion` | Guía migración con breaking changes |
| 6 | `theme-setup` | `preset?`, `darkMode?` | Configura ThemeProvider + tokens |
| 7 | `accessibility-check` | `component`, `code?` | Verifica aria-labels, keyboard nav, contrast |
| 8 | `performance-review` | `code` | Analiza renders innecesarios, bundle size |

**Ejemplo de prompt template:**
```typescript
// prompts/debug-variant.ts
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

### Fase 5 — Server Integration

**Actualizar `server.ts`:**
```typescript
import { registerComponentTools } from './tools/component-tools.js';
import { registerGenerationTools } from './tools/generation-tools.js';
import { registerResources } from './resources/index.js';
import { registerPrompts } from './prompts/index.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({ name: 'tucu-ui-mcp', version: '0.3.0' });
  registerComponentTools(server);
  registerGenerationTools(server);
  registerResources(server);
  registerPrompts(server);
  return server;
}
```

### Fase 6 — Distribution Config

**Archivos de configuración para clientes:**

#### VS Code (`.vscode/mcp.json` en proyecto del usuario):
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

#### Cursor (`.cursor/mcp.json`):
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

#### Claude Desktop (`claude_desktop_config.json`):
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

**README.md del package:** Instrucciones de instalación + configuración + ejemplos de uso.

### Fase 7 — Tests

**Archivos:**
- `tools/mcp-server/tests/resources.test.ts`
- `tools/mcp-server/tests/prompts.test.ts`

```typescript
// tests/resources.test.ts
import { describe, it, expect } from 'vitest';

describe('Resources', () => {
  it('registers 12 resources', async () => {});
  it('tucu://catalog returns valid JSON with all components', async () => {});
  it('tucu://quickstart returns actionable markdown', async () => {});
  it('tucu://tokens returns all CSS variables with values', async () => {});
  it('tucu://forms returns patterns with Zod schemas', async () => {});
  it('all resources have non-empty content', async () => {});
});
```

```typescript
// tests/prompts.test.ts
import { describe, it, expect } from 'vitest';

describe('Prompts', () => {
  it('registers 8 prompts', async () => {});
  it('debug-variant includes valid variant list', async () => {});
  it('create-component generates useful template', async () => {});
  it('theme-setup includes ThemeProvider configuration', async () => {});
  it('prompts accept correct argument schemas', async () => {});
});
```

### Fase 8 — Verificación

1. **Build:** 0 errores
2. **Tests:** `pnpm nx test tucu-ui-mcp` — 100% pass
3. **Resources:** `resources/list` retorna 12 resources con URIs correctos
4. **Resource read:** `tucu://catalog` retorna JSON del catálogo completo
5. **Prompts:** `prompts/list` retorna 8 prompts
6. **Prompt get:** `create-component` con `{component: "Button"}` retorna template útil
7. **Integration:** Configurar en VS Code local y verificar que el server se conecta

## Resultado

```
tools/mcp-server/
├── tests/
│   ├── fuzzy-search.test.ts       (de Plan A)
│   ├── component-tools.test.ts    (de Plan A)
│   ├── generation-tools.test.ts   (de Plan B)
│   ├── resources.test.ts          (nuevo)
│   └── prompts.test.ts            (nuevo)
└── src/
    ├── resources/
    │   ├── index.ts          (registra todos)
    │   ├── catalog.ts
    │   ├── tokens.ts
    │   ├── forms.ts
    │   ├── routing.ts
    │   ├── layouts.ts
    │   ├── theme.ts
    │   ├── charts.ts
    │   ├── icons.ts
    │   ├── migration.ts
    │   ├── best-practices.ts
    │   ├── changelog.ts
    │   └── quickstart.ts
    ├── prompts/
    │   ├── index.ts          (registra todos)
    │   ├── create-component.ts
    │   ├── create-form.ts
    │   ├── create-page.ts
    │   ├── debug-variant.ts
    │   ├── migrate-component.ts
    │   ├── theme-setup.ts
    │   ├── accessibility-check.ts
    │   └── performance-review.ts
    └── server.ts             (actualizado v0.3.0)
```
