import { JSX } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { LAYOUT_OPTIONS, layoutOptions } from '../../config';
import {
  MinimalLayoutIcon,
  ClassicLayoutIcon,
} from '../../../components/icons';
import { LucideIcons } from '../../../..';
import { SettingsSectionHeading } from './settings-section-heading';
import { SwitcherButton } from './switcher-button';
import { MacOSThemeIcon, MacOSTahoeThemeIcon } from './theme-icons';

export const LayoutIcons: Record<string, JSX.Element> = {
  [LAYOUT_OPTIONS.HORIZONTAL]: <MinimalLayoutIcon />,
  [LAYOUT_OPTIONS.ADMIN]: <ClassicLayoutIcon />,
  [LAYOUT_OPTIONS.CLEAN]: <LucideIcons.Square className="w-[34px] h-[34px]" />,
  [LAYOUT_OPTIONS.MACOS]: <MacOSThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_CLEAN]: <LucideIcons.Square />,
  [LAYOUT_OPTIONS.MACOS_NAVBAR]: <MinimalLayoutIcon />,
  [LAYOUT_OPTIONS.MACOS_TAHOE]: <MacOSThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_TAHOE_DOCK]: <MacOSTahoeThemeIcon />,
  [LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN]: <LucideIcons.Square />,
  [LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR]: <MinimalLayoutIcon />,
};

export function LayoutSwitcher() {
  const { layout, setLayout, colorScheme } = useTheme();

  if (colorScheme === 'macos') {
    return (
      <div className="px-6 pt-8">
        <SettingsSectionHeading>Layout</SettingsSectionHeading>
        <div role="radiogroup" className="grid grid-cols-3 gap-5">
          <SwitcherButton
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS)}
            title="Sidebar"
            checked={layout === LAYOUT_OPTIONS.MACOS}
          >
            <MacOSThemeIcon />
          </SwitcherButton>
          <SwitcherButton
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS_NAVBAR)}
            title="Navbar"
            checked={layout === LAYOUT_OPTIONS.MACOS_NAVBAR}
          >
            <MinimalLayoutIcon />
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

  if (colorScheme === 'macos-tahoe') {
    return (
      <div className="px-6 pt-8">
        <SettingsSectionHeading>Layout</SettingsSectionHeading>
        <div role="radiogroup" className="grid grid-cols-4 gap-5">
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
            onClick={() => setLayout(LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR)}
            title="Navbar"
            checked={layout === LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR}
          >
            <MinimalLayoutIcon />
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

export default LayoutSwitcher;
