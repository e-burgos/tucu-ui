import { useCallback, useEffect, useRef } from 'react';
import { SettingsButton, SettingsDrawer } from '../settings';
import { useTheme } from '../../hooks/use-theme';

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
  const {
    mode,
    layout,
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
    setMode,
    setLogo,
    setLayout,
    setPrimaryPreset,
    setDarkPrimaryPreset,
    setSecondaryPreset,
    setDarkSecondaryPreset,
    setAccentPreset,
    setDarkAccentPreset,
    setMutedPreset,
    setDarkMutedPreset,
    setDarkBgPreset,
    setLightBgPreset,
    setLightDarkPreset,
    setDarkLightDarkPreset,
    setShowSettings,
  } = useTheme();

  const location = useLocation();
  const pathname = location.pathname;
  const htmlTag = document.documentElement;
  const menuItems = [...appMenuItems];
  const menuList = menuItems.filter((item) => !item.hide);

  const isShowSettingsEnabled = Boolean(showSettings);
  const isLogoEnabled = Boolean(logo);
  const isAppModeEnabled = Boolean(appMode);
  const isAppLayoutEnabled = Boolean(appLayout);

  const setCurrentPathnameRef = useRef(setCurrentPathname);

  useEffect(() => {
    setCurrentPathnameRef.current = setCurrentPathname;
  }, [setCurrentPathname]);

  useEffect(() => {
    const currentSetPathname = setCurrentPathnameRef.current;
    if (currentSetPathname) {
      currentSetPathname(pathname);
    }
  }, [pathname]);

  const handleSetLogo = useCallback(() => {
    if (isLogoEnabled && logo) {
      setLogo(logo);
    } else setLogo(defaultLogo);
  }, [isLogoEnabled, logo, setLogo]);

  const handleSetLayout = useCallback(() => {
    if (isAppLayoutEnabled && appLayout) {
      setLayout(appLayout as LAYOUT_OPTIONS);
    } else setLayout(layout);
  }, [isAppLayoutEnabled, appLayout, setLayout, layout]);

  const handleSetMode = useCallback(() => {
    if (isAppModeEnabled && appMode) {
      setMode(appMode);
    } else setMode(mode);
  }, [isAppModeEnabled, appMode, setMode, mode]);

  const handleSetShowSettings = useCallback(() => {
    if (isShowSettingsEnabled && showSettings) {
      setShowSettings(showSettings);
    } else setShowSettings(false);
  }, [isShowSettingsEnabled, showSettings, setShowSettings]);

  const handleSelectedColor = useCallback((): IThemeItem => {
    if (brandColor) {
      const selectedColor = colorPreset?.find(
        (item: IThemeItem) => item.label === brandColor
      );
      if (selectedColor) return selectedColor;
    }
    return primaryPreset;
  }, [brandColor, primaryPreset]);

  const handleCustomPaletteColor = useCallback(
    (label: string, color: PresetColorType | string): IThemeItem => {
      const selectedColor = colorPreset?.find(
        (item: IThemeItem) => item?.label === color
      );
      if (selectedColor) {
        return selectedColor;
      }
      return {
        label: label,
        value: color,
      };
    },
    []
  );

  useEffect(() => {
    handleSetLogo();
    handleSetMode();
    handleSetLayout();
    handleSetShowSettings();
    handleSelectedColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (customPaletteColor?.primary) {
      setPrimaryPreset(
        handleCustomPaletteColor('CustomPrimary', customPaletteColor.primary)
      );
    } else setPrimaryPreset(primaryPreset);

    if (customPaletteColor?.darkPrimary) {
      setDarkPrimaryPreset(
        handleCustomPaletteColor(
          'CustomDarkPrimary',
          customPaletteColor.darkPrimary
        )
      );
    } else setDarkPrimaryPreset(darkPrimaryPreset);

    if (customPaletteColor?.secondary) {
      setSecondaryPreset(
        handleCustomPaletteColor(
          'CustomSecondary',
          customPaletteColor.secondary
        )
      );
    } else setSecondaryPreset(secondaryPreset);

    if (customPaletteColor?.darkSecondary) {
      setDarkSecondaryPreset(
        handleCustomPaletteColor(
          'CustomDarkSecondary',
          customPaletteColor.darkSecondary
        )
      );
    } else setDarkSecondaryPreset(darkSecondaryPreset);

    if (customPaletteColor?.accent) {
      setAccentPreset(
        handleCustomPaletteColor('CustomAccent', customPaletteColor.accent)
      );
    } else setAccentPreset(accentPreset);

    if (customPaletteColor?.darkAccent) {
      setDarkPrimaryPreset(
        handleCustomPaletteColor(
          'CustomDarkAccent',
          customPaletteColor.darkAccent
        )
      );
    } else setDarkAccentPreset(darkAccentPreset);

    if (customPaletteColor?.muted) {
      setMutedPreset(
        handleCustomPaletteColor('CustomMuted', customPaletteColor.muted)
      );
    } else setMutedPreset(mutedPreset);

    if (customPaletteColor?.darkMuted) {
      setDarkMutedPreset(
        handleCustomPaletteColor(
          'CustomDarkMuted',
          customPaletteColor.darkMuted
        )
      );
    } else setDarkMutedPreset(darkMutedPreset);

    if (customPaletteColor?.darkBg) {
      setDarkBgPreset(
        handleCustomPaletteColor('CustomDarkBg', customPaletteColor.darkBg)
      );
    } else setDarkBgPreset(darkBgPreset);

    if (customPaletteColor?.lightBg) {
      setLightBgPreset(
        handleCustomPaletteColor('CustomLightBg', customPaletteColor.lightBg)
      );
    } else setLightBgPreset(lightBgPreset);

    if (customPaletteColor?.lightDark) {
      setLightDarkPreset(
        handleCustomPaletteColor(
          'CustomLightDark',
          customPaletteColor.lightDark
        )
      );
    } else setLightDarkPreset(lightDarkPreset);

    if (customPaletteColor?.darkLightDark) {
      setDarkLightDarkPreset(
        handleCustomPaletteColor(
          'CustomDarkLightDark',
          customPaletteColor.darkLightDark
        )
      );
    } else setDarkLightDarkPreset(darkLightDarkPreset);
  }, [
    customPaletteColor,
    handleCustomPaletteColor,
    primaryPreset,
    secondaryPreset,
    accentPreset,
    darkPrimaryPreset,
    darkSecondaryPreset,
    darkAccentPreset,
    mutedPreset,
    darkMutedPreset,
    darkBgPreset,
    lightBgPreset,
    lightDarkPreset,
    darkLightDarkPreset,
    setPrimaryPreset,
    setSecondaryPreset,
    setAccentPreset,
    setDarkPrimaryPreset,
    setDarkSecondaryPreset,
    setDarkAccentPreset,
    setMutedPreset,
    setDarkMutedPreset,
    setDarkBgPreset,
    setLightBgPreset,
    setLightDarkPreset,
    setDarkLightDarkPreset,
  ]);

  useEffect(() => {
    if (htmlTag) {
      if (mode === 'dark') {
        htmlTag.classList.remove('light');
        htmlTag.classList.add('dark');
      } else {
        htmlTag.classList.remove('dark');
        htmlTag.classList.add('light');
      }
    }
  }, [htmlTag, mode]);

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
