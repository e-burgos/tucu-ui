import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { ChevronDown } from '../icons/chevron-down';

export type CoinTypes = {
  icon: ReactNode;
  code: string;
  name: string;
  price: number;
};

export type CoinListBoxProps = {
  coins: CoinTypes[];
  selectedCoin: CoinTypes;
  setSelectedCoin: (selectedCoin: CoinTypes) => void;
  className?: string;
  disabled?: boolean;
};

function CoinListBox({
  className,
  coins,
  selectedCoin,
  setSelectedCoin,
  disabled,
}: CoinListBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const selectedIndex = coins.findIndex((c) => c.code === selectedCoin.code);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 220;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldDropUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    setDropdownStyle({
      position: 'fixed',
      ...(shouldDropUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }, []);

  const openDropdown = useCallback(() => {
    if (disabled) return;
    updatePosition();
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsClosing(false);
    setIsOpen(true);
  }, [disabled, selectedIndex, updatePosition]);

  const closeDropdown = useCallback(() => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setHighlightedIndex(-1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (isOpen) closeDropdown();
    else openDropdown();
  }, [isOpen, openDropdown, closeDropdown]);

  const handleSelect = useCallback(
    (coin: CoinTypes) => {
      setSelectedCoin(coin);
      closeDropdown();
      buttonRef.current?.focus();
    },
    [setSelectedCoin, closeDropdown]
  );

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, closeDropdown]);

  // Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeDropdown]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!isOpen) return;
    const reposition = () => updatePosition();
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [isOpen, updatePosition]);

  // Scroll highlighted into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((p) => (p < coins.length - 1 ? p + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((p) => (p > 0 ? p - 1 : coins.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0 && coins[highlightedIndex]) {
          handleSelect(coins[highlightedIndex]);
        }
        break;
      case 'Escape':
      case 'Tab':
        e.preventDefault();
        closeDropdown();
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(coins.length - 1);
        break;
    }
  };

  const dropdown =
    isOpen &&
    createPortal(
      <div
        ref={dropdownRef}
        role="listbox"
        tabIndex={-1}
        aria-activedescendant={
          highlightedIndex >= 0 ? `coin-option-${highlightedIndex}` : undefined
        }
        style={dropdownStyle}
        className={cn(
          'max-h-56 overflow-auto rounded-lg bg-white p-3 shadow-large dark:bg-gray-800',
          'transition ease-in duration-100',
          isClosing ? 'opacity-0' : 'opacity-100'
        )}
      >
        {coins.map((coin, index) => {
          const isSelected = coin.code === selectedCoin.code;
          const isHighlighted = index === highlightedIndex;
          return (
            <div
              key={coin.code}
              id={`coin-option-${index}`}
              ref={(el) => {
                optionsRef.current[index] = el;
              }}
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(coin)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={cn(
                'my-1 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                isSelected &&
                  'bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand',
                !isSelected &&
                  isHighlighted &&
                  'bg-gray-200/70 text-gray-900 dark:bg-gray-600/60 dark:text-white',
                !isSelected &&
                  !isHighlighted &&
                  'text-gray-900 dark:text-white hover:bg-gray-200/70 dark:hover:bg-gray-600/60'
              )}
            >
              {coin.icon}
              {coin.name}
            </div>
          );
        })}
      </div>,
      document.body
    );

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="coin-listbox"
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex h-11 w-full items-center justify-between whitespace-nowrap dark:bg-light-dark bg-white border border-border dark:border-border px-4 pl-3 text-sm text-gray-900 rounded-lg dark:text-white sm:h-13 sm:pl-4',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="flex items-center gap-3 font-medium ltr:mr-2 rtl:ml-2">
          <span className="sm:*:h-[30px] sm:*:w-[30px]">
            {selectedCoin.icon}
          </span>
          {selectedCoin.code}
        </div>
        <ChevronDown
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {dropdown as React.ReactPortal}
    </div>
  );
}

CoinListBox.displayName = 'CoinListBox';
export default CoinListBox;
