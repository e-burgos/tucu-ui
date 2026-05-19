import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const colorLayers = [
  {
    layer: 'Primary',
    description: 'Primary brand identity color',
    variable: '--color-semantic-bg-primary',
    default: '#0052ff (DEFAULT_PRIMARY)',
  },
  {
    layer: 'Dark Primary',
    description: 'Primary color for dark mode',
    variable: '--color-semantic-dark-bg-primary',
    default: '#578bfa (DEFAULT_DARK_PRIMARY)',
  },
  {
    layer: 'Secondary',
    description: 'Supporting color for accents',
    variable: '--color-semantic-bg-secondary',
    default: '#f3f4f6 (DEFAULT_SECONDARY)',
  },
  {
    layer: 'Dark Secondary',
    description: 'Secondary color for dark mode',
    variable: '--color-semantic-dark-bg-secondary',
    default: '#172131 (DEFAULT_DARK_SECONDARY)',
  },
  {
    layer: 'Accent',
    description: 'Highlight color for actions',
    variable: '--color-semantic-accent-bold-yellow',
    default: '#f7d21a (DEFAULT_ACCENT)',
  },
  {
    layer: 'Dark Accent',
    description: 'Accent color for dark mode',
    variable: '--color-semantic-dark-accent-bold-yellow',
    default: '#936000 (DEFAULT_DARK_ACCENT)',
  },
  {
    layer: 'Muted',
    description: 'Muted text color',
    variable: '--color-semantic-fg-muted',
    default: '#4a5565 (DEFAULT_MUTED)',
  },
  {
    layer: 'Dark Muted',
    description: 'Muted text color for dark mode',
    variable: '--color-semantic-dark-fg-muted',
    default: '#828a99 (DEFAULT_DARK_MUTED)',
  },
  {
    layer: 'Dark Background',
    description: 'Dark theme base color',
    variable: '--color-semantic-dark-bg',
    default: '#030712 (DEFAULT_DARK_BG)',
  },
  {
    layer: 'Light Background',
    description: 'Light theme base color',
    variable: '--color-semantic-bg',
    default: '#ffffff (DEFAULT_LIGHT_BG)',
  },
  {
    layer: 'Light Dark',
    description: 'Light theme secondary background',
    variable: '--color-semantic-bg-secondary-wash',
    default: '#f9fafb (DEFAULT_LIGHT_DARK)',
  },
  {
    layer: 'Dark Light Dark',
    description: 'Dark theme secondary background',
    variable: '--color-semantic-dark-bg-secondary-wash',
    default: '#0a101d (DEFAULT_DARK_LIGHT_DARK)',
  },
];

const AdvancedColorSystemSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Advanced Color System"
        description="Multi-layered color architecture with 12 semantic variables controlling every surface and foreground in your application."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Layers className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Color Layers
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            12 semantic color variables organized in light/dark pairs
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="All Color Variables">
            <div className="space-y-3">
              {colorLayers.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-200 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <Typography tag="h5" className="font-semibold text-sm">
                      {item.layer}
                    </Typography>
                    <Typography
                      tag="code"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      {item.variable}
                    </Typography>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400 mb-1"
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-500 dark:text-gray-500"
                  >
                    Default: {item.default}
                  </Typography>
                </div>
              ))}
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            CSS Variable Mapping
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            How design tokens map to Tailwind utilities
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Variable → Utility Mapping">
            <CodeBlock
              language="css"
              expanded={false}
              code={`/* Theme colors are available via CSS variables */
--color-semantic-bg-primary: var(--color-tucu-ui-blue-60);
--color-semantic-dark-bg-primary: var(--color-tucu-ui-dark-blue-70);
--color-semantic-bg-secondary: var(--color-tucu-ui-gray-10);
--color-semantic-accent-bold-yellow: var(--color-tucu-ui-yellow-30);
--color-semantic-fg-muted: var(--color-tucu-ui-gray-60);

/* Tailwind utilities */
.bg-brand        /* Uses --color-semantic-bg-primary */
.text-brand      /* Uses --color-semantic-bg-primary */
.bg-secondary    /* Uses --color-semantic-bg-secondary */
.text-muted      /* Uses --color-semantic-fg-muted */

/* Opacity support */
.bg-brand/50     /* 50% opacity */
.text-brand/80   /* 80% opacity */
.border-brand/30 /* 30% opacity */`}
            />
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default AdvancedColorSystemSection;
