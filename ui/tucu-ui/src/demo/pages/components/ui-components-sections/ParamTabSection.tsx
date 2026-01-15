import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
} from '../../../../index';
import { ParamTab, TabPanel } from '../../../../components/tabs';
import { Home, Settings, User, BarChart, FileText, Bell } from 'lucide-react';

const ParamTabSection: React.FC = () => {
  const basicTabMenu = [
    { title: 'Overview', path: 'overview' },
    { title: 'Details', path: 'details' },
    { title: 'Settings', path: 'settings' },
  ];

  const iconTabMenu = [
    {
      title: 'Dashboard',
      path: 'dashboard',
      icon: <Home size={16} />,
    },
    {
      title: 'Analytics',
      path: 'analytics',
      icon: <BarChart size={16} />,
    },
    {
      title: 'Reports',
      path: 'reports',
      icon: <FileText size={16} />,
    },
    {
      title: 'Settings',
      path: 'settings',
      icon: <Settings size={16} />,
    },
  ];

  const profileTabMenu = [
    {
      title: 'Profile',
      path: 'profile',
      icon: <User size={16} />,
    },
    {
      title: 'Notifications',
      path: 'notifications',
      icon: <Bell size={16} />,
    },
    {
      title: 'Settings',
      path: 'settings',
      icon: <Settings size={16} />,
    },
  ];

  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'tabMenu',
      type: 'TabMenuItem[]',
      default: 'required',
      description:
        'Array of tab menu items with title, path, and optional icon',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: 'required',
      description: 'TabPanel components for each tab content',
    },
    {
      prop: 'variant',
      type: "'underline' | 'pills' | 'bordered' | 'solid'",
      default: "'underline'",
      description: 'Visual style variant of the tabs',
    },
    {
      prop: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Size of the tab items',
    },
    {
      prop: 'tabListClassName',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes for tab list container',
    },
    {
      prop: 'showMobileSelect',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show TabSelect on mobile devices',
    },
  ];

  const interfaceData = [
    {
      prop: 'title',
      type: 'React.ReactNode',
      default: 'required',
      description: 'Tab label (can be text, JSX, or components)',
    },
    {
      prop: 'path',
      type: 'string',
      default: 'required',
      description: 'Unique path for URL parameter (e.g., "overview")',
    },
    {
      prop: 'icon',
      type: 'React.ReactNode',
      default: '-',
      description: 'Optional icon to display before tab label',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          ParamTab
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A powerful tab component that automatically syncs with URL query
          parameters and switches to a dropdown selector on mobile devices for
          optimal responsive behavior.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-8">
              <div>
                <Typography tag="h5" className="mb-3">
                  Underline Variant (Default)
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  Classic underline style with animated indicator. URL syncs
                  with ?view=overview, ?view=details, etc.
                </Typography>
                <ParamTab tabMenu={basicTabMenu} variant="underline">
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="h3"
                        className="text-xl font-semibold mb-2"
                      >
                        Overview Dashboard
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Main dashboard content with key metrics and overview
                        information. The URL parameter updates to ?view=overview
                        when this tab is active.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="h3"
                        className="text-xl font-semibold mb-2"
                      >
                        Detailed Information
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Comprehensive details and in-depth analysis. URL
                        parameter: ?view=details
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="h3"
                        className="text-xl font-semibold mb-2"
                      >
                        Configuration Settings
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Manage your preferences and application settings. URL
                        parameter: ?view=settings
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                </ParamTab>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Pills Variant with Icons
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  Modern rounded pills with icon support for enhanced visual
                  clarity.
                </Typography>
                <ParamTab tabMenu={iconTabMenu} variant="pills" size="medium">
                  <TabPanel>
                    <CardContainer className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Home className="text-brand" size={24} />
                        <Typography tag="h3" className="text-xl font-semibold">
                          Dashboard Home
                        </Typography>
                      </div>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Welcome to your dashboard! Here you'll find a summary of
                        your most important information.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <BarChart className="text-brand" size={24} />
                        <Typography tag="h3" className="text-xl font-semibold">
                          Analytics Overview
                        </Typography>
                      </div>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Track your performance with detailed analytics and
                        insights.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="text-brand" size={24} />
                        <Typography tag="h3" className="text-xl font-semibold">
                          Reports Center
                        </Typography>
                      </div>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Generate and view comprehensive reports for your data.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Settings className="text-brand" size={24} />
                        <Typography tag="h3" className="text-xl font-semibold">
                          Application Settings
                        </Typography>
                      </div>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Customize your application preferences and
                        configuration.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                </ParamTab>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Bordered Variant
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  Distinct bordered style with highlighted selection state.
                </Typography>
                <ParamTab tabMenu={profileTabMenu} variant="bordered">
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="h3"
                        className="text-xl font-semibold mb-2"
                      >
                        User Profile
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Manage your personal information and profile settings.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="h3"
                        className="text-xl font-semibold mb-2"
                      >
                        Notifications
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Configure how and when you receive notifications.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="h3"
                        className="text-xl font-semibold mb-2"
                      >
                        Account Settings
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Manage your account security and privacy settings.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                </ParamTab>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Solid Variant (Small Size)
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  Compact solid background style perfect for space-constrained
                  layouts.
                </Typography>
                <ParamTab tabMenu={basicTabMenu} variant="solid" size="small">
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Compact overview content with small tab size.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Detailed information in a compact format.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                  <TabPanel>
                    <CardContainer className="p-6">
                      <Typography
                        tag="p"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Settings panel with space-efficient design.
                      </Typography>
                    </CardContainer>
                  </TabPanel>
                </ParamTab>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Key Features" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="link">
                    🔗
                  </span>{' '}
                  URL Synchronization
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Automatically syncs tab state with URL query parameters (e.g.,
                  ?view=overview). This enables:
                </Typography>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>Deep linking to specific tabs</li>
                  <li>Browser back/forward navigation</li>
                  <li>Shareable URLs with selected tab state</li>
                  <li>Bookmark support for specific views</li>
                </ul>
              </div>

              <div>
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="mobile">
                    📱
                  </span>{' '}
                  Responsive Mobile Adaptation
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Automatically switches to TabSelect dropdown on mobile devices
                  (xs, sm breakpoints) for optimal space usage and better UX.
                </Typography>
                <CardContainer className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <Typography tag="p" className="text-sm">
                    <span role="img" aria-label="tip">
                      💡
                    </span>{' '}
                    <span className="font-semibold">Tip:</span> Resize your
                    browser window to see the automatic switch between tab bar
                    and dropdown selector!
                  </Typography>
                </CardContainer>
              </div>

              <div>
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="styles">
                    🎨
                  </span>{' '}
                  Multiple Style Variants
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Choose from 4 distinct visual styles (underline, pills,
                  bordered, solid) and 3 sizes (small, medium, large) to match
                  your design system.
                </Typography>
              </div>

              <div>
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="icons">
                    ✨
                  </span>{' '}
                  Icon Support
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Add icons to tabs for better visual communication and improved
                  scannability. Works seamlessly with Lucide Icons.
                </Typography>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="TabMenuItem Interface" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={interfaceData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { ParamTab, TabPanel } from '@e-burgos/tucu-ui';
import { Home, Settings, User } from 'lucide-react';

// Basic usage with URL sync
function BasicExample() {
const tabMenu = [
  { title: 'Overview', path: 'overview' },
  { title: 'Details', path: 'details' },
  { title: 'Settings', path: 'settings' },
];

  return (
<ParamTab tabMenu={tabMenu}>
  <TabPanel>
    <div>Overview content</div>
  </TabPanel>
  <TabPanel>
    <div>Details content</div>
  </TabPanel>
  <TabPanel>
    <div>Settings content</div>
  </TabPanel>
</ParamTab>
  );
}

// Pills variant with icons
function PillsWithIcons() {
  const tabMenu = [
    {
      title: 'Dashboard',
      path: 'dashboard',
      icon: <Home size={16} />,
    },
    {
      title: 'Profile',
      path: 'profile',
      icon: <User size={16} />,
    },
    {
      title: 'Settings',
      path: 'settings',
      icon: <Settings size={16} />,
    },
  ];

  return (
    <ParamTab tabMenu={tabMenu} variant="pills" size="medium">
      <TabPanel>Dashboard content</TabPanel>
      <TabPanel>Profile content</TabPanel>
      <TabPanel>Settings content</TabPanel>
    </ParamTab>
  );
}

// Bordered variant
function BorderedExample() {
  const tabMenu = [
    { title: 'Tab 1', path: 'tab1' },
    { title: 'Tab 2', path: 'tab2' },
  ];

  return (
    <ParamTab tabMenu={tabMenu} variant="bordered">
      <TabPanel>Content 1</TabPanel>
      <TabPanel>Content 2</TabPanel>
    </ParamTab>
  );
}

// Solid variant with small size
function CompactExample() {
  const tabMenu = [
    { title: 'View 1', path: 'view1' },
    { title: 'View 2', path: 'view2' },
  ];

  return (
    <ParamTab tabMenu={tabMenu} variant="solid" size="small">
      <TabPanel>Compact content 1</TabPanel>
      <TabPanel>Compact content 2</TabPanel>
    </ParamTab>
  );
}

// How it works:
// 1. Component reads current URL parameter (?view=overview)
// 2. Matches it with tabMenu path to set active tab
// 3. When user clicks tab, URL updates automatically
// 4. On mobile (xs, sm), shows TabSelect dropdown
// 5. On desktop, shows regular tab bar
// 6. Browser back/forward buttons work seamlessly`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ParamTabSection;
