# Constitución — tools/mcp-server

> Versión 1.1 | Última actualización: 2026-10-27 (consolidación de spec-e-burgos-001 cycle-01 y spec-e-burgos-002 cycles 01-04)
> Ruta real: `tools/mcp-server` (proyecto Nx `tucu-ui-mcp`). Paquete npm `@e-burgos/tucu-ui-mcp` 0.14.0.

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
- Los datos del catálogo viven en `src/data/` y reflejan la API pública de `libs/tucu-ui`; `component-registry.ts` cubre los componentes y layouts de tucu-ui 3.8.0 (categorías `feedback` y `layouts` incluidas)
- `framework: "vite" | "next"` (default vite) en generate_component/form/page/chart/datatable (`src/utils/next-output.ts`); `src/resources/next-guide.ts` agrega la sección Next a quickstart, routing y shell, y `theme-setup` acepta `framework`
- Resources de tokens y layouts: `tucu://tokens` documenta los tokens `--tucu-*` por grupo, "Theme presets & scopes (public contract)" (variables de preset, atributos `data-tucu-theme|mode|cards|buttons|font|heading-font`, límite de anidado, precedencia `var(--tucu-x, var(--tucu-x-default))`) y "Page background and reserved theme names"; `tucu://layouts` y `tucu://datatable` cubren los layouts y `mobileCards`; `best-practices` cubre `cn()` y `extendClassMergeTokens`
- El changelog resource tiene v3.8.0 como Current y marca el cambio visible de `maxHeight` de SplitModal

## 4. Convenciones propias

- Todo cambio en la API pública de la lib se refleja en `src/data/` y en los resources correspondientes
- Cada tool, resource y prompt nuevo lleva test en `tests/`; `tests/framework-parity.test.ts` guarda snapshots de la salida vite y `tests/framework-next.test.ts` cubre el modo Next
- Toda tool nueva que emita código respeta `framework` y suma su snapshot de paridad vite
- Release por tag `mcp-v*` (`pnpm mcp:publish:patch|minor|major`); el CHANGELOG se mantiene en `tools/mcp-server/CHANGELOG.md`
- No depende de código de `apps/*` ni importa del source de `ui/tucu-ui`
- Sin comentarios en el código (excepción: una línea en inglés para un POR QUÉ no obvio)

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
