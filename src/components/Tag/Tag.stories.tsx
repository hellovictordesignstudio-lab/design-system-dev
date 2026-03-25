import type { Meta, StoryObj } from '@storybook/react';
import { Tag, Chip } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A compact label for categories, filters, or metadata. **Chip** is an alternate export name for the same component.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'error', 'warning', 'outline'],
      description: 'Semantic color role.',
    },
    size: { control: 'select', options: ['sm', 'md'], description: 'Padding and font size.' },
    children: { control: 'text', description: 'Label text.' },
    onRemove: { control: false, description: 'When set, shows a dismiss control.' },
    removeLabel: { control: 'text', description: 'Accessible name for the dismiss control.' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: 'Design',
    variant: 'default',
    size: 'md',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="outline">Outline</Tag>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag size="sm" variant="primary">
        Small
      </Tag>
      <Tag size="md" variant="primary">
        Medium
      </Tag>
      <Tag size="sm" variant="outline">
        Small outline
      </Tag>
      <Tag size="md" variant="outline">
        Medium outline
      </Tag>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Static</span>
        <Tag variant="default">Read-only</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="outline">Outline</Tag>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Removable</span>
        <Tag variant="primary" onRemove={() => {}} removeLabel="Remove React">
          React
        </Tag>
        <Tag variant="outline" onRemove={() => {}}>
          TypeScript
        </Tag>
        <Tag size="sm" onRemove={() => {}}>
          Small dismissible
        </Tag>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Chip alias</span>
        <Chip variant="success">Chip = Tag</Chip>
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
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="outline">Outline</Tag>
      <Tag variant="warning" onRemove={() => {}}>
        Removable
      </Tag>
    </div>
  ),
};
