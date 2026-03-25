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
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
    color: ${({ theme }) => theme.colors['color-brand-primary-hover']};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors['color-success-subtle']};
    color: ${({ theme }) => theme.colors['color-success-text']};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors['color-error-subtle']};
    color: ${({ theme }) => theme.colors['color-error-text']};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors['color-warning-subtle']};
    color: ${({ theme }) => theme.colors['color-warning-text']};
  `,
};

const StyledBadge = styled.span<{ $variant: BadgeVariant; $size: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 9999px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: 600;
  white-space: nowrap;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          padding: 2px 8px;
          font-size: 10px;
          line-height: 1.4;
        `
      : css`
          padding: 4px 11px;
          font-size: 11px;
          line-height: 1.4;
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
