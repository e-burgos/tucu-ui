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
  sm: { wrap: 'h-7 p-[3px]',  seg: 'px-2.5 text-xs gap-1',   icon: 'w-3 h-3'   },
  md: { wrap: 'h-8 p-[3px]',  seg: 'px-3.5 text-[13px] gap-1.5', icon: 'w-3.5 h-3.5' },
  lg: { wrap: 'h-9 p-[3px]',  seg: 'px-4   text-sm gap-1.5', icon: 'w-4 h-4'   },
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
