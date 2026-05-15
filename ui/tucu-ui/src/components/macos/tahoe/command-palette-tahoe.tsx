import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';

export interface MacOSTahoeCommandPaletteItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  onSelect?: () => void;
}

export interface MacOSTahoeCommandPaletteProps {
  items: MacOSTahoeCommandPaletteItem[];
  placeholder?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerKey?: string;
  className?: string;
}

export function MacOSTahoeCommandPalette({
  items,
  placeholder = 'Type a command or search…',
  open,
  onOpenChange,
  triggerKey = 'k',
  className,
}: MacOSTahoeCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === triggerKey) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange, triggerKey]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Filter items
  const filtered = useMemo(() => {
    if (!query) return items;
    const lq = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lq) ||
        item.group?.toLowerCase().includes(lq)
    );
  }, [items, query]);

  // Group items
  const groups = useMemo(() => {
    const map = new Map<string, MacOSTahoeCommandPaletteItem[]>();
    for (const item of filtered) {
      const g = item.group || '';
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(item);
    }
    return map;
  }, [filtered]);

  const flatItems = useMemo(() => filtered, [filtered]);

  const handleSelect = useCallback(
    (item: MacOSTahoeCommandPaletteItem) => {
      item.onSelect?.();
      onOpenChange(false);
    },
    [onOpenChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % flatItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
      } else if (e.key === 'Enter' && flatItems[activeIndex]) {
        e.preventDefault();
        handleSelect(flatItems[activeIndex]);
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    },
    [flatItems, activeIndex, handleSelect, onOpenChange]
  );

  if (!open) return null;

  let globalIdx = -1;

  return (
    <div
      data-tucu="tahoe-command-palette-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/25 pt-[15vh] backdrop-blur-[2px]"
      onClick={() => onOpenChange(false)}
    >
      <div
        data-tucu="tahoe-command-palette"
        role="dialog"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex w-full max-w-[560px] flex-col overflow-hidden',
          'rounded-2xl',
          'bg-(--macos-glass-prominent-bg) backdrop-blur-(--macos-glass-prominent-blur,40px)',
          'border border-(--macos-glass-prominent-border,var(--macos-glass-border))',
          'shadow-[0_24px_80px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
          className
        )}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-(--macos-glass-border-subtle) px-4 py-3">
          <svg
            className="h-5 w-5 shrink-0 text-(--macos-tahoe-text-muted)"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M13 13l4 4" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[15px] text-(--macos-tahoe-text) outline-none placeholder:text-(--macos-tahoe-text-muted)"
          />
          <kbd className="rounded-md border border-(--macos-glass-border) px-1.5 py-0.5 text-[11px] text-(--macos-tahoe-text-muted)">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {flatItems.length === 0 ? (
            <div className="px-3 py-8 text-center text-[13px] text-(--macos-tahoe-text-muted)">
              No results found
            </div>
          ) : (
            Array.from(groups.entries()).map(([group, groupItems]) => (
              <div key={group || '__default'}>
                {group && (
                  <div className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-(--macos-tahoe-text-muted)">
                    {group}
                  </div>
                )}
                {groupItems.map((item) => {
                  globalIdx++;
                  const isActive = globalIdx === activeIndex;
                  const idx = globalIdx;
                  return (
                    <button
                      key={item.id}
                      data-tucu="tahoe-command-palette-item"
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors',
                        isActive
                          ? 'bg-(--macos-tahoe-selection) text-(--macos-tahoe-text)'
                          : 'text-(--macos-tahoe-text) hover:bg-(--macos-tahoe-hover)'
                      )}
                    >
                      {item.icon && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-(--macos-tahoe-text-muted)">
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1">{item.label}</span>
                      {item.shortcut && (
                        <kbd className="text-[11px] text-(--macos-tahoe-text-muted)">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 border-t border-(--macos-glass-border-subtle) px-4 py-2 text-[11px] text-(--macos-tahoe-text-muted)">
          <span>
            <kbd className="rounded border border-(--macos-glass-border) px-1 py-px text-[10px]">↑↓</kbd> Navigate
          </span>
          <span>
            <kbd className="rounded border border-(--macos-glass-border) px-1 py-px text-[10px]">↵</kbd> Select
          </span>
          <span>
            <kbd className="rounded border border-(--macos-glass-border) px-1 py-px text-[10px]">Esc</kbd> Close
          </span>
        </div>
      </div>
    </div>
  );
}

export default MacOSTahoeCommandPalette;
