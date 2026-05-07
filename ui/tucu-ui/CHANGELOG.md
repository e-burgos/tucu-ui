# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.8] - 2026-05-07

### Changed

- **Tailwind CSS v4 Compatibility**: Fixed `@theme` namespace collision that broke default Tailwind utilities when importing library styles
  - **Breakpoints**: Removed all 11 custom `--breakpoint-*` definitions from `@theme` to preserve Tailwind defaults
    - Replaced `xs:` with `min-[500px]:` and `3xl:` with `min-[1780px]:` across 26 component/theme/demo files
  - **Spacing**: Replaced 21 explicit `--spacing-0` through `--spacing-20` values with single `--spacing: 0.25rem` dynamic multiplier
  - **Border Radius**: Removed 11 custom `--radius-*` definitions from `@theme`; replaced with arbitrary values (`rounded-[4px]`, etc.)
  - Library styles are now import-order-independent — `@import 'tailwindcss'` and `@import '@e-burgos/tucu-ui/styles'` work in any order
- **Gray Color Palette**: Aligned tucu-ui gray spectrum with Tailwind v4 default gray palette
  - Updated 13 light mode primitives (`--color-tucu-ui-gray-0` through `--color-tucu-ui-gray-100`) to match Tailwind v4 oklch-derived hex values
  - Updated 13 dark mode primitives (`--color-tucu-ui-dark-gray-0` through `--color-tucu-ui-dark-gray-100`) as symmetric reverse
  - Updated hardcoded hex values in `themes/config/index.ts` (PRESET_COLORS enum)
  - Updated hardcoded hex values in `use-chart-theme.ts` (chart grid, text, background, border, tooltip colors)
  - Updated 4 demo documentation files with new color references
  - Key changes: `gray-800` from `#32353d` → `#1e2939`, `gray-600` from `#5b616e` → `#4a5565`, `gray-50` from `#717886` → `#6a7282`
- **TableOfContents Component**: Improved close button sizing and interaction
  - Changed from `size="tiny"` to `size="mini"` with proportional icon (`w-3.5 h-3.5`)
  - Added hover state (`hover:bg-gray-100 dark:hover:bg-gray-800`) for visual feedback
  - Applied to both mobile drawer and desktop sidebar instances

### Fixed

- **Tailwind CSS v4 Import Order**: Fixed issue where `@import '@e-burgos/tucu-ui/styles'` before `@import 'tailwindcss'` would override all default breakpoints, spacing, and border-radius values
  - Root cause: In Tailwind CSS v4, defining ANY value in a `@theme` namespace replaces ALL defaults for that namespace
  - Solution: Removed conflicting definitions and use arbitrary values for custom breakpoints/radius

## [2.0.4] - 2026-05-06

### Added

- **Charts System**: Complete chart module built on Recharts 3.8.1 with 6 chart components
  - `BarChart`: Vertical/horizontal bar charts with stacked mode, configurable bar radius and gap
  - `LineChart`: Line charts with curved/straight lines, dot markers, configurable stroke width
  - `AreaChart`: Area charts with gradient fill, stacked mode, curved/flat options
  - `PieChart`: Pie/donut charts with labels, inner content support, and customizable colors
  - `RadarChart`: Radar/spider charts for multi-variable comparisons with configurable fill opacity
  - `ComposedChart`: Mixed chart combining bar, line, and area series in a single visualization
  - Shared infrastructure: `ChartContainer`, `ChartTooltip`, `ChartEmptyState`, `useChartTheme` hook
  - Full dark mode support with automatic theme-aware color palettes
  - TypeScript interfaces: `ChartSeries`, `ComposedChartSeries`, `ChartDataItem`
- **Card Component**: New flexible card component with title, description, icon, header, footer, and actions slots
- **InfoCard Component**: Multi-column info card with grouped key-value data, accent colors, and tooltip support
- **KeyValueRow Component**: Compact label-value display with mono and accent styling options
- **Pagination Component**: Page navigation with configurable window size and chevron controls
- **Stepper Component**: Step progress indicator with icons, labels, and step change callbacks
- **TabModal Component**: Tabbed modal dialog with sidebar navigation, mobile-responsive dropdown, and portal rendering
- **Charts Documentation Page**: Full interactive demo with 6 chart sections including PropPlayground and AutoPropsTable
- **New Demo Sections**: CardSection, InfoCardSection, KeyValueRowSection, PaginationSection, StepperSection, TabModalSection

### Changed

- **Tab Component**: Complete rewrite without `@headlessui/react`
  - Removed dependency on HeadlessUI `TabGroup`, `TabList`, `TabPanel`, `TabPanels`
  - Implemented custom tab system using React context, `useId`, and keyboard navigation
  - Added ARIA roles (`tablist`, `tab`, `tabpanel`) with proper `aria-selected` and `aria-controls`
  - Full keyboard navigation (Arrow Left/Right, Home, End)
  - Maintained Framer Motion `LayoutGroup` animations
  - Portal rendering for mobile dropdown
- **TabSelect Component**: Complete rewrite without `@headlessui/react`
  - Removed HeadlessUI dependency
  - Implemented portal-based dropdown with dynamic positioning
  - Added keyboard navigation (Arrow Up/Down, Enter, Escape)
  - Added close animation state management
  - Improved highlight tracking and ARIA attributes
- **ToggleBar Component**: Rewritten without `@headlessui/react` Switch
  - Replaced HeadlessUI `Switch` with native `<button role="switch">` element
  - Added `aria-checked` attribute and proper focus-visible ring
  - Maintained same visual appearance and transitions
- **InputSearcher Component**: Complete rewrite without `@headlessui/react`
  - Removed HeadlessUI `Transition` component
  - Implemented portal-based dropdown with `createPortal`
  - Added full keyboard navigation and proper TypeScript interface
  - Enhanced filtering with `useMemo` and memoized callbacks
- **CoinListBox Component**: Complete rewrite without `@headlessui/react`
  - Removed HeadlessUI `Listbox` and `Transition` components
  - Implemented custom listbox with `createPortal` for dropdown
  - Added keyboard navigation and ARIA compliance
- **CollectionSelectList Component**: Refactored with new search/filter UI
  - Replaced custom search icon with Lucide `Search` and `X` icons
  - Integrated `Scrollbar` component for list scrolling
- **Select Component**: Enhanced with search and clear icons from `lucide-react`
- **Scrollbar Component**: Improved overflow handling
  - Added `max-h-[inherit]` for proper nested height inheritance
  - Simplified overflow management with inline style
  - Improved timeout cleanup with null checks
- **ScrollToTop Component**: Enhanced with new props
  - New `behavior` prop (`'smooth' | 'instant'`) for scroll animation control
  - Improved position prop documentation (CSS values instead of Tailwind classes)
  - Better internal memoization with `useCallback` and `useRef`
- **Image Component**: Improved loading and error handling
  - Added cached image detection using `requestAnimationFrame` + `naturalWidth` check
  - Added fallback loop prevention (won't retry if fallback also fails)
  - Better dimension normalization for numeric strings
- **BasicTable Component**: Minor styling improvements
- **HorizontalNavMenu**: Layout adjustments
- **SettingsDrawer**: Styling improvements (~116 lines changed)
- **globals.css**: Expanded color token system with new color scale mappings
- **Props Metadata**: Regenerated to include all new components (charts, cards, common utilities)
- **Recharts**: Upgraded from `3.0.0` to `3.8.1`
- **React Types**: Upgraded `@types/react` to `^19.2.14` and `@types/react-dom` to `^19.2.3`

### Removed

- **`@headlessui/react` Dependency**: Completely removed from the library
  - All components previously depending on HeadlessUI have been rewritten with native React
  - Affected components: Tab, TabSelect, ToggleBar, InputSearcher, CoinListBox
  - Reduces bundle size and eliminates external UI dependency
  - All functionality maintained with custom implementations

### Fixed

- **Charts TooltipContentProps**: Fixed TypeScript error with Recharts 3.x by wrapping with `Partial<>`
- **Charts Focus Ring**: Removed unwanted focus outlines on chart interactions
  - Disabled `accessibilityLayer` on chart containers
  - Applied `tabIndex={-1}` and `outline: none` styles
  - Added CSS `ring-0` and `[&_*]:outline-none` to `ChartContainer`
- **Scrollbar Native**: Removed unused scrollbar-native component (8 lines)
- **Image Component**: Fixed infinite fallback loop when both src and fallback fail
- **PropPlayground**: Minor adjustments for chart component integration

### Documentation

- **Charts Components Page**: New full documentation page with 6 chart sections
  - Each section includes multiple demo cards with different configurations
  - CodeBlock usage examples for each chart type
  - PropPlayground for interactive prop manipulation
  - AutoPropsTable for auto-generated API reference
- **New UI Component Sections**: Card, InfoCard, KeyValueRow, Pagination, Stepper, TabModal
- **Updated Props Registry**: All new components registered with complete prop metadata

## [2.0.3] - 2026-02-25

### Added

- **Tooltip Component**: New reusable `Tooltip` component exported from `common/index.ts`
  - Supports `TooltipPlacement` and `TooltipColor` types
  - Natively integrated in `Button` and `Typography` components
- **Button Tooltip Integration**: Enhanced `Button` component with built-in tooltip support
  - `tooltip` prop now accepts `React.ReactNode` (previously `string`)
  - New props: `tooltipPlacement`, `tooltipColor`, `tooltipArrow`
  - Replaced manual hover state tooltip with `Tooltip` component
- **Typography Tooltip Integration**: Added native tooltip support to `Typography` component
  - New props: `tooltip`, `tooltipPlacement`, `tooltipColor`, `tooltipArrow`
  - Wraps element in `Tooltip` component when tooltip prop is provided
- **Nested Routes Support**: New `enableNestedRoutes` prop in `StandaloneAppRoutesMenuItem`
  - When `true`, appends `/*` to the route path for internal sub-route support
- **TableOfContents Navigation Mode**: New props in `TableOfContents` component
  - `navigationMode` prop (`'anchor' | 'route'`) for route-based navigation
  - `activeSectionId` prop for active category auto-expansion
- **Vitest**: Migrated testing framework from Jest to Vitest (`@nx/vitest`)
- **Props Generation Script**: New `generate-props` script using `react-docgen-typescript`

### Changed

- **useTheme Hook**: Major refactoring of the Zustand store
  - Introduced `defaultPresets` and `defaultState` as single source of truth
  - Created generic `Setters<T>` type for auto-generated setter types
  - New `IThemeState` interface (values only) separated from `ITheme` (state + setters + actions)
  - `createSetters()` function dynamically generates ~19 setters (eliminates ~60 lines of boilerplate)
  - `restoreDefaultColors` uses `defaultPresets` instead of duplicating values
  - `partialize` now filters functions generically instead of listing each key manually
- **ThemeWrapper Component**: Major refactoring (~255→70 lines of logic)
  - Introduced `PALETTE_MAP` and `resolveColor()` helper to eliminate 12 repetitive if/else blocks
  - Theme initialization with a single `useTheme.setState()` instead of multiple callbacks
  - Custom palette colors applied in a single `setState` batch instead of 12 individual setter calls
  - Dark/light mode toggle with `classList.toggle()` instead of `remove()`+`add()`
  - Menu items memoized with `useMemo`
- **SettingsDrawer Component**: Major refactoring
  - New `COLOR_CONFIG` record as single source of truth for 12 color types
  - `ColorSwitcher` simplified: uses dynamic Zustand selectors instead of destructuring entire store
  - ColorSwitchers rendered with `.map()` instead of 12 hardcoded instances
  - Migrated arbitrary CSS values (`[70px]`, `[12px]`, `[32px]`) to standard Tailwind classes
- **Select Component**: Refactored controlled state synchronization
  - Immediate state initialization from `value` prop (avoids React "uncontrolled to controlled" warning)
  - Removed `setTimeout(100ms)` hack for state sync
  - Extracted `resolveOption()` helper
- **RadioGroup Component**: Removed `setTimeout(100ms)` in controlled `value` synchronization
  - `setSelectedValue` is now called directly in `useEffect`
- **FormField Component**: Added `field.value` normalization
  - Checkboxes/radios normalized to `!!field.value`
  - Other fields normalized to `field.value ?? ''`
  - Select `value` normalized with `?? ''`
- **Nx & Toolchain**: Upgraded from Nx 21.6.3 → 22.5.2
  - Updated `@swc/core`, `@swc/cli`, `@swc/helpers`, `@swc-node/register`
  - Added `"type": "module"` to root `package.json`
- **tsconfig.lib.json**: Include pattern changed from specific path to generic glob `src/**/*.tsx?raw`

### Removed

- **Storybook**: Completely removed Storybook and all related files
  - Removed `.storybook/` configuration directory
  - Removed all 76 story files (~15,297 lines)
  - Removed `StoryContainer`, internal pages (Introduction, Accessibility), and `useDummy` hook
  - Demo app now serves as the interactive documentation
- **Storybook Dependencies**: Removed `storybook`, `@storybook/addon-docs`, `@storybook/builder-vite`, `@storybook/react-vite`, `@chromatic-com/storybook`, `@chromatic-com/turbosnap-helper`, `eslint-plugin-storybook`, `remark-gfm`
- **Jest Dependencies**: Removed `jest`, `jest-environment-jsdom`, `jest-util`, `ts-jest`, `babel-jest`, `@types/jest`, `@nx/jest`
- **Storybook Scripts**: Removed `storybook`, `build-storybook`, `publish-storybook`, `serve-storybook`, `chromatic`, `storybook-doctor` scripts

### Fixed

- **Select Component**: Fixed initial render without visible selection when used with `react-hook-form`
  - State now initializes immediately from `value` prop instead of delayed `setTimeout`
- **RadioGroup Component**: Fixed state sync race conditions by removing `setTimeout` hack
- **FormField Component**: Fixed React "uncontrolled to controlled" warnings
  - Normalized `undefined` values to `''` or `false` depending on input type
- **FileInput Component**: Added `displayName = 'FileInput'` for better React DevTools debugging
- **CoinListBox Component**: Added `displayName = 'CoinListBox'` for better React DevTools debugging

### Documentation

- **Demo App Refactoring**: Major refactoring of 76+ documentation section files
  - Cleaner, more consistent patterns across all component documentation
  - New exports in `demo/components/index.ts` and `demo/index.ts`
  - Updated all UI component, input, blockchain, design system, features, and form system sections

## [2.0.2] - 2026-01-22

### Changed

- **Horizontal Navigation Menu**: Improved responsive text sizing
  - Menu item text now dynamically adjusts based on screen size
  - Text sizes: `11px` (mobile) → `12px` (sm) → `13px` (md) → `14px` (lg+)
  - Better space utilization on smaller screens while maintaining readability
  - Applied to both dropdown and non-dropdown menu items

## [2.0.1] - 2026-01-17

### Changed

- **Drawer Component**: Complete rewrite without `@headlessui/react` dependency
  - Removed dependency on `@headlessui/react` Dialog, DialogPanel, Transition, and TransitionChild components
  - Implemented custom drawer container using React hooks (`useState`, `useEffect`)
  - Added portal rendering using `createPortal` to render directly in `document.body`
  - Improved z-index layering: backdrop (z-50) and drawer (z-51) for proper stacking
  - Enhanced mobile event handling and touch interactions
  - Maintained all existing functionality: backdrop click, escape key, body scroll lock, animations
  - Better control over event propagation and mobile compatibility
- **Modal Component**: Complete rewrite without `@headlessui/react` dependency
  - Removed dependency on `@headlessui/react` Dialog, DialogPanel, DialogTitle, and TransitionChild components
  - Implemented custom modal using React hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
  - Added portal rendering using `createPortal` to render directly in `document.body`
  - Improved z-index layering: backdrop (z-50) and modal content (z-51) for proper stacking
  - Enhanced focus management: stores previous focus and restores on close
  - Maintained all existing functionality: backdrop click, escape key, body scroll lock, animations, ARIA attributes
  - Better control over event propagation and accessibility features
- **Backdrop Styling**: Updated backdrop appearance for both Drawer and Modal
  - Changed from `bg-gray-700/90 backdrop-blur-sm` to `bg-gray-700/10 backdrop-blur-xs` for lighter, more subtle backdrop
  - Improved visual consistency across dialog components

### Fixed

- **Drawer Component**: Fixed backdrop covering drawer content
  - Resolved z-index stacking issues by using portals and explicit z-index values
  - Backdrop now correctly covers only the background, not the drawer itself
  - Improved mobile touch event handling
- **Modal Component**: Fixed potential event blocking issues
  - Improved event handling with better pointer-events management
  - Enhanced mobile compatibility

## [2.0.0] - 2026-01-15

### Added

- **Advanced Routing System**: Complete routing architecture with two patterns
  - **Standalone App Pattern** (default): Automatic route generation from `menuItems`
    - Simple configuration with menu-driven navigation
    - Perfect for single-page applications
    - Optional `customRoutes` for advanced routing needs
    - Type-safe with `StandaloneAppRoutesMenuItem[]` interface
  - **Micro Frontends (MFE) Pattern**: Explicit route configuration
    - Route protection with `isPublic` and `isAuthenticated` props
    - Base path support for micro-frontend integration
    - Type-safe with `IAppRouteConfig[]` interface
    - `ShellWrapper` component for MFE integration
  - TypeScript discriminated unions ensure correct prop usage for each pattern
  - Comprehensive documentation with examples for both patterns
- **Enhanced Theming System**: Major improvements to color architecture
  - Expanded from 26+ to **34+ color presets**
  - **12-layer color architecture**: primary, dark primary, secondary, dark secondary, accent, dark accent, muted, dark muted, and background variations
  - New modern color presets: Mint, Lavender, Violet, Chocolate, Tan, Beige
  - Enhanced color system with CSS variables for all layers
  - Improved theme persistence and restoration
- **Standalone Application Examples**: Complete standalone app example
  - Full integration guide documentation
  - Architecture documentation
  - Development guide
  - Example application with all features
- **Micro Frontends Examples**: Complete MFE example
  - Full integration guide documentation
  - Architecture documentation
  - Development guide
  - Example applications (authentication, dashboard, landing)
- **Documentation Pattern System**: Comprehensive documentation standards
  - New `.cursor/rules/documentation-pattern-rules.mdc` for AI-assisted linting
  - Updated `documentation-pattern-guide.md` with design rules
  - Standardized iconography with colored gradients
  - Container background guidelines (`bg-light-dark`, semantic classes)
  - Text highlighting with borders instead of backgrounds
  - `BasicTable` component requirement for all tables
  - Alert component text color guidelines
- **Documentation Improvements**: Major updates across all documentation pages
  - Updated routing system documentation with Standalone and MFE sections
  - Refactored `RoutingSystem.tsx` with three distinct sections:
    - Micro Frontends (MFE) Support
    - Standalone App
    - Architectural Patterns: Standalone vs MFE
  - Updated all component documentation pages to follow new design patterns
  - Updated form system documentation pages
  - Updated features documentation pages
  - Updated tailwind utilities documentation pages
  - Consistent use of `BasicTable` component throughout
  - Standardized iconography and container backgrounds
- **BasicTable Component**: Enhanced table component for documentation
  - Reusable component for displaying tabular data
  - Consistent styling and responsiveness
  - Dark mode support
  - Used throughout documentation for props tables and API references
- **Icon System Enhancements**: Complete icon system documentation
  - 5000+ Lucide React icons fully integrated
  - 97+ custom-designed icons
  - Comprehensive icon system documentation
  - Icon sizing guide
  - Custom icons guide
  - Usage examples and best practices
- **Accessibility Improvements**: Enhanced accessibility documentation
  - WCAG 2.1 AA compliance documentation
  - Component accessibility status tracking
  - Keyboard navigation guides
  - Testing guidelines
  - Implementation examples
- **Hooks Utilities Documentation**: Comprehensive hooks documentation
  - Complete hook categories documentation
  - Live demonstrations
  - Best practices guide
  - Hook features overview

### Changed

- **ThemeProvider Component**: Major architectural improvements
  - Split into two providers: `StandaloneAppThemeProvider` and `MfeAppThemeProvider`
  - TypeScript discriminated unions for type safety
  - Conditional prop requirements based on `architecturalPatterns`
  - Enhanced prop validation and IntelliSense support
  - Removed deprecated `architecturalPatterns="single"` (now `"standalone"`)
- **Color System**: Expanded and improved
  - Increased from 26+ to 34+ color presets
  - Implemented 12-layer color architecture
  - Enhanced CSS variable system
  - Improved color mixing and theming
- **Documentation Structure**: Comprehensive refactoring
  - All documentation pages updated to follow new design patterns
  - Consistent use of semantic background classes (`bg-light-dark`, `bg-light dark:bg-dark`)
  - Standardized iconography with colored gradients (`bg-linear-to-br` with `shadow-lg`)
  - Unified text highlighting approach (borders instead of backgrounds for inline code)
  - Replaced HTML tables with `BasicTable` component
  - Updated 100+ documentation files across components, features, form-system, and tailwind sections
  - Consistent spacing, typography, and component usage patterns
- **README Files**: Major updates
  - Updated main README.md with v2.0.0 features
  - Updated README-es.md (Spanish) with v2.0.0 features
  - Added comprehensive examples for both architectural patterns
  - Updated props reference tables
  - Enhanced quick start guides

### Fixed

- **Type Safety**: Improved TypeScript type checking
  - Discriminated unions prevent mixing Standalone and MFE props
  - Compile-time errors for incorrect pattern usage
  - Enhanced IntelliSense support
- **Documentation Consistency**: Standardized across all pages
  - Fixed inconsistent background classes
  - Fixed iconography styling
  - Fixed text highlighting approaches
  - Replaced all HTML tables with `BasicTable`

### Documentation

- **New Documentation Pages**:
  - Standalone application integration guide
  - Standalone application architecture documentation
  - Standalone application development guide
  - Micro Frontends integration guide (updated)
  - Routing system comprehensive documentation
- **Updated Documentation Pages**:
  - Introduction page with v2.0.0 features
  - Routing system with three distinct sections
  - All component documentation pages
  - All form system documentation pages
  - All features documentation pages
  - All tailwind utilities documentation pages
- **Documentation Standards**:
  - Created `.cursor/rules/documentation-pattern-rules.mdc`
  - Updated `documentation-pattern-guide.md`
  - Established design pattern guidelines
  - Standardized component usage patterns

### Migration from 1.x to 2.0.0

- **No Breaking Changes for Standalone Apps**: If you're using `ThemeProvider` with `menuItems`, no changes are required - Standalone is now the default pattern
- **MFE Migration**: If migrating to MFE pattern, set `architecturalPatterns="mfe"` and provide required props (`basePath`, `appRoutesConfig`)
- **Deprecated**: `architecturalPatterns="single"` has been removed - use `"standalone"` or omit it (default)
- **TypeScript**: Enhanced type safety will catch incorrect prop usage at compile time
- **Color Presets**: Expanded from 26+ to 34+ presets - all existing presets remain compatible
- **Documentation**: All documentation has been updated - refer to new examples for best practices

## [1.2.0] - 2025-11-11

### Added

- **Carousel Components**: Complete carousel system with multiple variants
  - `CarouselComponent`: Main carousel component with Swiper integration
  - `CarouselCards`: Carousel variant for displaying cards
  - `CarouselImage`: Carousel variant for displaying images
  - Comprehensive README documentation (279 lines)
  - Full Storybook stories for all carousel variants
- **Input Component**: Major enhancements and new features
  - Improved date picker functionality
  - Enhanced password visibility toggle
  - Better validation and error handling
  - Expanded Storybook stories with more examples
- **InputSearcher Component**: Significant refactoring and improvements
  - Enhanced filtering and search capabilities
  - Improved state management
  - Better user experience with error handling
  - New comprehensive Storybook stories (232 lines)
- **CodeBlock Component**: Improved syntax highlighting and display
  - Better Prism.js integration
  - Enhanced code formatting

### Changed

- **Input Component**: Major refactoring (344 lines changed)
  - Improved internal structure and organization
  - Enhanced prop handling and validation
  - Better TypeScript typing
- **InputSearcher Component**: Complete refactoring (331 lines changed)
  - Improved internal state management
  - Better filtering algorithm
  - Enhanced dropdown behavior
- **Radio Component**: Enhanced implementation (108 lines changed)
  - Improved styling and behavior
  - Better accessibility support
- **Checkbox Component**: Minor improvements (15 lines changed)
- **PinCode Component**: Enhanced functionality (18 lines changed)
- **RadioGroup Component**: Minor updates (4 lines changed)
- **Tab Components**: Improved animations and transitions
  - `Tab`: Enhanced panel transitions (13 lines changed)
  - `TabSelect`: Minor improvements (2 lines changed)
- **Vite Configuration**: Updated build configuration
  - Enhanced plugin setup
  - Improved build optimization

### Fixed

- **Input Components**: Fixed various edge cases and bugs
- **Auth Components**: Fixed `ResetPinForm` component issues (4 lines changed)
- **Layout Components**: Fixed responsive layout issues in classic and minimal layouts

### Documentation

- **Storybook**: Major documentation updates
  - Expanded `01-introduction.mdx` with comprehensive library overview (650+ lines)
  - Removed fragmented MDX documentation files (consolidated into introduction)
  - Updated all input component stories with better examples
  - Added new Storybook stories for carousel components

## [1.1.1] - 2025-11-10

### Changed

- **Package**: Published beta version to npm
  - Updated package.json version
  - Prepared for beta release

## [1.1.0] - 2024-12-19

### Added

- **Radio Component**: Enhanced hover experience when radio is checked
  - Added darker color on hover (`checked:hover:enabled:bg-*/90` or `checked:hover:enabled:bg-*-600`)
  - Added subtle scale effect (`checked:hover:enabled:scale-105`)
  - Improved transitions with `transition-all duration-200`
- **Checkbox Component**: Enhanced hover experience when checkbox is checked
  - Added darker color on hover for checked state
  - Added subtle scale effect on hover
  - Improved transitions for smoother animations
- **PinCode Component**: Hide native number input spinners
  - Added styles to hide webkit and moz spinners when `type="number"`
  - Improved visual consistency for numeric pin codes

### Changed

- **Radio Component**: Removed "DEFAULT" values
  - Changed default `size` from `'DEFAULT'` to `'md'`
  - Changed default `color` from `'DEFAULT'` to `'primary'`
  - Updated internal class mappings to use explicit values
- **RadioGroup Component**: Removed "DEFAULT" values
  - Changed default `size` from `'DEFAULT'` to `'md'`
  - Changed default `color` from `'DEFAULT'` to `'primary'`
  - Updated Storybook stories to reflect new defaults
- **PinCode Component**: Removed "DEFAULT" values
  - Changed default `size` from `'DEFAULT'` to `'md'`
  - Changed default `rounded` from `'DEFAULT'` to `'md'`
  - Changed default `color` from `'DEFAULT'` to `'primary'`
  - Updated internal class mappings (`inputClasses.size`, `inputClasses.rounded`, `inputClasses.variant.*.color`)
  - Updated Storybook stories to reflect new defaults

### Fixed

- **Radio Component**: Fixed variant and color props not displaying correctly
  - Added `appearance-none` to remove native browser styles
  - Implemented custom checked indicator using `peer-checked` utility
  - Fixed color classes to properly apply `checked:border-*` and `checked:bg-*` styles
- **PinCode Component**: Fixed native number input spinners appearing in numeric pin codes
  - Added cross-browser support for hiding spinners (Chrome, Safari, Edge, Firefox)

### Documentation

- Updated Storybook stories for Radio, RadioGroup, and PinCode components
  - Removed "DEFAULT" from argTypes options
  - Updated default args to use explicit values (`'md'`, `'primary'`)
  - Ensured consistency across all form component stories

## [Unreleased]

### Changed

- Future improvements and enhancements

## [1.0.0] - Initial Release

### Added

- **Input Component**:
  - Password visibility toggle with eye icon
  - Custom date picker with year selection
  - Support for multiple date formats (DD-MM-YYYY, MM-DD-YYYY, YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD)
  - Default date format: DD-MM-YYYY
- **InputSearcher Component**:
  - Internal state management (removed external `value` and `onChange` props)
  - Option filtering after 3 characters typed
  - Error message display when no matches found (after 3+ characters)
  - Text highlighting for matching characters in dropdown options
  - Multiple selection support with `multiple` prop
  - Selected options displayed as chips below the input
  - Custom error message support via `noMatchesMessage` prop
- **Tab Component**:
  - Animated tab panel transitions using Framer Motion
  - Smooth fade and slide animations

### Changed

- **Input Component**:
  - Improved `onChange` prop handling to prevent read-only warnings
  - Enhanced date picker UI with custom calendar dropdown
- **InputSearcher Component**:
  - Refactored to be internally controlled
  - Improved state management to prevent infinite loops
  - Enhanced user experience with better error handling

### Fixed

- **Input Component**: Fixed `onChange` prop not being passed to native input element
- **InputSearcher Component**:
  - Fixed infinite loop issues with `useEffect` dependencies
  - Fixed input not being writable
  - Fixed state synchronization with `initialValue` prop

---

## Version History

- **2.0.4** - Charts system (6 components), new UI components (Card, InfoCard, KeyValueRow, Pagination, Stepper, TabModal), complete removal of @headlessui/react, recharts 3.8.1
- **2.0.3** - Removed Storybook, new Tooltip component, major theme/component refactoring, migrated from Jest to Vitest, upgraded Nx to 22.5.2
- **2.0.2** - Responsive navigation menu improvements with dynamic text sizing
- **2.0.0** - Major release with advanced routing system (Standalone & MFE), enhanced theming (34+ presets, 12-layer architecture), comprehensive documentation improvements, and architectural pattern support
- **1.2.0** - Major input components update, new carousel system, and comprehensive improvements
- **1.1.1** - Beta version publication
- **1.1.0** - Enhanced form components with improved hover states, removed DEFAULT values, and bug fixes
- **1.0.0** - Initial release with core form components and UI elements

## Migration Notes

### Version 2.0.4 Migration

If you're upgrading from version 2.0.3 to 2.0.4:

- **`@headlessui/react` Removed**: This dependency is no longer required. You can remove it from your project if not used elsewhere
- **Tab/TabSelect**: API remains the same — no breaking changes in props or behavior
- **ToggleBar**: Same props (`checked`, `onChange`) — internal implementation changed but external API is identical
- **InputSearcher**: TypeScript interface now explicitly exported as `InputSearcherProps`
- **Charts**: New module available at `import { BarChart, LineChart, ... } from '@e-burgos/tucu-ui'`
- **Recharts Peer Dependency**: If using charts, ensure `recharts >= 3.8.1` is installed
- **React Types**: Updated to `@types/react@^19.2.14` — ensure compatibility with your React version

### Version 2.0.3 Migration

If you're upgrading from version 2.0.2 to 2.0.3:

- **Storybook Removed**: Storybook is no longer included. Use the demo app for interactive documentation
- **Button `tooltip` Prop**: Changed from `string` to `React.ReactNode`. Existing string values still work
- **Button Tooltip Props**: New optional props `tooltipPlacement`, `tooltipColor`, `tooltipArrow` available
- **Testing**: Migrated from Jest to Vitest. Update test configuration accordingly
- **Nx**: Upgraded to Nx 22.5.2. Run `pnpm install` to update dependencies

### Version 2.0.0 Migration

If you're upgrading from version 1.x to 2.0.0:

- **Architectural Patterns**: The `ThemeProvider` now supports two patterns:
  - **Standalone** (default): No changes needed if using `menuItems` - this is the default behavior
  - **MFE**: Set `architecturalPatterns="mfe"` and provide `basePath` and `appRoutesConfig`
- **Breaking**: Removed `architecturalPatterns="single"` - use `"standalone"` instead (or omit it, as it's the default)
- **Type Safety**: TypeScript will now enforce correct props for each architectural pattern
- **Color Presets**: Expanded from 26+ to 34+ presets with 12-layer architecture
- **Documentation**: All documentation has been updated with new patterns and examples

### Tailwind CSS v4 Migration (v1.1.0+)

If you're upgrading from a version before the Tailwind v4 migration:

- **Required**: Update to Tailwind CSS v4 (`>=4.0.0`) in your project
- **Breaking**: The library no longer includes custom Tailwind utility CSS files
- **Breaking**: `tailwind.config.js` configuration has changed - refer to Tailwind v4 documentation
- **Note**: All styles are now consolidated in `globals.css`
- **Action**: Ensure your project uses Tailwind CSS v4 to avoid compatibility issues

### Package Manager Migration (v1.1.0+)

- The project now uses `pnpm` as the package manager
- If contributing, ensure you have `pnpm` installed
- Dependencies are managed through `pnpm` workspace configuration
