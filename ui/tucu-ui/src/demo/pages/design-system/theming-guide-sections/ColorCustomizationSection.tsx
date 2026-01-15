import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Alert, useTheme } from '../../../../index';

const ColorCustomizationSection: React.FC = () => {
  const { primaryPreset } = useTheme();

  return (
    <CardContainer>
      <CardTitle title="Color Customization" className="mt-2 mb-6">
        <div className="space-y-8">
          <div className="grid grid-cols-1  gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                  <LucideIcons.Palette className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Dynamic Brand Colors
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400"
              >
                Brand colors are dynamically applied using CSS custom
                properties, allowing real-time theme updates without
                rebuilding. Colors are defined in{' '}
                <code className="px-2 py-1 bg-light-dark rounded text-sm">
                  ui/tucu-ui/src/themes/config/index.ts
                </code>
                .
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
                <Typography tag="p" className="text-xs mb-2">
                  <strong>Color Presets:</strong> All spectrum colors use
                  the <code className="px-1 py-2 rounded">-50</code> value
                  from Tucu UI Design Tokens. Default colors use semantic
                  mappings (e.g., blue-60 for primary).
                </Typography>
              </Alert>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                  <LucideIcons.Brush className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Tailwind Integration
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400"
              >
                Seamlessly integrated with Tailwind CSS utilities for
                consistent theming across all components.
              </Typography>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'bg-brand',
                  'text-brand',
                  'border-brand',
                  'bg-secondary',
                  'text-secondary',
                  'border-secondary',
                  'bg-accent',
                  'text-accent',
                  'border-accent',
                  'bg-primary',
                  'text-primary',
                  'border-primary',
                  'bg-dark',
                  'text-dark',
                  'border-dark',
                  'bg-light',
                  'text-light',
                  'border-light',
                  'bg-brand/50',
                  'text-brand/80',
                  'border-brand/30',
                  'bg-secondary/20',
                  'text-secondary/60',
                  'border-secondary/40',
                ].map((className, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded border border-gray-300 dark:border-gray-600 ${
                        className.includes('bg-') ? className : 'bg-brand'
                      }`}
                    ></div>
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
                All colors support opacity modifiers (/10, /20, /30, /50,
                /80, etc.)
              </Typography>
            </div>
          </div>
        </div>
      </CardTitle>
    </CardContainer>
  );
};

export default ColorCustomizationSection;

