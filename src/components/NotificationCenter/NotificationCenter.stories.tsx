import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter, NotificationItem, useNotifications } from './NotificationCenter';
import type { Notification } from './NotificationCenter.types';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { LangProvider } from '../../theme/LangContext';
import { Button } from '../Button';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Components/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A Bell icon trigger with a dropdown panel showing notifications. Tabs for All / Unread. Persists to localStorage via the useNotifications() hook. Supports info, success, warning, and error types.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

// ── Sample data ───────────────────────────────────────────────────────────────

const SAMPLE: Notification[] = [
  { id: '1', type: 'success', title: 'Deployment successful', description: 'v2.1.0 is now live on production.', time: Date.now() - 60000, isRead: false },
  { id: '2', type: 'info',    title: 'New comment on your post', description: 'Alice left a comment on "Design tokens best practices".', time: Date.now() - 3600000, isRead: false },
  { id: '3', type: 'warning', title: 'Storage almost full', description: 'You have used 90% of your 5 GB storage.', time: Date.now() - 86400000, isRead: true },
  { id: '4', type: 'error',   title: 'Payment failed', description: 'Your payment method was declined. Please update your billing info.', time: Date.now() - 172800000, isRead: true },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [notifs, setNotifs] = useState<Notification[]>(SAMPLE);
    const markRead = (id: string) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, isRead: true } : n));
    const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, isRead: true })));
    const remove = (id: string) => setNotifs((p) => p.filter((n) => n.id !== id));

    return (
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
        <NotificationCenter
          notifications={notifs}
          onMarkRead={markRead}
          onMarkAllRead={markAllRead}
          onRemove={remove}
          onViewAll={() => alert('View all!')}
        />
      </div>
    );
  },
};

// ── WithHook ──────────────────────────────────────────────────────────────────

export const WithHook: Story = {
  render: () => {
    const { notifications, add, markRead, markAllRead, remove, clear } = useNotifications();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => add({ type: 'success', title: 'Action completed', description: 'Your request was processed.' })}>
            Add success
          </Button>
          <Button size="sm" variant="secondary" onClick={() => add({ type: 'info', title: 'New message', description: 'You have a new message from the team.' })}>
            Add info
          </Button>
          <Button size="sm" variant="secondary" onClick={() => add({ type: 'warning', title: 'Heads up!', description: 'Something needs your attention.' })}>
            Add warning
          </Button>
          <Button size="sm" variant="danger" onClick={clear}>Clear all</Button>
        </div>
        <NotificationCenter
          notifications={notifications}
          onMarkRead={markRead}
          onMarkAllRead={markAllRead}
          onRemove={remove}
          onViewAll={() => {}}
        />
      </div>
    );
  },
};

// ── Empty ─────────────────────────────────────────────────────────────────────

export const Empty: Story = {
  render: () => (
    <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
      <NotificationCenter
        notifications={[]}
        onMarkRead={() => {}}
        onMarkAllRead={() => {}}
      />
    </div>
  ),
};

// ── Languages ─────────────────────────────────────────────────────────────────

export const Languages: Story = {
  render: () => {
    const [notifs, setNotifs] = useState<Notification[]>(SAMPLE);
    const markRead = (id: string) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, isRead: true } : n));
    const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, isRead: true })));

    return (
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start', padding: '24px' }}>
        {(['en', 'es', 'fr'] as const).map((lang) => (
          <LangProvider key={lang} defaultLang={lang}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#9BA5BE', textTransform: 'uppercase' }}>{lang}</span>
              <NotificationCenter
                notifications={notifs}
                onMarkRead={markRead}
                onMarkAllRead={markAllRead}
              />
            </div>
          </LangProvider>
        ))}
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [notifs, setNotifs] = useState<Notification[]>([
      { id: 'a', type: 'success', title: 'Success', description: 'Done.', time: Date.now(), isRead: false },
      { id: 'b', type: 'error', title: 'Error', description: 'Failed.', time: Date.now(), isRead: false },
    ]);
    const markRead = (id: string) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    return (
      <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
        <NotificationCenter
          notifications={notifs}
          onMarkRead={markRead}
          onMarkAllRead={() => setNotifs((p) => p.map((n) => ({ ...n, isRead: true })))}
          onRemove={(id) => setNotifs((p) => p.filter((n) => n.id !== id))}
        />
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Panel width is fixed; position the trigger in your header toolbar.',
      },
    },
  },
  render: () => {
    const [notifs, setNotifs] = useState<Notification[]>(SAMPLE);
    const markRead = (id: string) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, isRead: true })));
    const remove = (id: string) => setNotifs((p) => p.filter((n) => n.id !== id));
    const inner = (
      <NotificationCenter
        notifications={notifs}
        onMarkRead={markRead}
        onMarkAllRead={markAllRead}
        onRemove={remove}
        onViewAll={() => {}}
      />
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <div style={{ width: 320, border: '1px solid #e2e5ed', borderRadius: 8, padding: 12, display: 'flex', justifyContent: 'center' }}>{inner}</div>
        <div style={{ width: '100%', maxWidth: 560, display: 'flex', justifyContent: 'center' }}>{inner}</div>
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [notifs, setNotifs] = useState<Notification[]>(SAMPLE);
    const markRead = (id: string) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, isRead: true })));
    const remove = (id: string) => setNotifs((p) => p.filter((n) => n.id !== id));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>With notifications</p>
          <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
            <NotificationCenter
              notifications={notifs}
              onMarkRead={markRead}
              onMarkAllRead={markAllRead}
              onRemove={remove}
              onViewAll={() => {}}
            />
          </div>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Empty</p>
          <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
            <NotificationCenter notifications={[]} onMarkRead={() => {}} onMarkAllRead={() => {}} />
          </div>
        </div>
      </div>
    );
  },
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [notifs, setNotifs] = useState<Notification[]>(SAMPLE);
    const markRead = (id: string) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, isRead: true } : n));
    const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, isRead: true })));
    const remove = (id: string) => setNotifs((p) => p.filter((n) => n.id !== id));

    return (
      <ThemeProvider defaultColorMode="dark">
        <div style={{ padding: '32px', backgroundColor: darkTheme.colors['color-bg-canvas'], borderRadius: '12px', display: 'flex', justifyContent: 'center' }}>
          <NotificationCenter
            notifications={notifs}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
            onRemove={remove}
            onViewAll={() => {}}
          />
        </div>
      </ThemeProvider>
    );
  },
};
