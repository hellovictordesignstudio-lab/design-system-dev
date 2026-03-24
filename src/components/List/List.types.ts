import type React from 'react';

export type ListVariant = 'default' | 'bordered';

export interface ListProps {
  variant?: ListVariant;
  /** Use ordered list semantics (ol). */
  ordered?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
  className?: string;
}

export interface ListItemProps {
  children: React.ReactNode;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  isDisabled?: boolean;
  className?: string;
}
