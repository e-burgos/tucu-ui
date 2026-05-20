# Agent Context & Skills Index

This repository uses a "Skills" system to provide AI agents with specific context.
Before answering complex questions or generating code, please check the relevant skill document below.

## 📚 Available Skills

| Topic                 | Description                                                         | Skill File                                                             |
| --------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Overview**          | Installation, architecture modes, quick start, agent guidelines     | [tucu-ui](.github/skills/tucu-ui/SKILL.md)                             |
| **Component Catalog** | Full API reference: 95+ components, hooks, utils, types & examples  | [tucu-ui-catalog](.github/skills/tucu-ui-catalog/SKILL.md)             |
| **Form System**       | Form component, validation, all inputs, useFormContext patterns     | [tucu-ui-forms](.github/skills/tucu-ui-forms/SKILL.md)                 |
| **Design System**     | Layouts, tokens, color presets, useTheme, dark/light, typography    | [tucu-ui-design-system](.github/skills/tucu-ui-design-system/SKILL.md) |
| **Routing**           | Standalone routing, MFE routing, nested/dynamic routes, navigation  | [tucu-ui-routing](.github/skills/tucu-ui-routing/SKILL.md)             |
| **Standalone**        | Standalone architecture, menu-driven routes, auth, layouts, vite    | [tucu-ui-standalone](.github/skills/tucu-ui-standalone/SKILL.md)       |
| **Micro Frontends**   | MFE architecture, shell, inter-app nav, shared auth, Vite config    | [tucu-ui-mfe](.github/skills/tucu-ui-mfe/SKILL.md)                     |
| **Documentation**     | Doc site patterns, TOC, hero, sections, props tables, code blocks   | [tucu-ui-docs](.github/skills/tucu-ui-docs/SKILL.md)                   |
| **Recharts**          | Chart types, components, theming, performance, patterns & examples  | [recharts](.github/skills/recharts/SKILL.md)                           |
| **SDD**               | Spec-Driven Development flow, specs, plans, implementation workflow | [sdd](.github/skills/sdd/SKILL.md)                                     |

## 🤖 Available Agents

| Agent                 | Platform       | Description                                               | File                                               |
| --------------------- | -------------- | --------------------------------------------------------- | -------------------------------------------------- |
| **tucu-ui-expert**    | GitHub Copilot | Expert consultant for component selection & examples      | [agent](.github/agents/tucu-ui-expert.agent.md)    |
| **tucu-ui-expert**    | Cursor         | Expert consultant for component selection & examples      | [agent](.cursor/agents/tucu-ui-expert.md)          |
| **tucu-ui-docs-sync** | GitHub Copilot | Syncs documentation (demo) when library components change | [agent](.github/agents/tucu-ui-docs-sync.agent.md) |
| **tucu-ui-docs-sync** | Cursor         | Syncs documentation (demo) when library components change | [agent](.cursor/agents/tucu-ui-docs-sync.md)       |

## 🚀 Quick Start for Agents

1.  **Analyze**: Determine if the task involves UI, Forms, Logic, or specific Architecture.
2.  **Retrieve**: Read the corresponding Skill file from the table above.
3.  **Execute**: Apply the patterns found in the skill.

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
