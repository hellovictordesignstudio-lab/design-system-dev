import React, { forwardRef, useCallback, useRef, useState } from 'react';
import {
  Wrapper, Label, LabelRow, ValueDisplay, TrackContainer,
  Track, FilledTrack, Thumb, MinMaxRow, MinMaxLabel, HelperText, NativeInput,
} from './Slider.styles';
import type { SliderProps } from './Slider.types';

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      size = 'md',
      orientation = 'horizontal',
      isDisabled = false,
      showValue = true,
      showMinMax = false,
      formatValue = (v) => String(v),
      onChange,
      onChangeEnd,
      id,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isDragging, setIsDragging] = useState(false);

    const current = isControlled ? value! : internalValue;
    const percent = ((current - min) / (max - min)) * 100;

    const update = useCallback(
      (val: number) => {
        const clamped = Math.min(max, Math.max(min, val));
        if (!isControlled) setInternalValue(clamped);
        onChange?.(clamped);
      },
      [isControlled, min, max, onChange]
    );

    const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      update(parseFloat(e.target.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        update(current + step);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        update(current - step);
      }
      if (e.key === 'Home') { e.preventDefault(); update(min); }
      if (e.key === 'End') { e.preventDefault(); update(max); }
    };

    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <Wrapper>
        {(label || showValue) && (
          <LabelRow>
            {label && <Label htmlFor={inputId}>{label}</Label>}
            {showValue && <ValueDisplay>{formatValue(current)}</ValueDisplay>}
          </LabelRow>
        )}

        <TrackContainer $orientation={orientation} $isDisabled={isDisabled}>
          <Track $size={size} $orientation={orientation}>
            <FilledTrack $percent={percent} $orientation={orientation} />
          </Track>

          <Thumb
            $size={size}
            $percent={percent}
            $orientation={orientation}
            $isDragging={isDragging}
          />

          <NativeInput
            ref={ref}
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={current}
            disabled={isDisabled}
            onChange={handleNativeChange}
            onKeyDown={handleKeyDown}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => { setIsDragging(false); onChangeEnd?.(current); }}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => { setIsDragging(false); onChangeEnd?.(current); }}
            aria-label={label}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={current}
            aria-valuetext={formatValue(current)}
            aria-orientation={orientation}
          />
        </TrackContainer>

        {showMinMax && (
          <MinMaxRow>
            <MinMaxLabel>{formatValue(min)}</MinMaxLabel>
            <MinMaxLabel>{formatValue(max)}</MinMaxLabel>
          </MinMaxRow>
        )}

        {helperText && <HelperText>{helperText}</HelperText>}
      </Wrapper>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
