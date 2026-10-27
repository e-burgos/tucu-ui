---
name: sdd-hermes
description: Loop agéntico punta a punta - de una idea en lenguaje natural a producto funcionando. Descubre requisitos, decide y configura el stack con la CLI harness, siembra specs y conduce ciclos SDD encadenados hasta agotar el backlog, con presupuesto de modelo/esfuerzo por fase y condiciones de corte explícitas. Invocar cuando el usuario trae una idea u objetivo, no una spec.
---

# Skill: sdd-hermes

## Cuándo invocarlo

- El usuario trae **una idea, un objetivo o un problema** ("quiero una app que...",
  "necesito automatizar...") y espera que el sistema lo lleve a producto.
- NO invocarlo si ya existe una spec para el trabajo pedido → ir directo a
  `sdd-orchestrator` (SPEC GATE normal). Hermes no reemplaza el ciclo SDD: lo conduce.

## Principios (inviolables)

1. **SDD es el corazón.** Hermes jamás bypassea SPEC GATE, CONTEXTO GATE ni MEMORIA
   GATE — su único privilegio es encadenar fases sin esperar instrucciones humanas
   entre medio.
2. **Checkpoints humanos.** Dos decisiones son siempre del usuario: el **stack**
   (fin de FASE 2) y cada **spec** antes de implementar (fin de FASE 4). El resto
   corre solo, salvo que el usuario pida modo asistido (checkpoint por fase).
3. **Presupuesto explícito.** Cada fase declara su tier de modelo/esfuerzo ANTES de
   ejecutar (regla ⚙️ del dual-harness — vale para Claude, Gemini/Antigravity y
   Copilot por igual). Hermes es un loop largo: sin esta disciplina el costo explota.
4. **Todo queda registrado en `sdd/`.** Si Hermes se interrumpe en cualquier punto,
   otro agente retoma desde los registros — el loop no tiene estado propio.

## Presupuesto por fase (regla ⚙️ aplicada al loop)

Los tiers son abstractos a propósito: la equivalencia concreta por proveedor
(Claude `model`/`effort`, Gemini modelo/`thinking`, Copilot picker/agents) vive en
**una sola fuente**: la tabla canónica ⚙️ del dual-harness (`AGENTS.md`/`CLAUDE.md`/
`GEMINI.md` raíz). No duplicar esa tabla acá.

| Fase                           | Tier             | Nota                                                                       |
| ------------------------------ | ---------------- | -------------------------------------------------------------------------- |
| 1. Descubrimiento              | **estándar**     | Extraer, no razonar profundo                                               |
| 2. Decisión de stack           | **alto**         | Una sola vez, cross-cutting, caro equivocarse                              |
| 3. Configuración del workspace | **económico**    | Mecánica: escribir config + correr CLI                                     |
| 4. Redacción de specs          | **alto**         | La spec es el contrato de todo lo que sigue                                |
| 5. Loop de ciclos              | según agente SDD | La tabla canónica ⚙️ manda: implementores **estándar**, orquestador/arquitecto/reviewer **alto** |

## FASE 1 — Descubrimiento (una ronda de preguntas, máximo)

Leer `sdd/memory/lessons.md` (MEMORIA GATE) y extraer de la idea:

- **Dominio y usuarios**: quién lo usa y para qué.
- **Módulos core**: 3–7 capacidades con nombre propio (serán los módulos SDD).
- **Necesidades técnicas** (checklist): ¿persistencia? ¿tiempo real? ¿colas/jobs?
  ¿archivos/media? ¿auth? ¿UI web? ¿API pública? ¿integraciones externas?

Si algo **bloquea la decisión de stack**, hacer UNA ronda de preguntas concretas.
Todo lo demás se asume con defaults y se anota como supuesto en la spec — no
interrogar al usuario por lo que una spec puede fijar después.

Escribir lo relevado en `harness.idea.md` (no en la cabeza ni en cada spec después):

- **`## Evidencia del descubrimiento`**: tabla `Fuente | Estado de acceso | Dato medido
  | Fecha` — una fila por cada dato que sostiene una decisión de dominio/módulo/necesidad
  técnica (repo existente inspeccionado, API externa, entrevista, métrica).
- **`## Decisiones del dev`**: una entrada con fecha por cada respuesta que el usuario dio
  en la ronda de preguntas.

Las specs de FASE 4 **citan** estas secciones (referencia a la fila/fecha) en vez de
copiar la evidencia a mano — una sola fuente, sin duplicación que se desincroniza.

## FASE 2 — Decisión de stack (matriz → propuesta → checkpoint)

| Necesidad detectada                          | Pieza                                     |
| -------------------------------------------- | ----------------------------------------- |
| API con dominio rico, websockets, jobs       | app `nestjs`                              |
| API liviana / microservicio simple           | app `fastify`                             |
| Scripting, datos, ML, integraciones Python   | app `python`                              |
| UI web SPA (dashboard, admin, tool interna)  | app `react`                               |
| UI web con SSR/SEO (producto público)        | app `nextjs`                              |
| Persistencia relacional                      | service `postgres`                        |
| Cache, sesiones, rate-limit, pub/sub simple  | service `redis`                           |
| Colas/eventos entre servicios                | service `rabbitmq`                        |
| Archivos/media (S3-compatible)               | service `minio`                           |
| Front + back en el stack                     | libs `shared-types` + `api-client`        |
| ≥2 apps TypeScript                           | lib `shared-utils`; UI compartida → `ui-kit` |

Reglas: **una sola app → modo `standalone`**; front+back o multi-servicio → modo
`nx`. Ante la duda entre dos piezas, la más simple. No agregar piezas "por si
acaso": `harness add app|service` existe para cuando la spec lo exija.

**Checkpoint:** presentar stack propuesto + módulos + supuestos. Sin aprobación no
se genera nada.

## FASE 3 — Configuración del workspace (mecánica, cero prompts)

**Repo vacío** → escribir `harness.config.json` y correr la vía no interactiva:

```jsonc
{
  "mode": "nx", // o "standalone" (exactamente 1 app)
  "project": {
    "name": "mi-proyecto", // kebab-case
    "description": "Qué es y para quién",
    "packageScope": "@mi-proyecto"
  },
  "apps": [{ "name": "core-api", "type": "nestjs" }], // nestjs|react|python|nextjs|fastify|springboot|hono
  "libs": [{ "name": "shared-types", "type": "shared-types" }], // shared-types|shared-utils|ui-kit|api-client|config
  "services": [{ "type": "postgres" }] // postgres|redis|rabbitmq|minio (port/version opcionales)
}
```

```bash
npx @e-burgos/sdd-harness init --config ./harness.config.json
```

`init --config` genera **en el cwd** cuando el cwd ya contiene el `harness.config.json`
indicado, o `basename(cwd) == project.name`, o se pasa `--here` — si no, crea
`<project.name>/` aparte. `harness.idea.md`, `harness.config.json` y su `.schema.json`
quedan dentro del workspace generado (son la entrada del protocolo Hermes). Si el cwd ya
es repo git, `init` NO corre `git init`: commitea sobre la rama actual.

`init` termina corriendo el gate de FASE 3 automáticamente — `sdd:validate` +
`nx run-many -t lint test build` (modo nx) o los scripts `lint`/`test`/`build` que
existan en el `package.json` (standalone) — y **falla** si algo queda rojo. Usar
`--skip-verify` solo con justificación explícita (por ejemplo, un servicio externo que
el sandbox no puede levantar); nunca para apurar el checkpoint.

Si `NX_WORKSPACE_ROOT_PATH` está definida y no apunta al cwd, `init` lo advierte en la
primera línea de salida — un `nx run-many` corrido con esa variable mal seteada ejecuta
contra OTRO repo sin error visible. Verificarla antes de confiar en el resultado del gate.

**Repo existente sin SDD** → instalarlo sin tocar el código, sin prompts:

```bash
npx @e-burgos/sdd-harness configure sdd --name mi-proyecto --description "Qué es y para quién"
```

(agregar `-y` sólo si ya hay un `sdd/` y querés **resetearlo** — borra specs, ciclos y fixes).

**Workspace SDD existente** → cubrir solo los gaps: `harness add app <type> --name <name>`,
`harness add service <type>`, `harness configure docker --services postgres,redis`.

> Todo comando de la CLI tiene flags para cada prompt: sin ellos el comando abre un
> prompt interactivo que **no se puede responder por stdin** (se cuelga). Pasá siempre
> los flags, y `harness <comando> --help` lista los que faltan.

**Verificación de fase (gate):** `pnpm sdd:validate` verde + build del workspace verde.
Con `init --config` (sin `--skip-verify`) ya corrió solo; con `configure sdd` sobre un
repo existente, correrlo a mano. Rojo → arreglar antes de seguir; nunca sembrar specs
sobre base rota.

## FASE 4 — Sembrar el backlog SDD

Dos caminos — usar el que corresponda a cómo se armó `harness.config.json` en FASE 3:

**A. Un `add spec` por módulo** (camino por defecto), en orden de dependencia:

1. `harness add spec <slug-del-modulo> --author <gh-user> --title "<título>" --app apps/<subproyecto> [--apps apps/a,libs/b] [--depends-on <spec-id|slug>]...`
   — crea la estructura, registra la spec en `sdd/specs/index.json` con
   `status: "draft"` (incluyendo `depends_on`) y registra el módulo en
   `pending_modules` de `sdd/global.json` **automáticamente**
   (`{module, spec, apps, cycles_completed: 0, description}`). No hay paso manual de
   `pending_modules` — el comando ya lo hace.
2. Redactar el `.spec.md` desde el descubrimiento: objetivo, alcance del primer
   ciclo, criterios de aceptación de alto nivel; citar la evidencia/decisiones de
   `harness.idea.md` (FASE 1) en vez de copiarlas a mano.

**B. Sembrado por config** (alternativa, cuando `sdd.modules` ya se declaró en el
`harness.config.json` de FASE 3): cada módulo (string o `{name, title?, app?, apps?,
depends_on?}`) de `sdd.modules` se convierte en spec `draft` + entrada en
`pending_modules` al correr `init` — no hace falta repetir `add spec` por módulo, solo
redactar el `.spec.md` de cada uno (paso 2 de arriba).

En ambos caminos la spec queda `draft` hasta que el **orquestador** abre cycle-01 en
FASE 5 (`draft → in-progress`) — Hermes nunca cambia ese status por su cuenta.

**Checkpoint por spec:** la spec es el contrato — el usuario la aprueba (o edita)
antes de que el loop la implemente. En modo full-auto explícitamente pedido, se
aprueban en bloque acá y el loop no vuelve a preguntar.

## FASE 5 — El loop de ciclos

```
mientras global.json tenga pending_modules o in_progress_modules:
  1. sdd-orchestrator  → pnpm sdd:gate <spec> (GATE A), consolidación de contexto,
                         destilación de memoria si journal ≥5, decisión de flow
                         (profile team → full · solo → lite), brief, cycle.json in-progress
  2. sdd-functional    → functional.md
  3. sdd-planner + sdd-architect → tasks.json, planner.md, architect.md,
                         api/schema/components
  4. sdd-implementor-back / -front → tasks done, registros actualizados
  5. sdd-reviewer      → pnpm sdd:validate verde, CA verificados, CONTEXTO GATE
                         (fragmento aditivo), MEMORIA GATE (journal si hubo
                         lección), cycle.json completed
  6. commit del ciclo → siguiente módulo
```

Con `profile: solo` en `global.json` los pasos 2–5 los ejecuta **un solo actor** por ciclo
(`flow: lite`: `plan.md` + `tasks.json`, implementación, cierre) — Hermes no lanza subagentes
de documentos en ese caso; sí mantiene los gates de cierre.

**Condiciones de corte (obligatorias — Hermes para y reporta, no insiste):**

- `pnpm sdd:validate` o los tests fallan **2 veces en el mismo punto** con causas
  distintas de tipeo → parar, reportar diagnóstico y estado exacto del loop.
- Aparece una **decisión de producto** no cubierta por la spec → preguntar al
  usuario; nunca inventarla.
- **Presupuesto/uso agotado** (límite de sesión, rate limit, cupo del plan): cerrar
  limpio el ciclo en curso (o dejarlo `in-progress` con registros válidos), commitear
  y reportar en qué punto del backlog quedó — los registros SDD son el checkpoint;
  cualquier sesión futura retoma con `sdd/global.json` + `sdd/memory/lessons.md`.

**Disciplina de tokens dentro del loop:** brief mínimo por agente (el orquestador ya
lo garantiza); jamás releer specs completas si el brief alcanza; `lessons.md` al
inicio de cada sesión; graphify si existe; los implementores en tier **estándar** con
contexto acotado a su task — mecanismo según proveedor: subagentes con `model`/`effort`
explícitos en Claude Code, subagentes de modelo económico/estándar en Gemini CLI,
custom agents con `model:` pinneado en Copilot, y en Antigravity verificar el dropdown
antes de cada fase (regla ⚙️).

**Telemetría del loop (obligatoria al cerrar cada ciclo):** cada agente registra su
propia unidad en `cycle.json → metrics.usage.by_agent[]` al cerrarla — la task
implementada, el documento (functional/planner/architect), la coordinación del
orquestador. Cuando Hermes o el orquestador lanzan un subagente vía la tool `Agent`
(Claude Code), la notificación `agent-usage-notification`
(`<usage><subagent_tokens>N</subagent_tokens>…</usage>`) del padre es la fuente exacta
para esa entrada — `approx: false`, split 85/15 en `tokens_in`/`tokens_out`; si el mismo
subagente se reanuda con `SendMessage`, `N` llega **acumulado** desde el lanzamiento y se
registra la diferencia con la notificación anterior. El
**reviewer**, al cerrar, verifica que `by_agent` esté completo, agrega su propia
entrada, deriva `by_tier` agrupando por `provider_model` (`claude/opus`, `gemini/pro`,
`copilot/claude-sonnet`; Antigravity bajo `gemini/*`) y suma el total top-level — nunca
lo reconstruye a estimación. Todo fix generado dentro del loop registra su `usage` (y
`by_agent` si participó más de un agente) en `sdd/fixes.json` al resolverse. Fuente del
número: `/stats` en Gemini CLI, reporte de sesión en Claude Code — ambos comandos del
cliente que el agente no puede ejecutar — y estimación declarada en Antigravity/Copilot,
que no tienen contador. **Hermes no cierra un ciclo sin este registro.** Sin contador se
estima con `approx: true` y `source: "declared-estimate"`; no existe la opción de omitir.

## Automatización del loop (opcional — por proveedor)

El loop es retomable por diseño: todo el estado vive en los registros SDD, así que
cualquier sesión nueva puede continuarlo con `sdd/prompts/hermes-resume.prompt.md`
(prompt standalone: carga lessons + `harness.idea.md` + global.json, declara la FASE
actual y sigue desde ahí). Para un repaso rápido sin abrir archivos,
`harness idea --show` imprime la idea, la evidencia del descubrimiento y las
decisiones del dev ya registradas. `setup:agents` ya lo expone en cada arnés; sobre
esa base, cada proveedor tiene su mecanismo:

| Proveedor          | Retomar el loop                                        | Automatización disponible                                                                 |
| ------------------ | ------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **Claude Code**    | `/hermes-resume` (slash command)                       | `/loop 15m` con el prompt; Routines/cron en sesión nueva; hook `SessionStart` (abajo)      |
| **Copilot**        | coding agent: asignar un issue con el prompt; CLI: `/hermes-resume` | hooks repo-level en `.github/hooks/` (p. ej. inyectar `lessons.md`); custom agents pinneados |
| **Gemini CLI**     | `/hermes-resume` (comando TOML generado)               | hooks first-party del CLI; subagentes para las fases mecánicas                             |
| **Antigravity**    | `/hermes-resume` (workflow de `.agent/workflows/`)     | workflows encadenables; el modelo por fase lo fija el usuario en el dropdown (regla ⚙️)    |

- **Memoria al inicio de sesión (hook opcional, Claude Code):** en
  `.claude/settings.json` del repo, un hook `SessionStart` que imprima la memoria
  destilada — se inyecta como contexto sin gastar un turno:

  ```json
  {
    "hooks": {
      "SessionStart": [
        {
          "hooks": [
            { "type": "command", "command": "cat sdd/memory/lessons.md 2>/dev/null || true" }
          ]
        }
      ]
    }
  }
  ```

  El equivalente en Gemini CLI y Copilot CLI se configura con sus propios hooks
  (mismo comando); el kit no instala ninguno solo: son decisiones del dev (consumen
  cupo del plan). En arneses sin hooks, el equivalente manual es pegar
  `hermes-resume.prompt.md` al abrir sesión.

## Archivos que modifica

Hermes en sí escribe `harness.idea.md` (idea + evidencia + decisiones del dev, FASE 1),
`harness.config.json` (FASE 3) y los `.spec.md` (FASE 4). `pending_modules` de
`sdd/global.json` y el `status: "draft"` de cada spec en `sdd/specs/index.json` ya no
los escribe Hermes a mano: los registra la CLI (`add spec`, o el sembrado de
`sdd.modules` en `init`) al correr FASE 4. Todo lo demás lo escriben los agentes SDD
de cada fase bajo sus propias reglas — ver "Archivos que modifica" de cada skill.

## Registro de consumo (obligatorio)

Hermes también consume tokens coordinando fases — ese consumo se registra, no se
descarta por ser "solo orquestación":

- **Dentro de un ciclo o de un fix que Hermes conduce**: su unidad va en
  `metrics.usage.by_agent[]` del ciclo (o `usage`/`usage.by_agent[]` del fix) con
  `agent: "hermes"`, igual que cualquier otro agente — ver review-cycle.prompt.md
  paso 4c y hotfix-bypass-gate.prompt.md.
- **FASE 1–4, fuera de cualquier ciclo** (descubrimiento, decisión de stack,
  configuración del workspace, redacción de specs): no hay `cycle.json` donde anotarlo
  todavía. Si el proveedor no expone otro mecanismo de registro en ese momento, anotar
  el consumo como una línea de costo declarado dentro de `## Decisiones del dev` o
  `## Evidencia del descubrimiento` de `harness.idea.md` (proveedor/modelo, tokens u
  orden de magnitud, `approx: true` si no hay contador) — se retoma y consolida en el
  `by_agent` del primer ciclo que abra el orquestador (FASE 5).
