import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Badge, Alert, CodeBlock, BasicTable } from '../../../../index';

const MenuItemsGuideSection: React.FC = () => {
  const menuItemPropsColumns = [
    { key: 'property', label: 'Property' },
    { key: 'type', label: 'Type' },
    { key: 'required', label: 'Required' },
    { key: 'description', label: 'Description' },
  ];

  const menuItemPropsData = [
    {
      property: 'name',
      type: 'string',
      required: 'Yes',
      description: 'Display name of the menu item',
    },
    {
      property: 'path',
      type: 'string',
      required: 'Yes',
      description: (
        <>
          <strong>Internal route path</strong> for React Router navigation
          (e.g., <code>/dashboard</code>). Used for routing and active state
          detection.
        </>
      ),
    },
    {
      property: 'href',
      type: 'string?',
      required: 'No',
      description: (
        <>
          <strong>External URL</strong> for redirection (e.g.,{' '}
          <code>https://example.com</code>). If provided, clicking will redirect
          to this URL instead of using React Router. Falls back to{' '}
          <code>path</code> if not provided.
        </>
      ),
    },
    {
      property: 'component',
      type: 'JSX.Element?',
      required: 'No',
      description: (
        <>
          React component to render when this route is active. Required for
          automatic routing. Not needed if using <code>customRoutes</code>.
        </>
      ),
    },
    {
      property: 'icon',
      type: 'React.ReactNode?',
      required: 'No',
      description:
        'Icon element to display next to the menu item name (typically a Lucide icon)',
    },
    {
      property: 'dropdownItems',
      type: 'DropdownItemProps[]?',
      required: 'No',
      description:
        'Array of sub-menu items for nested navigation. Creates a dropdown menu when provided.',
    },
    {
      property: 'isActive',
      type: 'boolean?',
      required: 'No',
      description:
        'Manually set active state. Usually handled automatically by matching the current pathname.',
    },
    {
      property: 'hide',
      type: 'boolean?',
      required: 'No',
      description:
        'Hide this menu item from navigation (useful for conditional rendering)',
    },
    {
      property: 'onClick',
      type: '() => void?',
      required: 'No',
      description: 'Callback function executed when the menu item is clicked',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          MenuItems Guide
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Complete guide to configuring menu items for navigation and routing
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="MenuItem Properties" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Each menu item is an object with the following properties:
            </Typography>

            <BasicTable
              columns={menuItemPropsColumns.map((col) => ({
                ...col,
                render: (value: unknown, _row: Record<string, unknown>) => {
                  if (col.key === 'property') {
                    return (
                      <code className="text-xs text-brand">
                        {String(value ?? '')}
                      </code>
                    );
                  }
                  if (col.key === 'type') {
                    return (
                      <code className="text-xs text-gray-600 dark:text-gray-400">
                        {String(value ?? '')}
                      </code>
                    );
                  }
                  if (col.key === 'required') {
                    return (
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          value === 'Yes' ? '' : 'bg-gray-200'
                        }`}
                      >
                        {String(value ?? '')}
                      </Badge>
                    );
                  }
                  if (col.key === 'description') {
                    return (
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {value as React.ReactNode}
                      </span>
                    );
                  }
                  return String(value ?? '');
                },
              }))}
              data={menuItemPropsData as Array<Record<string, unknown>>}
              containerClassName="mb-4"
            />

            <Alert variant="info">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <LucideIcons.Info className="h-4 w-4" />
                  Important: path vs href
                </div>
                <div className="text-sm mt-1">
                  <strong>path</strong> is used for internal React Router
                  navigation and active state detection. <strong>href</strong>{' '}
                  is for external URLs (starts with <code>http://</code> or{' '}
                  <code>https://</code>). If both are provided,{' '}
                  <code>href</code> takes precedence for navigation, but{' '}
                  <code>path</code> is still used for active state matching.
                </div>
              </div>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="MenuItems Examples" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  1. Simple Menu Item
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LucideIcons.Home />,
    component: <Dashboard />,
  },
];`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  2. Menu Item with External Link
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`const menuItems = [
  {
    name: 'Documentation',
    path: '/docs', // Used for active state
    href: 'https://docs.example.com', // External URL for navigation
    icon: <LucideIcons.Book />,
    // No component needed for external links
  },
];`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  3. Menu Item with Dropdown
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`const menuItems = [
  {
    name: 'Design System',
    path: '/design-system',
    icon: <LucideIcons.Palette />,
    component: <DesignSystem />,
    dropdownItems: [
      {
        name: 'Layout',
        path: '/design-system/layout',
        icon: <LucideIcons.Layout />,
        component: <LayoutSystem />,
      },
      {
        name: 'Theming',
        path: '/design-system/theming',
        icon: <LucideIcons.Paintbrush />,
        component: <ThemingGuide />,
      },
    ],
  },
];`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  4. Complete Example with All Features
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { LucideIcons } from '@ui/tucu-ui';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <Dashboard />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <LucideIcons.Settings />,
    component: <Settings />,
    dropdownItems: [
      {
        name: 'General',
        path: '/settings/general',
        component: <GeneralSettings />,
      },
      {
        name: 'Profile',
        path: '/settings/profile',
        component: <Profile />,
      },
    ],
  },
  {
    name: 'Documentation',
    path: '/docs',
    href: 'https://docs.example.com', // External link
    icon: <LucideIcons.Book />,
  },
  {
    name: 'Help',
    path: '/help',
    icon: <LucideIcons.HelpCircle />,
    component: <Help />,
    onClick: () => {
      console.log('Help clicked');
      // Custom click handler
    },
  },
  {
    name: 'Hidden Item',
    path: '/hidden',
    component: <HiddenPage />,
    hide: true, // Hidden from menu but route still works
  },
];

function App() {
  return (
    <ThemeProvider menuItems={menuItems} layout={LAYOUT_OPTIONS.ADMIN} />
  );
}`}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  5. Conditional Menu Items
                </Typography>
                <CodeBlock
                  language="tsx"
                  code={`import { useAuth } from './hooks/useAuth';

function App() {
  const { isAdmin, isAuthenticated } = useAuth();

  const menuItems = [
    {
      name: 'Home',
      path: '/',
      icon: <LucideIcons.Home />,
      component: <Home />,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LucideIcons.LayoutDashboard />,
      component: <Dashboard />,
      hide: !isAuthenticated, // Hide if not authenticated
    },
    {
      name: 'Admin Panel',
      path: '/admin',
      icon: <LucideIcons.Shield />,
      component: <AdminPanel />,
      hide: !isAdmin, // Hide if not admin
    },
  ].filter((item) => !item.hide); // Filter out hidden items

  return (
    <ThemeProvider menuItems={menuItems} layout={LAYOUT_OPTIONS.ADMIN} />
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

export default MenuItemsGuideSection;

