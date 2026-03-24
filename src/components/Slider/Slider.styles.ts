import styled, { css } from 'styled-components';
import type { SliderSize, SliderOrientation } from './Slider.types';

const trackSize = { sm: '4px', md: '6px', lg: '8px' };
const thumbSize = { sm: '16px', md: '20px', lg: '24px' };

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-primary, #0C0D10);
`;

export const ValueDisplay = styled.span`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-brand, #0055FF);
  min-width: 32px;
  text-align: right;
`;

interface TrackContainerProps {
  $orientation: SliderOrientation;
  $isDisabled: boolean;
}

export const TrackContainer = styled.div<TrackContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};

  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          flex-direction: column;
          width: fit-content;
          height: 200px;
          align-self: flex-start;
        `
      : css`
          width: 100%;
          height: 40px;
        `}
`;

interface TrackProps {
  $size: SliderSize;
  $orientation: SliderOrientation;
}

export const Track = styled.div<TrackProps>`
  position: relative;
  background: var(--color-border-default, #DDE1EA);
  border-radius: 9999px;
  overflow: hidden;

  ${({ $orientation, $size }) =>
    $orientation === 'vertical'
      ? css`
          width: ${trackSize[$size]};
          height: 100%;
        `
      : css`
          height: ${trackSize[$size]};
          width: 100%;
        `}
`;

interface FilledTrackProps {
  $percent: number;
  $orientation: SliderOrientation;
}

export const FilledTrack = styled.div<FilledTrackProps>`
  position: absolute;
  background: var(--color-interactive-default, #0055FF);
  border-radius: 9999px;

  ${({ $orientation, $percent }) =>
    $orientation === 'vertical'
      ? css`
          bottom: 0;
          left: 0;
          right: 0;
          height: ${$percent}%;
        `
      : css`
          top: 0;
          left: 0;
          bottom: 0;
          width: ${$percent}%;
        `}
`;

interface ThumbProps {
  $size: SliderSize;
  $percent: number;
  $orientation: SliderOrientation;
  $isDragging: boolean;
}

export const Thumb = styled.div<ThumbProps>`
  position: absolute;
  width: ${({ $size }) => thumbSize[$size]};
  height: ${({ $size }) => thumbSize[$size]};
  border-radius: 50%;
  background: #fff;
  border: 2.5px solid var(--color-interactive-default, #0055FF);
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  transform: translate(-50%, -50%);
  transition: box-shadow 0.15s, transform 0.1s;
  cursor: grab;
  z-index: 1;

  ${({ $orientation, $percent }) =>
    $orientation === 'vertical'
      ? css`
          left: 50%;
          bottom: calc(${$percent}% - 2px);
          top: auto;
          transform: translate(-50%, 50%);
        `
      : css`
          top: 50%;
          left: ${$percent}%;
        `}

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      box-shadow: 0 0 0 4px var(--color-bg-brand-subtle, #E6EEFF);
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.1);
    `}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px var(--color-interactive-focus, #99BDFF);
  }
`;

export const MinMaxRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MinMaxLabel = styled.span`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary, #9BA5BE);
`;

export const HelperText = styled.span`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary, #4A5270);
`;

export const NativeInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: inherit;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
`;
