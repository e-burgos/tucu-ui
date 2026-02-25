# Skill: Tucu-UI Design System

Complete guide to the theming, layout, and design token system in `@e-burgos/tucu-ui`. Covers layouts, color presets, semantic tokens, dark/light mode, typography, settings components, and CSS custom properties.

> **Companion Skills**: See `tucu-ui-catalog` for component props, `tucu-ui-forms` for form system, `tucu-ui-routing` for navigation.
> **Live Docs**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/)

---

## 1. Architecture

The design system is built on three layers:

1. **CSS Custom Properties** (`--color-tucu-ui-*`) — primitive color tokens
2. **Tailwind v4 Theme** (`@theme`) — maps tokens to Tailwind utility classes
3. **Zustand Store** (`useTheme`) — runtime state for mode, preset, layout, direction

All components consume semantic tokens automatically. Developers should never hardcode colors.

---

## 2. Layout System

Tucu-UI provides 3 predefined layouts for enterprise applications. The layout is selected via `ThemeProvider` or the `useTheme` hook.

### Admin Layout

```
┌──────────────────────────────────────────┐
│  Header (fixed)                          │
├────────┬─────────────────────────────────┤
│ Sidebar│  Content Area                   │
│ (coll- │                                 │
│ apsible│                                 │
│   xl+) │                                 │
└────────┴─────────────────────────────────┘
```

- **Constant**: `LAYOUT_OPTIONS.ADMIN`
- Collapsible sidebar visible on `xl+` breakpoint
- Fixed header with logo, search, and action buttons
- Ideal for: admin panels, CRMs, data-heavy applications

### Horizontal Layout (Default)

```
┌──────────────────────────────────────────┐
│  Header + Navigation (sticky)            │
├──────────────────────────────────────────┤
│                                          │
│  Content Area                            │
│                                          │
└──────────────────────────────────────────┘
```

- **Constant**: `LAYOUT_OPTIONS.HORIZONTAL`
- Top horizontal navigation with sticky header
- Ideal for: content sites, marketing, apps with simple navigation

### Clean Layout

```
┌──────────────────────────────────────────┐
│                                          │
│  Content Area (full canvas)              │
│                                          │
└──────────────────────────────────────────┘
```

- **Constant**: `LAYOUT_OPTIONS.CLEAN`
- No navigation, no header — empty canvas
- Ideal for: login, sign up, error pages, landing pages

### Setting the Layout

```tsx
import { ThemeProvider, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

// Via ThemeProvider (initial layout)
<ThemeProvider layout={LAYOUT_OPTIONS.ADMIN} menuItems={menuItems} />

// Via useTheme (runtime change)
const { layout, setLayout } = useTheme();
setLayout(LAYOUT_OPTIONS.HORIZONTAL);
```

### Layout Components

| Component            | Props                                                                                            | Description                        |
| -------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------- |
| **RootLayout**       | `{layout?: 'clean'\|'admin'\|'horizontal', menuItems: IMenuItem[], logo?, rightButton?, fullWidth?}` | Main layout orchestrator           |
| **AdminLayout**      | `{menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth?}`                                | Collapsible sidebar + fixed header |
| **CleanLayout**      | `{children, className?}`                                                                         | Minimal layout without nav         |
| **HorizontalLayout** | `{menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth?}`                                | Top horizontal navigation          |

---

## 3. Color System

### 3.1 Semantic Tokens

Use these Tailwind classes across your application. They adapt automatically to light/dark mode and the active preset.

| Token                      | Light Default | Dark Default | Usage                           |
| -------------------------- | ------------- | ------------ | ------------------------------- |
| `bg-primary`               | `#0052ff`     | `#578bfa`    | Primary actions, emphasis       |
| `text-primary`             | `#0052ff`     | `#578bfa`    | Primary text, links             |
| `text-primary-foreground`  | `#ffffff`     | `#ffffff`    | Text on primary backgrounds     |
| `bg-secondary`             | `#eef0f3`     | `#282b31`    | Card backgrounds, surfaces      |
| `text-secondary`           | `#4b5563`     | `#9ca3af`    | Secondary text, descriptions    |
| `bg-accent`                | `#f7d21a`     | `#936000`    | Warnings, highlights            |
| `bg-background`            | `#ffffff`     | `#0a0b0d`    | Page base background            |
| `bg-light-dark`            | subtle light  | subtle dark  | Secondary surfaces              |
| `bg-destructive`           | red variant   | red variant  | Error, danger backgrounds       |
| `text-muted-foreground`    | gray          | gray         | Muted helper text               |
| `border-border`            | light gray    | dark gray    | Default border color            |

### 3.2 Correct and Incorrect Usage

```tsx
// ✅ CORRECT — Uses semantic tokens, adapts to theme
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
  Themed Content
</div>

<div className="bg-secondary text-secondary-foreground p-4">
  Card Surface
</div>

<p className="text-muted-foreground text-sm">
  Helper text
</p>

// ❌ INCORRECT — Hardcoded colors, ignores theme
<div className="bg-blue-500 text-white p-4">
  This won't adapt to dark mode or presets
</div>
```

### 3.3 Color Presets

22 color presets are available, each redefining the primary, secondary, and accent tokens:

**Light Presets**: Blue (default), Green, Orange, Red, Pink, Purple, Indigo, Teal, Yellow, Chartreuse, Gray

**Dark Presets**: Dark Blue, Dark Green, Dark Orange, Dark Red, Dark Pink, Dark Purple, Dark Indigo, Dark Teal, Dark Yellow, Dark Chartreuse, Dark Gray

---

## 4. `useTheme` Hook

The central hook for programmatic access to the theme state. Powered by Zustand.

```tsx
import { useTheme } from '@e-burgos/tucu-ui';

const ThemeControls = () => {
  const {
    // Mode
    mode,                   // 'light' | 'dark'
    setMode,                // (mode: 'light' | 'dark') => void

    // Direction
    direction,              // 'ltr' | 'rtl'
    onChangeDirection,      // (dir: 'ltr' | 'rtl') => void

    // Color Preset
    currentPreset,          // Current color preset name
    changeColor,            // (preset: string) => void

    // Layout
    layout,                 // 'admin' | 'horizontal' | 'clean'
    setLayout,              // (layout: string) => void
  } = useTheme();

  return (
    <div className="flex gap-4">
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle {mode === 'dark' ? 'Light' : 'Dark'}
      </button>
      <button onClick={() => onChangeDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>
        Toggle RTL
      </button>
      <button onClick={() => changeColor('Green')}>
        Apply Green Preset
      </button>
      <button onClick={() => setLayout('admin')}>
        Switch to Admin Layout
      </button>
    </div>
  );
};
```

### Common Patterns

#### Dark Mode Toggle

```tsx
import { useTheme, LucideIcons } from '@e-burgos/tucu-ui';

const DarkModeToggle = () => {
  const { mode, setMode } = useTheme();
  return (
    <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg bg-secondary">
      {mode === 'dark' ? <LucideIcons.Sun /> : <LucideIcons.Moon />}
    </button>
  );
};
```

#### Preset Selector

```tsx
import { useTheme } from '@e-burgos/tucu-ui';

const PresetSelector = () => {
  const { currentPreset, changeColor } = useTheme();
  const presets = ['Blue', 'Green', 'Orange', 'Red', 'Purple', 'Teal'];

  return (
    <div className="flex gap-2">
      {presets.map((preset) => (
        <button
          key={preset}
          onClick={() => changeColor(preset)}
          className={`w-8 h-8 rounded-full ${currentPreset === preset ? 'ring-2 ring-primary' : ''}`}
        />
      ))}
    </div>
  );
};
```

---

## 5. Settings Components

Built-in UI for users to customize their theme experience.

| Component          | Description                                    | Usage                                                                   |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------------------- |
| **ThemeProvider**  | Entry point — wraps the app with theme context | Required at root. Pass `showSettings` to enable the settings drawer.     |
| **SettingsDrawer** | Full settings panel (mode, preset, layout, dir)| Automatically available when `showSettings` is `true` in ThemeProvider.  |
| **SettingsButton** | Floating gear button that opens SettingsDrawer | Included automatically with `showSettings`.                              |
| **SwitchMode**     | Inline light/dark toggle                       | `<SwitchMode />` — use anywhere for a quick toggle.                     |
| **LangSelector**   | Language dropdown (en, es, fr)                 | `<LangSelector />` — for i18n language switching.                       |
| **AuthProvider**   | Authentication context guard                   | Wrap routes for auth-protected areas.                                    |

### Enabling Settings Panel

```tsx
<ThemeProvider
  showSettings          // Enables the floating settings button + drawer
  logo={{ name: 'My', secondName: 'App' }}
  menuItems={menuItems}
/>
```

---

## 6. Typography

### Base Font

**Roboto** (Google Fonts) — loaded automatically by the library.

### Typography Component

The `Typography` component provides 30+ semantic tags with consistent styling:

```tsx
import { Typography } from '@e-burgos/tucu-ui';

// Headings
<Typography tag="h1">Page Title</Typography>
<Typography tag="h2">Section Title</Typography>
<Typography tag="h3">Subsection</Typography>

// Semantic tags
<Typography tag="headline" color="primary">Main Headline</Typography>
<Typography tag="body" color="default">Body text content</Typography>
<Typography tag="caption" color="muted">Photo caption</Typography>
<Typography tag="label-1">Form Label</Typography>
<Typography tag="label-2">Small Label</Typography>
<Typography tag="code" fontFamily="mono">const x = 42;</Typography>
<Typography tag="kbd">Ctrl + C</Typography>
<Typography tag="legal" color="muted">© 2026 All rights reserved</Typography>
```

**Available Tags:** `h1`–`h6`, `p`, `span`, `code`, `kbd`, `headline`, `body`, `label-1`, `label-2`, `caption`, `legal`, and more.

**Available Colors:** `default`, `primary`, `secondary`, `dark`, `light`, `muted`, `success`, `warning`, `error`

---

## 7. CSS Design Tokens

The library defines an extensive set of CSS custom properties for deep customization.

### Breakpoints

| Name  | Value   |
| ----- | ------- |
| `xs`  | 480px   |
| `sm`  | 640px   |
| `md`  | 768px   |
| `lg`  | 1024px  |
| `xl`  | 1280px  |
| `2xl` | 1440px  |
| `3xl` | 1780px  |
| `4xl` | 2160px  |

### Primitive Color Tokens

~170 color tokens across 13 spectrums × 13 stops:

```
--color-tucu-ui-{spectrum}-{stop}
```

**Spectrums:** red, orange, amber, yellow, chartreuse, green, teal, cyan, blue, indigo, violet, purple, fuchsia

**Stops:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Custom Properties Pattern

```css
/* Access tokens directly in CSS if needed */
.custom-element {
  background-color: var(--color-tucu-ui-blue-500);
  border-color: var(--color-tucu-ui-blue-200);
}
```

But prefer Tailwind utility classes with semantic tokens in most cases.

---

## 8. Built-in Error Pages

10 pre-designed error pages matching the theme automatically:

| Page                | Use Case                                |
| ------------------- | --------------------------------------- |
| `NotFoundPage`      | 404 — page not found                   |
| `AccessDeniedPage`  | 401 — unauthorized access              |
| `ForbiddenPage`     | 403 — forbidden                        |
| `ServerErrorPage`   | 500 — internal server error            |
| `DefaultErrorPage`  | Generic error fallback                 |
| `FallbackPage`      | Loading/suspense fallback              |
| `DisabledPage`      | Feature/route disabled                 |
| `NoRoutesPage`      | No routes configured                   |
| `UserBlockedPage`   | User account blocked                   |
| `UnknownPage`       | Unclassified error                     |

```tsx
import { NotFoundPage, ServerErrorPage } from '@e-burgos/tucu-ui';

// Use in your routing configuration
{ path: '*', element: <NotFoundPage /> }
```

---

## 9. Agent Guidelines for Design System

1. **Always use semantic tokens** (`bg-primary`, `text-secondary`, etc.) — never static Tailwind colors.
2. **Prefer `CardContainer`** over raw `<div>` for themed surfaces with proper borders, shadows, and dark mode.
3. **Choose layouts thoughtfully**: Admin for complex apps, Horizontal for content, Clean for auth/errors.
4. **Use `useTheme` hook** for runtime theme access — don't manipulate CSS variables directly.
5. **Enable `showSettings`** in `ThemeProvider` during development for easy visual testing.
6. **Test both modes**: Always verify components look correct in both light and dark mode.
7. **Use `Typography` component** instead of raw `<h1>`, `<p>`, etc. for consistent styling.
8. **Respect breakpoints**: Use `useBreakpoint` / `useIsMobile` hooks for responsive logic in JS.
