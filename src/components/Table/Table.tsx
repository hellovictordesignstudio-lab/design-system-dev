import React, { createContext, useContext } from 'react';
import styled, { css } from 'styled-components';
import { ArrowUpDown, ArrowUp, ArrowDown, Inbox } from 'lucide-react';
import { Skeleton } from '../Skeleton/Skeleton';

export type TableSize = 'sm' | 'md' | 'lg';
export type SortDirection = 'asc' | 'desc';

export interface TableProps {
  children: React.ReactNode;
  isStriped?: boolean;
  hasBorder?: boolean;
  size?: TableSize;
  isFullWidth?: boolean;
}

export interface TableHeadProps { children: React.ReactNode }
export interface TableBodyProps { children: React.ReactNode }
export interface TableRowProps {
  children: React.ReactNode;
  onClick?: () => void;
}
export interface TableCellProps {
  children?: React.ReactNode;
  colSpan?: number;
  align?: 'left' | 'center' | 'right';
}
export interface TableHeaderCellProps {
  children?: React.ReactNode;
  sortable?: boolean;
  sortDirection?: SortDirection | null;
  onSort?: () => void;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface DataTableProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onSort?: (key: string, direction: SortDirection) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  size?: TableSize;
  isStriped?: boolean;
  hasBorder?: boolean;
}

// ── Context ───────────────────────────────────────────────────────────────────

interface TableCtxValue {
  size: TableSize;
  isStriped: boolean;
}

const TableCtx = createContext<TableCtxValue>({ size: 'md', isStriped: false });

// ── Constants ─────────────────────────────────────────────────────────────────

const CELL_PAD: Record<TableSize, string> = {
  sm: '8px 12px',
  md: '12px 16px',
  lg: '16px 20px',
};

// ── Styled components ─────────────────────────────────────────────────────────

const TableWrapper = styled.div<{ $hasBorder: boolean; $isFullWidth: boolean }>`
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  border: ${({ $hasBorder }) => ($hasBorder ? '1px solid #E2E5ED' : '1px solid #E2E5ED')};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const StyledTable = styled.table<{ $isStriped: boolean; $isFullWidth: boolean }>`
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  border-collapse: collapse;

  ${({ $isStriped }) =>
    $isStriped &&
    css`
      tbody tr:nth-child(even) {
        background-color: #fafbfc;
      }
    `}
`;

const StyledThead = styled.thead`
  background: #f8f9fc;
`;

const StyledTbody = styled.tbody``;

const StyledTr = styled.tr<{ $isClickable: boolean }>`
  border-bottom: 1px solid #f0f2f5;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  transition: background-color 100ms ease;

  &:last-child {
    border-bottom: none;
  }

  tbody &:hover {
    background-color: #f8f9fc;
  }
`;

const StyledTh = styled.th<{ $size: TableSize; $align: string; $sortable: boolean; $width?: string }>`
  padding: ${({ $size }) => CELL_PAD[$size]};
  text-align: ${({ $align }) => $align};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9ba5be;
  white-space: nowrap;
  width: ${({ $width }) => $width ?? 'auto'};
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    color: ${({ $sortable }) => ($sortable ? '#6b7694' : '#9ba5be')};
  }
`;

const ThInner = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const SortIcon = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ $active }) => ($active ? '#0055ff' : '#c5cbda')};
`;

const StyledTd = styled.td<{ $size: TableSize; $align: string }>`
  padding: ${({ $size }) => CELL_PAD[$size]};
  text-align: ${({ $align }) => $align};
  font-size: 14px;
  color: #111827;
  vertical-align: middle;
`;

const EmptyCell = styled.td`
  padding: 48px 24px;
  text-align: center;
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #9ba5be;
  font-size: 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

// ── Sub-components ────────────────────────────────────────────────────────────

function TableHead({ children }: TableHeadProps) {
  return <StyledThead>{children}</StyledThead>;
}

function TableBody({ children }: TableBodyProps) {
  return <StyledTbody>{children}</StyledTbody>;
}

function TableRow({ children, onClick }: TableRowProps) {
  return <StyledTr $isClickable={!!onClick} onClick={onClick}>{children}</StyledTr>;
}

function TableCell({ children, colSpan, align = 'left' }: TableCellProps) {
  const { size } = useContext(TableCtx);
  return (
    <StyledTd $size={size} $align={align} colSpan={colSpan}>
      {children}
    </StyledTd>
  );
}

function TableHeaderCell({
  children,
  sortable = false,
  sortDirection,
  onSort,
  width,
  align = 'left',
}: TableHeaderCellProps) {
  const { size } = useContext(TableCtx);

  const icon =
    sortable ? (
      <SortIcon $active={!!sortDirection}>
        {sortDirection === 'asc' ? (
          <ArrowUp size={13} />
        ) : sortDirection === 'desc' ? (
          <ArrowDown size={13} />
        ) : (
          <ArrowUpDown size={13} />
        )}
      </SortIcon>
    ) : null;

  return (
    <StyledTh
      $size={size}
      $align={align}
      $sortable={sortable}
      $width={width}
      onClick={sortable ? onSort : undefined}
    >
      <ThInner>
        {children}
        {icon}
      </ThInner>
    </StyledTh>
  );
}

// ── Table root ────────────────────────────────────────────────────────────────

function TableRoot({
  children,
  isStriped = false,
  hasBorder = true,
  size = 'md',
  isFullWidth = true,
}: TableProps) {
  return (
    <TableCtx.Provider value={{ size, isStriped }}>
      <TableWrapper $hasBorder={hasBorder} $isFullWidth={isFullWidth}>
        <StyledTable $isStriped={isStriped} $isFullWidth={isFullWidth}>
          {children}
        </StyledTable>
      </TableWrapper>
    </TableCtx.Provider>
  );
}

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
});

// ── DataTable ─────────────────────────────────────────────────────────────────

export function DataTable({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data to display',
  onSort,
  sortKey,
  sortDirection,
  size = 'md',
  isStriped = false,
  hasBorder = true,
}: DataTableProps) {
  function handleSort(colKey: string) {
    if (!onSort) return;
    if (sortKey === colKey) {
      onSort(colKey, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(colKey, 'asc');
    }
  }

  return (
    <Table size={size} isStriped={isStriped} hasBorder={hasBorder}>
      <Table.Head>
        <Table.Row>
          {columns.map((col) => (
            <Table.HeaderCell
              key={col.key}
              sortable={col.sortable}
              sortDirection={sortKey === col.key ? (sortDirection ?? null) : null}
              onSort={col.sortable ? () => handleSort(col.key) : undefined}
              width={col.width}
              align={col.align}
            >
              {col.label}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {isLoading ? (
          Array.from({ length: 4 }, (_, i) => (
            <Table.Row key={`sk-${i}`}>
              {columns.map((col) => (
                <Table.Cell key={col.key}>
                  <Skeleton height="14px" borderRadius="6px" />
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : data.length === 0 ? (
          <tr>
            <EmptyCell colSpan={columns.length}>
              <EmptyContent>
                <Inbox size={32} strokeWidth={1.5} />
                <span>{emptyMessage}</span>
              </EmptyContent>
            </EmptyCell>
          </tr>
        ) : (
          data.map((row, i) => (
            <Table.Row key={i}>
              {columns.map((col) => (
                <Table.Cell key={col.key} align={col.align}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
}
