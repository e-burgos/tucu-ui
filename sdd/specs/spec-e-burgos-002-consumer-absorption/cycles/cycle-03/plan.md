# spec-e-burgos-002-consumer-absorption — cycle-03 (c02) · plan (lite)

> Módulo: consumer-absorption | Subproyectos: libs/tucu-ui, libs/tucu-docs, tools/mcp-server | Fecha: 2026-10-27
> Objetivo: subir a tucu-ui los componentes genéricos que display-ads y opticagestion reimplementan (RF-3, CA-003), con SplitModal primero (pedido del Studio), y las fricciones 60 a 63 de Select. Fuera de alcance: layouts y DataTable responsive (cycle-04) y la guía de diseño (cycle-05).

## Evidencia (relevamiento de solo lectura)
- opticagestion (`libs/ui-components/src/components/cristal/`):
  - GlassPanel (~136 archivos), StateBadge (~100), InlineNotice (~82), MoneyText (~64), SafeImage (~38), SegmentedControl (~28), FilterPill (~20), StateViews (EmptyState ~62, ErrorState ~34, QueryErrorState ~20, SystemStatePage ~6).
  - Todos dependen de tokens propios (`ink`, `action`, `state-*`, `glass-*`, `rounded-control|card|panel`, `shadow-cl-*`) que hay que mapear a `--tucu-*`.
- display-ads y opticagestion, cada uno con su copia (con diferencias):
  - ConfirmModal (DA ~33, OG ~54), SplitModal (DA 18, OG 13) y SplitModalWizard (OG 7).
  - StatCard (DA 11, OG 6), con colores adivinados por palabras del título en español, algo que hay que eliminar.
  - AnimatedTabs (DA ~30), GenericTableFilters/FilterCard (DA ~20, OG ~13) y tres Lightbox distintos.
- El Studio (sdd-harness) definió la API de SplitModal para DocumentViewerModal y GateStatusModal:
  - `sections` de navegación con icono, badge o dot de estado, deshabilitado y activo controlado.
  - `sidebarHeader`/`sidebarFooter` y header con título y chips.
  - Tabs en mobile, `maxWidth`/`maxHeight`, la a11y de Modal y colores por `--tucu-*`.
- tucu-ui ya tiene framer-motion, `Tab` (LayoutGroup + motion), `useTabParam`, `Image`, `Badge` (tone/variant/withDot), `Alert` y `Modal` (portal en scope, focus trap, `useId`, `maxWidth`/`maxHeight`).
- No se duplican Carousel, Stepper, Drawer, TabModal, Skeleton ni useTabParam.

## Historias
- US-001 — Como dev quiero un SplitModal con sidebar de navegación y un SplitModalWizard con validación por paso, para no copiar el de cada app. CA:
  - Sidebar por `sections` con ítem activo controlado.
  - Tabs en mobile.
  - a11y de Modal.
  - Wizard que valida hacia adelante (async) y salta al primer paso inválido.
- US-002 — Como dev quiero ConfirmDialog, EmptyState, ErrorState (con reintento) y SystemStatePage listos. CA: sin textos fijos (i18n en en/es/fr).
- US-003 — Como dev quiero superficies y datos: GlassPanel, StateBadge, InlineNotice, MoneyText, SafeImage y StatCard. CA:
  - Colores y materiales por `--tucu-*` con default por modo.
  - MoneyText sin moneda ni locale de un consumidor por defecto.
- US-004 — Como dev quiero SegmentedControl, FilterPill con FilterBar y AnimatedTabs. CA:
  - a11y de radiogroup y tablist con navegación por teclado.
  - AnimatedTabs reusa `Tab`/`useTabParam` en vez de duplicarlos.
- US-005 — Como dev quiero un Lightbox con teclado y swipe. CA: portal en scope, foco atrapado, flechas y Escape, y swipe táctil con umbral.
- US-006 — Como dev quiero un Select más flexible (fricciones 60 a 63). CA: `menuWidth`, `descriptionClassName`/`wrapDescription`, `maxMenuHeight`, `triggerLabel`/`renderValue` y `triggerClassName`.

## Tasks (detalle en tasks.json)
- TASK-001 — SplitModal, SplitModalWizard y ConfirmDialog, sobre la base de Modal.
- TASK-002 — GlassPanel, StateBadge (Badge con `struck` y tonos teal/purple), InlineNotice (sobre Alert), MoneyText, SafeImage (Image con fallback ReactNode) y StatCard.
- TASK-003 — SegmentedControl, FilterPill, FilterBar, AnimatedTabs y Select 60 a 63.
- TASK-004 — EmptyState, ErrorState, SystemStatePage y Lightbox.
- TASK-005 — Integración: generate-props, registry del MCP, changelog y páginas de tucu-docs.
- TASK-006 — Verificación: tests, lint, checks de build, test-local y navegador.

## Decisiones técnicas
- **Extensión antes que duplicado.**
  - StateBadge es un preset de Badge; InlineNotice compone Alert; SafeImage reusa el fallback de Image.
  - AnimatedTabs se arma con `Tab` y `useTabParam`, y ConfirmDialog y SplitModal con `Modal`.
  - Los nombres de los consumidores se exportan para que la adopción sea un cambio de import.
- **Tokens por componente.** Cada grupo declara sus defaults (`--tucu-<comp>-<prop>-default`) en su propio archivo CSS, con los tres selectores del ciclo anterior (`html:root`, `html.dark` y `[data-tucu-theme]`/`.dark`), importado desde `theme-core.css`. Los componentes leen `var(--tucu-x, var(--tucu-x-default))`.
- **Sin textos fijos.** Confirmar, cancelar, anterior, siguiente, paso i de N, reintentar y cerrar o navegar en el Lightbox salen de `useTucuMessages` (en/es/fr) y se pueden pisar por props.
- **Release:** minor `3.7.0` de la librería y minor `0.13.0` del MCP, con OK del dueño por ciclo (2026-10-27).

## Agregado durante el ciclo
- TASK-007 — Fricciones 64 a 68 del Studio:
  - Button: `shape="square"`.
  - Input: `suffix` y `shortcut` (`<kbd>` + `aria-keyshortcuts`).
  - Badge: `size="micro"`.
  - Tooltip: `lazy`.
  - `--color-page` como nombre canónico del fondo de página. `--color-body` sale del namespace `@theme`, porque un `--text-body` del consumidor generaba `color` y dejaba el texto invisible en dark. Sigue como variable y con `bg-body`.
- TASK-008 — Fricciones 69 a 75 del Studio al adoptar 3.6.0:
  - Bug: el `.d.ts` de `./next` no declaraba `ThemeModeScript`. Se corrige y se agrega un test de paridad entre los exports y los tipos.
  - Modal: `closeTooltip` y `headerActions`.
  - BasicTable: tokens de padding y tamaño de fuente por densidad.
  - Select: `--tucu-select-border`.
  - La 70 (padding por defecto del contenido de Modal) se mantiene por compatibilidad: se pisa con `contentClassName`.
