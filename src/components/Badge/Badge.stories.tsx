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

export const Playground: Story = {
  args: { children: 'Badge', variant: 'primary' },
};

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

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default" dot>Inactive</Badge>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="error" dot>Critical</Badge>
      <Badge variant="warning" dot>Degraded</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
    </div>
  ),
};
