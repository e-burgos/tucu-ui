# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

- **2.0.0** - Major release with advanced routing system (Standalone & MFE), enhanced theming (34+ presets, 12-layer architecture), comprehensive documentation improvements, and architectural pattern support
- **1.2.0** - Major input components update, new carousel system, and comprehensive improvements
- **1.1.1** - Beta version publication
- **1.1.0** - Enhanced form components with improved hover states, removed DEFAULT values, and bug fixes
- **1.0.0** - Initial release with core form components and UI elements

## Migration Notes

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
