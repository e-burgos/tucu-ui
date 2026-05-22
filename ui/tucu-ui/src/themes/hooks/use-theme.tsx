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
  defaultSuccessPreset,
  defaultDarkSuccessPreset,
  defaultWarningPreset,
  defaultDarkWarningPreset,
  defaultErrorPreset,
  defaultDarkErrorPreset,
  defaultInfoPreset,
  defaultDarkInfoPreset,
  defaultFgPreset,
  defaultDarkFgPreset,
  defaultBorderPreset,
  defaultDarkBorderPreset,
  macosLightPresets,
  LangType,
  defaultLang,
  THEME_STYLE_LAYOUTS,
  TAHOE_ACCENT_BUNDLES,
  SONOMA_ACCENT_BUNDLES,
  buildTahoePresets,
  buildSonomaPresets,
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
  successPreset: defaultSuccessPreset,
  darkSuccessPreset: defaultDarkSuccessPreset,
  warningPreset: defaultWarningPreset,
  darkWarningPreset: defaultDarkWarningPreset,
  errorPreset: defaultErrorPreset,
  darkErrorPreset: defaultDarkErrorPreset,
  infoPreset: defaultInfoPreset,
  darkInfoPreset: defaultDarkInfoPreset,
  fgPreset: defaultFgPreset,
  darkFgPreset: defaultDarkFgPreset,
  borderPreset: defaultBorderPreset,
  darkBorderPreset: defaultDarkBorderPreset,
} as const;

// ─── Background Variant Type ───────────────────────────────────
export type BackgroundVariant =
  | 'none'
  | 'base'
  | 'sonoma'
  | 'wave'
  | 'wallpaper'
  | 'mobile'
  | 'radial'
  | 'window'
  | 'aurora'
  | 'depth'
  | 'demo';
export type TahoeBackgroundVariant = BackgroundVariant;

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
  backgroundVariant: 'none' as TahoeBackgroundVariant,
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
  successPreset: IThemeItem;
  darkSuccessPreset: IThemeItem;
  warningPreset: IThemeItem;
  darkWarningPreset: IThemeItem;
  errorPreset: IThemeItem;
  darkErrorPreset: IThemeItem;
  infoPreset: IThemeItem;
  darkInfoPreset: IThemeItem;
  fgPreset: IThemeItem;
  darkFgPreset: IThemeItem;
  borderPreset: IThemeItem;
  darkBorderPreset: IThemeItem;
  direction: DIRECTION;
  layout: LAYOUT_OPTIONS;
  mode: MODE;
  colorScheme: THEME_VARIANT;
  logo: LogoType;
  isSettingsOpen: boolean;
  showSettings: boolean;
  lang: LangType;
  backgroundVariant: BackgroundVariant;
}

/** Full store interface: state + auto-generated setters + actions */
export interface ITheme extends IThemeState, Setters<IThemeState> {
  restoreDefaultColors: () => void;
  applyMacOSTheme: () => void;
  applyMacOSTahoeTheme: () => void;
  applyDefaultTheme: () => void;
  applyThemeStyle: (themeStyle: THEME_VARIANT) => void;
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
    (set, get) => ({
      // State with defaults
      ...defaultState,

      // Auto-generated setters (setPrimaryPreset, setMode, etc.)
      ...createSetters(set),

      // Actions
      restoreDefaultColors: () => {
        const currentScheme = get().colorScheme;

        if (currentScheme === 'macos-tahoe') {
          const glassBundle = TAHOE_ACCENT_BUNDLES.find(
            (b) => b.id === 'glass-neutral'
          );
          if (!glassBundle) return;
          set({
            ...buildTahoePresets(glassBundle),
            direction: defaultDirection,
            layout: LAYOUT_OPTIONS.MACOS_TAHOE,
            mode: 'dark' as MODE,
            colorScheme: 'macos-tahoe',
            logo: defaultLogo,
            isSettingsOpen: false,
            lang: defaultLang,
            backgroundVariant: 'radial' as TahoeBackgroundVariant,
          });
        } else if (currentScheme === 'macos') {
          const blueBundle = SONOMA_ACCENT_BUNDLES.find((b) => b.id === 'blue');
          if (!blueBundle) return;
          set({
            ...buildSonomaPresets(blueBundle),
            direction: defaultDirection,
            layout: LAYOUT_OPTIONS.MACOS,
            mode: 'dark' as MODE,
            colorScheme: 'macos',
            logo: defaultLogo,
            isSettingsOpen: false,
            lang: defaultLang,
            backgroundVariant: 'sonoma' as TahoeBackgroundVariant,
          });
        } else {
          set({
            ...defaultPresets,
            direction: defaultDirection,
            layout: defaultLayout,
            mode: defaultMode,
            colorScheme: defaultThemeVariant,
            logo: defaultLogo,
            isSettingsOpen: false,
            lang: defaultLang,
            backgroundVariant: 'none' as TahoeBackgroundVariant,
          });
        }
      },

      applyMacOSTheme: () =>
        set({
          ...macosLightPresets,
          colorScheme: 'macos',
          layout: LAYOUT_OPTIONS.MACOS,
          backgroundVariant: 'sonoma' as TahoeBackgroundVariant,
        }),

      applyMacOSTahoeTheme: () =>
        set({
          ...macosLightPresets,
          colorScheme: 'macos-tahoe',
          layout: LAYOUT_OPTIONS.MACOS_TAHOE,
          backgroundVariant: 'radial' as TahoeBackgroundVariant,
        }),

      applyDefaultTheme: () =>
        set({
          ...defaultPresets,
          colorScheme: 'default',
          layout: defaultLayout,
          backgroundVariant: 'none' as TahoeBackgroundVariant,
        }),

      applyThemeStyle: (themeStyle: THEME_VARIANT) => {
        const config = THEME_STYLE_LAYOUTS[themeStyle];
        const presets =
          themeStyle === 'default' ? defaultPresets : macosLightPresets;
        const bg: BackgroundVariant =
          themeStyle === 'macos-tahoe'
            ? 'radial'
            : themeStyle === 'macos'
            ? 'sonoma'
            : 'none';
        set({
          ...presets,
          colorScheme: themeStyle,
          layout: config.defaultLayout,
          backgroundVariant: bg,
        });
      },
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
