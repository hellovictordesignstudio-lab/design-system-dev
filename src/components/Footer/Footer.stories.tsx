import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A site footer with brand, link columns, and a bottom bar. Use in marketing and documentation shells.',
      },
    },
  },
  argTypes: {
    columns: { control: 'object', description: 'Link columns with title and links array.' },
    brand: { control: 'text', description: 'Brand name or node in the top row.' },
    tagline: { control: 'text', description: 'Short line under the brand.' },
    bottom: { control: 'text', description: 'Bottom bar content (for example copyright).' },
    children: { control: false, description: 'Optional slot above the columns.' },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const defaultColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Storybook', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Legal', href: '#' },
    ],
  },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    brand: 'VDS Design System',
    tagline: 'Tokens, components, and patterns for building consistent products.',
    columns: defaultColumns,
    bottom: '© 2026 VDS Design System. All rights reserved.',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Three columns</p>
        <Footer
          brand="VDS Design System"
          tagline="Build faster with shared UI primitives."
          columns={defaultColumns}
          bottom="© 2026 Acme Inc."
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Two columns</p>
        <Footer
          brand="Studio"
          tagline="Interface kits for product teams."
          columns={defaultColumns.slice(0, 2)}
          bottom="© 2026 Studio."
        />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The footer is full-width; preview narrow vs wide viewports.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 480, overflow: 'hidden', borderRadius: 8, border: '1px solid var(--color-border-default)' }}>
        <Footer brand="DS" tagline="Narrow preview." columns={defaultColumns.slice(0, 2)} bottom="© 2026" />
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Footer
          brand="VDS Design System"
          tagline="Wide layout uses the full max-width grid."
          columns={defaultColumns}
          bottom="© 2026 VDS Design System."
        />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
        Footer content is static; links use standard anchor behavior. Adjust copy for locales in your app shell.
      </p>
      <Footer
        brand="VDS Design System"
        tagline="Production-ready example with three columns."
        columns={defaultColumns}
        bottom="Privacy · Terms · Cookies"
      />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ borderRadius: 8, overflow: 'hidden' }}>
      <Footer
        brand="VDS Design System"
        tagline="Dark shell preview — footer uses its own dark styling."
        columns={defaultColumns}
        bottom="© 2026"
      />
    </div>
  ),
};
