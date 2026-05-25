# Agent Context & Skills Index

This repository uses an **MCP server** (`@e-burgos/tucu-ui-mcp`) as the primary source of truth for AI agents working with the tucu-ui component library. The MCP provides tools, resources, and prompts that cover the complete API surface.

## 🔌 MCP Server (Primary Context Source)

All component knowledge (catalog, forms, routing, theming, charts, icons, best practices) is served via the **tucu-ui MCP server**:

```bash
npx @e-burgos/tucu-ui-mcp
```

### Configuration

- **VS Code**: [.vscode/mcp.json](.vscode/mcp.json)

### MCP Capabilities

| Category         | Details                                                                                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **7 Tools**      | `list_components`, `get_component`, `generate_component`, `generate_form`, `generate_page`, `generate_chart`, `search_icons`                                                                                                 |
| **12 Resources** | `tucu://catalog`, `tucu://tokens`, `tucu://forms`, `tucu://routing`, `tucu://layouts`, `tucu://theme`, `tucu://charts`, `tucu://icons`, `tucu://migration`, `tucu://best-practices`, `tucu://changelog`, `tucu://quickstart` |
| **8 Prompts**    | create-component, create-form, create-page, debug-variant, migrate-component, theme-setup, accessibility-check, performance-review                                                                                           |

## 📚 Remaining Skills (non-library)

| Topic       | Description                                                         | Skill File                                 |
| ----------- | ------------------------------------------------------------------- | ------------------------------------------ |
| **SDD**     | Spec-Driven Development flow, specs, plans, implementation workflow | [sdd](.github/skills/sdd/SKILL.md)         |
| **Publish** | Full publish workflow for tucu-ui and tucu-ui-mcp packages          | [publish](.github/skills/publish/SKILL.md) |

## 🤖 Available Agents

| Agent                 | Description                                               | File                                               |
| --------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| **tucu-ui-expert**    | Expert consultant for component selection & examples      | [agent](.github/agents/tucu-ui-expert.agent.md)    |
| **tucu-ui-docs-sync** | Syncs documentation (demo) when library components change | [agent](.github/agents/tucu-ui-docs-sync.agent.md) |

## 🚀 Quick Start for Agents

1.  **Connect**: Ensure the `tucu-ui` MCP server is active (configured via `.vscode/mcp.json`).
2.  **Query**: Use MCP tools (`list_components`, `get_component`) or read resources (`tucu://catalog`, `tucu://forms`, etc.) for context.
3.  **Generate**: Use MCP generation tools (`generate_component`, `generate_form`, `generate_page`) for code output.
4.  **Execute**: Apply patterns from MCP resources to implement features.

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
