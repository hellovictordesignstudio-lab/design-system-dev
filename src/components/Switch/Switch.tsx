import React, { useId } from 'react';
import styled from 'styled-components';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type LabelPosition = 'left' | 'right';

export interface SwitchProps {
  checked?: boolean;
  isDisabled?: boolean;
  size?: SwitchSize;
  label?: string;
  labelPosition?: LabelPosition;
  onChange?: (checked: boolean) => void;
  id?: string;
}

const TRACK: Record<SwitchSize, { width: number; height: number; thumb: number }> = {
  sm: { width: 28, height: 16, thumb: 12 },
  md: { width: 36, height: 20, thumb: 16 },
  lg: { width: 44, height: 24, thumb: 20 },
};

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`;

const Track = styled.span<{ $size: SwitchSize; $checked: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: ${({ $size }) => TRACK[$size].width}px;
  height: ${({ $size }) => TRACK[$size].height}px;
  border-radius: 9999px;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors['color-brand-primary'] : theme.colors['color-border-default']};
  transition: background-color 200ms ease;
`;

const Thumb = styled.span<{ $size: SwitchSize; $checked: boolean }>`
  position: absolute;
  left: ${({ $size, $checked }) => {
    const { width, height, thumb } = TRACK[$size];
    const offset = (height - thumb) / 2;
    return $checked ? `${width - thumb - offset}px` : `${offset}px`;
  }};
  width: ${({ $size }) => TRACK[$size].thumb}px;
  height: ${({ $size }) => TRACK[$size].thumb}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: left 200ms ease;
`;

const SwitchContainer = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;

  &:focus-within ${Track} {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.12)'};
  }
`;

const Wrapper = styled.label<{ $isDisabled: boolean; $labelPosition: LabelPosition }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-direction: ${({ $labelPosition }) => ($labelPosition === 'left' ? 'row-reverse' : 'row')};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  user-select: none;
`;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export function Switch({
  checked = false,
  isDisabled = false,
  size = 'md',
  label,
  labelPosition = 'right',
  onChange,
  id,
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <Wrapper htmlFor={inputId} $isDisabled={isDisabled} $labelPosition={labelPosition}>
      <SwitchContainer>
        <HiddenInput
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={isDisabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <Track $size={size} $checked={checked}>
          <Thumb $size={size} $checked={checked} />
        </Track>
      </SwitchContainer>
      {label && <LabelText>{label}</LabelText>}
    </Wrapper>
  );
}
