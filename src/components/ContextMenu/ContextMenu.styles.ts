import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
`;

export const MenuPanel = styled.div`
  min-width: 220px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #E2E5ED;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  padding: 4px;
  animation: ${fadeIn} 120ms ease forwards;
  transform-origin: top left;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
    border-color: #2E3550;
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
  color: ${({ $destructive, $disabled }) =>
    $disabled ? '#9BA5BE' : $destructive ? '#D22232' : '#111827'};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  user-select: none;
  transition: background-color 100ms ease;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${({ $destructive }) => ($destructive ? 'rgba(210,34,50,0.06)' : '#F0F2F5')};
  }

  [data-theme='dark'] &, .dark & {
    color: ${({ $destructive, $disabled }) =>
      $disabled ? '#6B7694' : $destructive ? '#F87171' : '#F0F2F5'};
    &:hover {
      background-color: ${({ $destructive }) => ($destructive ? 'rgba(248,113,113,0.1)' : '#2E3550')};
    }
  }
`;

export const MenuItemIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #6B7694;

  [data-theme='dark'] &, .dark & {
    color: #9BA5BE;
  }
`;

export const MenuItemLabel = styled.span`
  flex: 1;
`;

export const MenuItemShortcut = styled.span`
  font-size: 11px;
  color: #9BA5BE;
  font-variant-numeric: tabular-nums;
  margin-left: auto;
  padding-left: 16px;
`;

export const MenuItemArrow = styled.span`
  display: flex;
  align-items: center;
  color: #9BA5BE;
  margin-left: auto;
`;

export const MenuSeparator = styled.div`
  height: 1px;
  background-color: #F0F2F5;
  margin: 4px 0;

  [data-theme='dark'] &, .dark & {
    background-color: #2E3550;
  }
`;

export const MenuLabel = styled.div`
  padding: 6px 12px 2px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9BA5BE;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  [data-theme='dark'] &, .dark & {
    color: #6B7694;
  }
`;

export const SubPanel = styled(MenuPanel)`
  position: fixed;
  z-index: 10000;
  transform-origin: top left;
`;

export const TriggerWrapper = styled.div`
  display: contents;
`;
