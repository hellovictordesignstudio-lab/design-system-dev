import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Users, DollarSign, ShoppingCart, Activity, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'KPI / metric card for dashboards. Displays a label, value, trend pill, and optional icon.',
      },
    },
  },
  argTypes: {
    iconColor: { control: 'select', options: ['blue', 'green', 'orange', 'red', 'purple'] },
    trend: { control: 'radio', options: ['up', 'down', 'neutral'] },
    isLoading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Total Revenue',
    value: '$48,295',
    change: 12.4,
    changeLabel: 'vs last month',
    iconColor: 'blue',
    icon: <DollarSign />,
  },
  render: (args) => (
    <div style={{ width: '260px' }}>
      <StatCard {...args} />
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ width: 260 }}>
        <StatCard label="Revenue" value="$12k" change={5.2} changeLabel="vs LY" icon={<DollarSign />} iconColor="green" />
      </div>
      <div style={{ width: 260 }}>
        <StatCard label="Users" value="1.2k" change={-1.2} changeLabel="vs LW" icon={<Users />} iconColor="blue" trend="down" />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card width is controlled by the parent; common grid is 240–280px per tile.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ width: 200 }}>
        <StatCard label="Narrow" value="42" icon={<Activity />} iconColor="purple" />
      </div>
      <div style={{ width: 320 }}>
        <StatCard label="Wide" value="$48,295" change={12.4} changeLabel="vs last month" icon={<DollarSign />} iconColor="blue" />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ width: 260 }}>
        <StatCard label="Up" value="120" change={10} changeLabel="%" icon={<TrendingUp />} iconColor="green" trend="up" />
      </div>
      <div style={{ width: 260 }}>
        <StatCard label="Down" value="80" change={-5} changeLabel="%" icon={<TrendingUp />} iconColor="red" trend="down" />
      </div>
      <div style={{ width: 260 }}>
        <StatCard label="Neutral" value="100%" change={0} changeLabel="flat" icon={<Activity />} iconColor="purple" trend="neutral" />
      </div>
    </div>
  ),
};

// ── Grid ──────────────────────────────────────────────────────────────────────

export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        maxWidth: '560px',
      }}
    >
      <StatCard
        label="Total Users"
        value="24,812"
        change={8.3}
        changeLabel="vs last week"
        icon={<Users />}
        iconColor="blue"
      />
      <StatCard
        label="Revenue"
        value="$48,295"
        change={12.4}
        changeLabel="vs last month"
        icon={<DollarSign />}
        iconColor="green"
      />
      <StatCard
        label="Orders"
        value="1,934"
        change={-3.1}
        changeLabel="vs yesterday"
        icon={<ShoppingCart />}
        iconColor="orange"
      />
      <StatCard
        label="Uptime"
        value="99.98%"
        change={0}
        changeLabel="no change"
        icon={<Activity />}
        iconColor="purple"
        trend="neutral"
      />
    </div>
  ),
};

// ── WithIcons ─────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {(
        [
          { iconColor: 'blue', label: 'Blue', icon: <Users /> },
          { iconColor: 'green', label: 'Green', icon: <DollarSign /> },
          { iconColor: 'orange', label: 'Orange', icon: <ShoppingCart /> },
          { iconColor: 'red', label: 'Red', icon: <Activity /> },
          { iconColor: 'purple', label: 'Purple', icon: <TrendingUp /> },
        ] as const
      ).map(({ iconColor, label, icon }) => (
        <div key={iconColor} style={{ width: '200px' }}>
          <StatCard
            label={label}
            value="1,234"
            change={5}
            icon={icon}
            iconColor={iconColor}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Trends ────────────────────────────────────────────────────────────────────

export const Trends: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '220px' }}>
        <StatCard label="Trending up" value="4,821" change={14.2} changeLabel="vs last month" />
      </div>
      <div style={{ width: '220px' }}>
        <StatCard label="Trending down" value="982" change={-6.7} changeLabel="vs last month" />
      </div>
      <div style={{ width: '220px' }}>
        <StatCard label="No change" value="100%" change={0} changeLabel="stable" trend="neutral" />
      </div>
    </div>
  ),
};

// ── Loading ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        maxWidth: '480px',
      }}
    >
      <StatCard label="Total Users" value="" change={0} changeLabel="loading..." isLoading />
      <StatCard label="Revenue" value="" change={0} changeLabel="loading..." isLoading />
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
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '560px',
        }}
      >
        <StatCard
          label="Total Users"
          value="24,812"
          change={8.3}
          changeLabel="vs last week"
          icon={<Users />}
          iconColor="blue"
        />
        <StatCard
          label="Revenue"
          value="$48,295"
          change={-3.4}
          changeLabel="vs last month"
          icon={<DollarSign />}
          iconColor="green"
        />
      </div>
    </ThemeProvider>
  ),
};
