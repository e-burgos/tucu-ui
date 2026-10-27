# CONTEXT PROMPT

> **Nombre y descripción del proyecto:** `sdd/global.json` → `project` / `description`.
> Es la única fuente de verdad — este documento nunca los hardcodea, así `sdd/` se copia
> a otro repo sin editarlo. `pnpm sdd:validate` falla si el nombre se filtra acá.
> Este documento es el punto de entrada para cualquier agente (Claude Code, GitHub Copilot, Antigravity o Gemini CLI).
> Leerlo completo antes de hacer cualquier tarea en este repositorio.

---

## 1. Quiénes somos y qué estamos construyendo

Estamos construyendo el proyecto declarado en `sdd/global.json` → `project`, descrito en `description`.

**Rol arquitectónico:** librería React + Tailwind v4 publicada en npm (lib principal bajo `ui/`), con sitio de docs (`ui/tucu-docs` servido por `apps/demo`) y un servidor MCP (`tools/mcp-server`) que expone su API a agentes de IA. No contiene lógica de negocio de ninguna app consumidora.

El sistema vive en un monorepo Nx con metodología Spec-Driven Development (SDD). Stack: React, Tailwind v4, Vite, TypeScript, vitest; el MCP corre en Node con el SDK de Model Context Protocol.

---

## 2. Estructura del Monorepo

El proyecto usa **Nx** como monorepo manager con **pnpm** como package manager. Los proyectos viven en `apps/`, `ui/` y `tools/`.

```
<repo-root>/                 → nombre del proyecto en sdd/global.json → project
  apps/                      → demo (host del sitio de docs) y test-lib (banco de pruebas local)
  ui/                        → lib principal publicada (id SDD en global.json → monorepo.libs) y tucu-docs (páginas de docs, id SDD libs/tucu-docs)
  tools/                     → mcp-server (servidor MCP, publicado en npm y fly.io)
  examples/                  → proyectos standalone y micro-frontends, fuera del workspace pnpm
  sdd/                       → Sistema SDD (NO modificar manualmente)
    context/
      constitution.md        → Constitución GLOBAL (reglas, arquitectura, snapshot)
      context_prompt.md      → Este documento (entry point global)
      apps/                  → Contextos individuales por app (fuente de verdad técnica)
      libs/                  → Contextos individuales por lib
      tools/                 → Contextos individuales por tool
    docs/                    → Visor portable de documentación SDD (JS vanilla, cero deps, `pnpm sdd:docs`)
    global.json              → Estado general del proyecto
    schema.json              → Tablas ya definidas
    api.json                 → Endpoints ya implementados
    components.json          → Componentes frontend creados
    schemas/                 → JSON Schemas estrictos de los registros
    tasks.json               → Índice de tareas (generado; canónico en cycles/cycle-XX/tasks.json)
    specs/                   → Especificaciones técnicas de módulos
```

### Contextos de subproyectos (leer antes de trabajar en cualquier app/lib/tool)

| Subproyecto | Context prompt | Constitución |
| ----------- | -------------- | ------------ |
| lib principal | `sdd/context/libs/<id>/context_prompt.md` | `sdd/context/libs/<id>/constitution.md` |
| `libs/tucu-docs` | [context_prompt](libs/tucu-docs/context_prompt.md) | [constitution](libs/tucu-docs/constitution.md) |
| `tools/mcp-server` | [context_prompt](tools/mcp-server/context_prompt.md) | [constitution](tools/mcp-server/constitution.md) |
| `apps/demo` | [context_prompt](apps/demo/context_prompt.md) | [constitution](apps/demo/constitution.md) |
| `apps/test-lib` | [context_prompt](apps/test-lib/context_prompt.md) | [constitution](apps/test-lib/constitution.md) |

---

## 3. Metodología: SDD (Spec-Driven Development)

Este proyecto usa **SDD**. Toda funcionalidad pasa por un ciclo de agentes antes de ser implementada. **NUNCA escribir código sin haber pasado por el ciclo.**

### ⛔ SPEC GATE — antes de implementar (fuente canónica: `sdd/dual-harness/rules/sdd-gates.md`)

El gate lo responde un comando, no una lectura a mano:

```bash
pnpm sdd:gate <spec-id|slug>            # GATE A — ¿se puede abrir un ciclo?  (sdd-orchestrator)
pnpm sdd:gate <spec-id|slug> cycle-XX   # GATE B — ¿se puede escribir código? (quien implementa)
```

→ `BLOCKED`: completar lo que el script señala (`sdd/prompts/check-spec-before-implement.prompt.md`)
→ `APPROVED` en A: `sdd/prompts/start-sdd-cycle.prompt.md` decide el **flow** (`full` · `reduced` ·
`lite`) según `sdd/global.json → profile` (`team`/`solo`) o el prefijo `[LITE]`/`[FULL]` del pedido.

### Los 7 agentes y su orden obligatorio (flow `full`)

```
1. Orquestador  → lee especificación (sdd/specs/), crea `sdd/specs/{spec-id}/cycles/cycle-[XX]/brief.yaml`
2. Funcional    → genera historias de usuario y requisitos en lenguaje de negocio
3. Planner      → genera sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json (en paralelo con Arquitecto)
4. Arquitecto   → actualiza sdd/schema.json y sdd/api.json (en paralelo con Planner)
5. Impl. Back   → implementa backend, una TASK-BE a la vez
6. Impl. Front  → implementa frontend, una TASK-FE a la vez (después del BE)
7. Reviewer     → valida calidad, actualiza todos los JSONs de estado, cierra el ciclo
```

> En `flow: lite` (perfil `solo` o prefijo `[LITE]`) **un solo actor** asume los sombreros en
> ese orden: escribe `plan.md` (reemplaza brief/functional/planner/architect), crea `tasks.json`,
> implementa y cierra como reviewer. Los gates de cierre son los mismos.

---

## 4. Reglas generales del proyecto

1. **SPEC GATE:** Ninguna implementación sin `pnpm sdd:gate` en `APPROVED` (spec registrada, `cycle.json` in-progress, `tasks.json` y los documentos del flow)
2. **Leer `sdd/global.json` antes de cualquier tarea**
3. **Nunca escribir código sin haber pasado por el ciclo SDD**
4. **Un módulo a la vez, en el orden de ciclos definido**
5. **Los ciclos siguen el orden de `planned_cycles` en global.json — uno no comienza si el anterior no está `completed`**
6. **Nunca modificar archivos de `sdd/` manualmente** (solo los agentes los modifican)
7. **Siempre usar `pnpm nx` para correr tareas del workspace**
8. **Sin comentarios explicativos** — código autodescriptivo, ver "Estilo de código (INVIOLABLE)"
   en los agentes implementadores; único comentario permitido es una línea en inglés para un POR
   QUÉ no obvio
9. **TypeScript estricto — sin `any` en ningún caso**

---

## 5. Documentos de referencia en el repositorio

| Documento                   | Ubicación                                           | Para qué sirve                                                              |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| Constitución del Proyecto   | `sdd/context/constitution.md`                       | Visión, arquitectura, stack y reglas de desarrollo                          |
| Estado del proyecto         | `sdd/global.json`                                   | Ver qué está hecho y qué falta                                              |
| Tablas de DB                | `sdd/schema.json`                                   | Referencia del schema actual                                                |
| Endpoints                   | `sdd/api.json`                                      | Qué endpoints existen y su estado                                           |
| Componentes                 | `sdd/components.json`                               | Qué componentes frontend existen                                            |
| Tasks del ciclo             | `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json`  | Detalle canónico de tasks                                                   |
| Índice de tasks             | `sdd/tasks.json`                                    | Resumen generado (`pnpm sdd:rebuild-tasks-index`)                           |
| Specs de módulos            | `sdd/specs/`                                        | Especificaciones técnicas de cada módulo                                    |
| Documentos de ciclos        | `sdd/specs/{spec-id}/cycles/cycle-[XX]/`            | brief.yaml, functional.md, planner.md, architect.md, cycle.json, tasks.json |
| Agentes y Skills            | `sdd/agents/` y `sdd/skills/`                       | Definiciones del comportamiento del arnés                                   |
| **⛔ Estructura SDD**       | `sdd/skills/sdd-file-structure/SKILL.md`            | **Naming, templates y checklist — leer SIEMPRE**                            |
| **Prompt SPEC GATE**        | `sdd/prompts/check-spec-before-implement.prompt.md` | **Verificar antes de CUALQUIER implementación**                             |
| **Prompt inicio ciclo**     | `sdd/prompts/start-sdd-cycle.prompt.md`             | Iniciar un ciclo SDD                                                        |
| **Template nueva API Java** | `sdd/skills/generate-springboot-api/SKILL.md`       | **Leer antes de crear cualquier API Spring Boot**                           |

---

## 6. Contextos de subproyectos

### Principio fundamental

> **Global ↔ Subproyecto**
>
> - Los documentos globales (`constitution.md`, `context_prompt.md`) definen **gobernanza, reglas y una tabla-resumen** que apunta a los subproyectos.
> - Los documentos de subproyecto son la **fuente de verdad** del stack, estructura, patrones y estado de cada app/lib/tool.
> - Nunca duplicar en global lo que vive en el subproyecto. Siempre referenciar.

### Flujo de actualización (mecanismo aditivo — patrón changesets)

> ⛔ Durante un ciclo/fix **NUNCA** se editan directamente `constitution.md` ni
> `context_prompt.md` del subproyecto, ni su línea `> Última actualización:`. Las
> actualizaciones son aditivas: un fragmento append-only por ciclo/fix.

```
 Ciclo o fix completado
       ↓
 1. El dev escribe el fragmento (nunca edita los archivos base):
       sdd/context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md
       (fixes repo-level: YYYY-MM-DD-fix-[gh-user]-[seq].md)
       El nombre lleva el spec-id (y con él el gh-user) → único por construcción,
       sin merge conflicts posibles
       ↓
 2. Reviewer actualiza SOLO la fila propia en la tabla-snapshot de
       sdd/context/constitution.md sección 3
       ↓
 3. Si se agregó un nuevo subproyecto: se suma una fila nueva a ambas tablas
       globales (sección 2.1 de constitution.md y sección 2 de context_prompt.md)
       ↓
 4. Consolidación (operación de un solo actor, nunca en paralelo con un ciclo):
       el orquestador al iniciar un ciclo nuevo sobre ese subproyecto, o el
       reviewer si se acumulan ≥5 fragmentos, funde los fragmentos en los
       archivos base, actualiza `> Última actualización:`, borra los fragmentos
       consolidados y commitea aparte
       (`chore(sdd): consolidate context updates for [nombre]`)
```

**Leer** el contexto vigente de un subproyecto = `constitution.md` + `context_prompt.md`
base **+ `updates/*.md` en orden de nombre** (el prefijo de fecha los ordena
cronológicamente).

### Cuándo crear el contexto de un nuevo subproyecto

Cuando se agrega una nueva `app/`, `lib/` o `tool/` al monorepo, el Orquestador del primer ciclo que la afecte DEBE:

1. Crear `sdd/context/[apps|libs|tools]/[nombre]/constitution.md` con el stack inicial
2. Crear `sdd/context/[apps|libs|tools]/[nombre]/context_prompt.md` con el entry point inicial
3. Agregar la nueva entrada a la tabla de la sección 2 de este documento
4. Agregar la nueva entrada a las tablas de sección 2.1 y 3 de `constitution.md`

### Estructura completa de contextos

```
sdd/context/
├── constitution.md          ← GLOBAL: gobernanza + tablas-resumen → subproyectos
├── context_prompt.md        ← GLOBAL: entry point + links a subproyectos
├── apps/                    ← Un directorio por app generada en Nx
│   └── [nombre]/
│       ├── constitution.md
│       ├── context_prompt.md
│       └── updates/
├── libs/                    ← Ídem por lib
└── tools/                   ← Ídem por tool
```

**Flujo de lectura obligatorio para agentes:**

1. Leer `sdd/context/context_prompt.md` (GLOBAL) — siempre, en todo ciclo
2. Leer `sdd/context/[apps|libs|tools]/[nombre]/context_prompt.md` — al trabajar un subproyecto
3. El contexto del subproyecto tiene precedencia sobre el global en especificidad de stack o convenciones

---

## 7. FIX GATE — Bypass controlado del SPEC GATE

Cuando el desarrollador necesita resolver un problema urgente fuera del flujo SDD, usar los siguientes prefijos en el mensaje al orquestador:

| Prefijo         | Cuándo usarlo                                               |
| --------------- | ----------------------------------------------------------- |
| `[HOTFIX]`      | Producción bloqueada, regresión crítica, dato corrupto      |
| `[BUGFIX]`      | Error confirmado en desarrollo o testing                    |
| `[FIX]`         | Alias genérico — el orquestador pedirá clasificar           |
| `[IMPROVEMENT]` | Mejora menor (UX, wording, performance puntual) out-of-spec |

El orquestador ejecutará `sdd/prompts/hotfix-bypass-gate.prompt.md` que:

1. Solicita justificación y datos del fix
2. Registra el fix en `sdd/fixes.json` con ID correlativo (FIX-001, FIX-002…)
3. Crea o actualiza `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md` (o `sdd/fixes/fix-[gh-user]-[seq].md` si es repo-level)
4. Autoriza al implementador a proceder

> ⚠️ El FIX GATE no elimina la trazabilidad — la simplifica.
> El sdd-reviewer valida todos los fixes al cerrar el ciclo.

- Registry de fixes: `sdd/fixes.json`
- Prompt FIX GATE: `sdd/prompts/hotfix-bypass-gate.prompt.md`
- Template fixes.md: `sdd/skills/sdd-file-structure/SKILL.md` → sección 9
