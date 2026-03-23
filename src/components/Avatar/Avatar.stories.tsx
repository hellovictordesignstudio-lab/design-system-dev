import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MapPin, Star } from 'lucide-react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Avatar displays a user image, initials fallback, status indicator, or badge. AvatarGroup stacks multiple avatars.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    status: { control: 'select', options: ['online', 'away', 'busy', 'offline', ''] },
    src: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    name: 'Victor Hugo',
    size: 'md',
    shape: 'circle',
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar size="xs" name="Ana Ruiz" />
      <Avatar size="sm" name="Ben Park" />
      <Avatar size="md" name="Carlos Diaz" />
      <Avatar size="lg" name="Diana Lee" />
      <Avatar size="xl" name="Eve Martin" />
    </div>
  ),
};

// ── With Status ───────────────────────────────────────────────────────────────

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar name="Alice" status="online" />
      <Avatar name="Bob Smith" status="away" />
      <Avatar name="Carol Jones" status="busy" />
      <Avatar name="Dave Kim" status="offline" />
    </div>
  ),
};

// ── Shapes ────────────────────────────────────────────────────────────────────

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar name="Alice" shape="circle" size="lg" />
      <Avatar name="Bob Smith" shape="square" size="lg" />
      <Avatar name="Carol Jones" shape="circle" size="lg" status="online" />
      <Avatar name="Dave Kim" shape="square" size="lg" status="away" />
    </div>
  ),
};

// ── AvatarGroup ───────────────────────────────────────────────────────────────

export const AvatarGroupStory: Story = {
  name: 'AvatarGroup',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#9BA5BE' }}>max=4 (default)</div>
        <AvatarGroup max={4}>
          <Avatar name="Alice" />
          <Avatar name="Bob Smith" />
          <Avatar name="Carol Jones" />
          <Avatar name="Dave Kim" />
          <Avatar name="Eve Martin" />
          <Avatar name="Frank Zhang" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#9BA5BE' }}>max=3, size=lg</div>
        <AvatarGroup max={3} size="lg">
          <Avatar name="Alice" />
          <Avatar name="Bob Smith" />
          <Avatar name="Carol Jones" />
          <Avatar name="Dave Kim" />
          <Avatar name="Eve Martin" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#9BA5BE' }}>No overlap</div>
        <AvatarGroup overlap={false} max={4}>
          <Avatar name="Alice" />
          <Avatar name="Bob Smith" />
          <Avatar name="Carol Jones" />
          <Avatar name="Dave Kim" />
          <Avatar name="Eve Martin" />
        </AvatarGroup>
      </div>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar name="Alice" size="md" status="online" />
      <Avatar name="Bob Smith" size="md" status="away" />
      <Avatar name="Carol Jones" size="md" status="busy" />
      <AvatarGroup max={3}>
        <Avatar name="Alice" />
        <Avatar name="Bob Smith" />
        <Avatar name="Carol Jones" />
        <Avatar name="Dave Kim" />
      </AvatarGroup>
    </div>
  ),
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
