import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An indeterminate loading indicator. Use inside buttons, empty states, or full-page overlays. Color follows the `color` prop or `currentColor`.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Diameter of the spinner.' },
    label: { control: 'text', description: 'Accessible name (`aria-label`).' },
    color: { control: 'color', description: 'Stroke color (defaults to `currentColor`).' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { size: 'md', label: 'Loading' },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stroke color: default (inherits `currentColor`), brand blue, or muted gray.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Inherit</span>
        <div style={{ color: 'var(--color-brand-primary)' }}>
          <Spinner size="lg" label="Loading" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Brand</span>
        <Spinner size="lg" color="var(--color-brand-primary)" label="Loading" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Muted</span>
        <Spinner size="lg" color="var(--color-text-tertiary)" label="Loading" />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom accessible label for screen readers. Default is “Loading”.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', color: 'var(--color-brand-primary)' }}>
      <Spinner size="md" label="Loading content" />
      <Spinner size="md" label="Saving changes" />
      <Spinner size="md" label="Submitting form" />
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
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}
    >
      <div style={{ color: 'var(--color-brand-primary)' }}>
        <Spinner size="lg" label="Loading" />
      </div>
      <Spinner size="lg" color="var(--color-text-tertiary)" label="Loading" />
    </div>
  ),
};
