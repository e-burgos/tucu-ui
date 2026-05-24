# Changelog

All notable changes to `@e-burgos/tucu-ui-mcp` will be documented in this file.

## [0.4.0] - 2025-05-23

### Added
- **Generation tools**: `generate_component`, `generate_form`, `generate_page`, `generate_chart`, `search_icons`
- **8 MCP prompts**: create-component, create-form, create-page, debug-variant, migrate-component, theme-setup, accessibility-check, performance-review
- **12 resources** with `tucu://` URI scheme covering catalog, tokens, forms, routing, layouts, theme, charts, icons, migration, best-practices, changelog, and quickstart
- Fuzzy search for component lookups
- Code generation with automatic variant validation and safety warnings
- Form generation with Zod + react-hook-form patterns
- Theme-aware code generation (ThemeProvider wrapping)

### Security
- Bearer token authentication (`MCP_API_KEY`)
- Timing-safe token comparison
- Rate limiting (100 req/min per IP)
- Non-root Docker user

### Infrastructure
- Docker multi-stage build (node:22-alpine)
- Fly.io configuration with auto-stop/start machines
- Health check endpoint (`GET /health`)
- Streamable HTTP transport for remote access

## [0.3.0] - 2025-05-15

### Added
- HTTP server with Express 5 (`http-server.ts`)
- Rate limiter middleware
- Auth middleware with constant-time comparison
- Docker support (Dockerfile + docker-compose.yml)
- Fly.io deployment config (`fly.toml`)
- Client configuration examples (VS Code, Cursor, Claude Desktop, remote HTTP)

## [0.2.0] - 2025-05-10

### Added
- Component tools: `list_components`, `get_component`
- Component registry with 95+ entries
- Theme registry with color presets and layout variants
- Form patterns registry
- Icon registry (97 native + 1500+ Lucide)
- Fuzzy search utility

## [0.1.0] - 2025-05-05

### Added
- Initial MCP server scaffold
- Stdio transport entry point
- Server factory (`createMcpServer`)
- Project structure with TypeScript, Vitest, and Nx integration
