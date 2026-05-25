import React from 'react';
import {
  Button,
  LucideIcons,
  Scrollbar,
  DrawerContainer,
} from '../../../index';
import cn from 'classnames';
import type { TableOfContentsProps } from './types';
import { useToc } from './use-toc';

export const TocSonoma: React.FC<TableOfContentsProps> = ({
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
    isSidebarOpen,
    setIsSidebarOpen,
    activeSection,
    openCategories,
    categoryRefs,
    groupedItems,
    handleCategoryToggle,
    handleItemClick,
    isMobile,
  } = useToc({
    items,
    navigationMode,
    activeSectionId,
    onItemClick,
    onSidebarToggle,
  });

  const renderTitle = () => (
    <div
      role="heading"
      aria-level={3}
      className="text-[16px] font-semibold text-gray-700 dark:text-gray-200"
    >
      {title}
    </div>
  );

  const navContent = (
    <nav className="flex-1 overflow-y-auto px-2 py-3">
      {groupedItems
        ? Object.entries(groupedItems).map(([category, categoryItems]) => {
            const isOpen = openCategories.has(category);
            return (
              <div key={category}>
                <button
                  type="button"
                  onClick={() => handleCategoryToggle(category, categoryItems)}
                  className="w-full flex items-center transition-colors select-none group h-8 gap-2 rounded-md px-2 text-[13px] font-normal text-gray-700 hover:bg-gray-500/8 dark:text-gray-300 dark:hover:bg-white/6"
                  aria-expanded={isOpen}
                  aria-label={`${
                    isOpen ? 'Close' : 'Open'
                  } ${category} category`}
                >
                  <span className="flex-1 truncate text-left">{category}</span>
                  <svg
                    className={cn(
                      'h-3 w-3 shrink-0 transition-transform duration-150 text-gray-400',
                      isOpen && 'rotate-90'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
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
                    <div className="mt-0.5 ml-4 space-y-0.5 border-l border-border/60 pl-2 dark:border-border/60">
                      {categoryItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={cn(
                              'group flex h-8 w-full items-center gap-2 rounded-xl px-3',
                              'text-[12px] transition-colors select-none',
                              isActive
                                ? 'bg-(--color-semantic-bg-primary)/12 font-medium text-(--color-semantic-bg-primary)'
                                : 'text-gray-600 hover:bg-gray-500/8 dark:text-gray-400 dark:hover:bg-white/6'
                            )}
                            onClick={(e) => handleItemClick(e, item)}
                          >
                            <span className="flex-1 truncate text-left">
                              {item.label}
                            </span>
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
                  'group flex h-9 w-full items-center gap-2 rounded-xl px-3',
                  'text-[13px] transition-colors select-none',
                  isActive
                    ? 'bg-(--color-semantic-bg-primary)/12 font-medium text-(--color-semantic-bg-primary)'
                    : 'text-gray-700 hover:bg-gray-500/8 dark:text-gray-300 dark:hover:bg-white/6'
                )}
                onClick={(e) => handleItemClick(e, item)}
              >
                <span className="flex-1 truncate text-left">{item.label}</span>
              </a>
            );
          })}
    </nav>
  );

  return (
    <>
      {/* Floating Toggle Button — positioned just above the Settings button */}
      <div className="fixed top-[calc(50%-80px)] z-40 ltr:right-0 rtl:left-0">
        {!isSidebarOpen && (
          <button
            className="flex h-[48px] w-[48px] items-center justify-center ltr:rounded-l-lg rtl:rounded-r-lg text-gray-600 shadow-large backdrop-blur-sm bg-light-dark dark:text-gray-200/70 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle table of contents"
            title="Toggle table of contents"
          >
            <LucideIcons.Menu className="w-6 h-6" />
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
          <div className="h-full flex flex-col w-full max-w-full min-[500px]:w-80 bg-(--macos-material-toolbar,rgba(255,255,255,0.72)) backdrop-blur-xl border-r border-(--macos-separator))">
            <div className="flex items-center justify-between shrink-0 px-3 py-3 border-b border-(--color-semantic-line-primary-subtle)">
              {renderTitle()}
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
            'fixed top-[58px] right-0 bottom-0 w-80 border-l border-(--macos-separator) z-10',
            'bg-(--macos-glass-regular-bg) backdrop-blur-xl ',
            'transition-all duration-300 ease-in-out overflow-y-hidden',
            className
          )}
        >
          <div className="z-10 flex h-[58px] items-center justify-between shrink-0 pl-4 pr-2 p-4 border-b border-(--macos-separator)">
            {renderTitle()}
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
            style={{ height: 'calc(100vh - 52px - 52px)' }}
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
            isSidebarOpen ? 'lg:mr-80' : 'lg:mr-0'
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};
