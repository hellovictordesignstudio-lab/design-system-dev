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
        component: 'Autocomplete combobox: filter options by typing or pick from the list.',
      },
    },
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
        <p style={{ marginTop: 12, fontSize: 13, color: '#6b7694' }}>Value: {v ?? '—'}</p>
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
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Select from list</p>
          <Combobox label="Language" options={options} value={a} onChange={setA} placeholder="Pick one…" />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Free text (tags)</p>
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
      <div data-theme="dark" style={{ background: '#0c0d10', padding: 24, borderRadius: 12, maxWidth: 360 }}>
        <Combobox label="Language" options={options} value={v} onChange={setV} placeholder="Search…" />
      </div>
    );
  },
};
