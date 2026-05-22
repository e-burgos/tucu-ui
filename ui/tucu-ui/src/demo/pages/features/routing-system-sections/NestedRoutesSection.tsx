import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
} from '../../../../index';

const NestedRoutesSection: React.FC = () => {
  const nestedRoutes = `import { ThemeProvider, StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';

const menuItems: StandaloneAppRoutesMenuItem[] = [
  {
    name: 'Components',
    path: '/components',
    icon: <LucideIcons.Component />,
    component: <ComponentsPage />,
    enableNestedRoutes: true, // Adds /* to path for nested routing
    dropdownItems: [
      {
        name: 'Buttons',
        path: '/components/buttons',
        icon: <LucideIcons.MousePointerClick />,
        component: <ButtonsPage />,
      },
      {
        name: 'Forms',
        path: '/components/forms',
        icon: <LucideIcons.FileText />,
        component: <FormsPage />,
      },
    ],
  },
  {
    name: 'Utilities',
    path: '/utilities',
    icon: <LucideIcons.Wrench />,
    component: <UtilitiesPage />,
    dropdownItems: [
      {
        name: 'Hooks',
        path: '/utilities/hooks',
        icon: <LucideIcons.Zap />,
        component: <HooksPage />,
      },
    ],
  },
];`;

  return (
    <>
      <HeroCard
        title="Nested Routes"
        description="Create hierarchical navigation with unlimited nesting levels. Each menu item supports dropdownItems that automatically render as sidebar dropdown menus."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Layers3 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Nested Routes Example
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Parent routes with dropdownItems generate hierarchical navigation
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Configuration">
            <CodeBlock language="tsx" code={nestedRoutes} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Navigation Structure
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Visual representation of the generated sidebar
          </Typography>
        </div>
        <CardContainer>
          <div className="space-y-3 p-4">
            <div className="p-3 bg-light-dark rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <LucideIcons.Component className="w-3 h-3 text-white filter drop-shadow-sm" />
                </div>
                <span className="font-medium">Components</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.MousePointerClick className="w-3 h-3" />
                  Buttons
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.FileText className="w-3 h-3" />
                  Forms
                </div>
              </div>
            </div>

            <div className="p-3 bg-light-dark rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded bg-linear-to-br from-purple-500 to-indigo-500 shadow-lg">
                  <LucideIcons.Wrench className="w-3 h-3 text-white filter drop-shadow-sm" />
                </div>
                <span className="font-medium">Utilities</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.Zap className="w-3 h-3" />
                  Hooks
                </div>
              </div>
            </div>
          </div>
        </CardContainer>

        <Alert variant="info" dismissible={false}>
          <Typography tag="p" className="text-sm">
            <LucideIcons.Info className="w-4 h-4 inline mr-2" />
            Use{' '}
            <code className="px-1 py-0.5 border border-border rounded text-xs">
              enableNestedRoutes: true
            </code>{' '}
            on parent routes when child components need their own internal
            routing (e.g., tabs, sub-pages).
          </Typography>
        </Alert>
      </section>
    </>
  );
};

export default NestedRoutesSection;
