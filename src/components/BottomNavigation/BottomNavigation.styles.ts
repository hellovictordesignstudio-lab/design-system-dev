import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  width: 100%;
  min-height: 56px;
  padding: 6px 8px 8px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-top: 1px solid #e2e5ed;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  gap: 4px;

  [data-theme='dark'] &,
  .dark & {
    background-color: #12141a;
    border-top-color: #2e3550;
  }
`;

export const NavButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  min-height: 44px;
  padding: 6px 4px;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: ${({ $isActive }) => ($isActive ? '#0055ff' : '#6b7694')};
  transition:
    color 120ms ease,
    background-color 120ms ease;
  position: relative;

  &:hover:not(:disabled) {
    color: ${({ $isActive }) => ($isActive ? '#0055ff' : '#111827')};
    background-color: rgba(0, 85, 255, 0.06);
  }

  [data-theme='dark'] &,
  .dark & {
    color: ${({ $isActive }) => ($isActive ? '#5b8cff' : '#9ba5be')};

    &:hover:not(:disabled) {
      color: ${({ $isActive }) => ($isActive ? '#5b8cff' : '#f0f2f5')};
      background-color: rgba(91, 140, 255, 0.08);
    }
  }

  &:focus-visible {
    outline: 2px solid #0055ff;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 24px;
  min-width: 24px;
`;

export const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  background-color: #a81b28;
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  box-sizing: border-box;
`;
