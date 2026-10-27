import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';

import { ConfirmDialog } from '../../components/dialog/confirm-dialog';
import { useTheme } from '../../themes/hooks/use-theme';

afterEach(() => {
  cleanup();
  useTheme.setState({ lang: 'en' });
});

const renderDialog = (props: Partial<React.ComponentProps<typeof ConfirmDialog>> = {}) => {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  render(
    <ConfirmDialog
      isOpen
      title="Delete item"
      description="This cannot be undone"
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    />
  );
  return { onConfirm, onCancel };
};

describe('ConfirmDialog', () => {
  it('is an alertdialog labelled by the title and described by the description', () => {
    renderDialog({ 'data-testid': 'confirm' });
    const dialog = screen.getByRole('alertdialog', { name: 'Delete item' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toBe(screen.getByTestId('confirm'));
    const describedBy = dialog.getAttribute('aria-describedby') as string;
    expect(document.getElementById(describedBy)).toHaveTextContent('This cannot be undone');
  });

  it('renders nothing when closed and has no close button', () => {
    renderDialog();
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    cleanup();
    renderDialog({ isOpen: false });
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('confirm and cancel call their handlers', () => {
    const { onConfirm, onCancel } = renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('Escape cancels', () => {
    const { onCancel } = renderDialog();
    fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('uses es defaults and prop overrides', () => {
    useTheme.setState({ lang: 'es' });
    renderDialog();
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
    cleanup();
    renderDialog({ confirmLabel: 'Borrar', cancelLabel: 'Volver' });
    expect(screen.getByRole('button', { name: 'Borrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Volver' })).toBeInTheDocument();
  });

  it('focuses cancel for the danger tone and confirm otherwise', () => {
    renderDialog({ tone: 'danger' });
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    cleanup();
    renderDialog({ tone: 'info' });
    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus();
    cleanup();
    renderDialog({ tone: 'info', initialFocus: 'cancel' });
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    cleanup();
    renderDialog({ tone: 'danger', initialFocus: 'confirm' });
    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus();
  });

  it('falls back to cancel focus when confirm is disabled', () => {
    renderDialog({ tone: 'info', confirmDisabled: true });
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  });

  it('exposes the tone and a custom icon', () => {
    renderDialog({ tone: 'warning' });
    expect(document.querySelector('[data-tucu="confirm-dialog-icon"]')).toHaveAttribute(
      'data-tone',
      'warning'
    );
    cleanup();
    renderDialog({ icon: <i data-testid="custom-icon" /> });
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('loading locks buttons, Escape and overlay closing', () => {
    const { onConfirm, onCancel } = renderDialog({ loading: true });
    const confirm = screen.getByRole('button', { name: 'Confirm' });
    expect(confirm).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(confirm);
    expect(onConfirm).not.toHaveBeenCalled();
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    expect(cancel).toBeDisabled();
    fireEvent.click(cancel);
    fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' });
    const overlay = document.querySelector('[data-tucu="modal-overlay"]') as HTMLElement;
    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('overlay click cancels when not loading', () => {
    const { onCancel } = renderDialog();
    const overlay = document.querySelector('[data-tucu="modal-overlay"]') as HTMLElement;
    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders children and merges className and overlayClassName', () => {
    renderDialog({ children: <p>extra</p>, className: 'panel-x', overlayClassName: 'overlay-x' });
    expect(screen.getByText('extra')).toBeInTheDocument();
    expect(document.querySelector('[data-tucu="modal"]')).toHaveClass('panel-x');
    expect(document.querySelector('[data-tucu="modal-overlay"]')).toHaveClass('overlay-x');
  });
});
