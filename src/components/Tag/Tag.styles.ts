import styled, { css } from 'styled-components';
import type { TagSize, TagVariant } from './Tag.types';

export const variantStyles: Record<
  Exclude<TagVariant, 'outline'>,
  ReturnType<typeof css>
> = {
  default: css`
    background-color: #f0f2f5;
    color: #4a5270;
  `,
  primary: css`
    background-color: #e8eeff;
    color: #2952cc;
  `,
  success: css`
    background-color: #e6f5ee;
    color: #1a7a45;
  `,
  error: css`
    background-color: #fceaec;
    color: #a81b28;
  `,
  warning: css`
    background-color: #fff0e3;
    color: #c05c00;
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
          border: 1px solid #dde1ea;
          color: #4a5270;

          [data-theme='dark'] &,
          .dark & {
            border-color: #2e3550;
            color: #9ba5be;
          }
        `
      : variantStyles[$variant]}

  [data-theme='dark'] &,
  .dark & {
    ${({ $variant }) =>
      $variant !== 'outline' &&
      css`
        filter: brightness(0.92);
      `}
  }
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
    outline: 2px solid #0055ff;
    outline-offset: 1px;
  }
`;
