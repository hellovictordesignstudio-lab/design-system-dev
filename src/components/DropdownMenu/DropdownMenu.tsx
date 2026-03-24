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
import styled from 'styled-components';
import {
  MenuItem,
  MenuItemIcon,
  MenuItemLabel,
  MenuItemShortcut,
  MenuLabel,
  MenuPanel,
  MenuSeparator,
} from '../ContextMenu/ContextMenu.styles';
import type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPlacement,
  DropdownMenuProps,
  DropdownMenuSeparatorProps,
  DropdownMenuTriggerProps,
} from './DropdownMenu.types';

interface Ctx {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  placement: DropdownMenuPlacement;
  menuId: string;
  focusTrigger: () => void;
}

const DropdownCtx = createContext<Ctx | null>(null);

function useDropdown() {
  const c = useContext(DropdownCtx);
  if (!c) throw new Error('DropdownMenu parts must be used inside <DropdownMenu>');
  return c;
}

function computePosition(
  rect: DOMRect,
  placement: DropdownMenuPlacement,
  panelW: number,
  offset: number
): React.CSSProperties {
  const GAP = offset;
  switch (placement) {
    case 'bottom-start':
      return { top: rect.bottom + GAP, left: rect.left };
    case 'bottom-end':
      return { top: rect.bottom + GAP, left: rect.right - panelW };
    case 'bottom':
      return { top: rect.bottom + GAP, left: rect.left + rect.width / 2 - panelW / 2 };
    case 'top-start':
      return { top: rect.top - GAP, left: rect.left, transform: 'translateY(-100%)' };
    case 'top-end':
      return { top: rect.top - GAP, left: rect.right - panelW, transform: 'translateY(-100%)' };
    case 'top':
      return {
        top: rect.top - GAP,
        left: rect.left + rect.width / 2 - panelW / 2,
        transform: 'translateY(-100%)',
      };
    default:
      return { top: rect.bottom + GAP, left: rect.left };
  }
}

const PortalOuter = styled.div`
  position: fixed;
  z-index: 10000;
`;

function DropdownMenuRoot({
  isOpen: controlled,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
  children,
}: DropdownMenuProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const isOpen = controlled !== undefined ? controlled : internal;
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuId = useId();

  const setOpen = useCallback(
    (v: boolean) => {
      if (controlled === undefined) setInternal(v);
      onOpenChange?.(v);
    },
    [controlled, onOpenChange]
  );

  const toggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  const focusTrigger = useCallback(() => {
    requestAnimationFrame(() => {
      const wrap = triggerRef.current;
      if (!wrap) return;
      const focusable = wrap.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    });
  }, []);

  return (
    <DropdownCtx.Provider
      value={{ isOpen, setOpen, toggle, triggerRef, placement, menuId, focusTrigger }}
    >
      {children}
    </DropdownCtx.Provider>
  );
}

const TriggerWrap = styled.span`
  display: inline-flex;
  align-items: center;
`;

function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const { toggle, triggerRef, menuId, isOpen } = useDropdown();
  const child = React.Children.only(children);

  return (
    <TriggerWrap ref={triggerRef as React.RefObject<HTMLSpanElement>}>
      {React.cloneElement(
        child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        {
          onClick: (e: React.MouseEvent) => {
            toggle();
            (child.props as React.HTMLAttributes<HTMLElement>).onClick?.(e as never);
          },
          'aria-haspopup': 'menu',
          'aria-expanded': isOpen,
          'aria-controls': isOpen ? menuId : undefined,
        }
      )}
    </TriggerWrap>
  );
}

function DropdownMenuContent({
  children,
  width = 220,
  offset = 6,
}: DropdownMenuContentProps) {
  const { isOpen, setOpen, triggerRef, placement, menuId, focusTrigger } = useDropdown();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setStyle(computePosition(rect, placement, width, offset));
  }, [isOpen, placement, width, offset, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        setOpen(false);
        focusTrigger();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        focusTrigger();
      }
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, setOpen, triggerRef, focusTrigger]);

  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      first?.focus();
    });
  }, [isOpen]);

  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Tab') {
      setOpen(false);
      focusTrigger();
      return;
    }
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      ) ?? []
    );
    if (items.length === 0) return;

    const active = document.activeElement as HTMLElement;
    let idx = items.indexOf(active);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items[idx < 0 ? 0 : (idx + 1) % items.length];
      next?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = items[idx < 0 ? items.length - 1 : (idx - 1 + items.length) % items.length];
      next?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <PortalOuter style={style}>
      <MenuPanel
        ref={panelRef}
        id={menuId}
        role="menu"
        tabIndex={-1}
        style={{ minWidth: width, width }}
        onKeyDown={handleMenuKeyDown}
      >
        {children}
      </MenuPanel>
    </PortalOuter>,
    document.body
  );
}

function DropdownMenuItem({
  children,
  icon,
  shortcut,
  isDisabled,
  isDestructive,
  onSelect,
}: DropdownMenuItemProps) {
  const { setOpen, focusTrigger } = useDropdown();

  return (
    <MenuItem
      role="menuitem"
      tabIndex={-1}
      aria-disabled={isDisabled ? true : undefined}
      $destructive={!!isDestructive}
      $disabled={!!isDisabled}
      onClick={() => {
        if (isDisabled) return;
        onSelect?.();
        setOpen(false);
        focusTrigger();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isDisabled) {
            onSelect?.();
            setOpen(false);
            focusTrigger();
          }
        }
      }}
    >
      {icon && <MenuItemIcon>{icon}</MenuItemIcon>}
      <MenuItemLabel>{children}</MenuItemLabel>
      {shortcut && <MenuItemShortcut>{shortcut}</MenuItemShortcut>}
    </MenuItem>
  );
}

function DropdownMenuSeparator(_props: DropdownMenuSeparatorProps) {
  return <MenuSeparator role="separator" />;
}

function DropdownMenuLabel({ children }: DropdownMenuLabelProps) {
  return <MenuLabel>{children}</MenuLabel>;
}

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  Label: DropdownMenuLabel,
});

export const Menu = DropdownMenu;
