import React from 'react';
import { CardContainer, Typography, LucideIcons } from '../../../../index';

const AdvancedFeaturesSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Advanced Features
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Powerful features for complex theming scenarios
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: (
              <LucideIcons.Globe className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'RTL/LTR Support',
            description:
              'Full right-to-left language support with automatic layout adjustments',
            color: 'from-blue-500 via-indigo-500 to-purple-500',
          },
          {
            icon: (
              <LucideIcons.Save className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Persistent Settings',
            description:
              'Automatic localStorage integration for user preference persistence',
            color: 'from-green-500 via-emerald-500 to-teal-500',
          },
          {
            icon: (
              <LucideIcons.Layers className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Custom Routes',
            description:
              'Advanced routing scenarios with custom route configuration',
            color: 'from-orange-500 via-red-500 to-pink-500',
          },
        ].map((feature, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
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
    </>
  );
};

export default AdvancedFeaturesSection;

