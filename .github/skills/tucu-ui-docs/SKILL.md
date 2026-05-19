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
│   └─ menuItems[] → top-level doc categories                 │
│       ├─ Introduction Page ──────── Page Type A             │
│       ├─ Category Page ──────────── Page Type A             │
│       │   └─ dropdownItems[]                                │
│       │       ├─ Subsection Page ── Page Type C (with/without TOC)  │
│       │       ├─ Catalog Page ───── Page Type B (with TOC)  │
│       │       └─ Guide Page ─────── Page Type B (with TOC)  │
│       └─ ...                                                │
└─────────────────────────────────────────────────────────────┘
```

### Page Types

| Type  | Name                     | When to use                                                                            |
| ----- | ------------------------ | -------------------------------------------------------------------------------------- |
| **A** | Introduction / Overview  | Landing pages, category index with feature cards — no sidebar TOC                      |
| **B** | Catalog / Guide with TOC | Long-form content with multiple sections, sidebar navigation, lazy loading             |
| **C** | Subsection               | Nested page within a category — follows Page Type A design rules, focused on one topic |

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

**Reference implementation**: `ui/tucu-ui/src/demo/pages/introduction/index.tsx`

### Imports

```tsx
import { CardContainer, Button, Badge, Typography, LucideIcons, AnchorLink, CardTitle, CodeBlock, Alert, HeroCard, FeatureCard, ColorCard, Logo } from '@e-burgos/tucu-ui';
```

### Data Pattern

All repeating data is defined as typed arrays **before** the `return` statement, then rendered with `.map()`. This keeps JSX clean and data easy to maintain:

```tsx
export function Introduction() {
  const keyFeatures = [
    {
      icon: <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />,
      title: 'Advanced Theming System',
      description: '34+ color presets with 12-layer color architecture...',
      iconBgClassName: 'from-purple-500 via-purple-600 to-pink-500',
    },
    // ... more items
  ];

  const technologyStack = [
    {
      icon: <LucideIcons.Atom className="w-6 h-6" />,
      title: 'React 18+',
      description: 'Modern hooks and concurrent features',
      colorClassName: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200 dark:from-blue-400/20 dark:to-cyan-400/20 dark:text-blue-300 dark:border-blue-700',
    },
    // ...
  ];

  // themeVariants, componentCategories, typeSafetyFeatures, configFeatures, colorLayers, nextSteps, etc.

  return ( /* JSX uses .map() over these arrays */ );
}
```

### Root Container

```tsx
<div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">{/* All sections go here */}</div>
```

### Section Order (9 section types)

The Introduction page follows this exact order. When creating a new documentation overview page, use the sections that apply:

```
1. HeroCard             — Always first
2. Key Features Grid    — FeatureCard layout="horizontal" with gradient icons
3. Technology Stack     — CardTitle wrapping ColorCard grid
4. Advanced Showcase    — Deep-dive into key capabilities (2-column CardTitle)
5. Theme Variants       — FeatureCard layout="showcase" with tags
6. Quick Start          — Installation + code examples + live demo
7. Architectural Cards  — Architecture patterns + TypeScript type safety
8. Component Overview   — FeatureCard (vertical, default) grid with badges
9. What's Next          — CTA section with checklist + buttons
```

---

### 3.1 Hero Section

Always the first element. Uses `HeroCard` with optional icon, description, and CTA buttons.

```tsx
<HeroCard
  description="A modern, comprehensive React component library..."
  githubButton
  getStartedButton
  backgroundAnimation
  icon={
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-brand via-secondary to-light-dark rounded-full border border-gray-200 dark:border-gray-700">
      <Logo name="" secondName="" size="xxlarge" />
    </div>
  }
/>
```

**Rules:**

- `backgroundAnimation` adds animated gradient background
- `githubButton` and `getStartedButton` are optional built-in CTAs
- Icon can be a `Logo`, a `LucideIcons.*` in a gradient circle, or any ReactNode

---

### 3.2 Key Features Grid (`FeatureCard` horizontal)

A responsive grid of `FeatureCard` components with `layout="horizontal"`. Data is defined in an array before `return`.

```tsx
// Data array (before return)
const keyFeatures = [
  {
    icon: <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />,
    title: 'Advanced Theming System',
    description: '34+ color presets with 12-layer color architecture...',
    iconBgClassName: 'from-purple-500 via-purple-600 to-pink-500',
  },
  // ... more items
];

// JSX (inside return)
<section className="space-y-8">
  <div className="text-center">
    <Typography tag="h2" className="mb-2">
      Why Choose Tucu UI?
    </Typography>
    <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
      Built with modern best practices and designed for real-world applications
    </Typography>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {keyFeatures.map((feature, index) => (
      <FeatureCard key={index} layout="horizontal" icon={feature.icon} title={feature.title} description={feature.description} iconBgClassName={feature.iconBgClassName} />
    ))}
  </div>
</section>;
```

**Pattern rules:**

- Use `FeatureCard layout="horizontal"` — NOT inline CardContainer with manual layout
- Icon class: `w-6 h-6 text-white filter drop-shadow-sm`
- `iconBgClassName` uses 2-stop or 3-stop gradients (e.g. `from-purple-500 via-purple-600 to-pink-500`)
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`

---

### 3.3 Technology Stack (`ColorCard` in CardTitle)

A `CardTitle` wrapping a grid of `ColorCard` components with full color class customization.

```tsx
// Data array (before return)
const technologyStack = [
  {
    icon: <LucideIcons.Atom className="w-6 h-6" />,
    title: 'React 18+',
    description: 'Modern hooks and concurrent features',
    colorClassName: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200 dark:from-blue-400/20 dark:to-cyan-400/20 dark:text-blue-300 dark:border-blue-700',
  },
  // ... more items
];

// JSX (inside return)
<section className="space-y-8">
  <CardContainer className="overflow-hidden">
    <CardTitle title="Technology Foundation">
      <div className="w-full space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {technologyStack.map((tech, index) => (
            <ColorCard key={index} icon={tech.icon} title={tech.title} description={tech.description} colorClassName={tech.colorClassName} />
          ))}
        </div>
      </div>
    </CardTitle>
  </CardContainer>
</section>;
```

**Pattern rules:**

- Use `ColorCard` component — NOT inline div with manual color classes
- `colorClassName` includes ALL color classes: bg-gradient, text color, border, dark mode variants
- Wrapped in `CardContainer > CardTitle`
- No centered section header (the CardTitle provides the header)

---

### 3.4 Advanced Showcase (2-column deep-dive)

Two-column grid with detailed capability demos. Each column is a `CardContainer > CardTitle` with rich content.

```tsx
<section className="space-y-8">
  <div className="text-center">
    <Typography tag="h2" className="mb-2">
      Advanced Theming Capabilities
    </Typography>
    <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
      Experience the power of our sophisticated theming system...
    </Typography>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <CardContainer>
      <CardTitle title="12-Layer Color Architecture">{/* Color layer grid, highlight banners */}</CardTitle>
    </CardContainer>

    <CardContainer>
      <CardTitle title="Configuration Flexibility">{/* Config features list with inline icon+title+description items */}</CardTitle>
    </CardContainer>
  </div>
</section>
```

**Pattern rules:**

- Grid: `grid-cols-1 lg:grid-cols-2 gap-6`
- Each column: `CardContainer > CardTitle` with free-form content inside
- Use for deep technical showcases (color systems, config options, etc.)
- Highlight banners use: `p-3 bg-linear-to-r from-{color}/10 to-{color}/10 rounded-lg border border-{color}-200 dark:border-{color}-700`

---

### 3.5 Theme Variants (`FeatureCard` showcase)

A 3-column grid using `FeatureCard layout="showcase"` — includes icon, title, badge, description, and tags.

```tsx
// Data array (before return)
const themeVariants = [
  {
    icon: <LucideIcons.LayoutGrid className="w-6 h-6 text-white filter drop-shadow-sm" />,
    title: 'Default',
    badge: '3 layouts',
    description: 'Traditional web application layouts with Admin, Horizontal, and Clean options...',
    iconBgClassName: 'from-blue-500 to-cyan-500',
    tags: ['Admin', 'Horizontal', 'Clean'],
  },
  // ... macOS, macOS Tahoe
];

// JSX (inside return)
<section className="space-y-8">
  <div className="text-center">
    <Typography tag="h2" className="mb-2">
      3 Theme Variants
    </Typography>
    <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
      Choose the visual style that best fits your application...
    </Typography>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {themeVariants.map((variant, index) => (
      <FeatureCard key={index} layout="showcase" icon={variant.icon} title={variant.title} badge={variant.badge} description={variant.description} iconBgClassName={variant.iconBgClassName} tags={variant.tags} />
    ))}
  </div>
</section>;
```

**Pattern rules:**

- Use `FeatureCard layout="showcase"` — renders icon + title/badge header + description + tag badges
- Props: `icon`, `title`, `badge` (count string), `description`, `iconBgClassName`, `tags` (string[])
- Tags render as `Badge variant="soft" size="small"` automatically
- Badge renders as `Badge variant="outline" size="small"` automatically
- Grid: `grid-cols-1 lg:grid-cols-3 gap-6`

---

### 3.6 Quick Start (installation + code + live demo)

A single `CardContainer > CardTitle` with numbered steps combining `CodeBlock`, `Alert`, and live component demos.

```tsx
<section className="space-y-8">
  <CardContainer>
    <CardTitle title="Quick Start">
      <div className="w-full space-y-6">
        <Typography tag="p" className="text-gray-600 dark:text-gray-300">
          Get up and running with Tucu UI in minutes:
        </Typography>
        <div className="space-y-6">
          {/* Step 1: Installation */}
          <div className="space-y-3">
            <Typography tag="h5">1. Installation</Typography>
            <CodeBlock noExpand={true} language="bash" code={installation} />
          </div>

          {/* Step 1.1: Optional setup with sub-steps */}
          <div className="space-y-3">
            <Typography tag="h5">1.1. Installing Tailwind CSS (Optional)</Typography>
            <Alert variant="info" dismissible={false}>
              <Typography tag="p">
                <strong>Note:</strong> If you require...
              </Typography>
            </Alert>
            <div className="space-y-4">
              <div className="space-y-2">
                <Typography tag="label-1" className="text-gray-700 dark:text-gray-300">
                  Step 1: Install dependencies
                </Typography>
                <CodeBlock noExpand={true} language="bash" code={`pnpm install tailwindcss @tailwindcss/vite`} />
              </div>
              {/* More sub-steps... */}
            </div>
          </div>

          {/* Step 2: Basic Usage with code example */}
          <div className="space-y-3">
            <Typography tag="h5">2. Basic Usage</Typography>
            <Alert variant="info" dismissible={false}>
              <Typography tag="p">This example shows how to...</Typography>
            </Alert>
            <CodeBlock language="tsx" code={BasicUsageExampleCode} />
          </div>

          {/* Step N: Live Demo */}
          <div className="space-y-3">
            <Typography tag="h5">4. Live Demo</Typography>
            <div className="p-4 sm:p-6 bg-light-dark rounded-xl border border-gray-200 dark:border-gray-700">
              <LiveDemoComponent />
            </div>
          </div>
        </div>
      </div>
    </CardTitle>
  </CardContainer>
</section>
```

**Pattern rules:**

- Numbered steps: `Typography tag="h5"` with "1.", "2.", "3." prefix
- Sub-steps use `Typography tag="label-1"` with "Step N:" prefix
- Each step wrapped in `<div className="space-y-3">`
- `Alert variant="info" dismissible={false}` for contextual notes
- `CodeBlock` with `noExpand={true}` for short snippets, without for long code
- Live demo wrapped in: `p-4 sm:p-6 bg-light-dark rounded-xl border border-gray-200 dark:border-gray-700`
- Inline code references use: `<code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">`

---

### 3.7 Architectural Patterns (comparison + type safety)

Side-by-side architecture pattern comparison with code samples, plus a supplementary TypeScript type safety card below.

```tsx
<section className="space-y-8">
  <div className="text-center">
    <Typography tag="h2" className="mb-2">
      Architectural Patterns
    </Typography>
    <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
      Choose between Standalone App or Micro Frontends patterns...
    </Typography>
  </div>

  {/* Two-column comparison */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <CardContainer>
      <CardTitle title="Standalone App Pattern">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
              <LucideIcons.Package className="w-5 h-5 text-white filter drop-shadow-sm" />
            </div>
            <Typography tag="h5">Standalone App (Default)</Typography>
          </div>
          <Alert variant="info" dismissible={false}>
            <div className="space-y-2">
              <Typography tag="p">
                <strong>Default pattern</strong> - Ideal for...
              </Typography>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="soft" color="light-dark">
                  Default
                </Badge>
                <Badge variant="soft" color="light-dark">
                  menuItems
                </Badge>
              </div>
            </div>
          </Alert>
          <CodeBlock language="tsx" code={StandaloneAppExample} />
          {/* "When to Use" box with use cases list */}
          <div className="p-4 bg-light-dark rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
              <Typography tag="h5">When to Use</Typography>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {useCases.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardTitle>
    </CardContainer>

    <CardContainer>
      <CardTitle title="Micro Frontends (MFE) Pattern">{/* Same structure as Standalone */}</CardTitle>
    </CardContainer>
  </div>

  {/* Type Safety supplementary card (full-width) */}
  <CardContainer>
    <CardTitle title="Conditional TypeScript Types">
      <div className="space-y-6">
        <Typography tag="p" className="text-gray-600 dark:text-gray-300">
          The ThemeProvider uses TypeScript discriminated unions...
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {typeSafetyFeatures.map((feature, index) => (
            <FeatureCard key={index} layout="horizontal" icon={feature.icon} title={feature.title} description={feature.description} iconBgClassName={feature.iconBgClassName} />
          ))}
        </div>
        <FeatureCard
          layout="horizontal"
          icon={<LucideIcons.Info className="w-4 h-4 text-white filter drop-shadow-sm" />}
          iconBgClassName="from-indigo-500 to-purple-500"
          title="How It Works"
          description={
            <>
              When you set <code>...</code>, TypeScript requires...
            </>
          }
        />
      </div>
    </CardTitle>
  </CardContainer>
</section>
```

**Pattern rules:**

- Two-column comparison: `grid-cols-1 lg:grid-cols-2 gap-6`
- Each pattern card: gradient icon header + Alert with badges + CodeBlock + "When to Use" box
- Use `Badge variant="soft" color="light-dark"` for keyword badges in alerts
- Use case list: `LucideIcons.Circle` (filled) + `span` text
- Full-width supplementary card below uses `FeatureCard layout="horizontal"` for type safety features
- `FeatureCard` `description` accepts `React.ReactNode` (supports JSX with `<code>` tags)

---

### 3.8 Component Overview (`FeatureCard` vertical grid)

A dense grid of `FeatureCard` components (default vertical layout) showing component categories with count badges.

```tsx
// Data array (before return)
const componentCategories = [
  {
    icon: <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />,
    title: 'Layout Systems',
    badge: '6',
    description: '6 layouts across 3 themes: Admin, Horizontal, Clean, macOS, macOS Tahoe, Dock',
    iconBgClassName: 'from-blue-500 to-cyan-500',
  },
  // ... more items
];

// JSX (inside return)
<section className="space-y-8">
  <div className="text-center">
    <Typography tag="h2" className="mb-2">
      Component Overview
    </Typography>
    <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
      Explore our comprehensive collection of components organized by category
    </Typography>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {componentCategories.map((category, index) => (
      <FeatureCard key={index} icon={category.icon} title={category.title} badge={category.badge} description={category.description} iconBgClassName={category.iconBgClassName} />
    ))}
  </div>
</section>;
```

**Pattern rules:**

- 4-column grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- `FeatureCard` (default `layout="vertical"`): icon centered on gradient bg, title below, badge inline, description at bottom
- Props: `icon`, `title`, `badge` (count string), `description`, `iconBgClassName` (two-color gradient)
- Each category uses a unique `from-X to-Y` gradient (no `via-`)

---

### 3.9 What's Next (CTA section)

Final section with a checklist of topics and CTA buttons.

```tsx
// Data array (before return)
const nextSteps = [
  '12-layer theming system with 34+ color presets and independent layer control',
  '3 theme variants (Default, macOS, macOS Tahoe) with 6 layouts and integrated routing',
  // ... more items
];

// JSX (inside return)
<section>
  <CardContainer>
    <CardTitle title="What's Next?">
      <div className="space-y-4">
        <Typography tag="h6">Ready to dive deeper? Explore our comprehensive documentation to learn more about:</Typography>
        <div className="flex flex-wrap flex-row gap-3 pt-2">
          <ul className="space-y-2">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-center gap-3">
                <LucideIcons.Check className="w-5 h-5 text-green-500 shrink-0" />
                <Typography tag="body">{step}</Typography>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap sm:flex-row gap-3 pt-2">
          <Button size="medium">
            <AnchorLink to={NPM_PACKAGE_URL} target="_blank">
              <div className="flex justify-center items-center">
                <LucideIcons.Package className="w-4 h-4 mr-2" />
                Install TucuUI
              </div>
            </AnchorLink>
          </Button>
          <Button variant="ghost" size="medium">
            <AnchorLink to={GITHUB_URL} target="_blank">
              <div className="flex justify-center items-center">
                <LucideIcons.Code className="w-4 h-4 mr-2" />
                View Source Code
              </div>
            </AnchorLink>
          </Button>
        </div>
      </div>
    </CardTitle>
  </CardContainer>
</section>;
```

**Pattern rules:**

- Checklist: `LucideIcons.Check` (green-500, shrink-0) + `Typography tag="body"` inside `<li>`
- CTA buttons: `Button size="medium"` (solid for primary, `variant="ghost"` for secondary)
- Buttons wrap `AnchorLink` with icon + text inside `flex justify-center items-center`
- Data in array, rendered with `.map()`

---

### Section Header Pattern (common to all sections)

Every section (except Hero and What's Next) uses this centered header:

```tsx
<div className="text-center">
  <Typography tag="h2" className="mb-2">
    Section Title
  </Typography>
  <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
    Section subtitle / description
  </Typography>
</div>
```

**Rules:**

- `Typography tag="h2"` with `className="mb-2"` (NOT `text-3xl md:text-4xl font-bold`)
- Subtitle uses `tag="p"` with `text-gray-500 dark:text-gray-400 max-w-2xl mx-auto`
- Always wrapped in `<div className="text-center">`

### FeatureCard Component Reference

`FeatureCard` is the primary card component for Introduction pages. It has 3 layouts:

| Layout               | Props                                                               | Use Case                                           |
| -------------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| `vertical` (default) | `icon`, `title`, `badge?`, `description`, `iconBgClassName`         | Component category grids (section 3.8)             |
| `horizontal`         | `icon`, `title`, `badge?`, `description`, `iconBgClassName`         | Key features grid (section 3.2), inline info cards |
| `showcase`           | `icon`, `title`, `badge?`, `description`, `iconBgClassName`, `tags` | Theme variant comparison (section 3.5)             |

**Key notes:**

- `description` accepts `React.ReactNode` (can include JSX like `<code>` tags)
- `iconBgClassName` is the gradient without `bg-linear-to-br` prefix (just `from-X to-Y`)
- Hover effects (shadow, scale, translate) are built into the component

### ColorCard Component Reference

`ColorCard` is used for items needing full color class control (no gradient icon pattern):

| Props            | Description                                                                                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`           | ReactNode (icon without white/shadow, uses parent color)                                                                                                                      |
| `title`          | Card title string                                                                                                                                                             |
| `description`    | Description string                                                                                                                                                            |
| `color`          | Predefined color preset (preferred): `'blue'` `'indigo'` `'cyan'` `'purple'` `'emerald'` `'orange'` `'green'` `'red'` `'pink'` `'amber'` `'teal'` `'violet'` `'rose'` `'sky'` |
| `colorClassName` | Fallback: custom Tailwind classes for bg, text, border in light+dark (used when `color` not provided)                                                                         |

### Pattern Rules Summary

- Root container: `space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12`
- Each `<section>` uses `className="space-y-8"` (except What's Next which has no class)
- `HeroCard` is always the first element
- **All repeating data defined as arrays before `return`**, rendered with `.map()`
- Use `FeatureCard` for feature grids — NEVER write inline CardContainer with manual icon/title/description layout
- Use `ColorCard` for tech stack / items needing per-item color theming — prefer the `color` prop over inline `colorClassName`
- Use `ColorCard` for implementation status grids with per-item color theming (bg, text, border, dark variants)
- **Always use `ColorCard`** whenever cards have colored backgrounds — use the `color` prop for standard colors, `colorClassName` only for non-standard custom styles
- Feature cards use gradient via `iconBgClassName`: `from-{color} to-{color}` (2 stops) or `from-{color} via-{color} to-{color}` (3 stops)
- Interactive hover effects are built into FeatureCard/ColorCard components
- **NEVER use emojis** (e.g. checkmarks, rockets, etc.) in page content — use `LucideIcons` components instead

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
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
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
- Content wrapper inside TOC: `w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0`
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

## 4b. Page Type C — Subsection

Used for **nested pages within a category** that focus on a single topic. Follows the same design rules as Page Type A (Introduction / Overview) — no sidebar TOC, no lazy loading, all content renders directly — but lives as a child route of a category page.

### When to Use

- The page is a `dropdownItem` (child) of a category
- It covers a **single focused topic** (e.g. "Design Principles", "Color System", "Typography Guide")
- It does NOT require a sidebar TOC because the content is self-contained within one theme
- It's essentially a mini-overview page scoped to one sub-topic

### Relationship with Parent Category

```
/design-system              → Page Type A (category overview, "Browse Components" link)
/design-system/principles   → Page Type C (subsection — design principles deep-dive)
/design-system/typography   → Page Type C (subsection — typography system)
/design-system/components   → Page Type B (catalog with TOC — many components to browse)
```

### Structure

```tsx
import { HeroCard, CardContainer, CardTitle, Typography, LucideIcons, FeatureCard, ColorCard, CodeBlock, Badge, AnchorLink, Button } from '@e-burgos/tucu-ui';

export function DesignPrinciplesPage() {
  // Data arrays defined before return (same pattern as Page Type A)
  const principles = [
    {
      icon: <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />,
      title: 'Composability',
      description: 'Build complex UIs from simple, reusable primitives.',
      iconBgClassName: 'from-blue-500 via-indigo-500 to-purple-500',
    },
    // ...
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* 1. Hero — always first, scoped to this sub-topic */}
      <HeroCard
        title="Design Principles"
        description="The foundational ideas that guide every component in the library."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Compass className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* 2-N. Sections — use the same patterns as Page Type A (sections 3.2–3.9) */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Core Principles
          </Typography>
          <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Every component is built on these foundations.
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {principles.map((item) => (
            <FeatureCard key={item.title} layout="horizontal" {...item} />
          ))}
        </div>
      </section>

      {/* Additional sections as needed... */}
    </div>
  );
}
```

### Pattern Rules

- **Same root container** as Page Type A: `space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12`
- **Same component palette** as Page Type A: `HeroCard`, `FeatureCard`, `ColorCard`, `CardContainer`, `CardTitle`, `CodeBlock`, etc.
- **Same section patterns** as Page Type A (sections 3.2–3.9 apply here): feature grids, technology stacks, code examples, architectural patterns
- **NO `TableOfContents`**, no `LazyComponentSection`, no lazy loading
- **HeroCard** is always first, with title/description scoped to the sub-topic (not the parent category)
- Data arrays defined before `return`, rendered with `.map()`
- **Typically shorter** than Page Type A — focuses on 2-5 sections max about one specific topic
- Use `FeatureCard`, `ColorCard`, `CodeBlock`, `CardContainer` as needed (same rules as Page Type A)

### Key Difference from Page Type A

| Aspect               | Page Type A (Introduction)                          | Page Type C (Subsection)                                     |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| **Route level**      | Top-level or category index (`/design-system`)      | Nested under a category (`/design-system/principles`)        |
| **Scope**            | Broad overview of an entire category                | Focused deep-dive on one topic within the category           |
| **Hero tone**        | "Welcome to X" — invitational, broad                | "Everything about Y" — specific, authoritative               |
| **Typical sections** | 5–9 sections covering many aspects                  | 2–5 sections, all related to one theme                       |
| **Navigation**       | Has `dropdownItems` pointing to children            | Is a child in parent's `dropdownItems`                       |
| **Design rules**     | Full Page Type A treatment (all 9 section patterns) | Same design rules, uses subset of section patterns as needed |

### Navigation Config Example

```tsx
{
  name: 'Design System',
  path: '/design-system',
  icon: <LucideIcons.Palette />,
  component: <DesignSystemOverview />, // Page Type A
  isPublic: true,
  dropdownItems: [
    {
      name: 'Design Principles',
      path: '/design-system/principles',
      icon: <LucideIcons.Compass />,
      component: <DesignPrinciplesPage />, // Page Type C (subsection)
    },
    {
      name: 'Typography',
      path: '/design-system/typography',
      icon: <LucideIcons.Type />,
      component: <TypographyPage />, // Page Type C (subsection)
    },
    {
      name: 'Browse Components',
      path: '/design-system/components',
      icon: <LucideIcons.Component />,
      component: <ComponentsCatalog />, // Page Type B (catalog with TOC)
    },
  ],
}
```

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
const items = [
  {
    icon: <LucideIcons.Shield className="w-6 h-6 text-white filter drop-shadow-sm" />,
    title: 'Type Safety',
    description: 'Full TypeScript support with discriminated unions...',
    iconBgClassName: 'from-green-500 to-emerald-500',
  },
  // ... more items
];

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
  {items.map((item, i) => (
    <FeatureCard key={i} layout="horizontal" icon={item.icon} title={item.title} description={item.description} iconBgClassName={item.iconBgClassName} />
  ))}
</div>;
```

> **Note:** Prefer `FeatureCard layout="horizontal"` over inline `CardContainer` with manual icon/title/description layout. Use `ColorCard` when items need full color class control (bg, text, border).

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
        component: <QuickStartGuide />, // Page Type C (subsection — single topic)
      },
      {
        name: 'Advanced',
        path: '/guides/advanced',
        icon: <LucideIcons.Settings />,
        component: <AdvancedGuide />, // Page Type B (long-form with TOC)
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
        name: 'Getting Started',
        path: '/api/getting-started',
        icon: <LucideIcons.Play />,
        component: <APIGettingStarted />, // Page Type C (subsection — focused intro)
      },
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
│   ├── Sub-page 1 (Subsection — Page Type C)
│   ├── Sub-page 2 (Subsection — Page Type C)
│   └── Sub-page 3 (Guide / Catalog — Page Type B)
├── Category 2 (Overview — Page Type A)
│   ├── Sub-page 1 (Subsection — Page Type C)
│   └── Sub-page 2 (Guide / Catalog — Page Type B)
└── ...
```

- Top-level items → category overview (Page Type A)
- `dropdownItems` → subsection pages (Page Type C) or detailed catalog/guide pages (Page Type B with TOC)
- Use Page Type C when the nested page covers a single focused topic (e.g. `/design-system/design-principles`)
- Use Page Type B when the nested page has many sections requiring sidebar TOC navigation (e.g. `/api/components`)
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

<PropPlayground componentName="Button" defaultValues={{ color: 'primary', variant: 'solid', size: 'medium' }} excludeProps={['onClick']}>
  {(props) => <Button {...props}>Click me</Button>}
</PropPlayground>;
```

**Auto-detected control types**: boolean → Switch, enum → Select, string → Input, number → Input[number].

### PropPlayground Best Practices

**When to include PropPlayground:**

- Components with 2+ controllable simple props (boolean, enum, string, number)
- Components that can render a meaningful preview in isolation
- Most visual components: buttons, badges, alerts, loaders, avatars, typography, etc.

**When to skip PropPlayground:**

- Components with **zero controllable props** (e.g., `CardContainer` — only has `className`)
- Components that require **complex structured data** as their primary prop (e.g., `BasicTable` needs `columns[]` + `data[]`, `TabSelect` needs `tabMenu[]`, `CarouselCards` needs `cards[]`)
- Components that are **pure layout containers** with no visual props (e.g., `CleanLayout`)
- Components needing **external services or real-time data** (e.g., `LivePriceFeed`, `CoinCard`)

**Stateful component workarounds:**
For components requiring state management (Modal, Drawer), you CAN add PropPlayground by:

- Fixing `isOpen: true` in defaultValues so the preview always shows the component
- Passing a no-op `setIsOpen={() => {}}` in the children render
- For Drawer: wrapping in a relative container `<div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>` to prevent it from covering the entire page
- Excluding all state callbacks from controls (`setIsOpen`, `onClose`, `onSubmit`, `onBack`)

**defaultValues strategy by prop type:**

| Prop Type    | Strategy                      | Example                                                           |
| ------------ | ----------------------------- | ----------------------------------------------------------------- |
| `boolean`    | Use the typical/visible state | `isLoading: true` (for ButtonLoader), `arrow: true` (for Tooltip) |
| `enum/union` | First meaningful option       | `variant: 'solid'`, `color: 'primary'`, `size: 'medium'`          |
| `string`     | Descriptive placeholder       | `label: 'Click me'`, `title: 'Card Title'`                        |
| `number`     | Sensible visible value        | `value: 65` (for Progressbar), `size: 60` (for logos)             |

**excludeProps strategy by category:**

| Category           | Exclude                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Callbacks          | `onClick`, `onChange`, `onSubmit`, `onClose`, `onBack`, `setIsOpen`, `onDismiss`, `onOpenChange`, `onSlideChange`, `onSwiper`, `onError`, `onLoad` |
| Accessibility      | `aria-label`, `aria-describedby`                                                                                                                   |
| Complex objects    | `menuItems`, `items`, `cards`, `images`, `tabMenu`, `actions`, `columns`, `data`, `text`, `logo`, `actor`, `breakpoints`                           |
| ReactNode props    | `icon`, `content`, `triggerIcon`, `actionContent`, `buttonContainer`, `tooltip` (when complex)                                                     |
| Style overrides    | `scrollbarStyle`, `style`, `barClassName`, `labelClassName`, `containerClassName`                                                                  |
| Internal/redundant | `loaderSize`, `loaderVariant` (when focusing on other props)                                                                                       |

### PropPlayground Coverage Map (UI Components)

Current state of PropPlayground across UI component sections:

| Section                 | Has Playground | componentName           | Key controllable props                                     |
| ----------------------- | :------------: | ----------------------- | ---------------------------------------------------------- |
| ButtonDrip              |       ✅       | Button                  | variant, color, size, shape, tooltip, tooltipPlacement     |
| ButtonLoader            |       ✅       | Button                  | variant, color, size, isLoading, loaderSize, loaderVariant |
| Hamburger               |       ✅       | Hamburger               | isOpen, color, size, variant                               |
| TopupButton             |       ✅       | TopupButton             | label                                                      |
| AuthorCard              |       ✅       | AuthorCard              | name, authorRole, image                                    |
| CardTitle               |       ✅       | CardTitle               | title, border                                              |
| PanelActionCard         |       ✅       | PanelActionCard         | title                                                      |
| PanelCard               |       ✅       | PanelCard               | title                                                      |
| Avatar                  |       ✅       | Avatar                  | size, shape, border, image, alt                            |
| Badge                   |       ✅       | Badge                   | variant, size, shape, color, withDot                       |
| Collapse                |       ✅       | Collapse                | label, initialOpen                                         |
| Scrollbar               |       ✅       | Scrollbar               | autoHide, direction                                        |
| Skeleton                |       ✅       | Skeleton                | shape, animation, size, count                              |
| Tooltip                 |       ✅       | Tooltip                 | placement, color, arrow, disabled, enterDelay, leaveDelay  |
| Modal                   |       ✅       | Modal                   | isOpen, closeable, hideButtons                             |
| Drawer                  |       ✅       | Drawer                  | isOpen, position, backdrop                                 |
| ActiveLink              |       ✅       | ActiveLink              | path, activeClassName                                      |
| AnchorLink              |       ✅       | AnchorLink              | (auto-detected from registry)                              |
| ListItem                |       ✅       | ListItem                | label, active, disabled                                    |
| Loader                  |       ✅       | Loader                  | variant, size, color, showOnlyThreeDots, tag               |
| Progressbar             |       ✅       | Progressbar             | value, variant, size, color, rounded                       |
| Spinner                 |       ✅       | Spinner                 | size, color                                                |
| Logo                    |       ✅       | Logo                    | name, secondName, size, isoType                            |
| TucuUiLogo              |       ✅       | TucuUiLogo              | size                                                       |
| Alert                   |       ✅       | Alert                   | variant, dismissible                                       |
| NotificationCard        |       ✅       | NotificationCard        | notifier, type, time, url                                  |
| Typography              |       ✅       | Typography              | tag, color, fontFamily                                     |
| RevealContent           |       ✅       | RevealContent           | defaultHeight                                              |
| ScrollToTop             |       ✅       | ScrollToTop             | size, showAfter, bottom, right                             |
| Image                   |       ✅       | Image                   | src, alt, objectFit, loading, placeholder, fill, priority  |
| CardContainer           |       ❌       | —                       | Only has className (no visual props)                       |
| Sidebar                 |       ❌       | —                       | Requires complex logo/menuItems objects                    |
| SidebarMenu             |       ❌       | —                       | Requires menuItems[] + callbacks                           |
| BasicTable              |       ❌       | —                       | Requires columns[] + data[]                                |
| Tab/TabGroup            |       ❌       | —                       | Compound component (TabGroup+TabList+TabItem+TabPanels)    |
| TabSelect               |       ❌       | —                       | Requires tabMenu[]                                         |
| ParamTab                |       ❌       | —                       | Requires tabMenu[] with URL sync                           |
| Carousel                |       ❌       | —                       | Requires children slides                                   |
| CarouselCards           |       ❌       | —                       | Requires cards[] data                                      |
| CarouselImage           |       ❌       | —                       | Requires images[] data                                     |
| ListContainer           |       ❌       | —                       | Requires items[] + trigger state                           |
| Toast                   |       ❌       | —                       | Uses useToastStore (imperative API)                        |
| DefiAppLogo             |       ❌       | —                       | No controllable props (animated SVG)                       |
| Card                    |       ✅       | Card                    | title, description, onClick                                |
| InfoCard                |       ❌       | —                       | Requires columns[] + footerTags[] complex data             |
| KeyValueRow             |       ✅       | KeyValueRow             | label, value, mono, accent                                 |
| Pagination              |       ✅       | Pagination              | currentPage, totalPages, windowSize                        |
| Stepper                 |       ✅       | Stepper                 | currentStep, steps                                         |
| TabModal                |       ❌       | —                       | Requires tabs[] + onClose callback                         |
| ScrollbarNative         |       ✅       | ScrollbarNative         | autoHide                                                   |
| LineChart               |       ❌       | —                       | Requires data[] + series[] arrays                          |
| BarChart                |       ❌       | —                       | Requires data[] + series[] arrays                          |
| AreaChart               |       ❌       | —                       | Requires data[] + series[] arrays                          |
| PieChart                |       ❌       | —                       | Requires data[] array                                      |
| RadarChart              |       ❌       | —                       | Requires data[] + series[] arrays                          |
| ComposedChart           |       ❌       | —                       | Requires data[] + series[] arrays                          |
| MacOSWindow             |       ✅       | MacOSWindow             | title, showTrafficLights                                   |
| MacOSSegmentedControl   |       ✅       | MacOSSegmentedControl   | size, segments, value                                      |
| MacOSSearchBar          |       ✅       | MacOSSearchBar          | placeholder, value                                         |
| MacOSNotificationBanner |       ✅       | MacOSNotificationBanner | variant, title, message, autoDismiss                       |
| MacOSSidebar            |       ❌       | —                       | Requires menuItems[] + complex state                       |
| MacOSToolbar            |       ❌       | —                       | Requires leftContent/rightContent slots                    |
| MacOSWidget             |       ❌       | —                       | Container only (no visual props)                           |
| MacOSPopover            |       ❌       | —                       | Requires trigger + children slots                          |

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
6. **Props tables with `AutoPropsTable`**: Use auto-generated tables from TypeScript interfaces. Add `PropPlayground` for interactive exploration (see Coverage Map in section 10 for guidelines on when to include vs skip).
7. **CodeBlock for examples**: Always wrap in `CardContainer > CardTitle title="Code Example"`.
8. **Feature cards with gradients**: Use unique gradient colors per category for visual distinction.
9. **Lazy load everything**: On Page Type B, never render sections directly — always use `LazyComponentSection`.
10. **TOC categories for large catalogs**: When a page has 10+ sections, group with `category` in `TableOfContentsItem`.
