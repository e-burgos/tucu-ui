import { Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import SettingsButton from './settings-button';
import SettingsDrawer from './settings-drawer';
import { useTheme } from '../../use-theme';
import AppRoutes, { AppRoutesMenuItem } from './app-routes';

import {
  ColorPreset,
  defaultLogo,
  defaultMode,
  defaultSettingActions,
  ISettingAction,
  IThemeItem,
  LAYOUT_OPTIONS,
  MODE,
  PresetColorType,
} from '../../config';
import ScrollToTop from '../../../components/utils/scroll-to-top';
import RootLayout, {
  LayoutTypeProps,
} from '../../../components/layouts/root-layout';

// base css file
import '../../../styles.css';

interface ThemeProviderProps extends Omit<LayoutTypeProps, 'menuItems'> {
  menuItems: AppRoutesMenuItem[];
  brandColor?: PresetColorType;
  customPaletteColor?: {
    primary?: PresetColorType | string;
    secondary?: PresetColorType | string;
    accent?: PresetColorType | string;
    dark?: PresetColorType | string;
    light?: PresetColorType | string;
  };
  showSettings?: boolean;
  mode?: MODE;
  settingActions?: ISettingAction;
  customRoutes?: React.ReactElement<typeof Routes>;
  withRouterProvider?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

export function ThemeProvider({
  logo,
  rightButton,
  brandColor,
  customPaletteColor,
  showSettings,
  customRoutes,
  className,
  headerClassName,
  contentClassName,
  fullWidth,
  mode: appMode,
  menuItems: appMenuItems,
  layout: appLayout,
  settingActions = defaultSettingActions,
  withRouterProvider = true,
}: ThemeProviderProps) {
  const {
    mode,
    layout,
    preset,
    setMode,
    setLogo,
    setPreset,
    setSecondaryPreset,
    setAccentPreset,
    setDarkPreset,
    setLightPreset,
    setShowSettings,
    setSettingActions,
  } = useTheme();

  const htmlTag = document.documentElement;
  const menuItems = [...appMenuItems];
  const menuList = menuItems.filter((item) => !item.hide);

  const isShowSettingsEnabled = Boolean(showSettings);
  const isLogoEnabled = Boolean(logo);
  const isAppModeEnabled = Boolean(appMode);

  const isPresetDisabled =
    Boolean(brandColor) ||
    Boolean(customPaletteColor?.primary) ||
    Boolean(settingActions?.disabledPreset);
  const isLayoutDisabled =
    Boolean(appLayout) || Boolean(settingActions?.disabledLayout);
  const isDirectionDisabled = Boolean(settingActions?.disabledDirection);
  const isModeDisabled = Boolean(settingActions?.disabledMode);
  const isSecondaryDisabled = Boolean(customPaletteColor?.secondary);
  const isAccentDisabled = Boolean(customPaletteColor?.accent);
  const isDarkDisabled = Boolean(customPaletteColor?.dark);
  const isLightDisabled = Boolean(customPaletteColor?.light);

  const handleSelectedColor = useCallback((): IThemeItem => {
    if (brandColor) {
      const selectedColor = ColorPreset?.find(
        (item: IThemeItem) => item.label === brandColor
      );
      if (selectedColor) return selectedColor;
    }
    return preset;
  }, [brandColor, preset]);

  const handleCustomPaletteColor = useCallback(
    (label: string, color: PresetColorType | string): IThemeItem => {
      const selectedColor = ColorPreset?.find(
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

  const selectedColor = handleSelectedColor();

  useEffect(() => {
    if (isLogoEnabled && logo) {
      setLogo(logo);
    } else {
      setLogo(defaultLogo);
    }
    if (isAppModeEnabled && appMode) {
      setMode(appMode);
    } else {
      setMode(defaultMode);
    }
    if (selectedColor) {
      setPreset(selectedColor);
    }
    if (isShowSettingsEnabled && showSettings) {
      setShowSettings(showSettings);
    } else {
      setShowSettings(false);
    }
  }, [
    logo,
    appMode,
    showSettings,
    setLogo,
    setMode,
    setPreset,
    setShowSettings,
    selectedColor,
    isLogoEnabled,
    isAppModeEnabled,
    isShowSettingsEnabled,
  ]);

  useEffect(() => {
    if (customPaletteColor?.primary) {
      setPreset(
        handleCustomPaletteColor('CustomPrimary', customPaletteColor.primary)
      );
    }

    if (customPaletteColor?.secondary) {
      setSecondaryPreset(
        handleCustomPaletteColor(
          'CustomSecondary',
          customPaletteColor.secondary
        )
      );
    }

    if (customPaletteColor?.accent) {
      setAccentPreset(
        handleCustomPaletteColor('CustomAccent', customPaletteColor.accent)
      );
    }

    if (customPaletteColor?.dark) {
      setDarkPreset(
        handleCustomPaletteColor('CustomDark', customPaletteColor.dark)
      );
    }

    if (customPaletteColor?.light) {
      setLightPreset(
        handleCustomPaletteColor('CustomLight', customPaletteColor.light)
      );
    }
  }, [
    customPaletteColor,
    handleCustomPaletteColor,
    setSecondaryPreset,
    setAccentPreset,
    setDarkPreset,
    setLightPreset,
    setPreset,
  ]);

  useEffect(() => {
    setSettingActions({
      disabledLayout: isLayoutDisabled,
      disabledPreset: isPresetDisabled,
      disabledDirection: isDirectionDisabled,
      disabledMode: isModeDisabled,
      disabledSecondary: isSecondaryDisabled,
      disabledAccent: isAccentDisabled,
      disabledDark: isDarkDisabled,
      disabledLight: isLightDisabled,
    });
  }, [
    isLayoutDisabled,
    isPresetDisabled,
    isDirectionDisabled,
    isModeDisabled,
    isSecondaryDisabled,
    isAccentDisabled,
    isDarkDisabled,
    isLightDisabled,
    setSettingActions,
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

  const children = (
    <Suspense fallback={null}>
      <div
        className={`fixed inset-0 h-screen w-screen overflow-auto ${className}`}
      >
        <RootLayout
          layout={(appLayout as LAYOUT_OPTIONS) || layout || 'minimal'}
          menuItems={menuList}
          rightButton={rightButton}
          logo={logo}
          className={className}
          headerClassName={headerClassName}
          contentClassName={contentClassName}
          fullWidth={fullWidth}
        >
          {customRoutes ? customRoutes : <AppRoutes menuItems={menuItems} />}
        </RootLayout>
        <ScrollToTop />
        <SettingsButton />
        <SettingsDrawer />
      </div>
    </Suspense>
  );

  return withRouterProvider ? (
    <BrowserRouter>{children}</BrowserRouter>
  ) : (
    children
  );
}

export default ThemeProvider;

export type { ThemeProviderProps };
