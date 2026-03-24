import styled, { css } from 'styled-components';
import type { ButtonGroupVariant, ButtonGroupSize, ButtonGroupOrientation } from './ButtonGroup.types';

interface GroupWrapperProps {
  $orientation: ButtonGroupOrientation;
  $isAttached: boolean;
  $fullWidth: boolean;
  $gap: number;
}

export const GroupWrapper = styled.div<GroupWrapperProps>`
  display: inline-flex;
  flex-direction: ${({ $orientation }) => ($orientation === 'vertical' ? 'column' : 'row')};
  align-items: ${({ $orientation }) => ($orientation === 'vertical' ? 'stretch' : 'center')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $isAttached, $gap }) =>
    !$isAttached &&
    css`
      gap: ${$gap}px;
    `}

  ${({ $isAttached, $orientation }) =>
    $isAttached &&
    css`
      & > button {
        border-radius: 0;
        position: relative;
      }

      ${$orientation === 'horizontal'
        ? css`
            & > button:first-child { border-radius: 8px 0 0 8px; }
            & > button:last-child { border-radius: 0 8px 8px 0; }
            & > button:not(:first-child) { margin-left: -1px; }
          `
        : css`
            & > button:first-child { border-radius: 8px 8px 0 0; }
            & > button:last-child { border-radius: 0 0 8px 8px; }
            & > button:not(:first-child) { margin-top: -1px; }
          `}

      & > button:hover,
      & > button:focus-visible,
      & > button[data-active='true'] {
        z-index: 1;
      }
    `}
`;

const sizeStyles = {
  sm: css`height: 32px; padding: 0 12px; font-size: 13px; gap: 6px;`,
  md: css`height: 40px; padding: 0 16px; font-size: 14px; gap: 8px;`,
  lg: css`height: 48px; padding: 0 20px; font-size: 15px; gap: 8px;`,
};

const variantStyles = (isActive: boolean) => ({
  primary: css`
    background: ${isActive ? 'var(--color-interactive-active, #003399)' : 'var(--color-interactive-default, #0055FF)'};
    color: var(--color-text-inverse, #fff);
    border: 1.5px solid transparent;
    &:hover:not(:disabled) { background: var(--color-interactive-hover, #0044CC); }
    &:active:not(:disabled) { background: var(--color-interactive-active, #003399); }
  `,
  secondary: css`
    background: transparent;
    color: ${isActive ? 'var(--color-interactive-active, #003399)' : 'var(--color-text-brand, #0055FF)'};
    border: 1.5px solid ${isActive ? 'var(--color-interactive-active, #003399)' : 'var(--color-border-brand, #0055FF)'};
    &:hover:not(:disabled) {
      background: var(--color-bg-brand-subtle, #E6EEFF);
      border-color: var(--color-interactive-hover, #0044CC);
      color: var(--color-interactive-hover, #0044CC);
    }
  `,
  ghost: css`
    background: ${isActive ? 'var(--color-bg-brand-subtle, #E6EEFF)' : 'transparent'};
    color: ${isActive ? 'var(--color-interactive-active, #003399)' : 'var(--color-text-brand, #0055FF)'};
    border: 1.5px solid transparent;
    &:hover:not(:disabled) { background: var(--color-bg-brand-subtle, #E6EEFF); }
  `,
  destructive: css`
    background: ${isActive ? '#A81B28' : '#D22232'};
    color: #fff;
    border: 1.5px solid transparent;
    &:hover:not(:disabled) { background: #A81B28; }
    &:active:not(:disabled) { background: #881522; }
  `,
});

interface StyledButtonProps {
  $variant: ButtonGroupVariant;
  $size: ButtonGroupSize;
  $isActive: boolean;
  $fullWidth: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.12s, color 0.12s, border-color 0.12s, box-shadow 0.12s;
  outline: none;
  flex: ${({ $fullWidth }) => ($fullWidth ? '1' : '0 0 auto')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant, $isActive }) => variantStyles($isActive)[$variant]}

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-interactive-focus, #99BDFF);
    z-index: 2;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  svg {
    width: ${({ $size }) => ($size === 'sm' ? '14px' : $size === 'lg' ? '18px' : '16px')};
    height: ${({ $size }) => ($size === 'sm' ? '14px' : $size === 'lg' ? '18px' : '16px')};
    flex-shrink: 0;
  }
`;
