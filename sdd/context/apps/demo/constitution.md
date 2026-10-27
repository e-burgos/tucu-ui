# Constitución — apps/demo

> Versión 1.0 | Última actualización: cycle-0 (inicial)

## 1. Propósito

- **Tipo:** react (app privada)
- **Rol en el sistema:** host del sitio de documentación (https://ui.estebanburgos.com.ar): monta las páginas de `ui/tucu-docs` y consume el paquete **publicado** `@e-burgos/tucu-ui`, así verifica cada release contra el artefacto real de npm. Se despliega con `.github/workflows/deploy-demo.yml`.

## 2. Stack tecnológico

- React + `react-dom`, Vite, `@vitejs/plugin-react`, Tailwind v4 (`@tailwindcss/vite`), TypeScript, ESLint
- Depende de `@e-burgos/tucu-ui` y `@e-burgos/tucu-docs`

## 3. Estructura y patrones

- `src/main.tsx`, `src/App.tsx`, `src/router/`, `src/components/`, `src/hooks/`, `src/utils/`
- Rutas del sitio definidas en `src/router/`, con las páginas importadas de `tucu-docs`

## 4. Convenciones propias

- Solo consume la API pública publicada de la lib; si hace falta probar cambios sin publicar, se usa `apps/test-lib`
- Targets Nx: `pnpm nx run demo:build`, `demo:serve`, `demo:lint`, `demo:typecheck`
- Sin comentarios en el código (excepción: una línea en inglés para un POR QUÉ no obvio)

> Las actualizaciones por ciclo/fix van como fragmentos aditivos en `updates/` —
> este archivo base solo lo modifica la consolidación (ver `sdd/context/context_prompt.md` sección 6).
