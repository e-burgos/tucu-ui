// ─── Resource: Changelog ─────────────────────────────────────────────────────

export function getChangelogContent(): string {
  return `# Changelog — @e-burgos/tucu-ui

## v2.0.8 (Current)
- Fix: InputSearcher multiple selection edge cases
- Fix: Modal backdrop z-index on nested modals
- Perf: Reduced bundle size for icon re-exports

## v2.0.7
- Add: macOS Tahoe layout with rounded corners
- Add: applyMacOSTheme() and applyDefaultTheme() actions on useTheme
- Fix: Dark mode token inconsistencies on macOS presets

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
