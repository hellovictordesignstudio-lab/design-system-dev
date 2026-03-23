import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Switch toggles a boolean state on/off. Supports sizes, labels on either side, and disabled state.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    checked: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Switch {...args} checked={checked} onChange={setChecked} label={args.label ?? 'Enable feature'} />;
  },
  args: { size: 'md', labelPosition: 'right' },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch size="sm" checked label="Small (28×16)" onChange={() => {}} />
      <Switch size="md" checked label="Medium (36×20)" onChange={() => {}} />
      <Switch size="lg" checked label="Large (44×24)" onChange={() => {}} />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch checked={false} label="Off" onChange={() => {}} />
      <Switch checked label="On" onChange={() => {}} />
      <Switch checked={false} isDisabled label="Disabled off" onChange={() => {}} />
      <Switch checked isDisabled label="Disabled on" onChange={() => {}} />
    </div>
  ),
};

// ── With Labels ───────────────────────────────────────────────────────────────

export const WithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch checked label="Label on right (default)" labelPosition="right" onChange={() => {}} />
      <Switch checked label="Label on left" labelPosition="left" onChange={() => {}} />
      <Switch checked onChange={() => {}} />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch checked={false} label="Off state" onChange={() => {}} />
      <Switch checked label="On state" onChange={() => {}} />
      <Switch checked isDisabled label="Disabled" onChange={() => {}} />
    </div>
  ),
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
