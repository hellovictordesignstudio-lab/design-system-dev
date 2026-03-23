import styled, { css } from 'styled-components';

// ── Sidebar shell ─────────────────────────────────────────────────────────────

export const SidebarNav = styled.nav<{
  $width: number;
  $collapsedWidth: number;
  $isCollapsed: boolean;
}>`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${({ $isCollapsed, $width, $collapsedWidth }) =>
    $isCollapsed ? $collapsedWidth : $width}px;
  min-width: ${({ $isCollapsed, $width, $collapsedWidth }) =>
    $isCollapsed ? $collapsedWidth : $width}px;
  background-color: #ffffff;
  border-right: 1px solid #e2e5ed;
  overflow: hidden;
  transition:
    width 200ms ease,
    min-width 200ms ease;
  z-index: 10;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  ${({ theme }) =>
    theme.mode === 'dark' &&
    css`
      background-color: #1a1f35;
      border-right-color: #2e3550;
    `}
`;

// ── Header ────────────────────────────────────────────────────────────────────

export const SidebarHeaderRoot = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  height: 56px;
  flex-shrink: 0;
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '0 8px 0 16px')};
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'space-between')};
  border-bottom: 1px solid #f0f2f5;
  gap: 8px;

  ${({ theme }) =>
    theme.mode === 'dark' &&
    css`
      border-bottom-color: #2e3550;
    `}
`;

export const HeaderLogoArea = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 150ms ease;
  pointer-events: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'auto')};

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    css`
      flex: 0;
      width: 0;
    `}
`;

export const ToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #9ba5be;
  cursor: pointer;
  outline: none;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: #f0f2f5;
    color: #111827;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.12);
  }

  ${({ theme }) =>
    theme.mode === 'dark' &&
    css`
      color: #4a5270;

      &:hover {
        background-color: #2e3550;
        color: #f8f9fc;
      }
    `}
`;

// ── Scrollable content ────────────────────────────────────────────────────────

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0;

  /* Thin scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #e2e5ed transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e2e5ed;
    border-radius: 4px;
  }
`;

// ── Section ───────────────────────────────────────────────────────────────────

export const SidebarSectionRoot = styled.div`
  & + & {
    margin-top: 4px;
  }
`;

export const SectionLabel = styled.div<{ $isCollapsed: boolean }>`
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9ba5be;
  padding: 12px 16px 4px;
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  height: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 'auto')};
  padding-top: ${({ $isCollapsed }) => ($isCollapsed ? 0 : undefined)};
  padding-bottom: ${({ $isCollapsed }) => ($isCollapsed ? 0 : undefined)};
  transition: opacity 150ms ease;

  ${({ theme }) =>
    theme.mode === 'dark' &&
    css`
      color: #4a5270;
    `}
`;

// ── Item base styles (shared between button and anchor) ───────────────────────

export const itemBaseStyles = css<{
  $isActive: boolean;
  $isDisabled: boolean;
  $isCollapsed: boolean;
  $depth: number;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  font-size: ${({ $depth }) => ($depth > 0 ? '13px' : '14px')};
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 600)};
  text-decoration: none;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  white-space: nowrap;
  overflow: hidden;
  outline: none;
  border: none;
  width: calc(100% - 16px);
  text-align: left;
  font-family: inherit;
  transition:
    background-color 120ms ease,
    color 120ms ease,
    width 200ms ease,
    padding 200ms ease,
    margin 200ms ease;

  /* Default (light, inactive) */
  background-color: ${({ $isActive, theme }) =>
    $isActive
      ? theme.mode === 'dark'
        ? 'rgba(0,85,255,0.15)'
        : '#E8EEFF'
      : 'transparent'};
  color: ${({ $isActive, theme }) =>
    $isActive
      ? theme.mode === 'dark'
        ? '#669CFF'
        : '#2952CC'
      : theme.mode === 'dark'
      ? '#a0abcc'
      : '#4A5270'};

  /* Expanded layout */
  ${({ $isCollapsed }) =>
    !$isCollapsed &&
    css<{ $depth: number }>`
      padding: 8px 12px;
      padding-left: ${({ $depth }) => 12 + $depth * 16}px;
      margin: 2px 8px;
    `}

  /* Collapsed layout: centred icon square */
  ${({ $isCollapsed }) =>
    $isCollapsed &&
    css`
      width: 40px;
      min-width: 40px;
      height: 40px;
      padding: 0;
      justify-content: center;
      margin: 2px auto;
    `}

  /* Hover */
  &:hover:not([disabled]):not([data-disabled]) {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.mode === 'dark'
          ? 'rgba(0,85,255,0.2)'
          : '#E8EEFF'
        : theme.mode === 'dark'
        ? '#2E3550'
        : '#F0F2F5'};
    color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.mode === 'dark'
          ? '#669CFF'
          : '#2952CC'
        : theme.mode === 'dark'
        ? '#F8F9FC'
        : '#111827'};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.12);
  }
`;

export const ItemButton = styled.button<{
  $isActive: boolean;
  $isDisabled: boolean;
  $isCollapsed: boolean;
  $depth: number;
}>`
  ${itemBaseStyles}
`;

export const ItemAnchor = styled.a<{
  $isActive: boolean;
  $isDisabled: boolean;
  $isCollapsed: boolean;
  $depth: number;
}>`
  ${itemBaseStyles}
`;

export const ItemIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ItemLabel = styled.span<{ $isCollapsed: boolean }>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 100ms ease;

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    css`
      width: 0;
      flex: 0;
    `}
`;

export const ItemBadge = styled.span<{ $isCollapsed: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  background-color: #e8eeff;
  color: #2952cc;
  flex-shrink: 0;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 100ms ease;

  ${({ theme }) =>
    theme.mode === 'dark' &&
    css`
      background-color: rgba(0, 85, 255, 0.15);
      color: #669cff;
    `}
`;

export const ChevronWrap = styled.span<{ $isExpanded: boolean; $isCollapsed: boolean }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: #c5cbda;
  transition: transform 200ms ease, opacity 100ms ease;
  transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const SubItemsWrapper = styled.div<{ $isExpanded: boolean }>`
  overflow: hidden;
  max-height: ${({ $isExpanded }) => ($isExpanded ? '600px' : '0')};
  transition: max-height 200ms ease;
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const SidebarFooterRoot = styled.div`
  flex-shrink: 0;
  border-top: 1px solid #f0f2f5;
  padding: 8px 0;

  ${({ theme }) =>
    theme.mode === 'dark' &&
    css`
      border-top-color: #2e3550;
    `}
`;
