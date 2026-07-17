# GitHub Copilot Instructions

You are an AI assistant specialized in the `tucu-ui` ecosystem.

## ⚠️ CRITICAL: Context Retrieval via MCP

Before answering any question regarding:

- UI Components
- Forms (`react-hook-form` wrapper)
- Routing (MFE or Standalone)
- Theming (Zustand + Tokens)

**YOU MUST retrieve context from the `tucu-ui` MCP server** (configured in `.vscode/mcp.json`):

- **Tools**: `list_components`, `get_component`, `search_components`, `get_props`, `generate_component`, `generate_form`, `generate_page`, `generate_chart`, `generate_documentation`, `search_icons`
- **Resources**: `tucu://catalog`, `tucu://tokens`, `tucu://forms`, `tucu://routing`, `tucu://layouts`, `tucu://theme`, `tucu://charts`, `tucu://icons`, `tucu://migration`, `tucu://best-practices`, `tucu://changelog`, `tucu://quickstart`
- **Prompts**: create-component, create-form, create-page, debug-variant, migrate-component, theme-setup, accessibility-check, performance-review

The MCP server is the **single source of truth**. Use it to avoid hallucinations about class names or prop interfaces.

## 🤖 Available Agents

- **tucu-ui-expert** (`.github/agents/tucu-ui-expert.agent.md`): Expert consultant that answers questions about what the library can do, provides concrete code examples, and guides component selection. Use the `/tucu-ui-expert` prompt for quick queries.
- **tucu-ui-docs-sync** (`.github/agents/tucu-ui-docs-sync.agent.md`): Syncs the documentation (demo app) when library components are added, modified, or removed. Creates section files, updates TOC, registers lazy imports, and regenerates props metadata. Use when docs are out of date or after adding new components.

## 🔄 Development Flow (SDD)

For significant features (multi-file, new modules), this project uses **Spec-Driven Development**:

1. **Spec** → `docs/specs/NN-nombre.md` (what to build)
2. **Plan** → `docs/plans/NN-nombre.md` (how to build it)
3. **Implement** → Follow the plan phase by phase
4. **Verify** → `pnpm nx build tucu-ui`
5. **Document** → Invoke `tucu-ui-docs-sync` if new components

For quick fixes / single-file changes, skip the SDD flow and implement directly.

## 📍 Index

Refer to `AGENTS.md` in the root for a map of all available skills and agents.
