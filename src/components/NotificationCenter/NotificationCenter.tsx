import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { Bell, Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useLang } from '../../theme/LangContext';
import type {
  Notification,
  NotificationCenterProps,
  NotificationItemProps,
  NotificationType,
  NotificationTab,
} from './NotificationCenter.types';
import {
  Wrapper,
  TriggerBtn,
  Badge,
  Panel,
  PanelHeader,
  PanelTitle,
  MarkAllBtn,
  TabsRow,
  Tab,
  List,
  EmptyWrap,
  EmptyText,
  PanelFooter,
  ViewAllBtn,
  ItemRow,
  ItemAvatar,
  ItemContent,
  ItemTitle,
  ItemDesc,
  ItemTime,
  ItemRight,
  UnreadDot,
  RemoveBtn,
} from './NotificationCenter.styles';

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const typeIcons: Record<NotificationType, React.ReactNode> = {
  info:    <Info    size={16} />,
  success: <CheckCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  error:   <AlertCircle size={16} />,
};

// ── NotificationItem ─────────────────────────────────────────────────────────

export function NotificationItem({ notification, onMarkRead, onRemove }: NotificationItemProps) {
  const { id, type, title, description, time, isRead, onAction } = notification;

  function handleClick() {
    if (!isRead) onMarkRead(id);
    onAction?.();
  }

  return (
    <ItemRow $isRead={isRead} onClick={handleClick}>
      <ItemAvatar $type={type}>
        {typeIcons[type]}
      </ItemAvatar>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        {description && <ItemDesc>{description}</ItemDesc>}
        <ItemTime>{timeAgo(time)}</ItemTime>
      </ItemContent>
      <ItemRight>
        <UnreadDot $visible={!isRead} />
        {onRemove && (
          <RemoveBtn
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(id); }}
            aria-label="Dismiss notification"
          >
            <X size={12} />
          </RemoveBtn>
        )}
      </ItemRight>
    </ItemRow>
  );
}

// ── useNotifications hook ─────────────────────────────────────────────────────

const STORAGE_KEY = 'ds-notifications';

interface UseNotificationsReturn {
  notifications: Notification[];
  add: (n: Omit<Notification, 'id' | 'time' | 'isRead'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clear: () => void;
}

let notifCounter = 0;

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Notification[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  const add = useCallback((n: Omit<Notification, 'id' | 'time' | 'isRead'>) => {
    setNotifications((prev) => [
      {
        ...n,
        id: `notif-${Date.now()}-${++notifCounter}`,
        time: Date.now(),
        isRead: false,
      },
      ...prev,
    ]);
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clear = useCallback(() => setNotifications([]), []);

  return { notifications, add, markRead, markAllRead, remove, clear };
}

// ── NotificationCenter ────────────────────────────────────────────────────────

export function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onRemove,
  onViewAll,
}: NotificationCenterProps) {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<NotificationTab>('all');
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const visible = tab === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;

  function open() {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const GAP = 8;
    const panelW = 380;
    let left = rect.right - panelW;
    if (left < 8) left = 8;
    setPanelStyle({
      position: 'fixed',
      left,
      top: rect.bottom + GAP,
      zIndex: 9999,
    });
    setIsOpen(true);
  }

  function close() { setIsOpen(false); }
  function toggle() { isOpen ? close() : open(); }

  useEffect(() => {
    if (!isOpen) return;
    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) close();
    }
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') { close(); triggerRef.current?.focus(); } }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <Wrapper>
      <TriggerBtn
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-label={t('notifications.title')}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <Badge aria-label={`${unreadCount} unread`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </TriggerBtn>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div style={panelStyle} ref={panelRef}>
          <Panel role="dialog" aria-labelledby={titleId} aria-modal="false">
            {/* Header */}
            <PanelHeader>
              <PanelTitle id={titleId}>{t('notifications.title')}</PanelTitle>
              {unreadCount > 0 && (
                <MarkAllBtn type="button" onClick={onMarkAllRead}>
                  {t('notifications.markAllRead')}
                </MarkAllBtn>
              )}
            </PanelHeader>

            {/* Tabs */}
            <TabsRow>
              <Tab $isActive={tab === 'all'} onClick={() => setTab('all')}>
                {t('notifications.all')}
              </Tab>
              <Tab $isActive={tab === 'unread'} onClick={() => setTab('unread')}>
                {t('notifications.unread')}
                {unreadCount > 0 && ` (${unreadCount})`}
              </Tab>
            </TabsRow>

            {/* List */}
            <List>
              {visible.length === 0 ? (
                <EmptyWrap>
                  <Bell size={28} strokeWidth={1.5} />
                  <EmptyText>{t('notifications.empty')}</EmptyText>
                </EmptyWrap>
              ) : (
                visible.map((n) => (
                  <NotificationItem
                    key={n.id}
                    notification={n}
                    onMarkRead={onMarkRead}
                    onRemove={onRemove}
                  />
                ))
              )}
            </List>

            {/* Footer */}
            {onViewAll && (
              <PanelFooter>
                <ViewAllBtn type="button" onClick={onViewAll}>
                  {t('notifications.viewAll')}
                </ViewAllBtn>
              </PanelFooter>
            )}
          </Panel>
        </div>,
        document.body,
      )}
    </Wrapper>
  );
}
