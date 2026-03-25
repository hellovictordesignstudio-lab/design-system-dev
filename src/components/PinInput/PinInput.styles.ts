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
  color: ${({ theme }) => theme.colors['color-text-primary']};

  span.required {
    color: ${({ theme }) => theme.colors['color-error-default']};
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
  border: 2px solid
    ${({ theme, $hasError, $isFocused, $isFilled }) =>
      $hasError
        ? theme.colors['color-error-default']
        : $isFocused
          ? theme.colors['color-border-focus']
          : $isFilled
            ? theme.colors['color-border-strong']
            : theme.colors['color-border-default']};
  background: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors['color-bg-muted'] : theme.colors['color-bg-default']};
  color: ${({ theme }) => theme.colors['color-text-primary']};
  transition: border-color 0.15s, box-shadow 0.15s;
  caret-color: ${({ theme }) => theme.colors['color-brand-primary']};
  padding: 0;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'text')};

  ${({ $size }) => sizeStyles[$size]}

  box-shadow: ${({ theme, $isFocused, $hasError }) =>
    $isFocused
      ? $hasError
        ? theme.mode === 'dark'
          ? '0 0 0 3px rgba(255, 69, 58, 0.2)'
          : '0 0 0 3px rgba(210, 34, 50, 0.15)'
        : `0 0 0 3px ${theme.colors['color-brand-primary-subtle']}`
      : 'none'};

  /* Hide cursor blinking on number inputs */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const Separator = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  user-select: none;
  flex-shrink: 0;
`;

export const HelperText = styled.span<{ $hasError: boolean }>`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors['color-error-default'] : theme.colors['color-text-secondary']};
  line-height: 1.5;
`;
