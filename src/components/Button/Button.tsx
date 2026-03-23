import React from 'react';
import styled, { css } from 'styled-components';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: css`
    height: 32px;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    gap: ${({ theme }) => theme.spacing[1]};
  `,
  md: css`
    height: 40px;
    padding: 0 ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
  lg: css`
    height: 48px;
    padding: 0 ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors['color-brand-primary']};
    color: ${({ theme }) => theme.colors['color-brand-on-primary']};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-brand-primary-hover']};
    }
    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-brand-primary-active']};
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-muted']};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors['color-bg-default']};
    color: ${({ theme }) => theme.colors['color-text-primary']};
    border: 1px solid ${({ theme }) => theme.colors['color-border-default']};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
      border-color: ${({ theme }) => theme.colors['color-border-strong']};
    }
    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-bg-muted']};
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-muted']};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors['color-text-primary']};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
    }
    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-bg-muted']};
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-muted']};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors['color-error-default']};
    color: #ffffff;
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors['color-error-text']};
    }
    &:active:not(:disabled) {
      filter: brightness(0.9);
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-error-subtle']};
    }
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  text-decoration: none;
  outline: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  transition:
    background-color ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut},
    color ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut},
    border-color ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut},
    box-shadow ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut},
    opacity ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: wait;
      pointer-events: none;

      > *:not(.btn-spinner) {
        opacity: 0;
      }
    `}
`;

const SpinnerWrapper = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  svg {
    animation: spin 0.8s linear infinite;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const iconSize: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 };

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <SpinnerWrapper className="btn-spinner">
          <Loader2 size={iconSize[size]} />
        </SpinnerWrapper>
      )}
      {leftIcon && !isLoading && <IconWrapper>{leftIcon}</IconWrapper>}
      {children}
      {rightIcon && !isLoading && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledButton>
  );
}
