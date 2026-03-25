import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Trash2, ArrowRight, Download } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A button triggers an action or navigation. Supports variants, sizes, loading state, and leading or trailing icons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style (variant).',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height and horizontal padding.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner and disables the control.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Fills the width of the container.',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button>Default</Button>
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button leftIcon={<Plus size={16} />}>Add item</Button>
      <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>Continue</Button>
      <Button variant="ghost" leftIcon={<Download size={16} />}>Download</Button>
      <Button variant="danger" leftIcon={<Trash2 size={16} />}>Delete</Button>
    </div>
  ),
};

// ── Full Width ────────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Button fullWidth>Full width primary</Button>
      <Button fullWidth variant="secondary">Full width secondary</Button>
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
        gap: 12,
        alignItems: 'center',
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
