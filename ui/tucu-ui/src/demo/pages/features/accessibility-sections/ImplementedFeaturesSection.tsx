import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
} from '../../../../index';

const ImplementedFeaturesSection: React.FC = () => {
  const implementedFeatures = [
    {
      title: 'Focus Management',
      description: 'Complete control over focus behavior and visual indicators',
      icon: (
        <LucideIcons.Target className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-orange-500 to-red-500',
      features: [
        'Visible focus indicators',
        'Focus trapping in modals',
        'Focus restoration',
        'Skip navigation links',
      ],
    },
    {
      title: 'Keyboard Navigation',
      description:
        'Full keyboard accessibility across all interactive elements',
      icon: (
        <LucideIcons.Keyboard className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-orange-500 to-red-500',
      features: [
        'Tab navigation',
        'Enter/Space activation',
        'Escape key support',
        'Arrow key navigation',
      ],
    },
    {
      title: 'Screen Reader Support',
      description: 'Comprehensive support for assistive technologies',
      icon: (
        <LucideIcons.Volume2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-orange-500 to-red-500',
      features: [
        'Semantic HTML structure',
        'ARIA labels and descriptions',
        'Live regions',
        'Role attributes',
      ],
    },
    {
      title: 'Visual Accessibility',
      description: 'Enhanced visual accessibility features',
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-orange-500 to-red-500',
      features: [
        'High contrast support',
        'Error state indicators',
        'Loading state announcements',
        'Color independence',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Implemented Features
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Accessibility features currently available in our component library
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {implementedFeatures.map((feature, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-full space-y-4 p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  {feature.icon}
                </div>
                <Typography
                  tag="h3"
                  className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                >
                  {feature.title}
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {feature.description}
              </Typography>
              <div className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0" />
                    <Typography
                      tag="span"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {item}
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

export default ImplementedFeaturesSection;

