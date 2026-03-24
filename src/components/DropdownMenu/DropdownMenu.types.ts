import type { ReactElement, ReactNode } from 'react';

export type DropdownMenuPlacement =
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end';

export interface DropdownMenuProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: DropdownMenuPlacement;
  children: ReactNode;
}

export interface DropdownMenuTriggerProps {
  children: ReactElement;
}

export interface DropdownMenuContentProps {
  children: ReactNode;
  width?: number;
  /** Offset from trigger in px */
  offset?: number;
}

export interface DropdownMenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  isDisabled?: boolean;
  isDestructive?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuSeparatorProps {
  /** Present for a11y tree consistency */
  'aria-hidden'?: boolean;
}

export interface DropdownMenuLabelProps {
  children: ReactNode;
}
