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
    padding: 0 16px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    gap: ${({ theme }) => theme.spacing[1]};
  `,
  md: css`
    height: 40px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
  lg: css`
    height: 48px;
    padding: 0 32px;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
};

const variantStyles = {
  primary: css`
    background-color: var(--color-brand-primary);
    color: var(--color-brand-on-primary);
    border: 1px solid transparent;
    font-weight: 600;

    &:hover:not(:disabled) {
      background-color: var(--color-brand-primary-hover);
    }
    &:active:not(:disabled) {
      background-color: var(--color-brand-primary-active);
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-primary) 38%, transparent);
    }
  `,
  secondary: css`
    background-color: transparent;
    color: var(--color-brand-primary);
    border: 1.5px solid var(--color-brand-primary);
    font-weight: 600;

    &:hover:not(:disabled) {
      background-color: var(--color-brand-primary-subtle);
    }
    &:active:not(:disabled) {
      background-color: var(--color-brand-primary-muted);
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-primary) 38%, transparent);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: var(--color-text-secondary);
    border: 1px solid transparent;
    font-weight: 600;

    &:hover:not(:disabled) {
      background-color: var(--color-bg-subtle);
    }
    &:active:not(:disabled) {
      background-color: var(--color-bg-muted);
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-primary) 38%, transparent);
    }
  `,
  danger: css`
    background-color: var(--color-error-default);
    color: var(--color-brand-on-primary);
    border: 1px solid transparent;
    font-weight: 600;

    &:hover:not(:disabled) {
      filter: brightness(0.92);
    }
    &:active:not(:disabled) {
      filter: brightness(0.85);
    }
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error-default) 42%, transparent);
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
  border-radius: 9999px;
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
