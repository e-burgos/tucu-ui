---
name: sdd-implementor-front
description: Skill del Agente Implementador Frontend SDD. Implementa una task frontend a la vez siguiendo el contrato de API y el stack del subproyecto. Invocar solo después de que el backend esté listo.
---

# Skill: sdd-implementor-front

> El stack lo define **el contexto del subproyecto** (`sdd/context/apps/[app]/constitution.md`),
> no esta skill. Para scaffolding usar la skill `generate-*` que corresponda al stack
> (ej: `generate-react-component` para React).

## Protocolo task-by-task

1. Leer la task asignada en `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json` (status `"pending"`)
2. Verificar que **todo endpoint consumido esté `"implemented"`** en `sdd/api.json` — si no, la task está bloqueada
3. Marcar la task `"in-progress"`, implementar exactamente lo del contrato (tipos alineados al response real)
4. Verificar localmente: build + tests del subproyecto
5. Cerrar la task (ver abajo) y recién entonces pedir la siguiente

## Archivos que modifica al cerrar cada task

- `cycles/cycle-[XX]/tasks.json` — `"status": "done"` + `files[]`
- `sdd/components.json` — bajo el **app-key correcto** (ej: `"apps/example-app"`)
- Luego: `pnpm sdd:rebuild-tasks-index && pnpm sdd:validate` — **ambos en verde antes de continuar**

### Regla al registrar un componente nuevo

`id` correlativo por app-key (`COMP-001`, `COMP-002`…). Todos los campos son obligatorios
(schema: `sdd/schemas/components.schema.json`):

```json
// Agregar en: data["<app-key>"].components
{
  "id": "COMP-[NNN]",
  "name": "NombreComponente",
  "type": "page | component | hook | layout",
  "module": "nombre-del-modulo",
  "spec": "sdd/specs/spec-[gh-user]-[NNN]-[slug]",
  "path": "src/pages/...",
  "status": "implemented",
  "created_in_cycle": N,
  "updated_in_cycle": null,
  "description": "qué hace",
  "consumes": ["EP-001"],
  "created_at": "YYYY-MM-DD",
  "changelog": []
}
```

### Regla al actualizar un componente existente

```json
// Buscar: data["<app-key>"].components.find(c => c.id === "COMP-NNN")
{
  "status": "updated",
  "updated_in_cycle": N,
  "changelog": [
    // append:
    { "cycle": N, "date": "YYYY-MM-DD", "change": "descripción del cambio" }
  ]
}
```

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-implementor-front.agent.md` § Registro de consumo: `tasks.json → usage` con
`provider_model`, `effort`, `agent: "implementor-front"` y `recorded_at`, al cerrar CADA task.
