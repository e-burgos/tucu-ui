import React from 'react';
import {
  BasicTable,
  CardContainer,
  CardTitle,
  HeroCard,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';
import { useTheme } from '@tucu-ui-internal/themes';

interface TextStyle {
  name: string;
  size: string;
  leading: string;
  weight: string;
  tracking: string;
  font: string;
  cssVar: string;
}

const textStyles: TextStyle[] = [
  {
    name: 'Large Title',
    size: '26px',
    leading: '32px',
    weight: '400 (Regular)',
    tracking: '0',
    font: 'SF Pro Display',
    cssVar: '--macos-font-size-large-title',
  },
  {
    name: 'Title 1',
    size: '22px',
    leading: '26px',
    weight: '400 (Regular)',
    tracking: '0',
    font: 'SF Pro Display',
    cssVar: '--macos-font-size-title1',
  },
  {
    name: 'Title 2',
    size: '17px',
    leading: '22px',
    weight: '400 (Regular)',
    tracking: '0',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-title2',
  },
  {
    name: 'Title 3',
    size: '15px',
    leading: '20px',
    weight: '600 (Semibold)',
    tracking: '0',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-title3',
  },
  {
    name: 'Headline',
    size: '13px',
    leading: '16px',
    weight: '700 (Bold)',
    tracking: '0',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-body',
  },
  {
    name: 'Body',
    size: '13px',
    leading: '16px',
    weight: '400 (Regular)',
    tracking: '0',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-body',
  },
  {
    name: 'Callout',
    size: '12px',
    leading: '15px',
    weight: '400 (Regular)',
    tracking: '0',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-callout',
  },
  {
    name: 'Subheadline',
    size: '11px',
    leading: '14px',
    weight: '400 (Regular)',
    tracking: '0.006em',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-subheadline',
  },
  {
    name: 'Footnote',
    size: '10px',
    leading: '13px',
    weight: '400 (Regular)',
    tracking: '0.012em',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-footnote',
  },
  {
    name: 'Caption 1',
    size: '10px',
    leading: '13px',
    weight: '500 (Medium)',
    tracking: '0.012em',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-caption',
  },
  {
    name: 'Caption 2',
    size: '10px',
    leading: '13px',
    weight: '400 (Regular)',
    tracking: '0.012em',
    font: 'SF Pro Text',
    cssVar: '--macos-font-size-caption',
  },
];

function getWeight(style: TextStyle): number {
  if (style.weight.includes('700')) return 700;
  if (style.weight.includes('600')) return 600;
  if (style.weight.includes('500')) return 500;
  return 400;
}

function getFont(style: TextStyle): string {
  return style.font === 'SF Pro Display'
    ? "var(--macos-font-display, 'Inter', system-ui)"
    : "var(--macos-font-family, 'Inter', system-ui)";
}

export const MacOSTextStylesSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <>
      <HeroCard
        title="Text Styles"
        description="The macOS type scale defines size, weight, leading, and tracking for each text style. Each style adapts to the current appearance mode."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-gray-800 via-gray-600 to-gray-400 dark:from-gray-200 dark:via-gray-400 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg border border-gray-500/50">
            <LucideIcons.Type className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white dark:text-gray-900 filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Font License Note */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Font Family" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <LucideIcons.Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <Typography
                  tag="p"
                  className="text-sm text-blue-800 dark:text-blue-200 font-medium"
                >
                  Alternative Font: Inter Variable
                </Typography>
                <Typography
                  tag="p"
                  className="text-xs text-blue-700 dark:text-blue-300"
                >
                  Apple's SF Pro is restricted by its license to Apple platforms
                  only. To comply with this restriction, this design system uses{' '}
                  <strong>Inter</strong> (SIL Open Font License) as the primary
                  typeface and <strong>JetBrains Mono</strong> for monospaced
                  content. Inter closely matches SF Pro's metrics, proportions,
                  and optical sizing, making it an excellent open-source
                  alternative that renders consistently across all platforms.
                </Typography>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div
                className="p-4 rounded-lg border border-border"
                style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}
              >
                <p
                  className="text-lg mb-2"
                  style={{
                    fontFamily: "var(--macos-font-display, 'Inter', system-ui)",
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.85)'
                      : 'rgba(0, 0, 0, 0.85)',
                  }}
                >
                  Inter (Display)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Used at ≥20pt. Replaces SF Pro Display for large headlines and
                  titles.
                </p>
              </div>
              <div
                className="p-4 rounded-lg border border-border"
                style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}
              >
                <p
                  className="text-lg mb-2"
                  style={{
                    fontFamily: "var(--macos-font-family, 'Inter', system-ui)",
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.85)'
                      : 'rgba(0, 0, 0, 0.85)',
                  }}
                >
                  Inter (Text)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Used at &lt;20pt. Replaces SF Pro Text for body text and UI
                  labels.
                </p>
              </div>
              <div
                className="p-4 rounded-lg border border-border"
                style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}
              >
                <p
                  className="text-lg mb-2"
                  style={{
                    fontFamily:
                      "var(--macos-font-mono, 'JetBrains Mono', monospace)",
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.85)'
                      : 'rgba(0, 0, 0, 0.85)',
                  }}
                >
                  JetBrains Mono
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Monospaced variant. Replaces SF Mono for code, terminal
                  output, and technical data.
                </p>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Type Scale Specimen */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Type Scale" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div
              className="rounded-xl p-6 border border-border"
              style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}
            >
              <div className="flex flex-col gap-4">
                {textStyles.map((style) => (
                  <div
                    key={style.name}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pb-3 border-b border-[var(--color-border)] last:border-0"
                  >
                    <span
                      className="shrink-0"
                      style={{
                        fontFamily: getFont(style),
                        fontSize: style.size,
                        lineHeight: style.leading,
                        fontWeight: getWeight(style),
                        letterSpacing: style.tracking,
                        color: isDark
                          ? 'rgba(255, 255, 255, 0.85)'
                          : 'rgba(0, 0, 0, 0.85)',
                      }}
                    >
                      {style.name}
                    </span>
                    <div className="flex flex-wrap gap-3 text-[10px] font-mono text-gray-400">
                      <span>{style.size}</span>
                      <span>/ {style.leading}</span>
                      <span>{style.weight}</span>
                      {style.tracking !== '0' && (
                        <span>tracking: {style.tracking}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Label Colors */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Label Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Text styles combine with label colors to create visual hierarchy.
              Showing {isDark ? 'dark' : 'light'} appearance values.
            </Typography>
            <div
              className="rounded-xl p-6 border border-border"
              style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}
            >
              <div className="space-y-3">
                <p
                  style={{
                    fontFamily: "var(--macos-font-family, 'Inter', system-ui)",
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.85)'
                      : 'rgba(0, 0, 0, 0.85)',
                  }}
                >
                  <span className="inline-block w-20 text-[10px] font-mono opacity-50">
                    Primary
                  </span>{' '}
                  The quick brown fox jumps over the lazy dog
                </p>
                <p
                  style={{
                    fontFamily: "var(--macos-font-family, 'Inter', system-ui)",
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: isDark
                      ? 'rgba(235, 235, 245, 0.6)'
                      : 'rgba(60, 60, 67, 0.6)',
                  }}
                >
                  <span className="inline-block w-20 text-[10px] font-mono opacity-70">
                    Secondary
                  </span>{' '}
                  The quick brown fox jumps over the lazy dog
                </p>
                <p
                  style={{
                    fontFamily: "var(--macos-font-family, 'Inter', system-ui)",
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: isDark
                      ? 'rgba(235, 235, 245, 0.3)'
                      : 'rgba(60, 60, 67, 0.3)',
                  }}
                >
                  <span className="inline-block w-20 text-[10px] font-mono opacity-70">
                    Tertiary
                  </span>{' '}
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* CSS Variables Table */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="CSS Variables" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={[
                { key: 'name', label: 'Style' },
                {
                  key: 'cssVar',
                  label: 'CSS Variable',
                  className: 'font-mono text-gray-500',
                },
                {
                  key: 'size',
                  label: 'Size',
                  className: 'font-mono text-gray-500',
                },
                {
                  key: 'leading',
                  label: 'Leading',
                  className: 'font-mono text-gray-500',
                },
                { key: 'font', label: 'Font', className: 'text-gray-500' },
              ]}
              data={textStyles as unknown as Record<string, unknown>[]}
              maxRows={15}
              resizable={false}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSTextStylesSection;
