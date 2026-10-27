# spec-e-burgos-001-nextjs-support cycle-01 — 2026-10-27

## Qué pasó
Vite en modo lib con `preserveModules` borra las directivas de módulo, así que `'use client'` no llegaba a `dist/` aunque estuviera en el fuente. Hizo falta un plugin que la quita en `transform` y la repone en `renderChunk` solo para ESM, más un check sobre `dist/`. Además, el bug de prerender de `DataTable` (`document` leído en render) solo apareció al consumir el paquete compilado desde una app Next real: los tests jsdom y `test-lib`, que usa el fuente por alias, no lo veían. Para esa app, `file:` a dist funciona y `link:` no (las deps de la lib no resuelven); `pnpm install --frozen-lockfile` alcanza para refrescar la copia inyectada.

## Lección
Verificar el soporte de un framework consumidor (Next, SSR) desde el paquete compilado (`file:` a dist o `pnpm pack`), nunca desde el fuente por alias, y chequear `dist/` por directivas y aislamiento de entries.

## Costo evitable
Una vuelta extra de diagnóstico en TASK-004 por un bug de SSR que una app sobre el fuente no habría mostrado.
