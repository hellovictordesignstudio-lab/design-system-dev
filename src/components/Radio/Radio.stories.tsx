import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A radio button selects exactly one option in a group. Use **RadioGroup** to associate related radios.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Control and label size.' },
    isDisabled: { control: 'boolean', description: 'Disables interaction.' },
    hasError: { control: 'boolean', description: 'Applies error styling.' },
    label: { control: 'text', description: 'Label beside the control.' },
    helperText: { control: 'text', description: 'Hint below the group.' },
    errorText: { control: 'text', description: 'Error text; applies error styling.' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState('');
    return (
      <Radio
        {...args}
        value="option"
        checked={v === 'option'}
        onChange={setV}
        label={args.label ?? 'Option'}
      />
    );
  },
  args: { size: 'md' },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [v, setV] = useState('b');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Radio value="a" checked={v === 'a'} onChange={setV} name="demo" label="Unchecked option" />
        <Radio value="b" checked={v === 'b'} onChange={setV} name="demo" label="Checked option" />
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio size="sm" value="sm" checked name="sizes" label="Small (16px)" onChange={() => {}} />
      <Radio size="md" value="md" checked name="sizes" label="Medium (18px)" onChange={() => {}} />
      <Radio size="lg" value="lg" checked name="sizes" label="Large (20px)" onChange={() => {}} />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio value="a" checked={false} name="s" label="Default" onChange={() => {}} />
      <Radio value="b" checked name="s" label="Checked" onChange={() => {}} />
      <Radio value="c" checked={false} isDisabled name="s" label="Disabled" onChange={() => {}} />
      <Radio value="d" checked isDisabled name="s" label="Disabled checked" onChange={() => {}} />
      <Radio
        value="e"
        checked={false}
        hasError
        errorText="Please select an option"
        name="s"
        label="Error state"
        onChange={() => {}}
      />
    </div>
  ),
};

// ── RadioGroup ────────────────────────────────────────────────────────────────

export const RadioGroupStory: Story = {
  name: 'RadioGroup',
  render: () => {
    const [plan, setPlan] = useState('monthly');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Billing period
          </div>
          <RadioGroup name="plan" value={plan} onChange={setPlan}>
            <Radio value="monthly" label="Monthly" helperText="Billed every month" />
            <Radio value="yearly" label="Yearly" helperText="Save 20% vs monthly" />
            <Radio value="lifetime" label="Lifetime" helperText="One-time payment" />
          </RadioGroup>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Selected: {plan}</div>
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [v, setV] = useState('a');
    return (
      <RadioGroup name="dark" value={v} onChange={setV}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" isDisabled />
      </RadioGroup>
    );
  },
  parameters: { docs: { description: { story: 'Choose Dark in the toolbar color mode control to preview this story.' } } },
};
