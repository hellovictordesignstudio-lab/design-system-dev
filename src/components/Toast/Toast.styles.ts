import styled, { keyframes, css } from 'styled-components';
import type { ToastVariant, ToastPosition } from './Toast.types';

// ── Variant config (hardcoded primitives — no semantic token exists for these) ─

export const variantConfig: Record<
  ToastVariant,
  { lightBg: string; darkBg: string; accent: string; border: string }
> = {
  success: {
    lightBg: '#E6F5EE',
    darkBg:  'rgba(10, 136, 83, 0.12)',
    accent:  '#0A8853',
    border:  'rgba(10, 136, 83, 0.30)',
  },
  error: {
    lightBg: '#FCEAEC',
    darkBg:  'rgba(210, 34, 50, 0.12)',
    accent:  '#D22232',
    border:  'rgba(210, 34, 50, 0.30)',
  },
  warning: {
    lightBg: '#FEF2EB',
    darkBg:  'rgba(240, 115, 50, 0.12)',
    accent:  '#F07332',
    border:  'rgba(240, 115, 50, 0.30)',
  },
  info: {
    lightBg: '#E6EEFF',
    darkBg:  'rgba(0, 85, 255, 0.12)',
    accent:  '#0055FF',
    border:  'rgba(0, 85, 255, 0.30)',
  },
};

// ── Animations ────────────────────────────────────────────────────────────────

const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(60px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const slideOutToRight = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(60px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const progressShrink = keyframes`
  from { width: 100%; }
  to   { width: 0%; }
`;

// ── Toast card ────────────────────────────────────────────────────────────────

export const ToastCard = styled.div<{ $variant: ToastVariant; $isExiting: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 360px;
  padding: 14px 16px 17px; /* extra 3px bottom for progress bar */
  border-radius: 14px;
  border: 1px solid ${({ $variant }) => variantConfig[$variant].border};
  border-left: 4px solid ${({ $variant }) => variantConfig[$variant].accent};
  background-color: ${({ theme, $variant }) =>
    theme.mode === 'dark'
      ? variantConfig[$variant].darkBg
      : variantConfig[$variant].lightBg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  overflow: hidden;
  cursor: default;

  /* Enter / exit animations */
  animation: ${({ $isExiting }) =>
    $isExiting
      ? css`${slideOutToRight} 200ms ease-in forwards`
      : css`${slideInFromRight} 250ms ease-out forwards`};

  @media (prefers-reduced-motion: reduce) {
    animation: ${({ $isExiting }) =>
      $isExiting
        ? css`${fadeOut} 200ms ease-in forwards`
        : css`${fadeIn} 250ms ease-out forwards`};
  }
`;

export const IconSlot = styled.span<{ $variant: ToastVariant }>`
  display: flex;
  flex-shrink: 0;
  margin-top: 1px;
  color: ${({ $variant }) => variantConfig[$variant].accent};
`;

export const ContentSlot = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ToastTitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors['color-text-primary']};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const ToastMessage = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const DismissButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  margin-top: 1px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 150ms ease, background-color 150ms ease;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.06);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  }
`;

export const ProgressBar = styled.div<{
  $variant: ToastVariant;
  $duration: number;
  $isPaused: boolean;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: ${({ $variant }) => variantConfig[$variant].accent};
  opacity: 0.5;
  animation: ${progressShrink} ${({ $duration }) => $duration}ms linear forwards;
  animation-play-state: ${({ $isPaused }) => ($isPaused ? 'paused' : 'running')};

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

// ── Position group (one per active position) ──────────────────────────────────

const positionCSS: Record<ToastPosition, ReturnType<typeof css>> = {
  'top-right':    css`top: 20px; right: 20px;`,
  'top-center':   css`top: 20px; left: 50%; transform: translateX(-50%);`,
  'bottom-right': css`bottom: 20px; right: 20px;`,
  'bottom-center':css`bottom: 20px; left: 50%; transform: translateX(-50%);`,
};

export const PositionGroup = styled.div<{ $position: ToastPosition }>`
  position: fixed;
  z-index: 1500;
  display: flex;
  flex-direction: ${({ $position }) =>
    $position.startsWith('bottom') ? 'column-reverse' : 'column'};
  gap: 8px;
  /* Let clicks pass through gaps between toasts */
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  ${({ $position }) => positionCSS[$position]}
`;
