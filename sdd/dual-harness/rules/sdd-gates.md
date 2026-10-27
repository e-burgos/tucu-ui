---
trigger: always_on
description: Gates del sistema SDD — FUENTE CANÓNICA. SPEC GATE en dos momentos (A apertura, B implementación) con forma por flow (full · reduced · lite), perfil team/solo, tipado estricto, CONTEXTO GATE y FIX GATE. AGENTS.md/CLAUDE.md/GEMINI.md, context_prompt.md, prompts y agentes apuntan acá.
---

# Gates SDD (fuente canónica)

Este archivo es **la única definición** de los gates. Los arneses raíz
(`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`), `sdd/context/context_prompt.md`, los prompts y los
agentes **apuntan acá y no repiten la checklist**: si un gate cambia, cambia en este archivo.
Al iniciar sesión leer también `sdd/memory/lessons.md` (MEMORIA GATE).

## Invariantes — valen en TODO flow y TODO perfil

Esto es lo que garantiza la trazabilidad; nada de lo que sigue lo relaja:

1. La spec existe y está registrada en `sdd/specs/index.json`.
2. El módulo está en `sdd/global.json` (`pending_modules` para abrir, `in_progress_modules`
   para implementar).
3. Existe `cycle.json` con `status: "in-progress"` **antes de la primera línea de código**.
4. Existe `tasks.json` con tasks, y **ninguna task pasa a `done` sin su `usage`** (telemetría).

Lo que cambia entre flows es la **forma** (cuántos documentos y cuántos roles), nunca estos
cuatro puntos.

## ⛔ SPEC GATE A — apertura de ciclo (lo corre el sdd-orchestrator)

```bash
pnpm sdd:gate <spec-id|slug>          # → APPROVED / BLOCKED, una línea por condición
```

| #  | Condición                                                                  |
| -- | -------------------------------------------------------------------------- |
| A1 | Spec registrada en `specs/index.json` y su `.spec.md` existe               |
| A2 | Módulo en `pending_modules` o `in_progress_modules` (nunca en `completed_modules`) |
| A3 | Ningún otro ciclo de esa spec está `in-progress` (un ciclo activo por spec) |
| A4 | Sus `depends_on` están `completed`                                          |
| A5 | La spec no está `completed` ni `cancelled`                                  |

**BLOCKED → detener y completar lo que falta** (el script dice qué). **APPROVED →** el
orquestador decide el `flow` (ver abajo), crea `cycle.json` (`status: "in-progress"`, `flow`,
`metrics` con `usage.by_agent: []`), mueve el módulo a `in_progress_modules` y, si es
`cycle-01`, pasa la spec de `draft` a `in-progress`. El script no escribe nada: solo responde.

## Flow del ciclo — full · reduced · lite

| `flow`    | Quién                                                   | Documentos en `cycle-XX/` además de `cycle.json` + `tasks.json` | Cuándo                                                                  |
| --------- | ------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `full`    | Un rol por documento (orquestador, funcional, planner, arquitecto), implementores, reviewer | `brief.yaml`, `functional.md`, `planner.md`, `architect.md` | Equipos; specs que otros consumen; contratos nuevos (tablas, endpoints) |
| `reduced` | Los mismos roles, sin historias de usuario               | `brief.yaml` (planner/architect opcionales)                      | Refactor estructural sin cambio funcional                               |
| `lite`    | **Un solo actor** con tres sombreros: abre, implementa y cierra | `plan.md` (objetivo · historias · tasks en prosa · decisiones técnicas) | Dev solo o pedido `[LITE]`; nada que otro subproyecto consuma           |

**Cómo se decide** (una vez, al abrir; queda escrito en `cycle.json → flow` y
`tasks.json → flow` y no se cambia después):

- `sdd/global.json → profile` (opcional): `team` (default) abre `full`; `solo` abre `lite`.
- Prefijo en el pedido: `[LITE]` fuerza `lite`, `[FULL]` fuerza `full`. Gana el prefijo.
- Excepciones que vuelven a `full` aunque el perfil sea `solo`: la spec declara contratos que
  otro subproyecto consume (tablas o endpoints nuevos), o tiene `depends_on` desde otras specs.
- Un ciclo `lite` que igual creó tablas/endpoints deja un **warning** de `sdd:validate`: el
  próximo ciclo de esa spec se abre `full`.
- El **sdd-steward** cambia el perfil a pedido del dev (`profile` en `global.json`); ningún
  agente lo cambia por su cuenta.

**Reglas del flow `lite`** (lo que se recorta y lo que no):

- `plan.md` reemplaza a los cuatro documentos. Template canónico: `sdd-file-structure` §3.8
  (cuatro secciones fijas; la de decisiones técnicas es obligatoria si toca `schema.json`,
  `api.json` o `components.json`).
- El mismo actor escribe `plan.md`, crea `tasks.json`, implementa task por task y cierra
  como reviewer. No hay fan-out de subagentes: el contexto se lee **una vez**.
- Telemetría: `usage` en cada task al cerrarla (invariante 4) + **una** entrada en
  `cycle.json → metrics.usage.by_agent[]` con `agent: "orchestrator"`, `label: "solo"` que
  cubre plan + revisión. `by_tier` y el top-level se derivan igual que en `full`.
- El cierre conserva CONTEXTO GATE (fragmento aditivo), MEMORIA GATE (si hubo lección) y
  `pnpm sdd:validate` en verde. Eso no se recorta en ningún flow.

## ⛔ SPEC GATE B — implementación (lo corre quien va a escribir código)

```bash
pnpm sdd:gate <spec-id|slug> cycle-XX   # lee el flow del ciclo y exige los documentos de ESE flow
```

| #  | Condición                                                                          |
| -- | ---------------------------------------------------------------------------------- |
| B1 | `cycle.json` existe con `status: "in-progress"`                                    |
| B2 | Módulo en `in_progress_modules` de `global.json`                                   |
| B3 | `tasks.json` del ciclo con al menos una task                                       |
| B4 | Documentos del `flow`: full → brief/functional/planner/architect · reduced → brief · lite → plan.md |
| B5 | `cycle.json → apps[]` no vacío y `constitution.md` de cada subproyecto listado      |

**BLOCKED → cero líneas de código.** El script dice qué falta; recién ahí se lee el
template de ese artefacto (`sdd-file-structure` §3) — no antes.

**Raíz del ciclo (whitelist, `sdd:validate` falla si hay otra cosa):** `brief.yaml`,
`functional.md`, `planner.md`, `architect.md`, `plan.md`, `cycle.json`, `tasks.json` y el
directorio `artifacts/` (documentos de apoyo, referenciados en `cycle.json["artifacts"]`).

**Naming** (detalle en `sdd-file-structure` §2): `spec-[gh-user]-[NNN]-[slug]` (contador
personal del dev), `cycle-01`, `cycle-02`… por spec, `TASK-[NNN]` por ciclo,
`fix-[gh-user]-[spec-NNN]-[seq].md` (o `sdd/fixes/` repo-level).

## ⛔ Tipado estricto de registros SDD

Todo `*.json` de `sdd/` tiene JSON Schema estricto en `sdd/schemas/` y declara `$schema`.
Antes de escribir un registro: leer su schema (`sdd-data-schemas` tiene el campo a campo).
Después de escribir:

```bash
pnpm sdd:validate            # valida TODOS los registros + reglas cruzadas
pnpm sdd:rebuild-tasks-index # regenera el índice sdd/tasks.json
```

`sdd/tasks.json` es solo un índice generado — las tasks canónicas viven en el `tasks.json` de
cada ciclo. Un commit con `pnpm sdd:validate` en rojo es inválido (el mismo check corre en CI).

## ⛔ CONTEXTO GATE — al cerrar cualquier ciclo o fix

Quien cierra deja actualizado el contexto ANTES de marcar `completed`:

- Fragmento aditivo en `sdd/context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md`
  (fixes: `YYYY-MM-DD-fix-[gh-user]-[seq].md`). **Nunca** editar `constitution.md` /
  `context_prompt.md` del subproyecto durante un ciclo — solo la consolidación de un solo
  actor los toca (el orquestador al abrir el próximo ciclo, o el reviewer con ≥5 fragmentos).
- En las tablas globales (`sdd/context/constitution.md` y `context_prompt.md`): tocar solo la
  fila del subproyecto propio.
- Si hubo lección real: entrada en `sdd/memory/journal/` (mismo naming). Lo obvio o ya
  documentado NO se escribe.

## 🔧 FIX GATE — bypass controlado del SPEC GATE

Para trabajo que no puede esperar un ciclo, prefijos al orquestador: `[HOTFIX]` (producción
bloqueada) · `[BUGFIX]` (error confirmado) · `[FIX]` (genérico) · `[IMPROVEMENT]` (mejora
menor). Sin prefijo, cualquier cambio sobre código existente también es un fix. El orquestador
corre `sdd/prompts/hotfix-bypass-gate.prompt.md`: registra el fix en `sdd/fixes.json`
(`FIX-…`), crea su documento y recién ahí autoriza a implementar. Al resolverlo se registra
`usage` (ver rule de presupuesto de modelos). La trazabilidad no se elimina: se simplifica.

**Con `profile: solo`** el FIX GATE no hace cuestionario: el actor completa `fixes.json` desde
el pedido mismo (pregunta solo lo que no puede deducir), el documento del fix usa el template
mínimo (problema · solución · archivos) y la elegibilidad se reduce a "no crea contratos ni
entidades nuevas". Registro, `usage`, fragmento de contexto y `sdd:validate` siguen igual.
