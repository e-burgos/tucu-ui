import { Fragment } from 'react';
import {
  DialogPanel,
  Radio,
  RadioGroup,
  TransitionChild,
} from '@headlessui/react';
import { useTheme } from '../../use-theme';
import cn from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
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
import { Drawer } from '../../../components/drawer';

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
    <div onClick={onClick} className="group cursor-pointer">
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
    </div>
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
function ColorSwitcher() {
  const { preset, setPreset } = useTheme();
  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Color
      </h4>
      <RadioGroup
        value={preset}
        onChange={setPreset}
        className="grid grid-cols-3 gap-5 "
      >
        {ColorPreset.map((item, index) => (
          <Radio value={item} key={index}>
            {({ checked }) => (
              <SwitcherButton
                onClick={() => setPreset(item)}
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
      className="max-sm:w-full !w-[380px]"
    >
      <div>
        {!settingActions?.disabledMode && <ThemeSwitcher />}
        {!settingActions?.disabledDirection && <DirectionSwitcher />}
        {!settingActions?.disabledLayout && <LayoutSwitcher />}
        {!settingActions?.disabledPreset && <ColorSwitcher />}
      </div>
    </Drawer>
  );
}

export default SettingsDrawer;
