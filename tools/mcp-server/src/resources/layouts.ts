// ─── Resource: Layouts ───────────────────────────────────────────────────────

export function getLayoutsContent(): string {
  return `# Layouts — @e-burgos/tucu-ui

## Available Layouts (10)

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

### macOS Classic Layout (Sonoma)
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

### macOS Clean Layout (Sonoma)
\`\`\`
┌──────────────────────────────────────────┐
│  Content Area (full canvas, Sonoma style)│
└──────────────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.MACOS_CLEAN\`
- Sonoma-style clean layout without navigation
- Ideal for: login, sign up, landing pages with macOS aesthetics

### macOS Navbar Layout (Sonoma)
\`\`\`
┌──────────────────────────────────────────┐
│  Horizontal NavBar (vibrancy, sticky)    │
├──────────────────────────────────────────┤
│  Content Area                            │
└──────────────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.MACOS_NAVBAR\`
- Horizontal top navigation bar with Sonoma vibrancy
- Ideal for: content-focused macOS apps without sidebar

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

### macOS Tahoe Dock Layout
\`\`\`
┌──────────────────────────────────────────┐
│  MacOSToolbar (Tahoe-style, rounded)     │
├──────────────────────────────────────────┤
│  Content Area (rounded)                  │
├──────────────────────────────────────────┤
│  Dock (bottom, Tahoe-style)              │
└──────────────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.MACOS_TAHOE_DOCK\`
- Tahoe design with bottom dock navigation instead of sidebar
- Ideal for: macOS Tahoe apps with dock-based navigation

### macOS Tahoe Clean Layout
\`\`\`
┌──────────────────────────────────────────┐
│  Content Area (full canvas, Tahoe style) │
└──────────────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN\`
- Tahoe-style clean layout without navigation
- Ideal for: login, sign up, landing pages with Tahoe aesthetics

### macOS Tahoe Navbar Layout
\`\`\`
┌──────────────────────────────────────────┐
│  Horizontal NavBar (Tahoe, rounded)      │
├──────────────────────────────────────────┤
│  Content Area (rounded)                  │
└──────────────────────────────────────────┘
\`\`\`
- **Constant**: \`LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR\`
- Horizontal top navigation bar with Tahoe rounded design language
- Ideal for: content-focused Tahoe apps without sidebar

## LAYOUT_OPTIONS Enum
\`\`\`typescript
enum LAYOUT_OPTIONS {
  CLEAN = 'clean',
  ADMIN = 'admin',
  HORIZONTAL = 'horizontal',
  MACOS = 'macos',
  MACOS_CLEAN = 'macos-clean',
  MACOS_NAVBAR = 'macos-navbar',
  MACOS_TAHOE = 'macos-tahoe',
  MACOS_TAHOE_DOCK = 'macos-tahoe-dock',
  MACOS_TAHOE_CLEAN = 'macos-tahoe-clean',
  MACOS_TAHOE_NAVBAR = 'macos-tahoe-navbar',
}
\`\`\`

## Valid Layouts per Theme Style
| Theme Style | Valid Layouts |
|-------------|--------------|
| default | CLEAN, ADMIN, HORIZONTAL |
| macos | MACOS, MACOS_CLEAN, MACOS_NAVBAR |
| macos-tahoe | MACOS_TAHOE, MACOS_TAHOE_DOCK, MACOS_TAHOE_CLEAN, MACOS_TAHOE_NAVBAR |

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
| HorizontalNavMenu | menuItems, className?, dropboxClassName? | Horizontal navigation menu (used inside navbar layouts) |
| MacOSLayout | menuItems, rightButton?, logo?, isOpen, setIsOpen, fullWidth?, variant? | macOS-style layout (supports sonoma/tahoe variants) |
`;
}
