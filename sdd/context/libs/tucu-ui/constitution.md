# Constitución — libs/tucu-ui

> Versión 1.0 | Última actualización: cycle-0 (inicial)
> Ruta real: `ui/tucu-ui` (id lógico SDD `libs/tucu-ui`). Paquete npm `@e-burgos/tucu-ui` 3.3.0.

## 1. Propósito

- **Tipo:** react library (publicable en npm)
- **Rol en el sistema:** es el producto central: librería de componentes React con Tailwind v4 (95+ componentes, formularios, gráficos, theming, layouts macOS Sonoma/Tahoe, íconos, componentes blockchain). La consumen `apps/demo`, `apps/test-lib`, `ui/tucu-docs` y los proyectos de terceros vía npm.

## 2. Stack tecnológico

- React >= 18 (peer), `react-dom` (peer), `tailwindcss` v4 (peer; solo Tailwind v4)
- TypeScript, Vite 7 en lib mode (`preserveModules`, salida ESM + CJS), `@tailwindcss/vite`
- Dependencias de runtime: `react-router-dom`, `react-hook-form`, `zustand`, `framer-motion`, `recharts`, `@tanstack/react-table`, `@dnd-kit/*`, `lucide-react`, `swiper`, `prismjs`, `classnames`, `lodash-es`
- Tests: vitest + jsdom (174 archivos de test)
- Entries del paquete: `.` (JS + tipos), `./styles` (`index.css`), `./theme` (`theme.css`), `./fonts` (`fonts.css`)
- Build a `dist/ui/tucu-ui`; ahí se publica (`pnpm npm publish --access public`)

## 3. Estructura y patrones

- `src/components/` por dominio: `auth`, `blockchain`, `buttons`, `cards`, `carousel`, `charts`, `common`, `dialog`, `forms`, `icons`, `inputs`, `layouts`, `links`, `list`, `loaders`, `logos`, `macos`, `notifications`, `table`, `tabs`, `typography`, `utils`
- `src/datatable/`, `src/hooks/`, `src/themes/`, `src/docs-kit/`, `src/libs/`
- `src/lucide-react/`, `src/react-router-dom/`, `src/swiper-react/`: re-exports de dependencias para que el consumidor no las instale aparte
- `ThemeProvider` incluye su propio `Router` de react-router: no se anida bajo otro `BrowserRouter`
- Ningún archivo declara `"use client"` hoy
- Props generadas por `pnpm nx run tucu-ui:generate-props` (script `scripts/generate-props.ts`)

## 4. Convenciones propias

- Superficie pública = `src/index.ts`; todo componente nuevo se exporta desde ahí y se documenta en `ui/tucu-docs` y en el MCP (`tools/mcp-server`)
- Compatibilidad semver estricta: una 3.x no rompe a los consumidores Vite existentes; cambios incompatibles solo en major
- Tailwind v4 únicamente: nada de `tailwind.config.js` ni utilidades v3
- Cada componente nuevo con test vitest + jsdom
- Targets Nx: `pnpm nx run tucu-ui:build | typecheck | lint | test`; release por tag `tucu-ui-v*` (`pnpm tucu-ui:publish:patch|minor|major`)
- Límites de dependencia: no importa de `apps/*`, `ui/tucu-docs` ni `tools/*`
- Sin comentarios en el código (excepción: una línea en inglés para un POR QUÉ no obvio)

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
