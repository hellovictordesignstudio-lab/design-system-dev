import { AnchorHTMLAttributes, ReactNode } from 'react';

export type LinkVariant = 'default' | 'subtle' | 'inverse';
export type LinkSize = 'sm' | 'md' | 'lg';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: LinkVariant;
  size?: LinkSize;
  underline?: LinkUnderline;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isExternal?: boolean;
  isDisabled?: boolean;
  /** Render as a different element (e.g. for router integration) */
  as?: React.ElementType;
}
