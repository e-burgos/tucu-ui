import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons } from '../../../../index';

const ThemeConfigurationSection: React.FC = () => {
  return (
    <CardContainer>
      <CardTitle title="Theme Configuration" className="mt-2 mb-6">
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg">
                  <LucideIcons.Settings className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Available Options
                </Typography>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Mode', value: "'light' | 'dark'" },
                  { label: 'Direction', value: "'ltr' | 'rtl'" },
                  {
                    label: 'Layout',
                    value: "'clean' | 'admin' | 'horizontal'",
                  },
                  {
                    label: 'Primary Color',
                    value: '34+ predefined colors',
                  },
                  {
                    label: 'Dark Primary Color',
                    value: '34+ predefined colors',
                  },
                  {
                    label: 'Secondary Color',
                    value: '34+ predefined colors',
                  },
                  {
                    label: 'Dark Secondary Color',
                    value: '34+ predefined colors',
                  },
                  { label: 'Accent Color', value: '34+ predefined colors' },
                  {
                    label: 'Dark Accent Color',
                    value: '34+ predefined colors',
                  },
                  { label: 'Muted Color', value: '34+ predefined colors' },
                  {
                    label: 'Dark Muted Color',
                    value: '34+ predefined colors',
                  },
                  { label: 'Dark Background', value: 'Theme base colors' },
                  { label: 'Light Background', value: 'Theme base colors' },
                  { label: 'Light Dark', value: 'Theme base colors' },
                  { label: 'Dark Light Dark', value: 'Theme base colors' },
                  { label: 'Language', value: "'en' | 'es' | 'fr'" },
                ].map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-3 bg-gray-200 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="font-medium">{option.label}</span>
                    <code className="text-sm text-gray-600 dark:text-gray-400">
                      {option.value}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg shadow-lg">
                  <LucideIcons.Palette className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h4" className="font-semibold">
                  Color Presets
                </Typography>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto">
                {[
                  { name: 'DEFAULT_PRIMARY', color: '#0052ff' },
                  { name: 'DEFAULT_DARK_PRIMARY', color: '#578bfa' },
                  { name: 'DEFAULT_SECONDARY', color: '#eef0f3' },
                  { name: 'DEFAULT_DARK_SECONDARY', color: '#282b31' },
                  { name: 'DEFAULT_ACCENT', color: '#f7d21a' },
                  { name: 'DEFAULT_DARK_ACCENT', color: '#936000' },
                  { name: 'DEFAULT_MUTED', color: '#5b616e' },
                  { name: 'DEFAULT_DARK_MUTED', color: '#8a919e' },
                  { name: 'DEFAULT_LIGHT_BG', color: '#ffffff' },
                  { name: 'DEFAULT_DARK_BG', color: '#0a0b0d' },
                  { name: 'DEFAULT_LIGHT_DARK', color: '#f7f8f9' },
                  { name: 'DEFAULT_DARK_LIGHT_DARK', color: '#141519' },
                  { name: 'BLUE', color: '#105eff' },
                  { name: 'DARK_BLUE', color: '#2162ee' },
                  { name: 'GREEN', color: '#129961' },
                  { name: 'DARK_GREEN', color: '#159962' },
                  { name: 'ORANGE', color: '#e1591b' },
                  { name: 'DARK_ORANGE', color: '#e66020' },
                  { name: 'GRAY', color: '#717886' },
                  { name: 'DARK_GRAY', color: '#727886' },
                  { name: 'INDIGO', color: '#596ff2' },
                  { name: 'DARK_INDIGO', color: '#5c71ee' },
                  { name: 'PINK', color: '#cb51bb' },
                  { name: 'DARK_PINK', color: '#d058c1' },
                  { name: 'PURPLE', color: '#9d6bf2' },
                  { name: 'DARK_PURPLE', color: '#bc7bfb' },
                  { name: 'RED', color: '#e13947' },
                  { name: 'DARK_RED', color: '#e6404e' },
                  { name: 'TEAL', color: '#0093cb' },
                  { name: 'DARK_TEAL', color: '#0095cd' },
                  { name: 'YELLOW', color: '#cf9700' },
                  { name: 'DARK_YELLOW', color: '#c79e00' },
                  { name: 'CHARTREUSE', color: '#56b340' },
                  { name: 'DARK_CHARTREUSE', color: '#7bc869' },
                ].map((preset, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span className="text-xs font-medium truncate">
                      {preset.name}
                    </span>
                  </div>
                ))}
              </div>
              <Typography
                tag="p"
                className="text-xs text-gray-500 dark:text-gray-400 mt-2"
              >
                34 total color presets available (12 default + 22 spectrum
                colors)
              </Typography>
            </div>
          </div>
        </div>
      </CardTitle>
    </CardContainer>
  );
};

export default ThemeConfigurationSection;

