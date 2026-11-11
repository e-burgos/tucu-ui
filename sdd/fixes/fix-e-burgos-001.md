# FIX-e-burgos-001 — Deploy del MCP sólo con cambios en `tools/mcp-server`, concurrency y timeout

| Campo | Valor |
| --- | --- |
| **ID** | FIX-e-burgos-001 |
| **Tipo** | IMPROVEMENT |
| **Fecha** | 2026-11-11 |
| **Estado** | implemented |
| **Spec** | N/A (repo-level) |

## Problema
- En octubre la cuenta superó los 3000 min de Actions del plan Pro.
- En este repo, Deploy MCP Server sumó 327 min en 21 corridas.
- Una sola corrida, la del 2026-10-16, quedó colgada 300 min: es el tope por defecto de 6 h, y ningún job tenía `timeout-minutes`. Las demás duran 1-2 min.
- El deploy corría en cada push a main, aunque el push sólo tocara docs, la demo o la librería.

## Solución
- `deploy-mcp.yml` se dispara sólo con cambios en `tools/mcp-server/**` (sin `**/*.md` ni `tests/**`) o en su workflow. Es lo único que copia el Dockerfile que construye Fly.
- `deploy-mcp.yml` suma `workflow_dispatch`, para redesplegar a mano.
- `deploy-mcp.yml` y `deploy-demo.yml` suman `concurrency` con `cancel-in-progress`. El push más nuevo publica desde su propio HEAD.
- `timeout-minutes`: 15 en los deploys y 20 en los publish.
- Los publish siguen disparándose por tag, sin cambios.

## Verificación
- YAML de los cuatro workflows parseado.
- Historial desde el 2026-10-01: 16 de 21 pushes a main siguen disparando el deploy del MCP, porque tocan `tools/mcp-server`. Los otros 5 se evitan.
- La demo usa `@e-burgos/tucu-ui` de npm (`^3.10.0`), así que su filtro actual (`apps/demo/**`, `ui/tucu-docs/**`) ya era correcto.
