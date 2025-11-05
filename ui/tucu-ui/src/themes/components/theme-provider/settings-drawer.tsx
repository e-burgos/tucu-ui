import React from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Button } from '../../../components/buttons/button';
import { useTheme } from '../../use-theme';
import cn from 'classnames';
import { ColorPreset, LAYOUT_OPTIONS, LayoutOptions } from '../../config';
import {
  ClassicLayoutIcon,
  MinimalLayoutIcon,
  RetroLayoutIcon,
  LeftAlign,
  RightAlign,
  Sun,
  Moon,
} from '../../../components/icons';
import { Drawer } from '../../../components/dialog';
import { Scrollbar } from '../../../components/common/scrollbar';

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
            ? 'bg-white shadow-large dark:bg-gray-600'
            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700'
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

// Component: ThemeSwitcher
function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Mode
      </h4>
      <RadioGroup
        value={mode}
        onChange={setMode}
        className="grid grid-cols-2 gap-5"
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
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Direction
      </h4>
      <RadioGroup
        value={direction}
        onChange={setDirection}
        className="grid grid-cols-2 gap-5"
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
  [LAYOUT_OPTIONS.MINIMAL]: <MinimalLayoutIcon />,
  [LAYOUT_OPTIONS.CLASSIC]: <ClassicLayoutIcon />,
  [LAYOUT_OPTIONS.NONE]: <RetroLayoutIcon />,
};

function LayoutSwitcher() {
  const { layout, setLayout } = useTheme();
  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Layout
      </h4>
      <RadioGroup
        value={layout}
        onChange={setLayout}
        className="grid grid-cols-2 gap-5 "
      >
        {LayoutOptions.map((option) => (
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
  type: 'preset' | 'secondary' | 'accent' | 'dark' | 'light';
}) {
  const {
    preset,
    secondaryPreset,
    accentPreset,
    darkPreset,
    lightPreset,
    setPreset,
    setSecondaryPreset,
    setAccentPreset,
    setDarkPreset,
    setLightPreset,
  } = useTheme();
  const color =
    type === 'preset'
      ? preset
      : type === 'secondary'
      ? secondaryPreset
      : type === 'accent'
      ? accentPreset
      : type === 'dark'
      ? darkPreset
      : lightPreset;
  const setColor =
    type === 'preset'
      ? setPreset
      : type === 'secondary'
      ? setSecondaryPreset
      : type === 'accent'
      ? setAccentPreset
      : type === 'dark'
      ? setDarkPreset
      : setLightPreset;
  return (
    <div className="px-6 pt-8">
      <div className="flex items-center h-8 justify-between mb-4">
        <span className=" text-sm font-medium text-gray-900 dark:text-white">
          {type === 'preset'
            ? 'Color Preset'
            : type === 'secondary'
            ? 'Secondary Color'
            : type === 'accent'
            ? 'Accent Color'
            : type === 'dark'
            ? 'Dark Color'
            : 'Light Color'}
        </span>
        <span className="text-current text-xs font-medium px-2 py-1 rounded-md">
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
      <Scrollbar
        className="border h-[260px] border-gray-200 dark:border-gray-700 rounded-lg p-4"
        direction="vertical"
      >
        <RadioGroup
          value={color}
          onChange={setColor}
          className="grid grid-cols-3 gap-5 h-full overflow-x-hidden"
        >
          {ColorPreset.map((item, index) => (
            <Radio value={item} key={index}>
              {({ checked }) => (
                <SwitcherButton
                  onClick={() => setColor(item)}
                  title={item.label}
                  checked={checked}
                >
                  <span
                    className="h-8 w-8 rounded-full"
                    style={{ backgroundColor: item.value }}
                  />
                </SwitcherButton>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </Scrollbar>
    </div>
  );
}

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

export function SettingsDrawer() {
  const { isSettingsOpen, settingActions, setIsSettingsOpen } = useTheme();
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
        {!settingActions?.disabledMode && <ThemeSwitcher />}
        {!settingActions?.disabledDirection && <DirectionSwitcher />}
        {!settingActions?.disabledLayout && <LayoutSwitcher />}
        {!settingActions?.disabledPreset && <ColorSwitcher type="preset" />}
        {!settingActions?.disabledSecondary && (
          <ColorSwitcher type="secondary" />
        )}
        {!settingActions?.disabledAccent && <ColorSwitcher type="accent" />}
        {!settingActions?.disabledDark && <ColorSwitcher type="dark" />}
        {!settingActions?.disabledLight && <ColorSwitcher type="light" />}
        <RestoreDefaults />
      </div>
    </Drawer>
  );
}

export default SettingsDrawer;
