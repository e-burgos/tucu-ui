import { useEffect } from 'react';

export function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `${r} ${g} ${b}`;
}

interface IUseThemeColorProps {
  primaryPreset: string;
  darkPrimaryPreset: string;
  secondaryPreset: string;
  darkSecondaryPreset: string;
  accentPreset: string;
  darkAccentPreset: string;
  mutedPreset: string;
  darkMutedPreset: string;
  darkBgPreset: string;
  lightBgPreset: string;
  lightDarkPreset: string;
  darkLightDarkPreset: string;
  successPreset: string;
  darkSuccessPreset: string;
  warningPreset: string;
  darkWarningPreset: string;
  errorPreset: string;
  darkErrorPreset: string;
  infoPreset: string;
  darkInfoPreset: string;
  fgPreset: string;
  darkFgPreset: string;
  borderPreset: string;
  darkBorderPreset: string;
}

export function useThemeColor({
  primaryPreset,
  darkPrimaryPreset,
  secondaryPreset,
  darkSecondaryPreset,
  accentPreset,
  darkAccentPreset,
  mutedPreset,
  darkMutedPreset,
  darkBgPreset,
  lightBgPreset,
  lightDarkPreset,
  darkLightDarkPreset,
  successPreset,
  darkSuccessPreset,
  warningPreset,
  darkWarningPreset,
  errorPreset,
  darkErrorPreset,
  infoPreset,
  darkInfoPreset,
  fgPreset,
  darkFgPreset,
  borderPreset,
  darkBorderPreset,
}: IUseThemeColorProps) {
  useEffect(() => {
    // Use hex format for consistency with CSS default
    document.documentElement.style.setProperty(
      '--color-semantic-bg-primary',
      primaryPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg-primary',
      darkPrimaryPreset
    );

    document.documentElement.style.setProperty(
      '--color-semantic-bg-secondary',
      secondaryPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg-secondary',
      darkSecondaryPreset
    );

    document.documentElement.style.setProperty(
      '--color-semantic-accent-bold-yellow',
      accentPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-accent-bold-yellow',
      darkAccentPreset
    );

    document.documentElement.style.setProperty(
      '--color-semantic-fg-muted',
      mutedPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-fg-muted',
      darkMutedPreset
    );

    document.documentElement.style.setProperty(
      '--color-semantic-bg',
      lightBgPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg',
      darkBgPreset
    );

    document.documentElement.style.setProperty(
      '--color-semantic-bg-secondary-wash',
      lightDarkPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg-secondary-wash',
      darkLightDarkPreset
    );

    // Status colors
    document.documentElement.style.setProperty(
      '--color-semantic-bg-positive',
      successPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg-positive',
      darkSuccessPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-bg-warning',
      warningPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg-warning',
      darkWarningPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-bg-negative',
      errorPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg-negative',
      darkErrorPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-bg-info',
      infoPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-bg-info',
      darkInfoPreset
    );

    // Foreground / text color
    document.documentElement.style.setProperty('--color-semantic-fg', fgPreset);
    document.documentElement.style.setProperty(
      '--color-semantic-dark-fg',
      darkFgPreset
    );

    // Border color
    document.documentElement.style.setProperty(
      '--color-semantic-line-primary-subtle',
      borderPreset
    );
    document.documentElement.style.setProperty(
      '--color-semantic-dark-line-primary-subtle',
      darkBorderPreset
    );
  }, [
    accentPreset,
    darkAccentPreset,
    darkBgPreset,
    darkLightDarkPreset,
    darkMutedPreset,
    darkPrimaryPreset,
    darkSecondaryPreset,
    lightBgPreset,
    lightDarkPreset,
    mutedPreset,
    primaryPreset,
    secondaryPreset,
    successPreset,
    darkSuccessPreset,
    warningPreset,
    darkWarningPreset,
    errorPreset,
    darkErrorPreset,
    infoPreset,
    darkInfoPreset,
    fgPreset,
    darkFgPreset,
    borderPreset,
    darkBorderPreset,
  ]);
}
