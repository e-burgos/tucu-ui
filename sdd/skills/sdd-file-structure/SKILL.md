---
name: sdd-file-structure
description: >
  Referencia canónica de la estructura de archivos del sistema SDD de este monorepo.
  Contiene convenciones de naming, árboles de directorios y templates completos de cada
  documento de ciclo. LECTURA OBLIGATORIA para el agente sdd-orchestrator antes de
  crear, mover o referenciar cualquier archivo SDD.
---

# Skill: sdd-file-structure

> ⛔ **LECTURA OBLIGATORIA** para el sdd-orchestrator al inicio de cada ciclo.
> Antes de crear o referenciar cualquier archivo SDD, verificar contra este documento.

> 📌 **Skill complementaria:** `sdd-data-schemas` — cubre los schemas campo-a-campo de cada registro JSON.
> Este skill cubre **dónde** van los archivos. `sdd-data-schemas` cubre **qué va dentro** de cada archivo.

---

## 1. Árbol completo del directorio `sdd/`

```
sdd/
├── global.json                    ← Estado general del proyecto (fuente de verdad — solo specs mergeadas a master)
├── schema.json                    ← Tablas de BD definidas hasta el momento
├── schemas/                       ← JSON Schemas estrictos de TODOS los registros (fuente de verdad de máquina)
├── api.json                       ← Endpoints implementados hasta el momento
├── components.json                ← Componentes frontend creados
├── tasks.json                     ← ÍNDICE de tasks (generado — canónico: cycles/cycle-XX/tasks.json)
├── fixes.json                     ← Índice global de fixes (spec_id: null = repo-level, spec_id: "spec-..." = spec-scoped)
├── fixes/                         ← Un archivo por fix repo-level (no vinculados a ninguna spec)
│   └── fix-[gh-user]-[seq].md     ← Ej: fix-jdoe-001.md
│
├── specs/
│   ├── index.json                 ← Registro global de specs (append-only, sin last_id)
│   └── spec-[gh-user]-[NNN]-[slug]/    ← Una carpeta por spec
│       ├── spec-[gh-user]-[NNN]-[slug].spec.md   ← Especificación del módulo
│       ├── fixes/                 ← Un archivo por fix vinculado a esta spec
│       │   └── fix-[gh-user]-[spec-NNN]-[seq].md  ← Ej: fix-jdoe-002-001.md
│       └── cycles/
│           └── cycle-[XX]/        ← Una subcarpeta por ciclo (zero-padded, reseteados por spec)
│               ├── brief.yaml     ← Generado por: sdd-orchestrator  (al INICIAR el ciclo)
│               ├── functional.md  ← Generado por: sdd-functional    (antes de planner/architect)
│               ├── planner.md     ← Generado por: sdd-planner       (en paralelo con architect)
│               ├── architect.md   ← Generado por: sdd-architect     (en paralelo con planner)
│               ├── plan.md        ← Solo flow "lite": un solo actor, reemplaza brief/functional/planner/architect
│               ├── tasks.json     ← Creado por: sdd-planner (o el actor lite) — tasks canónicas del ciclo
│               └── cycle.json     ← Creado por: sdd-orchestrator    (al INICIAR, status:"in-progress", flow)
│                                     Cerrado por: sdd-reviewer      (al CERRAR, status:"completed")
│
├── context/
│   ├── constitution.md            ← Constitución GLOBAL del monorepo (NO modificar manualmente)
│   ├── context_prompt.md          ← Entry point GLOBAL para todos los agentes
│   ├── apps/
│   │   ├── example-api/
│   │   │   ├── constitution.md    ← Stack, reglas, arquitectura de esta app
│   │   │   ├── context_prompt.md  ← Entry point para agentes que trabajan esta app
│   │   │   └── updates/           ← Fragmentos aditivos pendientes de consolidar (patrón changesets)
│   │   │       └── YYYY-MM-DD-[spec-id]-cycle-[XX].md
│   │   ├── example-app/
│   │   │   ├── constitution.md
│   │   │   ├── context_prompt.md
│   │   │   └── updates/
│   │   └── example-api/
│   │       ├── constitution.md
│   │       ├── context_prompt.md
│   │       └── updates/
│   ├── libs/
│   │   ├── api-client/
│   │   │   ├── constitution.md
│   │   │   ├── context_prompt.md
│   │   │   └── updates/
│   │   └── config/
│   │       ├── constitution.md
│   │       ├── context_prompt.md
│   │       └── updates/
│   └── tools/
│       └── (una subcarpeta por herramienta cuando se agregue, con su propio updates/)
│
├── agents/
│   ├── sdd-orchestrator.agent.md
│   ├── sdd-functional.agent.md
│   ├── sdd-planner.agent.md
│   ├── sdd-architect.agent.md
│   ├── sdd-implementor-back.agent.md
│   ├── sdd-implementor-front.agent.md
│   └── sdd-reviewer.agent.md
│
├── skills/
│   ├── sdd-file-structure/        ← ⬅ este archivo (lectura obligatoria)
│   │   └── SKILL.md
│   ├── sdd-orchestrator/
│   │   └── SKILL.md
│   ├── sdd-functional/
│   │   └── SKILL.md
│   ├── sdd-planner/
│   │   └── SKILL.md
│   ├── sdd-architect/
│   │   └── SKILL.md
│   ├── sdd-implementor-back/
│   │   └── SKILL.md
│   ├── sdd-implementor-front/
│   │   └── SKILL.md
│   ├── sdd-reviewer/
│   │   └── SKILL.md
│   ├── generate-springboot-api/
│   │   └── SKILL.md
│   ├── generate-react-component/
│   │   └── SKILL.md
│   ├── generate-api-contract/
│   │   └── SKILL.md
│   ├── generate-nestjs-module/
│   │   └── SKILL.md
│   ├── generate-prisma-schema/
│   │   └── SKILL.md
│   ├── sdd-data-schemas/
│   │   └── SKILL.md
│   └── setup-graphify/
│       └── SKILL.md
│
├── prompts/
│   ├── check-spec-before-implement.prompt.md
│   ├── start-sdd-cycle.prompt.md
│   ├── review-cycle.prompt.md
│   └── hotfix-bypass-gate.prompt.md
│
└── docs/                          ← Visor SDD (JS vanilla, sin build, sin dependencias — reemplaza a apps/docs)
    ├── index.html
    ├── app.js
    ├── styles.css
    ├── serve.mjs                  ← `pnpm sdd:docs` levanta este server y lee los registros en vivo
    └── fonts/
```

---

## 2. Convenciones de naming (INVIOLABLES)

### 2.1 Specs

| Elemento         | Convención                                                           | Ejemplo                                           |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| Carpeta          | `sdd/specs/spec-[gh-user]-[NNN]-[slug]/`                             | `spec-jdoe-001-enrollment-request/`               |
| Archivo          | `spec-[gh-user]-[NNN]-[slug].spec.md`                                | `spec-jdoe-001-enrollment-request.spec.md`        |
| ID (string)      | `spec-[gh-user]-[NNN]-[slug]` — mismo nombre que la carpeta          | `spec-jdoe-001-enrollment-request`                |
| `[gh-user]`      | Username de GitHub del dev que crea la spec (namespace personal)     | `jdoe`, `asmith`                                  |
| `[NNN]`          | Contador **personal del dev** (001, 002…) — NO global, no coordinado | `001` para su primera spec, `002` para la segunda |
| Slug             | kebab-case, descriptivo, máx 5 palabras                              | `enrollment-request`                              |
| Registro         | SIEMPRE en `sdd/specs/index.json` (append-only) antes de usarla      | —                                                 |
| Fixes repo-level | `sdd/fixes/fix-[gh-user]-[seq].md`                                   | `sdd/fixes/fix-jdoe-001.md`                       |
| Fixes spec-level | `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md`        | `fixes/fix-jdoe-002-001.md`                       |

### 2.2 Ciclos

| Elemento   | Convención                                                                  | Ejemplo                                                                     |
| ---------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Subcarpeta | `sdd/specs/{spec-id}/cycles/cycle-[XX]/` (2 dígitos, zero-padded, por spec) | `spec-jdoe-001-enrollment-request/cycles/cycle-01/`                         |
| Numeración | Reseteada por spec: `cycle-01`, `cycle-02`... Nunca global                  | La spec-001 tiene su cycle-01; la spec-002 también tiene su propio cycle-01 |
| brief      | `brief.yaml` (siempre lowercase, sin prefijo)                               | `cycles/cycle-01/brief.yaml`                                                |
| functional | `functional.md`                                                             | `cycles/cycle-01/functional.md`                                             |
| planner    | `planner.md`                                                                | `cycles/cycle-01/planner.md`                                                |
| architect  | `architect.md`                                                              | `sdd/specs/{spec-id}/cycles/cycle-01/architect.md`                          |
| cycle JSON | `cycle.json`                                                                | `sdd/specs/{spec-id}/cycles/cycle-01/cycle.json`                            |
| plan       | `plan.md` — **solo `flow: "lite"`**, reemplaza brief/functional/planner/architect | `cycles/cycle-01/plan.md`                                             |

> ⛔ **PROHIBIDO** usar el formato plano antiguo:
> ~~`cycle-1-brief.yaml`~~, ~~`cycle-1-functional.md`~~, ~~`cycle-1.json`~~
> Siempre subcarpeta + nombre de archivo simple.

### 2.3 Contextos de subproyecto

| Elemento                                    | Convención                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| Apps                                        | `sdd/context/apps/[nombre-de-la-app]/constitution.md`                                 |
| Apps                                        | `sdd/context/apps/[nombre-de-la-app]/context_prompt.md`                               |
| Libs                                        | `sdd/context/libs/[nombre-de-la-lib]/constitution.md`                                 |
| Libs                                        | `sdd/context/libs/[nombre-de-la-lib]/context_prompt.md`                               |
| Tools                                       | `sdd/context/tools/[nombre-del-tool]/constitution.md`                                 |
| Tools                                       | `sdd/context/tools/[nombre-del-tool]/context_prompt.md`                               |
| Updates (fragmento aditivo, ciclo)          | `sdd/context/[apps\|libs\|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md` |
| Updates (fragmento aditivo, fix repo-level) | `sdd/context/[apps\|libs\|tools]/[nombre]/updates/YYYY-MM-DD-fix-[gh-user]-[seq].md`  |

> ⛔ **Durante un ciclo/fix NUNCA se editan directamente** `constitution.md` ni
> `context_prompt.md` del subproyecto: toda actualización de contexto es un fragmento
> nuevo en `updates/`. El nombre incluye el spec-id (con el gh-user del dev) → único por
> construcción, sin choques entre devs. Ver plantilla del fragmento en la sección 3.7 y
> el mecanismo completo de consolidación en la sección 6.

---

## 3. Templates de archivos de ciclo

### 3.1 Template: `brief.yaml`

```yaml
# sdd/specs/{spec-id}/cycles/cycle-[XX]/brief.yaml
# Generado por: sdd-orchestrator
# Al: iniciar el ciclo

cycle: <N> # número entero (ej: 1)
module: <nombre-modulo> # igual al key en global.json
phase: <nombre-fase> # ej: "domain-models", "api-layer"
date: <YYYY-MM-DD>
app_context: sdd/context/apps/<app>/context_prompt.md

objective: |
  <Una oración que describe qué se logra al finalizar este ciclo.>

scope:
  - <cosa incluida 1>
  - <cosa incluida 2>

out_of_scope:
  - <cosa excluida 1>

dependencies_required:
  - <módulo o ciclo previo que debe estar completed>

agent_contexts:
  functional:
    goal: <qué debe lograr el agente funcional>
    business_context: <contexto de negocio mínimo para entender el módulo>
    relevant_spec_sections:
      - <sección de la spec más relevante>

  planner:
    goal: <qué debe lograr el planner>
    output_file: sdd/specs/{spec-id}/cycles/cycle-[XX]/planner.md

  architect:
    goal: <qué debe lograr el arquitecto>
    existing_tables: [] # tablas relacionadas de sdd/schema.json
    existing_endpoints: [] # endpoints relacionados de sdd/api.json
    output_file: sdd/specs/{spec-id}/cycles/cycle-[XX]/architect.md

  implementor_back:
    goal: <qué implementa>
    app: apps/<nombre-app>
    app_context: sdd/context/apps/<app>/context_prompt.md

  implementor_front:
    goal: <qué implementa>
    app: apps/<nombre-app>
    app_context: sdd/context/apps/<app>/context_prompt.md

  reviewer:
    goal: Validar todo el output del ciclo
    output_file: sdd/specs/{spec-id}/cycles/cycle-[XX]/cycle.json
```

---

### 3.2 Template: `cycle.json` (al INICIAR — sdd-orchestrator)

> ⛔ Debe validar contra `sdd/schemas/cycle.schema.json` (`pnpm sdd:validate` tras crearlo).

```json
{
  "$schema": "../../../../schemas/cycle.schema.json",
  "cycle": 1,
  "module": "<nombre-del-modulo>",
  "spec": "spec-[gh-user]-[NNN]-[slug]",
  "apps": ["apps/<nombre-app>"],
  "phase": "<nombre-de-la-fase>",
  "objectives": ["<objetivo 1>", "<objetivo 2>"],
  "status": "in-progress",
  "started_at": "YYYY-MM-DD",
  "completed_at": null,
  "documents": {
    "brief": "sdd/specs/{spec-id}/cycles/cycle-[XX]/brief.yaml"
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

> ⛔ `cycle.json` **DEBE EXISTIR con `status: "in-progress"` ANTES de que cualquier
> agente implementador escriba una línea de código.**
> Ningún ciclo puede iniciarse sin este archivo.
>
> Desde v0.11.0, `metrics` **no nace `null`**: el orquestador lo crea con contadores en 0 y
> `usage.by_agent: []` — es donde cada agente (functional, planner, architect, cada task, el
> orquestador y el reviewer) hace push de su entrada al cerrar su unidad de trabajo. Detalle
> completo en `sdd-data-schemas` §8.1.

---

### 3.3 Template: `cycle.json` (al CERRAR — sdd-reviewer)

> El Reviewer completa `documents` (con todos los que existan, incluido `tasks`), `metrics`,
> los arrays de trazabilidad y el `reviewer_report`. Nunca inventar campos fuera del schema.

```json
{
  "$schema": "../../../../schemas/cycle.schema.json",
  "cycle": 1,
  "module": "<nombre-del-modulo>",
  "spec": "spec-[gh-user]-[NNN]-[slug]",
  "apps": ["apps/<nombre-app>"],
  "phase": "<nombre-de-la-fase>",
  "objectives": ["<objetivo 1>"],
  "status": "completed",
  "started_at": "YYYY-MM-DD",
  "completed_at": "YYYY-MM-DD",
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
    "usage": {
      "tokens_in": 0,
      "tokens_out": 0,
      "by_agent": ["<una entrada por task done + documento + orquestador + reviewer>"],
      "by_tier": "<derivado de by_agent, agrupado por provider_model>"
    }
  },
  "tables_created": [],
  "endpoints_implemented": ["EP-001"],
  "components_created": [],
  "issues_found": [],
  "reviewer_report": {
    "approved": true,
    "date": "YYYY-MM-DD",
    "ca_results": { "CA-001": "PASS — evidencia" },
    "tests": { "sdd:validate": "OK", "suite": "N/N PASS" },
    "notes": "<resumen del ciclo>",
    "follow_ups": []
  }
}
```

---

### 3.3b Template: `tasks.json` per-cycle (sdd-planner)

> ⛔ Debe validar contra `sdd/schemas/cycle-tasks.schema.json`. IDs: `TASK-[NNN]` (scope: este archivo).

```json
{
  "$schema": "../../../../schemas/cycle-tasks.schema.json",
  "spec": "spec-[gh-user]-[NNN]-[slug]",
  "cycle": 1,
  "module": "<nombre-del-modulo>",
  "apps": ["apps/<nombre-app>"],
  "flow": "full",
  "user_stories_generated": true,
  "prerequisites": { "tasks_generated": true },
  "tasks": [
    {
      "id": "TASK-001",
      "title": "<acción técnica concreta>",
      "user_stories": ["HU-01"],
      "estimation_hours": 2,
      "story_points": 2,
      "depends_on": [],
      "status": "pending",
      "files": []
    }
  ]
}
```

---

### 3.4 Template: `functional.md`

```markdown
# Functional — Cycle [N]: [Nombre del Módulo]

> **Input:** sdd/specs/{spec-id}/cycles/cycle-[XX]/brief.yaml
> **Output:** sdd/specs/{spec-id}/cycles/cycle-[XX]/functional.md
> **Generado por:** sdd-functional

---

## Contexto de negocio

<Descripción del dominio en lenguaje no técnico>

## Historias de usuario

### US-[N]-001: [Título]

**Como** [actor]
**Quiero** [acción]
**Para** [beneficio]

**Criterios de aceptación:**

- [ ] <criterio 1>
- [ ] <criterio 2>

### US-[N]-002: [Título]

...

## Reglas de negocio

1. <Regla 1>
2. <Regla 2>

## Glosario del dominio

| Término | Definición |
| ------- | ---------- |
| ...     | ...        |
```

---

### 3.5 Template: `planner.md`

```markdown
# Sprint Plan — Cycle [N]: [Nombre del Módulo]

> **Input:** sdd/specs/{spec-id}/cycles/cycle-[XX]/functional.md
> **Output:** sdd/specs/{spec-id}/cycles/cycle-[XX]/planner.md
> **Generado por:** sdd-planner

---

## Resumen del ciclo

| Campo    | Valor       |
| -------- | ----------- |
| Ciclo    | [N]         |
| Módulo   | [nombre]    |
| Duración | [X] semanas |

## Tasks backend

### TASK-001: [Título]

- **Descripción:** <qué se implementa>
- **Archivos a crear/modificar:**
  - `apps/<app>/src/.../<Archivo según el stack del subproyecto>`
- **Criterio de done:**
  - [ ] <criterio verificable>
- **Dependencias:** ninguna | TASK-00X

### TASK-002: [Título]

...

## Tasks frontend

### TASK-00X: [Título]

...

## Orden de ejecución
```

TASK-001 → TASK-002 → ... (las tasks frontend dependen de las backend cuyo endpoint consumen)

```

> IDs `TASK-[NNN]` — el scope es el `tasks.json` del ciclo; los mismos IDs van en ambos archivos.

```

---

### 3.6 Template: `architect.md`

````markdown
# Architect — Cycle [N]: [Nombre del Módulo]

> **Input:** sdd/specs/{spec-id}/cycles/cycle-[XX]/functional.md
> **Output:** sdd/specs/{spec-id}/cycles/cycle-[XX]/architect.md
> **Generado por:** sdd-architect

---

## Decisiones técnicas

1. **[Decisión]:** <descripción y justificación>

## Cambios en schema (sdd/schema.json)

> ⚠️ `sdd/schema.json` está **agrupado por app**. Estructura: `{ "[app-key]": { "tables": { ... } } }`
> Siempre trabajar bajo el key del app involucrado (ej: `"example-api"`).

### Tabla nueva: `[nombre_tabla]`

| Columna | Tipo   | Constraints |
| ------- | ------ | ----------- |
| id      | BIGINT | PK, AUTO    |
| ...     | ...    | ...         |

## Contratos de API (sdd/api.json)

> ⚠️ `sdd/api.json` está **agrupado por app**. Estructura: `{ "[app-key]": { "endpoints": [ ... ] } }`
> Siempre trabajar bajo el key del app involucrado (ej: `"example-api"`, `"apps/example-app"`).
> Campos obligatorios en cada entrada: `id`, `status`, `created_in_cycle`, `updated_in_cycle`, `changelog`.

### `POST /v1/[recurso]`

**Request:**

```json
{
  "campo": "tipo"
}
```
````

**Response 200:**

```json
{
  "campo": "tipo"
}
```

**Errores:** 400, 404, 500

## Dependencias externas

- <servicio o librería que se incorpora>

````

---

### 3.7 Template: fragmento aditivo de contexto (`updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md`)

> Generado por: quien cierra el ciclo o el fix (implementador/reviewer), NUNCA edita
> `constitution.md`/`context_prompt.md` directamente. Ver mecanismo completo en la
> sección 6.

```markdown
# [spec-id] cycle-[XX] — [YYYY-MM-DD]

## Estado
<Qué quedó implementado / en qué estado queda el subproyecto>

## Estructura
<Paquetes/módulos/patrones nuevos o cambiados>

## Dependencias
<Librerías o servicios nuevos que consume/expone>

## Qué sigue
<Pendientes que el próximo ciclo debe saber>
````

> Secciones vacías se omiten. El fragmento es **corto y solo el delta** — nunca copia
> del contenido base. Si resuelve algo que el base declaraba pendiente, anotarlo como
> `resuelve: <sección>` en la sección correspondiente.
> Fixes repo-level usan el mismo template con nombre de archivo
> `updates/YYYY-MM-DD-fix-[gh-user]-[seq].md`.

---

### 3.8 Template: `plan.md` (flow `lite` — un solo actor)

Reemplaza a `brief.yaml`, `functional.md`, `planner.md` y `architect.md`. Cuatro secciones
fijas; la cuarta es **obligatoria** si el ciclo toca `schema.json`, `api.json` o
`components.json` (y esos registros se actualizan igual que en `full`, bajo su app-key).

```markdown
# [spec-id] — cycle-[XX] · plan (lite)

> Módulo: [nombre] | Subproyectos: [apps/...] | Fecha: [YYYY-MM-DD]
> Objetivo: [una oración: qué se logra al cerrar el ciclo]. Fuera de alcance: [lista corta].

## Historias
- US-[N]-001 — Como [rol] quiero [acción] para [beneficio]. CA: [criterio verificable].
- US-[N]-002 — …

## Tasks (detalle en tasks.json)
- TASK-001 — [qué se implementa, dónde, qué prueba lo valida]
- TASK-002 — …

## Decisiones técnicas (obligatoria si toca schema/api/components)
- [decisión → por qué → registro afectado (schema.json / api.json / components.json)]
```

Reglas: historias en 1–2 líneas cada una (sin narrativa), tasks en prosa espejo de
`tasks.json` (`user_stories` puede ir `[]` si las historias no se numeran), nada de secciones
extra — lo que no entra acá va a `artifacts/`. `cycle.json → artifacts[]` lista archivos o
directorios con ruta relativa al ciclo (`artifacts/…`); también vale la ruta desde la raíz del repo.

---

## 4. JSON de estado — propiedades en inglés (OBLIGATORIO)

Todos los archivos `.json` bajo `sdd/` deben tener **todas sus propiedades en inglés**.

| ❌ Incorrecto        | ✅ Correcto       |
| -------------------- | ----------------- |
| `fecha_inicio`       | `started_at`      |
| `fecha_fin`          | `completed_at`    |
| `estado`             | `status`          |
| `prioridad`          | `priority`        |
| `archivos_creados`   | `files_created`   |
| `módulos_pendientes` | `pending_modules` |
| `en_progreso`        | `in_progress`     |
| `completado`         | `completed`       |
| `resumen`            | `summary`         |
| `observaciones`      | `observations`    |

---

## 5. Checklist del Orquestador — al iniciar un ciclo

Ejecutar en orden estricto. Reportar resultado al usuario antes de continuar. Fuente
canónica del gate: `sdd/dual-harness/rules/sdd-gates.md`.

```
SPEC GATE A:
[ ] 1. pnpm sdd:gate <spec-id> → APPROVED (pegar la salida: A1–A5)

APERTURA (flow según profile / prefijo [LITE]|[FULL]):
[ ] 2. Crear cycle-[XX]/cycle.json ← status: "in-progress", flow, metrics con contadores en 0
       y usage.by_agent: []
[ ] 3. Actualizar sdd/global.json ← mover módulo a in_progress_modules
[ ] 4. Si es cycle-01 y la spec está "draft" en sdd/specs/index.json → "in-progress"
[ ] 5. full/reduced: crear brief.yaml (§3.1) · lite: escribir plan.md (§3.8)
[ ] 6. tasks.json del ciclo (Planner en full; el mismo actor en lite) + pnpm sdd:rebuild-tasks-index
[ ] 7. pnpm sdd:validate en verde

→ full: invocar sdd-functional. lite: pnpm sdd:gate <spec-id> cycle-[XX] (GATE B) e implementar.
```

> ⛔ Si el gate da BLOCKED → DETENER y comunicar qué falta. No continuar.

---

## 6. Responsabilidad por archivo

| Archivo                                                                               | Crea                                      | Cierra / actualiza                                          |
| ------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/brief.yaml`                                    | sdd-orchestrator                          | —                                                           |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/functional.md`                                 | sdd-functional                            | —                                                           |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/planner.md`                                    | sdd-planner                               | —                                                           |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/architect.md`                                  | sdd-architect                             | —                                                           |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/plan.md` (solo `flow: lite`)                   | el actor único del ciclo                  | —                                                           |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/cycle.json`                                    | sdd-orchestrator                          | sdd-reviewer (al cerrar)                                    |
| `sdd/fixes/fix-[gh-user]-[seq].md`                                                    | desarrollador (FIX GATE, repo-level)      | sdd-reviewer                                                |
| `sdd/specs/{spec-id}/fixes/fix-[...].md`                                              | desarrollador (FIX GATE, spec-level)      | sdd-reviewer                                                |
| `sdd/global.json`                                                                     | sdd-orchestrator                          | sdd-reviewer                                                |
| `sdd/schema.json`                                                                     | sdd-architect                             | sdd-reviewer                                                |
| `sdd/api.json`                                                                        | sdd-architect                             | sdd-reviewer                                                |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json`                                    | sdd-planner                               | sdd-implementor-* + sdd-reviewer                            |
| `sdd/tasks.json` (índice)                                                             | generado (`pnpm sdd:rebuild-tasks-index`) | — nunca a mano                                              |
| `sdd/fixes.json`                                                                      | sdd-orchestrator (FIX GATE)               | desarrollador + sdd-reviewer                                |
| `sdd/specs/index.json`                                                                | quien crea la spec                        | —                                                           |
| `sdd/context/[subproyecto]/` (setup inicial: `constitution.md` + `context_prompt.md`) | (setup inicial)                           | consolidación de un solo actor (nunca durante un ciclo/fix) |
| `sdd/context/[apps\|libs\|tools]/[nombre]/updates/*.md` (fragmento aditivo)           | quien cierra el ciclo o fix               | consolidación lo funde y lo borra                           |

---

## 7. Reglas de frescura del contexto (mecanismo aditivo)

> ⛔ Durante un ciclo o fix, **NUNCA se editan directamente** `constitution.md` ni
> `context_prompt.md` del subproyecto — incluida su línea `> Última actualización:`.
> Editarlos en paralelo desde specs distintas es la causa garantizada de merge conflicts
> que este mecanismo evita.

1. **Escribir (al cerrar ciclo/fix):** quien cierra crea
   `sdd/context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md`
   (o `...fix-[gh-user]-[seq].md` para fixes repo-level) con el template de la
   sección 3.7. Nunca toca los archivos base.
2. **Leer:** todo agente que necesite el contexto de un subproyecto lee
   `constitution.md` + `context_prompt.md` **+ `updates/*.md` en orden de nombre**
   (el prefijo de fecha los ordena cronológicamente). El contexto vigente = base + deltas.
3. **Consolidar (operación de un solo actor, nunca en paralelo con un ciclo abierto):**
   el sdd-orchestrator al iniciar un ciclo nuevo sobre ese subproyecto, o el sdd-reviewer
   si se acumulan ≥5 fragmentos, funde los fragmentos en `constitution.md`/
   `context_prompt.md`, actualiza el header, **borra los fragmentos consolidados** y
   commitea como cambio dedicado (`chore(sdd): consolidate context updates for [nombre]`).
   El validador acepta este estado: sin fragmento, el CONTEXTO GATE de un ciclo cerrado se da
   por cumplido cuando el header del `context_prompt.md` base muestra `Fecha:` ≥ `completed_at`.

Header obligatorio en `constitution.md` y `context_prompt.md` de subproyecto — **solo
la consolidación lo toca**:

```

> Última actualización: cycle-[N] | Fase: [fase] | Fecha: YYYY-MM-DD

```

El **sdd-orchestrator** DEBE verificar al iniciar cada ciclo sobre un subproyecto:

- ¿Hay fragmentos pendientes en `updates/`? → consolidarlos antes de generar el brief.
- ¿El header `cycle-[N]` del subproyecto (post-consolidación) coincide con el último
  ciclo `completed` en `global.json`?
- Si NO coincide → alertar al usuario: contexto desactualizado.

---

## 7-bis. Manifest de contenido (`sdd/catalog.json`)

Manifest **generado** que enumera agents, skills, prompts y schemas para el visor
(`sdd/docs`), que corre en hosting estático sin listado de directorios.

- Regenerar con `pnpm sdd:rebuild-catalog` **cada vez que se agrega o quita** un
  `*.agent.md`, un directorio de skill, un `*.prompt.md` o un `*.schema.json`.
- `pnpm sdd:validate` **falla** si el manifest quedó desactualizado respecto del
  filesystem — la desincronización no puede pasar a CI ni a un cierre de ciclo.
- Nunca editarlo a mano. Schema: `sdd/schemas/catalog.schema.json`.

## 8. Referencias rápidas

| Necesito...                         | Leer...                                             |
| ----------------------------------- | --------------------------------------------------- |
| Estado del proyecto                 | `sdd/global.json`                                   |
| Iniciar un ciclo                    | `sdd/prompts/start-sdd-cycle.prompt.md`             |
| **Responder el SPEC GATE (A o B)**  | **`pnpm sdd:gate <spec-id> [cycle-XX]`** — fuente: `sdd/dual-harness/rules/sdd-gates.md` |
| Verificar antes de implementar      | `sdd/prompts/check-spec-before-implement.prompt.md` |
| **Registrar un fix / hotfix**       | **`sdd/prompts/hotfix-bypass-gate.prompt.md`**      |
| **Ver todos los fixes activos**     | **`sdd/fixes.json`**                                |
| Stack de una app específica         | `sdd/context/apps/[app]/constitution.md`            |
| Endpoints ya implementados          | `sdd/api.json`                                      |
| Tablas ya definidas                 | `sdd/schema.json`                                   |
| Tasks del ciclo actual              | `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json`  |
| Resumen de tasks de todos los specs | `sdd/tasks.json` (índice generado)                  |
| Schemas de los registros JSON       | `sdd/schemas/*.schema.json`                         |
| Specs registradas                   | `sdd/specs/index.json`                              |
| Crear API Spring Boot               | `sdd/skills/generate-springboot-api/SKILL.md`       |
| Crear componente React              | `sdd/skills/generate-react-component/SKILL.md`      |
| Ver visor SDD en vivo (sin build)   | `pnpm sdd:docs` → `sdd/docs/`                       |

---

## 9. Template: fix individual (FIX GATE)

> Con `profile: solo` alcanza el **template mínimo**: título + `## Problema` (2 líneas) +
> `## Solución aplicada` con `### Archivos modificados`. El resto de las secciones se omite.

Cada fix es un archivo independiente. El nombre del archivo es el ID del fix en kebab-case:

- Repo-level: `sdd/fixes/fix-[gh-user]-[seq].md`
- Spec-level: `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md`

```markdown
# FIX-[gh-user]-[seq] — [Título del fix]

| Campo         | Valor                                          |
| ------------- | ---------------------------------------------- |
| **ID**        | FIX-[gh-user]-[seq]                            |
| **Tipo**      | HOTFIX \| BUGFIX \| FIX \| IMPROVEMENT         |
| **Severidad** | critical \| high \| medium \| low              |
| **Keyword**   | [HOTFIX] \| [BUGFIX] \| [FIX] \| [IMPROVEMENT] |
| **Fecha**     | YYYY-MM-DD                                     |
| **Autor**     | [gh-user]                                      |
| **Estado**    | pending \| implemented \| completed            |
| **Spec**      | [spec-id] o N/A (repo-level)                   |

## Problema

<Descripción del problema detectado>

## Justificación del bypass

<Por qué no podía esperar un ciclo SDD normal>

## Solución aplicada

<Descripción de la solución implementada>

### Archivos modificados

- `apps/.../Archivo.java` — descripción del cambio
- `apps/.../Archivo2.java` — descripción del cambio

### Test de validación

- **Referencia:** `apps/.../SomeTest.java#testMethod` (o justificación de ausencia)

### Decisión del Reviewer

> [A completar por sdd-reviewer al cerrar el ciclo]
>
> - [ ] `validated` — fix correcto, no requiere seguimiento
> - [ ] `absorbed` — debe formalizarse en próxima spec: SPEC-XXX

---
```
