import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Typography,
  LucideIcons,
  useIsMobile,
  Scrollbar,
} from '../../index';

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
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  title = 'Table of Contents',
  className = '',
  onItemClick,
  children,
  onSidebarToggle,
}) => {
  const { isMobile } = useIsMobile();
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

  // Track active section on scroll
  useEffect(() => {
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
  }, [items]);

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
      // Open category - scroll to first item
      setOpenCategories((prev) => {
        const next = new Set(prev);
        next.add(category);
        return next;
      });

      // Scroll to first item in the category
      if (categoryItems.length > 0) {
        const firstItem = categoryItems[0];

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
            // Update URL hash
            window.history.replaceState(null, '', `#${firstItem.id}`);

            // Scroll to the section
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
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

    // First: Force load the section by dispatching a custom event
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

  return (
    <>
      {/* Floating Toggle Button - Fixed position */}
      <div className="fixed top-1/2 z-40 -translate-y-1/2 ltr:left-0 rtl:right-0">
        {!isSidebarOpen && (
          <button
            className="flex h-[48px] w-[48px] items-center justify-center text-gray-600 shadow-large backdrop-blur-sm rounded-r-lg bg-light-dark dark:text-gray-200/70"
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

      {/* Sidebar - Table of Contents */}
      {isSidebarOpen && (
        <aside
          className={`fixed left-0 h-screen bg-body backdrop-blur-lg shadow-md border-r border-gray-100 dark:border-gray-800 z-20 transition-all duration-300 ease-in-out overflow-y-hidden ${className} ${
            isSidebarOpen
              ? 'translate-x-0 w-64 lg:w-72'
              : '-translate-x-full lg:translate-x-0 lg:w-72'
          }`}
          style={{
            top: isMobile ? '60px' : '72px',
            height: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 72px)',
          }}
        >
          <div className="pl-4 pr-2 bg-body border-b border-gray-100 dark:border-gray-800 z-10 p-4 flex items-center justify-between">
            <Typography tag="h3" className="text-lg font-semibold">
              {title}
            </Typography>
            <Button
              variant="ghost"
              size="tiny"
              shape="circle"
              className="w-4 h-4 "
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close table of contents"
            >
              <LucideIcons.X className="w-3 h-3" />
            </Button>
          </div>

          <Scrollbar
            style={{ height: 'calc(100vh - 140px)' }}
            className="h-full"
          >
            <nav className="p-4 space-y-2">
              {groupedItems
                ? // Render grouped by categories
                  Object.entries(groupedItems).map(
                    ([category, categoryItems]) => {
                      const isOpen = openCategories.has(category);
                      return (
                        <div key={category} className="space-y-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleCategoryToggle(category, categoryItems)
                            }
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                            aria-expanded={isOpen}
                            aria-label={`${
                              isOpen ? 'Close' : 'Open'
                            } ${category} category`}
                          >
                            <span>{category}</span>
                            <LucideIcons.ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
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
                                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                        isActive
                                          ? 'bg-brand/10 text-brand font-semibold'
                                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                                      }`}
                                      onClick={(e) => handleItemClick(e, item)}
                                    >
                                      {item.label}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )
                : // Render flat list if no categories
                  items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-brand/10 text-brand font-semibold'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                        onClick={(e) => handleItemClick(e, item)}
                      >
                        {item.label}
                      </a>
                    );
                  })}
            </nav>
          </Scrollbar>
        </aside>
      )}

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Wrapper */}
      {children && (
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
          } min-h-screen`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default TableOfContents;
