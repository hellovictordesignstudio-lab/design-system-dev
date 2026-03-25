import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A star rating control. Supports interactive and read-only modes, full- and half-star steps, and multiple sizes.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 }, description: 'Current rating value.' },
    max: { control: { type: 'number', min: 1, max: 10 }, description: 'Number of stars.' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Icon size.' },
    precision: { control: 'radio', options: ['full', 'half'], description: 'Whole stars or half steps.' },
    isReadOnly: { control: 'boolean', description: 'Display-only (no clicks).' },
    showValue: { control: 'boolean', description: 'Shows the numeric value next to stars.' },
    label: { control: 'text', description: 'Accessible name for the control.' },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    value: 3.5,
    size: 'md',
    precision: 'half',
    showValue: true,
  },
  render: (args) => {
    const [val, setVal] = useState(args.value);
    return <Rating {...args} value={val} onChange={setVal} />;
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Full stars</p>
        <Rating value={4} precision="full" isReadOnly showValue />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Half stars</p>
        <Rating value={3.5} precision="half" isReadOnly showValue />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', width: '24px' }}>{size}</span>
          <Rating value={4} size={size} isReadOnly />
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [v, setV] = useState(2.5);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Interactive</p>
          <Rating value={v} onChange={setV} precision="half" showValue />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Read-only</p>
          <Rating value={4} isReadOnly showValue />
        </div>
      </div>
    );
  },
};

// ── HalfPrecision ─────────────────────────────────────────────────────────────

export const HalfPrecision: Story = {
  render: () => {
    const [val, setVal] = useState(3.5);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            Interactive — click or hover on the left/right half of each star
          </p>
          <Rating value={val} onChange={setVal} precision="half" showValue size="lg" />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            Read-only examples
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((v) => (
              <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Rating value={v} precision="half" isReadOnly showValue />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ── ReadOnly ──────────────────────────────────────────────────────────────────

export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[1, 2, 3, 4, 5].map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Rating value={v} isReadOnly showValue />
          <span style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][v - 1]}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ── WithLabel ─────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: () => {
    const [val, setVal] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Rating
          label="Rate your experience"
          value={val}
          onChange={setVal}
          precision="half"
          showValue
          size="lg"
        />
        <Rating
          label="Product quality"
          value={4.5}
          isReadOnly
          precision="half"
          showValue
        />
        <Rating
          label="Delivery speed"
          value={3}
          isReadOnly
          showValue
          size="sm"
        />
      </div>
    );
  },
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [val, setVal] = useState(3);
    return (
      <ThemeProvider defaultColorMode="dark">
        <div
          style={{
            padding: '32px',
            backgroundColor: darkTheme.colors['color-bg-canvas'],
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Rating
            label="Rate your experience"
            value={val}
            onChange={setVal}
            precision="half"
            showValue
            size="lg"
          />
          <Rating label="Read-only" value={4.5} isReadOnly precision="half" showValue />
          <Rating value={2} isReadOnly size="sm" showValue />
        </div>
      </ThemeProvider>
    );
  },
};
