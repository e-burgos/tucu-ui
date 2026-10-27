# Constitución — apps/test-lib

> Versión 1.0 | Última actualización: cycle-0 (inicial)

## 1. Propósito

- **Tipo:** react (app privada, scratch)
- **Rol en el sistema:** banco de pruebas de cambios locales de `ui/tucu-ui` antes de publicar, alternando la dependencia con `pnpm tucu-ui:test-local` (`scripts/toggle-local-lib.sh`; `tucu-ui:test-local:npm` vuelve al paquete publicado; `tucu-ui:test-local:status` informa el modo).

## 2. Stack tecnológico

- React + `react-dom`, Vite, `@vitejs/plugin-react`, Tailwind v4 (`@tailwindcss/vite`), TypeScript, ESLint

## 3. Estructura y patrones

- `src/main.tsx`, `src/App.tsx`, `src/router/`
- Descartable: no contiene lógica de producto

## 4. Convenciones propias

- Nunca dejar commiteada la dependencia en modo local (verificar con `pnpm tucu-ui:test-local:status`)
- Targets Nx: `pnpm nx run test-lib:build`, `test-lib:serve`, `test-lib:lint`, `test-lib:typecheck`
- Sin comentarios en el código (excepción: una línea en inglés para un POR QUÉ no obvio)

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
