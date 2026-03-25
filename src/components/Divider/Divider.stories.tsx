import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Separates sections of content. Supports horizontal and vertical orientation, several line styles, and an optional label.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'], description: 'Line direction.' },
    labelPosition: { control: 'radio', options: ['left', 'center', 'right'], description: 'Label alignment on the line.' },
    variant: { control: 'radio', options: ['solid', 'dashed', 'dotted'], description: 'Line style.' },
    spacing: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Vertical margin around the line.' },
    label: { control: 'text', description: 'Optional inline label.' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    spacing: 'md',
    label: 'Section title',
    labelPosition: 'center',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Content above</p>
      <Divider {...args} />
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Content below</p>
    </div>
  ),
};

// ── Orientations ──────────────────────────────────────────────────────────────

export const Orientations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ margin: '0 0 0', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Horizontal</p>
        <Divider orientation="horizontal" />
        <p style={{ margin: '0', fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Content after</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', height: '60px', gap: '0' }}>
        <span style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Left</span>
        <Divider orientation="vertical" />
        <span style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Middle</span>
        <Divider orientation="vertical" />
        <span style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Right</span>
      </div>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column' }}>
      {(['solid', 'dashed', 'dotted'] as const).map((variant) => (
        <div key={variant}>
          <p style={{ margin: '0', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {variant}
          </p>
          <Divider variant={variant} />
        </div>
      ))}
    </div>
  ),
};

// ── WithLabel ─────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: '480px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Divider label="Left aligned" labelPosition="left" />
      <Divider label="Centered label" labelPosition="center" />
      <Divider label="Right aligned" labelPosition="right" />
      <Divider label="Dashed + label" variant="dashed" />
      <Divider label="Dotted + label" variant="dotted" />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `spacing` for vertical rhythm; width follows the parent.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <Divider spacing="sm" />
      <Divider spacing="md" />
      <Divider spacing="lg" />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Divider />
      <Divider label="With label" labelPosition="center" />
      <Divider variant="dashed" />
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
          width: '480px',
        }}
      >
        <p style={{ margin: '0 0 0', fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Section above</p>
        <Divider label="Dark mode" />
        <p style={{ margin: '0', fontSize: '14px', color: 'var(--color-text-tertiary)' }}>Section below</p>
        <Divider variant="dashed" spacing="lg" />
        <Divider label="Dotted" variant="dotted" labelPosition="left" />
      </div>
    </ThemeProvider>
  ),
};
