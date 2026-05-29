import { create, StateCreator } from 'zustand';
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
  LangType,
  defaultLang,
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

function getDefaultConfigForScheme(scheme: THEME_VARIANT): IThemeConfig {
  if (scheme === 'macos-tahoe') {
    const glassBundle = TAHOE_ACCENT_BUNDLES.find((b) => b.id === 'glass-neutral');
    const presets = glassBundle ? buildTahoePresets(glassBundle) : defaultPresets;
    return {
      ...presets,
      layout: LAYOUT_OPTIONS.MACOS_TAHOE,
      mode: 'dark' as MODE,
      direction: defaultDirection as DIRECTION,
      backgroundVariant: 'radial' as BackgroundVariant,
    };
  } else if (scheme === 'macos') {
    const blueBundle = SONOMA_ACCENT_BUNDLES.find((b) => b.id === 'blue');
    const presets = blueBundle ? buildSonomaPresets(blueBundle) : defaultPresets;
    return {
      ...presets,
      layout: LAYOUT_OPTIONS.MACOS,
      mode: 'dark' as MODE,
      direction: defaultDirection as DIRECTION,
      backgroundVariant: 'sonoma' as BackgroundVariant,
    };
  } else {
    return {
      ...defaultPresets,
      layout: defaultLayout,
      mode: defaultMode as MODE,
      direction: defaultDirection as DIRECTION,
      backgroundVariant: 'none' as BackgroundVariant,
    };
  }
}

const defaultThemeConfigs = {
  default: getDefaultConfigForScheme('default'),
  macos: getDefaultConfigForScheme('macos'),
  'macos-tahoe': getDefaultConfigForScheme('macos-tahoe'),
};

const defaultState = {
  ...defaultPresets,
  direction: defaultDirection as DIRECTION,
  layout: defaultLayout,
  mode: defaultMode,
  colorScheme: defaultThemeVariant,
  logo: defaultLogo,
  showSettings: false,
  isSettingsOpen: false,
  lang: defaultLang,
  backgroundVariant: 'none' as TahoeBackgroundVariant,
  themeConfigs: defaultThemeConfigs,
} as const;

// ─── Types ─────────────────────────────────────────────────────

interface IThemeConfig {
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
  layout: LAYOUT_OPTIONS;
  mode: MODE;
  direction: DIRECTION;
  backgroundVariant: BackgroundVariant;
}

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
  themeConfigs: Record<THEME_VARIANT, IThemeConfig>;
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

const CONFIG_KEYS = [
  'primaryPreset',
  'darkPrimaryPreset',
  'secondaryPreset',
  'darkSecondaryPreset',
  'accentPreset',
  'darkAccentPreset',
  'mutedPreset',
  'darkMutedPreset',
  'darkBgPreset',
  'lightBgPreset',
  'lightDarkPreset',
  'darkLightDarkPreset',
  'successPreset',
  'darkSuccessPreset',
  'warningPreset',
  'darkWarningPreset',
  'errorPreset',
  'darkErrorPreset',
  'infoPreset',
  'darkInfoPreset',
  'fgPreset',
  'darkFgPreset',
  'borderPreset',
  'darkBorderPreset',
  'layout',
  'mode',
  'direction',
  'backgroundVariant',
];

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Intercepts state updates to synchronize config keys into themeConfigs */
function interceptStateUpdate(state: any, update: any) {
  if (!update || typeof update !== 'object') {
    return update;
  }

  const currentScheme = state.colorScheme;
  const nextScheme = update.colorScheme !== undefined ? update.colorScheme : currentScheme;

  // 1. Get the latest themeConfigs (prefer the one in the update if present)
  let nextThemeConfigs = update.themeConfigs !== undefined ? update.themeConfigs : state.themeConfigs;

  // 2. Identify if there are any config updates
  const configUpdates: any = {};
  let hasConfigUpdates = false;
  for (const key of CONFIG_KEYS) {
    if (key in update) {
      configUpdates[key] = update[key];
      hasConfigUpdates = true;
    }
  }

  // 3. If there are config updates and themeConfigs is not explicitly overridden in this update,
  // we save the config updates into the target theme configuration.
  if (hasConfigUpdates && update.themeConfigs === undefined && nextThemeConfigs) {
    const targetConfig = nextThemeConfigs[nextScheme];
    if (targetConfig) {
      const updatedTargetConfig = {
        ...targetConfig,
        ...configUpdates,
      };
      nextThemeConfigs = {
        ...nextThemeConfigs,
        [nextScheme]: updatedTargetConfig,
      };
    }
  }

  // 4. If colorScheme is changing (or being initialized), we load the configuration for the nextScheme.
  let nextRootConfig = {};
  if (update.colorScheme !== undefined) {
    const targetConfig = nextThemeConfigs ? nextThemeConfigs[nextScheme] : null;
    if (targetConfig) {
      nextRootConfig = {
        ...targetConfig,
        ...configUpdates, // ensure that any config overrides passed along with the colorScheme change take precedence
      };
    }
  }

  return {
    ...update,
    ...nextRootConfig,
    themeConfigs: nextThemeConfigs,
  };
}

/** Zustand middleware to intercept and sync state updates */
const themeConfigInterceptor =
  (config: StateCreator<ITheme, [], []>): StateCreator<ITheme, [], []> =>
  (set, get, api) => {
    // Wrap set (used inside actions)
    const wrappedSet: typeof set = (nextStateOrUpdater: any, replace?: boolean) => {
      set((state: any) => {
        const update = typeof nextStateOrUpdater === 'function' ? nextStateOrUpdater(state) : nextStateOrUpdater;
        return interceptStateUpdate(state, update);
      }, replace as any);
    };

    // Wrap api.setState (used externally, e.g., useTheme.setState)
    const originalSetState = api.setState;
    api.setState = (nextStateOrUpdater: any, replace?: boolean) => {
      originalSetState((state: any) => {
        const update = typeof nextStateOrUpdater === 'function' ? nextStateOrUpdater(state) : nextStateOrUpdater;
        return interceptStateUpdate(state, update);
      }, replace as any);
    };

    return config(wrappedSet, get, api);
  };

/** Generate a setter for every key in IThemeState */
function createSetters(
  set: any
): Setters<IThemeState> {
  const keys = Object.keys(defaultState).filter(k => k !== 'themeConfigs') as (keyof IThemeState)[];
  const setters = {} as Record<string, (v: unknown) => void>;

  for (const key of keys) {
    const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    setters[setterName] = (value: unknown) => {
      set({ [key]: value });
    };
  }

  return setters as Setters<IThemeState>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const useTheme = create<ITheme>()(
  persist(
    themeConfigInterceptor(
      (set, get) => ({
        // State with defaults
        ...defaultState,

        // Auto-generated setters (setPrimaryPreset, setMode, etc.)
        ...createSetters(set),

        // Actions
        restoreDefaultColors: () => {
          const currentScheme = get().colorScheme;
          const defaultConfig = getDefaultConfigForScheme(currentScheme);
          set((state: ITheme) => ({
            ...defaultConfig,
            isSettingsOpen: false,
            themeConfigs: {
              ...state.themeConfigs,
              [currentScheme]: defaultConfig,
            },
          }));
        },

        applyMacOSTheme: () =>
          set({ colorScheme: 'macos' }),

        applyMacOSTahoeTheme: () =>
          set({ colorScheme: 'macos-tahoe' }),

        applyDefaultTheme: () =>
          set({ colorScheme: 'default' }),

        applyThemeStyle: (themeStyle: THEME_VARIANT) => {
          set({ colorScheme: themeStyle });
        },
      })
    ),
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
