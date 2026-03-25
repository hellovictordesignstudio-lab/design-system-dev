import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GitCommit, Star, AlertCircle, Package, Upload, CheckCircle } from 'lucide-react';
import { Timeline } from './Timeline';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A vertical list of events. Supports icon dots or circles, titles, descriptions, and dates.',
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'compact'], description: 'Vertical spacing and icon size.' },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { variant: 'default' },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <Timeline {...args}>
        <Timeline.Item
          title="Project created"
          description="Initial repository set up and scaffolding completed."
          date="Mar 1, 2026"
          icon={<Star />}
          iconColor="blue"
        />
        <Timeline.Item
          title="First commit pushed"
          description="Added design tokens, theme provider, and Button component."
          date="Mar 5, 2026"
          icon={<GitCommit />}
          iconColor="green"
        />
        <Timeline.Item
          title="v1.0.0 released"
          description="Published to npm with 14 components and full dark mode support."
          date="Mar 22, 2026"
          icon={<Upload />}
          iconColor="purple"
        />
      </Timeline>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ minWidth: 260 }}>
        <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>default</p>
        <Timeline variant="default">
          <Timeline.Item title="Step one" description="Done" date="Mar 1" />
          <Timeline.Item title="Step two" description="Now" date="Mar 5" />
        </Timeline>
      </div>
      <div style={{ minWidth: 260 }}>
        <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>compact</p>
        <Timeline variant="compact">
          <Timeline.Item title="Step one" description="Done" date="Mar 1" />
          <Timeline.Item title="Step two" description="Now" date="Mar 5" />
        </Timeline>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Timeline width is controlled by the parent; icons and text reflow in narrow columns.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 320 }}>
        <Timeline>
          <Timeline.Item title="Narrow" description="320px container" date="Mar 1" />
          <Timeline.Item title="Next" description="…" date="Mar 2" />
        </Timeline>
      </div>
      <div style={{ maxWidth: 560 }}>
        <Timeline>
          <Timeline.Item title="Wide" description="560px container" date="Mar 1" />
          <Timeline.Item title="Next" description="…" date="Mar 2" />
        </Timeline>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Timeline>
        <Timeline.Item title="Dot only (no icon)" description="Uses default dot connector." date="Mar 1" />
        <Timeline.Item title="With icon" description="Colored icon circle." date="Mar 2" icon={<Star />} iconColor="blue" />
      </Timeline>
    </div>
  ),
};

// ── WithIcons ─────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <Timeline>
        <Timeline.Item
          title="Order placed"
          description="Your order 4821 has been received and is being processed."
          date="Mar 22, 2026 · 09:14"
          icon={<Package />}
          iconColor="blue"
        />
        <Timeline.Item
          title="Payment confirmed"
          description="Payment of $128.00 via Visa ending in 4242 was successful."
          date="Mar 22, 2026 · 09:15"
          icon={<CheckCircle />}
          iconColor="green"
        />
        <Timeline.Item
          title="Shipped"
          description="Your package has been handed to the carrier. Tracking: 1Z999AA10123456784."
          date="Mar 23, 2026 · 14:30"
          icon={<Upload />}
          iconColor="orange"
        />
        <Timeline.Item
          title="Delivery failed"
          description="We attempted delivery but no one was home. A re-delivery will be attempted tomorrow."
          date="Mar 24, 2026 · 11:02"
          icon={<AlertCircle />}
          iconColor="red"
        />
      </Timeline>
    </div>
  ),
};

// ── Compact ───────────────────────────────────────────────────────────────────

export const Compact: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ minWidth: '260px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>default</p>
        <Timeline variant="default">
          <Timeline.Item title="Step one" description="Completed" date="Mar 1" />
          <Timeline.Item title="Step two" description="In progress" date="Mar 5" />
          <Timeline.Item title="Step three" description="Pending" date="—" />
        </Timeline>
      </div>
      <div style={{ minWidth: '260px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>compact</p>
        <Timeline variant="compact">
          <Timeline.Item title="Step one" description="Completed" date="Mar 1" />
          <Timeline.Item title="Step two" description="In progress" date="Mar 5" />
          <Timeline.Item title="Step three" description="Pending" date="—" />
        </Timeline>
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
          maxWidth: '480px',
        }}
      >
        <Timeline>
          <Timeline.Item
            title="Project created"
            description="Initial repository set up."
            date="Mar 1, 2026"
            icon={<Star />}
            iconColor="blue"
          />
          <Timeline.Item
            title="First release"
            description="Published v1.0.0 to npm."
            date="Mar 22, 2026"
            icon={<Upload />}
            iconColor="green"
          />
          <Timeline.Item
            title="Issue detected"
            description="A regression was found in the Button component."
            date="Mar 23, 2026"
            icon={<AlertCircle />}
            iconColor="red"
          />
        </Timeline>
      </div>
    </ThemeProvider>
  ),
};
