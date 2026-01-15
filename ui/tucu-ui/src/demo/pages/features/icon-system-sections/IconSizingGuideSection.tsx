import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Badge,
} from '../../../../index';

const IconSizingGuideSection: React.FC = () => {
  const sizes = [
    {
      name: 'XS',
      size: 'w-3 h-3',
      pixels: '12px',
      use: 'Inline text',
    },
    {
      name: 'SM',
      size: 'w-4 h-4',
      pixels: '16px',
      use: 'Small buttons',
    },
    {
      name: 'MD',
      size: 'w-6 h-6',
      pixels: '24px',
      use: 'Default size',
    },
    {
      name: 'LG',
      size: 'w-8 h-8',
      pixels: '32px',
      use: 'Large buttons',
    },
    {
      name: 'XL',
      size: 'w-12 h-12',
      pixels: '48px',
      use: 'Feature icons',
    },
  ];

  return (
    <div className="space-y-8">
      <CardContainer className="overflow-hidden">
        <CardTitle title="Icon Sizing Guide" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
                <LucideIcons.Ruler className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Standard Icon Sizes
              </Typography>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {sizes.map((size, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="flex justify-center">
                    <LucideIcons.Star className={`${size.size} text-brand`} />
                  </div>
                  <div className="space-y-1">
                    <Typography tag="h4" className="font-semibold text-sm">
                      {size.name}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      {size.pixels}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-xs text-gray-600 dark:text-gray-400"
                    >
                      {size.use}
                    </Typography>
                    <Badge variant="outline" className="text-xs font-mono">
                      {size.size}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default IconSizingGuideSection;
