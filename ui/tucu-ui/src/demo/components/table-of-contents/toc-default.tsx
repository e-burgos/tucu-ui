import React from 'react';
import {
  Button,
  Typography,
  LucideIcons,
  Scrollbar,
  DrawerContainer,
  LAYOUT_OPTIONS,
} from '../../../index';
import cn from 'classnames';
import type { TableOfContentsProps } from './types';
import { useToc } from './use-toc';

export const TocDefault: React.FC<TableOfContentsProps> = ({
  items,
  title = 'Table of Contents',
  className = '',
  onItemClick,
  children,
  onSidebarToggle,
  navigationMode = 'anchor',
  activeSectionId,
}) => {
  const {
    layout,
    isSidebarOpen,
    setIsSidebarOpen,
    activeSection,
    openCategories,
    categoryRefs,
    groupedItems,
    handleCategoryToggle,
    handleItemClick,
    smallScreen,
    isMobile,
  } = useToc({
    items,
    navigationMode,
    activeSectionId,
    onItemClick,
    onSidebarToggle,
  });

  const navContent = (
    <nav className="p-4 space-y-2">
      {groupedItems
        ? Object.entries(groupedItems).map(([category, categoryItems]) => {
            const isOpen = openCategories.has(category);
            return (
              <div key={category} className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleCategoryToggle(category, categoryItems)}
                  className="w-full flex items-center transition-colors select-none justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-expanded={isOpen}
                  aria-label={`${
                    isOpen ? 'Close' : 'Open'
                  } ${category} category`}
                >
                  <span>{category}</span>
                  <LucideIcons.ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                <div
                  ref={(el) => {
                    categoryRefs.current[category] = el;
                  }}
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-1 pt-1">
                      {categoryItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={cn(
                              'block w-full text-left rounded-lg px-3 py-2 text-sm transition-all duration-200',
                              isActive
                                ? 'bg-brand/10 text-brand font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                            )}
                            onClick={(e) => handleItemClick(e, item)}
                          >
                            <span>{item.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'block w-full text-left rounded-lg px-3 py-2 text-sm transition-all duration-200',
                  isActive
                    ? 'bg-brand/10 text-brand font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                )}
                onClick={(e) => handleItemClick(e, item)}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
    </nav>
  );

  return (
    <>
      {/* Floating Toggle Button */}
      <div
        className={cn(
          layout === LAYOUT_OPTIONS.ADMIN &&
            'fixed top-1/2 mt-13 z-40 -translate-y-1/2 ltr:right-0 rtl:left-0',
          layout === LAYOUT_OPTIONS.HORIZONTAL &&
            'fixed top-1/2 z-40 -translate-y-1/2 ltr:left-0 rtl:right-0',
          layout === LAYOUT_OPTIONS.CLEAN &&
            'fixed top-1/2 z-40 -translate-y-1/2 ltr:left-0 rtl:right-0'
        )}
      >
        {!isSidebarOpen && (
          <button
            className={cn(
              'flex items-center justify-center',
              'h-12 w-12 text-gray-600 shadow-large backdrop-blur-sm bg-light-dark dark:text-gray-200/70',
              layout === LAYOUT_OPTIONS.ADMIN && 'rounded-l-lg',
              layout === LAYOUT_OPTIONS.HORIZONTAL && 'rounded-r-lg',
              layout === LAYOUT_OPTIONS.CLEAN && 'rounded-r-lg'
            )}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle table of contents"
            title="Toggle table of contents"
          >
            <LucideIcons.Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile: DrawerContainer */}
      {isMobile && (
        <DrawerContainer
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          position="left"
          backdrop
        >
          <div className="h-full flex flex-col w-72 bg-body border-r border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between shrink-0 px-4 py-4 border-b border-gray-100 dark:border-gray-800">
              <Typography tag="h3" className="text-sm font-semibold">
                {title}
              </Typography>
              <Button
                variant="ghost"
                size="mini"
                shape="circle"
                className="p-0.5! hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close table of contents"
              >
                <LucideIcons.X className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Scrollbar
              style={{ height: 'calc(100vh - 60px)' }}
              className="h-full"
            >
              {navContent}
            </Scrollbar>
          </div>
        </DrawerContainer>
      )}

      {/* Desktop: Inline sidebar */}
      {!isMobile && isSidebarOpen && (
        <aside
          className={cn(
            'transition-all duration-300 ease-in-out overflow-y-hidden',
            layout === LAYOUT_OPTIONS.ADMIN && !smallScreen
              ? 'fixed left-0 translate-x-25 w-64 lg:w-72 border-r bg-body backdrop-blur-lg shadow-md border-gray-100 dark:border-gray-800 z-20'
              : 'fixed left-0 translate-x-0 w-72 lg:w-72 border-r bg-body backdrop-blur-lg shadow-md border-gray-100 dark:border-gray-800 z-20',
            className
          )}
          style={{
            top: layout === LAYOUT_OPTIONS.HORIZONTAL ? '80px' : '0px',
            zIndex: layout === LAYOUT_OPTIONS.HORIZONTAL ? 'inherit' : 30,
            height:
              layout === LAYOUT_OPTIONS.HORIZONTAL
                ? 'calc(100vh - 80px)'
                : '100vh',
          }}
        >
          <div className="z-10 flex items-center justify-between shrink-0 pl-4 pr-2 p-4 bg-body border-b border-gray-100 dark:border-gray-800">
            <Typography tag="h3" className="text-sm font-semibold">
              {title}
            </Typography>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close table of contents"
              className="flex items-center justify-center rounded-full transition-colors h-6 w-6 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              <LucideIcons.X className="w-3 h-3" />
            </button>
          </div>

          <Scrollbar
            style={{ height: 'calc(100vh - 72px - 60px)' }}
            className="h-full"
          >
            {navContent}
          </Scrollbar>
        </aside>
      )}

      {/* Main Content Wrapper */}
      {children && (
        <div
          className={cn(
            'transition-all duration-300 min-h-screen',
            isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};
