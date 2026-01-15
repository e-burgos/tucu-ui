import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
  Badge,
} from '../../../../index';

const SystemOverviewSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          System Overview
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Built on React Router with automatic menu generation and nested route
          support. Supports both Standalone and Micro Frontend (MFE)
          architectural patterns.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: (
              <LucideIcons.Router className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'React Router Integration',
            description:
              'Built on React Router v6 with full compatibility and modern routing features',
            features: ['Browser History', 'Nested Routes', 'Route Guards'],
            color: 'from-blue-500 to-cyan-500',
          },
          {
            icon: (
              <LucideIcons.Menu className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Automatic Navigation',
            description:
              'Generate navigation menus automatically from route configuration',
            features: ['Auto Sidebar', 'Breadcrumb Support', 'Active States'],
            color: 'from-green-500 to-emerald-500',
          },
          {
            icon: (
              <LucideIcons.Layers3 className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Nested Route Support',
            description:
              'Support for unlimited nesting levels with dropdown menus and sub-navigation',
            features: ['Multi-level', 'Dropdown Menus', 'Hierarchical'],
            color: 'from-purple-500 to-indigo-500',
          },
          {
            icon: (
              <LucideIcons.Box className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Architectural Patterns',
            description:
              'Support for both Standalone and Micro Frontend (MFE) patterns with type-safe configuration',
            features: ['Standalone', 'MFE', 'Type-Safe'],
            color: 'from-orange-500 to-amber-500',
          },
        ].map((item, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${item.color} text-white shadow-lg group-hover:scale-110 transition-all duration-300`}
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
    </div>
  );
};

export default SystemOverviewSection;
