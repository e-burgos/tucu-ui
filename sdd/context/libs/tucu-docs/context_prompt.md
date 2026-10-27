# Context Prompt — libs/tucu-docs

> Entry point para agentes que trabajen sobre `libs/tucu-docs` (ruta real `ui/tucu-docs`).
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.

- **Tipo:** react docs pages library, no publicada
- **Estado:** en uso en producción vía `apps/demo`; sin ciclos SDD completados todavía.
- **Cómo correr:** `pnpm nx run tucu-docs:lint`; para verla en vivo `pnpm demo` (`apps/demo`).
- **Relación:** consume `libs/tucu-ui`; la sirve `apps/demo`; debe mantenerse alineada con los recursos del `tools/mcp-server`.

## Qué sigue

- Documentar el soporte Next.js 16 App Router (entry `@e-burgos/tucu-ui/next`) cuando la lib lo publique.
- Sin tests propios ni target de build: un ciclo que los necesite debe declararlo en su spec.
