import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbSeparator = 'slash' | 'chevron' | 'dot';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  maxItems?: number;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
`;

const Item = styled.li`
  display: inline-flex;
  align-items: center;
`;

const Sep = styled.span`
  color: #c5cbda;
  margin: 0 6px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  user-select: none;
`;

const LinkItem = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #0055ff;
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CurrentItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const CollapseButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #0055ff;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  &:hover {
    text-decoration: underline;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  width: 14px;
  height: 14px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

function SeparatorNode({ type }: { type: BreadcrumbSeparator }) {
  if (type === 'chevron') {
    return (
      <Sep>
        <ChevronRight size={14} />
      </Sep>
    );
  }
  if (type === 'dot') {
    return <Sep>·</Sep>;
  }
  return <Sep>/</Sep>;
}

export function Breadcrumb({ items, separator = 'slash', maxItems }: BreadcrumbProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldCollapse = maxItems !== undefined && items.length > maxItems && !isExpanded;

  let visibleItems: (BreadcrumbItem | null)[];

  if (shouldCollapse && maxItems !== undefined) {
    // Always show first and last item(s), collapse middle
    const first = items[0];
    const last = items[items.length - 1];
    // Show first, collapsed placeholder, last
    visibleItems = [first, null, last];
  } else {
    visibleItems = items;
  }

  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          if (item === null) {
            // Collapsed placeholder
            return (
              <React.Fragment key="collapsed">
                <Item>
                  <CollapseButton onClick={() => setIsExpanded(true)} aria-label="Show all breadcrumbs">
                    ...
                  </CollapseButton>
                </Item>
                {!isLast && <SeparatorNode type={separator} />}
              </React.Fragment>
            );
          }

          const isCurrent = item.isCurrent ?? isLast;

          return (
            <React.Fragment key={index}>
              <Item>
                {isCurrent ? (
                  <CurrentItem aria-current="page">
                    {item.icon && <IconWrapper>{item.icon}</IconWrapper>}
                    {item.label}
                  </CurrentItem>
                ) : (
                  <LinkItem href={item.href} onClick={item.href ? undefined : (e) => e.preventDefault()}>
                    {item.icon && <IconWrapper>{item.icon}</IconWrapper>}
                    {item.label}
                  </LinkItem>
                )}
              </Item>
              {!isLast && <SeparatorNode type={separator} />}
            </React.Fragment>
          );
        })}
      </List>
    </Nav>
  );
}
