import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Settings, MoreHorizontal, ArrowRight, Star, Heart, Share2, User } from 'lucide-react';
import { Card } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A container with optional header, body, footer, and media. Configure padding, shadow, and interactive (hover or press) behavior.',
      },
    },
  },
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Inner padding for header, body, and footer regions.',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Elevation shadow.',
    },
    hasBorder: { control: 'boolean', description: 'Draws a 1px border around the card.' },
    isHoverable: { control: 'boolean', description: 'Raises shadow on hover.' },
    isClickable: { control: 'boolean', description: 'Pointer cursor and press feedback.' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    padding: 'md',
    shadow: 'sm',
    hasBorder: true,
    isHoverable: false,
    isClickable: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '360px' }}>
      <Card {...args}>
        <Card.Header
          title="Card title"
          subtitle="Optional subtitle below"
          action={<Badge variant="primary">New</Badge>}
        />
        <Card.Body>
          This is the card body. It accepts any React children and inherits the card's padding and
          typography settings.
        </Card.Body>
        <Card.Footer>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </Card.Footer>
      </Card>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>
          Shadow levels
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(['none', 'sm', 'md', 'lg'] as const).map((s) => (
            <Card key={s} shadow={s}>
              <Card.Body>shadow="{s}"</Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>
          Padding levels
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
            <Card key={p} padding={p}>
              <Card.Body>padding="{p}"</Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>
          No border
        </p>
        <Card hasBorder={false} shadow="md">
          <Card.Body>hasBorder=false with shadow="md"</Card.Body>
        </Card>
      </div>
    </div>
  ),
};

// ── With Image ────────────────────────────────────────────────────────────────

export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: '300px' }}>
        <Card shadow="md">
          <Card.Image src="https://picsum.photos/seed/arch/600/338" alt="Architecture" />
          <Card.Header title="Mountain view" subtitle="Landscape photography" />
          <Card.Body>
            A stunning mountain vista captured at golden hour. The interplay of light and shadow
            creates a dramatic composition.
          </Card.Body>
          <Card.Footer>
            <Button variant="ghost" size="sm" leftIcon={<Heart size={14} />}>Like</Button>
            <Button variant="ghost" size="sm" leftIcon={<Share2 size={14} />}>Share</Button>
            <Button size="sm" rightIcon={<ArrowRight size={14} />}>View</Button>
          </Card.Footer>
        </Card>
      </div>

      <div style={{ width: '300px' }}>
        <Card shadow="md">
          <Card.Image
            src="https://picsum.photos/seed/forest/600/450"
            alt="Forest"
            aspectRatio="4/3"
          />
          <Card.Header
            title="Into the woods"
            subtitle="Nature series"
            action={<Badge variant="success">Featured</Badge>}
          />
          <Card.Body>
            Deep within an ancient forest, sunlight filters through the canopy, illuminating the
            forest floor in dappled patterns.
          </Card.Body>
        </Card>
      </div>

      <div style={{ width: '240px' }}>
        <Card shadow="md">
          <Card.Image
            src="https://picsum.photos/seed/city/480/480"
            alt="City"
            aspectRatio="1/1"
          />
          <Card.Body>Square crop — aspectRatio="1/1"</Card.Body>
        </Card>
      </div>
    </div>
  ),
};

// ── Hoverable ─────────────────────────────────────────────────────────────────

export const Hoverable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: '280px' }}>
        <Card isHoverable shadow="sm">
          <Card.Header title="Hoverable card" subtitle="Hover to see shadow lift" />
          <Card.Body>
            Move your cursor over this card. The shadow increases and the card scales up slightly.
          </Card.Body>
        </Card>
      </div>

      <div style={{ width: '280px' }}>
        <Card isHoverable isClickable shadow="sm" onClick={() => alert('Card clicked!')}>
          <Card.Header title="Clickable card" subtitle="Hover + click me" />
          <Card.Body>
            This card is both hoverable and clickable. It shows a pointer cursor and compresses
            slightly on press.
          </Card.Body>
          <Card.Footer align="left">
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Click anywhere on the card</span>
          </Card.Footer>
        </Card>
      </div>

      <div style={{ width: '280px' }}>
        <Card isHoverable isClickable shadow="none" hasBorder>
          <Card.Image src="https://picsum.photos/seed/hover/560/315" alt="Hover demo" />
          <Card.Header title="Image card" subtitle="Hover + click" />
          <Card.Body>A clickable card with an image and no initial shadow.</Card.Body>
        </Card>
      </div>
    </div>
  ),
};

// ── Compositions ──────────────────────────────────────────────────────────────

export const Compositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

      {/* Blog post card */}
      <div style={{ width: '320px' }}>
        <Card shadow="md" isHoverable isClickable as="article">
          <Card.Image src="https://picsum.photos/seed/blog/640/360" alt="Blog post" />
          <Card.Body>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
              <Badge variant="primary">Design</Badge>
              <Badge variant="default">5 min read</Badge>
            </div>
            <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)', lineHeight: 1.4 }}>
              Building a scalable design token system
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              A deep dive into structuring primitive and semantic tokens for multi-brand products.
            </p>
          </Card.Body>
          <Card.Footer align="space-between">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'var(--color-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <User size={14} color="var(--color-text-tertiary)" />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Victor Aldana</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Mar 22, 2026</span>
          </Card.Footer>
        </Card>
      </div>

      {/* Pricing card */}
      <div style={{ width: '260px' }}>
        <Card shadow="lg" padding="lg" hasBorder>
          <Card.Header
            title="Pro"
            subtitle="For growing teams"
            action={<Badge variant="warning">Popular</Badge>}
            hasDivider={false}
          />
          <Card.Body>
            <div style={{ margin: '12px 0 20px', fontSize: '32px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              $49<span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-tertiary)' }}>/mo</span>
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 16px', color: 'var(--color-text-secondary)', fontSize: '13px', lineHeight: 2 }}>
              <li>Unlimited projects</li>
              <li>Up to 25 team members</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
          </Card.Body>
          <Card.Footer hasDivider={false} align="center">
            <Button fullWidth>Get started</Button>
          </Card.Footer>
        </Card>
      </div>

      {/* Settings card */}
      <div style={{ width: '320px' }}>
        <Card shadow="sm">
          <Card.Header
            title="Notifications"
            subtitle="Manage how you receive alerts"
            action={<Button variant="ghost" size="sm" leftIcon={<Settings size={14} />}>Configure</Button>}
          />
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Email alerts', desc: 'Receive updates via email' },
                { label: 'Push notifications', desc: 'Browser and mobile push' },
                { label: 'Weekly digest', desc: 'Summary every Monday' },
              ].map(({ label, desc }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-tertiary)' }}>{desc}</p>
                  </div>
                  <div style={{ width: '36px', height: '20px', borderRadius: '10px', background: 'var(--color-brand-primary)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </Card.Body>
          <Card.Footer align="space-between">
            <Button variant="ghost" size="sm">Reset defaults</Button>
            <Button size="sm">Save changes</Button>
          </Card.Footer>
        </Card>
      </div>

      {/* Stat card */}
      <div style={{ width: '200px' }}>
        <Card shadow="sm" padding="lg" isHoverable>
          <Card.Body>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-brand-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={18} color="var(--color-brand-primary)" />
              </div>
              <Badge variant="success">+12%</Badge>
            </div>
            <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
              4,821
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Total reviews</p>
          </Card.Body>
        </Card>
      </div>

    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card width is set by the parent; padding and shadow are component props.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: 240 }}>
        <Card>
          <Card.Body>Narrow (240px)</Card.Body>
        </Card>
      </div>
      <div style={{ width: 400 }}>
        <Card>
          <Card.Body>Wide (400px)</Card.Body>
        </Card>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ width: 280 }}>
        <Card>
          <Card.Body>Default</Card.Body>
        </Card>
      </div>
      <div style={{ width: 280 }}>
        <Card isHoverable>
          <Card.Body>Hoverable</Card.Body>
        </Card>
      </div>
      <div style={{ width: 280 }}>
        <Card isClickable>
          <Card.Body>Clickable</Card.Body>
        </Card>
      </div>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div
        style={{
          padding: '32px',
          backgroundColor: darkTheme.colors['color-bg-canvas'],
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          borderRadius: '12px',
        }}
      >
        <div style={{ width: '280px' }}>
          <Card shadow="md">
            <Card.Header
              title="Dark mode card"
              subtitle="Colors adapt to the theme"
              action={<Badge variant="primary">Dark</Badge>}
            />
            <Card.Body>
              All semantic color tokens automatically switch when the resolved color mode is "dark".
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Confirm</Button>
            </Card.Footer>
          </Card>
        </div>

        <div style={{ width: '280px' }}>
          <Card shadow="md" isHoverable isClickable>
            <Card.Image src="https://picsum.photos/seed/dark/560/315" alt="Dark mode with image" />
            <Card.Header title="Hoverable" subtitle="With image" />
            <Card.Body>Hover and click states work in dark mode too.</Card.Body>
          </Card>
        </div>

        <div style={{ width: '200px' }}>
          <Card shadow="sm" padding="lg">
            <Card.Body>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={18} color="var(--color-brand-primary)" />
                </div>
                <Badge variant="success">+8%</Badge>
              </div>
              <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                2,048
              </p>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Active users</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  ),
};
