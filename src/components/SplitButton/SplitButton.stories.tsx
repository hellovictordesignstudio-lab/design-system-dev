import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Download, Mail, Share2 } from 'lucide-react';
import { SplitButton } from './SplitButton';

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary action plus a chevron menu for secondary actions. Shares sizing and variants with Button.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    primaryLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

const items = [
  { id: 'email', label: 'Send by email', icon: <Mail size={14} /> },
  { id: 'share', label: 'Share link', icon: <Share2 size={14} /> },
  { id: 'export', label: 'Export', icon: <Download size={14} /> },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    primaryLabel: 'Publish',
    variant: 'primary',
    size: 'md',
    menuItems: items,
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <SplitButton primaryLabel="Primary" variant="primary" menuItems={items} onMenuItemSelect={() => {}} />
      <SplitButton primaryLabel="Secondary" variant="secondary" menuItems={items} onMenuItemSelect={() => {}} />
      <SplitButton primaryLabel="Ghost" variant="ghost" menuItems={items} onMenuItemSelect={() => {}} />
      <SplitButton primaryLabel="Danger" variant="danger" menuItems={items} onMenuItemSelect={() => {}} />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <SplitButton size="sm" primaryLabel="Small" variant="primary" menuItems={items} onMenuItemSelect={() => {}} />
      <SplitButton size="md" primaryLabel="Medium" variant="primary" menuItems={items} onMenuItemSelect={() => {}} />
      <SplitButton size="lg" primaryLabel="Large" variant="primary" menuItems={items} onMenuItemSelect={() => {}} />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [last, setLast] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <SplitButton
            primaryLabel="Save"
            variant="secondary"
            onClick={() => setLast('primary')}
            menuItems={[
              { id: 'draft', label: 'Save draft' },
              { id: 'template', label: 'Save as template' },
            ]}
            onMenuItemSelect={(id) => setLast(`menu:${id}`)}
          />
          {last && <span style={{ fontSize: 13, color: '#6b7694' }}>Last: {last}</span>}
        </div>
        <SplitButton
          primaryLabel="Disabled"
          variant="primary"
          disabled
          menuItems={items}
          onMenuItemSelect={() => {}}
        />
      </div>
    );
  },
};

// ── WithAction (alias) ────────────────────────────────────────────────────────

export const WithAction: Story = {
  render: () => {
    const [last, setLast] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SplitButton
          primaryLabel="Save"
          variant="secondary"
          onClick={() => setLast('primary')}
          menuItems={[
            { id: 'draft', label: 'Save draft' },
            { id: 'template', label: 'Save as template' },
          ]}
          onMenuItemSelect={(id) => setLast(`menu:${id}`)}
        />
        {last && <span style={{ fontSize: 13, color: '#6b7694' }}>Last: {last}</span>}
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0c0d10', padding: 24, borderRadius: 12 }}>
      <SplitButton primaryLabel="Publish" variant="primary" menuItems={items} onMenuItemSelect={() => {}} />
    </div>
  ),
};
