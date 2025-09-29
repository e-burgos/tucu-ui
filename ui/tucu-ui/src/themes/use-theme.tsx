import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export const useTheme = create<ITheme>()(
  persist(
    (set) => ({
      preset: defaultColorPreset,
      direction: defaultDirection,
      layout: defaultLayout,
      mode: defaultMode,
      logo: defaultLogo,
      settingActions: defaultSettingActions,
      showSettings: false,
      isSettingsOpen: false,
      setPreset: (preset: IThemeItem) => set({ preset }),
      setDirection: (direction: DIRECTION) => set({ direction }),
      setLayout: (layout: LAYOUT_OPTIONS) => set({ layout }),
      setMode: (mode: MODE) => set({ mode }),
      setLogo: (logo: LogoType) => set({ logo }),
      setShowSettings: (showSettings: boolean) => set({ showSettings }),
      setSettingActions: (settingActions: ISettingAction) =>
        set({ settingActions }),
      setIsSettingsOpen: (isSettingsOpen: boolean) => set({ isSettingsOpen }),
    }),
    {
      name: 'theme-storage', // unique name for localStorage key
      partialize: (state) => ({
        // Only persist these properties, exclude isSettingsOpen as it's temporary UI state
        preset: state.preset,
        direction: state.direction,
        layout: state.layout,
        mode: state.mode,
        logo: state.logo,
        showSettings: state.showSettings,
        settingActions: state.settingActions,
      }),
    }
  )
);
