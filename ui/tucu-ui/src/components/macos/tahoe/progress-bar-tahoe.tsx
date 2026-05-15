import cn from 'classnames';

// ─── Progress Bar ──────────────────────────────────────────────

export interface MacOSTahoeProgressBarProps {
  value?: number;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  showValue?: boolean;
}

const trackSize = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
};

export function MacOSTahoeProgressBar({
  value = 0,
  indeterminate = false,
  size = 'md',
  className,
  label,
  showValue = false,
}: MacOSTahoeProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div data-tucu="tahoe-progress-bar" className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-[12px]">
          {label && (
            <span className="font-medium text-(--macos-tahoe-text)">
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span className="tabular-nums text-(--macos-tahoe-text-muted)">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          'overflow-hidden rounded-full',
          'bg-(--macos-glass-clear-bg) backdrop-blur-(--macos-glass-clear-blur,30px)',
          'border border-(--macos-glass-border-subtle)',
          trackSize[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-300 ease-out',
            'bg-(--macos-tahoe-accent)',
            indeterminate && 'animate-tahoe-indeterminate w-1/3'
          )}
          style={indeterminate ? undefined : { width: `${clamped}%` }}
        />
      </div>

      {/* Inline keyframes for indeterminate animation */}
      {indeterminate && (
        <style>{`
          @keyframes tahoe-indeterminate {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          .animate-tahoe-indeterminate {
            animation: tahoe-indeterminate 1.5s ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  );
}

export default MacOSTahoeProgressBar;
