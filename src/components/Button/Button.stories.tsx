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
          'The Button component is used to trigger actions or navigate. It supports multiple variants, sizes, loading states, and icon slots.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner and disables interaction',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the button to fill its container',
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
