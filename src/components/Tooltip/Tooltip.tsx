import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  isDisabled?: boolean;
  maxWidth?: number;
  children: React.ReactElement;
}

interface TooltipPos {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

const fadeScale = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const Box = styled.div<{ $maxWidth: number; $placement: TooltipPlacement }>`
  position: fixed;
  z-index: 9999;
  background: #111827;
  color: #ffffff;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  pointer-events: none;
  white-space: normal;
  word-break: break-word;
  line-height: 1.5;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  animation: ${fadeScale} 150ms ease forwards;
  transform-origin: ${({ $placement }) => {
    switch ($placement) {
      case 'top':    return 'center bottom';
      case 'bottom': return 'center top';
      case 'left':   return 'right center';
      case 'right':  return 'left center';
    }
  }};

  &::after {
    content: '';
    position: absolute;
    border: 6px solid transparent;
    ${({ $placement }) => {
      switch ($placement) {
        case 'top':
          return `
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: #111827;
          `;
        case 'bottom':
          return `
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-color: #111827;
          `;
        case 'left':
          return `
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            border-left-color: #111827;
          `;
        case 'right':
          return `
            top: 50%;
            right: 100%;
            transform: translateY(-50%);
            border-right-color: #111827;
          `;
      }
    }}
  }
`;

const OFFSET = 10;

function computePos(rect: DOMRect, placement: TooltipPlacement): React.CSSProperties {
  switch (placement) {
    case 'top':
      return {
        top: rect.top - OFFSET,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, -100%)',
      };
    case 'bottom':
      return {
        top: rect.bottom + OFFSET,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, 0)',
      };
    case 'left':
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - OFFSET,
        transform: 'translate(-100%, -50%)',
      };
    case 'right':
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + OFFSET,
        transform: 'translate(0, -50%)',
      };
  }
}

export function Tooltip({
  content,
  placement = 'top',
  delay = 300,
  isDisabled = false,
  maxWidth = 220,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<React.CSSProperties>({});
  const triggerRef = useRef<Element>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    if (isDisabled) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (triggerRef.current) {
        setPos(computePos(triggerRef.current.getBoundingClientRect(), placement));
      }
      setVisible(true);
    }, delay);
  }, [isDisabled, delay, placement]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const child = React.Children.only(children);

  const trigger = React.cloneElement(child, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      child.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      child.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      child.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      child.props.onBlur?.(e);
    },
  } as React.HTMLAttributes<Element> & { ref: React.Ref<Element> });

  return (
    <>
      {trigger}
      {visible &&
        createPortal(
          <Box role="tooltip" style={pos} $maxWidth={maxWidth} $placement={placement}>
            {content}
          </Box>,
          document.body
        )}
    </>
  );
}
