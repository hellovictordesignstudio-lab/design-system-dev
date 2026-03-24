import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PinInput } from './PinInput';

const meta: Meta<typeof PinInput> = {
  title: 'Components/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'OTP / PIN input with individual cells. Supports numeric and alphanumeric modes, masking, paste, keyboard navigation, and auto-advance.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'radio', options: ['number', 'alphanumeric'] },
    length: { control: { type: 'range', min: 4, max: 8, step: 1 } },
    mask: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    hasError: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PinInput>;

export const Playground: Story = {
  args: {
    label: 'Verification code',
    helperText: 'Enter the 6-digit code sent to your phone.',
    length: 6,
    size: 'md',
    type: 'number',
    mask: false,
    hasError: false,
    isDisabled: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PinInput label="Small" size="sm" length={6} />
      <PinInput label="Medium" size="md" length={6} />
      <PinInput label="Large" size="lg" length={6} />
    </div>
  ),
};

export const Lengths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PinInput label="4-digit PIN" length={4} helperText="Used for device unlock." />
      <PinInput label="6-digit OTP" length={6} helperText="One-time password with separator." />
      <PinInput label="8-digit code" length={8} helperText="Extended security code." />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PinInput label="Numeric only" type="number" length={6} helperText="Accepts digits 0–9." />
      <PinInput label="Alphanumeric" type="alphanumeric" length={6} helperText="Accepts letters and numbers." />
      <PinInput label="Masked" type="number" length={6} mask helperText="Input is hidden like a password." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PinInput label="Default" length={6} />
      <PinInput label="With helper" length={6} helperText="Check your SMS for the code." />
      <PinInput label="Error" length={6} hasError errorText="Invalid code. Please try again." />
      <PinInput label="Disabled" length={6} isDisabled defaultValue="123456" />
    </div>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: { description: { story: 'Controlled — value managed externally. onComplete fires when all cells are filled.',
  },
  render: () => {
    const [val, setVal] = useState('');
    const [complete, setComplete] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PinInput
          label="Enter OTP"
          length={6}
          value={val}
          onChange={setVal}
          onComplete={(v) => setComplete(true)}
          helperText={complete ? '✓ Code accepted' : 'Waiting for input...'}
          hasError={false}
        />
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Value: <strong>{val || '—'}</strong>
        </p>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parars: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0C0D10', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PinInput label="Verification code" length={6} helperText="Enter the code from your authenticator app." />
      <PinInput label="Error state" length={6} hasError errorText="Code has expired." />
      <PinInput label="Masked" length={6} mask helperText="Hidden input." />
    </div>
  ),
};
