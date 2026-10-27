'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SettingsButton, SettingsDrawer } from '../settings';
import { useTheme } from '../../hooks/use-theme';
import { useDocumentThemePreset } from '../../hooks/use-document-theme-preset';
import type { ThemePreset } from '../../presets';
import type { ITheme, BackgroundVariant } from '../../hooks/use-theme';

import {
  colorPreset,
  defaultLayout,
  defaultLogo,
  IThemeItem,
  PresetColorType,
  LAYOUT_OPTIONS,
  MODE,
  THEME_STYLE_LAYOUTS,
  THEME_VARIANT,
  LangType,
} from '../../config';
import { resolveTucuLang } from '../../../libs/i18n/messages';
import {
  RootLayout,
  LayoutTypeProps,
} from '../../../components/layouts/root-layout';
import { IMenuItem } from '../../../components/layouts/menus/menu-item';

import { useTucuNavigation } from '../../navigation/core';

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
  ['success', 'successPreset', 'CustomSuccess'],
  ['darkSuccess', 'darkSuccessPreset', 'CustomDarkSuccess'],
  ['warning', 'warningPreset', 'CustomWarning'],
  ['darkWarning', 'darkWarningPreset', 'CustomDarkWarning'],
  ['error', 'errorPreset', 'CustomError'],
  ['darkError', 'darkErrorPreset', 'CustomDarkError'],
  ['info', 'infoPreset', 'CustomInfo'],
  ['darkInfo', 'darkInfoPreset', 'CustomDarkInfo'],
  ['fg', 'fgPreset', 'CustomFg'],
  ['darkFg', 'darkFgPreset', 'CustomDarkFg'],
  ['border', 'borderPreset', 'CustomBorder'],
  ['darkBorder', 'darkBorderPreset', 'CustomDarkBorder'],
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

interface ThemeWrapperBaseProps extends Omit<LayoutTypeProps, 'layout'> {
  menuItems: IMenuItem[];
  brandColor?: PresetColorType;
  /** Named brand preset (or an inline one) applied to the whole page. Takes precedence over `brandColor`. */
  preset?: string | ThemePreset;
  mode?: MODE;
  /** Mode applied only on the first visit, when no theme state is persisted; `'system'` follows `prefers-color-scheme`; `mode` always wins */
  defaultMode?: MODE | 'system';
  background?: BackgroundVariant;
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
    success?: PresetColorType | string;
    darkSuccess?: PresetColorType | string;
    warning?: PresetColorType | string;
    darkWarning?: PresetColorType | string;
    error?: PresetColorType | string;
    darkError?: PresetColorType | string;
    info?: PresetColorType | string;
    darkInfo?: PresetColorType | string;
    fg?: PresetColorType | string;
    darkFg?: PresetColorType | string;
    border?: PresetColorType | string;
    darkBorder?: PresetColorType | string;
  };
  setCurrentPathname?: (pathname: string) => void;
  /**
   * Language for built-in component strings (validation messages, aria
   * labels, DataTable pagination, date picker). Accepts `es-AR`-style tags.
   * When omitted, the persisted theme lang (default `en`) is kept.
   */
  lang?: LangType | (string & Record<never, never>);
}

// ─── Conditional layout types per theme style ───────────────────
type DefaultLayoutType = 'clean' | 'admin' | 'horizontal';
type MacOSLayoutType = 'macos' | 'macos-clean';
type MacOSTahoeLayoutType =
  | 'macos-tahoe'
  | 'macos-tahoe-dock'
  | 'macos-tahoe-clean';

interface DefaultThemeWrapperProps extends ThemeWrapperBaseProps {
  themeStyle?: 'default';
  layout?: DefaultLayoutType;
}

interface MacOSThemeWrapperProps extends ThemeWrapperBaseProps {
  themeStyle: 'macos';
  layout?: MacOSLayoutType;
}

interface MacOSTahoeThemeWrapperProps extends ThemeWrapperBaseProps {
  themeStyle: 'macos-tahoe';
  layout?: MacOSTahoeLayoutType;
}

function findThemeStyleForLayout(
  layout: LAYOUT_OPTIONS
): THEME_VARIANT | undefined {
  return (Object.keys(THEME_STYLE_LAYOUTS) as THEME_VARIANT[]).find(
    (style) => THEME_STYLE_LAYOUTS[style].validLayouts.includes(layout)
  );
}

function hasPersistedThemeState(): boolean {
  try {
    return (
      window.localStorage.getItem(useTheme.persist.getOptions().name ?? '') !==
      null
    );
  } catch {
    return false;
  }
}

type ThemeWrapperProps =
  | DefaultThemeWrapperProps
  | MacOSThemeWrapperProps
  | MacOSTahoeThemeWrapperProps;

/** Distributive Omit — preserves discriminated union across variants */
type DistributiveOmit<T, K extends keyof never> = T extends unknown
  ? Omit<T, K>
  : never;

function resolveSystemMode(mode: MODE | 'system'): MODE {
  if (mode !== 'system') return mode;
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeWrapper({
  logo = {},
  rightButton,
  themeStyle,
  brandColor,
  preset,
  customPaletteColor,
  background,
  showSettings,
  className,
  headerClassName,
  contentClassName,
  fullWidth,
  mode: appMode,
  defaultMode,
  menuItems: appMenuItems,
  layout: appLayout,
  children,
  setCurrentPathname,
  lang: appLang,
}: ThemeWrapperProps) {
  const { mode, layout, colorScheme } = useTheme();

  const [hadPersistedThemeState] = useState(hasPersistedThemeState);
  const { pathname } = useTucuNavigation();
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

  // ─── Lang sync ───────────────────────────────────────────────
  useEffect(() => {
    if (appLang) useTheme.setState({ lang: resolveTucuLang(appLang) });
  }, [appLang]);

  // ─── Initialize theme on mount ───────────────────────────────
  useEffect(() => {
    const hasCustomLogo = Object.keys(logo).length > 0;

    // Resolve brandColor to a primary preset if provided
    const brandPreset = brandColor
      ? colorPreset?.find((item) => item.label === brandColor)
      : undefined;

    // Resolve layout based on themeStyle constraints
    const themeConfig = themeStyle
      ? THEME_STYLE_LAYOUTS[themeStyle]
      : undefined;
    const resolvedLayout = themeConfig
      ? appLayout &&
        themeConfig.validLayouts.includes(appLayout as LAYOUT_OPTIONS)
        ? (appLayout as LAYOUT_OPTIONS)
        : themeConfig.defaultLayout
      : appLayout
      ? (appLayout as LAYOUT_OPTIONS)
      : undefined;

    // Apply themeStyle presets if provided
    const layoutThemeStyle = resolvedLayout
      ? findThemeStyleForLayout(resolvedLayout)
      : undefined;
    const effectiveThemeStyle = themeStyle ?? layoutThemeStyle;
    if (
      effectiveThemeStyle &&
      effectiveThemeStyle !== useTheme.getState().colorScheme
    ) {
      useTheme.getState().applyThemeStyle(effectiveThemeStyle);
    }
    const initialMode =
      appMode ??
      (defaultMode && !hadPersistedThemeState
        ? resolveSystemMode(defaultMode)
        : undefined);

    useTheme.setState({
      logo: hasCustomLogo ? logo : defaultLogo,
      showSettings: Boolean(showSettings),
      ...(initialMode && { mode: initialMode }),
      ...(resolvedLayout && { layout: resolvedLayout }),
      ...(brandPreset && { primaryPreset: brandPreset }),
      ...(background && { backgroundVariant: background }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDocumentThemePreset(preset);

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
  // Adds/removes 'dark' and 'light' classes independently from 'macos'.
  // Result: <html class="macos dark"> → CSS selector: html.macos.dark
  // All macOS CSS files (macos-foundations, macos-liquid-glass, etc.)
  // use html.macos.dark { } — NOT html.macos[data-mode="dark"].
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', mode === 'dark');
    html.classList.toggle('light', mode !== 'dark');
  }, [mode]);

  // ─── macOS theme/layout classes on <html> ────────────────────
  // 'macos' class is applied ONLY for Sonoma theme.
  // 'macos-tahoe' class is applied ONLY for Tahoe theme.
  // The two themes are fully independent — never overlap.
  useEffect(() => {
    document.documentElement.classList.toggle(
      'macos',
      colorScheme === 'macos' ||
        layout === LAYOUT_OPTIONS.MACOS ||
        layout === LAYOUT_OPTIONS.MACOS_NAVBAR
    );
  }, [colorScheme, layout]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      'macos-tahoe',
      colorScheme === 'macos-tahoe' ||
        layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
        layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK ||
        layout === LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR
    );
  }, [colorScheme, layout]);

  // ─── Resolve effective layout ─────────────────────────────────
  const effectiveLayout = useMemo(() => {
    if (appLayout) {
      return appLayout as LAYOUT_OPTIONS;
    }
    return layout || defaultLayout;
  }, [appLayout, layout]);

  return (
    <div
      className={`fixed inset-0 h-dvh overflow-y-auto overflow-x-hidden bg-body ${className}`}
    >
      <RootLayout
        layout={effectiveLayout}
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

export type {
  ThemeWrapperProps,
  ThemeWrapperBaseProps,
  DefaultThemeWrapperProps,
  MacOSThemeWrapperProps,
  MacOSTahoeThemeWrapperProps,
  DistributiveOmit,
  DefaultLayoutType,
  MacOSLayoutType,
  MacOSTahoeLayoutType,
};
