import { useEffect, useMemo, useRef } from 'react';
import { SettingsButton, SettingsDrawer } from '../settings';
import { useTheme } from '../../hooks/use-theme';
import type { ITheme } from '../../hooks/use-theme';

import {
  colorPreset,
  defaultLayout,
  defaultLogo,
  IThemeItem,
  PresetColorType,
  LAYOUT_OPTIONS,
  MODE,
} from '../../config';
import {
  RootLayout,
  LayoutTypeProps,
} from '../../../components/layouts/root-layout';
import { IMenuItem } from '../../../components/layouts/menus/menu-item';

// base css file
import '../../../assets/css/index.css';
import { useLocation } from 'react-router-dom';

// ─── Palette Mapping ───────────────────────────────────────────
// Maps customPaletteColor prop keys → [theme store key, custom label].
// Drives a single loop instead of 12 repetitive if/else blocks.

const PALETTE_MAP: readonly [string, string, string][] = [
  ['primary', 'primaryPreset', 'CustomPrimary'],
  ['darkPrimary', 'darkPrimaryPreset', 'CustomDarkPrimary'],
  ['secondary', 'secondaryPreset', 'CustomSecondary'],
  ['darkSecondary', 'darkSecondaryPreset', 'CustomDarkSecondary'],
  ['accent', 'accentPreset', 'CustomAccent'],
  ['darkAccent', 'darkAccentPreset', 'CustomDarkAccent'],
  ['muted', 'mutedPreset', 'CustomMuted'],
  ['darkMuted', 'darkMutedPreset', 'CustomDarkMuted'],
  ['darkBg', 'darkBgPreset', 'CustomDarkBg'],
  ['lightBg', 'lightBgPreset', 'CustomLightBg'],
  ['lightDark', 'lightDarkPreset', 'CustomLightDark'],
  ['darkLightDark', 'darkLightDarkPreset', 'CustomDarkLightDark'],
];

/** Resolve a color string or preset name into an IThemeItem */
function resolveColor(
  label: string,
  color: PresetColorType | string
): IThemeItem {
  return (
    colorPreset?.find((item) => item.label === color) ?? {
      label,
      value: color,
    }
  );
}

interface ThemeWrapperProps extends LayoutTypeProps {
  menuItems: IMenuItem[];
  brandColor?: PresetColorType;
  mode?: MODE;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  showSettings?: boolean;
  customPaletteColor?: {
    primary?: PresetColorType | string;
    darkPrimary?: PresetColorType | string;
    secondary?: PresetColorType | string;
    darkSecondary?: PresetColorType | string;
    accent?: PresetColorType | string;
    darkAccent?: PresetColorType | string;
    muted?: PresetColorType | string;
    darkMuted?: PresetColorType | string;
    darkBg?: PresetColorType | string;
    lightBg?: PresetColorType | string;
    lightDark?: PresetColorType | string;
    darkLightDark?: PresetColorType | string;
  };
  setCurrentPathname?: (pathname: string) => void;
}

export function ThemeWrapper({
  logo = {},
  rightButton,
  brandColor,
  customPaletteColor,
  showSettings,
  className,
  headerClassName,
  contentClassName,
  fullWidth,
  mode: appMode,
  menuItems: appMenuItems,
  layout: appLayout,
  children,
  setCurrentPathname,
}: ThemeWrapperProps) {
  const { mode, layout } = useTheme();

  const { pathname } = useLocation();
  const menuList = useMemo(
    () => appMenuItems.filter((item) => !item.hide),
    [appMenuItems]
  );

  // ─── Pathname sync ───────────────────────────────────────────
  const setCurrentPathnameRef = useRef(setCurrentPathname);
  useEffect(() => {
    setCurrentPathnameRef.current = setCurrentPathname;
  }, [setCurrentPathname]);

  useEffect(() => {
    setCurrentPathnameRef.current?.(pathname);
  }, [pathname]);

  // ─── Initialize theme on mount ───────────────────────────────
  useEffect(() => {
    const hasCustomLogo = Object.keys(logo).length > 0;

    // Resolve brandColor to a primary preset if provided
    const brandPreset = brandColor
      ? colorPreset?.find((item) => item.label === brandColor)
      : undefined;

    useTheme.setState({
      logo: hasCustomLogo ? logo : defaultLogo,
      showSettings: Boolean(showSettings),
      ...(appMode && { mode: appMode }),
      ...(appLayout && { layout: appLayout as LAYOUT_OPTIONS }),
      ...(brandPreset && { primaryPreset: brandPreset }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Apply custom palette colors ─────────────────────────────
  // Single batched setState instead of 12 individual setter calls.
  // Only runs when customPaletteColor changes (no circular deps).
  useEffect(() => {
    if (!customPaletteColor) return;

    const updates: Record<string, IThemeItem> = {};

    for (const [propKey, storeKey, label] of PALETTE_MAP) {
      const color =
        customPaletteColor[propKey as keyof typeof customPaletteColor];
      if (color) {
        updates[storeKey] = resolveColor(label, color);
      }
    }

    if (Object.keys(updates).length > 0) {
      useTheme.setState(updates as unknown as Partial<ITheme>);
    }
  }, [customPaletteColor]);

  // ─── Dark/Light mode class on <html> ─────────────────────────
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', mode === 'dark');
    html.classList.toggle('light', mode !== 'dark');
  }, [mode]);

  return (
    <div
      className={`fixed inset-0 h-screen w-screen overflow-auto bg-body ${className}`}
    >
      <RootLayout
        layout={(appLayout as LAYOUT_OPTIONS) || layout || defaultLayout}
        menuItems={menuList}
        rightButton={rightButton}
        logo={logo}
        className={className}
        headerClassName={headerClassName}
        contentClassName={contentClassName}
        fullWidth={fullWidth}
      >
        {children}
      </RootLayout>
      <SettingsButton />
      <SettingsDrawer />
    </div>
  );
}

export default ThemeWrapper;

export type { ThemeWrapperProps };
