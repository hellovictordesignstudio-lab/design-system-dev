import styled, { css } from 'styled-components';
import type { NumberInputSize } from './NumberInput.types';

const sizeStyles = {
  sm: css`height: 32px; font-size: 13px; padding: 0 10px;`,
  md: css`height: 40px; font-size: 14px; padding: 0 12px;`,
  lg: css`height: 48px; font-size: 15px; padding: 0 14px;`,
};

const btnSizeStyles = {
  sm: css`width: 28px; font-size: 15px;`,
  md: css`width: 34px; font-size: 17px;`,
  lg: css`width: 40px; font-size: 19px;`,
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
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

interface InputWrapperProps {
  $size: NumberInputSize;
  $hasError: boolean;
  $isDisabled: boolean;
  $isFocused: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: stretch;
  border-radius: 8px;
  border: 1.5px solid
    ${({ theme, $hasError, $isFocused }) =>
      $hasError
        ? theme.colors['color-error-default']
        : $isFocused
          ? theme.colors['color-border-focus']
          : theme.colors['color-border-default']};
  background: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors['color-bg-muted'] : theme.colors['color-bg-default']};
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};

  box-shadow: ${({ theme, $hasError, $isFocused }) =>
    $isFocused
      ? $hasError
        ? theme.mode === 'dark'
          ? '0 0 0 3px rgba(255, 69, 58, 0.2)'
          : '0 0 0 3px rgba(210, 34, 50, 0.15)'
        : `0 0 0 3px ${theme.colors['color-brand-primary-subtle']}`
      : 'none'};

  &:hover:not([data-disabled='true']) {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors['color-error-text'] : theme.colors['color-border-strong']};
  }
`;

export const Affix = styled.span<{ $size: NumberInputSize }>`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: ${({ $size }) => ($size === 'sm' ? '13px' : $size === 'lg' ? '15px' : '14px')};
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  background: ${({ theme }) => theme.colors['color-bg-subtle']};
  border-right: 1.5px solid ${({ theme }) => theme.colors['color-border-default']};
  white-space: nowrap;
  user-select: none;

  &.suffix {
    border-right: none;
    border-left: 1.5px solid ${({ theme }) => theme.colors['color-border-default']};
  }
`;

export const StyledInput = styled.input<{ $size: NumberInputSize }>`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  text-align: center;

  ${({ $size }) => sizeStyles[$size]}

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-text-tertiary']};
    font-weight: 400;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors['color-text-disabled']};
  }

  /* Hide native number arrows */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StepBtn = styled.button<{ $size: NumberInputSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  transition: background 0.12s, color 0.12s;
  border-left: 1.5px solid ${({ theme }) => theme.colors['color-border-default']};

  ${({ $size }) => btnSizeStyles[$size]}

  &:first-child {
    border-left: none;
    border-right: 1.5px solid ${({ theme }) => theme.colors['color-border-default']};
    order: -1;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors['color-bg-subtle']};
    color: ${({ theme }) => theme.colors['color-text-link']};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

export const HelperText = styled.span<{ $hasError: boolean }>`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors['color-error-default'] : theme.colors['color-text-secondary']};
  line-height: 1.5;
`;
