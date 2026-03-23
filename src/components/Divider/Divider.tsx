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

const lineColor = css`
  background-color: #E2E5ED;

  [data-theme='dark'] &,
  .dark & {
    background-color: #2E3550;
  }
`;

const HorizontalLine = styled.div<{ $variant: DividerVariant }>`
  flex: 1;
  height: 1px;

  ${({ $variant }) =>
    $variant === 'solid'
      ? css`
          ${lineColor}
        `
      : css`
          background: transparent;
          border-top: 1px ${$variant} #E2E5ED;

          [data-theme='dark'] &,
          .dark & {
            border-top-color: #2E3550;
          }
        `}
`;

const VerticalLine = styled.div<{ $variant: DividerVariant }>`
  width: 1px;
  height: 100%;

  ${({ $variant }) =>
    $variant === 'solid'
      ? css`
          ${lineColor}
        `
      : css`
          background: transparent;
          border-left: 1px ${$variant} #E2E5ED;

          [data-theme='dark'] &,
          .dark & {
            border-left-color: #2E3550;
          }
        `}
`;

const Label = styled.span`
  flex-shrink: 0;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 600;
  color: #9BA5BE;
  background-color: #ffffff;
  white-space: nowrap;

  [data-theme='dark'] &,
  .dark & {
    background-color: #1A1F35;
    color: #9BA5BE;
  }
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
