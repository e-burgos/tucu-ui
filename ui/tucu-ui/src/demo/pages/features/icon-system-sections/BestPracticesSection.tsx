import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
} from '../../../../index';

const BestPracticesSection: React.FC = () => {
  const doItems = [
    'Use LucideIcons namespace for general UI icons (1500+ available)',
    'Use custom icons for domain-specific needs (crypto, layouts, brands)',
    'Size icons with Tailwind classes: w-4 h-4, w-5 h-5, w-6 h-6',
    'Use currentColor via text-* classes for theme-aware coloring',
    'Add aria-hidden="true" on decorative icons next to text',
    'Add aria-label on buttons containing only an icon',
    'Use consistent sizes within the same context (buttons, nav, etc.)',
    'Prefer className over inline style for sizing and color',
  ];

  const dontItems = [
    "Don't import Lucide icons individually — use LucideIcons.* namespace",
    "Don't mix sizing approaches (className vs size prop) in same project",
    "Don't use icon-only buttons without aria-label",
    "Don't use color alone to convey meaning (pair with text or shape)",
    "Don't hardcode colors with fill/stroke — use Tailwind text-* classes",
    "Don't import the entire icon set manually — rely on tree-shaking",
    "Don't use custom Tucu icons when Lucide has an equivalent",
    "Don't forget hover/focus states on interactive icons",
  ];

  const performanceTips = [
    {
      title: 'Lucide is External',
      description:
        'lucide-react is not bundled inside tucu-ui — your bundler tree-shakes it. Only icons you reference are included.',
      icon: <LucideIcons.Package className="w-5 h-5 text-green-500" />,
    },
    {
      title: 'Custom Icons Are Bundled',
      description:
        'All 96 custom icons are always included in the tucu-ui bundle. They are small SVGs (~200B each).',
      icon: <LucideIcons.HardDrive className="w-5 h-5 text-blue-500" />,
    },
    {
      title: 'Avoid Dynamic Imports',
      description:
        'Don\'t lazy-load individual icons. SVGs are tiny and the network overhead outweighs the savings.',
      icon: <LucideIcons.Zap className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'Use Namespace Pattern',
      description:
        'LucideIcons.Home is a single import. Your bundler only includes Home, not the entire library.',
      icon: <LucideIcons.TreeDeciduous className="w-5 h-5 text-purple-500" />,
    },
  ];

  return (
    <>
      <HeroCard
        title="Best Practices"
        description="Guidelines for optimal icon usage — performance, accessibility, consistency, and maintainability patterns."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Do&apos;s and Don&apos;ts
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Quick reference for icon best practices
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <CardContainer>
            <div className="w-full p-4 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                <Typography
                  tag="h3"
                  className="font-semibold text-green-700 dark:text-green-400"
                >
                  Do
                </Typography>
              </div>
              {doItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <Typography
                    tag="span"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContainer>

          <CardContainer>
            <div className="w-full p-4 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <LucideIcons.XCircle className="w-5 h-5 text-red-500" />
                <Typography
                  tag="h3"
                  className="font-semibold text-red-700 dark:text-red-400"
                >
                  Don&apos;t
                </Typography>
              </div>
              {dontItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <LucideIcons.X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <Typography
                    tag="span"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContainer>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Performance Tips
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            How the icon system affects bundle size
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {performanceTips.map((tip, index) => (
            <CardContainer key={index}>
              <div className="w-full p-4 sm:p-6 space-y-2">
                <div className="flex items-center gap-3">
                  {tip.icon}
                  <Typography tag="h3" className="font-semibold">
                    {tip.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {tip.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default BestPracticesSection;
