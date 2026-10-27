# Context Prompt — libs/tucu-ui

> Entry point para agentes que trabajen sobre `libs/tucu-ui` (ruta real `ui/tucu-ui`).
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.

- **Tipo:** react library publicada como `@e-burgos/tucu-ui` 3.3.0
- **Estado:** estable en producción; sin ciclos SDD completados todavía.
- **Módulos clave:** `src/components/*` (95+ componentes), `src/themes/` (ThemeProvider y presets), `src/datatable/`, `src/hooks/`, `src/docs-kit/`.
- **Comandos (siempre vía Nx):**
  - `pnpm nx run tucu-ui:build` — build Vite lib mode a `dist/ui/tucu-ui`
  - `pnpm nx run tucu-ui:typecheck`
  - `pnpm nx run tucu-ui:lint`
  - `pnpm nx run tucu-ui:test` — vitest + jsdom
  - `pnpm tucu-ui:test-local` — prueba la lib sin publicar en `apps/test-lib`
  - `pnpm tucu-ui:publish:dry` — ensayo de release (el release real lo dispara el tag `tucu-ui-v*`)
- **Consumidores:** `apps/demo`, `apps/test-lib`, `ui/tucu-docs`, terceros por npm. Todo cambio de API pública afecta también al MCP y a la doc.

## Qué sigue

- Soporte para Next.js 16 App Router mediante un entry desacoplado `@e-burgos/tucu-ui/next` con `NextThemeProvider` (sin el Router propio del `ThemeProvider`, con los límites `"use client"` necesarios).
- Las apps Vite en 3.x quedan intactas: el entry `.` no cambia de comportamiento.
- Se ejecuta como spec SDD propia (un ciclo por spec, flow `lite` por perfil `solo`).
