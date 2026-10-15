import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_TOAST_TIMEOUT,
  IToast,
  useToastStore,
} from '../../hooks/use-toast-store';

/**
 * Shared toast lifecycle for every toast renderer (default, Sonoma, Tahoe):
 * one auto-dismiss timer per toast, started once (adding a toast no longer
 * restarts the others), timers paused while the region is hovered or
 * focused, and an exit animation before removal from the store.
 */
export function useToastQueue(exitMs = 300) {
  const { toasts, dismissToast } = useToastStore();
  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const remaining = useRef(new Map<string, { ms: number; startedAt: number }>());
  const paused = useRef(false);
  const dismissed = useRef(new Set<string>());

  const dismiss = useCallback(
    (id: string) => {
      if (dismissed.current.has(id)) return;
      dismissed.current.add(id);
      clearTimeout(timers.current.get(id));
      timers.current.delete(id);
      remaining.current.delete(id);
      setDismissingIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        dismissToast(id);
        setDismissingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, exitMs);
    },
    [dismissToast, exitMs]
  );

  const schedule = useCallback(
    (id: string, ms: number) => {
      remaining.current.set(id, { ms, startedAt: Date.now() });
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), ms)
      );
    },
    [dismiss]
  );

  useEffect(() => {
    const ids = new Set(toasts.map((t) => t.id));
    for (const toast of toasts) {
      if (
        !dismissed.current.has(toast.id) &&
        !timers.current.has(toast.id) &&
        !remaining.current.has(toast.id)
      ) {
        const ms = toast.timeout || DEFAULT_TOAST_TIMEOUT;
        if (paused.current) remaining.current.set(toast.id, { ms, startedAt: 0 });
        else schedule(toast.id, ms);
      }
    }
    for (const id of [...dismissed.current]) {
      if (!ids.has(id)) dismissed.current.delete(id);
    }
    for (const id of [...remaining.current.keys()]) {
      if (!ids.has(id)) {
        clearTimeout(timers.current.get(id));
        timers.current.delete(id);
        remaining.current.delete(id);
      }
    }
  }, [toasts, schedule]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  const pause = useCallback(() => {
    if (paused.current) return;
    paused.current = true;
    const now = Date.now();
    for (const [id, timer] of timers.current) {
      clearTimeout(timer);
      const entry = remaining.current.get(id);
      if (entry) {
        remaining.current.set(id, {
          ms: Math.max(entry.ms - (now - entry.startedAt), 1000),
          startedAt: 0,
        });
      }
    }
    timers.current.clear();
  }, []);

  const resume = useCallback(() => {
    if (!paused.current) return;
    paused.current = false;
    for (const [id, entry] of remaining.current) schedule(id, entry.ms);
  }, [schedule]);

  const visibleToasts: IToast[] = toasts.map((toast) => ({
    ...toast,
    dismissing: dismissingIds.has(toast.id),
  }));

  return {
    toasts: visibleToasts,
    dismiss,
    /** Spread on the region element. */
    regionHandlers: {
      onMouseEnter: pause,
      onMouseLeave: resume,
      onFocus: pause,
      onBlur: resume,
    },
  };
}
