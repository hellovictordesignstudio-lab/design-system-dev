import type { Meta, StoryObj } from '@storybook/react';
import { Home, Inbox, Mail, Settings, User } from 'lucide-react';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  subcomponents: { Item: List.Item },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Rows for settings, menus, or results. Supports links, buttons, leading and trailing slots, and bordered grouping.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered'],
      description: 'Default adds spacing between rows; bordered groups rows in one frame.',
    },
    ordered: { control: 'boolean', description: 'Uses `<ol>` instead of `<ul>`.' },
    'aria-label': { control: 'text', description: 'Accessible name for the list.' },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <List {...args}>
        <List.Item leading={<User size={18} />}>Profile</List.Item>
        <List.Item leading={<Inbox size={18} />} trailing="3" description="Unread messages">
          Inbox
        </List.Item>
        <List.Item leading={<Settings size={18} />}>Settings</List.Item>
      </List>
    </div>
  ),
  args: {
    variant: 'default',
    ordered: false,
    'aria-label': 'Example list',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Default</p>
        <div style={{ maxWidth: 400 }}>
          <List variant="default" aria-label="Default variant">
            <List.Item leading={<User size={18} />}>Account</List.Item>
            <List.Item leading={<Settings size={18} />}>Preferences</List.Item>
          </List>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Bordered</p>
        <div style={{ maxWidth: 400 }}>
          <List variant="bordered" aria-label="Bordered variant">
            <List.Item leading={<User size={18} />} description="Profile and security">
              Account
            </List.Item>
            <List.Item leading={<Inbox size={18} />} trailing="3">
              Inbox
            </List.Item>
          </List>
        </div>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Row density: single-line items vs rows with a description (more vertical space). Container width also affects text wrapping.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>
          Compact rows (title only)
        </p>
        <div style={{ maxWidth: 360 }}>
          <List variant="bordered" aria-label="Compact">
            <List.Item leading={<Mail size={18} />}>Mail</List.Item>
            <List.Item leading={<Inbox size={18} />}>Inbox</List.Item>
            <List.Item leading={<Settings size={18} />}>Settings</List.Item>
          </List>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>
          Expanded rows (title + description)
        </p>
        <div style={{ maxWidth: 480 }}>
          <List variant="bordered" aria-label="Expanded">
            <List.Item
              leading={<Mail size={18} />}
              description="Workspace and personal addresses"
            >
              Mail accounts
            </List.Item>
            <List.Item
              leading={<Inbox size={18} />}
              trailing="12"
              description="Unread across folders"
            >
              Inbox
            </List.Item>
          </List>
        </div>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Static</p>
        <List variant="bordered" aria-label="Static rows">
          <List.Item leading={<User size={18} />}>Display only</List.Item>
        </List>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Link (href)</p>
        <List variant="bordered" aria-label="Links">
          <List.Item leading={<Inbox size={18} />} href="#" description="Opens in same tab">
            Notifications
          </List.Item>
        </List>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Button (onClick)</p>
        <List variant="bordered" aria-label="Actions">
          <List.Item
            leading={<Settings size={18} />}
            onClick={() => {
              /* story demo */
            }}
          >
            Action row
          </List.Item>
        </List>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Disabled</p>
        <List variant="bordered" aria-label="Disabled row">
          <List.Item leading={<Home size={18} />} isDisabled description="Unavailable">
            Home
          </List.Item>
        </List>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Ordered list</p>
        <List ordered aria-label="Steps">
          <List.Item>Sign up</List.Item>
          <List.Item>Verify email</List.Item>
          <List.Item>Complete profile</List.Item>
        </List>
      </div>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{
        background: 'var(--color-bg-canvas)',
        padding: 24,
        borderRadius: 12,
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <List variant="bordered" aria-label="Dark list">
        <List.Item leading={<User size={18} />} description="Profile and security">
          Account
        </List.Item>
        <List.Item leading={<Inbox size={18} />} trailing="3">
          Inbox
        </List.Item>
        <List.Item leading={<Settings size={18} />}>Settings</List.Item>
      </List>
    </div>
  ),
};
