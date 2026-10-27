# Context Prompt — tools/mcp-server

> Entry point para agentes que trabajen sobre `tools/mcp-server` (proyecto Nx `tucu-ui-mcp`).
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.

- **Tipo:** node MCP server, `@e-burgos/tucu-ui-mcp` 0.9.0
- **Estado:** en producción (npm + fly.io); sin ciclos SDD completados todavía.
- **Comandos (siempre vía Nx):**
  - `pnpm nx run tucu-ui-mcp:build`
  - `pnpm nx run tucu-ui-mcp:serve` — stdio
  - `pnpm nx run tucu-ui-mcp:serve:http` — HTTP en 3100
  - `pnpm nx run tucu-ui-mcp:test` — vitest
  - `pnpm nx run tucu-ui-mcp:docker:build` / `docker:run`
  - `pnpm mcp:publish:dry` — ensayo de release (el real lo dispara el tag `mcp-v*`)
- **Capacidades:** 11 tools, 13+ resources, 8 prompts.

## Qué sigue

- Cuando `libs/tucu-ui` publique el entry `@e-burgos/tucu-ui/next` (Next.js 16 App Router), sumar su guía al catálogo y a los resources de quickstart/theme/routing.
- Mantener el changelog resource alineado con cada release de la lib.
