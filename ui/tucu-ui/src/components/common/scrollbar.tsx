import React, { useRef, useEffect, useState, useCallback } from 'react';
import cn from 'classnames';

export interface ScrollbarProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  autoHide?: 'never' | 'scroll' | 'leave' | 'move';
  direction?: 'horizontal' | 'vertical' | 'both';
  scrollbarStyle?: {
    track?: React.CSSProperties;
    thumb?: React.CSSProperties;
  };
}

export function Scrollbar({
  children,
  style,
  className,
  autoHide = 'scroll',
  direction = 'vertical',
  scrollbarStyle,
}: ScrollbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const verticalThumbRef = useRef<HTMLDivElement>(null);
  const horizontalThumbRef = useRef<HTMLDivElement>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(autoHide === 'never');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });

  // Touch event states
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });

  const scrollTimeout = useRef<NodeJS.Timeout>();

  const updateScrollbars = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    const verticalThumb = verticalThumbRef.current;
    const horizontalThumb = horizontalThumbRef.current;

    // Vertical scrollbar
    if (direction === 'vertical' || direction === 'both') {
      const scrollHeight = content.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollRatio = clientHeight / scrollHeight;
      const thumbHeight = Math.max(scrollRatio * clientHeight, 20);
      const scrollTop = container.scrollTop;
      const maxScroll = scrollHeight - clientHeight;
      const thumbTop =
        maxScroll > 0
          ? (scrollTop / maxScroll) * (clientHeight - thumbHeight)
          : 0;

      if (verticalThumb) {
        verticalThumb.style.height = `${thumbHeight}px`;
        verticalThumb.style.transform = `translateY(${thumbTop}px)`;
        verticalThumb.style.display = scrollRatio < 1 ? 'block' : 'none';
      }
    }

    // Horizontal scrollbar
    if (direction === 'horizontal' || direction === 'both') {
      const scrollWidth = content.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollRatio = clientWidth / scrollWidth;
      const thumbWidth = Math.max(scrollRatio * clientWidth, 20);
      const scrollLeft = container.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;
      const thumbLeft =
        maxScroll > 0
          ? (scrollLeft / maxScroll) * (clientWidth - thumbWidth)
          : 0;

      if (horizontalThumb) {
        horizontalThumb.style.width = `${thumbWidth}px`;
        horizontalThumb.style.transform = `translateX(${thumbLeft}px)`;
        horizontalThumb.style.display = scrollRatio < 1 ? 'block' : 'none';
      }
    }
  }, [direction]);

  const handleScroll = useCallback(() => {
    updateScrollbars();
    setIsScrolling(true);

    if (autoHide === 'scroll') {
      setShowScrollbar(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        if (!isDragging && !isTouchDragging) {
          setShowScrollbar(false);
        }
      }, 1000);
    }
  }, [autoHide, isDragging, isTouchDragging, updateScrollbars]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setScrollStart({
      x: containerRef.current?.scrollLeft || 0,
      y: containerRef.current?.scrollTop || 0,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      if (direction === 'vertical' || direction === 'both') {
        const scrollHeight = content.scrollHeight;
        const clientHeight = container.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        const scrollRatio = maxScroll / (clientHeight - 20);
        container.scrollTop = scrollStart.y + deltaY * scrollRatio;
      }

      if (direction === 'horizontal' || direction === 'both') {
        const scrollWidth = content.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        const scrollRatio = maxScroll / (clientWidth - 20);
        container.scrollLeft = scrollStart.x + deltaX * scrollRatio;
      }
    },
    [isDragging, dragStart, scrollStart, direction]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (autoHide === 'scroll') {
      setTimeout(() => setShowScrollbar(false), 1000);
    }
  }, [autoHide]);

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setIsTouchDragging(true);
        setLastTouch({ x: touch.clientX, y: touch.clientY });

        // Show scrollbar on touch
        if (autoHide === 'scroll') {
          setShowScrollbar(true);
        }
      }
    },
    [autoHide]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isTouchDragging || !containerRef.current || !contentRef.current)
        return;

      e.preventDefault(); // Prevent default scrolling behavior

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouch.x;
        const deltaY = touch.clientY - lastTouch.y;

        const container = containerRef.current;
        const content = contentRef.current;

        if (direction === 'vertical' || direction === 'both') {
          const scrollHeight = content.scrollHeight;
          const clientHeight = container.clientHeight;
          const maxScroll = scrollHeight - clientHeight;
          if (maxScroll > 0) {
            container.scrollTop = Math.max(
              0,
              Math.min(maxScroll, container.scrollTop - deltaY)
            );
          }
        }

        if (direction === 'horizontal' || direction === 'both') {
          const scrollWidth = content.scrollWidth;
          const clientWidth = container.clientWidth;
          const maxScroll = scrollWidth - clientWidth;
          if (maxScroll > 0) {
            container.scrollLeft = Math.max(
              0,
              Math.min(maxScroll, container.scrollLeft - deltaX)
            );
          }
        }

        setLastTouch({ x: touch.clientX, y: touch.clientY });
      }
    },
    [isTouchDragging, lastTouch, direction]
  );

  const handleTouchEnd = useCallback(() => {
    setIsTouchDragging(false);
    if (autoHide === 'scroll') {
      setTimeout(() => setShowScrollbar(false), 1000);
    }
  }, [autoHide]);

  const handleMouseEnter = useCallback(() => {
    if (autoHide === 'move' || autoHide === 'leave') {
      setShowScrollbar(true);
    }
  }, [autoHide]);

  const handleMouseLeave = useCallback(() => {
    if (autoHide === 'leave' && !isDragging && !isTouchDragging) {
      setShowScrollbar(false);
    }
  }, [autoHide, isDragging, isTouchDragging]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateScrollbars);
    resizeObserver.observe(container);

    container.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    updateScrollbars();

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout.current);
    };
  }, [
    handleScroll,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
    updateScrollbars,
  ]);

  const scrollbarVisible = showScrollbar || autoHide === 'never';

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className={cn(
          'h-full w-full overflow-auto scrollbar-hide',
          'transition-all duration-200',
          // Mobile-specific classes
          'mobile-scrollbar',
          'touch-pan-xy'
        )}
        onTouchStart={handleTouchStart}
        style={{
          // Enable momentum scrolling on iOS
          WebkitOverflowScrolling: 'touch',
          // Prevent default touch behaviors that might interfere
          touchAction: 'pan-y pan-x',
        }}
      >
        <div
          ref={contentRef}
          className="min-h-full min-w-full text-sm overflow-x-auto whitespace-pre-wrap"
        >
          {children}
        </div>
      </div>

      {/* Vertical Scrollbar */}
      {(direction === 'vertical' || direction === 'both') && (
        <div
          className={cn(
            'absolute right-0 top-0 w-2 h-full transition-opacity duration-200 z-10',
            scrollbarVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className={cn(
              'absolute right-0 top-0 w-full rounded-sm transition-all duration-200',
              'bg-gray-200 dark:bg-gray-800'
            )}
            style={{ height: '100%', ...scrollbarStyle?.track }}
          />
          <div
            ref={verticalThumbRef}
            className={cn(
              'absolute right-0 top-0 w-full rounded-sm cursor-pointer transition-all duration-200',
              'bg-brand/50 hover:bg-brand dark:hover:bg-brand',
              isDragging || isTouchDragging ? 'bg-brand/50' : '',
              isScrolling ? 'bg-brand/50' : '',
              // Mobile-specific classes
              'mobile-touch-target',
              'mobile-active'
            )}
            style={scrollbarStyle?.thumb}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        </div>
      )}

      {/* Horizontal Scrollbar */}
      {(direction === 'horizontal' || direction === 'both') && (
        <div
          className={cn(
            'absolute bottom-0 left-0 h-2 w-full transition-opacity duration-200 z-10',
            scrollbarVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className={cn(
              'absolute bottom-0 left-0 h-full rounded-sm transition-all duration-200',
              'bg-gray-200 dark:bg-gray-800'
            )}
            style={{ width: '100%', ...scrollbarStyle?.track }}
          />
          <div
            ref={horizontalThumbRef}
            className={cn(
              'absolute bottom-0 left-0 h-full rounded-sm cursor-pointer transition-all duration-200',
              'bg-brand/50 hover:bg-brand dark:hover:bg-brand',
              isDragging || isTouchDragging ? 'bg-brand/50' : '',
              isScrolling ? 'bg-brand/50' : '',
              // Mobile-specific classes
              'mobile-touch-target',
              'mobile-active'
            )}
            style={scrollbarStyle?.thumb}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        </div>
      )}
    </div>
  );
}

export default Scrollbar;
