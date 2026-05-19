import cn from 'classnames';
import { MacOSToolbarTahoe } from './toolbar-tahoe';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSTahoeLayoutContentProps {
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
  /** Extra className for the shell container */
  className?: string;
}

// ─── Component ─────────────────────────────────────────────────

export function MacOSTahoeLayoutContent({
  children,
  toolbarCenter,
  toolbarLeading,
  toolbarTrailing,
  headerClassName,
  contentClassName,
  className,
}: MacOSTahoeLayoutContentProps) {
  return (
    <div
      data-tucu="macos-tahoe-shell"
      className={cn(
        'flex min-w-0 flex-1 flex-col overflow-hidden rounded-[34px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-panel-bg) backdrop-blur-[34px]',
        className
      )}
    >
      <MacOSToolbarTahoe
        center={toolbarCenter}
        leading={toolbarLeading}
        trailing={toolbarTrailing}
        className={headerClassName}
      />

      <main
        data-tucu="macos-tahoe-content"
        className={cn(
          'relative flex-1 min-h-0 overflow-auto bg-transparent',
          contentClassName
        )}
      >
        <div
          data-tucu="macos-tahoe-content-inner"
          className="px-[20px] pb-[20px] pt-[16px] min-[500px]:px-[28px] min-[500px]:pb-[28px] [&>*]:max-w-none"
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default MacOSTahoeLayoutContent;
