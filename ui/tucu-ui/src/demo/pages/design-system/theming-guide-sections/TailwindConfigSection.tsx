import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Alert, CodeBlock } from '../../../../index';

const TailwindConfigSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Tailwind CSS Configuration
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Built on Tailwind CSS v4 with Tucu UI Design Tokens
        </Typography>
      </div>

      <CardContainer>
        <CardTitle
          title="Design Tokens & Configuration"
          className="mt-2 mb-6"
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                    <LucideIcons.Palette className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Color Spectrums
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  The system uses Tucu UI Design Tokens organized into color
                  spectrums:
                </Typography>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <LucideIcons.Circle className="w-2 h-2 mt-1.5 shrink-0 text-brand" />
                    <span>
                      <strong>Color Spectrums:</strong> Blue, Green, Orange,
                      Gray, Indigo, Pink, Purple, Red, Teal, Yellow,
                      Chartreuse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.Circle className="w-2 h-2 mt-1.5 shrink-0 text-brand" />
                    <span>
                      <strong>Color Scale:</strong> Each spectrum has values
                      from 0-100 (e.g., blue-0 to blue-100)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LucideIcons.Circle className="w-2 h-2 mt-1.5 shrink-0 text-brand" />
                    <span>
                      <strong>Light & Dark Variants:</strong> Separate color
                      sets for light and dark modes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-lg">
                    <LucideIcons.Code className="w-5 h-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold">
                    Semantic Colors
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm mb-3"
                >
                  Semantic colors map design tokens to functional purposes:
                </Typography>
                <CodeBlock
                  language="css"
                  code={`/* Semantic Background Colors */
--color-semantic-bg-primary: var(--color-tucu-ui-blue-60);
--color-semantic-bg-secondary: var(--color-tucu-ui-gray-10);
--color-semantic-bg-positive: var(--color-tucu-ui-green-60);
--color-semantic-bg-negative: var(--color-tucu-ui-red-60);

/* Semantic Foreground Colors */
--color-semantic-fg: var(--color-tucu-ui-gray-100);
--color-semantic-fg-muted: var(--color-tucu-ui-gray-60);
--color-semantic-fg-primary: var(--color-tucu-ui-blue-60);`}
                />
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                  <LucideIcons.Ruler className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Spacing Scale
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 text-sm mb-3"
              >
                The spacing scale is mapped to Tucu UI Design Tokens. All
                spacing values use arbitrary values in pixels to maintain
                consistency:
              </Typography>
              <CodeBlock
                language="css"
                code={`/* Spacing Scale - Mapped to Tucu UI Design Tokens */
--spacing-0: 0px;
--spacing-1: 8px;    /* --spacing-tucu-ui-1 */
--spacing-2: 16px;   /* --spacing-tucu-ui-2 */
--spacing-3: 24px;   /* --spacing-tucu-ui-3 */
--spacing-4: 32px;   /* --spacing-tucu-ui-4 */
--spacing-5: 40px;   /* --spacing-tucu-ui-5 */
--spacing-6: 48px;   /* --spacing-tucu-ui-6 */
--spacing-8: 64px;   /* --spacing-tucu-ui-8 */
--spacing-10: 80px;  /* --spacing-tucu-ui-10 */`}
              />
              <Alert variant="info">
                {' '}
                <Typography tag="p" className="text-sm">
                  <strong>Note:</strong> Components use arbitrary values like{' '}
                  <code className="p-1 border border-gray-300 dark:border-gray-700 rounded text-xs">
                    p-[16px]
                  </code>{' '}
                  instead of{' '}
                  <code className="p-1 border border-gray-300 dark:border-gray-700 rounded text-xs">
                    p-4
                  </code>{' '}
                  to maintain original Tailwind spacing values.
                </Typography>
              </Alert>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TailwindConfigSection;

