import styled, { keyframes, css } from 'styled-components';
import type { ModalSize, ModalFooterAlign } from './Modal.types';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// ── Size map ──────────────────────────────────────────────────────────────────

const sizeMaxWidth: Record<ModalSize, string> = {
  sm: '400px',
  md: '560px',
  lg: '720px',
  xl: '900px',
  fullscreen: '100vw',
};

// ── Overlay ───────────────────────────────────────────────────────────────────

export const Overlay = styled.div<{ $isFullscreen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: ${({ $isFullscreen }) => ($isFullscreen ? 'stretch' : 'center')};
  justify-content: ${({ $isFullscreen }) => ($isFullscreen ? 'stretch' : 'center')};
  padding: ${({ $isFullscreen }) => ($isFullscreen ? '0' : '40px 16px')};
  background: rgba(12, 13, 16, 0.6);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 200ms ease forwards;
  ${reducedMotion}
`;

// ── Panel ─────────────────────────────────────────────────────────────────────

export const Panel = styled.div<{ $size: ModalSize }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.20);
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  outline: none;
  width: 100%;
  max-width: ${({ $size }) => sizeMaxWidth[$size]};
  border-radius: ${({ $size }) => ($size === 'fullscreen' ? '0' : '20px')};
  max-height: ${({ $size }) => ($size === 'fullscreen' ? '100vh' : 'calc(100vh - 80px)')};
  height: ${({ $size }) => ($size === 'fullscreen' ? '100vh' : 'auto')};
  animation: ${scaleIn} 200ms ease forwards;
  ${reducedMotion}
`;

// ── Modal.Header ──────────────────────────────────────────────────────────────

export const StyledModalHeader = styled.div<{ $hasDivider: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 24px;
  flex-shrink: 0;

  ${({ $hasDivider, theme }) =>
    $hasDivider &&
    css`
      border-bottom: 1px solid ${theme.colors['color-border-default']};
    `}
`;

export const ModalHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors['color-text-primary']};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const ModalSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut},
    color ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut};

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
    color: ${({ theme }) => theme.colors['color-text-primary']};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  }
`;

// ── Modal.Body ────────────────────────────────────────────────────────────────

export const StyledModalBody = styled.div<{ $isScrollable: boolean }>`
  flex: 1;
  padding: 24px;
  overflow-y: ${({ $isScrollable }) => ($isScrollable ? 'auto' : 'visible')};
  /* min-height: 0 lets the flex child shrink so overflow-y kicks in */
  min-height: 0;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

// ── Modal.Footer ──────────────────────────────────────────────────────────────

const footerJustifyMap: Record<ModalFooterAlign, string> = {
  left: 'flex-start',
  right: 'flex-end',
  'space-between': 'space-between',
};

export const StyledModalFooter = styled.div<{
  $hasDivider: boolean;
  $align: ModalFooterAlign;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 24px;
  flex-shrink: 0;
  justify-content: ${({ $align }) => footerJustifyMap[$align]};

  ${({ $hasDivider, theme }) =>
    $hasDivider &&
    css`
      border-top: 1px solid ${theme.colors['color-border-default']};
    `}
`;
