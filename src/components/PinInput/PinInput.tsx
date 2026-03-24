import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { Wrapper, Label, InputsRow, Cell, Separator, HelperText } from './PinInput.styles';
import type { PinInputProps } from './PinInput.types';

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      label,
      helperText,
      errorText,
      length = 6,
      size = 'md',
      type = 'number',
      mask = false,
      isDisabled = false,
      isRequired = false,
      hasError = false,
      autoFocus = false,
      value,
      defaultValue = '',
      placeholder = '○',
      onChange,
      onComplete,
      id,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(() => {
      const initial = (isControlled ? value : defaultValue) ?? '';
      return Array.from({ length }, (_, i) => initial[i] ?? '');
    });

    const cells = isControlled
      ? Array.from({ length }, (_, i) => (value ?? '')[i] ?? '')
      : internalValue;

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    useEffect(() => {
      if (autoFocus) inputRefs.current[0]?.focus();
    }, [autoFocus]);

    const update = useCallback(
      (newCells: string[]) => {
        if (!isControlled) setInternalValue(newCells);
        const joined = newCells.join('');
        onChange?.(joined);
        if (newCells.every((c) => c !== '') && joined.length === length) {
        onComplete?.(joined);
        }
      },
      [isControlled, length, onChange, onComplete]
    );

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const char = raw.slice(-1);
      const isValid =
        type === 'number' ? /^\d$/.test(char) : /^[a-zA-Z0-9]$/.test(char);

      if (!isValid && char !== '') return;

      const newCells = [...cells];
      newCells[index] = char;
      update(newCells);

      if (char !== '' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (cells[index] !== '') {
          const newCells = [...cells];
          newCells[index] = '';
          update(newCells);
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          const newCells = [...cells];
          newCells[index - 1] = '';
          update(newCells);
        }
      }
      if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
      if (e.key === 'ArrowRight' && index < length - 1) inputRefs.current[index + 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').slice(0, length);
      const filtered = pasted
        .split('')
        .filter((c) => (type === 'number' ? /^\d$/.test(c) : /^[a-zA-Z0-9]$/.test(c)));
      const newCells = Array.from({ length }, (_, i) => filtered[i] ?? '');
      update(newCells);
      const nextEmpty = newCells.findIndex((c) => c === '');
      const focusIdx = nextEmpty === -1 ? length - 1 : nextEmpty;
      inputRefs.current[focusIdx]?.focus();
    };

    const showError = hasError && !!errorText;
    const showHelper = !showError && !!helperText;
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    // Show separator between groups of 3 when length === 6
    const showSeparator = length === 6;

    return (
      <Wrapper ref={ref}>
        {label && (
          <Label htmlFor={`${inputId}-0`}>
            {label}
            {isRequired && <span className="required">*</span>}
          </Label>
        )}

        <InputsRow role="group" aria-label={label ?? 'PIN input'}>
          {cells.map((cell, index) => (
            <React.Fragment key={index}>
              {showSeparator && index === 3 && <Separator>–</Separator>}
              <Cell
                ref={(el) => { inputRefs.current[index] = el; }}
                id={index === 0 ? inputId : undefined}
                $size={size}
                $hasError={hasError}
                $isFocused={focusedIndex === index}
                $isFilled={cell !== ''}
                $isDisabled={isDisabled}
                type={mask ? 'password' : type === 'number' ? 'tel' : 'text'}
                inputMode={type === 'number' ? 'numeric' : 'text'}
                maxLgth={1}
                value={cell}
                placeholder={focusedIndex === index ? '' : placeholder}
                disabled={isDisabled}
                required={isRequired && index === 0}
                autoComplete="one-time-code"
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                aria-label={`Digit ${index + 1} of ${length}`}
              />
            </React.Fragment>
          ))}
        </InputsRow>

        {showError && <HelperText $hasError>{errorText}</HelperText>}
        {showHelper && <HelperText $hasError={false}>{helperText}</HelperText>}
      </Wrapper>
    );
  }
);

PinInput.displayName = 'PinInput';

export default PinInput;
