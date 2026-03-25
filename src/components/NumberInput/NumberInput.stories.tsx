import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A numeric field with stepper controls. Supports min and max clamping, precision, prefix and suffix, and standard validation states.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Height and font size.' },
    isDisabled: { control: 'boolean', description: 'Disables interaction.' },
    isReadOnly: { control: 'boolean', description: 'Focusable but not editable.' },
    isRequired: { control: 'boolean', description: 'Marks the field as required.' },
    hasError: { control: 'boolean', description: 'Applies error styling.' },
    noControls: { control: 'boolean', description: 'Hides the stepper buttons.' },
    label: { control: 'text', description: 'Label above the field.' },
    helperText: { control: 'text', description: 'Hint below the field.' },
    errorText: { control: 'text', description: 'Error text; applies error styling.' },
    min: { control: 'number', description: 'Minimum allowed value.' },
    max: { control: 'number', description: 'Maximum allowed value.' },
    step: { control: 'number', description: 'Increment for the stepper and arrow keys.' },
    precision: { control: 'number', description: 'Decimal places for display and parsing.' },
    prefix: { control: 'text', description: 'Content before the value.' },
    suffix: { control: 'text', description: 'Content after the value.' },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 1,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Plain" defaultValue={1} />
      <NumberInput label="With prefix" prefix="$" defaultValue={99} precision={2} />
      <NumberInput label="With suffix" suffix="kg" defaultValue={70} />
      <NumberInput label="No stepper" noControls defaultValue={42} helperText="Type only." />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Small" size="sm" defaultValue={5} />
      <NumberInput label="Medium" size="md" defaultValue={5} />
      <NumberInput label="Large" size="lg" defaultValue={5} />
    </div>
  ),
};

// ── PrefixSuffix ─────────────────────────────────────────────────────────────

export const PrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Price" prefix="$" defaultValue={99} step={0.01} precision={2} helperText="USD" />
      <NumberInput label="Weight" suffix="kg" defaultValue={70} step={0.5} precision={1} />
      <NumberInput label="Percentage" suffix="%" defaultValue={50} min={0} max={100} />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Default" defaultValue={10} />
      <NumberInput label="With helper" defaultValue={10} helperText="Enter a value between 0 and 100." />
      <NumberInput label="Error" hasError errorText="Value exceeds maximum." defaultValue={999} />
      <NumberInput label="Disabled" isDisabled defaultValue={42} />
      <NumberInput label="Read only" isReadOnly defaultValue={7} />
      <NumberInput label="No controls" noControls defaultValue={3} helperText="Type directly." />
    </div>
  ),
};

// ── MinMax ────────────────────────────────────────────────────────────────────

export const MinMax: Story = {
  parameters: {
    docs: { description: { story: 'Stepper buttons disable at the minimum and maximum values.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="1 – 10 (step 1)" defaultValue={1} min={1} max={10} step={1} />
      <NumberInput label="0 – 100 (step 5)" defaultValue={50} min={0} max={100} step={5} />
      <NumberInput label="Decimal (step 0.1)" defaultValue={1.0} min={0} max={5} step={0.1} precision={1} />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Quantity" defaultValue={5} min={0} max={20} />
      <NumberInput label="Price" prefix="$" defaultValue={99} precision={2} />
      <NumberInput label="Error" hasError errorText="Invalid value." defaultValue={0} />
    </div>
  ),
};
