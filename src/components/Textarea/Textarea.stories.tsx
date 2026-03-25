import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text field. Supports auto-resize, character count, validation states, and standard input behaviors.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Height and font size.' },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'CSS resize behavior.',
    },
    isDisabled: { control: 'boolean', description: 'Disables interaction.' },
    isReadOnly: { control: 'boolean', description: 'Focusable but not editable.' },
    isRequired: { control: 'boolean', description: 'Marks the field as required.' },
    hasError: { control: 'boolean', description: 'Applies error styling.' },
    hasSuccess: { control: 'boolean', description: 'Applies success styling.' },
    showCount: { control: 'boolean', description: 'Shows character count.' },
    autoResize: { control: 'boolean', description: 'Grows height with content.' },
    label: { control: 'text', description: 'Label above the field.' },
    helperText: { control: 'text', description: 'Hint below the field.' },
    errorText: { control: 'text', description: 'Error text; applies error styling.' },
    placeholder: { control: 'text', description: 'Placeholder when empty.' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Description',
    placeholder: 'Write something...',
    helperText: 'Maximum 500 characters.',
    size: 'md',
    resize: 'vertical',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Textarea label="Resize: vertical (default)" resize="vertical" placeholder="Drag corner vertically…" />
      <Textarea label="Resize: none" resize="none" placeholder="Fixed dimensions…" />
      <Textarea label="Resize: both" resize="both" placeholder="Resize both axes…" />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Textarea label="Small" size="sm" placeholder="Small textarea..." />
      <Textarea label="Medium" size="md" placeholder="Medium textarea..." />
      <Textarea label="Large" size="lg" placeholder="Large textarea..." />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

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

// ── WithCharCount ─────────────────────────────────────────────────────────────

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

// ── AutoResize ────────────────────────────────────────────────────────────────

export const AutoResize: Story = {
  parameters: {
    docs: { description: { story: 'Height grows with the content. There is no resize handle.' } },
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

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <Textarea label="Default" placeholder="Default on dark..." />
      <Textarea label="Error" hasError errorText="Something went wrong." defaultValue="Bad input" />
      <Textarea label="With count" placeholder="Type here..." showCount maxLength={200} />
    </div>
  ),
};
