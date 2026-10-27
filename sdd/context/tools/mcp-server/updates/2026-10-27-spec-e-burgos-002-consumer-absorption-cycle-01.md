# tools/mcp-server — spec-e-burgos-002-consumer-absorption cycle-01 (2026-10-27)

## Estado
- Registry al día con las props de c00. Changelog `v3.5.0 (Current)`. Release 0.11.0 pendiente del OK del dueño.

## Estructura
- `component-registry.ts`: Button (`outline`, `xs`, sin wrapper), Modal (`size`, `header`, aria; se corrigió el ejemplo, que usaba `title`), Alert (`live`, `appearance`), Badge (`tone`, `ink`/`line`), Select (`native`, `group`, `xs`), Input/Textarea (`size`), Tooltip (`size`), Collapse (entrada nueva), Card, BasicTable y Skeleton.
- `resources/tokens.ts`: sección «Component tokens (`--tucu-*`)». `resources/best-practices.ts`: `cn()` y `extendClassMergeTokens`.

## Dependencias
- Sin cambios.

## Qué sigue
- c04: recurso `tucu://design-guide`, parámetros `style`/`motion`/`density` y prompt `design-review`.
