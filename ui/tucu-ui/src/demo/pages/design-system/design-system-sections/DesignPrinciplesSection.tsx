import React from 'react';
import { CardContainer, Typography, LucideIcons } from '../../../../index';

const DesignPrinciplesSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Design Principles
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Core principles that guide our design decisions and ensure consistency
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {[
          {
            title: 'Consistency',
            description:
              'Unified visual language and interaction patterns across all components.',
            icon: (
              <LucideIcons.CheckCircle className="h-6 w-6 text-white filter drop-shadow-sm" />
            ),
            color: 'from-emerald-500 via-green-500 to-teal-500',
          },
          {
            title: 'Simplicity',
            description:
              'Clean, intuitive interfaces that reduce cognitive load.',
            icon: (
              <LucideIcons.Minimize2 className="h-6 w-6 text-white filter drop-shadow-sm" />
            ),
            color: 'from-blue-500 via-cyan-500 to-sky-500',
          },
          {
            title: 'Flexibility',
            description:
              'Adaptable components that work across different contexts.',
            icon: (
              <LucideIcons.Layers className="h-6 w-6 text-white filter drop-shadow-sm" />
            ),
            color: 'from-purple-500 via-violet-500 to-indigo-500',
          },
          {
            title: 'Accessibility',
            description: 'Inclusive design that works for everyone.',
            icon: (
              <LucideIcons.Eye className="h-6 w-6 text-white filter drop-shadow-sm" />
            ),
            color: 'from-orange-500 via-amber-500 to-yellow-500',
          },
        ].map((principle) => (
          <CardContainer
            key={principle.title}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-full space-y-4 p-2 sm:p-2">
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
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
};

export default DesignPrinciplesSection;

