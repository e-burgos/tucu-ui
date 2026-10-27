# libs/tucu-ui — spec-e-burgos-001-nextjs-support cycle-01 (2026-10-27)

## Estado
- 3.4.0 lista para publicar: soporte Next.js 16 App Router sin cambios para apps Vite 3.x.

## Estructura
- `src/themes/navigation/`: `core.ts` (contexto `TucuNavigationContext`, contrato `TucuNavigation`, `useTucuNavigation`, `useTucuParams`, `toHref`, sin react-router) y `react-router-navigation.tsx` (`ReactRouterNavigationProvider`, registra el fallback al importarse). Los componentes que navegan usan solo `core`.
- `src/next/`: `NextThemeProvider` (next/navigation + next/link sobre `ThemeWrapper`), entry `@e-burgos/tucu-ui/next` solo ESM, armado por `vite.config.next.mts`; tipos en `types/next-entry.d.ts`.
- `'use client'` en 190 módulos; `scripts/preserve-use-client-plugin.mjs` la repone por módulo ESM. Targets nuevos: `check-use-client` y `check-entry-isolation` (dependen de `build`).
- Render seguro en servidor: `useSyncExternalStore` en `use-breakpoint` y `use-toc`, `usePrefersReducedMotion`, `resolveBasePath`.

## Dependencias
- `next >=16` como peer opcional; `next@16.4.3` como devDependency. `sideEffects` incluye `**/react-router-navigation.mjs`.

## Qué sigue
- Publicar 3.4.0 (tag `tucu-ui-v3.4.0` tras merge). Regla: ningún módulo nuevo puede leer `window`/`document` durante el render ni importar react-router fuera de `react-router-navigation.tsx` y los providers Vite.
