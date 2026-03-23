import React from 'react';

export interface SidebarContextValue {
  isCollapsed: boolean;
  toggle: () => void;
}

export interface SidebarProps {
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  width?: number;
  collapsedWidth?: number;
  children: React.ReactNode;
}

export interface SidebarHeaderProps {
  children: React.ReactNode;
}

export interface SidebarSectionProps {
  label?: string;
  children: React.ReactNode;
}

export interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  isActive?: boolean;
  badge?: string | number;
  isDisabled?: boolean;
  onClick?: () => void;
  /** Nested Sidebar.Item elements rendered as sub-navigation */
  children?: React.ReactNode;
}

export interface SidebarFooterProps {
  children: React.ReactNode;
}
