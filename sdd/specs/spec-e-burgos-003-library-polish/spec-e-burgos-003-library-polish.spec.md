# SPEC-e-burgos-003: Pulido de la librería: tonos por tokens, auth y páginas de error, Lightbox y peso del CSS

> Estado: **draft**. La planificó el dueño el 2026-10-27, con los pendientes que dejó spec-e-burgos-002. Son tres ciclos y ninguno está abierto todavía.

## Resumen Ejecutivo

spec-e-burgos-002 dejó cinco pendientes que no bloquean, pero que se notan al usar la librería:
- un color pasado por `className` pierde en dark mode porque varios mapas de tono fijan `dark:*`;
- los formularios de auth traen su propia tarjeta y un título con poco contraste;
- las nueve páginas de error son copias en inglés que no usan `SystemStatePage`;
- el Lightbox no tiene pinch-zoom;
- el CSS precompilado pesa ~383 KB incluso sin macOS.

Esta spec los cierra sin cambios incompatibles en 3.x.

## Evidencia (relevamiento del 2026-10-27, en solo lectura)

- **Tonos con `dark:*` fijos.**
  - Alert, en la rama sin `appearance` (`alert.tsx:82-91`): 12 utilidades `dark:`.
  - Tooltip, con `color` explícito (`tooltip.tsx:48-69`).
  - El mapa legacy `colors` de Badge.
  - `inputs/helpers/control-colors.ts`: 32, con `!important`.
  - Los tonos de ConfirmDialog, el mapa `colors` de Button y `cards/color-card.tsx`.
  - La referencia del patrón correcto ya existe: `var(--tucu-x, var(--tucu-x-default))`, con defaults en la tríada `html:root` / `html.dark` / `[data-tucu-theme]` de `assets/css/tokens/*.css`.
- **Formularios de auth** (`components/auth/*`).
  - El panel `bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg` está fijo y no hay prop para quitarlo. `className` cae en el wrapper externo.
  - El `<h2>` del título no tiene color propio y hereda el de la página, lo que da poco contraste sobre el panel.
  - Dentro de SplitAuthLayout quedan una tarjeta dentro de otra y el título duplicado.
  - `ResetPinForm` no tiene `data-tucu`.
  - Todos los textos (labels, placeholders, validaciones y botones) están fijos en inglés.
- **Páginas de error** (`themes/pages/*`).
  - Son nueve copias casi idénticas: default, server, forbidden, access-denied, disabled, no-routes, unknown, user-blocked y not-found.
  - Solo reciben `basePath`, y todas menos AccessDenied tienen el texto en inglés.
  - `SystemStatePage` no tiene modo de pantalla completa, slot de imagen ni tamaño de icono configurable.
  - Las rutas se enlazan desde `use-public-error-routes-config.tsx` y los providers de rutas.
- **Lightbox.**
  - El zoom es un toggle de escala 2× fija, sin pan ni pinch.
  - Solo sigue un puntero en X para el swipe.
  - opticagestion tiene `pinch-zoom.ts` (`touchDistance`, `pinchScale` y `clampPan`, de 1 a 4×), que se puede portar tal cual.
- **CSS** (`dist/ui/tucu-ui/index-core.css`, 383 KB):
  - `@layer utilities` ocupa 297 KB (76%).
  - Dentro de ese layer, las utilities arbitrarias `var(--tucu-*)` suman ~109 KB.
  - Los fallbacks `@supports (color-mix)` suman ~46 KB.
  - Las variantes `dark:` suman ~34 KB.
  - Las reglas `prose` suman ~18 KB, con un solo uso.
  - macOS agrega otros ~352 KB en `index.css`.

## Requisitos Funcionales (RF)

- **RF-1 (cycle-01). Tonos por tokens.** Los mapas de tono y color de Alert (rama default), Tooltip (`color`), Badge (`colors` legacy), Button (`colors`), ConfirmDialog, `control-colors` (Checkbox, Radio, Switch e Input) y ColorCard leen tokens `--tucu-<comp>-<tone>-<part>` en vez de fijar `dark:*`. El resultado visual por defecto es igual en light y dark, y un override del consumidor (token o `className`) gana en los dos modos.
- **RF-2 (cycle-02). Formularios de auth.**
  - `SignInForm`, `SignUpForm`, `ForgetPasswordForm` y `ResetPinForm` aceptan `variant: 'card' | 'plain'` (default `card`, como hoy), `panelClassName`, `titleClassName` y `hideTitle`.
  - El título usa un color de token con contraste garantizado.
  - Dentro de `SplitAuthLayout` se recomienda `variant="plain"`, que queda documentado.
  - Todos los textos salen de `useTucuMessages` (bloque `auth` en en/es/fr) y se pueden pisar por props.
  - `ResetPinForm` recibe sus `data-tucu`.
- **RF-3 (cycle-02). Páginas de error.**
  - Las nueve páginas pasan a un `ErrorPageShell` interno, con el aspecto actual por defecto.
  - Aceptan `title`, `description`, `actionLabel`, `icon`/`image` y `variant: 'classic' | 'system-state'`. Con `system-state` renderizan con `SystemStatePage`.
  - `SystemStatePage` suma `fullScreen`, `image` e `iconSize`.
  - Los textos van a un bloque `errorPages` (en/es/fr). AccessDenied conserva su bloque.
- **RF-4 (cycle-03). Lightbox.**
  - Con `zoom`: pinch-zoom (1 a `maxZoom`, 4 por defecto), pan con un dedo o con el mouse cuando la escala es mayor a 1, y doble tap o doble clic que alterna entre 1 y `doubleTapScale` (2.5 por defecto).
  - El swipe funciona solo con escala 1.
  - Los ítems con `render` también hacen zoom.
- **RF-5 (cycle-03). Peso del CSS.**
  - `index-core.css` baja de ~383 KB a **≤ 300 KB** sin cambios visuales.
  - Se mide antes y después, y la meta queda protegida con un check de tamaño en el build.
  - La guía (README, `tucu://quickstart` y `tucu://design-guide`) recomienda `theme` + Tailwind propio con `@source '**/*.mjs'` para quien ya usa Tailwind.

## Requisitos No-Funcionales (RNF)

- RNF-1: compatibilidad 3.x. Los defaults visuales no cambian y todo lo nuevo es opt-in. Los releases son minor (3.10, 3.11 y 3.12).
- RNF-2: todo lo nuevo funciona en Vite y en Next.
- RNF-3: cada cambio de API lleva tests vitest, props generadas, registry y changelog del MCP, y docs en tucu-docs.
- RNF-4: la verificación de cada ciclo incluye la demo en el navegador consumiendo la versión publicada de npm (lección de FIX-e-burgos-002-001), y `apps/demo` / `ui/tucu-docs` suben su rango de `@e-burgos/tucu-ui` en el mismo release.

## Dependencias

- Subproyectos: `libs/tucu-ui`, `libs/tucu-docs` y `tools/mcp-server`.
- Externas: ninguna nueva. El algoritmo de pinch se porta, sin dependencias.

## Criterios de Aceptación

- **CA-001 (cycle-01).** Ningún mapa de tono de los componentes listados en RF-1 contiene `dark:`. Un test por componente verifica que el override por token gana. La demo se ve igual en light y dark, con capturas antes y después.
- **CA-002 (cycle-02).**
  - `SignInForm` con `variant="plain"` dentro de `SplitAuthLayout` se ve sin tarjeta duplicada y con un título que cumple el contraste AA.
  - Los formularios y las nueve páginas de error se traducen con `lang="es"`.
  - `NotFoundPage variant="system-state"` renderiza con `SystemStatePage`.
- **CA-003 (cycle-03).**
  - En el Lightbox, el pinch con dos punteros escala entre 1 y 4×, el pan respeta los límites (`clampPan`) y el swipe solo navega con escala 1. Cubierto por tests con PointerEvent.
  - `index-core.css` pesa ≤ 300 KB, verificado por un check del build.
- **CA-004.** Cada ciclo cierra con `pnpm sdd:validate` en verde, versión publicada con OK del dueño y nota de adopción para display-ads, opticagestion y el Studio.

## Plan de ciclos

| Ciclo | Alcance | Release estimado |
|---|---|---|
| cycle-01 | RF-1: tonos por tokens (Alert, Tooltip, Badge, Button, ConfirmDialog, control-colors, ColorCard) | 3.10.0 / MCP 0.16.0 |
| cycle-02 | RF-2 + RF-3: auth sin tarjeta forzada + i18n; páginas de error sobre `ErrorPageShell`/`SystemStatePage` + i18n | 3.11.0 / MCP 0.17.0 |
| cycle-03 | RF-4 + RF-5: pinch-zoom del Lightbox; CSS ≤ 300 KB con check de tamaño | 3.12.0 / MCP 0.18.0 |

El cycle-01 va primero porque el cycle-03 depende de él para el peso del CSS: pasar tonos a tokens elimina variantes `dark:` y duplicados de `color-mix`.
