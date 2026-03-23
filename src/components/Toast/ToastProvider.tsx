import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { PositionGroup } from './Toast.styles';
import type {
  ToastContextValue,
  ToastItem,
  ToastOptions,
  ToastPosition,
  ToastVariant,
} from './Toast.types';

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_TOASTS      = 5;
const DEFAULT_DURATION: number = 4000;
const DEFAULT_POSITION: ToastPosition = 'top-right';
const EXIT_DURATION   = 200; // must match CSS animation duration

const ALL_POSITIONS: ToastPosition[] = [
  'top-right',
  'top-center',
  'bottom-right',
  'bottom-center',
];

// ── ID generator ──────────────────────────────────────────────────────────────

let _counter = 0;
function nextId(): string {
  return `toast-${Date.now()}-${++_counter}`;
}

// ── Context ───────────────────────────────────────────────────────────────────

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

// ── Provider ──────────────────────────────────────────────────────────────────

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  // Track pending exit timers so they can be cancelled on dismissAll
  const exitTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // ── Dismiss a single toast (triggers exit animation then removes) ───────────

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => {
      // Avoid marking an already-exiting toast again
      if (prev.find((t) => t.id === id)?.isExiting) return prev;
      return prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t));
    });

    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      exitTimers.current.delete(id);
    }, EXIT_DURATION);

    exitTimers.current.set(id, timer);
  }, []);

  // ── Dismiss all toasts ─────────────────────────────────────────────────────

  const dismissAll = useCallback(() => {
    // Cancel any pending exit timers to avoid double-removes
    exitTimers.current.forEach((timer) => clearTimeout(timer));
    exitTimers.current.clear();

    setToasts((prev) => prev.map((t) => ({ ...t, isExiting: true })));

    setTimeout(() => setToasts([]), EXIT_DURATION);
  }, []);

  // ── Add a new toast ────────────────────────────────────────────────────────

  const addToast = useCallback(
    (variant: ToastVariant, message: string, options: ToastOptions = {}): string => {
      const id = nextId();
      const item: ToastItem = {
        id,
        variant,
        message,
        title:    options.title,
        duration: options.duration ?? DEFAULT_DURATION,
        position: options.position ?? DEFAULT_POSITION,
        isExiting: false,
      };

      setToasts((prev) => {
        const next = [item, ...prev];
        // When over limit, drop the oldest entry (last in array) immediately —
        // React will unmount it and its useEffect cleanup cancels its timer.
        return next.length > MAX_TOASTS ? next.slice(0, MAX_TOASTS) : next;
      });

      return id;
    },
    [],
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  const container =
    typeof document !== 'undefined'
      ? createPortal(
          <>
            {ALL_POSITIONS.map((pos) => {
              const group = toasts.filter((t) => t.position === pos);
              if (group.length === 0) return null;
              return (
                <PositionGroup key={pos} $position={pos}>
                  {group.map((t) => (
                    <Toast key={t.id} toast={t} onDismiss={dismissToast} />
                  ))}
                </PositionGroup>
              );
            })}
          </>,
          document.body,
        )
      : null;

  return (
    <ToastContext.Provider value={{ addToast, dismissToast, dismissAll }}>
      {children}
      {container}
    </ToastContext.Provider>
  );
}
