import React from 'react';
import {
  BasicTable,
  CardContainer,
  CardTitle,
  MacOSBackground,
  getMacOSBackgroundUrl,
  Typography,
} from '../../../../index';
import { useTheme } from '../../../../themes';

interface BgType {
  id: string;
  name: string;
  desc: string;
  dimensions: string;
  usage: string;
}

const bgTypes: BgType[] = [
  {
    id: 'base',
    name: 'Base',
    desc: 'CSS-only spatial gradient generated with tokens. Used as the default body/window background. No image assets needed — adapts automatically between light and dark modes via CSS custom properties.',
    dimensions: 'Fluid (CSS gradient)',
    usage: 'Body, root window, app shell background',
  },
  {
    id: 'wave',
    name: 'Wave',
    desc: 'Full-width decorative background with flowing organic shapes. Designed for desktop/tablet viewports as hero sections or immersive landing pages.',
    dimensions: '1512 × 982',
    usage: 'Hero sections, landing pages, desktop full-screen',
  },
  {
    id: 'wallpaper',
    name: 'Wallpaper',
    desc: 'Compact landscape format optimized for card-like areas, banners, or contained sections where a spatial background adds depth without covering the full viewport.',
    dimensions: '1080 × 560',
    usage: 'Banners, feature sections, contained backgrounds',
  },
  {
    id: 'mobile',
    name: 'Mobile',
    desc: 'Portrait-oriented background asset optimized for mobile viewports and tall narrow containers.',
    dimensions: '402 × 874',
    usage: 'Mobile screens, narrow containers, portrait layouts',
  },
];

export const MacOSBackgroundsSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Backgrounds
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          macOS Tahoe provides 4 background types optimized for different
          viewport sizes and use cases. All adapt between light and dark
          automatically.
        </Typography>
      </div>

      {/* Overview */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Background Types" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              Each background type is designed for a specific screen context.
              Choose the appropriate format based on your layout&apos;s viewport
              and orientation requirements.
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bgTypes.map((bg) => (
                <div
                  key={bg.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          bg.id === 'base'
                            ? isDark
                              ? '#0a84ff'
                              : '#007aff'
                            : bg.id === 'wave'
                            ? isDark
                              ? '#30d158'
                              : '#34c759'
                            : bg.id === 'wallpaper'
                            ? isDark
                              ? '#ff9f0a'
                              : '#ff9500'
                            : isDark
                            ? '#bf5af2'
                            : '#af52de',
                      }}
                    />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {bg.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {bg.desc}
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1">
                    <p className="text-[10px] font-mono text-gray-400">
                      {bg.dimensions}
                    </p>
                    <p className="text-[10px] text-gray-400">{bg.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Base Background */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Base (CSS Spatial Gradient)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Generated entirely with CSS custom properties. Currently used as
              the body background in the demo. Available classes:{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                macos-bg-spatial-aurora
              </code>
              ,{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                macos-bg-spatial-depth
              </code>
              ,{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                macos-bg-spatial-demo
              </code>
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Aurora */}
              <div className="space-y-2">
                <div
                  className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                  style={{
                    backgroundColor: isDark ? '#131318' : '#f0f2f7',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: isDark
                        ? 'radial-gradient(circle at 28% 32%, rgba(18, 60, 100, 0.8) 0%, transparent 42%), radial-gradient(circle at 72% 68%, rgba(55, 30, 100, 0.6) 0%, transparent 42%)'
                        : 'radial-gradient(circle at 28% 32%, rgba(142, 200, 255, 0.45) 0%, transparent 42%), radial-gradient(circle at 72% 68%, rgba(170, 150, 255, 0.28) 0%, transparent 42%)',
                      filter: 'blur(30px)',
                    }}
                  />
                </div>
                <p className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
                  Aurora
                </p>
                <p className="text-[10px] text-center text-gray-400">
                  Animated spatial aurora
                </p>
              </div>
              {/* Depth */}
              <div className="space-y-2">
                <div
                  className="w-full h-40 rounded-xl border border-gray-200 dark:border-gray-700"
                  style={{
                    background: isDark
                      ? 'linear-gradient(160deg, #141418 0%, #18181e 40%, #191520 70%, #141418 100%)'
                      : 'linear-gradient(160deg, #f0f2f6 0%, #eaedf4 40%, #f2f0f8 70%, #eef2f6 100%)',
                  }}
                />
                <p className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
                  Depth
                </p>
                <p className="text-[10px] text-center text-gray-400">
                  Sober, data-focused
                </p>
              </div>
              {/* Demo */}
              <div className="space-y-2">
                <div
                  className="w-full h-40 rounded-xl border border-gray-200 dark:border-gray-700"
                  style={{
                    background: isDark
                      ? 'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(0, 60, 160, 0.55) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(80, 0, 160, 0.4) 0%, transparent 55%), #101014'
                      : 'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(100, 180, 255, 0.4) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(160, 120, 255, 0.3) 0%, transparent 55%), #f0f2f7',
                  }}
                />
                <p className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
                  Demo
                </p>
                <p className="text-[10px] text-center text-gray-400">
                  Expressive, showcases
                </p>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Wave Background */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Wave" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Full-width decorative background for desktop/tablet hero sections.
            </Typography>
            <p className="text-[10px] font-mono text-gray-400 mb-4">
              1512 × 982 — Landscape (desktop full-screen)
            </p>
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <MacOSBackground
                variant="wave"
                className="rounded-xl"
                style={{ height: '320px' }}
              />
            </div>
            <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50">
              <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                <span className="text-gray-700 dark:text-gray-300">url:</span>{' '}
                {getMacOSBackgroundUrl('wave', isDark)}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Wallpaper Background */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Wallpaper" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Compact landscape format for banners, feature sections, and
              contained areas.
            </Typography>
            <p className="text-[10px] font-mono text-gray-400 mb-4">
              1080 × 560 — Landscape (contained sections)
            </p>
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <MacOSBackground
                variant="wallpaper"
                className="rounded-xl"
                style={{ height: '280px' }}
              />
            </div>
            <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50">
              <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                <span className="text-gray-700 dark:text-gray-300">url:</span>{' '}
                {getMacOSBackgroundUrl('wallpaper', isDark)}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Mobile Background */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Mobile" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Portrait-oriented asset for mobile viewports and narrow
              containers.
            </Typography>
            <p className="text-[10px] font-mono text-gray-400 mb-4">
              402 × 874 — Portrait (mobile screens)
            </p>
            <div className="flex justify-center">
              <div
                className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                style={{ width: '220px', height: '478px' }}
              >
                <MacOSBackground
                  variant="mobile"
                  className="rounded-xl w-full h-full"
                />
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50">
              <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                <span className="text-gray-700 dark:text-gray-300">url:</span>{' '}
                {getMacOSBackgroundUrl('mobile', isDark)}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Usage Comparison */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Screen Size Mapping" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Recommended background type per viewport breakpoint.
            </Typography>
            <BasicTable
              columns={[
                { key: 'viewport', label: 'Viewport' },
                {
                  key: 'breakpoint',
                  label: 'Breakpoint',
                  className: 'font-mono',
                },
                { key: 'background', label: 'Background' },
                { key: 'asset', label: 'Asset', className: 'font-mono' },
              ]}
              data={[
                {
                  viewport: 'Mobile',
                  breakpoint: '< 640px',
                  background: 'Mobile',
                  asset: `${isDark ? 'dark' : 'light'}-mobile.svg`,
                },
                {
                  viewport: 'Tablet',
                  breakpoint: '640–1024px',
                  background: 'Wallpaper',
                  asset: `${isDark ? 'dark' : 'light'}-wallpaper.svg`,
                },
                {
                  viewport: 'Desktop',
                  breakpoint: '> 1024px',
                  background: 'Wave',
                  asset: `${isDark ? 'dark' : 'light'}-wave.svg`,
                },
                {
                  viewport: 'Any',
                  breakpoint: 'All',
                  background: 'Base (CSS)',
                  asset: 'No asset needed',
                },
              ]}
              hoverable
              striped={false}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSBackgroundsSection;
