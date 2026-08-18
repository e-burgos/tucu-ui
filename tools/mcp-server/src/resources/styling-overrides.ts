// ─── Resource: Styling Overrides ─────────────────────────────────────────────

export function getStylingOverridesContent(): string {
  return `# Styling Overrides — @e-burgos/tucu-ui

tucu-ui ships its visual layer as Tailwind utility classes baked directly into each
component. There is no theming API for arbitrary CSS properties (border-radius, custom
shadows, glass effects, etc.) beyond the color presets in \`tucu://theme\`. To restyle a
component from a consumer app you select it in the DOM and override with your own CSS —
this resource is the map of what you can hook into, what you cannot, and the specificity
rule that makes the override actually win.

## The \`data-tucu\` anchor layer

Every component below renders one or more \`data-tucu="..."\` attributes you can select
from your own stylesheet. This is the intended, version-stable styling hook — prefer it
over targeting Tailwind utility classes or DOM structure, both of which change silently
between tucu-ui releases.

### Core components

| \`data-tucu\` value | Component / element | Source |
|---|---|---|
| \`admin-header\` | \`AdminHeader\` — the sticky topbar (\`nav\`) | \`ui/tucu-ui/src/components/layouts/header/admin-header.tsx\` |
| \`horizontal-header\` | \`HorizontalHeader\` — topbar for the horizontal layout | \`ui/tucu-ui/src/components/layouts/header/horizontal-header.tsx\` |
| \`admin-layout\` / \`admin-content\` | \`AdminLayout\` root \`div\` / content area | \`ui/tucu-ui/src/components/layouts/admin-layout/index.tsx\` |
| \`horizontal-layout\` / \`horizontal-content\` | \`HorizontalLayout\` root / content | \`ui/tucu-ui/src/components/layouts/horizontal/index.tsx\` |
| \`expandable-sidebar\` | \`ExpandableSidebar\` rail (\`aside\`) | \`ui/tucu-ui/src/components/layouts/menus/expandable-sidebar.tsx\` |
| \`sidebar-pin\` | The pin/unpin button inside the expanded rail | \`ui/tucu-ui/src/components/layouts/menus/expandable-sidebar.tsx\` |
| \`button\` | \`Button\` — the real \`<button>\` element | \`ui/tucu-ui/src/components/buttons/button/index.tsx\` |
| \`topup-button\` | \`TopupButton\` | \`ui/tucu-ui/src/components/buttons/topup-button.tsx\` |
| \`input\` / \`input-control\` | \`Input\` — wrapper \`div\` / the real \`<input>\` | \`ui/tucu-ui/src/components/inputs/input.tsx\` |
| \`input-calendar\` | \`Input type="date"\` — the portaled calendar popup | \`ui/tucu-ui/src/components/inputs/input.tsx\` |
| \`input-searcher\` / \`select-menu\` / \`select-option\` | \`InputSearcher\` root / its dropdown / its options | \`ui/tucu-ui/src/components/inputs/input-searcher.tsx\` |
| \`select\` / \`select-trigger\` / \`select-menu\` / \`select-search\` / \`select-option\` | \`Select\` — \`select\` is the label+button **wrapper**, \`select-trigger\` is the control (see specificity note) | \`ui/tucu-ui/src/components/inputs/select.tsx\` |
| \`textarea\` | \`Textarea\` | \`ui/tucu-ui/src/components/inputs/textarea.tsx\` |
| \`checkbox\` / \`radio\` / \`radio-group\` | \`Checkbox\` / \`Radio\` / \`RadioGroup\` | \`ui/tucu-ui/src/components/inputs/checkbox.tsx\`, \`radio.tsx\`, \`radio-group.tsx\` |
| \`switch\` / \`switch-control\` | \`Switch\` wrapper / the actual toggle track | \`ui/tucu-ui/src/components/inputs/switch.tsx\` |
| \`pin-code\` / \`pin-code-input\` | \`PinCode\` wrapper / each digit cell | \`ui/tucu-ui/src/components/inputs/pin-code.tsx\` |
| \`file-input\` / \`file-input-dropzone\` / \`file-input-content\` / \`file-input-placeholder\` / \`file-input-image-preview\` / \`file-input-preview\` | \`FileInput\` and its internal parts | \`ui/tucu-ui/src/components/inputs/file-input.tsx\` |
| \`toggle-bar\` | \`ToggleBar\` | \`ui/tucu-ui/src/components/inputs/toggle-bar.tsx\` |
| \`card\` | \`Card\` / \`CardContainer\` | \`ui/tucu-ui/src/components/cards/card.tsx\`, \`card-container.tsx\` |
| \`card-title\` / \`card-title-label\` | \`CardTitle\` | \`ui/tucu-ui/src/components/cards/card-title.tsx\` |
| \`chart\` / \`chart-empty\` / \`chart-tooltip\` | Chart wrappers | \`ui/tucu-ui/src/components/charts/components/*.tsx\` |
| \`badge\` | \`Badge\` | \`ui/tucu-ui/src/components/common/badge.tsx\` |
| \`collapse\` / \`collapse-trigger\` / \`collapse-content\` | \`Collapse\` | \`ui/tucu-ui/src/components/common/collapse.tsx\` |
| \`pagination\` / \`pagination-btn\` / \`pagination-page\` / \`pagination-ellipsis\` | \`Pagination\` | \`ui/tucu-ui/src/components/common/pagination.tsx\` |
| \`drawer\` | The \`DrawerContainer\`/\`Drawer\` panel (NOT the backdrop — see gaps below) | \`ui/tucu-ui/src/components/dialog/drawer-container.tsx\` |
| \`modal-overlay\` / \`modal\` / \`modal-buttons\` | \`Modal\` | \`ui/tucu-ui/src/components/dialog/modal.tsx\` |
| \`macos-tahoe-drawer\` | \`Sidebar\` / \`SidebarMenu\` dialog panels (they reuse the Tahoe drawer anchor) | \`ui/tucu-ui/src/components/dialog/sidebar.tsx\`, \`sidebar-menu.tsx\` |
| \`list-item\` / \`list-trigger\` / \`list-dropdown\` | \`ListContainer\` / \`ListItem\` | \`ui/tucu-ui/src/components/list/list-container.tsx\`, \`list-Item.tsx\` |
| \`loader\` / \`spinner\` / \`progressbar\` / \`progressbar-fill\` | Loaders | \`ui/tucu-ui/src/components/loaders/*.tsx\` |
| \`alert\` / \`notification-card\` / \`toast-container\` / \`toast\` | \`Alert\` / \`NotificationCard\` / \`Toast\` | \`ui/tucu-ui/src/components/notifications/*.tsx\` |
| \`table\` / \`table-element\` / \`table-header\` / \`table-header-cell\` / \`table-row\` / \`table-cell\` / \`table-scroll\` | \`BasicTable\` ONLY — its desktop table markup and mobile card rows | \`ui/tucu-ui/src/components/table/basic-table.tsx\` |
| \`typography\` | \`Typography\` | \`ui/tucu-ui/src/components/typography/index.tsx\` |
| \`code-block\` | \`CodeBlock\` | \`ui/tucu-ui/src/components/utils/code-block.tsx\` |
| \`auth-form\` / \`auth-form-panel\` | \`SignInForm\`/\`SignUpForm\`/\`ForgetPasswordForm\` | \`ui/tucu-ui/src/components/auth/*.tsx\` |
| \`theme-background\` | The animated/gradient background layer behind every layout | \`ui/tucu-ui/src/themes/components/theme-background.tsx\` |
| \`coin-info-card\` / \`coin-card\` / \`collection-card\` | Blockchain cards | \`ui/tucu-ui/src/components/blockchain/*.tsx\` |

### macOS design systems (Sonoma & Tahoe)

The macOS component families carry their own, denser anchor sets — every window, dock,
toolbar, sidebar, command palette and control exposes one. Highlights (full inventory via
the grep below): \`window\` / \`title-bar\` / \`window-content\` / \`traffic-lights\` /
\`traffic-light\` / \`sidebar\` / \`toolbar\` / \`segmented-control\` / \`segmented-item\` /
\`command-palette*\` (13 sub-anchors: overlay, input, results, item, shortcut, footer, …)
for Sonoma (\`ui/tucu-ui/src/components/macos/sonoma/\`), and \`tahoe-window\` /
\`tahoe-window-titlebar\` / \`tahoe-dock\` / \`tahoe-dock-bar\` / \`toolbar-tahoe\` /
\`macos-tahoe-sidebar\` / \`macos-tahoe-drawer\` / \`tahoe-command-palette*\` /
\`tahoe-widget\` / \`tahoe-dialog\` / \`tahoe-search-bar\` / \`tahoe-progress-bar\` /
\`tahoe-segmented-control\` / \`tahoe-notification-banner\` / \`macos-tahoe-root\` /
\`macos-tahoe-navbar-*\` / \`macos-sonoma-navbar-*\` for Tahoe and the macOS layouts
(\`ui/tucu-ui/src/components/macos/tahoe/\`, \`ui/tucu-ui/src/components/layouts/macos-layout/\`).

Full inventory verified with \`grep -rn "data-tucu" ui/tucu-ui/src\` against this
version — treat the tables above as the source of truth; this file is regenerated by
re-running that grep, not maintained by hand from memory.

## The specificity rule: compound selector, or you tie with the library

Every \`data-tucu\` attribute selector has specificity **(0,1,0)** — the same as a single
class. tucu-ui's own Tailwind utility classes on that same element are *also* single
classes, so when your override and the library's utility have the same specificity,
**whichever rule is loaded later in the stylesheet wins** — which in practice means your
build order, not your intent, decides. A page can render correctly in dev and wrong in
prod (or vice versa) purely because of chunk/CSS ordering.

**Rule: always pair the \`data-tucu\` attribute with a tag name or your own class to reach
specificity (0,1,1)/(0,2,0) or higher.** That beats every plain Tailwind utility class
unconditionally, regardless of load order.

\`\`\`css
/* FRAGILE — (0,1,0), ties with tucu-ui's own utility classes on load order */
[data-tucu='expandable-sidebar'] {
  background: var(--my-sidebar-bg);
}

/* CORRECT — (0,1,1), always wins */
aside[data-tucu='expandable-sidebar'] {
  background: var(--my-sidebar-bg);
}
\`\`\`

This is not theoretical: \`ExpandableSidebar\` renders \`data-tucu="expandable-sidebar"\`
together with the Tailwind utility \`bg-light-dark\` on the same \`<aside>\`
(\`ui/tucu-ui/src/components/layouts/menus/expandable-sidebar.tsx\`) — a bare attribute
selector for the background ties with \`bg-light-dark\` and the result depends on which
stylesheet loaded last.

The same reasoning applies to \`!important\` utilities. \`MenuItem\`'s active state applies
\`'!text-white !bg-brand'\` — Tailwind utilities with \`!important\`
(\`ui/tucu-ui/src/components/layouts/menus/menu-item.tsx\`) — and some input color
variants use them too (e.g. \`!border-brand/70\` in the \`ghost\` color table,
\`ui/tucu-ui/src/components/inputs/helpers/control-colors.ts\`). No non-\`!important\`
selector, compound or not, can beat those. The only way to override an \`!important\`
utility is another \`!important\` declaration, and it should live inside a compound
selector scoped to exactly the state you're overriding, with the reason written next to
it — a last resort for a specific, documented case, not a general pattern.

## Components with no styling hook at all

These render no \`data-tucu\` attribute on the element you'd actually want to restyle.

| Component / element | Why there's no hook | Workaround |
|---|---|---|
| \`CleanLayout\` (the default, non-macOS one) | The root \`div\` (\`flex h-dvh flex-col\`) carries no \`data-tucu\`, no id — only the caller's own \`className\` prop, merged via \`cn()\` (\`ui/tucu-ui/src/components/layouts/clean-layout/index.tsx\`) | Always pass your own \`className\` to \`CleanLayout\` and select through it — there is nothing else to select. (The macOS Sonoma clean layout DOES have an anchor: \`macos-sonoma-content\`) |
| The \`ThemeWrapper\` scroll container | \`ThemeProvider\`/\`ThemeWrapper\` mounts \`div.fixed.inset-0.h-dvh.overflow-y-auto.overflow-x-hidden.bg-body\` with no \`data-tucu\` (\`ui/tucu-ui/src/themes/components/theme-provider/theme-wrapper.tsx\`) | Its \`className\` prop IS forwarded (raw template-string concatenation, not \`cn()\`), so pass \`className\` to \`ThemeProvider\` and select through your own class. To retint what it paints without a class, target the \`--color-body\` variable instead (see \`tucu://tokens\`). Changing its \`overflow\` behavior is unsupported — see \`tucu://shell\` |
| \`DrawerContainer\`/\`Drawer\` backdrop | The panel gets \`data-tucu="drawer"\`, but the backdrop \`div\` in the portal has no \`data-tucu\` of its own (\`ui/tucu-ui/src/components/dialog/drawer-container.tsx\`) | Use the \`backdropClassName\` prop (DrawerContainer only — Drawer does not forward it): it REPLACES the default \`bg-gray-700/10 backdrop-blur-xs\` appearance entirely (\`backdropClassName ?? (backdrop ? '...' : '')\`); see the no-blur recipe below |
| \`DataTable\` (the advanced, \`@tanstack/react-table\`-based table) | Zero \`data-tucu\` attributes anywhere in its render tree — verified with \`grep -rn "data-tucu" ui/tucu-ui/src/datatable/\` returning no matches. This is a different component tree from \`BasicTable\`, which does carry the \`table-*\` anchors listed above | Style it through the CSS custom properties it reads instead of DOM selectors: the \`--color-table-*\` family (\`--color-table-primary\`, \`--color-table-row-bg\`, \`--color-table-row-hover\`, \`--color-table-header-bg\`, \`--color-table-divider\`, …) declared in \`ui/tucu-ui/src/assets/css/datatable.css\` and consumed throughout \`ui/tucu-ui/src/datatable/components/DataTable/\` (both as generated utilities like \`.bg-table-header\` and as inline \`style={{ background: 'var(--color-table-…)' }}\`). Full reference: \`tucu://datatable\` |

## Verified recipes

### 1. Restyling the header — know that it has NO background class of its own

Unlike most design systems, \`AdminHeader\` paints no background at all: its class string
is \`sticky top-0 z-30 backdrop-blur-lg min-h-[72px] h-[72px] w-full …\` — \`backdrop-blur-lg\`
is there, but no \`bg-*\` utility (\`ui/tucu-ui/src/components/layouts/header/admin-header.tsx\`).
What you see behind it is the \`bg-body\` of the \`ThemeWrapper\` scroll container showing
through the blur. Two consequences:

- A glass/tinted header is one added rule (nothing to fight — you're adding a background,
  not overriding one):

\`\`\`css
nav[data-tucu='admin-header'] {
  background: color-mix(in oklab, var(--color-body) 55%, transparent);
  border-bottom: 1px solid var(--color-border);
}
\`\`\`

- The blur only has an effect while the header background stays translucent — paint it
  opaque and \`backdrop-blur-lg\` becomes invisible.

### 2. \`input-control\` border, at a selector that actually matches the real control

Unlike \`Select\`, where \`data-tucu="select"\` is the outer wrapper (label + trigger
button) and \`data-tucu="select-trigger"\` is the actual interactive control, \`Input\`
puts \`data-tucu="input-control"\` directly on the real \`<input>\`
(\`ui/tucu-ui/src/components/inputs/input.tsx\`):

\`\`\`css
input[data-tucu='input-control'] {
  border-color: var(--my-input-border);
}
input[data-tucu='input-control']:focus {
  border-color: var(--my-input-border-focus);
}
\`\`\`

If you write the equivalent rule for \`Select\` against \`[data-tucu='select']\` instead of
\`[data-tucu='select-trigger']\`, you are styling the wrapper that contains the label,
not the button the user clicks — a common one-hour debugging trap. Note also that some
\`color\` variants bake \`!important\` borders (\`control-colors.ts\`, e.g. ghost's
\`!border-brand/70\`) — those need an \`!important\` override, see the specificity section.

### 3. Neutralizing \`Button\`'s global hover lift

Every \`Button\` that is enabled, not loading, and not \`variant="transparent"\` applies a
hover/focus lift + shadow globally:

\`\`\`tsx
// ui/tucu-ui/src/components/buttons/button/index.tsx
'hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-hidden'
\`\`\`

That is often wrong for buttons embedded in dense UI (table row actions, toolbar icon
buttons) where a lift reads as jitter. Neutralize it per call site with your own class,
compound with \`[data-tucu='button']\` so it beats the utility regardless of load order:

\`\`\`css
[data-tucu='button'].my-btn-quiet:hover,
[data-tucu='button'].my-btn-quiet:focus {
  transform: none;
  box-shadow: none;
}
\`\`\`

\`\`\`tsx
<Button className="my-btn-quiet" variant="ghost" size="mini">Edit</Button>
\`\`\`

### 4. Sidebar background — the canonical compound-selector case

\`ExpandableSidebar\`'s \`<aside>\` carries \`bg-light-dark\` in both collapsed and expanded
states plus width utilities (\`w-[96px]\` collapsed, \`xl:w-[288px] 2xl:w-[320px]\`
expanded) (\`ui/tucu-ui/src/components/layouts/menus/expandable-sidebar.tsx\`):

\`\`\`css
/* Compound — see the specificity section for why the bare attribute is fragile */
aside[data-tucu='expandable-sidebar'] {
  background: var(--my-sidebar-bg);
}
\`\`\`

**Active menu item color:** \`MenuItem\` marks the active item with \`!important\`
utilities (\`'!text-white !bg-brand'\`, and \`activeClassName\` variants —
\`ui/tucu-ui/src/components/layouts/menus/menu-item.tsx\`) and exposes no prop to change
the color. If the resulting contrast against your custom sidebar background fails WCAG
(a real risk — the utility was tuned against tucu-ui's own default background, not
yours), the override requires another \`!important\` declaration scoped to
\`aside[data-tucu='expandable-sidebar']\` — there is no cleaner hook.

### 5. A backdrop that doesn't blur the content behind it (filter/side drawers over data)

\`Drawer\`'s backdrop always applies \`bg-gray-700/10 backdrop-blur-xs\` and there is no
prop to change it — \`Drawer\` does not forward \`backdropClassName\` to the
\`DrawerContainer\` it wraps. If the drawer sits over a data table or any content where a
blurred backdrop is undesirable (performance over thousands of rows, or so users can
still glance at the table while the drawer is open), use \`DrawerContainer\` directly and
pass your own \`backdropClassName\` — it replaces the appearance classes entirely while
keeping positioning/transition:

\`\`\`tsx
import { DrawerContainer } from '@e-burgos/tucu-ui';

<DrawerContainer
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  backdropClassName="my-scrim" // replaces bg-gray-700/10 backdrop-blur-xs entirely
>
  <div className="pointer-events-auto h-full w-96 bg-body p-6">
    {/* remember: the panel wrapper is pointer-events-none, this div needs
        pointer-events-auto or every control inside is inert */}
  </div>
</DrawerContainer>
\`\`\`

\`\`\`css
.my-scrim {
  background: rgb(0 0 0 / 10%);
  /* no backdrop-filter */
}
\`\`\`

See \`tucu://catalog\` (\`DrawerContainer\` entry) for the full prop/behavior list and its
accessible-name limitation.
`;
}
