import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { TreeNodeData, TreeViewProps } from './TreeView.types';

const Root = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const Row = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const RowHead = styled.div<{ $depth: number; $isDisabled?: boolean; $isFocused: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 36px;
  padding: 4px 8px 4px ${({ $depth }) => 8 + $depth * 16}px;
  border-radius: 10px;
  font-size: 14px;
  color: #111827;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.45 : 1)};
  user-select: none;
  transition: background-color 100ms ease, box-shadow 100ms ease;
  outline: none;

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      box-shadow: 0 0 0 2px #0055ff;
      background-color: #f8f9fc;
    `}

  &:hover {
    background-color: ${({ $isDisabled, $isFocused }) =>
      $isDisabled ? 'transparent' : $isFocused ? '#f0f2f5' : '#f0f2f5'};
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      pointer-events: none;
    `}
`;

const Toggle = styled.button<{ $isLeaf: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 6px;
  color: #6b7694;
  cursor: pointer;
  visibility: ${({ $isLeaf }) => ($isLeaf ? 'hidden' : 'visible')};

  &:focus-visible {
    outline: 2px solid #0055ff;
    outline-offset: 1px;
  }
`;

function toSet(ids: Set<string> | string[] | undefined): Set<string> {
  if (!ids) return new Set();
  return ids instanceof Set ? ids : new Set(ids);
}

function flattenVisible(nodes: TreeNodeData[], expanded: Set<string>): string[] {
  const out: string[] = [];
  function walk(list: TreeNodeData[]) {
    for (const n of list) {
      out.push(n.id);
      if (n.children?.length && expanded.has(n.id)) {
        walk(n.children);
      }
    }
  }
  walk(nodes);
  return out;
}

function buildParentMap(
  nodes: TreeNodeData[],
  parent: string | null = null,
  map = new Map<string, string | null>()
): Map<string, string | null> {
  for (const n of nodes) {
    map.set(n.id, parent);
    if (n.children?.length) buildParentMap(n.children, n.id, map);
  }
  return map;
}

export function TreeView({
  nodes,
  expandedIds: controlledExpanded,
  defaultExpandedIds = [],
  onExpandedChange,
  onSelect,
  selectedId,
  'aria-label': ariaLabel = 'Tree',
}: TreeViewProps) {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );

  const expanded = useMemo(() => {
    if (controlledExpanded !== undefined) return toSet(controlledExpanded);
    return internalExpanded;
  }, [controlledExpanded, internalExpanded]);

  const setExpanded = useCallback(
    (next: Set<string>) => {
      if (controlledExpanded === undefined) setInternalExpanded(next);
      onExpandedChange?.(next);
    },
    [controlledExpanded, onExpandedChange]
  );

  const flatIds = useMemo(() => flattenVisible(nodes, expanded), [nodes, expanded]);
  const parentMap = useMemo(() => buildParentMap(nodes), [nodes]);

  const [focusedId, setFocusedId] = useState<string | null>(null);

  useEffect(() => {
    if (flatIds.length === 0) {
      setFocusedId(null);
      return;
    }
    if (!focusedId || !flatIds.includes(focusedId)) {
      setFocusedId(flatIds[0]);
    }
  }, [flatIds, focusedId]);

  function toggle(id: string) {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  }

  function handleKeyDown(e: React.KeyboardEvent, node: TreeNodeData) {
    if (node.isDisabled) return;
    const hasChildren = !!(node.children && node.children.length);
    const isOpen = expanded.has(node.id);
    const idx = flatIds.indexOf(node.id);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (idx >= 0 && idx < flatIds.length - 1) {
          setFocusedId(flatIds[idx + 1]);
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (idx > 0) {
          setFocusedId(flatIds[idx - 1]);
        }
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (!hasChildren) break;
        if (!isOpen) {
          toggle(node.id);
        } else {
          const firstChild = node.children![0];
          if (firstChild && !firstChild.isDisabled) {
            setFocusedId(firstChild.id);
          }
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (hasChildren && isOpen) {
          toggle(node.id);
        } else {
          const parentId = parentMap.get(node.id);
          if (parentId) setFocusedId(parentId);
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        if (flatIds[0]) setFocusedId(flatIds[0]);
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = flatIds[flatIds.length - 1];
        if (last) setFocusedId(last);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        onSelect?.(node.id);
        break;
      }
      default:
        break;
    }
  }

  function renderNode(node: TreeNodeData, depth: number): React.ReactNode {
    const hasChildren = !!(node.children && node.children.length);
    const isOpen = expanded.has(node.id);
    const isFocused = focusedId === node.id;

    return (
      <Row
        key={node.id}
        role="treeitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-selected={selectedId === node.id ? true : undefined}
        tabIndex={isFocused ? 0 : -1}
        onClick={() => !node.isDisabled && onSelect?.(node.id)}
        onKeyDown={(e) => handleKeyDown(e, node)}
        onFocus={() => !node.isDisabled && setFocusedId(node.id)}
      >
        <RowHead $depth={depth} $isDisabled={node.isDisabled} $isFocused={isFocused}>
          <Toggle
            type="button"
            tabIndex={-1}
            $isLeaf={!hasChildren}
            aria-label={isOpen ? 'Collapse' : 'Expand'}
            onClick={(ev) => {
              ev.stopPropagation();
              if (!hasChildren || node.isDisabled) return;
              toggle(node.id);
            }}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Toggle>
          <span>{node.label}</span>
        </RowHead>
        {hasChildren && isOpen && (
          <ul role="group" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {node.children!.map((ch) => renderNode(ch, depth + 1))}
          </ul>
        )}
      </Row>
    );
  }

  return (
    <Root role="tree" aria-label={ariaLabel}>
      {nodes.map((n) => renderNode(n, 0))}
    </Root>
  );
}
