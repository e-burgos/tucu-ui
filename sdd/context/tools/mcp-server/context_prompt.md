# Context Prompt — tools/mcp-server

> Entry point para agentes que trabajen sobre `tools/mcp-server` (proyecto Nx `tucu-ui-mcp`).
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.
> Última actualización: consolidación de spec-e-burgos-001 cycle-01 y spec-e-burgos-002 cycles 01-04. Fecha: 2026-10-27

- **Tipo:** node MCP server, `@e-burgos/tucu-ui-mcp` 0.14.0
- **Estado:** en producción (npm + fly.io), alineado con `@e-burgos/tucu-ui` 3.8.0 (modo Next, presets/scopes, componentes de absorción y layouts).
- **Comandos (siempre vía Nx):**
  - `pnpm nx run tucu-ui-mcp:build`
  - `pnpm nx run tucu-ui-mcp:serve` — stdio
  - `pnpm nx run tucu-ui-mcp:serve:http` — HTTP en 3100
  - `pnpm nx run tucu-ui-mcp:test` — vitest
  - `pnpm nx run tucu-ui-mcp:docker:build` / `docker:run`
  - `pnpm mcp:publish:dry` — ensayo de release (el real lo dispara el tag `mcp-v*`)
- **Capacidades:** 11 tools, 13+ resources, 8 prompts.

## Qué sigue

- cycle-05 (spec-e-burgos-002): `tucu://design-guide`, prompt `design-review` y parámetros `style`/`motion`/`density` en las tools de generación.
- Mantener el changelog resource alineado con cada release de la lib.
