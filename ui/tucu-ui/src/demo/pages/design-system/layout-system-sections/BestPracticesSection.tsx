import React from 'react';
import { CardContainer, Typography, LucideIcons } from '../../../../index';

const BestPracticesSection: React.FC = () => {
  const bestPractices = [
    {
      category: 'Layout Selection',
      items: [
        'Admin: Use for complex applications with many navigation items and sidebar menus',
        'Horizontal: Use for content-focused sites and simple applications with top navigation',
        'Clean: Use for authentication flows, landing pages, and standalone content',
      ],
    },
    {
      category: 'ThemeProvider Setup',
      items: [
        'Always wrap your application with ThemeProvider before using layouts',
        'Provide menuItems prop for Admin and Horizontal layouts',
        'Use layout prop to control which layout is rendered',
        'Theme settings are automatically persisted to localStorage',
      ],
    },
    {
      category: 'Responsive Design',
      items: [
        'Always test layouts on mobile devices',
        'Use provided breakpoint system for responsive behavior',
        'Consider touch interactions for mobile navigation',
        'Admin layout automatically shows drawer on mobile',
      ],
    },
    {
      category: 'Accessibility',
      items: [
        'Provide meaningful menu item names',
        'Use semantic HTML structure',
        'Test keyboard navigation',
        'Ensure proper color contrast in all themes',
        'Support RTL/LTR for international users',
      ],
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Best Practices
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Guidelines for optimal layout system implementation
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-md">
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
    </>
  );
};

export default BestPracticesSection;

