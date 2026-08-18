// ─── Resource: App Shell & Orchestration ─────────────────────────────────────

export function getShellContent(): string {
  return `# App Shell & Orchestration — @e-burgos/tucu-ui

\`ThemeProvider\` is not a passive context wrapper: it owns routing, the real scroll
container, the page background and the only header extension slot. Every fact below is
about what happens *inside* \`ThemeProvider\` that a consumer mounting it needs to plan
around — none of it is optional or configurable away.

## Standalone vs. orchestrated (MFE) setup

\`ThemeProvider\` is one component with two mutually exclusive prop shapes, selected by
\`architecturalPatterns\` (\`'standalone'\` default | \`'mfe'\`)
(\`ui/tucu-ui/src/themes/components/theme-provider/index.tsx\`):

\`\`\`tsx
// Standalone (default) — the app owns its own menu and routes directly
<ThemeProvider
  menuItems={menuItems}
  customRoutes={<Routes>...</Routes>} // optional — omit to use StandaloneAppRoutesProvider
  isAuthenticated={isAuthenticated}
  loginUrl="/login"
/>

// MFE (orchestrated) — a shell hands this app a basePath and a route config
<ThemeProvider
  architecturalPatterns="mfe"
  basePath="/back-office/accounts"
  appRoutesConfig={appRoutesConfig}
  isAuthenticated={isAuthenticated}
  loginUrl="/login"
  menuItems={menuItems}
/>
\`\`\`

Both branches (\`StandaloneAppThemeProvider\`, \`MfeAppThemeProvider\` —
\`ui/tucu-ui/src/themes/components/theme-provider/standalone-app-theme-provider.tsx\`,
\`mfe-app-theme-provider.tsx\`) do the same two things before rendering your routes:
wrap everything in a \`<Suspense>\` with \`FallbackPage\`, and **create their own
\`<BrowserRouter>\`**. There is no prop to opt out of it, no condition that detects an
outer Router, and no way to pass your own router instance in from outside.

## Consequence 1 — \`useLocation\`/\`useNavigate\` only work below this Router

Because \`ThemeProvider\` creates the \`BrowserRouter\`, any code that calls
\`useLocation()\`, \`useNavigate()\` or \`useParams()\` from *outside* \`ThemeProvider\` (e.g. in
the component that renders \`<ThemeProvider menuItems={...} />\` itself, or in a shell
that builds \`menuItems\` before mounting the provider) will throw or silently fail — there
is no router context there yet. Anything that needs router hooks must live inside the
tree \`ThemeProvider\` renders as \`children\`/routes, never in a sibling or ancestor of it.

If you need the current pathname *outside* the Router (e.g. to build \`menuItems\` reactive
to the route, since \`menuItems\` is itself a prop passed in from outside), you cannot use
\`useLocation\` there. \`ThemeWrapper\` exposes a \`setCurrentPathname\` callback prop that
fires on every route change specifically to solve this
(\`ui/tucu-ui/src/themes/components/theme-provider/theme-wrapper.tsx\`, the \`useEffect\`
over \`pathname\`); alternatively use your own \`popstate\`-based subscription
(\`useSyncExternalStore\` over \`window.addEventListener('popstate', ...)\`).

## Consequence 2 — the real scroll container, and why \`body.style.overflow\` is a no-op

Inside the Router, \`ThemeProvider\` renders \`ThemeWrapper\`
(\`ui/tucu-ui/src/themes/components/theme-provider/theme-wrapper.tsx\`), whose root
element is:

\`\`\`tsx
<div className={\\\`fixed inset-0 h-dvh overflow-y-auto overflow-x-hidden bg-body \\\${className}\\\`}>
  <RootLayout ...>{children}</RootLayout>
  <SettingsButton />
  <SettingsDrawer />
</div>
\`\`\`

This \`div\` is \`fixed\`, covers the full viewport (\`inset-0 h-dvh\`), and is the element
that actually scrolls (\`overflow-y-auto\`) — **it sits visually and functionally on top of
\`<body>\`, which never scrolls once \`ThemeProvider\` is mounted.**

Three things follow directly from this, all load-bearing for any component that tries to
lock scroll (a modal, a drawer, an image lightbox) or restyle the page:

- **Setting \`document.body.style.overflow = 'hidden'\` does nothing visible.** \`body\` was
  never the scroll container, so hiding its overflow has no effect on what the user can
  scroll. A side effect worth knowing: opening an overlay never triggers the classic
  "scrollbar removal reflow" that shifts page content, because the element whose overflow
  would change isn't the one holding the scrollbar.
- **The real background — what actually paints behind your routed content — is
  \`bg-body\`** on that same \`div\`, i.e. the \`--color-body\` CSS variable (see
  \`tucu://tokens\`), not whatever you set on \`<html>\` or \`<body>\`. Styling \`html\`/\`body\`
  backgrounds from a consumer app has no visible effect once \`ThemeProvider\` is mounted.
- There is no \`data-tucu\` attribute on this \`div\` — it cannot be selected reliably from
  a consumer stylesheet. Its \`className\` prop IS forwarded (raw string concatenation,
  not \`cn()\` merging), so passing \`className\` to \`ThemeProvider\` is the supported way to
  add your own class to the scroll container. See \`tucu://styling-overrides\` for the
  full list of hookless elements.

Note: \`Toast\` is NOT mounted by \`ThemeWrapper\` — each layout branch of \`RootLayout\`
mounts its own (\`ui/tucu-ui/src/components/layouts/root-layout.tsx\`).

## Theme classes land on \`<html>\`, not on the wrapper

\`ThemeWrapper\` toggles \`dark\`/\`light\` — and the macOS design-system classes \`macos\` /
\`macos-tahoe\` when those \`themeStyle\` variants are active — on
\`document.documentElement\` (\`ui/tucu-ui/src/themes/components/theme-provider/theme-wrapper.tsx\`,
\`html.classList.toggle('dark', mode === 'dark')\`). Selectors like \`html.macos.dark {}\`
are the intended CSS hook for mode/style-specific consumer rules.

## \`ThemeWrapper\` props you're actually passing through \`ThemeProvider\`

Both \`ThemeProvider\` variants forward everything except their own routing-specific props
straight to \`ThemeWrapper\`. The ones most relevant to shell integration
(\`ThemeWrapperBaseProps\`, \`theme-wrapper.tsx\`):

| Prop | Effect |
|---|---|
| \`rightButton\` | See the header slot section below |
| \`logo\` | Rendered by \`AdminHeader\`/\`ExpandableSidebar\`; see \`tucu://theme\` for \`collapsedLogo\` |
| \`brandColor\` | Resolves to a primary preset by label on mount |
| \`customPaletteColor\` | See \`tucu://theme\` for the full key table and blast radius |
| \`mode\` | Forces \`'light' \\| 'dark'\` on mount (still overridable later via \`useTheme\`) — there is no \`'system'\` value; resolve the OS preference yourself before passing it |
| \`background\` | \`BackgroundVariant\` for \`ThemeBackground\` (\`'none' \\| 'base' \\| 'wave' \\| ...\`) |
| \`showSettings\` | Controls the built-in theme switcher UI (SettingsButton/SettingsDrawer) |
| \`themeStyle\` / \`layout\` | Discriminated pairs: \`'default'\` (\`clean\`/\`admin\`/\`horizontal\`), \`'macos'\` (\`macos\`/\`macos-clean\`), \`'macos-tahoe'\` (\`macos-tahoe\`/\`macos-tahoe-dock\`/\`macos-tahoe-clean\`) |
| \`fullWidth\` | Passed down to the active layout's content area |
| \`className\` | Appended (raw concatenation) to the scroll container's classes — the only handle on that div |
| \`setCurrentPathname\` | Called with the pathname on every route change — the escape hatch for consequence 1 above |

## The header's only real slot: \`rightButton\`

\`AdminHeader\` accepts exactly one content slot from outside: \`rightButton\`
(\`ui/tucu-ui/src/components/layouts/header/admin-header.tsx\`, props: \`className?\`,
\`logo?\`, \`rightButton?\`, \`isOpen?\`, \`setIsOpen?\`). Everything else in the header (logo,
hamburger, nav) is fixed markup — there is no \`leftButton\`, no \`centerContent\`, no
header \`children\`. (The non-admin \`Header\` used by the horizontal layout additionally
accepts a \`searchButton\` slot — \`ui/tucu-ui/src/components/layouts/header/header.tsx\`.)

\`\`\`tsx
// ui/tucu-ui/src/components/layouts/header/admin-header.tsx
<AdminRightArea
  rightButton={
    <div className="flex flex-row items-center justify-center">
      {rightButton}
      <div className="mx-[8px] block sm:mx-[16px] xl:hidden">
        <Hamburger ... />
      </div>
    </div>
  }
/>
\`\`\`

\`rightButton\` is composed *inside* a wrapper \`div\` alongside the mobile hamburger — it is
not the last element in the header's flex row, and it does not stretch to fill available
space by default (the wrapper is sized to its content, not \`flex-1\`). **The pattern to
make a multi-item header bar (search + notifications + user menu) look native is to
render your own flex container as the single \`rightButton\` value and let it own the
layout:**

\`\`\`tsx
<ThemeProvider
  rightButton={
    <div className="flex flex-1 items-center justify-end gap-3">
      <SearchButton />
      <NotificationsBell />
      <UserMenu />
    </div>
  }
  menuItems={menuItems}
/>
\`\`\`

There is no \`data-tucu\` hook to reach into \`AdminRightArea\`'s own wrapper from outside to
stretch it after the fact — \`flex-1\`/\`justify-end\` on your own root node is the only way
to control how the slot's contents are laid out.

## Cross-app navigation: full-page only through \`^https?://\`

Menu items, headers and links decide between an in-app SPA navigation and a full browser
navigation using one fixed rule — duplicated verbatim in **six** places, with no shared
helper:

\`\`\`ts
const isExternalUrl = (url: string): boolean => /^https?:\\/\\//i.test(url);

const handleNavigation = (url: string) => {
  if (isExternalUrl(url)) {
    window.location.href = url; // full page load
  } else {
    navigate(url); // react-router SPA navigation
  }
};
\`\`\`

The six sites: \`ui/tucu-ui/src/components/layouts/header/admin-header.tsx\`,
\`header/header.tsx\`, \`menus/menu-item.tsx\`, \`menus/collapsible-menu.tsx\`,
\`links/anchor-link.tsx\` (renders a real \`<a rel="noopener noreferrer">\` instead of
\`window.location.href\`), and \`macos/tahoe/layout/dock-tahoe.tsx\` (twice, inline).

Practical consequences for a multi-app shell:

- A menu item's \`href\`/\`path\` must be an **absolute URL with an explicit \`http://\` or
  \`https://\` scheme** to force a full-page load into another app. A path like
  \`/other-app/page\` (no scheme) is always treated as an internal SPA route and handed to
  \`navigate()\` — if \`/other-app\` isn't mounted under this app's own \`BrowserRouter\`, that
  \`navigate()\` call lands on a 404 inside the current app instead of loading the other
  one.
- Protocol-relative URLs (\`//other-host/path\`) do **not** match the regex and are
  therefore treated as internal, not external — they will not trigger a full-page load.
  Always include the scheme explicitly.
- There is no prop or config to change this rule per menu item — it's the same
  \`isExternalUrl\` check everywhere tucu-ui decides between \`navigate()\` and
  \`window.location.href\`.

## Also see

- \`tucu://theme\` — \`useTheme\`, \`customPaletteColor\`, logos and \`collapsedLogo\`.
- \`tucu://styling-overrides\` — the \`data-tucu\` anchor map, including which layout pieces
  (like the \`ThemeWrapper\` scroll \`div\` and \`CleanLayout\`'s root) have none.
- \`tucu://routing\` — \`ReactRouter\` namespace re-export and nested-route patterns.
`;
}
