import React from 'react';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../logos/logo';
import Button from '../buttons';
import { X } from 'lucide-react';
import Scrollbar from '../common/scrollbar';
import useIsMobile from '../../hooks/use-is-mobile';
export interface SidebarProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  actionContent?: React.ReactNode;
  logo?: LogoPropTypes;
  onClose?: () => void;
}

export function Sidebar({
  className,
  children,
  title,
  actionContent,
  logo,
  onClose,
}: SidebarProps) {
  const { isMobile } = useIsMobile();
  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body dark:border-gray-700 dark:bg-dark xs:w-80 lg:w-96 xl:w-96 2xl:w-96',
        className
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        {!title && <Logo {...(logo as LogoPropTypes)} />}
        {title && (
          <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        <Button
          title="Close"
          shape="circle"
          variant="ghost"
          size="mini"
          onClick={isMobile ? undefined : onClose}
          onTouchStart={onClose}
          onTouchEnd={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-20 pt-1">{children}</div>
      </Scrollbar>
      {actionContent && (
        <div className="absolute bottom-4 left-0 z-10 w-full px-6 flex gap-2">
          {actionContent}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
