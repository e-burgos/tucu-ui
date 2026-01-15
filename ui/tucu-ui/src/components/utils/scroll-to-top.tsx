import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ArrowUp } from '../icons/arrow-up';

export interface ScrollToTopProps {
  /**
   * Distance from the top of the viewport (in pixels or Tailwind class)
   * Default: undefined (uses bottom instead)
   */
  top?: string | number;
  /**
   * Distance from the right of the viewport (in pixels or Tailwind class)
   * Default: 24
   */
  right?: string | number;
  /**
   * Distance from the bottom of the viewport (in pixels or Tailwind class)
   * Default: 24
   */
  bottom?: string | number;
  /**
   * Distance from the left of the viewport (in pixels or Tailwind class)
   * Default: undefined (uses right instead)
   */
  left?: string | number;
  /**
   * Minimum scroll position (in pixels) to show the button
   * Default: 400
   */
  showAfter?: number;
  /**
   * Custom className for the button
   */
  className?: string;
  /**
   * Size of the button
   * Default: 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * ScrollToTop component that scrolls to the top of the page when the route changes
 * and displays a floating button to scroll back to top
 */
export function ScrollToTop({
  top,
  right = 24,
  bottom = 24,
  left,
  showAfter = 400,
  className,
  size = 'medium',
}: ScrollToTopProps = {}) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Show/hide button based on scroll position
  // Works with both window scroll and container scroll (e.g., overflow-auto containers)
  useEffect(() => {
    const handleScroll = () => {
      // Try window scroll first
      let scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;

      // If window scroll is 0, look for a scrollable container
      if (scrollY === 0) {
        // Find the first scrollable parent with overflow-auto or overflow-scroll
        const scrollableContainers = Array.from(
          document.querySelectorAll(
            '[class*="overflow-auto"], [class*="overflow-scroll"]'
          )
        );
        for (const container of scrollableContainers) {
          const containerScrollY = (container as HTMLElement).scrollTop;
          if (containerScrollY > 0) {
            scrollY = containerScrollY;
            break;
          }
        }
      }

      const shouldShow = scrollY > showAfter;
      setShow(shouldShow);
    };

    // Check immediately on mount
    handleScroll();

    // Also check after a small delay in case of layout changes
    const timer = setTimeout(handleScroll, 100);

    // Listen to window scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Also listen to scroll events on potential scroll containers
    const scrollableContainers = Array.from(
      document.querySelectorAll(
        '[class*="overflow-auto"], [class*="overflow-scroll"]'
      )
    );
    scrollableContainers.forEach((container) => {
      container.addEventListener('scroll', handleScroll, {
        passive: true,
      } as AddEventListenerOptions);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      scrollableContainers.forEach((container) => {
        container.removeEventListener('scroll', handleScroll);
      });
      clearTimeout(timer);
    };
  }, [showAfter]);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Try to scroll window first
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also scroll any scrollable containers to top
    const scrollableContainers = Array.from(
      document.querySelectorAll(
        '[class*="overflow-auto"], [class*="overflow-scroll"]'
      )
    );
    scrollableContainers.forEach((container) => {
      (container as HTMLElement).scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      (container as HTMLElement).scrollTop = 0;
    });
    setShow(false);
  };

  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-12 h-12',
    large: 'w-14 h-14',
  };

  const iconSizes = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-7 h-7',
  };

  const positionStyle: React.CSSProperties = {
    position: 'fixed',
    ...(top !== undefined && {
      top: typeof top === 'number' ? `${top}px` : top,
    }),
    ...(right !== undefined && {
      right: typeof right === 'number' ? `${right}px` : right,
    }),
    ...(bottom !== undefined && {
      bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
    }),
    ...(left !== undefined && {
      left: typeof left === 'number' ? `${left}px` : left,
    }),
  };

  const button = (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        'z-9999 flex items-center justify-center rounded-md bg-brand/50 text-white shadow-lg transition-all duration-300 hover:bg-brand hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-0 focus:ring-brand focus:ring-offset-0 dark:focus:ring-offset-gray-900 cursor-pointer',
        sizeClasses[size],
        show
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
      style={positionStyle}
    >
      <ArrowUp className={cn(iconSizes[size], 'pointer-events-none')} />
    </button>
  );

  // Use portal to render button directly in body, bypassing any scroll containers
  if (!mounted) return null;

  return createPortal(button, document.body) as React.ReactElement;
}

export default ScrollToTop;
