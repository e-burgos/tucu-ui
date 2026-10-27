# SDD — Spec-Driven Development

> **Spec-Driven Development (SDD)** is the methodology that guides all development in this monorepo.
>
> Not a single line of code is written without going through a rigorous cycle of specification, functional design, technical planning and architecture validation.

---

## Table of contents

1. [What is SDD?](#what-is-sdd)
2. [Structure of the SDD system](#structure-of-the-sdd-system)
3. [SPEC GATE — The golden rule](#spec-gate--the-golden-rule)
4. [CONTEXTO GATE — Mandatory close](#contexto-gate--mandatory-close)
5. [MEMORIA GATE — Self-learning across sessions](#memoria-gate--self-learning-across-sessions)
6. [FIX GATE — Controlled bypass](#fix-gate--controlled-bypass)
7. [How to generate a specification](#how-to-generate-a-specification)
8. [SDD cycles — Full flow](#sdd-cycles--full-flow)
9. [SDD agents](#sdd-agents)
10. [SDD skills](#sdd-skills)
11. [System artifacts](#system-artifacts)
12. [Strict rules](#strict-rules)
13. [Quick reference](#quick-reference)

---

## What is SDD?

**SDD (Spec-Driven Development)** is a methodology that structures software development into **design cycles followed by implementation**.

Before writing code, a team of **specialized agents** reviews the specification, generates functional requirements, plans technical tasks, validates the architectural design, and only then authorizes implementation.

### Key principles

1. **Specification first:** Every piece of functionality must be documented in a formal spec before coding.
2. **Collaborative design:** The functional, planner and architect agents work in parallel to validate feasibility.
3. **Full traceability:** Every implementation task can be traced back to the original specification.
4. **Iterative cycles:** Work is split into 1-2 week cycles, each with documented artifacts.
5. **Agentic automation:** Specialized agents generate documentation, tasks and validations.

> 💡 **Want to see a complete SDD repo besides this one?**
> [e-burgos/sdd-harness-examples](https://github.com/e-burgos/sdd-harness-examples) has one
> real example per installation mode — Nx monorepo, standalone app, and an existing project
> that adopted SDD — regenerated from npm on every release. They serve as a browsable
> reference of how this same system looks in other contexts.

---

## Structure of the SDD system

```
sdd/
├── README.md                          ← Documentation index (es/en)
├── documentation/                     ← This document + HOW-TO + INSTALL, in es/ and en/
├── global.json                        ← Central project state (modules, stack)
├── tasks.json                         ← Tasks INDEX (generated — detail lives in each cycle)
├── schemas/                           ← Strict JSON Schemas for ALL registries (machine source)
│   └── tools.schema.json              ← Shape of sdd/tools.json (rtk switch)
├── schema.json                        ← Database schema (updated by the Architect)
├── api.json                           ← Implemented API contracts
├── components.json                    ← Frontend components created
├── fixes.json                         ← Registry of out-of-SDD-flow fixes (see FIX GATE)
├── catalog.json                       ← GENERATED manifest of agents/skills/prompts/schemas (pnpm sdd:rebuild-catalog)
│
├── specs/                             ← Technical specifications (hierarchical per-spec structure)
│   ├── index.json                     ← Centralized spec registry
│   │
│   ├── spec-[author]-[NNN]-[slug]/    ← One folder per spec
│   │   ├── spec-[author]-[NNN]-[slug].spec.md
│   │   │
│   │   ├── cycles/
│   │   │   ├── cycle-01/
│   │   │   │   ├── brief.yaml         ← Cycle summary (Orchestrator)
│   │   │   │   ├── functional.md      ← User stories (Functional)
│   │   │   │   ├── planner.md         ← Technical tasks (Planner)
│   │   │   │   ├── architect.md       ← Design decisions (Architect)
│   │   │   │   ├── plan.md            ← `lite` flow only: replaces the four documents above
│   │   │   │   ├── tasks.json         ← The cycle's CANONICAL tasks (Planner/Implementors)
│   │   │   │   ├── cycle.json         ← Cycle state — REQUIRED before implementing
│   │   │   │   └── artifacts/         ← Supporting docs (optional)
│   │   │   │       ├── explore.md     ← Existing-code exploration
│   │   │   │       ├── design.md      ← Diagrams or detailed designs
│   │   │   │       └── endpoint-examples.md ← API usage examples
│   │   │   └── cycle-02/
│   │   │
│   │   └── fixes/
│   │       └── fix-author-nnn-001.md
│
├── fixes/                             ← Repository-level fixes
│   └── fix-jdoe-001.md
│
├── context/                           ← Entry points for agents
│   ├── constitution.md                ← Global constitution (subproject snapshot table)
│   ├── context_prompt.md              ← Global project context
│   ├── apps/                          ← One directory per Nx-generated app
│   │   └── [name]/
│   │       ├── constitution.md        ← BASE — only consolidation touches it
│   │       ├── context_prompt.md      ← BASE — only consolidation touches it
│   │       └── updates/               ← ADDITIVE fragments per cycle/fix (see CONTEXTO GATE)
│   │           └── YYYY-MM-DD-[spec-id]-cycle-XX.md
│   ├── libs/                          ← Same per lib
│   └── tools/                         ← Repo tools that are neither app nor lib
│
├── memory/                            ← Project memory (see MEMORIA GATE)
│   ├── lessons.md                     ← DISTILLED lessons — read at the start of every session (cap 120 lines)
│   └── journal/                       ← Episodic entries per cycle/fix — targeted grep only
│       └── YYYY-MM-DD-[spec-id]-cycle-XX.md
│
├── pricing.json                       ← Costs dashboard rates (traditional hourly + $/MTok per tier)
├── tools.json                         ← rtk switch (user data — update sdd never touches it)
│
├── agents/                            ← SDD agent definitions (centralized)
│   ├── sdd-orchestrator.agent.md
│   ├── sdd-functional.agent.md
│   ├── sdd-planner.agent.md
│   ├── sdd-architect.agent.md
│   ├── sdd-implementor-back.agent.md
│   ├── sdd-implementor-front.agent.md
│   ├── sdd-reviewer.agent.md
│   └── sdd-steward.agent.md          ← Kit concierge: status, update sdd, entry routing
│
├── scripts/                           ← Cross-platform automation
│   ├── setup-agents.sh                ← Bash script (macOS / Linux)
│   ├── setup-agents.ps1               ← PowerShell script (Windows)
│   ├── validate-sdd.mjs               ← Registry validator (pnpm sdd:validate)
│   ├── spec-gate.mjs                  ← Answers SPEC GATE A and B (pnpm sdd:gate)
│   ├── rebuild-tasks-index.mjs        ← Regenerates the tasks index (pnpm sdd:rebuild-tasks-index)
│   ├── rebuild-catalog.mjs            ← Regenerates the viewer manifest (pnpm sdd:rebuild-catalog)
│   ├── setup-rtk.mjs                  ← Installs/merges the rtk hooks (pnpm sdd:rtk)
│   ├── rtk-hook.mjs                   ← Bridge the hooks call; on any failure the command passes through
│   ├── rtk-common.mjs                 ← rtk helpers (pinned version, binary resolution)
│   └── rule-zero-hook.mjs             ← SessionStart hook (Claude Code): re-injects rule zero (model/effort/context)
│
├── templates/                         ← Scaffolding blueprints (NOT Nx projects)
│   ├── nx-workspace/                  ← Root config: nx.json, package.json, npmrc, pnpm-workspace
│   ├── apps/react-app/                ← React + Vite app
│   ├── apps/java-api/                 ← Spring Boot app under Nx (Nx does not generate it)
│   └── libs/ts-lib/                   ← Shared TypeScript lib
│
├── dual-harness/                      ← LAYER 1 — source of truth for the root AGENTS.md, CLAUDE.md and GEMINI.md
│   ├── AGENTS.md                      ← Instructions for GitHub Copilot Agents
│   ├── CLAUDE.md                      ← Instructions for Claude Code
│   ├── GEMINI.md                      ← Instructions for Antigravity IDE and Gemini CLI
│   ├── copilot-instructions.md        ← Seed for .github/copilot-instructions.md (copied by setup:agents)
│   └── rules/                         ← LAYER 2 — read on demand; also the always-on Antigravity rules
│       ├── sdd-gates.md               ← CANONICAL SOURCE for the gates (SPEC GATE A/B, flows, FIX GATE)
│       ├── sdd-model-budget.md        ← CANONICAL SOURCE for the telemetry contract
│       └── sdd-code-style.md          ← Comment-free code
│
├── prompts/                           ← Entry prompts for agents
│   ├── start-sdd-cycle.prompt.md
│   ├── check-spec-before-implement.prompt.md
│   ├── hotfix-bypass-gate.prompt.md
│   └── review-cycle.prompt.md
│
├── docs/                              ← SDD viewer — vanilla JS app, zero deps, zero build
│   ├── index.html                     ← `pnpm sdd:docs` → http://127.0.0.1:4310/sdd/docs/
│   ├── app.js                         ← Hash router + the 15 views
│   ├── styles.css
│   ├── serve.mjs                      ← Server using only `node:*`, restricted to /sdd/**
│   └── fonts/                         ← Vendored woff2 (no CDN, works offline)
│
└── skills/                            ← Skills (specialized micro-agents) — `SKILL.md` file
    ├── sdd-steward/                   ← Kit concierge — entry point (/sdd-steward)
    ├── sdd-orchestrator/
    ├── sdd-functional/
    ├── sdd-planner/
    ├── sdd-architect/
    ├── sdd-file-structure/
    ├── sdd-data-schemas/
    ├── sdd-implementor-back/
    ├── sdd-implementor-front/
    ├── sdd-reviewer/
    ├── init-nx-workspace/             ← Workspace bootstrap (checked at session start)
    ├── scaffold-nx/                   ← New apps/libs in an already-assembled workspace
    ├── setup-graphify/                ← Opt-in installer for the knowledge graph
    ├── generate-springboot-api/
    ├── generate-api-contract/
    ├── generate-react-component/
    ├── generate-nestjs-module/
    └── generate-prisma-schema/
```

> `sdd/docs/` is **portable on purpose**: it is not an Nx project (no `project.json` or
> `package.json`), has no dependencies or build step, and reads the `sdd/` registries live.
> Copying the `sdd/` folder into another repo carries the methodology **and** its viewer.

### Cycle document rule (INVIOLABLE)

> The only files allowed at the **root** of `cycle-[XX]/` are exactly these 7 (the whitelist
> `pnpm sdd:validate` enforces), and which of them apply depends on the `flow`:

| File            | Generated by                                      | Flow           |
| --------------- | ------------------------------------------------- | -------------- |
| `brief.yaml`    | sdd-orchestrator                                  | full · reduced |
| `functional.md` | sdd-functional                                    | full           |
| `planner.md`    | sdd-planner                                       | full           |
| `architect.md`  | sdd-architect                                     | full           |
| `plan.md`       | the cycle's single actor                          | lite           |
| `tasks.json`    | sdd-planner (creates) / sdd-implementor-\* (status) | all            |
| `cycle.json`    | sdd-orchestrator (open) / sdd-reviewer (close)    | all            |

**Any additional supporting document** (code exploration, diagrams, API examples, detailed tasks, etc.) must go in:

```
sdd/specs/{spec-id}/cycles/cycle-[XX]/artifacts/<name>.md
```

And be indexed in `cycle.json` under the `"artifacts": [...]` key.

---

### Visibility configuration for agents, skills and prompts

Every SDD artifact is centralized in `sdd/` and made visible to multiple tools through symlinks:

```
sdd/agents/        ← Single source of truth
sdd/skills/        ← Single source of truth
sdd/prompts/       ← Single source of truth
sdd/dual-harness/  ← Single source of truth (root AGENTS.md, CLAUDE.md and GEMINI.md)

.claude/agents/          → symlink to sdd/agents/      (Claude Code — subagents)
.claude/skills/          → symlink to sdd/skills/      (Claude Code — Agent Skills, SKILL.md)
.claude/commands/        → symlink to sdd/prompts/     (Claude Code — slash commands)
.claude/prompts/         → symlink to sdd/prompts/     (manual reference)

.github/agents/          → symlink to sdd/agents/      (GitHub Copilot)
.github/skills/sdd-*/    → individual symlinks to sdd/skills/sdd-*/    (GitHub Copilot)
.github/skills/generate-*/ → individual symlinks to sdd/skills/generate-*/
.github/prompts/*.prompt.md → individual symlinks to sdd/prompts/*.prompt.md

.agents/rules/sdd-*.md          → individual symlinks to sdd/dual-harness/rules/       (Antigravity — condensed always-on rules)
.agents/skills/<skill>/         → individual symlinks to sdd/skills/<skill>/           (Antigravity + Gemini CLI — shared SKILL.md standard)
.agent/workflows/<prompt>.md    → individual symlinks to sdd/prompts/<prompt>.prompt.md (Antigravity — exposed as /<prompt> workflows)
.gemini/commands/<prompt>.toml  → GENERATED wrapper around sdd/prompts/<prompt>.prompt.md (Gemini CLI — exposed as /<prompt> commands)
.gemini/settings.json           → MERGED, never overwritten (adds GEMINI.md/AGENTS.md to context.fileName)

AGENTS.md (root)         → symlink to sdd/dual-harness/AGENTS.md
CLAUDE.md  (root)        → symlink to sdd/dual-harness/CLAUDE.md
GEMINI.md  (root)        → symlink to sdd/dual-harness/GEMINI.md
.github/copilot-instructions.md → REAL FILE (not a symlink) — seeded by setup:agents from sdd/dual-harness/copilot-instructions.md if missing
```

> `.github/skills/` and `.github/prompts/` use individual symlinks so as to **not overwrite** existing Nx and Copilot files.  
> `AGENTS.md`, `CLAUDE.md` and `GEMINI.md` at the root are symlinks: **always** edit in `sdd/dual-harness/`.
> `.github/copilot-instructions.md` is a real file on purpose: GitHub's server-side readers
> (Copilot code review) do not follow symlinks. `pnpm setup:agents` **seeds** it from
> `sdd/dual-harness/copilot-instructions.md` **only if it does not exist**; an existing file is
> never overwritten (from then on it belongs to the project). It only contains pointers — the
> detail lives in dual-harness.
> `.gemini/commands/*.toml` are **generated**, not symlinks — TOML has no equivalent to a
> Markdown include, so `setup:agents` regenerates a thin wrapper around each `sdd/prompts/*.prompt.md`
> on every run; any command file without the generator marker is left untouched. `.gemini/settings.json`
> is merged the same way: only its `context.fileName` list is touched, never the rest of the file.

**Verified compatibility:**

| Tool                              | What it reads                                                                                                                            | Status         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Claude Code (local)               | `CLAUDE.md`, `.claude/agents/*.agent.md`, `.claude/skills/*/SKILL.md`, `.claude/commands/`                                               | ✅             |
| Copilot coding agent (cloud)      | `AGENTS.md` (+ `CLAUDE.md` fallback), `.github/agents/*.agent.md`, `.github/skills/*/SKILL.md` — clones on Linux, symlinks resolve       | ✅             |
| VS Code Copilot Chat              | `.github/prompts/*.prompt.md`, custom agents, Agent Skills                                                                               | ✅             |
| Copilot code review (server-side) | `.github/copilot-instructions.md` (real file)                                                                                            | ✅             |
| Antigravity IDE                   | `GEMINI.md`, `.agents/rules/*.md`, `.agents/skills/*/SKILL.md`, `.agent/workflows/*.md` (as `/<prompt>` workflows)                       | ✅             |
| Gemini CLI                        | `GEMINI.md` (+ `AGENTS.md`, via the merged `.gemini/settings.json`), `.agents/skills/*/SKILL.md`, `.gemini/commands/*.toml` (as `/<prompt>` commands) | ✅ |
| Windows without Developer Mode    | git checkout leaves the symlinks as text files → run `pnpm setup:agents` (creates junctions)                                             | ⚠️ mandatory   |

> ⛔ Each skill's file is named **`SKILL.md` in UPPERCASE** — the Agent Skills standard that
> Claude Code requires: on Linux (case-sensitive) a lowercase `.claude/skills/*/skill.md` is
> **not discovered** and the skills are invisible to the agent. Git versions the files in
> uppercase (`git ls-files sdd/skills` is the authority) and ALL code resolving them (viewer,
> catalog, scripts) uses `SKILL.md` — the case must match on both sides. On macOS
> (`core.ignorecase=true`) any case appears to work: do not trust that, always verify on
> Linux/CI.

**Automatic setup (once after cloning):**

```bash
pnpm setup:agents   # macOS/Linux: bash sdd/scripts/setup-agents.sh
                    # Windows:     PowerShell sdd/scripts/setup-agents.ps1
```

This approach guarantees:

- ✅ A single source of truth — DRY principle
- ✅ No duplication between `.claude/`, `.github/` and `.agents/`/`.agent/`/`.gemini/`
- ✅ All three providers see the same agents, skills and prompts
- ✅ Portable: copying `sdd/` to another project works without changes

---

## SPEC GATE — The golden rule

> ⛔ **Canonical source: `sdd/dual-harness/rules/sdd-gates.md`.** This is the summary: if the
> gate changes, it changes in that rule. The checklist is not answered by reading files by hand —
> a script answers it.

**Invariants — they hold in EVERY flow and EVERY profile:**

1. The spec exists and is registered in `sdd/specs/index.json`.
2. The module is in `sdd/global.json` (`pending_modules` to open, `in_progress_modules` to implement).
3. `cycle.json` exists with `status: "in-progress"` **before the first line of code**.
4. `tasks.json` exists with tasks, and no task moves to `done` without its `usage`.

The gate has **two moments**, and both are run as a command:

```bash
pnpm sdd:gate <spec-id|slug>            # GATE A — can a cycle be opened? (sdd-orchestrator)
pnpm sdd:gate <spec-id|slug> cycle-XX   # GATE B — can code be written? (whoever implements)
pnpm sdd:gate <spec-id|slug> --json     # same answer, structured for agents
```

The script prints one line per condition (✔/✘) and ends in `APPROVED` or `BLOCKED`
(exit `0` when it passes, `1` when blocked, `2` on a usage error). **It writes nothing:** it only
answers. Paste its output as the gate report.

**GATE A — opening a cycle**

| #   | Condition                                                                     |
| --- | ----------------------------------------------------------------------------- |
| A1  | Spec registered in `specs/index.json` and its `.spec.md` exists                |
| A2  | Module in `pending_modules` (or `in_progress_modules` for a later cycle)       |
| A3  | No other cycle of that spec is `in-progress`                                   |
| A4  | Its `depends_on` are `completed`                                               |
| A5  | The spec is neither `completed` nor `cancelled`                                |

`APPROVED` in A also prints the next `cycle-XX`, the suggested flow and the active profile. Only
then does the orchestrator create `cycle.json` (`status: "in-progress"`, `flow`, `metrics` with
`usage.by_agent: []`), move the module to `in_progress_modules` and, if it is `cycle-01`, move the
spec from `draft` to `in-progress`. Only the reviewer later moves it to `status: "completed"`.

**GATE B — implementation**

| #   | Condition                                                                                            |
| --- | ---------------------------------------------------------------------------------------------------- |
| B1  | `cycle.json` exists with `status: "in-progress"`                                                       |
| B2  | Module in `in_progress_modules` of `global.json`                                                       |
| B3  | The cycle's `tasks.json` with at least one task                                                        |
| B4  | Documents of the `flow`: full → brief/functional/planner/architect · reduced → brief · lite → plan.md |
| B5  | `constitution.md` for every subproject in `cycle.json → apps[]`                                         |

**`BLOCKED` → zero lines of code** until what the script points at is completed.

### Cycle flow — full · reduced · lite

| `flow`    | Who                                                              | Documents in `cycle-XX/` (besides `cycle.json` + `tasks.json`) | When                                                        |
| --------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- |
| `full`    | One role per document + implementors + reviewer                  | `brief.yaml`, `functional.md`, `planner.md`, `architect.md`      | Teams; specs others consume; new contracts                  |
| `reduced` | The same roles, without user stories                             | `brief.yaml` (planner/architect optional)                        | Structural refactor with no functional change               |
| `lite`    | **A single actor** wearing three hats: opens, implements, closes | `plan.md`                                                        | Solo dev or a `[LITE]` request; nothing another subproject consumes |

The flow is decided **once, when the cycle opens**, and is written to `cycle.json → flow` and
`tasks.json → flow` (it is not changed afterwards):

- `sdd/global.json → profile` (optional): `team` (default) opens `full`; `solo` opens `lite`.
- Prefix in the request: `[LITE]` forces `lite`, `[FULL]` forces `full`. **The prefix wins.**
- **Exceptions** that go back to `full` even with the `solo` profile: the spec declares contracts
  another subproject consumes (new tables or endpoints), or it has dependents (`depends_on` from
  other specs).
- A `lite` cycle that created tables or endpoints anyway leaves a `pnpm sdd:validate` **warning**:
  the next cycle of that spec opens `full`.
- The **sdd-steward** changes the profile at the dev's request (`/sdd-steward switch me to the solo
  profile`); no agent changes it on its own. Cycles already open keep their `flow`.

In `lite`, `plan.md` replaces the four documents — template in
`sdd/skills/sdd-file-structure/SKILL.md` §3.8: objective · stories · tasks in prose · technical
decisions, the last one **mandatory** if the cycle touches `schema.json`, `api.json` or
`components.json`. `tasks.json` may carry `user_stories: []`. Telemetry is kept: `usage` on every
task plus **one** entry in `cycle.json → metrics.usage.by_agent[]` with `agent: "orchestrator"`,
`label: "solo"` covering plan + review. The close keeps CONTEXTO GATE, MEMORIA GATE and
`pnpm sdd:validate` green: nothing of the close is cut.

### New naming convention (v2.0)

From now on, **each developer works in their own spec namespace**, avoiding conflicts:

| Element            | Old format                     | New format                                                                 | Example                                                               |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Spec**           | `spec-001-xyz.spec.md`         | `spec-{gh-user}-{NNN}-{slug}/spec-{gh-user}-{NNN}-{slug}.spec.md`          | `spec-jdoe-001-user-onboarding/spec-jdoe-001-user-onboarding.spec.md` |
| **Cycle**          | `sdd/cycles/cycle-01/`         | `sdd/specs/spec-{gh-user}-{NNN}-{slug}/cycles/cycle-01/`                   | `sdd/specs/spec-jdoe-001-user-onboarding/cycles/cycle-01/`            |
| **Spec-level fix** | `sdd/cycles/cycle-XX/fixes.md` | `sdd/specs/spec-{gh-user}-{NNN}-{slug}/fixes/fix-{gh-user}-{nnn}-{seq}.md` | `sdd/specs/spec-jdoe-001-user-onboarding/fixes/fix-jdoe-001-001.md`   |
| **NNN counter**    | Global (001, 002, 003…)        | Per developer (each dev resets)                                            | jdoe: 001, 002, 003… asmith: 001, 002…                                |

**Advantages:**

- ✅ Multi-developer without numbering conflicts
- ✅ Each spec is an autonomous project (contains its cycle-01, cycle-02, etc.)
- ✅ Better hierarchical organization in the repository
- ✅ Easier search by author

```bash
# Run the SPEC GATE (A without a cycle, B with one):
pnpm sdd:gate <spec-id|slug> [cycle-XX]

# GATE B step by step:
sdd/prompts/check-spec-before-implement.prompt.md

# Start a new cycle (steps per flow):
sdd/prompts/start-sdd-cycle.prompt.md
```

---

## CONTEXTO GATE — Mandatory close (ADDITIVE)

> ⛔ **`cycle.json` CANNOT have `status: "completed"` if the context is stale.**

On closing **any cycle**, the sdd-reviewer writes an **additive fragment** — it does not edit
the subproject's base files:

```
1. sdd/context/[apps|libs|tools]/[name]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md
   (repo-level fixes: updates/YYYY-MM-DD-fix-[gh-user]-[seq].md)
2. sdd/context/constitution.md      → only its own row in the snapshot table (section 3)
3. sdd/context/context_prompt.md    → new row only if an app/lib/tool was created
```

### Why additive

When several devs work different specs on the same subproject, they all used to edit the same
`constitution.md`/`context_prompt.md` when closing their cycle → **guaranteed merge
conflicts**, made worse by the `> Última actualización:` line everyone touched. The fragment's
name includes the spec-id (which carries the gh-user), so **it is unique by construction** and
the conflict is impossible, not merely "easy to resolve".

### The 3 operations

| Operation                                                                                      | Who                                                                                                                   | When        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- |
| **Write** the fragment (only the delta)                                                        | reviewer on cycle close, or dev on fix close                                                                          | every close |
| **Read** the context = base + `updates/*.md` in name order                                     | any agent                                                                                                             | always      |
| **Consolidate**: merge fragments into the bases, update the header, delete the fragments       | **a single actor**: orchestrator when opening a new cycle on that subproject, or reviewer with ≥5 accumulated fragments | periodic    |

> ⛔ During a cycle/fix the subproject's `constitution.md` and `context_prompt.md` are **NEVER**
> edited, nor its `> Última actualización:` line — that line only changes during consolidation,
> and it is the main conflict magnet. Consolidation goes in a dedicated commit
> (`chore(sdd): consolidate context updates for [name]`) and never in parallel with an open cycle.
>
> The validator accepts the consolidated state: if a closed cycle's fragment no longer exists,
> `pnpm sdd:validate` considers the CONTEXTO GATE satisfied when the subproject's base
> `context_prompt.md` header shows `Fecha:` ≥ the cycle's `completed_at` (only consolidation
> touches that header).

### Fragment template

```markdown
# [spec-id] cycle-[XX] — [YYYY-MM-DD]

## Estado → what got implemented / what state the subproject is left in

## Estructura → new or changed packages/modules/patterns

## Dependencias → new libraries or services it consumes/exposes

## Qué sigue → pending items the next cycle must know
```

Empty sections are omitted. The fragment is **short and only the delta** — it never copies from
the base. If the cycle resolved something the base declares "pending", note it as
`resuelve: <section>` so consolidation removes it.

### Freshness criterion

The current context = base + fragments. It is considered **stale** (= cycle not closable) if:

- **No fragment exists in `updates/` for the cycle being closed**
- The base+fragments set describes packages that do not match the real code
- It mentions as "pending" functionality already implemented without a fragment correcting it
- It is missing dependencies or patterns that do exist in the code

**Removal rule** (applies during consolidation): if a section no longer reflects reality
→ remove it. The context never carries obsolete information.

Full rules: `sdd/agents/sdd-reviewer.agent.md` → "Actualización de contexto".

---

## MEMORIA GATE — Self-learning across sessions

The context records **what the system is**; the memory records **what we learned** working on
it. Without it every session repeats the same mistakes and re-pays the same discovery in
tokens. Two layers with asymmetric read cost by design:

| Layer | When it is read | When it is written |
| --- | --- | --- |
| `sdd/memory/lessons.md` | **In full, at the start of every session** (cap 120 lines) | Only during distillation (single actor: the orchestrator) |
| `sdd/memory/journal/` | Never whole — targeted grep | On cycle/fix close, **only if there was a real lesson** |

- **Anti-noise filter:** before writing, ask *"would this change a future agent's
  behavior?"*. If not, it is not written.
- **Distillation:** with ≥5 entries in `journal/`, the orchestrator merges each one into a
  line of `lessons.md` (Process / Technique / Cost) and deletes what it distilled.
  `pnpm sdd:validate` warns when that is pending.
- Journal naming is identical to the context fragments → unique by construction,
  no merge conflicts. Full rule: the dual-harness 🧠 section.

Related: on closing each cycle the reviewer records the **usage telemetry**
(`cycle.json → metrics.usage`: tokens per provider/tier via `by_tier`, minutes) that
feeds the viewer's **Costs** view (`pnpm sdd:docs`) — agentic vs traditional-estimation
comparison across all three providers, plus a fixes cost table built from any `usage`
recorded in `sdd/fixes.json`, with rates editable in `sdd/pricing.json`.

---

## FIX GATE — Controlled bypass

When the problem **cannot wait for a full SDD cycle**, use one of these prefixes in the message to the orchestrator:

| Prefix          | When to use it                                                |
| --------------- | ------------------------------------------------------------- |
| `[HOTFIX]`      | Production blocked, critical regression, corrupt data         |
| `[BUGFIX]`      | Confirmed error in development or testing                     |
| `[FIX]`         | Generic alias — the orchestrator will ask to classify         |
| `[IMPROVEMENT]` | Minor improvement (UX, wording, isolated performance) out-of-spec |

The orchestrator will execute `sdd/prompts/hotfix-bypass-gate.prompt.md`, which:

1. Collects the fix's justification and data
2. Registers the fix in `sdd/fixes.json` with the author's sequential ID (`FIX-[gh-user]-[seq]` or `FIX-[gh-user]-[spec-NNN]-[seq]`)
3. Creates or updates `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md` (or `sdd/fixes/` if repo-level)
4. Authorizes the implementor to proceed

> ⚠️ The FIX GATE **does not remove traceability** — it simplifies it. Every fix is registered and the Reviewer evaluates it on cycle close.

**With `profile: solo`** the FIX GATE is shortened (source: `sdd/dual-harness/rules/sdd-gates.md`
§ FIX GATE):

- No questionnaire: the actor fills `sdd/fixes.json` from the request itself and only asks what
  cannot be deduced.
- The fix document uses the minimal template: problem · solution · files.
- Eligibility is reduced to "creates no new contracts or entities".
- What does **not** change: the `fixes.json` registration, the fix's `usage`, the context fragment
  and `pnpm sdd:validate` green.

---

## How to generate a specification

A specification defines **WHAT must be built** (not the how).

### 1. Create and register the spec (hierarchical v2.0 structure)

```bash
# Create the spec directory:
mkdir -p sdd/specs/spec-[gh-user]-[NNN]-[slug]

# Create the spec file inside:
sdd/specs/spec-[gh-user]-[NNN]-[slug]/spec-[gh-user]-[NNN]-[slug].spec.md

# Create the cycle structure:
mkdir -p sdd/specs/spec-[gh-user]-[NNN]-[slug]/cycles/cycle-01
mkdir -p sdd/specs/spec-[gh-user]-[NNN]-[slug]/fixes

# Register in sdd/specs/index.json (schema: sdd/schemas/specs-index.schema.json — append-only):
{
  "id": "spec-jdoe-003-module-name",
  "author": "jdoe",
  "slug": "module-name",
  "folder": "sdd/specs/spec-jdoe-003-module-name",
  "file": "sdd/specs/spec-jdoe-003-module-name/spec-jdoe-003-module-name.spec.md",
  "module": "module-name",
  "app": "apps/example-api",
  "status": "in-progress",
  "title": "Descriptive title",
  "created_at": "2026-07-13",
  "completed_at": null,
  "depends_on": []
}

# Validate the registry:
pnpm sdd:validate
```

**Changes from v1.0:**

- The spec lives in a folder containing its whole hierarchy
- Cycles are nested inside `cycles/` (reset per spec)
- Fixes are individual files in `fixes/` (per-file traceability)
- The `[NNN]` counter is per-developer, not global

### 2. Structure of a spec

```markdown
# SPEC-[NNN]: [Title]

## Executive Summary

What is being built, why and for whom.

## Business Context

Problem it solves, affected users, expected impact.

## Functional Requirements (RF)

- RF-1: Description
- RF-2: Description

## Non-Functional Requirements (RNF)

- RNF-1: Performance, security, minimum coverage, etc.

## Dependencies

Previously completed modules and required external APIs.

## Acceptance Criteria

Conditions for the spec to be considered implemented.
```

Specs created in the project remain as real examples in `sdd/specs/`.

---

## SDD cycles — Full flow

A **cycle** is a development period (typically 1-2 weeks) that produces a functional, testable increment.

### Artifacts of a cycle

Each cycle generates these files in `sdd/specs/spec-[author]-[NNN]-[slug]/cycles/cycle-[XX]/`:

| Artifact        | Generated by                              | Purpose                                                    |
| --------------- | ----------------------------------------- | ---------------------------------------------------------- |
| `brief.yaml`    | Orchestrator                              | Goal, scope, dependencies, context for agents              |
| `functional.md` | Functional                                | User stories (HU) and functional requirements (RF)         |
| `planner.md`    | Planner                                   | Technical tasks (`TASK-[NNN]`) ordered by dependency       |
| `architect.md`  | Architect                                 | Design decisions, schema, API contracts                    |
| `tasks.json`    | Planner (creates) / Implementors (status) | The cycle's canonical tasks (`TASK-[NNN]`, strict schema)  |
| `cycle.json`    | Orchestrator (open) / Reviewer (close)    | Cycle state and final reviewer_report                      |

**v2.0 change:** Cycles now live inside each spec, not in a global folder. This lets each developer have their own cycles 01, 02, 03… without conflicts.

### Execution flow

```
[1] ORCHESTRATOR
    Reads spec → validates SPEC GATE → creates brief.yaml + cycle.json (in-progress) → updates global.json
         │
         ▼
[2] FUNCTIONAL ─────────────────────────────────────┐
    Reads brief.yaml → generates functional.md      │  (in parallel)
         │                                          │
         ▼                                          ▼
[3] PLANNER                                [3] ARCHITECT
    Reads brief + functional →             Reads brief + constitutions →
    generates planner.md →                 generates architect.md →
    creates cycle-XX/tasks.json            updates schema.json + api.json
    + regenerates the index               (status: "defined")
         │                                          │
         └──────────────┬───────────────────────────┘
                        ▼
         [GATE CHECK: all artifacts ready?]
                        │ YES
                        ▼
[4] BACKEND IMPLEMENTOR
    Reads cycle-XX/tasks.json + architect.md → implements one task at a time
    Writes code + tests → marks the task "done" in cycle-XX/tasks.json
    Updates api.json (status: "implemented") + rebuild-index + sdd:validate
                        │ (all backend tasks done)
                        ▼
[5] FRONTEND IMPLEMENTOR
    Reads cycle-XX/tasks.json + api.json → implements one task at a time
    Writes UI components + tests → marks the task "done"
    Updates components.json + rebuild-index + sdd:validate
                        │ (all frontend tasks done)
                        ▼
[6] REVIEWER
    ⛔ VALIDATION GATE: pnpm sdd:validate BEFORE and AFTER the close
    Verifies artifacts + runs build/tests/lint
    Validates RF and RNF compliance (ca_results per CA-[NNN])
    Updates cycle.json (status: "completed" + reviewer_report)
    Moves the module to completed_modules + closes the spec in index.json
    Validates/absorbs the cycle's fixes + CONTEXTO GATE
                        │
                        ▼
         [Cycle completed → start cycle-[XX+1] if applicable]
```

### Flow rules

- **Agents 2 and 3 work in parallel** — Functional, Planner and Architect do not depend on each other once they have `brief.yaml`.
- **Backend goes before Frontend** — the Frontend Implementor waits until every backend task it depends on is `done`.
- **One active cycle per spec** — within a spec, cycles are sequential (cycle-02 does not open until cycle-01 is `completed`); specs from different devs advance in parallel.
- **If a task fails**: the implementor aborts, reviews `planner.md`/`architect.md`, fixes and retries. If unresolved after 2 attempts, it escalates to the Reviewer.

---

## SDD agents

Each agent has a fixed role and a specific invocation point in the flow:

| Agent                      | File                             | Role                                                                 | Generates / Updates                                                                     |
| -------------------------- | -------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Orchestrator**           | `sdd-orchestrator.agent.md`      | Entry, validation, briefs                                            | `brief.yaml`, `cycle.json`, `global.json`, `specs/index.json`, `fixes.json` (FIX GATE)  |
| **Functional**             | `sdd-functional.agent.md`        | Translate the spec into user stories                                 | `functional.md`                                                                         |
| **Planner**                | `sdd-planner.agent.md`           | Decompose stories into technical tasks                               | `planner.md`, `cycles/cycle-XX/tasks.json` (+ index)                                    |
| **Architect**              | `sdd-architect.agent.md`         | Validate design, define schema and API                               | `architect.md`, `schema.json`, `api.json`                                               |
| **Backend Implementor**    | `sdd-implementor-back.agent.md`  | Develop API/logic (stack per the subproject's constitution.md)       | code in `apps/`, cycle tasks, `api.json`                                                |
| **Frontend Implementor**   | `sdd-implementor-front.agent.md` | Develop UI (stack per the subproject's constitution.md)              | code in `apps/`, cycle tasks, `components.json`                                         |
| **Reviewer**               | `sdd-reviewer.agent.md`          | Final validation, cycle close                                        | `cycle.json`, `global.json`, `specs/index.json`, `fixes.json`, `context/**`             |
| **Steward** (outside the cycle) | `sdd-steward.agent.md`      | Kit concierge: entry point, status, `update sdd`, routing            | none — operates only through the official tools (`update sdd`, `setup:agents`, `harness idea`) |

> The invocation order is **mandatory**. No agent can be skipped.

### Skill catalog per agent

Each agent includes a `## Skills disponibles` section with the skills it must read before running:

| Agent                    | Assigned skills                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Orchestrator**         | `sdd-orchestrator`, `sdd-file-structure`, `sdd-data-schemas`                                                 |
| **Functional**           | `sdd-functional`, `sdd-file-structure`                                                                       |
| **Planner**              | `sdd-planner`, `sdd-file-structure`, `sdd-data-schemas`                                                      |
| **Architect**            | `sdd-architect`, `generate-api-contract`, `generate-*` per stack, `sdd-data-schemas`, `sdd-file-structure`   |
| **Backend Implementor**  | `sdd-implementor-back`, `generate-*` per stack (subproject's `constitution.md`), `sdd-data-schemas`          |
| **Frontend Implementor** | `sdd-implementor-front`, `generate-*` per stack (subproject's `constitution.md`), `sdd-data-schemas`         |
| **Reviewer**             | `sdd-reviewer`, `sdd-data-schemas`, `sdd-file-structure`                                                     |

---

## SDD skills

Skills are specialized micro-agents invoked with `/skill [name]`.

### SDD orchestration skills

| Skill                   | Purpose                                                                        |
| ----------------------- | ------------------------------------------------------------------------------ |
| `sdd-orchestrator`      | Validate specs, run gates, create briefs                                       |
| `sdd-functional`        | Generate user stories from the spec                                            |
| `sdd-planner`           | Decompose stories into estimated `TASK-[NNN]` tasks                            |
| `sdd-architect`         | Validate design, define schema and API contracts                               |
| `sdd-file-structure`    | Naming, directory trees and templates for every cycle document                 |
| `sdd-data-schemas`      | Field-by-field reference for each JSON registry (subordinate to `sdd/schemas/`) |
| `sdd-implementor-back`  | Implement backend tasks                                                        |
| `sdd-implementor-front` | Implement frontend tasks                                                       |
| `sdd-reviewer`          | Validate quality and close cycles                                              |

### Workspace skills

| Skill               | Purpose                                                                                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `init-nx-workspace` | Takes a repo from zero to the canonical structure: Nx 23 + pnpm, `apps/* libs/* tools/*` globs, `.npmrc`, `.nxignore`, pnpm CI and the dual harness. **The harness instructs checking the workspace at the start of every session** and invoking it if something is missing. |
| `scaffold-nx`       | New apps and libs in an **already-assembled** workspace — official Nx generators + SDD convention overlay from `sdd/templates/`. Always inside an SDD cycle.                                                                                     |

### Tooling skills (optional)

| Skill            | Purpose                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `setup-graphify` | Installs the repo's knowledge graph with a **free** backend (Gemini free tier or local Ollama), validates the model with a real measurement and builds the first graph. **Opt-in per dev** — nothing in the SDD flow depends on it.  |

### Code generation skills

> A **per-stack** catalog — the agent chooses according to the subproject's `constitution.md`,
> never by its own preference. Add a new skill when adopting a new stack.

| Skill                      | Purpose                                                             |
| -------------------------- | ------------------------------------------------------------------- |
| `generate-springboot-api`  | Generates a full Spring Boot module (controller/service/repo/tests) |
| `generate-api-contract`    | Generates OpenAPI contracts, DTOs and mappers                       |
| `generate-react-component` | Generates a React component with typed props and tests              |
| `generate-nestjs-module`   | Generates a NestJS module (reserved for future projects)            |
| `generate-prisma-schema`   | Generates a Prisma schema (reserved for future projects)            |

---

## System artifacts

The central JSONs are the source of truth for the project state. Only agents modify them.

> ⛔ **They all validate against `sdd/schemas/*.schema.json`** (`additionalProperties: false`).
> The examples below are illustrative — when in doubt, **the schema wins**.
> After writing to any of them: `pnpm sdd:validate`.

### global.json — Project state

Answers: **Which modules are completed, in progress or pending?**
(schema: `sdd/schemas/global.schema.json` — there is no global `current_cycle` anymore: cycles are per-spec)

```json
{
  "$schema": "./schemas/global.schema.json",
  "project": "<project-name>",
  "description": "...",
  "version": "1.0.0",
  "completed_modules": [
    {
      "module": "enrollment-request",
      "spec": "spec-jdoe-001-enrollment-request",
      "apps": ["apps/example-api"],
      "cycles_completed": 1,
      "completed_at": "2026-06-24",
      "description": "What this module does (1-2 sentences)"
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

**Who updates it:** Orchestrator (cycle open) / Reviewer (cycle or module close).

### tasks.json — Tasks index + per-cycle files (v4.0)

Answers: **What tasks exist, in which spec/cycle, and what is their status?**

The canonical tasks live in **`sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json`** (one per cycle,
schema `sdd/schemas/cycle-tasks.schema.json`). `sdd/tasks.json` is only a **generated index**:

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

**Who updates it:** Planner (creates the per-cycle file), Implementors (mark `"done"` in the per-cycle),
Reviewer (closes). The index is always regenerated with `pnpm sdd:rebuild-tasks-index` — **never by hand**.
Key advantage: each dev writes only to their cycle's file → no merge conflicts, no giant files.

### schema.json — DB schema

Answers: **Which tables exist and in which app?**
(schema: `sdd/schemas/db-schema.schema.json` — grouped by **app-key**, append/deprecate-only entries)

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

**Who updates it:** Architect (`defined`) → Backend Implementor (`migrated`) → Reviewer (validates).

### api.json — API contracts

Answers: **Which endpoints exist, in which app, and what do they expect/return?**
(schema: `sdd/schemas/api.schema.json` — grouped by **app-key**, `EP-NNN` IDs sequential per app)

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
        "description": "Brokerage account opening request",
        "path_params": ["clientId", "accountId"],
        "required_headers": ["Authorization", "Content-Type"],
        "request_body": { "action": "string (OPEN)" },
        "responses": { "201": "Request created", "400": "Invalid body" },
        "changelog": []
      }
    ]
  }
}
```

**Who updates it:** Architect (`defined`) → Backend Implementor (`implemented`) → Reviewer (validates).

### components.json — Frontend components

Answers: **Which UI components were created and which endpoints do they consume?**
(schema: `sdd/schemas/components.schema.json` — grouped by **app-key**, sequential `COMP-NNN` IDs)

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
        "description": "Order creation form",
        "consumes": ["EP-001"],
        "created_at": "2026-07-13",
        "changelog": []
      }
    ]
  }
}
```

**Who updates it:** Architect (`defined`) → Frontend Implementor (`implemented`) → Reviewer (validates).

### fixes.json — Fixes registry

Answers: **Which changes were made outside the normal SDD flow?**

Each fix (schema: `sdd/schemas/fixes.schema.json`) has: `id` (`FIX-[gh-user]-[seq]`), `author`, `spec_id`,
`fix_document`, `type` (`HOTFIX|BUGFIX|FIX|IMPROVEMENT`), `severity`, `title`, `description`, `justification`,
`estimation_hours`, `related_modules`, `affected_files`, `test_reference`, `cycle`, dates and
`status` (`pending → in-progress → implemented → validated | absorbed`). It also accepts an
**optional `usage`** (`tokens_in`/`tokens_out`/`duration_minutes`/`model_tier`, provider-namespaced
e.g. `claude/opus`) recorded by the developer at close — the FIX GATE prompt asks for it and it
feeds the viewer's Costs view alongside `cycle.json → metrics.usage`.

**Who updates it:** Orchestrator (FIX GATE) → developer (`implemented` when done) → Reviewer (`validated`/`absorbed` on cycle close).

---

## Strict rules

### 1. Mandatory agent order

```
ORCHESTRATOR
    ↓
FUNCTIONAL ──── (parallel) ──── PLANNER ──── (parallel) ──── ARCHITECT
    ↓
[GATE CHECK: brief + functional + planner + architect + tasks.json + cycle.json ready]
    ↓
BACKEND IMPLEMENTOR (task by task)
    ↓ (all backend tasks done)
FRONTEND IMPLEMENTOR (task by task)
    ↓ (all frontend tasks done)
REVIEWER (VALIDATION GATE + cycle close)
```

### 2. Who may modify what

| File                                                | Only modifiable by                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| `sdd/global.json`                                   | Orchestrator, Reviewer                                              |
| `cycles/cycle-[XX]/tasks.json` (per-cycle)          | Planner, Implementors, Reviewer                                     |
| `sdd/tasks.json` (index)                            | Generated — `pnpm sdd:rebuild-tasks-index`                          |
| `sdd/catalog.json` (manifest)                       | Generated — `pnpm sdd:rebuild-catalog`                              |
| `sdd/schemas/*.schema.json`                         | **Manual** — a schema change is a team decision                     |
| `sdd/schema.json`                                   | Architect, Reviewer                                                 |
| `sdd/api.json`                                      | Architect, Backend Implementor, Reviewer                            |
| `sdd/components.json`                               | Frontend Implementor, Reviewer                                      |
| `sdd/fixes.json`                                    | Orchestrator                                                        |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/*.md`        | The agent responsible for each artifact                             |
| `sdd/specs/{spec-id}/cycles/cycle-[XX]/artifacts/`  | Any agent (supporting docs)                                         |
| `sdd/specs/`                                        | **Manual** — anyone may edit specs                                  |
| `sdd/context/**/updates/*.md`                       | Reviewer (cycle close) / dev (fix close) — **append-only**          |
| `sdd/context/[apps\|libs\|tools]/*/constitution.md` | **Consolidation only** (single actor) — never during a cycle        |
| `sdd/context/constitution.md` (global)              | Reviewer — **only its own row** of the table                        |
| `sdd/docs/`                                         | SDD cycle (it is an app) — viewer, not a registry                   |
| `sdd/prompts/`                                      | **Manual** — anyone may edit prompts                                |

### 3. Naming convention (v2.0 — Multi-developer)

| Element          | Old format                  | New format (v2.0)                                               | Example                                                               |
| ---------------- | --------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| Spec             | `spec-[NNN]-[slug].spec.md` | `spec-[author]-[NNN]-[slug]/spec-[author]-[NNN]-[slug].spec.md` | `spec-jdoe-001-user-onboarding/spec-jdoe-001-user-onboarding.spec.md` |
| Spec ID          | `SPEC-NNN`                  | `SPEC-[author]-[NNN]`                                           | `SPEC-jdoe-001`                                                       |
| Cycle folder     | `cycle-[XX]`                | `cycles/cycle-[XX]`                                             | `cycles/cycle-01`                                                     |
| Task             | `TASK-BE/FE-[CYCLE]-[NNN]`  | `TASK-[NNN]` (scope: the cycle's `tasks.json`)                  | `TASK-001`, `TASK-002`                                                |
| Repository fix   | `FIX-[NNN]`                 | `FIX-[author]-[seq]`                                            | `FIX-jdoe-001`                                                        |
| Spec-level fix   | (did not exist)             | `fix-[author]-[spec-num]-[seq].md`                              | `fix-jdoe-001-001.md`                                                 |

**The `[NNN]` counter is PER-DEVELOPER (reset):**

- jdoe: `spec-jdoe-001`, `spec-jdoe-002`, `spec-jdoe-003`...
- asmith: `spec-asmith-001`, `spec-asmith-002`...
- Another dev: `spec-xxxuser-001`...

### 4. Comment-free code

> ⛔ **No comments are written in implementation code.**

Documentation does not live in comments: it lives in the SDD documents (spec, functional,
planner, architect, constitutions). A comment repeating what SDD already documents is
duplication that also goes stale — and costs tokens twice: when written and on **every**
subsequent read of the file.

Clarity is achieved with **declarative names** (`propagateAccountStatusToTradingApi()` instead
of `process()` + comment) and **modularization** (a long function with `// step 1:` blocks is
really N functions with proper names). The urge to comment is a refactor signal.

Forbidden: narrative comments, commented-out dead code and `// TODO` — a real TODO is a task
or a fix registered in SDD.

**Only exceptions** (one line, in English): a constraint the code cannot express (a workaround
with a link to the issue, a counter-intuitive business rule with a reference to its spec) and
annotations required by framework/tooling (Swagger, Lombok, decorators, Javadoc if the
subproject's linter demands it).

The sdd-reviewer checks this on cycle close: a PR with comments outside those exceptions gets
a change request.

### 5. Model and effort selection

Before tackling any task, explicitly choose the cheapest **tier** that does it with quality —
for your own work and for **every** subagent you spawn. The rule applies to the three
providers the harness supports; each has its own way of choosing a model, but they map to
the same four abstract tiers:

| Tier          | Task type                                                           | Claude (`model`/`effort`) | Gemini (model/`thinking`)     | Copilot (picker/agents)      |
| ------------- | -------------------------------------------------------------------- | -------------------------- | ------------------------------ | ------------------------------ |
| **economical** | State reading, formatting, mechanical edits, targeted grep          | `haiku` / `low`–`medium`   | Flash-Lite or Flash / `minimal`–`low` | economical model (e.g. `gpt-5-mini`) |
| **standard**   | Standard implementation (one scoped task), tests                    | `sonnet` / `medium`        | Flash / `medium`                | standard model (e.g. `claude-sonnet`) |
| **high**       | Architecture, cross-cutting decisions, orchestration, close review   | `opus` / `high`–`xhigh`    | Pro / `low`–`high`              | high model (e.g. `claude-opus`) |
| **maximum**    | Only the hardest step (adversarial verify, judge)                   | `fable` / `xhigh`–`max`    | Pro / `high`                    | highest tier enabled          |

Cycle agents: implementors → **standard**; orchestrator, architect and reviewer → **high**.
Never spawn a whole fan-out on the most expensive tier by default. Concrete Copilot/Gemini
model names are not guaranteed stable — they are editable in each agent's `model:` frontmatter
(`sdd/agents/*.agent.md`) and in `sdd/pricing.json`. Enforcement differs per provider (Claude
Code sets `model`/`effort` programmatically, Copilot pins `model:` on the SDD agents,
Antigravity asks the user to switch the dropdown, Gemini CLI picks the model per session) —
full detail in `sdd/dual-harness/{CLAUDE,AGENTS,GEMINI}.md` → ⚙️ section.

### 6. graphify — optional

The repo's knowledge graph (`graphify-out/`) is **opt-in per dev**: it is gitignored, does not
travel with the repo and **nothing in the SDD flow depends on it**. If it exists, querying it
before blind `grep`/`Read` saves tokens; if it does not, work normally. To enable it, the
`setup-graphify` skill guides the installation with a free backend.

### 7. rtk — on by default

[rtk](https://github.com/rtk-ai/rtk) (Apache-2.0, a Rust binary) compresses the output of the
shell commands the agents read (`git`, `pnpm`, `vitest`, `tsc`, `eslint`, `ls`, `grep`,
`docker`…): it reports **60–90% less text**. It only affects shell commands — the agents' file
reading is untouched. It ships **on by default since kit v0.12.0**, with zero developer action.

- **Switch**: `sdd/tools.json` (`rtk.enabled`, `rtk.auto_install`, optional `rtk.version`). It is
  a project file: `harness update sdd` **never overwrites it**.
- **Scripts**: `pnpm sdd:rtk` installs/repairs (hooks + binary), `pnpm sdd:rtk -- --status`
  reports the state, `-- --disable` / `-- --enable` turn it off and on.
- **Hooks**: `.claude/settings.json` (`PreToolUse` on `Bash`) and `.gemini/settings.json`
  (`BeforeTool` on `run_shell_command`) — versioned files, so the whole team gets them with a
  `git pull`. Copilot and Antigravity have no hook yet and work exactly the same without it. The
  kit installs **only** this hook: any other `PreToolUse` (for instance `block-no-verify` from a
  third-party plugin) comes from the user's own settings or plugins, not from `sdd/`.
- **Best effort**: if the binary is missing or the hook fails, the command runs uncompressed; it
  never blocks. The binary is installed outside the repo (`~/.local/bin`) and its history is
  **per machine**, so the savings shown are those of whoever runs the viewer.
- **Numbers**: `rtk gain --project`, or `pnpm sdd:docs` → Costs → **RTK** tab. They are estimates
  (bytes ÷ 4), not billing.

---

## Quick reference

### Key system files

| File                            | Purpose                                              |
| ------------------------------- | ---------------------------------------------------- |
| `sdd/global.json`               | Central state: modules and cycles                    |
| `sdd/context/constitution.md`   | Project rules and stack                              |
| `sdd/context/context_prompt.md` | Entry point for agents                               |
| `sdd/specs/index.json`          | Specification registry                               |
| `cycles/cycle-[XX]/tasks.json`  | The cycle's canonical tasks                          |
| `sdd/tasks.json`                | Tasks index (generated)                              |
| `sdd/catalog.json`              | Content manifest for the viewer (generated)          |
| `sdd/schemas/`                  | Strict JSON Schemas for every registry               |
| `sdd/schema.json`               | Database schema                                      |
| `sdd/api.json`                  | API contracts                                        |
| `sdd/components.json`           | Frontend components                                  |
| `sdd/fixes.json`                | Fixes registry (FIX GATE)                            |
| `sdd/agents/`                   | **Centralized agent definitions (v2.0)**             |
| `sdd/dual-harness/rules/`       | Layer 2: canonical gates (`sdd-gates.md`) and telemetry (`sdd-model-budget.md`) |
| `sdd/scripts/spec-gate.mjs`     | SPEC GATE as a command (`pnpm sdd:gate`)             |
| `sdd/context/**/updates/`       | Additive context fragments (anti merge-conflict)     |
| `sdd/docs/`                     | SDD viewer in vanilla JS (`pnpm sdd:docs`)           |
| `sdd/tools.json`                | rtk switch (user data)                               |

### Visibility configuration (v3.0)

**Single sources of truth → exposed to tools through symlinks:**

```bash
# Sources:
sdd/agents/
sdd/skills/
sdd/prompts/
sdd/dual-harness/   ← root AGENTS.md, CLAUDE.md and GEMINI.md (+ rules/ for Antigravity)

# Claude Code (.claude/):
.claude/agents/    → ../sdd/agents/
.claude/skills/    → ../sdd/skills/
.claude/prompts/   → ../sdd/prompts/

# GitHub Copilot (.github/):
.github/agents/    → ../sdd/agents/
.github/skills/sdd-*/        → individual symlinks (preserves Nx skills)
.github/skills/generate-*/   → individual symlinks
.github/prompts/*.prompt.md  → individual symlinks (preserves Copilot prompts)

# Antigravity / Gemini CLI:
.agents/rules/sdd-*.md        → individual symlinks to sdd/dual-harness/rules/
.agents/skills/<skill>/       → individual symlinks to sdd/skills/<skill>/
.agent/workflows/<prompt>.md  → individual symlinks to sdd/prompts/<prompt>.prompt.md
.gemini/commands/<prompt>.toml → generated wrapper around sdd/prompts/<prompt>.prompt.md
.gemini/settings.json         → merged (context.fileName gets GEMINI.md/AGENTS.md)

# Repo root:
AGENTS.md          → sdd/dual-harness/AGENTS.md
CLAUDE.md          → sdd/dual-harness/CLAUDE.md
GEMINI.md          → sdd/dual-harness/GEMINI.md
.github/copilot-instructions.md → REAL file, seeded from sdd/dual-harness/ if missing (never overwritten)

# Automatic setup (regenerates every symlink, idempotent):
pnpm setup:agents     # bash sdd/scripts/setup-agents.sh (Unix)
                      # PowerShell sdd/scripts/setup-agents.ps1 (Windows)
```

### Available prompts

| Prompt                                              | When to use it                                              |
| --------------------------------------------------- | ----------------------------------------------------------- |
| `sdd/prompts/start-sdd-cycle.prompt.md`             | To start a new SDD cycle                                    |
| `sdd/prompts/check-spec-before-implement.prompt.md` | To verify the SPEC GATE                                     |
| `sdd/prompts/hotfix-bypass-gate.prompt.md`          | To register a fix outside the cycle                         |
| `sdd/prompts/review-cycle.prompt.md`                | For the Reviewer to close a cycle (includes CONTEXTO GATE)  |

### State verification

```bash
# Modules in progress
cat sdd/global.json | grep -A 5 "in_progress_modules"

# A cycle's pending tasks
cat sdd/specs/<spec-id>/cycles/cycle-01/tasks.json | grep -B2 '"status": "pending"'

# SPEC GATE A (can a cycle be opened?) and GATE B (can code be written?)
pnpm sdd:gate <spec-id|slug>
pnpm sdd:gate <spec-id|slug> cycle-01

# Validate ALL the SDD registries against their schemas
pnpm sdd:validate

# rtk state (switch, binary and hooks)
pnpm sdd:rtk -- --status

# Regenerate the tasks index
pnpm sdd:rebuild-tasks-index

# Regenerate the content manifest (after adding/removing an agent, skill, prompt or schema)
pnpm sdd:rebuild-catalog

# Registered fixes
cat sdd/fixes.json | grep -E '"id"|"status"|"title"'

# Open the SDD viewer (reads the registries live, zero build)
pnpm sdd:docs        # → http://127.0.0.1:4310/sdd/docs/

# Context fragments pending consolidation (>=5 triggers consolidation)
ls sdd/context/*/*/updates/*.md 2>/dev/null | wc -l
```

---

## Changelog

> The version history below is kept in Spanish in
> [documentation/es/README.md](../es/README.md#changelog) — it is the historical record of how
> this system evolved (the optional Claude Code mod `sdd-mod` — cycle band, `/sdd` and the SPEC GATE on edits — in v5.6, rtk on by default plus the 4-tab Costs dashboard with charts in v5.5,
> mandatory telemetry with declared estimates — `approx`/`source` — and
> `skipped` counted as resolved in v5.4, Gemini/Antigravity as a third harness provider with
> provider-namespaced cost telemetry and a bilingual viewer in v5.3, skills back to uppercase `SKILL.md` — the Agent
> Skills standard Claude Code requires — in v5.2, workspace bootstrap and single-sourced naming
> in v5.1, additive context and the portable viewer in v5.0, per-cycle tasks and strict JSON
> Schemas in v4.0, the dual harness in v3.x, the multi-developer architecture in v2.0). New
> entries are written there first.

---

**Last update:** 2026-08-18
**SDD Version:** 5.5
**Project:** see `sdd/global.json` → `project`
