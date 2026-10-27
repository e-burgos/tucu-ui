# Proyecto SDD

> **Nombre y descripción del proyecto:** `sdd/global.json` → `project` / `description`.
> Es la única fuente de verdad. Este archivo nunca los hardcodea: `sdd/` tiene que poder
> copiarse a otro repo sin editar nada. `pnpm sdd:validate` falla si el nombre se filtra.

Este proyecto utiliza la metodología Spec-Driven Development (SDD).
Toda la información del contexto general, stack tecnológico y reglas de desarrollo se encuentra unificada en:
👉 **[sdd/context/context_prompt.md](sdd/context/context_prompt.md)**

Por favor, lee este archivo antes de realizar cualquier cambio en el repositorio.

---

<!-- regla-cero:start -->
## ⓪ REGLA CERO — modelo, esfuerzo y contexto (INVIOLABLE, antes de cualquier acción)

> [!IMPORTANT]
> **Antes de CUALQUIER acción de una tarea nueva —incluida la primera de la sesión, antes de
> verificar el workspace, leer archivos o editar— escribí UNA línea visible:**
>
> `Regla cero → tier: <económico|estándar|alto|máximo> · modelo: <…> · esfuerzo: <…>`
>
> Sin esa línea no se empieza. Tabla de tiers y detalle: sección «⚙️ Selección de modelo y
> esfuerzo» (anexo de esta regla, más abajo).

- **Subagentes y workflows:** cada `Agent`/`Workflow` lleva `model` Y `effort` explícitos y los
  declarás en la misma línea (tier + modelo + esfuerzo de cada uno). Fan-out de lectores →
  económico; la síntesis → alto. Nunca un fleet entero en el tier caro por defecto.
- **Modelo activo del main loop:** si es MÁS caro que el tier que pide el trabajo (p. ej. opus
  para leer estado o editar mecánico), delegá ese trabajo a un subagente más barato o pedile al
  usuario `/model` y `/effort`; nunca quemes en silencio el tier caro. Si es MÁS barato que el
  necesario, avisá y escalá (subagente `opus`/`high` o `/model`).
- **Contexto mínimo:** si existe `graphify-out/graph.json`, consultalo antes de grep/lecturas a
  ciegas; no releas lo ya establecido en la sesión ni narres opciones que no vas a seguir.
<!-- regla-cero:end -->

---

## 🚀 Estructura del workspace — skill `init-nx-workspace` (AL INICIAR SESIÓN)

> [!IMPORTANT]
> **Primero la regla cero (⓪, arriba): su línea de declaración va antes que cualquier acción,
> incluido este chequeo.** Después, antes de la primera acción de trabajo, verificá que el
> workspace esté montado. Es un solo comando y define si podés trabajar o si primero hay que inicializar:
>
> ```bash
> ls nx.json pnpm-workspace.yaml .npmrc .nxignore 2>&1; ls package-lock.json yarn.lock 2>/dev/null
> ```
>
> **Si falta alguno de los cuatro primeros, o si aparece un lockfile de npm/yarn → invocá la skill
> `init-nx-workspace` (tool `Skill`) ANTES de cualquier otra cosa** y seguila hasta su checklist de
> cierre. Un workspace desalineado falla de formas silenciosas y caras: tipos que solo andan después
> de `build`, libs que pnpm no linkea, `nx run-many` reventando en CI.
>
> Si los cuatro están y no hay lockfile rival, el workspace está sano: seguí con la tarea sin
> leer la skill (no gastes contexto en ella).

Invariantes que la skill garantiza y que **ningún cambio puede romper**:

- **pnpm es el único package manager.** `packageManager` pinneado en `package.json`; jamás
  `npm install` ni `yarn` en este repo — generan un lockfile rival y Nx infiere el PM del lockfile.
- **Los proyectos viven en `apps/`, `libs/` y `tools/`** — nunca en `packages/`. Los globs de
  `pnpm-workspace.yaml` y todo el sistema SDD asumen eso.
- **Si el repo usa el TS solution setup (`customConditions` en `tsconfig.base.json`), ese valor
  === `name` del `package.json` raíz.** Nx lo deriva literal de ahí; si divergen, TypeScript
  resuelve a `dist` en vez de a `src`. El template del kit (`sdd/templates/nx-workspace/`) usa el
  wiring legacy `paths` y no declara `customConditions`: ahí no aplica. `pnpm sdd:validate` avisa
  si divergen.
- **`.nxignore` contiene `sdd/templates`** — son blueprints, no proyectos Nx.
- **Crear apps/libs es otra skill:** `scaffold-nx`, y siempre dentro de un ciclo SDD.

---

## 🔎 Búsqueda y exploración del repo (graphify — OPCIONAL)

> [!NOTE]
> graphify indexa el repo como grafo de conocimiento en `graphify-out/` (código vía AST +
> capa semántica de docs). Es **opt-in por dev**: gitignoreado, no viaja con el repo y
> **nada del workflow depende de él**.

**Si `graphify-out/graph.json` existe**, consultalo antes de `grep`/`Read` a ciegas o de
lanzar un agente de exploración — es la opción más barata en tokens: `graphify query
"<pregunta>"` (`--budget N` acota), `graphify explain "<nodo>"` **antes de tocarlo**,
`graphify path "<A>" "<B>"`, `graphify affected "<nodo>"`; `graphify-out/GRAPH_REPORT.md`
tiene God Nodes y comunidades.

**Si no existe**, no lo menciones ni intentes construirlo por tu cuenta (consume cupo de API
del dev). Instalación, backend gratuito, mantenimiento al cerrar cada unidad de trabajo y sus
dos trampas silenciosas (`set -a && source .env && set +a`; modelos "lite" que devuelven un
grafo con 0 edges): `sdd/skills/setup-graphify/SKILL.md`. Si el modelo gratuito falla o se
agotó el cupo: avisá al dev y dejá la actualización para después — nunca escales a un modelo
pago sin autorización explícita.

## 🪶 rtk — salida de comandos comprimida (ACTIVO POR DEFECTO)

[rtk](https://github.com/rtk-ai/rtk) comprime la salida de los comandos de shell (`git`,
`pnpm`, `vitest`, `tsc`, `ls`, `grep`…) **antes de que la leas**: 60–90% menos texto; tus
herramientas de lectura de archivos quedan intactas. Activo desde el kit v0.12.0 y
transparente: pedís `git status` y se ejecuta `rtk git status`.

- **Nunca prefijes comandos con `rtk` a mano** — el puente ya lo hace.
- Si la salida comprimida te esconde algo que necesitás: `rtk proxy <cmd>` da la salida cruda.
- **Nunca apagues rtk por tu cuenta**: el interruptor es del dev (`sdd/tools.json`;
  `pnpm sdd:rtk -- --status | --enable | --disable`; el sdd-steward lo opera a pedido).
- `rtk gain --project` imprime el ahorro acumulado (estimación, no facturación). Es best
  effort y por máquina: sin binario o con hook roto el comando pasa **sin comprimir** y nunca
  se bloquea.

## 🧩 sdd-mod — el SDD dentro de Claude Code (OPCIONAL, apagado por defecto)

`sdd/skills/sdd-mod/` es un mod de Claude Code que se carga solo desde `.claude/skills/`. Con
`claude_mod.enabled: true` en `sdd/tools.json` muestra el ciclo en curso sobre el prompt, suma
`/sdd` y aplica el SPEC GATE a `Edit`/`Write`/`NotebookEdit` sobre código.

- **Si una edición vuelve rechazada con `SPEC GATE: …`**, no la reintentes ni la rodees con
  comandos de shell: no hay ciclo `in-progress` ni fix abierto. Seguí el camino que indica el
  mensaje (abrir el ciclo vía `sdd-orchestrator`, o el FIX GATE).
- **Nunca lo prendas, apagues ni cambies su modo por tu cuenta**: es decisión del dev
  (`pnpm sdd:mod -- --status | --enable | --disable | --gate=warn|block`; el sdd-steward lo
  opera a pedido).

## ⚙️ Selección de modelo y esfuerzo — anexo de la REGLA CERO (OBLIGATORIO — optimización de tokens/contexto)

> [!IMPORTANT]
> **Antes de encarar CUALQUIER tarea nueva —sin importar con qué proveedor o modelo
> estés corriendo en ese momento— decidí explícitamente qué tier de modelo y qué nivel
> de esfuerzo/razonamiento conviene, para el trabajo propio y para CADA
> subagente/workflow que dispares.** El objetivo es gastar el mínimo de tokens y
> contexto sin bajar la calidad del resultado. No arranques a ejecutar sin haber hecho
> esta decisión. Esta regla aplica con la misma fuerza a los tres proveedores del
> arnés: **Claude (Claude Code), Gemini (Antigravity / Gemini CLI) y GitHub Copilot**.

**Regla base:** elegí el tier más barato que aún cumple la tarea con calidad. Escalá
sólo cuando la tarea lo justifique (ambigüedad, razonamiento cross-cutting, riesgo de
error alto). Ante la duda entre dos tiers, probá el más barato primero y escalá si el
resultado no alcanza.

**Tabla canónica de tiers por proveedor** (única fuente de equivalencias — skills y
agentes SDD referencian estos tiers abstractos, no modelos concretos):

| Tier          | Tipo de tarea                                                                                                    | Claude (`model`/`effort`) | Gemini (modelo/`thinking`)        | Copilot (picker/agents)             |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------- | ----------------------------------- |
| **económico** | Lectura de estado, formateo, edición mecánica, respuestas cortas, grep dirigido, fan-out de lectores             | `haiku` / `low`–`medium`  | Flash-Lite o Flash / `minimal`–`low` | modelo económico (ej. `gpt-5-mini`) |
| **estándar**  | Implementación de una task acotada, tests, edición multi-archivo simple, la mayoría de subagentes ejecutores     | `sonnet` / `medium`       | Flash / `medium`                  | modelo estándar (ej. `claude-sonnet`) |
| **alto**      | Arquitectura, decisiones cross-cutting, debugging complejo, orquestación SDD, revisión final del ciclo, síntesis | `opus` / `high`–`xhigh`   | Pro / `low`–`high`                | modelo alto (ej. `claude-opus`)     |
| **máximo**    | Sólo el paso más difícil (verify adversarial, judge, diseño crítico)                                             | `fable` / `xhigh`–`max`   | Pro / `high`                      | el tier más alto habilitado         |

**Enforcement por proveedor (cómo se cumple la regla en cada arnés):**

- **Claude Code (programático):** pasá `model` y `effort` explícitos en cada subagente
  (`Agent`) y workflow (`Workflow`), acordes a la tabla. Un fan-out de
  lectores/mecánicos va en económico; la verificación o síntesis en alto. Nunca
  dispares todo un fleet en el tier más caro por defecto.
- **GitHub Copilot (pinning + flags):** los agentes SDD (`.github/agents/*.agent.md`)
  llevan `model:` pinneado según su rol. El kit lo shippea con alias Claude
  (`opus`/`sonnet`); si tu equipo trabaja en Copilot, mapealo UNA vez al modelo del
  MISMO tier disponible en tu org editando `sdd/agents/*.agent.md` (nunca el symlink)
  — después no lo cambies ad-hoc. En Copilot CLI: `--model` / `/model` y
  `--reasoning-effort` acordes al tier; en chat/coding agent, verificá el modelo del
  picker antes de ejecutar.
- **Antigravity (dropdown del usuario):** el agente no puede cambiar el modelo por su
  cuenta. ANTES de ejecutar, compará el modelo activo del dropdown con el tier
  requerido: si una tarea económica está por correr en Pro/`high`, o una de tier alto
  en Flash, **avisá y pedí al usuario el cambio de modelo o de thinking level** — no
  ejecutes en silencio con el tier equivocado.
- **Gemini CLI:** elegí el modelo por sesión/flag acorde al tier; el fan-out de
  lectores/mecánicos va en subagentes con modelo económico y la síntesis en Pro.
- **Agentes del ciclo SDD (cualquier proveedor):** implementores → **estándar**;
  orquestador, arquitecto y reviewer → **alto** (razonamiento y visión global);
  funcional/planner → **estándar** salvo spec compleja.
- **Trabajo propio (main loop):** si la tarea es trivial, bajá el esfuerzo; no quemes
  contexto releyendo lo ya establecido ni narrando opciones que no vas a seguir.
- **Si el repo tiene grafo de graphify** (regla anterior, opcional), consultalo antes de
  pagar lecturas a ciegas: es parte de la misma optimización de tokens.
- **Registro de consumo por agente: obligatorio.** Todo agente que consuma tokens en un
  flujo SDD o un fix registra `provider_model`, `effort`, `tokens_in`/`tokens_out`, `source` y
  `approx` al **cerrar su unidad de trabajo** (task → `tasks.json → usage`; documento y ciclo
  → `cycle.json → metrics.usage.by_agent[]`; fix → `fixes.json → usage`). Sin ese registro
  la unidad no está cerrada y `pnpm sdd:validate` lo marca.

**Contrato completo de telemetría (capa 2 — se lee al cerrar, no al abrir la sesión):**
`sdd/dual-harness/rules/sdd-model-budget.md` — quién escribe qué y cuándo, la tabla de
fuentes por arnés (`agent-usage-notification`, `session-report`, `stats-command`,
`declared-estimate`) y las reglas del validador. Alimenta la vista **Costos** del visor
(`pnpm sdd:docs`); tarifas en `sdd/pricing.json`.

## ✍️ Código sin comentarios (OBLIGATORIO — el código se explica solo)

> [!IMPORTANT]
> **No escribir comentarios en el código de implementación.** Hoy se genera más
> comentario que código, y es gasto doble: tokens al escribirlos y tokens cada vez que
> un humano o un agente lee el archivo. En este repo la documentación NO vive en
> comentarios: vive en los documentos SDD (spec, functional, planner, architect,
> constitutions) y, si está disponible, en el grafo de graphify. Un comentario que
> repite lo que el SDD ya documenta es duplicación que además se desactualiza.

**Cómo lograr cero comentarios sin perder claridad:**

- **Nombres declarativos**: cada función/método/variable dice exactamente qué hace, sin
  margen a segunda interpretación — `propagateAccountStatusToTradingApi()` en vez de
  `process()` + comentario explicando.
- **Modularizar**: funciones cortas, de una sola responsabilidad. Una función larga con
  bloques comentados (`// paso 1: ...`) son en realidad N funciones con nombre propio.
- **El impulso de comentar es señal de refactor**: si sentís que una línea necesita
  explicación, extraé una función cuyo nombre sea esa explicación.
- Prohibido: comentarios narrativos, "qué hace la línea siguiente", código muerto
  comentado, y `// TODO` — un TODO real es una task o un fix registrado en SDD, no un
  comentario.

**Únicas excepciones permitidas** (una línea, en inglés):

- Una restricción que el código no puede expresar: workaround con link al issue
  externo, o regla de negocio contra-intuitiva con referencia a su spec
  (ej. `// ack 200 only after confirmed propagation so the provider retries (spec-jdoe-001)`).
- Anotaciones exigidas por framework/tooling (Swagger/OpenAPI, Lombok, decorators) y
  Javadoc/JSDoc público **solo si el linter del subproyecto lo exige** — eso no es un
  comentario narrativo.

**Regla espejo en review:** un PR que agrega comentarios fuera de estas excepciones
recibe request de cambios; el sdd-reviewer lo chequea al cerrar el ciclo.

## 🧩 Contexto de subproyectos: actualizaciones ADITIVAS (anti merge-conflict)

> [!IMPORTANT]
> `sdd/context/[apps|libs|tools]/[nombre]/constitution.md` y `context_prompt.md` son la
> fuente de verdad técnica de cada subproyecto y los archivos más disputados del repo. Por
> eso **durante un ciclo o fix nunca se editan directamente**: se escribe un fragmento
> aditivo (patrón changesets) y un solo actor los consolida después.

1. **Escribir** (quien cierra el ciclo o fix): `updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md`
   (fixes: `YYYY-MM-DD-fix-[gh-user]-[seq].md`) — solo el delta, cuatro secciones: Estado ·
   Estructura · Dependencias · Qué sigue. Único por construcción: dos devs jamás chocan.
   Template: `sdd/skills/sdd-file-structure/SKILL.md` §3.7.
2. **Leer** (cualquier agente): contexto vigente = archivos base + `updates/*.md` en orden de
   nombre. La línea `> Última actualización:` del base **no** es la verdad si hay fragmentos.
3. **Consolidar** (un solo actor, nunca en paralelo con un ciclo abierto sobre ese subproyecto):
   el orquestador al abrir el próximo ciclo, o el reviewer si se acumulan ≥5 fragmentos
   (`pnpm sdd:validate` lo avisa), funde los fragmentos en los base (lo obsoleto se reemplaza,
   nunca se acumula), actualiza `> Última actualización:`, **borra los fragmentos** y commitea
   aparte (`chore(sdd): consolidate context updates for [nombre]`).
4. **Contexto global** (`sdd/context/constitution.md` y `context_prompt.md`): tablas de
   referencia — tocar **solo la fila del subproyecto propio**, jamás reformatear la tabla.

## 🧠 MEMORIA GATE — autoaprendizaje entre sesiones (lessons + journal)

> [!IMPORTANT]
> El contexto registra **qué es** el sistema; la memoria registra **qué aprendimos**
> trabajándolo. `sdd/memory/` viaja con git y sirve a cualquier agente, máquina o CI.

- **Leer** al iniciar toda sesión: `sdd/memory/lessons.md` completo (lecciones destiladas,
  cap duro 120 líneas — la única memoria que se carga siempre). `sdd/memory/journal/` jamás se
  lee entero: grep dirigido cuando una lección remite a su detalle.
- **Escribir** al cerrar un ciclo o fix, **solo si hubo lección real**:
  `sdd/memory/journal/YYYY-MM-DD-[spec-id]-cycle-[XX].md` (fixes:
  `YYYY-MM-DD-fix-[gh-user]-[seq].md`) con tres secciones: Qué pasó · Lección (1 línea) ·
  Costo evitable. **Filtro anti-ruido:** si no cambiaría el comportamiento de un agente
  futuro (lo obvio, lo ya documentado, el detalle del ciclo), no se escribe.
- **Destilar** (un solo actor, nunca en paralelo con un ciclo): con ≥5 entradas
  (`sdd:validate` avisa) el orquestador, al abrir el próximo ciclo, funde cada una en una
  línea de `lessons.md` (Proceso / Técnica / Costo), actualiza `> Última destilación:`, borra
  las destiladas y commitea aparte (`chore(sdd): distill memory journal into lessons`).
  Lección específica de un subproyecto → a su `constitution.md` vía consolidación 🧩. Durante
  ciclos/fixes `lessons.md` **no se edita**.

---

## ⛔ SPEC GATE — REGLA GLOBAL INVIOLABLE

> [!IMPORTANT]
> **Fuente canónica del gate: `sdd/dual-harness/rules/sdd-gates.md`.** Este archivo no
> repite la checklist — la responde un comando. Sin spec no hay ciclo; sin ciclo no hay
> implementación.

**Invariantes (todo flow, todo perfil):** spec registrada en `specs/index.json` · módulo en
`global.json` · `cycle.json` con `status: "in-progress"` **antes de la primera línea de
código** · `tasks.json` con tasks, y ninguna task `done` sin `usage`.

El gate tiene **dos momentos**, y los dos se contestan con un script (determinista, cero
lecturas a mano):

```bash
pnpm sdd:gate <spec-id|slug>            # GATE A — ¿se puede abrir un ciclo? (orquestador)
pnpm sdd:gate <spec-id|slug> cycle-XX   # GATE B — ¿se puede escribir código? (quien implementa)
```

`BLOCKED` → detener y completar lo que el script señala. `APPROVED` en A → el orquestador
decide el **flow** del ciclo y lo escribe en `cycle.json`/`tasks.json`; en B → implementar.

**Flow del ciclo (la forma del gate, no su fondo):** `full` (brief + functional + planner +
architect, un rol por documento) · `reduced` (refactor sin historias) · `lite` (**un solo
actor**, `plan.md` reemplaza a los cuatro documentos). Lo fija `sdd/global.json → profile`
(`team` → full, `solo` → lite) o el prefijo `[LITE]`/`[FULL]` del pedido; contratos que otro
subproyecto consume vuelven a `full`. Detalle, excepciones y reglas de `lite`: rule
`sdd-gates.md` § Flow. El perfil lo cambia el **sdd-steward** a pedido del dev.

**Raíz del ciclo (whitelist):** `brief.yaml`, `functional.md`, `planner.md`, `architect.md`,
`plan.md`, `cycle.json`, `tasks.json` y `artifacts/`. Naming (`spec-[gh-user]-[NNN]-[slug]`,
`cycle-XX` por spec, `TASK-NNN` por ciclo, fixes): `sdd/skills/sdd-file-structure/SKILL.md` §2.

## ⛔ TIPADO ESTRICTO DE REGISTROS SDD (INVIOLABLE)

Todo `*.json` de `sdd/` tiene JSON Schema estricto en `sdd/schemas/` y declara `$schema`.
**Antes de escribir un registro, leer su schema** (`sdd/skills/sdd-data-schemas/SKILL.md`
tiene el campo a campo). **Después de escribir:** `pnpm sdd:validate` (todos los registros +
reglas cruzadas) y `pnpm sdd:rebuild-tasks-index` (regenera el índice `sdd/tasks.json`; las
tasks canónicas viven en el `tasks.json` de cada ciclo — nunca editar el índice a mano). Un
commit con `pnpm sdd:validate` en rojo es inválido: el mismo check corre en CI
(`.github/workflows/sdd-validate.yml`) y es paso obligatorio del sdd-reviewer.

> [!NOTE]
> Si `NX_WORKSPACE_ROOT_PATH` está definida y no apunta al cwd, cualquier `nx …`
> (`pnpm sdd:validate`, `nx run-many -t lint test build`, etc.) corre contra OTRO repo sin
> ningún error visible — desactivá la variable o verificá `echo $NX_WORKSPACE_ROOT_PATH`
> antes de correr `nx` o los scripts `sdd:*`.

## ⛔ CONTEXTO GATE — REGLA GLOBAL DE CIERRE (INVIOLABLE)

**Al cerrar CUALQUIER ciclo** (o fix que cambió estructura/patrones/dependencias), quien
cierra deja el contexto actualizado ANTES de escribir `status: "completed"`:

1. Fragmento aditivo del subproyecto en `updates/` (sección 🧩 — los archivos base **no** se
   editan durante el ciclo).
2. `sdd/context/constitution.md` → solo la fila del subproyecto en la tabla-snapshot.
3. `sdd/context/context_prompt.md` → fila nueva solo si se creó una app/lib/tool.

`cycle.json` **no puede quedar `completed`** con el contexto desactualizado; `pnpm sdd:validate`
exige el fragmento del ciclo. El `cycle.json` se crea al **iniciar** (`status: "in-progress"`,
orquestador) y solo el reviewer lo pasa a `"completed"`. Reglas completas:
`sdd/dual-harness/rules/sdd-gates.md` y `sdd/agents/sdd-reviewer.agent.md`.

---

## 🔧 FIX GATE — Bypass controlado del SPEC GATE

Cuando el problema **no puede esperar un ciclo SDD completo**, usar uno de estos prefijos en el mensaje al orquestador:

| Prefijo         | Cuándo usarlo                                               |
| --------------- | ----------------------------------------------------------- |
| `[HOTFIX]`      | Producción bloqueada, regresión crítica, dato corrupto      |
| `[BUGFIX]`      | Error confirmado en desarrollo o testing                    |
| `[FIX]`         | Alias genérico — el orquestador pedirá clasificar           |
| `[IMPROVEMENT]` | Mejora menor (UX, wording, performance puntual) out-of-spec |

**El orquestador ejecutará `sdd/prompts/hotfix-bypass-gate.prompt.md`** que reemplaza el SPEC GATE con un proceso ligero:

1. Recolecta justificación y datos del fix
2. Registra el fix en `sdd/fixes.json` con ID correlativo (FIX-001, FIX-002…)
3. Crea o actualiza `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md` (o `sdd/fixes/` si es repo-level)
4. Autoriza al implementador a proceder

> ⚠️ El FIX GATE **no elimina la trazabilidad** — la simplifica. Todo fix queda registrado y el sdd-reviewer lo evalúa al cerrar el ciclo.

> Con `profile: solo` (rule `sdd-gates.md` § FIX GATE) no hay cuestionario: el actor completa
> `fixes.json` desde el pedido, el documento del fix usa el template mínimo y la elegibilidad
> se reduce a "no crea contratos ni entidades nuevas". Registro, `usage` y validación siguen.

- Registry de fixes: `sdd/fixes.json`
- Prompt FIX GATE: `sdd/prompts/hotfix-bypass-gate.prompt.md`

---

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

---

## Instrucciones previas del proyecto (absorbidas al instalar SDD)

Las reglas propias de este repo (orquestación de modelos, skills, índice de contexto, flujo de
release y convenciones de la librería, el MCP y la documentación) viven en
[`docs/agents/project-rules.md`](../../docs/agents/project-rules.md). Leerlo completo antes de
tocar código: complementa este archivo y, ante un conflicto, gana el SDD de arriba.
