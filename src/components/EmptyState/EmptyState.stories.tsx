import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FolderOpen } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder UI for empty, search, error, and offline states. Accepts an icon, title, description, and action slot.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'search', 'error', 'offline'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'md',
    title: 'Nothing here yet',
    description: 'Create your first item to get started.',
  },
  render: (args) => (
    <div style={{ border: '1px solid #E2E5ED', borderRadius: '14px', maxWidth: '480px' }}>
      <EmptyState
        {...args}
        action={<Button size="sm">Create item</Button>}
      />
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '720px' }}>
      {(['default', 'search', 'error', 'offline'] as const).map((variant) => (
        <div
          key={variant}
          style={{ border: '1px solid #E2E5ED', borderRadius: '14px', overflow: 'hidden' }}
        >
          <EmptyState variant={variant} title="" />
        </div>
      ))}
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div
          key={size}
          style={{ border: '1px solid #E2E5ED', borderRadius: '14px', overflow: 'hidden' }}
        >
          <EmptyState
            size={size}
            title={`Size: ${size}`}
            description="Description text adjusts with the size."
          />
        </div>
      ))}
    </div>
  ),
};

// ── WithAction ────────────────────────────────────────────────────────────────

export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ border: '1px solid #E2E5ED', borderRadius: '14px', width: '320px' }}>
        <EmptyState
          variant="search"
          title="No results found"
          description='No matches for "design system". Try different keywords.'
          action={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="ghost" size="sm">Clear search</Button>
              <Button size="sm">Browse all</Button>
            </div>
          }
        />
      </div>

      <div style={{ border: '1px solid #E2E5ED', borderRadius: '14px', width: '320px' }}>
        <EmptyState
          icon={<FolderOpen />}
          title="No projects"
          description="You haven't created any projects yet. Start by creating your first one."
          action={<Button size="sm">New project</Button>}
        />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <div style={{ border: '1px solid #E2E5ED', borderRadius: 14 }}>
        <EmptyState variant="default" title="Empty list" description="No items yet." />
      </div>
      <div style={{ border: '1px solid #E2E5ED', borderRadius: 14 }}>
        <EmptyState variant="error" title="Something went wrong" description="Try again later." />
      </div>
      <div style={{ border: '1px solid #E2E5ED', borderRadius: 14 }}>
        <EmptyState variant="offline" title="You are offline" description="Reconnect to sync." />
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
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {(['default', 'search', 'error', 'offline'] as const).map((variant) => (
          <div
            key={variant}
            style={{
              border: '1px solid #2E3550',
              borderRadius: '14px',
              width: '280px',
            }}
          >
            <EmptyState variant={variant} title="" size="sm" />
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};
