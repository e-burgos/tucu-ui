import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const WCAGPrinciplesSection: React.FC = () => {
  const wcagPrinciples = [
    {
      title: 'Perceivable',
      description:
        'Information and UI components must be presentable to users in ways they can perceive.',
      icon: (
        <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      features: [
        'Color contrast ratios (4.5:1 for text)',
        'Alt text for images and icons',
        'Scalable text and responsive typography',
        'aria-live regions for dynamic content',
      ],
    },
    {
      title: 'Operable',
      description:
        'UI components and navigation must be operable by all users regardless of input method.',
      icon: (
        <LucideIcons.Hand className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      features: [
        'Full keyboard navigation (Tab, Arrow, Escape)',
        'Visible focus indicators on all elements',
        'No seizure-triggering content',
        'Sufficient time for interactions',
      ],
    },
    {
      title: 'Understandable',
      description:
        'Information and UI operation must be understandable and predictable.',
      icon: (
        <LucideIcons.Brain className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-green-500 via-emerald-500 to-teal-500',
      features: [
        'Clear and readable text content',
        'Predictable navigation behavior',
        'Input assistance (labels, helpers, errors)',
        'Error identification with aria-invalid',
      ],
    },
    {
      title: 'Robust',
      description:
        'Content must be robust enough for various assistive technologies and future compatibility.',
      icon: (
        <LucideIcons.Shield className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      features: [
        'Valid semantic HTML structure',
        'Proper ARIA roles and attributes',
        'Compatible with NVDA, JAWS, VoiceOver',
        'Standards-compliant markup',
      ],
    },
  ];

  return (
    <>
      <HeroCard
        title="WCAG 2.1 AA Principles"
        description="Four fundamental principles (POUR) that guide our accessibility implementation. Every component is evaluated against these criteria."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BookOpen className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            The POUR Framework
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Each principle addresses a different aspect of accessibility
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {wcagPrinciples.map((principle, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${principle.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    {principle.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {principle.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {principle.description}
                </Typography>
                <div className="space-y-2">
                  {principle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {feature}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default WCAGPrinciplesSection;
