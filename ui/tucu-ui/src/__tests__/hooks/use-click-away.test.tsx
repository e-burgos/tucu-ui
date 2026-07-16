import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { useClickAway } from '../../hooks/use-click-away';

function Probe({ onClickAway }: { onClickAway: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, onClickAway);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        inside
      </div>
      <div data-testid="outside">outside</div>
    </div>
  );
}

describe('useClickAway', () => {
  it('does not fire when clicking inside the ref target', () => {
    const onClickAway = vi.fn();
    const { getByTestId } = render(<Probe onClickAway={onClickAway} />);

    fireEvent.mouseDown(getByTestId('inside'));

    expect(onClickAway).not.toHaveBeenCalled();
  });

  it('fires when clicking outside the ref target', () => {
    const onClickAway = vi.fn();
    const { getByTestId } = render(<Probe onClickAway={onClickAway} />);

    fireEvent.mouseDown(getByTestId('outside'));

    expect(onClickAway).toHaveBeenCalledTimes(1);
  });

  it('fires on touchstart as well', () => {
    const onClickAway = vi.fn();
    const { getByTestId } = render(<Probe onClickAway={onClickAway} />);

    fireEvent.touchStart(getByTestId('outside'));

    expect(onClickAway).toHaveBeenCalledTimes(1);
  });
});
