# Prompt: Iniciar Ciclo SDD

> **Regla cero (⓪ del dual-harness):** antes de actuar escribí `Regla cero → tier · modelo · esfuerzo`
> y mantené el contexto mínimo.

> Para uso en cualquier repo que implemente SDD. Fuente canónica de los gates:
> `sdd/dual-harness/rules/sdd-gates.md`.

## ⛔ SPEC GATE A — apertura de ciclo (antes de invocar cualquier agente)

```bash
pnpm sdd:gate <spec-id|slug>
```

El script contesta A1–A5 (spec registrada · módulo en `pending_modules`/`in_progress_modules`
· ningún otro ciclo `in-progress` de esa spec · `depends_on` completadas · spec no cerrada) y
sugiere el próximo ciclo y el flow.

**→ `BLOCKED`: completar lo que señala antes de continuar (no se abre nada).**
**→ `APPROVED`: decidir el flow y proceder con el ciclo.**

## Flow del ciclo (se decide UNA vez, al abrir)

| Flow      | Cuándo                                                                            | Documentos en `cycle-[XX]/` (además de `cycle.json` + `tasks.json`) |
| --------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `full`    | `profile: team` (default) · prefijo `[FULL]` · contratos que otro subproyecto consume | `brief.yaml`, `functional.md`, `planner.md`, `architect.md`         |
| `reduced` | Refactor estructural sin historias                                               | `brief.yaml`                                                         |
| `lite`    | `profile: solo` · prefijo `[LITE]` — **un solo actor**                            | `plan.md`                                                            |

El flow queda escrito en `cycle.json → flow` y `tasks.json → flow`. Cualquier documento de
apoyo (diagramas, exploración) va en `cycle-[XX]/artifacts/` referenciado en
`cycle.json["artifacts"]` — la raíz del ciclo admite solo los archivos de la tabla.

---

## Cómo usarlo — flow `full`

```
Iniciá el Ciclo [N] del proyecto [nombre-del-proyecto] siguiendo el flujo SDD.

Módulo a desarrollar: [nombre del módulo]
Spec en: sdd/specs/spec-[gh-user]-[NNN]-[slug]/spec-[gh-user]-[NNN]-[slug].spec.md

Antes de empezar:
1. pnpm sdd:gate <spec-id> → tiene que dar APPROVED (pegar la salida como reporte del gate)
2. Consolidación de contexto (sdd-orchestrator, antes del brief): si
   sdd/context/[apps|libs|tools]/[nombre]/updates/ tiene fragmentos para el subproyecto de
   este ciclo, fundirlos en constitution.md + context_prompt.md base, actualizar
   `> Última actualización:`, borrar los fragmentos y commitear aparte
   (`chore(sdd): consolidate context updates for [nombre]`)
3. Destilación de memoria: si sdd/memory/journal/ tiene ≥5 entradas, destilar en lessons.md
   (commit aparte: `chore(sdd): distill memory journal into lessons`)

Pasos en orden (solo con el GATE A en APPROVED):
1. sdd-orchestrator → brief.yaml + cycle.json con status "in-progress", flow "full" y
        metrics { contadores en 0, usage: { tokens_in: 0, tokens_out: 0, by_agent: [] } };
        mover el módulo a in_progress_modules; si es cycle-01, pasar la spec de "draft" a
        "in-progress" en sdd/specs/index.json. Recién ahí leer el template del artefacto que
        toca escribir (sdd-file-structure §3) — no antes.
2. sdd-functional   → functional.md
        ⛔ TELEMETRÍA: al cerrar el documento, entrada propia en cycle.json →
        metrics.usage.by_agent[] (agent: "functional", provider_model, effort,
        tokens_in/tokens_out, approx, source, recorded_at)
3. sdd-planner      → tasks.json + planner.md + pnpm sdd:rebuild-tasks-index (PARALELO con 4)
        ⛔ TELEMETRÍA: entrada propia (agent: "planner")
4. sdd-architect    → architect.md + sdd/schema.json + sdd/api.json (PARALELO con 3)
        ⛔ TELEMETRÍA: entrada propia (agent: "architect")
5. pnpm sdd:gate <spec-id> cycle-[XX] → GATE B APPROVED antes de cualquier implementación.
        Si el orquestador lanzó subagentes vía la tool Agent, capturar la notificación
        `agent-usage-notification` de cada uno (exacta, approx: false, split 85/15) y volcarla
        en by_agent si el propio subagente no la registró.
6. sdd-implementor-back → TASK-BE una a la vez. Una task pasa a "done" solo con su `usage`
        completo — sin `usage` la task NO está cerrada.
7. sdd-implementor-front → TASK-FE una a la vez (solo si hay frontend). Misma condición.
8. sdd-reviewer → review-cycle.prompt.md: validate, telemetría consolidada (by_agent +
        by_tier derivado + suma), cycle.json "completed" con reviewer_report, JSONs de estado.
9. ⛔ CONTEXTO GATE (parte del reviewer): fragmento aditivo en
        sdd/context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md
        (NUNCA editar los archivos base durante el ciclo) + fila propia en las tablas globales.
        MEMORIA GATE si hubo lección real. El ciclo NO se cierra sin esto.
```

## Cómo usarlo — flow `lite` (un solo actor)

```
[LITE] Iniciá el Ciclo [N] del proyecto [nombre-del-proyecto] para el módulo [nombre].
Spec: sdd/specs/spec-[gh-user]-[NNN]-[slug]/…spec.md

1. pnpm sdd:gate <spec-id> → APPROVED (pegar la salida). Consolidación de contexto y
   destilación de memoria igual que en full, si corresponde.
2. Abrir el ciclo: cycle.json con status "in-progress", flow "lite", metrics con contadores en
   0 y usage.by_agent: []; módulo a in_progress_modules; spec draft → in-progress si es cycle-01.
3. Escribir plan.md (template: sdd-file-structure §3.8 — objetivo · historias · tasks en prosa ·
   decisiones técnicas; la última es obligatoria si toca schema.json/api.json/components.json,
   y en ese caso actualizar esos registros bajo el app-key correcto).
4. Crear tasks.json (flow "lite"; user_stories puede ir [] si plan.md no numera historias) y
   correr pnpm sdd:rebuild-tasks-index.
5. pnpm sdd:gate <spec-id> cycle-[XX] → GATE B APPROVED. Recién ahí implementar, una task a la
   vez; cada task pasa a "done" con su `usage` (tier estándar para implementar).
6. Cerrar como reviewer: pnpm sdd:validate en verde, tasks resueltas (done/skipped),
   cycle.json "completed" con reviewer_report y metrics.usage consolidado — una sola entrada
   { agent: "orchestrator", label: "solo" } cubre plan + revisión, más las de cada task —,
   global.json / specs/index.json actualizados, CONTEXTO GATE (fragmento aditivo) y MEMORIA
   GATE si hubo lección.
```

> Si un ciclo `lite` creó tablas o endpoints nuevos, `pnpm sdd:validate` lo avisa: el próximo
> ciclo de esa spec se abre `full`.

---

## Plantilla de ejemplo

```
Iniciá el Ciclo [N] del proyecto [nombre-del-proyecto] siguiendo el flujo SDD.

Módulo: [nombre-del-modulo] (fase: [nombre-de-la-fase])
Spec: sdd/specs/spec-[gh-user]-[NNN]-[slug]/spec-[gh-user]-[NNN]-[slug].spec.md

Objetivo del ciclo:
[Describir en una oración qué se logra al finalizar este ciclo.]

Siguiendo flujo SDD obligatorio con SPEC GATE (pnpm sdd:gate).
```
