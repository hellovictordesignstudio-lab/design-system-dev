import styled, { css } from 'styled-components';
import type { InputSize } from './TextInput.types';

const inputHeight: Record<InputSize, string> = { sm: '32px', md: '40px', lg: '48px' };
const inputFontSize: Record<InputSize, string> = { sm: '13px', md: '14px', lg: '16px' };
const inputPadX: Record<InputSize, string> = { sm: '12px', md: '16px', lg: '20px' };

export const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors['color-text-primary']};
  margin-bottom: 6px;
  line-height: 1.4;
`;

export const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors['color-error-default']};
  margin-left: 2px;
`;

export const InputGroup = styled.div<{
  $hasError: boolean;
  $hasSuccess: boolean;
  $isDisabled: boolean;
  $isReadOnly: boolean;
}>`
  display: flex;
  align-items: stretch;
  border-radius: 14px;
  overflow: hidden;
  border: 1.5px solid ${({ theme, $hasError, $hasSuccess }) =>
    $hasError
      ? theme.colors['color-error-default']
      : $hasSuccess
        ? theme.colors['color-success-default']
        : theme.colors['color-border-default']};
  background-color: ${({ theme, $isDisabled, $isReadOnly }) =>
    $isReadOnly ? theme.colors['color-bg-subtle'] : theme.colors['color-bg-default']};
  transition:
    border-color ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut},
    box-shadow ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut};

  ${({ theme, $isDisabled }) =>
    $isDisabled &&
    css`
      background-color: ${theme.colors['color-bg-subtle']};
      border-color: ${theme.colors['color-border-default']};
      opacity: 0.7;
      cursor: not-allowed;
    `}

  /* Focus ring — skipped for readOnly */
  ${({ $isReadOnly, $hasError, $hasSuccess }) =>
    !$isReadOnly &&
    css`
      &:focus-within {
        border-color: ${({ theme }) =>
          $hasError
            ? theme.colors['color-error-default']
            : $hasSuccess
              ? theme.colors['color-success-default']
              : theme.colors['color-brand-primary']};
        box-shadow: 0 0 0 3px
          ${({ theme }) =>
            $hasError
              ? theme.colors['color-error-subtle']
              : $hasSuccess
                ? theme.colors['color-success-subtle']
                : theme.colors['color-brand-primary-subtle']};
      }
    `}
`;

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const StyledInput = styled.input<{
  $size: InputSize;
  $hasLeftIcon: boolean;
  $hasRightSlot: boolean;
  $isDisabled: boolean;
}>`
  width: 100%;
  height: ${({ $size }) => inputHeight[$size]};
  font-size: ${({ $size }) => inputFontSize[$size]};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${({ $size, $hasLeftIcon }) => ($hasLeftIcon ? '36px' : inputPadX[$size])};
  padding-right: ${({ $size, $hasRightSlot }) => ($hasRightSlot ? '36px' : inputPadX[$size])};
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  line-height: 1;

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-text-tertiary']};
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: not-allowed;
    `}

  /* Strip browser default styles */
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

export const LeftIconSlot = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  pointer-events: none;
  flex-shrink: 0;
`;

export const RightIconSlot = styled.span<{
  $hasError: boolean;
  $hasSuccess: boolean;
}>`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  flex-shrink: 0;
  color: ${({ theme, $hasError, $hasSuccess }) =>
    $hasError
      ? theme.colors['color-error-default']
      : $hasSuccess
      ? theme.colors['color-success-default']
      : theme.colors['color-text-tertiary']};
`;

export const Addon = styled.div<{ $size: InputSize }>`
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  font-size: ${({ $size }) => inputFontSize[$size]};
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1;
`;

export const PrefixAddon = styled(Addon)`
  border-right: 1px solid ${({ theme }) => theme.colors['color-border-default']};
`;

export const SuffixAddon = styled(Addon)`
  border-left: 1px solid ${({ theme }) => theme.colors['color-border-default']};
`;

export const HelperText = styled.p<{ $isError: boolean }>`
  margin: 6px 0 0;
  font-size: 12px;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors['color-error-default'] : theme.colors['color-text-secondary']};
`;
