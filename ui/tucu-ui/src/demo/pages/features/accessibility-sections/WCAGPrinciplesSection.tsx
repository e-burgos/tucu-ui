import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
} from '../../../../index';

const WCAGPrinciplesSection: React.FC = () => {
  const wcagPrinciples = [
    {
      title: 'Perceivable',
      description:
        'Information and UI components must be presentable to users in ways they can perceive.',
      icon: (
        <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      features: [
        'Color contrast ratios',
        'Alt text for images',
        'Scalable text',
        'Audio descriptions',
      ],
    },
    {
      title: 'Operable',
      description:
        'UI components and navigation must be operable by all users.',
      icon: (
        <LucideIcons.Hand className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      features: [
        'Keyboard navigation',
        'Focus management',
        'No seizure triggers',
        'Sufficient time limits',
      ],
    },
    {
      title: 'Understandable',
      description: 'Information and UI operation must be understandable.',
      icon: (
        <LucideIcons.Brain className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      features: [
        'Readable text',
        'Predictable functionality',
        'Input assistance',
        'Error identification',
      ],
    },
    {
      title: 'Robust',
      description:
        'Content must be robust enough for various assistive technologies.',
      icon: (
        <LucideIcons.Wrench className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      features: [
        'Valid HTML',
        'Compatible markup',
        'Future-proof code',
        'Assistive tech support',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          WCAG 2.1 AA Principles
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Four fundamental principles that guide our accessibility
          implementation
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
                  className={`p-3 rounded-xl bg-linear-to-br ${principle.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
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
    </div>
  );
};

export default WCAGPrinciplesSection;

