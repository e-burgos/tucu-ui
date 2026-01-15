import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  defaultLayout,
  defaultMode,
  defaultLogo,
  DIRECTION,
  IThemeItem,
  LogoType,
  LAYOUT_OPTIONS,
  defaultDirection,
  MODE,
  defaultPrimaryPreset,
  defaultDarkPrimaryPreset,
  defaultSecondaryPreset,
  defaultDarkSecondaryPreset,
  defaultAccentPreset,
  defaultDarkAccentPreset,
  defaultMutedPreset,
  defaultDarkMutedPreset,
  defaultDarkBgPreset,
  defaultLightBgPreset,
  defaultLightDarkPreset,
  defaultDarkLightDarkPreset,
  LangType,
  defaultLang,
} from '../config/index';

export interface ITheme {
  primaryPreset: IThemeItem;
  darkPrimaryPreset: IThemeItem;
  secondaryPreset: IThemeItem;
  darkSecondaryPreset: IThemeItem;
  accentPreset: IThemeItem;
  darkAccentPreset: IThemeItem;
  mutedPreset: IThemeItem;
  darkMutedPreset: IThemeItem;
  darkBgPreset: IThemeItem;
  lightBgPreset: IThemeItem;
  lightDarkPreset: IThemeItem;
  darkLightDarkPreset: IThemeItem;
  direction: DIRECTION;
  layout: LAYOUT_OPTIONS;
  mode: MODE;
  logo: LogoType;
  isSettingsOpen: boolean;
  showSettings: boolean;
  lang: LangType;
  setPrimaryPreset: (primaryPreset: IThemeItem) => void;
  setDarkPrimaryPreset: (darkPrimaryPreset: IThemeItem) => void;
  setSecondaryPreset: (secondaryPreset: IThemeItem) => void;
  setDarkSecondaryPreset: (darkSecondaryPreset: IThemeItem) => void;
  setAccentPreset: (accentPreset: IThemeItem) => void;
  setDarkAccentPreset: (darkAccentPreset: IThemeItem) => void;
  setMutedPreset: (mutedPreset: IThemeItem) => void;
  setDarkMutedPreset: (darkMutedPreset: IThemeItem) => void;
  setDarkBgPreset: (darkBgPreset: IThemeItem) => void;
  setLightBgPreset: (lightBgPreset: IThemeItem) => void;
  setLightDarkPreset: (lightDarkPreset: IThemeItem) => void;
  setDarkLightDarkPreset: (darkLightDarkPreset: IThemeItem) => void;
  setDirection: (direction: DIRECTION) => void;
  setLayout: (layout: LAYOUT_OPTIONS) => void;
  setMode: (mode: MODE) => void;
  setLogo: (logo: LogoType) => void;
  setIsSettingsOpen: (isSettingsOpen: boolean) => void;
  setShowSettings: (showSettings: boolean) => void;
  setLang: (lang: LangType) => void;
  restoreDefaultColors: () => void;
}

export const useTheme = create<ITheme>()(
  persist(
    (set) => ({
      primaryPreset: defaultPrimaryPreset,
      darkPrimaryPreset: defaultDarkPrimaryPreset,
      secondaryPreset: defaultSecondaryPreset,
      darkSecondaryPreset: defaultDarkSecondaryPreset,
      accentPreset: defaultAccentPreset,
      darkAccentPreset: defaultDarkAccentPreset,
      mutedPreset: defaultMutedPreset,
      darkMutedPreset: defaultDarkMutedPreset,
      darkBgPreset: defaultDarkBgPreset,
      lightBgPreset: defaultLightBgPreset,
      lightDarkPreset: defaultLightDarkPreset,
      darkLightDarkPreset: defaultDarkLightDarkPreset,
      direction: defaultDirection,
      layout: defaultLayout,
      mode: defaultMode,
      logo: defaultLogo,
      showSettings: false,
      isSettingsOpen: false,
      lang: defaultLang,
      setPrimaryPreset: (primaryPreset: IThemeItem) => set({ primaryPreset }),
      setDarkPrimaryPreset: (darkPrimaryPreset: IThemeItem) =>
        set({ darkPrimaryPreset }),
      setSecondaryPreset: (secondaryPreset: IThemeItem) =>
        set({ secondaryPreset }),
      setAccentPreset: (accentPreset: IThemeItem) => set({ accentPreset }),
      setDarkSecondaryPreset: (darkSecondaryPreset: IThemeItem) =>
        set({ darkSecondaryPreset }),
      setDarkAccentPreset: (darkAccentPreset: IThemeItem) =>
        set({ darkAccentPreset }),
      setMutedPreset: (mutedPreset: IThemeItem) => set({ mutedPreset }),
      setDarkMutedPreset: (darkMutedPreset: IThemeItem) =>
        set({ darkMutedPreset }),
      setDarkBgPreset: (darkBgPreset: IThemeItem) => set({ darkBgPreset }),
      setLightBgPreset: (lightBgPreset: IThemeItem) => set({ lightBgPreset }),
      setLightDarkPreset: (lightDarkPreset: IThemeItem) =>
        set({ lightDarkPreset }),
      setDarkLightDarkPreset: (darkLightDarkPreset: IThemeItem) =>
        set({ darkLightDarkPreset }),
      setDirection: (direction: DIRECTION) => set({ direction }),
      setLayout: (layout: LAYOUT_OPTIONS) => set({ layout }),
      setMode: (mode: MODE) => set({ mode }),
      setLogo: (logo: LogoType) => set({ logo }),
      setShowSettings: (showSettings: boolean) => set({ showSettings }),
      setIsSettingsOpen: (isSettingsOpen: boolean) => set({ isSettingsOpen }),
      setLang: (lang: LangType) => set({ lang }),
      restoreDefaultColors: () =>
        set({
          primaryPreset: defaultPrimaryPreset,
          darkPrimaryPreset: defaultDarkPrimaryPreset,
          secondaryPreset: defaultSecondaryPreset,
          accentPreset: defaultAccentPreset,
          darkSecondaryPreset: defaultDarkSecondaryPreset,
          darkAccentPreset: defaultDarkAccentPreset,
          mutedPreset: defaultMutedPreset,
          darkMutedPreset: defaultDarkMutedPreset,
          darkBgPreset: defaultDarkBgPreset,
          lightBgPreset: defaultLightBgPreset,
          lightDarkPreset: defaultLightDarkPreset,
          darkLightDarkPreset: defaultDarkLightDarkPreset,
          direction: defaultDirection,
          layout: defaultLayout,
          mode: defaultMode,
          logo: defaultLogo,
          isSettingsOpen: false,
          lang: defaultLang,
          restoreDefaultColors: () =>
            set({
              primaryPreset: defaultPrimaryPreset,
              darkPrimaryPreset: defaultDarkPrimaryPreset,
              secondaryPreset: defaultSecondaryPreset,
              accentPreset: defaultAccentPreset,
              darkSecondaryPreset: defaultDarkSecondaryPreset,
              darkAccentPreset: defaultDarkAccentPreset,
              mutedPreset: defaultMutedPreset,
              darkMutedPreset: defaultDarkMutedPreset,
              darkBgPreset: defaultDarkBgPreset,
              lightBgPreset: defaultLightBgPreset,
              lightDarkPreset: defaultLightDarkPreset,
              darkLightDarkPreset: defaultDarkLightDarkPreset,
              lang: defaultLang,
            }),
        }),
    }),
    {
      name: 'theme-storage', // unique name for localStorage key
      partialize: (state) => ({
        // Only persist these properties, exclude isSettingsOpen as it's temporary UI state
        primaryPreset: state.primaryPreset,
        darkPrimaryPreset: state.darkPrimaryPreset,
        secondaryPreset: state.secondaryPreset,
        accentPreset: state.accentPreset,
        darkSecondaryPreset: state.darkSecondaryPreset,
        darkAccentPreset: state.darkAccentPreset,
        mutedPreset: state.mutedPreset,
        darkMutedPreset: state.darkMutedPreset,
        darkBgPreset: state.darkBgPreset,
        lightBgPreset: state.lightBgPreset,
        lightDarkPreset: state.lightDarkPreset,
        darkLightDarkPreset: state.darkLightDarkPreset,
        direction: state.direction,
        layout: state.layout,
        mode: state.mode,
        logo: { ...state.logo, logo: null },
        showSettings: state.showSettings,
        lang: state.lang,
      }),
    }
  )
);
