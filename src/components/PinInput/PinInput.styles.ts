import styled, { css } from 'styled-components';
import type { PinInputSize } from './PinInput.types';

const sizeStyles = {
  sm: css`width: 36px; height: 40px; font-size: 16px;`,
  md: css`width: 44px; height: 52px; font-size: 20px;`,
  lg: css`width: 56px; height: 64px; font-size: 24px;`,
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-primary, #0C0D10);

  span.required {
    color: #D22232;
    margin-left: 3px;
  }
`;

export const InputsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface CellProps {
  $size: PinInputSize;
  $hasError: boolean;
  $isFocused: boolean;
  $isFilled: boolean;
  $isDisabled: boolean;
}

export const Cell = styled.input<CellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'JetBrains Mono', 'Nunito Sans', monospace;
  font-weight: 700;
  border-radius: 10px;
  outline: none;
  border: 2px solid ${({ $hasError, $isFocused, $isFilled }) =>
    $hasError
      ? '#D22232'
      : $isFocused
      ? 'var(--color-border-brand, #0055FF)'
      : $isFilled
      ? 'var(--color-border-strong, #C5CBDA)'
      : 'var(--color-border-default, #DDE1EA)'};
  background: ${({ $isDisabled }) =>
    $isDisabled ? 'var(--color-bg-tertiary, #EFF1F5)' : 'var(--color-bg-primary, #FFFFFF)'};
  color: var(--color-text-primary, #0C0D10);
  transition: border-color 0.15s, box-shadow 0.15s;
  caret-color: var(--color-interactive-default, #0055FF);
  padding: 0;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'text')};

  ${({ $size }) => sizeStyles[$size]}

  box-shadow: ${({ $isFocused, $hasError }) =>
    $isFocused
      ? $hasError
        ? '0 0 0 3px rgba(210,34,50,0.15)'
        : '0 0 0 3px var(--color-bg-brand-subtle, #E6EEFF)'
      : 'none'};

  /* Hide cursor blinking on number inputs */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button { -webkit-appearance: none; }
`;

export const Separator = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-tertiary, #9BA5BE);
  user-select: none;
  flex-shrink: 0;
`;

export const HelperText = styled.span<{ $hasError: boolean }>`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $hasError }) => ($hasError ? '#D22232' : 'var(--color-text-secondary, #4A5270)')};
  line-height: 1.5;
`;
