import React from 'react';
import { CardContainer, CardTitle, Typography, CodeBlock } from '../../../../index';

const AdvancedColorSystemSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Advanced Color System
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Multi-layered color architecture with dynamic theming capabilities
        </Typography>
      </div>

      <div className="grid grid-cols-1  gap-6">
        <CardContainer>
          <CardTitle title="Color Layers" className="mt-2 mb-6">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400"
              >
                The theming system supports multiple color layers for
                comprehensive theming:
              </Typography>

              <div className="space-y-3">
                {[
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
                    default: '#eef0f3 (DEFAULT_SECONDARY)',
                  },
                  {
                    layer: 'Dark Secondary',
                    description: 'Secondary color for dark mode',
                    variable: '--color-semantic-dark-bg-secondary',
                    default: '#282b31 (DEFAULT_DARK_SECONDARY)',
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
                    default: '#5b616e (DEFAULT_MUTED)',
                  },
                  {
                    layer: 'Dark Muted',
                    description: 'Muted text color for dark mode',
                    variable: '--color-semantic-dark-fg-muted',
                    default: '#8a919e (DEFAULT_DARK_MUTED)',
                  },
                  {
                    layer: 'Dark Background',
                    description: 'Dark theme base color',
                    variable: '--color-semantic-dark-bg',
                    default: '#0a0b0d (DEFAULT_DARK_BG)',
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
                    default: '#f7f8f9 (DEFAULT_LIGHT_DARK)',
                  },
                  {
                    layer: 'Dark Light Dark',
                    description: 'Dark theme secondary background',
                    variable: '--color-semantic-dark-bg-secondary-wash',
                    default: '#141519 (DEFAULT_DARK_LIGHT_DARK)',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-200 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
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
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle
            title="Dynamic Color Mixing"
            className="mt-2 mb-6 h-full"
          >
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400"
              >
                Advanced color manipulation using CSS color-mix() for
                automatic variations:
              </Typography>

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
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </>
  );
};

export default AdvancedColorSystemSection;

