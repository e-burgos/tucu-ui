# tucu-ui UI review checklist

Report each finding as `severity: location: problem: fix`. Severities: blocker, major, minor.

## Hierarchy and layout
- [ ] One clear page title and one primary action per view
- [ ] Layout matches the screen type (admin, clean, MarketingLayout, SplitAuthLayout)
- [ ] Sections separated by consistent spacing, no nested cards
- [ ] Content width is bounded on large screens

## Tokens and theme
- [ ] No hardcoded hex colors; brand color comes from a preset, `brandColor` or `ThemeScope`
- [ ] Surfaces use Card, GlassPanel or library tokens, not ad hoc backgrounds
- [ ] One density and one radius scale on the screen
- [ ] Looks correct in light and dark mode

## Typography
- [ ] Heading levels are sequential (h1, then h2, ...)
- [ ] Body text is readable (no text below 12px for content)
- [ ] Numbers in tables and stats are aligned and consistently formatted

## States
- [ ] Loading state uses Skeleton or a pending control
- [ ] Empty state uses EmptyState with a next action
- [ ] Error state uses ErrorState or Alert with a retry path
- [ ] Disabled, hover, focus and active states are visible

## Forms and data
- [ ] Every control has a label; errors sit next to the field
- [ ] Required and optional fields are distinguishable
- [ ] Tables have a purposeful default sort and stay usable at 375px (`mobileCards`)
- [ ] Destructive actions ask for confirmation (ConfirmDialog)

## Responsive
- [ ] No horizontal scroll at 375px
- [ ] Touch targets are at least 40px on touch layouts
- [ ] Navigation collapses correctly on small screens

## Accessibility
- [ ] Everything is reachable and operable with the keyboard; focus order is logical
- [ ] Icon-only buttons have an accessible name
- [ ] Text contrast meets WCAG AA
- [ ] Modals and drawers trap focus and close with Escape
- [ ] Status is not conveyed by color alone

## Motion
- [ ] Motion is limited to entrances, state changes and feedback
- [ ] `prefers-reduced-motion` is respected (ThemeWrapper provides `MotionConfig reducedMotion="user"`)

## Code
- [ ] Components, props and imports exist in the installed `@e-burgos/tucu-ui` version (`get_component` / `get_props`)
- [ ] No reimplementation of library components
- [ ] User-visible text is localizable
