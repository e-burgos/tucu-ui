import cn from 'classnames';

// ─── Traffic Lights ────────────────────────────────────────────

interface TrafficLightsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

function TrafficLights({ onClose, onMinimize, onMaximize }: TrafficLightsProps) {
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
          width="6" height="6" viewBox="0 0 6 6"
          fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round"
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
          width="6" height="2" viewBox="0 0 6 2"
          fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round"
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
          width="6" height="6" viewBox="0 0 6 6"
          fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.1"
        >
          <path d="M1 5L5 1M3 1h2v2M1 3V5h2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

// ─── MacOSWindow ───────────────────────────────────────────────

export interface MacOSWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleBarClassName?: string;
  showTrafficLights?: boolean;
  trafficLightsPosition?: 'left' | 'right';
  actions?: React.ReactNode;
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
  onClose,
  onMinimize,
  onMaximize,
}: MacOSWindowProps) {
  const lightsLeft = showTrafficLights && trafficLightsPosition === 'left';
  const lightsRight = showTrafficLights && trafficLightsPosition === 'right';

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl',
        'bg-[var(--color-semantic-elevation-1)]',
        'border border-[var(--color-semantic-line-primary-subtle)]',
        'shadow-[var(--shadow-main)]',
        className
      )}
    >
      {/* Title bar */}
      <div
        className={cn(
          'flex h-[var(--macos-titlebar-height,52px)] items-center gap-3 px-4',
          'bg-[var(--macos-material-toolbar,rgba(255,255,255,0.72))] backdrop-blur-xl',
          'border-b border-[var(--color-semantic-line-primary-subtle)]',
          'select-none',
          titleBarClassName
        )}
      >
        {lightsLeft && (
          <TrafficLights onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        )}

        <span className="flex-1 text-center text-[13px] font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </span>

        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}

        {lightsRight && (
          <TrafficLights onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}

export default MacOSWindow;
