import React from 'react';
import styled, { css } from 'styled-components';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'error' | 'warning';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  dot?: boolean;
}

const variantStyles = {
  default: css`
    background-color: ${({ theme }) => theme.colors['color-bg-muted']};
    color: ${({ theme }) => theme.colors['color-text-secondary']};
    border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
    color: ${({ theme }) => theme.colors['color-brand-primary']};
    border: 1px solid ${({ theme }) => theme.colors['color-brand-primary-muted']};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors['color-success-subtle']};
    color: ${({ theme }) => theme.colors['color-success-text']};
    border: 1px solid ${({ theme }) => theme.colors['color-success-border']};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors['color-error-subtle']};
    color: ${({ theme }) => theme.colors['color-error-text']};
    border: 1px solid ${({ theme }) => theme.colors['color-error-border']};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors['color-warning-subtle']};
    color: ${({ theme }) => theme.colors['color-warning-text']};
    border: 1px solid ${({ theme }) => theme.colors['color-warning-border']};
  `,
};

const StyledBadge = styled.span<{ $variant: BadgeVariant; $size: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  white-space: nowrap;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          padding: 1px 6px;
          font-size: 0.6875rem;
          line-height: 1.4;
        `
      : css`
          padding: 2px 8px;
          font-size: ${({ theme }) => theme.typography.fontSize.xs};
          line-height: 1.5;
        `}

  ${({ $variant }) => variantStyles[$variant]}
`;

const Dot = styled.span<{ $variant: BadgeVariant }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: currentColor;
`;

export function Badge({ variant = 'default', size = 'md', dot = false, children }: BadgeProps) {
  return (
    <StyledBadge $variant={variant} $size={size}>
      {dot && <Dot $variant={variant} />}
      {children}
    </StyledBadge>
  );
}
