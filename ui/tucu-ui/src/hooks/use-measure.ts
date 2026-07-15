import { useEffect, useState } from 'react';

export type MeasureRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const defaultRect: MeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export function useMeasure<T extends HTMLElement = HTMLElement>(): [
  (node: T | null) => void,
  MeasureRect
] {
  const [element, setElement] = useState<T | null>(null);
  const [rect, setRect] = useState<MeasureRect>(defaultRect);

  useEffect(() => {
    if (!element || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { x, y, width, height, top, right, bottom, left } =
        entry.target.getBoundingClientRect();
      setRect({ x, y, width, height, top, right, bottom, left });
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return [setElement, rect];
}
