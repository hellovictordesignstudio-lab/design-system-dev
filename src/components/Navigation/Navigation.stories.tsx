import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  Inbox,
  Star,
  Tag,
  Archive,
  Zap,
  Shield,
  CreditCard,
  Package,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { Sidebar, useSidebar } from './Sidebar';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sidebar is a sticky navigation panel with collapsible support, grouped sections, badges, sub-items, and tooltip labels in collapsed mode.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// ── Shell helper ──────────────────────────────────────────────────────────────

function Shell({
  sidebar,
  activeItem = 'dashboard',
}: {
  sidebar: React.ReactNode;
  activeItem?: string;
}) {
  return (
    <div style={{ display: 'flex', height: '560px', border: '1px solid #E2E5ED', borderRadius: 14, overflow: 'hidden' }}>
      {sidebar}
      <main
        style={{
          flex: 1,
          padding: 28,
          background: '#F8F9FC',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: '#111827', fontFamily: 'Nunito Sans, sans-serif' }}>
          {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
        </div>
        <div
          style={{
            fontSize: 14,
            color: '#9BA5BE',
            lineHeight: 1.6,
            fontFamily: 'Nunito Sans, sans-serif',
          }}
        >
          Main content area. Click sidebar items to see the active state update.
        </div>
      </main>
    </div>
  );
}

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    return (
      <Shell
        activeItem={active}
        sidebar={
          <Sidebar>
            <Sidebar.Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: '#0055FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Zap size={16} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, color: '#111827', fontFamily: 'Nunito Sans, sans-serif' }}>
                  Acme Inc
                </span>
              </div>
            </Sidebar.Header>

            <Sidebar.Section>
              <Sidebar.Item
                label="Dashboard"
                icon={<LayoutDashboard size={18} />}
                isActive={active === 'dashboard'}
                onClick={() => setActive('dashboard')}
              />
              <Sidebar.Item
                label="Analytics"
                icon={<BarChart2 size={18} />}
                isActive={active === 'analytics'}
                onClick={() => setActive('analytics')}
              />
              <Sidebar.Item
                label="Users"
                icon={<Users size={18} />}
                isActive={active === 'users'}
                onClick={() => setActive('users')}
              />
            </Sidebar.Section>

            <Sidebar.Section label="Content">
              <Sidebar.Item
                label="Documents"
                icon={<FileText size={18} />}
                isActive={active === 'docs'}
                onClick={() => setActive('docs')}
              />
              <Sidebar.Item
                label="Settings"
                icon={<Settings size={18} />}
                isActive={active === 'settings'}
                onClick={() => setActive('settings')}
              />
            </Sidebar.Section>

            <Sidebar.Footer>
              <Sidebar.Item
                label="Help"
                icon={<HelpCircle size={18} />}
                onClick={() => {}}
              />
              <Sidebar.Item
                label="Sign out"
                icon={<LogOut size={18} />}
                onClick={() => {}}
              />
            </Sidebar.Footer>
          </Sidebar>
        }
      />
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Expanded** (Playground): full labels and section headers. **Collapsed** (Collapsed story): narrow rail with tooltips.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 16, fontSize: 14, color: '#6b7694', lineHeight: 1.6 }}>
      Use <strong>Playground</strong> for the expanded sidebar and <strong>Collapsed</strong> for the
      icon-only variant. <strong>WithBadges</strong> and <strong>WithSubItems</strong> show common composition patterns.
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar width follows expanded vs collapsed; the shell preview uses a fixed 560px height.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 16, fontSize: 14, color: '#6b7694' }}>
      Resize the Storybook viewport or wrap <code>Sidebar</code> in your app layout; the component fills the column height.
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Active item highlighting, badges, and nested items are covered in the dedicated stories below.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 16, fontSize: 14, color: '#6b7694' }}>
      Open <strong>WithBadges</strong> for counts and <strong>WithSubItems</strong> for nested navigation.{' '}
      <strong>DarkMode</strong> shows token-aware styling.
    </div>
  ),
};

// ── Collapsed ─────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    return (
      <Shell
        activeItem={active}
        sidebar={
          <Sidebar isCollapsed>
            <Sidebar.Header>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: '#0055FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={16} color="#fff" />
              </div>
            </Sidebar.Header>

            <Sidebar.Section>
              <Sidebar.Item label="Dashboard" icon={<LayoutDashboard size={18} />} isActive={active === 'dashboard'} onClick={() => setActive('dashboard')} />
              <Sidebar.Item label="Analytics" icon={<BarChart2 size={18} />} isActive={active === 'analytics'} onClick={() => setActive('analytics')} />
              <Sidebar.Item label="Users" icon={<Users size={18} />} isActive={active === 'users'} onClick={() => setActive('users')} />
              <Sidebar.Item label="Documents" icon={<FileText size={18} />} isActive={active === 'docs'} onClick={() => setActive('docs')} />
              <Sidebar.Item label="Settings" icon={<Settings size={18} />} isActive={active === 'settings'} onClick={() => setActive('settings')} />
            </Sidebar.Section>

            <Sidebar.Footer>
              <Sidebar.Item label="Help" icon={<HelpCircle size={18} />} onClick={() => {}} />
              <Sidebar.Item label="Sign out" icon={<LogOut size={18} />} onClick={() => {}} />
            </Sidebar.Footer>
          </Sidebar>
        }
      />
    );
  },
  parameters: {
    docs: { description: { story: 'Collapsed mode shows only icons. Hover items to see labels in tooltips.' } },
  },
};

// ── With Badges ───────────────────────────────────────────────────────────────

export const WithBadges: Story = {
  render: () => {
    const [active, setActive] = useState('inbox');
    const sidebar = useSidebar();
    return (
      <Shell
        activeItem={active}
        sidebar={
          <Sidebar isCollapsed={sidebar.isCollapsed} onCollapse={sidebar.collapse}>
            <Sidebar.Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} color="#fff" />
                </div>
                {!sidebar.isCollapsed && (
                  <span style={{ fontWeight: 800, fontSize: 15, color: '#111827', fontFamily: 'Nunito Sans, sans-serif' }}>
                    Acme Inc
                  </span>
                )}
              </div>
            </Sidebar.Header>

            <Sidebar.Section label="Mail">
              <Sidebar.Item label="Inbox" icon={<Inbox size={18} />} badge={12} isActive={active === 'inbox'} onClick={() => setActive('inbox')} />
              <Sidebar.Item label="Starred" icon={<Star size={18} />} badge={3} isActive={active === 'starred'} onClick={() => setActive('starred')} />
              <Sidebar.Item label="Drafts" icon={<FileText size={18} />} badge={1} isActive={active === 'drafts'} onClick={() => setActive('drafts')} />
              <Sidebar.Item label="Archive" icon={<Archive size={18} />} isActive={active === 'archive'} onClick={() => setActive('archive')} />
            </Sidebar.Section>

            <Sidebar.Section label="Labels">
              <Sidebar.Item label="Work" icon={<Tag size={18} />} badge="5" isActive={active === 'work'} onClick={() => setActive('work')} />
              <Sidebar.Item label="Personal" icon={<Tag size={18} />} isActive={active === 'personal'} onClick={() => setActive('personal')} />
            </Sidebar.Section>

            <Sidebar.Footer>
              <Sidebar.Item label="Notifications" icon={<Bell size={18} />} badge={99} onClick={() => {}} />
            </Sidebar.Footer>
          </Sidebar>
        }
      />
    );
  },
};

// ── With Sub-items ────────────────────────────────────────────────────────────

export const WithSubItems: Story = {
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <Shell
        activeItem={active}
        sidebar={
          <Sidebar>
            <Sidebar.Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, color: '#111827', fontFamily: 'Nunito Sans, sans-serif' }}>Acme Inc</span>
              </div>
            </Sidebar.Header>

            <Sidebar.Section>
              <Sidebar.Item label="Dashboard" icon={<LayoutDashboard size={18} />} isActive={active === 'overview'} onClick={() => setActive('overview')} />

              <Sidebar.Item
                label="Analytics"
                icon={<BarChart2 size={18} />}
                isActive={['overview-a', 'traffic', 'conversions', 'revenue'].includes(active)}
              >
                <Sidebar.Item label="Overview" isActive={active === 'overview-a'} onClick={() => setActive('overview-a')} />
                <Sidebar.Item label="Traffic" isActive={active === 'traffic'} onClick={() => setActive('traffic')} />
                <Sidebar.Item label="Conversions" isActive={active === 'conversions'} onClick={() => setActive('conversions')} />
                <Sidebar.Item label="Revenue" isActive={active === 'revenue'} onClick={() => setActive('revenue')} />
              </Sidebar.Item>

              <Sidebar.Item
                label="Settings"
                icon={<Settings size={18} />}
                isActive={['general', 'security', 'billing'].includes(active)}
              >
                <Sidebar.Item label="General" icon={<Globe size={18} />} isActive={active === 'general'} onClick={() => setActive('general')} />
                <Sidebar.Item label="Security" icon={<Shield size={18} />} isActive={active === 'security'} onClick={() => setActive('security')} />
                <Sidebar.Item label="Billing" icon={<CreditCard size={18} />} isActive={active === 'billing'} onClick={() => setActive('billing')} />
              </Sidebar.Item>

              <Sidebar.Item label="Users" icon={<Users size={18} />} isActive={active === 'users'} onClick={() => setActive('users')} />
            </Sidebar.Section>

            <Sidebar.Footer>
              <Sidebar.Item label="Help" icon={<HelpCircle size={18} />} onClick={() => {}} />
            </Sidebar.Footer>
          </Sidebar>
        }
      />
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    return (
      <Shell
        activeItem={active}
        sidebar={
          <Sidebar>
            <Sidebar.Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, fontFamily: 'Nunito Sans, sans-serif' }}>Acme Inc</span>
              </div>
            </Sidebar.Header>

            <Sidebar.Section>
              <Sidebar.Item label="Dashboard" icon={<LayoutDashboard size={18} />} isActive={active === 'dashboard'} onClick={() => setActive('dashboard')} />
              <Sidebar.Item label="Analytics" icon={<BarChart2 size={18} />} badge={5} isActive={active === 'analytics'} onClick={() => setActive('analytics')} />
              <Sidebar.Item label="Users" icon={<Users size={18} />} isActive={active === 'users'} onClick={() => setActive('users')} />
              <Sidebar.Item label="Documents" icon={<FileText size={18} />} isActive={active === 'docs'} onClick={() => setActive('docs')} />
            </Sidebar.Section>

            <Sidebar.Section label="System">
              <Sidebar.Item label="Settings" icon={<Settings size={18} />} isActive={active === 'settings'} onClick={() => setActive('settings')} />
              <Sidebar.Item label="Notifications" icon={<Bell size={18} />} badge={3} isActive={active === 'notifs'} onClick={() => setActive('notifs')} />
            </Sidebar.Section>

            <Sidebar.Footer>
              <Sidebar.Item label="Help" icon={<HelpCircle size={18} />} onClick={() => {}} />
              <Sidebar.Item label="Sign out" icon={<LogOut size={18} />} onClick={() => {}} />
            </Sidebar.Footer>
          </Sidebar>
        }
      />
    );
  },
  parameters: {
    docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview dark styles.' } },
  },
};

// ── Full Example ──────────────────────────────────────────────────────────────

export const FullExample: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    const sidebar = useSidebar();

    return (
      <Shell
        activeItem={active}
        sidebar={
          <Sidebar isCollapsed={sidebar.isCollapsed} onCollapse={sidebar.collapse}>
            <Sidebar.Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #0055FF, #6C3BF5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Zap size={16} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, color: '#111827', fontFamily: 'Nunito Sans, sans-serif' }}>
                  Acme Inc
                </span>
              </div>
            </Sidebar.Header>

            <Sidebar.Section>
              <Sidebar.Item label="Dashboard" icon={<LayoutDashboard size={18} />} isActive={active === 'dashboard'} onClick={() => setActive('dashboard')} />
              <Sidebar.Item label="Analytics" icon={<BarChart2 size={18} />} badge={2} isActive={active === 'analytics'} onClick={() => setActive('analytics')} />
              <Sidebar.Item label="Users" icon={<Users size={18} />} isActive={active === 'users'} onClick={() => setActive('users')} />
            </Sidebar.Section>

            <Sidebar.Section label="Products">
              <Sidebar.Item
                label="Catalog"
                icon={<Package size={18} />}
                isActive={['catalog', 'inventory', 'pricing'].includes(active)}
              >
                <Sidebar.Item label="Inventory" isActive={active === 'inventory'} onClick={() => setActive('inventory')} />
                <Sidebar.Item label="Pricing" isActive={active === 'pricing'} onClick={() => setActive('pricing')} />
              </Sidebar.Item>
              <Sidebar.Item label="Orders" icon={<FileText size={18} />} badge={18} isActive={active === 'orders'} onClick={() => setActive('orders')} />
            </Sidebar.Section>

            <Sidebar.Section label="Account">
              <Sidebar.Item
                label="Settings"
                icon={<Settings size={18} />}
                isActive={['general', 'security', 'billing'].includes(active)}
              >
                <Sidebar.Item label="General" isActive={active === 'general'} onClick={() => setActive('general')} />
                <Sidebar.Item label="Security" isActive={active === 'security'} onClick={() => setActive('security')} />
                <Sidebar.Item label="Billing" isActive={active === 'billing'} onClick={() => setActive('billing')} />
              </Sidebar.Item>
              <Sidebar.Item label="Notifications" icon={<Bell size={18} />} badge={5} isActive={active === 'notifs'} onClick={() => setActive('notifs')} />
            </Sidebar.Section>

            <Sidebar.Footer>
              <Sidebar.Item
                label="Victor Hugo"
                icon={<Avatar name="Victor Hugo" size="xs" />}
                isActive={active === 'profile'}
                onClick={() => setActive('profile')}
              />
              <Sidebar.Item label="Sign out" icon={<LogOut size={18} />} onClick={() => {}} />
            </Sidebar.Footer>
          </Sidebar>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-featured sidebar with useSidebar() hook, sections, badges, sub-items, and a user profile row. Click the chevron toggle to collapse.',
      },
    },
  },
};
