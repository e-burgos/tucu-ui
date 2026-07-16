import React from 'react';
import {
  CardContainer,
  CardTitle,
  HeroCard,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';
import { useTheme } from '@tucu-ui-internal/themes';

/* ──────────────────────────────────────────────────────────────
   Sonoma Materials — tokens from macos-foundations.css
   Named materials → --macos-material-* CSS custom properties
   ────────────────────────────────────────────────────────────── */

interface NamedMaterial {
  name: string;
  cssVar: string;
  blurVar: string;
  blurValue: string;
  lightValue: string;
  darkValue: string;
  desc: string;
  usage: string;
}

const namedMaterials: NamedMaterial[] = [
  {
    name: 'Sidebar',
    cssVar: '--macos-material-sidebar',
    blurVar: '--macos-material-sidebar-blur',
    blurValue: '20px',
    lightValue: 'rgba(246,246,248,0.82)',
    darkValue: 'rgba(28,28,30,0.85)',
    desc: 'High opacity, strong blur — keeps sidebar content legible over any background',
    usage: 'Sidebar panels, navigation drawers',
  },
  {
    name: 'Toolbar',
    cssVar: '--macos-material-toolbar',
    blurVar: '--macos-material-toolbar-blur',
    blurValue: '16px',
    lightValue: 'rgba(255,255,255,0.72)',
    darkValue: 'rgba(40,40,42,0.80)',
    desc: 'Medium opacity with focused blur — toolbar floats above content with visible separation',
    usage: 'App toolbars, top navigation bars',
  },
  {
    name: 'Popover',
    cssVar: '--macos-material-popover',
    blurVar: '--macos-material-popover-blur',
    blurValue: '24px',
    lightValue: 'rgba(255,255,255,0.90)',
    darkValue: 'rgba(44,44,46,0.92)',
    desc: 'Near-opaque with deep blur — maximum legibility for transient content',
    usage: 'Popovers, menus, tooltips, dropdown panels',
  },
  {
    name: 'Sheet',
    cssVar: '--macos-material-sheet',
    blurVar: '--macos-material-sheet-blur',
    blurValue: '30px',
    lightValue: 'rgba(255,255,255,0.94)',
    darkValue: 'rgba(44,44,46,0.96)',
    desc: 'Highest opacity, maximum blur — modal surfaces that demand full attention',
    usage: 'Modal sheets, dialogs, alert panels',
  },
  {
    name: 'Overlay',
    cssVar: '--macos-material-overlay',
    blurVar: '',
    blurValue: '—',
    lightValue: 'rgba(0,0,0,0.40)',
    darkValue: 'rgba(0,0,0,0.60)',
    desc: 'Scrim behind modal surfaces to focus attention on foreground content',
    usage: 'Modal scrim, blocking overlay, dimming layer',
  },
];

interface VibrancyLevel {
  name: string;
  opacity: number;
  blur: number;
  lightBg: string;
  darkBg: string;
  desc: string;
}

const vibrancyLevels: VibrancyLevel[] = [
  {
    name: 'UltraThin',
    opacity: 0.36,
    blur: 15,
    lightBg: 'rgba(246,246,248,0.36)',
    darkBg: 'rgba(28,28,30,0.36)',
    desc: 'Maximum transparency — background content clearly visible',
  },
  {
    name: 'Thin',
    opacity: 0.48,
    blur: 15,
    lightBg: 'rgba(246,246,248,0.48)',
    darkBg: 'rgba(28,28,30,0.48)',
    desc: 'High translucency — subtle tinting of background',
  },
  {
    name: 'Medium',
    opacity: 0.6,
    blur: 15,
    lightBg: 'rgba(246,246,248,0.60)',
    darkBg: 'rgba(28,28,30,0.60)',
    desc: 'Balanced — background muted but perceptible',
  },
  {
    name: 'Thick',
    opacity: 0.72,
    blur: 15,
    lightBg: 'rgba(246,246,248,0.72)',
    darkBg: 'rgba(40,40,42,0.72)',
    desc: 'Low translucency — subtle depth hint',
  },
  {
    name: 'UltraThick',
    opacity: 0.84,
    blur: 15,
    lightBg: 'rgba(246,246,248,0.84)',
    darkBg: 'rgba(44,44,46,0.84)',
    desc: 'Near-opaque — maximum legibility, minimal blur',
  },
];

const SonomaMaterialsSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <>
      <HeroCard
        title="Materials"
        description="Sonoma vibrancy materials — translucent CSS surfaces defined by --macos-material-* tokens. Each balances blur, opacity, and brightness for its role."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-white/80 via-gray-200/60 to-gray-400/40 dark:from-gray-700/80 dark:via-gray-800/60 dark:to-gray-900/40 rounded-full flex items-center justify-center shadow-lg border border-white/50 dark:border-border/50 backdrop-blur-md">
            <LucideIcons.Layers className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-700 dark:text-gray-200 filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Named Materials with live preview */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Named Surface Materials" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              Pre-defined materials mapped to{' '}
              <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                --macos-material-*
              </code>{' '}
              CSS custom properties. Displayed over a colorful background to
              demonstrate vibrancy. Showing{' '}
              <strong>{isDark ? 'dark' : 'light'}</strong> values.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {namedMaterials.map((mat) => (
                <div
                  key={mat.name}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg,#0d1b2a 0%,#1b2838 50%,#0a1628 100%)'
                      : 'linear-gradient(135deg,#a8edea 0%,#fed6e3 50%,#d299c2 100%)',
                  }}
                >
                  <div
                    className="m-3 rounded-xl p-4 border border-border"
                    style={{
                      backgroundColor: `var(${mat.cssVar}, ${
                        isDark ? mat.darkValue : mat.lightValue
                      })`,
                      backdropFilter:
                        mat.blurValue !== '—'
                          ? `blur(${mat.blurValue})`
                          : undefined,
                      WebkitBackdropFilter:
                        mat.blurValue !== '—'
                          ? `blur(${mat.blurValue})`
                          : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className={`font-semibold text-sm ${
                            isDark ? 'text-gray-100' : 'text-gray-900'
                          }`}
                        >
                          {mat.name}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {mat.desc}
                        </p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          Usage: {mat.usage}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border space-y-0.5">
                      <code
                        className={`block text-[9px] font-mono ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {mat.cssVar}
                      </code>
                      <code
                        className={`block text-[9px] font-mono ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {isDark ? mat.darkValue : mat.lightValue}
                      </code>
                      {mat.blurValue !== '—' && (
                        <code
                          className={`block text-[9px] font-mono ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          backdrop-filter: blur({mat.blurValue})
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Vibrancy Levels */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Vibrancy Opacity Scale" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              Five translucency levels from <strong>UltraThin</strong> (most
              transparent) to <strong>UltraThick</strong> (near-opaque). All use
              a consistent 15px backdrop blur. Displayed over a colorful
              gradient.
            </Typography>
            <div
              className="relative rounded-2xl overflow-hidden p-6"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)'
                  : 'linear-gradient(135deg,#667eea 0%,#764ba2 25%,#f093fb 50%,#f5576c 75%,#4facfe 100%)',
                minHeight: 380,
              }}
            >
              {/* Decorative blobs */}
              <div className="absolute inset-0 pointer-events-none opacity-50">
                {isDark ? (
                  <>
                    <div className="absolute top-6 left-8 w-20 h-20 rounded-full bg-purple-600" />
                    <div className="absolute top-16 right-12 w-28 h-28 rounded-full bg-indigo-500" />
                    <div className="absolute bottom-6 left-1/3 w-16 h-16 rounded-full bg-blue-600" />
                    <div className="absolute bottom-10 right-8 w-24 h-24 rounded-full bg-violet-700" />
                  </>
                ) : (
                  <>
                    <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-yellow-300" />
                    <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-pink-400" />
                    <div className="absolute bottom-8 left-1/4 w-20 h-20 rounded-full bg-green-400" />
                    <div className="absolute bottom-4 right-8 w-28 h-28 rounded-full bg-blue-300" />
                  </>
                )}
              </div>

              <div className="relative flex flex-col gap-3">
                {vibrancyLevels.map((v) => (
                  <div
                    key={v.name}
                    className="rounded-xl p-3.5 border border-white/20"
                    style={{
                      backgroundColor: isDark ? v.darkBg : v.lightBg,
                      backdropFilter: `blur(${v.blur}px)`,
                      WebkitBackdropFilter: `blur(${v.blur}px)`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={`text-sm font-semibold ${
                            isDark ? 'text-gray-100' : 'text-gray-800'
                          }`}
                        >
                          {v.name}
                        </span>
                        <p
                          className={`text-[10px] mt-0.5 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {v.desc}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-[10px] font-mono ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          opacity {Math.round(v.opacity * 100)}%
                        </span>
                        <br />
                        <span
                          className={`text-[10px] font-mono ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          blur {v.blur}px
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* CSS Usage */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Using Materials in Code" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Apply named material tokens directly via CSS custom properties.
              The tokens automatically resolve the correct value for the current
              appearance (light/dark) when{' '}
              <code className="text-xs font-mono">html.macos</code> is active.
            </Typography>
            <pre
              className="rounded-xl p-4 text-xs font-mono overflow-x-auto text-gray-300"
              style={{ backgroundColor: isDark ? '#1c1c1e' : '#1d1d1f' }}
            >
              {`.my-surface {
  background-color: var(--macos-material-sidebar);
  backdrop-filter: blur(var(--macos-material-sidebar-blur));
  -webkit-backdrop-filter: blur(var(--macos-material-sidebar-blur));
}

/* Or use Tailwind arbitrary values */
<div className="bg-[var(--macos-material-toolbar)]
                backdrop-blur-[var(--macos-material-toolbar-blur)]" />`}
            </pre>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SonomaMaterialsSection;
