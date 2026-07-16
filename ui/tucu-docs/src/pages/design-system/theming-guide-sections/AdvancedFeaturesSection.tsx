import React from 'react';
import {
  HeroCard,
  Typography,
  LucideIcons,
  FeatureCard,
} from '@e-burgos/tucu-ui';

const AdvancedFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: (
        <LucideIcons.Globe className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'RTL/LTR Support',
      description:
        'Full right-to-left language support with automatic layout mirroring via the useDirection hook.',
      iconBgClassName: 'from-blue-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Save className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Persistent Settings',
      description:
        'Automatic localStorage integration using Zustand persist middleware (key: theme-storage).',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.Route className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Custom Routes',
      description:
        'Advanced routing via customRoutes prop or setCurrentPathname for dynamic navigation.',
      iconBgClassName: 'from-orange-500 to-red-500',
    },
    {
      icon: (
        <LucideIcons.Monitor className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Theme Styles',
      description:
        'Switch between default, macOS Sonoma, and macOS Tahoe visual styles at runtime.',
      iconBgClassName: 'from-purple-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.LayoutGrid className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Layout Constraints',
      description:
        'THEME_STYLE_LAYOUTS enforces valid layout combinations per theme style automatically.',
      iconBgClassName: 'from-cyan-500 to-teal-500',
    },
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Color Scheme Presets',
      description:
        'The colorScheme state exposes the active palette for conditional styling logic.',
      iconBgClassName: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Advanced Features"
        description="Powerful capabilities for complex theming scenarios — from RTL support to constrained layout systems."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Feature Overview
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Additional theme system capabilities beyond basic configuration
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} layout="vertical" {...feature} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AdvancedFeaturesSection;
