import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ChevronDown } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'bordered' | 'separated';

export interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  variant?: AccordionVariant;
  children: React.ReactNode;
}

export interface AccordionItemProps {
  value: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export interface AccordionTriggerProps {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export interface AccordionContentProps {
  children: React.ReactNode;
}

// ── Context ───────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (value: string) => void;
  variant: AccordionVariant;
}

interface ItemContextValue {
  value: string;
  isOpen: boolean;
  isDisabled: boolean;
}

const AccordionContext = createContext<AccordionContextValue>({
  openItems: new Set(),
  toggle: () => {},
  variant: 'default',
});

const ItemContext = createContext<ItemContextValue>({
  value: '',
  isOpen: false,
  isDisabled: false,
});

function useAccordionContext() { return useContext(AccordionContext); }
function useItemContext() { return useContext(ItemContext); }

// ── Styled components ─────────────────────────────────────────────────────────

const RootWrapper = styled.div<{ $variant: AccordionVariant }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  width: 100%;

  ${({ $variant }) =>
    $variant === 'bordered' &&
    css`
      border: 1px solid #E2E5ED;
      border-radius: 14px;
      overflow: hidden;

      [data-theme='dark'] &, .dark & {
        border-color: #2E3550;
      }
    `}

  ${({ $variant }) =>
    $variant === 'separated' &&
    css`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `}
`;

const ItemWrapper = styled.div<{ $variant: AccordionVariant; $isDisabled: boolean }>`
  ${({ $variant }) =>
    $variant === 'default' &&
    css`
      border-bottom: 1px solid #F0F2F5;

      [data-theme='dark'] &, .dark & {
        border-bottom-color: #2E3550;
      }

      &:last-child { border-bottom: none; }
    `}

  ${({ $variant }) =>
    $variant === 'bordered' &&
    css`
      border-bottom: 1px solid #E2E5ED;

      [data-theme='dark'] &, .dark & {
        border-bottom-color: #2E3550;
      }

      &:last-child { border-bottom: none; }
    `}

  ${({ $variant }) =>
    $variant === 'separated' &&
    css`
      border: 1px solid #E2E5ED;
      border-radius: 12px;
      overflow: hidden;

      [data-theme='dark'] &, .dark & {
        border-color: #2E3550;
      }
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

const TriggerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  text-align: left;
  gap: 12px;
  transition: background-color 150ms ease;

  &:hover {
    background-color: #F8F9FC;
  }

  &:focus-visible {
    outline: 2px solid #0055FF;
    outline-offset: -2px;
  }

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;

    &:hover { background-color: #1E2438; }
  }
`;

const TriggerLeft = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`;

const ChevronWrap = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #6B7694;
  transition: transform 200ms ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const ContentOuter = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '2000px' : '0')};
  transition: max-height 200ms ease;
`;

const ContentInner = styled.div`
  padding: 0 16px 16px;
  font-size: 14px;
  color: #6B7694;
  line-height: 1.7;

  [data-theme='dark'] &, .dark & {
    color: #9BA5BE;
  }
`;

// ── Root ──────────────────────────────────────────────────────────────────────

function AccordionRoot({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onChange,
  variant = 'default',
  children,
}: AccordionProps) {
  const isControlled = controlledValue !== undefined;

  const [internalOpen, setInternalOpen] = useState<Set<string>>(() => {
    if (defaultValue === undefined) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const openItems = isControlled
    ? new Set(Array.isArray(controlledValue) ? controlledValue : controlledValue ? [controlledValue] : [])
    : internalOpen;

  function toggle(itemValue: string) {
    let next: Set<string>;
    if (openItems.has(itemValue)) {
      next = new Set(openItems);
      next.delete(itemValue);
    } else {
      next = type === 'single' ? new Set([itemValue]) : new Set([...openItems, itemValue]);
    }
    if (!isControlled) setInternalOpen(next);
    const arr = [...next];
    onChange?.(type === 'single' ? (arr[0] ?? '') : arr);
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle, variant }}>
      <RootWrapper $variant={variant}>{children}</RootWrapper>
    </AccordionContext.Provider>
  );
}

// ── Item ──────────────────────────────────────────────────────────────────────

function AccordionItem({ value, isDisabled = false, children }: AccordionItemProps) {
  const { openItems, variant } = useAccordionContext();
  const isOpen = openItems.has(value);

  return (
    <ItemContext.Provider value={{ value, isOpen, isDisabled }}>
      <ItemWrapper $variant={variant} $isDisabled={isDisabled}>
        {children}
      </ItemWrapper>
    </ItemContext.Provider>
  );
}

// ── Trigger ───────────────────────────────────────────────────────────────────

function AccordionTrigger({ children, leftIcon }: AccordionTriggerProps) {
  const { toggle } = useAccordionContext();
  const { value, isOpen, isDisabled } = useItemContext();

  return (
    <TriggerButton
      type="button"
      $isOpen={isOpen}
      disabled={isDisabled}
      aria-expanded={isOpen}
      onClick={() => toggle(value)}
    >
      <TriggerLeft>
        {leftIcon}
        {children}
      </TriggerLeft>
      <ChevronWrap $isOpen={isOpen}>
        <ChevronDown size={18} />
      </ChevronWrap>
    </TriggerButton>
  );
}

// ── Content ───────────────────────────────────────────────────────────────────

function AccordionContent({ children }: AccordionContentProps) {
  const { isOpen } = useItemContext();

  return (
    <ContentOuter $isOpen={isOpen} aria-hidden={!isOpen}>
      <ContentInner>{children}</ContentInner>
    </ContentOuter>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
