import React from 'react';
import styled, { css } from 'styled-components';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: PaginationSize;
}

const BTN_SIZE: Record<PaginationSize, string> = { sm: '28px', md: '36px', lg: '44px' };
const BTN_FONT: Record<PaginationSize, string> = { sm: '12px', md: '14px', lg: '15px' };

function getPageRange(current: number, total: number, siblings: number): (number | '...')[] {
  if (total <= 1) return [1];

  const totalDisplayed = siblings * 2 + 5;
  if (total <= totalDisplayed) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);

  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const count = 3 + siblings * 2;
    return [...Array.from({ length: count }, (_, i) => i + 1), '...', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const count = 3 + siblings * 2;
    return [1, '...', ...Array.from({ length: count }, (_, i) => total - count + i + 1)];
  }

  return [
    1,
    '...',
    ...Array.from({ length: right - left + 1 }, (_, i) => left + i),
    '...',
    total,
  ];
}

const Container = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const PageBtn = styled.button<{
  $size: PaginationSize;
  $isActive?: boolean;
  $isDisabled?: boolean;
  $isIcon?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => BTN_SIZE[$size]};
  height: ${({ $size }) => BTN_SIZE[$size]};
  border-radius: 8px;
  border: none;
  font-size: ${({ $size }) => BTN_FONT[$size]};
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: background-color 150ms ease, color 150ms ease;
  user-select: none;

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: ${theme.colors['color-brand-primary']};
          color: ${theme.colors['color-brand-on-primary']};
        `
      : css`
          background-color: transparent;
          color: ${theme.colors['color-text-secondary']};
          &:hover:not(:disabled) {
            background-color: ${theme.colors['color-bg-muted']};
          }
        `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    `}

  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.12)'};
  }
`;

const Ellipsis = styled.span<{ $size: PaginationSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => BTN_SIZE[$size]};
  height: ${({ $size }) => BTN_SIZE[$size]};
  font-size: ${({ $size }) => BTN_FONT[$size]};
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  user-select: none;
`;

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  size = 'md',
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages, siblingCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <Container aria-label="Pagination">
      {showFirstLast && (
        <PageBtn
          $size={size}
          $isDisabled={isFirst}
          disabled={isFirst}
          onClick={() => onPageChange(1)}
          aria-label="First page"
        >
          <ChevronsLeft size={16} />
        </PageBtn>
      )}

      <PageBtn
        $size={size}
        $isDisabled={isFirst}
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </PageBtn>

      {pages.map((page, i) =>
        page === '...' ? (
          <Ellipsis key={`ellipsis-${i}`} $size={size}>
            …
          </Ellipsis>
        ) : (
          <PageBtn
            key={page}
            $size={size}
            $isActive={page === currentPage}
            onClick={() => onPageChange(page as number)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PageBtn>
        )
      )}

      <PageBtn
        $size={size}
        $isDisabled={isLast}
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </PageBtn>

      {showFirstLast && (
        <PageBtn
          $size={size}
          $isDisabled={isLast}
          disabled={isLast}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
        >
          <ChevronsRight size={16} />
        </PageBtn>
      )}
    </Container>
  );
}
