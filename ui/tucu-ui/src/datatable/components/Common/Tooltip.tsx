import { CSSProperties, useEffect, useRef, useState } from 'react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

/**
 * Tooltip position options
 * @category libs/datatable
 * @subcategory Components
 */
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

/**
 * TooltipProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {ReactNode} children - The trigger element that will show the tooltip on hover
 * @property {string} text - The text content to display in the tooltip
 * @property {CSSProperties} [style] - Optional custom styles for the trigger wrapper
 * @property {TooltipPosition} [position] - Preferred position of the tooltip (default: 'auto')
 * @property {number} [delay] - Delay in milliseconds before showing the tooltip (default: 0)
 */
interface TooltipProps {
  children: ReactNode;
  text: string;
  style?: CSSProperties;
  position?: TooltipPosition;
  delay?: number;
}

/**
 * Tooltip component that displays a text tooltip on hover.
 * Supports automatic positioning to avoid viewport overflow and uses CSS variables for theming.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @param {TooltipProps} props - The component props
 * @returns {JSX.Element} The tooltip component
 */
export function Tooltip({
  children,
  text,
  style = {},
  position = 'auto',
  delay = 0,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
    placement: 'top' | 'bottom' | 'left' | 'right';
  }>({ top: 0, left: 0, placement: 'top' });
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate optimal position for tooltip
  const calculatePosition = (
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    preferredPosition: TooltipPosition
  ): {
    top: number;
    left: number;
    placement: 'top' | 'bottom' | 'left' | 'right';
  } => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const spacing = 8;
    let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

    if (preferredPosition === 'auto') {
      // Auto-detect best position based on available space
      const spaceTop = triggerRect.top;
      const spaceBottom = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;

      const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);

      if (maxSpace === spaceTop) placement = 'top';
      else if (maxSpace === spaceBottom) placement = 'bottom';
      else if (maxSpace === spaceLeft) placement = 'left';
      else placement = 'right';
    } else {
      placement = preferredPosition as 'top' | 'bottom' | 'left' | 'right';
    }

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - spacing;
        left = triggerRect.left + triggerRect.width / 2;
        // Adjust if tooltip goes off screen
        if (left - tooltipRect.width / 2 < 0) {
          left = tooltipRect.width / 2;
        } else if (left + tooltipRect.width / 2 > viewportWidth) {
          left = viewportWidth - tooltipRect.width / 2;
        }
        break;
      case 'bottom':
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + triggerRect.width / 2;
        if (left - tooltipRect.width / 2 < 0) {
          left = tooltipRect.width / 2;
        } else if (left + tooltipRect.width / 2 > viewportWidth) {
          left = viewportWidth - tooltipRect.width / 2;
        }
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2;
        left = triggerRect.left - tooltipRect.width - spacing;
        if (top - tooltipRect.height / 2 < 0) {
          top = tooltipRect.height / 2;
        } else if (top + tooltipRect.height / 2 > viewportHeight) {
          top = viewportHeight - tooltipRect.height / 2;
        }
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2;
        left = triggerRect.right + spacing;
        if (top - tooltipRect.height / 2 < 0) {
          top = tooltipRect.height / 2;
        } else if (top + tooltipRect.height / 2 > viewportHeight) {
          top = viewportHeight - tooltipRect.height / 2;
        }
        break;
    }

    return { top, left, placement };
  };

  useEffect(() => {
    if (!visible || !triggerRef.current) {
      setIsPositionCalculated(false);
      return;
    }

    // Use requestAnimationFrame to ensure the tooltip is rendered and has dimensions
    const updatePosition = () => {
      if (triggerRef.current && tooltipRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        // Only calculate if tooltip has valid dimensions
        if (tooltipRect.width > 0 && tooltipRect.height > 0) {
          const newPosition = calculatePosition(
            triggerRect,
            tooltipRect,
            position
          );
          setTooltipPosition(newPosition);
          setIsPositionCalculated(true);
        } else {
          // Retry on next frame if dimensions aren't ready
          requestAnimationFrame(updatePosition);
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updatePosition);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [visible, position]);

  // Handle scroll and resize to update position
  useEffect(() => {
    if (!visible) return;

    const updatePosition = () => {
      if (triggerRef.current && tooltipRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const newPosition = calculatePosition(
          triggerRect,
          tooltipRect,
          position
        );
        setTooltipPosition(newPosition);
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [visible, position]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, delay);
    } else {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
    setIsPositionCalculated(false);
  };

  if (!text) {
    return <>{children}</>;
  }

  const getTransform = () => {
    switch (tooltipPosition.placement) {
      case 'top':
        return 'translate(-50%, -100%)';
      case 'bottom':
        return 'translate(-50%, 0)';
      case 'left':
        return 'translate(-100%, -50%)';
      case 'right':
        return 'translate(0, -50%)';
      default:
        return 'translate(-50%, -100%)';
    }
  };

  const getArrowStyle = (): CSSProperties => {
    const arrowSize = 6;
    const baseStyle: CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    switch (tooltipPosition.placement) {
      case 'top':
        return {
          ...baseStyle,
          bottom: -arrowSize,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
          borderColor: `var(--color-table-header-bg, #2a2d31) transparent transparent transparent`,
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: -arrowSize,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
          borderColor: `transparent transparent var(--color-table-header-bg, #2a2d31) transparent`,
        };
      case 'left':
        return {
          ...baseStyle,
          right: -arrowSize,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
          borderColor: `transparent transparent transparent var(--color-table-header-bg, #2a2d31)`,
        };
      case 'right':
        return {
          ...baseStyle,
          left: -arrowSize,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
          borderColor: `transparent var(--color-table-header-bg, #2a2d31) transparent transparent`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-block', ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        role="tooltip"
        aria-label={text}
      >
        {children}
      </div>
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            aria-hidden={!visible}
            style={{
              position: 'fixed',
              top: isPositionCalculated
                ? `${tooltipPosition.top}px`
                : '-9999px',
              left: isPositionCalculated
                ? `${tooltipPosition.left}px`
                : '-9999px',
              transform: getTransform(),
              padding: '6px 12px',
              borderRadius: '4px',
              background: 'var(--color-table-header-bg, #2a2d31)',
              color: 'var(--color-table-primary-text, #ffffff)',
              fontSize: '12px',
              lineHeight: '16px',
              whiteSpace: 'nowrap',
              zIndex: 9999,
              pointerEvents: 'none',
              opacity: isPositionCalculated && visible ? 1 : 0,
              visibility: isPositionCalculated ? 'visible' : 'hidden',
              transition: 'opacity 0.15s ease-in-out',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              fontFamily: 'var(--font-family-table, Inter, sans-serif)',
            }}
          >
            {text}
            <div style={getArrowStyle()} />
          </div>,
          document.body
        )}
    </>
  );
}
