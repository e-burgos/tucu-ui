import React from 'react';
import {
  HeroCard,
  Typography,
  LucideIcons,
  FeatureCard,
} from '@e-burgos/tucu-ui';

const HookFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: (
        <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Performance Optimized',
      description:
        'Minimal re-renders using useRef patterns, ResizeObserver, and event delegation for maximum efficiency.',
      iconBgClassName: 'from-yellow-500 to-amber-500',
    },
    {
      icon: (
        <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'TypeScript First',
      description:
        'Full generic support (e.g. useElementSize<HTMLCanvasElement>) with comprehensive type definitions and IntelliSense.',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Package className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Tree Shaking',
      description:
        'Import only the hooks you need — each hook is independently exportable for optimal bundle size.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.Eye className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Accessibility Ready',
      description:
        'Hooks like useLockBodyScroll preserve scrollbar width to prevent layout shifts, and useEventListener supports keyboard navigation.',
      iconBgClassName: 'from-purple-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.Database className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Zustand-Powered State',
      description:
        'Global state hooks (useToastStore, useGridSwitcher) are built on Zustand for predictable, minimal-boilerplate state management.',
      iconBgClassName: 'from-orange-500 to-red-500',
    },
    {
      icon: (
        <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: '14 Hooks Available',
      description:
        'From responsive detection to clipboard operations, element measurement, scroll control, and event handling — all in one library.',
      iconBgClassName: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Why Choose Our Hooks?"
        description="A battle-tested collection of 14 React hooks covering responsive design, user interactions, state management, and utilities — all with full TypeScript support and tree-shaking."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Key Advantages
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Built with modern React patterns and optimized for performance
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

export default HookFeaturesSection;
