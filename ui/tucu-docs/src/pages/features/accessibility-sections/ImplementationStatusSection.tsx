import React from 'react';
import {
  HeroCard,
  Typography,
  LucideIcons,
  FeatureCard,
  Alert,
} from '@e-burgos/tucu-ui';

const ImplementationStatusSection: React.FC = () => {
  const stats = [
    {
      icon: (
        <LucideIcons.CheckCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Fully Accessible',
      description:
        'Input, Checkbox, Modal, Alert, Button, Tabs, Drawer, Select — all with ARIA attributes and keyboard support.',
      iconBgClassName: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <LucideIcons.Keyboard className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Keyboard Navigation',
      description:
        'Tab, Escape, Enter/Space, Arrow keys — all interactive components are fully operable without a mouse.',
      iconBgClassName: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <LucideIcons.Volume2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Screen Reader Ready',
      description:
        'Semantic HTML, ARIA labels, live regions, role attributes, and aria-describedby connections throughout.',
      iconBgClassName: 'from-purple-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.AlertTriangle className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Known Limitation',
      description:
        'Modal component lacks focus trapping (Tab can escape). Drawer has full focus trap — Modal improvement planned.',
      iconBgClassName: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Implementation Status"
        description="Current state of accessibility compliance across the tucu-ui component library. We follow WCAG 2.1 AA guidelines and are transparent about our progress."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Activity className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Current State
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Overview of accessibility features across core components
          </Typography>
        </div>

        <Alert variant="info" dismissible={false}>
          <div className="flex items-center gap-2">
            <LucideIcons.Info className="h-5 w-5 shrink-0" />
            <Typography tag="p" className="text-sm">
              This library is actively working towards full accessibility
              compliance. Most interactive components include proper ARIA
              attributes, keyboard navigation, and screen reader support.
            </Typography>
          </div>
        </Alert>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <FeatureCard key={stat.title} layout="horizontal" {...stat} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ImplementationStatusSection;
