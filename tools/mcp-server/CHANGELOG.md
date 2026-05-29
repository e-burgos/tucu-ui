# Changelog

All notable changes to `@e-burgos/tucu-ui-mcp` will be documented in this file.

<!-- Last updated: 2026-05-29 -->

## [0.5.1] - 2026-05-29

### Changed

- Updated `theme` resource to document `themeConfigs` schema and state persistence
- Added `macos-tahoe` theme variant to `theme-setup` prompt
- Updated `catalog` resource with updated tucu-ui library version reference (`2.4.1` -> `2.5.0`)

### Fixed

- Resolved test failure in HTTP health check test by reading version dynamically from `package.json`

## [0.5.0] - 2026-05-28

### Added

- Registered 14 new settings-related components in the component registry: `SettingsButton`, `SettingsDrawer`, `SwitchMode`, `ThemeSwitcher`, `DefaultColorSettings`, `ColorDot`, `ColorSwatchModal`, `BackgroundPicker`, `DirectionSwitcher`, `LayoutSwitcher`, `RestoreDefaults`, `SettingsSectionHeading`, `SonomaAccentPicker`, `TahoeAccentPicker`, `ThemeVariantSwitcher`, and `SwitcherButton`

### Changed

- Expanded `routing` resource with comprehensive documentation: MFE routing patterns, standalone routing guide, route guards, lazy loading, nested routes, and integration examples
- Expanded `theme` resource with detailed token documentation, dark/light mode guide, macOS Sonoma/Tahoe theming patterns, and custom theme creation examples
- Updated `catalog` resource to reflect new settings components category

## [0.4.3] - 2026-05-25

### Changed

- Improve publish scripts with `--skip-git` flag support
- Update publish skill documentation

## [0.4.2] - 2026-05-24

### Changed

- update publish skill and mcp publish script

## [0.4.1] - 2026-05-24

### Added

- add macOS Tahoe components, update demo pages, and improve theming
- update MCP server resources, tools, generation, and agentic capabilities
- add HTTP transport, auth, Docker + CI/CD (Plan D)
- add resources, prompts + distribution config (Plan C)
- add generation tools + theme registry (Plan B)
- add MCP foundation — core + component discovery (Plan A)
- rewrite settings drawer with visual color editor
- extend color presets, BackgroundVariant, and theme store
- add clean layout variants for Sonoma and Tahoe
- add ThemeBackground component and background variants CSS
- add macOS Tahoe and Sonoma demo sections with playground examples
- add macOS Tahoe components, ColorCard, FeatureCard and theme variants
- add macOS Tahoe styles and update base CSS utilities
- sticky header, resizable columns, border fixes & theme improvements
- add macOS Tahoe showcase pages and Sonoma split
- add MacOSTahoeDockLayout and update component integrations
- add Tahoe components suite
- reorganize CSS into sonoma/ and tahoe/ subdirectories
- add macOS showcase sections and update demo components
- add data-tucu attributes to UI components
- update theme store, config, and providers
- add MacOSSonomaLayout and MacOSTahoeLayout
- add macOS components (toolbar, background, command-palette, window, sidebar)
- implement Sonoma & Tahoe CSS overrides
- add Inter and JetBrains Mono variable fonts
- other changes
- implement tahoe 26 design system
- update demo documentation for macOS Tahoe components
- update UI components for macOS Tahoe design language
- refactor all input components with macOS-aware styling helpers
- add macOS Tahoe variant to theme system
- implement macOS Sonoma 14 design system — Fases A-D
- add MacOS Showcase route to menu items
- add macOS component showcase page with all 8 sections
- implement Sonoma widget system and macOS layout
- add macOS theme variant as a switchable color scheme
- apply macOS/Apple design system tokens (v2)
- add charts system with 6 chart components
- add new UI components
- component improvements, Storybook removal, docs refactor & build optimization
- add 2.0.0 version - mfe support
- update input components
- update storybook
- publish tucu-ui beta version
- update ui documentation
- upgrade tucu-ui
- update text classes
- update tw utilities
- update tucu-ui tw classes
- add collapse classname prop
- improve mobile actions
- add test-lib app for testing lib purposes
- color system fixed
- improve code-block component
- migrate to pnpm
- update layout config
- update favicon 3 demo app
- update favicon 2 demo app
- update favicon demo app
- update redirect demo app
- update demo app
- resolve dependecies
- clean dependencies, add tailwind styles compatibility
- publish documetation
- update package
- migrate to tailwind v4

### Changed

- update agents, skills, README, and add prompt docs
- update workspace config, dependencies, and add publish scripts
- update menu items, eslint config, and vite setup
- clean up .cursor config and remove deprecated skills
- add MCP agentic server spec and aligned plans
- bump @e-burgos/tucu-ui dependency to ^2.0.11
- bump version to 2.0.11 and update CHANGELOG
- migrate demo pages to theme tokens + add BackgroundsSection
- migrate macOS components to theme tokens
- migrate border classes to border-border token
- wrap all layout variants with ThemeBackground
- bump version to 2.0.9
- add utility scripts for demo section generation
- update routing, redirects and menu items
- update dependencies, config and skill docs
- update READMEs with macOS Tahoe design system and 5 layouts
- add version 2.0.9 entry with macOS Tahoe changes
- update agent skills and IDE config files
- replace zip assets with extracted SVG files for Dock and Menu Bar
- update test-lib menu items and eslint config
- remove unused image assets from library
- update macOS Tahoe spec, plan, and resource files
- update skills, agents, and copilot instructions
- implement macOS Tahoe (Sequoia 15) CSS design tokens
- add dependencies required by macOS Tahoe design system demo
- add spec and plan for macOS Tahoe (Sequoia 15) design system
- add v2.0.8 changelog and update README import-order notes
- bump version to 2.0.8, update dependencies and build config
- update breakpoints in MFE and standalone examples
- replace custom breakpoints in theme pages and providers
- replace custom breakpoints with arbitrary values
- update dependencies, tooling, and documentation
- add charts demo page and new component sections
- remove @headlessui/react dependency
- modal and drawer components
- gitignore
- new tucu-ui version
- nx version
- resolve tailwind 3
- update lib
- update lib
- add tucutable project

### Fixed

- add clean layout types and default backgroundVariant to none
- fix border color variables and remove circular references
- fix dropdown clipping in default theme
- rewrite with fixed positioning strategy
- update lockfile to use npm registry for tucu-ui
- use npm registry version for demo deploy on Netlify
- update auth forms, layouts, menus and misc components
- update line tokens to neutral gray scale for light/dark mode
- resolve tucu-ui build errors and add macOS to test-lib
- align macOS tokens with official Apple system color values
- update color references, breakpoints, and improve ToC button
- update hardcoded gray hex values to match new palette
- remove @theme namespace collisions and align gray palette with Tailwind v4
- component improvements and bug fixes
- layout components
- demo build
- tucu-ui router system
- resolve arbitrary values
- resolve responsive layout
- minor fix

## [0.4.0] - 2025-05-23

### Added

- **Generation tools**: `generate_component`, `generate_form`, `generate_page`, `generate_chart`, `search_icons`
- **8 MCP prompts**: create-component, create-form, create-page, debug-variant, migrate-component, theme-setup, accessibility-check, performance-review
- **12 resources** with `tucu://` URI scheme covering catalog, tokens, forms, routing, layouts, theme, charts, icons, migration, best-practices, changelog, and quickstart
- Fuzzy search for component lookups
- Code generation with automatic variant validation and safety warnings
- Form generation with Zod + react-hook-form patterns
- Theme-aware code generation (ThemeProvider wrapping)

### Security

- Bearer token authentication (`MCP_API_KEY`)
- Timing-safe token comparison
- Rate limiting (100 req/min per IP)
- Non-root Docker user

### Infrastructure

- Docker multi-stage build (node:22-alpine)
- Fly.io configuration with auto-stop/start machines
- Health check endpoint (`GET /health`)
- Streamable HTTP transport for remote access

## [0.3.0] - 2025-05-15

### Added

- HTTP server with Express 5 (`http-server.ts`)
- Rate limiter middleware
- Auth middleware with constant-time comparison
- Docker support (Dockerfile + docker-compose.yml)
- Fly.io deployment config (`fly.toml`)
- Client configuration examples (VS Code, Cursor, Claude Desktop, remote HTTP)

## [0.2.0] - 2025-05-10

### Added

- Component tools: `list_components`, `get_component`
- Component registry with 95+ entries
- Theme registry with color presets and layout variants
- Form patterns registry
- Icon registry (97 native + 1500+ Lucide)
- Fuzzy search utility

## [0.1.0] - 2025-05-05

### Added

- Initial MCP server scaffold
- Stdio transport entry point
- Server factory (`createMcpServer`)
- Project structure with TypeScript, Vitest, and Nx integration
