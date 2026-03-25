import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes, useTheme } from 'styled-components';
import { Check, ChevronDown } from 'lucide-react';
import type { ComboboxOption, ComboboxProps, ComboboxSize } from './Combobox.types';

const HEIGHTS: Record<ComboboxSize, string> = { sm: '32px', md: '40px', lg: '48px' };
const FONT_SIZE: Record<ComboboxSize, string> = { sm: '13px', md: '14px', lg: '16px' };
const PAD_X: Record<ComboboxSize, string> = { sm: '12px', md: '16px', lg: '20px' };

const fadeIn = keyframes`
  from { opacity: 0; transform: scaleY(0.96) translateY(-4px); }
  to   { opacity: 1; transform: scaleY(1)    translateY(0); }
`;

const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  margin-bottom: 6px;
`;

const InputWrap = styled.div<{
  $size: ComboboxSize;
  $isOpen: boolean;
  $hasError: boolean;
  $isDisabled: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: ${({ $size }) => HEIGHTS[$size]};
  padding: 0 ${({ $size }) => PAD_X[$size]};
  border-radius: 14px;
  border: 1.5px solid
    ${({ theme, $hasError, $isOpen }) =>
      $hasError
        ? theme.colors['color-error-default']
        : $isOpen
          ? theme.colors['color-border-focus']
          : theme.colors['color-border-strong']};
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  font-size: ${({ $size }) => FONT_SIZE[$size]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'text')};
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors['color-border-focus']};
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.2)' : 'rgba(0, 85, 255, 0.1)'};
  }

  ${({ $isDisabled, theme }) =>
    $isDisabled &&
    css`
      opacity: 0.7;
      background-color: ${theme.colors['color-bg-subtle']};
      border-color: ${theme.colors['color-border-default']};
    `}
`;

const NativeInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  color: ${({ theme }) => theme.colors['color-text-primary']};

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-text-tertiary']};
  }
`;

const ChevronBtn = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  flex-shrink: 0;
  transition: transform 200ms ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const PanelWrapper = styled.div<{ $openUp: boolean }>`
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  animation: ${fadeIn} 150ms ease forwards;
  transform-origin: ${({ $openUp }) => ($openUp ? 'bottom center' : 'top center')};
`;

const OptionsList = styled.ul`
  list-style: none;
  margin: 4px 0;
  padding: 0;
  max-height: 240px;
  overflow-y: auto;
`;

const OptionItem = styled.li<{ $isSelected: boolean; $isDisabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  margin: 2px 6px;
  border-radius: 8px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors['color-brand-primary-hover'] : theme.colors['color-text-primary']};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors['color-brand-primary-subtle'] : 'transparent'};
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
  transition: background-color 100ms ease;
  user-select: none;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}

  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors['color-brand-primary-subtle'] : theme.colors['color-bg-muted']};
  }
`;

const CheckMark = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors['color-brand-primary-hover']};
`;

const EmptyMsg = styled.div`
  padding: 12px 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const HelperText = styled.p<{ $isError?: boolean }>`
  margin: 6px 0 0;
  font-size: 12px;
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors['color-error-default'] : theme.colors['color-text-tertiary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

function filterOptions(options: ComboboxOption[], q: string): ComboboxOption[] {
  const t = q.trim().toLowerCase();
  if (!t) return options;
  return options.filter((o) => o.label.toLowerCase().includes(t));
}

export function Combobox({
  options,
  value,
  inputValue: controlledInput,
  onChange,
  onInputChange,
  allowFreeText = false,
  placeholder = 'Type or select…',
  label,
  helperText,
  errorText,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  size = 'md',
  id,
  emptyText = 'No matches',
}: ComboboxProps) {
  const theme = useTheme();
  const autoId = useId();
  const inputId = id ?? autoId;
  const selected = options.find((o) => o.value === value);
  const [internalInput, setInternalInput] = useState(selected?.label ?? '');
  const inputValue = controlledInput !== undefined ? controlledInput : internalInput;

  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (controlledInput === undefined && selected) {
      setInternalInput(selected.label);
    }
  }, [selected, controlledInput]);

  const filtered = useMemo(() => filterOptions(options, inputValue), [options, inputValue]);

  function setText(t: string) {
    if (controlledInput === undefined) setInternalInput(t);
    onInputChange?.(t);
  }

  function open() {
    if (isDisabled) return;
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const GAP = 4;
    const panelHeight = 260;
    const spaceBelow = window.innerHeight - rect.bottom - GAP;
    const shouldOpenUp = spaceBelow < panelHeight && rect.top > panelHeight;
    setOpenUp(shouldOpenUp);
    setPanelStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      ...(shouldOpenUp
        ? { bottom: window.innerHeight - rect.top + GAP }
        : { top: rect.bottom + GAP }),
    });
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function selectOption(opt: ComboboxOption) {
    if (opt.isDisabled) return;
    setText(opt.label);
    onChange?.(opt.value);
    close();
    inputRef.current?.focus();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const t = e.target.value;
    setText(t);
    if (!isOpen) open();
  }

  function handleBlur(e: React.FocusEvent) {
    const next = e.relatedTarget as Node | null;
    if (panelRef.current?.contains(next) || wrapRef.current?.contains(next)) return;
    close();
    if (allowFreeText) {
      onChange?.(inputValue);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!wrapRef.current?.contains(t) && !panelRef.current?.contains(t)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const displayHelper = hasError && errorText ? errorText : helperText;
  const listId = `${inputId}-listbox`;

  return (
    <FieldRoot>
      {label && (
        <FieldLabel htmlFor={inputId}>
          {label}
          {isRequired && (
            <span style={{ color: theme.colors['color-error-default'], marginLeft: 2 }}>*</span>
          )}
        </FieldLabel>
      )}

      <InputWrap
        ref={wrapRef}
        $size={size}
        $isOpen={isOpen}
        $hasError={hasError}
        $isDisabled={isDisabled}
        onBlur={handleBlur}
      >
        <NativeInput
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listId}
          disabled={isDisabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => !isDisabled && open()}
        />
        <ChevronBtn
          type="button"
          tabIndex={-1}
          $isOpen={isOpen}
          aria-label="Toggle suggestions"
          disabled={isDisabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => (isOpen ? close() : open())}
        >
          <ChevronDown size={16} />
        </ChevronBtn>
      </InputWrap>

      {displayHelper && (
        <HelperText $isError={!!(hasError && errorText)}>{displayHelper}</HelperText>
      )}

      {isOpen &&
        createPortal(
          <div style={panelStyle} ref={panelRef}>
            <PanelWrapper $openUp={openUp} role="listbox" id={listId}>
              <OptionsList>
                {filtered.length === 0 ? (
                  <EmptyMsg>{emptyText}</EmptyMsg>
                ) : (
                  filtered.map((opt) => (
                    <OptionItem
                      key={opt.value}
                      role="option"
                      aria-selected={opt.value === value}
                      $isSelected={opt.value === value}
                      $isDisabled={!!opt.isDisabled}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectOption(opt)}
                    >
                      {opt.icon && opt.icon}
                      {opt.label}
                      {opt.value === value && (
                        <CheckMark>
                          <Check size={14} />
                        </CheckMark>
                      )}
                    </OptionItem>
                  ))
                )}
              </OptionsList>
            </PanelWrapper>
          </div>,
          document.body
        )}
    </FieldRoot>
  );
}
