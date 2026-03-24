import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Settings, User, LogOut, Moon, Bell, Palette } from 'lucide-react';
import { Popover } from './Popover';
import { Button } from '../Button';
import { Switch } from '../Switch';
import { TextInput } from '../TextInput';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Popover renders rich content anchored to a trigger. Supports controlled/uncontrolled modes and six placement options.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'bottom-start', 'bottom-end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 60 }}>
      <Popover {...args}>
        <Popover.Trigger>
          <Button>Open popover</Button>
        </Popover.Trigger>
        <Popover.Content title="Popover title">
          <p style={{ margin: 0, fontSize: 14, color: '#6B7694', lineHeight: 1.5 }}>
            This is popover content. You can put anything here — forms, menus, info panels.
          </p>
        </Popover.Content>
      </Popover>
    </div>
  ),
  args: { placement: 'bottom-start' },
};

// ── Placements ────────────────────────────────────────────────────────────────

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: 12,
        alignItems: 'center',
        justifyItems: 'center',
        padding: 80,
      }}
    >
      {(['top', 'bottom-start', 'bottom', 'bottom-end', 'left', 'right'] as const).map((p) => (
        <Popover key={p} placement={p}>
          <Popover.Trigger>
            <Button size="sm" variant="secondary">{p}</Button>
          </Popover.Trigger>
          <Popover.Content title={`Placement: ${p}`}>
            <p style={{ margin: 0, fontSize: 13, color: '#6B7694' }}>
              Content anchored to <strong>{p}</strong>.
            </p>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
};

// ── With Form ─────────────────────────────────────────────────────────────────

export const WithForm: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
      <div style={{ padding: 60 }}>
        <Popover placement="bottom-start">
          <Popover.Trigger>
            <Button leftIcon={<User size={15} />}>Edit profile</Button>
          </Popover.Trigger>
          <Popover.Content title="Edit profile" width={300}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TextInput
                label="Display name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="sm"
              />
              <TextInput
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="sm"
              />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
                <Button size="sm" variant="ghost">Cancel</Button>
                <Button size="sm">Save changes</Button>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  },
};

// ── With Menu ─────────────────────────────────────────────────────────────────

const MenuRow = ({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 10px',
      borderRadius: 8,
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      color: danger ? '#D22232' : '#111827',
      transition: 'background 100ms',
    }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#F0F2F5')}
    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
  >
    <span style={{ color: danger ? '#D22232' : '#6B7694', display: 'flex' }}>{icon}</span>
    {label}
  </div>
);

export const WithMenu: Story = {
  render: () => (
    <div style={{ padding: 60 }}>
      <Popover placement="bottom-end">
        <Popover.Trigger>
          <Button variant="secondary" leftIcon={<Settings size={15} />}>
            Settings
          </Button>
        </Popover.Trigger>
        <Popover.Content width={200}>
          <div style={{ margin: -4 }}>
            <MenuRow icon={<User size={15} />} label="Profile" />
            <MenuRow icon={<Bell size={15} />} label="Notifications" />
            <MenuRow icon={<Palette size={15} />} label="Appearance" />
            <div style={{ borderTop: '1px solid #F0F2F5', margin: '4px 0' }} />
            <MenuRow icon={<LogOut size={15} />} label="Sign out" danger />
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 60, flexWrap: 'wrap' }}>
      <Popover placement="bottom-start">
        <Popover.Trigger>
          <Button size="sm">Text only</Button>
        </Popover.Trigger>
        <Popover.Content>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Simple body copy.</p>
        </Popover.Content>
      </Popover>
      <Popover placement="bottom-start">
        <Popover.Trigger>
          <Button size="sm" variant="secondary">
            With title
          </Button>
        </Popover.Trigger>
        <Popover.Content title="Settings" width={260}>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Titled panel with fixed width.</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 60, flexWrap: 'wrap' }}>
      <Popover placement="bottom-start">
        <Popover.Trigger>
          <Button size="sm">Narrow</Button>
        </Popover.Trigger>
        <Popover.Content width={200}>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7694' }}>width 200</p>
        </Popover.Content>
      </Popover>
      <Popover placement="bottom-start">
        <Popover.Trigger>
          <Button size="sm">Wide</Button>
        </Popover.Trigger>
        <Popover.Content width={360}>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7694' }}>width 360</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ padding: 60 }}>
      <Popover placement="bottom-start">
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content title="Interactive">
          <p style={{ margin: 0, fontSize: 14, color: '#6b7694' }}>Click outside or Escape to close.</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ padding: 60 }}>
      <Popover placement="bottom-start">
        <Popover.Trigger>
          <Button>Open popover</Button>
        </Popover.Trigger>
        <Popover.Content title="Settings" width={260}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Switch label="Dark mode" checked onChange={() => {}} />
            <Switch label="Notifications" checked={false} onChange={() => {}} />
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
