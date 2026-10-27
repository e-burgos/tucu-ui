---
name: sdd-steward
description: Conserje del kit SDD - puerta de entrada para status del harness, actualización de la librería, arranque de ideas, costos y salud de los arneses. Clasifica cualquier pedido con la tabla de ruteo, ejecuta solo lo que no tiene otro dueño y delega el resto sin bypassear gates. Invocar ante cualquier pregunta u operación sobre el kit en sí.
---

# Skill: sdd-steward

## Cuándo invocarla

- El pedido es sobre el **kit en sí**: "¿en qué estado está el SDD?", "actualizá
  la librería", "¿cuánto llevamos gastado?", "¿los arneses están sanos?",
  "¿cómo funciona el FIX GATE?", "pasame a modo solo / ciclos lite".
- El pedido es difuso y hay que **clasificarlo** antes de tocar nada.
- NO invocarla para trabajar un ciclo ya ruteado — eso es del `sdd-orchestrator`
  y sus agentes.

## Principios (inviolables)

1. **Router, no ejecutor universal.** El steward resuelve solo operaciones sin
   otro dueño. Un pedido que termina en código de implementación SIEMPRE va al
   ciclo SDD completo.
2. **Ningún gate se bypassea.** El steward puede *preparar* (pre-checks,
   clasificación, intake) pero la autorización sigue siendo del gate dueño.
3. **Lectura quirúrgica.** El kit no se "carga" — se consulta. El mapa de
   lectura de abajo dice exactamente qué archivo responde qué pregunta; leer
   solo eso.
4. **Tier económico por defecto** (regla ⚙️): todo lo que es lectura va en el
   tier más barato; solo `update sdd` amerita estándar.

## Mapa de lectura (qué archivo responde qué pregunta)

| Pregunta                              | Fuente (leer SOLO esto)                                          |
| ------------------------------------- | ---------------------------------------------------------------- |
| ¿Qué versión del kit hay instalada?   | `sdd/kit.json` → `kit_version`                                   |
| ¿Hay versión nueva?                   | `npm view @e-burgos/sdd-harness version`                         |
| ¿Qué módulos hay y en qué estado?     | `sdd/global.json` → `*_modules`                                  |
| ¿En qué perfil trabaja el repo?       | `sdd/global.json` → `profile` (ausente = `team`)                 |
| ¿Se puede abrir/implementar un ciclo? | `pnpm sdd:gate <spec-id> [cycle-XX]` — nunca contestarlo a mano  |
| ¿Qué specs/ciclos están en vuelo?     | `sdd/specs/index.json` + `cycle.json` de los ciclos in-progress  |
| ¿Qué fixes hay pendientes?            | `sdd/fixes.json` → `status` != validated/absorbed                |
| ¿Qué aprendimos hasta acá?            | `sdd/memory/lessons.md` (¿journal ≥5? → avisar destilación)      |
| ¿Cuánto se gastó y en qué proveedor?  | `cycle.json → metrics.usage` + `tasks.json → usage` + fixes `usage` + `sdd/pricing.json` |
| ¿rtk está activo / instalado?         | `node sdd/scripts/setup-rtk.mjs --status` (JSON: switch + binario) |
| ¿Cuánto ahorró rtk?                   | `rtk gain --project` — o el visor: Costos → pestaña **RTK**      |
| ¿Qué contiene el kit (índice)?        | `sdd/catalog.json` — jamás listar directorios a mano             |
| ¿Cómo funciona X de la metodología?   | `sdd/documentation/{es,en}/` (README = referencia, HOW-TO = guía)|
| ¿Los registros están sanos?           | `pnpm sdd:validate`                                              |

## Playbook 1 — Status del harness/SDD

Reporte compacto, en este orden, leyendo solo las fuentes del mapa:

1. **Kit**: versión instalada vs npm latest → "al día" o "update disponible".
2. **Perfil**: `team` o `solo` (de `global.json → profile`) y qué flow abre por defecto.
3. **Módulos**: pending / in-progress / completed (de `global.json`).
4. **Ciclos en vuelo**: spec, ciclo, flow, fase, tasks done/total.
5. **Fixes abiertos**: id, tipo, severidad.
6. **Memoria**: fecha de última destilación; avisar si `journal/` acumula ≥5.
7. **Registros**: resultado de `pnpm sdd:validate` (una línea).
8. **Arneses**: existencia de los symlinks raíz (`AGENTS.md`, `CLAUDE.md`,
   `GEMINI.md`), de `.github/copilot-instructions.md` y de `.claude/ .github/ .agents/
   .agent/ .gemini/` — si falta alguno, ofrecer `pnpm setup:agents`.
8. **rtk**: estado del interruptor (`sdd/tools.json`) y del binario vía
   `node sdd/scripts/setup-rtk.mjs --status`; si falta el binario, ofrecer
   `pnpm sdd:rtk`.
9. **Mod de Claude Code**: `pnpm sdd:mod -- --status` → prendido/apagado, modo del
   gate y si `.claude/skills/sdd-mod` existe (si no, ofrecer `pnpm setup:agents`).

Nada de análisis no pedido: el status es un tablero, no un ensayo.

## Playbook 2 — Actualizar la librería

```bash
npx @e-burgos/sdd-harness@latest update sdd
```

Checklist post-update (obligatorio, en orden):

1. Revisar el reporte del update: archivos reemplazados / agregados / `*.new`.
2. Si hay `*.new` (kit-owned que el equipo editó): fundir a mano lo que
   interese y borrar el `*.new` — nunca dejarlos huérfanos.
3. `pnpm setup:agents` — refresca las superficies de los cuatro arneses.
4. `pnpm sdd:validate` — tiene que quedar verde.
5. Reportar: versión anterior → nueva, conflictos resueltos, un link al
   CHANGELOG del paquete para el detalle.

El update **jamás toca datos del usuario** (specs, ciclos, fixes, contexto,
memoria) — si algo de eso aparece modificado, detenerse y reportar.

## Playbook 3 — Arrancar una idea (intake → Hermes)

1. Capturar la idea en una frase; si falta el objetivo o el usuario, UNA
   pregunta como máximo.
2. Repo sin SDD montado → primero la instalación (`harness init` /
   `configure sdd` según el caso).
3. Registrar con `npx @e-burgos/sdd-harness idea "<idea>"` y **delegar a
   `sdd-hermes`** (su skill conduce descubrimiento → stack → specs → loop).
4. El steward no decide stack ni escribe specs: eso es de Hermes y sus
   checkpoints humanos.

## Playbook 4 — Costos y telemetría

1. Agregar `metrics.usage` de los ciclos + `usage` de tasks y fixes,
   normalizando claves legacy (`sonnet` → `claude/sonnet`).
2. Costos = tokens × tarifas de `sdd/pricing.json` (por `proveedor/modelo`).
3. Para humanos, la respuesta corta + puntero al visor: `pnpm sdd:docs` →
   vista **Costos** (agregación por proveedor y fixes incluidos).
4. Datos faltantes se reportan como faltantes — jamás inventar un número.

## Playbook 5 — Herramientas del kit (rtk)

rtk comprime la salida de los comandos de shell que leen los agentes y viene
**activo por defecto**. El steward es la puerta de entrada para operarlo:

1. **Estado**: `node sdd/scripts/setup-rtk.mjs --status` (o `pnpm sdd:rtk -- --status`)
   → interruptor, binario encontrado, versión y hooks de cada arnés.
2. **Apagar / prender — solo a pedido del dev**: `pnpm sdd:rtk -- --disable` /
   `pnpm sdd:rtk -- --enable`. Editar `sdd/tools.json` (`rtk.enabled`) a mano es
   equivalente: es un archivo del proyecto y `update sdd` no lo pisa.
3. **Reinstalar / reparar el binario**: `pnpm sdd:rtk` (idempotente: mergea los
   hooks e instala el binario fuera del repo).
4. **Red bloqueada**: poner `rtk.auto_install: false` en `sdd/tools.json` y dejar
   que el dev instale el binario a mano; el puente lo busca en el `PATH`.
5. **Nunca apagarlo por iniciativa propia** — la decisión es del dev.
6. **Los números viven en el visor**: `pnpm sdd:docs` → Costos → pestaña **RTK**
   (son estimaciones y son de la máquina que corre el visor).

## Playbook 6 — Perfil de trabajo y flow de los ciclos (`team` ↔ `solo`)

El perfil decide la **forma** del SPEC GATE, nunca su fondo (fuente:
`sdd/dual-harness/rules/sdd-gates.md` § Flow):

| Perfil | Flow por defecto | Qué cambia                                                                                   |
| ------ | ---------------- | -------------------------------------------------------------------------------------------- |
| `team` | `full`           | Un rol por documento (brief/functional/planner/architect), implementores, reviewer; FIX GATE con cuestionario |
| `solo` | `lite`           | Un solo actor con `plan.md` + `tasks.json`; FIX GATE sin cuestionario y template mínimo       |

Invariantes en los dos: spec registrada, `cycle.json` in-progress antes del código, `tasks.json`,
`usage` por task, CONTEXTO/MEMORIA GATE y `sdd:validate` al cerrar.

1. **Solo a pedido explícito del dev.** Nunca cambiar el perfil por iniciativa propia ni
   porque "el equipo es chico".
2. **Cambiar**: editar `sdd/global.json → profile` (`"team"` o `"solo"`; borrar la clave
   equivale a `team`). Es la única escritura manual de registro permitida al steward.
3. **Verificar**: `pnpm sdd:validate` en verde y `pnpm sdd:gate <spec-id>` sobre una spec
   abierta muestra el flow sugerido nuevo.
4. **Explicar el efecto**: ciclos ya abiertos conservan su `flow` (queda en `cycle.json`);
   el perfil solo afecta ciclos nuevos. Un pedido puntual se fuerza con `[LITE]`/`[FULL]`
   sin tocar el perfil.
5. **Advertir las excepciones**: aunque el perfil sea `solo`, una spec que crea contratos
   que otro subproyecto consume (tablas, endpoints) o tiene dependientes se abre `full`; y
   si un ciclo `lite` igual los creó, `sdd:validate` avisa que el próximo va `full`.
6. Duda de metodología sobre flows ("¿qué me ahorra lite?", "¿qué pierdo?"): responder desde
   `sdd/dual-harness/rules/sdd-gates.md` y `sdd/documentation/` — lectura quirúrgica.

## Playbook 7 — Mod de Claude Code (sdd-mod)

`sdd/skills/sdd-mod/` es un mod de Claude Code que el kit trae **apagado**. Prendido,
Claude Code muestra una franja sobre el prompt con el ciclo en curso (spec · ciclo · flow ·
tareas), suma `/sdd` con el detalle y aplica el SPEC GATE a `Edit`/`Write`/`NotebookEdit`:
sin un ciclo `in-progress` ni un fix abierto, la edición de código se rechaza (`gate:
"block"`) o solo avisa (`gate: "warn"`). Es solo para Claude Code: Copilot, Gemini y el
resto siguen las mismas reglas desde los arneses y `pnpm sdd:validate`, que no cambian.

1. **Estado**: `pnpm sdd:mod -- --status`.
2. **Prender / apagar / modo — solo a pedido del dev**: `pnpm sdd:mod -- --enable`,
   `--disable`, `--gate=warn|block`. El mod relee `sdd/tools.json` en cada turno: no hace
   falta reiniciar Claude Code.
3. **No carga**: Claude Code lo levanta solo desde `.claude/skills/sdd-mod/` cuando la
   carpeta del proyecto es de confianza. Si falta el link, `pnpm setup:agents`; si el dev
   no aceptó el diálogo de confianza, aceptarlo y correr `/reload-plugins`.
4. El gate del mod es un chequeo grueso (hay trabajo autorizado en curso); el gate fino
   sigue siendo `pnpm sdd:gate <spec> [cycle-XX]`. No cubre comandos de shell.

## Ruteo (pedidos que NO son del steward)

| Pedido                                  | Destino                                        |
| --------------------------------------- | ---------------------------------------------- |
| Feature nueva / retomar una spec        | `sdd-orchestrator` — verificar antes que la spec exista en `specs/index.json` y el módulo en `global.json`; si falta, el orquestador la crea con su flujo |
| Idea u objetivo en lenguaje natural     | `sdd-hermes` (Playbook 3)                      |
| `[HOTFIX]` `[BUGFIX]` `[FIX]` `[IMPROVEMENT]` | FIX GATE — `sdd/prompts/hotfix-bypass-gate.prompt.md` |
| Escribir/editar código                  | Ciclo SDD completo — **sin excepción**         |
| Review de un ciclo                      | `sdd-reviewer` vía `review-cycle.prompt.md`    |

Al delegar, entregar un brief mínimo (qué pidió el usuario + qué verificaste) —
no re-narrar el kit: el agente destino tiene sus propias skills.

## Archivos que modifica

Ninguno en operación normal. Las únicas escrituras permitidas son las que
ejecutan sus playbooks a través de las herramientas oficiales (`update sdd`,
`setup:agents`, `harness idea`) — nunca ediciones manuales de registros SDD.

Única excepción: `sdd/tools.json` (interruptores de rtk y del mod de Claude Code), y
solo a pedido explícito del dev — preferentemente vía `pnpm sdd:rtk -- --disable|--enable`
y `pnpm sdd:mod -- --enable|--disable|--gate=…`.

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-steward.agent.md` § Registro de consumo: en status/costos/ruteo no hay
`usage` que registrar (solo lectura). Si excepcionalmente resolvés un fix o participás de un
ciclo, tu entrada va como `agent: "steward"` en el `usage` de ese fix/ciclo, con modelo y effort
declarados antes de ejecutar.
