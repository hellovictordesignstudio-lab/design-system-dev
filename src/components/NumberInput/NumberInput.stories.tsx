import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/Inputs/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Numeric input with +/− stepper controls. Supports min/max clamping, precision, prefix/suffix, and all standard input states.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    hasError: { control: 'boolean' },
    noControls: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    min: { control: 'number' },
  max: { control: 'number' },
    step: { control: 'number' },
    precision: { control: 'number' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

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

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Small" size="sm" defaultValue={5} />
      <NumberInput label="Medium" size="md" defaultValue={5} />
      <NumberInput label="Large" size="lg" defaultValue={5} />
    </div>
  ),
};

export const PrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Price" prefix="$" defaultValue={99} step={0.01} precision={2} helperText="USD" />
      <NumberInput label="Weight" suffix="kg" defaultValue={70} step={0.5} precision={1} />
      <NumberInput label="Percentage" suffix="%" defaultValue={50} min={0} max={100} />
    </div>
  ),
};

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

export const MinMax: Story = {
  parameters: {
    docs: { description: { story: 'Stepper buttons disable automatically when reaching min or max.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="1 – 10 (step 1)" defaultValue={1} min={1} max={10} step={1} />
      <NumberInput label="0 – 100 (step 5)" defaultValue={50} min={0} max={100} step={5} />
      <NumberInput label="Decimal (step 0.1)" defaultValue={1.0} min={0} max={5} step={0.1} precision={1} />
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0C0D10', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
      <NumberInput label="Quantity" defaultValue={5} min={0} max={20} />
      <NumberInput label="Price" prefix="$" defaultValue={99} precision={2} />
      <NumberInput label="Error" hasError errorText="Invalid value." defaultValue={0} />
    </div>
  ),
};
