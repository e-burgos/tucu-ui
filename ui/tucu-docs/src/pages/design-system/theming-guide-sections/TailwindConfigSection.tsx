import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Alert,
  CodeBlock,
  FeatureCard,
} from '@e-burgos/tucu-ui';

const TailwindConfigSection: React.FC = () => {
  const colorSpectrums = [
    {
      icon: (
        <LucideIcons.Circle className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Color Spectrums',
      description:
        'Blue, Green, Orange, Gray, Indigo, Pink, Purple, Red, Teal, Yellow, Chartreuse — 11 spectrums total.',
      iconBgClassName: 'from-indigo-500 to-purple-500',
    },
    {
      icon: (
        <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Scale 0-100',
      description:
        'Each spectrum has values from 0 to 100 in steps of 5/10 (e.g., blue-0, blue-5, blue-10 ... blue-100).',
      iconBgClassName: 'from-cyan-500 to-blue-500',
    },
    {
      icon: (
        <LucideIcons.Moon className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Light & Dark Variants',
      description:
        'Separate color sets for light and dark modes (e.g., --color-tucu-ui-blue-60 vs --color-tucu-ui-dark-blue-70).',
      iconBgClassName: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Tailwind CSS Configuration"
        description="Built on Tailwind CSS v4 with Tucu UI Design Tokens for a CSS-first configuration system."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Code className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Design Tokens
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Primitive color tokens organized into spectrums
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {colorSpectrums.map((item) => (
            <FeatureCard key={item.title} layout="horizontal" {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Semantic Colors
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Design tokens mapped to functional purposes
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Semantic Color Variables">
            <div className="space-y-4">
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
--color-semantic-fg-primary: var(--color-tucu-ui-blue-60);

/* Dark mode variants */
--color-semantic-dark-bg-primary: var(--color-tucu-ui-dark-blue-70);
--color-semantic-dark-bg-secondary: var(--color-tucu-ui-dark-gray-20);`}
              />
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Spacing Scale
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Pixel-based spacing mapped to Tucu UI Design Tokens
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Spacing Tokens">
            <div className="space-y-4">
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
                <Typography tag="p" className="text-sm">
                  <strong>Note:</strong> Components use arbitrary values like{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    p-[16px]
                  </code>{' '}
                  instead of{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    p-4
                  </code>{' '}
                  to maintain original spacing values consistently.
                </Typography>
              </Alert>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default TailwindConfigSection;
