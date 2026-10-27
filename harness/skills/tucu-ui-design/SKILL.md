---
name: tucu-ui-design
description: Design, build and review user interfaces with @e-burgos/tucu-ui. Use when creating or restyling pages, dashboards, landing/marketing pages, sign-in and sign-up screens, forms, tables, cards, modals or empty states with tucu-ui; when choosing a layout, theme preset, glass/bold/editorial look, density (compact, comfortable, spacious) or motion level; when asking for a "polished", "modern" or "production-quality" UI; or when reviewing a screen for spacing, typography, color tokens, states, responsiveness and accessibility.
---

# tucu-ui design

Compose interfaces with `@e-burgos/tucu-ui` that look intentional: clear hierarchy, consistent spacing, token-based color, complete states, responsive and accessible. Use library components and tokens; do not hand-roll what the library already ships.

## When to use

- Building or restyling any screen that uses tucu-ui.
- Choosing a layout, preset, density or motion level.
- Reviewing an existing screen before shipping.

Not for: backend work, or screens that do not use tucu-ui.

## Workflow

1. **Read the guide.** Read the `tucu://design-guide` resource from the tucu-ui MCP server. If the MCP server is not connected, read `references/design-guide.md` next to this file (same content).
2. **Decide the look.** Pick layout, style, density and motion with the tables below. State the choices before writing code.
3. **Generate.** Use the MCP tools `generate_page` and `generate_component`, passing `style`, `motion` and `density`. Use `generate_form`, `generate_datatable` and `generate_chart` for those building blocks. Use `list_components`, `get_component` and `get_props` to confirm names and props instead of guessing.
4. **Review.** Run the `design-review` MCP prompt on the result, or walk `references/checklist.md`. Fix every blocker and major finding.
5. **Verify in the browser.** Open the page at desktop width and at 375px. Check light and dark mode, keyboard navigation, loading, empty and error states, and with `prefers-reduced-motion` enabled.

## Layout chooser

| Screen | Use |
| --- | --- |
| Authenticated app with navigation | `ThemeWrapper` with `layout="admin"` (sidebar) or `"horizontal"` (top nav) |
| Focused page without chrome | `ThemeWrapper` with `layout="clean"` |
| Landing, pricing, docs home | `MarketingLayout` (props `nav`, `footer`, `mainId`) |
| Sign in, sign up, reset password | `SplitAuthLayout` (`variant="split"` or `"centered"`, `brand`, `title`, `subtitle`) |
| macOS-style shell | `ThemeWrapper` with `themeStyle="macos"` or `"macos-tahoe"` |

`generate_page` accepts the matching `layout` values, including `marketing` and `auth`.

## Style to preset

| `style` | Preset | Surface | Use for |
| --- | --- | --- | --- |
| `clean` | `minimal` | Solid cards | Dense tools, admin back-offices |
| `glass` | `glass` | `GlassPanel` | Showcase, media-rich or dashboard hero areas |
| `bold` | `vibrant` | Solid, strong accent | Marketing, onboarding |
| `editorial` | `classic` | Solid, serif headings | Content-heavy, documentation, reports |

Built-in presets also include `elegant` and `fresh`. Apply with `ThemeProvider`/`ThemeWrapper` `preset="..."` or scope a region with `ThemeScope`. Brand color comes from the preset or `brandColor`; never hardcode hex values in components.

## Density to props

| `density` | Card | BasicTable | Alert | Controls |
| --- | --- | --- | --- | --- |
| `compact` | `density="compact"` | `density="compact"` | `density="compact"` | `size="xs"` on Button/Input/Select |
| `comfortable` | `density="default"` | `density="default"` | `density="default"` | default sizes |
| `spacious` | `density="comfortable"` | `density="default"` | `density="default"` | default sizes, larger gaps between sections |

Pick one density per screen. Tables on narrow screens stay readable through `mobileCards` (on by default).

## Motion levels

| `motion` | Behavior |
| --- | --- |
| `none` | `MotionConfig reducedMotion="always"`: no transform animation |
| `subtle` | Library default: `ThemeWrapper` provides `MotionConfig reducedMotion="user"`, short fades and slides |
| `expressive` | Springs and staggered entrances, still respecting `prefers-reduced-motion` |

Animate only entrances, state changes and feedback. Never animate layout-critical content on every render. `ThemeWrapper` accepts `motion={{ reducedMotion: 'user' | 'always' | 'never' }}`.

## Composition rules

- One primary action per view. Secondary actions use quieter button variants.
- Page title, short description and primary action form the header; content below in `Card`s or `GlassPanel`s with consistent gaps.
- Group related fields; label every control; show validation next to the field. Build forms with `generate_form` and the library form components.
- Metrics use `StatCard`; status uses `StateBadge`; tabular data uses `BasicTable` or DataTable (`generate_datatable`).
- Every data view has loading (`Skeleton`), empty (`EmptyState`) and error (`ErrorState`) states.
- Overlays use `Modal`, `Drawer` or `ConfirmDialog`; they render inside the theme scope automatically.
- User-visible strings come from your app's i18n; library defaults follow the `lang` prop.

## Anti-patterns

- Hardcoded colors, pixel spacing or `dark:` pairs when a token or semantic utility exists.
- Mixing densities or radii on one screen.
- Several competing primary buttons.
- Nested cards and decorative gradients behind data.
- Icon-only buttons without an accessible name.
- Tables that overflow the viewport at 375px.
- Missing empty, loading or error states.
- Animation that ignores `prefers-reduced-motion`.
- Reimplementing a component the library already provides.
- Using `document.body` for portals instead of the library overlay components.

## Review checklist

The short form is in `references/checklist.md`. Severities: **blocker** (broken a11y, unreadable, crash states), **major** (inconsistent tokens/spacing, missing states, overflow at 375px), **minor** (polish).
