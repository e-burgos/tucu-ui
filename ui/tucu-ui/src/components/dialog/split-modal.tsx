'use client';

import React, { useCallback, useId, useState } from 'react';
import { cn } from '../../libs/cn';
import { Modal } from './modal';
import { SplitModalNav } from './split-modal-nav';
import type { SplitModalProps } from './split-modal-types';

export type {
  SplitModalItemStatus,
  SplitModalNavItem,
  SplitModalProps,
  SplitModalSection,
  SplitModalSidebarPosition,
} from './split-modal-types';

const DEFAULT_MAX_WIDTH = '56rem';
const DEFAULT_MAX_HEIGHT = 'calc(85vh - 5rem)';

const SIDEBAR_BORDER =
  'border-[color:var(--tucu-split-modal-sidebar-border,var(--tucu-split-modal-sidebar-border-default))]';
const SIDEBAR_SURFACE =
  'bg-[var(--tucu-split-modal-sidebar-bg,var(--tucu-split-modal-sidebar-bg-default))]';

const SIDEBAR_SURFACE_FROM_MD =
  'md:bg-[var(--tucu-split-modal-sidebar-bg,var(--tucu-split-modal-sidebar-bg-default))]';

const noop = () => undefined;

const toCssLength = (value: number | string) =>
  typeof value === 'number' ? `${value}px` : value;

export function SplitModal({
  isOpen,
  onClose,
  setIsOpen = noop,
  closeable,
  hideCloseButton,
  title,
  chips,
  headerActions,
  sections,
  activeItemId,
  defaultActiveItemId,
  onActiveItemChange,
  navigationLabel,
  sidebarHeader,
  sidebarFooter,
  sidebar,
  sidebarPosition = 'start',
  sidebarWidth,
  children,
  footer,
  maxWidth,
  maxHeight = DEFAULT_MAX_HEIGHT,
  size,
  closeLabel,
  closeTooltip,
  closeButtonProps,
  overlayClassName,
  className,
  sidebarClassName,
  bodyClassName,
  initialFocusRef,
  'aria-label': ariaLabel,
  ...dataAttributes
}: SplitModalProps) {
  const titleId = useId();
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState(
    defaultActiveItemId
  );
  const currentActiveId =
    activeItemId !== undefined ? activeItemId : uncontrolledActiveId;

  const selectItem = useCallback(
    (id: string) => {
      if (activeItemId === undefined) setUncontrolledActiveId(id);
      onActiveItemChange?.(id);
    },
    [activeItemId, onActiveItemChange]
  );

  const hasTitle = title !== undefined && title !== null && title !== false;
  const hasNavigation = Boolean(sections && sections.length > 0);
  const hasSidebar = Boolean(
    hasNavigation || sidebar || sidebarHeader || sidebarFooter
  );

  const header =
    hasTitle || chips || headerActions ? (
      <div
        data-tucu="split-modal-header"
        className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1"
      >
        {hasTitle && (
          <h2
            id={titleId}
            data-tucu="split-modal-title"
            className="m-0 min-w-0 text-lg font-semibold"
          >
            {title}
          </h2>
        )}
        {chips && (
          <div
            data-tucu="split-modal-chips"
            className="flex flex-wrap items-center gap-1.5 text-sm font-normal"
          >
            {chips}
          </div>
        )}
        {headerActions && (
          <div
            data-tucu="split-modal-header-actions"
            className="ml-auto flex items-center gap-2 text-sm font-normal"
          >
            {headerActions}
          </div>
        )}
      </div>
    ) : undefined;

  const layoutStyle = {
    maxHeight: 'inherit',
    ...(sidebarWidth === undefined
      ? {}
      : { '--tucu-split-modal-sidebar-width': toCssLength(sidebarWidth) }),
  } as React.CSSProperties;

  return (
    <Modal
      data-tucu="split-modal"
      {...dataAttributes}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={onClose}
      closeable={closeable}
      hideCloseButton={hideCloseButton}
      hideButtons
      header={header}
      aria-label={ariaLabel}
      aria-labelledby={hasTitle ? titleId : undefined}
      closeLabel={closeLabel}
      closeTooltip={closeTooltip}
      closeButtonProps={closeButtonProps}
      overlayClassName={overlayClassName}
      initialFocusRef={initialFocusRef}
      size={size}
      maxWidth={maxWidth ?? (size ? undefined : DEFAULT_MAX_WIDTH)}
      maxHeight={maxHeight}
      className={cn('overflow-hidden', className)}
      contentClassName="mt-0 overflow-hidden p-0"
    >
      <div
        data-tucu="split-modal-layout"
        style={layoutStyle}
        className={cn(
          'flex min-h-0 w-full flex-1 flex-col overflow-hidden md:flex-row',
          sidebarPosition === 'end' && 'md:flex-row-reverse'
        )}
      >
        {hasSidebar && (
          <div
            data-tucu="split-modal-sidebar"
            data-position={sidebarPosition}
            className={cn(
              'contents md:flex md:w-[var(--tucu-split-modal-sidebar-width,18rem)] md:shrink-0 md:flex-col md:overflow-hidden',
              SIDEBAR_BORDER,
              SIDEBAR_SURFACE_FROM_MD,
              sidebarPosition === 'end' ? 'md:border-l' : 'md:border-r',
              sidebarClassName
            )}
          >
            {sidebarHeader && (
              <div
                data-tucu="split-modal-sidebar-header"
                className={cn(
                  'shrink-0 border-b px-4 py-3 md:border-b-0 md:bg-transparent',
                  SIDEBAR_BORDER,
                  SIDEBAR_SURFACE
                )}
              >
                {sidebarHeader}
              </div>
            )}
            {hasNavigation && sections && (
              <SplitModalNav
                sections={sections}
                activeItemId={currentActiveId}
                onSelect={selectItem}
                ariaLabel={navigationLabel}
                className={cn(
                  'shrink-0 border-b md:min-h-0 md:flex-1 md:shrink md:border-b-0 md:bg-transparent',
                  SIDEBAR_BORDER,
                  SIDEBAR_SURFACE
                )}
              />
            )}
            {sidebar && (
              <div
                data-tucu="split-modal-sidebar-content"
                className={cn(
                  'max-h-40 shrink-0 overflow-y-auto border-b px-4 py-3 md:max-h-none md:min-h-0 md:flex-1 md:border-b-0 md:bg-transparent',
                  SIDEBAR_BORDER,
                  SIDEBAR_SURFACE
                )}
              >
                {sidebar}
              </div>
            )}
            {sidebarFooter && (
              <div
                data-tucu="split-modal-sidebar-footer"
                className={cn(
                  'order-4 shrink-0 border-t px-4 py-3 md:order-none md:bg-transparent',
                  SIDEBAR_BORDER,
                  SIDEBAR_SURFACE
                )}
              >
                {sidebarFooter}
              </div>
            )}
          </div>
        )}
        <div
          data-tucu="split-modal-main"
          className="order-3 flex min-h-0 min-w-0 flex-1 flex-col md:order-none"
        >
          <div
            data-tucu="split-modal-body"
            className={cn('min-h-0 flex-1 overflow-y-auto p-5', bodyClassName)}
          >
            {children}
          </div>
          {footer && (
            <div
              data-tucu="split-modal-footer"
              className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border px-5 py-3"
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

SplitModal.displayName = 'SplitModal';

export default SplitModal;
