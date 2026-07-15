import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const RouteConfigurationSection: React.FC = () => {
  const routingStructure = `interface StandaloneAppRoutesMenuItem extends Omit<IMenuItem, 'dropdownItems'> {
  component: React.JSX.Element;    // The component to render
  isPublic?: boolean;              // If true, accessible without authentication
  enableNestedRoutes?: boolean;    // Adds /* to path for nested routing
  dropdownItems?: StandaloneAppRoutesMenuItem[]; // Nested sub-routes
}

interface IMenuItem {
  name: string;                    // Display name for the menu item
  path: string;                    // URL path for the route
  icon?: React.ReactNode;          // Optional icon component
  href?: string;                   // Optional external URL
  hide?: boolean;                  // Hide from navigation menu
  isActive?: boolean;              // Force active state
  onClick?: () => void;            // Optional click handler
}`;

  const basicUsage = `import { ThemeProvider } from '@e-burgos/tucu-ui';
import { Introduction } from './pages/Introduction';
import { ThemingGuide } from './pages/ThemingGuide';

const menuItems: StandaloneAppRoutesMenuItem[] = [
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
    <ThemeProvider
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
    />
  );
}`;

  return (
    <>
      <HeroCard
        title="Route Configuration"
        description="Define routes using the StandaloneAppRoutesMenuItem interface. Each menu item automatically becomes a navigable route with sidebar entry."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Settings className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            StandaloneAppRoutesMenuItem Interface
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Type-safe route definition extending IMenuItem
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Interface Definition">
            <CodeBlock language="TS" code={routingStructure} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Basic Usage
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Simple standalone app with automatic route generation
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="ThemeProvider with menuItems">
            <CodeBlock language="tsx" code={basicUsage} />
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default RouteConfigurationSection;
