import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Wrapper, Label, StyledTextarea, Footer, HelperText, CharCount } from './Textarea.styles';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      resize = 'vertical',
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      hasError = false,
      hasSuccess = false,
      showCount = false,
      maxLength,
      autoResize = false,
      id,
      onChange,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? internalRef;

    const [charCount, setCharCount] = useState(() => {
      const initial = value ?? defaultValue ?? '';
      return String(initial).length;
    });

    const grow = useCallback(() => {
      const el = textareaRef.current;
      if (!el || !autoResize) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize, textareaRef]);

    useEffect(() => {
      grow();
    }, [grow, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      grow();
      onChange?.(e);
    };

    const showError = hasError && !!errorText;
    const showHelper = !showError && !!helperText;
    const showFooter = showError || showHelper || (showCount && maxLength !== undefined);
    const isOver = maxLength !== undefined && charCount > maxLength;
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <Wrapper>
        {label && (
          <Label htmlFor={inputId}>
            {label}
            {isRequired && <span className="required">*</span>}
          </Label>
        )}

        <StyledTextarea
          ref={textareaRef}
          id={inputId}
          $size={size}
          $resize={autoResize ? 'none' : resize}
          $hasError={hasError || isOver}
          $hasSuccess={hasSuccess}
          $isDisabled={isDisabled}
          $isReadOnly={isReadOnly}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={hasError || isOver || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={
            showError ? `${inputId}-error` : showHelper ? `${inputId}-helper` : undefined
          }
          {...rest}
        />

        {showFooter && (
          <Footer $hasError={hasError}>
            {showError && (
              <HelperText id={`${inputId}-error`} $hasError={true} $hasSuccess={false}>
                {errorText}
              </HelperText>
            )}
            {showHelper && (
              <HelperText id={`${inputId}-helper`} $hasError={false} $hasSuccess={hasSuccess}>
                {helperText}
              </HelperText>
            )}
            {showCount && maxLength !== undefined && (
              <CharCount $isOver={isOver}>
                {charCount}/{maxLength}
              </CharCount>
            )}
          </Footer>
        )}
      </Wrapper>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
