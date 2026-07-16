import React from 'react';
import {
  CardContainer,
  CardTitle,
  HeroCard,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';
import { useTheme } from '@tucu-ui-internal/themes';

interface ColorSwatch {
  label: string;
  light: string;
  dark: string;
}

const systemColors: ColorSwatch[] = [
  { label: 'Blue', light: '#007aff', dark: '#0a84ff' },
  { label: 'Green', light: '#34c759', dark: '#30d158' },
  { label: 'Orange', light: '#ff9500', dark: '#ff9f0a' },
  { label: 'Red', light: '#ff3b30', dark: '#ff453a' },
  { label: 'Yellow', light: '#ffcc00', dark: '#ffd60a' },
  { label: 'Purple', light: '#af52de', dark: '#bf5af2' },
  { label: 'Pink', light: '#ff2d55', dark: '#ff375f' },
  { label: 'Teal', light: '#5ac8fa', dark: '#64d2ff' },
  { label: 'Indigo', light: '#5856d6', dark: '#5e5ce6' },
];

const grayScale: ColorSwatch[] = [
  { label: 'Gray', light: '#8e8e93', dark: '#8e8e93' },
  { label: 'Gray 2', light: '#aeaeb2', dark: '#636366' },
  { label: 'Gray 3', light: '#c7c7cc', dark: '#48484a' },
  { label: 'Gray 4', light: '#d1d1d6', dark: '#3a3a3c' },
  { label: 'Gray 5', light: '#e5e5ea', dark: '#2c2c2e' },
  { label: 'Gray 6', light: '#f2f2f7', dark: '#1c1c1e' },
];

const labelOpacities = {
  light: [
    {
      label: 'Primary',
      color: 'rgba(0, 0, 0, 0.85)',
      opacity: 0.85,
      desc: 'Main text',
    },
    {
      label: 'Secondary',
      color: 'rgba(60, 60, 67, 0.6)',
      opacity: 0.6,
      desc: 'Subtitles',
    },
    {
      label: 'Tertiary',
      color: 'rgba(60, 60, 67, 0.3)',
      opacity: 0.3,
      desc: 'Placeholders',
    },
    {
      label: 'Quaternary',
      color: 'rgba(60, 60, 67, 0.18)',
      opacity: 0.18,
      desc: 'Disabled',
    },
    {
      label: 'Quinary',
      color: 'rgba(60, 60, 67, 0.05)',
      opacity: 0.05,
      desc: 'Faint',
    },
  ],
  dark: [
    {
      label: 'Primary',
      color: 'rgba(255, 255, 255, 0.85)',
      opacity: 0.85,
      desc: 'Main text',
    },
    {
      label: 'Secondary',
      color: 'rgba(235, 235, 245, 0.6)',
      opacity: 0.6,
      desc: 'Subtitles',
    },
    {
      label: 'Tertiary',
      color: 'rgba(235, 235, 245, 0.3)',
      opacity: 0.3,
      desc: 'Placeholders',
    },
    {
      label: 'Quaternary',
      color: 'rgba(235, 235, 245, 0.18)',
      opacity: 0.18,
      desc: 'Disabled',
    },
    {
      label: 'Quinary',
      color: 'rgba(235, 235, 245, 0.05)',
      opacity: 0.05,
      desc: 'Faint',
    },
  ],
};

const semanticColors = {
  light: [
    { label: 'Label', value: 'rgba(0, 0, 0, 0.85)' },
    { label: 'Secondary Label', value: 'rgba(60, 60, 67, 0.6)' },
    { label: 'Tertiary Label', value: 'rgba(60, 60, 67, 0.3)' },
    { label: 'Separator', value: 'rgba(60, 60, 67, 0.29)' },
    { label: 'Window BG', value: '#ececec' },
    { label: 'Control BG', value: '#ffffff' },
    { label: 'Accent', value: '#007aff' },
    { label: 'Link', value: '#0068da' },
  ],
  dark: [
    { label: 'Label', value: 'rgba(255, 255, 255, 0.85)' },
    { label: 'Secondary Label', value: 'rgba(235, 235, 245, 0.6)' },
    { label: 'Tertiary Label', value: 'rgba(235, 235, 245, 0.3)' },
    { label: 'Separator', value: 'rgba(84, 84, 88, 0.65)' },
    { label: 'Window BG', value: '#1e1e1e' },
    { label: 'Control BG', value: '#1e1e1e' },
    { label: 'Accent', value: '#0a84ff' },
    { label: 'Link', value: '#419cff' },
  ],
};

export const MacOSColorsSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const currentLabels = isDark ? labelOpacities.dark : labelOpacities.light;
  const currentSemantic = isDark ? semanticColors.dark : semanticColors.light;

  return (
    <>
      <HeroCard
        title="Colors"
        description="macOS system color palette based on Apple HIG. All colors adapt between light and dark appearances automatically."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-red-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-red-400/50">
            <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Label Hierarchy */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Label Hierarchy" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Text labels use varying opacity levels to create visual hierarchy.
              Colors adapt based on the current appearance mode.
            </Typography>
            <div
              className="rounded-xl p-6 border border-border"
              style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentLabels.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full h-16 rounded-lg border border-border flex items-center justify-center"
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {Math.round(item.opacity * 100)}% — {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* System Colors */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="System Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              9 vibrant system colors used for accents, charts, and interactive
              elements. Showing {isDark ? 'dark' : 'light'} mode values.
            </Typography>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-3">
              {systemColors.map((color) => (
                <div
                  key={color.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full h-16 rounded-xl shadow-sm"
                    style={{
                      backgroundColor: isDark ? color.dark : color.light,
                    }}
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {color.label}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {isDark ? color.dark : color.light}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Gray Scale */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Gray Scale" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              6 neutral grays for backgrounds, borders, and disabled states.
              Showing {isDark ? 'dark' : 'light'} mode values.
            </Typography>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {grayScale.map((color) => (
                <div
                  key={color.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full h-16 rounded-xl border border-border"
                    style={{
                      backgroundColor: isDark ? color.dark : color.light,
                    }}
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {color.label}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {isDark ? color.dark : color.light}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Semantic Colors */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Semantic Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Purpose-driven tokens mapped to CSS variables. Values shown
              correspond to the current {isDark ? 'dark' : 'light'} appearance.
            </Typography>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentSemantic.map((color) => (
                <div
                  key={color.label}
                  className="flex flex-col gap-2 p-3 rounded-lg border border-border"
                >
                  <div
                    className="w-full h-10 rounded-md border border-border"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {color.label}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono break-all">
                    {color.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Tinted Colors */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Tinted Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              System blue applied at varying opacities creates tinted
              backgrounds for selections and active states.
            </Typography>
            <div className="flex flex-wrap gap-3">
              {[0.05, 0.1, 0.15, 0.2, 0.3, 0.5].map((opacity) => {
                const baseColor = isDark
                  ? `rgba(10, 132, 255, ${opacity})`
                  : `rgba(0, 122, 255, ${opacity})`;
                return (
                  <div
                    key={opacity}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-20 h-14 rounded-lg border border-border"
                      style={{ backgroundColor: baseColor }}
                    />
                    <span className="text-[10px] text-gray-400 font-mono">
                      {Math.round(opacity * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSColorsSection;
