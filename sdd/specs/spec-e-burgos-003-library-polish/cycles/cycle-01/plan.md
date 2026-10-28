# spec-e-burgos-003-library-polish — cycle-01 · plan (lite)

> Módulo: library-polish | Subproyectos: libs/tucu-ui, libs/tucu-docs, tools/mcp-server | Fecha: 2026-10-28
> Objetivo: RF-1 / CA-001. Los mapas de tono de Alert (rama default), Tooltip (`color`), Badge (`colors` legacy), Button (`colors`), ConfirmDialog, `control-colors` y ColorCard leen tokens en vez de fijar `dark:*`. El aspecto por defecto no cambia, y un override del consumidor (token o `className`) gana en light y en dark.

## Evidencia (relevamiento del 2026-10-28)
- `components/notifications/alert.tsx:82-90`: 4 tonos × 3 utilidades `dark:` en la rama sin `appearance`.
- `components/common/tooltip.tsx:48-75`: `colorStyles`/`arrowColorStyles` con `dark:` en los colores `dark` y `light`; el color por defecto ya usa tokens (`--tucu-tooltip-bg`).
- `components/common/badge.tsx:53-56`: el color legacy `light-dark` con `dark:`.
- `components/buttons/button/index.tsx`: `transparent`, `gray`, hover de ghost, foco (`ring-offset`), disabled y color de texto con `dark:`.
- `components/dialog/confirm-dialog.tsx:62-65`: icono de tono con `dark:text-*`.
- `components/inputs/helpers/control-colors.ts`: 32 utilidades `dark:` (con `!important` en primary/info ghost) en los mapas de inputs de texto, acento y file input.
- `components/cards/color-card.tsx:24-44`: 14 gradientes con `dark:`.
- Precedente en el repo: `assets/css/tokens/surfaces.css` ya resuelve los tonos de Badge/StateBadge con reglas `@layer components` sobre `[data-tucu][data-tone]` que leen tokens.

## Historias
- US-001 — Como consumidor quiero que el color que paso por `className` a Alert, Tooltip, Badge, Button, ConfirmDialog, los controles y ColorCard gane también en dark mode. CA: ningún mapa de tono de esos componentes contiene `dark:`; un test por componente.
- US-002 — Como consumidor quiero ajustar un tono con un token (`--tucu-<comp>-<tone>-<part>`) y que se respete en los dos modos, también dentro de un ThemeScope. CA: tokens con default en la tríada `html:root` / `html.dark` / `[data-tucu-theme]`, documentados en `tucu://tokens`.
- US-003 — Como usuario de la demo quiero que todo se vea igual que en 3.9.1. CA: comparación light/dark antes y después en la demo.

## Tasks (detalle en tasks.json)
- TASK-001 — Alert, Tooltip, Badge legacy, ConfirmDialog y ColorCard sobre `tokens/tones.css`, con tests.
- TASK-002 — `control-colors` (y los controles que lo consumen) y Button sobre `tokens/tones-controls.css`, con tests.
- TASK-003 — Docs y MCP: `tucu://tokens`, `styling-overrides`, changelog 0.16.0, sección de tokens de tono en tucu-docs.
- TASK-004 — Verificación (tests, lint, build, checks, demo light/dark), cierre y release 3.10.0 / MCP 0.16.0.

## Decisiones técnicas
- **Reglas de componente, no utilidades arbitrarias.** Cada componente emite `data-tucu="<comp>"` y `data-tone="<tone>"` (o el atributo propio que ya tenga), y el color sale de una regla `@layer components` que lee `var(--tucu-<comp>-<tone>-<part>, var(--tucu-<comp>-<tone>-<part>-default))`. Así:
  - las utilidades del consumidor (`@layer utilities`) ganan siempre, en los dos modos, sin `!`;
  - no se suman ~100 bytes de utilidad arbitraria por tono, lo que ayuda a la meta de peso del cycle-03.
- **El componente no emite utilidades de color que compitan con la regla de tono.** Si un tono aplica, se quitan del `className` interno las utilidades base de `bg`/`border`/`text`/`ring` que lo pisarían (una utilidad interna también le gana a `@layer components`).
- **Los defaults reproducen los valores actuales** de Tailwind (light y dark), expresados como colores literales o `color-mix`, para que el aspecto no cambie.
- **Dos archivos de tokens** (`tones.css` y `tones-controls.css`), importados desde `theme-core.css`, para que los dos implementadores trabajen en paralelo sin tocar el mismo archivo.
- **Release:** minor `3.10.0` de la librería y minor `0.16.0` del MCP. El dueño aprobó publicar al cerrar el ciclo (2026-10-28).
