# libs/tucu-ui — spec-e-burgos-002-consumer-absorption cycle-02 (2026-10-27)

## Estado
- 3.6.0: presets de marca, `ThemeScope` con portales en scope, prop `preset` en ThemeProvider, `defaultMode="system"`, CSS core sin macOS, `ThemeModeScript` para Next y las fricciones 44 a 59 del Studio.

## Estructura
- `src/themes/presets/`: registro puro (`defineThemePreset`, `registerThemePresets`, `getThemePreset`, `listThemePresets`, `resetThemePresets`), presets neutros (glass, classic, elegant, fresh, minimal, vibrant), `themePresetToCssVars`, `themePresetToAttributes` y `resolveThemePreset` por host o tenant. Sin marca de consumidor.
- `src/themes/components/theme-scope/`: `ThemeScope` (sin estado persistido) y `PortalContainerContext`/`usePortalContainer`. **Todo `createPortal` nuevo usa `usePortalContainer()`, nunca `document.body`.** `null` = scope sin montar todavía (no se renderiza); `undefined` = fuera de scope (`document.body`).
- CSS:
  - Los tokens aplican a `html:root`/`html.dark` y a `[data-tucu-theme]`/`[data-tucu-theme].dark`. El bloque de alias se re-declara en el scope.
  - `dark:` excluye un subárbol `data-tucu-mode='light'` (un nivel de inversión).
  - Reglas opt-in por `data-tucu-cards`/`-buttons`/`-font`, en `@layer utilities`.
- Tokens de componente: la librería declara `--tucu-x-default` por modo y los componentes leen `var(--tucu-x, var(--tucu-x-default))`. **Nunca declarar `--tucu-x` directo en base.css**: hay un test que lo impide.
- `theme.css` = import de macOS + `theme-core.css`. Exports nuevos: `./styles-core` (`index-core.css`, ~360 KB contra ~720 KB) y `./theme-core`. Los dos figuran en las listas de artifacts de `scripts/publish.mjs` y del workflow.
- Next: `ThemeModeScript` (server) en `./next` y `getThemeModeScript()` en la raíz.

## Dependencias
- Sin cambios.

## Qué sigue
- cycle-03 (componentes): SplitModal primero (pedido del Studio: sidebar con secciones y estado, `sidebarHeader`/`sidebarFooter`, ítem activo controlado, tabs en mobile, tokens `--tucu-split-modal-*`), después el resto de RF-3.
- Pendiente: los `tone`/`color` de Badge, Tooltip y Alert hardcodean `dark:bg-*`, así que un color por className pierde en dark sin `dark:`. Evaluar pasarlos a tokens.
