import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight } from 'lucide-react';
import type { ContextMenuProps, ContextMenuItemDef } from './ContextMenu.types';
import {
  MenuPanel,
  MenuItem,
  MenuItemIcon,
  MenuItemLabel,
  MenuItemShortcut,
  MenuItemArrow,
  MenuSeparator,
  MenuLabel,
  SubPanel,
} from './ContextMenu.styles';

// ── Sub-menu item ─────────────────────────────────────────────────────────────

interface SubItemProps {
  item: ContextMenuItemDef;
  onClose: () => void;
}

function SubMenuItem({ item, onClose }: SubItemProps) {
  const [subStyle, setSubStyle] = useState<React.CSSProperties | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openSub() {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const subW = 220;
    const left = rect.right + 4 + subW > window.innerWidth ? rect.left - subW - 4 : rect.right + 4;
    setSubStyle({ position: 'fixed', left, top: rect.top, zIndex: 10000 });
  }

  function closeSub() { setSubStyle(null); }

  function onMouseEnter() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(openSub, 150);
  }

  function onMouseLeave() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(closeSub, 100);
  }

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <MenuItem
        ref={rowRef}
        $destructive={false}
        $disabled={!!item.disabled}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={!!subStyle}
      >
        {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
        <MenuItemLabel>{item.label}</MenuItemLabel>
        <MenuItemArrow><ChevronRight size={14} /></MenuItemArrow>
      </MenuItem>

      {subStyle && item.items && typeof document !== 'undefined' && createPortal(
        <div
          style={subStyle}
          onMouseEnter={() => { if (timerRef.current) clearTimeout(timerRef.current); }}
          onMouseLeave={onMouseLeave}
        >
          <SubPanel role="menu">
            <MenuItemsList items={item.items} onClose={onClose} />
          </SubPanel>
        </div>,
        document.body,
      )}
    </div>
  );
}

// ── Items list ────────────────────────────────────────────────────────────────

interface MenuItemsListProps {
  items: ContextMenuItemDef[];
  onClose: () => void;
}

function MenuItemsList({ items, onClose }: MenuItemsListProps) {
  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'separator') {
          return <MenuSeparator key={i} role="separator" />;
        }
        if (item.type === 'label') {
          return <MenuLabel key={i}>{item.label}</MenuLabel>;
        }
        if (item.type === 'sub') {
          return <SubMenuItem key={i} item={item} onClose={onClose} />;
        }
        // Default: item
        return (
          <MenuItem
            key={i}
            $destructive={!!item.destructive}
            $disabled={!!item.disabled}
            role="menuitem"
            onClick={() => {
              if (item.disabled) return;
              item.onAction?.();
              onClose();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!item.disabled) { item.onAction?.(); onClose(); }
              }
            }}
            tabIndex={item.disabled ? -1 : 0}
          >
            {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
            <MenuItemLabel>{item.label}</MenuItemLabel>
            {item.shortcut && <MenuItemShortcut>{item.shortcut}</MenuItemShortcut>}
          </MenuItem>
        );
      })}
    </>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export function ContextMenu({ children, items, onOpenChange }: ContextMenuProps) {
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setMenuStyle(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  // Click outside + ESC + scroll
  useEffect(() => {
    if (!menuStyle) return;

    function onMouseDown(e: MouseEvent) {
      if (!panelRef.current?.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const items = panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        items?.[0]?.focus();
      }
    }
    function onScroll() { close(); }

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [menuStyle, close]);

  // Arrow key navigation within panel
  useEffect(() => {
    if (!menuStyle || !panelRef.current) return;
    const panel = panelRef.current;

    function onKey(e: KeyboardEvent) {
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])'));
      const idx = focusable.indexOf(document.activeElement as HTMLElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusable[idx + 1]?.focus() ?? focusable[0]?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        idx > 0 ? focusable[idx - 1]?.focus() : focusable[focusable.length - 1]?.focus();
      }
    }
    panel.addEventListener('keydown', onKey);
    return () => panel.removeEventListener('keydown', onKey);
  }, [menuStyle]);

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    const GAP = 4;
    const menuW = 220;
    const menuH = Math.min(items.length * 34 + 8, 400);
    const left = e.clientX + menuW > window.innerWidth ? e.clientX - menuW : e.clientX + GAP;
    const top  = e.clientY + menuH > window.innerHeight ? e.clientY - menuH : e.clientY + GAP;
    setMenuStyle({ position: 'fixed', left, top, zIndex: 9999 });
    onOpenChange?.(true);
  }

  return (
    <>
      <div onContextMenu={handleContextMenu} style={{ display: 'contents' }}>
        {children}
      </div>

      {menuStyle && typeof document !== 'undefined' && createPortal(
        <div style={menuStyle} ref={panelRef}>
          <MenuPanel role="menu" aria-label="Context menu">
            <MenuItemsList items={items} onClose={close} />
          </MenuPanel>
        </div>,
        document.body,
      )}
    </>
  );
}

// ── Named sub-components (advanced usage) ─────────────────────────────────────

function ContextMenuItemComp({ children, icon, shortcut, destructive = false, disabled = false, onAction }: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onAction?: () => void;
}) {
  return (
    <MenuItem
      $destructive={destructive}
      $disabled={disabled}
      role="menuitem"
      onClick={() => !disabled && onAction?.()}
      tabIndex={disabled ? -1 : 0}
    >
      {icon && <MenuItemIcon>{icon}</MenuItemIcon>}
      <MenuItemLabel>{children}</MenuItemLabel>
      {shortcut && <MenuItemShortcut>{shortcut}</MenuItemShortcut>}
    </MenuItem>
  );
}

function ContextMenuSeparator() { return <MenuSeparator role="separator" />; }
function ContextMenuLabelComp({ children }: { children: React.ReactNode }) {
  return <MenuLabel>{children}</MenuLabel>;
}

export const ContextMenuItemComponent = ContextMenuItemComp;
export const ContextMenuSeparatorComponent = ContextMenuSeparator;
export const ContextMenuLabelComponent = ContextMenuLabelComp;
