import React, { useState, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { ChevronDown, Search, Check } from 'lucide-react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  size?: SelectSize;
  isSearchable?: boolean;
  id?: string;
}

const HEIGHTS: Record<SelectSize, string> = { sm: '32px', md: '40px', lg: '48px' };
const FONT_SIZE: Record<SelectSize, string> = { sm: '13px', md: '14px', lg: '16px' };
const PAD_X: Record<SelectSize, string> = { sm: '12px', md: '16px', lg: '20px' };

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

const Trigger = styled.button<{
  $size: SelectSize;
  $isOpen: boolean;
  $hasError: boolean;
  $isDisabled: boolean;
  $hasValue: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
          ? theme.colors['color-brand-primary']
          : theme.colors['color-border-default']};
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  font-size: ${({ $size }) => FONT_SIZE[$size]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme, $hasValue }) =>
    $hasValue ? theme.colors['color-text-primary'] : theme.colors['color-text-tertiary']};
  cursor: pointer;
  text-align: left;
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors['color-brand-primary']};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  }

  ${({ theme, $isOpen }) =>
    $isOpen &&
    css`
      box-shadow: 0 0 0 3px ${theme.colors['color-brand-primary-subtle']};
    `}

  ${({ theme, $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
      background-color: ${theme.colors['color-bg-subtle']};
      border-color: ${theme.colors['color-border-default']};
    `}
`;

const TriggerLabel = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ChevronWrap = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  flex-shrink: 0;
  transition: transform 200ms ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const PanelWrapper = styled.div<{ $openUp: boolean }>`
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  animation: ${fadeIn} 150ms ease forwards;
  transform-origin: ${({ $openUp }) => ($openUp ? 'bottom center' : 'top center')};
`;

const SearchWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-border-default']};

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors['color-text-tertiary']};
    pointer-events: none;
  }
`;

const SearchField = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 12px 0 36px;
  border: none;
  outline: none;
  font-size: 13px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme }) => theme.colors['color-text-primary']};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-text-tertiary']};
  }
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
    $isSelected ? theme.colors['color-brand-primary-active'] : theme.colors['color-text-primary']};
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
      $isSelected ? theme.colors['color-brand-primary-subtle'] : theme.colors['color-bg-subtle']};
  }
`;

const CheckMark = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors['color-brand-primary']};
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
    $isError ? theme.colors['color-error-text'] : theme.colors['color-text-tertiary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  errorText,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  size = 'md',
  isSearchable = false,
  id,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [openUp, setOpenUp] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const autoId = useId();
  const inputId = id ?? autoId;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const hasValue = !!selectedOption;

  const filtered = isSearchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  function open() {
    if (isDisabled) return;
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
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
    setSearch('');
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function selectOption(opt: SelectOption) {
    if (opt.isDisabled) return;
    onChange?.(opt.value);
    close();
    triggerRef.current?.focus();
  }

  // Focus search on open
  useEffect(() => {
    if (isOpen && isSearchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [isOpen, isSearchable]);

  // Outside click + Escape
  useEffect(() => {
    if (!isOpen) return;

    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        close();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
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

  return (
    <FieldRoot>
      {label && (
        <FieldLabel htmlFor={inputId}>
          {label}
          {isRequired && <span style={{ color: 'var(--color-error-text)', marginLeft: 2 }}>*</span>}
        </FieldLabel>
      )}

      <Trigger
        ref={triggerRef}
        id={inputId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isDisabled}
        $size={size}
        $isOpen={isOpen}
        $hasError={hasError}
        $isDisabled={isDisabled}
        $hasValue={hasValue}
        onClick={toggle}
      >
        <TriggerLabel>
          {selectedOption?.icon && selectedOption.icon}
          {selectedOption?.label ?? placeholder}
        </TriggerLabel>
        <ChevronWrap $isOpen={isOpen}>
          <ChevronDown size={16} />
        </ChevronWrap>
      </Trigger>

      {displayHelper && (
        <HelperText $isError={!!(hasError && errorText)}>{displayHelper}</HelperText>
      )}

      {isOpen &&
        createPortal(
          <div style={panelStyle} ref={panelRef}>
            <PanelWrapper $openUp={openUp} role="listbox">
              {isSearchable && (
                <SearchWrapper>
                  <Search size={14} />
                  <SearchField
                    ref={searchRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                  />
                </SearchWrapper>
              )}
              <OptionsList>
                {filtered.length === 0 ? (
                  <EmptyMsg>No options found</EmptyMsg>
                ) : (
                  filtered.map((opt) => (
                    <OptionItem
                      key={opt.value}
                      role="option"
                      aria-selected={opt.value === value}
                      $isSelected={opt.value === value}
                      $isDisabled={!!opt.isDisabled}
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
