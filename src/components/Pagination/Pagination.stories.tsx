import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Moves through multi-page lists. Collapses middle pages with an ellipsis when the page count is large.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Control and label size.' },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Page buttons shown on each side of the current page.',
    },
    showFirstLast: { control: 'boolean', description: 'Shows first and last page buttons.' },
    totalPages: { control: { type: 'number', min: 1, max: 100 }, description: 'Total number of pages.' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage ?? 1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Pagination {...args} currentPage={page} onPageChange={setPage} />
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Current page: {page}</p>
      </div>
    );
  },
  args: {
    totalPages: 10,
    currentPage: 1,
    size: 'md',
    siblingCount: 1,
    showFirstLast: true,
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState(3);
    const [b, setB] = useState(3);
    const [c, setC] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Small (28px)</p>
          <Pagination size="sm" currentPage={a} totalPages={10} onPageChange={setA} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Medium (36px)</p>
          <Pagination size="md" currentPage={b} totalPages={10} onPageChange={setB} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Large (44px)</p>
          <Pagination size="lg" currentPage={c} totalPages={10} onPageChange={setC} />
        </div>
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [p1, setP1] = useState(3);
    const [p2, setP2] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>With first/last</p>
          <Pagination size="md" currentPage={p1} totalPages={10} onPageChange={setP1} showFirstLast />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Without first/last</p>
          <Pagination size="md" currentPage={p2} totalPages={10} onPageChange={setP2} showFirstLast={false} />
        </div>
      </div>
    );
  },
};

// ── Many Pages ────────────────────────────────────────────────────────────────

export const ManyPages: Story = {
  render: () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(8);
    const [c, setC] = useState(50);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>
            Page 1 of 50
          </p>
          <Pagination currentPage={a} totalPages={50} onPageChange={setA} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>
            Page 8 of 50
          </p>
          <Pagination currentPage={b} totalPages={50} onPageChange={setB} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>
            Last page of 50
          </p>
          <Pagination currentPage={c} totalPages={50} onPageChange={setC} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>
            No first/last buttons, sibling=2
          </p>
          <Pagination
            currentPage={25}
            totalPages={100}
            onPageChange={() => {}}
            siblingCount={2}
            showFirstLast={false}
          />
        </div>
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(5);
    const [c, setC] = useState(12);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>First page</p>
          <Pagination currentPage={a} totalPages={10} onPageChange={setA} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Middle page</p>
          <Pagination currentPage={b} totalPages={10} onPageChange={setB} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Last page</p>
          <Pagination currentPage={c} totalPages={12} onPageChange={setC} />
        </div>
      </div>
    );
  },
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, borderRadius: 12 }}>
        <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
      </div>
    );
  },
  parameters: { backgrounds: { default: 'dark' } },
};
