import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '../../../../index';

const ThemeConfigurationSection: React.FC = () => {
  const configOptions = [
    { label: 'Mode', value: "'light' | 'dark'" },
    { label: 'Theme Style', value: "'default' | 'macos' | 'macos-tahoe'" },
    { label: 'Direction', value: "'ltr' | 'rtl'" },
    { label: 'Layout', value: '6 options (constrained by theme style)' },
    { label: 'Primary Color', value: '34+ predefined presets' },
    { label: 'Dark Primary Color', value: '34+ predefined presets' },
    { label: 'Secondary Color', value: '34+ predefined presets' },
    { label: 'Dark Secondary Color', value: '34+ predefined presets' },
    { label: 'Accent Color', value: '34+ predefined presets' },
    { label: 'Dark Accent Color', value: '34+ predefined presets' },
    { label: 'Muted Color', value: '34+ predefined presets' },
    { label: 'Dark Muted Color', value: '34+ predefined presets' },
    { label: 'Dark Background', value: 'Theme base colors' },
    { label: 'Light Background', value: 'Theme base colors' },
    { label: 'Light Dark', value: 'Theme base colors' },
    { label: 'Dark Light Dark', value: 'Theme base colors' },
    { label: 'Language', value: "'en' | 'es' | 'fr'" },
  ];

  const colorPresets = [
    { name: 'DEFAULT_PRIMARY', color: '#0052ff' },
    { name: 'DEFAULT_DARK_PRIMARY', color: '#578bfa' },
    { name: 'DEFAULT_SECONDARY', color: '#f3f4f6' },
    { name: 'DEFAULT_DARK_SECONDARY', color: '#172131' },
    { name: 'DEFAULT_ACCENT', color: '#f7d21a' },
    { name: 'DEFAULT_DARK_ACCENT', color: '#936000' },
    { name: 'DEFAULT_MUTED', color: '#4a5565' },
    { name: 'DEFAULT_DARK_MUTED', color: '#828a99' },
    { name: 'DEFAULT_LIGHT_BG', color: '#ffffff' },
    { name: 'DEFAULT_DARK_BG', color: '#030712' },
    { name: 'DEFAULT_LIGHT_DARK', color: '#f9fafb' },
    { name: 'DEFAULT_DARK_LIGHT_DARK', color: '#0a101d' },
    { name: 'BLUE', color: '#105eff' },
    { name: 'DARK_BLUE', color: '#2162ee' },
    { name: 'GREEN', color: '#129961' },
    { name: 'DARK_GREEN', color: '#159962' },
    { name: 'ORANGE', color: '#e1591b' },
    { name: 'DARK_ORANGE', color: '#e66020' },
    { name: 'GRAY', color: '#6a7282' },
    { name: 'DARK_GRAY', color: '#6a7282' },
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
  ];

  return (
    <>
      <HeroCard
        title="Theme Configuration"
        description="All available configuration options and the 34 color presets that power the theming system."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Settings className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Available Options
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            All configurable properties managed by the theme store
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Configuration Options">
            <div className="space-y-3">
              {configOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 px-3 bg-gray-200 dark:bg-gray-800 rounded-lg"
                >
                  <span className="font-medium text-sm">{option.label}</span>
                  <code className="text-xs text-gray-600 dark:text-gray-400">
                    {option.value}
                  </code>
                </div>
              ))}
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Color Presets
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            34 predefined colors (12 default + 22 spectrum)
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Preset Palette">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {colorPresets.map((preset, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-border shadow-sm"
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
                Spectrum colors use the -50 value from Tucu UI Design Tokens.
                Default colors use semantic mappings (e.g., blue-60 for
                primary).
              </Typography>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default ThemeConfigurationSection;
