import React from 'react';
import cn from 'classnames';
import Logo, { LogoPropTypes } from '../logos/logo';
import Button from '../buttons';
import { Close } from '../icons/close';
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
  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 dark:border-gray-700 bg-light-dark xs:w-80 lg:w-96 xl:w-96 2xl:w-96',
        className
      )}
    >
      <div className="relative flex h-[96px] items-center justify-between overflow-hidden px-[24px] py-[16px] 2xl:px-[32px]">
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
          onClick={onClose}
          onTouchStart={onClose}
          onTouchEnd={onClose}
        >
          <Close className="h-[16px] w-[16px]" width={16} height={16} />
        </Button>
      </div>
      <div className="h-[calc(100%-96px)] overflow-y-auto">
        <div className="px-[24px] pb-[80px] pt-[4px]">{children}</div>
      </div>
      {actionContent && (
        <div className="absolute bottom-[16px] left-0 z-10 w-full px-[24px] flex gap-[8px]">
          {actionContent}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
