export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

export interface ToastOptions {
  title?: string;
  /** Auto-dismiss delay in ms. 0 = never auto-dismiss. Default: 4000 */
  duration?: number;
  /** Screen position of the toast stack. Default: 'top-right' */
  position?: ToastPosition;
}

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  title?: string;
  duration: number;
  position: ToastPosition;
  /** True while the exit animation is playing, before removal from state */
  isExiting: boolean;
}

/** Exposed on the context — consumed by useToast */
export interface ToastContextValue {
  addToast: (variant: ToastVariant, message: string, options?: ToastOptions) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}

/** Return type of useToast() */
export interface UseToastReturn {
  success: (message: string, options?: ToastOptions) => string;
  error:   (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info:    (message: string, options?: ToastOptions) => string;
  dismiss:    (id: string) => void;
  dismissAll: () => void;
}
