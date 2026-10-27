# SDD — Spec-Driven Development

> **Spec-Driven Development (SDD)** es la metodología que guía todo desarrollo en este monorepo.
>
> Ninguna línea de código se escribe sin haber pasado por un ciclo riguroso de especificación, diseño funcional, planificación técnica y validación de arquitectura.

---

## Tabla de contenidos

1. [¿Qué es SDD?](#qué-es-sdd)
2. [Estructura del sistema SDD](#estructura-del-sistema-sdd)
3. [SPEC GATE — La regla de oro](#spec-gate--la-regla-de-oro)
4. [CONTEXTO GATE — Cierre obligatorio](#contexto-gate--cierre-obligatorio)
5. [MEMORIA GATE — Autoaprendizaje entre sesiones](#memoria-gate--autoaprendizaje-entre-sesiones)
6. [FIX GATE — Bypass controlado](#fix-gate--bypass-controlado)
7. [Cómo generar una especificación](#cómo-generar-una-especificación)
8. [Ciclos SDD — Flujo completo](#ciclos-sdd--flujo-completo)
9. [Agentes SDD](#agentes-sdd)
10. [Skills SDD](#skills-sdd)
11. [Artefactos del sistema](#artefactos-del-sistema)
12. [Reglas estrictas](#reglas-estrictas)
13. [Referencia rápida](#referencia-rápida)

---

## ¿Qué es SDD?

**SDD (Spec-Driven Development)** es una metodología que estructura el desarrollo de software en **ciclos de diseño seguidos de implementación**.

Antes de escribir código, un equipo de **agentes especializados** revisa la especificación, genera requisitos funcionales, planifica tareas técnicas, valida el diseño arquitectónico, y solo entonces autoriza la implementación.

### Principios clave

1. **Especificación primero:** Toda funcionalidad debe estar documentada en una spec formal antes de codificar.
2. **Diseño colaborativo:** Los agentes funcional, planner y arquitecto trabajan en paralelo para validar viabilidad.
3. **Trazabilidad completa:** Cada tarea de implementación se puede rastrear hasta la especificación original.
4. **Ciclos iterativos:** El trabajo se divide en ciclos de 1-2 semanas, cada uno con artifacts documentados.
5. **Automatización agentica:** Agentes especializados generan documentación, tasks y validaciones.

> 💡 **¿Querés ver un repo SDD completo además de este?**
> [e-burgos/sdd-harness-examples](https://github.com/e-burgos/sdd-harness-examples) tiene un
> ejemplo real por cada modo de instalación — monorepo Nx, app standalone, y un proyecto
> existente que adoptó SDD — regenerados desde npm en cada release. Sirven como referencia
> navegable de cómo se ve este mismo sistema en otros contextos.

---

## Estructura del sistema SDD

```
sdd/
├── README.md                          ← Índice de la documentación (es/en)
├── documentation/                     ← Este documento + HOW-TO + INSTALL, en es/ y en/
├── global.json                        ← Estado central del proyecto (módulos, stack)
├── tasks.json                         ← ÍNDICE de tasks (generado — el detalle vive en cada ciclo)
├── schemas/                           ← JSON Schemas estrictos de TODOS los registros (fuente de máquina)
│   └── tools.schema.json              ← Forma de sdd/tools.json (interruptor de rtk)
├── schema.json                        ← Esquema de base de datos (actualizado por Arquitecto)
├── api.json                           ← Contratos de API implementados
├── components.json                    ← Componentes frontend creados
├── fixes.json                         ← Registry de fixes fuera del flujo SDD (ver FIX GATE)
├── catalog.json                       ← Manifest GENERADO de agents/skills/prompts/schemas (pnpm sdd:rebuild-catalog)
│
├── specs/                             ← Especificaciones técnicas (estructura jerárquica por spec)
│   ├── index.json                     ← Registro centralizado de specs
│   │
│   ├── spec-[author]-[NNN]-[slug]/    ← Una carpeta por spec
│   │   ├── spec-[author]-[NNN]-[slug].spec.md
│   │   │
│   │   ├── cycles/
│   │   │   ├── cycle-01/
│   │   │   │   ├── brief.yaml         ← Resumen del ciclo (Orquestador)
│   │   │   │   ├── functional.md      ← Historias de usuario (Funcional)
│   │   │   │   ├── planner.md         ← Tareas técnicas (Planner)
│   │   │   │   ├── architect.md       ← Decisiones de diseño (Arquitecto)
│   │   │   │   ├── plan.md            ← Solo en flow `lite`: reemplaza a los cuatro anteriores
│   │   │   │   ├── tasks.json         ← Tasks CANÓNICAS del ciclo (Planner/Implementadores)
│   │   │   │   ├── cycle.json         ← Estado del ciclo — REQUERIDO antes de implementar
│   │   │   │   └── artifacts/         ← Docs de apoyo (opcional)
│   │   │   │       ├── explore.md     ← Exploración de código existente
│   │   │   │       ├── design.md      ← Diagramas o diseños detallados
│   │   │   │       └── endpoint-examples.md ← Ejemplos de uso de la API
│   │   │   └── cycle-02/
│   │   │
│   │   └── fixes/
│   │       └── fix-author-nnn-001.md
│
├── fixes/                             ← Fixes repository-level
│   └── fix-jdoe-001.md
│
├── context/                           ← Entry points para agentes
│   ├── constitution.md                ← Constitución global (tabla-snapshot de subproyectos)
│   ├── context_prompt.md              ← Context global del proyecto
│   ├── apps/                          ← Un directorio por app generada en Nx
│   │   └── [nombre]/
│   │       ├── constitution.md        ← BASE — solo lo toca la consolidación
│   │       ├── context_prompt.md      ← BASE — solo lo toca la consolidación
│   │       └── updates/               ← Fragmentos ADITIVOS por ciclo/fix (ver CONTEXTO GATE)
│   │           └── YYYY-MM-DD-[spec-id]-cycle-XX.md
│   ├── libs/                          ← Ídem por lib
│   └── tools/                         ← Herramientas del repo que no son app ni lib
│
├── memory/                            ← Memoria del proyecto (ver MEMORIA GATE)
│   ├── lessons.md                     ← Lecciones DESTILADAS — se lee al iniciar toda sesión (cap 120 líneas)
│   └── journal/                       ← Entradas episódicas por ciclo/fix — solo grep dirigido
│       └── YYYY-MM-DD-[spec-id]-cycle-XX.md
│
├── pricing.json                       ← Tarifas del dashboard de Costos (hora tradicional + $/MTok por tier)
├── tools.json                         ← Interruptor de rtk (dato del usuario — update sdd no lo toca)
│
├── agents/                            ← Definiciones de agentes SDD (centralizadas)
│   ├── sdd-orchestrator.agent.md
│   ├── sdd-functional.agent.md
│   ├── sdd-planner.agent.md
│   ├── sdd-architect.agent.md
│   ├── sdd-implementor-back.agent.md
│   ├── sdd-implementor-front.agent.md
│   ├── sdd-reviewer.agent.md
│   └── sdd-steward.agent.md          ← Conserje del kit: status, update sdd, ruteo de entrada
│
├── scripts/                           ← Automatización cross-platform
│   ├── setup-agents.sh                ← Script Bash (macOS / Linux)
│   ├── setup-agents.ps1               ← Script PowerShell (Windows)
│   ├── validate-sdd.mjs               ← Validador de registros (pnpm sdd:validate)
│   ├── spec-gate.mjs                  ← Responde el SPEC GATE A y B (pnpm sdd:gate)
│   ├── rebuild-tasks-index.mjs        ← Regenera el índice de tasks (pnpm sdd:rebuild-tasks-index)
│   ├── rebuild-catalog.mjs            ← Regenera el manifest del visor (pnpm sdd:rebuild-catalog)
│   ├── setup-rtk.mjs                  ← Instala/mergea los hooks de rtk (pnpm sdd:rtk)
│   ├── rtk-hook.mjs                   ← Puente que llaman los hooks; si falla, pasa el comando sin tocar
│   ├── rtk-common.mjs                 ← Helpers de rtk (versión fijada, resolución del binario)
│   └── rule-zero-hook.mjs             ← Hook SessionStart (Claude Code): reinyecta la regla cero (modelo/esfuerzo/contexto)
│
├── templates/                         ← Blueprints de scaffolding (NO son proyectos Nx)
│   ├── nx-workspace/                  ← Config raíz: nx.json, package.json, npmrc, pnpm-workspace
│   ├── apps/react-app/                ← App React + Vite
│   ├── apps/java-api/                 ← App Spring Boot bajo Nx (Nx no la genera)
│   └── libs/ts-lib/                   ← Lib TypeScript compartida
│
├── dual-harness/                      ← CAPA 1 — fuente de verdad de AGENTS.md, CLAUDE.md y GEMINI.md de la raíz
│   ├── AGENTS.md                      ← Instrucciones para GitHub Copilot Agents
│   ├── CLAUDE.md                      ← Instrucciones para Claude Code
│   ├── GEMINI.md                      ← Instrucciones para Antigravity IDE y Gemini CLI
│   ├── copilot-instructions.md        ← Semilla de .github/copilot-instructions.md (la copia setup:agents)
│   └── rules/                         ← CAPA 2 — se lee cuando hace falta; también rules siempre activas de Antigravity
│       ├── sdd-gates.md               ← FUENTE CANÓNICA de los gates (SPEC GATE A/B, flows, FIX GATE)
│       ├── sdd-model-budget.md        ← FUENTE CANÓNICA del contrato de telemetría
│       └── sdd-code-style.md          ← Código sin comentarios
│
├── prompts/                           ← Prompts de entrada para agentes
│   ├── start-sdd-cycle.prompt.md
│   ├── check-spec-before-implement.prompt.md
│   ├── hotfix-bypass-gate.prompt.md
│   └── review-cycle.prompt.md
│
├── docs/                              ← Visor SDD — app en JS vanilla, cero deps, cero build
│   ├── index.html                     ← `pnpm sdd:docs` → http://127.0.0.1:4310/sdd/docs/
│   ├── app.js                         ← Router por hash + las 15 vistas
│   ├── styles.css
│   ├── serve.mjs                      ← Server con solo `node:*`, restringido a /sdd/**
│   └── fonts/                         ← woff2 vendorizadas (sin CDN, funciona offline)
│
└── skills/                            ← Skills (micro-agentes especializados) — archivo `SKILL.md`
    ├── sdd-steward/                   ← Conserje del kit — puerta de entrada (/sdd-steward)
    ├── sdd-orchestrator/
    ├── sdd-functional/
    ├── sdd-planner/
    ├── sdd-architect/
    ├── sdd-file-structure/
    ├── sdd-data-schemas/
    ├── sdd-implementor-back/
    ├── sdd-implementor-front/
    ├── sdd-reviewer/
    ├── init-nx-workspace/             ← Bootstrap del workspace (chequeada al iniciar sesión)
    ├── scaffold-nx/                   ← Apps/libs nuevas en un workspace ya montado
    ├── setup-graphify/                ← Instalador opt-in del grafo de conocimiento
    ├── generate-springboot-api/
    ├── generate-api-contract/
    ├── generate-react-component/
    ├── generate-nestjs-module/
    └── generate-prisma-schema/
```

> `sdd/docs/` es **portable a propósito**: no es un proyecto Nx (no tiene `project.json` ni
> `package.json`), no tiene dependencias ni paso de build, y lee los registros de `sdd/` en vivo.
> Copiar la carpeta `sdd/` a otro repo lleva la metodología **y** su visor.

### Regla de documentos de ciclo (INVIOLABLE)

> Los únicos archivos permitidos en la **raíz** de `cycle-[XX]/` son exactamente estos 7
> (la whitelist que valida `pnpm sdd:validate`), y cuáles aplican depende del `flow`:

| Archivo         | Generado por                                      | Flow            |
| --------------- | ------------------------------------------------- | --------------- |
| `brief.yaml`    | sdd-orchestrator                                  | full · reduced  |
| `functional.md` | sdd-functional                                    | full            |
| `planner.md`    | sdd-planner                                       | full            |
| `architect.md`  | sdd-architect                                     | full            |
| `plan.md`       | el actor único del ciclo                          | lite            |
| `tasks.json`    | sdd-planner (crea) / sdd-implementor-\* (status)  | todos           |
| `cycle.json`    | sdd-orchestrator (inicio) / sdd-reviewer (cierre) | todos           |

**Cualquier documento de apoyo adicional** (exploración de código, diagramas, ejemplos de API, tasks detalladas, etc.) debe ir en:

```
sdd/specs/{spec-id}/cycles/cycle-[XX]/artifacts/<nombre>.md
```

Y quedar indexado en `cycle.json` bajo la clave `"artifacts": [...]`.

---

### Configuración de visibilidad de agentes, skills y prompts

Todos los artefactos SDD están centralizados en `sdd/` y se hacen visibles a múltiples herramientas mediante symlinks:

```
sdd/agents/        ← Fuente única de verdad
sdd/skills/        ← Fuente única de verdad
sdd/prompts/       ← Fuente única de verdad
sdd/dual-harness/  ← Fuente única de verdad (AGENTS.md, CLAUDE.md y GEMINI.md de la raíz)

.claude/agents/          → symlink a sdd/agents/      (Claude Code — subagentes)
.claude/skills/          → symlink a sdd/skills/      (Claude Code — Agent Skills, SKILL.md)
.claude/commands/        → symlink a sdd/prompts/     (Claude Code — slash commands)
.claude/prompts/         → symlink a sdd/prompts/     (referencia manual)

.github/agents/          → symlink a sdd/agents/      (GitHub Copilot)
.github/skills/sdd-*/    → symlinks individuales a sdd/skills/sdd-*/    (GitHub Copilot)
.github/skills/generate-*/ → symlinks individuales a sdd/skills/generate-*/
.github/prompts/*.prompt.md → symlinks individuales a sdd/prompts/*.prompt.md

.agents/rules/sdd-*.md          → symlinks individuales a sdd/dual-harness/rules/       (Antigravity — rules siempre activas)
.agents/skills/<skill>/         → symlinks individuales a sdd/skills/<skill>/           (Antigravity + Gemini CLI — estándar SKILL.md compartido)
.agent/workflows/<prompt>.md    → symlinks individuales a sdd/prompts/<prompt>.prompt.md (Antigravity — expuestos como workflows /<prompt>)
.gemini/commands/<prompt>.toml  → wrapper GENERADO alrededor de sdd/prompts/<prompt>.prompt.md (Gemini CLI — expuestos como comandos /<prompt>)
.gemini/settings.json           → FUSIONADO, nunca sobreescrito (agrega GEMINI.md/AGENTS.md a context.fileName)

AGENTS.md (raíz)         → symlink a sdd/dual-harness/AGENTS.md
CLAUDE.md  (raíz)        → symlink a sdd/dual-harness/CLAUDE.md
GEMINI.md  (raíz)        → symlink a sdd/dual-harness/GEMINI.md
.github/copilot-instructions.md → ARCHIVO REAL (no symlink) — lo siembra setup:agents desde sdd/dual-harness/copilot-instructions.md si no existe
```

> `.github/skills/` y `.github/prompts/` usan symlinks individuales para **no pisar** los archivos Nx y Copilot existentes.  
> `AGENTS.md`, `CLAUDE.md` y `GEMINI.md` en la raíz son symlinks: editar **siempre** en `sdd/dual-harness/`.
> `.github/copilot-instructions.md` es un archivo real a propósito: los lectores server-side de
> GitHub (Copilot code review) no siguen symlinks. `pnpm setup:agents` lo **siembra** desde
> `sdd/dual-harness/copilot-instructions.md` **solo si no existe**; si ya está, no se pisa nunca
> (a partir de ahí es del proyecto). Solo contiene punteros — el detalle vive en dual-harness.
> `.gemini/commands/*.toml` son **generados**, no symlinks — TOML no tiene equivalente a un
> include de Markdown, así que `setup:agents` regenera un wrapper liviano por cada
> `sdd/prompts/*.prompt.md` en cada corrida; cualquier comando sin el marcador del generador
> queda intacto. `.gemini/settings.json` se fusiona de la misma forma: solo se toca su lista
> `context.fileName`, nunca el resto del archivo.

**Compatibilidad verificada:**

| Herramienta                       | Qué lee                                                                                                                                 | Estado         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Claude Code (local)               | `CLAUDE.md`, `.claude/agents/*.agent.md`, `.claude/skills/*/SKILL.md`, `.claude/commands/`                                              | ✅             |
| Copilot coding agent (cloud)      | `AGENTS.md` (+ `CLAUDE.md` fallback), `.github/agents/*.agent.md`, `.github/skills/*/SKILL.md` — clona en Linux, los symlinks resuelven | ✅             |
| VS Code Copilot Chat              | `.github/prompts/*.prompt.md`, custom agents, Agent Skills                                                                              | ✅             |
| Copilot code review (server-side) | `.github/copilot-instructions.md` (archivo real)                                                                                        | ✅             |
| Antigravity IDE                   | `GEMINI.md`, `.agents/rules/*.md`, `.agents/skills/*/SKILL.md`, `.agent/workflows/*.md` (como workflows `/<prompt>`)                    | ✅             |
| Gemini CLI                        | `GEMINI.md` (+ `AGENTS.md`, vía el `.gemini/settings.json` fusionado), `.agents/skills/*/SKILL.md`, `.gemini/commands/*.toml` (como comandos `/<prompt>`) | ✅ |
| Windows sin Developer Mode        | git checkout deja los symlinks como archivos de texto → correr `pnpm setup:agents` (crea junctions)                                     | ⚠️ obligatorio |

> ⛔ El archivo de cada skill se llama **`SKILL.md` en MAYÚSCULA** — es el estándar Agent
> Skills que Claude Code exige: en Linux (case-sensitive) `.claude/skills/*/skill.md` en
> minúscula **no se descubre** y las skills quedan invisibles para el agente. Git versiona los
> archivos en mayúscula (`git ls-files sdd/skills` es la autoridad) y TODO código que los
> resuelva (visor, catálogo, scripts) usa `SKILL.md` — el case debe coincidir en ambos lados.
> En macOS (`core.ignorecase=true`) cualquier case parece andar: no confiar en eso, verificar
> siempre en Linux/CI.

**Setup automático (una vez tras clonar):**

```bash
pnpm setup:agents   # macOS/Linux: bash sdd/scripts/setup-agents.sh
                    # Windows:     PowerShell sdd/scripts/setup-agents.ps1
```

Este enfoque garantiza:

- ✅ Una única fuente de verdad — DRY principle
- ✅ Sin duplicación entre `.claude/`, `.github/` y `.agents/`/`.agent/`/`.gemini/`
- ✅ Los tres proveedores ven los mismos agentes, skills y prompts
- ✅ Portable: copiar `sdd/` a otro proyecto funciona sin cambios

---

## SPEC GATE — La regla de oro

> ⛔ **Fuente canónica: `sdd/dual-harness/rules/sdd-gates.md`.** Acá va el resumen: si el gate
> cambia, cambia en esa rule. La checklist no se contesta leyendo archivos a mano — la contesta
> un script.

**Invariantes — valen en TODO flow y TODO perfil:**

1. La spec existe y está registrada en `sdd/specs/index.json`.
2. El módulo está en `sdd/global.json` (`pending_modules` para abrir, `in_progress_modules` para implementar).
3. Existe `cycle.json` con `status: "in-progress"` **antes de la primera línea de código**.
4. Existe `tasks.json` con tasks, y ninguna task pasa a `done` sin su `usage`.

El gate tiene **dos momentos** y los dos se corren como comando:

```bash
pnpm sdd:gate <spec-id|slug>            # GATE A — ¿se puede abrir un ciclo? (sdd-orchestrator)
pnpm sdd:gate <spec-id|slug> cycle-XX   # GATE B — ¿se puede escribir código? (quien implementa)
pnpm sdd:gate <spec-id|slug> --json     # misma respuesta, estructurada para agentes
```

El script imprime una línea por condición (✔/✘) y cierra en `APPROVED` o `BLOCKED`
(exit `0` si pasa, `1` si está bloqueado, `2` ante un error de uso). **No escribe nada:** solo
responde. La salida se pega como reporte del gate.

**GATE A — apertura de ciclo**

| #   | Condición                                                                  |
| --- | -------------------------------------------------------------------------- |
| A1  | Spec registrada en `specs/index.json` y su `.spec.md` existe               |
| A2  | Módulo en `pending_modules` (o `in_progress_modules` si es ciclo posterior) |
| A3  | Ningún otro ciclo de esa spec está `in-progress`                           |
| A4  | Sus `depends_on` están `completed`                                          |
| A5  | La spec no está `completed` ni `cancelled`                                  |

`APPROVED` en A imprime además el próximo `cycle-XX`, el flow sugerido y el perfil activo. Recién
ahí el orquestador crea `cycle.json` (`status: "in-progress"`, `flow`, `metrics` con
`usage.by_agent: []`), mueve el módulo a `in_progress_modules` y, si es `cycle-01`, pasa la spec
de `draft` a `in-progress`. Solo el reviewer lo pasa después a `status: "completed"`.

**GATE B — implementación**

| #   | Condición                                                                                          |
| --- | -------------------------------------------------------------------------------------------------- |
| B1  | `cycle.json` existe con `status: "in-progress"`                                                     |
| B2  | Módulo en `in_progress_modules` de `global.json`                                                     |
| B3  | `tasks.json` del ciclo con al menos una task                                                         |
| B4  | Documentos del `flow`: full → brief/functional/planner/architect · reduced → brief · lite → plan.md |
| B5  | `constitution.md` de cada subproyecto en `cycle.json → apps[]`                                       |

**`BLOCKED` → cero líneas de código** hasta completar lo que el script señala.

### Flow del ciclo — full · reduced · lite

| `flow`    | Quién                                                           | Documentos en `cycle-XX/` (además de `cycle.json` + `tasks.json`) | Cuándo                                                        |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------- |
| `full`    | Un rol por documento + implementores + reviewer                 | `brief.yaml`, `functional.md`, `planner.md`, `architect.md`        | Equipos; specs que otros consumen; contratos nuevos           |
| `reduced` | Los mismos roles, sin historias de usuario                      | `brief.yaml` (planner/architect opcionales)                        | Refactor estructural sin cambio funcional                     |
| `lite`    | **Un solo actor** con tres sombreros: abre, implementa y cierra | `plan.md`                                                          | Dev solo o pedido `[LITE]`; nada que otro subproyecto consuma |

El flow se decide **una vez, al abrir** y queda escrito en `cycle.json → flow` y
`tasks.json → flow` (no se cambia después):

- `sdd/global.json → profile` (opcional): `team` (default) abre `full`; `solo` abre `lite`.
- Prefijo en el pedido: `[LITE]` fuerza `lite`, `[FULL]` fuerza `full`. **Gana el prefijo.**
- **Excepciones** que vuelven a `full` aunque el perfil sea `solo`: la spec declara contratos que
  otro subproyecto consume (tablas o endpoints nuevos), o tiene dependientes (`depends_on` desde
  otras specs).
- Un ciclo `lite` que igual creó tablas o endpoints deja un **warning** de `pnpm sdd:validate`:
  el próximo ciclo de esa spec se abre `full`.
- El perfil lo cambia el **sdd-steward** a pedido del dev (`/sdd-steward pasame a perfil solo`);
  ningún agente lo cambia por su cuenta. Los ciclos ya abiertos conservan su `flow`.

En `lite`, `plan.md` reemplaza a los cuatro documentos — template en
`sdd/skills/sdd-file-structure/SKILL.md` §3.8: objetivo · historias · tasks en prosa · decisiones
técnicas, esta última **obligatoria** si el ciclo toca `schema.json`, `api.json` o
`components.json`. `tasks.json` puede llevar `user_stories: []`. La telemetría se conserva:
`usage` en cada task más **una** entrada en `cycle.json → metrics.usage.by_agent[]` con
`agent: "orchestrator"`, `label: "solo"` que cubre plan + revisión. El cierre conserva CONTEXTO
GATE, MEMORIA GATE y `pnpm sdd:validate` en verde: nada del cierre se recorta.

### Nueva convención de naming (v2.0)

A partir de ahora, **cada developer trabaja en su propio namespace de specs**, evitando conflictos:

| Elemento           | Formato anterior               | Formato nuevo                                                              | Ejemplo                                                               |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Spec**           | `spec-001-xyz.spec.md`         | `spec-{gh-user}-{NNN}-{slug}/spec-{gh-user}-{NNN}-{slug}.spec.md`          | `spec-jdoe-001-user-onboarding/spec-jdoe-001-user-onboarding.spec.md` |
| **Ciclo**          | `sdd/cycles/cycle-01/`         | `sdd/specs/spec-{gh-user}-{NNN}-{slug}/cycles/cycle-01/`                   | `sdd/specs/spec-jdoe-001-user-onboarding/cycles/cycle-01/`            |
| **Fix spec-level** | `sdd/cycles/cycle-XX/fixes.md` | `sdd/specs/spec-{gh-user}-{NNN}-{slug}/fixes/fix-{gh-user}-{nnn}-{seq}.md` | `sdd/specs/spec-jdoe-001-user-onboarding/fixes/fix-jdoe-001-001.md`   |
| **Contador NNN**   | Global (001, 002, 003…)        | Por developer (each dev resets)                                            | jdoe: 001, 002, 003… asmith: 001, 002…                                |

**Ventajas:**

- ✅ Multi-desarrollador sin conflictos de numeración
- ✅ Cada spec es un proyecto autónomo (contiene su ciclo-01, ciclo-02, etc.)
- ✅ Mejor organización jerárquica en el repositorio
- ✅ Facilita búsqueda por autor

```bash
# Correr el SPEC GATE (A sin ciclo, B con ciclo):
pnpm sdd:gate <spec-id|slug> [cycle-XX]

# Guía del GATE B paso a paso:
sdd/prompts/check-spec-before-implement.prompt.md

# Iniciar un nuevo ciclo (pasos por flow):
sdd/prompts/start-sdd-cycle.prompt.md
```

---

## CONTEXTO GATE — Cierre obligatorio (ADITIVO)

> ⛔ **El `cycle.json` NO puede tener `status: "completed"` si el contexto está desactualizado.**

Al cerrar **cualquier ciclo**, el sdd-reviewer escribe un **fragmento aditivo** — no edita los
archivos base del subproyecto:

```
1. sdd/context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md
   (fixes repo-level: updates/YYYY-MM-DD-fix-[gh-user]-[seq].md)
2. sdd/context/constitution.md      → solo la fila propia de la tabla-snapshot (sección 3)
3. sdd/context/context_prompt.md    → fila nueva solo si se creó app/lib/tool
```

### Por qué aditivo

Cuando varios devs trabajan specs distintas sobre el mismo subproyecto, todos editaban los
mismos `constitution.md`/`context_prompt.md` al cerrar su ciclo → **merge conflicts
garantizados**, agravados por la línea `> Última actualización:` que todos tocaban. El nombre
del fragmento incluye el spec-id (que lleva el gh-user), así que **es único por construcción**
y el conflicto es imposible, no "fácil de resolver".

### Las 3 operaciones

| Operación                                                                                      | Quién                                                                                                                | Cuándo      |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| **Escribir** el fragmento (solo el delta)                                                      | reviewer al cerrar ciclo, o dev al cerrar fix                                                                        | cada cierre |
| **Leer** el contexto = base + `updates/*.md` en orden de nombre                                | cualquier agente                                                                                                     | siempre     |
| **Consolidar**: fundir fragmentos en los base, actualizar el encabezado, borrar los fragmentos | **un solo actor**: orquestador al iniciar ciclo nuevo sobre ese subproyecto, o reviewer con ≥5 fragmentos acumulados | periódica   |

> ⛔ Durante un ciclo/fix **NUNCA** se editan `constitution.md` ni `context_prompt.md` del
> subproyecto, ni su línea `> Última actualización:` — esa línea solo cambia en la consolidación,
> y es el principal imán de conflictos. La consolidación va en commit dedicado
> (`chore(sdd): consolidate context updates for [nombre]`) y nunca en paralelo con un ciclo abierto.
>
> El validador acepta el estado consolidado: si el fragmento de un ciclo cerrado ya no existe,
> `pnpm sdd:validate` da el CONTEXTO GATE por cumplido cuando el header del `context_prompt.md`
> base del subproyecto muestra `Fecha:` ≥ `completed_at` del ciclo (solo la consolidación toca ese header).

### Template del fragmento

```markdown
# [spec-id] cycle-[XX] — [YYYY-MM-DD]

## Estado → qué quedó implementado / en qué estado queda el subproyecto

## Estructura → paquetes/módulos/patrones nuevos o cambiados

## Dependencias → librerías o servicios nuevos que consume/expone

## Qué sigue → pendientes que el próximo ciclo debe saber
```

Secciones vacías se omiten. El fragmento es **corto y solo el delta** — nunca copia del base.
Si el ciclo resolvió algo que el base declara "pendiente", anotarlo como `resuelve: <sección>`
para que la consolidación lo elimine.

### Criterio de frescura

El contexto vigente = base + fragmentos. Se considera **desactualizado** (= ciclo no cerrable) si:

- **No existe fragmento en `updates/` para el ciclo que se está cerrando**
- El conjunto base+fragmentos describe paquetes que no coinciden con el código real
- Menciona como "pendiente" funcionalidad ya implementada sin fragmento que lo corrija
- Le faltan dependencias o patrones que sí existen en el código

**Regla de eliminación** (aplica en la consolidación): si una sección ya no refleja la realidad
→ eliminarla. El contexto nunca tiene información obsoleta.

Ver reglas completas: `sdd/agents/sdd-reviewer.agent.md` → "Actualización de contexto".

---

## MEMORIA GATE — Autoaprendizaje entre sesiones

El contexto registra **qué es** el sistema; la memoria registra **qué aprendimos**
trabajándolo. Sin ella cada sesión repite los mismos errores y re-paga en tokens el
mismo descubrimiento. Dos capas con costo de lectura asimétrico por diseño:

| Capa | Cuándo se lee | Cuándo se escribe |
| --- | --- | --- |
| `sdd/memory/lessons.md` | **Completo, al iniciar toda sesión** (cap 120 líneas) | Solo en la destilación (actor único: el orquestador) |
| `sdd/memory/journal/` | Nunca entero — grep dirigido | Al cerrar ciclo/fix, **solo si hubo lección real** |

- **Filtro anti-ruido:** antes de escribir, preguntarse *"¿esto cambiaría el
  comportamiento de un agente futuro?"*. Si no, no se escribe.
- **Destilación:** con ≥5 entradas en `journal/`, el orquestador funde cada una en una
  línea de `lessons.md` (Proceso / Técnica / Costo) y borra lo destilado.
  `pnpm sdd:validate` avisa cuando está pendiente.
- Naming del journal idéntico a los fragmentos de contexto → único por construcción,
  sin merge conflicts. Regla completa: sección 🧠 del dual-harness.

Relacionado: al cerrar cada ciclo el reviewer registra la **telemetría de uso**
(`cycle.json → metrics.usage`: tokens por proveedor/tier vía `by_tier`, minutos) que
alimenta la vista **Costos** del visor (`pnpm sdd:docs`) — comparativa agéntico vs
estimación tradicional entre los tres proveedores, más una tabla de costo de fixes
armada con el `usage` registrado en `sdd/fixes.json`, con tarifas editables en
`sdd/pricing.json`.

---

## FIX GATE — Bypass controlado

Cuando el problema **no puede esperar un ciclo SDD completo**, usar uno de estos prefijos en el mensaje al orquestador:

| Prefijo         | Cuándo usarlo                                               |
| --------------- | ----------------------------------------------------------- |
| `[HOTFIX]`      | Producción bloqueada, regresión crítica, dato corrupto      |
| `[BUGFIX]`      | Error confirmado en desarrollo o testing                    |
| `[FIX]`         | Alias genérico — el orquestador pedirá clasificar           |
| `[IMPROVEMENT]` | Mejora menor (UX, wording, performance puntual) out-of-spec |

El orquestador ejecutará `sdd/prompts/hotfix-bypass-gate.prompt.md`, que:

1. Recolecta justificación y datos del fix
2. Registra el fix en `sdd/fixes.json` con ID correlativo del autor (`FIX-[gh-user]-[seq]` o `FIX-[gh-user]-[spec-NNN]-[seq]`)
3. Crea o actualiza `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md` (o `sdd/fixes/` si es repo-level)
4. Autoriza al implementador a proceder

> ⚠️ El FIX GATE **no elimina la trazabilidad** — la simplifica. Todo fix queda registrado y el Reviewer lo evalúa al cerrar el ciclo.

**Con `profile: solo`** el FIX GATE se acorta (fuente: `sdd/dual-harness/rules/sdd-gates.md`
§ FIX GATE):

- Sin cuestionario: el actor completa `sdd/fixes.json` desde el pedido mismo y pregunta solo lo
  que no puede deducir.
- Documento del fix con template mínimo: problema · solución · archivos.
- Elegibilidad reducida a "no crea contratos ni entidades nuevas".
- Lo que **no** cambia: el registro en `fixes.json`, el `usage` del fix, el fragmento de contexto
  y `pnpm sdd:validate` en verde.

---

## Cómo generar una especificación

Una especificación define **QUÉ se debe construir** (no el cómo).

### 1. Crear y registrar la spec (estructura jerárquica v2.0)

```bash
# Crear directorio de spec:
mkdir -p sdd/specs/spec-[gh-user]-[NNN]-[slug]

# Crear archivo de spec dentro:
sdd/specs/spec-[gh-user]-[NNN]-[slug]/spec-[gh-user]-[NNN]-[slug].spec.md

# Crear estructura de ciclos:
mkdir -p sdd/specs/spec-[gh-user]-[NNN]-[slug]/cycles/cycle-01
mkdir -p sdd/specs/spec-[gh-user]-[NNN]-[slug]/fixes

# Registrar en sdd/specs/index.json (schema: sdd/schemas/specs-index.schema.json — append-only):
{
  "id": "spec-jdoe-003-nombre-del-modulo",
  "author": "jdoe",
  "slug": "nombre-del-modulo",
  "folder": "sdd/specs/spec-jdoe-003-nombre-del-modulo",
  "file": "sdd/specs/spec-jdoe-003-nombre-del-modulo/spec-jdoe-003-nombre-del-modulo.spec.md",
  "module": "nombre-del-modulo",
  "app": "apps/example-api",
  "status": "in-progress",
  "title": "Título descriptivo",
  "created_at": "2026-07-13",
  "completed_at": null,
  "depends_on": []
}

# Validar el registro:
pnpm sdd:validate
```

**Cambios respecto a v1.0:**

- La spec vive en una carpeta que contiene toda su jerarquía
- Los ciclos están anidados dentro de `cycles/` (reseteados por spec)
- Los fixes son archivos individuales en `fixes/` (trazabilidad por archivo)
- El contador `[NNN]` es per-developer, no global

### 2. Estructura de una spec

```markdown
# SPEC-[NNN]: [Título]

## Resumen Ejecutivo

Qué se construye, por qué y para quién.

## Contexto de Negocio

Problema que resuelve, usuarios afectados, impacto esperado.

## Requisitos Funcionales (RF)

- RF-1: Descripción
- RF-2: Descripción

## Requisitos No-Funcionales (RNF)

- RNF-1: Performance, seguridad, cobertura mínima, etc.

## Dependencias

Módulos previos completados y APIs externas requeridas.

## Criterios de Aceptación

Condiciones para que la spec se considere implementada.
```

Las specs creadas en el proyecto quedan como ejemplos reales en `sdd/specs/`.

---

## Ciclos SDD — Flujo completo

Un **ciclo** es un período de desarrollo (típicamente 1-2 semanas) que produce un incremento funcional y testeable.

### Artifacts de un ciclo

Cada ciclo genera estos archivos en `sdd/specs/spec-[author]-[NNN]-[slug]/cycles/cycle-[XX]/`:

| Artifact        | Generado por                              | Propósito                                                 |
| --------------- | ----------------------------------------- | --------------------------------------------------------- |
| `brief.yaml`    | Orquestador                               | Objetivo, alcance, dependencias, contexto para agentes    |
| `functional.md` | Funcional                                 | Historias de usuario (HU) y requisitos funcionales (RF)   |
| `planner.md`    | Planner                                   | Tareas técnicas (`TASK-[NNN]`) ordenadas por dependencia  |
| `architect.md`  | Arquitecto                                | Decisiones de diseño, schema, contratos de API            |
| `tasks.json`    | Planner (crea) / Implementadores (status) | Tasks canónicas del ciclo (`TASK-[NNN]`, schema estricto) |
| `cycle.json`    | Orquestador (inicio) / Reviewer (cierre)  | Estado del ciclo y reviewer_report final                  |

**Cambio v2.0:** Los ciclos ahora viven dentro de cada spec, no en una carpeta global. Esto permite que cada developer tenga sus propios ciclos 01, 02, 03… sin conflictos.

### Flujo de ejecución

```
[1] ORQUESTADOR
    Lee spec → valida SPEC GATE → crea brief.yaml + cycle.json (in-progress) → actualiza global.json
         │
         ▼
[2] FUNCIONAL ──────────────────────────────────────┐
    Lee brief.yaml → genera functional.md           │  (en paralelo)
         │                                          │
         ▼                                          ▼
[3] PLANNER                                [3] ARQUITECTO
    Lee brief + functional →               Lee brief + constituciones →
    genera planner.md →                    genera architect.md →
    crea cycle-XX/tasks.json               actualiza schema.json + api.json
    + regenera índice                      (status: "defined")
         │                                          │
         └──────────────┬───────────────────────────┘
                        ▼
         [GATE CHECK: ¿todos los artifacts listos?]
                        │ SI
                        ▼
[4] IMPLEMENTADOR BACKEND
    Lee cycle-XX/tasks.json + architect.md → implementa una task por vez
    Escribe código + tests → marca la task "done" en cycle-XX/tasks.json
    Actualiza api.json (status: "implemented") + rebuild-index + sdd:validate
                        │ (todas las tasks backend done)
                        ▼
[5] IMPLEMENTADOR FRONTEND
    Lee cycle-XX/tasks.json + api.json → implementa una task por vez
    Escribe componentes UI + tests → marca la task "done"
    Actualiza components.json + rebuild-index + sdd:validate
                        │ (todas las tasks frontend done)
                        ▼
[6] REVIEWER
    ⛔ VALIDATION GATE: pnpm sdd:validate ANTES y DESPUÉS del cierre
    Verifica artifacts + corre build/tests/lint
    Valida cumplimiento de RF y RNF (ca_results por CA-[NNN])
    Actualiza cycle.json (status: "completed" + reviewer_report)
    Mueve el módulo a completed_modules + cierra la spec en index.json
    Valida/absorbe los fixes del ciclo + CONTEXTO GATE
                        │
                        ▼
         [Ciclo completado → iniciar cycle-[XX+1] si aplica]
```

### Reglas del flujo

- **Los agentes 2 y 3 trabajan en paralelo** — Funcional, Planner y Arquitecto no dependen entre sí una vez que tienen el `brief.yaml`.
- **Backend va antes que Frontend** — el Implementador Frontend espera a que todas las tasks backend de las que depende estén `done`.
- **Un ciclo activo por spec** — dentro de una spec los ciclos son secuenciales (cycle-02 no abre hasta que cycle-01 esté `completed`); specs de distintos devs avanzan en paralelo.
- **Si una task falla**: el implementador aborta, revisa `planner.md`/`architect.md`, corrige y reintenta. Si no se resuelve en 2 intentos, escala al Reviewer.

---

## Agentes SDD

Cada agente tiene un rol fijo e invocación específica en el flujo:

| Agente                     | Archivo                          | Rol                                                                  | Genera / Actualiza                                                                     |
| -------------------------- | -------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Orquestador**            | `sdd-orchestrator.agent.md`      | Entrada, validación, briefs                                          | `brief.yaml`, `cycle.json`, `global.json`, `specs/index.json`, `fixes.json` (FIX GATE) |
| **Funcional**              | `sdd-functional.agent.md`        | Traducir spec a historias de usuario                                 | `functional.md`                                                                        |
| **Planner**                | `sdd-planner.agent.md`           | Descomponer HU en tareas técnicas                                    | `planner.md`, `cycles/cycle-XX/tasks.json` (+ índice)                                  |
| **Arquitecto**             | `sdd-architect.agent.md`         | Validar diseño, definir schema y API                                 | `architect.md`, `schema.json`, `api.json`                                              |
| **Implementador Backend**  | `sdd-implementor-back.agent.md`  | Desarrollar API/lógica (stack según constitution.md del subproyecto) | código en `apps/`, tasks del ciclo, `api.json`                                         |
| **Implementador Frontend** | `sdd-implementor-front.agent.md` | Desarrollar UI (stack según constitution.md del subproyecto)         | código en `apps/`, tasks del ciclo, `components.json`                                  |
| **Reviewer**               | `sdd-reviewer.agent.md`          | Validación final, cierre del ciclo                                   | `cycle.json`, `global.json`, `specs/index.json`, `fixes.json`, `context/**`            |
| **Steward** (fuera del ciclo) | `sdd-steward.agent.md`        | Conserje del kit: puerta de entrada, status, `update sdd`, ruteo     | ninguno — solo opera vía herramientas oficiales (`update sdd`, `setup:agents`, `harness idea`) |

> El orden de invocación es **obligatorio**. No se puede saltar ningún agente.

### Catálogo de skills por agente

Cada agente incluye una sección `## Skills disponibles` con las skills que debe leer antes de ejecutarse:

| Agente                     | Skills asignadas                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Orquestador**            | `sdd-orchestrator`, `sdd-file-structure`, `sdd-data-schemas`                                                 |
| **Funcional**              | `sdd-functional`, `sdd-file-structure`                                                                       |
| **Planner**                | `sdd-planner`, `sdd-file-structure`, `sdd-data-schemas`                                                      |
| **Arquitecto**             | `sdd-architect`, `generate-api-contract`, `generate-*` según stack, `sdd-data-schemas`, `sdd-file-structure` |
| **Implementador Backend**  | `sdd-implementor-back`, `generate-*` según stack (`constitution.md` del subproyecto), `sdd-data-schemas`     |
| **Implementador Frontend** | `sdd-implementor-front`, `generate-*` según stack (`constitution.md` del subproyecto), `sdd-data-schemas`    |
| **Reviewer**               | `sdd-reviewer`, `sdd-data-schemas`, `sdd-file-structure`                                                     |

---

## Skills SDD

Skills son micro-agentes especializados invocados con `/skill [nombre]`.

### Skills de orquestación SDD

| Skill                   | Propósito                                                                     |
| ----------------------- | ----------------------------------------------------------------------------- |
| `sdd-orchestrator`      | Validar specs, ejecutar gates, crear briefs                                   |
| `sdd-functional`        | Generar historias de usuario desde la spec                                    |
| `sdd-planner`           | Descomponer HU en tasks `TASK-[NNN]` estimadas                                |
| `sdd-architect`         | Validar diseño, definir schema y contratos de API                             |
| `sdd-file-structure`    | Naming, árboles de directorios y templates de todos los documentos de ciclo   |
| `sdd-data-schemas`      | Referencia campo-a-campo de cada registro JSON (subordinada a `sdd/schemas/`) |
| `sdd-implementor-back`  | Implementar tareas backend                                                    |
| `sdd-implementor-front` | Implementar tareas frontend                                                   |
| `sdd-reviewer`          | Validar calidad y cerrar ciclos                                               |

### Skills de workspace

| Skill               | Propósito                                                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `init-nx-workspace` | Lleva un repo de cero a la estructura canónica: Nx 23 + pnpm, globs `apps/* libs/* tools/*`, `.npmrc`, `.nxignore`, CI con pnpm y arnés dual. **El arnés instruye chequear el workspace al iniciar cualquier sesión** e invocarla si falta algo. |
| `scaffold-nx`       | Apps y libs nuevas en un workspace **ya montado** — generadores oficiales de Nx + overlay de convenciones SDD desde `sdd/templates/`. Siempre dentro de un ciclo SDD.                                                                            |

### Skills de herramientas (opcionales)

| Skill            | Propósito                                                                                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setup-graphify` | Instala el grafo de conocimiento del repo con un backend **gratuito** (Gemini free tier u Ollama local), valida el modelo con una medición real y construye el primer grafo. **Opt-in por dev** — nada del flujo SDD depende de él. |

### Skills de generación de código

> Catálogo **por stack** — el agente elige según la `constitution.md` del subproyecto,
> nunca por preferencia propia. Agregar una skill nueva al incorporar un stack nuevo.

| Skill                      | Propósito                                                          |
| -------------------------- | ------------------------------------------------------------------ |
| `generate-springboot-api`  | Genera módulo Spring Boot completo (controller/service/repo/tests) |
| `generate-api-contract`    | Genera contratos OpenAPI, DTOs y mappers                           |
| `generate-react-component` | Genera componente React con props tipadas y tests                  |
| `generate-nestjs-module`   | Genera módulo NestJS (reservado para futuros proyectos)            |
| `generate-prisma-schema`   | Genera schema Prisma (reservado para futuros proyectos)            |

---

## Artefactos del sistema

Los JSONs centrales son la fuente de verdad del estado del proyecto. Solo los agentes los modifican.

> ⛔ **Todos validan contra `sdd/schemas/*.schema.json`** (`additionalProperties: false`).
> Los ejemplos de abajo son ilustrativos — ante cualquier duda, **gana el schema**.
> Tras escribir en cualquiera: `pnpm sdd:validate`.

### global.json — Estado del proyecto

Responde: **¿Qué módulos están completados, en progreso o pendientes?**
(schema: `sdd/schemas/global.schema.json` — ya no existe `current_cycle` global: los ciclos son per-spec)

```json
{
  "$schema": "./schemas/global.schema.json",
  "project": "<nombre-del-proyecto>",
  "description": "...",
  "version": "1.0.0",
  "completed_modules": [
    {
      "module": "enrollment-request",
      "spec": "spec-jdoe-001-enrollment-request",
      "apps": ["apps/example-api"],
      "cycles_completed": 1,
      "completed_at": "2026-06-24",
      "description": "Qué hace este módulo (1-2 oraciones)"
    }
  ],
  "in_progress_modules": [],
  "pending_modules": [],
  "monorepo": {
    "tool": "Nx",
    "package_manager": "pnpm",
    "apps": {},
    "libs": {}
  }
}
```

**Quién lo actualiza:** Orquestador (inicio ciclo) / Reviewer (cierre ciclo o módulo).

### tasks.json — Índice de tareas + archivos per-cycle (v4.0)

Responde: **¿Qué tasks hay, en qué spec/ciclo y cuál es su estado?**

Las tasks canónicas viven en **`sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json`** (uno por ciclo,
schema `sdd/schemas/cycle-tasks.schema.json`). `sdd/tasks.json` es solo un **índice generado**:

```json
{
  "$schema": "./schemas/tasks-index.schema.json",
  "sdd_version": "4.0",
  "specs": {
    "spec-jdoe-001-user-onboarding": {
      "cycles": {
        "cycle-01": {
          "file": "sdd/specs/spec-jdoe-001-user-onboarding/cycles/cycle-01/tasks.json",
          "module": "user-onboarding",
          "apps": ["apps/example-api"],
          "status": "completed",
          "tasks_total": 8,
          "tasks_done": 8
        }
      }
    }
  }
}
```

**Quién lo actualiza:** Planner (crea el per-cycle), Implementadores (marcan `"done"` en el per-cycle),
Reviewer (cierra). El índice se regenera siempre con `pnpm sdd:rebuild-tasks-index` — **nunca a mano**.
Ventaja clave: cada dev escribe solo en el archivo de su ciclo → sin merge conflicts ni archivos gigantes.

### schema.json — Esquema de BD

Responde: **¿Qué tablas existen y en qué app?**
(schema: `sdd/schemas/db-schema.schema.json` — agrupado por **app-key**, entradas append/deprecate-only)

```json
{
  "$schema": "./schemas/db-schema.schema.json",
  "example-api": {
    "tables": {
      "enrollment_requests": {
        "module": "enrollment-request",
        "spec": "sdd/specs/spec-jdoe-001-enrollment-request",
        "status": "migrated",
        "created_in_cycle": 1,
        "updated_in_cycle": null,
        "migration_file": "V1__create_enrollment_requests_table.sql",
        "columns": {
          "id": {
            "type": "CHAR(36)",
            "constraints": ["PRIMARY KEY"],
            "notes": "UUID"
          }
        },
        "indexes": [
          {
            "name": "uk_request_id",
            "type": "UNIQUE",
            "columns": ["request_id"]
          }
        ],
        "changelog": []
      }
    }
  }
}
```

**Quién lo actualiza:** Arquitecto (`defined`) → Implementador Backend (`migrated`) → Reviewer (valida).

### api.json — Contratos de API

Responde: **¿Qué endpoints existen, en qué app, y qué esperan/retornan?**
(schema: `sdd/schemas/api.schema.json` — agrupado por **app-key**, IDs `EP-NNN` correlativos por app)

```json
{
  "$schema": "./schemas/api.schema.json",
  "example-api": {
    "endpoints": [
      {
        "id": "EP-001",
        "method": "POST",
        "path": "/example-api/services/trading/{clientId}/{accountId}/enrollment-requests",
        "module": "enrollment-request",
        "spec": "sdd/specs/spec-jdoe-001-enrollment-request",
        "status": "implemented",
        "created_in_cycle": 1,
        "updated_in_cycle": null,
        "description": "Solicitud de apertura de cuenta comitente",
        "path_params": ["clientId", "accountId"],
        "required_headers": ["Authorization", "Content-Type"],
        "request_body": { "action": "string (OPEN)" },
        "responses": { "201": "Solicitud creada", "400": "Body inválido" },
        "changelog": []
      }
    ]
  }
}
```

**Quién lo actualiza:** Arquitecto (`defined`) → Implementador Backend (`implemented`) → Reviewer (valida).

### components.json — Componentes frontend

Responde: **¿Qué componentes de UI fueron creados y qué endpoints consumen?**
(schema: `sdd/schemas/components.schema.json` — agrupado por **app-key**, IDs `COMP-NNN` correlativos)

```json
{
  "$schema": "./schemas/components.schema.json",
  "apps/example-app": {
    "components": [
      {
        "id": "COMP-001",
        "name": "UserProfileForm",
        "type": "component",
        "module": "trading-orders",
        "spec": "sdd/specs/spec-jdoe-001-user-onboarding",
        "path": "src/components/UserProfileForm.tsx",
        "status": "implemented",
        "created_in_cycle": 1,
        "updated_in_cycle": null,
        "description": "Formulario de alta de orden",
        "consumes": ["EP-001"],
        "created_at": "2026-07-13",
        "changelog": []
      }
    ]
  }
}
```

**Quién lo actualiza:** Arquitecto (`defined`) → Implementador Frontend (`implemented`) → Reviewer (valida).

### fixes.json — Registry de fixes

Responde: **¿Qué cambios se hicieron fuera del flujo SDD normal?**

Cada fix (schema: `sdd/schemas/fixes.schema.json`) tiene: `id` (`FIX-[gh-user]-[seq]`), `author`, `spec_id`,
`fix_document`, `type` (`HOTFIX|BUGFIX|FIX|IMPROVEMENT`), `severity`, `title`, `description`, `justification`,
`estimation_hours`, `related_modules`, `affected_files`, `test_reference`, `cycle`, fechas y
`status` (`pending → in-progress → implemented → validated | absorbed`). También acepta un
**`usage` opcional** (`tokens_in`/`tokens_out`/`duration_minutes`/`model_tier`, con namespace de
proveedor, ej. `claude/opus`) que el dev registra al cerrarlo — el prompt del FIX GATE lo pide y
alimenta la vista Costos del visor junto con `cycle.json → metrics.usage`.

**Quién lo actualiza:** Orquestador (FIX GATE) → desarrollador (`implemented` al terminar) → Reviewer (`validated`/`absorbed` al cerrar el ciclo).

---

## Reglas estrictas

### 1. Orden obligatorio de agentes

```
ORQUESTADOR
    ↓
FUNCIONAL ──── (paralelo) ──── PLANNER ──── (paralelo) ──── ARQUITECTO
    ↓
[GATE CHECK: brief + functional + planner + architect + tasks.json + cycle.json listos]
    ↓
IMPLEMENTADOR BACKEND (task por task)
    ↓ (todas las tasks backend done)
IMPLEMENTADOR FRONTEND (task por task)
    ↓ (todas las tasks frontend done)
REVIEWER (VALIDATION GATE + cierre ciclo)
```

### 2. Quién puede modificar qué

| Archivo                                             | Solo pueden modificar                                              |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| `sdd/global.json`                                   | Orquestador, Reviewer                                              |
| `cycles/cycle-[XX]/tasks.json` (per-cycle)          | Planner, Implementadores, Reviewer                                 |
| `sdd/tasks.json` (índice)                           | Generado — `pnpm sdd:rebuild-tasks-index`                          |
| `sdd/catalog.json` (manifest)                       | Generado — `pnpm sdd:rebuild-catalog`                              |
| `sdd/schemas/*.schema.json`                         | **Manual** — cambio de schema = decisión de equipo                 |
| `sdd/schema.json`                                   | Arquitecto, Reviewer                                               |
| `sdd/api.json`                                      | Arquitecto, Implementador Backend, Reviewer                        |
| `sdd/components.json`                               | Implementador Frontend, Reviewer                                   |
| `sdd/fixes.json`                                    | Orquestador                                                        |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/*.md`        | Agente responsable de cada artifact                                |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/artifacts/`  | Cualquier agente (docs de apoyo)                                   |
| `sdd/specs/`                                        | **Manual** — cualquiera puede editar specs                         |
| `sdd/context/**/updates/*.md`                       | Reviewer (cierre de ciclo) / dev (cierre de fix) — **append-only** |
| `sdd/context/[apps\|libs\|tools]/*/constitution.md` | **Solo la consolidación** (un actor) — nunca durante un ciclo      |
| `sdd/context/constitution.md` (global)              | Reviewer — **solo la fila propia** de la tabla                     |
| `sdd/docs/`                                         | Ciclo SDD (es una app) — visor, no registro                        |
| `sdd/prompts/`                                      | **Manual** — cualquiera puede editar prompts                       |

### 3. Convención de nombrado (v2.0 — Multi-developer)

| Elemento         | Formato antigua             | Formato nuevo (v2.0)                                            | Ejemplo                                                               |
| ---------------- | --------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| Spec             | `spec-[NNN]-[slug].spec.md` | `spec-[author]-[NNN]-[slug]/spec-[author]-[NNN]-[slug].spec.md` | `spec-jdoe-001-user-onboarding/spec-jdoe-001-user-onboarding.spec.md` |
| ID de spec       | `SPEC-NNN`                  | `SPEC-[author]-[NNN]`                                           | `SPEC-jdoe-001`                                                       |
| Carpeta de ciclo | `cycle-[XX]`                | `cycles/cycle-[XX]`                                             | `cycles/cycle-01`                                                     |
| Task             | `TASK-BE/FE-[CYCLE]-[NNN]`  | `TASK-[NNN]` (scope: el `tasks.json` del ciclo)                 | `TASK-001`, `TASK-002`                                                |
| Fix repository   | `FIX-[NNN]`                 | `FIX-[author]-[seq]`                                            | `FIX-jdoe-001`                                                        |
| Fix spec-level   | (no existía)                | `fix-[author]-[spec-num]-[seq].md`                              | `fix-jdoe-001-001.md`                                                 |

**Contador `[NNN]` es PER-DEVELOPER (reseteado):**

- jdoe: `spec-jdoe-001`, `spec-jdoe-002`, `spec-jdoe-003`...
- asmith: `spec-asmith-001`, `spec-asmith-002`...
- Otro dev: `spec-xxxuser-001`...

### 4. Código sin comentarios

> ⛔ **No se escriben comentarios en el código de implementación.**

La documentación no vive en comentarios: vive en los documentos SDD (spec, functional, planner,
architect, constitutions). Un comentario que repite lo que el SDD ya documenta es duplicación
que además se desactualiza — y cuesta tokens dos veces: al escribirlo y en **cada** lectura
posterior del archivo.

La claridad se logra con **nombres declarativos** (`propagateAccountStatusToTradingApi()` en vez
de `process()` + comentario) y **modularización** (una función larga con bloques `// paso 1:` son
en realidad N funciones con nombre propio). El impulso de comentar es señal de refactor.

Prohibido: comentarios narrativos, código muerto comentado y `// TODO` — un TODO real es una task
o un fix registrado en SDD.

**Únicas excepciones** (una línea, en inglés): una restricción que el código no puede expresar
(workaround con link al issue, regla de negocio contra-intuitiva con referencia a su spec) y
anotaciones exigidas por framework/tooling (Swagger, Lombok, decorators, Javadoc si el linter del
subproyecto lo exige).

El sdd-reviewer lo chequea al cerrar el ciclo: un PR con comentarios fuera de esas excepciones
recibe request de cambios.

### 5. Selección de modelo y esfuerzo

Antes de encarar cualquier tarea, elegir explícitamente el **tier** más barato que la cumpla
con calidad — para el trabajo propio y para **cada** subagente que se dispare. La regla aplica
a los tres proveedores que soporta el arnés; cada uno elige el modelo a su manera, pero todos
mapean a los mismos cuatro tiers abstractos:

| Tier          | Tipo de tarea                                                        | Claude (`model`/`effort`) | Gemini (modelo/`thinking`)         | Copilot (picker/agents)              |
| ------------- | ---------------------------------------------------------------------- | -------------------------- | ------------------------------------ | --------------------------------------- |
| **económico** | Lectura de estado, formateo, edición mecánica, grep dirigido           | `haiku` / `low`–`medium`   | Flash-Lite o Flash / `minimal`–`low` | modelo económico (ej. `gpt-5-mini`)     |
| **estándar**  | Implementación estándar (una task acotada), tests                      | `sonnet` / `medium`        | Flash / `medium`                     | modelo estándar (ej. `claude-sonnet`)   |
| **alto**      | Arquitectura, decisiones cross-cutting, orquestación, review de cierre | `opus` / `high`–`xhigh`    | Pro / `low`–`high`                   | modelo alto (ej. `claude-opus`)         |
| **máximo**    | Solo el paso más difícil (verify adversarial, judge)                   | `fable` / `xhigh`–`max`    | Pro / `high`                         | el tier más alto habilitado             |

Agentes del ciclo: implementores → **estándar**; orquestador, arquitecto y reviewer → **alto**.
Nunca disparar un fan-out entero en el tier más caro por defecto. Los nombres concretos de
modelo de Copilot/Gemini no son estables — se editan en el `model:` de cada agente
(`sdd/agents/*.agent.md`) y en `sdd/pricing.json`. El enforcement difiere por proveedor (Claude
Code fija `model`/`effort` programáticamente, Copilot pinnea `model:` en los agentes SDD,
Antigravity le pide al usuario cambiar el dropdown, Gemini CLI elige el modelo por sesión) —
detalle completo en `sdd/dual-harness/{CLAUDE,AGENTS,GEMINI}.md` → sección ⚙️.

### 6. graphify — opcional

El grafo de conocimiento del repo (`graphify-out/`) es **opt-in por dev**: está gitignoreado, no
viaja con el repo y **nada del flujo SDD depende de él**. Si existe, consultarlo antes de
`grep`/`Read` a ciegas ahorra tokens; si no existe, se trabaja con normalidad. Para habilitarlo,
la skill `setup-graphify` guía la instalación con un backend gratuito.

### 7. rtk — activo por defecto

[rtk](https://github.com/rtk-ai/rtk) (Apache-2.0, binario en Rust) comprime la salida de los
comandos de shell que leen los agentes (`git`, `pnpm`, `vitest`, `tsc`, `eslint`, `ls`, `grep`,
`docker`…): reporta **60–90% menos texto**. Solo afecta comandos de shell — la lectura de
archivos de los agentes queda intacta. Viene **activo por defecto desde el kit v0.12.0**, sin
acción del dev.

- **Interruptor**: `sdd/tools.json` (`rtk.enabled`, `rtk.auto_install`, `rtk.version` opcional).
  Es un archivo del proyecto: `harness update sdd` **no lo pisa**.
- **Scripts**: `pnpm sdd:rtk` instala/repara (hooks + binario), `pnpm sdd:rtk -- --status`
  reporta estado, `-- --disable` / `-- --enable` apagan y prenden.
- **Hooks**: `.claude/settings.json` (`PreToolUse` sobre `Bash`) y `.gemini/settings.json`
  (`BeforeTool` sobre `run_shell_command`) — versionados, así que el equipo los recibe con un
  `git pull`. Copilot y Antigravity todavía no tienen hook y funcionan igual sin él. El kit
  instala **solo** este hook: cualquier otro `PreToolUse` (por ejemplo `block-no-verify` de un
  plugin de terceros) viene de la configuración o los plugins del usuario, no de `sdd/`.
- **Best effort**: si el binario falta o el hook falla, el comando pasa sin comprimir; nunca
  bloquea. El binario se instala fuera del repo (`~/.local/bin`) y su historial es **por
  máquina**, así que el ahorro es el de quien corre el visor.
- **Números**: `rtk gain --project`, o `pnpm sdd:docs` → Costos → pestaña **RTK**. Son
  estimaciones (bytes ÷ 4), no facturación.

---

## Referencia rápida

### Archivos clave del sistema

| Archivo                         | Propósito                                             |
| ------------------------------- | ----------------------------------------------------- |
| `sdd/global.json`               | Estado central: módulos y ciclos                      |
| `sdd/context/constitution.md`   | Reglas y stack del proyecto                           |
| `sdd/context/context_prompt.md` | Entry point para agentes                              |
| `sdd/specs/index.json`          | Registro de especificaciones                          |
| `cycles/cycle-[XX]/tasks.json`  | Tasks canónicas del ciclo                             |
| `sdd/tasks.json`                | Índice de tasks (generado)                            |
| `sdd/catalog.json`              | Manifest de contenido para el visor (generado)        |
| `sdd/schemas/`                  | JSON Schemas estrictos de todos los registros         |
| `sdd/schema.json`               | Esquema de base de datos                              |
| `sdd/api.json`                  | Contratos de API                                      |
| `sdd/components.json`           | Componentes frontend                                  |
| `sdd/fixes.json`                | Registry de fixes (FIX GATE)                          |
| `sdd/agents/`                   | **Definiciones centralizadas de agentes (v2.0)**      |
| `sdd/dual-harness/rules/`       | Capa 2: gates (`sdd-gates.md`) y telemetría (`sdd-model-budget.md`) canónicos |
| `sdd/scripts/spec-gate.mjs`     | SPEC GATE como comando (`pnpm sdd:gate`)              |
| `sdd/context/**/updates/`       | Fragmentos aditivos de contexto (anti merge-conflict) |
| `sdd/docs/`                     | Visor SDD en vanilla JS (`pnpm sdd:docs`)             |
| `sdd/tools.json`                | Interruptor de rtk (dato del usuario)                 |

### Configuración de visibilidad (v3.0)

**Fuentes únicas de verdad → expuestas a herramientas mediante symlinks:**

```bash
# Fuentes:
sdd/agents/
sdd/skills/
sdd/prompts/
sdd/dual-harness/   ← AGENTS.md, CLAUDE.md y GEMINI.md de la raíz (+ rules/ para Antigravity)

# Claude Code (.claude/):
.claude/agents/    → ../sdd/agents/
.claude/skills/    → ../sdd/skills/
.claude/prompts/   → ../sdd/prompts/

# GitHub Copilot (.github/):
.github/agents/    → ../sdd/agents/
.github/skills/sdd-*/        → symlinks individuales (preserva skills Nx)
.github/skills/generate-*/   → symlinks individuales
.github/prompts/*.prompt.md  → symlinks individuales (preserva prompts Copilot)

# Antigravity / Gemini CLI:
.agents/rules/sdd-*.md        → symlinks individuales a sdd/dual-harness/rules/
.agents/skills/<skill>/       → symlinks individuales a sdd/skills/<skill>/
.agent/workflows/<prompt>.md  → symlinks individuales a sdd/prompts/<prompt>.prompt.md
.gemini/commands/<prompt>.toml → wrapper generado desde sdd/prompts/<prompt>.prompt.md
.gemini/settings.json         → fusionado (context.fileName suma GEMINI.md/AGENTS.md)

# Raíz del repo:
AGENTS.md          → sdd/dual-harness/AGENTS.md
CLAUDE.md          → sdd/dual-harness/CLAUDE.md
GEMINI.md          → sdd/dual-harness/GEMINI.md
.github/copilot-instructions.md → archivo REAL, sembrado desde sdd/dual-harness/ si falta (nunca se pisa)

# Setup automático (regenera todos los symlinks, idempotente):
pnpm setup:agents     # bash sdd/scripts/setup-agents.sh (Unix)
                      # PowerShell sdd/scripts/setup-agents.ps1 (Windows)
```

### Prompts disponibles

| Prompt                                              | Cuándo usarlo                                                |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `sdd/prompts/start-sdd-cycle.prompt.md`             | Para iniciar un nuevo ciclo SDD                              |
| `sdd/prompts/check-spec-before-implement.prompt.md` | Para verificar el SPEC GATE                                  |
| `sdd/prompts/hotfix-bypass-gate.prompt.md`          | Para registrar un fix fuera del ciclo                        |
| `sdd/prompts/review-cycle.prompt.md`                | Para que el Reviewer cierre un ciclo (incluye CONTEXTO GATE) |

### Verificación de estado

```bash
# Módulos en progreso
cat sdd/global.json | grep -A 5 "in_progress_modules"

# Tasks pendientes de un ciclo
cat sdd/specs/<spec-id>/cycles/cycle-01/tasks.json | grep -B2 '"status": "pending"'

# SPEC GATE A (¿se puede abrir un ciclo?) y GATE B (¿se puede escribir código?)
pnpm sdd:gate <spec-id|slug>
pnpm sdd:gate <spec-id|slug> cycle-01

# Validar TODOS los registros SDD contra sus schemas
pnpm sdd:validate

# Estado de rtk (interruptor, binario y hooks)
pnpm sdd:rtk -- --status

# Regenerar el índice de tasks
pnpm sdd:rebuild-tasks-index

# Regenerar el manifest de contenido (tras agregar/quitar agente, skill, prompt o schema)
pnpm sdd:rebuild-catalog

# Fixes registrados
cat sdd/fixes.json | grep -E '"id"|"status"|"title"'

# Abrir el visor SDD (lee los registros en vivo, cero build)
pnpm sdd:docs        # → http://127.0.0.1:4310/sdd/docs/

# Fragmentos de contexto pendientes de consolidar (>=5 dispara consolidacion)
ls sdd/context/*/*/updates/*.md 2>/dev/null | wc -l
```

---

## Changelog

### v5.6 (2026-10-07) — sdd-mod: el SDD dentro de Claude Code (opcional)

- ✅ **Mod de Claude Code en el kit** (kit v0.16.0): `sdd/skills/sdd-mod/`. Claude Code lo carga
  solo desde `.claude/skills/` cuando la carpeta del proyecto es de confianza — sin marketplace
  ni instalación aparte. Viene **apagado**: `pnpm sdd:mod -- --enable` lo prende.
- ✅ **Franja sobre el prompt** con el ciclo en curso (spec · ciclo · flow · tareas hechas) y
  **`/sdd`** con el detalle de tareas y fixes abiertos.
- ✅ **SPEC GATE aplicado a las ediciones**: sin un ciclo `in-progress` ni un fix abierto,
  `Edit`/`Write`/`NotebookEdit` sobre código se rechazan (`gate: "block"`, default) o solo avisan
  (`gate: "warn"`). `sdd/`, las carpetas de los arneses y el markdown raíz quedan libres; si el mod
  no puede leer `sdd/`, deja pasar (la red sigue siendo `sdd:validate`). No cubre comandos de shell.
- ✅ **Interruptor en `sdd/tools.json → claude_mod`** (schema estricto, protegido del `update
  sdd`), releído en cada turno. Nueva entrada en el steward: Playbook 7.
- ✅ **Los demás arneses no cambian**: `setup-agents` enlaza el mod solo en `.claude/`; Copilot,
  Antigravity y Gemini CLI siguen las mismas reglas desde sus archivos.

### v5.5 (2026-09-06) — rtk activo por defecto, Costos en 4 pestañas con gráficos

- ✅ **rtk viene activo por defecto** (kit v0.12.0, cero acción del dev): comprime la salida de
  los comandos de shell antes de que el agente la lea — 60–90% menos texto — sin tocar la
  lectura de archivos. `harness init`, `configure sdd`, `update sdd` y `pnpm setup:agents` lo
  dejan operativo; un clone nuevo lo consigue en el `postinstall`.
- ✅ **Interruptor propio del proyecto**: `sdd/tools.json` (`rtk.enabled`, `rtk.auto_install`,
  `rtk.version`), con schema estricto en `sdd/schemas/tools.schema.json` y protegido del
  `update sdd`. Se opera con `pnpm sdd:rtk -- --status|--enable|--disable`.
- ✅ **Integración best effort**: el puente `sdd/scripts/rtk-hook.mjs` (hook `PreToolUse` de
  Claude Code y `BeforeTool` de Gemini CLI) nunca bloquea un comando — ante cualquier falla lo
  deja pasar sin comprimir. El binario se instala fuera del repo y jamás se corre `rtk init`.
- ✅ **Reglas para los agentes** en `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`: la reescritura es
  transparente (nunca prefijar con `rtk` a mano), `rtk proxy <cmd>` devuelve la salida cruda
  cuando la compresión esconde algo, y apagar rtk es decisión del dev.
- ✅ **Dashboard de Costos en 4 pestañas** con gráficos y tablas scrolleables: **General**,
  **Specs**, **Fixes** y **RTK** (comandos comprimidos, tokens leídos vs ahorrados, evolución y
  ahorro por familia de comando). Los números de RTK son estimaciones y salen del historial
  local de la máquina que corre `pnpm sdd:docs`.
- ✅ **Nueva entrada en el steward**: Playbook 5 (herramientas del kit) para estado, apagado a
  pedido, reinstalación y redes bloqueadas (`auto_install: false`).

### v5.4 (2026-08-19) — Telemetría obligatoria con estimación declarada, `skipped` como resuelto

Un ciclo real cerrado con GitHub Copilot no registró telemetría: `by_tier` volvió con
claves `claude/*` únicamente. La causa no era de Copilot — **ningún arnés le da al reviewer
un contador que pueda leer**: `/stats` (Gemini CLI) y el reporte de sesión (Claude Code) son
comandos del cliente que un agente no puede ejecutar, y Copilot/Antigravity no exponen
contador. Con un protocolo que decía *"ante la duda, omitir el campo"*, omitir era la salida
racional para cualquier agente y en cualquier proveedor.

- ✅ **Se eliminó la cláusula de escape.** "Ante la duda, omitir" pasó a ser "sin contador se
  estima" en toda la cadena: regla `sdd-model-budget.md`, `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`,
  skill del reviewer, `sdd-hermes`, prompts `review-cycle` y `hotfix-bypass-gate`. Declarar
  proveedor y modelo dejó de ser opcional: el modelo siempre se conoce.
- ✅ **⛔ TELEMETRÍA GATE** en `sdd-reviewer.agent.md` (paso 11 del cierre), con tabla de
  fuente por arnés y protocolo de estimación. Antes de esta versión el archivo del agente
  reviewer no mencionaba telemetría (solo la skill, marcada "best-effort"); los implementadores
  tampoco — ahora registran `usage` por task.
- ✅ **`approx` y `source` en los tres bloques `usage`** (`metrics.usage` y cada entrada de
  `by_tier`, por task y por fix). `source`: `session-report` · `stats-command` · `api-usage` ·
  `declared-estimate`. Un ciclo que mezcla un proveedor medido con uno estimado queda honesto
  porque el marcador vive también por entrada de `by_tier`.
- ✅ **El visor muestra el estimado en vez de esconderlo**: "Consumo por proveedor" suma la
  columna **Origen** con `medido` / `estimado` / `parcialmente estimado`, en ambos idiomas.
- ✅ **`skipped` es una task resuelta, no pendiente.** Nuevo `metrics.tasks_skipped` (opcional);
  el ciclo cierra cuando `tasks_completed + tasks_skipped == tasks_total`. Antes se le pedía al
  reviewer marcar *todas* las tasks como `done`, así que una task legítimamente omitida lo
  obligaba a mentir o a romper el gate.
- ✅ **`pnpm sdd:validate` avisa, nunca falla**, cuando un ciclo cerrado no tiene `metrics.usage`
  o lo tiene sin `by_tier`, y cuando hay `skipped` sin reflejar en `tasks_skipped`. Los avisos
  se agregan en una sola línea.
- ✅ **`pricing.json` se mergea, no se reemplaza**: el visor superpone tu `pricing.json`
  personalizado sobre las tarifas del kit, así los modelos que agregue una versión nueva quedan
  tarifados en vez de caer al tier asumido.
- ✅ **Antigravity registra bajo `gemini/*`** (corre modelos Gemini), documentado en schemas,
  regla y docs — para no fragmentar su costo del de Gemini.
- ✅ **Retrocompatible**: todos los campos nuevos son opcionales y aditivos, nada pasó a
  `required` y ningún check se volvió más estricto. Verificado contra una instalación en
  producción (21 `cycle.json`, 19 `tasks.json`, 62 fixes): validan en verde y un `update sdd`
  simulado sobre esos datos dio **0 errores nuevos y 1 warning agregado**.

### v5.3 (2026-08-18) — Arnés multi-proveedor (Gemini/Antigravity), costos por proveedor, visor bilingüe

El arnés era dual (Claude Code + GitHub Copilot) y su regla de modelo/esfuerzo, la telemetría
de costos y el visor eran Claude-only. Esta versión hace de Gemini (Antigravity IDE + Gemini
CLI) un proveedor de primera clase y generaliza todo el pipeline de costos.

- ✅ **Superficies nuevas del arnés** (creadas por `pnpm setup:agents`): `GEMINI.md` en la raíz
  (`sdd/dual-harness/GEMINI.md`, absorbido igual que AGENTS/CLAUDE en `configure sdd`); rules
  condensadas y siempre activas para Antigravity en `.agents/rules/` (fuente:
  `sdd/dual-harness/rules/`, cada una bajo el cap de 12k caracteres); skills SDD expuestas en
  `.agents/skills/` (estándar SKILL.md compartido: Antigravity + Gemini CLI); prompts SDD como
  workflows de Antigravity en `.agent/workflows/` y como comandos TOML generados para Gemini CLI
  en `.gemini/commands/`; `.gemini/settings.json` fusionado para que Gemini CLI también lea
  `AGENTS.md`. Incluye el espejo en PowerShell; los archivos del usuario nunca se pisan.
- ✅ **Regla de modelo/esfuerzo por proveedor**: la sección ⚙️ de los tres archivos del arnés
  ahora tiene una única tabla canónica de tiers (económico/estándar/alto/máximo) con las
  equivalencias de Claude (`model`/`effort`), Gemini (modelo/`thinking`) y Copilot, más el
  enforcement propio de cada proveedor — programático en Claude Code, `model:` pinneado en los 7
  agentes SDD para Copilot (alias Claude; mapear una vez a los modelos del mismo tier de tu
  org), chequeo-y-pedido explícito del dropdown en Antigravity, modelo por sesión + `/stats` en
  Gemini CLI.
- ✅ **Telemetría de costos con namespace de proveedor**: `metrics.usage.by_tier`,
  `usage.model_tier` y las claves de `pricing.json` ahora usan la forma `proveedor/modelo`
  (`claude/opus`, `gemini/pro`, `copilot/gpt-5-mini`); los tiers legacy sin namespace siguen
  siendo válidos y se leen como `claude/*`. `pricing.json` trae tarifas por proveedor (tiers de
  la API de Gemini, tarifas por token del billing por uso de Copilot vía AI Credits).
- ✅ **Los fixes se suman al registro de costos**: `usage` opcional (tokens, duración,
  model_tier) por fix en `sdd/fixes.json`, pedido al cerrar el fix por el prompt del FIX GATE y
  por el checklist del sdd-reviewer.
- ✅ **Visor bilingüe**: ES/EN con toggle de idioma persistido (localStorage +
  `navigator.language` por defecto; la pestaña de docs sigue el idioma activo dentro de
  `sdd/documentation/{es,en}/`); la vista Costos suma agregación por proveedor y una tabla de
  costo de fixes, además de la comparativa existente.
- ✅ **sdd-hermes desacoplado de tiers concretos**: los presupuestos por fase ahora usan los
  tiers abstractos y referencian la tabla canónica; la sección de loop-automation cubre los
  cuatro arneses (Claude Code, Copilot, Gemini CLI, Antigravity) y el cierre de ciclo exige
  telemetría con namespace de proveedor.

### v5.2 (2026-08-17) — Skills en `SKILL.md` mayúscula (estándar Agent Skills)

- 🔧 **Las 18 skills vuelven a `SKILL.md` en MAYÚSCULA.** La "corrección" de v5.0 que las pasó
  a minúscula arregló los 404 del visor pero rompió lo más importante: Claude Code sólo
  descubre `.claude/skills/*/SKILL.md` (estándar Agent Skills) y en Linux el case es exacto —
  en instalaciones reales las skills quedaban invisibles para el agente. Ahora git versiona
  `SKILL.md` y **todos** los resolvedores (catálogo, visor, scripts, docs) usan el mismo case,
  que era el fix correcto desde el principio.
- `harness update sdd` migra instalaciones existentes: los `skill.md` en minúscula sin
  modificar se eliminan como archivos stale del kit y entran los `SKILL.md` nuevos.

### v5.1 (2026-08-06) — Bootstrap del workspace, pnpm-only y nombre de-hardcodeado

- ✅ **Skill nueva `init-nx-workspace`**: lleva un repo de cero a la estructura canónica
  (Nx 23 + pnpm, globs `apps/* libs/* tools/*`, `.npmrc`, `.nxignore`, CI con pnpm, arnés dual) y
  cierra con un checklist verificable comando por comando. El arnés dual instruye a los agentes a
  **chequear el workspace al iniciar cualquier sesión** e invocarla si falta algo — el chequeo es un
  solo `ls`, así que no cuesta contexto cuando el repo está sano.
- ✅ **`sdd/templates/nx-workspace/` al día**: `nx` y `@nx/*` en **23.1.1**. Las versiones del
  ecosistema NO se tomaron del "latest" del registry sino de los constants de los propios
  generadores de Nx (`@nx/js`, `@nx/react`, `@nx/vite`, `@nx/eslint`) — por eso TypeScript queda en
  `~6.0.3` y no en 7.x: es lo que Nx 23 instala y testea. Nuevo `npmrc` para copiar como `.npmrc`,
  `onlyBuiltDependencies` en `pnpm-workspace.yaml` (pnpm 10+ bloquea lifecycle scripts), y
  `ajv` + `ajv-formats` agregados — sin ellos `pnpm sdd:validate` ni arranca.
- ✅ **pnpm es el único package manager**: `packageManager` pinneado, `.npmrc` con
  `package-manager-strict`, y `.gitignore` bloqueando `package-lock.json`/`yarn.lock`. Nx infiere el
  PM del lockfile, así que un lockfile rival cambia en silencio cómo se resuelven las tasks.
- ✅ **Nombre y descripción con una sola fuente de verdad**: `sdd/global.json` → `project` /
  `description`. Ningún documento del kit los hardcodea (antes estaban repetidos en 8 lugares) y
  `pnpm sdd:validate` **falla** si el valor se filtra a la superficie portable. Es lo que hace que
  copiar `sdd/` a otro repo no requiera editar nada.
- 🔧 **`sdd/templates` fuera del project graph**: Nx los registraba como proyectos reales
  (`example-app`, `example-api`, `shared-lib`) con executors no instalados → `nx run-many` reventaba
  en el primer run de CI. Se resuelve con `.nxignore`.
- 🔧 **Contextos de subproyecto sin placeholder**: se eliminó `context/apps/example-api/` y sus filas
  en las tablas globales. Las listas de apps/libs/tools ahora reflejan **solo** proyectos Nx reales.

### v5.0 (2026-08-05) — Contexto aditivo, visor portable y reglas de costo

- ✅ **CONTEXTO GATE aditivo**: durante un ciclo/fix ya no se editan los
  `constitution.md`/`context_prompt.md` del subproyecto. Cada cierre escribe un fragmento
  append-only en `context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-XX.md`,
  cuyo nombre lleva el spec-id (y con él el gh-user) → **único por construcción**, el merge
  conflict es imposible. Los archivos base solo los toca una **consolidación de un solo actor**.
  Lectura de contexto = base + fragmentos en orden de nombre.
- ✅ **Código sin comentarios**: regla nueva con excepciones acotadas,
  verificada por el sdd-reviewer al cerrar el ciclo.
- ✅ **Selección de modelo y esfuerzo**: tabla de tiers obligatoria antes de
  cada tarea y para cada subagente.
- ✅ **`sdd/docs` — visor portable**: reemplaza a `apps/docs`
  (React + Vite + Nx, eliminada). App en JS vanilla de 5 archivos, **cero dependencias, cero
  build**, fuentes vendorizadas (funciona offline), server con solo `node:*` restringido a
  `/sdd/**`. Se levanta con `pnpm sdd:docs` y lee los registros en vivo — sin snapshot. Ahora
  copiar `sdd/` lleva la metodología **y** su visor.
- ✅ **Nueva categoría de contexto `tools/`**: para herramientas del repo que no son app ni lib
  (primer caso: `sdd-docs`).
- ✅ **graphify pasa a opt-in**: antes estaba declarado OBLIGATORIO, pero
  `graphify-out/` está gitignoreado y en un clon nuevo no existe — la regla era incumplible al
  clonar. Ahora es condicional al artefacto, con la skill `setup-graphify` como instalador con
  backend gratuito (Gemini free tier u Ollama local).
- ✅ **Skills nuevas**: `sdd-data-schemas` y `setup-graphify` (15 en total).
- 🔧 **Corrección de documentación peligrosa**: este README afirmaba que el archivo de cada skill
  es `SKILL.md` en mayúscula "porque en Linux el case importa". Es al revés: git versiona los 14
  en **minúscula** `skill.md`, y seguir la indicación anterior rompía la resolución en Linux —
  ya había dejado 4 skills inaccesibles en GitHub Pages.

### v4.0 (2026-07-13) — Per-cycle tasks + Strict JSON Schemas

- ✅ **tasks.json particionado**: las tasks canónicas viven en `cycles/cycle-XX/tasks.json` (uno por ciclo); `sdd/tasks.json` pasa a ser un índice liviano generado (`pnpm sdd:rebuild-tasks-index`)
- ✅ **Tipado estricto**: JSON Schema (`additionalProperties: false`) para los 9 registros en `sdd/schemas/`; cada archivo declara `$schema` (validación en vivo en el editor)
- ✅ **Validador**: `pnpm sdd:validate` — schemas + reglas cruzadas (índice ↔ per-cycle, index.json ↔ global.json ↔ cycle.json, docs existentes, IDs únicos)
- ✅ **Gate en CI y en el Reviewer**: `.github/workflows/sdd-validate.yml` corre `pnpm sdd:validate` en cada PR que toque `sdd/**`; el sdd-reviewer lo ejecuta antes de revisar y después de cerrar (VALIDATION GATE) — no puede existir un SDD mal estructurado
- ✅ **Regla de raíz de ciclo**: pasa de 5 a 6 archivos (se suma `tasks.json`)
- ✅ **Convención única de task ID**: `TASK-[NNN]` con scope en el archivo del ciclo
- ✅ **Datos normalizados**: 7 variantes de cycle.json unificadas, fixes.json alineado al schema real (status `implemented`/`validated`/`absorbed`), estados sincronizados entre registros, fix docs faltantes reconstruidos
- ✅ `schema-fixes.json` reemplazado por `sdd/schemas/fixes.schema.json`
- ✅ **Agentes y skills auditados**: templates de cycle.json/tasks alineados al schema v4.0, agentes genéricos de stack (el stack vive en `constitution.md` del subproyecto y en las skills `generate-*`), skills de rol con protocolo experto (planner, functional, implementadores), VALIDATION GATE en el Reviewer
- ✅ **`ci-monitor-subagent` eliminado** — era tooling de Nx Cloud, ajeno al flujo SDD
- ✅ **Dual-harness auditado**: skills renombradas a `SKILL.md` (estándar Agent Skills — el case importa en Linux/cloud), frontmatter completado, `.claude/commands` → prompts como slash commands, `.github/copilot-instructions.md` real (los lectores server-side de GitHub no siguen symlinks)

### v3.1 (2026-06-29) — Dual-harness, Skills catalog & HOW-TO guide

- ✅ **dual-harness**: `sdd/dual-harness/AGENTS.md` y `CLAUDE.md` como fuente de verdad; los de la raíz son ahora symlinks
- ✅ **Skills por agente**: cada agente incluye sección `## Skills disponibles` con tabla de skills relevantes para su rol
- ✅ **setup-agents mejorado**: ahora regenera symlinks existentes (idempotente) y reemplaza directorios reales por symlinks
- ✅ **HOW-TO-USE-SDD.md**: guía paso a paso para desarrolladores (setup, flujo normal, FIX GATE, cheat sheet)

### v3.0 (2026-06-29) — Artifacts, CONTEXTO GATE & Skills/Prompts visibility

- ✅ **Regla de artifacts**: solo 5 archivos en raíz del ciclo; extras van a `cycle-[XX]/artifacts/` indexados en `cycle.json["artifacts"]`
- ✅ **CONTEXTO GATE**: nueva sección obligatoria de cierre — el Reviewer NO puede marcar `completed` sin actualizar los 4 archivos de contexto
- ✅ **tasks.json restructurado**: jerarquía `specs → cycles → tasks` (antes era `cycles → tasks` global)
- ✅ **Skills y prompts visibles**: `.claude/skills`, `.claude/prompts`, symlinks individuales en `.github/skills` y `.github/prompts`
- ✅ **setup-agents.sh**: nuevo script Bash para macOS/Linux (antes era no-op en Unix)
- ✅ **setup-agents.ps1**: ampliado para configurar skills y prompts en Windows

### v2.0 (2026-06-26) — Multi-Developer SDD Architecture

- ✅ **Specs jerárquicas**: Cada spec en `spec-{author}-{id}/` con ciclos anidados
- ✅ **Agentes centralizados**: Fuente única en `sdd/agents/` con symlinks a herramientas
- ✅ **Fixes modulares**: Archivos individuales por fix con trazabilidad completa
- ✅ **Setup cross-platform**: Script PowerShell para Windows + Unix
- ✅ **Contador per-developer**: Evita conflictos de numeración global
- ✅ **Portabilidad**: `sdd/` es completamente modular y reutilizable

### v1.1 (2026-06-23) — Initial SDD Structure

- Estructura base con specs, cycles, agents, skills y prompts
- SPEC GATE y FIX GATE
- Agentes especializados y skills de generación de código

---

**Última actualización:** 2026-08-18
**SDD Version:** 5.5
**Proyecto:** ver `sdd/global.json` → `project`
