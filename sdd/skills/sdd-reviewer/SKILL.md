---
name: sdd-reviewer
description: Skill del Agente Reviewer SDD. Valida la calidad de todo el output del ciclo y ejecuta los gates de cierre. Invocar cuando todas las tasks de implementación del ciclo estén completas.
---

# Skill: sdd-reviewer

## Review checklist

- [ ] ⛔ `pnpm sdd:validate` green BEFORE reviewing and AFTER closing — a cycle can NEVER be approved with malformed registries; record the result in `reviewer_report.tests["sdd:validate"]`
- [ ] Schema compatible with existing `sdd/schema.json` (check app-key section)
- [ ] `sdd/api.json` — endpoints under correct app-key, status `implemented` or `updated`
- [ ] `sdd/components.json` — components under correct app-key, `created_in_cycle` set
- [ ] `sdd/schema.json` — tables under correct app-key, `migration_file` updated
- [ ] `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json` with every cycle task resolved — `done` when implemented, `skipped` when it no longer applies (dropped requirement, work absorbed by another task, scope moved to another cycle). `skipped` is a valid close, NOT a pending item: record the reason in `reviewer_report.notes` and the count in `metrics.tasks_skipped`, so `tasks_completed + tasks_skipped == tasks_total`. Never mark `done` a task that was not done just to pass the gate. Then index regenerated (`pnpm sdd:rebuild-tasks-index`) + `pnpm sdd:validate` green
- [ ] Code has NO narrative comments, commented-out code, task/spec/cycle references or `// TODO` (dual-harness rule ✍️; that context belongs in `planner.md`/`architect.md`, not in code; allowed only: issue-linked workaround, business rule referencing its spec, framework annotations / linter-required Javadoc) → otherwise request changes
- [ ] Additive context fragment written at `sdd/context/[apps|libs|tools]/[name]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md` — base `constitution.md`/`context_prompt.md` NOT edited during the cycle (dual-harness rule 🧩)
- [ ] MEMORIA GATE (dual-harness rule 🧠): if the cycle produced a real lesson (failed assumption, costly discovery, avoidable token spend), a journal entry exists at `sdd/memory/journal/YYYY-MM-DD-[spec-id]-cycle-[XX].md`; `sdd/memory/lessons.md` NOT edited during the cycle. No lesson → no entry (noise filter)
- [ ] ⛔ TELEMETRÍA GATE — usage telemetry recorded (MANDATORY, feeds the Costs dashboard). `cycle.json` → `metrics.usage` with `tokens_in`/`tokens_out`, `duration_minutes` and **`by_agent[]` as the source of truth** — one entry per unit of work (every `done` task, every functional/planner/architect document, the orchestrator's coordination, your own review), each carrying `provider_model` (`claude/opus`, `gemini/pro`, `copilot/claude-sonnet`; Antigravity under `gemini/*`), `effort`, `agent`, `approx`, `source`, `recorded_at`. **`by_tier` is derived from `by_agent`, grouped by `provider_model` — never filled in separately.** Declaring provider and model is never optional — the model is always known, it is the one you were running on. **Whoever executes records; you close.** Telemetry is not reconstructed at the end: the implementor writes `usage` on each task in the cycle's `tasks.json` when closing it (or the orchestrator does, when it captures the exact `agent-usage-notification` for a subagent it dispatched), functional/planner/architect push their entry into `by_agent` when their document is done, whoever resolves a fix writes `usage` in `sdd/fixes.json`, and at close you **verify `by_agent` is complete, add your own `{ "agent": "reviewer", ... }` entry, derive `by_tier`, and only then sum** the top-level `tokens_in`/`tokens_out`. You do NOT close the cycle without a complete `by_agent`. Your own estimating is limited to what no task, fix or document covered — the review itself, coordination the orchestrator did not record. A `by_tier` entry that mixes a measured part with an estimated one sums to `approx: true`: a total is only as honest as its weakest part. If an entry is missing when you get to the close, something failed upstream — note it in `reviewer_report.notes` on top of completing the record.
      **When there is no counter, estimate — do not omit.** `/stats` (Gemini CLI) and the session usage report (Claude Code) are client-side: you cannot run them, ask the dev. Copilot and Antigravity expose no counter at all. In every one of those cases record an order-of-magnitude estimate with `"approx": true` and `"source": "declared-estimate"`; the viewer shows it as **estimado** rather than hiding it. What is forbidden is a precise invented number presented as measured (`approx: false` with no counter behind it, or `approx: false` paired with `source: declared-estimate` — the validator errors on that combination). A cycle with a known model and no telemetry is an incomplete close

## Files modified on approval

- `sdd/global.json` — moves module from `in_progress_modules` to `completed_modules` (with `apps[]`, `cycles_completed`, `completed_at`)
- `sdd/specs/index.json` — spec entry → `status: "completed"` + `completed_at` (if this was the spec's last cycle)
- `sdd/specs/{spec-id}/cycles/cycle-[XX]/cycle.json` — updates `status` to `"completed"` and fills `reviewer_report`
- `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json` — every task resolved (`"done"` or `"skipped"`) + per-task `usage`; then `pnpm sdd:rebuild-tasks-index`
- `sdd/api.json` — verify/correct `updated_in_cycle` and `changelog` for all touched endpoints
- `sdd/schema.json` — verify/correct `updated_in_cycle` and `changelog` for all touched tables
- `sdd/components.json` — verify/correct entries for all components created or modified
- `sdd/fixes.json` — review fixes with `status: "implemented"` in this cycle → mark `"validated"` or `"absorbed"`
- `sdd/context/[apps|libs|tools]/[name]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md` — CONTEXTO GATE: append-only delta fragment (state / structure / dependencies / next); the subproject's base files are only touched by the single-actor consolidation (orchestrator at next cycle start on that subproject, or reviewer at ≥5 accumulated fragments — dedicated commit, delete merged fragments)
- `sdd/context/constitution.md` + `context_prompt.md` (global) — direct edit of the affected subproject's row ONLY (append new row for new app/lib; never reformat the tables)
- `sdd/memory/journal/YYYY-MM-DD-[spec-id]-cycle-[XX].md` — only when the cycle left a real lesson (what happened / lesson / avoidable cost); distillation into `lessons.md` is the orchestrator's single-actor job at next cycle start

## App-key mapping (reference)

| App              | Key en los JSON      |
| ---------------- | -------------------- |
| example-api      | `"example-api"`      |
| otra API backend | `"another-api"`      |
| app React        | `"apps/example-app"` |
| api-client lib   | `"libs/api-client"`  |
| sdd-docs (visor) | `"tools/sdd-docs"`   |

> Al agregarse una app/lib nueva al monorepo, extender esta tabla desde `monorepo.apps` de `sdd/global.json`.

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-reviewer.agent.md` § Registro de consumo: tu propia revisión es una entrada
de `by_agent` (`agent: "reviewer"`); no cerrás el ciclo sin `by_agent` completo y `by_tier`
derivado correctamente (ver TELEMETRÍA GATE arriba).
