import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { LangProvider } from '../../theme/LangContext';
import { darkTheme } from '../../theme/theme';
import { colorPrimitives } from '../../tokens/primitives';

const { blue, green, red, orange, neutral } = colorPrimitives;

/** Preset swatches for stories — values from primitives, not inline hex. */
const PRESETS = [
  blue[500],
  blue[600],
  blue[200],
  green[400],
  red[400],
  orange[400],
  blue[300],
  red[300],
  neutral[900],
  neutral[0],
];

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Selects a color with a saturation and lightness field, hue slider, hex field, and presets. Opens in a portal popover. No third-party color library required.',
      },
    },
  },
  argTypes: {
    format: { control: 'select', options: ['hex', 'rgb', 'hsl'], description: 'String format of `onChange`.' },
    size: { control: 'select', options: ['sm', 'md'], description: 'Trigger and popover scale.' },
    showInput: { control: 'boolean', description: 'Shows the text field for the value.' },
    isDisabled: { control: 'boolean', description: 'Disables opening and editing.' },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [color, setColor] = useState<string>(blue[500]);
    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ColorPicker value={color} onChange={setColor} presets={PRESETS} />
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
          Current value: <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{color}</strong>
        </p>
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [color, setColor] = useState<string>(blue[500]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Output format</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['hex', 'rgb', 'hsl'] as const).map((fmt) => (
            <div key={fmt} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 36, fontSize: 12, fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                {fmt}
              </span>
              <ColorPicker value={color} onChange={setColor} format={fmt} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState<string>(blue[500]);
    const [b, setB] = useState<string>(blue[500]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ColorPicker value={a} onChange={setA} size="sm" presets={PRESETS} />
        <ColorPicker value={b} onChange={setB} size="md" presets={PRESETS} />
      </div>
    );
  },
};

// ── Formats ───────────────────────────────────────────────────────────────────

export const Formats: Story = {
  render: () => {
    const [color, setColor] = useState<string>(green[400]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(['hex', 'rgb', 'hsl'] as const).map((fmt) => (
          <div key={fmt} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '36px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>{fmt}</span>
            <ColorPicker value={color} onChange={setColor} format={fmt} />
          </div>
        ))}
      </div>
    );
  },
};

// ── WithPresets ───────────────────────────────────────────────────────────────

export const WithPresets: Story = {
  render: () => {
    const [color, setColor] = useState<string>(blue[300]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ColorPicker value={color} onChange={setColor} presets={PRESETS} />
        <div style={{
          width: '120px', height: '120px', borderRadius: '16px',
          background: color, transition: 'background 200ms ease',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }} />
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [c1, setC1] = useState<string>(blue[500]);
    const [c2, setC2] = useState<string>(orange[400]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '80px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Default</span>
          <ColorPicker value={c1} onChange={setC1} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '80px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>No input</span>
          <ColorPicker value={c2} onChange={setC2} showInput={false} presets={PRESETS} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '80px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Disabled</span>
          <ColorPicker value={red[400]} onChange={() => {}} isDisabled />
        </div>
      </div>
    );
  },
};

// ── Languages ─────────────────────────────────────────────────────────────────

export const Languages: Story = {
  render: () => {
    const [color, setColor] = useState<string>(blue[500]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {(['en', 'es', 'fr'] as const).map((lang) => (
          <LangProvider key={lang} defaultLang={lang}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: '32px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>{lang}</span>
              <ColorPicker value={color} onChange={setColor} presets={PRESETS} />
            </div>
          </LangProvider>
        ))}
      </div>
    );
  },
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [color, setColor] = useState<string>(blue[200]);
    return (
      <ThemeProvider defaultColorMode="dark">
        <div style={{ padding: '32px', backgroundColor: darkTheme.colors['color-bg-canvas'], borderRadius: '12px' }}>
          <ColorPicker value={color} onChange={setColor} presets={PRESETS} />
        </div>
      </ThemeProvider>
    );
  },
};
