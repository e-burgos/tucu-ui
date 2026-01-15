import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
} from '../../../../index';

const NestedRoutesSection: React.FC = () => {
  const nestedRoutes = `const menuItems = [
  {
    name: 'Components',
    path: '/components',
    icon: <LucideIcons.Component />,
    component: <ComponentsPage />,
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
        icon: <LucideIcons.Hook />,
        component: <HooksPage />,
      },
    ],
  },
];`;

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="Nested Routes & Dropdown Menus" className="mt-2 mb-6">
          <div className="space-y-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Create hierarchical navigation with unlimited nesting levels. Each
              menu item can have dropdown sub-items that appear in the sidebar
              navigation.
            </Typography>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Nested Routes Example
                </Typography>
                <CodeBlock language="tsx" code={nestedRoutes} />
              </div>

              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Navigation Structure
                </Typography>
                <div className="space-y-3">
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
              </div>
            </div>

            <Alert variant="info" dismissible={false}>
              <Typography tag="p" className="text-sm ">
                <LucideIcons.Info className="w-4 h-4 inline mr-2" />
                Nested routes are automatically converted to dropdown menus in
                the sidebar navigation. The parent route serves as the main
                landing page, while dropdown items provide access to
                sub-sections.
              </Typography>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default NestedRoutesSection;
