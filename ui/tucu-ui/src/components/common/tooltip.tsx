'use client';

import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import { cn } from '../../libs/cn';
import { useTheme } from '../../themes/hooks/use-theme';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipSize = 'xs' | 'sm' | 'md';
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
  /** Font size and padding of the tooltip */
  size?: TooltipSize;
  /** Additional class name for the tooltip container */
  className?: string;
  /** Additional class name for the tooltip content box (merged after size and color classes) */
  contentClassName?: string;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
}

const colorStyles: Record<TooltipColor, string> = {
  dark: 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
  light:
    'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-border',
  primary: 'bg-brand text-white',
  success: 'bg-green-700 text-white',
  info: 'bg-blue-600 text-white',
  warning: 'bg-yellow-700 text-white',
  danger: 'bg-red-600 text-white',
};

const tokenBubbleStyle =
  'bg-[color:var(--tucu-tooltip-bg)] text-[color:var(--tucu-tooltip-fg)] ring-1 ring-[color:var(--tucu-tooltip-border)]';
const tokenArrowStyle = 'text-[color:var(--tucu-tooltip-bg)]';
const tokenArrowBorderStyle = 'text-[color:var(--tucu-tooltip-border)]';

const arrowColorStyles: Record<TooltipColor, string> = {
  dark: 'text-gray-900 dark:text-gray-100',
  light: 'text-white dark:text-gray-800',
  primary: 'text-brand',
  success: 'text-green-700',
  info: 'text-blue-600',
  warning: 'text-yellow-700',
  danger: 'text-red-600',
};

const sizeStyles: Record<TooltipSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
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
    const pos = calcForPlacement(anchorRect, tooltipRect, p);
    if (fitsInViewport(pos, tooltipRect, vw, vh)) {
      return { ...pos, actualPlacement: p };
    }
  }

  return {
    ...calcForPlacement(anchorRect, tooltipRect, placement),
    actualPlacement: placement,
  };
}

function calcForPlacement(
  a: DOMRect,
  t: DOMRect,
  p: TooltipPlacement
): Omit<Position, 'actualPlacement'> {
  const centerX = a.left + a.width / 2;
  const centerY = a.top + a.height / 2;

  let top = 0;
  let left = 0;
  let arrowTop = 0;
  let arrowLeft = 0;
  let arrowRotation = '';

  switch (p) {
    case 'top':
      top = a.top - t.height - OFFSET;
      left = centerX - t.width / 2;
      arrowTop = t.height - 1;
      arrowLeft = t.width / 2 - ARROW_SIZE;
      arrowRotation = 'rotate(180deg)';
      break;
    case 'bottom':
      top = a.bottom + OFFSET;
      left = centerX - t.width / 2;
      arrowTop = -ARROW_SIZE * 2 + 1;
      arrowLeft = t.width / 2 - ARROW_SIZE;
      arrowRotation = 'rotate(0deg)';
      break;
    case 'left':
      top = centerY - t.height / 2;
      left = a.left - t.width - OFFSET;
      arrowTop = t.height / 2 - ARROW_SIZE;
      arrowLeft = t.width - 1;
      arrowRotation = 'rotate(90deg)';
      break;
    case 'right':
      top = centerY - t.height / 2;
      left = a.right + OFFSET;
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
  vh: number
): boolean {
  const minX = 0;
  const minY = 0;
  const maxX = vw;
  const maxY = vh;
  return (
    pos.left >= minX &&
    pos.left + t.width <= maxX &&
    pos.top >= minY &&
    pos.top + t.height <= maxY
  );
}

/**
 * Tooltip component that is always present in the DOM and hidden while closed.
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
  size = 'md',
  className,
  contentClassName,
  children,
}: TooltipProps) {
  const { mode } = useTheme();
  const usesTokens = color === undefined;
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

  useEffect(() => {
    if (visible && tooltipRef.current) {
      updatePosition();
    }
  }, [visible, updatePosition]);

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
    'aria-describedby': tooltipId,
  } as Partial<React.HTMLAttributes<HTMLElement>>);

  const tooltipNode = (
    <div
      ref={tooltipRef}
      id={tooltipId}
      role="tooltip"
      data-tucu="tooltip"
      data-color={usesTokens ? 'auto' : resolvedColor}
      data-size={size}
      hidden={!visible}
      aria-hidden={!visible}
      className={cn(
        'fixed z-99999 max-w-xs rounded-lg shadow-lg pointer-events-none',
        'animate-in fade-in duration-150',
        sizeStyles[size],
        usesTokens ? tokenBubbleStyle : colorStyles[resolvedColor],
        className,
        contentClassName
      )}
      style={
        position
          ? { top: position.top, left: position.left }
          : { top: -9999, left: -9999 }
      }
    >
      {content}
      {arrow && position && (
        <svg
          className={cn(
            'absolute pointer-events-none',
            usesTokens ? tokenArrowStyle : arrowColorStyles[resolvedColor]
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
      {arrow && position && (usesTokens || resolvedColor === 'light') && (
        <svg
          className={cn(
            'absolute pointer-events-none',
            usesTokens
              ? tokenArrowBorderStyle
              : 'text-gray-200 dark:text-gray-700'
          )}
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
    </div>
  );

  return (
    <>
      {triggerElement}
      {tooltipNode}
    </>
  );
}

Tooltip.displayName = 'Tooltip';

export default Tooltip;
