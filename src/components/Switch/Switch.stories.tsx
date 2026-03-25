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
        component:
          'A switch turns a setting on or off. Supports sizes, optional labels on either side, and a disabled state.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Track and thumb size.' },
    labelPosition: { control: 'select', options: ['left', 'right'], description: 'Label side relative to the track.' },
    checked: { control: 'boolean', description: 'On or off state.' },
    isDisabled: { control: 'boolean', description: 'Disables interaction.' },
    label: { control: 'text', description: 'Label text.' },
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

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch checked label="Label on the right" labelPosition="right" onChange={() => {}} />
      <Switch checked label="Label on the left" labelPosition="left" onChange={() => {}} />
    </div>
  ),
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
  parameters: { docs: { description: { story: 'Choose Dark in the toolbar color mode control to preview this story.' } } },
};
