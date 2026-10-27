# spec-e-burgos-002-consumer-absorption — cycle-02 (c01) · plan (lite)

> Módulo: consumer-absorption | Subproyectos: libs/tucu-ui, libs/tucu-docs, tools/mcp-server | Fecha: 2026-10-27
> Objetivo: presets de marca con nombre, tema con scope (dos temas en la misma página) y portales que heredan el tema del scope donde se abrieron. Además, los dos pendientes que dejó el cycle-01: CSS sin macOS opt-in y un script anti-flash para Next. Fuera de alcance: componentes nuevos (cycle-03) y layouts (cycle-04).

## Evidencia
- opticagestion (storefront) arma su propio `ThemeProvider` con 6 presets (`THEME_PRESETS`). Cada uno trae accent, surface, fuentes, radius, background, cards y buttons, y todo se aplica con variables `--sf-*` y atributos `data-sf-*` sobre un `<div>` envolvente.
- Para que los portales hereden el tema, opticagestion hace dos cosas. Pasa `portalContainer` a mano con `closest('[data-sf-preset]')`. Para el Select de tucu-ui, un MutationObserver copia los tokens computados sobre `[data-tucu='select-menu']`.
- Su `@custom-variant dark` excluye `.sf-force-light`, porque un scope claro dentro de `html.dark` hereda `dark:`.
- display-ads fija la marca con `customPaletteColor` y pisa `--color-accent` en `html:root`, porque el default es amarillo. Su landing en Next tiene un script anti-flash propio.
- En tucu-ui, el store del tema es un singleton global, los tokens viven en `html:root`/`html.dark`, `useThemeColor` escribe sobre `documentElement` y 13 portales montan en `document.body`.

## Historias
- US-001 — Como dev quiero registrar presets de marca con nombre y aplicarlos al tema, para no reimplementar un ThemeProvider propio. CA:
  - `defineThemePreset`/`registerThemePresets`/`getThemePreset`, con presets neutros incluidos.
  - Cada preset emite `--tucu-*` y re-apunta `--color-brand`/`--color-primary`.
- US-002 — Como dev quiero un `ThemeScope` que aplique otro preset y otro modo a un subárbol, para tener un storefront o una vista previa dentro de una app con otro tema. CA:
  - Dos scopes en la misma página se ven cada uno con su tema.
  - Un scope claro dentro de `html.dark` no hereda `dark:`.
- US-003 — Como dev quiero que Modal, Drawer, Select, Tooltip del datatable y el resto de los portales abiertos desde un scope hereden su tema, sin `portalContainer` manual ni observers. CA: test con un Modal y un Select abiertos dentro de un scope.
- US-004 — Como dev multi-tenant quiero resolver el preset por host o tenant con una función pura. CA: `resolveThemePreset({ host, rules, fallback })` con tests.
- US-005 — Como dev que no usa macOS quiero importar un CSS sin los temas macOS, y en Next quiero que el modo guardado se aplique antes del primer paint. CA:
  - `@e-burgos/tucu-ui/styles-core`, medido.
  - `ThemeModeScript` en `./next` y `getThemeModeScript()` en el barrel.

## Tasks (detalle en tasks.json)
- TASK-001 — Núcleo de presets:
  - Tipos `ThemePreset` (accent, surface, radius, fontFamily, headingFontFamily, cards, buttons y tokens light/dark libres).
  - Registro (`defineThemePreset`, `registerThemePresets`, `getThemePreset`, `listThemePresets`).
  - Seis presets neutros: `glass`, `classic`, `elegant`, `fresh`, `minimal` y `vibrant`.
  - `themePresetToCssVars(preset, mode)`, que emite `--tucu-accent`, `--tucu-accent-contrast` (por luminancia), `--tucu-radius`, `--tucu-control-radius`, `--tucu-card-*`, `--tucu-font` y `--tucu-heading-font`, y re-apunta `--color-brand`, `--color-primary` y `--color-semantic-bg-primary` (y sus `-dark-`).
  - `resolveThemePreset` por host o tenant.
  - Todo puro, sin DOM, con tests.
- TASK-002 — CSS con scope:
  - Los bloques de tokens de `base.css`/`theme.css` también aplican a `[data-tucu-theme]` (claro) y a `[data-tucu-theme].dark`, re-declarando los alias (`--color-brand`, `--color-body`, etc.) para que se resuelvan dentro del scope.
  - `@custom-variant dark` excluye un subárbol con `data-tucu-mode='light'`.
  - Reglas opt-in por atributo: `[data-tucu-cards=glass|solid|outlined] [data-tucu=card]` y `[data-tucu-buttons=rounded|pill|square] [data-tucu=button]`.
- TASK-003 — `ThemeScope`, portales y ThemeProvider:
  - `ThemeScope` (`preset` por nombre u objeto, `mode` light/dark/auto, `tokens`, `className`, `as`) renderiza un `<div data-tucu="theme-scope" data-tucu-theme data-tucu-mode>` con las variables inline y un host de portales propio.
  - `PortalContainerContext` + `usePortalContainer()` (default `document.body`), usado por los 13 `createPortal`.
  - `useThemeScope()` para leer preset y modo.
  - `ThemeProvider`/`NextThemeProvider` aceptan `preset`, que se aplica en `<html>`.
  - Toast sigue leyendo `<html>` (sin cambio).
- TASK-004 — CSS core y anti-flash:
  - Separar la importación de macOS para exportar `./styles-core` (index sin macOS) sin cambiar `./styles` ni `./theme`.
  - `getThemeModeScript({ storageKey, defaultMode, attribute })` lee `theme-storage` y aplica `dark`/`light` (y las clases macOS si corresponden) antes del paint.
  - `ThemeModeScript` (server component) en `./next`.
  - Medir el tamaño de `index-core.css`.
- TASK-005 — Integración:
  - generate-props.
  - Registry del MCP: `ThemeScope`, presets y props `preset` de ThemeProvider.
  - Contrato público en `tucu://tokens` (variables `--tucu-*` de preset y atributos `data-tucu-theme`/`-mode`/`-cards`/`-buttons`).
  - Changelog del MCP.
  - Páginas en tucu-docs (Theme presets, ThemeScope, Next anti-flash).
- TASK-006 — Verificación: tests, typecheck, lint, checks de build, `pnpm tucu-ui:test-local` y prueba en el navegador de la demo con dos scopes y un Select/Modal abiertos dentro de uno.

## Decisiones técnicas
- **Scope por CSS, no por store.** El store global y su persistencia siguen siendo el tema de la app; `ThemeScope` no tiene estado persistido. Así no se rompe ningún consumidor 3.x y no hace falta migrar `theme-storage`.
- **Portales dentro del scope.** El host de portales es un `<div>` vacío dentro del scope y sin `transform`, así que `position: fixed` sigue relativo al viewport. Cada portal usa el host del scope más cercano, o `document.body` fuera de uno.
- **Límite del modo anidado.** `dark:` respeta un nivel de inversión de modo (claro dentro de oscuro y viceversa). Un tercer nivel alternado no está soportado; queda documentado.
- **Presets propios, sin marca de consumidor.** Los nombres y valores son neutros. Los consumidores registran los suyos con `registerThemePresets` (RNF-4).
- **CSS core aditivo.** `./styles` sigue igual (con macOS); `./styles-core` es un export nuevo. Sin cambio incompatible.
- **Release:** minor `3.6.0` de la librería y minor `0.12.0` del MCP. El dueño aprobó publicar al cerrar cada ciclo (2026-10-27).

## Agregado durante el ciclo
- TASK-007 — Fricciones 44 a 58 que mandó la sesión del Studio al adoptar 3.5.0:
  - `defaultMode="system"`.
  - Modal: `overlayClassName`, `closeButtonProps`, `headerClassName`, el título en un `<div>`, `contentClassName`/`maxWidth`/`maxHeight`, id con `useId` y foco inicial en el diálogo.
  - Alert: `density="compact"`.
  - BasicTable: `density="snug"` y hover por token.
  - Tokens `--tucu-*` leídos con un default `--tucu-*-default`, para que el override del consumidor gane en los dos modos.
  - Select: `hideLabel`, `hideHelperText` y `appearance="neutral"`.
  - Badge con className que gana.
  - Tooltip: `maxWidth`.
  - Se suman a 3.6.0 porque son compatibles y opt-in.
