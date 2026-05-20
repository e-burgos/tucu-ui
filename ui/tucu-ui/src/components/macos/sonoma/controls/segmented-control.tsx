import cn from 'classnames';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface MacOSSegmentedControlProps<T extends string = string> {
  options: MacOSSegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

// ─── Size map ──────────────────────────────────────────────────

const SIZE = {
  sm: { wrap: 'h-[28px] p-[3px]', seg: 'px-[10px] text-xs gap-[4px]', icon: 'w-[12px] h-[12px]' },
  md: {
    wrap: 'h-[32px] p-[3px]',
    seg: 'px-[14px] text-[13px] gap-[6px]',
    icon: 'w-[14px] h-[14px]',
  },
  lg: { wrap: 'h-[36px] p-[3px]', seg: 'px-[16px]   text-sm gap-[6px]', icon: 'w-[16px] h-[16px]' },
};

// ─── MacOSSegmentedControl ─────────────────────────────────────

export function MacOSSegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  className,
}: MacOSSegmentedControlProps<T>) {
  const { wrap, seg, icon: iconSize } = SIZE[size];

  return (
    <div
      role="group"
      aria-label="Segmented control"
      data-tucu="segmented-control"
      data-size={size}
      className={cn(
        'inline-flex rounded-[9px]',
        'bg-black/5 dark:bg-white/10',
        wrap,
        fullWidth && 'w-full',
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={opt.disabled}
            data-tucu="segmented-item"
            data-active={active}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={cn(
              'flex flex-1 items-center justify-center rounded-[7px] font-medium',
              'transition-all duration-150 select-none',
              seg,
              active
                ? [
                    'bg-white dark:bg-[#636366]',
                    'text-gray-900 dark:text-gray-50',
                    'shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.08)]',
                  ]
                : [
                    'text-gray-600 dark:text-gray-300',
                    'hover:text-gray-900 dark:hover:text-gray-100',
                  ],
              opt.disabled && 'cursor-not-allowed opacity-40'
            )}
          >
            {opt.icon && (
              <span className={cn('shrink-0', iconSize)}>{opt.icon}</span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default MacOSSegmentedControl;
