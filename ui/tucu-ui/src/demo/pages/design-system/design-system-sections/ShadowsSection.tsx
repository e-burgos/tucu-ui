import React from 'react';
import { CardContainer, CardTitle, Typography } from '../../../../index';

// Helper function to get hex color from CSS variable
const getColorHex = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || '';
};

const ShadowsSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Shadows
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Shadow tokens from Tucu UI Design System for depth and elevation
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Shadow Tokens" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Main',
                  varName: '--shadow-main',
                  description: 'Primary shadow for cards and elevated elements',
                },
                {
                  name: 'Light',
                  varName: '--shadow-light',
                  description: 'Subtle shadow for minimal elevation',
                },
                {
                  name: 'Large',
                  varName: '--shadow-large',
                  description: 'Prominent shadow for modals and overlays',
                },
                {
                  name: 'Card',
                  varName: '--shadow-card',
                  description: 'Standard shadow for card components',
                },
                {
                  name: 'Transaction',
                  varName: '--shadow-transaction',
                  description: 'Shadow for transaction lists and tables',
                },
                {
                  name: 'Expand',
                  varName: '--shadow-expand',
                  description: 'Strong shadow for expanded elements',
                },
                {
                  name: 'Button',
                  varName: '--shadow-button',
                  description: 'Shadow for button components',
                },
                {
                  name: 'Drop Shadow Main',
                  varName: '--drop-shadow-main',
                  description: 'Drop shadow for images and graphics',
                },
              ].map((shadow) => {
                const shadowValue = getColorHex(shadow.varName);
                return (
                  <div key={shadow.name} className="space-y-3">
                    <div className="space-y-1">
                      <Typography tag="h3" className="font-semibold">
                        {shadow.name}
                      </Typography>
                      <Typography tag="p" className="text-sm text-muted">
                        {shadow.description}
                      </Typography>
                    </div>
                    <div
                      className="h-32 bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center"
                      style={{
                        boxShadow: shadowValue || `var(${shadow.varName})`,
                      }}
                    >
                      <Typography tag="h4" className="text-center">
                        {shadow.name}
                      </Typography>
                    </div>
                    <div className="space-y-1">
                      <Typography tag="h4" className="text-muted text-xs break-all font-mono">
                        {shadow.varName}
                      </Typography>
                      {shadowValue && (
                        <Typography tag="h4" className="text-muted text-[10px] break-all">
                          {shadowValue}
                        </Typography>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ShadowsSection;

