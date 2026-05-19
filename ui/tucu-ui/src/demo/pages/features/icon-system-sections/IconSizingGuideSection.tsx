import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
} from '../../../../index';

const IconSizingGuideSection: React.FC = () => {
  const sizes = [
    {
      label: 'XS',
      tailwind: 'w-3 h-3',
      pixels: '12px',
      usage: 'Inline text, badges, micro indicators',
    },
    {
      label: 'SM',
      tailwind: 'w-4 h-4',
      pixels: '16px',
      usage: 'Input icons, small buttons, list markers',
    },
    {
      label: 'MD',
      tailwind: 'w-5 h-5',
      pixels: '20px',
      usage: 'Default button icons, navigation items',
    },
    {
      label: 'LG',
      tailwind: 'w-6 h-6',
      pixels: '24px',
      usage: 'Card headers, standalone icons, large buttons',
    },
    {
      label: 'XL',
      tailwind: 'w-8 h-8',
      pixels: '32px',
      usage: 'Feature highlights, empty states, hero sections',
    },
  ];

  return (
    <>
      <HeroCard
        title="Icon Sizing Guide"
        description="Consistent sizing scale for icons across different UI contexts. Use Tailwind width/height classes for predictable sizing."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Ruler className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Size Scale
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Visual comparison of icon sizes with recommended use cases
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-5 gap-4 sm:gap-6">
              {sizes.map((size) => (
                <div
                  key={size.label}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[80px]">
                    <LucideIcons.Star className={size.tailwind} />
                  </div>
                  <div className="space-y-1">
                    <Typography tag="h3" className="font-bold text-lg">
                      {size.label}
                    </Typography>
                    <code className="text-xs text-brand block">
                      {size.tailwind}
                    </code>
                    <Typography
                      tag="span"
                      className="text-xs text-gray-500 dark:text-gray-400 block"
                    >
                      {size.pixels}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            When to Use Each Size
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Recommended contexts for each icon size
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sizes.map((size) => (
            <CardContainer key={size.label}>
              <div className="w-full p-4 sm:p-5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <LucideIcons.Star className={size.tailwind} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Typography tag="h3" className="font-semibold">
                      {size.label}
                    </Typography>
                    <code className="text-xs text-gray-500">
                      {size.tailwind}
                    </code>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {size.usage}
                  </Typography>
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default IconSizingGuideSection;
