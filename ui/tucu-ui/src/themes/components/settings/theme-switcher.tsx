import { useTheme } from '../../hooks/use-theme';
import { Sun, Moon } from '../../../components/icons';
import { SettingsSectionHeading } from './settings-section-heading';
import { SwitcherButton } from './switcher-button';

export function ThemeSwitcher() {
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

export default ThemeSwitcher;
