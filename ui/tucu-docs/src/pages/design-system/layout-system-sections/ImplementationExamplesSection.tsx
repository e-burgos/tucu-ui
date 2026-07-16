import React from 'react';
import {
  BasicTable,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Badge,
  HeroCard,
} from '@e-burgos/tucu-ui';

// ─── Example Data ──────────────────────────────────────────────

interface LayoutExample {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
  code: string;
}

const layoutExamples: LayoutExample[] = [
  {
    title: 'Admin Layout',
    description:
      'Traditional sidebar + header layout for dashboards and management apps.',
    icon: <LucideIcons.Layout className="w-5 h-5 text-white" />,
    color: 'from-blue-500 to-cyan-500',
    badge: 'admin',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, LucideIcons } from '@e-burgos/tucu-ui';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <Dashboard />,
  },
  {
    name: 'Users',
    path: '/users',
    icon: <LucideIcons.Users />,
    component: <Users />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <LucideIcons.Settings />,
    component: <Settings />,
  },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.ADMIN}
      logo={{ path: '/', name: 'Admin Panel' }}
      rightButton={<SettingsButton />}
      fullWidth={false}
      headerClassName="border-b border-border"
      contentClassName="p-6"
    />
  );
}`,
  },
  {
    title: 'Horizontal Layout',
    description:
      'Top navigation bar ideal for content-focused sites and marketing pages.',
    icon: <LucideIcons.Menu className="w-5 h-5 text-white" />,
    color: 'from-purple-500 to-indigo-500',
    badge: 'horizontal',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, LucideIcons } from '@e-burgos/tucu-ui';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { About } from './pages/About';

const menuItems = [
  {
    name: 'Home',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <Home />,
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: <LucideIcons.BookOpen />,
    component: <Blog />,
  },
  {
    name: 'About',
    path: '/about',
    icon: <LucideIcons.Info />,
    component: <About />,
  },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      logo={{ path: '/', name: 'My Site' }}
      rightButton={<ThemeToggle />}
      fullWidth={true}
    />
  );
}`,
  },
  {
    title: 'Clean Layout',
    description:
      'Minimal layout without navigation. Perfect for auth pages and landing pages.',
    icon: <LucideIcons.Minimize2 className="w-5 h-5 text-white" />,
    color: 'from-emerald-500 to-teal-500',
    badge: 'clean',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, Routes, Route } from '@e-burgos/tucu-ui';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  return (
    <ThemeProvider
      menuItems={[]} // No menu needed
      layout={LAYOUT_OPTIONS.CLEAN}
      logo={{ path: '/', name: 'My App' }}
      customRoutes={
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      }
    />
  );
}

// Clean layout renders children without any chrome:
// - No header, no sidebar, no navigation
// - Full viewport height (100vh)
// - Flex column layout for centering content`,
  },
  {
    title: 'macOS Sonoma Layout',
    description:
      'Desktop-style layout with frosted glass sidebar, toolbar, and window chrome.',
    icon: <LucideIcons.Monitor className="w-5 h-5 text-white" />,
    color: 'from-gray-500 to-slate-600',
    badge: 'macos',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, LucideIcons } from '@e-burgos/tucu-ui';
import { Overview } from './pages/Overview';
import { Library } from './pages/Library';
import { Preferences } from './pages/Preferences';

const menuItems = [
  {
    name: 'Overview',
    path: '/',
    icon: <LucideIcons.LayoutDashboard />,
    component: <Overview />,
  },
  {
    name: 'Library',
    path: '/library',
    icon: <LucideIcons.Library />,
    component: <Library />,
  },
  {
    name: 'Preferences',
    path: '/preferences',
    icon: <LucideIcons.Settings />,
    component: <Preferences />,
  },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.MACOS}
      themeStyle="macos" // Activates Sonoma theme + accent bundles
      logo={{ path: '/', name: 'Finder' }}
      rightButton={<SearchButton />}
    />
  );
}

// Features:
// - Frosted glass sidebar with translucent background
// - Native-style toolbar with centered page title
// - Responsive: drawer on mobile, sidebar on desktop
// - 9 Sonoma Accent Bundles (Blue, Purple, Pink, etc.)
// - Automatic ThemeBackground with 'sonoma' variant`,
  },
  {
    title: 'macOS Tahoe Layout',
    description:
      'macOS 26 Liquid Glass layout with translucent sidebar and refined toolbar.',
    icon: <LucideIcons.Sparkles className="w-5 h-5 text-white" />,
    color: 'from-indigo-500 to-purple-500',
    badge: 'macos-tahoe',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, LucideIcons } from '@e-burgos/tucu-ui';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Analytics } from './pages/Analytics';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <LucideIcons.LayoutDashboard />,
    component: <Dashboard />,
  },
  {
    name: 'Projects',
    path: '/projects',
    icon: <LucideIcons.FolderKanban />,
    component: <Projects />,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <LucideIcons.BarChart3 />,
    component: <Analytics />,
  },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.MACOS_TAHOE}
      themeStyle="macos-tahoe" // Activates Tahoe theme + Liquid Glass
      logo={{ path: '/', name: 'Studio' }}
      rightButton={<NotificationBell />}
    />
  );
}

// Features:
// - Liquid Glass sidebar with backdrop-blur and vibrancy
// - Refined toolbar with centered page title
// - Dynamic mesh background (radial variant by default)
// - 9 Tahoe Accent Bundles (Glass, Blue, Purple, Pink, etc.)
// - Content area with rounded corners and glass surface
// - Toast notifications with Tahoe styling`,
  },
  {
    title: 'macOS Tahoe Dock Layout',
    description:
      'Dock-based navigation with floating app dock and maximized content area.',
    icon: <LucideIcons.AppWindow className="w-5 h-5 text-white" />,
    color: 'from-violet-500 to-fuchsia-500',
    badge: 'macos-tahoe-dock',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, LucideIcons } from '@e-burgos/tucu-ui';
import { Player } from './pages/Player';
import { Browse } from './pages/Browse';
import { Playlists } from './pages/Playlists';

const menuItems = [
  {
    name: 'Player',
    path: '/',
    icon: <LucideIcons.Play />,
    component: <Player />,
  },
  {
    name: 'Browse',
    path: '/browse',
    icon: <LucideIcons.Compass />,
    component: <Browse />,
  },
  {
    name: 'Playlists',
    path: '/playlists',
    icon: <LucideIcons.ListMusic />,
    component: <Playlists />,
  },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.MACOS_TAHOE_DOCK}
      themeStyle="macos-tahoe"
      logo={{ path: '/', name: 'Music' }}
    />
  );
}

// Features:
// - Floating dock at the bottom with glass effect
// - Full-width content area (no sidebar)
// - Toolbar with centered title and optional leading/trailing actions
// - Dynamic background fills the viewport
// - Ideal for media apps, full-screen experiences, and immersive UIs
// - Content area has margin-bottom to accommodate dock height (56px)`,
  },
  {
    title: 'macOS Sonoma Clean Layout',
    description:
      'Minimal Sonoma layout with only background and content — no sidebar or toolbar.',
    icon: <LucideIcons.Layers className="w-5 h-5 text-white" />,
    color: 'from-slate-400 to-zinc-500',
    badge: 'macos-clean',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, Routes, Route } from '@e-burgos/tucu-ui';
import { LoginPage } from './pages/LoginPage';
import { WelcomePage } from './pages/WelcomePage';

function App() {
  return (
    <ThemeProvider
      menuItems={[]} // No navigation needed
      layout={LAYOUT_OPTIONS.MACOS_CLEAN}
      themeStyle="macos" // Inherits Sonoma theme styling
      logo={{ path: '/', name: 'My App' }}
      customRoutes={
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<WelcomePage />} />
        </Routes>
      }
    />
  );
}

// Features:
// - Background only (ThemeBackground with 'sonoma' variant) + content slot
// - No sidebar, toolbar, or navigation chrome
// - Full viewport (100vh × 100vw) with overflow-auto
// - Inherits Sonoma accent colors and dark/light mode
// - Toast notifications still available (MacOSSonomaToast)
// - Use cases: auth pages, standalone content, onboarding flows`,
  },
  {
    title: 'macOS Tahoe Clean Layout',
    description:
      'Minimal Tahoe layout with Liquid Glass background and content area only.',
    icon: <LucideIcons.Gem className="w-5 h-5 text-white" />,
    color: 'from-purple-400 to-indigo-500',
    badge: 'macos-tahoe-clean',
    code: `import { ThemeProvider, LAYOUT_OPTIONS, Routes, Route } from '@e-burgos/tucu-ui';
import { AuthPage } from './pages/AuthPage';
import { FullScreenView } from './pages/FullScreenView';

function App() {
  return (
    <ThemeProvider
      menuItems={[]} // No navigation needed
      layout={LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN}
      themeStyle="macos-tahoe" // Inherits Tahoe Liquid Glass styling
      logo={{ path: '/', name: 'My App' }}
      customRoutes={
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<FullScreenView />} />
        </Routes>
      }
    />
  );
}

// Features:
// - Dynamic background (ThemeBackground with 'radial' variant) + content slot
// - No sidebar, dock, toolbar, or navigation chrome
// - Full viewport (100vh × 100vw) with overflow-auto
// - Inherits Tahoe accent colors, Liquid Glass CSS vars, dark/light mode
// - Toast notifications still available (MacOSTahoeToast)
// - Use cases: auth within Tahoe theme, immersive views, splash screens`,
  },
];

// ─── Component ─────────────────────────────────────────────────

const ImplementationExamplesSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Implementation Examples"
        description="Practical code examples for all 8 layout types, routing patterns, and theme configuration."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Code className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <div className="text-center">
        <Typography tag="h2" className="mb-2">
          Implementation Examples
        </Typography>
        <Typography
          tag="p"
          className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Complete code examples for all 8 layout types and common integration
          patterns
        </Typography>
      </div>

      {/* ── Layout Examples ─────────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Layout Examples (All 8 Types)" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Each layout type has specific props and behavior. The{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                ThemeProvider
              </code>{' '}
              component handles routing, theming, and layout rendering. Use{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                LAYOUT_OPTIONS
              </code>{' '}
              enum for type-safe layout selection.
            </Typography>

            <div className="space-y-6">
              {layoutExamples.map((example, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-linear-to-br ${example.color} shadow-md`}
                    >
                      {example.icon}
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      {index + 1}. {example.title}
                    </Typography>
                    <Badge variant="outline" className="text-xs">
                      {example.badge}
                    </Badge>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400 ml-11"
                  >
                    {example.description}
                  </Typography>
                  <CodeBlock language="tsx" code={example.code} />
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ── Common Patterns ─────────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Common Patterns" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-amber-500 to-orange-500 shadow-md">
                    <LucideIcons.Route className="w-5 h-5 text-white" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Custom Routing with customRoutes
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 ml-11"
                >
                  Override automatic routing with your own{' '}
                  <code>{'<Routes>'}</code> for complex scenarios (nested
                  routes, guards, lazy loading).
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { ThemeProvider, LAYOUT_OPTIONS, Routes, Route } from '@e-burgos/tucu-ui';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

const menuItems = [
  { name: 'Home', path: '/', icon: <LucideIcons.Home /> },
  { name: 'About', path: '/about', icon: <LucideIcons.Info /> },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      logo={{ path: '/', name: 'My App' }}
      customRoutes={
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      }
    />
  );
}

// Notes:
// - BrowserRouter is already included in ThemeProvider
// - customRoutes overrides automatic route generation from menuItems
// - menuItems still power the navigation menu (sidebar/topnav)`}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-pink-500 to-rose-500 shadow-md">
                    <LucideIcons.Palette className="w-5 h-5 text-white" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Theme Style + Layout Constraints
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 ml-11"
                >
                  Each <code>themeStyle</code> restricts which layouts are
                  valid. Use <code>THEME_STYLE_LAYOUTS</code> to check
                  compatibility.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`// Theme Style → Valid Layouts mapping:
//
// themeStyle="default"    → CLEAN, ADMIN, HORIZONTAL
// themeStyle="macos"      → MACOS, MACOS_CLEAN
// themeStyle="macos-tahoe"→ MACOS_TAHOE, MACOS_TAHOE_DOCK, MACOS_TAHOE_CLEAN

import { ThemeProvider, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

// ✅ Correct: Tahoe layout with Tahoe theme
<ThemeProvider
  menuItems={menuItems}
  layout={LAYOUT_OPTIONS.MACOS_TAHOE}
  themeStyle="macos-tahoe"
/>

// ✅ Correct: Admin layout with default theme
<ThemeProvider
  menuItems={menuItems}
  layout={LAYOUT_OPTIONS.ADMIN}
  themeStyle="default"
/>

// ⚠️ Invalid: ADMIN layout is not valid for "macos-tahoe" theme
// The layout will fallback to the theme's defaultLayout (MACOS_TAHOE)
<ThemeProvider
  menuItems={menuItems}
  layout={LAYOUT_OPTIONS.ADMIN}
  themeStyle="macos-tahoe" // Will use MACOS_TAHOE instead
/>`}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-cyan-500 to-blue-500 shadow-md">
                    <LucideIcons.SlidersHorizontal className="w-5 h-5 text-white" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Using Theme Hooks for Dynamic Layout
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 ml-11"
                >
                  Access and modify theme state from any child component using{' '}
                  <code>useTheme()</code>.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { useTheme, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

function LayoutSwitcher() {
  const {
    mode,
    setMode,
    layout,
    setLayout,
    colorScheme,        // 'default' | 'macos' | 'macos-tahoe'
    backgroundVariant,  // 'none' | 'base' | 'sonoma' | 'radial' | 'aurora' | ...
    setBackgroundVariant,
    applyMacOSTahoeTheme,  // Switch to full Tahoe theme
    applyMacOSTheme,       // Switch to full Sonoma theme
    applyDefaultTheme,     // Switch to default theme
    restoreDefaultColors,  // Reset colors (theme-aware)
  } = useTheme();

  return (
    <div className="space-y-4">
      {/* Toggle dark/light */}
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Mode: {mode}
      </button>

      {/* Switch entire theme */}
      <button onClick={applyMacOSTahoeTheme}>
        Apply Tahoe Theme
      </button>

      {/* Change background within current theme */}
      <select
        value={backgroundVariant}
        onChange={(e) => setBackgroundVariant(e.target.value)}
      >
        <option value="none">None</option>
        <option value="radial">Radial</option>
        <option value="aurora">Aurora</option>
        <option value="sonoma">Sonoma</option>
      </select>

      {/* Layout only changes within valid options for current theme */}
      <p>Current: {colorScheme} / {layout}</p>
    </div>
  );
}`}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-md">
                    <LucideIcons.Paintbrush className="w-5 h-5 text-white" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Accent Color Bundles (macOS Themes)
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 ml-11"
                >
                  macOS themes support 9 accent color bundles that match System
                  Preferences.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import {
  useTheme,
  TAHOE_ACCENT_BUNDLES,
  SONOMA_ACCENT_BUNDLES,
  buildTahoePresets,
  buildSonomaPresets,
} from '@e-burgos/tucu-ui';

function AccentPicker() {
  const { setPrimaryPreset, setAccentPreset, setDarkPrimaryPreset, setDarkAccentPreset } = useTheme();

  // Apply a Tahoe accent bundle (e.g. "Blue")
  const applyTahoeAccent = (bundleName: string) => {
    const bundle = TAHOE_ACCENT_BUNDLES.find(b => b.name === bundleName);
    if (!bundle) return;

    const presets = buildTahoePresets(bundle);
    setPrimaryPreset(presets.primaryPreset);
    setAccentPreset(presets.accentPreset);
    setDarkPrimaryPreset(presets.darkPrimaryPreset);
    setDarkAccentPreset(presets.darkAccentPreset);
  };

  return (
    <div className="flex gap-2">
      {TAHOE_ACCENT_BUNDLES.map((bundle) => (
        <button
          key={bundle.name}
          onClick={() => applyTahoeAccent(bundle.name)}
          className="w-6 h-6 rounded-full border-2 border-white/50"
          style={{ background: bundle.primary }}
          title={bundle.name}
        />
      ))}
    </div>
  );
}

// Available bundles:
// Tahoe:  Glass, Blue, Purple, Pink, Red, Orange, Yellow, Green, Graphite
// Sonoma: Blue, Purple, Pink, Red, Orange, Yellow, Green, Graphite, Multicolor`}
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ── ThemeProvider Props ──────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="ThemeProvider Props Reference" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={[
                {
                  key: 'prop',
                  label: 'Prop',
                  render: (value) => (
                    <code className="font-mono text-xs">{value as string}</code>
                  ),
                },
                {
                  key: 'type',
                  label: 'Type',
                  render: (value) => (
                    <code className="font-mono text-xs">{value as string}</code>
                  ),
                },
                {
                  key: 'default',
                  label: 'Default',
                  className: 'text-gray-500',
                },
                {
                  key: 'description',
                  label: 'Description',
                  className: 'text-gray-600 dark:text-gray-400',
                },
              ]}
              data={[
                {
                  prop: 'menuItems',
                  type: 'IMenuItem[]',
                  default: '[]',
                  description:
                    'Navigation items. Each with name, path, icon, and optional component.',
                },
                {
                  prop: 'layout',
                  type: 'LAYOUT_OPTIONS',
                  default: 'horizontal',
                  description:
                    'Layout type. Must be valid for the current themeStyle.',
                },
                {
                  prop: 'themeStyle',
                  type: "'default' | 'macos' | 'macos-tahoe'",
                  default: 'default',
                  description:
                    'Theme style preset. Determines valid layouts and visual system.',
                },
                {
                  prop: 'logo',
                  type: 'LogoPropTypes',
                  default: '—',
                  description:
                    'Logo config: path (route), name (alt text), optional image.',
                },
                {
                  prop: 'rightButton',
                  type: 'ReactNode',
                  default: '—',
                  description:
                    'Element rendered in header/toolbar trailing area.',
                },
                {
                  prop: 'customRoutes',
                  type: 'ReactNode',
                  default: '—',
                  description:
                    'Custom Routes element. Overrides auto-generated routing.',
                },
                {
                  prop: 'fullWidth',
                  type: 'boolean',
                  default: 'false',
                  description:
                    'Remove content max-width constraint for full-width layouts.',
                },
                {
                  prop: 'className',
                  type: 'string',
                  default: '—',
                  description: 'Root layout container class.',
                },
                {
                  prop: 'headerClassName',
                  type: 'string',
                  default: '—',
                  description:
                    'Header/toolbar container class for custom styling.',
                },
                {
                  prop: 'contentClassName',
                  type: 'string',
                  default: '—',
                  description:
                    'Content area class for padding/spacing overrides.',
                },
              ]}
              resizable={false}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ImplementationExamplesSection;
