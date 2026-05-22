import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  HeroCard,
  LucideIcons,
} from '../../../../index';

const BorderRadiusSection: React.FC = () => {
  const extendedBorderRadius = {
    0: 'rounded-[0px]',
    100: 'rounded-[4px]',
    200: 'rounded-[8px]',
    300: 'rounded-[12px]',
    400: 'rounded-[16px]',
    500: 'rounded-[24px]',
    600: 'rounded-[32px]',
    700: 'rounded-[40px]',
    800: 'rounded-[48px]',
    900: 'rounded-[56px]',
    1000: 'rounded-[100000px]',
  };

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Border Radius"
        description="Border radius scale using Tailwind arbitrary values for consistent rounded corners."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Circle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Border Radius Scale" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(extendedBorderRadius).map(
                ([radius, className]) => {
                  const pixelValue = className
                    .replace('rounded-[', '')
                    .replace(']', '');
                  return (
                    <div
                      key={radius}
                      className="border border-border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <Typography tag="h4" className="font-semibold">
                          {radius}
                        </Typography>
                        <Typography tag="h4" className="text-muted text-[10px]">
                          {pixelValue}
                        </Typography>
                      </div>
                      <div className="flex justify-center">
                        <div className={`w-20 h-20 bg-primary ${className}`} />
                      </div>
                      <Typography
                        tag="h4"
                        className="text-muted text-[9px] break-all px-1 text-center"
                      >
                        {className}
                      </Typography>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default BorderRadiusSection;
