import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { useTheme } from '../../themes/hooks/use-theme';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipColor =
  | 'dark'
  | 'light'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export interface TooltipProps {
  /** Content to display inside the tooltip */
  content: React.ReactNode;
  /** Preferred placement of the tooltip relative to anchor */
  placement?: TooltipPlacement;
  /** Color theme of the tooltip. When undefined, automatically uses 'dark' in light mode and 'light' in dark mode based on the current theme. */
  color?: TooltipColor;
  /** Show an arrow pointing to the anchor */
  arrow?: boolean;
  /** Delay in ms before the tooltip appears */
  enterDelay?: number;
  /** Delay in ms before the tooltip hides */
  leaveDelay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional class name for the tooltip container */
  className?: string;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
}

const colorStyles: Record<TooltipColor, string> = {
  dark: 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
  light:
    'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700',
  primary: 'bg-brand text-white',
  success: 'bg-green-500 text-white',
  info: 'bg-blue-500 text-white',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
};

const arrowColorStyles: Record<TooltipColor, string> = {
  dark: 'text-gray-900 dark:text-gray-100',
  light: 'text-white dark:text-gray-800',
  primary: 'text-brand',
  success: 'text-green-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
};

const ARROW_SIZE = 6;
const OFFSET = 8;

interface Position {
  top: number;
  left: number;
  arrowTop: number;
  arrowLeft: number;
  arrowRotation: string;
  actualPlacement: TooltipPlacement;
}

function computePosition(
  anchorRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement
): Position {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const placements: TooltipPlacement[] = [placement];
  const opposite: Record<TooltipPlacement, TooltipPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  placements.push(opposite[placement]);
  const remaining: TooltipPlacement[] = (
    ['top', 'bottom', 'left', 'right'] as TooltipPlacement[]
  ).filter((p) => !placements.includes(p));
  placements.push(...remaining);

  for (const p of placements) {
    const pos = calcForPlacement(anchorRect, tooltipRect, p, scrollX, scrollY);
    if (fitsInViewport(pos, tooltipRect, vw, vh, scrollX, scrollY)) {
      return { ...pos, actualPlacement: p };
    }
  }

  // Fallback: use preferred placement, clamped
  return {
    ...calcForPlacement(anchorRect, tooltipRect, placement, scrollX, scrollY),
    actualPlacement: placement,
  };
}

function calcForPlacement(
  a: DOMRect,
  t: DOMRect,
  p: TooltipPlacement,
  scrollX: number,
  scrollY: number
): Omit<Position, 'actualPlacement'> {
  const centerX = a.left + a.width / 2 + scrollX;
  const centerY = a.top + a.height / 2 + scrollY;

  let top = 0;
  let left = 0;
  let arrowTop = 0;
  let arrowLeft = 0;
  let arrowRotation = '';

  switch (p) {
    case 'top':
      top = a.top + scrollY - t.height - OFFSET;
      left = centerX - t.width / 2;
      arrowTop = t.height - 1;
      arrowLeft = t.width / 2 - ARROW_SIZE;
      arrowRotation = 'rotate(180deg)';
      break;
    case 'bottom':
      top = a.bottom + scrollY + OFFSET;
      left = centerX - t.width / 2;
      arrowTop = -ARROW_SIZE * 2 + 1;
      arrowLeft = t.width / 2 - ARROW_SIZE;
      arrowRotation = 'rotate(0deg)';
      break;
    case 'left':
      top = centerY - t.height / 2;
      left = a.left + scrollX - t.width - OFFSET;
      arrowTop = t.height / 2 - ARROW_SIZE;
      arrowLeft = t.width - 1;
      arrowRotation = 'rotate(90deg)';
      break;
    case 'right':
      top = centerY - t.height / 2;
      left = a.right + scrollX + OFFSET;
      arrowTop = t.height / 2 - ARROW_SIZE;
      arrowLeft = -ARROW_SIZE * 2 + 1;
      arrowRotation = 'rotate(-90deg)';
      break;
  }

  return { top, left, arrowTop, arrowLeft, arrowRotation };
}

function fitsInViewport(
  pos: Omit<Position, 'actualPlacement'>,
  t: DOMRect,
  vw: number,
  vh: number,
  scrollX: number,
  scrollY: number
): boolean {
  const minX = scrollX;
  const minY = scrollY;
  const maxX = scrollX + vw;
  const maxY = scrollY + vh;
  return (
    pos.left >= minX &&
    pos.left + t.width <= maxX &&
    pos.top >= minY &&
    pos.top + t.height <= maxY
  );
}

/**
 * Tooltip component that uses a React Portal to render above all other DOM elements.
 * Supports configurable placement, arrow, color theme, and enter/leave delays.
 *
 * @example
 * ```tsx
 * <Tooltip content="Hello!" placement="top" arrow>
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content,
  placement = 'top',
  color,
  arrow = true,
  enterDelay = 0,
  leaveDelay = 100,
  disabled = false,
  className,
  children,
}: TooltipProps) {
  const { mode } = useTheme();
  const resolvedColor: TooltipColor =
    color ?? (mode === 'dark' ? 'light' : 'dark');
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const clearTimers = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    if (!anchorRef.current || !tooltipRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setPosition(computePosition(anchorRect, tooltipRect, placement));
  }, [placement]);

  const handleShow = useCallback(() => {
    if (disabled) return;
    clearTimers();
    if (enterDelay > 0) {
      enterTimerRef.current = setTimeout(() => setVisible(true), enterDelay);
    } else {
      setVisible(true);
    }
  }, [disabled, enterDelay, clearTimers]);

  const handleHide = useCallback(() => {
    clearTimers();
    if (leaveDelay > 0) {
      leaveTimerRef.current = setTimeout(() => setVisible(false), leaveDelay);
    } else {
      setVisible(false);
    }
  }, [leaveDelay, clearTimers]);

  // Reposition on scroll/resize while visible
  useEffect(() => {
    if (!visible) return;
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [visible, updatePosition]);

  // Measure tooltip after it mounts
  useEffect(() => {
    if (visible && tooltipRef.current) {
      updatePosition();
    }
  }, [visible, updatePosition]);

  // Cleanup timers on unmount
  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const actualPlacement = position?.actualPlacement ?? placement;

  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >;
  const triggerElement = React.cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      anchorRef.current = node;
      // Forward ref if the child had one
      const childRef = (
        child as React.ReactElement & { ref?: React.Ref<HTMLElement> }
      ).ref;
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef && typeof childRef === 'object') {
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      handleShow();
      child.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      handleHide();
      child.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      handleShow();
      child.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      handleHide();
      child.props.onBlur?.(e);
    },
    'aria-describedby': visible ? tooltipId : undefined,
  } as Partial<React.HTMLAttributes<HTMLElement>>);

  const tooltipNode = visible
    ? createPortal(
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={cn(
            'fixed z-99999 max-w-xs px-3 py-1.5 text-sm rounded-lg shadow-lg pointer-events-none',
            'animate-in fade-in duration-150',
            colorStyles[resolvedColor],
            className
          )}
          style={
            position
              ? {
                  position: 'absolute',
                  top: position.top,
                  left: position.left,
                }
              : {
                  position: 'absolute',
                  top: -9999,
                  left: -9999,
                }
          }
        >
          {content}
          {arrow && position && (
            <svg
              className={cn(
                'absolute pointer-events-none',
                arrowColorStyles[resolvedColor]
              )}
              style={{
                top: position.arrowTop,
                left: position.arrowLeft,
                transform: position.arrowRotation,
              }}
              width={ARROW_SIZE * 2}
              height={ARROW_SIZE * 2}
              viewBox={`0 0 ${ARROW_SIZE * 2} ${ARROW_SIZE * 2}`}
            >
              <polygon
                points={`0,0 ${ARROW_SIZE * 2},0 ${ARROW_SIZE},${ARROW_SIZE}`}
                fill="currentColor"
              />
            </svg>
          )}
          {/* Border arrow for light variant */}
          {arrow && position && resolvedColor === 'light' && (
            <svg
              className="absolute pointer-events-none text-gray-200 dark:text-gray-700"
              style={{
                top:
                  position.arrowTop +
                  (actualPlacement === 'top'
                    ? 1
                    : actualPlacement === 'bottom'
                    ? -1
                    : 0),
                left:
                  position.arrowLeft +
                  (actualPlacement === 'left'
                    ? 1
                    : actualPlacement === 'right'
                    ? -1
                    : 0),
                transform: position.arrowRotation,
                zIndex: -1,
              }}
              width={ARROW_SIZE * 2}
              height={ARROW_SIZE * 2}
              viewBox={`0 0 ${ARROW_SIZE * 2} ${ARROW_SIZE * 2}`}
            >
              <polygon
                points={`0,0 ${ARROW_SIZE * 2},0 ${ARROW_SIZE},${ARROW_SIZE}`}
                fill="currentColor"
              />
            </svg>
          )}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {triggerElement}
      {tooltipNode}
    </>
  );
}

Tooltip.displayName = 'Tooltip';

export default Tooltip;
