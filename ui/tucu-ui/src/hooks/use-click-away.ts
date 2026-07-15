import { useEffect, useRef, type RefObject } from 'react';

type ClickAwayEvent = MouseEvent | TouchEvent;

const defaultEvents = ['mousedown', 'touchstart'];

export function useClickAway<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  onClickAway: (event: ClickAwayEvent) => void,
  events: string[] = defaultEvents
): void {
  const savedCallback = useRef(onClickAway);
  savedCallback.current = onClickAway;

  useEffect(() => {
    const handler = (event: Event) => {
      const el = ref.current;
      if (el && !el.contains(event.target as Node)) {
        savedCallback.current(event as ClickAwayEvent);
      }
    };
    events.forEach((eventName) => document.addEventListener(eventName, handler));
    return () => {
      events.forEach((eventName) =>
        document.removeEventListener(eventName, handler)
      );
    };
  }, [ref, events]);
}
