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
          'A smooth sliding carousel with CSS transform-based navigation, auto-play (paused on hover / hidden tab), arrow buttons, pill dot indicators, and support for 1–3 visible items. Keyboard: ← → Home End.',
      },
    },
  },
  argTypes: {
    visibleItems: { control: 'select', options: [1, 2, 3] },
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    showDots: { control: 'boolean' },
    gap: { control: 'number' },
    interval: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// ── Slide colors ──────────────────────────────────────────────────────────────

const SLIDES = [
  { bg: '#E8EEFF', color: '#2952CC', label: 'Slide 1 — Design Tokens' },
  { bg: '#DCFCE7', color: '#15803D', label: 'Slide 2 — Components' },
  { bg: '#FEF3C7', color: '#92400E', label: 'Slide 3 — Typography' },
  { bg: '#FEE2E2', color: '#B91C1C', label: 'Slide 4 — Spacing' },
  { bg: '#F3E8FF', color: '#6B21A8', label: 'Slide 5 — Colors' },
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
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: '#9BA5BE', textTransform: 'uppercase' }}>2 visible</p>
        <Carousel visibleItems={2} gap={12}>
          {SLIDES.map((s) => <SlideCard key={s.label} {...s} />)}
        </Carousel>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: '#9BA5BE', textTransform: 'uppercase' }}>3 visible</p>
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
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: '#9BA5BE', textTransform: 'uppercase' }}>{lang}</p>
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
