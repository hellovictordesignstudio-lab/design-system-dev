import type React from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
export type ModalFooterAlign = 'left' | 'right' | 'space-between';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  /** Shorthand: auto-renders Modal.Header with a close button */
  title?: string;
  children?: React.ReactNode;
}

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  /** Renders the X close button when provided */
  onClose?: () => void;
  hasDivider?: boolean;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  /** Enables overflow-y: auto when content is taller than the panel (default: true) */
  isScrollable?: boolean;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  hasDivider?: boolean;
  align?: ModalFooterAlign;
}

export interface ModalContextValue {
  /** Stable ID applied to the header title — wired to aria-labelledby on the dialog */
  titleId: string;
}
