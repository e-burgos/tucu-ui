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

interface ToastState {
  toasts: IToast[];
  setToasts: (toasts: IToast[]) => void;
  addToast: (toast: IToast) => void;
  dismissToast: (toastId?: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  setToasts: (toasts) => set({ toasts }),
  addToast: (toast) => {
    const allToasts = get().toasts;
    const existingToast = !!allToasts.find((t) => t.id === toast.id);
    if (toast.id) {
      toast.timeout = toast?.timeout || 3000;
      toast.open = true;
      toast.dismissing = false;
    }
    if (!existingToast)
      set((state) => ({
        toasts: [...state.toasts, toast],
      }));
  },
  dismissToast: (toastId) =>
    set((state) => {
      if (toastId) {
        return {
          toasts: state.toasts.filter((toast) => toast.id !== toastId),
        };
      } else {
        return {
          toasts: [],
        };
      }
    }),
}));
