import React, { forwardRef, useState } from 'react';
import { Track, Segment } from './SegmentedControl.styles';
import type { SegmentedControlProps } from './SegmentedControl.types';

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      options,
      value,
      defaultValue,
      size = 'md',
      fullWidth = false,
      isDisabled = false,
      onChange,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? '');
    const current = isControlled ? value! : internalValue;

    const handleSelect = (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    };

    return (
      <Track
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        $size={size}
        $fullWidth={fullWidth}
        $isDisabled={isDisabled}
      >
        {options.map((option) => {
          const isActive = current === option.value;
          return (
            <Segment
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-disabled={option.isDisabled || undefined}
              $size={size}
              $isActive={isActive}
              $isDisabled={!!option.isDisabled}
              $fullWidth={fullWidth}
              disabled={option.isDisabled}
              onClick={() => !option.isDisabled && handleSelect(option.value)}
            >
              {option.icon}
              {option.label}
            </Segment>
          );
        })}
      </Track>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;
