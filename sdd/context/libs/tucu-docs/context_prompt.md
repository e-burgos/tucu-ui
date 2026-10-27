# Context Prompt — libs/tucu-docs

> Entry point para agentes que trabajen sobre `libs/tucu-docs` (ruta real `ui/tucu-docs`).
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.
> Última actualización: consolidación de spec-e-burgos-001 cycle-01 y spec-e-burgos-002 cycles 01-04. Fecha: 2026-10-27

- **Tipo:** react docs pages library, no publicada
- **Estado:** en uso en producción vía `apps/demo`; documenta `@e-burgos/tucu-ui` 3.8.0 (presets y scopes, componentes absorbidos, layouts de marketing/auth, DataTable `mobileCards`).
- **Cómo correr:** `pnpm nx run tucu-docs:lint`; para verla en vivo `pnpm demo` (`apps/demo`).
- **Relación:** consume `libs/tucu-ui`; la sirve `apps/demo`; debe mantenerse alineada con los recursos del `tools/mcp-server`.

## Qué sigue

- cycle-05 (spec-e-burgos-002): página de la guía de diseño.
- Documentar el entry `@e-burgos/tucu-ui/next` (Next.js 16 App Router) a fondo si hace falta más allá de la introducción.
- Sin tests propios ni target de build: un ciclo que los necesite debe declararlo en su spec.
