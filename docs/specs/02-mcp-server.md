# Spec 02 — MCP Server for tucu-ui

**Fecha:** 2026-05-06  
**Versión:** 1.0  
**Estado:** Propuesto  
**Branch:** `feat/mcp-server`  
**Dependencias:** Ninguna (standalone tooling)

---

## Resumen

Crear un servidor MCP (Model Context Protocol) que exponga el conocimiento completo de `@e-burgos/tucu-ui` a cualquier agente AI compatible (Claude, Copilot, Cursor, etc.). El servidor permite consultar componentes, props, ejemplos, patrones de uso, y guías de arquitectura programáticamente.

---

## Motivación

- Los SKILL.md actuales son estáticos y dependen de que el agente los lea completos
- Un MCP server permite queries específicos: "¿qué props tiene LineChart?" → respuesta exacta
- Facilita integración con cualquier IDE/agente que soporte MCP (VS Code, Cursor, Claude Desktop, etc.)
- Permite publicar el MCP como paquete npm independiente para usuarios externos de tucu-ui

---

## Arquitectura

### Ubicación en el monorepo

```
tools/
  mcp-server/
    src/
      index.ts                    # Entry point — server setup
      server.ts                   # MCP server instance & config
      tools/                      # Tool handlers
        get-component.ts          # Get component details by name
        search-components.ts      # Search components by query/category
        get-props.ts              # Get props interface for a component
        get-example.ts            # Get usage example for a component
        get-hook.ts               # Get hook details
        get-pattern.ts            # Get architecture/integration pattern
        list-categories.ts        # List all component categories
      resources/                  # Resource providers
        skills.ts                 # Expose SKILL.md files as resources
        changelog.ts              # Expose CHANGELOG
      prompts/                    # Prompt templates
        build-ui.ts               # Template: build a UI with tucu-ui
        create-form.ts            # Template: create a form
        setup-app.ts              # Template: setup standalone/mfe app
      data/                       # Pre-processed data (generated)
        component-registry.ts     # Component metadata index
        props-registry.ts         # Props interfaces index
        examples-registry.ts      # Code examples index
        hooks-registry.ts         # Hooks metadata
      utils/
        search.ts                 # Fuzzy search utility
        markdown-parser.ts        # Parse SKILL.md into structured data
    scripts/
      build-registry.ts           # Script to generate data/ from SKILL.md + source
    package.json
    tsconfig.json
    README.md
```

### Transporte

- **Primario:** `stdio` — para uso local con VS Code, Cursor, Claude Desktop
- **Secundario:** `streamable-http` — para uso remoto/compartido (futuro)

### Data pipeline

```
Source of truth (SKILL.md files + source code)
       │
       ▼
  build-registry.ts (pre-processing script)
       │
       ▼
  data/*.ts (structured registries — components, props, hooks, examples)
       │
       ▼
  MCP Tools (query the registries at runtime)
```

---

## Tools (herramientas MCP)

### `get_component`

Retorna información completa de un componente por nombre.

```typescript
// Input
{ name: string }  // e.g. "Button", "LineChart", "Modal"

// Output
{
  name: string;
  category: string;              // "buttons", "charts", "dialog", etc.
  description: string;
  props: PropDefinition[];
  importStatement: string;       // import { Button } from '@e-burgos/tucu-ui'
  example: string;               // Code example
  relatedComponents: string[];   // ["Hamburger", "TopupButton"]
  since?: string;                // Version added
}
```

### `search_components`

Búsqueda por query de texto libre o por categoría.

```typescript
// Input
{
  query?: string;      // "chart", "form input", "navigation"
  category?: string;   // "charts", "inputs", "dialog", "auth", etc.
  limit?: number;      // default 10
}

// Output
{ results: ComponentSummary[] }
```

### `get_props`

Retorna la interfaz de props de un componente con tipos TypeScript.

```typescript
// Input
{ component: string }  // "BarChart", "Input", "Modal"

// Output
{
  component: string;
  propsInterface: string;       // TypeScript interface as string
  props: {
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
  }[];
  extendsFrom?: string;         // "ChartBaseProps", "InputHTMLAttributes"
}
```

### `get_example`

Retorna un ejemplo de código funcional para un componente o patrón.

```typescript
// Input
{
  component?: string;   // "PieChart"
  pattern?: string;     // "form-with-validation", "dark-mode-setup", "mfe-routing"
}

// Output
{
  title: string;
  description: string;
  code: string;          // Complete, copy-paste-ready TSX
  imports: string[];     // Required imports
  dependencies?: string[]; // External deps if any
}
```

### `get_hook`

Retorna detalles de un hook.

```typescript
// Input
{
  name: string;
} // "useChartTheme", "useBreakpoint", "useToastStore"

// Output
{
  name: string;
  signature: string;
  returnType: string;
  description: string;
  example: string;
}
```

### `get_pattern`

Retorna un patrón de arquitectura o integración.

```typescript
// Input
{
  pattern: string  // "standalone-setup", "mfe-setup", "form-validation",
                   // "theming", "dark-mode", "routing-nested", "auth-guard"
}

// Output
{
  name: string;
  description: string;
  steps: string[];
  code: string;
  relatedSkill: string;  // Reference to SKILL.md for deep dive
}
```

### `list_categories`

Lista todas las categorías de componentes disponibles.

```typescript
// Input: (none)

// Output
{
  categories: {
    name: string;            // "charts"
    label: string;           // "Charts & Data Visualization"
    componentCount: number;  // 9
    components: string[];    // ["LineChart", "BarChart", ...]
  }[];
  totalComponents: number;
  totalHooks: number;
}
```

---

## Resources (recursos MCP)

| URI                              | Descripción                                 |
| -------------------------------- | ------------------------------------------- |
| `tucu-ui://skills/overview`      | Contenido de tucu-ui/SKILL.md               |
| `tucu-ui://skills/catalog`       | Contenido de tucu-ui-catalog/SKILL.md       |
| `tucu-ui://skills/forms`         | Contenido de tucu-ui-forms/SKILL.md         |
| `tucu-ui://skills/design-system` | Contenido de tucu-ui-design-system/SKILL.md |
| `tucu-ui://skills/routing`       | Contenido de tucu-ui-routing/SKILL.md       |
| `tucu-ui://skills/standalone`    | Contenido de tucu-ui-standalone/SKILL.md    |
| `tucu-ui://skills/mfe`           | Contenido de tucu-ui-mfe/SKILL.md           |
| `tucu-ui://skills/recharts`      | Contenido de recharts/SKILL.md              |
| `tucu-ui://changelog`            | CHANGELOG.md                                |
| `tucu-ui://version`              | Versión actual + info del package           |

---

## Prompts (templates MCP)

### `build-ui`

```typescript
// Arguments
{
  description: string;  // "A dashboard with sales chart and user table"
  architecture?: "standalone" | "mfe";
}

// Generates a prompt with:
// - Relevant components selection
// - Import statements
// - Architecture setup code
// - Semantic token usage guidelines
```

### `create-form`

```typescript
// Arguments
{
  fields: string;  // "name, email, password, age"
  validation?: boolean;
}

// Generates a prompt with Form + inputs + validationSchema
```

### `setup-app`

```typescript
// Arguments
{
  mode: "standalone" | "mfe";
  features?: string[];  // ["auth", "dark-mode", "charts"]
}

// Generates complete App.tsx + ThemeProvider setup
```

---

## Data Registry Schema

### ComponentEntry

```typescript
interface ComponentEntry {
  name: string;
  exportName: string;
  category: string;
  subcategory?: string;
  description: string;
  props: PropEntry[];
  propsInterfaceName: string;
  propsInterface: string; // Raw TS interface
  example: string;
  relatedComponents: string[];
  since: string;
  tags: string[]; // ["chart", "data-viz", "themed"]
}

interface PropEntry {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}
```

### HookEntry

```typescript
interface HookEntry {
  name: string;
  signature: string;
  returnType: string;
  description: string;
  example: string;
  category: string; // "responsive", "state", "lifecycle", "theme"
  source: 'custom' | 're-export';
}
```

---

## Fases de implementación

### Fase A — Scaffolding + Data Pipeline

- [ ] Crear estructura de directorios `tools/mcp-server/`
- [ ] Configurar `package.json` con deps: `@modelcontextprotocol/sdk`, `zod`, `typescript`
- [ ] Configurar `tsconfig.json`
- [ ] Crear `scripts/build-registry.ts` — parsea SKILL.md files y genera `data/*.ts`
- [ ] Crear registries iniciales: `component-registry.ts`, `hooks-registry.ts`
- [ ] Verificar: `pnpm tsx scripts/build-registry.ts` genera data correcta

### Fase B — Core Tools

- [ ] Implementar server base (`server.ts` + `index.ts`) con transporte stdio
- [ ] Implementar `list_categories` tool
- [ ] Implementar `get_component` tool
- [ ] Implementar `search_components` tool con fuzzy search
- [ ] Implementar `get_props` tool
- [ ] Implementar `get_example` tool
- [ ] Implementar `get_hook` tool
- [ ] Verificar: todas las tools responden correctamente via MCP Inspector

### Fase C — Resources + Prompts

- [ ] Implementar resource providers (skills como resources)
- [ ] Implementar `get_pattern` tool
- [ ] Implementar prompt templates (`build-ui`, `create-form`, `setup-app`)
- [ ] Verificar: resources accesibles, prompts generan output válido

### Fase D — Integration + Polish

- [ ] Crear configuración para VS Code (`mcp.json` o settings)
- [ ] Crear configuración para Cursor (`.cursor/mcp.json`)
- [ ] Crear configuración para Claude Desktop (`claude_desktop_config.json` example)
- [ ] Agregar `bin` entry en package.json para ejecución global
- [ ] Escribir README.md con instrucciones de setup
- [ ] Agregar script en root `package.json`: `"mcp:dev": "tsx tools/mcp-server/src/index.ts"`
- [ ] Testear E2E con MCP Inspector

### Fase E — Publish & Distribution

- [ ] Mover MCP a estructura publicable con `bin` entry: `"tucu-ui-mcp": "./dist/index.js"`
- [ ] Build step: compilar TS a JS con bundled data (sin dependencias externas en runtime beyond SDK)
- [ ] Publicar como `@e-burgos/tucu-ui-mcp` en npm (`pnpm npm publish --access public`)
- [ ] Verificar instalación global: `npx -y @e-burgos/tucu-ui-mcp` arranca el server
- [ ] Agregar a Smithery (MCP marketplace): `npx -y @smithery/cli install @e-burgos/tucu-ui-mcp`
- [ ] Documentar en README del repo principal la instalación one-liner
- [ ] Agregar transporte HTTP streamable para uso remoto (opcional, post-publish)

---

## Criterios de aceptación

- [ ] Server arranca con `pnpm tsx tools/mcp-server/src/index.ts` sin errores
- [ ] `list_categories` devuelve 21 categorías con conteos correctos
- [ ] `get_component` devuelve info precisa para los 85+ componentes
- [ ] `search_components` encuentra componentes por nombre parcial y por categoría
- [ ] `get_props` devuelve interfaces TypeScript correctas
- [ ] `get_example` devuelve código funcional importable desde `@e-burgos/tucu-ui`
- [ ] `get_hook` devuelve los 15 hooks documentados
- [ ] Resources exponen los SKILL.md files completos
- [ ] Prompts generan código que sigue las convenciones del proyecto
- [ ] Funciona con MCP Inspector (`npx @modelcontextprotocol/inspector`)
- [ ] Integrable con VS Code (Copilot MCP), Cursor, y Claude Desktop

---

## Out of scope

- Server HTTP para deployment en la nube (post Fase E)
- Dashboard web para explorar componentes (usar la demo app existente)
- Auto-update del registry cuando cambia el source (manual rebuild por ahora)
- Generación de componentes (el MCP es read-only, consulta)
- Testing automatizado del MCP (manual con Inspector)
- Autenticación/rate-limiting (stdio es local, no aplica)

---

## Decisiones de diseño

| #   | Decisión                                     | Alternativa                   | Razón                                                                             |
| --- | -------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 1   | Ubicar en `tools/mcp-server/`                | Crear un `packages/mcp/`      | Desarrollo local primero, luego se publica como `@e-burgos/tucu-ui-mcp` en Fase E |
| 2   | Pre-procesar data desde SKILL.md             | Leer SKILL.md en runtime      | Performance: evita parsear markdown en cada request                               |
| 3   | Usar `@modelcontextprotocol/sdk` TS          | Implementar protocolo raw     | SDK oficial, mantenido, type-safe                                                 |
| 4   | stdio como transporte primario               | HTTP desde el inicio          | stdio es estándar para uso local, 0 config de red                                 |
| 5   | Registries como TS files (no JSON)           | JSON/SQLite                   | Type-safe, importables directamente, tree-shakeable                               |
| 6   | Fuzzy search simple (includes + Levenshtein) | Embedding-based search        | Overkill para ~85 componentes, simple es suficiente                               |
| 7   | Nombres sin prefijo (`LineChart`)            | Con prefijo (`TucuLineChart`) | Refleja los exports reales de la librería                                         |

---

## Dependencias técnicas

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "tsx": "^4.0.0",
    "@types/node": "^22.0.0"
  }
}
```

---

## Configuración del cliente (ejemplos)

### Para usuarios externos (npm publicado — Fase E)

Cualquier persona puede usar el MCP sin clonar el repo:

```json
// VS Code, Cursor, o Claude Desktop
{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["-y", "@e-burgos/tucu-ui-mcp"]
    }
  }
}
```

O instalar globalmente:

```bash
npm install -g @e-burgos/tucu-ui-mcp
# Después en la config:
{ "command": "tucu-ui-mcp" }
```

### Para desarrollo local (dentro del monorepo)

#### VS Code (Copilot)

```json
// .vscode/mcp.json
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

#### Cursor

```json
// .cursor/mcp.json
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

#### Claude Desktop

```json
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["tsx", "/path/to/tucu-ui/tools/mcp-server/src/index.ts"]
    }
  }
}
```
