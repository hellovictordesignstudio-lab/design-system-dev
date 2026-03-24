import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Range input with a custom track and thumb. Supports min/max, step, value formatting, and vertical orientation.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    isDisabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    showMinMax: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Volume',
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    showValue: true,
    showMinMax: false,
    isDisabled: false,
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400 }}>
      <Slider label="Horizontal (default)" orientation="horizontal" defaultValue={40} />
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', height: 200, paddingTop: 8 }}>
        <Slider label="Vertical A" orientation="vertical" defaultValue={55} />
        <Slider label="Vertical B" orientation="vertical" defaultValue={30} />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400 }}>
      <Slider label="Small" size="sm" defaultValue={30} />
      <Slider label="Medium" size="md" defaultValue={50} />
      <Slider label="Large" size="lg" defaultValue={70} />
    </div>
  ),
};

// ── WithFormatting ────────────────────────────────────────────────────────────

export const WithFormatting: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400 }}>
      <Slider
        label="Price range"
        defaultValue={250}
        min={0}
        max={1000}
        step={10}
        formatValue={(v) => `$${v}`}
        showMinMax
      />
      <Slider
        label="Opacity"
        defaultValue={75}
        min={0}
        max={100}
        formatValue={(v) => `${v}%`}
        showMinMax
        helperText="Controls element transparency."
      />
      <Slider
        label="Temperature"
        defaultValue={22}
        min={16}
        max={30}
        step={0.5}
        formatValue={(v) => `${v}°C`}
        showMinMax
      />
    </div>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: { description: { story: 'Controlled value — synced with external state.' } },
  },
  render: () => {
    const [val, setVal] = useState(40);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <Slider
          label="Brightness"
          value={val}
          min={0}
          max={100}
          onChange={setVal}
       formatValue={(v) => `${v}%`}
        />
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Current value: <strong>{val}</strong>
        </p>
      </div>
    );
  },
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', height: 280, padding: '20px 0' }}>
      <Slider label="Bass" orientation="vertical" defaultValue={60} />
      <Slider label="Mid" orientation="vertical" defaultValue={40} />
      <Slider label="Treble" orientation="vertical" defaultValue={75} />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400 }}>
      <Slider label="Default" defaultValue={50} />
      <Slider label="Disabled" defaultValue={30} isDisabled helperText="This control is currently disabled." />
      <Slider label="No value display" defaultValue={60} showValue={false} />
      <Slider label="With min/max" defaultValue={50} showMinMax helperText="Drag to adjust." />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0C0D10', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 400 }}>
      <Slider label="Volume" defaultValue={60} />
      <Slider label="Brightness" defaultValue={40} formatValue={(v) => `${v}%`} showMinMax />
      <Slider label="Disabled" defaultValue={25} isDisabled />
    </div>
  ),
};
