import type { ReactNode } from 'react';
import type { ButtonProps } from '../Button/Button';

export type SplitButtonVariant = NonNullable<ButtonProps['variant']>;
export type SplitButtonSize = NonNullable<ButtonProps['size']>;

export interface SplitButtonMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  isDestructive?: boolean;
}

export interface SplitButtonProps extends Omit<ButtonProps, 'rightIcon' | 'children'> {
  /** Label for the main action (left segment). */
  primaryLabel: ReactNode;
  /** Items shown when the menu trigger is activated. */
  menuItems: SplitButtonMenuItem[];
  /** Called when a menu item is chosen. */
  onMenuItemSelect?: (id: string) => void;
  /** Aria label for the dropdown trigger. */
  menuTriggerAriaLabel?: string;
}
