import cn from 'classnames';

export interface MacOSTahoeSegmentOption<T extends string = string> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface MacOSTahoeSegmentedControlProps<T extends string = string> {
  options: MacOSTahoeSegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-7 text-[11px] gap-0.5 rounded-lg px-0.5',
  md: 'h-8 text-[13px] gap-0.5 rounded-[10px] px-0.5',
  lg: 'h-9 text-[14px] gap-1 rounded-xl px-1',
};

const itemSize = {
  sm: 'h-[22px] px-2 rounded-md',
  md: 'h-[26px] px-3 rounded-lg',
  lg: 'h-[30px] px-4 rounded-[10px]',
};

export function MacOSTahoeSegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  className,
}: MacOSTahoeSegmentedControlProps<T>) {
  return (
    <div
      data-tucu="tahoe-segmented-control"
      role="radiogroup"
      className={cn(
        'inline-flex items-center',
        'bg-(--macos-glass-clear-bg) backdrop-blur-(--macos-glass-clear-blur,30px)',
        'border border-(--macos-glass-border)',
        fullWidth && 'w-full',
        sizeMap[size],
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.value)}
            className={cn(
              'inline-flex select-none items-center justify-center gap-1.5 transition-all duration-200',
              fullWidth && 'flex-1',
              itemSize[size],
              isActive
                ? [
                    'bg-(--macos-glass-prominent-bg) backdrop-blur-(--macos-glass-prominent-blur,40px)',
                    'border border-(--macos-glass-prominent-border,var(--macos-glass-border))',
                    'text-(--macos-tahoe-text) font-medium',
                    'shadow-sm',
                  ]
                : [
                    'text-(--macos-tahoe-text-muted)',
                    'hover:text-(--macos-tahoe-text)',
                    'border border-transparent',
                  ],
              option.disabled && 'pointer-events-none opacity-40'
            )}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default MacOSTahoeSegmentedControl;
