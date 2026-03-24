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
  color: var(--color-text-primary, #0C0D10);

  span.required {
    color: #D22232;
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
  border: 1.5px solid ${({ $hasError, $isFocused }) =>
    $hasError ? '#D22232' : $isFocused ? 'var(--color-border-brand, #0055FF)' : 'var(--color-border-default, #DDE1EA)'};
  background: ${({ $isDisabled }) =>
    $isDisabled ? 'var(--color-bg-tertiary, #EFF1F5)' : 'var(--color-bg-primary, #FFFFFF)'};
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};

  box-shadow: ${({ $hasError, $isFocused }) =>
    $isFocused
      ? $hasError
        ? '0 0 0 3px rgba(210,34,50,0.15)'
        : '0 0 0 3px var(--color-bg-brand-subtle, #E6EEFF)'
      : 'none'};

  &:hover:not([data-disabled='true']) {
    border-color: ${({ $hasError }) =>
      $hasError ? '#A81B28' : 'var(--color-border-strong, #C5CBDA)'};
  }
`;

export const Affix = styled.span<{ $size: NumberInputSize }>`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: ${({ $size }) => ($size === 'sm' ? '13px' : $size === 'lg' ? '15px' : '14px')};
  font-weight: 600;
  color: var(--color-text-tertiary, #9BA5BE);
  background: var(--color-bg-secondary, #F8F9FC);
  border-right: 1.5px solid var(--color-border-default, #DDE1EA);
  white-space: nowrap;
  user-select: none;

  &.suffix {
    border-right: none;
    border-left: 1.5px solid var(--color-border-default, #DDE1EA);
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
  color: var(--color-text-primary, #0C0D10);
  text-align: center;

  ${({ $size }) => sizeStyles[$size]}

  &::placeholder {
    color: var(--color-text-tertiary, #9BA5BE);
    font-weight: 400;
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--color-text-disabled, #9BA5BE);
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
  color: var(--color-text-secondary, #4A5270);
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  transition: background 0.12s, color 0.12s;
  border-left: 1.5px solid var(--color-border-default, #DDE1EA);

  ${({ $size }) => btnSizeStyles[$size]}

  &:first-child {
    border-left: none;
    border-right: 1.5px solid var(--color-border-default, #DDE1EA);
    order: -1;
  }

  &:hover:not(:disabled) {
    background: var(--color-bg-secondary, #F8F9FC);
    color: var(--color-text-brand, #0055FF);
  }

  &:active:not(:disabled) {
    background: var(--color-bg-brand-subtle, #E6EEFF);
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
  color: ${({ $hasError }) => ($hasError ? '#D22232' : 'var(--color-text-secondary, #4A5270)')};
  line-height: 1.5;
`;
