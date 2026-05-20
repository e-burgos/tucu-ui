import { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme, LAYOUT_OPTIONS, useBreakpoint } from '../../../index';
import type { TableOfContentsItem } from './types';

export interface UseTocOptions {
  items: TableOfContentsItem[];
  navigationMode: 'anchor' | 'route';
  activeSectionId?: string;
  onItemClick?: (item: TableOfContentsItem) => void;
  onSidebarToggle?: (isOpen: boolean) => void;
}

export function useToc({
  items,
  navigationMode,
  activeSectionId: externalActiveSection,
  onItemClick,
  onSidebarToggle,
}: UseTocOptions) {
  const breakPoint = useBreakpoint();
  const { layout } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
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
  const groupedItems = useMemo(() => {
    const hasCategories = items.some((item) => item.category);
    if (!hasCategories) {
      return null;
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
      setOpenCategories((prev) => {
        const next = new Set(prev);
        next.delete(category);
        return next;
      });
    } else {
      setOpenCategories((prev) => {
        const next = new Set(prev);
        next.add(category);
        return next;
      });

      if (categoryItems.length > 0) {
        const firstItem = categoryItems[0];

        if (navigationMode === 'route') {
          if (onItemClick) onItemClick(firstItem);
        } else {
          window.dispatchEvent(
            new CustomEvent('forceLoadSection', {
              detail: { sectionId: firstItem.id },
            })
          );

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

    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }

    if (navigationMode === 'route') {
      if (onItemClick) onItemClick(item);
      return;
    }

    window.dispatchEvent(
      new CustomEvent('forceLoadSection', { detail: { sectionId: item.id } })
    );

    const scrollToSection = () => {
      const element = document.getElementById(item.id);
      if (element) {
        window.history.replaceState(null, '', `#${item.id}`);
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return true;
      }
      return false;
    };

    if (!scrollToSection()) {
      let attempts = 0;
      const maxAttempts = 5;
      const interval = setInterval(() => {
        attempts++;
        if (scrollToSection() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 50);
    }

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
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;
  const isTahoe =
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;
  const isSonoma = layout === LAYOUT_OPTIONS.MACOS;

  return {
    layout,
    breakPoint,
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
    isMacOS,
    isTahoe,
    isSonoma,
  };
}
