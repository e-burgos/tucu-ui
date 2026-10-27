import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { Modal } from '../../components/dialog/modal';

describe('Modal', () => {
  it('renders without crashing when open', () => {
    const { baseElement } = render(
      <Modal isOpen={true} setIsOpen={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    );
    expect(baseElement).toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen={true} setIsOpen={vi.fn()}>
        <p>Hello Modal</p>
      </Modal>
    );
    expect(screen.getByText('Hello Modal')).toBeInTheDocument();
  });
});

describe('Modal focus management', () => {
  it('traps Tab / Shift+Tab inside the dialog and restores focus on close', async () => {
    const Harness = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Abrir</button>
          <Modal
            isOpen={open}
            setIsOpen={setOpen}
            text={{ title: 'T' }}
            hideButtons
          >
            <input aria-label="primero" />
            <input aria-label="ultimo" />
          </Modal>
        </>
      );
    };
    render(<Harness />);
    const trigger = screen.getByText('Abrir');
    trigger.focus();
    fireEvent.click(trigger);
    const first = await screen.findByLabelText('primero');
    const last = screen.getByLabelText('ultimo');
    const close = screen.getByRole('button', { name: /close/i });

    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(close);

    close.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);

    trigger.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(close);
    expect(first).toBeInTheDocument();

    fireEvent.keyDown(close, { key: 'Escape' });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
