---
name: tucu-ui-docs-sync
description: Synchronizes the documentation site (ui/tucu-docs) with library changes. USE WHEN new components are added, existing components change props/API, sections need to be created or updated, or the documentation is out of sync with the library. Trigger words - "sync docs", "update documentation", "add component to docs", "new section", "docs out of date", "document this component", "add to docs".
---

# Tucu-UI Documentation Sync Agent

You are an autonomous agent that keeps the **documentation site** (`ui/tucu-docs`) in sync with the **component library** (`ui/tucu-ui/src/components`). You detect what changed, determine what documentation actions are needed, and execute them.

> The docs site used to live inside `ui/tucu-ui/src/demo` and `apps/demo` — it was extracted into its own package, `ui/tucu-docs`, which consumes the **published-style** `@e-burgos/tucu-ui` import path plus an internal-only doc-tooling subsystem (`docs-kit`, see below). If you see any reference to `apps/demo` or `ui/tucu-ui/src/demo` elsewhere (old comments, stale docs), it's leftover from before that extraction — don't follow it.

---

## CRITICAL: Context Retrieval

Before doing ANY work, use the **tucu-ui MCP server** (`npx @e-burgos/tucu-ui-mcp`, registered per-tool — see `.mcp.json` / `.vscode/mcp.json`):

1. Use `list_components` / `search_components` tools — Get full component catalog with categories and props
2. Read resource `tucu://catalog` — Complete component reference
3. Read resource `tucu://best-practices` — Documentation patterns and conventions
4. Consider `generate_documentation` tool — it can scaffold a hub page + sections for a component directly; use it as a starting point and adjust to match the conventions below rather than hand-writing from scratch every time.

---

## The docs-kit subsystem

`ui/tucu-ui/src/docs-kit/` is a doc-building toolkit that lives **inside** the library source but is **not part of its public npm exports** (`ui/tucu-ui/package.json`'s `exports` map only has `.`, `./styles`, `./theme` — no `./docs-kit`). It's reached from `ui/tucu-docs` via a workspace-only TypeScript path alias:

```
"@tucu-ui-internal/*": ["./ui/tucu-ui/src/*"]     // tsconfig.base.json
```

So `@tucu-ui-internal/docs-kit/components/auto-props-table` resolves to `ui/tucu-ui/src/docs-kit/components/auto-props-table.tsx`. It provides:

- `AutoPropsTable` / `PropPlayground` — same purpose as before, same API (`componentName`, `defaultValues`, `excludeProps`)
- `HeroCard` — the section/page header (title, description, icon, optional `githubButton`/`getStartedButton`/`docsButton`)
- `DynamicSectionsPage` + `SectionConfig` — replaces the old three-separate-registrations pattern (see below)
- `TableOfContents`, `nav-options`, `lazy-component-section` — supporting pieces for `DynamicSectionsPage`
- `generated/props-metadata.ts` — the output of `scripts/generate-props.ts` (see caveat below)

Both `HeroCard` and everyday components (`CardContainer`, `CardTitle`, `Typography`, `CodeBlock`, `LucideIcons`, etc.) are imported from the **public** `@e-burgos/tucu-ui` package import path in section files — only the doc-building helpers come from `@tucu-ui-internal/docs-kit/...`.

`scripts/generate-props.ts` writes to `ui/tucu-ui/src/docs-kit/generated/props-metadata.ts`, which is exactly what `AutoPropsTable`/`PropPlayground` import from (fixed 2026-07-17 — it used to hardcode a stale `ui/tucu-ui/src/demo/generated` path left over from before the `ui/tucu-docs` extraction, silently updating a file nothing read).

---

## Your Responsibilities

### 1. Detect Library Changes

When invoked, analyze what has changed in the library:

```bash
# Check git diff for component changes
git diff --name-only HEAD~1 -- ui/tucu-ui/src/components/
git diff --name-only --diff-filter=A -- ui/tucu-ui/src/components/   # New files
git diff --name-only --diff-filter=M -- ui/tucu-ui/src/components/   # Modified files
```

Classify changes into:

| Change Type               | Documentation Action Required                                                        |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **New component**         | Create section file, add an entry to the parent page's `sections` array, regenerate props |
| **Props changed**         | Regenerate props metadata (`AutoPropsTable` updates automatically)                    |
| **Component renamed**     | Update section file name, `sections` entry, lazy import                              |
| **Component deleted**     | Remove the section file and its `sections` entry                                      |
| **New component variant** | Update existing section with new examples                                             |
| **New hook added**        | Add to the hooks documentation page (`features/hooks-utilities-sections/`)            |
| **Export changed**        | Verify section imports still resolve against the published-style `@e-burgos/tucu-ui` import |

### 2. Execute Documentation Updates

Follow the workflow below based on the type of change detected.

---

## Workflow: Adding a New Component to Documentation

### Step 1 — Regenerate Props Metadata

```bash
pnpm tsx scripts/generate-props.ts
```

This updates `ui/tucu-ui/src/docs-kit/generated/props-metadata.ts` with the new component's props, making `AutoPropsTable` and `PropPlayground` work automatically.

### Step 2 — Determine Target Page & Category

`ui/tucu-docs/src/pages/` currently has these top-level page groups, each with its own `*-sections/` folder(s):

| Page group      | Sections folder(s)                                                                 |
| ---------------- | -------------------------------------------------------------------------------------- |
| `components/`    | `ui-components-sections/`, `input-components-sections/`, `charts-sections/`         |
| `blockchain/`    | `blockchain-components-sections/`                                                    |
| `datatable/`     | `datatable-sections/`                                                                |
| `design-system/` | `design-system-sections/`, `layout-system-sections/`, `theming-guide-sections/`      |
| `features/`      | `accessibility-sections/`, `hooks-utilities-sections/`, `icon-system-sections/`, `routing-system-sections/` |
| `form-system/`   | `form-system-sections/`                                                              |
| `macos/`         | `macos-sections/`                                                                    |
| `mcp/`           | `mcp-sections/`                                                                       |
| `tailwind/`      | (Tailwind utility docs, not component sections)                                      |
| `introduction/`  | (landing page, not component sections)                                               |

For a new UI component, check the parent page files (`UiComponents.tsx`, `InputsComponents.tsx`, `ChartsComponents.tsx`, etc.) under `ui/tucu-docs/src/pages/components/` to see which one already covers its category — don't guess from the old category table below, it's from before this restructuring and may not reflect current groupings. Read the target page's `sections` array to confirm the right `category` string to reuse (or introduce a new one).

### Step 3 — Create the Section File

**File**: `ui/tucu-docs/src/pages/{page-group}/{sections-folder}/{ComponentName}Section.tsx`

```tsx
import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  ComponentName,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const ComponentNameSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="ComponentName"
        description="Brief description of what this component does."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Component className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComponentName>Default usage</ComponentName>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Interactive Playground (optional — skip for complex/stateful-without-workaround components) */}
      <PropPlayground componentName="ComponentName" defaultValues={{}} excludeProps={[]}>
        {(props) => <ComponentName {...props}>Preview</ComponentName>}
      </PropPlayground>

      <AutoPropsTable componentName="ComponentName" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ComponentName } from '@e-burgos/tucu-ui';

<ComponentName prop1="value" prop2={true}>
  Content
</ComponentName>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ComponentNameSection;
```

**Rules**:

- File name: `{ComponentName}Section.tsx` (PascalCase)
- MUST use `export default` (required by `React.lazy()`)
- Import library components (including `HeroCard`, `LucideIcons`) from `@e-burgos/tucu-ui` — the public import path, even though this is workspace-internal code
- Import `AutoPropsTable`/`PropPlayground` from `@tucu-ui-internal/docs-kit/components/...` — the internal-only alias
- Always include: `HeroCard` header, live examples, `AutoPropsTable`, code example
- `PropPlayground` is optional for complex/stateful components (see guidelines below)

### Step 4 — Register in the Parent Page

Parent pages (e.g. `UiComponents.tsx`) use a **single `sections: SectionConfig[]` array** — there is no separate TOC array or separate JSX registration anymore (that three-step pattern is retired). Add one entry:

```tsx
{
  id: 'component-name',       // kebab-case, used in the URL
  label: 'ComponentName',
  category: 'CategoryName',   // must match an existing category in this page's sections array, or introduce a new one
  component: lazy(() => import('./ui-components-sections/ComponentNameSection')),
},
```

The page component itself renders `<DynamicSectionsPage sections={sections} hero={<HeroCard .../>} hideHeroInSubSections />` — you don't need to touch that render call, only the `sections` array feeding it.

### Step 5 — Verify

```bash
# 1. Rebuild the library (docs-kit lives inside it)
pnpm nx run tucu-ui:build --skip-nx-cache

# 2. Check the docs site builds
pnpm nx run tucu-docs:build --skip-nx-cache

# 3. If running, verify in browser that the section loads correctly
```

---

## Workflow: Props Changed on Existing Component

This is the simplest case — `AutoPropsTable` and `PropPlayground` update automatically once the generated metadata is regenerated.

```bash
# 1. Regenerate props metadata
pnpm tsx scripts/generate-props.ts

# 2. If the component gained new important variants, update the section's live examples
# 3. If a prop was renamed, check if PropPlayground defaultValues/excludeProps reference the old name
```

---

## Workflow: Full Documentation Audit

When asked to do a full sync/audit:

### Step 1 — Inventory Library Components

```bash
# List all exported components
grep -r "export.*default\|export {" ui/tucu-ui/src/components/ --include="*.tsx" -l
```

### Step 2 — Inventory Documented Sections

```bash
# List all section files
find ui/tucu-docs/src/pages -name "*Section.tsx" -type f | sort
```

### Step 3 — Cross-Reference

Compare the two lists to find:

- **Components without documentation** → need new sections
- **Documentation for removed components** → need cleanup
- **Props metadata out of date** → regenerate (`pnpm tsx scripts/generate-props.ts`)

### Step 4 — Execute

For each gap found, follow the appropriate workflow above.

---

## Naming Conventions

| Item                 | Convention                    | Example                           |
| --------------------- | ------------------------------ | ----------------------------------- |
| Section file         | `{ComponentName}Section.tsx`  | `ButtonSection.tsx`                |
| Section folder       | `{page-group}-sections/`      | `ui-components-sections/`          |
| `sections` entry `id` | `kebab-case`                  | `button-drip`                      |
| `sections` entry `label` | `PascalCase` (component name) | `ButtonDrip`                    |
| `sections` entry `category` | Match an existing group in that page, or introduce one | `Buttons`, `Dialog`, `Navigation` |
| Lazy import variable  | inline in the `sections` array, no separate named const needed | `lazy(() => import('./x-sections/ButtonDripSection'))` |

---

## PropPlayground Guidelines

### When to Include

Add `PropPlayground` for any component with 2+ controllable simple props (boolean, enum, string, number) that can render a meaningful preview in isolation.

### defaultValues Strategy

| Prop Type    | Strategy                      | Example                                    |
| ------------ | ------------------------------ | -------------------------------------------- |
| `boolean`    | Use the typical/visible state | `isLoading: true`, `arrow: true`           |
| `enum/union` | First meaningful option       | `variant: 'solid'`, `color: 'primary'`     |
| `string`     | Descriptive placeholder       | `label: 'Click me'`, `title: 'Card Title'` |
| `number`     | Sensible visible value        | `value: 65`, `size: 60`                    |

### excludeProps Strategy

Always exclude these categories of props from interactive controls:

- **Callbacks**: `onClick`, `onChange`, `onSubmit`, `onClose`, `onBack`, `setIsOpen`, `onDismiss`, `onOpenChange`
- **Complex objects**: `menuItems`, `items`, `cards`, `images`, `tabMenu`, `columns`, `data`, `logo`, `actor`
- **ReactNode props**: `icon`, `content`, `triggerIcon`, `actionContent`, `buttonContainer`
- **Style overrides**: `scrollbarStyle`, `style`, `barClassName`, `containerClassName`
- **Accessibility**: `aria-label`, `aria-describedby`
- **Routing props that need a fixed safe value**: e.g. `AnchorLink`'s `to` (excluded, fixed via the render-function wrapper instead)

### Stateful Component Workarounds

For components requiring state management (Modal, Drawer), `PropPlayground` IS supported with workarounds:

- **Modal**: Set `isOpen: true` in defaultValues so the preview is always visible. Pass `setIsOpen={() => {}}` and `onClose={() => {}}` in the children render function. Exclude state callbacks.
- **Drawer**: Set `isOpen: true` in defaultValues. Wrap the component in a constrained relative container:
  ```tsx
  {
    (props) => (
      <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
        <Drawer {...props} setIsOpen={() => {}}>
          Drawer Content
        </Drawer>
      </div>
    );
  }
  ```

### When to Skip PropPlayground

Skip ONLY for components that:

- Have **zero controllable props** (e.g., `CardContainer` — only `className`)
- Require **complex array/object data** as primary props (e.g., `BasicTable` needs `columns[]` + `data[]`, `TabSelect` needs `tabMenu[]`, `CarouselCards` needs `cards[]`)
- Are **compound components** requiring coordinated children (e.g., `TabGroup` + `TabList` + `TabItem` + `TabPanels`)
- Use **imperative APIs** (e.g., `Toast` via `useToastStore`)
- Have **no visual output** without external data (e.g., `LivePriceFeed`, `CoinCard`)
- Are **animated SVGs** with no controllable props (e.g., `DefiAppLogo`)

---

## Checklist (Agent Self-Verification)

Before reporting completion, verify:

- [ ] Confirmed `ui/tucu-ui/src/docs-kit/generated/props-metadata.ts` (not `demo/generated/...`) actually changed if props were touched
- [ ] New section files use `export default`
- [ ] New sections are registered as a `SectionConfig` entry in the parent page's `sections` array (no separate TOC/JSX steps — those don't exist anymore)
- [ ] `sections` entry `id` is kebab-case and unique on that page
- [ ] `sections` entry `category` matches an existing group on that page (or is a deliberate new one)
- [ ] Section file imports library components (incl. `HeroCard`, `LucideIcons`) from `@e-burgos/tucu-ui`, and doc helpers from `@tucu-ui-internal/docs-kit/components/...`
- [ ] Code examples shown to the user use `@e-burgos/tucu-ui` (that part hasn't changed)
- [ ] `AutoPropsTable componentName` matches the exact exported component name
- [ ] PropPlayground added for components with 2+ controllable simple props
- [ ] PropPlayground `excludeProps` covers callbacks, complex objects, ReactNode props, and any fixed-value routing/identity props
- [ ] PropPlayground `defaultValues` uses visible/meaningful defaults for each type
- [ ] Stateful components use workarounds (relative container, dummy state setters)
- [ ] Build passes: `pnpm nx run tucu-ui:build --skip-nx-cache` and `pnpm nx run tucu-docs:build --skip-nx-cache`
- [ ] No TypeScript errors in new files
