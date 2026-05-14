import React from 'react';
import { LucideIcons, Scrollbar, DrawerContainer } from '../../../index';
import cn from 'classnames';
import type { TableOfContentsProps } from './types';
import { useToc } from './use-toc';

export const TocTahoe: React.FC<TableOfContentsProps> = ({
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
      className="text-[16px] font-semibold text-(--macos-tahoe-text) dark:text-white/90"
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
                  className="w-full flex items-center transition-colors select-none group h-9 gap-2 rounded-xl px-3 text-[13px] font-normal text-(--macos-tahoe-sidebar-item-text) dark:text-white/88 hover:bg-(--macos-tahoe-sidebar-item-hover-bg)"
                  aria-expanded={isOpen}
                  aria-label={`${
                    isOpen ? 'Close' : 'Open'
                  } ${category} category`}
                >
                  <span className="flex-1 truncate text-left">{category}</span>
                  <svg
                    className={cn(
                      'h-3 w-3 shrink-0 transition-transform duration-150 text-white/40',
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
                    <div className="mt-0.5 ml-4 space-y-0.5 border-l border-gray-200/60 pl-2 dark:border-gray-700/60">
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
                                ? 'border border-(--macos-tahoe-sidebar-item-active-stroke) bg-(--macos-tahoe-sidebar-item-active-bg) font-semibold text-(--macos-tahoe-sidebar-item-active-text)'
                                : 'font-normal text-(--macos-tahoe-sidebar-item-text) dark:text-white/80 hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
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
                    ? 'border border-(--macos-tahoe-sidebar-item-active-stroke) bg-(--macos-tahoe-sidebar-item-active-bg) font-semibold text-(--macos-tahoe-sidebar-item-active-text)'
                    : 'font-normal text-(--macos-tahoe-sidebar-item-text) dark:text-white/88 hover:bg-(--macos-tahoe-sidebar-item-hover-bg)'
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
      {/* Floating Toggle Button */}
      <div className="fixed top-25 z-10 right-0">
        {!isSidebarOpen && (
          <button
            className="flex items-center justify-center h-10 w-10 rounded-l-2xl border border-r-0 border-(--macos-tahoe-border) bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px] text-white/60 hover:text-white/90 transition-colors shadow-(--macos-tahoe-sidebar-shadow)"
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
          backdrop={false}
          backdropClassName="backdrop-blur-[2px] bg-transparent"
        >
          <div className="pointer-events-none relative z-10 flex h-full w-full items-stretch p-3 min-[500px]:p-4">
            <aside
              data-tucu="macos-tahoe-toc"
              className="pointer-events-auto flex h-full w-62 max-w-[calc(100vw-24px)] flex-col rounded-[30px] border border-(--macos-tahoe-border) bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]"
            >
              <div className="shrink-0 px-5 pb-3 pt-5 flex items-center justify-between gap-3">
                {renderTitle()}
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close table of contents"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
                >
                  <LucideIcons.X className="w-3.5 h-3.5" />
                </button>
              </div>
              <Scrollbar
                style={{ height: 'calc(100vh - 80px)' }}
                className="h-full"
              >
                {navContent}
              </Scrollbar>
            </aside>
          </div>
        </DrawerContainer>
      )}

      {/* Desktop: Inline sidebar */}
      {!isMobile && isSidebarOpen && (
        <aside
          data-tucu="macos-tahoe-toc"
          className={cn(
            'fixed top-18.5 right-4 bottom-4 w-67.5 rounded-3xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-light-dark shadow-card z-10',
            'transition-all duration-300 ease-in-out overflow-y-hidden',
            className
          )}
        >
          <div className="z-10 flex items-center justify-between shrink-0 px-5 pt-4 pb-3 border-b border-gray-200 dark:border-(--macos-tahoe-border)">
            {renderTitle()}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close table of contents"
              className="flex items-center justify-center rounded-full transition-colors h-6 w-6 border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/6 text-gray-500 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-white/12 hover:text-gray-700 dark:hover:text-white/80"
            >
              <LucideIcons.X className="w-3 h-3" />
            </button>
          </div>

          <Scrollbar
            style={{ height: 'calc(100vh - 68px - 16px - 52px - 16px)' }}
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
            isSidebarOpen ? 'lg:mr-71.5' : 'lg:mr-0'
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};
