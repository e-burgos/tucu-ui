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
  THEME_VARIANT,
  defaultThemeVariant,
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
  macosLightPresets,
  LangType,
  defaultLang,
} from '../config/index';

// ─── Default State ─────────────────────────────────────────────
// Single source of truth for every default value.
// Used for initialization, restoreDefaultColors, and partialize.

const defaultPresets = {
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
} as const;

const defaultState = {
  ...defaultPresets,
  direction: defaultDirection,
  layout: defaultLayout,
  mode: defaultMode,
  colorScheme: defaultThemeVariant,
  logo: defaultLogo,
  showSettings: false,
  isSettingsOpen: false,
  lang: defaultLang,
} as const;

// ─── Types ─────────────────────────────────────────────────────

/** Helper: for every key K in T, produce a setter `setK: (value: T[K]) => void` */
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

/** State shape (values only, no functions) */
interface IThemeState {
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
  colorScheme: THEME_VARIANT;
  logo: LogoType;
  isSettingsOpen: boolean;
  showSettings: boolean;
  lang: LangType;
}

/** Full store interface: state + auto-generated setters + actions */
export interface ITheme extends IThemeState, Setters<IThemeState> {
  restoreDefaultColors: () => void;
  applyMacOSTheme: () => void;
  applyDefaultTheme: () => void;
}

// ─── Store ─────────────────────────────────────────────────────

/** Generate a setter for every key in IThemeState */
function createSetters(
  set: (partial: Partial<IThemeState>) => void
): Setters<IThemeState> {
  const keys = Object.keys(defaultState) as (keyof IThemeState)[];
  const setters = {} as Record<string, (v: unknown) => void>;

  for (const key of keys) {
    const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    setters[setterName] = (value: unknown) =>
      set({ [key]: value } as Partial<IThemeState>);
  }

  return setters as Setters<IThemeState>;
}

export const useTheme = create<ITheme>()(
  persist(
    (set) => ({
      // State with defaults
      ...defaultState,

      // Auto-generated setters (setPrimaryPreset, setMode, etc.)
      ...createSetters(set),

      // Actions
      restoreDefaultColors: () =>
        set({
          ...defaultPresets,
          direction: defaultDirection,
          layout: defaultLayout,
          mode: defaultMode,
          colorScheme: defaultThemeVariant,
          logo: defaultLogo,
          isSettingsOpen: false,
          lang: defaultLang,
        }),

      applyMacOSTheme: () =>
        set({
          ...macosLightPresets,
          colorScheme: 'macos',
          layout: LAYOUT_OPTIONS.MACOS_TAHOE,
        }),

      applyDefaultTheme: () =>
        set({
          ...defaultPresets,
          colorScheme: 'default',
          layout: defaultLayout,
        }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => {
        // Persist everything except transient UI state (isSettingsOpen)
        // and serialize logo without the React node
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isSettingsOpen: _omit, ...persisted } = state;

        // Extract only data keys (exclude functions)
        const data = Object.fromEntries(
          Object.entries(persisted).filter(([, v]) => typeof v !== 'function')
        );

        return { ...data, logo: { ...state.logo, logo: null } };
      },
    }
  )
);
