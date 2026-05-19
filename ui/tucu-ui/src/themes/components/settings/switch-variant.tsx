import cn from 'classnames';
import { useTheme } from '../../hooks/use-theme';
import { THEME_VARIANT } from '../../config';
import { Select, SelectOption } from '../../../components/inputs/select';

interface SwitchVariantProps {
  className?: string;
}

const variantOptions: SelectOption[] = [
  { value: 'default', name: 'Default' },
  { value: 'macos', name: 'macOS' },
  { value: 'macos-tahoe', name: 'Tahoe' },
];

export const SwitchVariant: React.FC<SwitchVariantProps> = ({ className }) => {
  const { colorScheme, applyThemeStyle } = useTheme();

  return (
    <div
      className={cn(
        'flex items-center justify-between! w-full gap-1',
        className
      )}
    >
      <span className="text-sm font-medium">Theme</span>
      <Select
        options={variantOptions}
        value={colorScheme}
        variant="ghost"
        size="sm"
        className="min-w-[100px]"
        onSelect={(value) => applyThemeStyle(value as THEME_VARIANT)}
      />
    </div>
  );
};

export default SwitchVariant;
