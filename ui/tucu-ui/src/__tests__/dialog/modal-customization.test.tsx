import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';

import { Modal } from '../../components/dialog/modal';

afterEach(cleanup);

const renderOpen = (props: Partial<React.ComponentProps<typeof Modal>> = {}) =>
  render(
    <Modal isOpen setIsOpen={vi.fn()} hideButtons {...props}>
      <p>body</p>
    </Modal>
  );

describe('Modal overlay and header customization', () => {
  it('merges overlayClassName onto the overlay', () => {
    renderOpen({ overlayClassName: 'bg-black/60 backdrop-blur-none' });
    const overlay = document.querySelector('[data-tucu="modal-overlay"]');
    expect(overlay?.className).toContain('bg-black/60');
    expect(overlay?.className).not.toContain('bg-gray-700/10');
    expect(overlay?.className).toContain('backdrop-blur-none');
    expect(overlay?.className).not.toContain('backdrop-blur-xs');
  });

  it('spreads closeButtonProps onto the close button', () => {
    renderOpen({
      closeButtonProps: {
        'data-testid': 'x',
        'aria-keyshortcuts': 'Escape',
        className: 'extra-close',
      },
    });
    const close = screen.getByRole('button', { name: 'Close' });
    expect(close).toHaveAttribute('data-testid', 'x');
    expect(close).toHaveAttribute('aria-keyshortcuts', 'Escape');
    expect(close.className).toContain('extra-close');
  });

  it('closeButtonProps aria-label wins over closeLabel', () => {
    renderOpen({
      closeLabel: 'Dismiss',
      closeButtonProps: { 'aria-label': 'Shut' },
    });
    expect(screen.getByRole('button', { name: 'Shut' })).toBeInTheDocument();
  });

  it('renders the title wrapper as a full-width block-safe div', () => {
    renderOpen({ text: { title: <div>Block title</div> } });
    const titleId = screen
      .getByRole('dialog')
      .getAttribute('aria-labelledby') as string;
    const title = document.getElementById(titleId) as HTMLElement;
    expect(title.tagName).toBe('DIV');
    expect(title.className).toContain('flex-1');
    expect(title.className).toContain('min-w-0');
    expect(title.className).toContain('text-[22px]');
    expect(title).toContainElement(screen.getByText('Block title'));
  });

  it('merges headerClassName onto the header row', () => {
    renderOpen({ header: 'H', headerClassName: 'pb-0 border-0' });
    const header = document.querySelector('[data-tucu="modal-header"]');
    expect(header?.className).toContain('pb-0');
    expect(header?.className).not.toContain('pb-3');
  });
});

describe('Modal content sizing', () => {
  it('contentClassName can remove the default padding and margin', () => {
    renderOpen({ contentClassName: 'p-0 mt-0' });
    const content = screen.getByText('body').parentElement as HTMLElement;
    expect(content.className).toContain('p-0');
    expect(content.className).toContain('mt-0');
    expect(content.className).not.toContain('p-[8px]');
    expect(content.className).not.toContain('mt-[16px]');
  });

  it('maxWidth and maxHeight apply as inline styles', () => {
    renderOpen({ maxWidth: 520, maxHeight: '40vh' });
    const panel = document.querySelector('[data-tucu="modal"]') as HTMLElement;
    const content = screen.getByText('body').parentElement as HTMLElement;
    expect(panel.style.maxWidth).toBe('520px');
    expect(content.style.maxHeight).toBe('40vh');
  });

  it('adds no inline size styles by default', () => {
    renderOpen();
    const panel = document.querySelector('[data-tucu="modal"]') as HTMLElement;
    const content = screen.getByText('body').parentElement as HTMLElement;
    expect(panel.style.maxWidth).toBe('');
    expect(content.style.maxHeight).toBe('');
  });
});

describe('Modal ids and initial focus', () => {
  it('gives two open modals distinct title ids', () => {
    render(
      <>
        <Modal isOpen setIsOpen={vi.fn()} hideButtons text={{ title: 'One' }} />
        <Modal isOpen setIsOpen={vi.fn()} hideButtons text={{ title: 'Two' }} />
      </>
    );
    const ids = screen
      .getAllByRole('dialog')
      .map((dialog) => dialog.getAttribute('aria-labelledby'));
    expect(ids[0]).toBeTruthy();
    expect(ids[0]).not.toBe(ids[1]);
    ids.forEach((id) =>
      expect(document.querySelectorAll(`[id="${id}"]`)).toHaveLength(1)
    );
  });

  it('focuses the dialog element on open without the title', () => {
    renderOpen({ text: { title: 'Title' } });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('tabindex', '-1');
    expect(dialog.className).toContain('outline-none');
    expect(document.activeElement).toBe(dialog);
  });

  it('initialFocusRef wins over the dialog element', () => {
    const Harness = () => {
      const ref = React.useRef<HTMLInputElement>(null);
      return (
        <Modal isOpen setIsOpen={vi.fn()} hideButtons initialFocusRef={ref}>
          <input ref={ref} aria-label="name" />
        </Modal>
      );
    };
    render(<Harness />);
    expect(document.activeElement).toBe(screen.getByLabelText('name'));
  });
});
