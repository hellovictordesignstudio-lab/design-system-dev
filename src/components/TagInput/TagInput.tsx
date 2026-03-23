import React, { useState, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { X } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  errorText?: string;
  isDisabled?: boolean;
  maxTags?: number;
  allowDuplicates?: boolean;
  suggestions?: string[];
  id?: string;
}

// ── Styled ────────────────────────────────────────────────────────────────────

const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  width: 100%;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
  }
`;

const Container = styled.div<{
  $isFocused: boolean;
  $hasError: boolean;
  $isDisabled: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 6px 10px;
  border-radius: 14px;
  border: 1.5px solid
    ${({ $hasError, $isFocused }) =>
      $hasError ? '#D22232' : $isFocused ? '#0055FF' : '#C8D4E8'};
  background-color: #ffffff;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'text')};
  transition: border-color 200ms ease, box-shadow 200ms ease;

  ${({ $isFocused, $hasError }) =>
    $isFocused &&
    !$hasError &&
    css`
      box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.10);
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.7;
      background-color: #F8F9FC;
      border-color: #DDE1EA;
    `}

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
    border-color: ${({ $hasError, $isFocused }) =>
      $hasError ? '#D22232' : $isFocused ? '#0055FF' : '#2E3550'};
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 9999px;
  background-color: #E8EEFF;
  color: #2952CC;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  max-width: 200px;

  [data-theme='dark'] &, .dark & {
    background-color: #1E2E5E;
    color: #7BA4FF;
  }
`;

const TagLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TagRemove = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #2952CC;
  flex-shrink: 0;
  transition: color 100ms ease;
  line-height: 1;

  &:hover { color: #A81B28; }
  &:focus-visible {
    outline: 2px solid #0055FF;
    border-radius: 2px;
  }

  [data-theme='dark'] &, .dark & {
    color: #7BA4FF;
    &:hover { color: #F87171; }
  }
`;

const InlineInput = styled.input<{ $isDisabled: boolean }>`
  flex: 1;
  min-width: 80px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: #111827;
  padding: 2px 0;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'text')};

  &::placeholder { color: #9BA5BE; }

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
  }
`;

const HelperText = styled.p<{ $isError?: boolean }>`
  margin: 6px 0 0;
  font-size: 12px;
  color: ${({ $isError }) => ($isError ? '#D22232' : '#9BA5BE')};
`;

// ── Suggestions dropdown ──────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: scaleY(0.96) translateY(-4px); }
  to   { opacity: 1; transform: scaleY(1) translateY(0); }
`;

const SuggestionsPanel = styled.div`
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #E2E5ED;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10);
  overflow: hidden;
  animation: ${fadeIn} 150ms ease forwards;
  transform-origin: top center;
  max-height: 200px;
  overflow-y: auto;

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
    border-color: #2E3550;
  }
`;

const SuggestionItem = styled.div<{ $isHighlighted: boolean }>`
  padding: 10px 14px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  cursor: pointer;
  color: #111827;
  background-color: ${({ $isHighlighted }) => ($isHighlighted ? '#F0F2F5' : 'transparent')};
  transition: background-color 100ms ease;

  &:hover { background-color: #F0F2F5; }

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
    background-color: ${({ $isHighlighted }) => ($isHighlighted ? '#2E3550' : 'transparent')};
    &:hover { background-color: #2E3550; }
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

export function TagInput({
  value,
  onChange,
  placeholder = 'Add a tag...',
  label,
  helperText,
  hasError = false,
  errorText,
  isDisabled = false,
  maxTags,
  allowDuplicates = false,
  suggestions = [],
  id,
}: TagInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isAtMax = maxTags !== undefined && value.length >= maxTags;

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      (allowDuplicates || !value.includes(s)),
  );

  const showDropdown = isFocused && inputValue.length > 0 && filteredSuggestions.length > 0;

  // Position dropdown
  useEffect(() => {
    if (!showDropdown || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: 'fixed',
      left: rect.left,
      top: rect.bottom + 4,
      width: rect.width,
      zIndex: 9999,
    });
  }, [showDropdown, value]);

  // Close on outside click
  useEffect(() => {
    if (!showDropdown) return;
    function handler(e: MouseEvent) {
      const t = e.target as Node;
      if (!containerRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDropdown]);

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag) return;
    if (!allowDuplicates && value.includes(tag)) { setInputValue(''); return; }
    if (isAtMax) return;
    onChange([...value, tag]);
    setInputValue('');
    setHighlightedIndex(-1);
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      if (e.key === 'Tab' && !inputValue) return;
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
        addTag(filteredSuggestions[highlightedIndex]);
      } else {
        addTag(inputValue.replace(/,$/, ''));
      }
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filteredSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Escape') {
      setHighlightedIndex(-1);
      setInputValue('');
    }
  }

  const displayHelper = hasError && errorText ? errorText : helperText;
  const helperIsError = !!(hasError && errorText);
  const inputPlaceholder = isAtMax
    ? `Max ${maxTags} tags`
    : value.length === 0
    ? placeholder
    : '';

  return (
    <FieldRoot>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

      <Container
        ref={containerRef}
        $isFocused={isFocused}
        $hasError={hasError}
        $isDisabled={isDisabled}
        onClick={() => !isDisabled && inputRef.current?.focus()}
      >
        {value.map((tag, i) => (
          <Tag key={i}>
            <TagLabel>{tag}</TagLabel>
            {!isDisabled && (
              <TagRemove
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(i); }}
                aria-label={`Remove ${tag}`}
              >
                <X size={11} strokeWidth={2.5} />
              </TagRemove>
            )}
          </Tag>
        ))}

        <InlineInput
          ref={inputRef}
          id={inputId}
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setHighlightedIndex(-1); }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => { setTimeout(() => setIsFocused(false), 150); }}
          placeholder={inputPlaceholder}
          disabled={isDisabled || isAtMax}
          $isDisabled={isDisabled || isAtMax}
          aria-autocomplete={suggestions.length > 0 ? 'list' : undefined}
        />
      </Container>

      {displayHelper && (
        <HelperText $isError={helperIsError}>{displayHelper}</HelperText>
      )}

      {showDropdown &&
        typeof document !== 'undefined' &&
        createPortal(
          <div style={dropdownStyle} ref={panelRef}>
            <SuggestionsPanel>
              {filteredSuggestions.map((s, i) => (
                <SuggestionItem
                  key={s}
                  $isHighlighted={i === highlightedIndex}
                  onMouseDown={(e) => { e.preventDefault(); addTag(s); }}
                >
                  {s}
                </SuggestionItem>
              ))}
            </SuggestionsPanel>
          </div>,
          document.body,
        )}
    </FieldRoot>
  );
}
