import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Globe, User, Briefcase, Star, Lock } from 'lucide-react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Select lets users choose one option from a dropdown. Supports search, icons, disabled options, and all TextInput sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isSearchable: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', isDisabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
];

const ROLES = [
  { value: 'admin', label: 'Administrator', icon: <Star size={14} /> },
  { value: 'editor', label: 'Editor', icon: <Briefcase size={14} /> },
  { value: 'viewer', label: 'Viewer', icon: <User size={14} /> },
  { value: 'guest', label: 'Guest', icon: <Lock size={14} />, isDisabled: true },
];

const COUNTRIES = [
  { value: 'us', label: 'United States', icon: <Globe size={14} /> },
  { value: 'uk', label: 'United Kingdom', icon: <Globe size={14} /> },
  { value: 'fr', label: 'France', icon: <Globe size={14} /> },
  { value: 'de', label: 'Germany', icon: <Globe size={14} /> },
  { value: 'jp', label: 'Japan', icon: <Globe size={14} /> },
  { value: 'au', label: 'Australia', icon: <Globe size={14} /> },
  { value: 'ca', label: 'Canada', icon: <Globe size={14} /> },
  { value: 'br', label: 'Brazil', icon: <Globe size={14} /> },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState('');
    return (
      <div style={{ width: '280px' }}>
        <Select {...args} value={v} onChange={setV} options={FRUITS} label="Fruit" />
      </div>
    );
  },
  args: { size: 'md', placeholder: 'Select a fruit' },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('editor');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '280px' }}>
        <Select options={FRUITS} value={a} onChange={setA} label="Empty" placeholder="Select..." />
        <Select options={ROLES} value={b} onChange={setB} label="With icons & pre-selected" />
        <Select
          options={FRUITS}
          value=""
          onChange={() => {}}
          label="Error state"
          hasError
          errorText="This field is required"
          placeholder="Select..."
        />
        <Select
          options={FRUITS}
          value=""
          onChange={() => {}}
          label="Disabled"
          isDisabled
          placeholder="Cannot interact"
        />
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
        <Select options={FRUITS} value={a} onChange={setA} size="sm" label="Small (32px)" />
        <Select options={FRUITS} value={b} onChange={setB} size="md" label="Medium (40px)" />
        <Select options={FRUITS} value={c} onChange={setC} size="lg" label="Large (48px)" />
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [v, setV] = useState('viewer');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
        <Select options={ROLES} value={v} onChange={setV} label="Default (try selecting)" />
        <Select options={ROLES} value="admin" onChange={() => {}} isDisabled label="Disabled" />
        <Select
          options={ROLES}
          value=""
          onChange={() => {}}
          hasError
          errorText="Please select a role"
          label="Has error"
        />
        <Select
          options={ROLES}
          value=""
          onChange={() => {}}
          helperText="Choose the user's access level"
          label="With helper text"
        />
      </div>
    );
  },
};

// ── Searchable ────────────────────────────────────────────────────────────────

export const Searchable: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ width: '280px' }}>
        <Select
          options={COUNTRIES}
          value={v}
          onChange={setV}
          isSearchable
          label="Country (searchable)"
          placeholder="Search countries..."
          helperText="Type to filter the list"
        />
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ width: '280px' }}>
        <Select options={FRUITS} value={v} onChange={setV} label="Select" placeholder="Choose..." />
      </div>
    );
  },
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
