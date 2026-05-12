import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Typography,
  LucideIcons,
  Scrollbar,
  DrawerContainer,
  useTheme,
  LAYOUT_OPTIONS,
  useBreakpoint,
} from '../../index';
import cn from 'classnames';

export interface TableOfContentsItem {
  id: string;
  label: string;
  category?: string; // Optional category for grouping items
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  title?: string;
  className?: string;
  onItemClick?: (item: TableOfContentsItem) => void;
  children?: React.ReactNode;
  onSidebarToggle?: (isOpen: boolean) => void;
  /** Navigation mode: 'anchor' scrolls to sections (default), 'route' navigates via onItemClick */
  navigationMode?: 'anchor' | 'route';
  /** Active section ID (used in 'route' mode to highlight the current item) */
  activeSectionId?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  title = 'Table of Contents',
  className = '',
  onItemClick,
  children,
  onSidebarToggle,
  navigationMode = 'anchor',
  activeSectionId: externalActiveSection,
}) => {
  const breakPoint = useBreakpoint();
  const { layout } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set()); // All categories closed by default
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-open sidebar on desktop, closed on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Notify parent of sidebar state changes
  useEffect(() => {
    if (onSidebarToggle) {
      onSidebarToggle(isSidebarOpen);
    }
  }, [isSidebarOpen, onSidebarToggle]);

  // In route mode, sync active section from external prop
  useEffect(() => {
    if (navigationMode === 'route' && externalActiveSection !== undefined) {
      setActiveSection(externalActiveSection);
      // Auto-open the category containing the active section
      if (externalActiveSection) {
        const activeItem = items.find((i) => i.id === externalActiveSection);
        if (activeItem?.category) {
          const cat = activeItem.category;
          setOpenCategories((prev) => {
            const next = new Set(prev);
            next.add(cat);
            return next;
          });
        }
      }
    }
  }, [navigationMode, externalActiveSection, items]);

  // Track active section on scroll (anchor mode only)
  useEffect(() => {
    if (navigationMode === 'route') return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items, navigationMode]);

  // Group items by category if categories are present
  const groupedItems = React.useMemo(() => {
    const hasCategories = items.some((item) => item.category);
    if (!hasCategories) {
      return null; // Return null if no categories, render flat list
    }

    const groups: Record<string, TableOfContentsItem[]> = {};
    items.forEach((item) => {
      const category = item.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    });

    return groups;
  }, [items]);

  // Handle category toggle
  const handleCategoryToggle = (
    category: string,
    categoryItems: TableOfContentsItem[]
  ) => {
    const isOpen = openCategories.has(category);

    if (isOpen) {
      // Close category - no scroll
      setOpenCategories((prev) => {
        const next = new Set(prev);
        next.delete(category);
        return next;
      });
    } else {
      // Open category
      setOpenCategories((prev) => {
        const next = new Set(prev);
        next.add(category);
        return next;
      });

      // In route mode, navigate to first item; in anchor mode, scroll
      if (categoryItems.length > 0) {
        const firstItem = categoryItems[0];

        if (navigationMode === 'route') {
          if (onItemClick) onItemClick(firstItem);
        } else {
          // Force load the section first
          window.dispatchEvent(
            new CustomEvent('forceLoadSection', {
              detail: { sectionId: firstItem.id },
            })
          );

          // Wait a bit for the section to render, then scroll
          setTimeout(() => {
            const element = document.getElementById(firstItem.id);
            if (element) {
              window.history.replaceState(null, '', `#${firstItem.id}`);
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }, 100);
        }
      }
    }
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: TableOfContentsItem
  ) => {
    e.preventDefault();

    // Close sidebar on mobile after click
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }

    // In route mode, just call onItemClick and return
    if (navigationMode === 'route') {
      if (onItemClick) onItemClick(item);
      return;
    }

    // Anchor mode: Force load the section by dispatching a custom event
    window.dispatchEvent(
      new CustomEvent('forceLoadSection', { detail: { sectionId: item.id } })
    );

    // Wait for the section element to be in the DOM, then scroll
    const scrollToSection = () => {
      const element = document.getElementById(item.id);
      if (element) {
        // Update URL hash without triggering scroll
        window.history.replaceState(null, '', `#${item.id}`);

        // Scroll to the section
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return true;
      }
      return false;
    };

    // Try immediately (section skeleton should already be in DOM)
    if (!scrollToSection()) {
      // If not found, wait a bit and try again (max 5 attempts)
      let attempts = 0;
      const maxAttempts = 5;
      const interval = setInterval(() => {
        attempts++;
        if (scrollToSection() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 50);
    }

    // Call custom onClick handler if provided
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const smallScreen =
    breakPoint === 'sm' ||
    breakPoint === 'xs' ||
    breakPoint === 'md' ||
    breakPoint === 'lg';

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const isMacOS =
    layout === LAYOUT_OPTIONS.MACOS || layout === LAYOUT_OPTIONS.MACOS_TAHOE;

  const renderSidebarTitle = () => {
    if (isMacOS) {
      return (
        <div
          role="heading"
          aria-level={3}
          className="text-[16px] font-semibold text-gray-700 dark:text-gray-200"
        >
          {title}
        </div>
      );
    }

    return (
      <Typography tag="h3" className="text-lg font-semibold">
        {title}
      </Typography>
    );
  };

  // Shared nav content
  const navContent = (
    <nav
      className={cn(
        isMacOS ? 'flex-1 overflow-y-auto px-2 py-3' : 'p-4 space-y-2'
      )}
    >
      {groupedItems
        ? Object.entries(groupedItems).map(([category, categoryItems]) => {
            const isOpen = openCategories.has(category);
            return (
              <div key={category} className={cn(isMacOS ? '' : 'space-y-1')}>
                {/* Category header — macOS: looks like a parent nav item */}
                <button
                  type="button"
                  onClick={() => handleCategoryToggle(category, categoryItems)}
                  className={cn(
                    'w-full flex items-center transition-colors select-none',
                    isMacOS
                      ? 'group h-8 gap-2 rounded-md px-2 text-[13px] font-normal text-gray-700 hover:bg-gray-500/8 dark:text-gray-300 dark:hover:bg-white/6'
                      : 'justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                  aria-expanded={isOpen}
                  aria-label={`${
                    isOpen ? 'Close' : 'Open'
                  } ${category} category`}
                >
                  {isMacOS ? (
                    <>
                      <span className="flex-1 truncate text-left">
                        {category}
                      </span>
                      <svg
                        className={cn(
                          'h-3 w-3 shrink-0 text-gray-400 transition-transform duration-150',
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
                    </>
                  ) : (
                    <>
                      <span>{category}</span>
                      <LucideIcons.ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </>
                  )}
                </button>

                {/* Children — macOS: indented with left border line */}
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
                    <div
                      className={cn(
                        isMacOS
                          ? 'mt-0.5 ml-4 space-y-0.5 border-l border-gray-200/60 pl-2 dark:border-gray-700/60'
                          : 'space-y-1 pt-1'
                      )}
                    >
                      {categoryItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={cn(
                              isMacOS
                                ? cn(
                                    'group flex h-7 w-full items-center gap-2 rounded-md px-2',
                                    'text-[12px] transition-colors select-none',
                                    isActive
                                      ? 'bg-[var(--color-semantic-bg-primary)]/12 font-medium text-[var(--color-semantic-bg-primary)]'
                                      : 'text-gray-600 hover:bg-gray-500/8 dark:text-gray-400 dark:hover:bg-white/6'
                                  )
                                : cn(
                                    'block w-full text-left rounded-lg px-3 py-2 text-sm transition-all duration-200',
                                    isActive
                                      ? 'bg-brand/10 text-brand font-semibold'
                                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                                  )
                            )}
                            onClick={(e) => handleItemClick(e, item)}
                          >
                            <span
                              className={cn(
                                isMacOS && 'flex-1 truncate text-left'
                              )}
                            >
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
                  isMacOS
                    ? cn(
                        'group flex h-8 w-full items-center gap-2 rounded-md px-2',
                        'text-[13px] font-normal transition-colors select-none',
                        isActive
                          ? 'bg-[var(--color-semantic-bg-primary)]/12 font-medium text-[var(--color-semantic-bg-primary)]'
                          : 'text-gray-700 hover:bg-gray-500/8 dark:text-gray-300 dark:hover:bg-white/6'
                      )
                    : cn(
                        'block w-full text-left rounded-lg px-3 py-2 text-sm transition-all duration-200',
                        isActive
                          ? 'bg-brand/10 text-brand font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                      )
                )}
                onClick={(e) => handleItemClick(e, item)}
              >
                <span className={cn(isMacOS && 'flex-1 truncate text-left')}>
                  {item.label}
                </span>
              </a>
            );
          })}
    </nav>
  );

  return (
    <>
      {/* Floating Toggle Button - Fixed position */}
      <div
        className={cn(
          layout === LAYOUT_OPTIONS.ADMIN &&
            'fixed top-1/2 mt-[52px] z-40 -translate-y-1/2 ltr:right-0 rtl:left-0',
          layout === LAYOUT_OPTIONS.HORIZONTAL &&
            'fixed top-1/2 z-40 -translate-y-1/2 ltr:left-0 rtl:right-0',
          layout === LAYOUT_OPTIONS.CLEAN &&
            'fixed top-1/2 z-40 -translate-y-1/2 ltr:left-0 rtl:right-0',
          isMacOS && 'fixed top-[120px] z-10 right-0'
        )}
      >
        {!isSidebarOpen && (
          <button
            className={cn(
              'flex h-[48px] w-[48px] items-center justify-center text-gray-600 shadow-large backdrop-blur-sm bg-light-dark dark:text-gray-200/70',
              layout === LAYOUT_OPTIONS.ADMIN && 'rounded-l-lg',
              layout === LAYOUT_OPTIONS.HORIZONTAL && 'rounded-r-lg',
              layout === LAYOUT_OPTIONS.CLEAN && 'rounded-r-lg',
              isMacOS && 'rounded-l-lg'
            )}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle table of contents"
            title="Toggle table of contents"
            aria-describedby="Toggle table of contents"
          >
            {isSidebarOpen ? (
              <LucideIcons.X className="w-5 h-5" />
            ) : (
              <LucideIcons.Menu className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Mobile: DrawerContainer */}
      {isMobile && (
        <DrawerContainer
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          position="left"
        >
          <div
            className={cn(
              'h-full flex flex-col',
              isMacOS
                ? 'w-full max-w-full bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl border-r border-[var(--color-semantic-line-primary-subtle)]'
                : 'w-72 bg-body border-r border-gray-100 dark:border-gray-800'
            )}
          >
            <div
              className={cn(
                'flex items-center justify-between shrink-0',
                isMacOS
                  ? 'px-3 py-3 border-b border-[var(--color-semantic-line-primary-subtle)]'
                  : 'px-4 py-4 border-b border-gray-100 dark:border-gray-800'
              )}
            >
              {renderSidebarTitle()}
              <Button
                variant="ghost"
                size="mini"
                shape="circle"
                className="!p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
              ? 'fixed left-0 translate-x-[100px] w-64 lg:w-72 border-r bg-body backdrop-blur-lg shadow-md border-gray-100 dark:border-gray-800 z-20'
              : isMacOS
              ? 'fixed top-[52px] right-0 bottom-0 w-64 lg:w-72 border-l border-[var(--color-semantic-line-primary-subtle)] bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl z-10'
              : 'fixed left-0 translate-x-0 w-72 lg:w-72 border-r bg-body backdrop-blur-lg shadow-md border-gray-100 dark:border-gray-800 z-20',
            className
          )}
          style={
            isMacOS
              ? undefined
              : {
                  top: layout === LAYOUT_OPTIONS.HORIZONTAL ? '80px' : '0px',
                  zIndex: layout === LAYOUT_OPTIONS.HORIZONTAL ? 'inherit' : 30,
                  height:
                    layout === LAYOUT_OPTIONS.HORIZONTAL
                      ? 'calc(100vh - 80px)'
                      : '100vh',
                }
          }
        >
          <div
            className={cn(
              'z-10 p-4 flex items-center justify-between',
              isMacOS
                ? 'pl-4 pr-2 border-b border-[var(--color-semantic-line-primary-subtle)]'
                : 'pl-4 pr-2 bg-body border-b border-gray-100 dark:border-gray-800'
            )}
          >
            {renderSidebarTitle()}
            <Button
              variant="ghost"
              size="mini"
              shape="circle"
              className="!p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close table of contents"
            >
              <LucideIcons.X className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Scrollbar
            style={{
              height: isMacOS
                ? 'calc(100vh - 52px - 52px)'
                : 'calc(100vh - 72px - 60px)',
            }}
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
            isMacOS
              ? isSidebarOpen
                ? 'lg:mr-72'
                : 'lg:mr-0'
              : isSidebarOpen
              ? 'lg:ml-72'
              : 'lg:ml-0'
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default TableOfContents;
