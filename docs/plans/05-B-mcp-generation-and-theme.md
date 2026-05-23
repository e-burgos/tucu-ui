# Plan 05-B — Generation Tools + Theme

> **Estado:** 🔲 PENDIENTE  
> **Spec:** [05-tucu-ui-mcp-agentic-server.md](../specs/05-tucu-ui-mcp-agentic-server.md)  
> **Prerequisito:** Plan 05-A ✅

## Objetivo

Agregar 5 tools de generación de código y registries de theme/icons para que los agentes puedan producir código listo para usar con variantes correctas, theming integrado, y patrones de formularios/charts.

## Fases de Implementación

### Fase 1 — Theme Registry

**Archivo:** `tools/mcp-server/src/data/theme-registry.ts`

**Estructura:**
```typescript
export interface ThemeToken {
  name: string;
  cssVariable: string;
  category: 'color' | 'spacing' | 'typography' | 'radius' | 'shadow';
  lightValue: string;
  darkValue: string;
  description: string;
}

export interface ThemePreset {
  name: string;
  description: string;
  colors: Record<string, string>;
  fontFamily: string;
}

export interface LayoutVariant {
  name: string;
  description: string;
  supportsDarkMode: boolean;
  example: string;
}
```

**Contenido:**
- Tokens: background, foreground, primary, secondary, muted, accent, border, ring, etc.
- Presets: default, ocean, forest, sunset, midnight, lavender, etc.
- Layouts: DashboardLayout, SidebarLayout, FullPageLayout, StackedLayout
- Typography: fontFamily, fontSize scale, fontWeight scale
- Spacing: basado en rem (0.25rem increments)

### Fase 2 — Icon Registry

**Archivo:** `tools/mcp-server/src/data/icon-registry.ts`

**Estructura:**
```typescript
export interface IconEntry {
  name: string;
  category: string;
  keywords: string[];
  importPath: string;
  example: string;
}
```

**Contenido:**
- Iconos de Lucide React (librería usada por tucu-ui)
- Categorías: actions, navigation, media, communication, files, social, weather, devices, etc.
- Keywords para búsqueda semántica (ej: "trash" → delete, remove, discard)

### Fase 3 — Form Patterns Registry

**Archivo:** `tools/mcp-server/src/data/form-patterns.ts`

**Estructura:**
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

**Patrones incluidos:**
- Login form (email + password)
- Registration form (name + email + password + confirm)
- Contact form (name + email + subject + message)
- Settings form (various inputs, selects, toggles)
- Search/filter form (InputSearcher + Select + DatePicker)
- CRUD form (dynamic fields based on entity)

### Fase 4 — Generation Utilities

**Archivo:** `tools/mcp-server/src/utils/code-generator.ts`

Helper para interpolación de templates que mantiene la generación determinista:

```typescript
export interface TemplateContext {
  componentName: string;
  props?: Record<string, string>;
  imports?: string[];
  children?: string;
}

export function renderTemplate(template: string, ctx: TemplateContext): string {
  return template
    .replace(/\{\{componentName\}\}/g, ctx.componentName)
    .replace(/\{\{props\}\}/g, formatProps(ctx.props || {}))
    .replace(/\{\{imports\}\}/g, (ctx.imports || []).join('\n'))
    .replace(/\{\{children\}\}/g, ctx.children || '');
}

function formatProps(props: Record<string, string>): string {
  return Object.entries(props)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
}
```

**Archivo:** `tools/mcp-server/src/utils/version.ts`

Lee la versión del package.json para health checks y serverInfo:

```typescript
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), 'utf-8'));

export const VERSION: string = pkg.version;
```

### Fase 5 — Generation Tools

**Archivo:** `tools/mcp-server/src/tools/generation-tools.ts`

**Función:** `registerGenerationTools(server: McpServer): void`

#### Tool 1: `generate_component`
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

#### Tool 2: `generate_form`
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

#### Tool 3: `generate_page`
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

#### Tool 4: `generate_chart`
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

#### Tool 5: `search_icons`
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

### Fase 6 — Server Integration

**Actualizar `server.ts`:**
```typescript
import { registerComponentTools } from './tools/component-tools.js';
import { registerGenerationTools } from './tools/generation-tools.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({ name: 'tucu-ui-mcp', version: '0.2.0' });
  registerComponentTools(server);
  registerGenerationTools(server);
  return server;
}
```

### Fase 7 — Tests

**Archivo:** `tools/mcp-server/tests/generation-tools.test.ts`

```typescript
import { describe, it, expect } from 'vitest';

describe('Generation Tools', () => {
  it('generate_component produces valid JSX with correct variants', async () => {
    // Button → variant="solid" NOT "primary"
  });

  it('generate_component output is deterministic (same input → same output)', async () => {});

  it('generate_form with login pattern includes email + password + Zod schema', async () => {});

  it('generate_form output includes Form wrapper from tucu-ui', async () => {});

  it('generate_page with dashboard layout uses DashboardLayout', async () => {});

  it('generate_chart includes ResponsiveContainer + theme tokens', async () => {});

  it('search_icons finds related icons by keyword', async () => {});

  it('generated code NEVER contains invalid variants', async () => {
    // Test all 5 tools for absence of "primary", "outline", "destructive", "lg", "sm"
  });
});
```

### Fase 8 — Verificación

1. **Build:** `pnpm nx build tucu-ui-mcp` — 0 errores
2. **Tests:** `pnpm nx test tucu-ui-mcp` — 100% pass
3. **Tools count:** `tools/list` retorna 9 tools (4 + 5)
4. **generate_component:** `Button` → produce JSX con variant="solid"
5. **generate_form:** login pattern → produce Form con Input email + password + Zod schema
6. **generate_chart:** line chart → produce Recharts con ResponsiveContainer + theme colors
7. **search_icons:** "arrow" → encuentra ArrowLeft, ArrowRight, ArrowUp, etc.
8. **Variantes:** NINGÚN código generado usa variantes inválidas

## Resultado

```
tools/mcp-server/
├── tests/
│   ├── fuzzy-search.test.ts       (de Plan A)
│   ├── component-tools.test.ts    (de Plan A)
│   └── generation-tools.test.ts   (nuevo)
└── src/
    ├── data/
    │   ├── component-registry.ts  (existente)
    │   ├── theme-registry.ts      (nuevo)
    │   ├── icon-registry.ts       (nuevo)
    │   └── form-patterns.ts       (nuevo)
    ├── tools/
    │   ├── component-tools.ts     (existente)
    │   └── generation-tools.ts    (nuevo)
    ├── utils/
    │   ├── fuzzy-search.ts        (existente)
    │   ├── code-generator.ts      (nuevo)
    │   └── version.ts             (nuevo)
    └── server.ts                  (actualizado)
```

## Notas

- La generación de código es **determinista** — mismo input → mismo output
- Los templates usan string interpolation (no AST generation) para simplicidad
- `generate_form` sigue el patrón de `@e-burgos/tucu-ui` Form wrapper (react-hook-form)
- Todos los charts usan tokens CSS de tucu-ui para colores (`hsl(var(--primary))`)
