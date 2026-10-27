'use client';

import { create } from 'zustand';

export interface IToast {
  id: string;
  title?: string;
  message: string;
  open?: boolean;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  timeout?: number;
  dismissing?: boolean;
}

export const DEFAULT_TOAST_TIMEOUT = 3000;

interface ToastState {
  toasts: IToast[];
  setToasts: (toasts: IToast[]) => void;
  addToast: (toast: Omit<IToast, 'id'> & { id?: string }) => void;
  dismissToast: (toastId?: string) => void;
}

let toastCounter = 0;
const nextToastId = () => `tucu-toast-${Date.now()}-${++toastCounter}`;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  setToasts: (toasts) => set({ toasts }),
  addToast: (input) => {
    const toast: IToast = {
      ...input,
      id: input.id || nextToastId(),
      timeout: input.timeout || DEFAULT_TOAST_TIMEOUT,
      open: true,
      dismissing: false,
    };
    if (get().toasts.some((t) => t.id === toast.id)) return;
    set((state) => ({ toasts: [...state.toasts, toast] }));
  },
  dismissToast: (toastId) =>
    set((state) => ({
      toasts: toastId ? state.toasts.filter((t) => t.id !== toastId) : [],
    })),
}));

export interface ShowToastOptions {
  title?: string;
  variant?: IToast['variant'];
  /** Milliseconds before auto-dismiss. Default 3000. */
  timeout?: number;
  id?: string;
}

/**
 * Shows a toast from anywhere (no hook needed). The toast region is mounted
 * by `ThemeProvider` layouts. Returns the toast id.
 *
 * @example showToast('Cambios guardados', { variant: 'success' });
 */
export function showToast(message: string, options: ShowToastOptions = {}) {
  const id = options.id || nextToastId();
  useToastStore.getState().addToast({ ...options, id, message });
  return id;
}
