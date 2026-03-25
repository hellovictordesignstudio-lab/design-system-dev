import styled, { keyframes, css } from 'styled-components';
import { darkColorTokens, lightColorTokens } from '../../tokens/semantic';
import type { NotificationType } from './NotificationCenter.types';

export const fadeIn = keyframes`
  from { opacity: 0; transform: scaleY(0.96) translateY(-4px); }
  to   { opacity: 1; transform: scaleY(1) translateY(0); }
`;

// ── Wrapper ───────────────────────────────────────────────────────────────────

export const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

// ── Trigger ───────────────────────────────────────────────────────────────────

export const TriggerBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  cursor: pointer;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  transition: background-color 150ms ease, color 150ms ease;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
    color: ${({ theme }) => theme.colors['color-text-primary']};
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-subtle']};
    border-color: ${({ theme }) => theme.colors['color-border-focus']};
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors['color-error-default']};
  color: ${({ theme }) => theme.colors['color-brand-on-primary']};
  font-size: 10px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 2px solid ${({ theme }) => theme.colors['color-bg-default']};
`;

// ── Panel ─────────────────────────────────────────────────────────────────────

export const Panel = styled.div`
  width: 380px;
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  animation: ${fadeIn} 150ms ease forwards;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export const MarkAllBtn = styled.button`
  border: none;
  background: none;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-link']};
  cursor: pointer;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition: color 150ms ease;
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.colors['color-text-link-hover']};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    border-radius: 4px;
  }
`;

// ── Tabs ──────────────────────────────────────────────────────────────────────

export const TabsRow = styled.div`
  display: flex;
  gap: 0;
  padding: 12px 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-border-subtle']};
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  border: none;
  background: none;
  padding: 6px 12px;
  border-bottom: 2px solid
    ${({ $isActive, theme }) => ($isActive ? theme.colors['color-border-focus'] : 'transparent')};
  font-size: 13px;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors['color-text-link'] : theme.colors['color-text-tertiary']};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition: color 150ms ease, border-color 150ms ease;
  margin-bottom: -1px;
  outline: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    border-radius: 4px;
  }
`;

// ── List ──────────────────────────────────────────────────────────────────────

export const List = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 4px 0;
`;

// ── Empty State ───────────────────────────────────────────────────────────────

export const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 24px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
`;

export const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const PanelFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors['color-border-subtle']};
  padding: 10px 16px;
  display: flex;
  justify-content: center;
`;

export const ViewAllBtn = styled.button`
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-link']};
  cursor: pointer;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  outline: none;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors['color-text-link-hover']};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    border-radius: 4px;
  }
`;

// ── Item type surfaces (semantic tokens) ─────────────────────────────────────

const L = lightColorTokens;
const D = darkColorTokens;

const itemBgLight: Record<NotificationType, string> = {
  info: L['color-brand-primary-subtle'],
  success: L['color-success-subtle'],
  warning: L['color-warning-subtle'],
  error: L['color-error-subtle'],
};

const itemBgDark: Record<NotificationType, string> = {
  info: D['color-brand-primary-subtle'],
  success: D['color-success-subtle'],
  warning: D['color-warning-subtle'],
  error: D['color-error-subtle'],
};

const itemInk: Record<NotificationType, string> = {
  info: L['color-brand-primary'],
  success: L['color-success-text'],
  warning: L['color-warning-text'],
  error: L['color-error-text'],
};

const itemInkDark: Record<NotificationType, string> = {
  info: D['color-text-link'],
  success: D['color-success-text'],
  warning: D['color-warning-text'],
  error: D['color-error-text'],
};

export const ItemRow = styled.div<{ $isRead: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 150ms ease;
  background-color: ${({ $isRead, theme }) =>
    $isRead ? 'transparent' : theme.colors['color-brand-primary-subtle']};

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
  }
`;

export const ItemAvatar = styled.div<{ $type: NotificationType }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $type, theme }) =>
    theme.mode === 'dark' ? itemBgDark[$type] : itemBgLight[$type]};
  color: ${({ $type, theme }) => (theme.mode === 'dark' ? itemInkDark[$type] : itemInk[$type])};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
`;

export const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemTitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export const ItemDesc = styled.p`
  margin: 2px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  line-height: 1.5;
`;

export const ItemTime = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin-top: 3px;
  display: block;
`;

export const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
`;

export const UnreadDot = styled.span<{ $visible: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors['color-brand-primary']};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 200ms ease;
  margin-top: 2px;
`;

export const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  cursor: pointer;
  opacity: 0;
  transition: opacity 150ms ease, background-color 150ms ease;
  outline: none;

  ${ItemRow}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-border-default']};
    color: ${({ theme }) => theme.colors['color-error-default']};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    opacity: 1;
  }
`;

export const getTypeIcon = css``;
