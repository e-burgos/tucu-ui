import { useState } from 'react';
import cn from 'classnames';
import { IMenuItem } from '../menus/menu-item';
import { LogoPropTypes } from '../../logos/logo';
import { MacOSSidebar, MacOSSidebarSection } from '../../macos/sidebar';
import { MacOSToolbar } from '../../macos/toolbar';
import Toast from '../../notifications/toast';

// ─── IMenuItem → MacOSSidebarSection adapter ──────────────────

function menuToSections(items: IMenuItem[]): MacOSSidebarSection[] {
  const visible = items.filter((m) => !m.hide);
  return [{ items: visible.map((m) => ({ id: m.path, label: m.name, icon: m.icon })) }];
}

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSLayoutProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  logo?: LogoPropTypes;
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

// ─── MacOSLayout ───────────────────────────────────────────────

export function MacOSLayout({
  children,
  menuItems,
  rightButton,
  className,
  contentClassName,
}: MacOSLayoutProps) {
  const [activeId, setActiveId] = useState<string>('');
  const sections = menuToSections(menuItems);

  return (
    <div className={cn('flex h-full w-full overflow-hidden', className)}>
      {/* Sidebar */}
      <MacOSSidebar
        sections={sections}
        activeId={activeId}
        onSelect={setActiveId}
      />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <MacOSToolbar
          trailing={rightButton}
        />

        <main
          className={cn(
            'flex-1 overflow-auto',
            'bg-[var(--color-semantic-bg,#f2f2f7)]',
            contentClassName
          )}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>

      <Toast />
    </div>
  );
}

export default MacOSLayout;
