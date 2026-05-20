import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  FeatureCard,
} from '../../../../index';

const DynamicRoutesSection: React.FC = () => {
  const dynamicRoutes = `import { useMemo } from 'react';
import { StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';

export const useMenuItems = () => {
  const { userRole, featureFlags } = useAppState();

  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(() => [
    // Static routes
    {
      name: 'Home',
      path: '/',
      icon: <LucideIcons.Home />,
      component: <HomePage />,
    },

    // Dynamic routes based on user permissions
    ...(userRole === 'admin' ? [{
      name: 'Admin',
      path: '/admin',
      icon: <LucideIcons.Shield />,
      component: <AdminPage />,
      enableNestedRoutes: true,
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
      icon: <LucideIcons.Sparkles />,
      component: <NewFeaturePage />,
    }] : []),
  ], [userRole, featureFlags]);

  return { menuItems };
};`;

  const features = [
    {
      icon: (
        <LucideIcons.Shield className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Role-Based Access',
      description: 'Show/hide routes based on user permissions and roles.',
      iconBgClassName: 'from-red-500 to-rose-500',
    },
    {
      icon: (
        <LucideIcons.Flag className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Feature Flags',
      description: 'Enable routes conditionally based on feature toggles.',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Database className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'State-Driven',
      description: 'Routes that dynamically change based on application state.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Dynamic Routes"
        description="Create conditional routing based on user permissions, feature flags, or application state using useMemo patterns."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Shuffle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Dynamic Route Generation
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Use useMemo to generate menuItems dynamically based on runtime
            conditions
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Dynamic Menu Hook">
            <CodeBlock language="tsx" code={dynamicRoutes} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Use Cases
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Common patterns for conditional route rendering
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} layout="vertical" {...feature} />
          ))}
        </div>
      </section>
    </>
  );
};

export default DynamicRoutesSection;
