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
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE;

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

function ThemeVariantSwitcher() {
  const { colorScheme, applyMacOSTheme, applyDefaultTheme } = useTheme();
  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Theme Style</SettingsSectionHeading>
      <div role="radiogroup" className="grid grid-cols-2 gap-5">
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
};

function LayoutSwitcher() {
  const { layout, setLayout } = useTheme();
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

// ─── SettingsDrawer ────────────────────────────────────────────

export function SettingsDrawer() {
  const { isSettingsOpen, setIsSettingsOpen } = useTheme();
  return (
    <Drawer
      type="sidebar"
      position="right"
      isOpen={isSettingsOpen}
      setIsOpen={setIsSettingsOpen}
      title="Settings"
      className="relative"
    >
      <div className="h-full pb-16">
        <ThemeSwitcher />
        <ThemeVariantSwitcher />
        <DirectionSwitcher />
        <LayoutSwitcher />
        {COLOR_TYPES.map((type) => (
          <ColorSwitcher key={type} type={type} />
        ))}
        <RestoreDefaults />
      </div>
    </Drawer>
  );
}

export default SettingsDrawer;
