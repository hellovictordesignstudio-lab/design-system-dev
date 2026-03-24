import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Multi-line text input. Supports auto-resize, character count, validation states, and all standard input behaviors.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    hasError: { control: 'boolean' },
    hasSuccess: { control: 'boolean' },
    showCount: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {
  args: {
    label: 'Description',
    placeholder: 'Write something...',
    helperText: 'Maximum 500 characters.',
    size: 'md',
    resize: 'vertical',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Textarea label="Small" size="sm" placeholder="Small textarea..." />
      <Textarea label="Medium" size="md" placeholder="Medium textarea..." />
      <Textarea label="Large" size="lg" placeholder="Large textarea..." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Textarea label="Default" placeholder="Default state..." />
      <Textarea label="With helper" placeholder="With helper text..." helperText="This is a helper message." />
      <Textarea label="Error" hasError errorText="This field is required." defaultValue="Invalid input here" />
      <Textarea label="Success" hasSuccess helperText="Looks great!" defaultValue="Valid content here" />
      <Textarea label="Disabled" isDisabled defaultValue="Cannot edit this" />
      <Textarea label="Read only" isReadOnly defaultValue="Read-only content" />
      <Textarea label="Required" isRequired placeholder="Required field..." />
    </div>
  ),
};

export const WithCharCount: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        showCount
        maxLength={160}
        helperText="Shown on your public profile."
      />
      <Textarea
        label="Short note"
        placeholder="Keep it brief..."
        showCount
        maxLength={80}
      />
    </div>
  ),
};

export const AutoResize: Story = {
  parameters: {
    docs: { description: { story: 'Grows automatically as you type. No manual resize handle.' } },
  },
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Textarea
        label="Auto-resize textarea"
        placeholder="Start typing and watch it grow..."
        autoResize
        helperText="Height adjusts to content automatically."
      />
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0C0D10', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Textarea label="Default" placeholder="Default on dark..." />
      <Textarea label="Error" hasError errorText="Something went wrong." defaultValue="Bad input" />
      <Textarea label="With count" placeholder="Type here..." showCount maxLength={200} />
    </div>
  ),
};
