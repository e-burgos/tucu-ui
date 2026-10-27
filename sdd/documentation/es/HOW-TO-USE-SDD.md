# Guía de uso del sistema SDD

> **Spec-Driven Development (SDD)** — paso a paso para desarrolladores.  
> Leer este documento antes de cualquier tarea nueva en el repositorio.

---

## Tabla de contenidos

1. [Concepto en 30 segundos](#1-concepto-en-30-segundos)
2. [Setup inicial (una sola vez)](#2-setup-inicial-una-sola-vez)
3. [Flujo normal — Funcionalidad nueva](#3-flujo-normal--funcionalidad-nueva)
   - [Flujo lite — un solo actor (perfil `solo`)](#flujo-lite--un-solo-actor-perfil-solo)
4. [Contexto de subproyectos — actualizaciones aditivas](#4-contexto-de-subproyectos--actualizaciones-aditivas)
5. [Flujo rápido — Fix / Mejora](#5-flujo-rápido--fix--mejora)
6. [Referencia de archivos SDD](#6-referencia-de-archivos-sdd)
7. [Convenciones de naming](#7-convenciones-de-naming)
8. [Reglas absolutas (nunca violar)](#8-reglas-absolutas-nunca-violar)
9. [Cheat sheet de prompts](#9-cheat-sheet-de-prompts)
10. [Hermes, memoria y costos — el punta a punta](#10-hermes-memoria-y-costos--el-punta-a-punta)

---

## 1. Concepto en 30 segundos

```
IDEA → prompt del dev → SPEC (Orquestador) → CICLO (5 agentes) → IMPLEMENTACIÓN → REVIEW → CIERRE
```

- **El dev describe qué quiere** — no escribe documentos SDD, escribe prompts en lenguaje natural y adjunta referencias.
- **Los agentes generan todos los artefactos** — spec, functional.md, planner.md, architect.md, cycle.json, etc.
- **El dev revisa y aprueba** lo que cada agente produce antes de pasar al siguiente.
- **Ninguna línea de código** se escribe sin que los 6 documentos del ciclo existan y estén aprobados
  (`brief.yaml`, `functional.md`, `planner.md`, `architect.md`, `tasks.json`, `cycle.json`).
- El **Reviewer** cierra el ciclo y escribe un **fragmento aditivo** de contexto para que el
  próximo agente tenga el estado (ver sección 4 — evita merge conflicts entre devs).
- **Todo registro `sdd/**/*.json` valida contra `sdd/schemas/`** — `pnpm sdd:validate` corre en local, en el Reviewer y en CI.

---

## 2. Setup inicial (una sola vez)

### 2.a Repo ya inicializado — clone normal

```bash
pnpm install        # pnpm es el ÚNICO package manager: nunca npm install ni yarn
pnpm setup:agents
pnpm sdd:validate   # debe quedar en verde
```

> ⛔ `npm install` o `yarn` en este repo generan un lockfile rival. Nx infiere el package manager
> del lockfile, así que eso cambia en silencio cómo se resuelven las tasks. `.npmrc` tiene
> `package-manager-strict=true` y `.gitignore` bloquea `package-lock.json`/`yarn.lock`, pero la
> regla es no correrlos.

### 2.b Repo nuevo, o `sdd/` portado a otro repo

Si falta `nx.json`, `pnpm-workspace.yaml`, `.npmrc` o `.nxignore` — o si aparece un lockfile de
npm/yarn — el workspace no está montado. Pedirle a un agente que use la skill
**`init-nx-workspace`**: monta Nx 23 + pnpm, los globs `apps/* libs/* tools/*`, el `.nxignore`, el
CI con pnpm y el arnés dual, y termina en un checklist verificable comando por comando.

El arnés dual (`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`) instruye a los agentes a chequear esto **al
iniciar cualquier sesión**, así que normalmente lo detectan solos antes de la primera acción.

> Crear apps o libs **no** es parte de esta skill: eso es `scaffold-nx`, y siempre dentro de un
> ciclo SDD.

### 2.c Qué genera `setup:agents`

Este script genera (o regenera) todos los symlinks necesarios:

| Symlink creado                    | Apunta a                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `.claude/agents`                  | `sdd/agents/`                                                                         |
| `.claude/skills`                  | `sdd/skills/`                                                                         |
| `.claude/prompts`                 | `sdd/prompts/`                                                                        |
| `.claude/commands`                | `sdd/prompts/` (slash commands de Claude Code)                                        |
| `.github/agents`                  | `sdd/agents/`                                                                         |
| `.github/skills/<skill>`          | `sdd/skills/<skill>/` (uno por uno)                                                   |
| `.github/prompts/<prompt>`        | `sdd/prompts/<prompt>` (uno por uno)                                                  |
| `.agents/rules/<rule>`            | `sdd/dual-harness/rules/<rule>` (uno por uno, Antigravity)                            |
| `.agents/skills/<skill>`          | `sdd/skills/<skill>/` (uno por uno, Antigravity + Gemini CLI)                         |
| `.agent/workflows/<prompt>.md`    | `sdd/prompts/<prompt>.prompt.md` (uno por uno, workflows `/<prompt>` de Antigravity)  |
| `.gemini/commands/<prompt>.toml`  | wrapper generado desde `sdd/prompts/<prompt>.prompt.md` (comandos `/<prompt>` de Gemini CLI) |
| `.gemini/settings.json`           | fusionado — agrega `GEMINI.md`/`AGENTS.md` a `context.fileName`                       |
| `AGENTS.md` (raíz)                | `sdd/dual-harness/AGENTS.md`                                                          |
| `CLAUDE.md` (raíz)                | `sdd/dual-harness/CLAUDE.md`                                                          |
| `GEMINI.md` (raíz)                | `sdd/dual-harness/GEMINI.md`                                                          |

> Es seguro re-ejecutar `pnpm setup:agents` en cualquier momento — regenera todo sin romper nada.
> **En Windows es obligatorio** tras cada clone: git deja los symlinks como archivos de texto y el
> script los reemplaza por junctions/hardlinks (el espejo en PowerShell también cubre las
> superficies de Gemini/Antigravity).
> `.github/copilot-instructions.md` es un archivo real (no symlink) para los lectores server-side de GitHub.
> `.gemini/commands/*.toml` se generan en cada corrida (TOML no tiene mecanismo de include), y
> `.gemini/settings.json` se fusiona en vez de sobreescribirse — ambos dejan intactos los archivos del usuario.

### Visor SDD (opcional, recomendado)

Para navegar todo el estado SDD en el browser en vez de leer JSONs a mano:

```bash
pnpm sdd:docs        # → http://127.0.0.1:4310/sdd/docs/
```

Es una app en JS vanilla de 5 archivos: **cero dependencias, cero build, cero instalación**. Lee
los registros de `sdd/` en vivo, así que lo que ves es el estado real del repo, no un snapshot.
Tiene 15 vistas (dashboard, specs, ciclos, tareas, fixes, contexto, agentes, skills, prompts,
schema, API, componentes, schemas JSON, planificación y ayuda).

### Grafo de conocimiento (opcional)

`graphify` indexa el repo como grafo y permite consultas acotadas (`graphify query "..."`) en vez
de `grep` a ciegas — útil para entender arquitectura o hacer impact analysis antes de un refactor.
Es **opt-in por dev** y nada del flujo SDD depende de él. Para habilitarlo, pedile a un agente que
use la skill `setup-graphify`: te guía la instalación con un backend **gratuito** (Gemini free
tier u Ollama local).

### rtk — salida de comandos comprimida (activo por defecto)

`rtk` comprime la salida de los comandos de shell (`git`, `pnpm`, `vitest`, `tsc`, `eslint`…)
antes de que el agente la lea: 60–90% menos texto, sin tocar la lectura de archivos. Viene
**activo desde la instalación**, con un hook versionado en `.claude/settings.json` y
`.gemini/settings.json` — el equipo lo recibe con un `git pull`. El interruptor está en
`sdd/tools.json` y se opera con `pnpm sdd:rtk -- --status|--disable|--enable`. Si el binario no
está, el comando corre igual, sin comprimir. El ahorro se ve con `rtk gain --project` o en
`pnpm sdd:docs` → Costos → pestaña **RTK** (números por máquina y estimados).

### sdd-mod — el SDD dentro de Claude Code (opcional, apagado por defecto)

Solo para quien usa Claude Code. `sdd/skills/sdd-mod/` es un mod que Claude Code carga solo
desde `.claude/skills/` (cuando la carpeta del proyecto es de confianza). Prendido, muestra una
franja sobre el prompt con el ciclo en curso (spec · ciclo · flow · tareas hechas), suma `/sdd`
con el detalle de tareas y fixes abiertos, y aplica el SPEC GATE a las ediciones de código: sin
un ciclo `in-progress` ni un fix abierto, `Edit`/`Write` sobre código se rechazan (o solo
avisan, con `--gate=warn`). `sdd/`, las carpetas de los arneses y el markdown de la raíz quedan
libres.

```bash
pnpm sdd:mod -- --status       # prendido/apagado, modo del gate, link en .claude/skills
pnpm sdd:mod -- --enable       # prenderlo (se relee en cada turno, sin reiniciar)
pnpm sdd:mod -- --gate=warn    # avisar en vez de bloquear (block es el default)
pnpm sdd:mod -- --disable      # apagarlo
```

Copilot, Gemini y el resto de los agentes no lo ven y no cambian: siguen las mismas reglas desde
`AGENTS.md`/`GEMINI.md`/`copilot-instructions.md`, y `pnpm sdd:validate` sigue siendo la red de
seguridad común en CI. El gate del mod no cubre comandos de shell.

---

## 3. Flujo normal — Funcionalidad nueva

### Paso 0 — Chequear el estado del proyecto

Antes de empezar, correr el **SPEC GATE A** sobre la spec: contesta el estado en una sola
salida, sin leer registros a mano.

```bash
pnpm sdd:gate <spec-id|slug>    # una línea por condición (✔/✘) + APPROVED / BLOCKED
cat sdd/global.json             # si querés el estado crudo
```

`BLOCKED` → completar lo que el script señala antes de seguir. `APPROVED` → imprime además el
próximo `cycle-XX`, el flow sugerido y el perfil activo. **Pegar la salida** como reporte del gate
en el mensaje al Orquestador.

Condiciones para poder empezar (las que chequea el gate):

- **Tu spec no tiene otro ciclo abierto** — la regla es _un ciclo activo por spec_.
  Varios devs pueden tener sus módulos en `in_progress_modules` en paralelo (modelo multi-developer).
- Si tu funcionalidad depende de otra spec (`depends_on` en `sdd/specs/index.json`),
  esa spec debe estar `completed`.

---

### Paso 1 — Describir la funcionalidad al Orquestador

**El dev no crea archivos SDD.** En cambio, escribe un prompt en lenguaje natural describiendo qué quiere construir y adjunta las referencias relevantes (documentos de negocio, wireframes, endpoints existentes, contratos de API externos, etc.).

**Mensaje de ejemplo al agente `sdd-orchestrator`:**

```
Quiero implementar el módulo de Market Data Feed para la app <nombre-de-la-app>.

Objetivo: consumir precios en tiempo real desde el proveedor Plug y exponerlos
vía WebSocket a los clientes del frontend.

Referencias adjuntas:
- docs/artifacts/plug/api-spec.pdf  (contrato del proveedor)
- sdd/api.json                      (endpoints ya implementados)
- sdd/context/apps/<nombre-de-la-app>/constitution.md
```

**El Orquestador genera automáticamente** (después de correr `pnpm sdd:gate <spec-id>` y pegar
su salida en `APPROVED`; si la spec todavía no existe, primero la crea y la registra):

1. El archivo de spec `.spec.md` con objetivo, contexto, alcance y criterios de aceptación.
2. La entrada correspondiente en `sdd/specs/index.json`.
3. El registro del módulo en `pending_modules` dentro de `sdd/global.json`.
4. `cycle-01/brief.yaml` con el contexto mínimo para cada agente.
5. `cycle-01/cycle.json` con `status: "in-progress"` (valida contra `sdd/schemas/cycle.schema.json`).
6. Corre `pnpm sdd:validate` — el ciclo no queda registrado si algún registro está fuera de schema.

**El dev revisa y aprueba** los documentos generados antes de continuar.
Si algo no refleja lo que querés, corregís el prompt y volvés a pedirlo.

> ⛔ **El Orquestador NO implementa código.** Solo genera el brief y los artefactos de spec.

---

### Paso 2 — Agente Funcional

El agente `sdd-functional` lee el brief generado por el Orquestador y produce las historias de usuario.

**Prompt al agente:**

```
Generar functional.md para el Ciclo 01 — spec-<gh-user>-<NNN>-<slug>.
```

El agente lee `brief.yaml` y genera `cycle-01/functional.md` con historias **Como / Quiero / Para**,
criterios de aceptación `CA-[NNN]` verificables (PASS/FAIL) y casos de error.

**El dev revisa** que las historias cubran el objetivo de la spec. Si falta cobertura, se lo indica al agente para que ajuste.

---

### Paso 3 — Agentes Planner y Arquitecto (paralelo)

Ambos pueden correr **en paralelo** (dos conversaciones simultáneas) porque son independientes entre sí.

**Prompt al agente `sdd-planner`:**

```
Generar planner.md para el Ciclo 01 — spec-<gh-user>-<NNN>-<slug>.
```

El Planner lee `functional.md` y `brief.yaml`, y genera **dos archivos**:

- `cycle-01/planner.md` — sprint plan legible con tasks `TASK-001`, `TASK-002`… (scope: el ciclo),
  cada una con estimación de horas, story points y dependencias.
- `cycle-01/tasks.json` — las mismas tasks en formato canónico (schema `cycle-tasks.schema.json`),
  y regenera el índice con `pnpm sdd:rebuild-tasks-index`.

**Prompt al agente `sdd-architect`:**

```
Generar architect.md para el Ciclo 01 — spec-<gh-user>-<NNN>-<slug>.
```

El Arquitecto lee `functional.md`, `brief.yaml`, `sdd/schema.json` y `sdd/api.json`, y genera:

- `cycle-01/architect.md` con decisiones técnicas, schema de DB y contratos de endpoints.
- Actualiza `sdd/schema.json` y `sdd/api.json` con los nuevos artefactos.

**El dev revisa ambos documentos.** Si hay inconsistencias entre planner y architect (ej. una task menciona un endpoint que el arquitecto no definió), se le indica a cada agente que lo corrija.

> Documentos de apoyo (diagramas, ejemplos de endpoints, exploración de código) que el Arquitecto genere:
> → guardar **siempre** en `cycle-01/artifacts/` y referenciar en `cycle.json["artifacts"]` con la
> ruta relativa al ciclo (`artifacts/api-samples/`); se aceptan directorios, y también la ruta desde
> la raíz del repo.

---

### Paso 4 — Implementación

Con los documentos del ciclo listos y aprobados, **antes de la primera línea de código** se corre
el **SPEC GATE B**:

```bash
pnpm sdd:gate <spec-id|slug> cycle-01   # lee el flow del ciclo y exige los documentos de ESE flow
```

`BLOCKED` → cero código hasta completar lo que falta. Con `APPROVED` (pegar la salida) se
invocan los implementadores **task por task**. Una task por conversación, sin agrupar. El stack lo
define la `constitution.md` del subproyecto.

**Prompt al agente `sdd-implementor-back` (una task a la vez):**

```
Implementar TASK-001 del Ciclo 01 — spec-<gh-user>-<NNN>-<slug>.
```

El agente lee la task en `cycle-01/tasks.json`, el contrato en `architect.md` y la `constitution.md`
del subproyecto; escribe el código y los tests. Al cerrar cada task: marca `"done"` + `files[]` en
`tasks.json` y corre `pnpm sdd:rebuild-tasks-index && pnpm sdd:validate`.

**Prompt al agente `sdd-implementor-front` (solo si hay tasks FE, después del backend):**

```
Implementar TASK-00X del Ciclo 01 — spec-<gh-user>-<NNN>-<slug>.
```

El agente frontend verifica primero que los endpoints consumidos estén `"implemented"` en `sdd/api.json`.

**El dev revisa** el código generado tarea a tarea. Si algo no cumple la spec, se le indica al agente qué corregir antes de pasar a la siguiente task.

---

### Paso 5 — Review y cierre

Con todas las tasks implementadas, invocar el agente `sdd-reviewer`:

```
Revisar el Ciclo 01 — spec-<gh-user>-<NNN>-<slug> — Módulo <nombre>.
```

El Reviewer realiza **en orden obligatorio**:

0. ⛔ **VALIDATION GATE (pre-review)** — corre `pnpm sdd:validate`; si falla, devuelve al implementador.
1. Valida que el código cumple los criterios de aceptación (`ca_results` con un PASS/FAIL por `CA-[NNN]`).
2. Actualiza `cycle.json` → `status: "completed"` + `completed_at` + `metrics` + `reviewer_report`.
3. Mueve el módulo a `completed_modules` en `global.json` (con `apps[]`, `cycles_completed`, `completed_at`).
4. Si era el último ciclo de la spec → `status: "completed"` + `completed_at` en `sdd/specs/index.json`.
5. Marca las tasks del ciclo como `done` en `cycles/cycle-[XX]/tasks.json` y regenera el índice (`pnpm sdd:rebuild-tasks-index`).
6. Verifica que `sdd/schema.json`, `sdd/api.json` y `sdd/components.json` estén actualizados.
7. Revisa los fixes `implemented` del ciclo en `sdd/fixes.json` → los marca `validated` o `absorbed`.
8. ⛔ **CONTEXTO GATE (aditivo)** — escribe el fragmento del ciclo y toca **solo su fila** en las
   tablas globales:
   - `sdd/context/[apps|libs|tools]/<nombre>/updates/YYYY-MM-DD-<spec-id>-cycle-XX.md` ← **el delta**
   - `sdd/context/constitution.md` → solo la fila del subproyecto en la tabla-snapshot
   - `sdd/context/context_prompt.md` → fila nueva solo si se creó app/lib/tool

   > ⛔ **No** edita `constitution.md` ni `context_prompt.md` del subproyecto, ni su línea
   > `> Última actualización:`. Ver sección 4.

9. ⛔ **VALIDATION GATE (post-cierre)** — `pnpm sdd:validate` en verde, registrado en `reviewer_report.tests["sdd:validate"]`.

> El ciclo **no puede cerrarse** con el CONTEXTO GATE pendiente ni con la validación en rojo —
> el mismo check corre en CI (`.github/workflows/sdd-validate.yml`) y rompe el PR.

---

### Flujo lite — un solo actor (perfil `solo`)

**Cuándo:** trabajás solo (o el ciclo es chico) y los cinco agentes con sus cinco documentos son
más ceremonia que valor. Un solo actor se pone los tres sombreros: abre el ciclo, implementa y
cierra como reviewer. No hay fan-out de subagentes, así que el contexto se lee **una vez**.

**Cómo activarlo** (cualquiera de las tres):

```
# 1. Pedírselo al steward (es el único que toca el perfil):
/sdd-steward pasame a perfil solo

# 2. Al generar el repo o al reconfigurarlo:
npx @e-burgos/sdd-harness init --profile solo
npx @e-burgos/sdd-harness configure sdd --profile solo

# 3. Para un pedido puntual, sin tocar el perfil: prefijo en el mensaje
[LITE] Implementá el filtro de fechas del listado de órdenes.
[FULL] Implementá el módulo de pagos.   # fuerza el flujo completo aunque el perfil sea solo
```

El perfil vive en `sdd/global.json → profile` (`team` por defecto → ciclos `full`; `solo` →
ciclos `lite`). El prefijo del pedido **gana** sobre el perfil. Los ciclos ya abiertos conservan
el `flow` que tienen escrito en su `cycle.json`.

**Cómo es el ciclo:**

1. `pnpm sdd:gate <spec-id>` → `APPROVED` (mismo GATE A que en `full`; pegar la salida).
2. Abrir `cycle.json` con `status: "in-progress"`, `flow: "lite"` y `metrics` con
   `usage.by_agent: []`; mover el módulo a `in_progress_modules`.
3. Escribir **`plan.md`**, que reemplaza a `brief.yaml` + `functional.md` + `planner.md` +
   `architect.md`. Cuatro secciones fijas (template: `sdd/skills/sdd-file-structure/SKILL.md` §3.8):
   objetivo · historias · tasks en prosa · **decisiones técnicas**, esta última obligatoria si el
   ciclo toca `schema.json`, `api.json` o `components.json` (y esos registros se actualizan igual
   que en `full`).
4. Crear `tasks.json` con `flow: "lite"` (`user_stories` puede ir `[]`) y correr
   `pnpm sdd:rebuild-tasks-index`.
5. `pnpm sdd:gate <spec-id> cycle-XX` → `APPROVED` (GATE B) y recién ahí implementar, una task a
   la vez, cada una a `done` con su `usage`.
6. Cerrar como reviewer: `pnpm sdd:validate` en verde, `cycle.json` en `completed` con
   `reviewer_report`, CONTEXTO GATE (fragmento aditivo) y MEMORIA GATE si hubo lección.

**Qué se conserva** (nada de esto se recorta en `lite`):

- Los cuatro invariantes: spec registrada, módulo en `global.json`, `cycle.json` in-progress antes
  del código, `tasks.json` con tasks y ninguna task `done` sin `usage`.
- Los gates de cierre: CONTEXTO GATE, MEMORIA GATE y `pnpm sdd:validate` en verde.
- La telemetría: `usage` en cada task, más **una sola** entrada en
  `cycle.json → metrics.usage.by_agent[]` con `agent: "orchestrator"`, `label: "solo"`, que cubre
  el plan y la revisión.

**Excepciones — el ciclo se abre `full` aunque el perfil sea `solo`:**

- La spec declara contratos que otro subproyecto consume (tablas o endpoints nuevos).
- La spec tiene dependientes (otras specs la declaran en `depends_on`).

> ⚠️ Si un ciclo `lite` terminó creando tablas o endpoints igual, `pnpm sdd:validate` deja un
> **warning**: el próximo ciclo de esa spec se abre `full`.

Con `profile: solo` el FIX GATE también se acorta (ver sección 5).

---

## 4. Contexto de subproyectos — actualizaciones aditivas

**El problema que resuelve:** cuando varios devs trabajan specs distintas sobre el mismo
subproyecto (ej. `example-api`), todos editaban los mismos `constitution.md` y
`context_prompt.md` al cerrar su ciclo. Merge conflicts garantizados, agravados por la línea
`> Última actualización:` que todos tocaban.

**La solución:** durante un ciclo o fix **nunca** se editan los archivos base del subproyecto. Se
escribe un fragmento append-only cuyo nombre incluye el spec-id — que lleva el gh-user del dev —
así que **es único por construcción** y el conflicto no puede ocurrir.

```
sdd/context/[apps|libs|tools]/<nombre>/updates/
  ├── 2026-07-13-spec-asmith-001-cycle-01.md
  ├── 2026-08-03-fix-jdoe-002-001.md        ← fixes: YYYY-MM-DD-fix-<gh-user>-<seq>.md
  └── 2026-08-04-spec-jdoe-003-cycle-01.md
```

### Template del fragmento (solo el delta, nunca copiar del base)

```markdown
# <spec-id> cycle-<XX> — <YYYY-MM-DD>

## Estado → qué quedó implementado / en qué estado queda el subproyecto

## Estructura → paquetes/módulos/patrones nuevos o cambiados

## Dependencias → librerías o servicios nuevos que consume/expone

## Qué sigue → pendientes que el próximo ciclo debe saber
```

Secciones vacías se omiten. Si el ciclo resolvió algo que el base declara "pendiente", anotarlo
como `resuelve: <sección>` para que la consolidación lo elimine.

### Las 3 operaciones

| Operación                                                                          | Quién                                                                                                     | Cuándo      |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| **Escribir** el fragmento                                                          | reviewer al cerrar ciclo · dev al cerrar fix                                                              | cada cierre |
| **Leer** contexto = base + `updates/*.md` en orden de nombre                       | cualquier agente                                                                                          | siempre     |
| **Consolidar**: fundir fragmentos en los base, actualizar el encabezado, borrarlos | **un solo actor**: orquestador al iniciar ciclo nuevo sobre ese subproyecto, o reviewer con ≥5 fragmentos | periódica   |

> La consolidación va en commit dedicado (`chore(sdd): consolidate context updates for <nombre>`)
> y **nunca** en paralelo con un ciclo abierto sobre el mismo subproyecto.
> La línea `> Última actualización:` solo cambia ahí.

**Si necesitás leer el contexto de un subproyecto:** base + fragmentos. Los fragmentos están
ordenados cronológicamente por el prefijo de fecha, así que leerlos en orden de nombre da la
evolución real.

```bash
# Cuántos fragmentos hay sin consolidar (≥5 dispara consolidación)
ls sdd/context/*/*/updates/*.md 2>/dev/null | wc -l
```

---

## 5. Flujo rápido — Fix / Mejora

Cuando el cambio **no justifica un ciclo SDD completo**, usar el FIX GATE.

### Cuándo usar cada prefijo

| Prefijo         | Cuándo                                    | Severidad           |
| --------------- | ----------------------------------------- | ------------------- |
| `[HOTFIX]`      | Producción bloqueada, regresión crítica   | `critical` / `high` |
| `[BUGFIX]`      | Error en desarrollo o testing             | `medium` / `low`    |
| `[FIX]`         | Alias genérico (el orquestador clasifica) | cualquiera          |
| `[IMPROVEMENT]` | Mejora menor de UX/wording/performance    | `low`               |

> ⚠️ Si el fix afecta más de 5 archivos o cambia el contrato de API → **ciclo SDD completo**.

### Paso a paso del FIX GATE

**1. Enviar el mensaje con prefijo al Orquestador:**

```
[BUGFIX] El endpoint /enrollment devuelve 500 cuando el CUIT tiene formato X.
```

**2. El Orquestador bloquea la implementación** y pide estos datos:

```
1. Tipo: [HOTFIX] / [BUGFIX] / [IMPROVEMENT]
2. Título (máx 80 chars)
3. Descripción del problema
4. Justificación de urgencia
5. Archivos afectados
6. ¿Existe test que valide el fix?
```

**3. El Orquestador registra el fix:**

- Agrega entrada a `sdd/fixes.json` con ID correlativo del autor (`FIX-<gh-user>-001`, `FIX-<gh-user>-002`…
  o `FIX-<gh-user>-<spec-NNN>-<seq>` si es de una spec). Valida contra `sdd/schemas/fixes.schema.json`.
- Crea `sdd/fixes/fix-<gh-user>-<seq>.md` (fix repo-level)  
  o `sdd/specs/<spec-id>/fixes/fix-<gh-user>-<spec-NNN>-<seq>.md` (fix de spec).

**4. Solo después del registro → implementar.**

**5. Al terminar:** actualizar en `sdd/fixes.json` → `affected_files`, `resolved_at`, `status: "implemented"`
y `test_reference`. El Reviewer lo marcará `validated` o `absorbed` al cerrar el ciclo.
Correr `pnpm sdd:validate` antes de commitear.

### Con `profile: solo` — FIX GATE corto

- **Sin cuestionario:** el actor completa `sdd/fixes.json` desde el pedido mismo y pregunta solo
  lo que no puede deducir (el paso 2 desaparece).
- **Documento mínimo:** problema · solución · archivos.
- **Elegibilidad reducida** a "no crea contratos ni entidades nuevas".
- **Igual que siempre:** el registro en `fixes.json`, el `usage` del fix, el fragmento de contexto
  y `pnpm sdd:validate` en verde.

---

## 6. Referencia de archivos SDD

### Archivos de estado (actualizar siempre al cerrar un ciclo)

| Archivo                      | Contenido                                      | Quién actualiza                                                          |
| ---------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| `sdd/global.json`            | Estado del proyecto, módulos en curso          | Orquestador (inicio) + Reviewer (cierre)                                 |
| `cycles/cycle-XX/tasks.json` | Tasks canónicas del ciclo                      | Planner (crea) + Implementadores + Reviewer                              |
| `sdd/tasks.json`             | Índice de tasks (generado)                     | `pnpm sdd:rebuild-tasks-index`                                           |
| `sdd/catalog.json`           | Manifest de contenido para el visor (generado) | `pnpm sdd:rebuild-catalog` — `sdd:validate` falla si está desactualizado |
| `sdd/schema.json`            | Esquema de base de datos                       | Arquitecto (define) + Implementador back (migra) + Reviewer              |
| `sdd/api.json`               | Contratos de endpoints                         | Arquitecto (define) + Implementador back (implementa) + Reviewer         |
| `sdd/components.json`        | Componentes frontend creados                   | Implementador front + Reviewer                                           |
| `sdd/fixes.json`             | Registry de fixes fuera del flujo              | Orquestador (FIX GATE) + dev (cierre) + Reviewer (valida)                |
| `sdd/specs/index.json`       | Registro de specs (append-only)                | Quien crea la spec + Reviewer (cierre)                                   |
| `sdd/schemas/*.schema.json`  | JSON Schemas estrictos (fuente de máquina)     | Manual — cambio de schema = decisión de equipo                           |
| `sdd/scripts/spec-gate.mjs`  | SPEC GATE A y B como comando (solo lee)        | `pnpm sdd:gate <spec-id> [cycle-XX]`                                     |

### Archivos de contexto (leer antes de cualquier tarea)

| Archivo                                    | Para qué                                                |
| ------------------------------------------ | ------------------------------------------------------- |
| `sdd/context/context_prompt.md`            | Entry point global — leer primero                       |
| `sdd/context/constitution.md`              | Arquitectura global + tabla-resumen de subproyectos     |
| `sdd/context/apps/<app>/context_prompt.md` | Estado de la app — BASE (solo lo toca la consolidación) |
| `sdd/context/apps/<app>/constitution.md`   | Stack, paquetes, patrones — BASE                        |
| `sdd/context/apps/<app>/updates/*.md`      | Fragmentos por ciclo/fix — **leer junto con el base**   |
| `sdd/context/tools/<tool>/`                | Igual, para herramientas que no son app ni lib          |

### Documentos de ciclo (whitelist: solo estos 7 + `artifacts/`)

Cuáles aplican lo decide el `flow` del ciclo: `full` usa los cuatro documentos; `reduced`, solo
`brief.yaml`; `lite`, solo `plan.md`.

```
sdd/specs/<spec-id>/cycles/cycle-<XX>/
  ├── brief.yaml       ← Orquestador                  (full · reduced)
  ├── functional.md    ← Agente Funcional             (full)
  ├── planner.md       ← Agente Planner               (full)
  ├── architect.md     ← Agente Arquitecto            (full)
  ├── plan.md          ← El actor único del ciclo     (lite — reemplaza a los cuatro de arriba)
  ├── tasks.json       ← Planner (crea) + Implementadores (status) — tasks CANÓNICAS del ciclo
  ├── cycle.json       ← Orquestador (inicio) + Reviewer (cierre)
  └── artifacts/       ← Docs de apoyo (referenciados en cycle.json)
```

---

## 7. Convenciones de naming

### ID de spec

```
spec-<gh-user>-<NNN>-<slug>
```

- `<gh-user>`: handle de GitHub del autor (ej. `jdoe`)
- `<NNN>`: contador **personal** del dev, comenzando en `001` (no global)
- `<slug>`: kebab-case descriptivo del módulo

Ejemplos:

```
spec-jdoe-001-enrollment-request
spec-asmith-001-market-data-feed
```

### Ciclos

```
cycle-01, cycle-02, ...
```

Se resetean por spec (no son globales al repo).

### Tasks

```
TASK-001, TASK-002, ...
```

El scope es el `tasks.json` del ciclo — sin prefijo de spec, ciclo ni capa (BE/FE).
Los mismos IDs se usan en `planner.md` y en `cycles/cycle-XX/tasks.json`.

### Fixes

```
fix-<gh-user>-<seq>.md              ← repo-level (sdd/fixes/)
fix-<gh-user>-<spec-NNN>-<seq>.md   ← de una spec (sdd/specs/<id>/fixes/)
```

---

## 8. Reglas absolutas (nunca violar)

### ⛔ SPEC GATE — antes de implementar

No se contesta a mano: lo contesta un script, en dos momentos (fuente canónica:
`sdd/dual-harness/rules/sdd-gates.md`).

```bash
pnpm sdd:gate <spec-id|slug>            # GATE A — ¿se puede abrir un ciclo?
pnpm sdd:gate <spec-id|slug> cycle-XX   # GATE B — ¿se puede escribir código en ese ciclo?
pnpm sdd:gate <spec-id|slug> --json     # misma respuesta, estructurada para agentes
```

- **GATE A:** A1 spec registrada y su `.spec.md` existe · A2 módulo en `pending_modules` o
  `in_progress_modules` · A3 ningún otro ciclo de la spec `in-progress` · A4 `depends_on`
  completadas · A5 la spec no está `completed` ni `cancelled`.
- **GATE B:** B1 `cycle.json` con `status: "in-progress"` · B2 módulo en `in_progress_modules` ·
  B3 `tasks.json` con al menos una task · B4 los documentos del `flow` (full →
  brief/functional/planner/architect · reduced → brief · lite → `plan.md`) · B5 `constitution.md`
  de cada subproyecto de `cycle.json → apps[]`.

**`BLOCKED` → DETENER. Completar lo que el script señala antes de continuar** (exit `0` pasa,
`1` bloqueado, `2` error de uso). Los cuatro invariantes valen en todo flow y todo perfil: spec
registrada, módulo en `global.json`, `cycle.json` in-progress antes del código, `tasks.json` con
tasks y ninguna task `done` sin su `usage`.

### ⛔ CONTEXTO GATE — antes de cerrar un ciclo (ADITIVO)

```
1. ¿Existe el fragmento del ciclo en context/[apps|libs|tools]/<nombre>/updates/?  → SI / NO
2. ¿La fila propia de la tabla-snapshot en context/constitution.md está al día?     → SI / NO
3. ¿Hace falta fila nueva en context/context_prompt.md (app/lib/tool nueva)?        → SI / NO / N/A
4. ¿Los archivos BASE del subproyecto quedaron intactos?                            → SI / NO
```

**El cycle.json NO puede tener status "completed" sin el fragmento escrito.**
Y si el punto 4 es NO, hay un error: los base solo los toca la consolidación (ver sección 4).

### Otras reglas

- **Un ciclo activo por spec.** Distintos devs avanzan sus specs en paralelo, pero una misma
  spec nunca tiene dos ciclos abiertos.
- **Solo 7 archivos en la raíz del ciclo** (`brief.yaml`, `functional.md`, `planner.md`, `architect.md`, `plan.md` —este último solo en flow `lite`—, `cycle.json`, `tasks.json`). Cualquier otro → `artifacts/`.
- **Tipado estricto:** todo registro `sdd/**/*.json` valida contra `sdd/schemas/`. Correr `pnpm sdd:validate` después de cualquier escritura.
- **`sdd/specs/index.json` es append-only** — nunca editar entradas existentes.
- **Los implementadores reciben UNA task por mensaje**, no varias.
- **El Orquestador NO escribe código** — solo prepara el brief.
- **Cero comentarios en el código de implementación.** La documentación vive en los documentos
  SDD, no en comentarios. Nombres declarativos y funciones cortas en su lugar. Sin `// TODO` —
  eso es una task o un fix. Excepciones (1 línea, inglés): restricción que el código no puede
  expresar, o anotación exigida por framework/linter. El reviewer lo chequea al cerrar.
- **Elegir modelo y esfuerzo antes de empezar**: el más barato de los cuatro tiers abstractos
  (económico/estándar/alto/máximo) que cumpla — la regla aplica a los tres proveedores (Claude,
  Copilot, Gemini). Implementores → estándar (`sonnet`/`medium` en Claude); orquestador,
  arquitecto y reviewer → alto (`opus`/`high` en Claude). Nunca un fan-out entero en el tier más
  caro. Tabla canónica: `sdd/dual-harness/{CLAUDE,AGENTS,GEMINI}.md` → ⚙️.
- **graphify es opcional** — si `graphify-out/graph.json` existe, consultalo antes de `grep`/`Read`
  a ciegas; si no, trabajá normal. Para habilitarlo: skill `setup-graphify`.
- **rtk viene activo** y comprime la salida de los comandos: no lo prefijes a mano, usá
  `rtk proxy <cmd>` si necesitás la salida cruda y no lo apagues por tu cuenta
  (`pnpm sdd:rtk -- --disable` es decisión del dev).
- **Invariantes del workspace** (los garantiza la skill `init-nx-workspace`, y romperlos falla en
  silencio): pnpm es el único package manager; los proyectos viven en `apps/`, `libs/` y `tools/`
  —nunca en `packages/`—; si el repo usa el TS solution setup, `customConditions` de
  `tsconfig.base.json` es **idéntico** al `name` del `package.json` raíz (el template del kit usa
  `paths` y no lo declara; `sdd:validate` avisa si divergen); y `.nxignore` contiene
  `sdd/templates` para que los blueprints no entren al project graph.
- **El nombre y la descripción del proyecto viven SOLO en `sdd/global.json`** (`project` /
  `description`). Ningún otro archivo de `sdd/` los hardcodea — eso es lo que mantiene `sdd/`
  portable, y `pnpm sdd:validate` falla si el valor se filtra a los documentos del kit.

---

## 9. Cheat sheet de prompts

```bash
# Correr el SPEC GATE (A sin ciclo, B con ciclo)
pnpm sdd:gate <spec-id|slug>
pnpm sdd:gate <spec-id|slug> cycle-01
pnpm sdd:gate <spec-id|slug> --json      # salida estructurada para agentes

# Ver estado del proyecto (incluye "profile": team | solo)
cat sdd/global.json

# Ver specs registradas
cat sdd/specs/index.json

# Ver tasks del ciclo actual
cat sdd/tasks.json                       # índice: totales por spec/ciclo
cat sdd/specs/<spec-id>/cycles/cycle-01/tasks.json  # detalle de tasks del ciclo
pnpm sdd:validate                        # validar todos los registros
pnpm sdd:rebuild-tasks-index             # regenerar el índice tras tocar tasks
pnpm sdd:rebuild-catalog                 # regenerar el manifest tras agregar/quitar agente, skill, prompt o schema

# Ver endpoints implementados
cat sdd/api.json

# Setup inicial de un clone / regenerar symlinks
pnpm install                             # pnpm únicamente — nunca npm install ni yarn
pnpm setup:agents

# Abrir el visor SDD (lee los registros en vivo, cero build)
pnpm sdd:docs                            # → http://127.0.0.1:4310/sdd/docs/

# Fragmentos de contexto sin consolidar (≥5 dispara consolidación)
ls sdd/context/*/*/updates/*.md 2>/dev/null | wc -l
```

### Prompts de invocación por agente

```
# Orquestador (describe en lenguaje natural + adjunta referencias)
"Quiero implementar <descripción>.
[Adjuntar referencias relevantes]"

# Funcional
"Generar functional.md para el Ciclo 01 — <spec-id>."

# Planner + Arquitecto (paralelo)
"Generar planner.md para el Ciclo 01 — <spec-id>."
"Generar architect.md para el Ciclo 01 — <spec-id>."

# Implementar una task
"Implementar TASK-001 del Ciclo 01 — <spec-id>."

# Revisar y cerrar
"Revisar el Ciclo 01 — <spec-id>."

# Fix urgente
"[BUGFIX] <descripción del problema>"

# Forzar el flow de un pedido puntual (gana sobre el perfil)
"[LITE] <descripción>"    # un solo actor: plan.md + tasks.json
"[FULL] <descripción>"    # ciclo completo con los cinco agentes

# Cambiar el perfil del repo (único que lo toca: el steward)
"/sdd-steward pasame a perfil solo"
```

---

## 10. Hermes, memoria y costos — el punta a punta

### 10.1 De una idea a producto (skill `sdd-hermes`)

El ciclo SDD arranca en una spec — Hermes arranca **antes**: en la idea. Todo el
protocolo vive en `sdd/skills/sdd-hermes/SKILL.md`; la entrada es un comando:

```bash
# Repo vacío — registrar la idea y dejar todo listo para el agente:
npx @e-burgos/sdd-harness idea "una app de turnos para peluquerías con recordatorios" --author gh-user
# → harness.idea.md          (la idea + el protocolo a seguir, con checkpoints humanos)
# → harness.config.json      (stub del stack, lo completa el agente; --author → sdd.author)
# → harness.config.schema.json (para validar el config sin correr la CLI)

# El agente decide el stack (checkpoint humano), y genera el workspace sin un solo prompt:
npx @e-burgos/sdd-harness init --config ./harness.config.json

# Workspace existente — la misma entrada, protocolo de gaps:
harness idea "sumar reportes de ventas"   # → harness.idea.md con análisis vs el stack instalado

# Releer la idea vigente sin volver a generarla:
harness idea --show   # imprime la idea + Evidencia del descubrimiento + Decisiones del dev
```

`harness.idea.md` no es solo la idea: durante la FASE 1 el agente completa
**`## Evidencia del descubrimiento`** (tabla `Fuente | Estado de acceso | Dato medido |
Fecha`) y **`## Decisiones del dev`** (con fecha) — las specs citan esas secciones en
vez de copiar los datos a mano. Si `harness.config.json` trae `sdd.modules`, `init`
siembra una spec `draft` por módulo (más su entrada en `pending_modules`) al generar el
workspace; si trae `npm.scopes[]`, genera el `.npmrc` del repo
(`@org:registry=https://npm.pkg.github.com`) sin la credencial — esa va en el
`~/.npmrc` local del dev y en `NODE_AUTH_TOKEN` en CI, nunca en el `.npmrc` versionado.

`init --config` genera en el cwd cuando el cwd ya contiene el config, cuando
`basename(cwd) == project.name`, o con `--here` explícito; si el cwd ya es un repo git
no corre `git init` — commitea en la rama actual. `harness.idea.md`,
`harness.config.json` y `harness.config.schema.json` quedan dentro del workspace
generado (no se borran). Al final corre el gate: `sdd:validate` +
`nx run-many -t lint test build`, y **falla si algo queda rojo** — `--skip-verify` lo
omite si hace falta saltarlo a propósito.

> Si el entorno tiene `NX_WORKSPACE_ROOT_PATH` apuntando a otro repo, `init`, `add`,
> `update` y los scripts `sdd:*` lo avisan en la primera línea — sin esa variable
> alineada, un `nx run-many -t build` corrido "dentro" del repo nuevo puede terminar
> buildeando OTRO repo, sin ningún error visible.

Dentro del workspace, el agente sigue las fases 4–5 de la skill: una spec por
módulo (`harness add spec`, checkpoint humano) y el loop de ciclos de siempre —
Hermes **no bypassea ningún gate**, solo encadena fases. `harness add spec` crea cada
spec con `status: "draft"` y registra su módulo en `pending_modules` de
`sdd/global.json` (con `--apps`/`--depends-on`); el orquestador la pasa a
`in-progress` (módulo incluido) recién al abrir `cycle-01` — ver Paso 1 más arriba.

**Retomar en cualquier sesión** (el estado vive en los registros, no en la sesión):
pegarle al agente `sdd/prompts/hermes-resume.prompt.md` — diagnostica la posición
(ciclo abierto → continuar; pendientes → orquestador; backlog vacío → reportar) y sigue.

### 10.2 Memoria (regla 🧠 del dual-harness)

Dos capas de archivos versionados, sin dependencias:

- `sdd/memory/lessons.md` — lecciones destiladas, cap 120 líneas. **Se lee completo
  al iniciar toda sesión.**
- `sdd/memory/journal/` — entradas episódicas al cerrar ciclo/fix, **solo si hubo
  lección real** (filtro anti-ruido). Nunca se lee entero.

```markdown
<!-- sdd/memory/journal/2026-08-13-spec-jdoe-001-cycle-01.md -->
# spec-jdoe-001 cycle-01 — 2026-08-13

## Qué pasó → el mock de la API de pagos no simula timeouts; 2 tasks bloqueadas
## Lección → probar contra el sandbox real de pagos desde el primer ciclo
## Costo evitable → ~40 min y dos re-implementaciones
```

Con ≥5 entradas, el orquestador las **destila** en `lessons.md` (una línea por
lección) y borra lo destilado — `pnpm sdd:validate` avisa cuando está pendiente.

Todo eso se lee en `pnpm sdd:docs` → vista **Memoria**: las lecciones destiladas
arriba y el journal episódico abajo en línea de tiempo, más reciente primero, con el
aviso de destilación pendiente y el del cap de 120 líneas cuando corresponde. Es la
única vista que muestra por qué el proyecto hace las cosas como las hace.

### 10.3 Telemetría y dashboard de Costos

Contrato v0.11.0: **todo agente que consuma tokens en un flujo SDD o un fix registra,
al cerrar su unidad de trabajo** (task, documento, ciclo, fix), `provider_model`
(`claude/sonnet`, `gemini/pro`, `copilot/claude-sonnet`), `effort`, `tokens_in`,
`tokens_out`, `source` y `approx`. Modelo/effort se declaran ANTES de ejecutar (regla
⚙️); los tokens se registran AL CERRAR. La tabla completa de fuentes por arnés
(`session-report`, `stats-command`, `agent-usage-notification`, `declared-estimate`) y
el detalle campo por campo viven en `sdd/dual-harness/AGENTS.md` (sección ⚙️ →
Telemetría de uso) — acá solo el resumen:

- **Task** → `tasks.json → tasks[].usage`, la escribe quien la ejecuta al cerrarla.
- **Documento** (functional/planner/architect) → una entrada en
  `cycle.json → metrics.usage.by_agent[]` al terminar.
- **Ciclo** → el reviewer **consolida `by_agent`, no estima el total**: agrega su
  propia entrada y deriva `by_tier` agrupando `by_agent` por `provider_model` — no lo
  llena a mano.
- **Fix** → `sdd/fixes.json → fixes[].usage` (`by_agent[]` si trabajó más de un
  agente); el FIX GATE no cierra un fix sin `usage`.

```jsonc
// cycle.json → metrics.usage (el reviewer consolida, no reconstruye de memoria)
"usage": {
  "tokens_in": 980000, "tokens_out": 151000, "duration_minutes": 65,
  "by_tier": { "claude/sonnet": { "tokens_in": 830000, "tokens_out": 130000 },
               "claude/opus":   { "tokens_in": 150000, "tokens_out": 21000 } },
  "by_agent": [
    { "agent": "implementor-back", "label": "TASK-003", "provider_model": "claude/sonnet",
      "effort": "medium", "tokens_in": 210000, "tokens_out": 34000,
      "approx": false, "source": "agent-usage-notification", "recorded_at": "2026-09-02" },
    { "agent": "reviewer", "provider_model": "claude/opus", "effort": "high",
      "tokens_in": 150000, "tokens_out": 21000,
      "approx": false, "source": "session-report", "recorded_at": "2026-09-02" }
  ]
}
```

**Cuando no hay contador, se estima — no se omite.** `/stats` (Gemini CLI, solo cubre
el main loop) y el reporte de uso de la sesión (Claude Code) son comandos del cliente:
el agente no puede ejecutarlos, se los pide al dev. En subagentes de Gemini CLI y en
**GitHub Copilot y Antigravity no existe contador**: en Claude Code, en cambio, cada
subagente lanzado con la tool `Agent` sí trae una medición exacta y gratuita
(`agent-usage-notification`, la notificación `<subagent_tokens>` que el harness manda
al padre al terminar). Sin contador, el registro va marcado como estimación declarada:

```jsonc
"usage": {
  "tokens_in": 480000, "tokens_out": 62000,
  "approx": true, "source": "declared-estimate",
  "by_tier": { "copilot/claude-sonnet": {
    "tokens_in": 480000, "tokens_out": 62000,
    "approx": true, "source": "declared-estimate" } }
}
```

El visor muestra esas filas como **estimado** en la columna *Origen* de «Consumo por
proveedor»: la estimación se declara, no se esconde ni se hace pasar por medida. Lo
único prohibido es `approx: false` con `source: declared-estimate` — inventar un número
preciso y presentarlo como medido. `pnpm sdd:validate` es **error** si un ciclo
`completed` (`completed_at` ≥ 2026-09-02) o un fix resuelto (`resolved_at` ≥
2026-09-02) no tiene `usage` con proveedor/modelo y tokens; **warning** si falta
`by_agent` o `sum(by_agent) ≠ by_tier`; registros anteriores a esa fecha quedan en
warning.

Con eso, `pnpm sdd:docs` → vista **Costos**: comparativa del costo agéntico
(tokens × tarifa por proveedor/tier) contra la estimación tradicional (`estimation_hours`
de las tasks × tarifa hora), ahorro proyectado, tokens por ciclo, agregación por
proveedor, una tabla de costo de fixes y la tabla exacta. Las tarifas se editan en
`sdd/pricing.json` — los nombres concretos de modelo de Copilot/Gemini ahí son
editables, no una garantía de estabilidad.

El visor además es **reactivo en local**: pollea un fingerprint por área de los
registros cada 4 s — cerrás un ciclo y la vista activa se actualiza sola, sin
recargar y sin perder lo que tenías expandido. En hosting estático queda el
refresh manual.

---

## Diagrama del flujo completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    FUNCIONALIDAD NUEVA                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Dev describe la funcionalidad (prompt + referencias)          │
│         ↓                                                       │
│  sdd-orchestrator → .spec.md + index.json + global.json        │
│                   → brief.yaml + cycle.json (in-progress)      │
│         ↓                                                       │
│  sdd-functional → functional.md (HUs + CAs verificables)       │
│         ↓                                                       │
│  sdd-planner ──┐    planner.md + tasks.json (TASK-NNN)         │
│  (paralelo)    ├──→                                            │
│  sdd-architect─┘    architect.md + schema.json + api.json      │
│         ↓                                                       │
│  sdd-implementor-back  (task por task → done + validate)       │
│  sdd-implementor-front (task por task, si hay FE)              │
│         ↓                                                       │
│  sdd-reviewer → VALIDATION GATE + cycle.json (completed)       │
│               + CONTEXTO GATE + pnpm sdd:validate en verde     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│           FUNCIONALIDAD NUEVA — flow lite (perfil solo)         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Dev pide con [LITE] (o global.json → profile: "solo")         │
│         ↓                                                       │
│  pnpm sdd:gate <spec-id>  → GATE A APPROVED                    │
│         ↓                                                       │
│  UN SOLO ACTOR → cycle.json (in-progress, flow "lite")         │
│                → plan.md (reemplaza brief/functional/          │
│                  planner/architect) + tasks.json                │
│         ↓                                                       │
│  pnpm sdd:gate <spec-id> cycle-XX → GATE B APPROVED            │
│         ↓                                                       │
│  Implementa task por task (done + usage en cada una)            │
│         ↓                                                       │
│  Cierra como reviewer → cycle.json (completed) + una entrada   │
│  by_agent {orchestrator, "solo"} + CONTEXTO/MEMORIA GATE        │
│  + pnpm sdd:validate en verde                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FIX / MEJORA                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Dev envía [HOTFIX|BUGFIX|IMPROVEMENT] <descripción>           │
│         ↓                                                       │
│  sdd-orchestrator BLOQUEA implementación                       │
│         ↓                                                       │
│  Registra en fixes.json + crea fix-*.md                        │
│         ↓                                                       │
│  Implementa el fix → status "implemented" + sdd:validate       │
│         ↓                                                       │
│  El Reviewer lo valida/absorbe al cerrar el ciclo              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
