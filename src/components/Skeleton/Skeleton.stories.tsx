import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder shapes while content loads. Use **Skeleton.Text**, **Skeleton.Avatar**, **Skeleton.Button**, and **Skeleton.Card** for common layouts.',
      },
    },
  },
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    borderRadius: { control: 'text' },
    isAnimated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    width: '200px',
    height: '20px',
    borderRadius: '6px',
    isAnimated: true,
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Primitives</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Skeleton width="100%" height="12px" />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Skeleton.Avatar size="md" />
            <Skeleton.Button size="md" />
          </div>
          <Skeleton.Card />
        </div>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Skeleton width="100%" height="8px" borderRadius="4px" />
      <Skeleton width="80%" height="16px" borderRadius="8px" />
      <Skeleton width="60%" height="24px" borderRadius="8px" />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Animated</p>
        <Skeleton.Text lines={2} isAnimated />
      </div>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Static</p>
        <Skeleton.Text lines={2} isAnimated={false} />
      </div>
    </div>
  ),
};

// ── Text Variants ─────────────────────────────────────────────────────────────

export const TextVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '360px' }}>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>1 line</p>
        <Skeleton.Text lines={1} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>3 lines (last 60%)</p>
        <Skeleton.Text lines={3} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>5 lines</p>
        <Skeleton.Text lines={5} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Static (no shimmer)</p>
        <Skeleton.Text lines={3} isAnimated={false} />
      </div>
    </div>
  ),
};

// ── Avatar Variants ───────────────────────────────────────────────────────────

export const AvatarVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 12, fontWeight: 600 }}>Circle sizes</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Skeleton.Avatar size="xs" />
          <Skeleton.Avatar size="sm" />
          <Skeleton.Avatar size="md" />
          <Skeleton.Avatar size="lg" />
          <Skeleton.Avatar size="xl" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 12, fontWeight: 600 }}>Square shape</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Skeleton.Avatar size="sm" shape="square" />
          <Skeleton.Avatar size="md" shape="square" />
          <Skeleton.Avatar size="lg" shape="square" />
        </div>
      </div>
    </div>
  ),
};

// ── Card Example ──────────────────────────────────────────────────────────────

export const CardExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', maxWidth: '700px' }}>
      <div style={{ width: '220px' }}>
        <Skeleton.Card />
      </div>
      <div style={{ width: '220px' }}>
        <Skeleton.Card />
      </div>
      <div style={{ width: '220px' }}>
        <Skeleton.Card />
      </div>
    </div>
  ),
};

// ── Button Variants ───────────────────────────────────────────────────────────

export const ButtonVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Skeleton.Button size="sm" />
      <Skeleton.Button size="md" />
      <Skeleton.Button size="lg" />
      <Skeleton.Button size="md" width="160px" />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px' }}>
      <Skeleton.Text lines={3} />
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Skeleton.Avatar size="md" />
        <div style={{ flex: 1 }}>
          <Skeleton.Text lines={2} />
        </div>
      </div>
      <Skeleton.Button />
    </div>
  ),
  parameters: { docs: { description: { story: 'Choose Dark in the toolbar color mode control to preview this story.' } } },
};
