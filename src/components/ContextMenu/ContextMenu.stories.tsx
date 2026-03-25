import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from './ContextMenu';
import type { ContextMenuItemDef } from './ContextMenu.types';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { LangProvider } from '../../theme/LangContext';
import { darkTheme } from '../../theme/theme';
import {
  Copy, Scissors, ClipboardPaste, Pencil, Trash2,
  Share2, Download, Eye, Lock, MoreHorizontal,
  Folder, FolderOpen, Star, Archive,
} from 'lucide-react';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Opens at the pointer with viewport-aware positioning. Supports items, separators, section labels, and nested submenus. Closes on outside click, Esc, or scroll.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

// ── Shared items ──────────────────────────────────────────────────────────────

const fileItems: ContextMenuItemDef[] = [
  { type: 'label', label: 'Actions' },
  { label: 'Open', icon: <FolderOpen size={16} />, onAction: () => alert('Open') },
  { label: 'Rename', icon: <Pencil size={16} />, shortcut: 'F2', onAction: () => alert('Rename') },
  { label: 'Copy', icon: <Copy size={16} />, shortcut: '⌘C', onAction: () => alert('Copy') },
  { label: 'Cut', icon: <Scissors size={16} />, shortcut: '⌘X', onAction: () => alert('Cut') },
  { type: 'separator' },
  {
    type: 'sub',
    label: 'Share',
    icon: <Share2 size={16} />,
    items: [
      { label: 'Copy link', onAction: () => alert('Copy link') },
      { label: 'Email', onAction: () => alert('Email') },
      { label: 'Slack', onAction: () => alert('Slack'), disabled: true },
    ],
  },
  { label: 'Download', icon: <Download size={16} />, shortcut: '⌘D', onAction: () => alert('Download') },
  { label: 'Archive', icon: <Archive size={16} />, onAction: () => alert('Archive') },
  { type: 'separator' },
  { label: 'Delete', icon: <Trash2 size={16} />, shortcut: '⌫', destructive: true, onAction: () => alert('Delete') },
];

const triggerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '120px',
  border: '1.5px dashed var(--color-border-strong)',
  borderRadius: '14px',
  color: 'var(--color-text-tertiary)',
  fontSize: '14px',
  fontFamily: 'Nunito Sans, sans-serif',
  userSelect: 'none',
  cursor: 'context-menu',
  background: 'var(--color-bg-subtle)',
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <ContextMenu items={fileItems}>
        <div style={triggerStyle}>
          Right-click anywhere in this area
        </div>
      </ContextMenu>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const flat: ContextMenuItemDef[] = [
      { label: 'Copy', icon: <Copy size={16} />, onAction: () => {} },
      { label: 'Paste', icon: <ClipboardPaste size={16} />, onAction: () => {} },
      { type: 'separator' },
      { label: 'Delete', icon: <Trash2 size={16} />, destructive: true, onAction: () => {} },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Flat list</p>
          <ContextMenu items={flat}>
            <div style={triggerStyle}>Right-click</div>
          </ContextMenu>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>With sub-menu</p>
          <ContextMenu items={fileItems}>
            <div style={triggerStyle}>Right-click</div>
          </ContextMenu>
        </div>
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Panel width adapts to content; trigger area size is up to your layout.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ maxWidth: 280 }}>
        <ContextMenu items={fileItems}>
          <div style={{ ...triggerStyle, minHeight: 80 }}>Narrow</div>
        </ContextMenu>
      </div>
      <div style={{ maxWidth: 520 }}>
        <ContextMenu items={fileItems}>
          <div style={triggerStyle}>Wide</div>
        </ContextMenu>
      </div>
    </div>
  ),
};

// ── WithSubMenu ───────────────────────────────────────────────────────────────

export const WithSubMenu: Story = {
  render: () => {
    const items: ContextMenuItemDef[] = [
      { label: 'View', icon: <Eye size={16} />, onAction: () => {} },
      { label: 'Favorite', icon: <Star size={16} />, onAction: () => {} },
      { type: 'separator' },
      {
        type: 'sub',
        label: 'More options',
        icon: <MoreHorizontal size={16} />,
        items: [
          { label: 'Make private', icon: <Lock size={16} />, onAction: () => {} },
          { label: 'Move to folder', icon: <Folder size={16} />, onAction: () => {} },
          { type: 'separator' },
          {
            type: 'sub',
            label: 'Export as',
            items: [
              { label: 'PDF', onAction: () => {} },
              { label: 'PNG', onAction: () => {} },
              { label: 'SVG', onAction: () => {} },
            ],
          },
        ],
      },
      { type: 'separator' },
      { label: 'Delete', icon: <Trash2 size={16} />, destructive: true, onAction: () => {} },
    ];
    return (
      <div style={{ maxWidth: '480px' }}>
        <ContextMenu items={items}>
          <div style={triggerStyle}>Right-click for nested sub-menu</div>
        </ContextMenu>
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const items: ContextMenuItemDef[] = [
      { label: 'Normal item', icon: <Copy size={16} />, onAction: () => {} },
      { label: 'With shortcut', icon: <Pencil size={16} />, shortcut: '⌘E', onAction: () => {} },
      { label: 'Disabled item', icon: <Lock size={16} />, disabled: true },
      { type: 'separator' },
      { label: 'Destructive', icon: <Trash2 size={16} />, destructive: true, onAction: () => {} },
      { label: 'Destructive disabled', icon: <Trash2 size={16} />, destructive: true, disabled: true },
    ];
    return (
      <div style={{ maxWidth: '480px' }}>
        <ContextMenu items={items}>
          <div style={triggerStyle}>Right-click to see all states</div>
        </ContextMenu>
      </div>
    );
  },
};

// ── Languages ─────────────────────────────────────────────────────────────────

export const Languages: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {(['en', 'es', 'fr'] as const).map((lang) => (
        <LangProvider key={lang} defaultLang={lang}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>{lang}</p>
            <ContextMenu items={fileItems}>
              <div style={{ ...triggerStyle, minHeight: '80px', fontSize: '12px' }}>
                Right-click ({lang})
              </div>
            </ContextMenu>
          </div>
        </LangProvider>
      ))}
    </div>
  ),
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div style={{ padding: '32px', backgroundColor: darkTheme.colors['color-bg-canvas'], borderRadius: '12px', maxWidth: '480px' }}>
        <ContextMenu items={fileItems}>
          <div style={{
            ...triggerStyle,
            background: 'var(--color-bg-default)',
            borderColor: 'var(--color-border-default)',
            color: 'var(--color-text-tertiary)',
          }}>
            Right-click anywhere (dark mode)
          </div>
        </ContextMenu>
      </div>
    </ThemeProvider>
  ),
};
