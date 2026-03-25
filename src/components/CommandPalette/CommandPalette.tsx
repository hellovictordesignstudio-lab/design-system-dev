import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { Search } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string | string[];
  onSelect: () => void;
  keywords?: string[];
}

export interface CommandGroup {
  label?: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  groups: CommandGroup[];
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  };
}

// ── Filtering ─────────────────────────────────────────────────────────────────

function filterGroups(groups: CommandGroup[], query: string): CommandGroup[] {
  if (!query.trim()) return groups;
  const q = query.toLowerCase();
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.keywords?.some((k) => k.toLowerCase().includes(q))
      ),
    }))
    .filter((g) => g.items.length > 0);
}

// ── Styled components ─────────────────────────────────────────────────────────

const overlayFade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const panelSlide = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(-8px); }
  to   { opacity: 1; transform: scale(1)    translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(12, 13, 16, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
  animation: ${overlayFade} 150ms ease forwards;
`;

const Panel = styled.div`
  width: 560px;
  max-height: 420px;
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${panelSlide} 200ms ease forwards;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-border-subtle']};
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
`;

const SearchInput = styled.input`
  flex: 1;
  height: 56px;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  background: transparent;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-text-tertiary']};
  }
`;

const ItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

const GroupLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  padding: 8px 20px 4px;
`;

const Item = styled.div<{ $isFocused: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin: 2px 8px;
  border-radius: 10px;
  cursor: pointer;
  background: ${({ theme, $isFocused }) =>
    $isFocused ? theme.colors['color-bg-muted'] : 'transparent'};
  transition: background-color 80ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors['color-bg-muted']};
  }
`;

const ItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  width: 18px;
  height: 18px;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ItemLabel = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors['color-text-primary']};
`;

const ShortcutGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const ShortcutKey = styled.kbd`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 500;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  background: ${({ theme }) => theme.colors['color-bg-muted']};
  border: none;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

// ── Component ─────────────────────────────────────────────────────────────────

function CommandPaletteRoot({
  isOpen,
  onClose,
  placeholder = 'Search commands…',
  groups,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = filterGroups(groups, query);
  const flatItems = filtered.flatMap((g) => g.items);

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setFocusedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Reset focus index when query changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [query]);

  // Scroll focused item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-focus-index="${focusedIndex}"]`
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [focusedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex((i) => Math.min(i + 1, flatItems.length - 1));
        e.preventDefault();
        break;
      case 'ArrowUp':
        setFocusedIndex((i) => Math.max(i - 1, 0));
        e.preventDefault();
        break;
      case 'Enter':
        if (flatItems[focusedIndex]) {
          flatItems[focusedIndex].onSelect();
          onClose();
        }
        e.preventDefault();
        break;
      case 'Escape':
        onClose();
        break;
    }
  }

  function selectItem(item: CommandItem) {
    item.onSelect();
    onClose();
  }

  if (!isOpen) return null;

  let flatIndex = 0;

  return createPortal(
    <Overlay onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <Panel onKeyDown={handleKeyDown}>
        <SearchBar>
          <Search size={18} />
          <SearchInput
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search"
          />
        </SearchBar>

        <ItemsList ref={listRef} role="listbox">
          {flatItems.length === 0 ? (
            <EmptyState>
              {query ? `No results for "${query}"` : 'No commands available'}
            </EmptyState>
          ) : (
            filtered.map((group, gi) => (
              <div key={gi}>
                {group.label && <GroupLabel>{group.label}</GroupLabel>}
                {group.items.map((item) => {
                  const idx = flatIndex++;
                  const isFocused = idx === focusedIndex;
                  const shortcutArr = item.shortcut
                    ? Array.isArray(item.shortcut)
                      ? item.shortcut
                      : [item.shortcut]
                    : null;
                  return (
                    <Item
                      key={item.id}
                      role="option"
                      aria-selected={isFocused}
                      $isFocused={isFocused}
                      data-focus-index={idx}
                      onMouseEnter={() => setFocusedIndex(idx)}
                      onClick={() => selectItem(item)}
                    >
                      {item.icon && <ItemIcon>{item.icon}</ItemIcon>}
                      <ItemLabel>{item.label}</ItemLabel>
                      {shortcutArr && (
                        <ShortcutGroup>
                          {shortcutArr.map((s, si) => (
                            <ShortcutKey key={si}>{s}</ShortcutKey>
                          ))}
                        </ShortcutGroup>
                      )}
                    </Item>
                  );
                })}
              </div>
            ))
          )}
        </ItemsList>
      </Panel>
    </Overlay>,
    document.body
  );
}

// Sub-components are thin wrappers for the compound API (items/groups are
// passed as data props, but we export these for type-completeness)
function CommandGroup(_props: { label?: string; items: CommandItem[]; children?: never }) {
  return null; // data-only, consumed by parent
}

function CommandItemComponent(_props: CommandItem & { children?: never }) {
  return null; // data-only
}

export const CommandPalette = Object.assign(CommandPaletteRoot, {
  Group: CommandGroup,
  Item: CommandItemComponent,
});
