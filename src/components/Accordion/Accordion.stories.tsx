import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Info, Settings, Bell, CreditCard, HelpCircle, Shield } from 'lucide-react';
import { Accordion } from './Accordion';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Collapsible content sections. Supports single and multiple open modes, three visual variants, icons, and animated open/close transitions.',
      },
    },
  },
  argTypes: {
    type: { control: 'radio', options: ['single', 'multiple'] },
    variant: { control: 'radio', options: ['default', 'bordered', 'separated'] },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const sampleItems = [
  { value: 'a', label: 'What is a design system?', content: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.' },
  { value: 'b', label: 'How do I get started?', content: 'Install the package, wrap your app in a ThemeProvider, and import any component you need. All tokens and styles are included out of the box.' },
  { value: 'c', label: 'Is dark mode supported?', content: 'Yes — all components automatically adapt when the ThemeProvider\'s colorMode is set to "dark" or "system".' },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { type: 'single', variant: 'bordered', defaultValue: 'a' },
  render: (args) => (
    <div style={{ maxWidth: '560px' }}>
      <Accordion {...args}>
        {sampleItems.map(({ value, label, content }) => (
          <Accordion.Item key={value} value={value}>
            <Accordion.Trigger>{label}</Accordion.Trigger>
            <Accordion.Content>{content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};

// ── Types ─────────────────────────────────────────────────────────────────────

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: '1', minWidth: '260px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#9BA5BE' }}>
          type="single" (default)
        </p>
        <Accordion type="single" defaultValue="a" variant="bordered">
          {sampleItems.map(({ value, label, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Content>{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      <div style={{ flex: '1', minWidth: '260px' }}>
        <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#9BA5BE' }}>
          type="multiple"
        </p>
        <Accordion type="multiple" defaultValue={['a', 'b']} variant="bordered">
          {sampleItems.map(({ value, label, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Content>{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '560px' }}>
      {(['default', 'bordered', 'separated'] as const).map((variant) => (
        <div key={variant}>
          <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#9BA5BE' }}>
            variant="{variant}"
          </p>
          <Accordion variant={variant} defaultValue="a">
            {sampleItems.map(({ value, label, content }) => (
              <Accordion.Item key={value} value={value}>
                <Accordion.Trigger>{label}</Accordion.Trigger>
                <Accordion.Content>{content}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  ),
};

// ── WithIcons ─────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Accordion variant="separated" defaultValue="account">
        <Accordion.Item value="account">
          <Accordion.Trigger leftIcon={<Settings size={16} color="#6B7694" />}>
            Account settings
          </Accordion.Trigger>
          <Accordion.Content>
            Manage your profile information, change your password, and configure two-factor authentication to keep your account secure.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="notifications">
          <Accordion.Trigger leftIcon={<Bell size={16} color="#6B7694" />}>
            Notifications
          </Accordion.Trigger>
          <Accordion.Content>
            Choose which updates you'd like to receive by email, push, or SMS. You can also set quiet hours for a specific time window.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="billing">
          <Accordion.Trigger leftIcon={<CreditCard size={16} color="#6B7694" />}>
            Billing & payments
          </Accordion.Trigger>
          <Accordion.Content>
            View your current plan, update payment methods, download invoices, and manage your billing cycle. Cancel any time.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="privacy">
          <Accordion.Trigger leftIcon={<Shield size={16} color="#6B7694" />}>
            Privacy & data
          </Accordion.Trigger>
          <Accordion.Content>
            Control your data sharing preferences, download your personal data, or delete your account permanently.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="help" isDisabled>
          <Accordion.Trigger leftIcon={<HelpCircle size={16} color="#6B7694" />}>
            Help center (disabled)
          </Accordion.Trigger>
          <Accordion.Content>This item is disabled.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Accordion width follows the container; use in narrow sidebars or full-width FAQs.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 320 }}>
        <Accordion type="single" defaultValue="a" variant="bordered">
          {sampleItems.slice(0, 2).map(({ value, label, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Content>{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <div style={{ maxWidth: 560 }}>
        <Accordion type="single" defaultValue="a" variant="bordered">
          {sampleItems.map(({ value, label, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Content>{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Single open</p>
        <Accordion type="single" defaultValue="a" variant="bordered">
          {sampleItems.map(({ value, label, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Content>{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Multiple open</p>
        <Accordion type="multiple" defaultValue={['a']} variant="bordered">
          {sampleItems.map(({ value, label, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{label}</Accordion.Trigger>
              <Accordion.Content>{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
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
          maxWidth: '560px',
        }}
      >
        <Accordion variant="separated" defaultValue="a">
          {sampleItems.map(({ value, label, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger leftIcon={<Info size={16} />}>{label}</Accordion.Trigger>
              <Accordion.Content>{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </ThemeProvider>
  ),
};
