import {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent,
} from 'react';
import cn from 'classnames';
import { Search, X } from 'lucide-react';
import Avatar from '../common/avatar';
import { Scrollbar } from '../common/scrollbar';

type CollectionList = {
  icon: string;
  name: string;
  value: string;
};

export interface CollectionSelectListTypes {
  collectionList: CollectionList[];
  onSelect: (value: string) => void;
  placeholder?: string;
  noResultsMessage?: string;
  className?: string;
}

export function CollectionSelectList({
  collectionList,
  onSelect,
  placeholder = 'Search collections...',
  noResultsMessage = 'No collections found',
  className,
}: CollectionSelectListTypes) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

  const filteredList = useMemo(() => {
    if (!searchKeyword.trim()) return collectionList;
    const q = searchKeyword.toLowerCase();
    return collectionList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q)
    );
  }, [collectionList, searchKeyword]);

  // Reset highlight when filter changes
  useEffect(() => {
    setHighlightedIndex(filteredList.length > 0 ? 0 : -1);
  }, [filteredList.length]);

  // Scroll highlighted into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  const handleSelect = useCallback(
    (value: string) => {
      onSelect(value);
    },
    [onSelect]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((p) => (p < filteredList.length - 1 ? p + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((p) => (p > 0 ? p - 1 : filteredList.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredList[highlightedIndex]) {
          handleSelect(filteredList[highlightedIndex].value);
        }
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(filteredList.length - 1);
        break;
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-xl bg-white shadow-large ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800 dark:shadow-none',
        className
      )}
    >
      {/* Search */}
      <div className="relative flex items-center gap-2.5 border-b border-[var(--color-border)] px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          autoFocus
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
        />
        {searchKeyword && (
          <button
            type="button"
            onClick={() => {
              setSearchKeyword('');
              inputRef.current?.focus();
            }}
            className="shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* List */}
      <Scrollbar
        autoHide="scroll"
        style={{ maxHeight: '16rem' }}
        className="py-2"
      >
        <ul ref={listRef} role="listbox">
          {filteredList.length > 0 ? (
            filteredList.map((item, index) => {
              const isHighlighted = index === highlightedIndex;
              return (
                <li
                  key={item.value}
                  ref={(el) => {
                    optionsRef.current[index] = el;
                  }}
                  role="option"
                  aria-selected={isHighlighted}
                  onClick={() => handleSelect(item.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors',
                    'focus:outline-none',
                    isHighlighted && 'bg-gray-100 dark:bg-gray-800',
                    !isHighlighted &&
                      'hover:bg-gray-100  dark:hover:bg-gray-800/50'
                  )}
                >
                  <Avatar image={item.icon} size="xs" alt={item.name} />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.name}
                  </span>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-6 text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {noResultsMessage}
              </span>
            </li>
          )}
        </ul>
      </Scrollbar>
    </div>
  );
}

export default CollectionSelectList;
