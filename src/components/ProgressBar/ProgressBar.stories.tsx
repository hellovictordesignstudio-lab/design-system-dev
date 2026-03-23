import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ProgressBar communicates completion of a task. Supports variants, sizes, indeterminate mode, and value display.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'error', 'warning'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    isIndeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    isAnimated: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    value: 65,
    variant: 'default',
    size: 'md',
    showValue: true,
    label: 'Uploading files...',
    isAnimated: true,
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '320px' }}>
      <ProgressBar value={65} variant="default" label="Default" showValue />
      <ProgressBar value={90} variant="success" label="Success" showValue />
      <ProgressBar value={42} variant="error" label="Error" showValue />
      <ProgressBar value={73} variant="warning" label="Warning" showValue />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '320px' }}>
      <ProgressBar value={60} size="sm" label="Small (4px)" />
      <ProgressBar value={60} size="md" label="Medium (8px)" />
      <ProgressBar value={60} size="lg" label="Large (12px)" />
    </div>
  ),
};

// ── Indeterminate ─────────────────────────────────────────────────────────────

export const Indeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '320px' }}>
      <ProgressBar isIndeterminate label="Loading..." size="sm" />
      <ProgressBar isIndeterminate label="Loading..." size="md" />
      <ProgressBar isIndeterminate variant="success" label="Processing..." size="lg" />
    </div>
  ),
};

// ── Animated ──────────────────────────────────────────────────────────────────

export const Animated: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 5));
      }, 400);
      return () => clearInterval(timer);
    }, []);
    return (
      <div style={{ width: '320px' }}>
        <ProgressBar value={value} label="Auto-advancing" showValue isAnimated />
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '320px' }}>
      <ProgressBar value={65} variant="default" label="Default" showValue />
      <ProgressBar value={90} variant="success" label="Success" showValue />
      <ProgressBar isIndeterminate label="Indeterminate" />
    </div>
  ),
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
