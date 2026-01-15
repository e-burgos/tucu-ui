import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const DynamicRoutesSection: React.FC = () => {
  const dynamicRoutes = `import { useMemo } from 'react';

export const useMenuItems = () => {
  const { userRole, featureFlags } = useAppState();
  
  const menuItems = useMemo(() => [
    // Static routes
    {
      name: 'Home',
      path: '/',
      component: <HomePage />,
    },

    // Dynamic routes based on user permissions
    ...(userRole === 'admin' ? [{
      name: 'Admin',
      path: '/admin',
      component: <AdminPage />,
      dropdownItems: [
        {
          name: 'Users',
          path: '/admin/users',
          component: <UsersPage />,
        },
        {
          name: 'Settings',
          path: '/admin/settings',
          component: <AdminSettingsPage />,
        },
      ],
    }] : []),

    // Feature-flagged routes
    ...(featureFlags.newFeature ? [{
      name: 'New Feature',
      path: '/new-feature',
      component: <NewFeaturePage />,
    }] : []),
  ], [userRole, featureFlags]);

  return { menuItems };
};`;

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="Dynamic & Conditional Routes" className="mt-2 mb-6">
          <div className="space-y-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Create dynamic routing based on user permissions, feature flags,
              or application state.
            </Typography>

            <CodeBlock language="tsx" code={dynamicRoutes} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Role-Based Access',
                  description: 'Show/hide routes based on user permissions',
                  icon: (
                    <LucideIcons.Shield className="w-5 h-5 text-white filter drop-shadow-sm" />
                  ),
                  color: 'from-red-500 to-rose-500',
                },
                {
                  title: 'Feature Flags',
                  description: 'Enable routes based on feature toggles',
                  icon: (
                    <LucideIcons.Flag className="w-5 h-5 text-white filter drop-shadow-sm" />
                  ),
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  title: 'State-Driven',
                  description: 'Routes that change based on app state',
                  icon: (
                    <LucideIcons.Database className="w-5 h-5 text-white filter drop-shadow-sm" />
                  ),
                  color: 'from-green-500 to-emerald-500',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-light-dark rounded-lg"
                >
                  <div
                    className={`p-2 rounded-lg bg-linear-to-br ${item.color} shadow-lg shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <Typography tag="h5" className="font-medium mb-1">
                      {item.title}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {item.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default DynamicRoutesSection;
