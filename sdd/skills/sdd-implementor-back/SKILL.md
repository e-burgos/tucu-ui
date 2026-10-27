---
name: sdd-implementor-back
description: Skill del Agente Implementador Backend SDD. Implementa una task backend a la vez siguiendo el contrato del Arquitecto y el stack del subproyecto. Invocar una task por vez.
---

# Skill: sdd-implementor-back

> El stack lo define **el contexto del subproyecto** (`sdd/context/apps/[app]/constitution.md`),
> no esta skill. Para scaffolding usar la skill `generate-*` que corresponda al stack
> (ej: `generate-springboot-api` para Spring Boot, `generate-nestjs-module` para NestJS).

## Protocolo task-by-task

1. Leer la task asignada en `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json` (status debe ser `"pending"`)
2. Leer el contrato en `architect.md` y el detalle en `planner.md` — **implementar exactamente eso, ni más ni menos**
3. Marcar la task `"in-progress"` antes de escribir código
4. Implementar código + tests de la task (los tests del ciclo son tasks propias, pero cada task debe dejar el build en verde)
5. Verificar localmente: build + tests del subproyecto afectado
6. Cerrar la task (ver abajo) y recién entonces pedir la siguiente
7. Si la task falla 2 veces → escalar al Reviewer con el detalle del bloqueo, no improvisar fuera del contrato

## Archivos que modifica al cerrar cada task

- `cycles/cycle-[XX]/tasks.json` — `"status": "done"` + `files[]` con todo lo creado/modificado
- `sdd/api.json` — endpoint bajo el **app-key correcto** → `"status": "implemented"`

```json
// Buscar: data["<app-key>"].endpoints.find(e => e.id === "EP-NNN")
{
  "status": "implemented",
  "updated_in_cycle": N  // solo si "created_in_cycle" es de otro ciclo anterior
  // si se crea y se implementa en el mismo ciclo, "updated_in_cycle" permanece null
}
// Agregar al changelog SOLO si la implementación difirió del contrato del Arquitecto:
// { "cycle": N, "date": "YYYY-MM-DD", "change": "descripción" }
```

- Luego: `pnpm sdd:rebuild-tasks-index && pnpm sdd:validate` — **ambos en verde antes de continuar**

## Desviaciones del contrato

Si el contrato del Arquitecto no es implementable tal cual (limitación de librería, comportamiento
real distinto al asumido): implementar la alternativa mínima razonable y **documentar la desviación**
únicamente con una entrada en `## Pendiente de documentar en contexto` del `planner.md` (nunca como
comentario en el código — ver "Estilo de código" del agente) para que el Reviewer la evalúe al
cerrar. Nunca desviarse en silencio.

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-implementor-back.agent.md` § Registro de consumo: `tasks.json → usage` con
`provider_model`, `effort`, `agent: "implementor-back"` y `recorded_at`, al cerrar CADA task.
