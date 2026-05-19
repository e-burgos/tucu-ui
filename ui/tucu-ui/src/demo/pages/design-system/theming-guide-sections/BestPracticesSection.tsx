import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '../../../../index';

const BestPracticesSection: React.FC = () => {
  const doItems = [
    'Use the useTheme hook to access theme state',
    'Utilize built-in color presets for consistency',
    'Test your application in both light and dark modes',
    'Use the settings panel for user customization',
    'Leverage persistent storage for user preferences',
    'Use semantic Tailwind classes (bg-brand, text-secondary)',
    'Respect THEME_STYLE_LAYOUTS constraints when changing layouts',
  ];

  const dontItems = [
    'Directly manipulate CSS custom properties',
    "Hardcode colors that don't adapt to themes",
    'Override theme state without using setters',
    'Ignore RTL support for international apps',
    'Disable all settings without providing alternatives',
    'Use arbitrary hex values instead of design tokens',
    'Assign layouts incompatible with the current theme style',
  ];

  return (
    <>
      <HeroCard
        title="Best Practices"
        description="Recommended patterns and anti-patterns for working with the theme system effectively."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Guidelines
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Follow these patterns to keep your theming consistent and
            maintainable
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <CardContainer>
            <CardTitle title="Do's">
              <ul className="space-y-2">
                {doItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Don'ts">
              <ul className="space-y-2">
                {dontItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardTitle>
          </CardContainer>
        </div>
      </section>
    </>
  );
};

export default BestPracticesSection;
