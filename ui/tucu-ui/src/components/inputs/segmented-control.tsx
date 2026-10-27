'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../libs/cn';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';

export type SegmentedControlSize = 'xs' | 'sm' | 'md';

export interface SegmentedControlOption<T extends string = string> {
  /** Value emitted by `onChange` when this segment is picked. */
  value: T;
  /** Segment content. */
  label: ReactNode;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  /** Prevents picking this segment. */
  disabled?: boolean;
}

type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export interface SegmentedControlProps<T extends string = string>
  extends DataAttributes {
  /** Segments, in display order. */
  options: SegmentedControlOption<T>[];
  /** Currently selected value. */
  value: T;
  /** Called with the picked value. */
  onChange: (value: T) => void;
  /** Accessible name of the radio group. */
  'aria-label'?: string;
  /** Accessible name of the radio group (used when `aria-label` is not set). */
  label?: string;
  /** Control size. Defaults to `md`. */
  size?: SegmentedControlSize;
  /** Stretch the control and share the width equally among segments. */
  fullWidth?: boolean;
  /** Disables every segment. */
  disabled?: boolean;
  /** Keep segments on one row and show chevrons when they overflow. */
  scrollable?: boolean;
  /** Extra classes merged onto the root element. */
  className?: string;
}

const sizeClasses: Record<SegmentedControlSize, string> = {
  xs: 'h-6 px-2 text-xs gap-1',
  sm: 'h-7 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
};

const SCROLL_STEP_PX = 160;

function nextEnabledIndex<T extends string>(
  options: SegmentedControlOption<T>[],
  from: number,
  step: 1 | -1
) {
  for (let i = 1; i <= options.length; i++) {
    const index = (from + step * i + options.length * i) % options.length;
    if (!options[index].disabled) return index;
  }
  return from;
}

function edgeEnabledIndex<T extends string>(
  options: SegmentedControlOption<T>[],
  edge: 'first' | 'last'
) {
  const indexes = options.map((_, i) => i).filter((i) => !options[i].disabled);
  return edge === 'first' ? indexes[0] : indexes[indexes.length - 1];
}

function useOverflowState(enabled: boolean) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState({ back: false, forward: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const back = track.scrollLeft > 1;
    const forward = track.scrollLeft + track.clientWidth < track.scrollWidth - 1;
    setOverflow((prev) =>
      prev.back === back && prev.forward === forward ? prev : { back, forward }
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!enabled || !track || typeof ResizeObserver === 'undefined') return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener('scroll', measure, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', measure);
    };
  }, [enabled, measure]);

  const scrollBy = (delta: number) =>
    trackRef.current?.scrollBy?.({ left: delta, behavior: 'smooth' });

  return { trackRef, overflow, scrollBy };
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  'aria-label': ariaLabel,
  label,
  size = 'md',
  fullWidth = false,
  disabled = false,
  scrollable = false,
  className,
  ...dataAttributes
}: SegmentedControlProps<T>) {
  const t = useTucuMessages().segmented;
  const thumbId = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { trackRef, overflow, scrollBy } = useOverflowState(scrollable);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const tabbableIndex =
    selectedIndex >= 0 && !options[selectedIndex].disabled
      ? selectedIndex
      : edgeEnabledIndex(options, 'first');

  const pick = (index: number | undefined) => {
    if (index === undefined || index < 0) return;
    buttonRefs.current[index]?.focus();
    onChange(options[index].value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (disabled) return;
    const keyToTarget: Record<string, number | undefined> = {
      ArrowRight: nextEnabledIndex(options, index, 1),
      ArrowDown: nextEnabledIndex(options, index, 1),
      ArrowLeft: nextEnabledIndex(options, index, -1),
      ArrowUp: nextEnabledIndex(options, index, -1),
      Home: edgeEnabledIndex(options, 'first'),
      End: edgeEnabledIndex(options, 'last'),
    };
    if (!(event.key in keyToTarget)) return;
    event.preventDefault();
    pick(keyToTarget[event.key]);
  };

  return (
    <div
      {...dataAttributes}
      data-tucu="segmented-control"
      data-size={size}
      className={cn(
        'relative items-center',
        fullWidth ? 'flex w-full' : 'inline-flex max-w-full',
        className
      )}
    >
      {scrollable && overflow.back && (
        <button
          type="button"
          tabIndex={-1}
          data-tucu="segmented-control-scroll-back"
          aria-label={t.scrollBack}
          onClick={() => scrollBy(-SCROLL_STEP_PX)}
          className="mr-1 shrink-0 rounded-full p-1 text-[var(--tucu-segmented-fg,var(--tucu-segmented-fg-default))] hover:text-[var(--tucu-segmented-fg-active,var(--tucu-segmented-fg-active-default))]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      <div
        ref={trackRef}
        role="radiogroup"
        aria-label={ariaLabel ?? label}
        aria-disabled={disabled || undefined}
        data-tucu="segmented-control-track"
        className={cn(
          'flex min-w-0 items-center gap-0.5 bg-[var(--tucu-segmented-bg,var(--tucu-segmented-bg-default))] p-0.5',
          'rounded-[var(--tucu-segmented-radius,var(--tucu-segmented-radius-default))]',
          fullWidth && 'w-full',
          scrollable && 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          disabled && 'opacity-60'
        )}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          const isDisabled = disabled || option.disabled;
          return (
            <button
              key={option.value}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled || undefined}
              disabled={isDisabled}
              tabIndex={index === tabbableIndex ? 0 : -1}
              data-tucu="segmented-control-option"
              data-state={isSelected ? 'checked' : 'unchecked'}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'relative inline-flex items-center justify-center whitespace-nowrap font-medium outline-hidden transition-colors',
                'rounded-[calc(var(--tucu-segmented-radius,var(--tucu-segmented-radius-default))-2px)]',
                'focus-visible:ring-2 focus-visible:ring-brand',
                sizeClasses[size],
                fullWidth && 'flex-1',
                isSelected
                  ? 'text-[var(--tucu-segmented-fg-active,var(--tucu-segmented-fg-active-default))]'
                  : 'text-[var(--tucu-segmented-fg,var(--tucu-segmented-fg-default))] hover:text-[var(--tucu-segmented-fg-active,var(--tucu-segmented-fg-active-default))]',
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId={`${thumbId}-thumb`}
                  data-tucu="segmented-control-thumb"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="absolute inset-0 rounded-[inherit] bg-[var(--tucu-segmented-thumb-bg,var(--tucu-segmented-thumb-bg-default))] shadow-sm"
                />
              )}
              {option.icon && (
                <span className="relative z-10 inline-flex shrink-0">
                  {option.icon}
                </span>
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>
      {scrollable && overflow.forward && (
        <button
          type="button"
          tabIndex={-1}
          data-tucu="segmented-control-scroll-forward"
          aria-label={t.scrollForward}
          onClick={() => scrollBy(SCROLL_STEP_PX)}
          className="ml-1 shrink-0 rounded-full p-1 text-[var(--tucu-segmented-fg,var(--tucu-segmented-fg-default))] hover:text-[var(--tucu-segmented-fg-active,var(--tucu-segmented-fg-active-default))]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default SegmentedControl;
