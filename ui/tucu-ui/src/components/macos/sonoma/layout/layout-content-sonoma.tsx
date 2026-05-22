import cn from 'classnames';
import { MacOSToolbarSonoma } from './toolbar-sonoma';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSSonomaLayoutContentProps {
  children: React.ReactNode;
  /** Toolbar center slot (typically current page title) */
  toolbarCenter?: React.ReactNode;
  /** Toolbar leading slot (logo on mobile, etc.) */
  toolbarLeading?: React.ReactNode;
  /** Toolbar trailing slot (right button, hamburger, etc.) */
  toolbarTrailing?: React.ReactNode;
  /** ClassName for the toolbar */
  headerClassName?: string;
  /** ClassName for the content area */
  contentClassName?: string;
}

// ─── Component ─────────────────────────────────────────────────

export function MacOSSonomaLayoutContent({
  children,
  toolbarCenter,
  toolbarLeading,
  toolbarTrailing,
  headerClassName,
  contentClassName,
}: MacOSSonomaLayoutContentProps) {
  return (
    <div
      data-tucu="macos-sonoma-content-shell"
      className="flex min-w-0 flex-1 flex-col overflow-visible"
    >
      <MacOSToolbarSonoma
        center={toolbarCenter}
        leading={toolbarLeading}
        trailing={toolbarTrailing}
        className={headerClassName}
      />

      <main
        data-tucu="macos-sonoma-main"
        className={cn(
          'relative flex-1 min-h-0 overflow-auto bg-transparent',
          contentClassName
        )}
      >
        <div data-tucu="macos-sonoma-content-inner" className="p-[24px]">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MacOSSonomaLayoutContent;
