# tools/mcp-server — spec-e-burgos-002-consumer-absorption cycle-05 (2026-10-27)

## Estado
- 0.15.0:
  - 16 recursos (nuevo `tucu://design-guide`) y 9 prompts (nuevo `design-review`).
  - `style`/`motion`/`density` en `generate_page` y `generate_component`, y layouts `marketing`/`auth` en `generate_page`.
  - El skill `tucu-ui-design` se distribuye en el paquete, con el bin `tucu-ui-skill`.

## Estructura
- `src/resources/design-guide.ts` (`getDesignGuideContent`) es la **fuente única** de la guía. El build (`scripts/build-skills.mjs`, después de tsc) copia `harness/skills/tucu-ui-design` a `dist/skills/` y genera `references/design-guide.md` desde ese export.
- `src/utils/design-params.ts` (schemas y mappers) y `src/utils/page-layouts.ts` (marketing y auth). **Los parámetros de diseño son opt-in: sin ellos, la salida es idéntica byte a byte, y `framework-parity` lo protege.**
- `src/cli/skill.ts` → bin `tucu-ui-skill` (`install [--dir] [--force]`, `path`, `--help`). Usa solo built-ins de Node.
- La fuente canónica del skill es `harness/skills/tucu-ui-design/`, con symlink en `.claude/skills/` verificado por `scripts/check-harness-symlinks.mjs`.

## Dependencias
- Sin cambios.

## Qué sigue
- Adopción del skill en los consumidores (`npx -p @e-burgos/tucu-ui-mcp tucu-ui-skill install`).
