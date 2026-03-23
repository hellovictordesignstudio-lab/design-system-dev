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
          'Breadcrumb shows the current page location within a navigational hierarchy. Supports collapse, icons, and multiple separators.',
      },
    },
  },
  argTypes: {
    separator: { control: 'select', options: ['slash', 'chevron', 'dot'] },
    maxItems: { control: { type: 'number', min: 2 } },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const baseItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Design System', href: '/projects/design-system' },
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

// ── Separators ────────────────────────────────────────────────────────────────

export const Separators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <div style={{ marginBottom: '6px', fontSize: '11px', color: '#9BA5BE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Slash</div>
        <Breadcrumb items={baseItems.slice(0, 4)} separator="slash" />
      </div>
      <div>
        <div style={{ marginBottom: '6px', fontSize: '11px', color: '#9BA5BE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Chevron</div>
        <Breadcrumb items={baseItems.slice(0, 4)} separator="chevron" />
      </div>
      <div>
        <div style={{ marginBottom: '6px', fontSize: '11px', color: '#9BA5BE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Dot</div>
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
        { label: 'Design System', href: '/projects/design-system', icon: <Settings /> },
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

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumb items={baseItems} separator="slash" />
      <Breadcrumb items={baseItems} separator="chevron" />
    </div>
  ),
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
