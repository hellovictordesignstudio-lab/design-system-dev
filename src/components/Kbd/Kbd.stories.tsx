import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, Shortcut } from './Kbd';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Keyboard key and shortcut display components. Use `Kbd` for a single key and `Shortcut` for key combinations.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: '⌘',
    size: 'md',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Single keys (Kbd)</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Kbd>Enter</Kbd>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Shortcuts (Shortcut)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Shortcut keys={['⌘', 'K']} />
          <Shortcut keys={['Ctrl', 'Shift', 'P']} />
        </div>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#9BA5BE', width: '28px' }}>{size}</span>
          <Kbd size={size}>⌘</Kbd>
          <Kbd size={size}>K</Kbd>
          <Kbd size={size}>Shift</Kbd>
          <Kbd size={size}>Enter</Kbd>
          <Kbd size={size}>Backspace</Kbd>
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Keys are presentational; pair with your app’s actual keyboard handlers.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd size="md">Esc</Kbd>
      <span style={{ fontSize: 13, color: '#6b7694' }}>Close</span>
      <Kbd size="md">?</Kbd>
      <span style={{ fontSize: 13, color: '#6b7694' }}>Help</span>
    </div>
  ),
};

// ── Combinations ──────────────────────────────────────────────────────────────

export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {[
        { keys: ['⌘', 'K'], label: 'Open command palette' },
        { keys: ['⌘', 'Shift', 'P'], label: 'Command prompt' },
        { keys: ['Ctrl', 'C'], label: 'Copy' },
        { keys: ['Alt', 'F4'], label: 'Close window' },
        { keys: ['⌘', 'Z'], label: 'Undo' },
        { keys: ['⌘', 'Shift', 'Z'], label: 'Redo' },
      ].map(({ keys, label }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shortcut keys={keys} />
          <span style={{ fontSize: '13px', color: '#6B7694' }}>{label}</span>
        </div>
      ))}

      <div style={{ marginTop: '8px' }}>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600, color: '#9BA5BE' }}>
          Separator: "then"
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shortcut keys={['G', 'I']} separator="then" />
          <span style={{ fontSize: '13px', color: '#6B7694' }}>Go to Issues</span>
        </div>
      </div>
    </div>
  ),
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div
        style={{
          padding: '32px',
          backgroundColor: darkTheme.colors['color-bg-canvas'],
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Kbd size="sm">Esc</Kbd>
          <Kbd size="md">⌘</Kbd>
          <Kbd size="lg">Enter</Kbd>
        </div>
        <Shortcut keys={['⌘', 'Shift', 'P']} />
        <Shortcut keys={['G', 'I']} separator="then" size="lg" />
      </div>
    </ThemeProvider>
  ),
};
