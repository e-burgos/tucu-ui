import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons } from '../../../../index';

const BestPracticesSection: React.FC = () => {
  return (
    <CardContainer>
      <CardTitle title="Best Practices" className="mt-2 mb-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                  <LucideIcons.Check className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography
                  tag="h4"
                  className="font-semibold text-green-600 dark:text-green-400"
                >
                  Do's
                </Typography>
              </div>
              <ul className="space-y-2">
                {[
                  'Use the useTheme hook to access theme state',
                  'Utilize built-in color presets for consistency',
                  'Test your application in both light and dark modes',
                  'Use the settings panel for user customization',
                  'Leverage persistent storage for user preferences',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg shadow-lg">
                  <LucideIcons.X className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography
                  tag="h4"
                  className="font-semibold text-red-600 dark:text-red-400"
                >
                  Don'ts
                </Typography>
              </div>
              <ul className="space-y-2">
                {[
                  'Directly manipulate CSS custom properties',
                  "Hardcode colors that don't adapt to themes",
                  'Override theme state without using setters',
                  'Ignore RTL support for international apps',
                  'Disable all settings without alternatives',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardTitle>
    </CardContainer>
  );
};

export default BestPracticesSection;

