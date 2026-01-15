import { useState, useEffect, useRef } from 'react';

export interface UseWindowScrollReturn {
  x: number;
  y: number;
}

/**
 * Hook that tracks window scroll position in real-time
 * Works with both window scroll and container scroll (e.g., overflow-auto containers)
 * Detects the actual scrollable container (window, document, or parent container)
 * @returns Object with x and y scroll positions
 */
export function useWindowScroll(): UseWindowScrollReturn {
  const [scroll, setScroll] = useState<UseWindowScrollReturn>(() => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 0 };
    }
    // Get initial scroll from multiple sources
    const windowX = window.scrollX || window.pageXOffset || 0;
    const windowY = window.scrollY || window.pageYOffset || 0;
    const docX = document.documentElement.scrollLeft || 0;
    const docY = document.documentElement.scrollTop || 0;
    const bodyX = document.body.scrollLeft || 0;
    const bodyY = document.body.scrollTop || 0;

    // Use the maximum value (the actual scroll position)
    return {
      x: Math.max(windowX, docX, bodyX),
      y: Math.max(windowY, docY, bodyY),
    };
  });

  const scrollableContainersRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const getScrollPosition = (): UseWindowScrollReturn => {
      // Get scroll from all possible sources
      const windowX = window.scrollX || window.pageXOffset || 0;
      const windowY = window.scrollY || window.pageYOffset || 0;
      const docX = document.documentElement.scrollLeft || 0;
      const docY = document.documentElement.scrollTop || 0;
      const bodyX = document.body.scrollLeft || 0;
      const bodyY = document.body.scrollTop || 0;

      // Start with the maximum from window/document/body
      let scrollX = Math.max(windowX, docX, bodyX);
      let scrollY = Math.max(windowY, docY, bodyY);

      // Also check for scrollable containers
      // Find containers that have scrollable content
      const containers = Array.from(document.querySelectorAll('*')).filter(
        (el) => {
          const element = el as HTMLElement;
          const style = window.getComputedStyle(element);
          const hasOverflow =
            style.overflow === 'auto' ||
            style.overflow === 'scroll' ||
            style.overflowY === 'auto' ||
            style.overflowY === 'scroll' ||
            style.overflowX === 'auto' ||
            style.overflowX === 'scroll';

          if (!hasOverflow) return false;

          // Check if it actually has scrollable content
          return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
          );
        }
      ) as HTMLElement[];

      // Find the container with the most scroll
      for (const container of containers) {
        const containerScrollY = container.scrollTop;
        const containerScrollX = container.scrollLeft;

        if (containerScrollY > scrollY) {
          scrollY = containerScrollY;
        }
        if (containerScrollX > scrollX) {
          scrollX = containerScrollX;
        }
      }

      return { x: scrollX, y: scrollY };
    };

    const handleScroll = () => {
      setScroll(getScrollPosition());
    };

    // Set initial scroll position
    handleScroll();

    // Also check after a small delay in case of layout changes
    const timer = setTimeout(handleScroll, 100);

    // Listen to scroll events on window
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Listen to scroll events on document (capture phase to catch all)
    document.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });

    // Find and listen to scroll events on scrollable containers
    const containers = Array.from(document.querySelectorAll('*')).filter(
      (el) => {
        const element = el as HTMLElement;
        const style = window.getComputedStyle(element);
        const hasOverflow =
          style.overflow === 'auto' ||
          style.overflow === 'scroll' ||
          style.overflowY === 'auto' ||
          style.overflowY === 'scroll' ||
          style.overflowX === 'auto' ||
          style.overflowX === 'scroll';

        if (!hasOverflow) return false;

        return (
          element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth
        );
      }
    ) as HTMLElement[];

    scrollableContainersRef.current = containers;

    containers.forEach((container) => {
      container.addEventListener('scroll', handleScroll, {
        passive: true,
      } as AddEventListenerOptions);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll, { capture: true });
      scrollableContainersRef.current.forEach((container) => {
        container.removeEventListener('scroll', handleScroll);
      });
      clearTimeout(timer);
    };
  }, []);

  return scroll;
}
