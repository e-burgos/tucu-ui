import React from 'react';
import { CardContainer, Typography, LucideIcons } from '../../../../index';

const BestPracticesSection: React.FC = () => {
  const bestPractices = [
    {
      category: 'Icon Sizing',
      items: [
        'Use consistent sizing patterns (xs: 12px, sm: 16px, md: 24px, lg: 32px, xl: 48px)',
        'Follow responsive design principles with size variants',
        'Maintain visual hierarchy with appropriate icon sizes',
        'Use Tailwind utility classes for sizing (w-4 h-4, w-6 h-6, etc.)',
      ],
    },
    {
      category: 'Accessibility',
      items: [
        'Always provide aria-label for interactive icons',
        'Use aria-hidden="true" for decorative icons',
        'Ensure sufficient color contrast in all themes',
        'Test with screen readers and keyboard navigation',
        'Provide text alternatives when icons convey meaning',
      ],
    },
    {
      category: 'Performance',
      items: [
        'Use the LucideIcons namespace for automatic tree-shaking',
        'Import custom icons directly when needed',
        'Leverage the unified import pattern for better bundling',
        'Avoid importing entire icon libraries',
      ],
    },
    {
      category: 'Theme Integration',
      items: [
        'Use theme-aware custom icons when available',
        'Apply brand colors using text-brand utility class',
        'Ensure icons work well in both light and dark themes',
        'Use currentColor for flexible theming',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Best Practices
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Guidelines for optimal icon system implementation
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {bestPractices.map((practice, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-full space-y-4 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="font-semibold text-lg">
                  {practice.category}
                </Typography>
              </div>
              <ul className="space-y-2">
                {practice.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <LucideIcons.ArrowRight className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                    <Typography
                      tag="span"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default BestPracticesSection;
