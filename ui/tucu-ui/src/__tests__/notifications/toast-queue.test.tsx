import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';

import { Toast } from '../../components/notifications/toast';
import { MacOSTahoeToast } from '../../components/macos/tahoe/controls/macos-tahoe-toast';
import { showToast, useToastStore } from '../../hooks/use-toast-store';
import { useTheme } from '../../themes/hooks/use-theme';

describe('toast store', () => {
  beforeEach(() => useToastStore.setState({ toasts: [] }));

  it('generates ids and default timeouts, without mutating the input', () => {
    const input = { message: 'Hola' };
    useToastStore.getState().addToast(input);
    const [toast] = useToastStore.getState().toasts;
    expect(toast.id).toMatch(/^tucu-toast-/);
    expect(toast.timeout).toBe(3000);
    expect(input).toEqual({ message: 'Hola' });
  });

  it('showToast adds a toast and returns its id', () => {
    const id = showToast('Guardado', { variant: 'success' });
    expect(useToastStore.getState().toasts).toEqual([
      expect.objectContaining({ id, message: 'Guardado', variant: 'success' }),
    ]);
  });
});

describe('toast lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.setState({ toasts: [] });
    act(() => useTheme.setState({ lang: 'en' }));
  });
  afterEach(() => vi.useRealTimers());

  it('a new toast does not restart the timers of the others', () => {
    render(<Toast />);
    act(() => {
      showToast('first', { timeout: 3000 });
    });
    act(() => vi.advanceTimersByTime(2000));
    act(() => {
      showToast('second', { timeout: 3000 });
    });
    // first expires at 3000 (+500 exit), second keeps running
    act(() => vi.advanceTimersByTime(1600));
    expect(screen.queryByText('first')).not.toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('pauses auto-dismiss while hovered', () => {
    render(<Toast />);
    act(() => {
      showToast('stay', { timeout: 2000 });
    });
    const region = screen.getByRole('region');
    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText('stay')).toBeInTheDocument();
    fireEvent.mouseLeave(region);
    act(() => vi.advanceTimersByTime(2600));
    expect(screen.queryByText('stay')).not.toBeInTheDocument();
  });

  it('uses status for info and alert for destructive toasts', () => {
    render(<Toast />);
    act(() => {
      showToast('ok', { variant: 'success' });
      showToast('boom', { variant: 'destructive' });
    });
    expect(screen.getByText('ok').closest('[data-tucu="toast"]')).toHaveAttribute(
      'role',
      'status'
    );
    expect(screen.getByText('boom').closest('[data-tucu="toast"]')).toHaveAttribute(
      'role',
      'alert'
    );
  });

  it('localizes the dismiss button and region label', () => {
    act(() => useTheme.setState({ lang: 'es' }));
    render(<MacOSTahoeToast />);
    act(() => {
      showToast('Guardado', { title: 'Listo' });
    });
    expect(screen.getByRole('region', { name: 'Notificaciones' })).toBeInTheDocument();
    const close = screen.getByRole('button', { name: 'Cerrar notificación' });
    expect(close).toHaveAttribute('type', 'button');
    fireEvent.click(close);
    act(() => vi.advanceTimersByTime(400));
    expect(screen.queryByText('Guardado')).not.toBeInTheDocument();
  });

  it('renders the Tahoe toast on an opaque token surface', () => {
    render(<MacOSTahoeToast />);
    act(() => {
      showToast('Visible');
    });
    const banner = screen
      .getByText('Visible')
      .closest('[data-tucu="tahoe-notification-banner"]');
    expect(banner?.className).toContain('bg-(--tucu-toast-bg)');
    expect(banner?.className).not.toContain('glass-prominent');
  });
});
