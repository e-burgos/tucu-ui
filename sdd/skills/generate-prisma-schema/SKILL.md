---
name: generate-prisma-schema
description: Genera bloques de schema Prisma completos y listos para pegar.
---

# Skill: generate-prisma-schema

## Después de generar — Actualizar memoria

Agregar la tabla en `sdd/schema.json` **bajo el app-key correcto**:

```json
// Ejemplo: tabla de example-api
// sdd/schema.json["example-api"].tables["nombre_tabla"] = {
{
  "module": "nombre-modulo",
  "spec": "sdd/specs/spec-[gh-user]-[NNN]-[slug]",
  "status": "defined",
  "created_in_cycle": N,
  "updated_in_cycle": null,
  "migration_file": "V[N]__create_[nombre_tabla].sql",
  "columns": {
    "id": { "type": "CHAR(36)", "constraints": ["PRIMARY KEY"] }
  },
  "indexes": [],
  "changelog": []
}
// }
```

App-keys disponibles: `"example-api"`. Agregar nuevo key si es un app/lib nuevo.
