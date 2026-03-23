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
    background-color: #F0F2F5;
    color: #4A5270;
  `,
  primary: css`
    background-color: #E8EEFF;
    color: #2952CC;
  `,
  success: css`
    background-color: #E6F5EE;
    color: #1A7A45;
  `,
  error: css`
    background-color: #FCEAEC;
    color: #A81B28;
  `,
  warning: css`
    background-color: #FFF0E3;
    color: #C05C00;
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
