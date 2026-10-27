---
name: generate-api-contract
description: Genera contratos completos de endpoints REST para el proyecto.
---

# Skill: generate-api-contract

## Después de definir — Actualizar memoria

Agregar cada endpoint en `sdd/api.json` **bajo el app-key correcto**:

```json
// Ejemplo: endpoint de example-api
// sdd/api.json["example-api"].endpoints.push({
{
  "id": "EP-[NNN]",
  "method": "POST",
  "path": "/example-api/...",
  "module": "nombre-modulo",
  "spec": "sdd/specs/spec-[gh-user]-[NNN]-[slug]",
  "status": "defined",
  "created_in_cycle": N,
  "updated_in_cycle": null,
  "description": "...",
  "path_params": [],
  "required_headers": [],
  "request_body": {},
  "responses": { "200": "..." },
  "changelog": []
}
// })
```

App-keys disponibles: `"example-api"`, `"apps/example-app"`. Agregar nuevo key si es un app nuevo.
