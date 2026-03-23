import React, { createContext, useContext, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { X } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  title?: string;
  children: React.ReactNode;
}

export interface DrawerHeaderProps {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface DrawerBodyProps {
  children: React.ReactNode;
}

export interface DrawerFooterProps {
  children: React.ReactNode;
}

// ── Context ───────────────────────────────────────────────────────────────────

interface DrawerContextValue {
  titleId: string;
  onClose: () => void;
}

const DrawerContext = createContext<DrawerContextValue>({ titleId: '', onClose: () => {} });
function useDrawerContext() { return useContext(DrawerContext); }

// ── Sizes ─────────────────────────────────────────────────────────────────────

const sideSizeMap: Record<DrawerSize, string> = {
  sm: '320px',
  md: '480px',
  lg: '640px',
  full: '100vw',
};

const stackSizeMap: Record<DrawerSize, string> = {
  sm: '240px',
  md: '360px',
  lg: '480px',
  full: '100vh',
};

// ── Animations ────────────────────────────────────────────────────────────────

const slideInRight = keyframes`from { transform: translateX(100%); } to { transform: translateX(0); }`;
const slideInLeft  = keyframes`from { transform: translateX(-100%); } to { transform: translateX(0); }`;
const slideInTop   = keyframes`from { transform: translateY(-100%); } to { transform: translateY(0); }`;
const slideInBot   = keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`;

const slideOutRight = keyframes`from { transform: translateX(0); } to { transform: translateX(100%); }`;
const slideOutLeft  = keyframes`from { transform: translateX(0); } to { transform: translateX(-100%); }`;
const slideOutTop   = keyframes`from { transform: translateY(0); } to { transform: translateY(-100%); }`;
const slideOutBot   = keyframes`from { transform: translateY(0); } to { transform: translateY(100%); }`;

// ── Styled ────────────────────────────────────────────────────────────────────

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(12, 13, 16, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
`;

function panelAnimation(placement: DrawerPlacement, isOpen: boolean) {
  if (isOpen) {
    if (placement === 'right')  return css`animation: ${slideInRight} 300ms ease forwards;`;
    if (placement === 'left')   return css`animation: ${slideInLeft} 300ms ease forwards;`;
    if (placement === 'top')    return css`animation: ${slideInTop} 300ms ease forwards;`;
    return css`animation: ${slideInBot} 300ms ease forwards;`;
  }
  if (placement === 'right')  return css`animation: ${slideOutRight} 300ms ease forwards;`;
  if (placement === 'left')   return css`animation: ${slideOutLeft} 300ms ease forwards;`;
  if (placement === 'top')    return css`animation: ${slideOutTop} 300ms ease forwards;`;
  return css`animation: ${slideOutBot} 300ms ease forwards;`;
}

function panelPosition(placement: DrawerPlacement, size: DrawerSize) {
  const isSide = placement === 'left' || placement === 'right';
  const dim = isSide ? sideSizeMap[size] : stackSizeMap[size];

  if (placement === 'right')  return css`right: 0; top: 0; bottom: 0; width: ${dim};`;
  if (placement === 'left')   return css`left: 0; top: 0; bottom: 0; width: ${dim};`;
  if (placement === 'top')    return css`top: 0; left: 0; right: 0; height: ${dim};`;
  return css`bottom: 0; left: 0; right: 0; height: ${dim};`;
}

function panelShadow(placement: DrawerPlacement) {
  if (placement === 'right')  return '-24px 0 64px rgba(0,0,0,0.15)';
  if (placement === 'left')   return '24px 0 64px rgba(0,0,0,0.15)';
  if (placement === 'top')    return '0 24px 64px rgba(0,0,0,0.15)';
  return '0 -24px 64px rgba(0,0,0,0.15)';
}

const Panel = styled.div<{
  $placement: DrawerPlacement;
  $size: DrawerSize;
  $isOpen: boolean;
}>`
  position: absolute;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ $placement }) => panelShadow($placement)};
  overflow: hidden;

  @media (prefers-reduced-motion: no-preference) {
    ${({ $placement, $isOpen }) => panelAnimation($placement, $isOpen)}
  }

  ${({ $placement, $size }) => panelPosition($placement, $size)}

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #F0F2F5;
  flex-shrink: 0;

  [data-theme='dark'] &, .dark & {
    border-bottom-color: #2E3550;
  }
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6B7694;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover { background-color: #F0F2F5; color: #111827; }
  &:focus-visible { outline: 2px solid #0055FF; }

  [data-theme='dark'] &, .dark & {
    color: #9BA5BE;
    &:hover { background-color: #2E3550; color: #F0F2F5; }
  }
`;

const StyledBody = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const StyledFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #F0F2F5;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  [data-theme='dark'] &, .dark & {
    border-top-color: #2E3550;
  }
`;

// ── Focus trap ────────────────────────────────────────────────────────────────

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function useFocusTrap(ref: React.RefObject<HTMLDivElement | null>, isOpen: boolean) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const panel = ref.current;
    const first = panel.querySelector<HTMLElement>(FOCUSABLE);
    if (first) first.focus(); else panel.focus();

    function onTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const els = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!els.length) { e.preventDefault(); return; }
      if (e.shiftKey) {
        if (document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus(); }
      } else {
        if (document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus(); }
      }
    }
    panel.addEventListener('keydown', onTab);
    return () => panel.removeEventListener('keydown', onTab);
  }, [isOpen, ref]);
}

// ── Root ──────────────────────────────────────────────────────────────────────

function DrawerRoot({
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  title,
  children,
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // ESC
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    function handler(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeOnEsc, onClose]);

  useFocusTrap(panelRef, isOpen);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <DrawerContext.Provider value={{ titleId, onClose }}>
      <Overlay
        $isOpen={isOpen}
        onClick={(e) => { if (closeOnOverlayClick && e.target === e.currentTarget) onClose(); }}
      >
        <Panel
          ref={panelRef}
          $placement={placement}
          $size={size}
          $isOpen={isOpen}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {title && <DrawerHeader title={title} />}
          {children}
        </Panel>
      </Overlay>
    </DrawerContext.Provider>,
    document.body,
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function DrawerHeader({ title, onClose: onCloseProp, children }: DrawerHeaderProps) {
  const { titleId, onClose } = useDrawerContext();
  const handleClose = onCloseProp ?? onClose;

  return (
    <StyledHeader>
      <div>
        {title && <HeaderTitle id={titleId}>{title}</HeaderTitle>}
        {children}
      </div>
      <CloseButton onClick={handleClose} aria-label="Close drawer">
        <X size={18} />
      </CloseButton>
    </StyledHeader>
  );
}

// ── Body ──────────────────────────────────────────────────────────────────────

function DrawerBody({ children }: DrawerBodyProps) {
  return <StyledBody>{children}</StyledBody>;
}

// ── Footer ────────────────────────────────────────────────────────────────────

function DrawerFooter({ children }: DrawerFooterProps) {
  return <StyledFooter>{children}</StyledFooter>;
}

// ── Compound export ───────────────────────────────────────────────────────────

export const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
});
