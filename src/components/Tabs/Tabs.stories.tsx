import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, Settings, Bell, Shield, BarChart2 } from 'lucide-react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Switches between related panels. Offers line, pill, and enclosed styles. Supports icons, badges, disabled tabs, and arrow-key navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pill', 'enclosed'],
      description: 'Visual style of the tab list.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const PANEL_STYLE = {
  fontSize: 14,
  color: 'var(--color-text-tertiary)',
  padding: '8px 0',
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <Tabs defaultValue="account" {...args}>
      <Tabs.List aria-label="Settings">
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="security">Security</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="billing" isDisabled>Billing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">
        <p style={PANEL_STYLE}>Manage your account settings and preferences.</p>
      </Tabs.Panel>
      <Tabs.Panel value="security">
        <p style={PANEL_STYLE}>Update your password and two-factor authentication.</p>
      </Tabs.Panel>
      <Tabs.Panel value="notifications">
        <p style={PANEL_STYLE}>Choose which notifications you want to receive.</p>
      </Tabs.Panel>
    </Tabs>
  ),
  args: { variant: 'line' },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Line */}
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Line
        </p>
        <Tabs defaultValue="a" variant="line">
          <Tabs.List>
            <Tabs.Tab value="a">Overview</Tabs.Tab>
            <Tabs.Tab value="b">Analytics</Tabs.Tab>
            <Tabs.Tab value="c">Reports</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="a"><p style={PANEL_STYLE}>Overview content</p></Tabs.Panel>
          <Tabs.Panel value="b"><p style={PANEL_STYLE}>Analytics content</p></Tabs.Panel>
          <Tabs.Panel value="c"><p style={PANEL_STYLE}>Reports content</p></Tabs.Panel>
        </Tabs>
      </div>

      {/* Pill */}
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Pill
        </p>
        <Tabs defaultValue="a" variant="pill">
          <Tabs.List>
            <Tabs.Tab value="a">Overview</Tabs.Tab>
            <Tabs.Tab value="b">Analytics</Tabs.Tab>
            <Tabs.Tab value="c">Reports</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="a"><p style={PANEL_STYLE}>Overview content</p></Tabs.Panel>
          <Tabs.Panel value="b"><p style={PANEL_STYLE}>Analytics content</p></Tabs.Panel>
          <Tabs.Panel value="c"><p style={PANEL_STYLE}>Reports content</p></Tabs.Panel>
        </Tabs>
      </div>

      {/* Enclosed */}
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Enclosed
        </p>
        <Tabs defaultValue="a" variant="enclosed">
          <Tabs.List>
            <Tabs.Tab value="a">Overview</Tabs.Tab>
            <Tabs.Tab value="b">Analytics</Tabs.Tab>
            <Tabs.Tab value="c">Reports</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="a"><p style={PANEL_STYLE}>Overview content</p></Tabs.Panel>
          <Tabs.Panel value="b"><p style={PANEL_STYLE}>Analytics content</p></Tabs.Panel>
          <Tabs.Panel value="c"><p style={PANEL_STYLE}>Reports content</p></Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Tabs defaultValue="profile" variant="line">
        <Tabs.List aria-label="User settings">
          <Tabs.Tab value="profile" leftIcon={<User size={15} />}>Profile</Tabs.Tab>
          <Tabs.Tab value="security" leftIcon={<Shield size={15} />}>Security</Tabs.Tab>
          <Tabs.Tab value="notifications" leftIcon={<Bell size={15} />}>Notifications</Tabs.Tab>
          <Tabs.Tab value="settings" leftIcon={<Settings size={15} />} isDisabled>Settings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile"><p style={PANEL_STYLE}>Your profile information and avatar.</p></Tabs.Panel>
        <Tabs.Panel value="security"><p style={PANEL_STYLE}>Two-factor auth and session management.</p></Tabs.Panel>
        <Tabs.Panel value="notifications"><p style={PANEL_STYLE}>Email and push notification preferences.</p></Tabs.Panel>
      </Tabs>

      <Tabs defaultValue="overview" variant="pill">
        <Tabs.List>
          <Tabs.Tab value="overview" leftIcon={<BarChart2 size={15} />}>Overview</Tabs.Tab>
          <Tabs.Tab value="users" leftIcon={<User size={15} />}>Users</Tabs.Tab>
          <Tabs.Tab value="settings" leftIcon={<Settings size={15} />}>Settings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview"><p style={PANEL_STYLE}>Dashboard overview.</p></Tabs.Panel>
        <Tabs.Panel value="users"><p style={PANEL_STYLE}>User management.</p></Tabs.Panel>
        <Tabs.Panel value="settings"><p style={PANEL_STYLE}>App settings.</p></Tabs.Panel>
      </Tabs>
    </div>
  ),
};

// ── With Badges ───────────────────────────────────────────────────────────────

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox" variant="line">
      <Tabs.List>
        <Tabs.Tab value="inbox" badge={12}>Inbox</Tabs.Tab>
        <Tabs.Tab value="sent">Sent</Tabs.Tab>
        <Tabs.Tab value="drafts" badge={3}>Drafts</Tabs.Tab>
        <Tabs.Tab value="spam" badge={99}>Spam</Tabs.Tab>
        <Tabs.Tab value="archive" isDisabled>Archive</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="inbox"><p style={PANEL_STYLE}>12 unread messages in your inbox.</p></Tabs.Panel>
      <Tabs.Panel value="sent"><p style={PANEL_STYLE}>Messages you've sent.</p></Tabs.Panel>
      <Tabs.Panel value="drafts"><p style={PANEL_STYLE}>3 unfinished drafts.</p></Tabs.Panel>
      <Tabs.Panel value="spam"><p style={PANEL_STYLE}>99+ spam messages.</p></Tabs.Panel>
    </Tabs>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tab list width follows the container — use narrow or wide layouts to match your shell.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 320 }}>
        <Tabs defaultValue="a" variant="line">
          <Tabs.List>
            <Tabs.Tab value="a">One</Tabs.Tab>
            <Tabs.Tab value="b">Two</Tabs.Tab>
            <Tabs.Tab value="c">Three</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="a"><p style={PANEL_STYLE}>Narrow</p></Tabs.Panel>
          <Tabs.Panel value="b"><p style={PANEL_STYLE}>…</p></Tabs.Panel>
          <Tabs.Panel value="c"><p style={PANEL_STYLE}>…</p></Tabs.Panel>
        </Tabs>
      </div>
      <div style={{ maxWidth: 560 }}>
        <Tabs defaultValue="a" variant="line">
          <Tabs.List>
            <Tabs.Tab value="a">Overview</Tabs.Tab>
            <Tabs.Tab value="b">Analytics</Tabs.Tab>
            <Tabs.Tab value="c">Reports</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="a"><p style={PANEL_STYLE}>Wide</p></Tabs.Panel>
          <Tabs.Panel value="b"><p style={PANEL_STYLE}>…</p></Tabs.Panel>
          <Tabs.Panel value="c"><p style={PANEL_STYLE}>…</p></Tabs.Panel>
        </Tabs>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs defaultValue="a" variant="line">
        <Tabs.List aria-label="With disabled tab">
          <Tabs.Tab value="a">Active</Tabs.Tab>
          <Tabs.Tab value="b" isDisabled>
            Disabled
          </Tabs.Tab>
          <Tabs.Tab value="c">Other</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a"><p style={PANEL_STYLE}>Enabled tab content.</p></Tabs.Panel>
        <Tabs.Panel value="c"><p style={PANEL_STYLE}>Other panel.</p></Tabs.Panel>
      </Tabs>
      <Tabs defaultValue="inbox" variant="pill">
        <Tabs.List>
          <Tabs.Tab value="inbox" badge={3}>
            Inbox
          </Tabs.Tab>
          <Tabs.Tab value="sent">Sent</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="inbox"><p style={PANEL_STYLE}>With badge.</p></Tabs.Panel>
        <Tabs.Panel value="sent"><p style={PANEL_STYLE}>Sent</p></Tabs.Panel>
      </Tabs>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        background: 'var(--color-bg-canvas)',
        padding: 24,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <Tabs defaultValue="a" variant="line">
        <Tabs.List>
          <Tabs.Tab value="a">Overview</Tabs.Tab>
          <Tabs.Tab value="b">Analytics</Tabs.Tab>
          <Tabs.Tab value="c" badge={5}>
            Reports
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a"><p style={PANEL_STYLE}>Line variant</p></Tabs.Panel>
        <Tabs.Panel value="b"><p style={PANEL_STYLE}>Analytics</p></Tabs.Panel>
        <Tabs.Panel value="c"><p style={PANEL_STYLE}>Reports</p></Tabs.Panel>
      </Tabs>
      <Tabs defaultValue="a" variant="pill">
        <Tabs.List>
          <Tabs.Tab value="a">Overview</Tabs.Tab>
          <Tabs.Tab value="b">Analytics</Tabs.Tab>
          <Tabs.Tab value="c">Reports</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a"><p style={PANEL_STYLE}>Pill variant</p></Tabs.Panel>
        <Tabs.Panel value="b"><p style={PANEL_STYLE}>Analytics</p></Tabs.Panel>
        <Tabs.Panel value="c"><p style={PANEL_STYLE}>Reports</p></Tabs.Panel>
      </Tabs>
    </div>
  ),
  parameters: { backgrounds: { default: 'dark' } },
};
