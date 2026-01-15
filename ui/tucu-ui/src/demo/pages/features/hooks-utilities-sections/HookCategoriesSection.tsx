import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
  Badge,
} from '../../../../index';

const HookCategoriesSection: React.FC = () => {
  const hookCategories = [
    {
      icon: (
        <LucideIcons.Monitor className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'Responsive & Layout',
      description: 'Screen size detection and element measurement hooks',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      hooks: [
        'useBreakpoint',
        'useIsMobile',
        'useElementSize',
        'useMeasure',
        'useWindowScroll',
      ],
    },
    {
      icon: (
        <LucideIcons.MousePointer className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'User Interaction',
      description: 'Click detection and clipboard operations',
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      hooks: ['useClickAway', 'useCopyToClipboard', 'useEventListener'],
    },
    {
      icon: (
        <LucideIcons.Layout className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'UI State Management',
      description: 'Global state and UI behavior management',
      color: 'from-green-500 via-emerald-500 to-teal-500',
      hooks: [
        'useGridSwitcher',
        'useLockBodyScroll',
        'useToastStore',
        'useScrollableSlider',
      ],
    },
    {
      icon: (
        <LucideIcons.Wrench className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'Utilities',
      description: 'Lifecycle and utility functions',
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      hooks: ['useIsMounted'],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Hook Categories
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Organized collection of hooks for different development needs
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {hookCategories.map((category, index) => (
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
              <div className="flex flex-wrap gap-2">
                {category.hooks.map((hook, i) => (
                  <Badge key={i} className="text-dark dark:text-white">
                    {hook}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default HookCategoriesSection;

