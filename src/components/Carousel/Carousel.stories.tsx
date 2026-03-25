import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { LangProvider } from '../../theme/LangContext';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A horizontal carousel with CSS transforms, optional auto-play (paused on hover or when the tab is hidden), arrows, dot indicators, and one to three visible items. Arrow keys, Home, and End move focus.',
      },
    },
  },
  argTypes: {
    visibleItems: { control: 'select', options: [1, 2, 3], description: 'Slides visible at once.' },
    autoPlay: { control: 'boolean', description: 'Advances automatically (pauses on hover or hidden tab).' },
    loop: { control: 'boolean', description: 'Wraps from last slide to first.' },
    showArrows: { control: 'boolean', description: 'Previous and next buttons.' },
    showDots: { control: 'boolean', description: 'Dot indicators for position.' },
    gap: { control: 'number', description: 'Gap between slides in pixels.' },
    interval: { control: 'number', description: 'Auto-play interval in milliseconds.' },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// ── Slide colors ──────────────────────────────────────────────────────────────

const SLIDES = [
  { bg: 'var(--color-brand-primary-subtle)', color: 'var(--color-brand-primary)', label: 'Slide 1 — Design Tokens' },
  { bg: 'var(--color-success-subtle)', color: 'var(--color-success-text)', label: 'Slide 2 — Components' },
  { bg: 'var(--color-warning-subtle)', color: 'var(--color-warning-text)', label: 'Slide 3 — Typography' },
  { bg: 'var(--color-error-subtle)', color: 'var(--color-error-text)', label: 'Slide 4 — Spacing' },
  { bg: 'var(--color-bg-muted)', color: 'var(--color-brand-primary)', label: 'Slide 5 — Colors' },
];

function SlideCard({ bg, color, label }: { bg: string; color: string; label: string }) {
  return (
    <div style={{
      height: '200px',
      backgroundColor: bg,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '15px',
      fontWeight: 700,
      color,
      fontFamily: 'Nunito Sans, sans-serif',
      userSelect: 'none',
    }}>
      {label}
    </div>
  );
}

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { autoPlay: false, loop: true, showArrows: true, showDots: true, visibleItems: 1, gap: 16 },
  render: (args) => (
    <div style={{ maxWidth: '560px' }}>
      <Carousel {...args} onChange={(i) => console.log('slide', i)}>
        {SLIDES.map((s) => <SlideCard key={s.label} {...s} />)}
      </Carousel>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 560 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>One slide visible</p>
        <Carousel visibleItems={1} gap={16}>
          {SLIDES.map((s) => (
            <SlideCard key={s.label} {...s} />
          ))}
        </Carousel>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Two slides visible</p>
        <Carousel visibleItems={2} gap={12}>
          {SLIDES.map((s) => (
            <SlideCard key={s.label} {...s} />
          ))}
        </Carousel>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Carousel width follows the container; use max-width on the wrapper.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 360 }}>
        <Carousel visibleItems={1}>
          {SLIDES.slice(0, 4).map((s) => (
            <SlideCard key={s.label} {...s} />
          ))}
        </Carousel>
      </div>
      <div style={{ maxWidth: 720 }}>
        <Carousel visibleItems={2} gap={16}>
          {SLIDES.map((s) => (
            <SlideCard key={s.label} {...s} />
          ))}
        </Carousel>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 560 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>With arrows & dots</p>
        <Carousel showArrows showDots loop>
          {SLIDES.slice(0, 4).map((s) => (
            <SlideCard key={s.label} {...s} />
          ))}
        </Carousel>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>No loop</p>
        <Carousel loop={false} showArrows>
          {SLIDES.slice(0, 3).map((s) => (
            <SlideCard key={s.label} {...s} />
          ))}
        </Carousel>
      </div>
    </div>
  ),
};

// ── AutoPlay ──────────────────────────────────────────────────────────────────

export const AutoPlay: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Carousel autoPlay interval={2500} loop>
        {SLIDES.map((s) => <SlideCard key={s.label} {...s} />)}
      </Carousel>
    </div>
  ),
};

// ── MultipleItems ─────────────────────────────────────────────────────────────

export const MultipleItems: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>2 visible</p>
        <Carousel visibleItems={2} gap={12}>
          {SLIDES.map((s) => <SlideCard key={s.label} {...s} />)}
        </Carousel>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>3 visible</p>
        <Carousel visibleItems={3} gap={12}>
          {SLIDES.map((s) => <SlideCard key={s.label} {...s} />)}
        </Carousel>
      </div>
    </div>
  ),
};

// ── NoLoop ────────────────────────────────────────────────────────────────────

export const NoLoop: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Carousel loop={false}>
        {SLIDES.map((s) => <SlideCard key={s.label} {...s} />)}
      </Carousel>
    </div>
  ),
};

// ── Languages ─────────────────────────────────────────────────────────────────

export const Languages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '560px' }}>
      {(['en', 'es', 'fr'] as const).map((lang) => (
        <LangProvider key={lang} defaultLang={lang}>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>{lang}</p>
            <Carousel>
              {SLIDES.slice(0, 3).map((s) => <SlideCard key={s.label} {...s} />)}
            </Carousel>
          </div>
        </LangProvider>
      ))}
    </div>
  ),
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div style={{ padding: '32px', backgroundColor: darkTheme.colors['color-bg-canvas'], borderRadius: '12px', maxWidth: '560px' }}>
        <Carousel autoPlay interval={3000} loop>
          {SLIDES.map((s) => <SlideCard key={s.label} {...s} />)}
        </Carousel>
      </div>
    </ThemeProvider>
  ),
};
