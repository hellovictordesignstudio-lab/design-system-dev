import styled, { keyframes } from 'styled-components';
import { colorPrimitives } from '../../tokens/primitives';

const white = colorPrimitives.neutral[0];
const black = colorPrimitives.neutral[900];

export const fadeIn = keyframes`
  from { opacity: 0; transform: scaleY(0.96) translateY(-4px); }
  to   { opacity: 1; transform: scaleY(1) translateY(0); }
`;

// ── Trigger ───────────────────────────────────────────────────────────────────

export const TriggerBtn = styled.button<{ $isDisabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.colors['color-border-strong']};
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors['color-border-focus']};
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.12)'};
  }
`;

export const Swatch = styled.span<{ $color: string }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 1.5px solid ${({ theme }) => theme.colors['color-border-strong']};
  flex-shrink: 0;
`;

export const TriggerLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
`;

export const ChevronWrap = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  transition: transform 200ms ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

// ── Popover ───────────────────────────────────────────────────────────────────

export const PopoverPanel = styled.div`
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 150ms ease forwards;
  width: 228px;
`;

// ── SL Square ─────────────────────────────────────────────────────────────────

export const SLSquare = styled.div`
  position: relative;
  width: 200px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  cursor: crosshair;
  flex-shrink: 0;
  touch-action: none;
`;

export const SLWhiteGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, ${white} 0%, transparent 100%);
`;

export const SLBlackGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, ${black} 100%);
`;

export const SLThumb = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid ${white};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

// ── Hue Slider — full spectrum via HSL (no hex stops) ───────────────────────────

export const HueTrack = styled.div`
  position: relative;
  width: 200px;
  height: 12px;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    hsl(0, 100%, 50%) 0%,
    hsl(60, 100%, 50%) 17%,
    hsl(120, 100%, 50%) 33%,
    hsl(180, 100%, 50%) 50%,
    hsl(240, 100%, 50%) 67%,
    hsl(300, 100%, 50%) 83%,
    hsl(360, 100%, 50%) 100%
  );
  cursor: pointer;
  flex-shrink: 0;
  touch-action: none;
`;

export const HueThumb = styled.div`
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${white};
  border: 2px solid ${white};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 1px 4px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

// ── Input ─────────────────────────────────────────────────────────────────────

export const ColorInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors['color-border-strong']};
  font-size: 13px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  background: ${({ theme }) => theme.colors['color-bg-default']};
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors['color-border-focus']};
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.12)'};
  }
`;

// ── Presets ───────────────────────────────────────────────────────────────────

export const PresetsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const PresetSwatch = styled.button<{ $color: string; $isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: ${({ theme, $isActive }) =>
    $isActive ? `2px solid ${theme.colors['color-border-focus']}` : `1.5px solid ${theme.colors['color-border-strong']}`};
  cursor: pointer;
  padding: 0;
  outline: none;
  transition: transform 100ms ease, box-shadow 100ms ease;
  box-shadow: ${({ theme, $isActive }) =>
    $isActive
      ? theme.mode === 'dark'
        ? '0 0 0 2px rgba(10, 132, 255, 0.45)'
        : '0 0 0 2px rgba(0, 85, 255, 0.3)'
      : 'none'};

  &:hover {
    transform: scale(1.15);
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.45)' : 'rgba(0, 85, 255, 0.4)'};
  }
`;
