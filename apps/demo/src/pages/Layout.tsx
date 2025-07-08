import {
  ThemeProvider,
  Button,
  CardContainer,
  HomeIcon,
  EyeIcon,
  NormalGridIcon,
  PlayIcon,
  DiskIcon,
  LinkIcon,
  RetroLayoutIcon,
  StarFill,
  ArrowLinkIcon,
  Verified,
} from 'tucu-ui';

function Layout() {
  return (
    <ThemeProvider
      showSettings
      settingActions={{
        disabledLayout: false,
        disabledPreset: false,
        disabledDirection: false,
        disabledMode: false,
      }}
      rightButton={<Button>Settings</Button>}
      logo={{
        name: 'Demo',
        secondName: 'App',
      }}
      menuItems={[
        {
          name: 'Overview',
          href: '/',
          icon: <HomeIcon />,
          component: (
            <CardContainer className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Welcome to tucu-ui</h1>
              <p className="text-base text-gray-600">
                tucu-ui is a modern React component library built with
                TypeScript, Tailwind CSS, and Headless UI. It provides a
                comprehensive set of accessible, customizable UI components
                designed for modern web applications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>Fully typed TypeScript components</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Dark mode support</li>
                    <li>Responsive by design</li>
                    <li>Accessible components</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Core Dependencies</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>React 18+</li>
                    <li>Headless UI</li>
                    <li>Tailwind CSS 4.1+</li>
                    <li>Framer Motion</li>
                    <li>Zustand for state management</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-2">Get Started with tucu-ui</Button>
            </CardContainer>
          ),
        },
        {
          name: 'Components',
          href: '/components',
          icon: <NormalGridIcon />,
          component: (
            <CardContainer className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Component Library</h1>
              <p className="text-base text-gray-600">
                tucu-ui offers a rich collection of UI components built on top
                of Headless UI and styled with Tailwind CSS. Each component is
                designed to be accessible, customizable, and easy to integrate
                into your React applications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Component Categories</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>Buttons & Actions</li>
                    <li>Forms & Inputs</li>
                    <li>Layout & Containers</li>
                    <li>Navigation</li>
                    <li>Feedback & Notifications</li>
                    <li>Data Display</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Component Features</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>Consistent API design</li>
                    <li>Comprehensive prop types</li>
                    <li>Theme-aware styling</li>
                    <li>Responsive variants</li>
                    <li>Animation support</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-2">Explore All Components</Button>
            </CardContainer>
          ),
          dropdownItems: [
            {
              name: 'Buttons',
              href: '/components/buttons',
              icon: <PlayIcon />,
              component: (
                <CardContainer className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold">Button Components</h1>
                  <p className="text-base text-gray-600">
                    tucu-ui provides versatile button components with support
                    for various shapes, sizes, variants, and colors. Buttons
                    include loading states, animations, and tooltip support.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                    <h3 className="font-bold mb-2">Button Features</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>
                        <strong>Shapes:</strong> rounded, pill, circle
                      </li>
                      <li>
                        <strong>Variants:</strong> ghost, solid, transparent
                      </li>
                      <li>
                        <strong>Colors:</strong> primary, white, gray, success,
                        info, warning, danger
                      </li>
                      <li>
                        <strong>Sizes:</strong> large, medium, small, mini, tiny
                      </li>
                      <li>
                        <strong>States:</strong> loading, disabled, hover, focus
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button size="small">Default</Button>
                    <Button size="small" variant="ghost">
                      Ghost
                    </Button>
                    <Button size="small" color="success">
                      Success
                    </Button>
                    <Button size="small" color="danger">
                      Danger
                    </Button>
                  </div>
                  <Button className="w-full mt-2">
                    See Button Documentation
                  </Button>
                </CardContainer>
              ),
            },
            {
              name: 'Forms',
              href: '/components/forms',
              icon: <DiskIcon />,
              component: (
                <CardContainer className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold">Form Components</h1>
                  <p className="text-base text-gray-600">
                    Build robust forms with tucu-ui's comprehensive form
                    components. Includes inputs, checkboxes, radio buttons,
                    switches, selects, and more, all with built-in validation
                    support via react-hook-form.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                    <h3 className="font-bold mb-2">Form Components</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>
                        <strong>Input:</strong> Text, password, search fields
                      </li>
                      <li>
                        <strong>Selection:</strong> Checkbox, radio, switch,
                        select
                      </li>
                      <li>
                        <strong>Complex:</strong> File upload, pin code,
                        textarea
                      </li>
                      <li>
                        <strong>Containers:</strong> Form, field container,
                        labels
                      </li>
                      <li>
                        <strong>Validation:</strong> Error messages, helper text
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-2">
                    See Form Documentation
                  </Button>
                </CardContainer>
              ),
            },
            {
              name: 'Headless UI',
              href: '/components/headless-ui',
              icon: <LinkIcon />,
              component: (
                <CardContainer className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold">Headless UI Components</h1>
                  <p className="text-base text-gray-600">
                    tucu-ui extends Headless UI components with additional
                    styling and functionality. These components provide
                    accessible, unstyled building blocks that you can customize
                    to match your design system.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                    <h3 className="font-bold mb-2">Headless UI Components</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>
                        <strong>Dialog/Modal:</strong> Accessible dialog windows
                      </li>
                      <li>
                        <strong>Disclosure:</strong> Expandable/collapsible
                        sections
                      </li>
                      <li>
                        <strong>Dropdown:</strong> Custom dropdown menus
                      </li>
                      <li>
                        <strong>Listbox:</strong> Enhanced select components
                      </li>
                      <li>
                        <strong>Switch:</strong> Toggle switches
                      </li>
                      <li>
                        <strong>Tabs:</strong> Tabbed interfaces
                      </li>
                      <li>
                        <strong>Transition:</strong> Animated transitions
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-2">
                    See Headless UI Documentation
                  </Button>
                </CardContainer>
              ),
            },
            {
              name: 'Layout',
              href: '/components/layout',
              icon: <RetroLayoutIcon />,
              component: (
                <CardContainer className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold">Layout Components</h1>
                  <p className="text-base text-gray-600">
                    tucu-ui provides layout components to structure your
                    application. These include containers, cards, drawers,
                    sidebars, and more.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                    <h3 className="font-bold mb-2">Layout Options</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>
                        <strong>Classic:</strong> Traditional layout with
                        sidebar and header
                      </li>
                      <li>
                        <strong>Minimal:</strong> Clean layout with minimal
                        chrome
                      </li>
                      <li>
                        <strong>Custom:</strong> Build your own layout with
                        layout components
                      </li>
                      <li>
                        <strong>Responsive:</strong> All layouts are
                        mobile-friendly
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-2">
                    See Layout Documentation
                  </Button>
                </CardContainer>
              ),
            },
          ],
        },
        {
          name: 'Theming',
          href: '/theming',
          icon: <StarFill />,
          component: (
            <CardContainer className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Theming System</h1>
              <p className="text-base text-gray-600">
                tucu-ui includes a powerful theming system built on Tailwind
                CSS. You can customize colors, typography, spacing, and more to
                match your brand. The theme provider component makes it easy to
                switch between themes and manage settings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Theme Features</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>Light and dark mode support</li>
                    <li>Custom color presets</li>
                    <li>RTL/LTR direction support</li>
                    <li>Layout customization</li>
                    <li>Settings persistence via local storage</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Theme Configuration</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>Tailwind CSS configuration</li>
                    <li>Custom CSS variables</li>
                    <li>Zustand state management</li>
                    <li>Theme provider component</li>
                    <li>Settings UI components</li>
                  </ul>
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                <h3 className="font-bold mb-2">Display Mode</h3>
                <p className="text-sm text-gray-600 mb-2">
                  tucu-ui supports both light and dark modes out of the box. The
                  mode setting controls the color scheme of your application and
                  automatically applies the appropriate styles to all
                  components.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-sm mb-1">Light Mode</h4>
                    <p className="text-xs text-gray-500">
                      Default bright theme with light backgrounds and dark text.
                      Ideal for daytime use and standard applications.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <h4 className="font-medium text-sm mb-1 text-white">
                      Dark Mode
                    </h4>
                    <p className="text-xs text-gray-400">
                      Reduced brightness theme with dark backgrounds and light
                      text. Perfect for low-light environments and reducing eye
                      strain.
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    Mode is toggled via the theme settings and persisted in
                    local storage. The system automatically adds the appropriate
                    class to the HTML tag:
                  </p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs overflow-auto">
                    {`// In the useTheme hook
  if (mode === 'dark') {
    htmlTag.classList.remove('light');
    htmlTag.classList.add('dark');
  } else {
    htmlTag.classList.remove('dark');
    htmlTag.classList.add('light');
  }`}
                  </pre>
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                <h3 className="font-bold mb-2">Text Direction</h3>
                <p className="text-sm text-gray-600 mb-2">
                  tucu-ui provides built-in support for both Left-to-Right (LTR)
                  and Right-to-Left (RTL) text directions, making it suitable
                  for multilingual applications and international audiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-sm mb-1">
                      LTR (Left-to-Right)
                    </h4>
                    <p className="text-xs text-gray-500">
                      Standard direction for Latin-based languages like English,
                      Spanish, and French. Text flows from left to right.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-sm mb-1">
                      RTL (Right-to-Left)
                    </h4>
                    <p className="text-xs text-gray-500">
                      Direction for languages like Arabic, Hebrew, and Persian.
                      Text flows from right to left, and UI elements are
                      mirrored.
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    Direction is managed through the theme settings and
                    automatically applies the appropriate styles and layout
                    adjustments to all components.
                  </p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs overflow-auto">
                    {`// Example of setting direction
  const { setDirection } = useTheme();
  setDirection('rtl'); // or 'ltr'`}
                  </pre>
                </div>
              </div>
              <Button className="w-full mt-2">Learn About Theming</Button>
            </CardContainer>
          ),
          dropdownItems: [
            {
              name: 'Theme Provider',
              href: '/theming/provider',
              icon: <Verified />,
              component: (
                <CardContainer className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold">Theme Provider</h1>
                  <p className="text-base text-gray-600">
                    The ThemeProvider component is the core of tucu-ui's theming
                    system. It manages theme settings, provides context to child
                    components, and handles routing.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                    <h3 className="font-bold mb-2">Provider Features</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>
                        <strong>Theme Settings:</strong> Mode, layout,
                        direction, color preset
                      </li>
                      <li>
                        <strong>Routing:</strong> Built-in React Router
                        integration
                      </li>
                      <li>
                        <strong>Persistence:</strong> Settings stored in local
                        storage
                      </li>
                      <li>
                        <strong>Settings UI:</strong> Optional settings
                        drawer/button
                      </li>
                      <li>
                        <strong>Customization:</strong> Disable specific
                        settings
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-2">
                    <pre className="text-xs overflow-auto">
                      {`<ThemeProvider
    menuItems={menuItems}
    logo={logo}
    showSettings={true}
    brandColor="Blue"
    layout="minimal"
  />`}
                    </pre>
                  </div>
                  <Button className="w-full mt-2">
                    Theme Provider Documentation
                  </Button>
                </CardContainer>
              ),
            },
            {
              name: 'Color System',
              href: '/theming/colors',
              icon: <EyeIcon />,
              component: (
                <CardContainer className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold">Color System</h1>
                  <p className="text-base text-gray-600">
                    tucu-ui's color system is built on Tailwind CSS with custom
                    color presets. You can choose from predefined color schemes
                    or create your own.
                  </p>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                    <h3 className="font-bold mb-2">Color Features</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-500">
                      <li>
                        <strong>Presets:</strong> Green, Black, Blue, Red,
                        Purple, Orange
                      </li>
                      <li>
                        <strong>Dark Mode:</strong> Automatic dark variants
                      </li>
                      <li>
                        <strong>CSS Variables:</strong> --color-brand for theme
                        color
                      </li>
                      <li>
                        <strong>Accessibility:</strong> WCAG compliant contrast
                        ratios
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="w-8 h-8 bg-brand rounded-full"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                  </div>
                  <Button className="w-full mt-2">
                    Color System Documentation
                  </Button>
                </CardContainer>
              ),
            },
          ],
        },
        {
          name: 'Routing',
          href: '/routing',
          icon: <ArrowLinkIcon />,
          component: (
            <CardContainer className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Routing System</h1>
              <p className="text-base text-gray-600">
                tucu-ui includes a built-in routing system based on React Router
                DOM. The ThemeProvider component automatically sets up routes
                based on your menu configuration, making it easy to create
                multi-page applications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Routing Features</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>React Router DOM integration</li>
                    <li>Automatic route generation from menu items</li>
                    <li>Nested routes for dropdown menus</li>
                    <li>404 page handling</li>
                    <li>Optional custom routes</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Menu Configuration</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>Name and href properties</li>
                    <li>Optional icon</li>
                    <li>Component for route content</li>
                    <li>Nested dropdownItems</li>
                    <li>Hide option for menu items</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-2">
                <pre className="text-xs overflow-auto">
                  {`// Menu item structure
  {
    name: 'Home',
    href: '/',
    icon: <HomeIcon />,
    component: <HomePage />,
    dropdownItems: [
      {
        name: 'Submenu',
        href: '/submenu',
        component: <SubPage />
      }
    ]
  }`}
                </pre>
              </div>
              <Button className="w-full mt-2">Routing Documentation</Button>
            </CardContainer>
          ),
        },
        {
          name: 'Getting Started',
          href: '/getting-started',
          icon: <PlayIcon />,
          component: (
            <CardContainer className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">
                Getting Started with tucu-ui
              </h1>
              <p className="text-base text-gray-600">
                Learn how to install and set up tucu-ui in your React project.
                This guide covers installation, configuration, and basic usage
                to help you get up and running quickly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
                    <code className="text-xs">npm install tucu-ui</code>
                  </div>
                  <p className="text-xs mt-2">Or with yarn:</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                    <code className="text-xs">yarn add tucu-ui</code>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    <li>React 18 or higher</li>
                    <li>React DOM 18 or higher</li>
                    <li>Tailwind CSS 4.0 or higher</li>
                    <li>Node.js 16 or higher</li>
                  </ul>
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                <h3 className="font-bold mb-2">Basic Setup</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
                  <pre className="text-xs overflow-auto">
                    {`import { ThemeProvider } from 'tucu-ui';
  import 'tucu-ui/styles';
  
  function App() {
    return (
      <ThemeProvider
        menuItems={[
          {
            name: 'Home',
            href: '/',
            component: <HomePage />
          }
        ]}
      />
    );
  }`}
                  </pre>
                </div>
              </div>
              <Button className="w-full mt-2">
                Read Getting Started Guide
              </Button>
            </CardContainer>
          ),
        },
      ]}
    />
  );
}

export default Layout;
