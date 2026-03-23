import styled, { keyframes } from 'styled-components';

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
  border: 1.5px solid #C8D4E8;
  background-color: #ffffff;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: 13px;
  color: #111827;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-visible {
    outline: none;
    border-color: #0055FF;
    box-shadow: 0 0 0 3px rgba(0,85,255,0.12);
  }

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
    border-color: #2E3550;
    color: #F0F2F5;
  }
`;

export const Swatch = styled.span<{ $color: string }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 1.5px solid rgba(0,0,0,0.12);
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
  color: #6B7694;
  transition: transform 200ms ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

// ── Popover ───────────────────────────────────────────────────────────────────

export const PopoverPanel = styled.div`
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #E2E5ED;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 150ms ease forwards;
  width: 228px;

  [data-theme='dark'] &, .dark & {
    background-color: #1A1F35;
    border-color: #2E3550;
  }
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
  background: linear-gradient(to right, #fff 0%, transparent 100%);
`;

export const SLBlackGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, #000 100%);
`;

export const SLThumb = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

// ── Hue Slider ────────────────────────────────────────────────────────────────

export const HueTrack = styled.div`
  position: relative;
  width: 200px;
  height: 12px;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%
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
  background: #ffffff;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

// ── Input ─────────────────────────────────────────────────────────────────────

export const ColorInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1.5px solid #C8D4E8;
  font-size: 13px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-variant-numeric: tabular-nums;
  color: #111827;
  background: #ffffff;
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
  box-sizing: border-box;

  &:focus {
    border-color: #0055FF;
    box-shadow: 0 0 0 3px rgba(0,85,255,0.12);
  }

  [data-theme='dark'] &, .dark & {
    background-color: #111827;
    border-color: #2E3550;
    color: #F0F2F5;
    &:focus { border-color: #0055FF; }
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
  border: ${({ $isActive }) => ($isActive ? '2px solid #0055FF' : '1.5px solid rgba(0,0,0,0.12)')};
  cursor: pointer;
  padding: 0;
  outline: none;
  transition: transform 100ms ease, box-shadow 100ms ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 0 0 2px rgba(0,85,255,0.3)' : 'none')};

  &:hover { transform: scale(1.15); }
  &:focus-visible { box-shadow: 0 0 0 3px rgba(0,85,255,0.4); }
`;
