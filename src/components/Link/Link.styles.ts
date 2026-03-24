import styled, { css } from 'styled-components';
import type { LinkVariant, LinkSize, LinkUnderline } from './Link.types';

const sizeStyles = {
  sm: css`font-size: 13px; gap: 5px;`,
  md: css`font-size: 14px; gap: 6px;`,
  lg: css`font-size: 16px; gap: 7px;`,
};

const variantStyles: Record<LinkVariant, ReturnType<typeof css>> = {
  default: css`
    color: var(--color-text-brand, #0055FF);
    &:hover:not([aria-disabled='true']) { color: var(--color-interactive-hover, #0044CC); }
    &:active:not([aria-disabled='true']) { color: var(--color-interactive-active, #003399); }
  `,
  subtle: css`
    color: var(--color-text-secondary, #4A5270);
    &:hover:not([aria-disabled='true']) { color: var(--color-text-primary, #0C0D10); }
    &:active:not([aria-disabled='true']) { color: var(--color-text-primary, #0C0D10); }
  `,
  inverse: css`
    color: var(--color-text-inverse, #FFFFFF);
    &:hover:not([aria-disabled='true']) { color: rgba(255,255,255,0.8); }
    &:active:not([aria-disabled='true']) { color: rgba(255,255,255,0.65); }
  `,
};

const underlineStyles: Record<LinkUnderline, ReturnType<typeof css>> = {
  always: css`text-decoration: underline; text-underline-offset: 3px;`,
  hover: css`
    text-decoration: none;
    &:hover:not([aria-disabled='true']) { text-decoration: underline; text-underline-offset: 3px; }
  `,
  none: css`text-decoration: none;`,
};

interface StyledLinkProps {
  $variant: LinkVariant;
  $size: LinkSize;
  $underline: LinkUnderline;
  $isDisabled: boolean;
}

export const StyledLink = styled.a<StyledLinkProps>`
  display: inline-flex;
  align-items: center;
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-weight: 600;
  line-height: 1.5;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
  border-radius: 3px;
  outline: none;
  transition: color 0.12s, opacity 0.12s;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $underline }) => underlineStyles[$underline]}

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-interactive-focus, #99BDFF);
  }

  svg {
    flex-shrink: 0;
    width: ${({ $size }) => ($size === 'sm' ? '13px' : $size === 'lg' ? '17px' : '15px')};
    height: ${({ $size }) => ($size === 'sm' ? '13px' : $size === 'lg' ? '17px' : '15px')};
  }
`;
