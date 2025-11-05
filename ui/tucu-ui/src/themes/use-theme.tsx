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
  defaultSecondaryPreset,
  defaultAccentPreset,
  defaultDarkPreset,
  defaultLightPreset,
} from './config';

export interface ITheme {
  preset: IThemeItem;
  secondaryPreset: IThemeItem;
  accentPreset: IThemeItem;
  darkPreset: IThemeItem;
  lightPreset: IThemeItem;
  direction: DIRECTION;
  layout: LAYOUT_OPTIONS;
  mode: MODE;
  logo: LogoType;
  isSettingsOpen: boolean;
  showSettings: boolean;
  settingActions: ISettingAction;
  setPreset: (preset: IThemeItem) => void;
  setSecondaryPreset: (secondaryPreset: IThemeItem) => void;
  setAccentPreset: (accentPreset: IThemeItem) => void;
  setDarkPreset: (darkPreset: IThemeItem) => void;
  setLightPreset: (lightPreset: IThemeItem) => void;
  setDirection: (direction: DIRECTION) => void;
  setLayout: (layout: LAYOUT_OPTIONS) => void;
  setMode: (mode: MODE) => void;
  setLogo: (logo: LogoType) => void;
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
  setShowSettings: (showSettings: boolean) => void;
  setSettingActions: (settingActions: ISettingAction) => void;
  restoreDefaultColors: () => void;
}

export const useTheme = create<ITheme>()(
  persist(
    (set) => ({
      preset: defaultColorPreset,
      secondaryPreset: defaultSecondaryPreset,
      accentPreset: defaultAccentPreset,
      darkPreset: defaultDarkPreset,
      lightPreset: defaultLightPreset,
      direction: defaultDirection,
      layout: defaultLayout,
      mode: defaultMode,
      logo: defaultLogo,
      settingActions: defaultSettingActions,
      showSettings: false,
      isSettingsOpen: false,
      setPreset: (preset: IThemeItem) => set({ preset }),
      setSecondaryPreset: (secondaryPreset: IThemeItem) =>
        set({ secondaryPreset }),
      setAccentPreset: (accentPreset: IThemeItem) => set({ accentPreset }),
      setDarkPreset: (darkPreset: IThemeItem) => set({ darkPreset }),
      setLightPreset: (lightPreset: IThemeItem) => set({ lightPreset }),
      setDirection: (direction: DIRECTION) => set({ direction }),
      setLayout: (layout: LAYOUT_OPTIONS) => set({ layout }),
      setMode: (mode: MODE) => set({ mode }),
      setLogo: (logo: LogoType) => set({ logo }),
      setShowSettings: (showSettings: boolean) => set({ showSettings }),
      setSettingActions: (settingActions: ISettingAction) =>
        set({ settingActions }),
      setIsSettingsOpen: (isSettingsOpen: boolean) => set({ isSettingsOpen }),
      restoreDefaultColors: () =>
        set({
          preset: defaultColorPreset,
          secondaryPreset: defaultSecondaryPreset,
          accentPreset: defaultAccentPreset,
          darkPreset: defaultDarkPreset,
          lightPreset: defaultLightPreset,
          direction: defaultDirection,
          layout: defaultLayout,
          mode: defaultMode,
          logo: defaultLogo,
          settingActions: defaultSettingActions,
          showSettings: false,
          isSettingsOpen: false,
          restoreDefaultColors: () =>
            set({
              preset: defaultColorPreset,
              secondaryPreset: defaultSecondaryPreset,
              accentPreset: defaultAccentPreset,
              darkPreset: defaultDarkPreset,
              lightPreset: defaultLightPreset,
            }),
        }),
    }),
    {
      name: 'theme-storage', // unique name for localStorage key
      partialize: (state) => ({
        // Only persist these properties, exclude isSettingsOpen as it's temporary UI state
        preset: state.preset,
        secondaryPreset: state.secondaryPreset,
        accentPreset: state.accentPreset,
        darkPreset: state.darkPreset,
        lightPreset: state.lightPreset,
        direction: state.direction,
        layout: state.layout,
        mode: state.mode,
        logo: { ...state.logo, logo: null },
        showSettings: state.showSettings,
        settingActions: state.settingActions,
      }),
    }
  )
);
