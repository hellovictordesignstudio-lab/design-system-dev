import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonGroupVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonGroupSize = 'sm' | 'md' | 'lg';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface ButtonGroupProps {
  children: ReactNode;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  orientation?: ButtonGroupOrientation;
  isDisabled?: boolean;
  isAttached?: boolean;
  fullWidth?: boolean;
  gap?: number;
  'aria-label'?: string;
}
