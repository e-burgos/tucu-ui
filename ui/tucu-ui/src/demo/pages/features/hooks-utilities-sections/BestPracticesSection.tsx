import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
} from '../../../../index';

const BestPracticesSection: React.FC = () => {
  const bestPractices = [
    {
      category: 'Performance',
      items: [
        'Use useCallback and useMemo with hooks that trigger frequent updates',
        'Prefer useElementSize over useMeasure for simple dimension tracking',
        'Debounce rapid state changes with toast notifications',
        'Leverage tree-shaking by importing only needed hooks',
      ],
    },
    {
      category: 'TypeScript',
      items: [
        'Leverage generic types in useElementSize<HTMLCanvasElement>()',
        'Use proper event types with useEventListener',
        'Define custom interfaces for toast variants',
        'Take advantage of full IntelliSense support',
      ],
    },
    {
      category: 'Accessibility',
      items: [
        'Combine useLockBodyScroll with focus management for modals',
        'Use useEventListener for keyboard navigation',
        'Implement proper ARIA attributes with responsive hooks',
        'Test with screen readers and keyboard navigation',
      ],
    },
    {
      category: 'Error Handling',
      items: [
        'Use useIsMounted to prevent memory leaks in async operations',
        'Handle edge cases in measurement hooks',
        'Provide fallbacks for unsupported features',
        'Always validate external data sources',
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
          Guidelines for optimal hook implementation and usage
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
                <div className="p-2 rounded-lg bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 shadow-lg">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="font-semibold text-lg">
                  {practice.category}
                </Typography>
              </div>
              <ul className="space-y-2">
                {practice.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <LucideIcons.ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
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

