# Plan 02 — MCP Server for tucu-ui

**Spec:** docs/specs/02-mcp-server.md  
**Branch:** feat/mcp-server  
**Depende de:** Ninguna

---

## Estado inicial requerido

```bash
# Verificar que estamos en el branch correcto
git branch --show-current  # → feat/mcp-server (crear si no existe)

# Verificar que los SKILL.md existen
ls .github/skills/tucu-ui/SKILL.md
ls .github/skills/tucu-ui-catalog/SKILL.md

# Verificar props-metadata generado
ls ui/tucu-ui/src/demo/generated/props-metadata.ts
```

---

## Fase A — Scaffolding + Data Pipeline

### A.1 — Crear estructura de directorios

```bash
mkdir -p tools/mcp-server/src/{tools,resources,prompts,data,utils}
mkdir -p tools/mcp-server/scripts
```

### A.2 — Crear `tools/mcp-server/package.json`

```json
{
  "name": "@e-burgos/tucu-ui-mcp",
  "version": "1.0.0",
  "description": "MCP server for @e-burgos/tucu-ui component library — AI agents can query components, props, examples, and patterns",
  "author": "Esteban Burgos",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.js",
  "bin": {
    "tucu-ui-mcp": "./dist/index.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/e-burgos/tucu-ui",
    "directory": "tools/mcp-server"
  },
  "keywords": ["mcp", "tucu-ui", "ai", "components", "model-context-protocol"],
  "homepage": "https://tucu-ui.netlify.app",
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc && node scripts/copy-data.js",
    "build:registry": "tsx scripts/build-registry.ts",
    "inspect": "npx @modelcontextprotocol/inspector tsx src/index.ts",
    "prepublishOnly": "pnpm build"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "tsx": "^4.0.0",
    "@types/node": "^22.0.0"
  },
  "files": ["dist/", "README.md", "LICENSE"]
}
```

### A.3 — Crear `tools/mcp-server/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "scripts"]
}
```

### A.4 — Crear `scripts/build-registry.ts`

Este script parsea los SKILL.md files y genera los registries tipados.

**Input:**

- `.github/skills/tucu-ui-catalog/SKILL.md` → component + hook data
- `ui/tucu-ui/src/demo/generated/props-metadata.ts` → props detallados
- `.github/skills/tucu-ui-forms/SKILL.md` → form patterns
- `.github/skills/tucu-ui-routing/SKILL.md` → routing patterns
- `.github/skills/tucu-ui-design-system/SKILL.md` → theming patterns

**Output:**

- `src/data/component-registry.ts` — Array de ComponentEntry
- `src/data/hooks-registry.ts` — Array de HookEntry
- `src/data/patterns-registry.ts` — Array de PatternEntry
- `src/data/categories-registry.ts` — Category index with counts

**Estrategia de parsing:**

1. Leer el SKILL.md del catalog
2. Parsear las tablas markdown (split por `|`, extract headers)
3. Extraer ejemplos de código (bloques ````tsx`)
4. Cruzar con props-metadata para detalles de props
5. Generar archivos TS con `export const` tipado

### A.5 — Crear tipos base (`src/data/types.ts`)

```typescript
export interface ComponentEntry {
  name: string;
  exportName: string;
  category: string;
  description: string;
  props: PropEntry[];
  propsInterface: string;
  example: string;
  relatedComponents: string[];
  tags: string[];
}

export interface PropEntry {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface HookEntry {
  name: string;
  signature: string;
  returnType: string;
  description: string;
  example: string;
  category: string;
}

export interface PatternEntry {
  id: string;
  name: string;
  description: string;
  steps: string[];
  code: string;
  relatedSkill: string;
}

export interface CategoryEntry {
  name: string;
  label: string;
  componentCount: number;
  components: string[];
}
```

### A.6 — Verificación Fase A

```bash
cd tools/mcp-server
pnpm install
pnpm build:registry
# Debe generar src/data/*.ts sin errores
# Verificar que component-registry tiene ~85 entries
```

---

## Fase B — Core Tools

### B.1 — Server base (`src/server.ts`)

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function createServer() {
  const server = new McpServer({
    name: 'tucu-ui',
    version: '1.0.0',
    description: 'MCP server for @e-burgos/tucu-ui component library',
  });

  // Register tools, resources, prompts here
  return server;
}
```

### B.2 — Entry point (`src/index.ts`)

```typescript
#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
```

### B.3 — Implementar tools

Cada tool en `src/tools/`:

1. **`list-categories.ts`** — Lee `categories-registry`, retorna resumen
2. **`get-component.ts`** — Busca por nombre exacto en `component-registry`
3. **`search-components.ts`** — Fuzzy search por query + filtro por category
4. **`get-props.ts`** — Busca component, retorna su array de props + interface
5. **`get-example.ts`** — Busca component o pattern, retorna code example
6. **`get-hook.ts`** — Busca en `hooks-registry` por nombre

**Patrón para cada tool:**

```typescript
import { z } from 'zod';
import { componentRegistry } from '../data/component-registry.js';

export const getComponentTool = {
  name: 'get_component',
  description: 'Get detailed information about a tucu-ui component by name',
  inputSchema: z.object({
    name: z.string().describe('Component name, e.g. "Button", "LineChart", "Modal"'),
  }),
  handler: async ({ name }: { name: string }) => {
    const component = componentRegistry.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (!component) {
      return { content: [{ type: 'text', text: `Component "${name}" not found. Use list_categories to see available components.` }] };
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(component, null, 2),
        },
      ],
    };
  },
};
```

### B.4 — Utilidad de búsqueda (`src/utils/search.ts`)

```typescript
export function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return true;
  // Simple Levenshtein distance check for typos
  if (q.length > 3 && levenshtein(q, t) <= 2) return true;
  return false;
}

export function searchComponents(query: string, category?: string) {
  let results = componentRegistry;
  if (category) {
    results = results.filter((c) => c.category === category);
  }
  if (query) {
    results = results.filter((c) => fuzzyMatch(query, c.name) || fuzzyMatch(query, c.description) || c.tags.some((t) => fuzzyMatch(query, t)));
  }
  return results;
}
```

### B.5 — Verificación Fase B

```bash
# Arrancar el server
pnpm dev
# En otra terminal, testear con Inspector
npx @modelcontextprotocol/inspector tsx src/index.ts

# Verificar cada tool:
# - list_categories → 21 categories
# - get_component {name: "Button"} → full info
# - search_components {query: "chart"} → 6+ results
# - get_props {component: "LineChart"} → props array
# - get_hook {name: "useBreakpoint"} → hook info
```

---

## Fase C — Resources + Prompts

### C.1 — Resource providers (`src/resources/skills.ts`)

Expone cada SKILL.md como resource URI:

```typescript
const skillResources = [
  { uri: 'tucu-ui://skills/overview', name: 'Overview', path: 'tucu-ui/SKILL.md' },
  { uri: 'tucu-ui://skills/catalog', name: 'Component Catalog', path: 'tucu-ui-catalog/SKILL.md' },
  { uri: 'tucu-ui://skills/forms', name: 'Form System', path: 'tucu-ui-forms/SKILL.md' },
  // ... etc
];
```

**Nota:** Los resources se embeben en el bundle para que funcione sin acceso al repo (para npm publish).

### C.2 — Implementar `get_pattern` tool

Patterns pre-definidos:

- `standalone-setup` — Setup ThemeProvider con menuItems
- `mfe-setup` — Setup ThemeProvider para micro-frontend
- `form-validation` — Form + validationSchema pattern
- `theming` — useTheme + color presets
- `dark-mode` — SwitchMode + programmatic toggle
- `routing-nested` — Nested routes con dropdownItems
- `auth-guard` — Protected routes pattern
- `chart-dashboard` — Multiple charts composition

### C.3 — Prompt templates (`src/prompts/`)

Cada prompt template:

- Recibe argumentos del usuario
- Selecciona componentes relevantes del registry
- Genera un prompt optimizado con imports + code + guidelines

### C.4 — Verificación Fase C

```bash
# Inspector: verificar resources listados
# Inspector: verificar get_pattern funciona
# Inspector: verificar prompts aparecen y generan output
```

---

## Fase D — Integration + Polish

### D.1 — Configs locales del workspace

Crear `.vscode/mcp.json`:

```json
{
  "servers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["tsx", "tools/mcp-server/src/index.ts"],
      "cwd": "${workspaceFolder}"
    }
  }
}
```

Actualizar `.cursor/mcp.json` (si existe, o crear):

```json
{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["tsx", "tools/mcp-server/src/index.ts"],
      "cwd": "."
    }
  }
}
```

### D.2 — Script en root package.json

```json
{
  "scripts": {
    "mcp:dev": "tsx tools/mcp-server/src/index.ts",
    "mcp:inspect": "npx @modelcontextprotocol/inspector tsx tools/mcp-server/src/index.ts",
    "mcp:build-registry": "tsx tools/mcp-server/scripts/build-registry.ts"
  }
}
```

### D.3 — README.md del MCP

Incluir:

- Qué es y qué hace
- Instalación rápida: `npx -y @e-burgos/tucu-ui-mcp`
- Lista de tools disponibles con descripción
- Configuración para cada IDE (VS Code, Cursor, Claude Desktop)
- Desarrollo local
- Ejemplos de queries

### D.4 — Test E2E manual

Checklist:

- [ ] Server arranca sin errores
- [ ] Todas las tools responden
- [ ] Resources se listan correctamente
- [ ] Prompts aparecen en la lista
- [ ] Funciona desde VS Code Copilot (si MCP habilitado)
- [ ] Funciona desde Cursor

---

## Fase E — Publish & Distribution

### E.1 — Preparar para npm

- Verificar que `pnpm build` genera `dist/` correctamente
- Verificar que `dist/index.js` tiene shebang: `#!/usr/bin/env node`
- Los data registries deben estar incluidos en el bundle (no leer del filesystem)
- `package.json` → `"files": ["dist/", "README.md"]`

### E.2 — Publicar

```bash
cd tools/mcp-server
pnpm build
pnpm npm publish --access public
```

### E.3 — Verificar instalación externa

```bash
# En un directorio fuera del repo
npx -y @e-burgos/tucu-ui-mcp
# Debe arrancar sin error

# Testear con inspector
npx @modelcontextprotocol/inspector npx -y @e-burgos/tucu-ui-mcp
```

### E.4 — Publicar en Smithery

```bash
# Seguir instrucciones de https://smithery.ai/docs/publishing
```

### E.5 — Documentar en README principal

Agregar sección en el README.md del repo:

```markdown
## 🤖 MCP Server (AI Integration)

Any AI agent can query tucu-ui components, props, and patterns:

\`\`\`bash
npx -y @e-burgos/tucu-ui-mcp
\`\`\`

Add to your MCP config:
\`\`\`json
{ "command": "npx", "args": ["-y", "@e-burgos/tucu-ui-mcp"] }
\`\`\`
```

---

## Criterios de aceptación

- [ ] `pnpm mcp:dev` arranca sin errores
- [ ] MCP Inspector muestra 7 tools + 10 resources + 3 prompts
- [ ] `get_component` funciona para los 85+ componentes
- [ ] `search_components` retorna resultados relevantes
- [ ] `npx -y @e-burgos/tucu-ui-mcp` funciona post-publish
- [ ] Config files creados para VS Code, Cursor, Claude Desktop

---

## Verificación

```bash
# Build registry
pnpm mcp:build-registry

# Run server
pnpm mcp:dev

# Inspect (en otra terminal)
pnpm mcp:inspect

# Build para publish
cd tools/mcp-server && pnpm build
```

---

## Post-implementación

- [ ] Actualizar AGENTS.md con referencia al MCP
- [ ] Actualizar copilot-instructions.md con info del MCP
- [ ] Actualizar .github/skills/tucu-ui/SKILL.md mencionando el MCP disponible
- [ ] Regenerar props si hubo cambios: `pnpm tsx scripts/generate-props.ts`
