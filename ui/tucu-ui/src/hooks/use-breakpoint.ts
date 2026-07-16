import { useEffect, useState } from 'react';

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

export function useBreakpoint(): string {
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 0)
  );

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
