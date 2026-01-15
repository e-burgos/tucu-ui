import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
} from '../../../../index';
import { TabSelect } from '../../../../components/tabs';
import { Home, Settings, User } from 'lucide-react';

const TabSelectSection: React.FC = () => {
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [selectedIndex3, setSelectedIndex3] = useState(0);

  const basicTabMenu = [
    { title: 'Dashboard', path: 'dashboard' },
    { title: 'Analytics', path: 'analytics' },
    { title: 'Reports', path: 'reports' },
    { title: 'Settings', path: 'settings' },
  ];

  const iconTabMenu = [
    {
      title: (
        <span className="flex items-center gap-2">
          <Home size={16} />
          Home
        </span>
      ),
      path: 'home',
    },
    {
      title: (
        <span className="flex items-center gap-2">
          <User size={16} />
          Profile
        </span>
      ),
      path: 'profile',
    },
    {
      title: (
        <span className="flex items-center gap-2">
          <Settings size={16} />
          Settings
        </span>
      ),
      path: 'settings',
    },
  ];

  const manyOptionsMenu = [
    { title: 'Orders', path: 'orders' },
    { title: 'Products', path: 'products' },
    { title: 'Customers', path: 'customers' },
    { title: 'Analytics', path: 'analytics' },
    { title: 'Marketing', path: 'marketing' },
    { title: 'Reports', path: 'reports' },
    { title: 'Integrations', path: 'integrations' },
    { title: 'Settings', path: 'settings' },
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
      type: 'TabSelectMenuItem[]',
      default: 'required',
      description: 'Array of menu items with title and path',
    },
    {
      prop: 'selectedTabIndex',
      type: 'number',
      default: 'required',
      description: 'Currently selected tab index (0-based)',
    },
    {
      prop: 'onChange',
      type: '(index: number) => void',
      default: 'required',
      description: 'Callback function when tab selection changes',
    },
    {
      prop: 'ref',
      type: 'React.Ref<HTMLElement | null>',
      default: '-',
      description: 'Forward ref to the select element',
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
      description: 'Unique identifier/route path for the tab',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          TabSelect
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A mobile-friendly dropdown tab selector with smooth animations and
          transitions, designed for responsive tab navigation in constrained
          spaces.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-8">
              <div>
                <Typography tag="h5" className="mb-3">
                  Basic TabSelect
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  Standard dropdown selector with text options. Click to expand
                  and select a tab.
                </Typography>
                <div className="max-w-md">
                  <TabSelect
                    tabMenu={basicTabMenu}
                    selectedTabIndex={selectedIndex1}
                    onChange={setSelectedIndex1}
                  />
                </div>
                <div className="mt-4 p-4 bg-light-dark rounded-lg">
                  <Typography tag="p" className="text-sm">
                    Selected:{' '}
                    <span className="font-semibold text-brand">
                      {basicTabMenu[selectedIndex1].title}
                    </span>
                  </Typography>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  With Icons
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  Enhanced dropdown with icon support for better visual clarity.
                </Typography>
                <div className="max-w-md">
                  <TabSelect
                    tabMenu={iconTabMenu}
                    selectedTabIndex={selectedIndex2}
                    onChange={setSelectedIndex2}
                  />
                </div>
                <div className="mt-4 p-4 bg-light-dark rounded-lg">
                  <Typography tag="p" className="text-sm">
                    Current selection:{' '}
                    <span className="font-semibold text-brand">
                      {iconTabMenu[selectedIndex2].path}
                    </span>
                  </Typography>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Many Options
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                >
                  Handles large lists efficiently with scrollable dropdown.
                </Typography>
                <div className="max-w-md">
                  <TabSelect
                    tabMenu={manyOptionsMenu}
                    selectedTabIndex={selectedIndex3}
                    onChange={setSelectedIndex3}
                  />
                </div>
                <div className="mt-4 p-4 bg-light-dark rounded-lg">
                  <Typography tag="p" className="text-sm">
                    Selected option:{' '}
                    <span className="font-semibold text-brand">
                      {manyOptionsMenu[selectedIndex3].title}
                    </span>{' '}
                    ({selectedIndex3 + 1} of {manyOptionsMenu.length})
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Use Cases" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-2">
                  Mobile Navigation
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Perfect for replacing horizontal tab bars on mobile devices
                  where space is limited.
                  <code className="ml-1 text-xs border border-gray-300 dark:border-gray-600 px-2 py-1 rounded">
                    ParamTab
                  </code>{' '}
                  automatically switches to TabSelect on mobile breakpoints.
                </Typography>
                <CardContainer className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <Typography tag="p" className="text-sm">
                    <span role="img" aria-label="tip">
                      💡
                    </span>{' '}
                    <span className="font-semibold">Tip:</span> Use TabSelect
                    when you have 4+ tabs and limited horizontal space.
                  </Typography>
                </CardContainer>
              </div>

              <div>
                <Typography tag="h5" className="mb-2">
                  Form Filters
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Use as a filter selector in forms and data tables to switch
                  between different views or data categories.
                </Typography>
              </div>

              <div>
                <Typography tag="h5" className="mb-2">
                  Settings Panels
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Navigate between different settings sections in a compact,
                  accessible dropdown format.
                </Typography>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Features" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="palette">
                    🎨
                  </span>{' '}
                  Smooth Animations
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Chevron rotation and dropdown transitions with translate-y
                  effects.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="moon">
                    🌙
                  </span>{' '}
                  Dark Mode
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Full dark mode support with automatic theme adaptation.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="lightning">
                    ⚡
                  </span>{' '}
                  Performance
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Optimized rendering with proper key management for large
                  lists.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="target">
                    🎯
                  </span>{' '}
                  Accessibility
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Keyboard navigation and focus management built-in.
                </Typography>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="TabSelectMenuItem Interface" className="mt-2 mb-2">
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
              code={`import { TabSelect } from '@e-burgos/tucu-ui';
import { useState } from 'react';
import { Home, Settings, User } from 'lucide-react';

// Basic usage
function BasicExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabMenu = [
    { title: 'Dashboard', path: 'dashboard' },
    { title: 'Analytics', path: 'analytics' },
    { title: 'Reports', path: 'reports' },
    { title: 'Settings', path: 'settings' },
  ];

  return (
    <TabSelect
      tabMenu={tabMenu}
      selectedTabIndex={selectedIndex}
      onChange={setSelectedIndex}
    />
  );
}

// With icons
function IconExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabMenu = [
    { 
      title: (
        <span className="flex items-center gap-2">
          <Home size={16} />
          Home
        </span>
      ), 
      path: 'home' 
    },
    { 
      title: (
        <span className="flex items-center gap-2">
          <User size={16} />
          Profile
        </span>
      ), 
      path: 'profile' 
    },
  ];

  return (
    <TabSelect
      tabMenu={tabMenu}
      selectedTabIndex={selectedIndex}
      onChange={setSelectedIndex}
    />
  );
}

// Integration with ParamTab
// ParamTab automatically uses TabSelect on mobile devices
import { ParamTab, TabPanel } from '@e-burgos/tucu-ui';

function ResponsiveTabs() {
  const tabMenu = [
    { title: 'Overview', path: 'overview' },
    { title: 'Details', path: 'details' },
    { title: 'Settings', path: 'settings' },
  ];

  return (
    <ParamTab tabMenu={tabMenu}>
      <TabPanel>Overview content</TabPanel>
      <TabPanel>Details content</TabPanel>
      <TabPanel>Settings content</TabPanel>
    </ParamTab>
  );
}

// Custom styling
function CustomExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabMenu = [
    { title: 'Option 1', path: 'opt1' },
    { title: 'Option 2', path: 'opt2' },
  ];

  return (
    <div className="max-w-md">
      <TabSelect
        tabMenu={tabMenu}
        selectedTabIndex={selectedIndex}
        onChange={(index) => {
          console.log('Selected:', tabMenu[index].path);
          setSelectedIndex(index);
        }}
      />
    </div>
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TabSelectSection;
