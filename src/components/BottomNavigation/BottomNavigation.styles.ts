import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  width: 100%;
  min-height: 56px;
  padding: 6px 8px 8px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  border-top: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  gap: 4px;
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
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors['color-brand-primary'] : theme.colors['color-text-tertiary']};
  transition:
    color 120ms ease,
    background-color 120ms ease;
  position: relative;

  &:hover:not(:disabled) {
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors['color-brand-primary'] : theme.colors['color-text-primary']};
    background-color: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
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
  background-color: ${({ theme }) => theme.colors['color-error-default']};
  color: ${({ theme }) => theme.colors['color-brand-on-primary']};
  font-size: 9px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  box-sizing: border-box;
`;
