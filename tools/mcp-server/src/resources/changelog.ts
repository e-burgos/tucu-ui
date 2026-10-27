// ─── Resource: Changelog ─────────────────────────────────────────────────────

export function getChangelogContent(): string {
  return `# Changelog — @e-burgos/tucu-ui

## v3.6.0 (Current)
- Add: theme presets — \`defineThemePreset\`, \`registerThemePresets\`, \`getThemePreset\`, \`listThemePresets\`, \`resolveThemePreset({ host, tenant, rules, fallback })\`; built-ins \`glass\`, \`classic\`, \`elegant\`, \`fresh\`, \`minimal\`, \`vibrant\`; contract in \`tucu://tokens\` (\`--tucu-accent\`, \`--tucu-radius\`, \`--tucu-card-*\`, \`data-tucu-*\`)
- Add: \`ThemeScope\` applies a preset and its own mode to a subtree; overlays (Modal, Drawer, Select, tooltips) opened inside mount in the scope portal host (\`usePortalContainer\`); \`dark:\` utilities honor one level of opposite-mode nesting
- Add: \`preset\` prop on \`ThemeProvider\` / \`NextThemeProvider\`; \`defaultMode\` also accepts \`'system'\`
- Add: Next anti-flash: \`ThemeModeScript\` (server component, \`nonce\`) from \`@e-burgos/tucu-ui/next\` and \`getThemeModeScript\` set the mode class before hydration
- Add: \`@e-burgos/tucu-ui/styles-core\` and \`/theme-core\` — same styles without the macOS themes (~356 KB vs ~717 KB)
- Add: Modal \`overlayClassName\`, \`headerClassName\`, \`closeButtonProps\` (its \`aria-label\` wins over \`closeLabel\`), \`maxWidth\`, \`maxHeight\`, \`initialFocusRef\`; title is a full-width block \`<div data-tucu="modal-title">\`, ids via \`useId\`, initial focus on the dialog
- Add: Alert \`density\` (\`default | compact\`); BasicTable \`density\` \`compact | snug | default\` and \`--tucu-table-row-hover\`; Select \`hideLabel\`, \`hideHelperText\`, \`appearance\` (\`default | neutral\`), \`--tucu-select-radius\`, Escape closes only the open listbox; Tooltip \`maxWidth\`
- Change: all \`--tucu-*\` component tokens resolve as \`var(--tucu-x, var(--tucu-x-default))\`, so a consumer override on \`:root\` wins in light and dark

## v3.5.0
- Add: \`cn()\` (classnames + tailwind-merge) used by every component, so \`className\` overrides of \`h-*\`, \`bg-*\`, \`text-*\` win; \`extendClassMergeTokens\` registers custom theme tokens
- Add: \`size="xs"\` on Button, Input, Textarea, Select, Badge and Spinner; Button font size scales with \`size\`; Button \`variant="outline"\` (1px)
- Add: Button renders the \`<button>\` directly without tooltip (\`wrapperClassName\` when there is one) and defaults to \`type="button"\`
- Add: Modal \`size\`, \`header\` (ReactNode), \`closeLabel\`, \`aria-label\`/\`aria-describedby\`/\`data-*\` on \`role="dialog"\`; Escape handled on the dialog, overlay click closes, no close delay
- Add: Select \`native\`, \`id\`, option \`group\`, merged \`aria-labelledby\`/\`aria-describedby\`, \`listboxClassName\`; no \`onChange\` on re-select; long values truncate
- Add: Alert \`live="polite"\` (\`role="status"\`) and \`appearance\`; Badge \`tone\` with token tones (soft / ink / line); Tooltip \`size\` and always in the DOM; Collapse controlled (\`open\`/\`onOpenChange\`) with \`compact\`/\`unstyled\` variants
- Add: \`ThemeProvider defaultMode\` (only without persisted state); \`layout\` without \`themeStyle\` selects its theme family, so \`layout="clean"\` no longer keeps a persisted Tahoe wallpaper; SwitchMode \`label\`/\`aria-label\`/\`iconOnly\`
- Add: component tokens \`--tucu-tooltip-*\`, \`--tucu-skeleton-*\`, \`--tucu-table-*\`, \`--tucu-toast-radius\` (see \`tucu://tokens\`); Card \`density\` + \`bodyClassName\` with a flex-1 body; BasicTable \`density\`, \`cellDividers\`, \`rowHeight\` and rest props
- Fix: Input/Checkbox no longer render \`aria-invalid="false"\`; Radio \`id\`/\`htmlFor\`; Radio/Checkbox align with multi-line labels; Alert no longer renders an "undefined" class; translated close / access denied labels
- Fix: library CSS sits in \`@layer components\` so consumer utilities win; macOS themes no longer force the color of every \`<p>\`; DataTable spreads only the leftover width among columns without \`size\`
- Change: no JS module imports a stylesheet (Swiper CSS ships inside \`theme\`/\`styles\`), so vitest no longer needs \`server.deps.inline\`; point \`@source\` at \`node_modules/@e-burgos/tucu-ui/**/*.mjs\`

## v3.4.0
- Add: Next.js 16 App Router support via \`@e-burgos/tucu-ui/next\` (\`NextThemeProvider\`, ESM-only, optional peer \`next >=16\`); static export works
- Add: navigation layer (\`useTucuNavigation\`) decoupled from react-router; \`'use client'\` directive per ESM module
- Fix: SSR-safe hooks; DataTable no longer reads \`document\` during render
- No breaking changes for 3.x Vite apps

## v3.3.0
- Fix: DataTable \`ManualPagination\` and \`ColumnsVisibilityManager\` strings follow \`ThemeProvider lang\` (es / es-AR render Spanish)
- Fix: AR phone accepts the \`0054 9 11 …\` prefix like \`+54\`; \`formatPhone\` adds \`+54\` to complete landlines
- Fix: \`validateEmail\` / \`Input type="email"\` reject > 254 chars and local part > 64; specific translated required message (es: "Ingresá un email.")
- Fix: DataTable row action \`hidden\` (boolean or fn) is honored per action; no actions cell content when all are hidden
- Fix: \`Switch\` has \`role="switch"\` + \`aria-checked\`; ON/OFF labels are translated and omittable (\`null\`)
- Fix: \`Modal\` traps focus and restores it on close
- Fix: \`Button\`, \`Badge\` and \`Tooltip\` success/info/warning/danger/gray backgrounds meet WCAG AA with white text
- Fix: DataTable header actions are reachable by keyboard (header focus reveals them)
- Add: macOS layouts accept \`pageTitle\`; the toolbar title matches nested routes and no longer falls back to a hardcoded "Overview"

## v3.2.0
- Add: Input masks — \`mask="phone"\` (Argentina by default, \`phoneCountry\`, \`registerPhoneCountry\`), \`cuit\`, \`currency\`, \`number\` or a custom \`createMask\`; \`unmask\` emits the raw value (E.164, digits, number string)
- Add: Built-in localized validators (es/en/fr): \`validateEmail | validatePhone | validateUrl | validateCuit | validateRequired | validateNumber\`, \`getValidationRules\`; \`<Input type="email|tel|url">\` validates on blur and \`FormField\` adds the inferred rules automatically (\`autoValidate\`)
- Add: \`ThemeProvider lang\` drives built-in strings (validation, aria labels, DataTable pagination/empty states, date picker)
- Add: \`useTabParam\` hook; \`ParamTab\` derives the tab from the URL (\`paramName\`, \`defaultIndex\`, \`replace\`, \`onChange\`)
- Add: \`showToast(message, options)\`; \`addToast\` ids are optional
- Fix: Toasts are opaque and AA-legible in every theme (\`--tucu-toast-*\` variables); one timer per toast, pause on hover; Tahoe dock layout now renders toasts
- Fix: Visible keyboard focus on checkbox/radio/switch/file dropzone; Input error/focus contrast; DataTable pagination buttons no longer submit forms
- Fix: Password toggle / date picker no longer double-toggle on touch devices; date picker honors \`min\`/\`max\`

## v2.8.1
- Fix: Input's date picker no longer warns "changing an uncontrolled input to be controlled" when used without an explicit value/onChange (e.g. plain \`register()\`) and a date is picked from the calendar

## v2.8.0
- Add: Tokens-only \`./theme\` export for Tailwind v4 consumers — apps with their own Tailwind build import just tucu-ui's design tokens + prefixed utilities, without duplicating Tailwind's base layer
- Fix: Stopped scanning third-party node_modules for Tailwind classes
- Changed: CSS architecture migrated to Tailwind v4 native layers (\`@layer base\`/\`@layer components\`); custom utilities re-registered via \`@utility\` with a \`tucu-\` prefix (legacy unprefixed names kept as aliases in the \`./styles\` path only)

## v2.7.3
- Changed: Replaced react-use with native React implementations for \`useBreakpoint\`, \`useMeasure\`, \`useClickAway\`, \`useCopyToClipboard\` — the react-use dependency was removed entirely
- Fixed: Resolved typecheck errors in CodeBlock's lazy prismjs loading

## v2.7.2
- Fix: Lazy-load prismjs language modules in CodeBlock — fixes a dev-mode crash (\`ReferenceError: Prism is not defined\`) that broke dev servers for any consumer

## v2.7.1
- Fix: Worked around an esbuild CJS-interop bug breaking react-use hooks (superseded by the native rewrite in 2.7.3)

## v2.7.0
- Add: DataTable demo page and generation-tool support
- Fixed: Per-module output for proper tree-shaking; rolled up type definitions into a single \`index.d.ts\`; replaced lodash with lodash-es for ESM tree-shaking; dropped \`@e-burgos/tucu-ui-mcp\` from runtime dependencies

## v2.6.0
- Add: \`DataTable\` component — full-featured data table built on TanStack Table v8 (sorting, pinning, resizing, drag-and-drop reorder, row selection, expandable rows, column visibility, global search/filter)

## v2.5.0
- Fix: macOS theme active/inactive menu color inconsistencies on sidebar, navbar, and TOC items
- Fix: Preserved theme settings configuration per colorScheme using Zustand themeConfigInterceptor middleware
- Add: DataTable component new features including Columns Visibility Toggle (enableHideColumns), Global Search/Filter (searchableColumns), rightActions slot for custom header actions, and restructured header container layout
- Refine: Harmonized DataTable component colors using global CSS design tokens for automated light/dark mode styling


## v2.4.0
- Add: Modular settings system (SettingsDrawer split into dedicated sub-components like BackgroundPicker, ColorDot, etc.)
- Perf: Refactored SettingsDrawer to compose the new modular sub-components
- Refine: macOS Sonoma and Tahoe layout, foundations, and dock styles

## v2.3.0
- Add: \`@e-burgos/tucu-ui-mcp\` dependency to the library for agentic tooling

## v2.1.0 - v2.2.0
- Add: macOS Tahoe components suite, showcase pages, and demo sections
- Add: HTTP transport, Docker, and CI/CD pipelines
- Add: Component theme registry and generation tools

## v2.0.11
- Add: \`ThemeBackground\` component with 10 background variants (replacing \`MacOSBackground\`)
- Add: Settings Drawer Visual Color Editor (\`ColorSwatchModal\` and \`ColorDot\`)
- Add: Status, foreground, and border presets in the theme store

## v2.0.8
- Fix: InputSearcher multiple selection edge cases
- Fix: Modal backdrop z-index on nested modals
- Perf: Reduced bundle size for icon re-exports

## v2.0.6
- Add: InfoCard component with multi-column support
- Add: KeyValueRow component for detail views
- Fix: Stepper component step navigation callbacks

## v2.0.5
- Add: CarouselCards and CarouselImage components
- Add: Skeleton animation variants (shimmer, wave)
- Fix: Form validation on dynamic field arrays

## v2.0.4
- Add: PanelActionCard component
- Add: TabModal with footer actions
- Fix: Select component keyboard navigation

## v2.0.3
- Add: Typography component with 30+ semantic tags
- Add: CodeBlock with Prism syntax highlighting
- Fix: Button tooltip positioning

## v2.0.2
- Add: macOS Classic layout
- Add: LucideIcons namespace (1500+ icons)
- Fix: Drawer backdrop click handling

## v2.0.1
- Fix: ThemeProvider SSR hydration mismatch
- Fix: Switch component controlled/uncontrolled warning
- Perf: Tree-shaking improvements

## v2.0.0 (Major)
- BREAKING: Variant system overhaul (see migration guide)
- BREAKING: Single entry point import
- BREAKING: Router re-export via ReactRouter namespace
- Add: 5 layout options (admin, horizontal, clean, macos, macos-tahoe)
- Add: 34 color presets (11 light + 11 dark + 12 macOS)
- Add: Form component wrapping react-hook-form
- Add: useTheme Zustand store with persist
- Add: RTL support
- Add: i18n (en, es, fr)
`;
}
