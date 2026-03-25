import type { Meta, StoryObj } from '@storybook/react';
import { Copy, LogOut, Settings, User } from 'lucide-react';
import { Button } from '../Button/Button';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A menu anchored to a trigger. **Menu** is an alias of **DropdownMenu**.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const trigger = (
  <DropdownMenu>
    <DropdownMenu.Trigger>
      <Button variant="secondary">Account</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content width={240}>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item icon={<User size={14} />} onSelect={() => {}}>
        Profile
      </DropdownMenu.Item>
      <DropdownMenu.Item icon={<Settings size={14} />} shortcut="⌘," onSelect={() => {}}>
        Settings
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item icon={<Copy size={14} />} onSelect={() => {}}>
        Copy link
      </DropdownMenu.Item>
      <DropdownMenu.Item icon={<LogOut size={14} />} isDestructive onSelect={() => {}}>
        Log out
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>
);

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div style={{ minHeight: 200 }}>{trigger}</div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start', minHeight: 200 }}>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button variant="primary">Primary trigger</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content width={200}>
          <DropdownMenu.Item onSelect={() => {}}>Edit</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => {}}>Duplicate</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button variant="ghost">Ghost trigger</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content width={200}>
          <DropdownMenu.Item onSelect={() => {}}>Option A</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => {}}>Option B</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, minHeight: 220 }}>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button variant="secondary" size="sm">
            Small
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content width={180}>
          <DropdownMenu.Item onSelect={() => {}}>One</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => {}}>Two</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button variant="secondary" size="md">
            Medium
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content width={220}>
          <DropdownMenu.Item onSelect={() => {}}>One</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => {}}>Two</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minHeight: 200 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>With sections</p>
        {trigger}
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Destructive action</p>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button variant="secondary">Delete…</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content width={200}>
            <DropdownMenu.Item isDestructive onSelect={() => {}}>
              Remove item
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, borderRadius: 12, minHeight: 200 }}>
      {trigger}
    </div>
  ),
};
