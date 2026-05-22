import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  FeatureCard,
} from '../../../../index';

const ThemeHooksSection: React.FC = () => {
  const hookOverview = [
    {
      icon: (
        <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'useTheme',
      description:
        'Main hook — all state, setters, and actions. Zustand-based with localStorage persistence.',
      iconBgClassName: 'from-yellow-500 via-amber-500 to-orange-500',
    },
    {
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'useThemeColor',
      description:
        'Injects 24 CSS variables (12 light/dark pairs) into document root for real-time theming.',
      iconBgClassName: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      icon: (
        <LucideIcons.Globe className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'useDirection',
      description:
        'Sets document.documentElement.dir for RTL/LTR layout support.',
      iconBgClassName: 'from-purple-500 via-violet-500 to-indigo-500',
    },
  ];

  return (
    <>
      <HeroCard
        title="Theme Hooks"
        description="Powerful hooks for accessing, modifying, and reacting to theme state throughout your application."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Anchor className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Available Hooks
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Three hooks that power the theming system
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {hookOverview.map((item) => (
            <FeatureCard key={item.title} layout="horizontal" {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            useTheme Hook API
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Complete state, setters, and actions reference
          </Typography>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardContainer>
            <CardTitle title="State Properties">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  Accessed via{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    useTheme()
                  </code>{' '}
                  — persisted to localStorage automatically.
                </Typography>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                  <li>mode, layout, direction, logo, lang</li>
                  <li>
                    colorScheme (theme variant: default | macos | macos-tahoe)
                  </li>
                  <li>primaryPreset, darkPrimaryPreset</li>
                  <li>secondaryPreset, darkSecondaryPreset</li>
                  <li>accentPreset, darkAccentPreset</li>
                  <li>mutedPreset, darkMutedPreset</li>
                  <li>darkBgPreset, lightBgPreset</li>
                  <li>lightDarkPreset, darkLightDarkPreset</li>
                  <li>successPreset, darkSuccessPreset</li>
                  <li>warningPreset, darkWarningPreset</li>
                  <li>errorPreset, darkErrorPreset</li>
                  <li>infoPreset, darkInfoPreset</li>
                  <li>fgPreset, darkFgPreset</li>
                  <li>borderPreset, darkBorderPreset</li>
                  <li>backgroundVariant</li>
                  <li>isSettingsOpen, showSettings</li>
                </ul>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Setters">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  Each setter updates the store and persists to localStorage.
                </Typography>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                  <li>setMode, setLayout, setDirection</li>
                  <li>setPrimaryPreset, setDarkPrimaryPreset</li>
                  <li>setSecondaryPreset, setDarkSecondaryPreset</li>
                  <li>setAccentPreset, setDarkAccentPreset</li>
                  <li>setMutedPreset, setDarkMutedPreset</li>
                  <li>setDarkBgPreset, setLightBgPreset</li>
                  <li>setLightDarkPreset, setDarkLightDarkPreset</li>
                  <li>setSuccessPreset, setDarkSuccessPreset</li>
                  <li>setWarningPreset, setDarkWarningPreset</li>
                  <li>setErrorPreset, setDarkErrorPreset</li>
                  <li>setInfoPreset, setDarkInfoPreset</li>
                  <li>setFgPreset, setDarkFgPreset</li>
                  <li>setBorderPreset, setDarkBorderPreset</li>
                  <li>setBackgroundVariant</li>
                  <li>setLogo, setLang, setIsSettingsOpen, setShowSettings</li>
                </ul>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Actions">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  Compound actions that apply multiple state changes at once.
                </Typography>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                  <li>
                    restoreDefaultColors — resets all color presets to defaults
                  </li>
                  <li>applyMacOSTheme — sets layout to MACOS + Sonoma style</li>
                  <li>
                    applyMacOSTahoeTheme — sets layout to MACOS_TAHOE + Tahoe
                    style
                  </li>
                  <li>
                    applyThemeStyle(style: THEME_VARIANT) — generic applicator
                    for any variant
                  </li>
                </ul>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="useThemeColor Variables">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm"
                >
                  24 CSS variables injected into{' '}
                  <code className="px-1 py-0.5 border border-border rounded text-xs">
                    document.documentElement
                  </code>
                  :
                </Typography>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                  <li>--color-semantic-bg-primary / dark variant</li>
                  <li>--color-semantic-bg-secondary / dark variant</li>
                  <li>--color-semantic-accent-bold-yellow / dark variant</li>
                  <li>--color-semantic-fg-muted / dark variant</li>
                  <li>--color-semantic-bg / dark variant</li>
                  <li>--color-semantic-bg-secondary-wash / dark variant</li>
                  <li>--color-semantic-bg-positive / dark variant (success)</li>
                  <li>--color-semantic-bg-warning / dark variant (warning)</li>
                  <li>--color-semantic-bg-negative / dark variant (error)</li>
                  <li>--color-semantic-bg-info / dark variant (info)</li>
                  <li>--color-semantic-fg / dark variant (text foreground)</li>
                  <li>
                    --color-semantic-line-primary-subtle / dark variant (border)
                  </li>
                </ul>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>
    </>
  );
};

export default ThemeHooksSection;
