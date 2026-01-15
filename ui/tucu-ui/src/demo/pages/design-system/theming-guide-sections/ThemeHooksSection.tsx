import React from 'react';
import { CardContainer, CardTitle, Typography } from '../../../../index';

const ThemeHooksSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Theme Hooks
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Powerful hooks for theme management and customization
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardContainer>
          <CardTitle title="useTheme Hook" className="mt-2 mb-6">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 text-sm"
              >
                The{' '}
                <code className="px-2 py-1 bg-light-dark rounded text-sm">
                  useTheme
                </code>{' '}
                hook provides access to all theme state and setters. It uses
                Zustand for state management with localStorage persistence.
              </Typography>
              <div className="space-y-2">
                <Typography tag="h5" className="font-semibold text-sm">
                  Available State:
                </Typography>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                  <li>mode, layout, direction, logo, lang</li>
                  <li>primaryPreset, darkPrimaryPreset</li>
                  <li>secondaryPreset, darkSecondaryPreset</li>
                  <li>accentPreset, darkAccentPreset</li>
                  <li>mutedPreset, darkMutedPreset</li>
                  <li>darkBgPreset, lightBgPreset</li>
                  <li>lightDarkPreset, darkLightDarkPreset</li>
                  <li>isSettingsOpen, showSettings</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Typography tag="h5" className="font-semibold text-sm">
                  Available Setters:
                </Typography>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                  <li>setMode, setLayout, setDirection</li>
                  <li>setPrimaryPreset, setDarkPrimaryPreset</li>
                  <li>setSecondaryPreset, setDarkSecondaryPreset</li>
                  <li>setAccentPreset, setDarkAccentPreset</li>
                  <li>setMutedPreset, setDarkMutedPreset</li>
                  <li>setDarkBgPreset, setLightBgPreset</li>
                  <li>setLightDarkPreset, setDarkLightDarkPreset</li>
                  <li>setLogo, setLang, setIsSettingsOpen</li>
                  <li>setShowSettings, restoreDefaultColors</li>
                </ul>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle
            title="useThemeColor & useDirection"
            className="mt-2 mb-6"
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Typography tag="h5" className="font-semibold text-sm mb-2">
                    useThemeColor
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400 mb-2"
                  >
                    Automatically used by ThemeWrapper to inject CSS variables
                    into the document root:
                  </Typography>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-4 list-disc">
                    <li>--color-semantic-bg-primary</li>
                    <li>--color-semantic-dark-bg-primary</li>
                    <li>--color-semantic-bg-secondary</li>
                    <li>--color-semantic-accent-bold-yellow</li>
                    <li>--color-semantic-fg-muted</li>
                    <li>--color-semantic-bg</li>
                    <li>--color-semantic-bg-secondary-wash</li>
                  </ul>
                </div>
                <div>
                  <Typography tag="h5" className="font-semibold text-sm mb-2">
                    useDirection
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400"
                  >
                    Sets the document direction for RTL/LTR support. Sets{' '}
                    <code className="px-1 py-0.5 bg-light-dark rounded text-xs">
                      document.documentElement.dir
                    </code>
                    .
                  </Typography>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </>
  );
};

export default ThemeHooksSection;

