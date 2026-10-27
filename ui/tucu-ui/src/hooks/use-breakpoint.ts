'use client';

import { useSyncExternalStore } from 'react';

const breakPoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1780,
  '4xl': 2160,
} as const;

const sortedBreakpoints = Object.entries(breakPoints).sort(
  (a, b) => a[1] - b[1]
);

function getBreakpoint(width: number): string {
  let current = sortedBreakpoints[0][0];
  for (const [name, minWidth] of sortedBreakpoints) {
    if (width >= minWidth) current = name;
  }
  return current;
}

const subscribeToResize = (onChange: () => void) => {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
};

const readBreakpoint = () => getBreakpoint(window.innerWidth);

const readServerBreakpoint = () => getBreakpoint(0);

export function useBreakpoint(): string {
  return useSyncExternalStore(
    subscribeToResize,
    readBreakpoint,
    readServerBreakpoint
  );
}
