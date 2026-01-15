import React from 'react';
import { CardContainer, Typography, LucideIcons } from '../../../../index';

const ArchitectureOverviewSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Architecture Overview
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Built on React Hook Form for performance and developer experience
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: (
              <LucideIcons.Box className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Form Container',
            description:
              'Main wrapper with built-in state management and submission handling',
            color: 'from-blue-500 via-indigo-500 to-purple-500',
          },
          {
            icon: (
              <LucideIcons.Layers className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'FormField Wrapper',
            description:
              'Connects inputs to validation with automatic error handling',
            color: 'from-green-500 via-emerald-500 to-teal-500',
          },
          {
            icon: (
              <LucideIcons.CheckCircle className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Validation System',
            description:
              'Built-in and custom validation rules with TypeScript support',
            color: 'from-orange-500 via-red-500 to-pink-500',
          },
          {
            icon: (
              <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Performance',
            description:
              'Minimal re-renders with optimized form state management',
            color: 'from-purple-500 via-violet-500 to-indigo-500',
          },
        ].map((item, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${item.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
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
                className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm"
              >
                {item.description}
              </Typography>
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
};

export default ArchitectureOverviewSection;
