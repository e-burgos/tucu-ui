import React from 'react';
import {
  HeroCard,
  Typography,
  LucideIcons,
  FeatureCard,
} from '../../../../index';

const SystemOverviewSection: React.FC = () => {
  const features = [
    {
      icon: (
        <LucideIcons.Router className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'React Router v6',
      description:
        'Built on React Router with full compatibility, browser history, and modern routing features.',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Menu className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Automatic Navigation',
      description:
        'Generate navigation menus automatically from menuItems configuration with active states.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.Layers3 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Nested Routes',
      description:
        'Unlimited nesting levels via dropdownItems with automatic sidebar dropdown generation.',
      iconBgClassName: 'from-purple-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Box className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Dual Architecture',
      description:
        'Supports Standalone (menu-driven) and MFE (explicit config) via the architecturalPatterns prop.',
      iconBgClassName: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="System Overview"
        description="Built on React Router v6 with automatic menu generation and nested route support. Supports both Standalone and Micro Frontend (MFE) architectural patterns via TypeScript-enforced discriminated unions."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Map className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Core Capabilities
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Key features of the routing system
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} layout="vertical" {...feature} />
          ))}
        </div>
      </section>
    </>
  );
};

export default SystemOverviewSection;
