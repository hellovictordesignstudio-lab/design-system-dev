import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'bottom-start'
  | 'bottom-end';

export interface PopoverProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  placement?: PopoverPlacement;
  children: React.ReactNode;
}

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

export interface PopoverContentProps {
  title?: string;
  width?: number;
  showArrow?: boolean;
  children: React.ReactNode;
}

// ── Context ───────────────────────────────────────────────────────────────────

interface PopoverCtxValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<Element | null>;
  placement: PopoverPlacement;
  popoverId: string;
}

const PopoverCtx = createContext<PopoverCtxValue | null>(null);

function useCtx() {
  const ctx = useContext(PopoverCtx);
  if (!ctx) throw new Error('Popover sub-components must be used inside <Popover>');
  return ctx;
}

// ── Positioning ───────────────────────────────────────────────────────────────

const TRANSFORM_ORIGIN: Record<PopoverPlacement, string> = {
  top: 'bottom center',
  bottom: 'top center',
  left: 'right center',
  right: 'left center',
  'bottom-start': 'top left',
  'bottom-end': 'top right',
};

function computeStyle(rect: DOMRect, placement: PopoverPlacement): React.CSSProperties {
  const GAP = 8;
  switch (placement) {
    case 'bottom-start':
      return { top: rect.bottom + GAP, left: rect.left };
    case 'bottom-end':
      return { top: rect.bottom + GAP, left: rect.right, transform: 'translateX(-100%)' };
    case 'bottom':
      return { top: rect.bottom + GAP, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' };
    case 'top':
      return { top: rect.top - GAP, left: rect.left + rect.width / 2, transform: 'translate(-50%, -100%)' };
    case 'left':
      return { top: rect.top + rect.height / 2, left: rect.left - GAP, transform: 'translate(-100%, -50%)' };
    case 'right':
      return { top: rect.top + rect.height / 2, left: rect.right + GAP, transform: 'translateY(-50%)' };
  }
}

// ── Styled components ─────────────────────────────────────────────────────────

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

// Outer div carries the positional transform; inner Panel carries the animation.
const PosOuter = styled.div`
  position: fixed;
  z-index: 9999;
`;

const Panel = styled.div<{ $placement: PopoverPlacement; $w: number }>`
  width: ${({ $w }) => $w}px;
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  animation: ${scaleIn} 150ms ease forwards;
  transform-origin: ${({ $placement }) => TRANSFORM_ORIGIN[$placement]};
  position: relative;
`;

const ArrowEl = styled.div<{ $placement: PopoverPlacement }>`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  transform: rotate(45deg);

  ${({ $placement }) => {
    switch ($placement) {
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return `
          top: -6px;
          left: 14px;
          border-bottom-color: transparent;
          border-right-color: transparent;
        `;
      case 'top':
        return `
          bottom: -6px;
          left: 14px;
          border-top-color: transparent;
          border-left-color: transparent;
        `;
      case 'left':
        return `
          top: 12px;
          right: -6px;
          border-top-color: transparent;
          border-left-color: transparent;
        `;
      case 'right':
        return `
          top: 12px;
          left: -6px;
          border-bottom-color: transparent;
          border-right-color: transparent;
        `;
    }
  }}
`;

const PanelTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  margin-bottom: 12px;
`;

// ── Sub-components ────────────────────────────────────────────────────────────

function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { toggle, triggerRef, popoverId, isOpen } = useCtx();
  const child = React.Children.only(children);

  return React.cloneElement(
    child as React.ReactElement<React.HTMLAttributes<Element> & { ref?: React.Ref<Element> }>,
    {
      ref: triggerRef as React.Ref<Element>,
      onClick: (e: React.MouseEvent) => {
        toggle();
        (child.props as React.HTMLAttributes<Element>).onClick?.(e as never);
      },
      'aria-haspopup': 'dialog',
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? popoverId : undefined,
    }
  );
}

function PopoverContent({ title, width = 280, showArrow = false, children }: PopoverContentProps) {
  const { isOpen, close, triggerRef, placement, popoverId } = useCtx();
  const [posStyle, setPosStyle] = useState<React.CSSProperties>({});
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    setPosStyle(computeStyle(triggerRef.current.getBoundingClientRect(), placement));
  }, [isOpen, placement, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <PosOuter style={posStyle}>
      <Panel ref={panelRef} $placement={placement} $w={width} id={popoverId} role="dialog">
        {showArrow && <ArrowEl $placement={placement} />}
        {title && <PanelTitle>{title}</PanelTitle>}
        {children}
      </Panel>
    </PosOuter>,
    document.body
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

function PopoverRoot({
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
  children,
}: PopoverProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internal;
  const triggerRef = useRef<Element>(null);
  const popoverId = useId();

  const setOpen = useCallback(
    (v: boolean) => {
      if (controlledOpen === undefined) setInternal(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange]
  );

  const toggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  return (
    <PopoverCtx.Provider value={{ isOpen, toggle, close, triggerRef, placement, popoverId }}>
      {children}
    </PopoverCtx.Provider>
  );
}

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
