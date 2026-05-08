import React from 'react';
import { CardContainer, CardTitle, Typography } from '../../../../index';

// Helper function to get hex color from CSS variable
const getColorHex = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || '';
};

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
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Border Radius
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Border radius values from Tucu UI Design Tokens
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Border Radius Scale" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(extendedBorderRadius).map(
                ([radius, className]) => {
                  const varName = `--radius-tucu-ui-${radius}`;
                  const radiusValue = getColorHex(varName);
                  return (
                    <div
                      key={radius}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <Typography tag="h4" className="font-semibold">
                          {radius}
                        </Typography>
                        {radiusValue && (
                          <Typography
                            tag="h4"
                            className="text-muted text-[10px]"
                          >
                            {radiusValue}
                          </Typography>
                        )}
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
    </>
  );
};

export default BorderRadiusSection;
