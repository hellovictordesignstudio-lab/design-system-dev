import type React from 'react';

export type TagVariant = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'outline';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  children: React.ReactNode;
  /** Shows a dismiss control and calls this when activated. */
  onRemove?: () => void;
  /** Accessible label for the remove control (e.g. "Remove tag"). */
  removeLabel?: string;
  className?: string;
}
