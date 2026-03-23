import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { ToastItem, ToastVariant } from './Toast.types';
import {
  ToastCard,
  IconSlot,
  ContentSlot,
  ToastTitle,
  ToastMessage,
  DismissButton,
  ProgressBar,
} from './Toast.styles';

// ── Icon map ──────────────────────────────────────────────────────────────────

const variantIcons: Record<ToastVariant, React.ReactElement> = {
  success: <CheckCircle  size={18} />,
  error:   <AlertCircle  size={18} />,
  warning: <AlertTriangle size={18} />,
  info:    <Info         size={18} />,
};

// ── Props ─────────────────────────────────────────────────────────────────────

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Toast({ toast, onDismiss }: ToastProps) {
  const { id, variant, message, title, duration, isExiting } = toast;
  const [isPaused, setIsPaused] = useState(false);

  // Refs for pause-aware countdown
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef<number>(duration);

  // Start / resume / pause the auto-dismiss timer.
  // Effect runs on mount and whenever isPaused or isExiting changes.
  useEffect(() => {
    // No auto-dismiss when duration=0 or while the exit animation is playing
    // (onDismiss already fired — don't call it twice).
    if (duration === 0 || isExiting || isPaused) return;

    const startedAt = Date.now();

    timerRef.current = setTimeout(() => onDismiss(id), remainingRef.current);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        // Deduct elapsed time so resume continues from the right point
        remainingRef.current = Math.max(
          0,
          remainingRef.current - (Date.now() - startedAt),
        );
      }
    };
  // onDismiss is stable (useCallback in provider); id and duration never change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isExiting]);

  return (
    <ToastCard
      $variant={variant}
      $isExiting={isExiting}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <IconSlot $variant={variant}>{variantIcons[variant]}</IconSlot>

      <ContentSlot>
        {title && <ToastTitle>{title}</ToastTitle>}
        <ToastMessage>{message}</ToastMessage>
      </ContentSlot>

      <DismissButton
        aria-label="Dismiss notification"
        onClick={() => onDismiss(id)}
      >
        <X size={14} />
      </DismissButton>

      {duration > 0 && (
        <ProgressBar
          $variant={variant}
          $duration={duration}
          $isPaused={isPaused}
        />
      )}
    </ToastCard>
  );
}
