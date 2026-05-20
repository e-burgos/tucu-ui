import React from 'react';
import {
  CardContainer,
  CardTitle,
  HeroCard,
  LucideIcons,
  Typography,
} from '../../../../../index';
import { useTheme } from '../../../../../themes';

/* ──────────────────────────────────────────────────────────────
   Sonoma Colors — data sourced from macos-foundations.css tokens
   All values mirror the CSS custom properties in html.macos { }
   ────────────────────────────────────────────────────────────── */

const systemColors = {
  light: [
    { label: 'Red', cssVar: '--macos-system-red', value: '#ff383c' },
    { label: 'Orange', cssVar: '--macos-system-orange', value: '#ff8d28' },
    { label: 'Yellow', cssVar: '--macos-system-yellow', value: '#ffcc00' },
    { label: 'Green', cssVar: '--macos-system-green', value: '#34c759' },
    { label: 'Mint', cssVar: '--macos-system-mint', value: '#00c8b3' },
    { label: 'Teal', cssVar: '--macos-system-teal', value: '#00c3d0' },
    { label: 'Cyan', cssVar: '--macos-system-cyan', value: '#00c0e8' },
    { label: 'Blue', cssVar: '--macos-system-blue', value: '#0088ff' },
    { label: 'Indigo', cssVar: '--macos-system-indigo', value: '#6155f5' },
    { label: 'Purple', cssVar: '--macos-system-purple', value: '#cb30e0' },
    { label: 'Pink', cssVar: '--macos-system-pink', value: '#ff2d55' },
    { label: 'Brown', cssVar: '--macos-system-brown', value: '#ac7f5e' },
  ],
  dark: [
    { label: 'Red', cssVar: '--macos-system-red', value: '#ff4245' },
    { label: 'Orange', cssVar: '--macos-system-orange', value: '#ff9230' },
    { label: 'Yellow', cssVar: '--macos-system-yellow', value: '#ffd600' },
    { label: 'Green', cssVar: '--macos-system-green', value: '#30d158' },
    { label: 'Mint', cssVar: '--macos-system-mint', value: '#00dac3' },
    { label: 'Teal', cssVar: '--macos-system-teal', value: '#00d2e0' },
    { label: 'Cyan', cssVar: '--macos-system-cyan', value: '#3cd3fe' },
    { label: 'Blue', cssVar: '--macos-system-blue', value: '#0091ff' },
    { label: 'Indigo', cssVar: '--macos-system-indigo', value: '#6d7cff' },
    { label: 'Purple', cssVar: '--macos-system-purple', value: '#db34f2' },
    { label: 'Pink', cssVar: '--macos-system-pink', value: '#ff375f' },
    { label: 'Brown', cssVar: '--macos-system-brown', value: '#b78a66' },
  ],
};

const grayScale = {
  light: [
    { label: 'Gray', cssVar: '--macos-gray', value: '#8e8e93' },
    { label: 'Gray 2', cssVar: '--macos-gray2', value: '#aeaeb2' },
    { label: 'Gray 3', cssVar: '--macos-gray3', value: '#c7c7cc' },
    { label: 'Gray 4', cssVar: '--macos-gray4', value: '#d1d1d6' },
    { label: 'Gray 5', cssVar: '--macos-gray5', value: '#e5e5ea' },
    { label: 'Gray 6', cssVar: '--macos-gray6', value: '#f2f2f7' },
  ],
  dark: [
    { label: 'Gray', cssVar: '--macos-gray', value: '#8e8e93' },
    { label: 'Gray 2', cssVar: '--macos-gray2', value: '#636366' },
    { label: 'Gray 3', cssVar: '--macos-gray3', value: '#48484a' },
    { label: 'Gray 4', cssVar: '--macos-gray4', value: '#3a3a3c' },
    { label: 'Gray 5', cssVar: '--macos-gray5', value: '#2c2c2e' },
    { label: 'Gray 6', cssVar: '--macos-gray6', value: '#1c1c1e' },
  ],
};

const semanticColors = {
  light: [
    {
      label: 'Label',
      cssVar: '--macos-label',
      value: 'rgba(0,0,0,0.88)',
      desc: 'Primary text',
    },
    {
      label: 'Secondary Label',
      cssVar: '--macos-secondary-label',
      value: 'rgba(60,60,67,0.68)',
      desc: 'Supporting text',
    },
    {
      label: 'Tertiary Label',
      cssVar: '--macos-tertiary-label',
      value: 'rgba(60,60,67,0.42)',
      desc: 'Placeholder, disabled',
    },
    {
      label: 'Quaternary Label',
      cssVar: '--macos-quaternary-label',
      value: 'rgba(60,60,67,0.24)',
      desc: 'Faint text',
    },
    {
      label: 'Separator',
      cssVar: '--macos-separator',
      value: 'rgba(60,60,67,0.24)',
      desc: 'Dividers, borders',
    },
    {
      label: 'Opaque Separator',
      cssVar: '--macos-opaque-separator',
      value: '#c6c6c8',
      desc: 'Non-vibrancy separator',
    },
    {
      label: 'Window BG',
      cssVar: '--macos-window-bg',
      value: '#f5f5f7',
      desc: 'Root window',
    },
    {
      label: 'Content BG',
      cssVar: '--macos-content-bg',
      value: '#ffffff',
      desc: 'Content areas',
    },
    {
      label: 'Grouped BG',
      cssVar: '--macos-grouped-bg',
      value: '#f2f2f7',
      desc: 'Grouped tables/lists',
    },
    {
      label: 'Control BG',
      cssVar: '--macos-control-bg',
      value: 'rgba(255,255,255,0.72)',
      desc: 'Buttons, fields',
    },
  ],
  dark: [
    {
      label: 'Label',
      cssVar: '--macos-label',
      value: 'rgba(255,255,255,0.92)',
      desc: 'Primary text',
    },
    {
      label: 'Secondary Label',
      cssVar: '--macos-secondary-label',
      value: 'rgba(235,235,245,0.72)',
      desc: 'Supporting text',
    },
    {
      label: 'Tertiary Label',
      cssVar: '--macos-tertiary-label',
      value: 'rgba(235,235,245,0.44)',
      desc: 'Placeholder, disabled',
    },
    {
      label: 'Quaternary Label',
      cssVar: '--macos-quaternary-label',
      value: 'rgba(235,235,245,0.26)',
      desc: 'Faint text',
    },
    {
      label: 'Separator',
      cssVar: '--macos-separator',
      value: 'rgba(84,84,88,0.6)',
      desc: 'Dividers, borders',
    },
    {
      label: 'Opaque Separator',
      cssVar: '--macos-opaque-separator',
      value: '#38383a',
      desc: 'Non-vibrancy separator',
    },
    {
      label: 'Window BG',
      cssVar: '--macos-window-bg',
      value: '#1c1c1e',
      desc: 'Root window',
    },
    {
      label: 'Content BG',
      cssVar: '--macos-content-bg',
      value: '#151516',
      desc: 'Content areas',
    },
    {
      label: 'Grouped BG',
      cssVar: '--macos-grouped-bg',
      value: '#1c1c1e',
      desc: 'Grouped tables/lists',
    },
    {
      label: 'Control BG',
      cssVar: '--macos-control-bg',
      value: 'rgba(255,255,255,0.10)',
      desc: 'Buttons, fields',
    },
  ],
};

const trafficLights = [
  {
    label: 'Close',
    cssVar: '--macos-traffic-close',
    light: '#ff5f57',
    dark: '#ff5f57',
  },
  {
    label: 'Minimize',
    cssVar: '--macos-traffic-minimize',
    light: '#febc2e',
    dark: '#febc2e',
  },
  {
    label: 'Maximize',
    cssVar: '--macos-traffic-maximize',
    light: '#28c840',
    dark: '#28c840',
  },
  {
    label: 'Inactive',
    cssVar: '--macos-traffic-inactive',
    light: '#dcdcdc',
    dark: '#444444',
  },
];

const chartColors = {
  light: [
    { label: 'Series 1', cssVar: '--macos-chart-series-1', value: '#0088ff' },
    { label: 'Series 2', cssVar: '--macos-chart-series-2', value: '#34c759' },
    { label: 'Series 3', cssVar: '--macos-chart-series-3', value: '#ff8d28' },
    { label: 'Series 4', cssVar: '--macos-chart-series-4', value: '#cb30e0' },
    { label: 'Series 5', cssVar: '--macos-chart-series-5', value: '#ff383c' },
    { label: 'Series 6', cssVar: '--macos-chart-series-6', value: '#00c3d0' },
  ],
  dark: [
    { label: 'Series 1', cssVar: '--macos-chart-series-1', value: '#0091ff' },
    { label: 'Series 2', cssVar: '--macos-chart-series-2', value: '#30d158' },
    { label: 'Series 3', cssVar: '--macos-chart-series-3', value: '#ff9230' },
    { label: 'Series 4', cssVar: '--macos-chart-series-4', value: '#db34f2' },
    { label: 'Series 5', cssVar: '--macos-chart-series-5', value: '#ff4245' },
    { label: 'Series 6', cssVar: '--macos-chart-series-6', value: '#00d2e0' },
  ],
};

const SonomaColorsSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const currentSystem = isDark ? systemColors.dark : systemColors.light;
  const currentGray = isDark ? grayScale.dark : grayScale.light;
  const currentSemantic = isDark ? semanticColors.dark : semanticColors.light;
  const currentChart = isDark ? chartColors.dark : chartColors.light;

  return (
    <>
      <HeroCard
        title="Colors"
        description="macOS Sonoma color tokens — CSS custom properties from html.macos. All colors adapt between light and dark appearances."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-red-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-red-400/50">
            <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* System Colors */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="System Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              12 vibrant system colors. Showing{' '}
              <strong>{isDark ? 'dark' : 'light'}</strong> mode values.
            </Typography>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {currentSystem.map((c) => (
                <div
                  key={c.label}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-full h-14 rounded-xl shadow-sm border border-black/5 dark:border-white/10"
                    style={{ backgroundColor: `var(${c.cssVar}, ${c.value})` }}
                  />
                  <span className="text-xs font-medium text-center leading-tight">
                    {c.label}
                  </span>
                  <code className="text-[9px] text-gray-400 font-mono text-center leading-tight">
                    {c.cssVar}
                  </code>
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
              Role-based color tokens for UI surfaces, labels, separators, and
              backgrounds. Showing <strong>{isDark ? 'dark' : 'light'}</strong>{' '}
              mode.
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSemantic.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 border border-black/10 dark:border-white/10"
                    style={{ backgroundColor: `var(${c.cssVar}, ${c.value})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{c.label}</p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {c.desc}
                    </p>
                    <code className="text-[9px] text-gray-400 font-mono">
                      {c.cssVar}
                    </code>
                  </div>
                  <code className="text-[9px] text-gray-400 font-mono text-right shrink-0 max-w-[120px] break-all">
                    {c.value}
                  </code>
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
              6-step gray ramp following Apple HIG Sonoma. Grays 1–6 map to
              increasing lightness in light mode and decreasing lightness in
              dark mode.
            </Typography>
            <div className="flex flex-col gap-2">
              {currentGray.map((g) => (
                <div key={g.label} className="flex items-center gap-3">
                  <div
                    className="w-12 h-8 rounded-lg border border-black/10 dark:border-white/10 shrink-0"
                    style={{ backgroundColor: `var(${g.cssVar}, ${g.value})` }}
                  />
                  <code className="text-xs font-mono w-40 text-gray-500">
                    {g.cssVar}
                  </code>
                  <code className="text-xs font-mono text-gray-400">
                    {g.value}
                  </code>
                  <span className="text-xs text-gray-400 ml-auto">
                    {g.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Traffic Lights */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Traffic Light Controls" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Window control button colors — Close (red), Minimize (yellow),
              Maximize (green). These are fixed colors; only the inactive state
              changes between appearances.
            </Typography>
            <div className="flex flex-wrap gap-6">
              {trafficLights.map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 shadow-sm"
                    style={{
                      backgroundColor: `var(${t.cssVar}, ${
                        isDark ? t.dark : t.light
                      })`,
                    }}
                  />
                  <span className="text-xs font-medium">{t.label}</span>
                  <code className="text-[9px] font-mono text-gray-400">
                    {t.cssVar}
                  </code>
                  <code className="text-[9px] font-mono text-gray-400">
                    {isDark ? t.dark : t.light}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Chart Series Colors */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Chart Series Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Used by{' '}
              <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useChartTheme()
              </code>{' '}
              when{' '}
              <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                colorScheme === 'macos'
              </code>
              .
            </Typography>
            <div className="flex flex-wrap gap-4">
              {currentChart.map((c) => (
                <div
                  key={c.label}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-12 h-12 rounded-xl shadow-sm border border-black/5 dark:border-white/10"
                    style={{ backgroundColor: `var(${c.cssVar}, ${c.value})` }}
                  />
                  <span className="text-[10px] font-medium">{c.label}</span>
                  <code className="text-[9px] font-mono text-gray-400">
                    {c.value}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SonomaColorsSection;
