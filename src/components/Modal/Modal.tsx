import React, { createContext, useContext, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import {
  Overlay,
  Panel,
  StyledModalHeader,
  ModalHeaderContent,
  ModalTitle,
  ModalSubtitle,
  CloseButton,
  StyledModalBody,
  StyledModalFooter,
} from './Modal.styles';
import type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalContextValue,
} from './Modal.types';

// ── Context ───────────────────────────────────────────────────────────────────

const ModalContext = createContext<ModalContextValue>({ titleId: '' });

function useModalContext() {
  return useContext(ModalContext);
}

// ── Focus trap ────────────────────────────────────────────────────────────────

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function useFocusTrap(ref: React.RefObject<HTMLDivElement | null>, isOpen: boolean) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const panel = ref.current;

    // Focus the first focusable element, or the panel itself as fallback
    const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      panel.focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
      if (focusable.length === 0) { e.preventDefault(); return; }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    panel.addEventListener('keydown', handleKeyDown);
    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, ref]);
}

// ── Modal root ────────────────────────────────────────────────────────────────

function ModalRoot({
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  title,
  children,
}: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  useFocusTrap(panelRef, isOpen);

  if (!isOpen || typeof document === 'undefined') return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
  }

  return createPortal(
    <ModalContext.Provider value={{ titleId }}>
      <Overlay $isFullscreen={size === 'fullscreen'} onClick={handleOverlayClick}>
        <Panel
          ref={panelRef}
          $size={size}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {title && <ModalHeader title={title} onClose={onClose} />}
          {children}
        </Panel>
      </Overlay>
    </ModalContext.Provider>,
    document.body,
  );
}

// ── Modal.Header ──────────────────────────────────────────────────────────────

function ModalHeader({ title, subtitle, onClose, hasDivider = true }: ModalHeaderProps) {
  const { titleId } = useModalContext();
  return (
    <StyledModalHeader $hasDivider={hasDivider}>
      <ModalHeaderContent>
        <ModalTitle id={titleId}>{title}</ModalTitle>
        {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
      </ModalHeaderContent>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </CloseButton>
      )}
    </StyledModalHeader>
  );
}

// ── Modal.Body ────────────────────────────────────────────────────────────────

function ModalBody({ children, isScrollable = true }: ModalBodyProps) {
  return (
    <StyledModalBody $isScrollable={isScrollable}>
      {children}
    </StyledModalBody>
  );
}

// ── Modal.Footer ──────────────────────────────────────────────────────────────

function ModalFooter({ children, hasDivider = true, align = 'right' }: ModalFooterProps) {
  return (
    <StyledModalFooter $hasDivider={hasDivider} $align={align}>
      {children}
    </StyledModalFooter>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
