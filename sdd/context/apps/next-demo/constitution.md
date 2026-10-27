# Constitución — apps/next-demo

> Versión 1.0 | Última actualización: cycle-01 (spec-e-burgos-001-nextjs-support)

## 1. Propósito

- **Tipo:** nextjs (app privada)
- **Rol en el sistema:** prueba de integración del entry `./next` de la lib principal tal como se publica: consume el paquete compilado de `dist/ui/<lib>` y verifica export estático, frontera server/client y navegación.

## 2. Stack tecnológico

- Next.js 16.4.3 (App Router, Turbopack, `output: 'export'`, `trailingSlash: true`), React 19.2, Tailwind v4 con `@tailwindcss/postcss`, TypeScript, ESLint.
- Dependencia de la lib por `file:../../dist/ui/<lib>` (no `link:`: con `link:` las dependencias de la lib no resuelven desde dist).

## 3. Estructura y patrones

- `app/layout.tsx` (Server Component con `NextThemeProvider`), páginas `app/page.tsx`, `app/reports/page.tsx`, `app/settings/page.tsx` como Server Components finos.
- `sections/*.tsx` con `'use client'` para todo lo que lleva funciones (celdas de DataTable, callbacks de forms y charts).
- `e2e/check-export.mjs`: sirve `out/` y lo recorre con Chromium.

## 4. Convenciones propias

- Targets Nx: `build` (dependsOn `sync-lib` → `tucu-ui:build`), `dev`, `lint`, `e2e`. `sync-lib` reinstala con `--frozen-lockfile`, que alcanza para refrescar la copia inyectada sin tocar el lockfile.
- El e2e necesita Chromium de Playwright (`pnpm exec playwright install chromium` o `PLAYWRIGHT_CHROMIUM_EXECUTABLE`).
- Sin comentarios en el código.

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
