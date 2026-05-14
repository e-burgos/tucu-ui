import { useEffect, useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { Search, X } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────

export interface MacOSCommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string[];
  group?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface MacOSCommandPaletteProps {
  items: MacOSCommandPaletteItem[];
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Keyboard shortcut to toggle palette. Default: Meta+K (Cmd+K) */
  triggerKey?: string;
  className?: string;
}

// ─── MacOSCommandPalette ───────────────────────────────────────

export function MacOSCommandPalette({
  items,
  placeholder = 'Search or type a command…',
  open: controlledOpen,
  onOpenChange,
  triggerKey = 'k',
  className,
}: MacOSCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Support controlled + uncontrolled open state
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange]
  );

  // ── Global keyboard shortcut ──────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === triggerKey) {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen, triggerKey]);

  // ── Focus input when opened ───────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setQuery('');
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  // ── Filter items ──────────────────────────────────────────────
  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.group?.toLowerCase().includes(q)
    );
  });

  // ── Keyboard navigation inside palette ───────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[highlightedIndex]) {
        filtered[highlightedIndex].onSelect();
        setOpen(false);
      }
    }
  };

  // ── Group items ───────────────────────────────────────────────
  const groups = filtered.reduce<Record<string, MacOSCommandPaletteItem[]>>(
    (acc, item) => {
      const key = item.group ?? '';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {}
  );

  if (!isOpen) return null;

  return (
    /* Overlay */
    <div
      data-tucu="command-palette-overlay"
      role="presentation"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]"
      style={{ backgroundColor: 'rgba(0,0,0,0.32)' }}
    >
      {/* Panel */}
      <div
        data-tucu="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className={cn('relative w-full max-w-[600px] mx-4', className)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div data-tucu="command-palette-search">
          <Search aria-hidden="true" data-tucu="command-palette-search-icon" />
          <input
            ref={inputRef}
            data-tucu="command-palette-input"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="command-palette-results"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightedIndex(0);
            }}
            placeholder={placeholder}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              data-tucu="command-palette-clear"
              onClick={() => setQuery('')}
            >
              <X aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Results */}
        <div
          id="command-palette-results"
          data-tucu="command-palette-results"
          role="listbox"
        >
          {filtered.length === 0 && (
            <div data-tucu="command-palette-empty">No results found</div>
          )}

          {Object.entries(groups).map(([group, groupItems]) => {
            const globalOffset = filtered.indexOf(groupItems[0]);
            return (
              <div key={group} data-tucu="command-palette-group">
                {group && (
                  <div data-tucu="command-palette-group-label">{group}</div>
                )}
                {groupItems.map((item, localIdx) => {
                  const globalIdx = globalOffset + localIdx;
                  const isHighlighted = globalIdx === highlightedIndex;
                  return (
                    <div
                      key={item.id}
                      data-tucu="command-palette-item"
                      data-highlighted={isHighlighted}
                      role="option"
                      aria-selected={isHighlighted}
                      onClick={() => {
                        item.onSelect();
                        setOpen(false);
                      }}
                      onMouseEnter={() => setHighlightedIndex(globalIdx)}
                    >
                      {item.icon && (
                        <span
                          data-tucu="command-palette-item-icon"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      )}
                      <span data-tucu="command-palette-item-label">
                        {item.label}
                      </span>
                      {item.description && (
                        <span data-tucu="command-palette-item-desc">
                          {item.description}
                        </span>
                      )}
                      {item.shortcut && item.shortcut.length > 0 && (
                        <span data-tucu="command-palette-shortcut">
                          {item.shortcut.map((key, i) => (
                            <kbd key={i} data-tucu="command-palette-key">
                              {key}
                            </kbd>
                          ))}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div data-tucu="command-palette-footer">
          <span>
            <kbd data-tucu="command-palette-key">↑</kbd>
            <kbd data-tucu="command-palette-key">↓</kbd>
            Navigate
          </span>
          <span>
            <kbd data-tucu="command-palette-key">↵</kbd>
            Select
          </span>
          <span>
            <kbd data-tucu="command-palette-key">Esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}

export default MacOSCommandPalette;
