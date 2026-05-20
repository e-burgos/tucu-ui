import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

// ─── Traffic Lights (Tahoe) ────────────────────────────────────

interface TrafficLightsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  disableClose?: boolean;
  disableMinimize?: boolean;
  disableMaximize?: boolean;
}

function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
  disableClose,
  disableMinimize,
  disableMaximize,
}: TrafficLightsProps) {
  return (
    <div data-tucu="traffic-lights" className="group flex items-center gap-[8px]">
      <button
        data-tucu="traffic-light"
        data-type="close"
        onClick={onClose}
        disabled={disableClose}
        aria-label="Close"
        className={cn(
          'flex h-[12px] w-[12px] items-center justify-center rounded-full transition-[filter]',
          disableClose
            ? 'bg-gray-400/40 cursor-not-allowed'
            : 'bg-(--macos-traffic-close) hover:brightness-90'
        )}
      >
        {!disableClose && (
          <svg
            className="hidden group-hover:block"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <path d="M1 1l4 4M5 1L1 5" />
          </svg>
        )}
      </button>
      <button
        data-tucu="traffic-light"
        data-type="minimize"
        onClick={onMinimize}
        disabled={disableMinimize}
        aria-label="Minimize"
        className={cn(
          'flex h-[12px] w-[12px] items-center justify-center rounded-full transition-[filter]',
          disableMinimize
            ? 'bg-gray-400/40 cursor-not-allowed'
            : 'bg-(--macos-traffic-minimize) hover:brightness-90'
        )}
      >
        {!disableMinimize && (
          <svg
            className="hidden group-hover:block"
            width="6"
            height="2"
            viewBox="0 0 6 2"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <path d="M0.5 1h5" />
          </svg>
        )}
      </button>
      <button
        data-tucu="traffic-light"
        data-type="maximize"
        onClick={onMaximize}
        disabled={disableMaximize}
        aria-label="Maximize"
        className={cn(
          'flex h-[12px] w-[12px] items-center justify-center rounded-full transition-[filter]',
          disableMaximize
            ? 'bg-gray-400/40 cursor-not-allowed'
            : 'bg-(--macos-traffic-maximize) hover:brightness-90'
        )}
      >
        {!disableMaximize && (
          <svg
            className="hidden group-hover:block"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="1.1"
          >
            <path
              d="M1 5L5 1M3 1h2v2M1 3V5h2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

// ─── Resize handle edge type ───────────────────────────────────

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const cursorMap: Record<ResizeEdge, string> = {
  n: 'cursor-n-resize',
  s: 'cursor-s-resize',
  e: 'cursor-e-resize',
  w: 'cursor-w-resize',
  ne: 'cursor-ne-resize',
  nw: 'cursor-nw-resize',
  se: 'cursor-se-resize',
  sw: 'cursor-sw-resize',
};

// ─── Window state ──────────────────────────────────────────────

type WindowState = 'normal' | 'minimized' | 'fullscreen' | 'closed';

// ─── MacOSTahoeWindow ──────────────────────────────────────────

export interface MacOSTahoeWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleBarClassName?: string;
  showTrafficLights?: boolean;
  trafficLightsPosition?: 'left' | 'right';
  /** Callback when the window is closed via the red button */
  onClose?: () => void;
  /** Callback when the window is minimized via the yellow button */
  onMinimize?: () => void;
  /** Callback when the window is maximized via the green button */
  onMaximize?: () => void;
  /** Disable close (red) button */
  disableClose?: boolean;
  /** Disable minimize (yellow) button */
  disableMinimize?: boolean;
  /** Disable maximize (green) button */
  disableMaximize?: boolean;
  /** Enable full-screen toggle on second green-button click */
  fullSize?: boolean;
  /** Render as a portal so the window can move freely over the whole viewport */
  portal?: boolean;
  /** Allow dragging the window by its title bar */
  draggable?: boolean;
  /** Control the window state externally (useful for restoring after close) */
  defaultState?: WindowState;
  resizable?: boolean;
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
}

export function MacOSTahoeWindow({
  title,
  children,
  className,
  titleBarClassName,
  showTrafficLights = true,
  trafficLightsPosition = 'left',
  onClose,
  onMinimize,
  onMaximize,
  disableClose = false,
  disableMinimize = false,
  disableMaximize = false,
  fullSize = false,
  portal = false,
  draggable = false,
  defaultState = 'normal',
  resizable = false,
  width,
  height,
  minWidth = 200,
  minHeight = 120,
}: MacOSTahoeWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [windowState, setWindowState] = useState<WindowState>(defaultState);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const dragging = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  // Sync with external defaultState changes
  useEffect(() => {
    setWindowState(defaultState);
  }, [defaultState]);
  const resizing = useRef<{
    edge: ResizeEdge;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  } | null>(null);

  useEffect(() => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    setSize({ w: rect.width, h: rect.height });
  }, [width, height]);

  // ─── Traffic light handlers ────────────────────────────────

  const handleClose = () => {
    if (disableClose) return;
    setWindowState('closed');
    onClose?.();
  };

  const handleMinimize = () => {
    if (disableMinimize) return;
    setWindowState((prev) => {
      if (prev === 'fullscreen') return 'normal';
      if (prev === 'normal') return 'minimized';
      return 'normal'; // minimized → normal
    });
    onMinimize?.();
  };

  const handleMaximize = () => {
    if (disableMaximize) return;
    if (windowState === 'fullscreen') {
      setWindowState('normal');
    } else if (windowState === 'normal' && fullSize) {
      setWindowState('fullscreen');
    } else {
      // Restore to normal from minimized or any other state
      setWindowState('normal');
    }
    onMaximize?.();
  };

  // ─── Drag logic ────────────────────────────────────────────

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable || windowState === 'fullscreen') return;
      // Ignore clicks on traffic-light buttons
      if ((e.target as HTMLElement).closest('[data-tucu="traffic-light"]'))
        return;
      e.preventDefault();
      const rect = windowRef.current?.getBoundingClientRect();
      if (!rect) return;
      const originX = dragPos ? dragPos.x : rect.left;
      const originY = dragPos ? dragPos.y : rect.top;
      dragging.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX,
        originY,
      };

      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const dx = ev.clientX - dragging.current.startX;
        const dy = ev.clientY - dragging.current.startY;
        setDragPos({
          x: dragging.current.originX + dx,
          y: dragging.current.originY + dy,
        });
      };
      const onUp = () => {
        dragging.current = null;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [draggable, windowState, dragPos]
  );

  // ─── Resize logic ─────────────────────────────────────────

  const onResizeStart = useCallback(
    (edge: ResizeEdge) => (e: React.MouseEvent) => {
      if (!resizable || !windowRef.current || windowState === 'fullscreen')
        return;
      e.preventDefault();
      const rect = windowRef.current.getBoundingClientRect();
      resizing.current = {
        edge,
        startX: e.clientX,
        startY: e.clientY,
        startW: rect.width,
        startH: rect.height,
      };

      const onMove = (ev: MouseEvent) => {
        if (!resizing.current) return;
        const dx = ev.clientX - resizing.current.startX;
        const dy = ev.clientY - resizing.current.startY;
        let w = resizing.current.startW;
        let h = resizing.current.startH;
        if (edge.includes('e'))
          w = Math.max(minWidth, resizing.current.startW + dx);
        if (edge.includes('w'))
          w = Math.max(minWidth, resizing.current.startW - dx);
        if (edge.includes('s'))
          h = Math.max(minHeight, resizing.current.startH + dy);
        if (edge.includes('n'))
          h = Math.max(minHeight, resizing.current.startH - dy);
        setSize({ w, h });
      };
      const onUp = () => {
        resizing.current = null;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [resizable, minWidth, minHeight, windowState]
  );

  const edges: ResizeEdge[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

  // ─── Closed: render nothing ────────────────────────────────

  if (windowState === 'closed') return null;

  // ─── Compute styles ────────────────────────────────────────

  const isFullscreen = windowState === 'fullscreen';
  const isMinimized = windowState === 'minimized';

  const isDraggable = draggable && !isFullscreen;
  const needsPortal = portal || isFullscreen || (isDraggable && !!dragPos);

  const computedStyle: React.CSSProperties = isFullscreen
    ? { width: '100vw', height: '100vh' }
    : {
        width: resizable && size.w ? size.w : width,
        height: isMinimized ? undefined : resizable && size.h ? size.h : height,
        ...(isDraggable && dragPos
          ? {
              position: 'fixed' as const,
              left: dragPos.x,
              top: dragPos.y,
              zIndex: 9999,
            }
          : {}),
      };

  // ─── Window element ────────────────────────────────────────

  const windowElement = (
    <div
      ref={windowRef}
      data-tucu="tahoe-window"
      data-state={windowState}
      className={cn(
        'flex flex-col',
        'rounded-[16px]',
        'border border-(--macos-glass-border)',
        'bg-(--macos-glass-regular-bg) backdrop-blur-(--macos-glass-regular-blur,20px)',
        'shadow-(--macos-glass-shadow,0_8px_32px_rgba(0,0,0,0.12))',
        isFullscreen && 'fixed inset-0 z-50 rounded-none!',
        !isFullscreen && 'relative overflow-hidden',
        className
      )}
      style={{
        ...computedStyle,
        transition:
          'width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1), border-radius 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Title bar */}
      <div
        data-tucu="tahoe-window-titlebar"
        className={cn(
          'relative flex h-[52px] shrink-0 items-center gap-[12px] px-[20px]',
          'border-b border-(--macos-glass-border-subtle)',
          'bg-(--macos-glass-clear-bg)',
          'backdrop-blur-(--macos-glass-clear-blur,30px)',
          isMinimized && 'rounded-[16px] border-b-0',
          isDraggable && 'cursor-grab active:cursor-grabbing',
          titleBarClassName
        )}
        style={{
          transition: 'border-radius 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
        onMouseDown={isDraggable ? onDragStart : undefined}
      >
        {showTrafficLights && trafficLightsPosition === 'left' && (
          <TrafficLights
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            disableClose={disableClose}
            disableMinimize={disableMinimize}
            disableMaximize={disableMaximize}
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[13px] font-semibold tracking-[0.01em] text-(--macos-tahoe-text)">
          {title}
        </div>

        <div className="flex-1" />

        {showTrafficLights && trafficLightsPosition === 'right' && (
          <TrafficLights
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            disableClose={disableClose}
            disableMinimize={disableMinimize}
            disableMaximize={disableMaximize}
          />
        )}
      </div>

      {/* Content — animated collapse when minimized */}
      <div
        className="overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateRows: isMinimized ? '0fr' : '1fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="min-h-0 overflow-auto">{children}</div>
      </div>

      {/* Resize handles */}
      {resizable &&
        !isFullscreen &&
        !isMinimized &&
        edges.map((edge) => (
          <div
            key={edge}
            onMouseDown={onResizeStart(edge)}
            className={cn(
              'absolute z-10',
              cursorMap[edge],
              edge === 'n' && 'inset-x-0 top-0 h-[4px]',
              edge === 's' && 'inset-x-0 bottom-0 h-[4px]',
              edge === 'e' && 'inset-y-0 right-0 w-[4px]',
              edge === 'w' && 'inset-y-0 left-0 w-[4px]',
              edge === 'ne' && 'right-0 top-0 h-[12px] w-[12px]',
              edge === 'nw' && 'left-0 top-0 h-[12px] w-[12px]',
              edge === 'se' && 'bottom-0 right-0 h-[12px] w-[12px]',
              edge === 'sw' && 'bottom-0 left-0 h-[12px] w-[12px]'
            )}
          />
        ))}
    </div>
  );

  // ─── Portal wrapper ────────────────────────────────────────

  if (needsPortal) {
    return createPortal(windowElement, document.body);
  }

  return windowElement;
}

export default MacOSTahoeWindow;
