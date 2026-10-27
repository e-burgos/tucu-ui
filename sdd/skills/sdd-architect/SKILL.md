---
name: sdd-architect
description: Skill del Agente Arquitecto SDD. Define schema de DB, contratos de API y decisiones técnicas. Invocar después del Funcional, en paralelo con el Planner.
---

# Skill: sdd-architect

## Input que necesita

- Requisitos funcionales del Agente Funcional
- `sdd/schema.json` — tablas ya definidas (leer el app-key correspondiente)
- `sdd/api.json` — endpoints ya definidos (leer el app-key correspondiente)
- Stack del subproyecto: `sdd/context/[apps|libs|tools]/[nombre]/constitution.md` — **el diseño respeta
  el stack real (ORM, framework, motor de DB), nunca uno asumido**
- Schemas estrictos: `sdd/schemas/api.schema.json` y `sdd/schemas/db-schema.schema.json`
  (toda entrada nueva debe cumplirlos — `additionalProperties: false`)

## Archivos que modifica

- `sdd/schema.json` — agrega tablas **bajo el app-key** del app involucrado
- `sdd/api.json` — agrega endpoints **bajo el app-key** del app involucrado con `"status": "defined"`

## Protocolo de escritura (INVIOLABLE)

Estructura de ambos archivos es **agrupada por app**:

```json
// api.json
{ "example-api": { "endpoints": [ ... ] }, "apps/example-app": { "endpoints": [] } }

// schema.json
{ "example-api": { "tables": { "nombre_tabla": { ... } } } }
```

**CREAR entrada nueva** (campos clave; la lista completa y obligatoria está en
`sdd/schemas/api.schema.json` / `db-schema.schema.json`):

```json
{
  "id": "EP-[NNN]",            // correlativo POR app-key, nunca global
  "status": "defined",
  "created_in_cycle": N,
  "updated_in_cycle": null,
  "changelog": []
  // sin campo "app" — está implícito en el key del objeto padre
  // + method, path, module, spec, description, path_params,
  //   required_headers, request_body, responses (todos obligatorios)
}
```

**MODIFICAR entrada existente:**

```json
{
  "updated_in_cycle": N,
  "status": "updated",
  "changelog": [
    { "cycle": N, "date": "YYYY-MM-DD", "change": "descripción del cambio" }
  ]
}
```

Status válidos: `"defined"` | `"implemented"` | `"updated"` | `"deprecated"`

> ⛔ Después de escribir en `api.json` / `schema.json`: `pnpm sdd:validate` en verde.

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-architect.agent.md` § Registro de consumo: push de tu entrada en
`cycle.json → metrics.usage.by_agent[]` al terminar `architect.md` — no tenés fila propia en
`tasks.json`.
