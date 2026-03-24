import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { LangProvider } from '../../theme/LangContext';
import { darkTheme } from '../../theme/theme';

const PRESETS = [
  '#0055FF', '#2952CC', '#7BA4FF',
  '#16A34A', '#D22232', '#F59E0B',
  '#8B5CF6', '#EC4899', '#111827',
  '#ffffff',
];

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A pure-CSS/JS color picker with a saturation/lightness square, hue slider, hex input, and preset swatches. Opens in a portal popover. No external color library required.',
      },
    },
  },
  argTypes: {
    format: { control: 'select', options: ['hex', 'rgb', 'hsl'] },
    size: { control: 'select', options: ['sm', 'md'] },
    showInput: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [color, setColor] = useState('#0055FF');
    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ColorPicker value={color} onChange={setColor} presets={PRESETS} />
        <p style={{ margin: 0, fontSize: '13px', color: '#6B7694' }}>
          Current value: <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{color}</strong>
        </p>
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [color, setColor] = useState('#0055FF');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Output format</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['hex', 'rgb', 'hsl'] as const).map((fmt) => (
            <div key={fmt} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 36, fontSize: 12, fontWeight: 700, color: '#9ba5be', textTransform: 'uppercase' }}>
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
    const [a, setA] = useState('#0055FF');
    const [b, setB] = useState('#0055FF');
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
    const [color, setColor] = useState('#16A34A');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(['hex', 'rgb', 'hsl'] as const).map((fmt) => (
          <div key={fmt} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '36px', fontSize: '12px', fontWeight: 700, color: '#9BA5BE', textTransform: 'uppercase' }}>{fmt}</span>
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
    const [color, setColor] = useState('#8B5CF6');
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
    const [c1, setC1] = useState('#0055FF');
    const [c2, setC2] = useState('#F59E0B');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '80px', fontSize: '12px', color: '#9BA5BE' }}>Default</span>
          <ColorPicker value={c1} onChange={setC1} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '80px', fontSize: '12px', color: '#9BA5BE' }}>No input</span>
          <ColorPicker value={c2} onChange={setC2} showInput={false} presets={PRESETS} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '80px', fontSize: '12px', color: '#9BA5BE' }}>Disabled</span>
          <ColorPicker value="#D22232" onChange={() => {}} isDisabled />
        </div>
      </div>
    );
  },
};

// ── Languages ─────────────────────────────────────────────────────────────────

export const Languages: Story = {
  render: () => {
    const [color, setColor] = useState('#0055FF');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {(['en', 'es', 'fr'] as const).map((lang) => (
          <LangProvider key={lang} defaultLang={lang}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: '32px', fontSize: '12px', fontWeight: 700, color: '#9BA5BE', textTransform: 'uppercase' }}>{lang}</span>
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
    const [color, setColor] = useState('#7BA4FF');
    return (
      <ThemeProvider defaultColorMode="dark">
        <div style={{ padding: '32px', backgroundColor: darkTheme.colors['color-bg-canvas'], borderRadius: '12px' }}>
          <ColorPicker value={color} onChange={setColor} presets={PRESETS} />
        </div>
      </ThemeProvider>
    );
  },
};
