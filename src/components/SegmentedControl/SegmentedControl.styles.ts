import styled, { css } from 'styled-components';
import type { SegmentedControlSize } from './SegmentedControl.types';

const sizeStyles = {
  sm: css`height: 32px; font-size: 12px; padding: 0 12px; gap: 5px;`,
  md: css`height: 38px; font-size: 13px; padding: 0 16px; gap: 6px;`,
  lg: css`height: 46px; font-size: 14px; padding: 0 20px; gap: 7px;`,
};

const trackPadding = { sm: '3px', md: '3px', lg: '4px' };

interface TrackProps {
  $size: SegmentedControlSize;
  $fullWidth: boolean;
  $isDisabled: boolean;
}

export const Track = styled.div<TrackProps>`
  display: inline-flex;
  align-items: center;
  background: var(--color-bg-tertiary, #EFF1F5);
  border-radius: 10px;
  padding: ${({ $size }) => trackPadding[$size]};
  gap: 2px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
  position: relative;
`;

interface SegmentProps {
  $size: SegmentedControlSize;
  $isActive: boolean;
  $isDisabled: boolean;
  $fullWidth: boolean;
}

export const Segment = styled.button<SegmentProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '600')};
  border: none;
  border-radius: 7px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  outline: none;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  flex: ${({ $fullWidth }) => ($fullWidth ? '1' : '0 0 auto')};
  position: relative;
  z-index: 1;

  ${({ $size }) => sizeStyles[$size]}

  background: ${({ $isActive }) =>
    $isActive ? 'var(--color-bg-primary, #FFFFFF)' : 'transparent'};
  color: ${({ $isActive, $isDisabled }) =>
    $isDisabled
      ? 'var(--color-text-tertiary, #9BA5BE)'
      : $isActive
      ? 'var(--color-text-primary, #0C0D10)'
      : 'var(--color-text-secondary, #4A5270)'};

  box-shadow: ${({ $isActive }) =>
    $isActive
      ? '0 1px 4px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)'
      : 'none'};

  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.45 : 1)};

  &:hover:not(:disabled) {
    color: ${({ $isActive }) =>
      $isActive ? 'var(--color-text-primary, #0C0D10)' : 'var(--color-text-primary, #0C0D10)'};
    background: ${({ $isActive }) =>
      $isActive ? 'var(--color-bg-primary, #FFFFFF)' : 'rgba(0,0,0,0.04)'};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-interactive-focus, #99BDFF);
    z-index: 2;
  }

  svg {
    width: ${({ $size }) => ($size === 'sm' ? '13px' : $size === 'lg' ? '16px' : '14px')};
    height: ${({ $size }) => ($size === 'sm' ? '13px' : $size === 'lg' ? '16px' : '14px')};
    flex-shrink: 0;
  }
`;
