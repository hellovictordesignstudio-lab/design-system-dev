import React from 'react';
import styled, { css } from 'styled-components';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerLabelPosition = 'left' | 'center' | 'right';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerSpacing = 'sm' | 'md' | 'lg';

export interface DividerProps {
  orientation?: DividerOrientation;
  label?: string;
  labelPosition?: DividerLabelPosition;
  variant?: DividerVariant;
  spacing?: DividerSpacing;
}

const spacingMap: Record<DividerSpacing, string> = {
  sm: '8px',
  md: '16px',
  lg: '24px',
};

const HorizontalWrapper = styled.div<{ $spacing: DividerSpacing }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: ${({ $spacing }) => spacingMap[$spacing]};
  margin-bottom: ${({ $spacing }) => spacingMap[$spacing]};
`;

const VerticalWrapper = styled.div<{ $spacing: DividerSpacing }>`
  display: inline-flex;
  height: 100%;
  margin-left: ${({ $spacing }) => spacingMap[$spacing]};
  margin-right: ${({ $spacing }) => spacingMap[$spacing]};
`;

const HorizontalLine = styled.div<{ $variant: DividerVariant }>`
  flex: 1;
  height: 1px;

  ${({ $variant, theme }) =>
    $variant === 'solid'
      ? css`
          background-color: ${theme.colors['color-border-default']};
        `
      : css`
          background: transparent;
          border-top: 1px ${$variant} ${theme.colors['color-border-default']};
        `}
`;

const VerticalLine = styled.div<{ $variant: DividerVariant }>`
  width: 1px;
  height: 100%;

  ${({ $variant, theme }) =>
    $variant === 'solid'
      ? css`
          background-color: ${theme.colors['color-border-default']};
        `
      : css`
          background: transparent;
          border-left: 1px ${$variant} ${theme.colors['color-border-default']};
        `}
`;

const Label = styled.span`
  flex-shrink: 0;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  white-space: nowrap;
`;

export function Divider({
  orientation = 'horizontal',
  label,
  labelPosition = 'center',
  variant = 'solid',
  spacing = 'md',
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <VerticalWrapper $spacing={spacing}>
        <VerticalLine $variant={variant} />
      </VerticalWrapper>
    );
  }

  if (!label) {
    return (
      <HorizontalWrapper $spacing={spacing}>
        <HorizontalLine $variant={variant} />
      </HorizontalWrapper>
    );
  }

  return (
    <HorizontalWrapper $spacing={spacing}>
      {labelPosition !== 'left' && <HorizontalLine $variant={variant} />}
      <Label>{label}</Label>
      {labelPosition !== 'right' && <HorizontalLine $variant={variant} />}
    </HorizontalWrapper>
  );
}
