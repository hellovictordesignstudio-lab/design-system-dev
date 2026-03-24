import type { ReactNode } from 'react';

export interface TreeNodeData {
  id: string;
  label: ReactNode;
  children?: TreeNodeData[];
  isDisabled?: boolean;
}

export interface TreeViewProps {
  nodes: TreeNodeData[];
  /** Expanded node ids (controlled). */
  expandedIds?: Set<string> | string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (ids: Set<string>) => void;
  /** Called when a row is activated (Enter / click). */
  onSelect?: (id: string) => void;
  /** Currently highlighted id for roving focus (optional). */
  selectedId?: string | null;
  'aria-label'?: string;
}
