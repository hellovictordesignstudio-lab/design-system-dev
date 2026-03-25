import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Home, Folder, FileText, Settings } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shows the current location in a hierarchy. Supports collapsing long paths, icons, and multiple separator styles.',
      },
    },
  },
  argTypes: {
    separator: { control: 'select', options: ['slash', 'chevron', 'dot'], description: 'Separator between items.' },
    maxItems: { control: { type: 'number', min: 2 }, description: 'When set, collapses middle items with an ellipsis.' },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const baseItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'VDS Design System', href: '/projects/vds-design-system' },
  { label: 'Components', href: '/projects/design-system/components' },
  { label: 'Breadcrumb', isCurrent: true },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    items: baseItems,
    separator: 'slash',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <div style={{ marginBottom: '6px', fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Slash</div>
        <Breadcrumb items={baseItems.slice(0, 4)} separator="slash" />
      </div>
      <div>
        <div style={{ marginBottom: '6px', fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Chevron</div>
        <Breadcrumb items={baseItems.slice(0, 4)} separator="chevron" />
      </div>
      <div>
        <div style={{ marginBottom: '6px', fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Dot</div>
        <Breadcrumb items={baseItems.slice(0, 4)} separator="dot" />
      </div>
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb
      separator="chevron"
      items={[
        { label: 'Home', href: '/', icon: <Home /> },
        { label: 'Projects', href: '/projects', icon: <Folder /> },
        { label: 'VDS Design System', href: '/projects/vds-design-system', icon: <Settings /> },
        { label: 'Breadcrumb', isCurrent: true, icon: <FileText /> },
      ]}
    />
  ),
};

// ── Collapsed ─────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumb items={baseItems} maxItems={3} separator="chevron" />
      <Breadcrumb items={baseItems} maxItems={2} separator="slash" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When maxItems is set and items exceed it, middle items collapse into "...". Click to expand.',
      },
    },
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb wraps; constrain width to see how items flow on small screens.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ maxWidth: 360 }}>
        <Breadcrumb items={baseItems.slice(0, 4)} separator="chevron" />
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Breadcrumb items={baseItems.slice(0, 4)} separator="chevron" />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Default trail</p>
        <Breadcrumb items={baseItems.slice(0, 3)} separator="slash" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Collapsed (maxItems)</p>
        <Breadcrumb items={baseItems} maxItems={3} separator="chevron" />
      </div>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        background: 'var(--color-bg-canvas)',
        padding: 24,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Breadcrumb items={baseItems} separator="slash" />
      <Breadcrumb items={baseItems} separator="chevron" />
    </div>
  ),
  parameters: { backgrounds: { default: 'dark' } },
};
