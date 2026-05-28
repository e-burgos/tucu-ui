import { useTheme } from '../../hooks/use-theme';
import { Button } from '../../../components/buttons/button';

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

export default RestoreDefaults;
