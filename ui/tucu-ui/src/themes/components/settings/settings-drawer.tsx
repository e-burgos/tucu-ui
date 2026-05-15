import React, { JSX, useState } from 'react';
import { Button } from '../../../components/buttons/button';
import { useTheme } from '../../hooks/use-theme';
import type { ITheme } from '../../hooks/use-theme';
import cn from 'classnames';
import {
  colorPreset,
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
  IThemeItem,
  LAYOUT_OPTIONS,
  layoutOptions,
  TAHOE_ACCENT_BUNDLES,
  buildTahoePresets,
  SONOMA_ACCENT_BUNDLES,
  buildSonomaPresets,
} from '../../config';
import {
  MinimalLayoutIcon,
  ClassicLayoutIcon,
  LeftAlign,
  RightAlign,
  Sun,
  Moon,
} from '../../../components/icons';
import { Drawer } from '../../../components/dialog/drawer';
import { DrawerContainer } from '../../../components/dialog/drawer-container';
import { Scrollbar } from '../../../components/common/scrollbar';
import { Close } from '../../../components/icons/close';
import { Input } from '../../../components/inputs/input';
import { Select, SelectOption } from '../../../components/inputs/select';

// ─── Color Configuration Map ───────────────────────────────────
// Single source of truth: eliminates repetitive ternary chains.

type ColorType =
  | 'primary'
  | 'darkPrimary'
  | 'secondary'
  | 'darkSecondary'
  | 'accent'
  | 'darkAccent'
  | 'muted'
  | 'darkMuted'
  | 'darkBg'
  | 'lightBg'
  | 'lightDark'
  | 'darkLightDark';

interface ColorConfig {
  presetKey: keyof ITheme;
  setterKey: keyof ITheme;
  defaultValue: IThemeItem;
  label: string;
}

const COLOR_CONFIG: Record<ColorType, ColorConfig> = {
  primary: {
    presetKey: 'primaryPreset',
    setterKey: 'setPrimaryPreset',
    defaultValue: defaultPrimaryPreset,
    label: 'Primary Color',
  },
  darkPrimary: {
    presetKey: 'darkPrimaryPreset',
    setterKey: 'setDarkPrimaryPreset',
    defaultValue: defaultDarkPrimaryPreset,
    label: 'Dark Primary Color',
  },
  secondary: {
    presetKey: 'secondaryPreset',
    setterKey: 'setSecondaryPreset',
    defaultValue: defaultSecondaryPreset,
    label: 'Secondary Color',
  },
  darkSecondary: {
    presetKey: 'darkSecondaryPreset',
    setterKey: 'setDarkSecondaryPreset',
    defaultValue: defaultDarkSecondaryPreset,
    label: 'Dark Secondary Color',
  },
  accent: {
    presetKey: 'accentPreset',
    setterKey: 'setAccentPreset',
    defaultValue: defaultAccentPreset,
    label: 'Accent Color',
  },
  darkAccent: {
    presetKey: 'darkAccentPreset',
    setterKey: 'setDarkAccentPreset',
    defaultValue: defaultDarkAccentPreset,
    label: 'Dark Accent Color',
  },
  muted: {
    presetKey: 'mutedPreset',
    setterKey: 'setMutedPreset',
    defaultValue: defaultMutedPreset,
    label: 'Muted Color',
  },
  darkMuted: {
    presetKey: 'darkMutedPreset',
    setterKey: 'setDarkMutedPreset',
    defaultValue: defaultDarkMutedPreset,
    label: 'Dark Muted Color',
  },
  darkBg: {
    presetKey: 'darkBgPreset',
    setterKey: 'setDarkBgPreset',
    defaultValue: defaultDarkBgPreset,
    label: 'Dark Background Color',
  },
  lightBg: {
    presetKey: 'lightBgPreset',
    setterKey: 'setLightBgPreset',
    defaultValue: defaultLightBgPreset,
    label: 'Light Background Color',
  },
  lightDark: {
    presetKey: 'lightDarkPreset',
    setterKey: 'setLightDarkPreset',
    defaultValue: defaultLightDarkPreset,
    label: 'Light Dark Color',
  },
  darkLightDark: {
    presetKey: 'darkLightDarkPreset',
    setterKey: 'setDarkLightDarkPreset',
    defaultValue: defaultDarkLightDarkPreset,
    label: 'Dark Light Dark Color',
  },
};

const COLOR_TYPES = Object.keys(COLOR_CONFIG) as ColorType[];

// ─── Shared Components ─────────────────────────────────────────

interface SwitcherButtonProps {
  onClick?: () => void;
  checked: boolean;
  title: string;
}
function SwitcherButton({
  onClick,
  checked,
  title,
  children,
}: React.PropsWithChildren<SwitcherButtonProps>) {
  return (
    <button
      onClick={onClick}
      onTouchStart={onClick}
      aria-label={title}
      aria-describedby={title}
      className="group cursor-pointer outline-hidden focus:outline-hidden focus:outline-none w-full"
    >
      <span
        className={cn(
          'flex h-17.5 items-center justify-center rounded-lg text-center text-sm font-medium uppercase tracking-wide transition-all',
          checked
            ? 'shadow-large bg-brand/50'
            : 'bg-white dark:bg-gray-600 text-gray-500 group-hover:bg-brand/20 dark:text-gray-400'
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'mt-3 block text-center text-sm transition-all',
          checked
            ? 'text-brand dark:text-white'
            : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
        )}
      >
        {title}
      </span>
    </button>
  );
}

function SettingsSectionHeading({ children }: { children: React.ReactNode }) {
  const { colorScheme, layout } = useTheme();
  const isMacOS =
    colorScheme === 'macos' ||
    colorScheme === 'macos-tahoe' ||
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;

  if (isMacOS) {
    return (
      <div
        role="heading"
        aria-level={3}
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-(--macos-secondary-label)"
      >
        {children}
      </div>
    );
  }

  return (
    <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
      {children}
    </h4>
  );
}

// ─── ThemeSwitcher ─────────────────────────────────────────────

function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Mode</SettingsSectionHeading>
      <div role="radiogroup" className="grid grid-cols-2 gap-5">
        <SwitcherButton
          onClick={() => setMode('light')}
          title="Light"
          checked={mode === 'light'}
        >
          <Sun />
        </SwitcherButton>
        <SwitcherButton
          onClick={() => setMode('dark')}
          title="Dark"
          checked={mode === 'dark'}
        >
          <Moon />
        </SwitcherButton>
      </div>
    </div>
  );
}

// ─── ThemeVariantSwitcher ──────────────────────────────────────

// Minimal SVG icon representing a generic default layout
function DefaultThemeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

// Minimal SVG icon representing a macOS-style window (three dots + bar)
function MacOSThemeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <circle cx="6" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Minimal SVG icon representing macOS Tahoe style (rounded window + floating pill bar)
function MacOSTahoeThemeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="15" rx="4" />
      <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="6" r="1" fill="currentColor" stroke="none" />
      <rect
        x="5"
        y="20"
        width="14"
        height="2.5"
        rx="1.25"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function ThemeVariantSwitcher() {
  const {
    colorScheme,
    applyMacOSTheme,
    applyMacOSTahoeTheme,
    applyDefaultTheme,
  } = useTheme();
  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Theme Style</SettingsSectionHeading>
      <div role="radiogroup" className="grid grid-cols-3 gap-5">
        <SwitcherButton
          onClick={applyDefaultTheme}
          title="Default"
          checked={colorScheme === 'default'}
        >
          <DefaultThemeIcon />
        </SwitcherButton>
        <SwitcherButton
          onClick={applyMacOSTheme}
          title="macOS"
          checked={colorScheme === 'macos'}
        >
          <MacOSThemeIcon />
        </SwitcherButton>
        <SwitcherButton
          onClick={applyMacOSTahoeTheme}
          title="Tahoe"
          checked={colorScheme === 'macos-tahoe'}
        >
          <MacOSTahoeThemeIcon />
        </SwitcherButton>
      </div>
    </div>
  );
}

// ─── DirectionSwitcher ─────────────────────────────────────────

function DirectionSwitcher() {
  const { direction, setDirection } = useTheme();
  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Direction</SettingsSectionHeading>
      <div role="radiogroup" className="grid grid-cols-2 gap-5">
        <SwitcherButton
          onClick={() => setDirection('ltr')}
          title="LTR"
          checked={direction === 'ltr'}
        >
          <LeftAlign />
        </SwitcherButton>
        <SwitcherButton
          onClick={() => setDirection('rtl')}
          title="RTL"
          checked={direction === 'rtl'}
        >
          <RightAlign />
        </SwitcherButton>
      </div>
    </div>
  );
}

// ─── LayoutSwitcher ────────────────────────────────────────────

const LayoutIcons: Record<string, JSX.Element> = {
  [LAYOUT_OPTIONS.HORIZONTAL]: <MinimalLayoutIcon />,
  [LAYOUT_OPTIONS.ADMIN]: <ClassicLayoutIcon />,
  [LAYOUT_OPTIONS.CLEAN]: <MinimalLayoutIcon />,
  [LAYOUT_OPTIONS.MACOS]: <MacOSThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_TAHOE]: <MacOSThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_TAHOE_DOCK]: <MacOSTahoeThemeIcon />,
};

function LayoutSwitcher() {
  const { layout, setLayout, colorScheme } = useTheme();

  // Hide layout switcher if macOS Sonoma theme is active, since layout is forced
  if (colorScheme === 'macos') return null;

  // For Tahoe, show Sidebar vs Dock layout options
  if (colorScheme === 'macos-tahoe') {
    return (
      <div className="px-6 pt-8">
        <SettingsSectionHeading>Layout</SettingsSectionHeading>
        <div role="radiogroup" className="grid grid-cols-2 gap-5">
          <SwitcherButton
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS_TAHOE)}
            title="Sidebar"
            checked={layout === LAYOUT_OPTIONS.MACOS_TAHOE}
          >
            <MacOSThemeIcon />
          </SwitcherButton>
          <SwitcherButton
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS_TAHOE_DOCK)}
            title="Dock"
            checked={layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK}
          >
            <MacOSTahoeThemeIcon />
          </SwitcherButton>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Layout</SettingsSectionHeading>
      <div role="radiogroup" className="grid grid-cols-2 gap-5">
        {layoutOptions.map((option) => (
          <SwitcherButton
            key={option.label}
            onClick={() => setLayout(option.value as LAYOUT_OPTIONS)}
            title={option.label}
            checked={layout === option.value}
          >
            {LayoutIcons[option.value]}
          </SwitcherButton>
        ))}
      </div>
    </div>
  );
}

// ─── ColorSwitcher ─────────────────────────────────────────────

function ColorSwitcher({ type }: { type: ColorType }) {
  const [colorValue, setColorValue] = useState('');
  const { presetKey, setterKey, defaultValue, label } = COLOR_CONFIG[type];

  // Dynamic Zustand selectors — only subscribes to the 2 needed slices
  const color = useTheme((s) => s[presetKey] as IThemeItem);
  const setColor = useTheme((s) => s[setterKey] as (value: IThemeItem) => void);

  const selectOptions = colorPreset.map((item) => ({
    name: item.label,
    value: item.value,
  }));

  const matchedPreset = colorPreset.find((item) => item.value === color?.value);

  const handleSelectChange = (option: SelectOption) => {
    // Map SelectOption back to IThemeItem (preserves label + value)
    const preset = colorPreset.find((item) => item.value === option.value);
    if (preset) setColor(preset);
  };

  const handleCustomColor = () => {
    setColor({
      label: colorValue ? `Custom ${type}` : defaultValue.label,
      value: colorValue || defaultValue.value,
    });
  };

  return (
    <div className="px-6 pt-8">
      <div className="flex items-start flex-col h-8 justify-between mb-4">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </span>
        <span className="text-current text-xs font-medium rounded-md">
          Currently:{' '}
          <span className="text-brand">
            {color?.label}{' '}
            <span
              style={{ backgroundColor: color?.value }}
              className="min-h-4 min-w-4 h-4 w-4 inline-block rounded-full ml-1 border border-gray-200 dark:border-gray-700"
            />
          </span>
        </span>
      </div>
      <div className="flex flex-col w-full gap-2">
        <Select
          options={selectOptions}
          selectedOption={{
            name: color?.label?.includes('Custom')
              ? color.label
              : matchedPreset?.label || '',
            value: matchedPreset?.value || '',
          }}
          onChange={handleSelectChange}
        />
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter color code"
            type="text"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
          />
          <Button
            size="small"
            className="w-35 h-12 mt-1"
            variant="ghost"
            onClick={handleCustomColor}
          >
            {colorValue ? 'Set Color' : 'Set Default'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── RestoreDefaults ───────────────────────────────────────────

export function RestoreDefaults() {
  const { restoreDefaultColors } = useTheme();
  return (
    <div className="flex justify-center items-center p-4 absolute bg-white dark:bg-gray-800 bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
      <Button fullWidth size="small" onClick={restoreDefaultColors}>
        Restore Theme
      </Button>
    </div>
  );
}

// ─── TahoeAccentPicker ─────────────────────────────────────────

function TahoeAccentPicker() {
  const { primaryPreset, accentPreset } = useTheme();

  const handleAccentSelect = (bundleId: string) => {
    const bundle = TAHOE_ACCENT_BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    const presets = buildTahoePresets(bundle);
    useTheme.setState(presets);
  };

  // Detect active accent by comparing primary + accent color values
  const pv = primaryPreset?.value?.toLowerCase();
  const av = accentPreset?.value?.toLowerCase();
  const activeId = TAHOE_ACCENT_BUNDLES.find(
    (b) =>
      (b.primaryLight.toLowerCase() === pv ||
        b.primaryDark.toLowerCase() === pv) &&
      (b.accentLight.toLowerCase() === av || b.accentDark.toLowerCase() === av)
  )?.id;

  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Accent Color</SettingsSectionHeading>
      <div className="grid grid-cols-4 gap-3">
        {TAHOE_ACCENT_BUNDLES.map((bundle) => {
          const isActive = activeId === bundle.id;
          const isGlass = bundle.id === 'glass-neutral';
          return (
            <button
              key={bundle.id}
              type="button"
              aria-label={`${bundle.label} accent`}
              onClick={() => handleAccentSelect(bundle.id)}
              className={cn(
                'group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all cursor-pointer',
                isActive
                  ? 'bg-white/10 ring-1 ring-white/20'
                  : 'hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'h-7 w-7 rounded-full border-2 transition-transform',
                  isActive
                    ? 'border-white scale-110 shadow-lg'
                    : 'border-transparent group-hover:scale-105'
                )}
                style={{
                  background: isGlass
                    ? 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 50%, #FF9500 100%)'
                    : bundle.swatch,
                }}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-(--macos-tahoe-text-muted) group-hover:text-(--macos-tahoe-text)'
                )}
              >
                {bundle.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── SonomaAccentPicker ────────────────────────────────────────

function SonomaAccentPicker() {
  const { primaryPreset, accentPreset } = useTheme();

  const handleAccentSelect = (bundleId: string) => {
    const bundle = SONOMA_ACCENT_BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    const presets = buildSonomaPresets(bundle);
    useTheme.setState(presets);
  };

  const pv = primaryPreset?.value?.toLowerCase();
  const av = accentPreset?.value?.toLowerCase();
  const activeId = SONOMA_ACCENT_BUNDLES.find(
    (b) =>
      (b.primaryLight.toLowerCase() === pv ||
        b.primaryDark.toLowerCase() === pv) &&
      (b.accentLight.toLowerCase() === av || b.accentDark.toLowerCase() === av)
  )?.id;

  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Accent Color</SettingsSectionHeading>
      <div className="grid grid-cols-4 gap-3">
        {SONOMA_ACCENT_BUNDLES.map((bundle) => {
          const isActive = activeId === bundle.id;
          return (
            <button
              key={bundle.id}
              type="button"
              aria-label={`${bundle.label} accent`}
              onClick={() => handleAccentSelect(bundle.id)}
              className={cn(
                'group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all cursor-pointer',
                isActive
                  ? 'bg-white/10 ring-1 ring-white/20'
                  : 'hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'h-7 w-7 rounded-full border-2 transition-transform',
                  isActive
                    ? 'border-white scale-110 shadow-lg'
                    : 'border-transparent group-hover:scale-105'
                )}
                style={{ background: bundle.swatch }}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-200'
                )}
              >
                {bundle.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── SettingsDrawer ────────────────────────────────────────────

export function SettingsDrawer() {
  const { isSettingsOpen, setIsSettingsOpen, layout, colorScheme } = useTheme();
  const isTahoe =
    colorScheme === 'macos-tahoe' ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;
  const isSonoma = colorScheme === 'macos' || layout === LAYOUT_OPTIONS.MACOS;
  const isMacOS = isTahoe || isSonoma;

  const settingsContent = (
    <div className="h-full pb-18">
      <ThemeSwitcher />
      <ThemeVariantSwitcher />
      <DirectionSwitcher />
      <LayoutSwitcher />
      {isTahoe ? (
        <TahoeAccentPicker />
      ) : isSonoma ? (
        <SonomaAccentPicker />
      ) : (
        COLOR_TYPES.map((type) => <ColorSwitcher key={type} type={type} />)
      )}
      <RestoreDefaults />
    </div>
  );

  if (isTahoe) {
    return (
      <DrawerContainer
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        position="right"
        backdrop={false}
        backdropClassName="backdrop-blur-[2px] bg-transparent"
      >
        <div className="pointer-events-none relative z-10 flex h-full w-full items-stretch justify-end p-3 min-[500px]:p-4">
          <aside
            data-tucu="macos-tahoe-sidebar"
            className="pointer-events-auto flex h-full w-80 max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[30px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]"
          >
            <div className="shrink-0 px-5 pb-3 pt-5 flex items-center justify-between gap-3">
              <span className="text-[16px] font-semibold text-(--macos-tahoe-text) dark:text-white/90">
                Settings
              </span>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Close settings"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
              >
                <Close className="h-3.5 w-3.5" width={14} height={14} />
              </button>
            </div>
            <Scrollbar
              style={{ height: 'calc(100vh - 80px)' }}
              className="h-full pb-5"
            >
              {settingsContent}
            </Scrollbar>
          </aside>
        </div>
      </DrawerContainer>
    );
  }

  return (
    <Drawer
      type="sidebar"
      position="right"
      isOpen={isSettingsOpen}
      setIsOpen={setIsSettingsOpen}
      title="Settings"
      className={cn('relative', isMacOS && 'min-[500px]:w-80!')}
    >
      {settingsContent}
    </Drawer>
  );
}

export default SettingsDrawer;
