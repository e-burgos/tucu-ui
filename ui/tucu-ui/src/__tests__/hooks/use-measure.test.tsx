import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useMeasure } from '../../hooks/use-measure';

function Probe() {
  const [ref, rect] = useMeasure<HTMLDivElement>();
  return (
    <div ref={ref} data-testid="probe" data-height={rect.height}>
      probe
    </div>
  );
}

describe('useMeasure', () => {
  it('returns a callback ref and a default rect before observation', () => {
    const { getByTestId } = render(<Probe />);
    expect(getByTestId('probe')).toHaveAttribute('data-height', '0');
  });

  it('observes the attached element via ResizeObserver', () => {
    let observedElement: Element | null = null;
    class SpyResizeObserver {
      observe(el: Element) {
        observedElement = el;
      }
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    const original = globalThis.ResizeObserver;
    globalThis.ResizeObserver = SpyResizeObserver as never;

    try {
      const { getByTestId } = render(<Probe />);
      expect(observedElement).toBe(getByTestId('probe'));
    } finally {
      globalThis.ResizeObserver = original;
    }
  });
});
