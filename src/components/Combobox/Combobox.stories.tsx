import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from './Combobox';

const options = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A combobox filters options as you type and selects a single value from the list.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Field height and font size.' },
    options: { control: false, description: 'Array of options with `value` and `label` (set in code).' },
    value: { control: 'text', description: 'Selected value.' },
    allowFreeText: { control: 'boolean', description: 'Allows values not listed in options.' },
    placeholder: { control: 'text', description: 'Placeholder when empty.' },
    label: { control: 'text', description: 'Label above the field.' },
    helperText: { control: 'text', description: 'Hint below the field.' },
    errorText: { control: 'text', description: 'Error text; applies error styling.' },
    hasError: { control: 'boolean', description: 'Applies error styling.' },
    isDisabled: { control: 'boolean', description: 'Disables the field.' },
    isRequired: { control: 'boolean', description: 'Marks the field as required.' },
    emptyText: { control: 'text', description: 'Message when the filter has no matches.' },
    onChange: { control: false, description: 'Called when the selection changes.' },
    onInputChange: { control: false, description: 'Called when the typed text changes.' },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [v, setV] = useState<string | undefined>();
    return (
      <div style={{ maxWidth: 360 }}>
        <Combobox
          label="Language"
          options={options}
          value={v}
          onChange={setV}
          placeholder="Search language…"
        />
        <p style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text-tertiary)' }}>Value: {v ?? '—'}</p>
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState<string | undefined>();
    const [b, setB] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Select from list</p>
          <Combobox label="Language" options={options} value={a} onChange={setA} placeholder="Pick one…" />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Free text (tags)</p>
          <Combobox
            label="Tags"
            options={[
              { value: 'design', label: 'design' },
              { value: 'dev', label: 'development' },
            ]}
            value={b}
            allowFreeText
            onChange={setB}
            placeholder="Type anything…"
          />
        </div>
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Field width is controlled by the container; match `TextInput` widths in forms.',
      },
    },
  },
  render: () => {
    const [v, setV] = useState<string | undefined>();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ maxWidth: 240 }}>
          <Combobox label="Narrow" options={options} value={v} onChange={setV} placeholder="…" />
        </div>
        <div style={{ maxWidth: 400 }}>
          <Combobox label="Wide" options={options} value={v} onChange={setV} placeholder="Search…" />
        </div>
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [v1, setV1] = useState<string | undefined>('en');
    const [v2, setV2] = useState<string | undefined>();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
        <Combobox label="With value" options={options} value={v1} onChange={setV1} placeholder="…" />
        <Combobox
          label="Disabled"
          options={options}
          value={v2}
          onChange={setV2}
          placeholder="…"
          isDisabled
        />
      </div>
    );
  },
};

// ── FreeText ──────────────────────────────────────────────────────────────────

export const FreeText: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={{ maxWidth: 360 }}>
        <Combobox
          label="Tags"
          options={[
            { value: 'design', label: 'design' },
            { value: 'dev', label: 'development' },
          ]}
          value={v}
          allowFreeText
          onChange={setV}
          placeholder="Type anything…"
        />
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => {
    const [v, setV] = useState<string | undefined>();
    return (
      <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, borderRadius: 12, maxWidth: 360 }}>
        <Combobox label="Language" options={options} value={v} onChange={setV} placeholder="Search…" />
      </div>
    );
  },
};
