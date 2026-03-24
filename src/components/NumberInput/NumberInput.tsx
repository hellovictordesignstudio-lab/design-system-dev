import React, { forwardRef, useState, useCallback, useRef } from 'react';
import {
  Wrapper, Label, InputWrapper, StyledInput,
  StepBtn, Affix, HelperText,
} from './NumberInput.styles';
import type { NumberInputProps } from './NumberInput.types';

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      value,
      defaultValue,
      min,
      max,
      step = 1,
      precision,
      prefix,
      suffix,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      hasError = false,
      noControls = false,
      onChange,
      id,
      ...rest
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<number | undefined>(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const current = isControlled ? value : internalValue;

    const clamp = useCallback(
      (val: number) => {
        let clamped = val;
        if (min !== undefined) clamped = Math.max(min, clamped);
        if (max !== undefined) clamped = Math.min(max, clamped);
        if (precision !== undefined) {
          clamped = parseFloat(clamped.toFixed(precision));
        }
        return clamped;
      },
      [min, max, precision]
    );

    const update = useCallback(
      (val: number | undefined) => {
        if (!isControlled) setInternalValue(val);
        onChange?.(val);
      },
      [isControlled, onChange]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === '' || raw === '-') {
        update(undefined);
        return;
      }
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) update(parsed);
    };

    const handleBlur = () => {
      setIsFocused(false);
      if (current !== undefined) update(clamp(current));
    };

    const increment = () => {
      const next = clamp((current ?? 0) + step);
      update(next);
    };

    const decrement = () => {
      const next = clamp((current ?? 0) - step);
      update(next);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); increment(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); decrement(); }
    };

    const isDecrementDisabled = isDisabled || isReadOnly || (min !== undefined && (current ?? 0) <= min);
    const isIncrementDisabled = isDisabled || isReadOnly || (max !== undefined && (current ?? 0) >= max);
    const showError = hasError && !!errorText;
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <Wrapper>
        {label && (
          <Label htmlFor={inputId}>
            {label}
            {isRequired && <span className="required">*</span>}
          </Label>
        )}

        <InputWrapper
          $size={size}
          $hasError={hasError}
          $isDisabled={isDisabled}
          $isFocused={isFocused}
          data-disabled={isDisabled}
        >
          {!noControls && (
            <StepBtn
              $size={size}
              type="button"
              onClick={decrement}
              disabled={isDecrementDisabled}
              aria-label="Decrease value"
              tabIndex={-1}
            >
              −
            </StepBtn>
          )}

          {prefix && <Affix $size={size}>{prefix}</Affix>}

          <StyledInput
            ref={ref}
            id={inputId}
            $size={size}
            type="number"
            value={current ?? ''}
            min={min}
            max={max}
            step={step}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            onChange={handleChange}
            onFocus={() => setIsFocused(te)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-invalid={hasError || undefined}
            aria-required={isRequired || undefined}
            aria-describedby={showError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...rest}
          />

          {suffix && <Affix $size={size} className="suffix">{suffix}</Affix>}

          {!noControls && (
            <StepBtn
              $size={size}
              type="button"
              onClick={increment}
              disabled={isIncrementDisabled}
              aria-label="Increase value"
              tabIndex={-1}
            >
              +
            </StepBtn>
          )}
        </InputWrapper>

        {showError && (
          <HelperText id={`${inputId}-error`} $hasError={true}>{errorText}</HelperText>
        )}
        {!showError && helperText && (
          <HelperText id={`${inputId}-helper`} $hasError={false}>{helperText}</HelperText>
        )}
      </Wrapper>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
