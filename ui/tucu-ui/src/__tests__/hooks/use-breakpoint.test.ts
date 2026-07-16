import { describe, it, expect, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useBreakpoint } from '../../hooks/use-breakpoint';

function setWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
}

describe('useBreakpoint', () => {
  const originalWidth = window.innerWidth;

  afterEach(() => {
    setWidth(originalWidth);
  });

  it('returns the smallest breakpoint below every threshold', () => {
    setWidth(320);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('xs');
  });

  it('returns the highest breakpoint at or below the current width', () => {
    setWidth(1024);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('lg');
  });

  it('updates when the window is resized', () => {
    setWidth(320);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('xs');

    act(() => {
      setWidth(1440);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe('2xl');
  });
});
