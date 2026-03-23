import React, { useId } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import type { TextInputProps } from './TextInput.types';
import {
  FieldRoot,
  Label,
  RequiredIndicator,
  InputGroup,
  InputWrapper,
  StyledInput,
  LeftIconSlot,
  RightIconSlot,
  PrefixAddon,
  SuffixAddon,
  HelperText,
} from './TextInput.styles';

export function TextInput({
  label,
  placeholder,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  size = 'md',
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  hasError = false,
  hasSuccess = false,
  id,
  name,
  value,
  onChange,
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  // Status icons take precedence over rightIcon
  const statusIcon = hasError
    ? <AlertCircle size={16} />
    : hasSuccess
    ? <CheckCircle size={16} />
    : null;

  const rightSlotContent = statusIcon ?? rightIcon ?? null;
  const hasRightSlot = rightSlotContent !== null;
  const hasLeftIcon = leftIcon !== null && leftIcon !== undefined;

  // errorText shown only when hasError is true; falls back to helperText
  const displayHelper = hasError && errorText ? errorText : helperText;
  const isHelperError = !!(hasError && errorText);

  const helperId = displayHelper ? `${inputId}-helper` : undefined;

  return (
    <FieldRoot>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {isRequired && <RequiredIndicator aria-hidden="true">*</RequiredIndicator>}
        </Label>
      )}

      <InputGroup
        $hasError={hasError}
        $hasSuccess={hasSuccess}
        $isDisabled={isDisabled}
        $isReadOnly={isReadOnly}
      >
        {prefix && <PrefixAddon $size={size}>{prefix}</PrefixAddon>}

        <InputWrapper>
          {hasLeftIcon && <LeftIconSlot>{leftIcon}</LeftIconSlot>}

          <StyledInput
            id={inputId}
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            aria-invalid={hasError || undefined}
            aria-describedby={helperId}
            $size={size}
            $hasLeftIcon={hasLeftIcon}
            $hasRightSlot={hasRightSlot}
            $isDisabled={isDisabled}
          />

          {hasRightSlot && (
            <RightIconSlot $hasError={hasError} $hasSuccess={hasSuccess}>
              {rightSlotContent}
            </RightIconSlot>
          )}
        </InputWrapper>

        {suffix && <SuffixAddon $size={size}>{suffix}</SuffixAddon>}
      </InputGroup>

      {displayHelper && (
        <HelperText id={helperId} $isError={isHelperError}>
          {displayHelper}
        </HelperText>
      )}
    </FieldRoot>
  );
}
