import cn from 'classnames';

export type MacOSTahoeWidgetSize = 'sm' | 'md' | 'lg' | 'xl';

export interface MacOSTahoeWidgetProps {
  size?: MacOSTahoeWidgetSize;
  children: React.ReactNode;
  className?: string;
}

export interface MacOSTahoeWidgetHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

const widgetDimensions: Record<MacOSTahoeWidgetSize, string> = {
  sm: 'w-[170px] h-[170px]',
  md: 'w-[364px] h-[170px]',
  lg: 'w-[170px] h-[364px]',
  xl: 'w-[364px] h-[364px]',
};

export function MacOSTahoeWidgetHeader({
  title,
  subtitle,
  icon,
  actions,
}: MacOSTahoeWidgetHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-3.5 pt-3">
      {icon && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center text-(--macos-tahoe-accent)">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-(--macos-tahoe-text-muted)">
          {title}
        </p>
        {subtitle && (
          <p className="truncate text-[13px] font-medium text-(--macos-tahoe-text)">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center">{actions}</div>}
    </div>
  );
}

export function MacOSTahoeWidget({
  size = 'sm',
  children,
  className,
}: MacOSTahoeWidgetProps) {
  return (
    <div
      data-tucu="tahoe-widget"
      className={cn(
        'flex flex-col overflow-hidden',
        'rounded-[22px]',
        'bg-(--macos-glass-regular-bg) backdrop-blur-(--macos-glass-regular-blur,20px)',
        'border border-(--macos-glass-border)',
        'shadow-(--macos-glass-shadow,0_4px_16px_rgba(0,0,0,0.08))',
        widgetDimensions[size],
        className
      )}
    >
      {children}
    </div>
  );
}

export default MacOSTahoeWidget;
