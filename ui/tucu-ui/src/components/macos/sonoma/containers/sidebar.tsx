import cn from 'classnames';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MacOSSidebarSectionConfig {
  label?: string;
  items: MacOSSidebarItem[];
}

export interface MacOSSidebarProps {
  sections: MacOSSidebarSectionConfig[];
  activeId?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onSelect?: (id: string) => void;
}

// ─── MacOSSidebar ───────────────────────────────────────────────

export function MacSidebarCard({
  sections,
  activeId,
  header,
  footer,
  className,
  onSelect,
}: MacOSSidebarProps) {
  return (
    <aside
      data-tucu="sidebar"
      className={cn(
        'flex h-full flex-col',
        'w-[var(--macos-sidebar-width,300px)] shrink-0',
        'bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl',
        'border-r border-[var(--color-semantic-line-primary-subtle)]',
        className
      )}
    >
      {header && (
        <div className="shrink-0 px-[12px] pb-[8px] pt-[16px]">{header}</div>
      )}

      <nav className="flex-1 overflow-y-auto px-[8px] py-[8px]">
        {sections.map((section, si) => (
          <div key={si} className={cn(si > 0 && 'mt-[16px]')}>
            {section.label && (
              <p className="mb-[4px] px-[8px] text-[11px] font-semibold uppercase tracking-widest text-gray-400 select-none dark:text-gray-500">
                {section.label}
              </p>
            )}
            <ul className="space-y-[2px]">
              {section.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      disabled={item.disabled}
                      onClick={() => {
                        if (item.disabled) return;
                        item.onClick?.();
                        onSelect?.(item.id);
                      }}
                      className={cn(
                        'group flex h-[28px] w-full items-center gap-[8px] rounded-[6px] px-[8px]',
                        'text-sm transition-colors',
                        active
                          ? 'bg-[var(--color-semantic-bg-primary)]/15 font-medium text-[var(--color-semantic-bg-primary)]'
                          : 'text-gray-700 hover:bg-gray-500/10 dark:text-gray-300 dark:hover:bg-white/8',
                        item.disabled && 'cursor-not-allowed opacity-40'
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            'h-[16px] w-[16px] shrink-0',
                            active
                              ? 'text-[var(--color-semantic-bg-primary)]'
                              : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'
                          )}
                        >
                          {item.icon}
                        </span>
                      )}

                      <span className="flex-1 truncate text-left">
                        {item.label}
                      </span>

                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            'flex h-[16px] min-w-[16px] items-center justify-center rounded-full px-[4px] text-[11px] font-medium',
                            active
                              ? 'bg-[var(--color-semantic-bg-primary)] text-white'
                              : 'bg-gray-400/25 text-gray-600 dark:text-gray-300'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {footer && (
        <div className="shrink-0 border-t border-[var(--color-semantic-line-primary-subtle)] px-[12px] py-[12px]">
          {footer}
        </div>
      )}
    </aside>
  );
}

export default MacSidebarCard;
