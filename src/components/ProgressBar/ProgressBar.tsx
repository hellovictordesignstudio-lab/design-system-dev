import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import type { Theme } from '../../theme/theme';

export type ProgressBarVariant = 'default' | 'success' | 'error' | 'warning';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  label?: string;
  showValue?: boolean;
  isIndeterminate?: boolean;
  isAnimated?: boolean;
}

const HEIGHT: Record<ProgressBarSize, number> = { sm: 4, md: 8, lg: 12 };

const FILL_COLOR: Record<ProgressBarVariant, keyof Theme['colors']> = {
  default: 'color-brand-primary',
  success: 'color-success-default',
  error: 'color-error-default',
  warning: 'color-warning-default',
};

const slide = keyframes`
  0% { left: -40%; right: 100%; }
  50% { left: 20%; right: -30%; }
  100% { left: 100%; right: -10%; }
`;

const Track = styled.div<{ $size: ProgressBarSize }>`
  position: relative;
  width: 100%;
  height: ${({ $size }) => HEIGHT[$size]}px;
  background-color: ${({ theme }) => theme.colors['color-bg-muted']};
  border-radius: 9999px;
  overflow: hidden;
`;

const Fill = styled.div<{
  $variant: ProgressBarVariant;
  $pct: number;
  $isAnimated: boolean;
  $isIndeterminate: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 9999px;
  background-color: ${({ theme, $variant }) => theme.colors[FILL_COLOR[$variant]]};

  ${({ $isIndeterminate }) =>
    $isIndeterminate
      ? css`
          right: unset;
          width: 40%;
          animation: ${slide} 1.4s ease-in-out infinite;
        `
      : css<{ $pct: number; $isAnimated: boolean }>`
          width: ${({ $pct }) => $pct}%;
          transition: ${({ $isAnimated }) => ($isAnimated ? 'width 300ms ease' : 'none')};
        `}
`;

const LabelText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ValueText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  white-space: nowrap;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showValue = false,
  isIndeterminate = false,
  isAnimated = true,
}: ProgressBarProps) {
  const pct = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <Container>
      {label && <LabelText>{label}</LabelText>}
      <Row>
        <Track $size={size} role="progressbar" aria-valuenow={isIndeterminate ? undefined : value} aria-valuemin={0} aria-valuemax={max}>
          <Fill
            $variant={variant}
            $pct={pct}
            $isAnimated={isAnimated}
            $isIndeterminate={isIndeterminate}
          />
        </Track>
        {showValue && !isIndeterminate && <ValueText>{Math.round(pct)}%</ValueText>}
      </Row>
    </Container>
  );
}
