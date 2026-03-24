import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';
import { Grid, List, LayoutGrid, Sun, Moon, Monitor, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A set of mutually exclusive options rendered as a pill group. Ideal for switching views, modes, or filters.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Playground: Story = {
  args: {
    size: 'md',
    fullWidth: false,
    isDisabled: false,
    defaultValue: 'grid',
    options: [
      { value: 'grid', label: 'Grid' },
      { value: 'list', label: 'List' },
      { value: 'compact', label: 'Compact' },
    ],
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Text only</p>
        <SegmentedControl
          defaultValue="a"
          aria-label="View"
          options={[
            { value: 'a', label: 'List' },
            { value: 'b', label: 'Board' },
          ]}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>With icons</p>
        <SegmentedControl
          defaultValue="left"
          aria-label="Align"
          options={[
            { value: 'left', label: 'Left', icon: <AlignLeft size={14} /> },
            { value: 'center', label: 'Center', icon: <AlignCenter size={14} /> },
            { value: 'right', label: 'Right', icon: <AlignRight size={14} /> },
          ]}
        />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', width: 28, color: 'var(--color-text-secondary)', fontFamily: 'Nunito Sans, sans-serif' }}>
            {size}
          </span>
          <SegmentedControl
            size={size}
            defaultValue="a"
            options={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
              { value: 'c', label: 'Option C' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <SegmentedControl
        defaultValue="grid"
        options={[
          { value: 'grid', label: 'Grid', icon: <Grid /> },
          { value: 'list', label: 'List', icon: <List /> },
          { value: 'compact', label: 'Compact', icon: <LayoutGrid /> },
        ]}
      />

      <SegmentedControl
        defaultValue="system"
        options={[
          { value: 'light', label: 'Light', icon: <Sun /> },
          { value: 'dark', label: 'Dark', icon: <Moon /> },
          { value: 'system', label: 'System', icon: <Monitor /> },
        ]}
      />

      {/* Icon only */}
      <SegmentedControl
        defaultValue="left"
        aria-label="Text alignment"
        options={[
          { value: 'left', label: <AlignLeft /> },
          { value: 'center', label: <AlignCenter /> },
          { value: 'right', label: <AlignRight /> },
        ]}
      />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <SegmentedControl
        fullWidth
        defaultValue="monthly"
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'annual', label: 'Annual' },
        ]}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <SegmentedControl
        defaultValue="a"
        options={[
          { value: 'a', label: 'Active' },
          { value: 'b', label: 'Default' },
          { value: 'c', label: 'Default' },
        ]}
      />
      <SegmentedControl
        defaultValue="a"
        isDisabled
        options={[
          { value: 'a', label: 'Disabled' },
          { value: 'b', label: 'Group' },
          { value: 'c', label: 'All' },
        ]}
      />
      <SegmentedControl
        defaultValue="a"
        options={[
          { value: 'a', label: 'Available' },
          { value: 'b', label: 'Available' },
          { value: 'c', label: 'Disabled item', isDisabled: true },
        ]}
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('week');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SegmentedControl
          value={val}
          onChange={setVal}
          options={[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
        />
        <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Selected: <strong>{val}</strong>
        </p>
      </div>
    );
  },
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0C0D10', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <SegmentedControl
        defaultValue="grid"
        options={[
          { value: 'grid', label: 'Grid', icon: <Grid /> },
          { value: 'list', label: 'List', icon: <List /> },
          { value: 'compact', label: 'Compact', icon: <LayoutGrid /> },
        ]}
      />
      <SegmentedControl
        defaultValue="monthly"
        fullWidth
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'annual', label: 'Annual' },
        ]}
      />
    </div>
  ),
};
