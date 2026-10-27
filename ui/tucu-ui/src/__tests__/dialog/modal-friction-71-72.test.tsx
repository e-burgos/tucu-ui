import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Modal } from '../../components/dialog/modal';
import { SplitModal } from '../../components/dialog/split-modal';

const noop = () => undefined;

describe('Modal closeTooltip and headerActions', () => {
  it('shows the tucu tooltip on the close button without polluting textContent', () => {
    render(
      <Modal isOpen setIsOpen={noop} text={{ title: 'T' }} closeTooltip="Close it">
        body
      </Modal>
    );
    const close = screen.getAllByRole('button', { name: /close/i })[0];
    expect(document.body.textContent).not.toContain('Close it');
    fireEvent.mouseEnter(close);
    fireEvent.focus(close);
  });

  it('keeps closeButtonProps working with a tooltip', () => {
    render(
      <Modal
        isOpen
        setIsOpen={noop}
        closeTooltip="Tip"
        closeButtonProps={{ 'data-testid': 'x', 'aria-label': 'Dismiss' }}
      />
    );
    expect(screen.getByTestId('x')).toHaveAttribute('aria-label', 'Dismiss');
  });

  it('renders headerActions right before the close button', () => {
    render(
      <Modal
        isOpen
        setIsOpen={noop}
        text={{ title: 'T' }}
        headerActions={<button type="button">Act</button>}
      />
    );
    const actions = document.querySelector('[data-tucu="modal-header-actions"]');
    const close = screen.getAllByRole('button', { name: /close/i })[0];
    expect(actions?.nextElementSibling).toBe(close);
    expect(actions?.parentElement).toBe(close.parentElement);
  });

  it('SplitModal forwards closeTooltip', () => {
    render(
      <SplitModal isOpen setIsOpen={noop} title="S" closeTooltip="Tip">
        x
      </SplitModal>
    );
    expect(screen.getAllByRole('button', { name: /close/i })[0]).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('Tip');
  });
});
