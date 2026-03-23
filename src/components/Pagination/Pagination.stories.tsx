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
          'Pagination navigates multi-page content. Automatically collapses middle pages with ellipsis when there are many pages.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    showFirstLast: { control: 'boolean' },
    totalPages: { control: { type: 'number', min: 1, max: 100 } },
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
        <p style={{ fontSize: 12, color: '#9BA5BE' }}>Current page: {page}</p>
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
          <p style={{ fontSize: 11, color: '#9BA5BE', marginBottom: 8, fontWeight: 600 }}>Small (28px)</p>
          <Pagination size="sm" currentPage={a} totalPages={10} onPageChange={setA} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#9BA5BE', marginBottom: 8, fontWeight: 600 }}>Medium (36px)</p>
          <Pagination size="md" currentPage={b} totalPages={10} onPageChange={setB} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#9BA5BE', marginBottom: 8, fontWeight: 600 }}>Large (44px)</p>
          <Pagination size="lg" currentPage={c} totalPages={10} onPageChange={setC} />
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
          <p style={{ fontSize: 11, color: '#9BA5BE', marginBottom: 8, fontWeight: 600 }}>
            Page 1 of 50
          </p>
          <Pagination currentPage={a} totalPages={50} onPageChange={setA} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#9BA5BE', marginBottom: 8, fontWeight: 600 }}>
            Page 8 of 50
          </p>
          <Pagination currentPage={b} totalPages={50} onPageChange={setB} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#9BA5BE', marginBottom: 8, fontWeight: 600 }}>
            Last page of 50
          </p>
          <Pagination currentPage={c} totalPages={50} onPageChange={setC} />
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#9BA5BE', marginBottom: 8, fontWeight: 600 }}>
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

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />;
  },
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
