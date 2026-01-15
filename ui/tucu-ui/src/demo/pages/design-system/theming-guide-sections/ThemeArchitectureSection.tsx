import React from 'react';
import { CardContainer, Typography, LucideIcons, Badge } from '../../../../index';

const ThemeArchitectureSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Theme Architecture
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Built on modern technologies for flexibility and performance
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: (
              <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Zustand State Management',
            description:
              'Centralized theme state with minimal boilerplate and excellent TypeScript support',
            color: 'from-yellow-500 via-amber-500 to-orange-500',
            features: ['Lightweight', 'TypeScript First', 'DevTools Support'],
          },
          {
            icon: (
              <LucideIcons.Palette className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'CSS Custom Properties',
            description:
              'Dynamic brand colors using CSS variables for real-time theme updates',
            color: 'from-blue-500 via-cyan-500 to-teal-500',
            features: ['Dynamic Colors', 'Alpha Support', 'No Rebuilds'],
          },
          {
            icon: (
              <LucideIcons.Moon className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Dark Mode Support',
            description:
              'Automatic dark/light mode switching with smooth transitions',
            color: 'from-purple-500 via-violet-500 to-indigo-500',
            features: ['Auto Detection', 'Smooth Transitions', 'System Sync'],
          },
        ].map((item, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  {item.icon}
                </div>
                <Typography
                  tag="h3"
                  className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                >
                  {item.title}
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {item.description}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {item.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
};

export default ThemeArchitectureSection;

