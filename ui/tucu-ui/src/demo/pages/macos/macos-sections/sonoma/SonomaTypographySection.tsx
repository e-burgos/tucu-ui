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
   Sonoma Typography — tokens from macos-foundations.css &
   macos-typography.css
   11 official macOS text styles + font families + utility classes
   ────────────────────────────────────────────────────────────── */

interface TextStyle {
  name: string;
  className: string;
  cssVarSize: string;
  cssVarWeight: string;
  cssVarLeading: string;
  cssVarTracking: string;
  size: string;
  weight: string;
  leading: string;
  tracking: string;
  weightLabel: string;
  sample: string;
}

const textStyles: TextStyle[] = [
  {
    name: 'Large Title',
    className: 'macos-large-title',
    cssVarSize: '--macos-ts-large-title-size',
    cssVarWeight: '--macos-ts-large-title-weight',
    cssVarLeading: '--macos-ts-large-title-leading',
    cssVarTracking: '--macos-ts-large-title-tracking',
    size: '26px',
    weight: '400',
    leading: '32px',
    tracking: '+0.22px',
    weightLabel: 'Regular',
    sample: 'The quick brown fox',
  },
  {
    name: 'Title 1',
    className: 'macos-title-1',
    cssVarSize: '--macos-ts-title1-size',
    cssVarWeight: '--macos-ts-title1-weight',
    cssVarLeading: '--macos-ts-title1-leading',
    cssVarTracking: '--macos-ts-title1-tracking',
    size: '22px',
    weight: '400',
    leading: '26px',
    tracking: '−0.26px',
    weightLabel: 'Regular',
    sample: 'System Preferences',
  },
  {
    name: 'Title 2',
    className: 'macos-title-2',
    cssVarSize: '--macos-ts-title2-size',
    cssVarWeight: '--macos-ts-title2-weight',
    cssVarLeading: '--macos-ts-title2-leading',
    cssVarTracking: '--macos-ts-title2-tracking',
    size: '17px',
    weight: '400',
    leading: '22px',
    tracking: '−0.43px',
    weightLabel: 'Regular',
    sample: 'Network Preferences',
  },
  {
    name: 'Title 3',
    className: 'macos-title-3',
    cssVarSize: '--macos-ts-title3-size',
    cssVarWeight: '--macos-ts-title3-weight',
    cssVarLeading: '--macos-ts-title3-leading',
    cssVarTracking: '--macos-ts-title3-tracking',
    size: '15px',
    weight: '400',
    leading: '20px',
    tracking: '−0.23px',
    weightLabel: 'Regular',
    sample: 'Wi-Fi Settings',
  },
  {
    name: 'Headline',
    className: 'macos-headline',
    cssVarSize: '--macos-ts-headline-size',
    cssVarWeight: '--macos-ts-headline-weight',
    cssVarLeading: '--macos-ts-headline-leading',
    cssVarTracking: '--macos-ts-headline-tracking',
    size: '13px',
    weight: '700',
    leading: '16px',
    tracking: '−0.08px',
    weightLabel: 'Bold',
    sample: 'Connected Devices',
  },
  {
    name: 'Body',
    className: 'macos-body',
    cssVarSize: '--macos-ts-body-size',
    cssVarWeight: '--macos-ts-body-weight',
    cssVarLeading: '--macos-ts-body-leading',
    cssVarTracking: '--macos-ts-body-tracking',
    size: '13px',
    weight: '400',
    leading: '16px',
    tracking: '−0.08px',
    weightLabel: 'Regular',
    sample: 'Your Mac is connected to the internet via Wi-Fi.',
  },
  {
    name: 'Callout',
    className: 'macos-callout',
    cssVarSize: '--macos-ts-callout-size',
    cssVarWeight: '--macos-ts-callout-weight',
    cssVarLeading: '--macos-ts-callout-leading',
    cssVarTracking: '--macos-ts-callout-tracking',
    size: '12px',
    weight: '400',
    leading: '15px',
    tracking: '0',
    weightLabel: 'Regular',
    sample: 'Signal strength: Excellent',
  },
  {
    name: 'Subheadline',
    className: 'macos-subheadline',
    cssVarSize: '--macos-ts-subheadline-size',
    cssVarWeight: '--macos-ts-subheadline-weight',
    cssVarLeading: '--macos-ts-subheadline-leading',
    cssVarTracking: '--macos-ts-subheadline-tracking',
    size: '11px',
    weight: '400',
    leading: '14px',
    tracking: '+0.06px',
    weightLabel: 'Regular',
    sample: 'Last updated: just now',
  },
  {
    name: 'Footnote',
    className: 'macos-footnote',
    cssVarSize: '--macos-ts-footnote-size',
    cssVarWeight: '--macos-ts-footnote-weight',
    cssVarLeading: '--macos-ts-footnote-leading',
    cssVarTracking: '--macos-ts-footnote-tracking',
    size: '10px',
    weight: '400',
    leading: '13px',
    tracking: '+0.12px',
    weightLabel: 'Regular',
    sample: 'More network diagnostics available in Utilities.',
  },
  {
    name: 'Caption 1',
    className: 'macos-caption-1',
    cssVarSize: '--macos-ts-caption1-size',
    cssVarWeight: '--macos-ts-caption1-weight',
    cssVarLeading: '--macos-ts-caption1-leading',
    cssVarTracking: '--macos-ts-caption1-tracking',
    size: '10px',
    weight: '400',
    leading: '13px',
    tracking: '+0.12px',
    weightLabel: 'Regular',
    sample: 'IPv4: 192.168.1.1 / IPv6: ::1',
  },
  {
    name: 'Caption 2',
    className: 'macos-caption-2',
    cssVarSize: '--macos-ts-caption2-size',
    cssVarWeight: '--macos-ts-caption2-weight',
    cssVarLeading: '--macos-ts-caption2-leading',
    cssVarTracking: '--macos-ts-caption2-tracking',
    size: '10px',
    weight: '500',
    leading: '13px',
    tracking: '+0.12px',
    weightLabel: 'Medium',
    sample: 'NETWORK · ETHERNET',
  },
];

const fontFamilies = [
  {
    name: 'Inter (Primary)',
    cssVar: '--macos-font-family',
    stack:
      'Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
    usage: 'All body, UI, and display text under html.macos',
  },
  {
    name: 'Inter Display',
    cssVar: '--macos-font-display',
    stack:
      'Inter, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
    usage: 'Large Title, Title 1, Title 2 — display-weight headings',
  },
  {
    name: 'JetBrains Mono',
    cssVar: '--macos-font-mono',
    stack:
      'JetBrains Mono, SF Mono, SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace',
    usage: 'Code snippets, terminal, monospace data',
  },
];

const SonomaTypographySection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <>
      <HeroCard
        title="Typography"
        description="11 Apple HIG text styles for macOS Sonoma 14 — defined via --macos-ts-* tokens and applied with utility classes like .macos-body."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-gray-800 via-gray-600 to-gray-400 dark:from-gray-200 dark:via-gray-400 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg border border-gray-500/50">
            <LucideIcons.Type className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white dark:text-gray-900 filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Font Families */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Font Families" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Inter Variable is loaded via{' '}
              <code className="text-xs font-mono">@font-face</code> in{' '}
              <code className="text-xs font-mono">macos-fonts.css</code> with{' '}
              <code className="text-xs font-mono">-apple-system</code> as the
              fallback stack (renders as SF Pro on macOS Safari).
            </Typography>
            <div className="space-y-4">
              {fontFamilies.map((f) => (
                <div
                  key={f.name}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-semibold text-sm">{f.name}</span>
                      <code className="ml-2 text-[10px] font-mono text-gray-400">
                        {f.cssVar}
                      </code>
                    </div>
                    <span className="text-[10px] text-gray-400">{f.usage}</span>
                  </div>
                  <p
                    className="text-base mb-1"
                    style={{ fontFamily: `var(${f.cssVar})` }}
                  >
                    Aa Bb Cc — The quick brown fox jumps over the lazy dog
                  </p>
                  <code className="text-[9px] text-gray-400 font-mono break-all">
                    {f.stack}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Text Styles Table */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Text Style Scale" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              All 11 text styles defined by Apple HIG for macOS. Each style maps
              to a set of{' '}
              <code className="text-xs font-mono">--macos-ts-*</code> tokens and
              a CSS utility class applied under{' '}
              <code className="text-xs font-mono">html.macos</code>.
            </Typography>
            {/* Live specimens */}
            <div className="space-y-3">
              {textStyles.map((ts) => (
                <div
                  key={ts.name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <div className="sm:w-40 shrink-0">
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                      {ts.name}
                    </span>
                    <br />
                    <code className="text-[9px] font-mono text-gray-400">
                      .{ts.className}
                    </code>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={ts.className}
                      style={{
                        color: isDark
                          ? 'var(--macos-label, rgba(255,255,255,0.92))'
                          : 'var(--macos-label, rgba(0,0,0,0.88))',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ts.sample}
                    </p>
                  </div>
                  <div className="flex gap-4 shrink-0 text-[9px] font-mono text-gray-400">
                    <span>{ts.size}</span>
                    <span>{ts.weightLabel}</span>
                    <span>↕ {ts.leading}</span>
                    <span className="hidden sm:inline">{ts.tracking}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Token Reference Table */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="CSS Token Reference" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 overflow-x-auto">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Full token reference for all 11 text styles.
            </Typography>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {['Style', 'Size', 'Weight', 'Leading', 'Tracking'].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left pb-2 pr-4 font-semibold text-gray-500 dark:text-gray-400"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {textStyles.map((ts) => (
                  <tr
                    key={ts.name}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-2 pr-4 font-medium">{ts.name}</td>
                    <td className="py-2 pr-4 font-mono text-gray-500">
                      {ts.size}
                    </td>
                    <td className="py-2 pr-4 text-gray-500">
                      {ts.weightLabel} ({ts.weight})
                    </td>
                    <td className="py-2 pr-4 font-mono text-gray-500">
                      {ts.leading}
                    </td>
                    <td className="py-2 font-mono text-gray-500">
                      {ts.tracking}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardTitle>
      </CardContainer>

      {/* OpenType Features */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="OpenType & Rendering" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              The Sonoma typography system enables key OpenType features and
              optimized text rendering via{' '}
              <code className="text-xs font-mono">html.macos</code> base styles.
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: 'font-optical-sizing',
                  value: 'auto',
                  desc: 'Optical size axis adjusts details at small/large sizes',
                },
                {
                  label: 'font-feature-settings',
                  value: "'liga' 1, 'calt' 1, 'kern' 1",
                  desc: 'Ligatures, contextual alternates, and kerning',
                },
                {
                  label: '-webkit-font-smoothing',
                  value: 'antialiased',
                  desc: 'macOS sub-pixel antialiasing optimized for Retina',
                },
                {
                  label: 'base font-size',
                  value: '13px',
                  desc: 'Apple HIG macOS default — matches native macOS apps',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <code className="text-[10px] font-mono text-blue-500 dark:text-blue-400">
                    {item.label}
                  </code>
                  <code className="block text-[10px] font-mono text-gray-500 mt-0.5">
                    {item.value}
                  </code>
                  <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SonomaTypographySection;
