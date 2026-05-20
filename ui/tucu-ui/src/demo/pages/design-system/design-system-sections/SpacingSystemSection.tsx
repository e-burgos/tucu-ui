import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  HeroCard,
  LucideIcons,
} from '../../../../index';

// Helper function to get hex color from CSS variable
const getColorHex = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || '';
};

const SpacingSystemSection: React.FC = () => {
  const extendedSpacing = [
    { value: 0, key: '0' },
    { value: 1, key: '1' },
    { value: 2, key: '2' },
    { value: 3, key: '3' },
    { value: 4, key: '4' },
    { value: 5, key: '5' },
    { value: 6, key: '6' },
    { value: 7, key: '7' },
    { value: 8, key: '8' },
    { value: 9, key: '9' },
    { value: 10, key: '10' },
    { value: 11, key: '11' },
    { value: 12, key: '12' },
    { value: 13, key: '13' },
    { value: 14, key: '14' },
    { value: 15, key: '15' },
    { value: 16, key: '16' },
    { value: 17, key: '17' },
    { value: 18, key: '18' },
    { value: 19, key: '19' },
    { value: 20, key: '20' },
  ];

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Spacing System"
        description="Spacing scale mapped to Tucu UI Design Tokens."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 via-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Ruler className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Spacing Scale" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {extendedSpacing.map((space) => {
                const varName = `--spacing-${space.key}`;
                const spacingValue = getColorHex(varName);
                const tailwindClasses = `p-${space.value}, m-${space.value}, gap-${space.value}`;
                const displayValue = space.value.toString();
                return (
                  <div
                    key={space.key}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Typography tag="h4" className="font-semibold">
                        {displayValue}
                      </Typography>
                      {spacingValue && (
                        <Typography tag="h4" className="text-muted text-[10px]">
                          {spacingValue}
                        </Typography>
                      )}
                    </div>
                    <div
                      className="bg-primary h-8 rounded w-full"
                      style={{
                        width: spacingValue || `var(${varName})`,
                        minWidth: '4px',
                      }}
                    />
                    <Typography
                      tag="h4"
                      className="text-muted text-[9px] break-all px-1"
                    >
                      {tailwindClasses}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default SpacingSystemSection;
