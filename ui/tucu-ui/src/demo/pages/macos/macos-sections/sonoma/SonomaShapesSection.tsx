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
   Sonoma Shapes & Spacing — tokens from macos-foundations.css
   Radii · Spacing grid · Shadows · Layout dimensions · Transitions
   ────────────────────────────────────────────────────────────── */

const radii = [
  {
    name: 'Pill',
    cssVar: '--macos-radius-pill',
    value: '999px',
    usage: 'Tags, badges, chips',
  },
  {
    name: 'Sheet',
    cssVar: '--macos-radius-sheet',
    value: '24px',
    usage: 'Full-screen sheets, drawers',
  },
  {
    name: 'Window',
    cssVar: '--macos-radius-window',
    value: '18px',
    usage: 'App windows, main containers',
  },
  {
    name: 'Popover',
    cssVar: '--macos-radius-popover',
    value: '16px',
    usage: 'Popovers, dropdowns, menus',
  },
  {
    name: 'Control',
    cssVar: '--macos-radius-control',
    value: '10px',
    usage: 'Buttons, inputs, cards',
  },
  {
    name: 'Small Control',
    cssVar: '--macos-radius-small-control',
    value: '8px',
    usage: 'Icon buttons, small chips',
  },
];

const spacingTokens = [
  {
    name: '1',
    cssVar: '--macos-space-1',
    value: '4px',
    px: 4,
    desc: '½ grid — tight inline spacing',
  },
  {
    name: '2',
    cssVar: '--macos-space-2',
    value: '8px',
    px: 8,
    desc: '1 grid — base unit, icon padding',
  },
  {
    name: '3',
    cssVar: '--macos-space-3',
    value: '12px',
    px: 12,
    desc: '1.5× — compact row gaps',
  },
  {
    name: '4',
    cssVar: '--macos-space-4',
    value: '16px',
    px: 16,
    desc: '2× — standard row / column gap',
  },
  {
    name: '5',
    cssVar: '--macos-space-5',
    value: '20px',
    px: 20,
    desc: '2.5× — section padding',
  },
  {
    name: '6',
    cssVar: '--macos-space-6',
    value: '24px',
    px: 24,
    desc: '3× — card padding, section gap',
  },
  {
    name: '8',
    cssVar: '--macos-space-8',
    value: '32px',
    px: 32,
    desc: '4× — content column gap',
  },
];

const shadows = [
  {
    name: 'Window',
    cssVar: '--macos-shadow-window',
    value: '0 18px 60px rgba(0,0,0,0.14),\n0 4px 16px rgba(0,0,0,0.08)',
    usage: 'App windows, floating panels',
    intensity: 4,
  },
  {
    name: 'Popover',
    cssVar: '--macos-shadow-popover',
    value: '0 8px 32px rgba(0,0,0,0.12),\n0 2px 8px rgba(0,0,0,0.06)',
    usage: 'Menus, popovers, tooltips',
    intensity: 3,
  },
  {
    name: 'Card',
    cssVar: '--macos-shadow-card',
    value: '0 1px 4px rgba(0,0,0,0.04),\n0 4px 16px rgba(0,0,0,0.06)',
    usage: 'Content cards, widget panels',
    intensity: 2,
  },
  {
    name: 'Focus Ring',
    cssVar: '--macos-shadow-focus',
    value: '0 0 0 3px rgba(0,122,255,0.5)',
    usage: 'Focused interactive controls',
    intensity: 1,
  },
  {
    name: 'Button Pressed',
    cssVar: '--macos-shadow-button-pressed',
    value: 'inset 0 1px 2px rgba(0,0,0,0.10)',
    usage: 'Pressed/active button state',
    intensity: 1,
  },
];

const layoutDimensions = [
  {
    name: 'Title Bar Height',
    cssVar: '--macos-titlebar-height',
    value: '28px',
    desc: 'App title bar + traffic lights zone',
  },
  {
    name: 'Toolbar Height',
    cssVar: '--macos-toolbar-height',
    value: '58px',
    desc: 'Primary app toolbar below title bar',
  },
  {
    name: 'Sidebar Width',
    cssVar: '--macos-sidebar-width',
    value: '240px',
    desc: 'Default sidebar panel width',
  },
  {
    name: 'Inspector Width',
    cssVar: '--macos-inspector-width',
    value: '300px',
    desc: 'Trailing inspector / detail panel width',
  },
  {
    name: 'Content Padding',
    cssVar: '--macos-content-padding',
    value: '20px',
    desc: 'Standard content area insets',
  },
  {
    name: 'Grid Base',
    cssVar: '--macos-grid',
    value: '8px',
    desc: 'Base 8pt grid unit for all spacing',
  },
];

const transitions = [
  {
    name: 'Fast',
    cssVar: '--macos-transition-fast',
    value: '150ms ease-out',
    usage: 'Hover states, color changes, micro-interactions',
    bar: 15,
  },
  {
    name: 'Normal',
    cssVar: '--macos-transition-normal',
    value: '250ms cubic-bezier(0.2, 0, 0, 1)',
    usage: 'Panel slides, focus rings, most animations',
    bar: 25,
  },
  {
    name: 'Slow',
    cssVar: '--macos-transition-slow',
    value: '350ms cubic-bezier(0.2, 0, 0, 1)',
    usage: 'Large panel reveals, sheet presentations',
    bar: 35,
  },
];

const SonomaShapesSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <>
      <HeroCard
        title="Shapes & Spacing"
        description="Sonoma geometric tokens — border radii, spacing grid, shadows, layout dimensions, and motion timing defined via --macos-* CSS custom properties."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-400 via-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-indigo-400/50">
            <LucideIcons.Shapes className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Border Radii */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Border Radii" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              Six radius levels from Pill down to Small Control. Each is stored
              in a CSS custom property and used consistently across all
              surfaces.
            </Typography>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {radii.map((r) => {
                const px = r.value === '999px' ? 40 : parseInt(r.value);
                const previewRadius = r.value === '999px' ? 40 : px;
                return (
                  <div
                    key={r.name}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="w-20 h-20 border-2"
                      style={{
                        borderRadius: `${previewRadius}px`,
                        borderColor: isDark
                          ? 'rgba(255,255,255,0.2)'
                          : 'rgba(0,0,0,0.15)',
                        backgroundColor: isDark
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(0,0,0,0.04)',
                      }}
                    />
                    <div className="text-center">
                      <p className="font-semibold text-sm">{r.name}</p>
                      <code className="text-[10px] font-mono text-gray-400">
                        {r.cssVar}
                      </code>
                      <p className="text-xs font-mono font-bold">{r.value}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {r.usage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Spacing Grid */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="8pt Spacing Grid" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Sonoma uses an 8pt base grid (
              <code className="text-xs font-mono">--macos-grid: 8px</code>). All
              layout spacing snaps to multiples of this unit for visual
              consistency and perfect pixel alignment.
            </Typography>
            <div className="space-y-3">
              {spacingTokens.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <code className="w-32 shrink-0 text-[10px] font-mono text-gray-400">
                    {s.cssVar}
                  </code>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="rounded shrink-0"
                      style={{
                        width: `${s.px}px`,
                        height: 20,
                        backgroundColor: isDark
                          ? `rgba(10,132,255,${0.5 + s.px / 120})`
                          : `rgba(0,122,255,${0.3 + s.px / 120})`,
                      }}
                    />
                    <div>
                      <span className="font-mono font-bold text-xs">
                        {s.value}
                      </span>
                      <span className="ml-2 text-[10px] text-gray-400">
                        {s.desc}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Shadows */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Shadow Levels" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              Sonoma shadows are subtle and layered — two box-shadows combined
              for natural depth perception.{' '}
              <code className="text-xs font-mono">--macos-shadow-*</code> tokens
              are referenced by all surface components.
            </Typography>
            <div className="space-y-5">
              {shadows.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="sm:w-32 shrink-0 text-sm font-semibold">
                    {s.name}
                  </div>
                  <div className="shrink-0">
                    <div
                      className="w-16 h-12 rounded-xl"
                      style={{
                        boxShadow: `var(${s.cssVar}, ${s.value.replace(
                          /\n/g,
                          ' '
                        )})`,
                        backgroundColor: isDark ? '#2c2c2e' : '#ffffff',
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <code className="block text-[9px] font-mono text-gray-400 whitespace-pre-line">
                      {s.cssVar}
                    </code>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {s.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Layout Dimensions */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Layout Dimensions" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Fixed layout constants matching macOS 14 Sonoma's window chrome
              and structural panel dimensions.
            </Typography>
            {/* App chrome diagram */}
            <div
              className="relative rounded-2xl overflow-hidden mb-6 border"
              style={{
                borderColor: isDark
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(0,0,0,0.1)',
                backgroundColor: isDark ? '#1c1c1e' : '#f5f5f7',
                height: 220,
              }}
            >
              {/* Title Bar */}
              <div
                className="absolute top-0 left-0 right-0 flex items-center px-3 gap-1.5"
                style={{
                  height: 28,
                  backgroundColor: isDark
                    ? 'rgba(40,40,42,0.8)'
                    : 'rgba(255,255,255,0.72)',
                  borderBottom: `1px solid ${
                    isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                  }`,
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-80" />
                <span className="ml-auto text-[9px] text-gray-400">
                  Title Bar · 28px
                </span>
              </div>
              {/* Toolbar */}
              <div
                className="absolute left-0 right-0 flex items-center px-4"
                style={{
                  top: 28,
                  height: 58,
                  backgroundColor: isDark
                    ? 'rgba(44,44,46,0.6)'
                    : 'rgba(246,246,248,0.6)',
                  borderBottom: `1px solid ${
                    isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                  }`,
                }}
              >
                <span className="text-[9px] text-gray-400">Toolbar · 58px</span>
              </div>
              {/* Sidebar */}
              <div
                className="absolute left-0 bottom-0 flex items-end pb-2 pl-2"
                style={{
                  top: 86,
                  width: 120,
                  backgroundColor: isDark
                    ? 'rgba(28,28,30,0.7)'
                    : 'rgba(246,246,248,0.7)',
                  borderRight: `1px solid ${
                    isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                  }`,
                }}
              >
                <span className="text-[8px] text-gray-400">
                  Sidebar · 240px
                </span>
              </div>
              {/* Content */}
              <div
                className="absolute right-0 bottom-0 flex items-center justify-center"
                style={{
                  top: 86,
                  left: 120,
                }}
              >
                <span className="text-[9px] text-gray-400">
                  Content · 20px padding
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {layoutDimensions.map((d) => (
                <div
                  key={d.name}
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <div
                    className="w-10 shrink-0 text-center py-1 rounded font-mono text-[9px] font-bold"
                    style={{
                      backgroundColor: isDark
                        ? 'rgba(10,132,255,0.2)'
                        : 'rgba(0,122,255,0.1)',
                      color: isDark ? '#0a84ff' : '#007aff',
                    }}
                  >
                    {d.value}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{d.name}</p>
                    <code className="text-[9px] font-mono text-gray-400">
                      {d.cssVar}
                    </code>
                    <p className="text-[10px] text-gray-400 mt-0.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Motion Transitions */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Motion & Transitions" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Three motion speeds using{' '}
              <code className="text-xs font-mono">
                cubic-bezier(0.2, 0, 0, 1)
              </code>{' '}
              for the standard and slow durations — a deceleration curve that
              feels physically natural at larger distances.
            </Typography>
            <div className="space-y-4">
              {transitions.map((t) => (
                <div
                  key={t.name}
                  className="p-4 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{t.name}</span>
                    <code className="text-[10px] font-mono text-gray-400">
                      {t.cssVar}
                    </code>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${t.bar * 3}px`,
                        backgroundColor: isDark ? '#0a84ff' : '#007aff',
                        opacity: 0.7,
                      }}
                    />
                    <code className="text-xs font-mono text-gray-500">
                      {t.value}
                    </code>
                  </div>
                  <p className="text-[11px] text-gray-400">{t.usage}</p>
                </div>
              ))}
            </div>
            <pre
              className="mt-6 rounded-xl p-4 text-xs font-mono overflow-x-auto text-gray-300"
              style={{ backgroundColor: isDark ? '#1c1c1e' : '#1d1d1f' }}
            >
              {`.my-panel {
  transition: transform var(--macos-transition-normal),
              opacity  var(--macos-transition-fast);
  border-radius: var(--macos-radius-popover);
  box-shadow: var(--macos-shadow-popover);
  padding: var(--macos-space-4);
}`}
            </pre>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SonomaShapesSection;
