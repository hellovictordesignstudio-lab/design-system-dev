import React, { createContext, useContext, useId } from 'react';
import styled from 'styled-components';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps {
  checked?: boolean;
  value: string;
  name?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  errorText?: string;
  size?: RadioSize;
  onChange?: (value: string) => void;
  id?: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  children: React.ReactNode;
}

const BOX_SIZE: Record<RadioSize, number> = { sm: 16, md: 18, lg: 20 };
const DOT_SIZE: Record<RadioSize, number> = { sm: 6, md: 8, lg: 10 };

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`;

const RadioCircle = styled.span<{
  $size: RadioSize;
  $checked: boolean;
  $hasError: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => BOX_SIZE[$size]}px;
  height: ${({ $size }) => BOX_SIZE[$size]}px;
  border-radius: 50%;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors['color-brand-primary'] : theme.colors['color-bg-default']};
  border: 1.5px solid
    ${({ theme, $checked, $hasError }) => {
      if ($hasError) return theme.colors['color-error-default'];
      if ($checked) return theme.colors['color-brand-primary'];
      return theme.colors['color-border-default'];
    }};
  transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
`;

const RadioDot = styled.span<{ $size: RadioSize }>`
  width: ${({ $size }) => DOT_SIZE[$size]}px;
  height: ${({ $size }) => DOT_SIZE[$size]}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors['color-brand-on-primary']};
`;

const Row = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;

  &:focus-within ${RadioCircle} {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  }
`;

const Wrapper = styled.label<{ $isDisabled: boolean }>`
  display: inline-flex;
  flex-direction: column;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  user-select: none;

  &:hover:not([data-disabled]) ${RadioCircle} {
    border-color: ${({ theme }) => theme.colors['color-brand-primary']};
  }
`;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const HelperText = styled.span<{ $indent: number }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin-top: 4px;
  padding-left: ${({ $indent }) => $indent}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const ErrorText = styled.span<{ $indent: number }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-error-text']};
  margin-top: 4px;
  padding-left: ${({ $indent }) => $indent}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const GroupContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
`;

export function RadioGroup({ name, value, onChange, size, children }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, size }}>
      <GroupContainer role="radiogroup">{children}</GroupContainer>
    </RadioGroupContext.Provider>
  );
}

export function Radio({
  checked,
  value,
  name,
  isDisabled = false,
  isRequired = false,
  label,
  helperText,
  hasError = false,
  errorText,
  size = 'md',
  onChange,
  id,
}: RadioProps) {
  const groupCtx = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? autoId;

  const effectiveName = groupCtx?.name ?? name;
  const effectiveChecked = groupCtx ? groupCtx.value === value : (checked ?? false);
  const effectiveSize = groupCtx?.size ?? size;
  const indent = BOX_SIZE[effectiveSize] + 8;

  function handleChange() {
    if (groupCtx) {
      groupCtx.onChange?.(value);
    } else {
      onChange?.(value);
    }
  }

  return (
    <Wrapper
      htmlFor={inputId}
      $isDisabled={isDisabled}
      {...(isDisabled ? { 'data-disabled': '' } : {})}
    >
      <Row>
        <HiddenInput
          id={inputId}
          type="radio"
          name={effectiveName}
          value={value}
          checked={effectiveChecked}
          disabled={isDisabled}
          required={isRequired}
          onChange={handleChange}
        />
        <RadioCircle $size={effectiveSize} $checked={effectiveChecked} $hasError={hasError}>
          {effectiveChecked && <RadioDot $size={effectiveSize} />}
        </RadioCircle>
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
