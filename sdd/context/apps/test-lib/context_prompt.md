# Context Prompt — apps/test-lib

> Entry point para agentes que trabajen sobre `apps/test-lib`.
> Leer junto con `constitution.md` de este directorio **+ `updates/*.md` en orden de nombre**.

- **Tipo:** react, app privada de pruebas
- **Estado:** operativa; sin ciclos SDD completados todavía.
- **Cómo correr:** `pnpm tucu-ui:test-local` para enlazar la lib local, luego `pnpm test-lib`; volver con `pnpm tucu-ui:test-local:npm`.
- **Uso en SDD:** validar a mano cambios de `libs/tucu-ui` (por ejemplo el futuro entry `/next`) antes de un release.
