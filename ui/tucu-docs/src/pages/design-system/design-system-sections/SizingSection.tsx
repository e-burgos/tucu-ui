import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';

// Helper function to get hex color from CSS variable
const getColorHex = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || '';
};

const SizingSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Sizing"
        description="Icon and avatar size tokens from Tucu UI Design Tokens."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Maximize className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <div className="space-y-8">
        {/* Icons */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Icon Sizes" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['xs', 's', 'm', 'l'].map((size) => {
                  const widthClass = `w-icon-${size}`;
                  const heightClass = `h-icon-${size}`;
                  const sizeVar = `--size-icon-${size}`;
                  const sizeValue = getColorHex(sizeVar);
                  return (
                    <div
                      key={size}
                      className="text-center space-y-2 border border-border rounded-lg p-3"
                    >
                      <div
                        className={`bg-primary rounded mx-auto ${widthClass} ${heightClass}`}
                        style={{
                          width: sizeValue || `var(${sizeVar})`,
                          height: sizeValue || `var(${sizeVar})`,
                        }}
                      />
                      <Typography tag="h4" className="font-semibold">
                        {size}
                      </Typography>
                      {sizeValue && (
                        <Typography tag="h4" className="text-muted text-[10px]">
                          {sizeValue}
                        </Typography>
                      )}
                      <Typography
                        tag="h4"
                        className="text-muted text-[9px] mt-1 break-all px-1"
                      >
                        {widthClass}, {heightClass}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        {/* Avatars */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Avatar Sizes" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['s', 'm', 'l', 'xl', 'xxl', 'xxxl'].map((size) => {
                  const widthClass = `w-avatar-${size}`;
                  const heightClass = `h-avatar-${size}`;
                  const sizeVar = `--size-avatar-${size}`;
                  const sizeValue = getColorHex(sizeVar);
                  return (
                    <div
                      key={size}
                      className="text-center space-y-2 border border-border rounded-lg p-3"
                    >
                      <div
                        className={`bg-primary rounded-full mx-auto ${widthClass} ${heightClass}`}
                        style={{
                          width: sizeValue || `var(${sizeVar})`,
                          height: sizeValue || `var(${sizeVar})`,
                        }}
                      />
                      <Typography tag="h4" className="font-semibold">
                        {size}
                      </Typography>
                      {sizeValue && (
                        <Typography tag="h4" className="text-muted text-[10px]">
                          {sizeValue}
                        </Typography>
                      )}
                      <Typography
                        tag="h4"
                        className="text-muted text-[9px] mt-1 break-all px-1"
                      >
                        {widthClass}, {heightClass}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </div>
  );
};

export default SizingSection;
