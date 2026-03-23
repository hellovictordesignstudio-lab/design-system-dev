import React, { useRef, useEffect, useId } from 'react';
import styled from 'styled-components';
import { Check, Minus } from 'lucide-react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  errorText?: string;
  size?: CheckboxSize;
  onChange?: (checked: boolean) => void;
  id?: string;
}

const BOX_SIZE: Record<CheckboxSize, number> = { sm: 16, md: 18, lg: 20 };
const ICON_SIZE: Record<CheckboxSize, number> = { sm: 10, md: 12, lg: 14 };

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`;

const CheckboxBox = styled.span<{
  $size: CheckboxSize;
  $checked: boolean;
  $indeterminate: boolean;
  $hasError: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => BOX_SIZE[$size]}px;
  height: ${({ $size }) => BOX_SIZE[$size]}px;
  border-radius: 5px;
  background-color: ${({ $checked, $indeterminate }) =>
    $checked || $indeterminate ? '#0055FF' : '#ffffff'};
  border: 1.5px solid
    ${({ $checked, $indeterminate, $hasError }) => {
      if ($hasError) return '#D22232';
      if ($checked || $indeterminate) return '#0055FF';
      return '#C8D4E8';
    }};
  color: #ffffff;
  transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
`;

const Row = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;

  &:focus-within ${CheckboxBox} {
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.12);
  }
`;

const Wrapper = styled.label<{ $isDisabled: boolean }>`
  display: inline-flex;
  flex-direction: column;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  user-select: none;

  &:hover:not([data-disabled]) ${CheckboxBox} {
    border-color: #0055FF;
  }
`;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const HelperText = styled.span<{ $indent: number }>`
  font-size: 12px;
  color: #9ba5be;
  margin-top: 4px;
  padding-left: ${({ $indent }) => $indent}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const ErrorText = styled.span<{ $indent: number }>`
  font-size: 12px;
  color: #d22232;
  margin-top: 4px;
  padding-left: ${({ $indent }) => $indent}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export function Checkbox({
  checked = false,
  indeterminate = false,
  isDisabled = false,
  isRequired = false,
  label,
  helperText,
  hasError = false,
  errorText,
  size = 'md',
  onChange,
  id,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id ?? autoId;
  const indent = BOX_SIZE[size] + 8;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !checked;
    }
  }, [indeterminate, checked]);

  return (
    <Wrapper
      htmlFor={inputId}
      $isDisabled={isDisabled}
      {...(isDisabled ? { 'data-disabled': '' } : {})}
    >
      <Row>
        <HiddenInput
          ref={inputRef}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={isDisabled}
          required={isRequired}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <CheckboxBox
          $size={size}
          $checked={checked}
          $indeterminate={indeterminate && !checked}
          $hasError={hasError}
        >
          {checked && <Check size={ICON_SIZE[size]} strokeWidth={3} />}
          {!checked && indeterminate && <Minus size={ICON_SIZE[size]} strokeWidth={3} />}
        </CheckboxBox>
        {label && (
          <LabelText>
            {label}
            {isRequired && ' *'}
          </LabelText>
        )}
      </Row>
      {helperText && !errorText && <HelperText $indent={indent}>{helperText}</HelperText>}
      {hasError && errorText && <ErrorText $indent={indent}>{errorText}</ErrorText>}
    </Wrapper>
  );
}
