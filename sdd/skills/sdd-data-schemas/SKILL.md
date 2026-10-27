---
name: sdd-data-schemas
description: >
  Referencia canónica de todos los schemas de datos del sistema SDD.
  Cubre campo por campo cada archivo JSON del registro SDD, valores de status,
  convenciones de IDs, reglas de actualización y anti-patrones frecuentes.
  LECTURA OBLIGATORIA para cualquier agente que cree o modifique documentos SDD
  (api.json, schema.json, components.json, tasks.json, fixes.json, global.json,
  specs/index.json, cycle.json).
---

# Skill: sdd-data-schemas

> ⛔ **LECTURA OBLIGATORIA** para cualquier agente que escriba en un registro SDD.
> Este skill cubre el **contenido** de los archivos. Para rutas y naming ver `sdd-file-structure`.

> 🤖 **Fuente de verdad de máquina:** cada registro tiene un JSON Schema estricto en `sdd/schemas/*.schema.json`
> (`additionalProperties: false`) y declara `$schema`. Si este documento y el schema difieren, **gana el schema**.
> Después de escribir cualquier registro: `pnpm sdd:validate`. Si tocaste tasks: `pnpm sdd:rebuild-tasks-index`.

---

## 0. Reglas globales antes de leer cualquier schema

| Regla                        | Descripción                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Propiedades en inglés**    | Todos los campos JSON usan inglés. `start_date` ✅ `fecha_inicio` ❌                                                                |
| **Nunca borrar entradas**    | Los registros son append-only o deprecate-only. Jamás eliminar un entry.                                                            |
| **`updated_in_cycle: null`** | Se inicializa `null`. Solo cambia cuando hay una modificación posterior al ciclo de creación.                                       |
| **`changelog: []`**          | Siempre empieza vacío. Se appends en cada actualización.                                                                            |
| **Agrupación por app-key**   | `api.json`, `schema.json` y `components.json` tienen estructura `{ "[app-key]": { ... } }`. Nunca escribir en la raíz directamente. |

### App-keys válidos

| App-key              | Descripción                             |
| -------------------- | --------------------------------------- |
| `"example-api"`      | Spring Boot API (apps/example-api)      |
| `"another-api"`      | Otra API backend (apps/another-api)     |
| `"apps/example-app"` | React app (apps/example-app)            |
| `"libs/api-client"`  | Librería compartida (libs/api-client)   |
| `"apps/example-api"` | Spring Boot template (apps/example-api) |

> Agregar nuevas apps/libs según `monorepo.apps` y `monorepo.libs` de `sdd/global.json`.
> Ambos son mapas `nombre -> descripción`; el visor de `pnpm sdd:docs` descubre el contexto de
> cada subproyecto a partir de ellos, así que una lib ausente del mapa no aparece listada.

---

## 1. `sdd/specs/index.json` — Registro de specs

**Responsable:** quien crea la spec (append-only, nunca editar entradas existentes).

### SpecEntry — campos

```json
{
  "id": "spec-[gh-user]-[NNN]-[slug]",
  "author": "[gh-user]",
  "slug": "[slug]",
  "folder": "sdd/specs/spec-[gh-user]-[NNN]-[slug]",
  "file": "sdd/specs/spec-[gh-user]-[NNN]-[slug]/spec-[gh-user]-[NNN]-[slug].spec.md",
  "module": "[nombre-módulo]",
  "app": "apps/[nombre-app]",
  "status": "draft | in-progress | completed | cancelled",
  "title": "Título legible (máx 80 chars)",
  "created_at": "YYYY-MM-DD",
  "completed_at": "YYYY-MM-DD | null",
  "depends_on": ["spec-[gh-user]-[NNN]-[slug]"]
}
```

### Reglas de SpecEntry

- `id` = nombre exacto de la carpeta bajo `sdd/specs/`
- `[NNN]` = contador **personal del dev** (001, 002…). No global.
- `depends_on` = array vacío `[]` si no hay dependencias
- `status` nace `"draft"` (spec escrita o en escritura, sin ciclo abierto — desde v0.11.0;
  `harness add spec` la crea así y registra el módulo en `pending_modules` de `sdd/global.json`).
  El sdd-orchestrator la pasa a `"in-progress"` al crear `cycle-01` de esa spec. Índices previos
  a v0.11.0 tienen `"in-progress"` para specs sin ciclo — el validador sugiere la migración, nunca reescribe datos.
- `completed_at` = `null` mientras `status` es `draft` o `in-progress`
- **Registrar ANTES de crear los archivos del ciclo**

---

## 2. `sdd/global.json` — Estado general del monorepo

**Responsable:** sdd-orchestrator (al iniciar ciclo) + sdd-reviewer (al cerrar ciclo).

### Estructura top-level

```json
{
  "$schema": "./schemas/global.schema.json",
  "project": "[nombre-del-proyecto]",
  "description": "...",
  "version": "1.0.0",
  "profile": "team",
  "completed_modules": [],
  "in_progress_modules": [],
  "pending_modules": [],
  "monorepo": {
    "tool": "Nx",
    "package_manager": "pnpm",
    "apps": {},
    "libs": {}
  }
}
```

> ⚠️ Ya **no existe `current_cycle` global** — la numeración de ciclos es per-spec (`cycles/cycle-XX`).

- `profile` (opcional, desde v0.13.0): `"team"` (default si falta) abre ciclos `flow: "full"`;
  `"solo"` abre `flow: "lite"` (un solo actor, `plan.md`). Lo cambia el **sdd-steward** a pedido
  del dev; el prefijo `[LITE]`/`[FULL]` del pedido gana sobre el perfil. Detalle:
  `sdd/dual-harness/rules/sdd-gates.md` § Flow.

### ModuleEntry — campos

```json
{
  "module": "[nombre-módulo]",
  "spec": "spec-[gh-user]-[NNN]-[slug]",
  "apps": ["apps/[nombre-app]"],
  "cycles_completed": 1,
  "completed_at": "YYYY-MM-DD",
  "description": "Qué hace este módulo (1-2 oraciones)"
}
```

- `apps` es **siempre array** (aunque el módulo toque una sola app).
- `cycles_completed` = cantidad de ciclos de ESA spec con `status: "completed"`.
- `completed_at` y `description` son obligatorios solo en `completed_modules`.

### Ciclo de vida de un módulo en global.json

```
pending_modules → in_progress_modules → completed_modules
```

| Evento                 | Quién            | Acción                                                  |
| ---------------------- | ---------------- | ------------------------------------------------------- |
| Se planifica el módulo | sdd-orchestrator | Agregar a `pending_modules`                             |
| Se inicia el ciclo     | sdd-orchestrator | Mover de `pending` a `in_progress`                      |
| Se cierra el ciclo     | sdd-reviewer     | Mover de `in_progress` a `completed` con `completed_at` |

> ⛔ Regla de concurrencia: **un ciclo activo por spec**. Varios devs pueden tener módulos
> en `in_progress_modules` a la vez (modelo multi-developer), pero una misma spec nunca
> tiene dos ciclos abiertos.

---

## 3. `sdd/api.json` — Registro de endpoints

**Responsable:** sdd-architect (status: `defined`) → sdd-implementor-back (status: `implemented`) → sdd-reviewer.

### Estructura

```json
{
  "_comment": "...",
  "_schema": { ... },
  "[app-key]": {
    "endpoints": [ EndpointEntry ]
  }
}
```

### EndpointEntry — campos

```json
{
  "id": "EP-[NNN]",
  "method": "GET | POST | PUT | PATCH | DELETE",
  "path": "/ruta/del/endpoint/{param}",
  "module": "[nombre-módulo]",
  "spec": "sdd/specs/spec-[gh-user]-[NNN]-[slug]",
  "status": "defined | implemented | updated | deprecated",
  "created_in_cycle": 1,
  "updated_in_cycle": null,
  "description": "Qué hace el endpoint",
  "path_params": ["param1"],
  "required_headers": ["Authorization", "Content-Type"],
  "request_body": {},
  "responses": {
    "200": "descripción de la respuesta OK",
    "400": "descripción del error"
  },
  "changelog": []
}
```

### Reglas de EndpointEntry

| Campo              | Regla                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------- |
| `id`               | Correlativo por app-key: EP-001, EP-002… Nunca global entre apps                       |
| `status`           | `defined` lo escribe el Arquitecto; `implemented` lo escribe el Implementador Back     |
| `path_params`      | `[]` si el endpoint no tiene parámetros en la URL                                      |
| `request_body`     | `{}` si es GET/DELETE sin body                                                         |
| `required_headers` | Listar solo headers que el endpoint **requiere** (no los opcionales)                   |
| `changelog`        | Append al actualizar: `{ "cycle": N, "date": "YYYY-MM-DD", "change": "descripción" }`  |
| Deprecar           | Cambiar `status: "deprecated"` y appendar en changelog. **Nunca eliminar la entrada.** |

---

## 4. `sdd/schema.json` — Registro de tablas de BD

**Responsable:** sdd-architect (diseño) + sdd-implementor-back (migración) + sdd-reviewer.

### Estructura

```json
{
  "_comment": "...",
  "_schema": { ... },
  "[app-key]": {
    "tables": {
      "[nombre_tabla]": TableEntry
    }
  }
}
```

> Solo apps backend tienen tablas. Apps frontend no tienen entradas en schema.json.

### TableEntry — campos

```json
{
  "module": "[nombre-módulo]",
  "spec": "sdd/specs/spec-[gh-user]-[NNN]-[slug]",
  "status": "defined | migrated | updated | deprecated",
  "created_in_cycle": 1,
  "updated_in_cycle": null,
  "migration_file": "V1__create_[tabla].sql",
  "columns": {
    "[nombre_columna]": {
      "type": "CHAR(36) | VARCHAR(255) | BIGINT | TEXT | DATETIME | BOOLEAN | DECIMAL(10,2)",
      "constraints": ["PRIMARY KEY", "NOT NULL", "UNIQUE", "AUTO_INCREMENT"],
      "notes": "Descripción del propósito de la columna"
    }
  },
  "indexes": [
    { "name": "idx_[tabla]_[campo]", "columns": ["campo1"], "unique": false }
  ],
  "changelog": []
}
```

### Reglas de TableEntry

| Campo            | Regla                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `status`         | `defined` = diseñado; `migrated` = script Flyway aplicado                                                 |
| `migration_file` | Formato Flyway: `V{N}__{accion}_{tabla}.sql`. Actualizar en cada ALTER.                                   |
| `columns`        | Usar nombres en `snake_case`                                                                              |
| `indexes`        | `[]` si no hay índices adicionales al PK                                                                  |
| Deprecar tabla   | `status: "deprecated"` + append en changelog. No eliminar la entrada.                                     |
| Agregar columna  | Actualizar `updated_in_cycle`, agregar columna en `columns`, nuevo `migration_file`, append en changelog. |

### ColumnEntry — constraints válidos

```
"PRIMARY KEY"  "NOT NULL"  "UNIQUE"  "AUTO_INCREMENT"
"DEFAULT 'valor'"  "REFERENCES tabla(col)"
```

---

## 5. `sdd/components.json` — Registro de componentes frontend

**Responsable:** sdd-architect (status: `defined`) → sdd-implementor-front (status: `implemented`) → sdd-reviewer.

### Estructura

```json
{
  "_comment": "...",
  "_schema": { ... },
  "[app-key]": {
    "components": [ ComponentEntry ]
  }
}
```

> Solo apps frontend tienen componentes. Usar `"apps/example-app"` como app-key para apps frontend.

### ComponentEntry — campos

```json
{
  "id": "COMP-[NNN]",
  "name": "NombreComponente",
  "type": "page | component | hook | layout",
  "module": "[nombre-módulo]",
  "spec": "sdd/specs/spec-[gh-user]-[NNN]-[slug]",
  "path": "src/pages/[modulo]/NombreComponente.tsx",
  "status": "defined | implemented | updated | deprecated",
  "created_in_cycle": 1,
  "updated_in_cycle": null,
  "description": "Qué hace el componente",
  "consumes": ["EP-001"],
  "created_at": "YYYY-MM-DD",
  "changelog": []
}
```

### Reglas de ComponentEntry

| Campo      | Regla                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `id`       | Correlativo por app-key: COMP-001, COMP-002…                                                                       |
| `name`     | PascalCase. Igual al nombre del archivo sin extensión.                                                             |
| `type`     | `page` = ruta de router; `component` = componente reutilizable; `hook` = custom hook; `layout` = wrapper de layout |
| `path`     | Relativo a la raíz del app (sin `apps/[app]/`)                                                                     |
| `consumes` | Lista de IDs de endpoints que el componente consume vía API client                                                 |

---

## 6. Tasks — per-cycle `tasks.json` + índice `sdd/tasks.json`

> ⛔ **Las tasks canónicas viven en `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json`** (uno por ciclo).
> `sdd/tasks.json` es **solo un índice liviano derivado** — nunca editar detalle de tasks ahí.
> Schemas: `sdd/schemas/cycle-tasks.schema.json` y `sdd/schemas/tasks-index.schema.json`.

### 6a. `cycles/cycle-[XX]/tasks.json` — archivo canónico del ciclo

**Responsable:** sdd-planner (crea) → sdd-implementor-\* (status por task) → sdd-reviewer (cierre).

```json
{
  "$schema": "../../../../schemas/cycle-tasks.schema.json",
  "spec": "spec-[gh-user]-[NNN]-[slug]",
  "cycle": 1,
  "module": "[nombre-módulo]",
  "apps": ["apps/[nombre-app]"],
  "flow": "full",
  "user_stories_generated": true,
  "prerequisites": { "tasks_generated": true },
  "tasks": [ TaskEntry ]
}
```

- `flow: "reduced"` = ciclo de refactor estructural sin HUs; `flow: "lite"` = ciclo de un solo actor
  conducido por `plan.md`. En ambos las tasks pueden tener `user_stories: []`.
- Cada developer/implementador **solo escribe en el archivo de SU ciclo** → sin merge conflicts entre specs.

### 6b. `sdd/tasks.json` — índice (generado)

**Responsable:** sdd-orchestrator (alta de ciclo) + sdd-reviewer (cierre). Se regenera con `pnpm sdd:rebuild-tasks-index`.

```json
{
  "$schema": "./schemas/tasks-index.schema.json",
  "sdd_version": "4.0",
  "specs": {
    "[spec-id]": {
      "cycles": {
        "cycle-[XX]": {
          "file": "sdd/specs/[spec-id]/cycles/cycle-[XX]/tasks.json",
          "module": "[nombre-módulo]",
          "apps": ["apps/[nombre-app]"],
          "status": "in-progress | completed",
          "tasks_total": 10,
          "tasks_done": 10
        }
      }
    }
  }
}
```

> El índice **nunca es fuente de verdad**: si difiere de los per-cycle, regenerarlo.
> `pnpm sdd:validate` falla si el índice está desactualizado.

### TaskEntry — campos

```json
{
  "id": "TASK-[NNN]",
  "title": "Título conciso de la task",
  "user_stories": ["HU-01", "HU-02"],
  "estimation_hours": 2,
  "story_points": 3,
  "depends_on": ["TASK-[NNN]"],
  "status": "pending | in-progress | done | skipped",
  "files": ["apps/[app]/src/ruta/Archivo.java"],
  "usage": {
    "tokens_in": 42000,
    "tokens_out": 8000,
    "duration_minutes": 25,
    "provider_model": "copilot/claude-sonnet",
    "effort": "medium",
    "agent": "implementor-back",
    "approx": true,
    "source": "declared-estimate",
    "recorded_at": "YYYY-MM-DD"
  }
}
```

> ⛔ **TODOS los campos de TaskEntry son obligatorios excepto `usage`** (`additionalProperties: false`
> en el schema). Una task sin `estimation_hours` o `story_points` no pasa `pnpm sdd:validate`.
> `usage` es opcional en el schema para que los registros escritos antes de v0.9.0 sigan validando,
> pero **desde v0.11.0 el protocolo lo exige**: ver §8.1. `provider_model` es el nombre vigente
> del campo (`proveedor/modelo`); `model_tier` es el alias legacy pre-0.11 — se sigue leyendo, ya
> no se escribe. Cuando el harness reporta el consumo del subagente que ejecutó la task
> (`agent-usage-notification`, ej. Claude Code `Agent`), quien recibe la notificación (típicamente
> el orquestador) vuelca ese número exacto acá — `tokens_total` + split 85/15 documentado en
> `tokens_in`/`tokens_out`, `approx: false`.

### Reglas de TaskEntry

| Campo              | Regla                                                                                                               | Responsable        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `id`               | Formato `TASK-[NNN]`: `TASK-001`, `TASK-002`… El scope es el archivo del ciclo — sin prefijo de spec ni ciclo.      | sdd-planner        |
| `title`            | Conciso, en español, describe la acción técnica                                                                     | sdd-planner        |
| `user_stories`     | Historias de usuario del `functional.md` (o `plan.md`) que cubre esta task. `[]` solo si `flow: "reduced"` o `"lite"`. | sdd-planner        |
| `estimation_hours` | **Obligatorio.** Número decimal de horas estimadas (ej: `1`, `1.5`, `3`). Generado por sdd-planner en `planner.md`. | **sdd-planner**    |
| `story_points`     | **Obligatorio.** Entero Fibonacci (1, 2, 3, 5, 8, 13). Escala orientativa: 0.5-1h→1SP, 2h→2SP, 3h→3SP, 4h→5SP.      | **sdd-planner**    |
| `depends_on`       | `[]` si no tiene dependencias. Solo IDs del mismo archivo.                                                          | sdd-planner        |
| `status`           | `pending` al crear; `in-progress`/`done` durante la implementación. `skipped` = **resuelta / no aplica** (requisito caído, trabajo absorbido por otra task, alcance movido): es un cierre válido, no un pendiente. | sdd-implementor-\* |
| `files`            | Lista todos los archivos creados o modificados. Completar al terminar la task.                                      | sdd-implementor-\* |
| `usage`            | Telemetría de la task: tokens + `provider_model` (`proveedor/modelo`) + `agent` + `recorded_at`. Sin contador → estimación con `approx: true`. Ver §8.1. | sdd-implementor-\* |
| Marcar como done   | Cambiar `status: "done"`, completar `files[]` y correr `pnpm sdd:rebuild-tasks-index`                               | sdd-implementor-\* |

### Escala de Story Points recomendada

| Horas estimadas | Story Points | Complejidad |
| --------------- | ------------ | ----------- |
| ≤ 1h            | 1 SP         | Trivial     |
| 1.5 – 2h        | 2 SP         | Simple      |
| 2.5 – 3h        | 3 SP         | Moderada    |
| 3.5 – 4h        | 5 SP         | Alta        |
| > 5h            | 8 SP         | Muy alta    |

> Una task > 8h debe dividirse en subtasks.

---

## 7. `sdd/fixes.json` — Registro global de fixes

**Responsable:** sdd-orchestrator (FIX GATE) + sdd-reviewer (cierre).

### Estructura

```json
{
  "$schema": "./schemas/fixes.schema.json",
  "_description": "...",
  "_version": "3.0.0",
  "_convention": "...",
  "_keywords": ["[FIX]", "[BUGFIX]", "[HOTFIX]", "[IMPROVEMENT]"],
  "fixes": [ FixEntry ]
}
```

### FixEntry — campos

```json
{
  "id": "FIX-[gh-user]-[seq] | FIX-[gh-user]-[spec-NNN]-[seq]",
  "author": "[gh-user]",
  "spec_id": "spec-[gh-user]-[NNN]-[slug] | null",
  "fix_document": "sdd/fixes/fix-[gh-user]-[seq].md | sdd/specs/{spec-id}/fixes/fix-[...].md",
  "type": "HOTFIX | BUGFIX | FIX | IMPROVEMENT",
  "severity": "critical | high | medium | low",
  "created_at": "YYYY-MM-DD",
  "resolved_at": "YYYY-MM-DD | null",
  "validated_at": "YYYY-MM-DD | null",
  "title": "Título del fix (máx 120 chars)",
  "estimation_hours": 1.5,
  "description": "Explicación detallada del problema y la solución",
  "justification": "Why this cannot wait for a full SDD cycle",
  "related_modules": ["[módulo o app afectada]"],
  "affected_files": ["path/to/file1.ts", "path/to/file2.java"],
  "test_reference": "referencia al test que valida el fix | null",
  "status": "pending | in-progress | implemented | validated | absorbed",
  "cycle": "cycle-[XX] | null",
  "usage": {
    "tokens_in": 15000,
    "tokens_out": 3000,
    "provider_model": "claude/sonnet",
    "effort": "medium",
    "agent": "implementor-back",
    "approx": false,
    "source": "session-report",
    "recorded_at": "YYYY-MM-DD"
  }
}
```

### Ciclo de vida del status

```
pending → in-progress → implemented (dev) → validated | absorbed (sdd-reviewer al cerrar el ciclo)
```

- `implemented` exige `resolved_at` (validado por `pnpm sdd:validate`)
- `validated` = el Reviewer confirmó el fix; `absorbed` = la solución se formaliza en la próxima spec
- `usage` — **obligatorio al resolver** (mismos campos que TaskEntry, ver §8.1). Lo registra
  quien resuelve el fix, no el reviewer que lo absorbe. Si participó más de un agente, cada uno
  va en `usage.by_agent[]` y el nivel superior (`tokens_in`/`tokens_out`) es la suma

### Convención de ID de fix

| Tipo                  | Formato                          | Ejemplo            |
| --------------------- | -------------------------------- | ------------------ |
| Repo-level (sin spec) | `FIX-[gh-user]-[seq]`            | `FIX-jdoe-001`     |
| Spec-scoped           | `FIX-[gh-user]-[spec-NNN]-[seq]` | `FIX-jdoe-002-001` |

- `spec_id: null` → fix repo-level → archivo en `sdd/fixes/`
- `spec_id: "spec-..."` → fix spec-scoped → archivo en `sdd/specs/{spec-id}/fixes/`
- `[seq]` = número correlativo dentro de su scope (001, 002…)

---

## 8. `sdd/specs/{spec-id}/cycles/cycle-[XX]/cycle.json` — Estado del ciclo

**Responsable:** sdd-orchestrator (al iniciar, `status: "in-progress"`) → sdd-reviewer (al cerrar, `status: "completed"`).

### Al INICIAR el ciclo (sdd-orchestrator)

```json
{
  "$schema": "../../../../schemas/cycle.schema.json",
  "cycle": 1,
  "module": "[nombre-módulo]",
  "spec": "spec-[gh-user]-[NNN]-[slug]",
  "apps": ["apps/[nombre-app]"],
  "phase": "[nombre-fase]",
  "status": "in-progress",
  "started_at": "YYYY-MM-DD",
  "completed_at": null,
  "documents": {
    "brief": "sdd/specs/{spec-id}/cycles/cycle-[XX]/brief.yaml",
    "functional": "sdd/specs/{spec-id}/cycles/cycle-[XX]/functional.md",
    "planner": "sdd/specs/{spec-id}/cycles/cycle-[XX]/planner.md",
    "architect": "sdd/specs/{spec-id}/cycles/cycle-[XX]/architect.md",
    "tasks": "sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json"
  },
  "artifacts": [],
  "metrics": {
    "tasks_total": 0,
    "tasks_completed": 0,
    "story_points": 0,
    "files_created": [],
    "files_modified": [],
    "files_deleted": [],
    "usage": { "tokens_in": 0, "tokens_out": 0, "by_agent": [] }
  },
  "tables_created": [],
  "endpoints_implemented": [],
  "components_created": [],
  "issues_found": [],
  "reviewer_report": null
}
```

- `apps` es **siempre array**. Campos opcionales: `phase`, `flow` (`"full"` default · `"reduced"` refactor sin HUs · `"lite"` un solo actor con `plan.md`), `objectives`.
- En `documents` solo se listan archivos que existen (un ciclo `flow: "reduced"` puede omitir functional/planner/architect; uno `"lite"` lista `plan` en lugar de esos cuatro).
- **`metrics` no nace `null` desde v0.11.0**: el orquestador lo crea con contadores en 0 y
  `usage.by_agent: []` al abrir el ciclo — es el receptáculo donde cada agente (functional,
  planner, architect, cada task, el propio orquestador) hace push de su entrada al cerrar su
  unidad de trabajo. `tokens_in`/`tokens_out` son obligatorios dentro de `usage` por schema, por
  eso arrancan en `0`; el reviewer los recalcula como suma de `by_agent` al cerrar (§8.1).

### Al CERRAR el ciclo (sdd-reviewer)

```json
{
  "cycle": 1,
  "module": "[nombre-módulo]",
  "spec": "spec-[gh-user]-[NNN]-[slug]",
  "app": "apps/[nombre-app]",
  "phase": "[nombre-fase]",
  "status": "completed",
  "started_at": "YYYY-MM-DD",
  "completed_at": "YYYY-MM-DD",
  "documents": { ... },
  "artifacts": ["sdd/specs/{spec-id}/cycles/cycle-[XX]/artifacts/diagrama.png"],
  "metrics": {
    "tasks_total": 8,
    "tasks_completed": 7,
    "tasks_skipped": 1,
    "story_points": 13,
    "files_created": ["apps/.../Archivo.java"],
    "files_modified": ["apps/.../OtroArchivo.java"],
    "files_deleted": [],
    "usage": {
      "tokens_in": 480000,
      "tokens_out": 62000,
      "duration_minutes": 190,
      "approx": true,
      "source": "declared-estimate",
      "by_agent": [
        { "agent": "functional", "provider_model": "claude/sonnet", "effort": "medium", "tokens_in": 30000, "tokens_out": 4000, "approx": false, "source": "session-report", "recorded_at": "YYYY-MM-DD" },
        { "agent": "implementor-back", "label": "TASK-001", "provider_model": "copilot/claude-sonnet", "effort": "medium", "tokens_in": 420000, "tokens_out": 55000, "approx": true, "source": "declared-estimate", "recorded_at": "YYYY-MM-DD" },
        { "agent": "reviewer", "provider_model": "claude/opus", "effort": "high", "tokens_in": 30000, "tokens_out": 3000, "approx": false, "source": "session-report", "recorded_at": "YYYY-MM-DD" }
      ],
      "by_tier": {
        "claude/sonnet": { "tokens_in": 30000, "tokens_out": 4000, "approx": false, "source": "session-report" },
        "copilot/claude-sonnet": { "tokens_in": 420000, "tokens_out": 55000, "approx": true, "source": "declared-estimate" },
        "claude/opus": { "tokens_in": 30000, "tokens_out": 3000, "approx": false, "source": "session-report" }
      }
    }
  },
  "tables_created": ["nombre_tabla"],
  "endpoints_implemented": ["EP-001"],
  "components_created": ["COMP-001"],
  "issues_found": ["Descripción de issue encontrado y cómo se resolvió"],
  "reviewer_report": {
    "approved": true,
    "date": "YYYY-MM-DD",
    "ca_results": {
      "CA-001": "PASS | FAIL — descripción"
    },
    "tests": {
      "NombreTest": "N/N PASS"
    },
    "notes": "Resumen del ciclo"
  }
}
```

### Reglas de cycle.json

- `cycle.json` **DEBE CREARSE antes de que cualquier agente implementador escriba código**
- `status: "in-progress"` → creado por sdd-orchestrator
- `status: "completed"` → solo el sdd-reviewer puede setearlo
- `artifacts: []` → listar solo archivos de soporte del ciclo, no los archivos implementados
- `tables_created` → nombres de tabla (coinciden con keys en `sdd/schema.json`)
- `endpoints_implemented` → IDs de EP (coinciden con `id` en `sdd/api.json`)
- `components_created` → IDs de COMP (coinciden con `id` en `sdd/components.json`)
- `tasks_skipped` → tasks cerradas como `skipped` (resueltas / no aplican). Ausente se lee como `0`.
  En un ciclo `completed`, `tasks_completed + tasks_skipped` debe igualar `tasks_total`

---

## 8.1 Telemetría de uso (`usage`) — OBLIGATORIA al cerrar

> Alimenta el dashboard de **Costos** del visor SDD, que compara la estimación tradicional
> (horas × tarifa) contra el costo real del modo agéntico. Sin telemetría, el ahorro que
> justifica la metodología no tiene evidencia.

El bloque `usage` vive en tres lugares:

| Dónde                       | Campo                                      | Quién lo escribe                                              | Cuándo              |
| ---------------------------- | ------------------------------------------- | --------------------------------------------------------------- | -------------------- |
| `tasks.json` (por task)      | `usage` (+`provider_model`, `agent`)        | sdd-implementor-\* (o el orquestador si captura la notificación del subagente) | al cerrar la task    |
| `sdd/fixes.json` (por fix)   | `usage` (+`provider_model`, `agent`)        | quien resuelve el fix                                            | al resolverlo        |
| `cycle.json`                 | `metrics.usage` (+`by_agent`, `by_tier`)    | cada agente hace push de su entrada en `by_agent`; sdd-reviewer cierra | al terminar cada documento / al cerrar el ciclo |

> **Quien ejecuta registra; nadie reconstruye al final.** `functional`, `planner` y `architect`
> no tienen fila propia en `tasks.json` — al terminar su documento hacen push de su entrada en
> `cycle.json → metrics.usage.by_agent[]` (el orquestador ya creó `metrics` con `by_agent: []` al
> abrir el ciclo, ver §8). `by_agent` es la **fuente de verdad**: una entrada por unidad de
> trabajo (cada task, cada documento, la coordinación del orquestador, la revisión del reviewer).
> `by_tier` se **deriva** de `by_agent` agrupando por `provider_model` — nunca se llena a mano
> por separado. El reviewer, al cerrar, verifica que `by_agent` tenga una entrada por task `done`
> + una por documento + orquestador + reviewer, deriva `by_tier`, y solo entonces suma
> `tokens_in`/`tokens_out` de nivel superior. Su propia estimación cubre únicamente lo que
> ninguna unidad registró. Una suma que mezcla medido con estimado queda `approx: true` en esa
> entrada de `by_tier`: un total es tan honesto como su parte más floja.

### Campos

| Campo             | Regla                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `tokens_in/out`   | **Obligatorios** dentro de `usage`. Enteros ≥ 0.                                                            |
| `tokens_total`    | Total exacto cuando la fuente reporta un único número (`agent-usage-notification`). `tokens_in`/`tokens_out` llevan igual el split documentado 85/15 para que la fórmula de costo funcione; el visor muestra `tokens_total`. |
| `duration_minutes`| Opcional.                                                                                                    |
| `provider_model` / `model_tier` | **Proveedor y modelo son obligatorios.** Claves `proveedor/modelo`: `claude/opus`, `gemini/pro`, `copilot/claude-sonnet`. Antigravity registra bajo `gemini/*` (corre modelos Gemini). Claves legacy sueltas (`haiku`, `sonnet`, `opus`, `fable`) se leen como `claude/*`. `model_tier` es el alias legacy pre-0.11: se sigue leyendo, ya no se escribe. |
| `effort`          | Nivel de esfuerzo/razonamiento **declarado antes de ejecutar** (regla ⚙️): `low\|medium\|high\|xhigh\|max` en Claude, `minimal\|low\|medium\|high` en Gemini. |
| `agent`           | Rol SDD que hizo el trabajo (`functional\|planner\|architect\|implementor-back\|implementor-front\|reviewer\|orchestrator\|steward\|hermes\|custom`). Obligatorio en `by_agent[]`; `custom` lleva `label`. |
| `recorded_at`     | Fecha (o datetime ISO) en que se cerró la unidad. |
| `approx`          | `true` = estimación declarada; `false`/ausente = leído de un contador. El visor muestra **estimado** en la columna Origen. |
| `source`          | `session-report` (Claude Code) · `stats-command` (`/stats` de Gemini CLI) · `api-usage` · `agent-usage-notification` (Claude Code: conteo exacto que el harness reporta al padre al terminar un subagente — `<usage><subagent_tokens>N</subagent_tokens>…</usage>`, `approx: false`) · `declared-estimate` (Copilot, Antigravity, o cualquier caso sin contador — `approx: true` obligatorio). |

### La regla que reemplaza al "ante la duda, omitir"

**Nunca se omite la telemetría por no tener un contador exacto.** El modelo siempre se conoce
—es el que estás usando— y el orden de magnitud del consumo también. Los arneses sin contador
por sesión (**GitHub Copilot**, **Antigravity**) registran una estimación declarada:

```json
"usage": { "tokens_in": 480000, "tokens_out": 62000, "provider_model": "copilot/claude-sonnet", "effort": "medium", "agent": "implementor-back", "approx": true, "source": "declared-estimate", "recorded_at": "YYYY-MM-DD" }
```

`/stats` (Gemini CLI) y el reporte de uso de la sesión (Claude Code) son comandos del cliente:
un agente **no puede ejecutarlos**. Pedíselos al dev si querés el número medido; si no están a
mano, registrá la estimación y seguí — un ciclo cerrado sin `usage` es un cierre incompleto.

En Claude Code, cuando un agente dispara un subagente con la tool `Agent`, la notificación de
cierre trae el conteo exacto (`agent-usage-notification`) — quien la recibe (orquestador o
reviewer) lo vuelca directo en `tasks[].usage` y en `by_agent`, sin pedirle nada al dev.

Lo único prohibido es **inventar un número preciso y presentarlo como medido**: `approx: false`
sin contador detrás (y `approx: false` combinado con `source: declared-estimate` es un error
del validador, no un warning). `pnpm sdd:validate` marca **error** si un ciclo `completed` (o un
fix resuelto) desde el 2026-09-02 no tiene `usage` con proveedor/modelo y tokens; **warning** si
`by_agent` falta o `sum(by_agent) ≠ by_tier`. Registros anteriores a esa fecha solo generan warning.

---

## 9. Valores de status por registro

| Registro                | Status válidos                                                   | Progresión                                                  |
| ----------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- |
| `index.json` (specs)    | `draft`, `in-progress`, `completed`, `cancelled`                 | draft → in-progress (orquestador al abrir cycle-01) → completed |
| `api.json` (endpoints)  | `defined`, `implemented`, `updated`, `deprecated`                | defined → implemented → updated\*                           |
| `schema.json` (tablas)  | `defined`, `migrated`, `updated`, `deprecated`                   | defined → migrated → updated\*                              |
| `components.json`       | `defined`, `implemented`, `updated`, `deprecated`                | defined → implemented → updated\*                           |
| tasks per-cycle (tasks) | `pending`, `in-progress`, `done`, `skipped`                      | pending → in-progress → done \| skipped\*\*                   |
| `fixes.json` (fixes)    | `pending`, `in-progress`, `implemented`, `validated`, `absorbed` | pending → in-progress → implemented → validated \| absorbed |
| `cycle.json`            | `in-progress`, `completed`                                       | in-progress → completed                                     |

> \* `updated` se puede repetir múltiples veces (con nuevo `updated_in_cycle` y entrada en `changelog`).
>
> \*\* `done` y `skipped` son ambos **terminales**: una task `skipped` está resuelta (no aplica),
> no pendiente. El ciclo cierra cuando `tasks_completed + tasks_skipped == tasks_total`, y el visor
> la cuenta como resuelta en el progreso.

---

## 10. Convenciones de IDs

| Tipo                | Formato                          | Scope                                               | Ejemplo                            |
| ------------------- | -------------------------------- | --------------------------------------------------- | ---------------------------------- |
| Spec                | `spec-[gh-user]-[NNN]-[slug]`    | Personal por dev                                    | `spec-jdoe-001-enrollment-request` |
| Endpoint            | `EP-[NNN]`                       | Correlativo por app-key                             | `EP-001`, `EP-002`                 |
| Tabla               | nombre directo (key en `tables`) | Por app-key                                         | `enrollment_requests`              |
| Componente          | `COMP-[NNN]`                     | Correlativo por app-key                             | `COMP-001`, `COMP-002`             |
| Task                | `TASK-[NNN]`                     | Por archivo de ciclo (`cycles/cycle-XX/tasks.json`) | `TASK-001`, `TASK-002`             |
| Fix repo-level      | `FIX-[gh-user]-[seq]`            | Global del repo                                     | `FIX-jdoe-001`                     |
| Fix spec-level      | `FIX-[gh-user]-[spec-NNN]-[seq]` | Por spec                                            | `FIX-jdoe-002-001`                 |
| Historia usuario    | `HU-[NN]`                        | Por ciclo                                           | `HU-01`, `HU-02`                   |
| Criterio aceptación | `CA-[NNN]`                       | Por ciclo                                           | `CA-001`, `CA-002`                 |

---

## 11. Anti-patrones frecuentes (EVITAR)

| Anti-patrón                                              | Correcto                                                                                                   |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Escribir en la raíz de `api.json` (fuera del app-key)    | Siempre bajo `{ "[app-key]": { "endpoints": [...] } }`                                                     |
| Usar `fecha_inicio`, `estado`, `ciclo`                   | Usar `start_date`, `status`, `cycle`                                                                       |
| Eliminar una entrada de cualquier registro               | Usar `status: "deprecated"` + entrada en `changelog`                                                       |
| `updated_in_cycle: 1` cuando se crea en ciclo 1          | `updated_in_cycle: null` al crear, solo actualizar en ciclos posteriores                                   |
| `cycle.json` con `status: "completed"` creado al inicio  | Siempre `status: "in-progress"` al crear; solo sdd-reviewer cambia a `"completed"`                         |
| `changelog` con datos en la primera entrada del registro | `changelog: []` al crear; solo appendar en actualizaciones posteriores                                     |
| Crear cycle.json después de empezar la implementación    | cycle.json DEBE existir ANTES de cualquier código                                                          |
| Usar el mismo contador NNN entre devs                    | El contador `[NNN]` es personal de cada dev (no global)                                                    |
| Mezclar fixes repo-level con spec-level                  | Repo-level → `sdd/fixes/`; spec-level → `sdd/specs/{spec-id}/fixes/`                                       |
| Task sin `estimation_hours` o `story_points`             | sdd-planner DEBE generar ambos campos en `planner.md` antes de hacer merge                                 |
| Editar detalle de tasks en `sdd/tasks.json`              | El índice es generado — editar el `tasks.json` del ciclo y correr `pnpm sdd:rebuild-tasks-index`           |
| Inventar campos nuevos en un registro                    | Los schemas usan `additionalProperties: false` — un campo nuevo requiere actualizar `sdd/schemas/` primero |
| Escribir un registro y no validar                        | Correr `pnpm sdd:validate` después de CUALQUIER escritura en `sdd/**/*.json`                               |

---

## 12. Regla de sincronización entre registros

Cuando el sdd-reviewer cierra un ciclo, **todos estos archivos deben actualizarse en la misma operación**:

```
cycle.json                        → status: "completed", completed_at, metrics, reviewer_report
global.json                       → mover módulo de in_progress a completed
specs/index.json                  → status: "completed" + completed_at (si era el último ciclo de la spec)
api.json                          → status: "implemented" en endpoints del ciclo
schema.json                       → status: "migrated" en tablas del ciclo
components.json                   → status: "implemented" en componentes del ciclo
cycles/cycle-XX/tasks.json        → status: "done" en todas las tasks del ciclo
sdd/tasks.json                    → regenerar: pnpm sdd:rebuild-tasks-index
context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md
                                  → fragmento aditivo con el delta del ciclo (mecanismo 🧩;
                                    los archivos base solo los toca la consolidación)
```

> ⛔ Si `cycle.json` queda en `status: "completed"` sin que los demás registros estén actualizados,
> el sistema SDD pierde consistencia. El sdd-reviewer es responsable de la sincronización completa.
> **El cierre no es válido hasta que `pnpm sdd:validate` esté en verde.**

---

## 13. Skills relacionados

| Skill                   | Relación con este skill                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `sdd-orchestrator`      | Escribe en `global.json` §5, `cycle.json` §8, `specs/index.json` §9                          |
| `sdd-planner`           | Escribe en `tasks.json` §6 — responsable de `estimation_hours` y `story_points`              |
| `sdd-architect`         | Escribe en `api.json` §2 y `schema.json` §3                                                  |
| `sdd-reviewer`          | Valida y cierra todos los registros del ciclo; único autorizado a marcar `status: completed` |
| `sdd-implementor-back`  | Actualiza `api.json` §2 al implementar endpoints                                             |
| `sdd-implementor-front` | Registra en `components.json` §4                                                             |
| `sdd-functional`        | Sus HUs quedan referenciadas en `tasks.json` campo `user_stories`                            |
| `sdd-file-structure`    | Complementario — define **dónde** van los archivos; este skill define **qué va dentro**      |
