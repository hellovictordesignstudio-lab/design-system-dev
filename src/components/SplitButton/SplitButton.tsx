import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { ChevronDown, Loader2 } from 'lucide-react';
import {
  MenuItem,
  MenuItemIcon,
  MenuItemLabel,
  MenuPanel,
} from '../ContextMenu/ContextMenu.styles';
import type { SplitButtonProps, SplitButtonSize, SplitButtonVariant } from './SplitButton.types';

const sizeStyles = {
  sm: css`
    height: 32px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    gap: ${({ theme }) => theme.spacing[1]};
  `,
  md: css`
    height: 40px;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
  lg: css`
    height: 48px;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    gap: ${({ theme }) => theme.spacing[2]};
  `,
};

const variantStyles = {
  primary: css`
    background-color: #0055ff;
    color: #ffffff;
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: #0044cc;
    }
  `,
  secondary: css`
    background-color: transparent;
    color: #0055ff;
    border: 1.5px solid #0055ff;
    &:hover:not(:disabled) {
      background-color: rgba(0, 85, 255, 0.06);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: #6b7694;
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: #f0f2f5;
    }
  `,
  danger: css`
    background-color: #d22232;
    color: #ffffff;
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: #b01c29;
    }
  `,
};

const Root = styled.div<{ $fullWidth: boolean }>`
  display: inline-flex;
  align-items: stretch;
  position: relative;
  border-radius: 9999px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const segmentBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  border: none;
  font-family: inherit;
  transition:
    background-color ${({ theme }) => theme.transitions.duration.base}
      ${({ theme }) => theme.transitions.easing.easeInOut},
    color ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut};

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const PrimaryBtn = styled.button<{
  $variant: SplitButtonVariant;
  $size: SplitButtonSize;
  $isLoading: boolean;
}>`
  ${segmentBase}
  flex: 1;
  min-width: 0;
  border-radius: 9999px 0 0 9999px;
  padding: 0 16px;
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: wait;
      pointer-events: none;
      > *:not(.btn-spinner) {
        opacity: 0;
      }
    `}
`;

const MenuBtn = styled.button<{
  $variant: SplitButtonVariant;
  $size: SplitButtonSize;
}>`
  ${segmentBase}
  flex-shrink: 0;
  border-radius: 0 9999px 9999px 0;
  padding: 0 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.35);
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      border-left-color: rgba(0, 85, 255, 0.35);
    `}
  ${({ $variant }) =>
    ($variant === 'ghost' || $variant === 'secondary') &&
    css`
      border-left-color: #dde1ea;
    `}
`;

const SpinnerWrapper = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: spin 0.8s linear infinite;
  }
`;

const iconSize: Record<SplitButtonSize, number> = { sm: 14, md: 16, lg: 18 };

const PanelPortal = styled.div`
  position: fixed;
  z-index: 10000;
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export function SplitButton({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  fullWidth = false,
  primaryLabel,
  menuItems,
  onMenuItemSelect,
  menuTriggerAriaLabel = 'Open menu',
  disabled,
  onClick,
  className,
  ...restBtn
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<React.CSSProperties>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: Math.min(rect.right - 220, window.innerWidth - 228),
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !triggerRef.current?.contains(t)) close();
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
  }, [open]);

  function close() {
    setOpen(false);
  }

  function toggle() {
    if (disabled || isLoading) return;
    setOpen((o) => !o);
  }

  function handleMenuItem(id: string) {
    onMenuItemSelect?.(id);
    close();
    triggerRef.current?.focus();
  }

  return (
    <Root $fullWidth={fullWidth} className={className}>
      <PrimaryBtn
        $variant={variant}
        $size={size}
        $isLoading={isLoading}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...restBtn}
        type="button"
      >
        {isLoading && (
          <SpinnerWrapper className="btn-spinner">
            <Loader2 size={iconSize[size]} />
          </SpinnerWrapper>
        )}
        {leftIcon && !isLoading && <IconWrap>{leftIcon}</IconWrap>}
        {primaryLabel}
      </PrimaryBtn>

      <MenuBtn
        ref={triggerRef}
        type="button"
        $variant={variant}
        $size={size}
        disabled={disabled || isLoading}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={menuTriggerAriaLabel}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        <ChevronDown size={iconSize[size]} />
      </MenuBtn>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <PanelPortal ref={menuRef} style={pos}>
            <MenuPanel id={listId} role="menu">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  role="menuitem"
                  $destructive={!!item.isDestructive}
                  $disabled={!!item.isDisabled}
                  onClick={() => !item.isDisabled && handleMenuItem(item.id)}
                >
                  {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
                  <MenuItemLabel>{item.label}</MenuItemLabel>
                </MenuItem>
              ))}
            </MenuPanel>
          </PanelPortal>,
          document.body
        )}
    </Root>
  );
}
