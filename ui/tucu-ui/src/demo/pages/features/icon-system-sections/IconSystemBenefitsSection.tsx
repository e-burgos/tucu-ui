import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  FeatureCard,
} from '../../../../index';

const IconSystemBenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: '1500+ Lucide Icons',
      description:
        'Full access to the Lucide React library through a single namespace. Covers virtually every UI need without searching for third-party packs.',
      icon: <LucideIcons.Library className="w-6 h-6" />,
    },
    {
      title: '96 Custom Domain Icons',
      description:
        'Hand-crafted SVG icons for crypto, layouts, brands, and UI patterns not available in Lucide.',
      icon: <LucideIcons.Palette className="w-6 h-6" />,
    },
    {
      title: 'Tree-Shakeable Lucide',
      description:
        'lucide-react is marked as external — your bundler only includes the icons you actually reference, keeping bundle size minimal.',
      icon: <LucideIcons.TreeDeciduous className="w-6 h-6" />,
    },
    {
      title: 'Tailwind Native',
      description:
        'Size with w-*/h-*, color with text-*, opacity, transitions — icons behave like any Tailwind element.',
      icon: <LucideIcons.Paintbrush className="w-6 h-6" />,
    },
    {
      title: 'Dark Mode Ready',
      description:
        'Icons inherit color via currentColor. Use dark: variants on the parent and icons adapt automatically.',
      icon: <LucideIcons.Moon className="w-6 h-6" />,
    },
    {
      title: 'TypeScript Support',
      description:
        'Full type inference for both icon systems. LucideIcons namespace provides autocomplete for all icon names.',
      icon: <LucideIcons.Code2 className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <HeroCard
        title="System Benefits"
        description="Why the tucu-ui icon system gives you a great developer experience — performance, flexibility, and consistency in one package."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Zap className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Key Benefits
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            What makes the tucu-ui icon system stand out
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <FeatureCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Summary
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            The icon system at a glance
          </Typography>
        </div>

        <CardContainer>
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <Typography tag="h3" className="text-3xl font-bold text-brand">
                  1500+
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Lucide icons via namespace
                </Typography>
              </div>
              <div className="space-y-2">
                <Typography tag="h3" className="text-3xl font-bold text-brand">
                  96
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Custom domain icons
                </Typography>
              </div>
              <div className="space-y-2">
                <Typography tag="h3" className="text-3xl font-bold text-brand">
                  0kb
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Unused Lucide icons in bundle
                </Typography>
              </div>
            </div>
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default IconSystemBenefitsSection;
