import React from 'react';
import { CardContainer, Typography, LucideIcons, Badge, LAYOUT_OPTIONS } from '../../../../index';

const LayoutTypesSection: React.FC = () => {
  const layoutTypes = [
    {
      name: 'Admin Layout',
      description:
        'Traditional admin layout with expandable sidebar and fixed header. Designed for complex applications with hierarchical navigation and multiple sections.',
      icon: (
        <LucideIcons.Layout className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      value: LAYOUT_OPTIONS.ADMIN,
      useCases: [
        'Dashboard applications',
        'Admin panels and management systems',
        'Complex applications with many navigation items',
        'Applications requiring hierarchical menu structure',
        'Enterprise software and internal tools',
        'Applications with multiple sections and subsections',
      ],
      features: [
        'Expandable sidebar navigation (visible on xl screens)',
        'Fixed header with logo and action buttons',
        'Responsive drawer menu for mobile devices',
        'RTL/LTR direction support',
        'Full-width content option available',
        'Sidebar padding: 96px (xl) / 112px (2xl)',
        'Content padding: 16px (mobile) / 24px (sm) / 32px (lg) / 40px (3xl)',
      ],
      technical: {
        sidebar: 'ExpandableSidebar component (hidden on mobile, visible xl+)',
        header: 'AdminHeader component with menu toggle',
        drawer: 'Drawer component for mobile navigation',
        breakpoint: 'Sidebar visible from xl breakpoint (1024px)',
      },
    },
    {
      name: 'Horizontal Layout',
      description:
        'Modern horizontal navigation layout with top menu bar. Ideal for content-focused sites, marketing pages, and applications with simple navigation.',
      icon: (
        <LucideIcons.Menu className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      value: LAYOUT_OPTIONS.HORIZONTAL,
      useCases: [
        'Content-focused websites',
        'Marketing and landing pages',
        'Simple applications with few navigation items',
        'Portfolio and showcase sites',
        'Blog and content management systems',
        'Public-facing applications',
      ],
      features: [
        'Horizontal top navigation menu',
        'Sticky header with logo and action buttons',
        'Mobile hamburger menu with drawer',
        'Backdrop blur effects on header',
        'Full-width content option available',
        'Content padding: 8px (mobile) / 24px (sm) / 32px (lg) / 40px (3xl)',
        'Minimal vertical space usage',
      ],
      technical: {
        header: 'HorizontalHeader component with horizontal menu',
        menu: 'HorizontalNavMenu component',
        drawer: 'Drawer component for mobile navigation',
        breakpoint: 'Horizontal menu visible on all screen sizes',
      },
    },
    {
      name: 'Clean Layout',
      description:
        'Minimal layout without navigation elements. Perfect for authentication pages, standalone content, and full-screen experiences.',
      icon: (
        <LucideIcons.Minimize2 className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-emerald-500 via-green-500 to-teal-500',
      value: LAYOUT_OPTIONS.CLEAN,
      useCases: [
        'Authentication pages (login, signup, password reset)',
        'Landing pages and marketing sites',
        'Standalone content pages',
        'Full-screen applications',
        'Modal and overlay content',
        'Embedded widgets and components',
      ],
      features: [
        'No navigation elements or headers',
        'Full viewport height (100vh)',
        'Flex column layout',
        'Perfect for centered content',
        'Minimal overhead and dependencies',
        'No menu items required',
        'Customizable via className prop',
      ],
      technical: {
        structure: 'Simple flex container with full height',
        dependencies: 'No header, sidebar, or menu components',
        customization: 'Full control via className prop',
        useWhen: 'No navigation needed, standalone content',
      },
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Layout Types
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Three distinct layout patterns for various application types. Choose
          the right layout based on your application's navigation needs and
          structure.
        </Typography>
      </div>

      <div className="space-y-8">
        {layoutTypes.map((layout, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 overflow-hidden"
          >
            <div className="w-full space-y-6 p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${layout.color} group-hover:scale-110 transition-all duration-300 shadow-lg shrink-0`}
                >
                  {layout.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Typography
                      tag="h3"
                      className="font-semibold text-xl group-hover:text-primary transition-colors duration-300"
                    >
                      {layout.name}
                    </Typography>
                    <Badge variant="outline" className="text-xs">
                      {layout.value}
                    </Badge>
                  </div>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {layout.description}
                  </Typography>
                </div>
              </div>

              {/* Use Cases */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LucideIcons.Zap className="w-5 h-5 text-primary" />
                  <Typography tag="h4" className="font-semibold text-base">
                    When to Use
                  </Typography>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {layout.useCases.map((useCase, useCaseIndex) => (
                    <div
                      key={useCaseIndex}
                      className="flex items-start gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    >
                      <LucideIcons.CheckCircle className="w-3 h-3 text-primary mt-1 shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {useCase}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LucideIcons.Star className="w-5 h-5 text-primary" />
                  <Typography tag="h4" className="font-semibold text-base">
                    Features
                  </Typography>
                </div>
                <div className="space-y-2">
                  {layout.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-2"
                    >
                      <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {feature}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <LucideIcons.Code className="w-5 h-5 text-primary" />
                  <Typography tag="h4" className="font-semibold text-base">
                    Technical Details
                  </Typography>
                </div>
                <div className="space-y-2">
                  {Object.entries(layout.technical).map(
                    ([key, value], techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Typography
                          tag="span"
                          className="font-medium text-gray-700 dark:text-gray-300 capitalize min-w-[100px]"
                        >
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </Typography>
                        <Typography
                          tag="span"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {value}
                        </Typography>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
};

export default LayoutTypesSection;

