import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Selects a time with hour and minute fields. Values are minutes since midnight (0–1439). Supports 12- or 24-hour display and validation states.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Matches **TextInput** sizes.' },
    use12Hour: { control: 'boolean', description: '12-hour clock with AM or PM.' },
    minuteStep: { control: 'select', options: [1, 5, 10, 15, 30], description: 'Minute dropdown step.' },
    isDisabled: { control: 'boolean', description: 'Disables both fields.' },
    hasError: { control: 'boolean', description: 'Applies error styling.' },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

function formatLabel(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [v, setV] = useState(14 * 60 + 30);
    return (
      <div style={{ maxWidth: 420 }}>
        <TimePicker label="Time" value={v} onChange={setV} minuteStep={5} />
        <p style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text-tertiary)' }}>{formatLabel(v)}</p>
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState(10 * 60);
    const [b, setB] = useState(13 * 60);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 420 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>24-hour</p>
          <TimePicker label="Start" value={a} onChange={setA} minuteStep={15} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>12-hour</p>
          <TimePicker label="Appointment" value={b} onChange={setB} use12Hour minuteStep={15} />
        </div>
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [v, setV] = useState(12 * 60);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}>
        <TimePicker label="Small" size="sm" value={v} onChange={setV} minuteStep={5} />
        <TimePicker label="Medium" size="md" value={v} onChange={setV} minuteStep={5} />
        <TimePicker label="Large" size="lg" value={v} onChange={setV} minuteStep={5} />
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [v, setV] = useState(9 * 60);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}>
        <TimePicker label="Default" value={v} onChange={setV} minuteStep={5} helperText="Pick a slot." />
        <TimePicker
          label="Error"
          value={v}
          onChange={setV}
          hasError
          errorText="Invalid time for this date."
          minuteStep={5}
        />
        <TimePicker label="Disabled" value={v} onChange={setV} isDisabled minuteStep={5} />
      </div>
    );
  },
};

// ── Hour12 ────────────────────────────────────────────────────────────────────

export const Hour12: Story = {
  render: () => {
    const [v, setV] = useState(13 * 60);
    return (
      <div style={{ maxWidth: 420 }}>
        <TimePicker label="Appointment" value={v} onChange={setV} use12Hour minuteStep={15} />
        <p style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text-tertiary)' }}>{formatLabel(v)}</p>
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => {
    const [v, setV] = useState(15 * 60);
    return (
      <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, borderRadius: 12, maxWidth: 420 }}>
        <TimePicker label="Time" value={v} onChange={setV} minuteStep={5} />
      </div>
    );
  },
};
