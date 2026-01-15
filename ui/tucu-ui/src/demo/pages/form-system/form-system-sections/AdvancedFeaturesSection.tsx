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
          Powerful features for complex form scenarios
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: (
              <LucideIcons.GitBranch className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Conditional Fields',
            description:
              'Show/hide fields based on other field values with dynamic validation',
            color: 'from-blue-500 via-indigo-500 to-purple-500',
          },
          {
            icon: (
              <LucideIcons.Plus className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Dynamic Arrays',
            description:
              'Handle dynamic lists of fields with add/remove functionality',
            color: 'from-green-500 via-emerald-500 to-teal-500',
          },
          {
            icon: (
              <LucideIcons.ArrowRight className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Multi-Step Forms',
            description:
              'Wizard-style forms with step validation and progress tracking',
            color: 'from-orange-500 via-red-500 to-pink-500',
          },
          {
            icon: (
              <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Async Validation',
            description:
              'Server-side validation with debouncing and loading states',
            color: 'from-purple-500 via-violet-500 to-indigo-500',
          },
          {
            icon: (
              <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Form State Management',
            description:
              'Real-time access to form state, values, and validation status',
            color: 'from-pink-500 via-rose-500 to-red-500',
          },
          {
            icon: (
              <LucideIcons.AlertTriangle className="w-8 h-8 text-white filter drop-shadow-sm" />
            ),
            title: 'Error Handling',
            description:
              'Comprehensive error handling with custom error display options',
            color: 'from-yellow-500 via-orange-500 to-red-500',
          },
        ].map((feature, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
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

