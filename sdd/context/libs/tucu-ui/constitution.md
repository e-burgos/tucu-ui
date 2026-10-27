# Constitución — libs/tucu-ui

> Versión 1.1 | Última actualización: 2026-10-27 (consolidación de spec-e-burgos-001 cycle-01 y spec-e-burgos-002 cycles 01-04)
> Ruta real: `ui/tucu-ui` (id lógico SDD `libs/tucu-ui`). Paquete npm `@e-burgos/tucu-ui` 3.8.0.

## 1. Propósito

- **Tipo:** react library (publicable en npm)
- **Rol en el sistema:** es el producto central: librería de componentes React con Tailwind v4 (95+ componentes, formularios, gráficos, theming, layouts macOS Sonoma/Tahoe, íconos, componentes blockchain). La consumen `apps/demo`, `apps/test-lib`, `ui/tucu-docs` y los proyectos de terceros vía npm.

## 2. Stack tecnológico

- React >= 18 (peer), `react-dom` (peer), `tailwindcss` v4 (peer; solo Tailwind v4)
- TypeScript, Vite 7 en lib mode (`preserveModules`, salida ESM + CJS), `@tailwindcss/vite`, `tailwind-merge ^3.7.0` (dependency)
- Dependencias de runtime: `react-router-dom`, `react-hook-form`, `zustand`, `framer-motion`, `recharts`, `@tanstack/react-table`, `@dnd-kit/*`, `lucide-react`, `swiper`, `prismjs`, `classnames`, `lodash-es`
- `next >=16` como peer opcional (`next@16.4.3` devDependency); `sideEffects` incluye `**/react-router-navigation.mjs`
- Tests: vitest + jsdom
- Entries del paquete: `.` (JS + tipos), `./styles` (`index.css`), `./theme` (`theme.css`), `./styles-core` (`index-core.css`, ~360 KB contra ~720 KB), `./theme-core`, `./fonts` (`fonts.css`) y `./next` (solo ESM, `vite.config.next.mts`, tipado a mano en `types/next-entry.d.ts`)
- Los externals del build salen de dependencies + peerDependencies (`scripts/external-packages.mjs`); Swiper CSS vive en `theme.css` vía `swiper-vendor.css`
- Build a `dist/ui/tucu-ui`; ahí se publica (`pnpm npm publish --access public`)

## 3. Estructura y patrones

- `src/components/` por dominio: `auth`, `blockchain`, `buttons`, `cards`, `carousel`, `charts`, `common`, `dialog`, `forms`, `icons`, `inputs`, `layouts`, `links`, `list`, `loaders`, `logos`, `macos`, `notifications`, `table`, `tabs`, `typography`, `utils`
- `src/datatable/`, `src/hooks/`, `src/themes/`, `src/docs-kit/`, `src/libs/`
- `src/lucide-react/`, `src/react-router-dom/`, `src/swiper-react/`: re-exports de dependencias para que el consumidor no las instale aparte
- `ThemeProvider` incluye su propio `Router` de react-router: no se anida bajo otro `BrowserRouter`
- `'use client'` en 190 módulos; `scripts/preserve-use-client-plugin.mjs` la repone por módulo ESM
- `src/themes/navigation/`: `core.ts` (`TucuNavigationContext`, `TucuNavigation`, `useTucuNavigation`, `useTucuParams`, `toHref`, sin react-router) y `react-router-navigation.tsx` (`ReactRouterNavigationProvider`, registra el fallback al importarse). Los componentes que navegan usan solo `core`
- `src/next/`: `NextThemeProvider` (next/navigation + next/link sobre `ThemeWrapper`) y `ThemeModeScript` (server); `getThemeModeScript()` en la raíz
- `src/themes/presets/`: registro puro (`defineThemePreset`, `registerThemePresets`, `getThemePreset`, `listThemePresets`, `resetThemePresets`), presets neutros (glass, classic, elegant, fresh, minimal, vibrant), `themePresetToCssVars`, `themePresetToAttributes`, `resolveThemePreset` por host o tenant. Sin marca de consumidor
- `src/themes/components/theme-scope/`: `ThemeScope` (sin estado persistido) y `PortalContainerContext`/`usePortalContainer`
- `src/libs/cn.ts`: `cn()` = classnames + tailwind-merge (extendido con `text-13px` y `shadow-*`), público junto con `extendClassMergeTokens`/`resetClassMergeTokens`
- Carpetas de componentes además de las listadas: `filters`, `feedback`, `lightbox`; SplitModal vive en `components/dialog/split-modal*.ts(x)`
- Los layouts `MarketingLayout` (`MarketingNav`, `MarketingFooter`) y `SplitAuthLayout` son **componentes**, no valores de `LAYOUT_OPTIONS`: se usan dentro de `layout="clean"` o sin layout. Sus links resuelven por `TucuNavigationContext.Link` o caen a `<a>`, y aceptan `renderLink`
- DataTable `mobileCards` renderiza tabla y tarjetas desde el mismo row model y cambia por CSS según el viewport (`datatable/components/DataTable/MobileCards/`)
- `ThemeWrapper`: `layout` sin `themeStyle` impone la familia de tema; `defaultMode` (incluye `"system"`) aplica solo si no hay `theme-storage` al montar; `tooltipDefaults` alimenta a `TooltipDefaultsProvider` (las props de Tooltip pisan al contexto)
- El `maxHeight` default de SplitModal sale de `modalContentMaxHeight(size)` en `modal.tsx`, única fuente
- Render seguro en servidor: `useSyncExternalStore` en `use-breakpoint` y `use-toc`, `usePrefersReducedMotion`, `resolveBasePath`
- Props generadas por `pnpm nx run tucu-ui:generate-props` (script `scripts/generate-props.ts`)

## 4. Convenciones propias

- Superficie pública = `src/index.ts` (más `./next`, cuyo export se declara a mano y lo exige `__tests__/next/next-entry-types.test.ts`); todo componente nuevo se exporta desde ahí y se documenta en `ui/tucu-docs` y en el MCP (`tools/mcp-server`)
- Compatibilidad semver estricta: una 3.x no rompe a los consumidores Vite existentes; cambios incompatibles solo en major
- Tailwind v4 únicamente: nada de `tailwind.config.js` ni utilidades v3
- Cada componente nuevo con test vitest + jsdom
- Targets Nx: `pnpm nx run tucu-ui:build | typecheck | lint | test`; release por tag `tucu-ui-v*` (`pnpm tucu-ui:publish:patch|minor|major`)
- Todo módulo nuevo usa `cn` y pone el `className` del consumidor último; ningún aria-label puede ir fijo en inglés (claves i18n `dialog.close`, `accessDenied.*`, `themeMode.*`)
- **Todo `createPortal` usa `usePortalContainer()`, nunca `document.body`.** `null` = scope sin montar todavía (no se renderiza); `undefined` = fuera de scope (`document.body`)
- Ningún módulo puede leer `window`/`document` durante el render ni importar react-router fuera de `react-router-navigation.tsx` y los providers Vite
- Tokens públicos de componente `--tucu-*`: la librería declara `--tucu-x-default` por modo y los componentes leen `var(--tucu-x, var(--tucu-x-default))`; **nunca declarar `--tucu-x` directo** (un test lo impide). Se declaran en `assets/css/tokens/*.css` (split-modal, surfaces, controls, feedback, table, marketing, auth, datatable-card) con la tríada root (`html:root`), dark (`html.dark`) y scope (`[data-tucu-theme]` y `[data-tucu-theme].dark`), importados desde `theme-core.css`
- **Todo directorio CSS nuevo importado por `theme-core.css` tiene que figurar en `copyThemeCssPlugin` de `vite.config.mts`**; `check-built-imports` falla si el JS compilado importa CSS, inlinea una dependencia o un `@import` relativo del CSS de `dist` no resuelve
- CSS propio en `@layer components` (el de macOS queda sin capa a propósito); reglas opt-in por `data-tucu-cards|buttons|font` en `@layer utilities`; `dark:` excluye un subárbol `data-tucu-mode='light'` (un nivel de inversión)
- Paleta de estados `--tucu-state-<tone>-soft|ink|line` (Badge, StateBadge, FilterPill); vistas de estado con `--tucu-state-view-*`. `--color-page` es el fondo de página canónico (`bg-page`); `--color-body` queda plano y como utility `bg-body`, fuera de `@theme`
- `theme.css` = import de macOS + `theme-core.css`; `./styles-core` y `./theme-core` figuran en las listas de artifacts de `scripts/publish.mjs` y del workflow
- Targets de verificación de build: `check-use-client`, `check-entry-isolation` y `check-built-imports` (dependen de `build`)
- Límites de dependencia: no importa de `apps/*`, `ui/tucu-docs` ni `tools/*`
- Sin comentarios en el código (excepción: una línea en inglés para un POR QUÉ no obvio)

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
