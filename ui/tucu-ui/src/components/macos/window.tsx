import { useState, useRef, useCallback, useEffect } from 'react';
import cn from 'classnames';

// ─── Traffic Lights ────────────────────────────────────────────

interface TrafficLightsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
}: TrafficLightsProps) {
  return (
    <div className="group flex items-center gap-2">
      <button
        onClick={onClose}
        aria-label="Close"
        className={cn(
          'flex h-3 w-3 items-center justify-center rounded-full transition-[filter]',
          'bg-[var(--macos-traffic-close)] hover:brightness-90'
        )}
      >
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
      </button>

      <button
        onClick={onMinimize}
        aria-label="Minimize"
        className={cn(
          'flex h-3 w-3 items-center justify-center rounded-full transition-[filter]',
          'bg-[var(--macos-traffic-minimize)] hover:brightness-90'
        )}
      >
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
      </button>

      <button
        onClick={onMaximize}
        aria-label="Maximize"
        className={cn(
          'flex h-3 w-3 items-center justify-center rounded-full transition-[filter]',
          'bg-[var(--macos-traffic-maximize)] hover:brightness-90'
        )}
      >
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

// ─── MacOSWindow ───────────────────────────────────────────────

export interface MacOSWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleBarClassName?: string;
  showTrafficLights?: boolean;
  trafficLightsPosition?: 'left' | 'right';
  actions?: React.ReactNode;
  /** Allow drag-moving by the title bar (default: true) */
  draggable?: boolean;
  /** Allow resizing from edges/corners (default: true) */
  resizable?: boolean;
  /** Initial width */
  defaultWidth?: number | string;
  /** Initial height */
  defaultHeight?: number | string;
  /** Minimum width in px (default: 200) */
  minWidth?: number;
  /** Minimum height in px (default: 120) */
  minHeight?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export function MacOSWindow({
  title,
  children,
  className,
  titleBarClassName,
  showTrafficLights = true,
  trafficLightsPosition = 'left',
  actions,
  draggable = true,
  resizable = true,
  defaultWidth,
  defaultHeight,
  minWidth = 200,
  minHeight = 120,
  onClose,
  onMinimize,
  onMaximize,
}: MacOSWindowProps) {
  const lightsLeft = showTrafficLights && trafficLightsPosition === 'left';
  const lightsRight = showTrafficLights && trafficLightsPosition === 'right';

  const windowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Position & size state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState<{ w: number | null; h: number | null }>({
    w: null,
    h: null,
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Refs for drag/resize tracking (avoids stale closure)
  const dragStart = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const resizeStart = useRef({
    mx: 0,
    my: 0,
    w: 0,
    h: 0,
    ox: 0,
    oy: 0,
    edge: '' as ResizeEdge,
  });
  const preMaxState = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // ── Drag handlers ──────────────────────────────────────────

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable || isMaximized) return;
      // Only drag from title bar (not from buttons)
      if ((e.target as HTMLElement).closest('button')) return;
      e.preventDefault();
      dragStart.current = {
        mx: e.clientX,
        my: e.clientY,
        ox: pos.x,
        oy: pos.y,
      };
      setIsDragging(true);
    },
    [draggable, isMaximized, pos.x, pos.y]
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const { mx, my, ox, oy } = dragStart.current;
      setPos({ x: ox + (e.clientX - mx), y: oy + (e.clientY - my) });
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  // ── Resize handlers ────────────────────────────────────────

  const onResizeStart = useCallback(
    (edge: ResizeEdge, e: React.MouseEvent) => {
      if (!resizable || isMaximized) return;
      e.preventDefault();
      e.stopPropagation();
      const el = windowRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      resizeStart.current = {
        mx: e.clientX,
        my: e.clientY,
        w: rect.width,
        h: rect.height,
        ox: pos.x,
        oy: pos.y,
        edge,
      };
      setIsResizing(true);
    },
    [resizable, isMaximized, pos.x, pos.y]
  );

  useEffect(() => {
    if (!isResizing) return;
    const onMove = (e: MouseEvent) => {
      const { mx, my, w, h, ox, oy, edge } = resizeStart.current;
      const dx = e.clientX - mx;
      const dy = e.clientY - my;
      let newW = w;
      let newH = h;
      let newX = ox;
      let newY = oy;

      if (edge.includes('e')) newW = Math.max(minWidth, w + dx);
      if (edge.includes('w')) {
        newW = Math.max(minWidth, w - dx);
        newX = ox + (w - newW);
      }
      if (edge.includes('s')) newH = Math.max(minHeight, h + dy);
      if (edge.includes('n')) {
        newH = Math.max(minHeight, h - dy);
        newY = oy + (h - newH);
      }

      setSize({ w: newW, h: newH });
      setPos({ x: newX, y: newY });
    };
    const onUp = () => setIsResizing(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isResizing, minWidth, minHeight]);

  // ── Maximize / Minimize ────────────────────────────────────

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      // Restore
      setPos({ x: preMaxState.current.x, y: preMaxState.current.y });
      setSize({
        w: preMaxState.current.w || null,
        h: preMaxState.current.h || null,
      });
      setIsMaximized(false);
    } else {
      // Save current state
      const el = windowRef.current;
      const rect = el?.getBoundingClientRect();
      preMaxState.current = {
        x: pos.x,
        y: pos.y,
        w: rect?.width ?? 0,
        h: rect?.height ?? 0,
      };
      setPos({ x: 0, y: 0 });
      setSize({ w: null, h: null }); // null = fill container
      setIsMaximized(true);
    }
    onMaximize?.();
  }, [isMaximized, pos.x, pos.y, onMaximize]);

  const handleMinimize = useCallback(() => {
    if (isMaximized) {
      setPos({ x: preMaxState.current.x, y: preMaxState.current.y });
      setSize({
        w: preMaxState.current.w || null,
        h: preMaxState.current.h || null,
      });
      setIsMaximized(false);
    }
    onMinimize?.();
  }, [isMaximized, onMinimize]);

  // ── Inline style ───────────────────────────────────────────

  const windowStyle: React.CSSProperties = isMaximized
    ? { inset: 0, width: '100%', height: '100%', position: 'absolute' }
    : {
        position: 'relative' as const,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        ...(size.w != null
          ? { width: size.w }
          : defaultWidth != null
          ? { width: defaultWidth }
          : {}),
        ...(size.h != null
          ? { height: size.h }
          : defaultHeight != null
          ? { height: defaultHeight }
          : {}),
      };

  // ── Resize handles ─────────────────────────────────────────

  const handleSize = 6;
  const cornerSize = 12;

  const resizeHandles = resizable && !isMaximized && (
    <>
      {/* Edges */}
      <div
        className={cn(
          'absolute top-0 left-[6px] right-[6px] z-20',
          cursorMap.n
        )}
        style={{ height: handleSize }}
        onMouseDown={(e) => onResizeStart('n', e)}
      />
      <div
        className={cn(
          'absolute bottom-0 left-[6px] right-[6px] z-20',
          cursorMap.s
        )}
        style={{ height: handleSize }}
        onMouseDown={(e) => onResizeStart('s', e)}
      />
      <div
        className={cn(
          'absolute left-0 top-[6px] bottom-[6px] z-20',
          cursorMap.w
        )}
        style={{ width: handleSize }}
        onMouseDown={(e) => onResizeStart('w', e)}
      />
      <div
        className={cn(
          'absolute right-0 top-[6px] bottom-[6px] z-20',
          cursorMap.e
        )}
        style={{ width: handleSize }}
        onMouseDown={(e) => onResizeStart('e', e)}
      />
      {/* Corners */}
      <div
        className={cn('absolute top-0 left-0 z-30', cursorMap.nw)}
        style={{ width: cornerSize, height: cornerSize }}
        onMouseDown={(e) => onResizeStart('nw', e)}
      />
      <div
        className={cn('absolute top-0 right-0 z-30', cursorMap.ne)}
        style={{ width: cornerSize, height: cornerSize }}
        onMouseDown={(e) => onResizeStart('ne', e)}
      />
      <div
        className={cn('absolute bottom-0 left-0 z-30', cursorMap.sw)}
        style={{ width: cornerSize, height: cornerSize }}
        onMouseDown={(e) => onResizeStart('sw', e)}
      />
      <div
        className={cn('absolute bottom-0 right-0 z-30', cursorMap.se)}
        style={{ width: cornerSize, height: cornerSize }}
        onMouseDown={(e) => onResizeStart('se', e)}
      />
    </>
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={isMaximized ? { width: '100%', height: '100%' } : undefined}
    >
      <div
        ref={windowRef}
        style={windowStyle}
        className={cn(
          'flex flex-col',
          'rounded-[var(--macos-radius-xl,10px)]',
          'bg-[var(--color-semantic-elevation-1)]',
          'border border-[var(--color-semantic-line-primary-subtle)]',
          'shadow-[var(--shadow-main)]',
          isMaximized && 'rounded-none',
          (isDragging || isResizing) && 'select-none',
          className
        )}
      >
        {/* Resize handles */}
        {resizeHandles}

        {/* Title bar */}
        <div
          onMouseDown={onDragStart}
          onDoubleClick={handleMaximize}
          className={cn(
            'flex h-[var(--macos-titlebar-height,52px)] shrink-0 items-center gap-3 px-4',
            'rounded-t-[var(--macos-radius-xl,10px)]',
            'bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl',
            'border-b border-[var(--color-semantic-line-primary-subtle)]',
            'select-none',
            draggable && !isMaximized && 'cursor-grab',
            isDragging && 'cursor-grabbing',
            isMaximized && 'rounded-t-none',
            titleBarClassName
          )}
        >
          {lightsLeft && (
            <TrafficLights
              onClose={onClose}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
            />
          )}

          <span className="flex-1 text-center text-[13px] font-semibold text-gray-700 dark:text-gray-200">
            {title}
          </span>

          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}

          {lightsRight && (
            <TrafficLights
              onClose={onClose}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default MacOSWindow;
