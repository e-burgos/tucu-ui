import { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ArrowUp } from '../icons/arrow-up';

export interface ScrollToTopProps {
  /**
   * Distance from the top of the viewport (in pixels or CSS value)
   */
  top?: string | number;
  /**
   * Distance from the right of the viewport (in pixels or CSS value)
   * Default: 24
   */
  right?: string | number;
  /**
   * Distance from the bottom of the viewport (in pixels or CSS value)
   * Default: 24
   */
  bottom?: string | number;
  /**
   * Distance from the left of the viewport (in pixels or CSS value)
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
  /**
   * Scroll behavior: smooth animation or instant jump
   * Default: 'smooth'
   */
  behavior?: 'smooth' | 'instant';
  /**
   * Reference to a scrollable container element.
   * When provided, the component listens to this container's scroll instead of window.
   */
  scrollContainer?: React.RefObject<HTMLElement | null>;
}

/**
 * ScrollToTop — floating button that scrolls the page (or a container) to top.
 * Also auto-scrolls to top on route changes.
 */
export function ScrollToTop({
  top,
  right = 24,
  bottom = 24,
  left,
  showAfter = 400,
  className,
  size = 'medium',
  behavior = 'smooth',
  scrollContainer,
}: ScrollToTopProps = {}) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number>(0);
  const resolvedContainerRef = useRef<HTMLElement | Window | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Resolve the actual scroll target: explicit ref → auto-detect → window
  const getScrollTarget = useCallback((): HTMLElement | Window => {
    if (scrollContainer?.current) return scrollContainer.current;

    // Auto-detect: find the main scrollable container (e.g. theme-wrapper's overflow-auto div)
    // This handles cases where the app scroll is in a fixed container, not window
    const candidates = document.querySelectorAll(
      '[class*="overflow-auto"], [class*="overflow-y-auto"], [class*="overflow-scroll"]'
    );
    for (const el of candidates) {
      const htmlEl = el as HTMLElement;
      // A valid scroll container has scrollable content (scrollHeight > clientHeight)
      if (htmlEl.scrollHeight > htmlEl.clientHeight + 50) {
        return htmlEl;
      }
    }

    return window;
  }, [scrollContainer]);

  // Auto-scroll to top on route change
  useEffect(() => {
    const target = getScrollTarget();
    if (target instanceof HTMLElement) {
      target.scrollTo({ top: 0, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, [pathname, behavior, getScrollTarget]);

  // Show/hide button based on scroll position
  useEffect(() => {
    // Resolve once and cache
    const target = getScrollTarget();
    resolvedContainerRef.current = target;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY =
          target instanceof HTMLElement
            ? target.scrollTop
            : window.scrollY || document.documentElement.scrollTop || 0;
        setShow(scrollY > showAfter);
        rafRef.current = 0;
      });
    };

    // Check immediately
    handleScroll();

    const el = target instanceof HTMLElement ? target : window;
    el.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [showAfter, getScrollTarget]);

  const scrollToTop = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const target = resolvedContainerRef.current || getScrollTarget();
      if (target instanceof HTMLElement) {
        target.scrollTo({ top: 0, behavior });
      } else {
        window.scrollTo({ top: 0, behavior });
      }
    },
    [behavior, getScrollTarget]
  );

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

  const toCss = (val: string | number | undefined): string | undefined => {
    if (val === undefined || val === '') return undefined;
    if (typeof val === 'number') return `${val}px`;
    // Pure numeric string → add px
    const num = Number(val);
    if (!isNaN(num)) return `${num}px`;
    // Already has units (e.g. "2rem", "10%")
    return val;
  };

  const positionStyle: React.CSSProperties = {
    position: 'fixed',
    top: toCss(top),
    right: toCss(right),
    bottom: toCss(bottom),
    left: toCss(left),
  };

  const button = (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        'z-9999 flex items-center justify-center rounded-md bg-brand/50 text-white shadow-lg',
        'transition-all duration-300 ease-out',
        'hover:bg-brand hover:shadow-xl hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        'cursor-pointer',
        sizeClasses[size],
        show
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none',
        className
      )}
      style={positionStyle}
    >
      <ArrowUp className={cn(iconSizes[size], 'pointer-events-none')} />
    </button>
  );

  if (!mounted) return null;

  return createPortal(button, document.body) as React.ReactElement;
}

export default ScrollToTop;
