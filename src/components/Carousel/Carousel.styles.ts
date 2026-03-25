import styled, { css } from 'styled-components';

export const Root = styled.div`
  position: relative;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export const Viewport = styled.div`
  overflow: hidden;
  border-radius: 14px;
`;

export const Track = styled.div<{ $gap: number; $visibleItems: number }>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Slide = styled.div<{ $gap: number; $visibleItems: number }>`
  flex: 0 0 calc(
    (100% - ${({ $gap, $visibleItems }) => $gap * ($visibleItems - 1)}px) /
    ${({ $visibleItems }) => $visibleItems}
  );
  min-width: 0;
`;

// ── Arrows ────────────────────────────────────────────────────────────────────

export const ArrowBtn = styled.button<{ $side: 'left' | 'right'; $visible: boolean }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(30, 31, 50, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(4px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: 2;
  transition: opacity 200ms ease, background-color 150ms ease, transform 150ms ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.colors['color-bg-default']};
    transform: translateY(-50%) scale(1.05);
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.2)'};
  }
`;

// ── Dots ──────────────────────────────────────────────────────────────────────

export const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
`;

export const Dot = styled.button<{ $isActive: boolean }>`
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 9999px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors['color-brand-primary'] : theme.colors['color-border-strong']};
  height: 6px;
  width: ${({ $isActive }) => ($isActive ? '20px' : '6px')};
  transition: width 200ms ease, background-color 200ms ease;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.45)' : 'rgba(0, 85, 255, 0.3)'};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 200ms ease;
  }
`;
