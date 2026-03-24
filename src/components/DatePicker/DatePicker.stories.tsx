import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'DatePicker lets users select a date from a calendar panel. Supports min/max constraints, error states, and all TextInput sizes. No external date library.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isDisabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          {...args}
          value={date}
          onChange={setDate}
          label={args.label ?? 'Date'}
          placeholder={args.placeholder ?? 'Select a date'}
        />
        {date && (
          <p style={{ marginTop: 8, fontSize: 12, color: '#9BA5BE' }}>
            Selected: {date.toDateString()}
          </p>
        )}
      </div>
    );
  },
  args: { size: 'md' },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState<Date | undefined>();
    const [b, setB] = useState<Date | undefined>();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280 }}>
        <DatePicker value={a} onChange={setA} label="Default (no min/max)" />
        <DatePicker
          value={b}
          onChange={setB}
          label="With min / max"
          minDate={new Date(2026, 0, 1)}
          maxDate={new Date(2026, 11, 31)}
        />
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState<Date | undefined>(undefined);
    const [b, setB] = useState<Date | undefined>(new Date());
    const [c, setC] = useState<Date | undefined>(undefined);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280 }}>
        <DatePicker size="sm" value={a} onChange={setA} label="Small (32px)" />
        <DatePicker size="md" value={b} onChange={setB} label="Medium (40px)" />
        <DatePicker size="lg" value={c} onChange={setC} label="Large (48px)" />
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [v, setV] = useState<Date | undefined>(undefined);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280 }}>
        <DatePicker value={v} onChange={setV} label="Default" />
        <DatePicker
          value={new Date()}
          onChange={() => {}}
          label="Pre-selected (today)"
        />
        <DatePicker
          value={undefined}
          onChange={() => {}}
          label="Disabled"
          isDisabled
        />
        <DatePicker
          value={undefined}
          onChange={() => {}}
          label="Error state"
          hasError
          errorText="Please select a valid date"
        />
        <DatePicker
          value={undefined}
          onChange={() => {}}
          label="With helper text"
          helperText="Choose your appointment date"
        />
      </div>
    );
  },
};

// ── With Min / Max ────────────────────────────────────────────────────────────

export const WithMinMax: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
    const [v, setV] = useState<Date | undefined>(undefined);
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={v}
          onChange={setV}
          label="Booking window (±5/+10 days)"
          helperText="Only dates within the booking window are selectable"
          minDate={minDate}
          maxDate={maxDate}
        />
        {v && (
          <p style={{ marginTop: 8, fontSize: 12, color: '#9BA5BE' }}>
            Selected: {v.toDateString()}
          </p>
        )}
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [v, setV] = useState<Date | undefined>(new Date());
    return (
      <div style={{ width: 280 }}>
        <DatePicker value={v} onChange={setV} label="Select date" />
      </div>
    );
  },
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
