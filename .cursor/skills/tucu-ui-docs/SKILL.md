# Skill: Tucu-UI Documentation Sites

Complete guide to building **documentation sites and knowledge portals** with `@e-burgos/tucu-ui`. Covers page composition patterns, table of contents, lazy-loaded sections, hero banners, component API reference pages, code examples, and consistent documentation design.

> **Companion Skills**: `tucu-ui`, `tucu-ui-catalog`, `tucu-ui-design-system`, `tucu-ui-standalone` > **Live Docs**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/)

---

## Reference Implementation

The tucu-ui repository ships a documentation demo at `ui/tucu-ui/src/demo/` and a live consumer at `apps/demo/`. Together they showcase the full documentation pattern: hero banners, table of contents sidebar, lazy-loaded sections, props tables, code blocks, live demos, and feature grids.

**The demo documents a component library, but the pattern is generic.** You can use the same components and structure to document an API, a design system, a product, internal processes, or any knowledge base.

---

## 1. Architecture Overview

A documentation site built with tucu-ui is a **standalone SPA** (see `tucu-ui-standalone` skill) whose pages follow two composable patterns:

```
┌─────────────────────────────────────────────────────────────┐
│               Documentation Site (SPA)                      │
│                                                             │
│  ThemeProvider (standalone)                                 │
│   └─ menuItems[] → top-level doc categories                │
│       ├─ Introduction Page ───── Page Type A                │
│       ├─ Category Page ───────── Page Type A                │
│       │   └─ dropdownItems[]                               │
│       │       ├─ Catalog Page ── Page Type B (with TOC)    │
│       │       └─ Guide Page ──── Page Type B (with TOC)    │
│       └─ ...                                               │
└─────────────────────────────────────────────────────────────┘
```

### Page Types

| Type  | Name                     | When to use                                                                |
| ----- | ------------------------ | -------------------------------------------------------------------------- |
| **A** | Introduction / Overview  | Landing pages, category index with feature cards — no sidebar TOC          |
| **B** | Catalog / Guide with TOC | Long-form content with multiple sections, sidebar navigation, lazy loading |

---

## 2. Key Components for Documentation

All of these are exported by `@e-burgos/tucu-ui` (from the `demo` sub-module) and can be imported directly.

| Component              | Purpose                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `HeroCard`             | Page hero banner — title, description, icon, CTA buttons (GitHub, docs, custom)                            |
| `TableOfContents`      | Sidebar navigation with IntersectionObserver-based active tracking, category grouping, mobile drawer       |
| `LazyComponentSection` | Viewport-aware lazy loader for sections — shows `Skeleton` fallback, integrates with TOC via custom events |
| `TableOfContentsItem`  | TypeScript interface for TOC entries: `{ id, label, category? }`                                           |
| `CardContainer`        | Base card wrapper used for demos, feature lists, code examples                                             |
| `CardTitle`            | Collapsible card header — used inside `CardContainer` for "Basic Examples", "Props", "Code Example"        |
| `CodeBlock`            | Syntax-highlighted code display with `language` and `expanded` props                                       |
| `BasicTable`           | Data table for general tabular data with custom column renderers                                           |
| `AutoPropsTable`       | Auto-generated props table from TypeScript interfaces (uses `propsRegistry`)                               |
| `PropPlayground`       | Interactive prop controls with live preview — auto-detects types from registry                             |
| `Typography`           | Semantic text component — `tag="h1"` through `tag="headline"`                                              |
| `Badge`                | Status / count indicators                                                                                  |
| `LucideIcons`          | Unified icon system for section headers, navigation, and feature cards                                     |
| `Skeleton`             | Loading placeholder during lazy section hydration                                                          |
| `useAnchorScroll`      | Hook for automatic scroll-to-section from URL hash                                                         |
| `ScrollToTop`          | Floating button to scroll back to top                                                                      |
| `Scrollbar`            | Custom scrollbar used inside the TOC sidebar                                                               |
| `AnchorLink`           | Link wrapper for external/internal anchors                                                                 |

### Import Pattern

```tsx
import { HeroCard, TableOfContents, type TableOfContentsItem, LazyComponentSection, CardContainer, CardTitle, CodeBlock, BasicTable, Typography, Badge, LucideIcons, useAnchorScroll, AutoPropsTable, PropPlayground } from '@e-burgos/tucu-ui';
```

---

## 3. Page Type A — Introduction / Overview

Used for landing pages and category index pages. No sidebar TOC, no lazy loading. All content renders directly.

### Structure

```tsx
import { HeroCard, CardContainer, Typography, LucideIcons } from '@e-burgos/tucu-ui';

export function MyIntroductionPage() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero */}
      <HeroCard
        title="My Documentation"
        description="Comprehensive guide to our platform."
        githubButton
        getStartedButton
        backgroundAnimation
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.BookOpen className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">
            Key Features
          </Typography>
          <Typography tag="p" className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <CardContainer key={i} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}>{feature.icon}</div>
                  <Typography tag="h3" className="font-semibold text-lg">
                    {feature.title}
                  </Typography>
                </div>
                <Typography tag="p" className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </div>
  );
}
```

### Pattern Rules

- Root container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Vertical spacing: `space-y-8 sm:space-y-12`
- `HeroCard` is always the first element
- Sections use centered headers (`text-center`) + responsive grids of `CardContainer`
- Feature cards use gradient icon containers: `bg-linear-to-br from-{color}-500 via-{color}-500 to-{color}-500`

---

## 4. Page Type B — Catalog / Guide with TOC

Used for long-form pages with many sections. Features a sidebar table of contents and lazy-loaded sections.

### Structure

```tsx
import React, { lazy } from 'react';
import { HeroCard, TableOfContents, type TableOfContentsItem, LazyComponentSection, LucideIcons, useAnchorScroll } from '@e-burgos/tucu-ui';

// Lazy load each section
const GettingStartedSection = lazy(() => import('./sections/GettingStartedSection'));
const APIReferenceSection = lazy(() => import('./sections/APIReferenceSection'));
const ExamplesSection = lazy(() => import('./sections/ExamplesSection'));
const BestPracticesSection = lazy(() => import('./sections/BestPracticesSection'));

export function MyGuidePage() {
  useAnchorScroll();

  const tocItems: TableOfContentsItem[] = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'examples', label: 'Examples' },
    { id: 'best-practices', label: 'Best Practices' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          <HeroCard
            title="My Guide"
            description="In-depth reference and examples."
            githubButton
            icon={
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
                <LucideIcons.FileText className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
              </div>
            }
          />

          <LazyComponentSection id="getting-started" component={GettingStartedSection} />
          <LazyComponentSection id="api-reference" component={APIReferenceSection} />
          <LazyComponentSection id="examples" component={ExamplesSection} />
          <LazyComponentSection id="best-practices" component={BestPracticesSection} />
        </div>
      </TableOfContents>
    </div>
  );
}
```

### Pattern Rules

- Outer wrapper: `<div className="relative scroll-smooth">`
- `TableOfContents` wraps all content and renders the sidebar
- Content wrapper inside TOC: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0`
- `HeroCard` always first inside the content wrapper
- Each section is a `LazyComponentSection` whose `id` matches a `tocItems[].id`
- Always call `useAnchorScroll()` at the top of the component

### TOC with Categories

For pages with many sections, group them with `category`:

```tsx
const tocItems: TableOfContentsItem[] = [
  { id: 'button', label: 'Button', category: 'Inputs' },
  { id: 'select', label: 'Select', category: 'Inputs' },
  { id: 'modal', label: 'Modal', category: 'Overlays' },
  { id: 'drawer', label: 'Drawer', category: 'Overlays' },
];
```

The `TableOfContents` component automatically renders collapsible category groups when `category` is present.

---

## 5. Section Composition Patterns

Each lazy-loaded section is a standalone React component exported as `default`. All sections follow a consistent internal structure.

### 5.1 Section Header (always present)

```tsx
<div className="text-center space-y-4">
  <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
    Section Title
  </Typography>
  <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
    Brief description of this section.
  </Typography>
</div>
```

### 5.2 Feature / Principle Section

Grid of cards with gradient icons — ideal for "Design Principles", "Key Features", "Benefits".

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
  {items.map((item, i) => (
    <CardContainer key={i}>
      <div className="w-full space-y-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-linear-to-br ${item.color} shadow-lg`}>{item.icon}</div>
          <Typography tag="h3" className="font-semibold text-lg">
            {item.title}
          </Typography>
        </div>
        <Typography tag="p" className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {item.description}
        </Typography>
      </div>
    </CardContainer>
  ))}
</div>
```

### 5.3 Component API Reference Section

The standard pattern for documenting a component or module — uses auto-generated props from TypeScript:

```tsx
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

export default function MyComponentSection() {
  const codeExample = `import { MyComponent } from '@e-burgos/tucu-ui';

<MyComponent variant="solid" size="medium">
  Hello World
</MyComponent>`;

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MyComponent
        </Typography>
        <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A versatile component for...
        </Typography>
      </div>

      {/* Live Examples */}
      <CardContainer>
        <CardTitle title="Basic Examples">
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">{/* Render live component demos here */}</div>
        </CardTitle>
      </CardContainer>

      {/* Interactive Playground */}
      <PropPlayground componentName="MyComponent" defaultValues={{ variant: 'solid' }}>
        {(props) => <MyComponent {...props}>Hello World</MyComponent>}
      </PropPlayground>

      {/* Auto-generated Props Table */}
      <AutoPropsTable componentName="MyComponent" />

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
}
```

### 5.4 Step-by-Step Tutorial Section

Sequential cards with numbered titles — ideal for guides, setup instructions, tutorials.

```tsx
<>
  <div className="text-center space-y-4">
    <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
      Getting Started
    </Typography>
    <Typography tag="p" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Follow these steps to set up your project.
    </Typography>
  </div>

  <CardContainer>
    <CardTitle title="1. Install the package">
      <div className="p-4 sm:p-6 space-y-4">
        <Typography tag="p">Run the following command:</Typography>
        <CodeBlock language="bash" code="pnpm install @e-burgos/tucu-ui" />
      </div>
    </CardTitle>
  </CardContainer>

  <CardContainer>
    <CardTitle title="2. Wrap your app">
      <div className="p-4 sm:p-6 space-y-4">
        <Typography tag="p">Add ThemeProvider at the root:</Typography>
        <CodeBlock language="tsx" code={wrapAppCode} />
      </div>
    </CardTitle>
  </CardContainer>

  <CardContainer>
    <CardTitle title="3. Create your first page">
      <div className="p-4 sm:p-6 space-y-4">
        <Typography tag="p">Define a component and add it to menuItems:</Typography>
        <CodeBlock language="tsx" code={firstPageCode} />
      </div>
    </CardTitle>
  </CardContainer>
</>
```

---

## 6. Recommended Navigation Structure

Use `StandaloneAppRoutesMenuItem[]` with `dropdownItems` to create a hierarchical documentation navigation:

```tsx
import { type StandaloneAppRoutesMenuItem, LucideIcons } from '@e-burgos/tucu-ui';

const menuItems: StandaloneAppRoutesMenuItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <IntroductionPage />, // Page Type A
    isPublic: true,
  },
  {
    name: 'Guides',
    path: '/guides',
    icon: <LucideIcons.BookOpen />,
    component: <GuidesOverview />, // Page Type A (index)
    isPublic: true,
    dropdownItems: [
      {
        name: 'Quick Start',
        path: '/guides/quick-start',
        icon: <LucideIcons.Rocket />,
        component: <QuickStartGuide />, // Page Type B
      },
      {
        name: 'Advanced',
        path: '/guides/advanced',
        icon: <LucideIcons.Settings />,
        component: <AdvancedGuide />, // Page Type B
      },
    ],
  },
  {
    name: 'API Reference',
    path: '/api',
    icon: <LucideIcons.Code />,
    component: <APIOverview />, // Page Type A (index)
    isPublic: true,
    dropdownItems: [
      {
        name: 'Components',
        path: '/api/components',
        icon: <LucideIcons.Component />,
        component: <ComponentsAPI />, // Page Type B with categorized TOC
      },
      {
        name: 'Hooks',
        path: '/api/hooks',
        icon: <LucideIcons.Wrench />,
        component: <HooksAPI />, // Page Type B
      },
    ],
  },
];
```

### Navigation Hierarchy Pattern

```
Home (Introduction — Page Type A)
├── Category 1 (Overview — Page Type A)
│   ├── Sub-page 1 (Guide / Catalog — Page Type B)
│   └── Sub-page 2 (Guide / Catalog — Page Type B)
├── Category 2 (Overview — Page Type A)
│   ├── Sub-page 1 (Page Type B)
│   └── Sub-page 2 (Page Type B)
└── ...
```

- Top-level items → category overview (Page Type A)
- `dropdownItems` → detailed pages (Page Type B with TOC)
- Use `hide: true` for utility routes (404, redirects)

---

## 7. Responsive Grid Patterns

| Grid                                        | Use case                           |
| ------------------------------------------- | ---------------------------------- |
| `grid-cols-1 sm:grid-cols-2`                | Feature/principle cards (2-column) |
| `grid-cols-1 md:grid-cols-2`                | Live demos, input showcases        |
| `grid-cols-1 md:grid-cols-3`                | Component variants, categories     |
| `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | Feature catalogs, utility cards    |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Stats, compact metrics             |

All grids use `gap-4 sm:gap-6` for consistent spacing.

---

## 8. Typography Hierarchy

| Purpose             | Component                   | Classes                                                      |
| ------------------- | --------------------------- | ------------------------------------------------------------ |
| Page title          | `HeroCard title`            | Handled internally (responsive h1)                           |
| Section heading     | `Typography tag="h2"`       | `text-3xl md:text-4xl font-bold`                             |
| Section subtitle    | `Typography tag="p"`        | `text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto` |
| Sub-section heading | `Typography tag="h3"`       | `text-lg font-semibold` or `text-xl font-bold`               |
| Card heading        | `CardTitle title="..."`     | Handled internally                                           |
| Small heading       | `Typography tag="h5"`       | `mb-3`                                                       |
| Body text           | `Typography tag="p"`        | `text-sm text-gray-600 dark:text-gray-300`                   |
| Label text          | `Typography tag="headline"` | `mb-4`                                                       |

---

## 9. Color Palette for Documentation Icons

Use distinct gradients for each section/category to create visual identity:

| Category        | Gradient                                       |
| --------------- | ---------------------------------------------- |
| Getting Started | `from-emerald-500 via-green-500 to-teal-500`   |
| Architecture    | `from-blue-500 via-cyan-500 to-sky-500`        |
| Configuration   | `from-purple-500 via-violet-500 to-indigo-500` |
| Components      | `from-indigo-500 via-purple-500 to-pink-500`   |
| Forms / Inputs  | `from-blue-500 via-indigo-500 to-purple-500`   |
| Features        | `from-emerald-500 via-teal-500 to-cyan-500`    |
| Performance     | `from-orange-500 via-yellow-500 to-amber-500`  |
| Security        | `from-red-500 via-pink-500 to-rose-500`        |
| Accessibility   | `from-teal-500 via-cyan-500 to-blue-500`       |
| Theming         | `from-amber-500 via-yellow-500 to-orange-500`  |

Apply to icon containers: `<div className="p-3 rounded-xl bg-linear-to-br from-... via-... to-... shadow-lg">`

---

## 10. Props Table Pattern (Auto-Generated)

The documentation system uses **auto-generated props tables** from TypeScript interfaces. No manual prop data is needed.

### AutoPropsTable Component

Renders a styled props table automatically from the component's TypeScript definition:

```tsx
import { AutoPropsTable } from '../../../components/auto-props-table';

// Basic usage — reads props from the generated registry
<AutoPropsTable componentName="Button" />

// With options
<AutoPropsTable
  componentName="Button"
  title="Custom Title"       // Override default "{ComponentName} Props"
  showFilePath               // Show source file path
  hideProps={['className']}  // Hide specific props
  filterProps={['color', 'variant', 'size']} // Show only these
/>
```

**Features**: Color-coded union types, "required" badges, sorted props (required first), auto-generated footer with prop count.

### PropPlayground Component

Interactive prop-by-prop controls with live preview:

```tsx
import { PropPlayground } from '../../../components/prop-playground';

<PropPlayground
  componentName="Button"
  defaultValues={{ color: 'primary', variant: 'solid', size: 'medium' }}
  excludeProps={['onClick']}
>
  {(props) => <Button {...props}>Click me</Button>}
</PropPlayground>
```

**Auto-detected control types**: boolean → Switch, enum → Select, string → Input, number → Input[number].

### Generating Props Metadata

Run the generation script when component interfaces change:

```bash
pnpm tsx scripts/generate-props.ts
```

Output: `ui/tucu-ui/src/demo/generated/props-metadata.ts` — registry of all 91 components with their props.

### Typical Section with Auto Props

```tsx
const MyComponentSection: React.FC = () => (
  <>
    {/* Header */}
    <div className="text-center space-y-4">
      <Typography tag="h2">MyComponent</Typography>
      <Typography tag="p">Description...</Typography>
    </div>

    {/* Live Examples */}
    <CardContainer>
      <CardTitle title="Basic Examples">
        <div className="p-4 sm:p-6">{/* demos */}</div>
      </CardTitle>
    </CardContainer>

    {/* Interactive Playground */}
    <PropPlayground componentName="MyComponent" defaultValues={{ variant: 'solid' }}>
      {(props) => <MyComponent {...props}>Hello</MyComponent>}
    </PropPlayground>

    {/* Auto-generated Props Table */}
    <AutoPropsTable componentName="MyComponent" />

    {/* Code Example */}
    <CardContainer>
      <CardTitle title="Code Example">
        <div className="p-4 sm:p-6">
          <CodeBlock language="tsx" code={codeExample} />
        </div>
      </CardTitle>
    </CardContainer>
  </>
);
```

---

## 11. HeroCard Configuration

`HeroCard` accepts several presets for CTA buttons:

| Prop                       | Result                                             |
| -------------------------- | -------------------------------------------------- |
| `githubButton`             | "View on GitHub" button with GitHub icon           |
| `getStartedButton`         | "Get Started" button linking to docs               |
| `docsButton="form-system"` | "View Docs" button for a specific section          |
| `backgroundAnimation`      | Animated colored circles behind the hero           |
| `customButton`             | Custom CTA with label, link, target, variant, icon |
| `content`                  | Completely custom content inside the hero          |

### Hero Icon Pattern

Always use a circular container with branded background:

```tsx
<div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
  <LucideIcons.YourIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
</div>
```

---

## 12. Performance Patterns

### Lazy Loading Sections

Every section in Page Type B should be lazy-loaded:

```tsx
const MySection = lazy(() => import('./sections/MySection'));
```

`LazyComponentSection` handles:

- **Viewport detection**: IntersectionObserver with 800px rootMargin (loads before the user scrolls to it)
- **TOC integration**: Listens for `forceLoadSection` custom events when TOC items are clicked
- **Hash navigation**: Loads immediately if the URL hash matches the section id
- **Skeleton fallback**: Shows `Skeleton` placeholders while loading

### NavOptions Component

For documentation sites, add a theme switch in the right side of the nav:

```tsx
import { SwitchMode, ListContainer } from '@e-burgos/tucu-ui';

export const NavOptions = () => <ListContainer label="Options" items={[{ id: 'theme', content: <SwitchMode /> }]} />;
```

Pass as `rightButton` to `ThemeProvider`:

```tsx
<ThemeProvider menuItems={menuItems} rightButton={<NavOptions />} />
```

---

## 13. Constants & External Links

Centralize all external URLs in a constants file:

```tsx
// src/utils/constants.ts
export const DOCS_URL = import.meta.env.VITE_APP_DOCS_URL;
export const GITHUB_URL = 'https://github.com/your-org/your-repo';
export const NPM_URL = 'https://www.npmjs.com/package/your-package';
```

This keeps links maintainable and lets `HeroCard` buttons reference them consistently.

---

## 14. Implementation Checklist

1. **Choose architecture**: Use standalone mode (see `tucu-ui-standalone` skill).
2. **Define navigation**: Create `menuItems` with top-level categories and `dropdownItems` for sub-pages.
3. **Create introduction pages** (Type A): HeroCard + feature grids for each category.
4. **Create guide/catalog pages** (Type B): TableOfContents + LazyComponentSection for detailed content.
5. **Write sections**: One file per section, exported as `default`, following the section patterns (5.1–5.4).
6. **Add props tables**: Use `AutoPropsTable` for auto-generated API reference and `PropPlayground` for interactive controls.
7. **Add code examples**: Use `CodeBlock` inside `CardContainer > CardTitle` cards.
8. **Configure HeroCard**: Set icon, title, description, and appropriate CTA buttons per page.
9. **Set up constants**: Centralize external URLs in a constants file.
10. **Add NavOptions**: Theme switcher in the navigation bar via `rightButton`.
11. **Test navigation**: Verify TOC scroll, hash navigation, lazy loading, and mobile responsive sidebar.

---

## 15. Recommended Project Structure

```text
your-docs-site/
├── src/
│   ├── app.tsx                         # ThemeProvider + menuItems
│   ├── main.tsx                        # Entry point
│   ├── router/
│   │   └── menu-items.tsx              # menuItems configuration
│   ├── pages/
│   │   ├── introduction/
│   │   │   └── Introduction.tsx        # Page Type A
│   │   ├── guides/
│   │   │   ├── GuidesOverview.tsx      # Page Type A (category index)
│   │   │   ├── QuickStart.tsx          # Page Type B
│   │   │   └── sections/
│   │   │       ├── InstallSection.tsx
│   │   │       └── SetupSection.tsx
│   │   └── api-reference/
│   │       ├── APIOverview.tsx         # Page Type A
│   │       ├── ComponentsAPI.tsx       # Page Type B with categories
│   │       └── sections/
│   │           ├── ButtonSection.tsx
│   │           └── InputSection.tsx
│   ├── components/
│   │   └── nav-options.tsx             # Theme switch
│   └── utils/
│       └── constants.ts                # External URLs
├── public/
├── index.html
├── vite.config.ts
└── package.json
```

---

## 16. Agent Guidelines (Documentation)

1. **Domain-agnostic**: The documentation patterns work for any subject — API docs, product docs, design systems, internal wikis. Never assume the user is documenting tucu-ui itself.
2. **Page Type A for overviews**: Use introduction pages without TOC for landing, category index, and overview pages.
3. **Page Type B for depth**: Use TableOfContents + LazyComponentSection for any page with 3+ sections.
4. **One section = one file**: Each lazy-loaded section should be its own file with a `default` export.
5. **Consistent section headers**: Every section starts with centered `h2` + `p` subtitle.
6. **Props tables with `AutoPropsTable`**: Use auto-generated tables from TypeScript interfaces. Add `PropPlayground` for interactive exploration.
7. **CodeBlock for examples**: Always wrap in `CardContainer > CardTitle title="Code Example"`.
8. **Feature cards with gradients**: Use unique gradient colors per category for visual distinction.
9. **Lazy load everything**: On Page Type B, never render sections directly — always use `LazyComponentSection`.
10. **TOC categories for large catalogs**: When a page has 10+ sections, group with `category` in `TableOfContentsItem`.
