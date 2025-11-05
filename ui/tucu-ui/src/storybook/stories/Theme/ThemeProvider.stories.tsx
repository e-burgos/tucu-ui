/* eslint-disable jsx-a11y/accessible-emoji */
import type { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from '../../../themes/components/theme-provider';
import React from 'react';
import Button from '../../../components/buttons';
import { Home, MonitorIcon, SettingsIcon } from 'lucide-react';
import { CardContainer } from '../../../components';

const meta: Meta<typeof ThemeProvider> = {
  title: '2. THEME PROVIDER/ThemeProvider',
  tags: ['autodocs'],
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component:
          'The ThemeProvider component is a versatile and customizable button that supports various shapes, sizes, variants, and colors. It includes loading states, animations, and tooltip support.',
      },
    },
  },
  argTypes: {
    layout: {
      control: {
        type: 'select',
        options: ['classic', 'none', 'minimal'],
      },
    },
    rightButton: {
      control: {
        type: 'object',
      },
    },
    logo: {
      control: {
        type: 'object',
      },
    },
    brandColor: {
      control: {
        type: 'select',
        options: ['Green', 'Black', 'Blue', 'Red', 'Purple', 'Orange'],
      },
    },
    showSettings: {
      control: {
        type: 'boolean',
      },
    },
    settingActions: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    menuItems: [
      {
        name: 'Story',
        href: '*',
        icon: <Home />,
        hide: true,
        component: (
          <CardContainer className="flex flex-col gap-6 p-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-brand mb-2">
                Welcome to Tucu UI
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your complete React component library with automatic layout
                generation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🎨 Auto Layout</h3>
                <p className="text-sm opacity-90">
                  Complete app layouts with minimal configuration
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">📝 Form System</h3>
                <p className="text-sm opacity-90">
                  Advanced validation with React Hook Form
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🪙 Blockchain Ready</h3>
                <p className="text-sm opacity-90">
                  Specialized components for DeFi apps
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                ThemeProvider Capabilities
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Automatic routing with React Router</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Dark/Light mode with persistence</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>26+ color presets and custom palettes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Responsive layouts (Classic, Minimal, None)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>RTL language support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Built-in settings panel</span>
                </li>
              </ul>
            </div>
          </CardContainer>
        ),
      },
      {
        name: 'Dashboard',
        href: '/',
        icon: <Home />,
        component: (
          <CardContainer className="flex flex-col gap-6 p-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-brand mb-2">
                Welcome to Tucu UI
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your complete React component library with automatic layout
                generation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🎨 Auto Layout</h3>
                <p className="text-sm opacity-90">
                  Complete app layouts with minimal configuration
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">📝 Form System</h3>
                <p className="text-sm opacity-90">
                  Advanced validation with React Hook Form
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🪙 Blockchain Ready</h3>
                <p className="text-sm opacity-90">
                  Specialized components for DeFi apps
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                ThemeProvider Capabilities
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Automatic routing with React Router</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Dark/Light mode with persistence</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>26+ color presets and custom palettes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Responsive layouts (Classic, Minimal, None)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>RTL language support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Built-in settings panel</span>
                </li>
              </ul>
            </div>
          </CardContainer>
        ),
      },
      {
        name: 'Theme Demo',
        href: '/theme-demo',
        icon: <MonitorIcon />,
        component: (
          <CardContainer className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">Theme System Demo</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Color Palette</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="w-full h-12 bg-brand rounded mb-1"></div>
                    <span className="text-xs">Brand</span>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 bg-secondary rounded mb-1"></div>
                    <span className="text-xs">Secondary</span>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 bg-accent rounded mb-1"></div>
                    <span className="text-xs">Accent</span>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 bg-success rounded mb-1"></div>
                    <span className="text-xs">Success</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interactive Elements</h3>
                <div className="space-y-3">
                  <Button variant="solid" size="small">
                    Primary Button
                  </Button>
                  <Button variant="solid" size="small">
                    Secondary Button
                  </Button>
                  <Button variant="ghost" size="small">
                    Ghost Button
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 ThemeProvider Features
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This demo showcases how the ThemeProvider automatically handles
                theming, routing, and layout management. Try switching between
                light/dark modes and different layouts using the settings panel!
              </p>
            </div>
          </CardContainer>
        ),
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: <SettingsIcon />,
        dropdownItems: [
          {
            name: 'First Child',
            href: '/settings/1',
            icon: <SettingsIcon />,
            component: <div>First Child</div>,
          },
          {
            name: 'Second Child',
            href: '/settings/2',
            icon: <SettingsIcon />,
            component: <div>Second Child</div>,
          },
        ],
        component: (
          <CardContainer className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-bold">Settings & Configuration</h1>

            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-3">
                  ThemeProvider Configuration
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Layout:</span>
                    <span className="font-mono text-brand">Minimal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span className="font-mono text-brand">System</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brand Color:</span>
                    <span className="font-mono text-brand">Bufus Blue</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RTL Support:</span>
                    <span className="font-mono text-brand">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Available Layout Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h4 className="font-medium">Classic</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Fixed sidebar navigation
                    </p>
                  </div>
                  <div className="text-center p-3 bg-brand/10 border-2 border-brand rounded">
                    <h4 className="font-medium text-brand">Minimal</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Horizontal navigation
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <h4 className="font-medium">None</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      No predefined layout
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                ⚙️ Built-in Settings Panel
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Use the settings button in the top-right corner to customize
                colors, layouts, and other theme options. All changes are
                automatically saved to localStorage!
              </p>
            </div>
          </CardContainer>
        ),
      },
    ],
    rightButton: <Button>Right Button</Button>,
    logo: {
      name: 'Tucu',
      secondName: 'UI',
    },
    showSettings: true,
    settingActions: {
      disabledMode: false,
      disabledLayout: false,
      disabledDirection: false,
      disabledPreset: false,
    },
    customRoutes: undefined,
    withRouterProvider: true,
  },
};

export default meta;

const Template: StoryFn<typeof ThemeProvider> = (args) => (
  <ThemeProvider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  layout: 'minimal',
  className: 'min-h-screen',
};

export const NoneLayout = Template.bind({});
NoneLayout.args = {
  layout: 'none',
  className: 'p-4',
};

export const ClassicLayout = Template.bind({});
ClassicLayout.args = {
  layout: 'classic',
};

export const MinimalLayout = Template.bind({});
MinimalLayout.args = {
  layout: 'minimal',
};
