import cn from 'classnames';
import { SearchIcon } from '../icons';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSearchBarProps {
  value?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
}

const SIZE = {
  sm: { wrap: 'h-7',  input: 'pl-7 pr-7 text-xs',  icon: 'left-2 w-3.5 h-3.5'   },
  md: { wrap: 'h-[34px]', input: 'pl-8 pr-8 text-[13px]', icon: 'left-2.5 w-3.5 h-3.5' },
  lg: { wrap: 'h-10', input: 'pl-9 pr-9 text-sm',  icon: 'left-3 w-4 h-4'       },
};

// ─── MacOSSearchBar ────────────────────────────────────────────

export function MacOSSearchBar({
  value = '',
  placeholder = 'Search',
  size = 'md',
  autoFocus,
  className,
  onChange,
  onClear,
  onSubmit,
}: MacOSSearchBarProps) {
  const { wrap, input, icon } = SIZE[size];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit?.(value);
    if (e.key === 'Escape') onClear?.();
  };

  return (
    <div
      className={cn(
        'relative flex items-center rounded-full',
        'bg-black/6 dark:bg-white/10',
        'border border-[var(--color-semantic-line-primary-subtle)]',
        'transition-all duration-150',
        'focus-within:bg-white dark:focus-within:bg-[#3a3a3c]',
        'focus-within:shadow-[0_0_0_var(--macos-focus-ring-width,3px)_var(--macos-focus-ring,rgba(0,122,255,0.5))]',
        wrap,
        className
      )}
    >
      <SearchIcon
        className={cn(
          'pointer-events-none absolute shrink-0 text-gray-400 dark:text-gray-500',
          icon
        )}
      />

      <input
        type="search"
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'h-full w-full bg-transparent outline-none',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          input
        )}
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear"
          className={cn(
            'absolute right-2 flex h-4 w-4 items-center justify-center rounded-full',
            'bg-gray-400/60 dark:bg-gray-500/60 text-white',
            'hover:bg-gray-500 dark:hover:bg-gray-400 transition-colors'
          )}
        >
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1l5 5M6 1L1 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default MacOSSearchBar;
