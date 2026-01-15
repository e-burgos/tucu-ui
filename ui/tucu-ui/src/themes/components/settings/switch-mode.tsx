import { Switch } from '../../../components/inputs/switch';
import { useTheme } from '../../hooks/use-theme';
import { Moon, Sun } from '../../../components/icons';
import cn from 'classnames';

interface SwitchModeProps {
  className?: string;
  children?: React.ReactNode;
}

export const SwitchMode: React.FC<SwitchModeProps> = ({
  className,
  children,
}) => {
  const { mode, setMode } = useTheme();

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full gap-1',
        className
      )}
    >
      <span className="text-sm font-medium">Mode</span>
      <Switch
        onLabel={<Moon className="w-4 h-4" />}
        offLabel={<Sun className="w-4 h-4" />}
        checked={mode === 'dark'}
        onChange={(checked: boolean) => setMode(checked ? 'dark' : 'light')}
      />
      {children}
    </div>
  );
};

export default SwitchMode;
