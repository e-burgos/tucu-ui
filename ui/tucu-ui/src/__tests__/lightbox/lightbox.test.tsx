import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Lightbox, LightboxItem } from '../../components/lightbox';
import { ThemeScope } from '../../themes';
import { useTheme } from '../../themes/hooks/use-theme';

class TestPointerEvent extends MouseEvent {
  pointerType: string;
  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? 'mouse';
  }
}
if (typeof window.PointerEvent === 'undefined') {
  Object.defineProperty(window, 'PointerEvent', { value: TestPointerEvent, configurable: true });
}

afterEach(() => {
  cleanup();
  useTheme.setState({ lang: 'en' });
});

const items: LightboxItem[] = [
  { src: 'a.png', alt: 'A', caption: 'Caption A' },
  { src: 'b.png', alt: 'B' },
  { src: 'c.png', alt: 'C' },
];

const Harness = ({
  start = 0,
  onClose = () => undefined,
  ...props
}: Partial<React.ComponentProps<typeof Lightbox>> & { start?: number | null }) => {
  const [index, setIndex] = useState<number | null>(start);
  return (
    <>
      <button>trigger</button>
      <Lightbox
        items={items}
        index={index}
        onIndexChange={setIndex}
        onClose={() => {
          onClose();
          setIndex(null);
        }}
        {...props}
      />
    </>
  );
};

const counter = () => screen.getByText(/\d \/ 3/).textContent;

describe('Lightbox', () => {
  it('renders nothing while index is null', () => {
    render(<Harness start={null} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens as a labelled modal dialog with counter and caption', () => {
    render(<Harness />);
    const dialog = screen.getByRole('dialog', { name: 'Image viewer' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('data-tucu', 'lightbox');
    expect(counter()).toBe('1 / 3');
    expect(screen.getByText('Caption A')).toBeInTheDocument();
    expect(screen.getByAltText('A')).toBeInTheDocument();
  });

  it('closes with Escape and the close button, restoring focus', async () => {
    const onClose = vi.fn();
    const Opener = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>opener</button>
          <Lightbox
            items={items}
            index={open ? 0 : null}
            onIndexChange={() => undefined}
            onClose={() => {
              onClose();
              setOpen(false);
            }}
          />
        </>
      );
    };
    render(<Opener />);
    const trigger = screen.getByText('opener');
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(trigger).toHaveFocus();
  });

  it('closes with the close button using localized label in es', () => {
    useTheme.setState({ lang: 'es' });
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('navigates with arrows and wraps when loop is on', () => {
    render(<Harness />);
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(counter()).toBe('2 / 3');
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(counter()).toBe('1 / 3');
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(counter()).toBe('3 / 3');
  });

  it('stops at the edges and hides the arrows when loop is off', () => {
    render(<Harness loop={false} />);
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(counter()).toBe('1 / 3');
    expect(screen.queryByRole('button', { name: 'Previous' })).toBeNull();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(counter()).toBe('3 / 3');
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
  });

  it('changes slide with the next and previous buttons', () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(counter()).toBe('2 / 3');
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(counter()).toBe('1 / 3');
  });

  it('swipes past the threshold and ignores swipes under it', () => {
    render(<Harness swipeThreshold={50} />);
    const stage = document.querySelector('[data-tucu="lightbox-stage"]') as HTMLElement;
    fireEvent.pointerDown(stage, { clientX: 200 });
    fireEvent.pointerUp(stage, { clientX: 170 });
    expect(counter()).toBe('1 / 3');
    fireEvent.pointerDown(stage, { clientX: 200 });
    fireEvent.pointerUp(stage, { clientX: 100 });
    expect(counter()).toBe('2 / 3');
    fireEvent.pointerDown(stage, { clientX: 100 });
    fireEvent.pointerUp(stage, { clientX: 200 });
    expect(counter()).toBe('1 / 3');
  });

  it('hides the counter when showCounter is false and uses custom labels', () => {
    render(<Harness showCounter={false} closeLabel="Shut" nextLabel="Fwd" previousLabel="Back" />);
    expect(screen.queryByText(/\d \/ 3/)).toBeNull();
    expect(screen.getByRole('button', { name: 'Shut' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fwd' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('renders custom slide content and thumbnails that navigate', () => {
    render(
      <Harness
        showThumbnails
        items={[
          { src: 'v', alt: 'video', render: () => <video data-testid="vid" /> },
          ...items,
        ]}
      />
    );
    expect(screen.getByTestId('vid')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'C' }));
    expect(screen.getByText('4 / 4')).toBeInTheDocument();
  });

  it('toggles zoom with double click only when zoom is enabled', () => {
    render(<Harness zoom />);
    const stage = document.querySelector('[data-tucu="lightbox-stage"]') as HTMLElement;
    fireEvent.doubleClick(stage);
    expect(screen.getByAltText('A').style.transform).toBe('scale(2)');
    fireEvent.doubleClick(stage);
    expect(screen.getByAltText('A').style.transform).toBe('');
    cleanup();
    render(<Harness zoom={false} />);
    fireEvent.doubleClick(document.querySelector('[data-tucu="lightbox-stage"]') as HTMLElement);
    expect(screen.getByAltText('A').style.transform).toBe('');
  });

  it('merges className last and forwards data attributes', () => {
    render(<Harness className="mine" data-testid="lb" />);
    const dialog = screen.getByTestId('lb');
    expect(dialog.className.endsWith('mine')).toBe(true);
  });

  it('portals into the ThemeScope container', () => {
    render(
      <ThemeScope preset="x" data-testid="scope">
        <Harness />
      </ThemeScope>
    );
    const scope = screen.getByTestId('scope');
    expect(scope.contains(screen.getByRole('dialog'))).toBe(true);
  });
});
