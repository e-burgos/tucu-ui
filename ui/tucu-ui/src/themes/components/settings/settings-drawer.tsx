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
import {
  Circle,
  Waves,
  Image,
  Smartphone,
  Sparkles,
  Layers,
  Palette,
  Monitor,
  Square,
  Ban,
} from 'lucide-react';
import { LucideIcons } from '../../../..';

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
  | 'darkLightDark'
  | 'success'
  | 'darkSuccess'
  | 'warning'
  | 'darkWarning'
  | 'error'
  | 'darkError'
  | 'info'
  | 'darkInfo'
  | 'fg'
  | 'darkFg'
  | 'border'
  | 'darkBorder';

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
  success: {
    presetKey: 'successPreset',
    setterKey: 'setSuccessPreset',
    defaultValue: defaultSuccessPreset,
    label: 'Success Color',
  },
  darkSuccess: {
    presetKey: 'darkSuccessPreset',
    setterKey: 'setDarkSuccessPreset',
    defaultValue: defaultDarkSuccessPreset,
    label: 'Dark Success Color',
  },
  warning: {
    presetKey: 'warningPreset',
    setterKey: 'setWarningPreset',
    defaultValue: defaultWarningPreset,
    label: 'Warning Color',
  },
  darkWarning: {
    presetKey: 'darkWarningPreset',
    setterKey: 'setDarkWarningPreset',
    defaultValue: defaultDarkWarningPreset,
    label: 'Dark Warning Color',
  },
  error: {
    presetKey: 'errorPreset',
    setterKey: 'setErrorPreset',
    defaultValue: defaultErrorPreset,
    label: 'Error Color',
  },
  darkError: {
    presetKey: 'darkErrorPreset',
    setterKey: 'setDarkErrorPreset',
    defaultValue: defaultDarkErrorPreset,
    label: 'Dark Error Color',
  },
  info: {
    presetKey: 'infoPreset',
    setterKey: 'setInfoPreset',
    defaultValue: defaultInfoPreset,
    label: 'Info Color',
  },
  darkInfo: {
    presetKey: 'darkInfoPreset',
    setterKey: 'setDarkInfoPreset',
    defaultValue: defaultDarkInfoPreset,
    label: 'Dark Info Color',
  },
  fg: {
    presetKey: 'fgPreset',
    setterKey: 'setFgPreset',
    defaultValue: defaultFgPreset,
    label: 'Primary',
  },
  darkFg: {
    presetKey: 'darkFgPreset',
    setterKey: 'setDarkFgPreset',
    defaultValue: defaultDarkFgPreset,
    label: 'Primary',
  },
  border: {
    presetKey: 'borderPreset',
    setterKey: 'setBorderPreset',
    defaultValue: defaultBorderPreset,
    label: 'Border Color',
  },
  darkBorder: {
    presetKey: 'darkBorderPreset',
    setterKey: 'setDarkBorderPreset',
    defaultValue: defaultDarkBorderPreset,
    label: 'Dark Border Color',
  },
};

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
  [LAYOUT_OPTIONS.CLEAN]: <LucideIcons.Square className="w-[34px] h-[34px]" />,
  [LAYOUT_OPTIONS.MACOS]: <MacOSThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_CLEAN]: <LucideIcons.Square />,
  [LAYOUT_OPTIONS.MACOS_TAHOE]: <MacOSThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_TAHOE_DOCK]: <MacOSTahoeThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN]: <LucideIcons.Square />,
};

function LayoutSwitcher() {
  const { layout, setLayout, colorScheme } = useTheme();

  // Hide layout switcher if macOS Sonoma theme is active, since layout is forced
  if (colorScheme === 'macos') {
    return (
      <div className="px-6 pt-8">
        <SettingsSectionHeading>Layout</SettingsSectionHeading>
        <div role="radiogroup" className="grid grid-cols-2 gap-5">
          <SwitcherButton
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS)}
            title="macOS"
            checked={layout === LAYOUT_OPTIONS.MACOS}
          >
            <MacOSThemeIcon />
          </SwitcherButton>
          <SwitcherButton
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS_CLEAN)}
            title="Clean"
            checked={layout === LAYOUT_OPTIONS.MACOS_CLEAN}
          >
            {LayoutIcons[LAYOUT_OPTIONS.MACOS_CLEAN]}
          </SwitcherButton>
        </div>
      </div>
    );
  }

  // For Tahoe, show Sidebar vs Dock vs Clean layout options
  if (colorScheme === 'macos-tahoe') {
    return (
      <div className="px-6 pt-8">
        <SettingsSectionHeading>Layout</SettingsSectionHeading>
        <div role="radiogroup" className="grid grid-cols-3 gap-5">
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
          <SwitcherButton
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN)}
            title="Clean"
            checked={layout === LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN}
          >
            {LayoutIcons[LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN]}
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

// ─── Color Groups for Visual Picker ───────────────────────────

interface ColorGroup {
  title: string;
  items: { light: ColorType; dark: ColorType }[];
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    title: 'Brand',
    items: [
      { light: 'primary', dark: 'darkPrimary' },
      { light: 'accent', dark: 'darkAccent' },
    ],
  },
  {
    title: 'Surfaces',
    items: [
      { light: 'secondary', dark: 'darkSecondary' },
      { light: 'lightBg', dark: 'darkBg' },
      { light: 'lightDark', dark: 'darkLightDark' },
    ],
  },
  {
    title: 'Text',
    items: [
      { light: 'muted', dark: 'darkMuted' },
      { light: 'fg', dark: 'darkFg' },
      { light: 'border', dark: 'darkBorder' },
    ],
  },
  {
    title: 'Status',
    items: [
      { light: 'success', dark: 'darkSuccess' },
      { light: 'warning', dark: 'darkWarning' },
      { light: 'error', dark: 'darkError' },
      { light: 'info', dark: 'darkInfo' },
    ],
  },
];

// ─── ColorSwatchModal ──────────────────────────────────────────

function ColorSwatchModal({
  type,
  isOpen,
  onClose,
}: {
  type: ColorType;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [customValue, setCustomValue] = useState('');
  const [opacity, setOpacity] = useState(100);
  const { presetKey, setterKey, defaultValue, label } = COLOR_CONFIG[type];
  const color = useTheme((s) => s[presetKey] as IThemeItem);
  const setColor = useTheme((s) => s[setterKey] as (value: IThemeItem) => void);
  const mode = useTheme((s) => s.mode);
  const setMode = useTheme((s) => s.setMode);

  // Parse opacity from current color (supports 8-digit hex)
  React.useEffect(() => {
    const val = color?.value || '';
    if (val.length === 9 && val.startsWith('#')) {
      const alpha = parseInt(val.slice(7, 9), 16);
      setOpacity(Math.round((alpha / 255) * 100));
    } else {
      setOpacity(100);
    }
  }, [color?.value]);

  const applyOpacity = (hex: string, opacityPercent: number): string => {
    const base = hex.slice(0, 7);
    if (opacityPercent >= 100) return base;
    const alpha = Math.round((opacityPercent / 100) * 255)
      .toString(16)
      .padStart(2, '0');
    return `${base}${alpha}`;
  };

  const handlePresetClick = (preset: IThemeItem) => {
    const val = applyOpacity(preset.value, opacity);
    setColor({ label: preset.label, value: val });
  };

  const handleNativeColor = (hex: string) => {
    const val = applyOpacity(hex, opacity);
    setCustomValue(val);
    setColor({ label: `Custom`, value: val });
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    const base = (color?.value || '#000000').slice(0, 7);
    const val = applyOpacity(base, newOpacity);
    setColor({ label: color?.label || 'Custom', value: val });
  };

  const handleCustomSubmit = () => {
    if (customValue) {
      setColor({ label: `Custom`, value: customValue });
    } else {
      setColor(defaultValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xs rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-border">
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: color?.value }}
              className="h-5 w-5 rounded-full border border-border"
            />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Close className="h-3 w-3" width={12} height={12} />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="px-4 py-2 border-b border-border dark:border-border">
          <div className="flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5">
            <button
              type="button"
              onClick={() => setMode('light')}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                mode === 'light'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <Sun className="h-3 w-3" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setMode('dark')}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                mode === 'dark'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <Moon className="h-3 w-3" />
              Dark
            </button>
          </div>
        </div>

        {/* Preset Swatches */}
        <div className="px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Presets
          </span>
          <div className="grid grid-cols-7 gap-2 mt-2">
            {colorPreset.map((preset) => {
              const isActive = color?.value === preset.value;
              return (
                <button
                  key={preset.label}
                  type="button"
                  title={preset.label}
                  onClick={() => handlePresetClick(preset)}
                  className={cn(
                    'h-7 w-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110',
                    isActive
                      ? 'border-gray-900 dark:border-white scale-110 shadow-lg'
                      : 'border-transparent hover:border-border dark:hover:border-gray-500'
                  )}
                  style={{ backgroundColor: preset.value }}
                />
              );
            })}
          </div>
        </div>

        {/* Custom Color */}
        <div className="px-4 py-3 border-t border-border dark:border-border">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Custom Color
          </span>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={(color?.value || '#000000').slice(0, 7)}
              onChange={(e) => handleNativeColor(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded-lg border border-border p-0.5 bg-transparent"
            />
            <Input
              placeholder="#hex"
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="flex-1"
            />
            <Button size="mini" variant="ghost" onClick={handleCustomSubmit}>
              {customValue ? 'Set' : 'Reset'}
            </Button>
          </div>
        </div>

        {/* Opacity */}
        <div className="px-4 py-3 border-t border-border dark:border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Opacity
            </span>
            <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
              {opacity}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
            className="mt-2 w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-600 accent-current"
            style={{ accentColor: (color?.value || '#000000').slice(0, 7) }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── ColorSwitcher (Visual) ────────────────────────────────────

function ColorDot({ type }: { type: ColorType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { presetKey, label } = COLOR_CONFIG[type];
  const color = useTheme((s) => s[presetKey] as IThemeItem);

  // Short friendly label
  const shortLabel = label
    .replace(' Color', '')
    .replace('Dark ', '')
    .replace('Light ', '');

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group flex flex-col items-center gap-1.5 cursor-pointer"
        title={label}
      >
        <span
          style={{ backgroundColor: color?.value }}
          className="h-9 w-9 rounded-full border border-border/40 dark:border-border/40 transition-all group-hover:scale-110 group-hover:border-gray-400 dark:group-hover:border-gray-400 shadow-sm"
        />
        <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center leading-tight max-w-[56px]">
          {shortLabel}
        </span>
      </button>
      <ColorSwatchModal
        type={type}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

// ─── DefaultColorSettings ──────────────────────────────────────

function DefaultColorSettings() {
  const mode = useTheme((s) => s.mode);

  return (
    <>
      {COLOR_GROUPS.map((group) => (
        <div key={group.title} className="px-6 pt-6">
          <SettingsSectionHeading>{group.title}</SettingsSectionHeading>
          <div className="grid grid-cols-4 gap-3">
            {group.items.map((pair) => {
              const type = mode === 'dark' ? pair.dark : pair.light;
              return <ColorDot key={pair.light} type={type} />;
            })}
          </div>
        </div>
      ))}
    </>
  );
}

// ─── RestoreDefaults ───────────────────────────────────────────

export function RestoreDefaults() {
  const { restoreDefaultColors } = useTheme();
  return (
    <div className="flex justify-center items-center p-4 absolute bg-white dark:bg-gray-800 bottom-0 left-0 right-0 border-t border-border">
      <Button fullWidth size="small" onClick={restoreDefaultColors}>
        Restore Theme
      </Button>
    </div>
  );
}

// ─── BackgroundPicker (shared across all themes) ───────────────

const ALL_BACKGROUNDS = [
  { id: 'none', label: 'None', Icon: Ban },
  { id: 'base', label: 'Base', Icon: Circle },
  { id: 'sonoma', label: 'Sonoma', Icon: Square },
  { id: 'radial', label: 'Radial', Icon: Sun },
  { id: 'wave', label: 'Wave', Icon: Waves },
  { id: 'wallpaper', label: 'Wallpaper', Icon: Image },
  { id: 'mobile', label: 'Mobile', Icon: Smartphone },
  { id: 'window', label: 'Window', Icon: Monitor },
  { id: 'aurora', label: 'Aurora', Icon: Sparkles },
  { id: 'depth', label: 'Depth', Icon: Layers },
  { id: 'demo', label: 'Demo', Icon: Palette },
] as const;

function BackgroundPicker() {
  const { backgroundVariant, setBackgroundVariant } = useTheme();

  return (
    <div className="px-6 pt-8">
      <SettingsSectionHeading>Background</SettingsSectionHeading>
      <div className="grid grid-cols-4 gap-3">
        {ALL_BACKGROUNDS.map((bg) => {
          const isActive = backgroundVariant === bg.id;
          return (
            <button
              key={bg.id}
              type="button"
              aria-label={`${bg.label} background`}
              onClick={() => setBackgroundVariant(bg.id)}
              className={cn(
                'group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all cursor-pointer',
                isActive
                  ? 'bg-black/8 ring-1 ring-black/15 dark:bg-white/10 dark:ring-white/20'
                  : 'text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-7 items-center bg-brand/30 justify-center rounded-full border-2 transition-transform',
                  isActive
                    ? 'border-gray-900 dark:border-white scale-110 shadow-lg'
                    : 'border-transparent group-hover:scale-105'
                )}
              >
                <bg.Icon className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                )}
              >
                {bg.label}
              </span>
            </button>
          );
        })}
      </div>
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
                'group flex text-gray-900 dark:text-white flex-col items-center gap-1.5 rounded-xl p-2 transition-all cursor-pointer',
                isActive
                  ? 'bg-black/8 ring-1 ring-black/15 dark:bg-white/10 dark:ring-white/20'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'h-7 w-7 rounded-full border-2 transition-transform',
                  isActive
                    ? 'border-gray-900 dark:border-white scale-110 shadow-lg'
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
                    ? 'text-gray-900 dark:text-white'
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
        <>
          <TahoeAccentPicker />
          <DefaultColorSettings />
          <BackgroundPicker />
        </>
      ) : isSonoma ? (
        <>
          <SonomaAccentPicker />
          <DefaultColorSettings />
          <BackgroundPicker />
        </>
      ) : (
        <>
          <DefaultColorSettings />
          <BackgroundPicker />
        </>
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
            className="pointer-events-auto flex h-full w-80 max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[30px] border border-border bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]"
          >
            <div className="shrink-0 px-5 pb-3 pt-5 flex items-center justify-between gap-3">
              <span className="text-[16px] font-semibold text-(--macos-tahoe-text) dark:text-white/90">
                Settings
              </span>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Close settings"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
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
      className={cn('relative', isMacOS && 'min-[500px]:w-[300px]!')}
    >
      {settingsContent}
    </Drawer>
  );
}

export default SettingsDrawer;
