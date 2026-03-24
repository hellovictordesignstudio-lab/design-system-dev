import React from 'react';
import { X } from 'lucide-react';
import { RemoveButton, StyledTag } from './Tag.styles';
import type { TagProps } from './Tag.types';

export function Tag({
  variant = 'default',
  size = 'md',
  children,
  onRemove,
  removeLabel = 'Remove',
  className,
}: TagProps) {
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <StyledTag $variant={variant} $size={size} className={className}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</span>
      {onRemove && (
        <RemoveButton
          type="button"
          $size={size}
          aria-label={removeLabel}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X size={iconSize} strokeWidth={2.25} aria-hidden />
        </RemoveButton>
      )}
    </StyledTag>
  );
}

/** Alias for Tag — same component, common naming in other design systems. */
export const Chip = Tag;

export default Tag;
