import { useTheme } from '../../hooks/use-theme';
import { LeftAlign, RightAlign } from '../../../components/icons';
import { SettingsSectionHeading } from './settings-section-heading';
import { SwitcherButton } from './switcher-button';

export function DirectionSwitcher() {
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

export default DirectionSwitcher;
