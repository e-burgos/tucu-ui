# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- **1.1.0** - Enhanced form components with improved hover states, removed DEFAULT values, and bug fixes
- **1.0.0** - Initial release with core form components and UI elements
