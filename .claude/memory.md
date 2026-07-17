# Project Memory — tucu-ui

Durable, checked-in log of *why* things are the way they are — not a restatement of *how* they work today (that's `AGENTS.md`, which is the always-current reference). Add an entry here when a decision would otherwise only live in chat history or an external memory DB. Newest first.

---

## 2026-07-17 — Harness content audit: found real drift against the current codebase

**Why:** After building `harness/`, checked whether its content actually still matched the repo (not just internal consistency between symlinks) — found real drift because the MCP server and the docs site had both changed after `harness/agents/tucu-ui-docs-sync.md` and the MCP tool list were originally written.

**Found and fixed:**
- MCP server actually has **10 tools**, not 7 — `search_components`, `get_props`, `generate_documentation` were added (in `tools/mcp-server/src/tools/component-tools.ts` and `generation-tools.ts`) but never reflected in `AGENTS.md`, `.github/copilot-instructions.md`, or `harness/agents|prompts/tucu-ui-expert.md`. Resource count (12) and prompt count (8) were already accurate.
- `harness/agents/tucu-ui-docs-sync.md` described a documentation architecture from *before* PR #11's `ui/tucu-docs` extraction: `apps/demo`/`ui/tucu-ui/src/demo` (removed), a 3-step parent-page registration (lazy import + separate TOC array + separate JSX line — replaced by a single `sections: SectionConfig[]` array feeding `DynamicSectionsPage`), and demo-local `AutoPropsTable`/`PropPlayground` imports (now `@tucu-ui-internal/docs-kit/components/...`, an internal-only path alias into `ui/tucu-ui/src/docs-kit/`, not published in the package's `exports` map). Rewrote it end to end against the real current section files (e.g. `ui/tucu-docs/src/pages/components/ui-components-sections/AnchorLinkSection.tsx`) and parent pages (`UiComponents.tsx`).

**Found and fixed (follow-up, same day):** `scripts/generate-props.ts` hardcoded its output to `ui/tucu-ui/src/demo/generated/props-metadata.ts`, a directory that no longer existed post-`ui/tucu-docs` extraction — `AutoPropsTable`/`PropPlayground` actually read `ui/tucu-ui/src/docs-kit/generated/props-metadata.ts`, so the script was silently updating a file nothing consumed. Fixed the hardcoded path (`OUTPUT_DIR` + header comment) and re-ran it: correctly wrote to `docs-kit/generated/` this time, and in doing so surfaced 3 real `DataTable` props (`enableHideColumns`, `rightActions`, `searchableColumns`) that existed in source since before 2026-06-01 but had never made it into the generated metadata because of this bug.

**How to apply:** When something in `harness/` describes a workflow or API surface, periodically diff it against the actual source (`tools/mcp-server/src/`, `ui/tucu-docs/src/pages/`) rather than assuming it stayed accurate — nothing currently re-validates `harness/` content against the rest of the codebase automatically (unlike the symlink structure itself, which `pnpm harness:check`/`pnpm evals` do verify).

---

## 2026-07-16 — Removed `.agents/` (dead Nx-skill mirror)

**Why:** `.agents/skills/{nx-workspace,nx-generate,monitor-ci,link-workspace-packages,nx-plugins,nx-import,nx-run-tasks}/` was a local copy of skills bundled in the `nx@nx-claude-plugins` Claude Code marketplace plugin, originally written there (alongside now-retired `.cursor/`, `.codex/`, `.opencode/` copies) for tools without a marketplace concept. Checked empirically across this session: these skills never once appeared as invocable in Claude Code, unlike `.claude/skills/sdd`/`publish` which did the moment they were created — meaning the marketplace path wasn't actually surfacing them here, and the local mirror wasn't being read either. With Cursor/Codex/OpenCode retired and Copilot having no Skills concept, nothing was reading `.agents/` anymore.

**Decision:** Deleted `.agents/` entirely rather than leave inert dead weight. `AGENTS.md`'s Nx auto-managed block (the `<!-- nx configuration start/end -->` section) still references `nx-workspace`/`nx-generate` skills by name — that block is written by Nx's own tooling, not hand-maintained here, and now points at something unreachable. Left as-is rather than hand-edited, since Nx may overwrite hand edits there anyway.

**How to apply:** If Nx's skills need to actually work for Claude Code again, the fix is getting the marketplace plugin recognized (separate investigation) or mirroring specific skills into `.claude/skills/` the same way `sdd`/`publish` are symlinked from `harness/skills/` — not restoring a local `.agents/` copy nobody reads.

## 2026-07-16 — Three-harness architecture: symlinks instead of a generator

**Why:** The generator-based approach (below) worked but still meant N *files* on disk (one per tool) even if a script kept them in sync — the user asked explicitly for zero duplication: one real copy, symlinked everywhere else.

**Decision:** Moved the canonical source out of `.agents/` (which is Nx's own directory convention, shared with the `nx-*` skill folders Nx's marketplace owns) into a new top-level `harness/` folder (`harness/agents/`, `harness/prompts/`, `harness/skills/`) containing only tucu-ui-authored content. Every per-tool path is now a real symlink to a file under `harness/` (or to `AGENTS.md` for `CLAUDE.md`/`GEMINI.md`). `scripts/sync-harness.mjs` (the generator) was deleted; `scripts/check-harness-symlinks.mjs` replaced it as a pure verifier (no generation step exists anymore — editing the canonical file *is* the update, instantly, for every tool).

**Consequence:** Prompt bodies can no longer use any single tool's argument-substitution syntax (`$ARGUMENTS`, `${input:args}`) since the same bytes are read by all three tools — `harness/prompts/*.md` phrases this generically instead. Antigravity's per-file `.agent/rules/<name>.md` (one symlink per agent) replaced the old consolidated `.agent/rules/personas.md` rollup, since a true rollup can't be a straight symlink to a single agent source.

**How to apply:** Adding a 4th custom agent/prompt/skill means: add the file under `harness/`, then `ln -s` it from each tool's expected path (see the table in `AGENTS.md` → Three-Harness Setup), then add it to `EXPECTED_SYMLINKS` in `scripts/check-harness-symlinks.mjs`. Never `cp` — if you're copying bytes, something is wrong.

## 2026-07-16 — Harness-audit remediation

Ran `/harness-audit` (everything-claude-code) and scored 21/29, failing on Memory Persistence, Eval Coverage, and Security Guardrails. Addressed all three:

- This file (`.claude/memory.md`) for durable memory.
- `evals/harness-sync.eval.mjs` (Node's built-in test runner) verifying the three-harness generator stays in sync and canonical specs stay well-formed.
- `SECURITY.md` with a standard vulnerability-reporting policy.
- `.claude/hooks/pretooluse-guard.mjs` wired into `.claude/settings.json` as a `PreToolUse` hook on the Bash tool — blocks a small, tested deny-list of unambiguously catastrophic commands (`rm -rf /` or `~`, fork bombs, `dd` to a block device, force-push straight to `main`/`master`). Deliberately narrow: this is a mechanical backstop for the handful of cases with zero legitimate use, not a replacement for judgment on riskier-but-sometimes-valid operations.

## 2026-07-16 — Three-harness consolidation (Claude Code + GitHub Copilot + Antigravity)

**Why:** The repo had grown near-duplicate agent/skill/prompt config across `.cursor/`, `.codex/`, `.opencode/`, `.github/`, and `.agents/` — several were byte-identical copies, hand-maintained separately, already drifting (e.g. `.github/prompts/tucu-ui-expert.prompt.md` still referenced `.github/skills/tucu-ui*/SKILL.md` files that had been deleted when the MCP server replaced them as the source of truth). The user asked to retire Cursor/Codex/OpenCode support and standardize on exactly three tools, with one canonical source instead of N hand-synced copies.

**Decision:** Canonical source lives under `.agents/agents/*.md`, `.agents/prompts/*.md`, `.agents/skills/*/SKILL.md`, and root `AGENTS.md`. `scripts/sync-harness.mjs` generates every per-tool artifact from it (`CLAUDE.md`, `GEMINI.md`, `.claude/agents|commands|skills`, `.github/agents|prompts`, `.agent/workflows`, `.agent/rules/personas.md`). `pnpm sync:harness:check` detects drift without writing anything (suitable as a pre-commit/CI gate — not yet wired into CI, that's a possible next step).

**Left alone deliberately:** the `nx-*` skill folders under `.agents/skills/` and `ci-monitor-subagent`/`monitor-ci` under `.github/` are Nx's own bundled tooling (delivered via the `nx@nx-claude-plugins` Claude Code marketplace, see `.claude/settings.json`), not tucu-ui-authored content — don't fold them into the generator.

**Open item:** Antigravity's exact MCP-server config path/schema is unconfirmed even in community sources (see `AGENTS.md` → MCP Server → Configuration). Verify via the IDE's "Manage MCP Servers → View raw config" before wiring it up — don't guess the path.

**How to apply:** Whenever adding/editing a custom agent, prompt, or skill, edit only the canonical source and run `pnpm sync:harness`. Never hand-edit a generated file — the next sync will silently overwrite it.

## 2026-07-16 — Automatic GitHub Releases on publish, gated by significance

**Why:** `git tag` history had ~15 releases with no corresponding GitHub Release (last real one was Nov 2025, v1.1.0/1.0.0) — releases existed only as npm publishes + tags, invisible to anyone browsing the repo's Releases tab.

**Decision:** `publish-tucu-ui.yml` / `publish-mcp.yml` now create a GitHub Release automatically after `npm publish` succeeds, but only when the release is "significant" — major or minor version bump, or a patch whose commits carry a conventional-commit breaking marker (`feat!:`, `fix!:`, `BREAKING CHANGE:` footer). Plain patch releases stay as tags only. `--latest=false` on both, since the two packages share one repo and shouldn't fight over the "Latest release" badge.

**How to apply:** Don't create GitHub Releases by hand for these packages — the workflow is the only path, and it decides based on the rule above, not on request.

## Earlier architectural decisions

See claude-mem observations (S546–S565, Jul 15–16 2026) for: the CSS-4 dual-export architecture (`./styles` vs `./theme` entry points, Tailwind v4 layer system, released as tucu-ui v2.8.0), the unified `scripts/publish.mjs` replacing separate per-package publish scripts, and NPM_TOKEN-based local publish authentication. Those predate this file; this log starts here and will accumulate going forward instead of relying solely on the external memory DB.
