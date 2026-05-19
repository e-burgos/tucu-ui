import cn from 'classnames';

export interface MacOSTahoeSearchBarProps {
  value?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
}

const sizeStyles = {
  sm: 'h-[28px] text-[12px] px-[10px]',
  md: 'h-[32px] text-[13px] px-[12px]',
  lg: 'h-[36px] text-[14px] px-[14px]',
};

const iconSize = {
  sm: 'h-[14px] w-[14px]',
  md: 'h-[16px] w-[16px]',
  lg: 'h-[18px] w-[18px]',
};

export function MacOSTahoeSearchBar({
  value = '',
  placeholder = 'Search',
  size = 'md',
  autoFocus,
  className,
  onChange,
  onClear,
  onSubmit,
}: MacOSTahoeSearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
    if (e.key === 'Escape' && onClear) {
      onClear();
    }
  };

  return (
    <div
      data-tucu="tahoe-search-bar"
      className={cn('relative inline-flex items-center', className)}
    >
      {/* Magnifying glass icon */}
      <svg
        className={cn(
          'pointer-events-none absolute left-[10px] text-(--macos-tahoe-text-muted)',
          iconSize[size]
        )}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="M13 13l4 4" />
      </svg>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full rounded-[8px] pl-[32px] outline-none',
          'bg-(--macos-glass-clear-bg) backdrop-blur-(--macos-glass-clear-blur,30px)',
          'border border-(--macos-glass-border)',
          'text-(--macos-tahoe-text) placeholder:text-(--macos-tahoe-text-muted)',
          'focus:ring-2 focus:ring-(--macos-tahoe-accent)/40',
          'transition-shadow',
          sizeStyles[size]
        )}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          className={cn(
            'absolute right-[8px] flex items-center justify-center rounded-full',
            'text-(--macos-tahoe-text-muted) hover:text-(--macos-tahoe-text)',
            'transition-colors',
            iconSize[size]
          )}
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-[14px] w-[14px]"
          >
            <path
              fillRule="evenodd"
              d="M8 16A8 8 0 108 0a8 8 0 000 16zM5.354 4.646a.5.5 0 10-.708.708L7.293 8l-2.647 2.646a.5.5 0 00.708.708L8 8.707l2.646 2.647a.5.5 0 00.708-.708L8.707 8l2.647-2.646a.5.5 0 00-.708-.708L8 7.293 5.354 4.646z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default MacOSTahoeSearchBar;
