// ─── Resource: Design Tokens ────────────────────────────────────────────────

export function getTokensContent(): string {
  return `# Design Tokens — @e-burgos/tucu-ui

## Architecture
Three layers:
1. **CSS Custom Properties** (\`--color-tucu-ui-*\` primitives → \`--color-semantic-*\`) — token values
2. **Tailwind v4 Theme** (\`@theme\` in \`ui/tucu-ui/src/assets/css/theme.css\`) — maps tokens to utility classes
3. **Zustand Store** (\`useTheme\`) — runtime state for mode, presets, layout, direction

## Semantic Tokens (Tailwind Classes)

These come from a fixed set of \`--color-*\` aliases registered in \`@theme\`
(\`ui/tucu-ui/src/assets/css/theme.css\`), each pointing at a \`--color-semantic-*\`
variable whose light/dark values live in \`base.css\` (\`html:root\` / \`html.dark\`) —
this is the **complete list**; there is no \`-foreground\` pairing convention (no
\`primary-foreground\`, \`secondary-foreground\`, \`muted-foreground\`) and no
\`bg-background\`/\`bg-destructive\` aliases despite those being common in other
shadcn-style systems — verified by grep across \`ui/tucu-ui/src/assets/css\`, zero
matches for either.

| Token | Backing variable | Light default (primitive) | Usage |
|-------|-------------------|--------------|-------|
| \`bg-brand\` / \`text-brand\` | \`--color-brand\` → \`--color-semantic-bg-primary\` | \`blue-60\` | Same value as \`primary\` — brand-colored surfaces, active nav |
| \`bg-primary\` / \`text-primary\` | \`--color-primary\` → \`--color-semantic-bg-primary\` | \`blue-60\` | Primary actions, emphasis (reactive to \`primaryPreset\`) |
| \`bg-secondary\` / \`text-secondary\` | \`--color-secondary\` → \`--color-semantic-bg-secondary\` | \`gray-10\` | Reactive to \`secondaryPreset\`, but no core component consumes the utility directly — variable-level consumers only (DataTable, macOS) |
| \`bg-accent\` / \`text-accent\` | \`--color-accent\` → \`--color-semantic-accent-bold-yellow\` | \`yellow-30\` | Reactive to \`accentPreset\`, but unused by core components today — accent's visible consumers are macOS Tahoe components via their own variables |
| \`bg-muted\` / \`text-muted\` | \`--color-muted\` → \`--color-semantic-fg-muted\` | \`gray-60\` | Muted/disabled elements across all form inputs (reactive to \`mutedPreset\`) |
| \`bg-success\` | \`--color-success\` → \`--color-semantic-bg-positive\` | \`green-60\` | Success status (reactive to \`successPreset\`) |
| \`bg-warning\` | \`--color-warning\` → \`--color-semantic-bg-warning\` | \`orange-40\` | Warning status (reactive to \`warningPreset\`) |
| \`bg-error\` | \`--color-error\` → \`--color-semantic-bg-negative\` | \`red-60\` | Error status (reactive to \`errorPreset\`) — there is no \`destructive\` token, \`error\` is the negative-spectrum name used throughout |
| \`bg-info\` | \`--color-info\` → \`--color-semantic-bg-**primary**\` | \`blue-60\` | **Follows \`primary\`, not \`infoPreset\`** — see the divergence note below |
| \`bg-foreground\` / \`text-foreground\` | \`--color-foreground\` → \`--font-primary-color\` → \`--color-semantic-fg\` | \`gray-100\` | Default text color (reactive to \`fgPreset\`) |
| \`bg-body\` | \`--color-body\` → \`--color-semantic-bg\` | \`gray-0\` | **The real page background** — painted by the \`div.fixed.inset-0.h-dvh\` \`ThemeWrapper\` mounts, not \`html\`/\`body\` (see \`tucu://shell\`) |
| \`bg-light\` / \`bg-dark\` | \`--color-light\` / \`--color-dark\` | mirrors \`bg-body\` per mode | Mode-pinned background aliases |
| \`bg-light-dark\` | \`--color-light-dark\` → \`--color-semantic-bg-secondary-wash\` | \`gray-5\` | Secondary surface wash — sidebars, table headers, hover states (reactive to \`lightDarkPreset\`/\`darkLightDarkPreset\`) |
| \`border-border\` / \`bg-border\` | \`--color-border\` → \`--color-semantic-line-primary-subtle\` (with a \`color-mix\` fallback) | 10% black mix | Default border color, used by 50+ component files (reactive to \`borderPreset\`) |

(Primitive names above are \`--color-tucu-ui-<spectrum>-<stop>\`; dark mode swaps every
\`--color-semantic-*\` to its \`--color-semantic-dark-*\` counterpart under \`html.dark\` —
\`base.css\`.)

**\`info\` is the one preset that does not retint its same-named Tailwind utility.**
\`useThemeColor\` writes \`infoPreset\` into \`--color-semantic-bg-info\`
(\`ui/tucu-ui/src/themes/hooks/use-theme-color.ts\`), but the \`bg-info\` utility's
backing alias is \`--color-info: var(--color-semantic-bg-primary)\`
(\`theme.css\`) — so \`bg-info\` follows your **primary** color, and
\`customPaletteColor.info\` only affects code that reads \`--color-semantic-bg-info\`
directly. Every other preset in the table above does retint its matching utility live,
through the \`useThemeColor\` effect (mounted inside the always-rendered
\`SettingsButton\` — see \`tucu://theme\`) writing the underlying \`--color-semantic-*\`
variables these aliases point to.

## Dark mode

Dark mode is a **class strategy**, not \`prefers-color-scheme\` or a data attribute:
\`@custom-variant dark (.dark &);\` (\`theme.css\`) means every \`dark:\` utility only
applies under an ancestor \`.dark\` class. \`ThemeWrapper\` toggles \`dark\`/\`light\` on
\`document.documentElement\` (\`<html>\`) from the \`mode\` store field on every change —
and additionally toggles \`macos\` / \`macos-tahoe\` classes there for the macOS theme
styles, so \`html.macos.dark {}\`-style selectors are the intended CSS hooks
(\`ui/tucu-ui/src/themes/components/theme-provider/theme-wrapper.tsx\`). There is no
\`[data-theme]\` attribute anywhere in the library.

## Build your own token layer

tucu-ui does not ship a consumer-facing design-token layer beyond the \`--color-*\`
aliases and presets above — the supported way to add product-specific tokens (a bespoke
material system, custom status colors, brand-specific spacing scales, etc.) is to
define your own CSS custom properties in your app's stylesheet and apply them through
the \`data-tucu\` anchors documented in \`tucu://styling-overrides\` — never by editing
tucu-ui's own \`--color-tucu-ui-*\`/\`--color-semantic-*\` variables, which are internal
implementation details the library can rename or restructure between minor versions.
Prefer layering your tokens as values that reference tucu-ui's semantic aliases
(\`var(--color-body)\`, \`var(--color-border)\`) so your palette still moves with
light/dark mode and \`customPaletteColor\`, instead of hardcoding hex values that go
stale the moment someone rebrands.

## Usage Rules
\`\`\`tsx
// CORRECT — Uses semantic tokens, adapts to theme
<div className="bg-primary text-white p-4 rounded-lg">Themed</div>
<div className="bg-light-dark text-foreground p-4">Card Surface</div>
<p className="text-muted text-sm">Helper text</p>

// INCORRECT — Hardcoded colors, ignores theme
<div className="bg-blue-500 text-white p-4">Won't adapt</div>
\`\`\`

## Color Presets

\`colorPreset\` (\`ui/tucu-ui/src/themes/config/index.ts\`) has **46 entries**, grouped in
three families — all selectable through \`customPaletteColor\`/\`brandColor\` by label
(see \`tucu://theme\`):

### Named presets (22) — the ones a brand color picker would show
Blue, Green, Orange, Gray, Indigo, Pink, Purple, Red, Teal, Yellow, Chartreuse — each
with a Light and a Dark variant (11 × 2 = 22).

### Default slots (12) — the values \`useTheme\`'s default state actually ships with
DefaultPrimary/DarkPrimary, DefaultSecondary/DarkSecondary, DefaultAccent/DarkAccent,
DefaultMuted/DarkMuted, DefaultLightBg/DarkBg, DefaultLightDark/DarkLightDark.

### Status & foreground presets (12)
DefaultSuccess/DarkSuccess, DefaultWarning/DarkWarning, DefaultError/DarkError,
DefaultInfo/DarkInfo, DefaultFg/DarkFg, DefaultBorder/DarkBorder — these back
\`Alert\`/\`Badge\`/\`Toast\` status variants and the default text/border colors, themeable
via \`customPaletteColor\`'s \`success\`/\`warning\`/\`error\`/\`info\`/\`fg\`/\`border\` keys
exactly like the other 18 (see the blast-radius table in \`tucu://theme\`).

### macOS System Color Presets (12) — separate, NOT in \`colorPreset\`
MacOSPrimary/DarkPrimary (#007aff/#0a84ff systemBlue), MacOSSecondary/DarkSecondary,
MacOSAccent/DarkAccent (systemOrange), MacOSMuted/DarkMuted, MacOSLightBg/DarkBg,
MacOSLightDark/DarkLightDark. These live in a separate \`macosLightPresets\` object
(\`config/index.ts\`) used only as the initial config for \`applyMacOSTheme()\` — they are
**not reachable by label** through \`customPaletteColor\`/\`brandColor\` (whose lookup
runs \`colorPreset.find(...)\`). The macOS/Tahoe accent pickers use their own bundles
instead: \`SONOMA_ACCENT_BUNDLES\` (8) and \`TAHOE_ACCENT_BUNDLES\` (9, adds
\`glass-neutral\`).

## Primitive Color Tokens

**143 tokens** as \`--color-tucu-ui-{spectrum}-{stop}\` (\`theme.css\`), across **11
chromatic spectrums** — blue, chartreuse, gray, green, indigo, orange, pink, purple,
red, teal, yellow — each with a \`dark-\`-prefixed counterpart family
(\`--color-tucu-ui-dark-{spectrum}-{stop}\`) at fewer stops. There are no \`amber\`,
\`cyan\`, \`violet\` or \`fuchsia\` spectrums. These are internal — build on the semantic
aliases above, not on primitives.

## Breakpoints

These values exist as a JS runtime table inside \`useBreakpoint()\`
(\`ui/tucu-ui/src/hooks/use-breakpoint.ts\`) — they are NOT registered Tailwind
\`@theme\` screens: \`theme.css\` explicitly removes custom screen definitions "to avoid
conflicts with consumer's Tailwind config", so \`sm\`–\`2xl\` class prefixes are
Tailwind's own defaults and there is no \`xs:\`/\`3xl:\`/\`4xl:\` prefix available.
tucu-ui's own components reproduce the extra stops as arbitrary values
(\`min-[500px]:\`, \`min-[1780px]:\`).

| Name | Value | Reachable as a Tailwind class prefix? |
|------|-------|---|
| xs | 480px | No — components use \`min-[500px]\` instead, not this exact value |
| sm | 640px | Yes — Tailwind default |
| md | 768px | Yes — Tailwind default |
| lg | 1024px | Yes — Tailwind default |
| xl | 1280px | Yes — Tailwind default |
| 2xl | 1440px | No — Tailwind's own default \`2xl\` is 1536px; this value only exists in \`useBreakpoint()\`'s JS table |
| 3xl | 1780px | No — reproduce with \`min-[1780px]\` |
| 4xl | 2160px | No — defined in the hook only |

## Typography
- **Base Font**: Roboto (Google Fonts, loaded automatically)
- **Typography component**: 30+ semantic tags
- **Tags**: h1-h6, p, span, code, kbd, headline, body, label-1, label-2, caption, legal
- **Colors**: default, primary, secondary, dark, light, muted, success, warning, error
`;
}
