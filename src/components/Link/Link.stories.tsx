import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { ArrowRight, Download, Mail, FileText } from 'lucide-react';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Navigational element for internal and external links. Supports icons, underline styles, and disabled state.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'subtle', 'inverse'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    underline: { control: 'select', options: ['always', 'hover', 'none'] },
    isExternal: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  args: {
    children: 'Visit our documentation',
    href: '#',
    variant: 'default',
    size: 'md',
    underline: 'hover',
    isExternal: false,
    isDisabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link href="#" variant="default">Default — brand color</Link>
      <Link href="#" variant="subtle">Subtle — secondary text color</Link>
      <div style={{ background: '#0C0D10', padding: '12px 16px', borderRadius: 8, display: 'inline-flex' }}>
        <Link href="#" variant="inverse">Inverse — for dark backgrounds</Link>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column',10 }}>
      <Link href="#" size="sm">Small link</Link>
      <Link href="#" size="md">Medium link</Link>
      <Link href="#" size="lg">Large link</Link>
    </div>
  ),
};

export const Underline: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Link href="#" underline="always">Always underlined</Link>
      <Link href="#" underline="hover">Underline on hover (default)</Link>
      <Link href="#" underline="none">No underline</Link>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link href="#" rightIcon={<ArrowRight />}>Read more</Link>
      <Link href="#" leftIcon={<Download />}>Download PDF</Link>
      <Link href="#" leftIcon={<Mail />}>Contact us</Link>
      <Link href="https://example.com" isExternal>External link (auto icon)</Link>
      <Link href="#" leftIcon={<FileText />} rightIcon={<ArrowRight />}>View full report</Link>
    </div>
  ),
};

export const Inline: Story = {
  parameters: {
    docs: { description: { story: 'Links used inline within body text.' } },
  },
  render: () => (
    <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 15, color: 'var(--color-text-primary, #0C0D10)', lineHeight: 1.7, maxWidth: 480 }}>
      Our{' '}
      <Link href="#" size="md">design tokens</Link>
      {' '}follow the same structure used by{' '}
      <Link href="https://example.com" isExternal size="md">Figma's official guidelines</Link>
      . Read the{' '}
      <Link href="#" size="md" underline="always">full documentation</Link>
      {' '}for more details.
    </p>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Link href="#" variant="default">Default</Link>
      <Link href="#" variant="default" isDisabled>Disabled</Link>
      <Link href="#" variant="subtle">Subtle</Link>
      <Link href="#" variant="subtle" isDisabled>Subtle disabled</Link>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0C0D10', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link href="#" variant="default">Default on dark</Link>
      <Link href="#" variant="subtle">Subtle on dark</Link>
      <Link href="#" variant="inverse">Inverse on dark</Link>
      <Link href="https://example.com" isExternal variant="default">External on dark</Link>
    </div>
  ),
};
