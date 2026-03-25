import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;

export const MenuPanel = styled.div`
  min-width: 220px;
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 4px;
  animation: ${fadeIn} 120ms ease forwards;
  transform-origin: top left;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MenuItem = styled.div<{ $destructive: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  color: ${({ theme, $destructive, $disabled }) =>
    $disabled
      ? theme.colors['color-text-tertiary']
      : $destructive
        ? theme.colors['color-error-default']
        : theme.colors['color-text-primary']};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  user-select: none;
  transition: background-color 100ms ease;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${({ theme, $destructive }) =>
      $destructive ? theme.colors['color-error-subtle'] : theme.colors['color-bg-subtle']};
  }
`;

export const MenuItemIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
`;

export const MenuItemLabel = styled.span`
  flex: 1;
`;

export const MenuItemShortcut = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  font-variant-numeric: tabular-nums;
  margin-left: auto;
  padding-left: 16px;
`;

export const MenuItemArrow = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin-left: auto;
`;

export const MenuSeparator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors['color-border-subtle']};
  margin: 4px 0;
`;

export const MenuLabel = styled.div`
  padding: 6px 12px 2px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export const SubPanel = styled(MenuPanel)`
  position: fixed;
  z-index: 10000;
  transform-origin: top left;
`;

export const TriggerWrapper = styled.div`
  display: contents;
`;
