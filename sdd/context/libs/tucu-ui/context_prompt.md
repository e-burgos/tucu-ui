# Context Prompt — libs/tucu-ui

> Entry point para agentes que trabajen sobre `libs/tucu-ui` (ruta real `ui/tucu-ui`).
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.
> Última actualización: consolidación de spec-e-burgos-001 cycle-01 y spec-e-burgos-002 cycles 01-04. Fecha: 2026-10-27

- **Tipo:** react library publicada como `@e-burgos/tucu-ui` 3.8.0
- **Estado:** publicada en 3.8.0; soporta Vite (entry `.`) y Next.js 16 App Router (entry `./next`). Specs 001 (Next) y 002 (absorción de consumidores, ciclos 01-04) completadas.
- **Módulos clave:** `src/components/*` (95+ componentes), `src/themes/` (ThemeProvider, presets, `ThemeScope`, navegación), `src/next/`, `src/datatable/`, `src/hooks/`, `src/libs/cn.ts`, `src/docs-kit/`.
- **Comandos (siempre vía Nx):**
  - `pnpm nx run tucu-ui:build` — build Vite lib mode a `dist/ui/tucu-ui`
  - `pnpm nx run tucu-ui:typecheck`
  - `pnpm nx run tucu-ui:lint`
  - `pnpm nx run tucu-ui:test` — vitest + jsdom
  - `pnpm tucu-ui:test-local` — prueba la lib sin publicar en `apps/test-lib`
  - `pnpm tucu-ui:publish:dry` — ensayo de release (el release real lo dispara el tag `tucu-ui-v*`)
- **Consumidores:** `apps/demo`, `apps/test-lib`, `ui/tucu-docs`, terceros por npm. Todo cambio de API pública afecta también al MCP y a la doc.

## Qué sigue

- cycle-05 (spec-e-burgos-002): skill de diseño, `tucu://design-guide`, parámetros `style`/`motion`/`density` en `generate_page`/`generate_component` y prompt `design-review` (lado MCP). `generate_page` no conoce MarketingLayout ni SplitAuthLayout (su enum de layout es dashboard/sidebar/fullpage/stacked); se evalúa ahí.
- Pendientes: pinch-zoom del Lightbox; los tonos de Badge/Tooltip/Alert hardcodean `dark:bg-*` (evaluar pasarlos a tokens); las páginas 404/500 de `themes/pages` no usan SystemStatePage.
