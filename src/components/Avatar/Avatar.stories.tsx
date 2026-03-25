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
          'Presents an image, initials, status, or badge. Use **AvatarGroup** to stack multiple avatars.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Diameter of the avatar.' },
    shape: { control: 'select', options: ['circle', 'square'], description: 'Outer shape.' },
    status: {
      control: 'select',
      options: ['online', 'away', 'busy', 'offline', ''],
      description: 'Optional status dot; empty hides the dot.',
    },
    src: { control: 'text', description: 'Image URL.' },
    name: { control: 'text', description: 'Used for initials when `src` is missing.' },
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

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Circle</span>
        <Avatar name="Circle User" shape="circle" size="lg" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Square</span>
        <Avatar name="Square User" shape="square" size="lg" />
      </div>
    </div>
  ),
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

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <Avatar name="Initials only" size="lg" />
      <Avatar name="With status" size="lg" status="online" />
      <Avatar
        name="With image"
        size="lg"
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
      />
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
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>max=4 (default)</div>
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
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>max=3, size=lg</div>
        <AvatarGroup max={3} size="lg">
          <Avatar name="Alice" />
          <Avatar name="Bob Smith" />
          <Avatar name="Carol Jones" />
          <Avatar name="Dave Kim" />
          <Avatar name="Eve Martin" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>No overlap</div>
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
  parameters: { docs: { description: { story: 'Choose Dark in the toolbar color mode control to preview this story.' } } },
};
