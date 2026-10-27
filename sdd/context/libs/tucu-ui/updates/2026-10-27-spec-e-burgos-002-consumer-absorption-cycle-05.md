# libs/tucu-ui — spec-e-burgos-002-consumer-absorption cycle-05 (2026-10-27)

## Estado
- 3.9.0:
  - `ThemeProvider`/`NextThemeProvider` envuelven en `MotionConfig reducedMotion="user"` (prop `motion`).
  - DataTable `columnSizing` (`fill-leftover` por defecto, `fill` proporcional con min/max, `fixed`), `getRowLabel` y `getRowId`.
  - FilterBar con nombre accesible por filtro y `data-testid`.
- Cierra spec-e-burgos-002.

## Estructura
- `datatable/common/functions/fillColumnsToWidth.ts` (exportado): algoritmo puro de relleno proporcional. `useScrollableTable` acepta `{ observeResize }` (ResizeObserver con guarda para SSR y jsdom).
- Nombres accesibles para automatización: filas y tarjetas con `aria-label` (desde `getRowLabel`), trigger de acciones "Row actions <label>", ítems con nombre y `data-action`.
- El mock global de framer-motion en `src/__tests__/setup.ts` exporta `MotionConfig`/`MotionConfigContext`. **Todo componente nuevo que use una API de framer-motion fuera de `motion.*` necesita su mock ahí.**

## Dependencias
- Sin cambios.

## Qué sigue
- Adopción en display-ads, opticagestion y el Studio de sdd-harness, cada uno en su sesión.
- Pendientes de la spec que no bloquean:
  - Pinch-zoom del Lightbox.
  - Tonos con `dark:bg-*` en Badge/Tooltip/Alert.
  - Páginas 404/500 sobre SystemStatePage.
  - El SignInForm (tarjeta propia y título de bajo contraste).
  - Peso del CSS (~741 KB, o ~381 KB sin macOS).
