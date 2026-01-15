import { Select, SelectOption } from '../../../components/inputs/select';
import { useTheme } from '../../hooks/use-theme';
import { langOptions, LangType } from '../../config';
import cn from 'classnames';

interface LangSelectorProps {
  className?: string;
  children?: React.ReactNode;
}

export const LangSelector: React.FC<LangSelectorProps> = ({
  className,
  children,
}) => {
  const { lang, setLang } = useTheme();

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full gap-1',
        className
      )}
    >
      <span className="text-sm font-medium">Language</span>
      <Select
        buttonClassName="h-[32px]! gap-1 rounded-full!"
        options={langOptions.map((option) => ({
          name: option.label,
          value: option.value,
        }))}
        selectedOption={{
          name:
            langOptions.find((option) => option.value === lang)?.label || '',
          value:
            langOptions.find((option) => option.value === lang)?.value || '',
        }}
        onChange={(value: SelectOption) => setLang(value.value as LangType)}
      />
      {children}
    </div>
  );
};

export default LangSelector;
