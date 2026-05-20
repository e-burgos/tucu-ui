import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Alert,
  CodeBlock,
} from '../../../../index';

const CustomColorPaletteSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Custom Color Palette"
        description="Override every color layer with hex values to match your brand identity exactly."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-pink-500 via-rose-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Paintbrush className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Custom Palette Configuration
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Provide custom colors via the{' '}
            <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
              customPaletteColor
            </code>{' '}
            prop on ThemeProvider
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Usage Example">
            <CodeBlock
              language="tsx"
              code={`<ThemeProvider
  menuItems={menuItems}
  customPaletteColor={{
    primary: '#0052ff',           // Hex color or preset name
    darkPrimary: '#578bfa',
    secondary: '#f3f4f6',
    darkSecondary: '#172131',
    accent: '#f7d21a',
    darkAccent: '#936000',
    muted: '#4a5565',
    darkMuted: '#828a99',
    darkBg: '#030712',
    lightBg: '#ffffff',
    lightDark: '#f9fafb',
    darkLightDark: '#0a101d',
  }}
>
  {/* Your app */}
</ThemeProvider>`}
            />
          </CardTitle>
        </CardContainer>
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
            value from Tucu UI Design Tokens, while default colors use semantic
            mappings.
          </Typography>
        </Alert>
      </section>
    </>
  );
};

export default CustomColorPaletteSection;
