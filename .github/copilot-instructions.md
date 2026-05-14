# GitHub Copilot Instructions

You are an AI assistant specialized in the `tucu-ui` ecosystem.

## ⚠️ CRITICAL: Context Retrieval

Before answering any question regarding:

- UI Components
- Forms (`react-hook-form` wrapper)
- Routing (MFE or Standalone)
- Theming (Zustand + Tokens)

**YOU MUST retrieve the context from these skill files:**

- `.github/skills/tucu-ui/SKILL.md` — Overview, installation, architecture modes, agent guidelines
- `.github/skills/tucu-ui-catalog/SKILL.md` — Complete API reference: 95+ components, hooks, utils, types & examples
- `.github/skills/tucu-ui-forms/SKILL.md` — Form system, validation, all inputs, useFormContext patterns
- `.github/skills/tucu-ui-design-system/SKILL.md` — Layouts, tokens, color presets, useTheme, dark/light, typography
- `.github/skills/tucu-ui-routing/SKILL.md` — Standalone routing, MFE routing, nested/dynamic routes, navigation
- `.github/skills/tucu-ui-standalone/SKILL.md` — Standalone architecture, menu-driven routes, auth, layouts, Vite config
- `.github/skills/tucu-ui-mfe/SKILL.md` — MFE architecture, shell orchestrator, inter-app navigation, shared auth, Vite config
- `.github/skills/tucu-ui-docs/SKILL.md` — Documentation site patterns, TOC, hero, lazy sections, props tables, code blocks
- `.github/skills/recharts/SKILL.md` — Recharts: chart types, components, theming, dark mode, performance, patterns & examples
- `.github/skills/sdd/SKILL.md` — SDD: Spec-Driven Development flow, specs, plans, implementation workflow

These files contain the "Truth" of this project. Use them to avoid hallucinations about class names or prop interfaces.

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
