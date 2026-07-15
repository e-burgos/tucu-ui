import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Alert,
  useTheme,
} from '@e-burgos/tucu-ui';

const ColorCustomizationSection: React.FC = () => {
  const { primaryPreset } = useTheme();

  const tailwindUtilities = [
    'bg-brand',
    'text-brand',
    'border-brand',
    'bg-primary',
    'text-primary',
    'border-primary',
    'bg-secondary',
    'text-secondary',
    'border-secondary',
    'bg-accent',
    'text-accent',
    'border-accent',
    'bg-foreground',
    'text-foreground',
    'border-foreground',
    'bg-muted',
    'text-muted',
    'border-muted',
    'bg-border',
    'border-border',
    'bg-success',
    'text-success',
    'bg-warning',
    'text-warning',
    'bg-error',
    'text-error',
    'bg-info',
    'text-info',
    'bg-body',
    'bg-dark',
    'text-dark',
    'bg-light',
    'text-light',
    'text-foreground/60',
    'bg-brand/50',
    'border-brand/30',
  ];

  return (
    <>
      <HeroCard
        title="Color Customization"
        description="Dynamic brand colors using CSS custom properties and seamless Tailwind CSS utility integration."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Brush className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Dynamic Brand Colors
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Real-time theme updates via CSS custom properties
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Active CSS Variable">
            <div className="space-y-4">
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                Brand colors are dynamically applied using CSS custom
                properties, allowing real-time theme updates without rebuilding.
                Colors are defined in{' '}
                <code className="px-1 py-0.5 border border-border rounded text-xs">
                  ui/tucu-ui/src/themes/config/index.ts
                </code>
              </Typography>
              <div className="p-3 flex justify-center items-center bg-gray-200 dark:bg-gray-800 rounded-lg w-full">
                <Typography
                  tag="code"
                  className="w-full text-sm text-gray-600 dark:text-gray-400"
                >
                  --color-semantic-bg-primary:{' '}
                  {primaryPreset?.value || '#0052ff'}
                </Typography>
              </div>
              <Alert variant="info">
                <Typography tag="p" className="text-xs">
                  <strong>Color Presets:</strong> Spectrum colors use the{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    -50
                  </code>{' '}
                  value from Tucu UI Design Tokens. Default colors use semantic
                  mappings (e.g., blue-60 for primary).
                </Typography>
              </Alert>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Tailwind Integration
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Available utility classes that consume theme colors
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Utility Classes">
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tailwindUtilities.map((className, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded border border-border ${
                        className.includes('bg-') ? className : 'bg-brand'
                      }`}
                    />
                    <Typography
                      tag="code"
                      className="text-xs text-gray-600 dark:text-gray-400"
                    >
                      .{className}
                    </Typography>
                  </div>
                ))}
              </div>
              <Typography
                tag="p"
                className="text-xs text-gray-500 dark:text-gray-400 mt-2"
              >
                All colors support opacity modifiers (/10, /20, /30, /50, /80,
                etc.)
              </Typography>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default ColorCustomizationSection;
