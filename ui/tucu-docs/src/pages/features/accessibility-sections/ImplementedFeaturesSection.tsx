import React from 'react';
import {
  HeroCard,
  Typography,
  LucideIcons,
  FeatureCard,
} from '@e-burgos/tucu-ui';

const ImplementedFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: (
        <LucideIcons.Target className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Focus Management',
      description:
        'Visible focus indicators, focus restoration on close (Modal, Drawer), auto-focus on open, and skip-navigation support.',
      iconBgClassName: 'from-red-500 to-orange-500',
    },
    {
      icon: (
        <LucideIcons.Keyboard className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Keyboard Navigation',
      description:
        'Tab/Shift+Tab traversal, Enter/Space activation, Escape to close, Arrow keys in Tabs and Select, Home/End support.',
      iconBgClassName: 'from-blue-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Volume2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Screen Reader Support',
      description:
        'Semantic HTML, ARIA labels, aria-describedby connections, live regions (Alert), and proper role attributes.',
      iconBgClassName: 'from-purple-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Visual Accessibility',
      description:
        'High contrast modes, color-independent error indicators (aria-invalid), loading state announcements (aria-busy).',
      iconBgClassName: 'from-teal-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Lock className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Focus Trapping',
      description:
        'Drawer implements full focus trap (Tab cycles within). Modal has Escape close and focus restoration but Tab can escape.',
      iconBgClassName: 'from-amber-500 to-yellow-500',
    },
    {
      icon: (
        <LucideIcons.FormInput className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Form Accessibility',
      description:
        'Auto-generated IDs (useId), label association (htmlFor), aria-required, aria-invalid, and aria-describedby for helpers/errors.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Implemented Features"
        description="Accessibility features currently available across the component library. Each feature has been verified against the source code."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            What&apos;s Available Today
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Core accessibility features implemented across components
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

export default ImplementedFeaturesSection;
