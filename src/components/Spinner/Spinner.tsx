import React from 'react';
import styled, { keyframes } from 'styled-components';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  color?: string;
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const strokeMap: Record<SpinnerSize, number> = {
  xs: 2,
  sm: 2,
  md: 2.5,
  lg: 3,
  xl: 3.5,
};

const StyledSvg = styled.svg<{ $size: SpinnerSize }>`
  animation: ${spin} 0.75s linear infinite;
  flex-shrink: 0;
`;

export function Spinner({ size = 'md', label = 'Loading', color }: SpinnerProps) {
  const px = sizeMap[size];
  const stroke = strokeMap[size];
  const r = (px - stroke * 2) / 2;
  const cx = px / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <StyledSvg
      $size={size}
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      aria-label={label}
      role="status"
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cx}
        r={r}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeOpacity={0.2}
      />
      {/* Arc */}
      <circle
        cx={cx}
        cy={cx}
        r={r}
        stroke={color ?? 'currentColor'}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        transform={`rotate(-90 ${cx} ${cx})`}
      />
    </StyledSvg>
  );
}
