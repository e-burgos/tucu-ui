import { create } from 'zustand';
import {
  defaultColorPreset,
  defaultDirection,
  defaultLayout,
  defaultMode,
  defaultLogo,
  DIRECTION,
  IThemeItem,
  LogoType,
  LAYOUT_OPTIONS,
  MODE,
  ISettingAction,
  defaultSettingActions,
} from './config';
import { storage } from '../libs/local-storage';

export interface ITheme {
  preset: IThemeItem;
  direction: DIRECTION;
  layout: LAYOUT_OPTIONS;
  mode: MODE;
  logo: LogoType;
  isSettingsOpen: boolean;
  showSettings: boolean;
  settingActions: ISettingAction;
  setPreset: (preset: IThemeItem) => void;
  setDirection: (direction: DIRECTION) => void;
  setLayout: (layout: LAYOUT_OPTIONS) => void;
  setMode: (mode: MODE) => void;
  setLogo: (logo: LogoType) => void;
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
  setShowSettings: (showSettings: boolean) => void;
  setSettingActions: (settingActions: ISettingAction) => void;
}

export const useTheme = create<ITheme>((set) => {
  const settings: ITheme = storage.get('settings') || null;
  return {
    preset: settings?.preset || defaultColorPreset,
    direction: settings?.direction || defaultDirection,
    layout: settings?.layout || defaultLayout,
    mode: settings?.mode || defaultMode,
    logo: settings?.logo || defaultLogo,
    showSettings: settings?.showSettings || false,
    settingActions: settings?.settingActions || defaultSettingActions,
    isSettingsOpen: false,
    setPreset: (preset: IThemeItem) =>
      set((state) => {
        storage.set('settings', { ...state, preset });
        return { preset };
      }),
    setDirection: (direction: DIRECTION) =>
      set((state) => {
        storage.set('settings', { ...state, direction });
        return { direction };
      }),
    setLayout: (layout: LAYOUT_OPTIONS) =>
      set((state) => {
        storage.set('settings', { ...state, layout });
        return { layout };
      }),
    setMode: (mode: MODE) =>
      set((state) => {
        storage.set('settings', { ...state, mode });
        return { mode };
      }),
    setLogo: (logo: LogoType) =>
      set((state) => {
        storage.set('settings', { ...state, logo });
        return { logo };
      }),
    setShowSettings: (showSettings: boolean) =>
      set((state) => {
        storage.set('settings', { ...state, showSettings });
        return { showSettings };
      }),
    setSettingActions: (settingActions: ISettingAction) =>
      set((state) => {
        storage.set('settings', { ...state, settingActions });
        return { settingActions };
      }),
    setIsSettingsOpen: (isSettingsOpen: boolean) =>
      set((state) => ({ ...state, isSettingsOpen })),
  };
});
