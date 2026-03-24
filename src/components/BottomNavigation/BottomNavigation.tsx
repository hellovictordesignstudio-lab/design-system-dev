import React, { useState } from 'react';
import { Badge, IconWrap, Label, Nav, NavButton } from './BottomNavigation.styles';
import type { BottomNavigationProps } from './BottomNavigation.types';

export function BottomNavigation({
  items,
  value,
  defaultValue,
  onChange,
  'aria-label': ariaLabel = 'Primary',
  className,
}: BottomNavigationProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value ?? '');
  const current = isControlled ? value! : internal;

  const handleSelect = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <Nav className={className} role="navigation" aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive = current === item.value;
        const showBadge = item.badge !== undefined && item.badge !== '';

        return (
          <NavButton
            key={item.value}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            $isActive={isActive}
            disabled={item.isDisabled}
            onClick={() => !item.isDisabled && handleSelect(item.value)}
          >
            {(item.icon || showBadge) && (
              <IconWrap>
                {item.icon}
                {showBadge && <Badge aria-hidden>{item.badge}</Badge>}
              </IconWrap>
            )}
            <Label>{item.label}</Label>
          </NavButton>
        );
      })}
    </Nav>
  );
}

export default BottomNavigation;
