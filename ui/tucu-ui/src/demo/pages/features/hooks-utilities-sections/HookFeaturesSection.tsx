import React from 'react';
import { CardContainer, Typography, LucideIcons } from '../../../../index';

const HookFeaturesSection: React.FC = () => {
  const hookFeatures = [
    {
      title: 'Performance Optimized',
      description: 'Built with React best practices and minimal re-renders',
      icon: (
        <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-yellow-500 via-amber-500 to-orange-500',
    },
    {
      title: 'TypeScript First',
      description:
        'Full TypeScript support with comprehensive type definitions',
      icon: (
        <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-sky-500',
    },
    {
      title: 'Tree Shaking',
      description: 'Optimized bundle size with automatic tree shaking',
      icon: (
        <LucideIcons.Package className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-green-500 via-emerald-500 to-teal-500',
    },
    {
      title: 'Accessibility Ready',
      description: 'Built with accessibility best practices in mind',
      icon: (
        <LucideIcons.Eye className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Why Choose Our Hooks?
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Built with modern React patterns and optimized for performance
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {hookFeatures.map((feature, index) => (
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
            </div>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default HookFeaturesSection;
