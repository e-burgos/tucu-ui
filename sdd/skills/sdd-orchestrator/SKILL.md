---
name: sdd-orchestrator
description: Skill del Agente Orquestador SDD. Prepara el brief del ciclo con el contexto mínimo para cada agente. Invocar al iniciar cualquier ciclo nuevo.
---

# Skill: sdd-orchestrator

## Cuándo invocarlo

Siempre que se inicie un ciclo nuevo de desarrollo.

## ⛔ PASO 0 ABSOLUTO — CLASIFICAR LA SOLICITUD ANTES DE CUALQUIER ACCIÓN

> **Esta es la primera instrucción que el orquestador ejecuta. Sin excepción. Sin importar el contenido del mensaje.**

Al recibir cualquier solicitud, clasificarla inmediatamente:

| ¿La solicitud modifica, corrige o mejora algo ya existente? | → **FIX GATE** |
| ¿La solicitud agrega funcionalidad completamente nueva? | → **SPEC GATE** |

### Si es Fix/Mejora (con o sin prefijo `[IMPROVEMENT]`, `[BUGFIX]`, `[HOTFIX]`, `[FIX]`)

1. ⛔ **DETENER TODA IMPLEMENTACIÓN**
2. Anunciar: _"⛔ FIX GATE ACTIVADO — no puedo escribir código hasta registrar este fix."_
3. Ejecutar `sdd/prompts/hotfix-bypass-gate.prompt.md` completo:
   - Recolectar tipo, título, descripción, justificación, archivos afectados, test
   - Validar elegibilidad (≤5 archivos, sin nuevos contratos de API, sin nuevas entidades)
   - Registrar en `sdd/fixes.json` con nuevo ID correlativo
   - Registrar en `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md` (o `sdd/fixes/` si es repo-level)
4. **Solo después del registro**: proceder con la implementación

### Si es funcionalidad nueva

Continuar con el flujo SDD normal (SPEC GATE A → flow → ciclo → agentes).

---

## Qué hace (flujo SDD normal)

0. **Corre `pnpm sdd:gate <spec-id>`** (GATE A, fuente canónica `sdd/dual-harness/rules/sdd-gates.md`)
   y pega la salida. `sdd-file-structure` y `sdd-data-schemas` se consultan por sección cuando
   toca escribir cada artefacto — no se cargan enteras
1. Lee `sdd/global.json` para verificar el estado actual y el `profile` (`team` → `full`,
   `solo` → `lite`; el prefijo `[LITE]`/`[FULL]` del pedido gana). En `lite` sos el único actor:
   `plan.md` (§3.8) + `tasks.json`, GATE B, implementación y cierre como reviewer
2. Verifica dependencias (las cubre el gate)
3. **Revisa `sdd/context/[apps|libs|tools]/[nombre]/updates/` del subproyecto involucrado**
   y, si hay fragmentos pendientes, los consolida (ver "Consolidación de contexto" abajo)
   antes de generar el brief. **Revisa también `sdd/memory/journal/`**: con ≥5 entradas,
   destila (ver "Destilación de memoria" abajo)
4. Lee solo la sección relevante de la especificación bajo `sdd/specs/`
5. Prepara el brief con el contexto mínimo por agente
6. Mueve el módulo a `in_progress_modules` en `sdd/global.json`
7. **Crea `sdd/specs/{spec-id}/cycles/cycle-[XX]/cycle.json` con `status: "in-progress"` y `flow`** —
   obligatorio antes de que cualquier agente implementador escriba código (GATE B:
   `pnpm sdd:gate <spec-id> cycle-[XX]`).

## Consolidación de contexto (patrón changesets)

Antes de iniciar un ciclo nuevo sobre un subproyecto, el orquestador es el actor
responsable de fundir sus fragmentos aditivos pendientes:

1. Listar `sdd/context/[apps|libs|tools]/[nombre]/updates/*.md` del subproyecto.
2. Si hay fragmentos, fundirlos en `constitution.md`/`context_prompt.md` en orden de
   nombre (el prefijo de fecha los ordena cronológicamente), aplicando la regla de
   eliminación de información obsoleta y actualizando el header
   `> Última actualización:`.
3. Borrar los fragmentos ya consolidados.
4. Commitear el resultado como cambio dedicado: `chore(sdd): consolidate context updates for [nombre]`.

> ⛔ Nunca consolidar en paralelo con un ciclo abierto sobre el mismo subproyecto.
> Si no hay fragmentos pendientes, no hay nada que hacer — los archivos base no se
> tocan sin fragmentos que fundir.

## Destilación de memoria (MEMORIA GATE del dual-harness)

Mismo patrón y mismo actor único que la consolidación de contexto, aplicado a
`sdd/memory/`:

1. Listar `sdd/memory/journal/*.md`. Con menos de 5 entradas, no hacer nada.
2. Fundir cada entrada en **una línea** de la categoría correcta de
   `sdd/memory/lessons.md` (Proceso / Técnica / Costo) y actualizar su encabezado
   `> Última destilación:`. Lección específica de un subproyecto → va a su
   `constitution.md` (consolidación de contexto), no a `lessons.md`.
3. Respetar el cap de 120 líneas de `lessons.md`: si se supera, podar primero
   lecciones obsoletas o ya absorbidas por una skill/constitution.
4. Borrar las entradas destiladas y commitear como cambio dedicado:
   `chore(sdd): distill memory journal into lessons`.

## Archivos que modifica

- `sdd/global.json` — mueve el módulo a `in_progress_modules`
- `sdd/specs/index.json` — registra la spec si aún no está (append-only); en `cycle-01` pasa su `status` de `"draft"` a `"in-progress"`
- `sdd/specs/{spec-id}/cycles/cycle-[XX]/cycle.json` — creado al inicio con `status: "in-progress"`
- `sdd/fixes.json` — solo cuando se activa el FIX GATE
- `sdd/context/[apps|libs|tools]/[nombre]/constitution.md` y `context_prompt.md` —
  **solo** durante la consolidación de fragmentos, nunca durante un ciclo en curso
- `sdd/context/[apps|libs|tools]/[nombre]/updates/*.md` — borrados tras consolidar
- `sdd/memory/lessons.md` — **solo** durante la destilación de memoria (≥5 entradas en journal)
- `sdd/memory/journal/*.md` — borrados tras destilar

> ⛔ Después de CUALQUIER escritura: `pnpm sdd:validate` debe quedar en verde.

## Estructura de cycle-[XX]/cycle.json al iniciar

Usar el template canónico de `sdd/skills/sdd-file-structure/SKILL.md` §3.2
(valida contra `sdd/schemas/cycle.schema.json`). Campos clave al inicio:
`status: "in-progress"`, `started_at`, `completed_at: null`, `apps: []` (siempre array),
`metrics` **con contadores en 0 y `usage: { tokens_in: 0, tokens_out: 0, by_agent: [] }`**
(nunca `metrics: null` desde v0.11.0), `reviewer_report: null`.

> El sdd-reviewer es el único agente que cambia `status` a `"completed"`
> y completa el `reviewer_report` al cerrar el ciclo.

## Transición de status de la spec

Si el ciclo que estás creando es el `cycle-01` de la spec y su entrada en
`sdd/specs/index.json` tiene `status: "draft"` (valor inicial que le da `harness add spec`),
pasala a `"in-progress"` como parte del PASO 6/7 de arriba. No tocar ningún otro campo de la
entrada. Ciclos posteriores de la misma spec (`cycle-02`, `cycle-03`…) no vuelven a tocar este
campo.

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-orchestrator.agent.md` § Registro de consumo — creás `metrics` con
`by_agent: []` al abrir el ciclo, capturás la notificación exacta (`agent-usage-notification`)
de cada subagente que dispares (acumulada por agente si lo reanudás con `SendMessage`: anotá
la diferencia) y la volcás en `by_agent` + `usage` de su task, y registrás tu
propia entrada `{ "agent": "orchestrator", ... }` si el reviewer todavía no la agregó.
