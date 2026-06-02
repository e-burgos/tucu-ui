// ─── Resource: Changelog ─────────────────────────────────────────────────────

export function getChangelogContent(): string {
  return `# Changelog — @e-burgos/tucu-ui

## v2.5.0 (Current)
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
