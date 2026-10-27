---
trigger: always_on
description: Presupuesto de modelo y esfuerzo por tarea (regla obligatoria de optimización de tokens) y CONTRATO CANÓNICO de telemetría de costos — quién registra qué, cuándo y de dónde sale el número en cada arnés
---

# ⚙️ Presupuesto de modelo/esfuerzo (OBLIGATORIO)

Antes de encarar CUALQUIER tarea: decidir explícitamente qué tier de modelo y qué
nivel de razonamiento conviene, para el trabajo propio y para cada subagente que se
dispare. Regla base: **el tier más barato que aún cumple con calidad**; escalar solo
con justificación. Tabla canónica de equivalencias por proveedor: `AGENTS.md`/`CLAUDE.md`/
`GEMINI.md` raíz, sección ⚙️.

| Tier          | Tarea típica                                             | Gemini (modelo/thinking)             |
| ------------- | -------------------------------------------------------- | ------------------------------------ |
| **económico** | lectura, formateo, edición mecánica, grep, fan-out       | Flash-Lite o Flash / `minimal`–`low` |
| **estándar**  | implementación de una task, tests, edición multi-archivo | Flash / `medium`                     |
| **alto**      | arquitectura, debugging complejo, orquestación, review   | Pro / `low`–`high`                   |
| **máximo**    | solo el paso más difícil (verify adversarial, judge)     | Pro / `high`                         |

Agentes del ciclo SDD: implementores → estándar; orquestador/arquitecto/reviewer →
alto; funcional/planner → estándar salvo spec compleja. En un ciclo `flow: lite` el único
actor trabaja en **alto** para `plan.md` y baja a **estándar** para las tasks.

**En Antigravity el modelo lo elige el usuario en el dropdown.** ANTES de ejecutar,
comparar el modelo activo con el tier requerido: si no coinciden (tarea económica por
correr en Pro/high, o tarea de tier alto en Flash), **avisar y pedir el cambio de
modelo o thinking level** — nunca ejecutar en silencio con el tier equivocado.

**En Gemini CLI:** modelo por sesión/flag acorde al tier; fan-out de lectores en
subagentes económicos, síntesis en Pro; `/stats` da el consumo real del main loop.

# Telemetría de uso (dashboard de Costos) — CONTRATO CANÓNICO, OBLIGATORIO

> Este es el contrato completo (v0.11.0). Los arneses raíz lo resumen y apuntan acá; se
> lee **al cerrar** una unidad de trabajo, no al abrir la sesión.

Todo agente que participe de un flujo SDD o de un fix y consuma tokens registra, al **cerrar
su unidad de trabajo** (task, documento, ciclo, fix), `provider_model` (`claude/sonnet`,
`gemini/pro`, `copilot/claude-sonnet`), `effort`/thinking, `tokens_in`, `tokens_out`, `source`
y `approx`. Sin ese registro la unidad no está cerrada. Modelo y effort se declaran ANTES de
ejecutar (regla ⚙️); los tokens se registran AL CERRAR. No es una estimación reconstruida al
final: es un registro por unidad.

**Quién escribe qué, y cuándo:**

- **Task** → `tasks.json → tasks[].usage` (quien la ejecuta, al cerrarla):
  `{provider_model, effort, tokens_in, tokens_out, approx, source, recorded_at, agent,
  tokens_total?}`. `model_tier` es el alias legacy — se lee, no se escribe.
- **Documentos** functional/planner/architect (o `plan.md` en `lite`) → una entrada en
  `cycle.json → metrics.usage.by_agent[]` al terminar el documento. El orquestador crea
  `metrics` con contadores en 0 y `usage: {tokens_in: 0, tokens_out: 0, by_agent: []}` al
  abrir el ciclo.
- **Ciclo** → el reviewer **consolida `by_agent`, no estima el total**: `by_agent[]` = una
  entrada por unidad `{agent, label?, provider_model, effort, tokens_in, tokens_out,
  tokens_total?, approx, source, recorded_at}`; `by_tier` se **deriva** de `by_agent`
  agrupando por `provider_model` (no se llena a mano); el top-level es la suma. El reviewer
  agrega su propia entrada (la revisión también consume tokens) y no cierra el ciclo sin
  `by_agent` completo y la suma consistente. En `flow: lite`, plan + revisión van en **una**
  entrada `agent: "orchestrator"`, `label: "solo"`.
- **Fix** → `sdd/fixes.json → fixes[].usage`, mismos campos; si trabajaron varios agentes,
  `by_agent[]` con una entrada por agente. El FIX GATE no cierra un fix sin `usage`.
- `agent` ∈ `functional | planner | architect | implementor-back | implementor-front |
  reviewer | orchestrator | steward | hermes | custom`.

**Declarar proveedor y modelo no es opcional.** El modelo siempre se conoce: es el que estás
usando. De dónde sale el número de tokens:

| Arnés                                             | Fuente                                                                                                                                                   | `source`                    | `approx` |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| Claude Code — subagente vía tool `Agent`          | notificación al padre al terminar: `<usage><subagent_tokens>N</subagent_tokens>…</usage>` — exacta, sin pedirle nada al dev; `tokens_total: N`, split por defecto 85/15 en in/out. **Al reanudar el mismo subagente con `SendMessage`, `N` es el acumulado del agente desde que se lanzó, no lo de esa task: registrar `N − N_anterior`** | `agent-usage-notification`  | `false`  |
| Claude Code — main loop                           | reporte de uso de la sesión (comando del cliente: se lo pide al dev)                                                                                     | `session-report`            | `false`  |
| Gemini CLI — main loop                            | `/stats` (comando del cliente)                                                                                                                           | `stats-command`             | `false`  |
| Gemini CLI — subagentes                           | sin reporte separado → estimación declarada                                                                                                              | `declared-estimate`         | `true`   |
| GitHub Copilot (CLI, coding agent, custom agents) | sin contador → estimación declarada                                                                                                                      | `declared-estimate`         | `true`   |
| Antigravity                                       | sin contador → estimación declarada (registra bajo `gemini/*`)                                                                                           | `declared-estimate`         | `true`   |

> `/stats` solo cubre el **main loop** de Gemini CLI; sus subagentes van con estimación
> declarada. Antigravity registra bajo `gemini/*` — corre modelos Gemini.

**Sin contador se estima; no se omite.** `/stats` y el reporte de sesión son comandos del
cliente: un agente no puede ejecutarlos (pedíselos al dev). Lo prohibido es inventar un número
preciso y presentarlo como medido: `approx: false` con `source: declared-estimate` es **ERROR**
del validador.

**Reglas del validador (`pnpm sdd:validate`):** error si un ciclo `completed` (con
`completed_at` ≥ 2026-09-02) o un fix resuelto (`resolved_at` ≥ 2026-09-02) no tiene `usage`
con proveedor/modelo y tokens; warning si falta `by_agent` o `sum(by_agent) ≠ by_tier`;
registros anteriores a esa fecha: warning, no error.

Alimenta la vista **Costos** del visor SDD (comparativa contra la estimación tradicional de
las tasks); las tarifas por proveedor se editan en `sdd/pricing.json`.
