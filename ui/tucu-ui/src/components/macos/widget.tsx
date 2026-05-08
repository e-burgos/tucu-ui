import cn from 'classnames';

// ─── Types ─────────────────────────────────────────────────────

export type MacOSWidgetSize = 'sm' | 'md' | 'lg' | 'xl';

export interface MacOSWidgetProps {
  size?: MacOSWidgetSize;
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export interface MacOSWidgetHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

// ─── Size map (mirrors Sonoma's 2×2 widget grid at 170px unit) ─

const WIDGET_SIZE: Record<MacOSWidgetSize, string> = {
  sm: 'w-[170px] h-[170px]',
  md: 'w-[364px] h-[170px]',
  lg: 'w-[170px] h-[364px]',
  xl: 'w-[364px] h-[364px]',
};

// ─── MacOSWidget ───────────────────────────────────────────────

export function MacOSWidget({
  size = 'md',
  children,
  className,
  glass = false,
}: MacOSWidgetProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-[20px]',
        WIDGET_SIZE[size],
        'border border-[var(--color-semantic-line-primary-subtle)]',
        'shadow-[var(--shadow-card)]',
        glass
          ? 'bg-[var(--macos-material-sidebar,rgba(246,246,248,0.82))] backdrop-blur-2xl'
          : 'bg-[var(--color-semantic-elevation-1,#fff)]',
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── MacOSWidgetHeader ─────────────────────────────────────────

export function MacOSWidgetHeader({
  title,
  subtitle,
  icon,
  actions,
  className,
}: MacOSWidgetHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between px-4 pt-4', className)}>
      <div className="flex items-center gap-2">
        {icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-semantic-bg-primary)]/10 text-[var(--color-semantic-bg-primary)]">
            {icon}
          </span>
        )}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {title}
          </p>
          {subtitle && (
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export default MacOSWidget;
