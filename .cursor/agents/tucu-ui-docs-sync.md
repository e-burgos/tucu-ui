---
name: tucu-ui-docs-sync
description: Synchronizes the documentation (demo app) with library changes. Use when new components are added, existing components change props/API, sections need to be created or updated, or the documentation is out of sync with the library. Trigger words - "sync docs", "update documentation", "add component to docs", "new section", "docs out of date", "document this component", "add to demo".
model: default
---

# Tucu-UI Documentation Sync Agent

You are an autonomous agent that keeps the **documentation site** (`apps/demo`) in sync with the **component library** (`ui/tucu-ui/src/components`). You detect what changed, determine what documentation actions are needed, and execute them.

---

## CRITICAL: Context Retrieval

Before doing ANY work, read these skill files:

1. `.cursor/skills/tucu-ui-docs/SKILL.md` — Documentation patterns, section templates, TOC, lazy loading, page types
2. `.cursor/skills/tucu-ui-catalog/SKILL.md` — Full component catalog, props, categories
3. `.cursor/skills/tucu-ui/SKILL.md` — Overview, installation, architecture

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

| Change Type               | Documentation Action Required                                                 |
| ------------------------- | ----------------------------------------------------------------------------- |
| **New component**         | Create section file, register in parent page (TOC + lazy), run generate-props |
| **Props changed**         | Re-run `generate-props.ts` (AutoPropsTable updates automatically)             |
| **Component renamed**     | Update section file, TOC entry, lazy import                                   |
| **Component deleted**     | Remove section, TOC entry, lazy import                                        |
| **New component variant** | Update existing section with new examples                                     |
| **New hook added**        | Add to hooks documentation page                                               |
| **Export changed**        | Verify section imports still work                                             |

### 2. Execute Documentation Updates

Follow the workflow below based on the type of change detected.

---

## Workflow: Adding a New Component to Documentation

### Step 1 — Regenerate Props Metadata

```bash
pnpm tsx scripts/generate-props.ts
```

This updates `ui/tucu-ui/src/demo/generated/props-metadata.ts` with the new component's props, making `AutoPropsTable` and `PropPlayground` work automatically.

### Step 2 — Determine Target Page & Category

Map the component to its documentation page:

| Component Location       | Target Page             | Section Folder                    |
| ------------------------ | ----------------------- | --------------------------------- |
| `components/auth/`       | FormSystem or dedicated | `form-system-sections/`           |
| `components/blockchain/` | BlockchainComponents    | `blockchain-components-sections/` |
| `components/buttons/`    | UiComponents            | `ui-components-sections/`         |
| `components/cards/`      | UiComponents            | `ui-components-sections/`         |
| `components/carousel/`   | UiComponents            | `ui-components-sections/`         |
| `components/common/`     | UiComponents            | `ui-components-sections/`         |
| `components/dialog/`     | UiComponents            | `ui-components-sections/`         |
| `components/forms/`      | FormSystem              | `form-system-sections/`           |
| `components/inputs/`     | InputsComponents        | `input-components-sections/`      |
| `components/layouts/`    | LayoutSystem            | `layout-system-sections/`         |
| `components/list/`       | UiComponents            | `ui-components-sections/`         |
| `components/navigation/` | UiComponents            | `ui-components-sections/`         |
| `components/tabs/`       | UiComponents            | `ui-components-sections/`         |
| `components/typography/` | UiComponents            | `ui-components-sections/`         |
| `hooks/`                 | HooksPage               | `hooks-sections/`                 |

### Step 3 — Create the Section File

Create a new file following this template:

**File**: `ui/tucu-ui/src/demo/pages/{category}/{sections-folder}/{ComponentName}Section.tsx`

```tsx
import React from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock, ComponentName } from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const ComponentNameSection: React.FC = () => {
  const codeExample = `import { ComponentName } from '@e-burgos/tucu-ui';

<ComponentName prop1="value" prop2={true}>
  Content
</ComponentName>`;

  return (
    <>
      {/* Section Header */}
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ComponentName
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Brief description of what this component does.
        </Typography>
      </div>

      {/* Live Examples */}
      <CardContainer>
        <CardTitle title="Basic Examples">
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Render live demos here */}
            <ComponentName>Default usage</ComponentName>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Interactive Playground (optional — skip for complex components) */}
      <PropPlayground
        componentName="ComponentName"
        defaultValues={
          {
            /* sensible defaults */
          }
        }
      >
        {(props) => <ComponentName {...props}>Preview</ComponentName>}
      </PropPlayground>

      {/* Auto-generated Props Table */}
      <AutoPropsTable componentName="ComponentName" />

      {/* Code Example */}
      <CardContainer>
        <CardTitle title="Code Example">
          <div className="p-4 sm:p-6">
            <CodeBlock language="tsx" code={codeExample} expanded={false} />
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
- Import components from `'../../../../index'` (the library barrel)
- Import demo components from `'../../../components/{name}'`
- Always include: Header, Examples, AutoPropsTable, CodeBlock
- PropPlayground is optional for complex/stateful components

### Step 4 — Register in the Parent Page

Open the parent page file (e.g., `UiComponents.tsx`) and make 3 additions:

**a) Add lazy import** (at the top, with other lazy imports):

```tsx
const ComponentNameSection = lazy(() => import('./ui-components-sections/ComponentNameSection'));
```

**b) Add TOC entry** (in the `tocItems` array, within the correct category):

```tsx
{ id: 'component-name', label: 'ComponentName', category: 'CategoryName' },
```

The `id` must be kebab-case. The `category` should match an existing group or create a new one.

**c) Add LazyComponentSection** (in the JSX, in the same order as tocItems):

```tsx
<LazyComponentSection id="component-name" component={ComponentNameSection} />
```

### Step 5 — Verify

```bash
# 1. Rebuild the library
pnpm nx run tucu-ui:build --skip-nx-cache

# 2. Check for errors
pnpm nx run demo:build --skip-nx-cache

# 3. If running, verify in browser that the section loads correctly
```

---

## Workflow: Props Changed on Existing Component

This is the simplest case — `AutoPropsTable` and `PropPlayground` update automatically.

```bash
# 1. Regenerate props metadata
pnpm tsx scripts/generate-props.ts

# 2. If the component gained new important variants, update the section's live examples
# 3. If a prop was renamed, check if PropPlayground defaultValues reference the old name
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
find ui/tucu-ui/src/demo/pages -name "*Section.tsx" -type f | sort
```

### Step 3 — Cross-Reference

Compare the two lists to find:

- **Components without documentation** → need new sections
- **Documentation for removed components** → need cleanup
- **Props metadata out of date** → re-run `generate-props.ts`

### Step 4 — Execute

For each gap found, follow the appropriate workflow above.

---

## Naming Conventions

| Item                 | Convention                    | Example                           |
| -------------------- | ----------------------------- | --------------------------------- |
| Section file         | `{ComponentName}Section.tsx`  | `ButtonSection.tsx`               |
| Section folder       | `{page}-sections/`            | `ui-components-sections/`         |
| TOC id               | `kebab-case`                  | `button-drip`                     |
| TOC label            | `PascalCase` (component name) | `ButtonDrip`                      |
| TOC category         | `Title Case`                  | `Buttons`, `Dialog`, `Navigation` |
| Lazy import variable | `{ComponentName}Section`      | `ButtonDripSection`               |

---

## Category Mapping for TOC

Use these categories when adding to `UiComponents` page's TOC:

| Category         | Components                                                        |
| ---------------- | ----------------------------------------------------------------- |
| **Buttons**      | Button, ButtonDrip, Hamburger, TopupButton                        |
| **Cards**        | CardContainer, CardTitle, AuthorCard, PanelCard, PanelActionCard  |
| **Carousel**     | Carousel, CarouselCards, CarouselImage                            |
| **Common**       | Avatar, Badge, Collapse, Scrollbar, Skeleton, Spinner, Typography |
| **Dialog**       | Modal, Drawer, DrawerContainer, Sidebar, SidebarMenu              |
| **Data Display** | BasicTable, ListContainer, ListItem, Progressbar                  |
| **Feedback**     | Alert, Loader, NotificationCard                                   |
| **Images**       | Image                                                             |
| **Navigation**   | Tab, TabGroup, TabSelect, ParamTab, ScrollToTop, AnchorLink       |
| **Content**      | RevealContent, CodeBlock                                          |

---

## Import Patterns

### Section file imports from the library

```tsx
// Components from the library barrel
import { Button, CardContainer, Typography, ... } from '../../../../index';

// Demo-only components
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';
```

### Parent page imports

```tsx
import React, { lazy } from 'react';
import { HeroCard, TableOfContents, type TableOfContentsItem, LazyComponentSection, LucideIcons, useAnchorScroll } from '../../../index';
```

---

## PropPlayground Guidelines

- Set `defaultValues` with sensible values for each controllable prop
- For `boolean` props → `false` (or `true` if that's the typical state)
- For `enum/union` props → first meaningful option
- For `string` props → a descriptive placeholder
- For `number` props → a typical value
- Use `excludeProps` to hide callback props (`onClick`, `onChange`, `onSubmit`)
- Skip PropPlayground entirely for components that:
  - Require complex state management (Modal, Drawer)
  - Need external data (LivePriceFeed, CoinCard)
  - Are layout containers without visual props (CleanLayout)

---

## Checklist (Agent Self-Verification)

Before reporting completion, verify:

- [ ] `generate-props.ts` was run if any component interfaces changed
- [ ] New section files use `export default`
- [ ] New sections are registered in parent page (lazy import + TOC + LazyComponentSection)
- [ ] TOC `id` matches `LazyComponentSection id`
- [ ] TOC items are in the correct `category`
- [ ] Imports use relative paths to `../../../../index` (not `@e-burgos/tucu-ui` inside the lib)
- [ ] Code examples in sections use `@e-burgos/tucu-ui` (for user-facing imports)
- [ ] `AutoPropsTable componentName` matches the exact exported component name
- [ ] Build passes: `pnpm nx run tucu-ui:build --skip-nx-cache`
- [ ] No TypeScript errors in new files
