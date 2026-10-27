# libs/tucu-ui — spec-e-burgos-002-consumer-absorption cycle-04 (2026-10-27)

## Estado
- 3.8.0:
  - `MarketingLayout` (`MarketingNav`, `MarketingFooter`) y `SplitAuthLayout`.
  - DataTable con `mobileCards`.
  - Fricciones 76 a 83 del Studio: SplitModal con selección por sección, `sidebarActions` e ítems `info`; SegmentedControl con semántica tabs/nav; `tooltipDefaults`; Badge micro y line-height de tabla verificados.

## Estructura
- Los layouts nuevos son **componentes**, no valores de `LAYOUT_OPTIONS`: se usan dentro de `layout="clean"` o sin layout. Viven en `components/layouts/marketing-layout/` y `components/layouts/split-auth-layout/`.
- Los links de MarketingLayout resuelven por `TucuNavigationContext.Link` o caen a `<a>`, y aceptan `renderLink`. El link activo sale de `pathname`. El menú mobile tiene focus trap, Escape y foco de vuelta.
- DataTable `mobileCards` renderiza tabla y tarjetas desde el mismo row model y cambia por CSS según el viewport, no según el contenedor (`datatable/components/DataTable/MobileCards/`). La fila se activa con el `setCurrentRow` existente, y `ResponsivePagination` suma una paginación compacta.
- El `maxHeight` default de SplitModal sale de `modalContentMaxHeight(size)` en `modal.tsx`, la única fuente. Es un cambio visible respecto de 3.7.0: 60vh en `md` en vez de `calc(85vh - 5rem)`.
- `TooltipDefaultsProvider` y `ThemeWrapper.tooltipDefaults`: las props de Tooltip pisan al contexto.

## Dependencias
- Sin cambios.

## Qué sigue
- cycle-05: skill de diseño, `tucu://design-guide`, parámetros `style`/`motion`/`density` en `generate_page`/`generate_component` y prompt `design-review`. `generate_page` hoy no conoce MarketingLayout ni SplitAuthLayout (su enum de layout es dashboard/sidebar/fullpage/stacked); se evalúa en cycle-05.
