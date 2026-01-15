import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
} from '../../../../index';

const IconArchitectureSection: React.FC = () => {
  const iconCategories = [
    {
      title: 'Lucide React Integration',
      description:
        'Access to 5000+ high-quality icons through the LucideIcons namespace with full TypeScript support and tree-shaking optimization.',
      icon: (
        <LucideIcons.Sparkles className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      features: [
        'Complete Lucide React library (5000+ icons)',
        'Single namespace import (LucideIcons)',
        'Automatic tree-shaking for optimal bundle size',
        'Full TypeScript support with autocomplete',
        'Consistent styling with currentColor',
      ],
    },
    {
      title: 'Custom Tucu Icons',
      description:
        '98+ carefully crafted SVG icons designed specifically for Tucu UI, including blockchain, layout controls, social brands, and specialized UI elements.',
      icon: (
        <LucideIcons.Palette className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-pink-500 to-rose-500',
      features: [
        '98+ custom-designed icons',
        'Blockchain & crypto icons',
        'Layout control icons',
        'Social media brand icons',
        'Theme-aware variants',
        'Optimized SVG format',
      ],
    },
    {
      title: 'Dual Icon System',
      description:
        'Seamless integration of custom and Lucide icons in one unified system with consistent API and styling.',
      icon: (
        <LucideIcons.Layers className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      features: [
        'Unified import pattern',
        'Consistent styling API',
        'Easy migration between icon sets',
        'Performance optimized',
        'TypeScript support for both',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Icon Architecture
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Dual icon system combining custom design with extensive Lucide React
          library
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {iconCategories.map((category, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-full space-y-4 p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${category.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  {category.icon}
                </div>
                <Typography
                  tag="h3"
                  className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                >
                  {category.title}
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {category.description}
              </Typography>
              <div className="space-y-2">
                {category.features.map((feature, featureIndex) => (
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

export default IconArchitectureSection;

