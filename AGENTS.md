# Agent Context & Skills Index

This repository uses an **MCP server** (`@e-burgos/tucu-ui-mcp`) as the primary source of truth for AI agents working with the tucu-ui component library. The MCP provides tools, resources, and prompts that cover the complete API surface.

## 📁 Project Structure (Nx monorepo)

Package manager: **pnpm**. Every task runs through Nx (`pnpm nx run <project>:<target>`), never the underlying tool directly.

| Path                | Project (Nx name)      | npm package               | Type                 | Purpose                                                                                          |
| ------------------- | ----------------------- | -------------------------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| `ui/tucu-ui/`       | `tucu-ui`               | `@e-burgos/tucu-ui`         | publishable lib       | The component library itself — 95+ components, forms, charts, theming, macOS layouts, icons. Builds to `dist/ui/tucu-ui`, published to npm. |
| `ui/tucu-docs/`     | `tucu-docs`             | `@e-burgos/tucu-docs`       | app (docs site)       | Public docs site (tucu-ui.netlify.app). Consumes `tucu-ui` + MCP resources to render live examples. Not published to npm. |
| `tools/mcp-server/` | `tucu-ui-mcp`           | `@e-burgos/tucu-ui-mcp`     | publishable app       | MCP server exposing tools/resources/prompts (see below) so AI agents get the library's full API surface. Published to npm **and** deployed to fly.io (`tucu-ui-mcp.fly.dev`). |
| `apps/demo/`        | `demo`                  | `demo` (private)           | app                   | Playground consuming the **published** `@e-burgos/tucu-ui` — used to sanity-check a release against the real npm package. |
| `apps/test-lib/`    | `test-lib`              | `test-lib` (private)       | app                   | Scratch app for testing **unpublished/local** `tucu-ui` changes before a release, via `pnpm tucu-ui:test-local` (`scripts/toggle-local-lib.sh`). |
| `scripts/`          | —                       | —                           | tooling               | `publish.mjs` (unified release script), `toggle-local-lib.sh`, `ensure-npm-deps.mjs`, `check-harness-symlinks.mjs`. |
| `harness/`          | —                       | —                           | agent config          | Single canonical source for custom agents/prompts/skills, symlinked into `.claude/`, `.github/`, `.agent/` — see "Three-Harness Setup" below. |

There are no separate `libs/` — the one publishable library lives under `ui/tucu-ui/`; everything else is either an `apps/` consumer or the `tools/mcp-server` app.

## 🔌 MCP Server (Primary Context Source)

All component knowledge (catalog, forms, routing, theming, charts, icons, best practices) is served via the **tucu-ui MCP server**:

```bash
npx @e-burgos/tucu-ui-mcp
```

### Configuration

- **Claude Code**: [.mcp.json](.mcp.json)
- **GitHub Copilot / VS Code**: [.vscode/mcp.json](.vscode/mcp.json)
- **Antigravity**: not yet wired — its MCP config path/schema is unconfirmed as of this writing (community reports point at `~/.gemini/config/mcp_config.json` or a project `mcp_servers.json`, neither verified against official docs). Check the IDE's own **Manage MCP Servers → View raw config** before assuming a path.

### MCP Capabilities

| Category         | Details                                                                                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **7 Tools**      | `list_components`, `get_component`, `generate_component`, `generate_form`, `generate_page`, `generate_chart`, `search_icons`                                                                                                 |
| **12 Resources** | `tucu://catalog`, `tucu://tokens`, `tucu://forms`, `tucu://routing`, `tucu://layouts`, `tucu://theme`, `tucu://charts`, `tucu://icons`, `tucu://migration`, `tucu://best-practices`, `tucu://changelog`, `tucu://quickstart` |
| **8 Prompts**    | create-component, create-form, create-page, debug-variant, migrate-component, theme-setup, accessibility-check, performance-review                                                                                           |

## 📚 Remaining Skills (non-library)

Canonical source (edit here): [`harness/skills/`](harness/skills/). `.claude/skills/sdd` and `.claude/skills/publish` are **symlinks** to it — there is only one copy of each SKILL.md on disk.

| Topic       | Description                                                         | Skill File                                |
| ----------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| **SDD**     | Spec-Driven Development flow, specs, plans, implementation workflow | [sdd](harness/skills/sdd/SKILL.md)         |
| **Publish** | Full publish workflow for tucu-ui and tucu-ui-mcp packages          | [publish](harness/skills/publish/SKILL.md) |

There is no local `.agents/` directory (see the note at the end of the Three-Harness Setup section below for why).

## 🤖 Available Agents

Canonical source (edit here): [`harness/agents/`](harness/agents/). `.claude/agents/*.md`, `.github/agents/*.agent.md`, and `.agent/rules/*.md` are **symlinks** to these same files — one file on disk per agent, read from three tool-specific paths.

| Agent                 | Description                                               | Canonical source                              |
| --------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| **tucu-ui-expert**    | Expert consultant for component selection & examples      | [harness/agents/tucu-ui-expert.md](harness/agents/tucu-ui-expert.md)       |
| **tucu-ui-docs-sync** | Syncs documentation (demo) when library components change | [harness/agents/tucu-ui-docs-sync.md](harness/agents/tucu-ui-docs-sync.md) |

`ci-monitor-subagent` (+ its `/monitor-ci` prompt) is Nx's own bundled CI-monitoring agent, kept only under `.github/agents/` / `.github/prompts/` as real (non-symlinked) files for Copilot's benefit — not part of `harness/`, don't migrate it there.

## 🚀 Quick Start for Agents

1.  **Connect**: Ensure the `tucu-ui` MCP server is active (configured via `.vscode/mcp.json`).
2.  **Query**: Use MCP tools (`list_components`, `get_component`) or read resources (`tucu://catalog`, `tucu://forms`, etc.) for context.
3.  **Generate**: Use MCP generation tools (`generate_component`, `generate_form`, `generate_page`) for code output.
4.  **Execute**: Apply patterns from MCP resources to implement features.

## 📦 Publishing & Releases

Two independently versioned packages, each with its own tag prefix: `tucu-ui-v*.*.*` (`@e-burgos/tucu-ui`) and `mcp-v*.*.*` (`@e-burgos/tucu-ui-mcp`). Full guided workflow: invoke the **publish** skill ([`harness/skills/publish/SKILL.md`](harness/skills/publish/SKILL.md)). Rules to always respect:

1. **Never commit release changes (bump, CHANGELOG, tag) directly on `main`.** Work happens on `release/v<version>`, opened from `main`, merged back via PR.
2. **Order when publishing both**: MCP first, then tucu-ui — tucu-ui's `package.json` must reference the MCP version that's actually published.
3. **Bump locally, publish via CI — these are two separate steps:**
   ```bash
   node scripts/publish.mjs <tucu-ui|mcp> <patch|minor|major>
   ```
   This bumps the version, regenerates `CHANGELOG.md`/`README.md` from git history, builds, verifies artifacts, commits, and creates the git tag. It does **not** touch npm.
4. **Pushing the tag is what actually publishes.** `git push origin <prefix><version>` triggers `.github/workflows/publish-tucu-ui.yml` or `publish-mcp.yml`, which build, verify the tag matches the built version, and run `npm publish` via **npm Trusted Publishing (OIDC)** — no stored npm token, no OTP. The mcp workflow also runs `flyctl deploy` afterward.
5. **GitHub Releases are created automatically by those same workflows, never by hand.** After a successful `npm publish`, the workflow diffs the new tag against the previous tag of the same prefix and creates a GitHub Release only when the change is "significant": a **major or minor** version bump, or a **patch that contains a breaking-change marker** (`feat!:`, `fix!:`, or a `BREAKING CHANGE:` footer in the commit body). Plain patch releases with no breaking marker stay as tags only — no Release, and nothing to do manually.
6. **Emergency-only local publish**: append `--local-publish` to the command in step 3 to publish directly from the machine (uses `NPM_TOKEN` from `.env.local`/env if present, otherwise falls back to interactive `npm login` — an agent must never run `npm login` itself, since it needs the user's OTP).
7. `deploy-mcp.yml` is a separate, unrelated workflow: it redeploys fly.io on **every push to `main`**, independent of npm releases, to keep the live MCP server in sync with source. `publish-mcp.yml`'s deploy step re-runs the same deploy pinned to the version that was just published.

## 🧬 Three-Harness Setup — `harness/` is the Only Copy

This repo is used from **three AI coding tools**: Claude Code, GitHub Copilot, and Antigravity. Each tool expects its own file location/format for instructions, subagents, prompts, and skills. Rather than generating N per-tool copies from a source, every per-tool file is a **real symlink** into one canonical location — there is exactly one copy of each file's bytes on disk, always.

**The only real content lives here — edit it here, nowhere else:**

| What                | Where                       |
| ------------------- | ---------------------------- |
| Shared instructions | `AGENTS.md` (this file)     |
| Custom subagents    | `harness/agents/*.md`       |
| Custom prompts      | `harness/prompts/*.md`      |
| Skills              | `harness/skills/*/SKILL.md` |

**Everything else is a symlink to one of the paths above** — `ls -la` any of these and you'll see the `->` arrow:

| Tool               | Instructions                  | Subagents                                          | Prompts/Commands                    | Skills                                          |
| ------------------- | ------------------------------ | ---------------------------------------------------- | -------------------------------------- | -------------------------------------------------- |
| **Claude Code**    | `CLAUDE.md` → `AGENTS.md`     | `.claude/agents/*.md` → `harness/agents/*.md`      | `.claude/commands/*.md` → `harness/prompts/*.md` | `.claude/skills/{sdd,publish}` → `harness/skills/{sdd,publish}` |
| **GitHub Copilot** | `.github/copilot-instructions.md` (real file, Copilot-specific framing — points back at this file) | `.github/agents/*.agent.md` → `harness/agents/*.md` | `.github/prompts/*.prompt.md` → `harness/prompts/*.md` | none (Copilot has no native Skills concept) |
| **Antigravity**    | `GEMINI.md` → `AGENTS.md`     | `.agent/rules/*.md` → `harness/agents/*.md` (no native per-file subagent format, so these are read as workspace rules/personas instead) | `.agent/workflows/*.md` → `harness/prompts/*.md` | `harness/skills/` directly (path unconfirmed per Antigravity's own docs — this is the best available bet) |

Because it's a real symlink and not a generated copy, **editing the canonical file updates every tool instantly** — there is no build/regenerate step, and no way for the copies to drift, because there are no copies. The only thing that CAN go wrong is a symlink getting replaced by a real file (e.g. an editor "helpfully" materializing it on save). Run `pnpm harness:check` to verify every expected symlink still exists and resolves correctly (also covered by `pnpm evals`).

Prompt bodies in `harness/prompts/*.md` avoid any single tool's argument-substitution syntax (no `$ARGUMENTS`, no `${input:args}`) for exactly this reason — a shared file can't special-case one tool's templating.

**Explicitly out of scope** — Nx's own bundled tooling, left exactly where it already is, not part of `harness/`:
- `ci-monitor-subagent` / `/monitor-ci` (`.github/agents/`, `.github/prompts/`)
- Cursor, Codex, and OpenCode support was retired when this three-harness setup was built — their `.cursor/`, `.codex/`, `.opencode/` directories are gone; don't recreate them without an explicit ask.

There is no local `.agents/` directory — it used to mirror Nx's own bundled skills (`nx-workspace`, `nx-generate`, `monitor-ci`, etc., from the `nx@nx-claude-plugins` Claude Code marketplace) but was removed: none of the three active harnesses actually read skills from that path (confirmed empirically — they never surfaced as invocable skills in a live session), and its intended consumers (Cursor/Codex/OpenCode) are retired. `AGENTS.md`'s Nx auto-managed block below still tells agents to "invoke the `nx-workspace` skill" / "invoke the `nx-generate` skill" — that block is written by Nx's own tooling (see the `<!-- nx configuration start/end -->` markers), not by this file's maintainers, and currently refers to skills that aren't reachable locally. If that becomes a real problem, the fix is getting the marketplace plugin actually recognized (or mirroring those skills into `.claude/skills/` the way `sdd`/`publish` are here) — not restoring the dead local copy.

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
