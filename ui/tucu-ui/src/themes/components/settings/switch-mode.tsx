'use client';

import { Switch } from '../../../components/inputs/switch';
import { useTheme } from '../../hooks/use-theme';
import { Moon, Sun } from '../../../components/icons';
import { cn } from '../../../libs/cn';
import { useTucuMessages } from '../../../libs/i18n/use-tucu-messages';

interface SwitchModeProps {
  className?: string;
  children?: React.ReactNode;
  label?: React.ReactNode;
  'aria-label'?: string;
  iconOnly?: boolean;
}

export const SwitchMode: React.FC<SwitchModeProps> = ({
  className,
  children,
  label,
  'aria-label': ariaLabel,
  iconOnly = false,
}) => {
  const { mode, setMode } = useTheme();
  const messages = useTucuMessages();
  const isDark = mode === 'dark';
  const toggleLabel =
    ariaLabel ?? (isDark ? messages.themeMode.switchToLight : messages.themeMode.switchToDark);

  if (iconOnly) {
    return (
      <button
        type="button"
        data-tucu="switch-mode"
        aria-label={toggleLabel}
        aria-pressed={isDark}
        onClick={() => setMode(isDark ? 'light' : 'dark')}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-brand outline-hidden',
          className
        )}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full gap-1',
        className
      )}
    >
      {label !== null && (
        <span className="text-sm font-medium">{label ?? messages.themeMode.label}</span>
      )}
      <Switch
        aria-label={toggleLabel}
        onLabel={<Moon className="w-4 h-4" />}
        offLabel={<Sun className="w-4 h-4" />}
        checked={isDark}
        onChange={(checked: boolean) => setMode(checked ? 'dark' : 'light')}
      />
      {children}
    </div>
  );
};

export default SwitchMode;
