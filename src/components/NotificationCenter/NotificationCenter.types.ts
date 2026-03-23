export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  /** Unix timestamp in ms */
  time: number;
  isRead: boolean;
  onAction?: () => void;
}

export type NotificationTab = 'all' | 'unread';

export interface NotificationCenterProps {
  /** Controlled notifications (use with useNotifications hook) */
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onRemove?: (id: string) => void;
  onViewAll?: () => void;
}

export interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onRemove?: (id: string) => void;
}
