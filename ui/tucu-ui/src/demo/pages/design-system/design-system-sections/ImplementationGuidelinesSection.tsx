import React from 'react';
import {
  Typography,
  LucideIcons,
  HeroCard,
  FeatureCard,
} from '../../../../index';

const ImplementationGuidelinesSection: React.FC = () => {
  const bestPractices = [
    {
      title: 'Semantic HTML',
      description:
        'Use semantic HTML elements for better accessibility and SEO.',
      icon: <LucideIcons.Code className="h-6 w-6" />,
      iconBgClassName: 'from-green-500 via-emerald-500 to-teal-500',
    },
    {
      title: 'Consistent Naming',
      description: 'Follow consistent naming conventions across your codebase.',
      icon: <LucideIcons.Tag className="h-6 w-6" />,
      iconBgClassName: 'from-blue-500 via-cyan-500 to-sky-500',
    },
    {
      title: 'ARIA Attributes',
      description:
        'Implement proper ARIA attributes for screen reader support.',
      icon: <LucideIcons.Eye className="h-6 w-6" />,
      iconBgClassName: 'from-purple-500 via-violet-500 to-indigo-500',
    },
    {
      title: 'Cross-Device Testing',
      description: 'Test across different devices and screen sizes.',
      icon: <LucideIcons.Monitor className="h-6 w-6" />,
      iconBgClassName: 'from-orange-500 via-amber-500 to-yellow-500',
    },
    {
      title: 'Performance Optimization',
      description:
        'Optimize for performance with lazy loading and code splitting.',
      icon: <LucideIcons.Zap className="h-6 w-6" />,
      iconBgClassName: 'from-pink-500 via-rose-500 to-red-500',
    },
    {
      title: 'Document Usage',
      description:
        'Document component usage with clear examples and props tables.',
      icon: <LucideIcons.FileText className="h-6 w-6" />,
      iconBgClassName: 'from-teal-500 via-cyan-500 to-blue-500',
    },
  ];

  const commonPitfalls = [
    {
      title: 'Inconsistent Spacing',
      description: 'Mixing arbitrary values instead of using design tokens.',
      icon: <LucideIcons.AlertTriangle className="h-6 w-6" />,
      iconBgClassName: 'from-red-500 via-rose-500 to-pink-500',
    },
    {
      title: 'Mixed Color Systems',
      description: 'Using raw hex values instead of semantic color tokens.',
      icon: <LucideIcons.Palette className="h-6 w-6" />,
      iconBgClassName: 'from-red-500 via-rose-500 to-pink-500',
    },
    {
      title: 'Ignoring Responsive',
      description: 'Not testing across breakpoints and device sizes.',
      icon: <LucideIcons.Smartphone className="h-6 w-6" />,
      iconBgClassName: 'from-red-500 via-rose-500 to-pink-500',
    },
    {
      title: 'Overriding Styles',
      description: 'Overriding component styles instead of using variants.',
      icon: <LucideIcons.Ban className="h-6 w-6" />,
      iconBgClassName: 'from-red-500 via-rose-500 to-pink-500',
    },
    {
      title: 'Missing Accessibility',
      description: 'Forgetting focus states, labels, and keyboard navigation.',
      icon: <LucideIcons.EyeOff className="h-6 w-6" />,
      iconBgClassName: 'from-red-500 via-rose-500 to-pink-500',
    },
    {
      title: 'Ignoring Design Tokens',
      description: 'Not following the established token hierarchy.',
      icon: <LucideIcons.XCircle className="h-6 w-6" />,
      iconBgClassName: 'from-red-500 via-rose-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Implementation Guidelines"
        description="Best practices and common pitfalls when implementing the design system."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BookCheck className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Best Practices
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Follow these guidelines for a consistent and maintainable
            implementation
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {bestPractices.map((item) => (
            <FeatureCard
              key={item.title}
              layout="horizontal"
              title={item.title}
              description={item.description}
              icon={item.icon}
              iconBgClassName={item.iconBgClassName}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Common Pitfalls
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Avoid these common mistakes when working with the design system
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {commonPitfalls.map((item) => (
            <FeatureCard
              key={item.title}
              layout="horizontal"
              title={item.title}
              description={item.description}
              icon={item.icon}
              iconBgClassName={item.iconBgClassName}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImplementationGuidelinesSection;
