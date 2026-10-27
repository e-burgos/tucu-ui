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
export type SegmentedControlSemantics = 'radio' | 'tabs' | 'nav';
export type SegmentedControlEmphasis = 'default' | 'strong' | 'subtle';

export interface SegmentedControlOption<T extends string = string> {
  /** Value emitted by `onChange` when this segment is picked. */
  value: T;
  /** Segment content. */
  label: ReactNode;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  /** Prevents picking this segment. */
  disabled?: boolean;
  /** Destination of the segment when `semantics` is `nav`; renders an anchor instead of a button. */
  href?: string;
  /** Test id forwarded to the segment element. */
  'data-testid'?: string;
  /** Accessible name of the segment, for icon-only segments. */
  'aria-label'?: string;
  /** Extra classes merged onto the segment label. */
  labelClassName?: string;
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
  /** Accessible name of the radio group, tab list or navigation. */
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
  /**
   * Accessibility pattern. `radio` (default) renders a radio group; `tabs` renders a tab list whose
   * tabs point to `segmentedControlPanelId(idBase, value)`; `nav` renders links/buttons inside a
   * `<nav>` with `aria-current` on the active one.
   */
  semantics?: SegmentedControlSemantics;
  /** Id prefix of tabs and panels when `semantics` is `tabs`. Defaults to a generated id. */
  idBase?: string;
  /** Visual weight of the selected segment: `strong` adds contrast, `subtle` drops the elevation. Defaults to `default`. */
  emphasis?: SegmentedControlEmphasis;
  /** Extra classes merged onto the root element. */
  className?: string;
}

export const segmentedControlTabId = (idBase: string, value: string) =>
  `${idBase}-tab-${value}`;

export const segmentedControlPanelId = (idBase: string, value: string) =>
  `${idBase}-panel-${value}`;

const thumbEmphasisClasses: Record<SegmentedControlEmphasis, string> = {
  default: 'shadow-sm',
  strong:
    'shadow-md ring-1 ring-[color:var(--tucu-segmented-thumb-border,var(--tucu-segmented-thumb-border-default))]',
  subtle: 'opacity-70',
};

const sizeClasses: Record<SegmentedControlSize, string> = {
  xs: 'h-6 px-2 text-xs gap-1',
  sm: 'h-7 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
};

const SCROLL_STEP_PX = 160;

const TRACK_ROLES: Record<SegmentedControlSemantics, string | undefined> = {
  radio: 'radiogroup',
  tabs: 'tablist',
  nav: undefined,
};

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
    const forward =
      track.scrollLeft + track.clientWidth < track.scrollWidth - 1;
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
  semantics = 'radio',
  idBase,
  emphasis = 'default',
  className,
  ...dataAttributes
}: SegmentedControlProps<T>) {
  const t = useTucuMessages().segmented;
  const thumbId = useId();
  const generatedIdBase = useId();
  const resolvedIdBase = idBase ?? generatedIdBase;
  const isNav = semantics === 'nav';
  const isTabs = semantics === 'tabs';
  const TrackElement = isNav ? 'nav' : 'div';
  const buttonRefs = useRef<(HTMLElement | null)[]>([]);
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

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    if (disabled || isNav) return;
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

  const optionSemanticsProps = (
    option: SegmentedControlOption<T>,
    index: number,
    isSelected: boolean,
    isDisabled: boolean | undefined
  ) => {
    const shared = {
      'aria-disabled': isDisabled || undefined,
      onClick: () => onChange(option.value),
    };
    if (isNav) {
      return {
        ...shared,
        'aria-current': isSelected ? ('page' as const) : undefined,
      };
    }
    const roving = {
      ...shared,
      tabIndex: index === tabbableIndex ? 0 : -1,
      onKeyDown: (event: KeyboardEvent<HTMLElement>) =>
        handleKeyDown(event, index),
    };
    if (isTabs) {
      return {
        ...roving,
        role: 'tab',
        id: segmentedControlTabId(resolvedIdBase, option.value),
        'aria-selected': isSelected,
        'aria-controls': segmentedControlPanelId(resolvedIdBase, option.value),
      };
    }
    return { ...roving, role: 'radio', 'aria-checked': isSelected };
  };

  return (
    <div
      {...dataAttributes}
      data-tucu="segmented-control"
      data-size={size}
      data-semantics={semantics}
      data-emphasis={emphasis}
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
      <TrackElement
        ref={trackRef}
        role={TRACK_ROLES[semantics]}
        aria-label={ariaLabel ?? label}
        aria-disabled={disabled || undefined}
        data-tucu="segmented-control-track"
        className={cn(
          'flex min-w-0 items-center gap-0.5 bg-[var(--tucu-segmented-bg,var(--tucu-segmented-bg-default))] p-0.5',
          'rounded-[var(--tucu-segmented-radius,var(--tucu-segmented-radius-default))]',
          fullWidth && 'w-full',
          scrollable &&
            'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          disabled && 'opacity-60'
        )}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          const isDisabled = disabled || option.disabled;
          const optionClassName = cn(
            'relative inline-flex items-center justify-center whitespace-nowrap font-medium outline-hidden transition-colors',
            'rounded-[calc(var(--tucu-segmented-radius,var(--tucu-segmented-radius-default))-2px)]',
            'focus-visible:ring-2 focus-visible:ring-brand',
            sizeClasses[size],
            fullWidth && 'flex-1',
            isSelected
              ? 'text-[var(--tucu-segmented-fg-active,var(--tucu-segmented-fg-active-default))]'
              : 'text-[var(--tucu-segmented-fg,var(--tucu-segmented-fg-default))] hover:text-[var(--tucu-segmented-fg-active,var(--tucu-segmented-fg-active-default))]',
            isSelected && emphasis === 'strong' && 'font-semibold',
            isDisabled && 'cursor-not-allowed opacity-50'
          );
          const optionProps = {
            ref: (el: HTMLElement | null) => {
              buttonRefs.current[index] = el;
            },
            'data-testid': option['data-testid'],
            'aria-label': option['aria-label'],
            'data-tucu': 'segmented-control-option',
            'data-state': isSelected ? 'checked' : 'unchecked',
            className: optionClassName,
            ...optionSemanticsProps(option, index, isSelected, isDisabled),
          };
          const content = (
            <>
              {isSelected && (
                <motion.span
                  layoutId={`${thumbId}-thumb`}
                  data-tucu="segmented-control-thumb"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className={cn(
                    'absolute inset-0 rounded-[inherit] bg-[var(--tucu-segmented-thumb-bg,var(--tucu-segmented-thumb-bg-default))]',
                    thumbEmphasisClasses[emphasis]
                  )}
                />
              )}
              {option.icon && (
                <span className="relative z-10 inline-flex shrink-0">
                  {option.icon}
                </span>
              )}
              <span className={cn('relative z-10', option.labelClassName)}>
                {option.label}
              </span>
            </>
          );
          return isNav && option.href !== undefined && !isDisabled ? (
            <a key={option.value} {...optionProps} href={option.href}>
              {content}
            </a>
          ) : (
            <button
              key={option.value}
              {...optionProps}
              type="button"
              disabled={isDisabled}
            >
              {content}
            </button>
          );
        })}
      </TrackElement>
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
