import React from 'react';
import {
  HeroCard,
  FeatureCard,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const DesignPrinciplesSection: React.FC = () => {
  const principles = [
    {
      title: 'Consistency',
      description:
        'Unified visual language and interaction patterns across all components.',
      icon: <LucideIcons.CheckCircle className="h-6 w-6" />,
      iconBgClassName: 'from-emerald-500 via-green-500 to-teal-500',
    },
    {
      title: 'Simplicity',
      description: 'Clean, intuitive interfaces that reduce cognitive load.',
      icon: <LucideIcons.Minimize2 className="h-6 w-6" />,
      iconBgClassName: 'from-blue-500 via-cyan-500 to-sky-500',
    },
    {
      title: 'Flexibility',
      description: 'Adaptable components that work across different contexts.',
      icon: <LucideIcons.Layers className="h-6 w-6" />,
      iconBgClassName: 'from-purple-500 via-violet-500 to-indigo-500',
    },
    {
      title: 'Accessibility',
      description: 'Inclusive design that works for everyone.',
      icon: <LucideIcons.Eye className="h-6 w-6" />,
      iconBgClassName: 'from-orange-500 via-amber-500 to-yellow-500',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Design Principles"
        description="Core principles that guide our design decisions and ensure consistency."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Compass className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Core Principles
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            The foundational values behind every design decision
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {principles.map((principle) => (
            <FeatureCard
              key={principle.title}
              layout="horizontal"
              title={principle.title}
              description={principle.description}
              icon={principle.icon}
              iconBgClassName={principle.iconBgClassName}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DesignPrinciplesSection;
