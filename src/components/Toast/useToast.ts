import { useToastContext } from './ToastProvider';
import type { ToastOptions, UseToastReturn } from './Toast.types';

/**
 * useToast — trigger and dismiss toast notifications.
 *
 * Must be used inside a <ToastProvider>.
 *
 * @example
 * const toast = useToast();
 * toast.success('Saved!');
 * toast.error('Failed.', { title: 'Error', duration: 0 });
 */
export function useToast(): UseToastReturn {
  const { addToast, dismissToast, dismissAll } = useToastContext();

  return {
    success: (message: string, options?: ToastOptions) =>
      addToast('success', message, options),
    error: (message: string, options?: ToastOptions) =>
      addToast('error', message, options),
    warning: (message: string, options?: ToastOptions) =>
      addToast('warning', message, options),
    info: (message: string, options?: ToastOptions) =>
      addToast('info', message, options),
    dismiss:    dismissToast,
    dismissAll,
  };
}
