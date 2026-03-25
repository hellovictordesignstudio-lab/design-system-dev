import type { Meta, StoryObj } from '@storybook/react';
import { Folder, FileText } from 'lucide-react';
import { TreeView } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An expandable tree for files, menus, or nested settings. Supports default expanded nodes and custom labels.',
      },
    },
  },
  argTypes: {
    nodes: { control: false, description: 'Tree data: `id`, `label`, optional `children`, optional `isDisabled`.' },
    expandedIds: { control: false, description: 'Controlled set of expanded node ids.' },
    defaultExpandedIds: { control: 'object', description: 'Initially expanded ids when uncontrolled.' },
    onExpandedChange: { control: false, description: 'Called when expanded ids change.' },
    onSelect: { control: false, description: 'Called when a row is activated.' },
    selectedId: { control: 'text', description: 'Highlighted node id for roving focus.' },
    'aria-label': { control: 'text', description: 'Accessible name for the tree.' },
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const nodes = [
  {
    id: 'src',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Folder size={14} /> src
      </span>
    ),
    children: [
      {
        id: 'components',
        label: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Folder size={14} /> components
          </span>
        ),
        children: [
          {
            id: 'Button',
            label: (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FileText size={14} /> Button.tsx
              </span>
            ),
          },
        ],
      },
    ],
  },
];

const shallowNodes = [
  {
    id: 'a',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Folder size={14} /> docs
      </span>
    ),
    children: [{ id: 'a1', label: <span>README.md</span> }],
  },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    nodes,
    defaultExpandedIds: ['src', 'components'],
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Deep tree</p>
        <TreeView nodes={nodes} defaultExpandedIds={['src', 'components']} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Collapsed by default</p>
        <TreeView nodes={nodes} defaultExpandedIds={[]} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Shallow</p>
        <TreeView nodes={shallowNodes} defaultExpandedIds={['a']} />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tree width follows the container; use max-width for sidebars or full width for panels.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ maxWidth: 240, border: '1px solid var(--color-border-default)', borderRadius: 8, padding: 8 }}>
        <TreeView nodes={nodes} defaultExpandedIds={['src']} />
      </div>
      <div style={{ maxWidth: 400, border: '1px solid var(--color-border-default)', borderRadius: 8, padding: 8 }}>
        <TreeView nodes={nodes} defaultExpandedIds={['src', 'components']} />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
        Expand and collapse nodes; keyboard focus order follows the tree structure.
      </p>
      <TreeView nodes={nodes} defaultExpandedIds={['src']} />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{ background: 'var(--color-bg-canvas)', padding: 16, borderRadius: 8, maxWidth: 400, border: '1px solid var(--color-border-default)' }}
    >
      <TreeView nodes={nodes} defaultExpandedIds={['src', 'components']} />
    </div>
  ),
};
