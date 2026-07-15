import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  HeroCard,
  LucideIcons,
  ThemeBackground,
  getBackgroundUrl,
  BasicTable,
} from '@e-burgos/tucu-ui';
import { useTheme, BackgroundVariant } from '@tucu-ui-internal/themes';

// ─── Variant metadata ──────────────────────────────────────────

interface BgVariantInfo {
  id: BackgroundVariant;
  name: string;
  type: 'css' | 'svg';
  desc: string;
  usage: string;
}

const ALL_VARIANTS: BgVariantInfo[] = [
  {
    id: 'base',
    name: 'Base',
    type: 'css',
    desc: 'Spatial radial gradient. Default body/window background that adapts between light and dark.',
    usage: 'Body, root window, app shell',
  },
  {
    id: 'sonoma',
    name: 'Sonoma',
    type: 'css',
    desc: 'Flat neutral surface matching macOS Sonoma system colors.',
    usage: 'System-like flat interfaces',
  },
  {
    id: 'radial',
    name: 'Radial',
    type: 'css',
    desc: 'Vibrant radial gradient with brand colors for expressive surfaces.',
    usage: 'Hero sections, expressive cards',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    type: 'css',
    desc: 'Spatial aurora with animated-style blurred color orbs.',
    usage: 'Landing pages, immersive UIs',
  },
  {
    id: 'depth',
    name: 'Depth',
    type: 'css',
    desc: 'Sober linear gradient, data-focused and subtle.',
    usage: 'Dashboards, data-heavy layouts',
  },
  {
    id: 'demo',
    name: 'Demo',
    type: 'css',
    desc: 'Expressive dual-ellipse gradient for showcases and presentations.',
    usage: 'Demos, showcases, marketing',
  },
  {
    id: 'window',
    name: 'Window',
    type: 'css',
    desc: 'Frosted glass surface with subtle backdrop blur.',
    usage: 'Modal backdrops, floating panels',
  },
  {
    id: 'wave',
    name: 'Wave',
    type: 'svg',
    desc: 'Full-width decorative flowing shapes for desktop/tablet viewports.',
    usage: 'Hero sections, landing pages, desktop full-screen',
  },
  {
    id: 'wallpaper',
    name: 'Wallpaper',
    type: 'svg',
    desc: 'Compact landscape format for banners and contained sections.',
    usage: 'Banners, feature sections, contained backgrounds',
  },
  {
    id: 'mobile',
    name: 'Mobile',
    type: 'svg',
    desc: 'Portrait-oriented asset optimized for mobile viewports.',
    usage: 'Mobile screens, narrow containers, portrait layouts',
  },
];

const CSS_VARIANTS = ALL_VARIANTS.filter((v) => v.type === 'css');

// ─── Component ─────────────────────────────────────────────────

const BackgroundsSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Backgrounds"
        description="Unified background system with 10 variants available across all theme layouts. CSS-only gradients and SVG assets that adapt automatically between light and dark modes."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border border-cyan-400/50">
            <LucideIcons.Image className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* ── Overview ──────────────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="All Background Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              The{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                ThemeBackground
              </code>{' '}
              component supports <strong>10 variants</strong> (7 CSS-only + 3
              SVG assets). All are available in every theme layout via the{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                backgroundVariant
              </code>{' '}
              store value.
            </Typography>
            <BasicTable
              columns={[
                { key: 'name', label: 'Variant' },
                { key: 'type', label: 'Type', className: 'font-mono' },
                { key: 'desc', label: 'Description' },
                { key: 'usage', label: 'Usage' },
              ]}
              data={ALL_VARIANTS.map((v) => ({
                name: v.name,
                type: v.type.toUpperCase(),
                desc: v.desc,
                usage: v.usage,
              }))}
              hoverable
              striped={false}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* ── CSS Variants Grid ─────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="CSS Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Pure CSS backgrounds generated with gradients and custom
              properties. No image downloads required.
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {CSS_VARIANTS.map((v) => (
                <div key={v.id} className="space-y-2">
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-border">
                    <ThemeBackground
                      mode="absolute"
                      variant={v.id}
                      className="!z-0"
                    />
                  </div>
                  <p className="text-xs font-semibold text-center text-gray-700 dark:text-gray-300">
                    {v.name}
                  </p>
                  <p className="text-[10px] text-center text-gray-400">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ── SVG Variants ──────────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="SVG Asset Variants" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              SVG backgrounds loaded from CDN. Optimized for specific viewport
              sizes. The component handles loading states and fallback
              gracefully.
            </Typography>

            {/* Wave */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Wave{' '}
                  <span className="text-[10px] font-mono font-normal text-gray-400">
                    1512 × 982 — Landscape (desktop full-screen)
                  </span>
                </p>
                <div className="relative rounded-xl overflow-hidden border border-border h-[200px]">
                  <ThemeBackground
                    mode="absolute"
                    variant="wave"
                    className="!z-0"
                  />
                </div>
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                  <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate">
                    <span className="text-gray-700 dark:text-gray-300">
                      url:
                    </span>{' '}
                    {getBackgroundUrl('wave', isDark)}
                  </p>
                </div>
              </div>

              {/* Wallpaper */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Wallpaper{' '}
                  <span className="text-[10px] font-mono font-normal text-gray-400">
                    1080 × 560 — Landscape (contained sections)
                  </span>
                </p>
                <div className="relative rounded-xl overflow-hidden border border-border h-[180px]">
                  <ThemeBackground
                    mode="absolute"
                    variant="wallpaper"
                    className="!z-0"
                  />
                </div>
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                  <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate">
                    <span className="text-gray-700 dark:text-gray-300">
                      url:
                    </span>{' '}
                    {getBackgroundUrl('wallpaper', isDark)}
                  </p>
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Mobile{' '}
                  <span className="text-[10px] font-mono font-normal text-gray-400">
                    402 × 874 — Portrait (mobile screens)
                  </span>
                </p>
                <div className="flex justify-center">
                  <div className="relative rounded-xl overflow-hidden border border-border w-[180px] h-[390px]">
                    <ThemeBackground
                      mode="absolute"
                      variant="mobile"
                      className="!z-0"
                    />
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                  <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate">
                    <span className="text-gray-700 dark:text-gray-300">
                      url:
                    </span>{' '}
                    {getBackgroundUrl('mobile', isDark)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ── Usage ─────────────────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Use{' '}
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                ThemeBackground
              </code>{' '}
              with two positioning modes:
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border space-y-2">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Fixed Mode (Default Layouts)
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Fullscreen fixed layer behind content. Content is wrapped
                  automatically.
                </p>
                <pre className="text-[10px] font-mono bg-gray-100 dark:bg-gray-800 rounded-lg p-3 overflow-x-auto">
                  {`<ThemeBackground>
  {children}
</ThemeBackground>`}
                </pre>
              </div>
              <div className="p-4 rounded-xl border border-border space-y-2">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Absolute Mode (macOS Layouts)
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Absolute layer within parent container. No children wrapper.
                </p>
                <pre className="text-[10px] font-mono bg-gray-100 dark:bg-gray-800 rounded-lg p-3 overflow-x-auto">
                  {`<div className="relative">
  <ThemeBackground mode="absolute" />
  {/* your content */}
</div>`}
                </pre>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ── Props ─────────────────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="ThemeBackground Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={[
                { key: 'prop', label: 'Prop' },
                { key: 'type', label: 'Type', className: 'font-mono text-xs' },
                { key: 'default', label: 'Default', className: 'font-mono' },
                { key: 'desc', label: 'Description' },
              ]}
              data={[
                {
                  prop: 'mode',
                  type: "'fixed' | 'absolute'",
                  default: "'fixed'",
                  desc: 'Positioning mode.',
                },
                {
                  prop: 'variant',
                  type: 'BackgroundVariant',
                  default: 'store value',
                  desc: 'Override variant (defaults to theme store).',
                },
                {
                  prop: 'cdnBase',
                  type: 'string',
                  default: 'CDN URL',
                  desc: 'Override CDN base for SVG assets.',
                },
                {
                  prop: 'className',
                  type: 'string',
                  default: '—',
                  desc: 'Additional CSS class for the bg container.',
                },
                {
                  prop: 'style',
                  type: 'CSSProperties',
                  default: '—',
                  desc: 'Inline styles for the bg container.',
                },
                {
                  prop: 'children',
                  type: 'ReactNode',
                  default: '—',
                  desc: 'Content (only wrapped in fixed mode).',
                },
              ]}
              hoverable
              striped={false}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* ── Viewport Mapping ──────────────────────────────────── */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Viewport Recommendations" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Recommended SVG background variant per viewport breakpoint for
              responsive implementations.
            </Typography>
            <BasicTable
              columns={[
                { key: 'viewport', label: 'Viewport' },
                {
                  key: 'breakpoint',
                  label: 'Breakpoint',
                  className: 'font-mono',
                },
                { key: 'variant', label: 'Variant' },
                { key: 'asset', label: 'Asset', className: 'font-mono' },
              ]}
              data={[
                {
                  viewport: 'Mobile',
                  breakpoint: '< 640px',
                  variant: 'mobile',
                  asset: `${isDark ? 'dark' : 'light'}-mobile.svg`,
                },
                {
                  viewport: 'Tablet',
                  breakpoint: '640–1024px',
                  variant: 'wallpaper',
                  asset: `${isDark ? 'dark' : 'light'}-wallpaper.svg`,
                },
                {
                  viewport: 'Desktop',
                  breakpoint: '> 1024px',
                  variant: 'wave',
                  asset: `${isDark ? 'dark' : 'light'}-wave.svg`,
                },
                {
                  viewport: 'Any',
                  breakpoint: 'All',
                  variant: 'CSS variants',
                  asset: 'No asset needed',
                },
              ]}
              hoverable
              striped={false}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default BackgroundsSection;
