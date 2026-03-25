import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox selects or clears one option. Supports an indeterminate state (for nested lists), sizes, validation, and helper text.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Control and label size.' },
    checked: { control: 'boolean', description: 'Selected state.' },
    indeterminate: { control: 'boolean', description: 'Indeterminate state for nested lists.' },
    isDisabled: { control: 'boolean', description: 'Disables interaction.' },
    isRequired: { control: 'boolean', description: 'Marks the field as required.' },
    hasError: { control: 'boolean', description: 'Applies error styling.' },
    label: { control: 'text', description: 'Label beside the control.' },
    helperText: { control: 'text', description: 'Hint below the control.' },
    errorText: { control: 'text', description: 'Error text; applies error styling.' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox label="Unchecked" checked={a} onChange={setA} />
        <Checkbox label="Checked" checked={b} onChange={setB} />
        <Checkbox label="Indeterminate" checked={false} indeterminate onChange={() => {}} />
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox size="sm" label="Small (16px)" checked onChange={() => {}} />
      <Checkbox size="md" label="Medium (18px)" checked onChange={() => {}} />
      <Checkbox size="lg" label="Large (20px)" checked onChange={() => {}} />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Default" checked={false} onChange={() => {}} />
      <Checkbox label="Checked" checked onChange={() => {}} />
      <Checkbox label="With helper text" checked={false} helperText="Optional extra info" onChange={() => {}} />
      <Checkbox label="Disabled unchecked" isDisabled onChange={() => {}} />
      <Checkbox label="Disabled checked" checked isDisabled onChange={() => {}} />
      <Checkbox
        label="Error state"
        checked={false}
        hasError
        errorText="This field is required"
        onChange={() => {}}
      />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
      <Checkbox label="Checked" checked onChange={() => {}} />
      <Checkbox label="Indeterminate" checked={false} indeterminate onChange={() => {}} />
      <Checkbox label="Disabled" checked isDisabled onChange={() => {}} />
    </div>
  ),
  parameters: { docs: { description: { story: 'Choose Dark in the toolbar color mode control to preview this story.' } } },
};
