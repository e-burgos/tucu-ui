import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const RouteConfigurationSection: React.FC = () => {
  const routingStructure = `interface StandaloneAppRoutesMenuItem extends Omit<IMenuItem, 'dropdownItems'> {
  component: JSX.Element;        // The component to render
  dropdownItems?: StandaloneAppRoutesMenuItem[]; // Optional sub-routes
}

interface IMenuItem {
  name: string;                  // Display name for the menu item
  path: string;                  // URL path for the route
  icon?: React.ReactNode;        // Optional icon component
  href?: string;                 // Optional external URL
  hide?: boolean;                 // Hide from navigation
  isActive?: boolean;            // Force active state
  onClick?: () => void;          // Optional click handler
}`;

  const basicUsage = `import { StandaloneAppThemeProvider } from '@e-burgos/tucu-ui';
import { Introduction } from './pages/Introduction';
import { ThemingGuide } from './pages/ThemingGuide';

const menuItems = [
  {
    name: 'Introduction',
    path: '/',
    icon: <LucideIcons.Home />,
    component: <Introduction />,
  },
  {
    name: 'Theming',
    path: '/theming-guide',
    icon: <LucideIcons.Paintbrush />,
    component: <ThemingGuide />,
  },
];

function App() {
  return (
    <StandaloneAppThemeProvider
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
    />
  );
}`;

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="Route Configuration" className="mt-2 mb-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  StandaloneAppRoutesMenuItem Interface
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                For single applications, routes are defined using the{' '}
                <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                  StandaloneAppRoutesMenuItem
                </code>{' '}
                interface which extends{' '}
                <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                  IMenuItem
                </code>
                .
              </Typography>
              <CodeBlock language="typescript" code={routingStructure} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                  <LucideIcons.Play className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Basic Usage
                </Typography>
              </div>
              <CodeBlock language="tsx" code={basicUsage} />
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default RouteConfigurationSection;
