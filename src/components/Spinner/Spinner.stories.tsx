import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  args: { size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};
