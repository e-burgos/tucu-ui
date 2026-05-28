import { useTheme } from '../../hooks/use-theme';
import { SettingsSectionHeading } from './settings-section-heading';
import { SwitcherButton } from './switcher-button';
import {
  DefaultThemeIcon,
  MacOSThemeIcon,
  MacOSTahoeThemeIcon,
} from './theme-icons';

export function ThemeVariantSwitcher() {
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

export default ThemeVariantSwitcher;
