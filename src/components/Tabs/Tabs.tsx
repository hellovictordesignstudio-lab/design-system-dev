import React, { createContext, useContext, useRef, useState, useId } from 'react';
import styled, { css } from 'styled-components';

export type TabsVariant = 'line' | 'pill' | 'enclosed';

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  children: React.ReactNode;
}

export interface TabsListProps {
  children: React.ReactNode;
  'aria-label'?: string;
}

export interface TabProps {
  value: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: string | number;
  isDisabled?: boolean;
}

export interface TabsPanelProps {
  value: string;
  children: React.ReactNode;
}

// ── Context ───────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (v: string) => void;
  variant: TabsVariant;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsCtx() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs>');
  return ctx;
}

// ── Styled components ─────────────────────────────────────────────────────────

const TabsRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const ListLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors['color-border-default']};
`;

const ListPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors['color-bg-muted']};
  border-radius: 9999px;
  padding: 4px;
`;

const ListEnclosed = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors['color-border-default']};
`;

const TabLine = styled.button<{ $isActive: boolean; $isDisabled: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  border: none;
  background: transparent;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors['color-text-link'] : theme.colors['color-text-secondary']};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  transition: color 150ms ease;
  outline: none;
  white-space: nowrap;
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: 2px 2px 0 0;
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors['color-brand-primary'] : 'transparent'};
    transition: background-color 150ms ease;
  }

  &:hover:not(:disabled) {
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors['color-text-link'] : theme.colors['color-text-primary']};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.12)'};
    border-radius: 6px 6px 0 0;
  }
`;

const TabPill = styled.button<{ $isActive: boolean; $isDisabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 9999px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors['color-brand-primary'] : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors['color-brand-on-primary'] : theme.colors['color-text-secondary']};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  transition: background-color 150ms ease, color 150ms ease;
  outline: none;
  white-space: nowrap;
  user-select: none;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors['color-brand-primary-hover'] : theme.colors['color-bg-emphasized']};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.12)'};
  }
`;

const TabEnclosed = styled.button<{ $isActive: boolean; $isDisabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  outline: none;
  white-space: nowrap;
  user-select: none;
  transition: background-color 150ms ease, color 150ms ease;
  margin-bottom: -2px;

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background: ${theme.colors['color-bg-default']};
          color: ${theme.colors['color-text-primary']};
          border: 2px solid ${theme.colors['color-border-default']};
          border-bottom-color: ${theme.colors['color-bg-default']};
          border-radius: 12px 12px 0 0;
        `
      : css`
          background: transparent;
          color: ${theme.colors['color-text-secondary']};
          border: 2px solid transparent;
          border-radius: 12px 12px 0 0;

          &:hover:not(:disabled) {
            background: ${theme.colors['color-bg-muted']};
            color: ${theme.colors['color-text-primary']};
          }
        `}

  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.12)'};
  }
`;

const BadgePill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  color: ${({ theme }) => theme.colors['color-text-link']};
`;

const ActiveBadgePill = styled(BadgePill)`
  background-color: rgba(255, 255, 255, 0.25);
  color: ${({ theme }) => theme.colors['color-brand-on-primary']};
`;

const PanelRoot = styled.div`
  padding-top: 20px;
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  width: 16px;
  height: 16px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

// ── Sub-components ────────────────────────────────────────────────────────────

function TabsList({ children, 'aria-label': ariaLabel }: TabsListProps) {
  const { variant } = useTabsCtx();
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const tabs = listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])');
    if (!tabs) return;
    const arr = Array.from(tabs);
    const idx = arr.indexOf(document.activeElement as HTMLElement);
    if (idx === -1) return;
    const next =
      e.key === 'ArrowRight'
        ? arr[(idx + 1) % arr.length]
        : arr[(idx - 1 + arr.length) % arr.length];
    next.focus();
    e.preventDefault();
  }

  const ListComp =
    variant === 'pill' ? ListPill : variant === 'enclosed' ? ListEnclosed : ListLine;

  return (
    <ListComp
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      {children}
    </ListComp>
  );
}

function Tab({ value, children, leftIcon, rightIcon, badge, isDisabled = false }: TabProps) {
  const { activeTab, setActiveTab, variant, baseId } = useTabsCtx();
  const isActive = activeTab === value;

  function onClick() {
    if (!isDisabled) setActiveTab(value);
  }

  const badgeEl = badge !== undefined ? (
    isActive && variant === 'pill' ? (
      <ActiveBadgePill>{badge}</ActiveBadgePill>
    ) : (
      <BadgePill>{badge}</BadgePill>
    )
  ) : null;

  const content = (
    <>
      {leftIcon && <IconWrap>{leftIcon}</IconWrap>}
      {children}
      {rightIcon && <IconWrap>{rightIcon}</IconWrap>}
      {badgeEl}
    </>
  );

  const commonProps = {
    role: 'tab' as const,
    'aria-selected': isActive,
    'aria-controls': `${baseId}-panel-${value}`,
    id: `${baseId}-tab-${value}`,
    tabIndex: isActive ? 0 : -1,
    disabled: isDisabled,
    $isActive: isActive,
    $isDisabled: isDisabled,
    onClick,
  };

  if (variant === 'pill') return <TabPill {...commonProps}>{content}</TabPill>;
  if (variant === 'enclosed') return <TabEnclosed {...commonProps}>{content}</TabEnclosed>;
  return <TabLine {...commonProps}>{content}</TabLine>;
}

function TabsPanel({ value, children }: TabsPanelProps) {
  const { activeTab, baseId } = useTabsCtx();
  if (activeTab !== value) return null;

  return (
    <PanelRoot
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
    >
      {children}
    </PanelRoot>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

function TabsRoot2({ defaultValue = '', value, onChange, variant = 'line', children }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const baseId = useId();
  const activeTab = value !== undefined ? value : internal;

  function setActiveTab(v: string) {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, baseId }}>
      <TabsRoot>{children}</TabsRoot>
    </TabsContext.Provider>
  );
}

export const Tabs = Object.assign(TabsRoot2, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
});
