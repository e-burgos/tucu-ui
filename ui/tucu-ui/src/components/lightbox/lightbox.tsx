'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../libs/cn';
import { formatMessage } from '../../libs/i18n/messages';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { usePortalContainer } from '../../themes/components/theme-scope/portal-container';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll';
import { usePrefersReducedMotion } from '../../hooks/use-prefers-reduced-motion';
import { Close } from '../icons/close';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';

const MotionOverlay = motion.div;
const MotionSlide = motion.figure;

const FOCUSABLE_SELECTOR =
  'button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])';
const DOUBLE_TAP_WINDOW_MS = 300;
const TAP_MOVE_TOLERANCE_PX = 10;
const ZOOM_SCALE = 2;

export interface LightboxItem {
  /** Image URL. Also used as the stable key of the slide. */
  src: string;
  /** Alternative text of the image. */
  alt?: string;
  /** Caption rendered under the slide. */
  caption?: React.ReactNode;
  /** Thumbnail URL for the strip. Defaults to `src`. */
  thumbnail?: string;
  /** Custom slide content (e.g. a video). Replaces the image. */
  render?: () => React.ReactNode;
}

export interface LightboxProps {
  /** Slides to show. */
  items: LightboxItem[];
  /** Index of the open slide; `null` keeps the lightbox closed. */
  index: number | null;
  /** Called with the next index when the user navigates. */
  onIndexChange: (index: number) => void;
  /** Called when the user dismisses the lightbox (Escape, close button, backdrop). */
  onClose: () => void;
  /** Wrap around from the last slide to the first and back. */
  loop?: boolean;
  /** How images fit the viewport. */
  fit?: 'contain' | 'cover';
  /** Show a thumbnail strip. */
  showThumbnails?: boolean;
  /** Show the "i / N" counter. */
  showCounter?: boolean;
  /** Horizontal distance in pixels a swipe must exceed to change slide. */
  swipeThreshold?: number;
  /** Toggle 2x zoom with double click / double tap. */
  zoom?: boolean;
  /** Accessible name of the dialog. Defaults to the localized "Image viewer". */
  label?: string;
  /** Accessible name of the close button. Defaults to the localized "Close". */
  closeLabel?: string;
  /** Accessible name of the previous button. Defaults to the localized "Previous". */
  previousLabel?: string;
  /** Accessible name of the next button. Defaults to the localized "Next". */
  nextLabel?: string;
  /** Extra classes merged last onto the overlay root. */
  className?: string;
  [dataAttribute: `data-${string}`]: string | undefined;
}

const CONTROL_CLASSES =
  'flex h-10 w-10 items-center justify-center rounded-full bg-[var(--tucu-lightbox-control-bg,var(--tucu-lightbox-control-bg-default))] text-[var(--tucu-lightbox-control-fg,var(--tucu-lightbox-control-fg-default))] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current';

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -48 }),
};

const focusableIn = (container: HTMLElement | null): HTMLElement[] =>
  container
    ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    : [];

const wrapIndex = (index: number, length: number) =>
  ((index % length) + length) % length;

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  index,
  onIndexChange,
  onClose,
  loop = true,
  fit = 'contain',
  showThumbnails = false,
  showCounter = true,
  swipeThreshold = 50,
  zoom = false,
  label,
  closeLabel,
  previousLabel,
  nextLabel,
  className,
  ...dataAttributes
}) => {
  const messages = useTucuMessages();
  const portalContainer = usePortalContainer();
  const reducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerMovedRef = useRef(false);
  const lastTapRef = useRef(0);
  const directionRef = useRef(1);
  const [zoomed, setZoomed] = useState(false);

  const isOpen = index !== null && index >= 0 && index < items.length;
  const lastIndex = items.length - 1;
  const canGoPrevious = isOpen && items.length > 1 && (loop || index > 0);
  const canGoNext = isOpen && items.length > 1 && (loop || index < lastIndex);

  useLockBodyScroll(isOpen);

  useEffect(
    () => () => {
      document.documentElement.style.removeProperty('overflow');
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      const previous = previousFocusRef.current;
      previousFocusRef.current = null;
      if (previous?.isConnected) previous.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    setZoomed(false);
  }, [index]);

  const goTo = useCallback(
    (target: number, direction: number) => {
      directionRef.current = direction;
      onIndexChange(wrapIndex(target, items.length));
    },
    [items.length, onIndexChange]
  );

  const goPrevious = useCallback(() => {
    if (index !== null && canGoPrevious) goTo(index - 1, -1);
  }, [canGoPrevious, goTo, index]);

  const goNext = useCallback(() => {
    if (index !== null && canGoNext) goTo(index + 1, 1);
  }, [canGoNext, goTo, index]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft') {
        goPrevious();
      } else if (event.key === 'ArrowRight') {
        goNext();
      } else if (event.key === 'Tab') {
        const focusables = focusableIn(dialogRef.current);
        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrevious, isOpen, onClose]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartXRef.current = event.clientX;
    pointerMovedRef.current = false;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const startX = pointerStartXRef.current;
    pointerStartXRef.current = null;
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    pointerMovedRef.current = Math.abs(deltaX) > TAP_MOVE_TOLERANCE_PX;
    if (!zoomed && Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX < 0) goNext();
      else goPrevious();
      return;
    }
    if (zoom && !pointerMovedRef.current && event.pointerType === 'touch') {
      const now = Date.now();
      if (now - lastTapRef.current < DOUBLE_TAP_WINDOW_MS) {
        setZoomed((current) => !current);
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    }
  };

  const handlePointerCancel = () => {
    pointerStartXRef.current = null;
  };

  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !pointerMovedRef.current) onClose();
    pointerMovedRef.current = false;
  };

  const handleDoubleClick = () => {
    if (zoom) setZoomed((current) => !current);
  };

  if (!portalContainer) return null;

  const item = isOpen ? items[index as number] : null;
  const activeIndex = index ?? 0;
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.22 };

  const overlay = (
    <AnimatePresence>
      {item && (
        <MotionOverlay
          key="lightbox"
          {...dataAttributes}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label ?? messages.lightbox.label}
          aria-roledescription="carousel"
          tabIndex={-1}
          data-tucu="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className={cn(
            'fixed inset-0 z-[1000] flex flex-col bg-[var(--tucu-lightbox-overlay-bg,var(--tucu-lightbox-overlay-bg-default))] outline-none',
            className
          )}
        >
          <div
            data-tucu="lightbox-toolbar"
            className="flex items-center justify-between gap-2 p-3"
          >
            <span
              data-tucu="lightbox-counter"
              aria-live="polite"
              className="min-w-[4ch] text-sm text-[var(--tucu-lightbox-control-fg,var(--tucu-lightbox-control-fg-default))]"
            >
              {showCounter &&
                formatMessage(messages.lightbox.counter, {
                  index: activeIndex + 1,
                  total: items.length,
                })}
            </span>
            <button
              type="button"
              data-tucu="lightbox-close"
              aria-label={closeLabel ?? messages.lightbox.close}
              onClick={onClose}
              className={CONTROL_CLASSES}
            >
              <Close aria-hidden="true" />
            </button>
          </div>

          <div
            data-tucu="lightbox-stage"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onClick={handleStageClick}
            onDoubleClick={handleDoubleClick}
            style={{ touchAction: 'pan-y' }}
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-12 sm:px-16"
          >
            <AnimatePresence initial={false} mode="popLayout" custom={directionRef.current}>
              <MotionSlide
                key={item.src}
                custom={directionRef.current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                aria-roledescription="slide"
                data-tucu="lightbox-slide"
                className="m-0 flex max-h-full max-w-full flex-col items-center justify-center gap-2"
                onClick={(event) => event.stopPropagation()}
              >
                {item.render ? (
                  item.render()
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt ?? ''}
                    draggable={false}
                    data-tucu="lightbox-image"
                    style={{
                      objectFit: fit,
                      transform: zoomed ? `scale(${ZOOM_SCALE})` : undefined,
                      cursor: zoom ? (zoomed ? 'zoom-out' : 'zoom-in') : undefined,
                    }}
                    className="max-h-[78vh] max-w-full select-none transition-transform duration-200"
                  />
                )}
                {item.caption && (
                  <figcaption
                    data-tucu="lightbox-caption"
                    className="text-center text-sm text-[var(--tucu-lightbox-control-fg,var(--tucu-lightbox-control-fg-default))]"
                  >
                    {item.caption}
                  </figcaption>
                )}
              </MotionSlide>
            </AnimatePresence>

            {canGoPrevious && (
              <button
                type="button"
                data-tucu="lightbox-previous"
                aria-label={previousLabel ?? messages.lightbox.previous}
                onClick={goPrevious}
                className={cn(CONTROL_CLASSES, 'absolute left-2 top-1/2 -translate-y-1/2')}
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
            )}
            {canGoNext && (
              <button
                type="button"
                data-tucu="lightbox-next"
                aria-label={nextLabel ?? messages.lightbox.next}
                onClick={goNext}
                className={cn(CONTROL_CLASSES, 'absolute right-2 top-1/2 -translate-y-1/2')}
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            )}
          </div>

          {showThumbnails && items.length > 1 && (
            <div
              data-tucu="lightbox-thumbnails"
              className="flex justify-center gap-2 overflow-x-auto p-3"
            >
              {items.map((thumb, thumbIndex) => (
                <button
                  key={thumb.src}
                  type="button"
                  data-tucu="lightbox-thumbnail"
                  aria-label={thumb.alt || `${thumbIndex + 1} / ${items.length}`}
                  aria-current={thumbIndex === index}
                  onClick={() => goTo(thumbIndex, thumbIndex > activeIndex ? 1 : -1)}
                  className={cn(
                    'h-14 w-14 shrink-0 overflow-hidden rounded-md opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-current',
                    thumbIndex === index && 'opacity-100 ring-2 ring-white'
                  )}
                >
                  <img
                    src={thumb.thumbnail ?? thumb.src}
                    alt=""
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </MotionOverlay>
      )}
    </AnimatePresence>
  );

  return createPortal(overlay, portalContainer);
};
