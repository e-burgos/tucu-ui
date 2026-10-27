import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';

import { Modal } from '../../components/dialog/modal';
import { useTheme } from '../../themes/hooks/use-theme';

afterEach(() => {
  cleanup();
  useTheme.setState({ lang: 'en' });
});

const renderOpen = (props: Partial<React.ComponentProps<typeof Modal>> = {}) =>
  render(
    <Modal isOpen setIsOpen={vi.fn()} hideButtons {...props}>
      <p>body</p>
    </Modal>
  );

describe('Modal dialog attributes', () => {
  it('forwards aria-label, aria-describedby and data-* to role=dialog', () => {
    renderOpen({
      'aria-label': 'Edit user',
      'aria-describedby': 'help',
      'data-testid': 'edit-modal',
    });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Edit user');
    expect(dialog).toHaveAttribute('aria-describedby', 'help');
    expect(dialog).toHaveAttribute('data-testid', 'edit-modal');
    expect(screen.getByTestId('edit-modal')).toBe(dialog);
  });
});

describe('Modal header', () => {
  it('renders a ReactNode title and labels the dialog by it', () => {
    renderOpen({ text: { title: <strong>Rich title</strong> } });
    expect(screen.getByText('Rich title').tagName).toBe('STRONG');
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'aria-labelledby',
      'modal-title'
    );
  });

  it('header replaces the title and keeps the close button', () => {
    renderOpen({ header: <em>Custom header</em>, text: { title: 'Ignored' } });
    expect(screen.getByText('Custom header')).toBeInTheDocument();
    expect(screen.queryByText('Ignored')).toBeNull();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'aria-labelledby',
      'modal-title'
    );
  });

  it('hideCloseButton removes the close button', () => {
    renderOpen({ header: 'H', hideCloseButton: true });
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
  });

  it('closeLabel overrides the localized label', () => {
    renderOpen({ closeLabel: 'Dismiss' });
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('uses the Spanish close label when the theme lang is es', () => {
    useTheme.setState({ lang: 'es' });
    renderOpen();
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
  });
});

describe('Modal closing', () => {
  it('Escape on the dialog closes only the top-most modal', () => {
    const outerClose = vi.fn();
    const innerClose = vi.fn();
    render(
      <Modal isOpen setIsOpen={vi.fn()} onClose={outerClose} hideButtons>
        <Modal
          isOpen
          setIsOpen={vi.fn()}
          onClose={innerClose}
          hideButtons
          aria-label="inner"
        >
          <input aria-label="inner-input" />
        </Modal>
      </Modal>
    );
    fireEvent.keyDown(screen.getByLabelText('inner-input'), { key: 'Escape' });
    expect(innerClose).toHaveBeenCalledTimes(1);
    expect(outerClose).not.toHaveBeenCalled();
  });

  it('Escape on document with focus outside does not close', () => {
    const onClose = vi.fn();
    renderOpen({ onClose });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('Escape does nothing when not closeable', () => {
    const onClose = vi.fn();
    renderOpen({ onClose, closeable: false });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('overlay click closes synchronously, panel click does not', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const setIsOpen = vi.fn();
    renderOpen({ onClose, setIsOpen });
    const overlay = document.querySelector(
      '[data-tucu="modal-overlay"]'
    ) as HTMLElement;
    const panel = document.querySelector('[data-tucu="modal"]') as HTMLElement;

    fireEvent.mouseDown(panel);
    fireEvent.click(panel);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(setIsOpen).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it('a drag that starts inside the panel and ends on the overlay does not close', () => {
    const onClose = vi.fn();
    renderOpen({ onClose });
    const overlay = document.querySelector(
      '[data-tucu="modal-overlay"]'
    ) as HTMLElement;
    const panel = document.querySelector('[data-tucu="modal"]') as HTMLElement;
    fireEvent.mouseDown(panel);
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('unmounts immediately when isOpen turns false', () => {
    const { rerender } = renderOpen();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    rerender(
      <Modal isOpen={false} setIsOpen={vi.fn()}>
        <p>body</p>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('Modal size', () => {
  it('default size reproduces the original width and height classes', () => {
    renderOpen();
    const panel = document.querySelector('[data-tucu="modal"]') as HTMLElement;
    expect(panel.className).toContain('sm:max-w-[800px]');
    expect(panel.firstElementChild?.nextElementSibling?.className).toContain(
      'max-h-[60vh]'
    );
  });

  it.each([
    ['sm', 'sm:max-w-[400px]', 'max-h-[50vh]'],
    ['lg', 'sm:max-w-[1000px]', 'max-h-[70vh]'],
    ['xl', 'sm:max-w-[1200px]', 'max-h-[75vh]'],
    ['full', 'sm:max-w-[calc(100vw-32px)]', 'max-h-[80vh]'],
  ] as const)('%s size', (size, width, height) => {
    renderOpen({ size });
    const panel = document.querySelector('[data-tucu="modal"]') as HTMLElement;
    expect(panel.className).toContain(width);
    expect(panel.className).not.toContain('sm:max-w-[800px]');
    expect(screen.getByText('body').parentElement?.className).toContain(height);
  });

  it('className merges over the size class', () => {
    renderOpen({ className: 'sm:max-w-[500px]' });
    const panel = document.querySelector('[data-tucu="modal"]') as HTMLElement;
    expect(panel.className).toContain('sm:max-w-[500px]');
    expect(panel.className).not.toContain('sm:max-w-[800px]');
  });
});
