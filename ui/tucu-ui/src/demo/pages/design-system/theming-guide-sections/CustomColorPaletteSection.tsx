import React from 'react';
import { CardContainer, CardTitle, Typography, Alert, CodeBlock } from '../../../../index';

const CustomColorPaletteSection: React.FC = () => {
  return (
    <CardContainer>
      <CardTitle title="Custom Color Palette" className="mt-2 mb-6">
        <div className="space-y-6">
          <Typography tag="p" className="text-gray-600 dark:text-gray-400">
            You can provide custom colors via the{' '}
            <code className="px-2 py-1 bg-light-dark rounded text-sm">
              customPaletteColor
            </code>{' '}
            prop. Colors can be hex values or preset names:
          </Typography>

          <CodeBlock
            language="tsx"
            code={`<ThemeProvider
  menuItems={menuItems}
  customPaletteColor={{
    primary: '#0052ff',           // Hex color or preset name
    darkPrimary: '#578bfa',
    secondary: '#eef0f3',
    darkSecondary: '#282b31',
    accent: '#f7d21a',
    darkAccent: '#936000',
    muted: '#5b616e',
    darkMuted: '#8a919e',
    darkBg: '#0a0b0d',
    lightBg: '#ffffff',
    lightDark: '#f7f8f9',
    darkLightDark: '#141519',
  }}
>
  {/* Your app */}
</ThemeProvider>`}
          />

          <Alert variant="info">
            <Typography tag="p" className="text-xs">
              <strong>Note:</strong> All color presets are defined in{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-700 rounded">
                ui/tucu-ui/src/themes/config/index.ts
              </code>
              . Spectrum colors use the{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-700 rounded">
                -50
              </code>{' '}
              value from Tucu UI Design Tokens, while default colors use
              semantic mappings.
            </Typography>
          </Alert>
        </div>
      </CardTitle>
    </CardContainer>
  );
};

export default CustomColorPaletteSection;

