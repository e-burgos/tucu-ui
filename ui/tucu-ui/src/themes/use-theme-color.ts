import { useEffect } from 'react';

export function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `${r} ${g} ${b}`;
}

interface IUseThemeColorProps {
  brandColor: string;
  secondaryColor: string;
  accentColor: string;
  darkColor: string;
  lightColor: string;
}

export function useThemeColor({
  brandColor,
  secondaryColor,
  accentColor,
  darkColor,
  lightColor,
}: IUseThemeColorProps) {
  useEffect(() => {
    // Use hex format for consistency with CSS default
    document.documentElement.style.setProperty('--color-brand', brandColor);
    document.documentElement.style.setProperty(
      '--color-secondary',
      secondaryColor
    );
    document.documentElement.style.setProperty('--color-accent', accentColor);
    document.documentElement.style.setProperty('--color-dark', darkColor);
    document.documentElement.style.setProperty('--color-light', lightColor);
  }, [brandColor, secondaryColor, accentColor, darkColor, lightColor]);
}
