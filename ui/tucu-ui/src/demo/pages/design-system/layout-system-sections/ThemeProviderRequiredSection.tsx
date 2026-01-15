import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Alert } from '../../../../index';

const ThemeProviderRequiredSection: React.FC = () => {
  return (
    <>
      <Alert variant="warning">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <LucideIcons.AlertTriangle className="h-4 w-4" />
            ThemeProvider Required
          </div>
          <div>
            Before using any layout components or theme hooks, you MUST wrap
            your application with ThemeProvider. All layout components and
            theme hooks depend on the theme context provided by ThemeProvider.
            Located in{' '}
            <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-700 rounded text-xs">
              ui/tucu-ui/src/themes/components/theme-provider
            </code>
            .
          </div>
        </div>
      </Alert>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Routing System" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              <strong>ThemeProvider</strong> includes{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-700 rounded text-xs">
                BrowserRouter
              </code>{' '}
              from React Router and handles routing automatically. You have
              two options:
            </Typography>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Typography tag="h4" className="font-semibold mb-2">
                  1. Automatic Routing (Default)
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-700 dark:text-gray-300 mb-2"
                >
                  Provide <code>menuItems</code> with <code>component</code>{' '}
                  prop. ThemeProvider will automatically generate routes from
                  your menu items.
                </Typography>
                <Typography
                  tag="p"
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  <strong>Use when:</strong> You want routing based on menu
                  items. Each menu item with a <code>component</code> prop
                  becomes a route.
                </Typography>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <Typography tag="h4" className="font-semibold mb-2">
                  2. Custom Routing
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-700 dark:text-gray-300 mb-2"
                >
                  Provide <code>customRoutes</code> prop with your own{' '}
                  <code>{'<Routes>'}</code> component. This gives you full
                  control over routing.
                </Typography>
                <Typography
                  tag="p"
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  <strong>Use when:</strong> You need custom routing logic,
                  landing pages without navigation, or complex routing
                  scenarios.
                </Typography>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ThemeProviderRequiredSection;

