# libs/tucu-ui — spec-e-burgos-002-consumer-absorption cycle-03 (2026-10-27)

## Estado
- 3.7.0: componentes genéricos absorbidos de display-ads y opticagestion, más las fricciones 60 a 75 del Studio.
  - Diálogos: SplitModal, SplitModalWizard y ConfirmDialog.
  - Superficies y datos: GlassPanel, StateBadge, InlineNotice, MoneyText, SafeImage y StatCard.
  - Controles: SegmentedControl, FilterPill/FilterBar y AnimatedTabs.
  - Feedback: EmptyState, ErrorState, SystemStatePage y Lightbox.

## Estructura
- Carpetas nuevas: `components/filters/`, `components/feedback/` y `components/lightbox/`. SplitModal y sus tipos viven en `components/dialog/split-modal*.ts(x)`.
- Tokens por grupo en `assets/css/tokens/{split-modal,surfaces,controls,feedback,table}.css`, importados desde `theme-core.css`, siempre con el patrón `var(--tucu-x, var(--tucu-x-default))` y los tres selectores (root, dark, scope).
  - **Todo directorio CSS nuevo que importe `theme-core.css` tiene que figurar en el `copyThemeCssPlugin` de `vite.config.mts`.** `check-built-imports` ahora falla si un `@import` relativo del CSS de `dist` no resuelve.
  - Paleta de estados `--tucu-state-<tone>-soft|ink|line` (Badge, StateBadge y FilterPill). Las vistas de estado usan `--tucu-state-view-*`.
- `--color-page` es el fondo de página canónico (`bg-page`). `--color-body` queda como variable plana y como utility `bg-body`, fuera de `@theme`, para no chocar con un `--text-body` del consumidor.
- Modal suma `role`, `aria-labelledby`, `closeTooltip` y `headerActions`. BasicTable lee padding y tamaños de fuente de `--tucu-table-cell-px|py`, `--tucu-table-font-size` y `--tucu-table-header-font-size`, con default por `data-density`.
- `./next` se tipa a mano en `types/next-entry.d.ts`. `__tests__/next/next-entry-types.test.ts` exige que cada export de `src/next/index.ts` esté declarado.

## Dependencias
- Sin cambios (framer-motion ya estaba).

## Qué sigue
- cycle-04 (layouts): MarketingLayout (nav pública, menú móvil y footer, de display-ads/opticagestion), SplitAuthLayout (AuthShell) y DataTable responsive con tarjetas en mobile (stack-table).
- Pendientes:
  - Pinch-zoom del Lightbox.
  - Tonos de Badge/Tooltip/Alert hardcodeados con `dark:bg-*`.
  - Las páginas 404/500 de `themes/pages` no usan SystemStatePage.
