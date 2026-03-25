import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';

export type RatingSize = 'sm' | 'md' | 'lg';
export type RatingPrecision = 'full' | 'half';

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: RatingSize;
  isReadOnly?: boolean;
  precision?: RatingPrecision;
  label?: string;
  showValue?: boolean;
}

const starSizeMap: Record<RatingSize, number> = {
  sm: 16,
  md: 22,
  lg: 28,
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
`;

const StarsRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ValueText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  margin-left: 6px;
`;

const StarButton = styled.button<{ $isReadOnly: boolean; $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  cursor: ${({ $isReadOnly }) => ($isReadOnly ? 'default' : 'pointer')};
  position: relative;
  transition: transform 0.1s ease;
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    border-radius: 3px;
  }

  ${({ $isReadOnly }) =>
    !$isReadOnly &&
    `
    &:hover {
      transform: scale(1.1);
    }
  `}
`;

// SVG star paths
const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

interface StarIconProps {
  fill: number; // 0 = empty, 0.5 = half, 1 = full
  size: number;
}

function StarIcon({ fill, size }: StarIconProps) {
  const id = React.useId();
  const theme = useTheme();
  const empty = theme.colors['color-border-default'];
  const filled = theme.colors['color-warning-default'];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {fill === 0.5 && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={filled} />
            <stop offset="50%" stopColor={empty} />
          </linearGradient>
        </defs>
      )}
      <path
        d={STAR_PATH}
        fill={fill === 0 ? empty : fill === 0.5 ? `url(#${id})` : filled}
        stroke={fill === 0 ? empty : filled}
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getStarFill(starIndex: number, value: number, precision: RatingPrecision): number {
  const diff = value - starIndex;
  if (diff >= 1) return 1;
  if (precision === 'half' && diff >= 0.5) return 0.5;
  if (diff > 0 && precision === 'full') return 1;
  return 0;
}

export function Rating({
  value,
  onChange,
  max = 5,
  size = 'md',
  isReadOnly,
  precision = 'full',
  label,
  showValue = false,
}: RatingProps) {
  const readOnly = isReadOnly ?? !onChange;
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const starSize = starSizeMap[size];

  const displayValue = hoverValue ?? value;

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>, starIndex: number) {
    if (readOnly) return;
    if (precision === 'half') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const half = x < rect.width / 2;
      setHoverValue(half ? starIndex + 0.5 : starIndex + 1);
    } else {
      setHoverValue(starIndex + 1);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, starIndex: number) {
    if (readOnly || !onChange) return;
    if (precision === 'half') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const half = x < rect.width / 2;
      onChange(half ? starIndex + 0.5 : starIndex + 1);
    } else {
      onChange(starIndex + 1);
    }
  }

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StarsRow>
        {Array.from({ length: max }, (_, i) => (
          <StarButton
            key={i}
            type="button"
            $isReadOnly={readOnly}
            $size={starSize}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => !readOnly && setHoverValue(null)}
            onClick={(e) => handleClick(e, i)}
            aria-label={`${i + 1} star${i + 1 !== 1 ? 's' : ''}`}
          >
            <StarIcon
              fill={getStarFill(i, displayValue, precision)}
              size={starSize}
            />
          </StarButton>
        ))}
        {showValue && (
          <ValueText>
            {displayValue % 1 === 0 ? displayValue.toFixed(0) : displayValue.toFixed(1)} / {max}
          </ValueText>
        )}
      </StarsRow>
    </Wrapper>
  );
}
