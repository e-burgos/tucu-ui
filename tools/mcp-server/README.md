# @e-burgos/tucu-ui-mcp

MCP (Model Context Protocol) server for the **@e-burgos/tucu-ui** component library. Gives AI assistants direct access to the component catalog, code generation, design tokens, and best practices — enabling agents to produce correct, type-safe UI code on the first try.

## Features

| Category         | Capabilities                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **7 Tools**      | `list_components`, `get_component`, `generate_component`, `generate_form`, `generate_page`, `generate_chart`, `search_icons`       |
| **12 Resources** | Catalog, tokens, forms, routing, layouts, theme, charts, icons, migration, best-practices, changelog, quickstart                   |
| **8 Prompts**    | create-component, create-form, create-page, debug-variant, migrate-component, theme-setup, accessibility-check, performance-review |
| **2 Transports** | Stdio (local) and Streamable HTTP (remote)                                                                                         |

## Quick Start

### Use with npx (stdio — recommended for local)

```bash
npx @e-burgos/tucu-ui-mcp
```

### Install globally

```bash
npm install -g @e-burgos/tucu-ui-mcp
tucu-ui-mcp          # stdio mode
tucu-ui-mcp-http     # HTTP mode (port 3100)
```

## Client Configuration

### VS Code (Copilot / Continue)

```jsonc
// .vscode/mcp.json
{
  "servers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"]
    }
  }
}
```

### Cursor

```jsonc
// .cursor/mcp.json
{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"]
    }
  }
}
```

### Claude Desktop

```jsonc
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"]
    }
  }
}
```

### Remote HTTP (Fly.io / Docker)

The `Bearer` token is the value you set in the `MCP_API_KEY` environment variable on the server. You choose any secure random string:

```bash
# Generate a secure token
openssl rand -base64 32
# Example output: k7Bz3xQ9m2Rp8vN1wY6tA4jL0hF5sKd+Xe2Uc7Ig=

# Set it on Fly.io
fly secrets set MCP_API_KEY="k7Bz3xQ9m2Rp8vN1wY6tA4jL0hF5sKd+Xe2Uc7Ig="

# Or in Docker
docker run -e MCP_API_KEY="k7Bz3xQ9m2Rp8vN1wY6tA4jL0hF5sKd+Xe2Uc7Ig=" -p 3100:3100 tucu-ui-mcp
```

Then use that same token in your client configuration:

```jsonc
{
  "mcpServers": {
    "tucu-ui": {
      "url": "https://tucu-ui-mcp.fly.dev/mcp",
      "headers": {
        "Authorization": "Bearer k7Bz3xQ9m2Rp8vN1wY6tA4jL0hF5sKd+Xe2Uc7Ig="
      }
    }
  }
}
```

> **Note:** If `MCP_API_KEY` is not set on the server, authentication is disabled (open access — suitable for local development only).

## Tools

### `list_components`

List available components, optionally filtered by category.

```
Input: { category?: string, limit?: number }
```

### `get_component`

Get full details of a component (fuzzy matched): variants, props, example code, warnings.

```
Input: { name: string }
```

### `generate_component`

Generate ready-to-use JSX with correct variants and imports.

```
Input: { component: string, props?: Record<string, string>, withWrapper?: boolean, theme?: string }
```

### `generate_form`

Generate a complete form with validation (Zod + react-hook-form).

```
Input: { pattern?: string, fields?: FieldDef[], withValidation?: boolean }
```

### `generate_page`

Generate a page component with layout and routing configuration.

```
Input: { name: string, layout: string, sections?: string[] }
```

### `generate_chart`

Generate a Recharts-based chart component with tucu-ui theming.

```
Input: { type: string, data?: object[] }
```

### `search_icons`

Search the icon catalog (97 native SVG + 1500+ Lucide).

```
Input: { query: string, limit?: number }
```

## Resources (tucu:// URIs)

| URI                     | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `tucu://catalog`        | Complete component catalog with variants and examples         |
| `tucu://tokens`         | Design tokens: CSS variables, colors, breakpoints, typography |
| `tucu://forms`          | Form patterns: validation, useFormContext, all inputs         |
| `tucu://routing`        | Routing guide: standalone, MFE, nested routes                 |
| `tucu://layouts`        | Layout system: admin, horizontal, clean, macOS, macOS Tahoe   |
| `tucu://theme`          | Theme system: useTheme, presets, dark/light mode              |
| `tucu://charts`         | Charts: Recharts wrappers, theming, performance               |
| `tucu://icons`          | Icon catalog: native SVG + Lucide icons                       |
| `tucu://migration`      | Migration guide: breaking changes between versions            |
| `tucu://best-practices` | Do's, don'ts, anti-patterns, common mistakes                  |
| `tucu://changelog`      | Latest versions and changes                                   |
| `tucu://quickstart`     | Quick start: install, setup, first component                  |

## Self-Hosting

### Docker

```bash
docker compose up -d
# or
docker build -t tucu-ui-mcp .
docker run -p 3100:3100 -e MCP_API_KEY=your-secret tucu-ui-mcp
```

### Fly.io

```bash
fly launch --no-deploy
fly secrets set MCP_API_KEY="your-secret"
fly deploy
```

## Security

- **Auth**: Bearer token via `MCP_API_KEY` env var (optional in dev, required in production)
- **Rate limiting**: 100 requests/minute per IP
- **Timing-safe** token comparison to prevent timing attacks
- **Non-root** Docker user
- **HTTPS** enforced on Fly.io

## Environment Variables

| Variable      | Default  | Description                                     |
| ------------- | -------- | ----------------------------------------------- |
| `PORT`        | `3100`   | HTTP server port                                |
| `MCP_API_KEY` | _(none)_ | Bearer token for auth. If unset, access is open |

## Development

```bash
# Install dependencies
pnpm install

# Run in dev mode (stdio)
pnpm dev

# Run HTTP server
pnpm start:http

# Build
pnpm build

# Run tests
npx vitest run
```

## License

MIT © [Esteban Burgos](https://github.com/e-burgos)
