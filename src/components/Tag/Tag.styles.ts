import styled, { css } from 'styled-components';
import type { TagSize, TagVariant } from './Tag.types';

export const variantStyles: Record<
  Exclude<TagVariant, 'outline'>,
  ReturnType<typeof css>
> = {
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

export const StyledTag = styled.span<{
  $variant: TagVariant;
  $size: TagSize;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  border-radius: 9999px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-weight: 600;
  white-space: nowrap;
  box-sizing: border-box;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          padding: 2px 8px;
          font-size: 11px;
          line-height: 1.4;
        `
      : css`
          padding: 4px 11px;
          font-size: 12px;
          line-height: 1.4;
        `}

  ${({ $variant }) =>
    $variant === 'outline'
      ? css`
          background-color: transparent;
          border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
          color: ${({ theme }) => theme.colors['color-text-secondary']};
        `
      : variantStyles[$variant]}

`;

export const RemoveButton = styled.button<{ $size: TagSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: 50%;
  opacity: 0.75;
  flex-shrink: 0;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          width: 14px;
          height: 14px;
          margin-left: -2px;
        `
      : css`
          width: 16px;
          height: 16px;
          margin-left: -2px;
        `}

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    outline-offset: 1px;
  }
`;
