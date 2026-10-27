# Constitución — tools/mcp-server

> Versión 1.0 | Última actualización: cycle-0 (inicial)
> Ruta real: `tools/mcp-server` (proyecto Nx `tucu-ui-mcp`). Paquete npm `@e-burgos/tucu-ui-mcp` 0.9.0.

## 1. Propósito

- **Tipo:** node MCP server (publicable en npm y desplegado en fly.io)
- **Rol en el sistema:** expone la API completa de la librería a agentes de IA: 11 tools, 13+ resources (`tucu://catalog`, `tucu://theme`, `tucu://forms`, etc.) y 8 prompts. Es la fuente de contexto primaria para quien trabaje con la lib.

## 2. Stack tecnológico

- Node + TypeScript (`tsc -p tsconfig.lib.json`), `tsx` para desarrollo
- `@modelcontextprotocol/sdk`, `express` (transporte HTTP), `zod`
- Tests: vitest + supertest
- Bins: `tucu-ui-mcp` (stdio) y variante HTTP (`src/http-server.ts`, puerto 3100)
- Despliegue: Docker + fly.io (app `tucu-ui-mcp`, `fly.toml`)

## 3. Estructura y patrones

- `src/index.ts` (stdio) y `src/http-server.ts` (HTTP) sobre `src/server.ts`
- `src/tools/` (component, datatable, generation), `src/resources/`, `src/prompts/`, `src/data/`, `src/middleware/`, `src/utils/`
- Los datos del catálogo viven en `src/data/` y reflejan la API pública de `libs/tucu-ui`

## 4. Convenciones propias

- Todo cambio en la API pública de la lib se refleja en `src/data/` y en los resources correspondientes
- Cada tool, resource y prompt nuevo lleva test en `tests/`
- Release por tag `mcp-v*` (`pnpm mcp:publish:patch|minor|major`); el CHANGELOG se mantiene en `tools/mcp-server/CHANGELOG.md`
- No depende de código de `apps/*` ni importa del source de `ui/tucu-ui`
- Sin comentarios en el código (excepción: una línea en inglés para un POR QUÉ no obvio)

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
