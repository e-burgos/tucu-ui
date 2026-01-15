import React, { JSX, useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Button } from '../../../components/buttons/button';
import { useTheme } from '../../hooks/use-theme';
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

// Component: SwitcherButton
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
          'flex h-[70px] items-center justify-center rounded-lg text-center text-sm font-medium uppercase tracking-wide transition-all',
          checked
            ? 'shadow-large bg-brand/50'
            : 'bg-white dark:bg-gray-600 text-gray-500 group-hover:bg-brand/20 dark:text-gray-400'
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'mt-[12px] block text-center text-sm transition-all',
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

// Component: ThemeSwitcher
function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  return (
    <div className="px-[24px] pt-[32px]">
      <h4 className="mb-[16px] text-sm font-medium text-gray-900 dark:text-white">
        Mode
      </h4>
      <RadioGroup
        value={mode}
        onChange={setMode}
        className="grid grid-cols-2 gap-[20px]"
      >
        <Radio value="light">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setMode('light')}
              title={'Light'}
              checked={checked}
            >
              <Sun />
            </SwitcherButton>
          )}
        </Radio>
        <Radio value="dark">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setMode('dark')}
              title={'Dark'}
              checked={checked}
            >
              <Moon />
            </SwitcherButton>
          )}
        </Radio>
      </RadioGroup>
    </div>
  );
}

// Component: DirectionSwitcher
function DirectionSwitcher() {
  const { direction, setDirection } = useTheme();
  return (
    <div className="px-[24px] pt-[32px]">
      <h4 className="mb-[16px] text-sm font-medium text-gray-900 dark:text-white">
        Direction
      </h4>
      <RadioGroup
        value={direction}
        onChange={setDirection}
        className="grid grid-cols-2 gap-[20px]"
      >
        <Radio value="ltr">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setDirection('ltr')}
              title={'LTR'}
              checked={checked}
            >
              <LeftAlign />
            </SwitcherButton>
          )}
        </Radio>
        <Radio value="rtl">
          {({ checked }) => (
            <SwitcherButton
              onClick={() => setDirection('rtl')}
              title={'RTL'}
              checked={checked}
            >
              <RightAlign />
            </SwitcherButton>
          )}
        </Radio>
      </RadioGroup>
    </div>
  );
}

// Component: LayoutSwitcher
const LayoutIcons: Record<string, JSX.Element> = {
  [LAYOUT_OPTIONS.HORIZONTAL]: <MinimalLayoutIcon />,
  [LAYOUT_OPTIONS.ADMIN]: <ClassicLayoutIcon />,
  [LAYOUT_OPTIONS.CLEAN]: <MinimalLayoutIcon />,
};

function LayoutSwitcher() {
  const { layout, setLayout } = useTheme();
  return (
    <div className="px-[24px] pt-[32px]">
      <h4 className="mb-[16px] text-sm font-medium text-gray-900 dark:text-white">
        Layout
      </h4>
      <RadioGroup
        value={layout}
        onChange={setLayout}
        className="grid grid-cols-2 gap-5 "
      >
        {layoutOptions.map((option) => (
          <Radio key={option.label} value={option.value}>
            {({ checked }) => (
              <SwitcherButton
                onClick={() => setLayout(option.value as LAYOUT_OPTIONS)}
                title={option.label}
                checked={checked}
              >
                {LayoutIcons[option.value]}
              </SwitcherButton>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}

// Component: ColorSwitcher
function ColorSwitcher({
  type,
}: {
  type:
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
}) {
  const [colorValue, setColorValue] = useState<string>('');
  const {
    primaryPreset,
    darkPrimaryPreset,
    secondaryPreset,
    darkSecondaryPreset,
    accentPreset,
    darkAccentPreset,
    mutedPreset,
    darkMutedPreset,
    darkBgPreset,
    lightBgPreset,
    lightDarkPreset,
    darkLightDarkPreset,
    setPrimaryPreset,
    setDarkPrimaryPreset,
    setSecondaryPreset,
    setDarkSecondaryPreset,
    setAccentPreset,
    setDarkAccentPreset,
    setMutedPreset,
    setDarkMutedPreset,
    setDarkBgPreset,
    setLightBgPreset,
    setLightDarkPreset,
    setDarkLightDarkPreset,
  } = useTheme();
  const color =
    type === 'primary'
      ? primaryPreset
      : type === 'darkPrimary'
      ? darkPrimaryPreset
      : type === 'secondary'
      ? secondaryPreset
      : type === 'darkSecondary'
      ? darkSecondaryPreset
      : type === 'accent'
      ? accentPreset
      : type === 'darkAccent'
      ? darkAccentPreset
      : type === 'muted'
      ? mutedPreset
      : type === 'darkMuted'
      ? darkMutedPreset
      : type === 'darkBg'
      ? darkBgPreset
      : type === 'lightBg'
      ? lightBgPreset
      : type === 'lightDark'
      ? lightDarkPreset
      : type === 'darkLightDark'
      ? darkLightDarkPreset
      : undefined;

  const setColor =
    type === 'primary'
      ? setPrimaryPreset
      : type === 'darkPrimary'
      ? setDarkPrimaryPreset
      : type === 'secondary'
      ? setSecondaryPreset
      : type === 'darkSecondary'
      ? setDarkSecondaryPreset
      : type === 'accent'
      ? setAccentPreset
      : type === 'darkAccent'
      ? setDarkAccentPreset
      : type === 'muted'
      ? setMutedPreset
      : type === 'darkMuted'
      ? setDarkMutedPreset
      : type === 'darkBg'
      ? setDarkBgPreset
      : type === 'lightBg'
      ? setLightBgPreset
      : type === 'lightDark'
      ? setLightDarkPreset
      : type === 'darkLightDark'
      ? setDarkLightDarkPreset
      : undefined;

  const defaultColor =
    type === 'primary'
      ? defaultPrimaryPreset
      : type === 'darkPrimary'
      ? defaultDarkPrimaryPreset
      : type === 'secondary'
      ? defaultSecondaryPreset
      : type === 'darkSecondary'
      ? defaultDarkSecondaryPreset
      : type === 'accent'
      ? defaultAccentPreset
      : type === 'darkAccent'
      ? defaultDarkAccentPreset
      : type === 'muted'
      ? defaultMutedPreset
      : type === 'darkMuted'
      ? defaultDarkMutedPreset
      : type === 'darkBg'
      ? defaultDarkBgPreset
      : type === 'lightBg'
      ? defaultLightBgPreset
      : type === 'lightDark'
      ? defaultLightDarkPreset
      : type === 'darkLightDark'
      ? defaultDarkLightDarkPreset
      : undefined;
  return (
    <div className="px-6 pt-8">
      <div className="flex items-start flex-col h-[32px] justify-between mb-[16px]">
        <span className=" text-sm font-medium text-gray-900 dark:text-white">
          {type === 'primary'
            ? 'Primary Color'
            : type === 'darkPrimary'
            ? 'Dark Primary Color'
            : type === 'secondary'
            ? 'Secondary Color'
            : type === 'darkSecondary'
            ? 'Dark Secondary Color'
            : type === 'accent'
            ? 'Accent Color'
            : type === 'darkAccent'
            ? 'Dark Accent Color'
            : type === 'muted'
            ? 'Muted Color'
            : type === 'darkMuted'
            ? 'Dark Muted Color'
            : type === 'darkBg'
            ? 'Dark Background Color'
            : type === 'lightBg'
            ? 'Light Background Color'
            : type === 'lightDark'
            ? 'Light Dark Color'
            : type === 'darkLightDark'
            ? 'Dark Light Dark Color'
            : ''}
        </span>
        <span className="text-current text-xs font-medium  rounded-md">
          Currently:{' '}
          <span className="text-brand">
            {color?.label}{' '}
            <span
              style={{ backgroundColor: color?.value }}
              className="min-h-[16px] min-w-[16px] h-[16px] w-[16px] inline-block rounded-full ml-[4px] border border-gray-200 dark:border-gray-700"
            />
          </span>
        </span>
      </div>
      <div className="flex  flex-col w-full gap-[8px]">
        <Select
          options={colorPreset.map((item) => ({
            name: item.label,
            value: item.value,
          }))}
          selectedOption={{
            name: color?.label?.includes('Custom')
              ? color?.label
              : colorPreset.find((item) => item.value === color?.value)
                  ?.label || '',
            value:
              colorPreset.find((item) => item.value === color?.value)?.value ||
              '',
          }}
          onChange={(value: SelectOption) =>
            setColor?.(value as unknown as IThemeItem)
          }
        />
        <div className="flex items-center gap-[8px]">
          <Input
            placeholder="Enter color code"
            type="text"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
          />
          <Button
            size="small"
            className="w-[140px] h-[48px] mt-[4px]"
            variant="ghost"
            onClick={() =>
              setColor?.({
                label: colorValue ? `Custom ${type}` : defaultColor?.label,
                value: colorValue || defaultColor?.value,
              } as IThemeItem)
            }
          >
            {colorValue ? 'Set Color' : 'Set Default'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function RestoreDefaults() {
  const { restoreDefaultColors } = useTheme();
  return (
    <div className="flex justify-center items-center p-[16px] absolute bg-white dark:bg-gray-800 bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
      <Button fullWidth size="small" onClick={restoreDefaultColors}>
        Restore Theme
      </Button>
    </div>
  );
}

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
      <div className="h-full pb-[64px]">
        <ThemeSwitcher />
        <DirectionSwitcher />
        <LayoutSwitcher />
        <ColorSwitcher type="primary" />
        <ColorSwitcher type="darkPrimary" />
        <ColorSwitcher type="secondary" />
        <ColorSwitcher type="darkSecondary" />
        <ColorSwitcher type="accent" />
        <ColorSwitcher type="darkAccent" />
        <ColorSwitcher type="muted" />
        <ColorSwitcher type="darkMuted" />
        <ColorSwitcher type="darkBg" />
        <ColorSwitcher type="lightBg" />
        <ColorSwitcher type="lightDark" />
        <ColorSwitcher type="darkLightDark" />
        <RestoreDefaults />
      </div>
    </Drawer>
  );
}

export default SettingsDrawer;
