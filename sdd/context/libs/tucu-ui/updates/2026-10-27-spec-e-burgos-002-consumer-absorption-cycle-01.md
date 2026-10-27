# libs/tucu-ui — spec-e-burgos-002-consumer-absorption cycle-01 (2026-10-27)

## Estado
- 3.5.0 lista para publicar (pendiente del OK del dueño): primitivas con merge real de clases, a11y, i18n, tamaño `xs` y tokens `--tucu-*`.

## Estructura
- `src/libs/cn.ts`: `cn()` = classnames + tailwind-merge (extendido con `text-13px` y `shadow-*` propios), público, junto con `extendClassMergeTokens`/`resetClassMergeTokens`. Todo módulo nuevo usa `cn` y pone el `className` del consumidor último.
- i18n: claves `dialog.close`, `accessDenied.*` y `themeMode.*`. Ningún aria-label nuevo puede ir fijo en inglés.
- Tokens públicos de componente en `src/assets/css/base.css` (`--tucu-toast-*`, `--tucu-tooltip-*`, `--tucu-skeleton-*`, `--tucu-table-*`, `--tucu-material-solid-bg`), con light en `html:root` y dark en `html.dark`. El CSS propio va en `@layer components`; el de macOS queda sin capa a propósito.
- `ThemeWrapper`: `layout` sin `themeStyle` impone la familia de tema; `defaultMode` aplica solo si no hay `theme-storage` al montar.
- Build: los externals salen de dependencies + peerDependencies (`scripts/external-packages.mjs`). El target `check-built-imports` falla si el JS compilado importa CSS o inlinea una dependencia. Swiper CSS vive en `theme.css` vía `swiper-vendor.css`.

## Dependencias
- `tailwind-merge ^3.7.0` (dependency).

## Qué sigue
- cycle-02 (temas): presets de marca con nombre, `ThemeProvider` con scope, portales que heredan el scope, separar el CSS de macOS como opt-in (~613 KB de `index.css`) y un snippet anti-flash para Next.
