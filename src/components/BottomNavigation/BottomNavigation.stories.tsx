import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Bell, Home, Search, Settings, User } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Fixed bottom tab bar for mobile-style primary navigation. Use with icons + short labels; supports badges and disabled items.',
      },
    },
  },
  argTypes: {
    items: {
      control: false,
      description:
        'Tab items: value, label, icon, badge, isDisabled. Playground uses a fixed sample (icons are React nodes); see Variants for layouts.',
    },
    value: { control: 'text', description: 'Controlled: active item value' },
    defaultValue: { control: 'text', description: 'Uncontrolled: initial active value' },
    onChange: { control: false, description: 'Called when the active tab changes' },
    'aria-label': { control: 'text', description: 'Accessible name for the navigation landmark' },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

const sampleItems = [
  { value: 'home', label: 'Home', icon: <Home size={22} strokeWidth={2} /> },
  { value: 'search', label: 'Search', icon: <Search size={22} strokeWidth={2} /> },
  {
    value: 'inbox',
    label: 'Inbox',
    icon: <Bell size={22} strokeWidth={2} />,
    badge: '3',
  },
  { value: 'profile', label: 'Profile', icon: <User size={22} strokeWidth={2} /> },
];

const threeItems = [
  { value: 'home', label: 'Home', icon: <Home size={22} strokeWidth={2} /> },
  { value: 'explore', label: 'Explore', icon: <Search size={22} strokeWidth={2} /> },
  { value: 'you', label: 'You', icon: <User size={22} strokeWidth={2} /> },
];

const fiveItems = [
  { value: 'home', label: 'Home', icon: <Home size={20} strokeWidth={2} /> },
  { value: 'search', label: 'Search', icon: <Search size={20} strokeWidth={2} /> },
  { value: 'inbox', label: 'Inbox', icon: <Bell size={20} strokeWidth={2} />, badge: '9' },
  { value: 'settings', label: 'Settings', icon: <Settings size={20} strokeWidth={2} /> },
  { value: 'profile', label: 'Profile', icon: <User size={20} strokeWidth={2} /> },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 360, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
      <BottomNavigation
        items={sampleItems}
        defaultValue={args.defaultValue}
        value={args.value}
        onChange={args.onChange}
        aria-label={args['aria-label']}
      />
    </div>
  ),
  args: {
    defaultValue: 'home',
    'aria-label': 'Main navigation',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>
          Four items (with badge on Inbox)
        </p>
        <div style={{ width: 360, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
          <BottomNavigation items={sampleItems} defaultValue="home" aria-label="Four tabs" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Three items</p>
        <div style={{ width: 360, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
          <BottomNavigation items={threeItems} defaultValue="home" aria-label="Three tabs" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Five items</p>
        <div style={{ width: 360, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
          <BottomNavigation items={fiveItems} defaultValue="home" aria-label="Five tabs" />
        </div>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bar height is fixed; use a narrower or wider container to see how labels and icons adapt.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Narrow (280px)</p>
        <div style={{ width: 280, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
          <BottomNavigation items={threeItems} defaultValue="explore" aria-label="Narrow" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Wide (420px)</p>
        <div style={{ width: 420, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
          <BottomNavigation items={sampleItems} defaultValue="home" aria-label="Wide" />
        </div>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Uncontrolled (defaultValue)</p>
        <div style={{ width: 360, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
          <BottomNavigation items={sampleItems} defaultValue="search" aria-label="Uncontrolled" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Controlled</p>
        <ControlledDemo />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>With disabled item</p>
        <div style={{ width: 360, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
          <BottomNavigation
            items={[
              ...sampleItems.slice(0, 3),
              { value: 'profile', label: 'Profile', icon: <User size={22} />, isDisabled: true },
            ]}
            defaultValue="home"
            aria-label="With disabled"
          />
        </div>
      </div>
    </div>
  ),
};

function ControlledDemo() {
  const [tab, setTab] = useState('home');
  return (
    <div style={{ width: 360, border: '1px solid #e2e5ed', borderRadius: 12, overflow: 'hidden' }}>
      <div
        style={{
          padding: 16,
          minHeight: 72,
          fontSize: 13,
          color: '#6b7694',
          borderBottom: '1px solid #e2e5ed',
        }}
      >
        Active: <strong style={{ color: '#111827' }}>{tab}</strong>
      </div>
      <BottomNavigation items={sampleItems} value={tab} onChange={setTab} aria-label="Controlled" />
    </div>
  );
}

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{
        width: 360,
        border: '1px solid #2e3550',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <BottomNavigation items={sampleItems} defaultValue="inbox" aria-label="Main" />
    </div>
  ),
};
