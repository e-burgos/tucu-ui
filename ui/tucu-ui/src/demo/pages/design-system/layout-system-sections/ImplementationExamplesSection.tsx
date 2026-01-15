import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, CodeBlock } from '../../../../index';

const ImplementationExamplesSection: React.FC = () => {
  return (
    <>
      <CardContainer className="overflow-hidden">
        <CardTitle title="Implementation Examples" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 shadow-md">
                <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Basic Usage
              </Typography>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  1. Automatic Routing with menuItems
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  ThemeProvider automatically generates routes from menuItems.
                  Each menu item with a <code>component</code> prop becomes a
                  route.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { ThemeProvider, LAYOUT_OPTIONS, LucideIcons } from '@ui/tucu-ui';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

// Menu items with components - routes are generated automatically
// Note: Use 'path' for internal routing, 'href' for external links
const menuItems = [
  {
    name: 'Dashboard',
    path: '/', // Internal route path
    icon: <LucideIcons.Home />,
    component: <Dashboard />, // This becomes a route
  },
  {
    name: 'Settings',
    path: '/settings', // Internal route path
    icon: <LucideIcons.Settings />,
    component: <Settings />, // This becomes a route
  },
  {
    name: 'Profile',
    path: '/profile', // Internal route path
    icon: <LucideIcons.User />,
    component: <Profile />, // This becomes a route
  },
];

function App() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.ADMIN}
      logo={{ path: '/', name: 'My App' }}
    />
    {/* No children needed - routing is handled automatically */}
  );
}

// Routes are automatically created:
// / -> Dashboard component
// /settings -> Settings component
// /profile -> Profile component`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  2. Landing Page (No Routing)
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  For landing pages or single-page applications without
                  routing, use <code>customRoutes</code> with a single route.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { ThemeProvider, LAYOUT_OPTIONS, Routes, Route } from '@ui/tucu-ui';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <ThemeProvider
      menuItems={[]} // Empty - no navigation needed for landing page
      layout={LAYOUT_OPTIONS.CLEAN} // Clean layout for landing pages
      logo={{ path: '/', name: 'My Brand' }}
      customRoutes={
        <Routes>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      }
    />
  );
}

// The customRoutes prop overrides automatic routing
// BrowserRouter is already included in ThemeProvider
// No need to import or wrap with BrowserRouter`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  3. Custom Routing with customRoutes
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  For complex routing scenarios, provide your own{' '}
                  <code>{'<Routes>'}</code> component via{' '}
                  <code>customRoutes</code> prop.
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { ThemeProvider, LAYOUT_OPTIONS, Routes, Route } from '@ui/tucu-ui';
import { BrowserRouter } from 'react-router-dom'; // Already included in ThemeProvider
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

function App() {
  // Menu items for navigation (optional - can be empty if using customRoutes)
  // Note: 'path' is used for internal routing, 'href' would be for external links
  const menuItems = [
    {
      name: 'Home',
      path: '/', // Internal route path
      icon: <LucideIcons.Home />,
    },
    {
      name: 'About',
      path: '/about', // Internal route path
      icon: <LucideIcons.Info />,
    },
    {
      name: 'Contact',
      path: '/contact', // Internal route path
      icon: <LucideIcons.Mail />,
    },
  ];

  return (
    <ThemeProvider
      menuItems={menuItems} // For navigation menu
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      logo={{ path: '/', name: 'My App' }}
      customRoutes={
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    />
  );
}

// Note: BrowserRouter is already included in ThemeProvider,
// so you don't need to wrap it again`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  4. Using Theme Hooks
                </Typography>

                <CodeBlock
                  language="tsx"
                  code={`import { useTheme, LAYOUT_OPTIONS } from '@ui/tucu-ui';

function ThemeControls() {
  const { 
    mode, 
    setMode, 
    layout, 
    setLayout,
    primaryPreset,
    setPrimaryPreset 
  } = useTheme();
  
  return (
    <div className="space-y-4">
      <button 
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      >
        Toggle Theme: {mode}
      </button>
      
      <select 
        value={layout} 
        onChange={(e) => setLayout(e.target.value as any)}
      >
        <option value={LAYOUT_OPTIONS.CLEAN}>Clean</option>
        <option value={LAYOUT_OPTIONS.ADMIN}>Admin</option>
        <option value={LAYOUT_OPTIONS.HORIZONTAL}>Horizontal</option>
      </select>
      
      <div>
        Current Primary Color: {primaryPreset?.label}
      </div>
    </div>
  );
}

// Usage with ThemeProvider
function App() {
  const menuItems = [
    { 
      name: 'Theme Controls', 
      href: '/theme-controls',
      component: <ThemeControls />
    }
  ];

  return <ThemeProvider menuItems={menuItems} />;
}`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  5. Layout-Specific Configuration
                </Typography>

                <CodeBlock
                  language="tsx"
                  code={`import { ThemeProvider, LAYOUT_OPTIONS } from '@ui/tucu-ui';

function App() {
  const menuItems = [
    { name: 'Home', href: '/', icon: <LucideIcons.Home /> },
    { name: 'About', href: '/about', icon: <LucideIcons.Info /> },
  ];

  return (
    <ThemeProvider
      menuItems={menuItems}
      layout={LAYOUT_OPTIONS.ADMIN}
      logo={{ path: '/', name: 'My App' }}
      rightButton={<SettingsButton />}
      fullWidth={false} // Set to true for full-width content
      className="custom-layout-class"
      headerClassName="custom-header-class"
      contentClassName="custom-content-class"
    >
      <YourAppContent />
    </ThemeProvider>
  );
}`}
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ImplementationExamplesSection;

