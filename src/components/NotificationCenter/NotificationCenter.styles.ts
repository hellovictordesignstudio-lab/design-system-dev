import styled, { keyframes, css } from 'styled-components';
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
  border: 1px solid #E2E5ED;
  background-color: #ffffff;
  cursor: pointer;
  color: #6B7694;
  transition: background-color 150ms ease, color 150ms ease;
  outline: none;

  &:hover { background-color: #F0F2F5; color: #111827; }
  &:focus-visible { box-shadow: 0 0 0 3px rgba(0,85,255,0.12); border-color: #0055FF; }

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
    border-color: #2E3550;
    color: #9BA5BE;
    &:hover { background-color: #2E3550; color: #F0F2F5; }
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
  background-color: #D22232;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 2px solid #ffffff;

  [data-theme='dark'] &, .dark & {
    border-color: #1A1F35;
  }
`;

// ── Panel ─────────────────────────────────────────────────────────────────────

export const Panel = styled.div`
  width: 380px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #E2E5ED;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  animation: ${fadeIn} 150ms ease forwards;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
    border-color: #2E3550;
  }
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
  color: #111827;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
  }
`;

export const MarkAllBtn = styled.button`
  border: none;
  background: none;
  font-size: 12px;
  font-weight: 600;
  color: #0055FF;
  cursor: pointer;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition: color 150ms ease;
  outline: none;

  &:hover { color: #2952CC; }
  &:focus-visible { outline: 2px solid #0055FF; border-radius: 4px; }

  [data-theme='dark'] &, .dark & {
    color: #7BA4FF;
    &:hover { color: #A3BEFF; }
  }
`;

// ── Tabs ──────────────────────────────────────────────────────────────────────

export const TabsRow = styled.div`
  display: flex;
  gap: 0;
  padding: 12px 16px 0;
  border-bottom: 1px solid #F0F2F5;

  [data-theme='dark'] &, .dark & {
    border-bottom-color: #2E3550;
  }
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  border: none;
  background: none;
  padding: 6px 12px;
  border-bottom: 2px solid ${({ $isActive }) => ($isActive ? '#0055FF' : 'transparent')};
  font-size: 13px;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  color: ${({ $isActive }) => ($isActive ? '#0055FF' : '#6B7694')};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition: color 150ms ease, border-color 150ms ease;
  margin-bottom: -1px;
  outline: none;

  &:focus-visible { outline: 2px solid #0055FF; border-radius: 4px; }

  [data-theme='dark'] &, .dark & {
    color: ${({ $isActive }) => ($isActive ? '#7BA4FF' : '#6B7694')};
    border-bottom-color: ${({ $isActive }) => ($isActive ? '#7BA4FF' : 'transparent')};
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
  color: #9BA5BE;
`;

export const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #9BA5BE;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const PanelFooter = styled.div`
  border-top: 1px solid #F0F2F5;
  padding: 10px 16px;
  display: flex;
  justify-content: center;

  [data-theme='dark'] &, .dark & {
    border-top-color: #2E3550;
  }
`;

export const ViewAllBtn = styled.button`
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 600;
  color: #0055FF;
  cursor: pointer;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  outline: none;
  transition: color 150ms ease;

  &:hover { color: #2952CC; }
  &:focus-visible { outline: 2px solid #0055FF; border-radius: 4px; }

  [data-theme='dark'] &, .dark & {
    color: #7BA4FF;
  }
`;

// ── Item ──────────────────────────────────────────────────────────────────────

const itemBg: Record<NotificationType, string> = {
  info:    '#E8EEFF',
  success: '#DCFCE7',
  warning: '#FEF3C7',
  error:   '#FEE2E2',
};
const itemBgDark: Record<NotificationType, string> = {
  info:    '#1E2E5E',
  success: '#14532D',
  warning: '#451A03',
  error:   '#450A0A',
};
const itemColor: Record<NotificationType, string> = {
  info:    '#2952CC',
  success: '#15803D',
  warning: '#92400E',
  error:   '#B91C1C',
};

export const ItemRow = styled.div<{ $isRead: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 150ms ease;
  background-color: ${({ $isRead }) => ($isRead ? 'transparent' : 'rgba(0,85,255,0.04)')};

  &:hover { background-color: #F0F2F5; }

  [data-theme='dark'] &, .dark & {
    background-color: ${({ $isRead }) => ($isRead ? 'transparent' : 'rgba(0,85,255,0.08)')};
    &:hover { background-color: #2E3550; }
  }
`;

export const ItemAvatar = styled.div<{ $type: NotificationType }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $type }) => itemBg[$type]};
  color: ${({ $type }) => itemColor[$type]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;

  [data-theme='dark'] &, .dark & {
    background-color: ${({ $type }) => itemBgDark[$type]};
  }
`;

export const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemTitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
  }
`;

export const ItemDesc = styled.p`
  margin: 2px 0 0;
  font-size: 12px;
  color: #6B7694;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  line-height: 1.5;

  [data-theme='dark'] &, .dark & {
    color: #9BA5BE;
  }
`;

export const ItemTime = styled.span`
  font-size: 11px;
  color: #9BA5BE;
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
  background-color: #0055FF;
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
  color: #9BA5BE;
  cursor: pointer;
  opacity: 0;
  transition: opacity 150ms ease, background-color 150ms ease;
  outline: none;

  ${ItemRow}:hover & {
    opacity: 1;
  }

  &:hover { background-color: #E2E5ED; color: #D22232; }
  &:focus-visible { outline: 2px solid #0055FF; opacity: 1; }

  [data-theme='dark'] &, .dark & {
    &:hover { background-color: #2E3550; }
  }
`;

export const getTypeIcon = css``;
