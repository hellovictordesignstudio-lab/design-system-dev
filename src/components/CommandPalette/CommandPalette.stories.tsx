import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Search, FileText, Settings, User, Bell, LogOut,
  Plus, Trash2, Download, Upload, Star, Home,
  BarChart2, HelpCircle, Moon, Zap,
} from 'lucide-react';
import { CommandPalette, useCommandPalette } from './CommandPalette';
import type { CommandGroup } from './CommandPalette';
import { Button } from '../Button';

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'CommandPalette is a keyboard-driven search + command launcher. Open with a button or hook into a global keyboard shortcut. Supports groups, icons, shortcuts, fuzzy search, and full keyboard navigation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

// ── Sample groups ─────────────────────────────────────────────────────────────

const BASIC_GROUPS: CommandGroup[] = [
  {
    items: [
      { id: 'home', label: 'Go to Home', icon: <Home size={16} />, onSelect: () => alert('Home') },
      { id: 'dashboard', label: 'Go to Dashboard', icon: <BarChart2 size={16} />, onSelect: () => alert('Dashboard') },
      { id: 'settings', label: 'Open Settings', icon: <Settings size={16} />, onSelect: () => alert('Settings') },
    ],
  },
];

const FULL_GROUPS: CommandGroup[] = [
  {
    label: 'Navigation',
    items: [
      { id: 'home', label: 'Go to Home', icon: <Home size={16} />, onSelect: () => {}, keywords: ['start', 'main'] },
      { id: 'dash', label: 'Dashboard', icon: <BarChart2 size={16} />, onSelect: () => {}, keywords: ['analytics', 'stats'] },
      { id: 'profile', label: 'My Profile', icon: <User size={16} />, onSelect: () => {}, keywords: ['account', 'me'] },
    ],
  },
  {
    label: 'Actions',
    items: [
      { id: 'new', label: 'New Document', icon: <Plus size={16} />, onSelect: () => {}, keywords: ['create', 'add'] },
      { id: 'upload', label: 'Upload File', icon: <Upload size={16} />, onSelect: () => {}, keywords: ['import'] },
      { id: 'download', label: 'Export Data', icon: <Download size={16} />, onSelect: () => {}, keywords: ['export', 'csv'] },
      { id: 'delete', label: 'Delete Selection', icon: <Trash2 size={16} />, onSelect: () => {}, keywords: ['remove', 'trash'] },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'notifs', label: 'Notification Preferences', icon: <Bell size={16} />, onSelect: () => {}, keywords: ['alerts'] },
      { id: 'theme', label: 'Toggle Dark Mode', icon: <Moon size={16} />, onSelect: () => {}, keywords: ['light', 'dark', 'theme'] },
      { id: 'signout', label: 'Sign Out', icon: <LogOut size={16} />, onSelect: () => {}, keywords: ['logout', 'exit'] },
    ],
  },
];

const SHORTCUT_GROUPS: CommandGroup[] = [
  {
    label: 'Quick actions',
    items: [
      { id: 'new', label: 'New Document', icon: <FileText size={16} />, shortcut: ['⌘', 'N'], onSelect: () => {} },
      { id: 'search', label: 'Search', icon: <Search size={16} />, shortcut: ['⌘', 'K'], onSelect: () => {} },
      { id: 'settings', label: 'Settings', icon: <Settings size={16} />, shortcut: ['⌘', ','], onSelect: () => {} },
      { id: 'save', label: 'Save', icon: <Star size={16} />, shortcut: ['⌘', 'S'], onSelect: () => {} },
      { id: 'help', label: 'Help & Documentation', icon: <HelpCircle size={16} />, shortcut: '?', onSelect: () => {} },
      { id: 'upgrade', label: 'Upgrade to Pro', icon: <Zap size={16} />, shortcut: '↑', onSelect: () => {} },
    ],
  },
];

// ── Wrapper ───────────────────────────────────────────────────────────────────

function Demo({ groups, placeholder }: { groups: CommandGroup[]; placeholder?: string }) {
  const cmd = useCommandPalette();
  return (
    <div>
      <Button
        leftIcon={<Search size={15} />}
        variant="secondary"
        onClick={cmd.toggle}
      >
        Open command palette
      </Button>
      <p style={{ marginTop: 8, fontSize: 12, color: '#9BA5BE' }}>
        Or press <kbd style={{ background: '#F0F2F5', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 11 }}>⌘K</kbd>
      </p>
      <CommandPalette
        isOpen={cmd.isOpen}
        onClose={cmd.close}
        groups={groups}
        placeholder={placeholder}
      />
    </div>
  );
}

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => <Demo groups={BASIC_GROUPS} placeholder="Search commands…" />,
};

// ── With Groups ───────────────────────────────────────────────────────────────

export const WithGroups: Story = {
  render: () => <Demo groups={FULL_GROUPS} placeholder="Search anything…" />,
  parameters: {
    docs: {
      description: {
        story: 'Groups are labelled sections. Type in the search box to filter across all groups and keywords.',
      },
    },
  },
};

// ── With Shortcuts ────────────────────────────────────────────────────────────

export const WithShortcuts: Story = {
  render: () => <Demo groups={SHORTCUT_GROUPS} placeholder="Search actions…" />,
  parameters: {
    docs: {
      description: {
        story: 'Shortcut badges accept a string (single key) or string[] (key chord).',
      },
    },
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => <Demo groups={BASIC_GROUPS} placeholder="Basic group set…" />,
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Palette width follows the overlay; narrow vs wide triggers use the same panel.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 400 }}>
        <Demo groups={BASIC_GROUPS} placeholder="Narrow shell…" />
      </div>
      <div style={{ maxWidth: 560 }}>
        <Demo groups={FULL_GROUPS} placeholder="Wide shell…" />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 13, color: '#6b7694' }}>Open the palette and type to filter; empty queries show all groups.</p>
      <Demo groups={FULL_GROUPS} placeholder="Try searching…" />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => <Demo groups={FULL_GROUPS} />,
  parameters: {
    docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } },
  },
};
