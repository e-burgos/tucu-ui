// ─── Resource: Layouts ───────────────────────────────────────────────────────

export function getLayoutsContent(): string {
  return `# Layouts — @e-burgos/tucu-ui

## Available Layouts (5)

### Admin Layout
\`\`\`
┌──────────────────────────────────────────┐
│  Header (fixed)                          │
├────────┬─────────────────────────────────┤
│ Sidebar│  Content Area                   │
│ (coll- │                                 │
│ apsible│                                 │
└────────┴─────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.ADMIN\`
- Collapsible sidebar visible on xl+ breakpoint
- Ideal for: admin panels, CRMs, data-heavy apps

### Horizontal Layout (Default)
\`\`\`
┌──────────────────────────────────────────┐
│  Header + Navigation (sticky)            │
├──────────────────────────────────────────┤
│  Content Area                            │
└──────────────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.HORIZONTAL\`
- Top horizontal navigation with sticky header
- Ideal for: content sites, marketing, simple nav

### Clean Layout
\`\`\`
┌──────────────────────────────────────────┐
│  Content Area (full canvas)              │
└──────────────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.CLEAN\`
- No navigation, no header
- Ideal for: login, sign up, error pages, landing pages

### macOS Classic Layout
\`\`\`
┌──────────────────────────────────────────┐
│  MacOSToolbar (sticky, vibrancy)         │
├─────────────┬────────────────────────────┤
│ MacOSSidebar│  Content Area              │
│ (translucent│                            │
│  vibrancy)  │                            │
└─────────────┴────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.MACOS\`
- Translucent sidebar with vibrancy blur
- Ideal for: macOS-style desktop apps

### macOS Tahoe Layout
\`\`\`
┌──────────────────────────────────────────┐
│  MacOSToolbar (Tahoe-style, rounded)     │
├─────────────┬────────────────────────────┤
│ MacOSSidebar│  Content Area (rounded)    │
│ (Tahoe-style│                            │
│  rounded)   │                            │
└─────────────┴────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.MACOS_TAHOE\`
- Tahoe design language with rounded corners
- Ideal for: modern macOS 26+ Tahoe-style interfaces

## LAYOUT_OPTIONS Enum
\`\`\`typescript
enum LAYOUT_OPTIONS {
  CLEAN = 'clean',
  ADMIN = 'admin',
  HORIZONTAL = 'horizontal',
  MACOS = 'macos',
  MACOS_TAHOE = 'macos-tahoe',
}
\`\`\`

## Setting the Layout
\`\`\`tsx
import { ThemeProvider, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

// Via ThemeProvider (initial layout)
<ThemeProvider layout={LAYOUT_OPTIONS.ADMIN} menuItems={menuItems} />

// Via useTheme (runtime change)
const { layout, setLayout } = useTheme();
setLayout(LAYOUT_OPTIONS.HORIZONTAL);
\`\`\`

## Layout Components
| Component | Props | Description |
|-----------|-------|-------------|
| RootLayout | layout, menuItems, logo?, rightButton?, fullWidth? | Main layout orchestrator |
| AdminLayout | menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth? | Collapsible sidebar + fixed header |
| CleanLayout | children, className? | Minimal layout without nav |
| HorizontalLayout | menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth? | Top horizontal navigation |
| MacOSLayout | menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth? | macOS-style sidebar + toolbar |
`;
}
