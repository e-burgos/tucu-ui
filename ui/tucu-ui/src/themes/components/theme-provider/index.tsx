import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SettingsButton from './settings-button';
import SettingsDrawer from './settings-drawer';
import { useTheme } from '../../use-theme';
import { IMenuItem } from '../../../components/drawer';
import AppRoutes from './app-routes';

import {
  ColorPreset,
  defaultColorPreset,
  defaultLogo,
  defaultSettingActions,
  ISettingAction,
  IThemeItem,
  LAYOUT_OPTIONS,
  PresetColorType,
} from '../../config';
import RootLayout from '../../../components/layouts/root-layout';
import { LogoPropTypes } from '../../../components/logos/logo';

// base css file
import '../../../styles.css';

export interface ThemeProviderProps {
  menuItems: IMenuItem[];
  layout?: LAYOUT_OPTIONS;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
  logo?: LogoPropTypes;
  brandColor?: PresetColorType;
  showSettings?: boolean;
  showSearch?: boolean;
  settingActions?: ISettingAction;
  customRoutes?: React.ReactNode;
  onClickNotification?: () => void;
  onClickSearch?: () => void;
}

export function ThemeProvider({
  menuItems: appMenuItems,
  layout,
  rightButton,
  logo,
  brandColor,
  showSettings,
  showSearch,
  settingActions = defaultSettingActions,
  customRoutes,
  onClickNotification,
  onClickSearch,
}: ThemeProviderProps) {
  const {
    mode,
    setLogo,
    setPreset,
    setShowSettings,
    setShowSearch,
    setSettingActions,
  } = useTheme();
  const htmlTag = document.documentElement;
  const menuItems = [...appMenuItems];
  const menuList = menuItems.filter((item) => !item.hide);

  const selectedColor = ColorPreset.find(
    (item: IThemeItem) => item.label === brandColor
  );

  const checkSettingActions = settingActions || layout || brandColor;

  useEffect(() => {
    if (logo) {
      setLogo(logo);
    } else setLogo(defaultLogo);

    if (selectedColor) {
      setPreset(selectedColor);
    } else setPreset(defaultColorPreset);

    if (showSettings) {
      setShowSettings(showSettings);
    } else setShowSettings(false);

    if (showSearch) {
      setShowSearch(showSearch);
    } else setShowSearch(false);

    if (checkSettingActions) {
      setSettingActions({
        ...defaultSettingActions,
        disabledLayout: layout || settingActions?.disabledLayout ? true : false,
        disabledPreset:
          brandColor || settingActions?.disabledPreset ? true : false,
        disabledDirection: settingActions?.disabledDirection ? true : false,
        disabledMode: settingActions?.disabledMode ? true : false,
      });
    } else setSettingActions(defaultSettingActions);
  }, [
    logo,
    showSettings,
    showSearch,
    settingActions,
    selectedColor,
    setLogo,
    setPreset,
    setShowSettings,
    setShowSearch,
    setSettingActions,
    layout,
    brandColor,
    checkSettingActions,
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
    <BrowserRouter>
      <SettingsButton />
      <SettingsDrawer />
      <Suspense fallback={null}></Suspense>
      <RootLayout
        layout={layout || LAYOUT_OPTIONS.MINIMAL}
        menuItems={menuList}
        rightButton={rightButton}
        logo={logo}
        onClickNotification={onClickNotification}
        onClickSearch={onClickSearch}
      >
        {customRoutes ? customRoutes : <AppRoutes menuItems={menuItems} />}
      </RootLayout>
    </BrowserRouter>
  );
}

export default ThemeProvider;
