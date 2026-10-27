# Context Prompt — apps/demo

> Entry point para agentes que trabajen sobre `apps/demo`.
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.

- **Tipo:** react, app privada que sirve el sitio de docs
- **Estado:** en producción; sin ciclos SDD completados todavía.
- **Componentes clave:** `src/App.tsx`, `src/router/`, `src/components/`.
- **Cómo correr:** `pnpm demo` (serve), `pnpm demo:build`; tests de la lib no viven acá.
- **Relación:** consume `@e-burgos/tucu-ui` publicado y `libs/tucu-docs`.
