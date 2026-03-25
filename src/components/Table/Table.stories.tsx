import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, DataTable } from './Table';
import type { SortDirection } from './Table';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';

const meta: Meta<typeof DataTable> = {
  title: 'Components/Table',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Low-level table primitives for full control. **DataTable** adds sorting, loading, and empty states.',
      },
    },
  },
  argTypes: {
    columns: { control: 'object', description: 'Column definitions with `key` and `label`.' },
    data: { control: 'object', description: 'Row objects; keys align with column keys.' },
    isLoading: { control: 'boolean', description: 'Shows a loading state.' },
    emptyMessage: { control: 'text', description: 'Message when `data` is empty.' },
    sortKey: { control: 'text', description: 'Controlled sort column key.' },
    sortDirection: { control: 'select', options: ['asc', 'desc'], description: 'Sort direction.' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Cell padding scale.' },
    isStriped: { control: 'boolean', description: 'Alternating row background.' },
    hasBorder: { control: 'boolean', description: 'Border around the table wrapper.' },
    onSort: { control: false, description: 'Called when a sortable header is activated.' },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// ── Sample data ───────────────────────────────────────────────────────────────

const USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: 'Jan 12, 2024' },
  { id: 2, name: 'Bob Martinez', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: 'Feb 3, 2024' },
  { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: 'Mar 7, 2024' },
  { id: 4, name: 'Dave Kim', email: 'dave@example.com', role: 'Editor', status: 'Active', joined: 'Apr 18, 2024' },
  { id: 5, name: 'Eve Chen', email: 'eve@example.com', role: 'Viewer', status: 'Active', joined: 'May 2, 2024' },
];

const BASE_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'joined', label: 'Joined' },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    columns: BASE_COLUMNS,
    data: USERS as Record<string, unknown>[],
    size: 'md',
    isStriped: false,
    hasBorder: true,
  },
};

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell align="right">Joined</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {USERS.map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell>{u.name}</Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
            <Table.Cell>{u.role}</Table.Cell>
            <Table.Cell align="right">{u.joined}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

// ── Sortable ──────────────────────────────────────────────────────────────────

export const Sortable: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string>('name');
    const [sortDir, setSortDir] = useState<SortDirection>('asc');

    function handleSort(key: string, dir: SortDirection) {
      setSortKey(key);
      setSortDir(dir);
    }

    const sorted = [...USERS].sort((a, b) => {
      const va = String(a[sortKey as keyof typeof a]);
      const vb = String(b[sortKey as keyof typeof b]);
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    return (
      <DataTable
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'role', label: 'Role', sortable: true },
          { key: 'joined', label: 'Joined', sortable: true },
        ]}
        data={sorted as Record<string, unknown>[]}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={handleSort}
      />
    );
  },
};

// ── With Custom Cells ─────────────────────────────────────────────────────────

export const WithCustomCells: Story = {
  render: () => (
    <DataTable
      columns={[
        {
          key: 'name',
          label: 'User',
          render: (val, row) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={String(val)} size="sm" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{String(val)}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{String(row.email)}</div>
              </div>
            </div>
          ),
        },
        {
          key: 'role',
          label: 'Role',
          render: (val) => (
            <Badge
              variant={val === 'Admin' ? 'primary' : val === 'Editor' ? 'warning' : 'default'}
            >
              {String(val)}
            </Badge>
          ),
        },
        {
          key: 'status',
          label: 'Status',
          render: (val) => (
            <Badge variant={val === 'Active' ? 'success' : 'default'}>
              {String(val)}
            </Badge>
          ),
        },
        { key: 'joined', label: 'Joined' },
      ]}
      data={USERS as Record<string, unknown>[]}
    />
  ),
};

// ── Loading ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <DataTable
      columns={BASE_COLUMNS}
      data={[]}
      isLoading
    />
  ),
};

// ── Empty ─────────────────────────────────────────────────────────────────────

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={BASE_COLUMNS}
      data={[]}
      emptyMessage="No users found. Invite your team to get started."
    />
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Bordered, not striped</p>
        <DataTable columns={BASE_COLUMNS} data={USERS as Record<string, unknown>[]} hasBorder isStriped={false} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Striped rows</p>
        <DataTable columns={BASE_COLUMNS} data={USERS as Record<string, unknown>[]} isStriped hasBorder />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DataTable columns={BASE_COLUMNS} data={USERS.slice(0, 3) as Record<string, unknown>[]} size="sm" />
      <DataTable columns={BASE_COLUMNS} data={USERS.slice(0, 3) as Record<string, unknown>[]} size="md" />
      <DataTable columns={BASE_COLUMNS} data={USERS.slice(0, 3) as Record<string, unknown>[]} size="lg" />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Loading</p>
        <DataTable columns={BASE_COLUMNS} data={[]} isLoading />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Empty</p>
        <DataTable columns={BASE_COLUMNS} data={[]} emptyMessage="No rows to display." />
      </div>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'joined', label: 'Joined' },
      ]}
      data={USERS as Record<string, unknown>[]}
      isStriped
    />
  ),
  parameters: { docs: { description: { story: 'Choose Dark in the toolbar color mode control to preview this story.' } } },
};
