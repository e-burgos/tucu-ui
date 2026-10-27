'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeNever = () => () => undefined;

const readReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeNever, readReducedMotion, () => false);
}
