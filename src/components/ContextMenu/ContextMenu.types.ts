export interface ContextMenuItemDef {
  type?: 'item' | 'separator' | 'label' | 'sub';
  /** Menu item label */
  label?: string;
  /** Icon rendered at 16px */
  icon?: React.ReactNode;
  /** Keyboard shortcut label */
  shortcut?: string;
  /** Renders item in red destructive style */
  destructive?: boolean;
  /** Grays out item and prevents interaction */
  disabled?: boolean;
  /** Callback when item is clicked */
  onAction?: () => void;
  /** Sub-menu items (type: 'sub') */
  items?: ContextMenuItemDef[];
}

export interface ContextMenuProps {
  /** The trigger element — right-click opens the menu */
  children: React.ReactNode;
  /** Menu item definitions */
  items: ContextMenuItemDef[];
  /** Programmatic open at a specific coordinate */
  onOpenChange?: (isOpen: boolean) => void;
}
