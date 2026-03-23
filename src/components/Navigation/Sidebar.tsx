import React, { createContext, useContext, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip } from '../Tooltip';
import type {
  SidebarContextValue,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarItemProps,
  SidebarProps,
  SidebarSectionProps,
} from './Sidebar.types';
import {
  ChevronWrap,
  HeaderLogoArea,
  ItemAnchor,
  ItemBadge,
  ItemButton,
  ItemIconWrap,
  ItemLabel,
  SectionLabel,
  SidebarContent,
  SidebarFooterRoot,
  SidebarHeaderRoot,
  SidebarNav,
  SidebarSectionRoot,
  SubItemsWrapper,
  ToggleBtn,
} from './Sidebar.styles';

// ── Context ───────────────────────────────────────────────────────────────────

const SidebarCtx = createContext<SidebarContextValue>({
  isCollapsed: false,
  toggle: () => {},
});

const ItemDepthCtx = createContext(0);

// ── useSidebar hook ───────────────────────────────────────────────────────────

export function useSidebar(defaultCollapsed = false) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return {
    isCollapsed,
    toggle: () => setIsCollapsed((v) => !v),
    collapse: () => setIsCollapsed(true),
    expand: () => setIsCollapsed(false),
  };
}

// ── Sub-component implementations ─────────────────────────────────────────────

function SidebarHeader({ children }: SidebarHeaderProps) {
  const { isCollapsed, toggle } = useContext(SidebarCtx);
  return (
    <SidebarHeaderRoot $isCollapsed={isCollapsed}>
      <HeaderLogoArea $isCollapsed={isCollapsed}>{children}</HeaderLogoArea>
      <ToggleBtn
        type="button"
        onClick={toggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </ToggleBtn>
    </SidebarHeaderRoot>
  );
}

function SidebarSection({ label, children }: SidebarSectionProps) {
  const { isCollapsed } = useContext(SidebarCtx);
  return (
    <SidebarSectionRoot>
      {label && <SectionLabel $isCollapsed={isCollapsed}>{label}</SectionLabel>}
      {children}
    </SidebarSectionRoot>
  );
}

function SidebarItem({
  label,
  icon,
  href,
  isActive = false,
  badge,
  isDisabled = false,
  onClick,
  children,
}: SidebarItemProps) {
  const { isCollapsed } = useContext(SidebarCtx);
  const depth = useContext(ItemDepthCtx);
  const hasChildren = React.Children.count(children) > 0;
  const [isExpanded, setIsExpanded] = useState(isActive);

  function handleClick(e: React.MouseEvent) {
    if (isDisabled) { e.preventDefault(); return; }
    if (hasChildren) setIsExpanded((v) => !v);
    onClick?.();
  }

  const innerContent = (
    <>
      {icon && <ItemIconWrap>{icon}</ItemIconWrap>}
      <ItemLabel $isCollapsed={isCollapsed}>{label}</ItemLabel>
      {badge !== undefined && (
        <ItemBadge $isCollapsed={isCollapsed}>{badge}</ItemBadge>
      )}
      {hasChildren && !isCollapsed && (
        <ChevronWrap $isExpanded={isExpanded} $isCollapsed={isCollapsed}>
          <ChevronRight size={14} />
        </ChevronWrap>
      )}
    </>
  );

  const commonProps = {
    $isActive: isActive,
    $isDisabled: isDisabled,
    $isCollapsed: isCollapsed,
    $depth: depth,
    onClick: handleClick,
  } as const;

  const itemEl = href ? (
    <ItemAnchor
      href={isDisabled ? undefined : href}
      {...commonProps}
      {...(isDisabled ? { 'data-disabled': '' } : {})}
    >
      {innerContent}
    </ItemAnchor>
  ) : (
    <ItemButton type="button" disabled={isDisabled} {...commonProps}>
      {innerContent}
    </ItemButton>
  );

  const wrapped =
    isCollapsed && icon ? (
      <Tooltip content={label} placement="right" delay={0}>
        {itemEl}
      </Tooltip>
    ) : (
      itemEl
    );

  return (
    <>
      {wrapped}
      {hasChildren && !isCollapsed && (
        <SubItemsWrapper $isExpanded={isExpanded}>
          <ItemDepthCtx.Provider value={depth + 1}>{children}</ItemDepthCtx.Provider>
        </SubItemsWrapper>
      )}
    </>
  );
}

function SidebarFooter({ children }: SidebarFooterProps) {
  return <SidebarFooterRoot>{children}</SidebarFooterRoot>;
}

// ── Root — splits children into header / scrollable content / footer ──────────

function SidebarRoot({
  isCollapsed: controlledCollapsed,
  onCollapse,
  width = 240,
  collapsedWidth = 64,
  children,
}: SidebarProps) {
  const [internal, setInternal] = useState(false);
  const isControlled = controlledCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledCollapsed! : internal;

  function toggle() {
    const next = !isCollapsed;
    if (!isControlled) setInternal(next);
    onCollapse?.(next);
  }

  // Separate Header / Footer from scrollable middle content so only
  // the middle area scrolls while header & footer remain sticky.
  const childArray = React.Children.toArray(children);
  const headerChildren = childArray.filter(
    (c) => React.isValidElement(c) && c.type === SidebarHeader
  );
  const footerChildren = childArray.filter(
    (c) => React.isValidElement(c) && c.type === SidebarFooter
  );
  const middleChildren = childArray.filter(
    (c) =>
      !React.isValidElement(c) ||
      (c.type !== SidebarHeader && c.type !== SidebarFooter)
  );

  return (
    <SidebarCtx.Provider value={{ isCollapsed, toggle }}>
      <SidebarNav $width={width} $collapsedWidth={collapsedWidth} $isCollapsed={isCollapsed}>
        {headerChildren}
        <SidebarContent>{middleChildren}</SidebarContent>
        {footerChildren}
      </SidebarNav>
    </SidebarCtx.Provider>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Section: SidebarSection,
  Item: SidebarItem,
  Footer: SidebarFooter,
});
