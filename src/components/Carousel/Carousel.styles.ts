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
  border: 1px solid #E2E5ED;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(4px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  z-index: 2;
  transition: opacity 200ms ease, background-color 150ms ease, transform 150ms ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  outline: none;

  &:hover { background: #ffffff; transform: translateY(-50%) scale(1.05); }
  &:focus-visible { box-shadow: 0 0 0 3px rgba(0,85,255,0.2); }

  [data-theme='dark'] &, .dark & {
    background: rgba(30,31,50,0.9);
    border-color: #2E3550;
    color: #F0F2F5;
    &:hover { background: #1A1F35; }
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
  background-color: ${({ $isActive }) => ($isActive ? '#0055FF' : '#C8D4E8')};
  height: 6px;
  width: ${({ $isActive }) => ($isActive ? '20px' : '6px')};
  transition: width 200ms ease, background-color 200ms ease;
  outline: none;

  &:focus-visible { box-shadow: 0 0 0 3px rgba(0,85,255,0.3); }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 200ms ease;
  }

  [data-theme='dark'] &, .dark & {
    background-color: ${({ $isActive }) => ($isActive ? '#0055FF' : '#2E3550')};
  }
`;
