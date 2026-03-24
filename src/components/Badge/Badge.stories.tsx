import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Badges are used to highlight status, labels, or counts.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'error', 'warning'] },
    size: { control: 'select', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { children: 'Badge', variant: 'primary' },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge size="sm" variant="primary">
        Small
      </Badge>
      <Badge size="md" variant="primary">
        Medium
      </Badge>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ width: 100, fontSize: 12, fontWeight: 600, color: '#6b7694' }}>With dot</span>
        <Badge variant="default" dot>
          Inactive
        </Badge>
        <Badge variant="success" dot>
          Active
        </Badge>
        <Badge variant="error" dot>
          Critical
        </Badge>
        <Badge variant="warning" dot>
          Degraded
        </Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ width: 100, fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Text only</span>
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Live</Badge>
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
        background: '#0c0d10',
        padding: 24,
        borderRadius: 12,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning" dot>
        Status
      </Badge>
    </div>
  ),
};
