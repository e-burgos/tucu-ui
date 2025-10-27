import { Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import SettingsButton from './settings-button';
import SettingsDrawer from './settings-drawer';
import { useTheme } from '../../use-theme';
import AppRoutes, { AppRoutesMenuItem } from './app-routes';

import {
  ColorPreset,
  defaultColorPreset,
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
    setShowSettings,
    setSettingActions,
  } = useTheme();

  const htmlTag = document.documentElement;
  const menuItems = [...appMenuItems];
  const menuList = menuItems.filter((item) => !item.hide);

  const isPresetDisabled =
    Boolean(brandColor) || Boolean(settingActions?.disabledPreset);
  const isLayoutDisabled =
    Boolean(appLayout) || Boolean(settingActions?.disabledLayout);
  const isDirectionDisabled = Boolean(settingActions?.disabledDirection);
  const isModeDisabled = Boolean(settingActions?.disabledMode);

  const handleSelectedColor = useCallback((): IThemeItem => {
    if (brandColor) {
      const selectedColor = ColorPreset?.find(
        (item: IThemeItem) => item.label === brandColor
      );
      if (selectedColor) return selectedColor;
    }
    return preset;
  }, [brandColor, preset]);

  const selectedColor = handleSelectedColor();

  useEffect(() => {
    if (logo) {
      setLogo(logo);
    } else setLogo(defaultLogo);

    if (appMode) {
      setMode(appMode);
    } else setMode(defaultMode);

    if (selectedColor) {
      setPreset(selectedColor);
    } else setPreset(defaultColorPreset);

    if (showSettings) {
      setShowSettings(showSettings);
    } else setShowSettings(false);
  }, [
    logo,
    appMode,
    showSettings,
    setLogo,
    setMode,
    setPreset,
    setShowSettings,
    selectedColor,
  ]);

  useEffect(() => {
    setSettingActions({
      disabledLayout: isLayoutDisabled,
      disabledPreset: isPresetDisabled,
      disabledDirection: isDirectionDisabled,
      disabledMode: isModeDisabled,
    });
  }, [
    isLayoutDisabled,
    isPresetDisabled,
    isDirectionDisabled,
    isModeDisabled,
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
