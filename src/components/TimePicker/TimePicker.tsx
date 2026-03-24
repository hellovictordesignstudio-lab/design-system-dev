import React, { useId, useMemo } from 'react';
import styled, { css } from 'styled-components';
import type { TimePickerProps, TimePickerSize } from './TimePicker.types';

const HEIGHTS: Record<TimePickerSize, string> = { sm: '32px', md: '40px', lg: '48px' };
const FONT_SIZE: Record<TimePickerSize, string> = { sm: '13px', md: '14px', lg: '16px' };
const PAD_X: Record<TimePickerSize, string> = { sm: '10px', md: '12px', lg: '14px' };

const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  margin-bottom: 6px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Select = styled.select<{
  $size: TimePickerSize;
  $hasError: boolean;
  $isDisabled: boolean;
}>`
  height: ${({ $size }) => HEIGHTS[$size]};
  padding: 0 ${({ $size }) => PAD_X[$size]};
  border-radius: 14px;
  border: 1.5px solid ${({ $hasError }) => ($hasError ? '#D22232' : '#C8D4E8')};
  background-color: #ffffff;
  font-size: ${({ $size }) => FONT_SIZE[$size]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: #111827;
  cursor: pointer;
  outline: none;
  min-width: 72px;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-visible {
    border-color: #0055ff;
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.1);
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.65;
      cursor: not-allowed;
      background-color: #f8f9fc;
    `}
`;

const Sep = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #9ba5be;
  user-select: none;
`;

const HelperText = styled.p<{ $isError?: boolean }>`
  margin: 6px 0 0;
  font-size: 12px;
  color: ${({ $isError }) => ($isError ? '#D22232' : '#9BA5BE')};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

function clampMinutes(n: number): number {
  const v = Math.round(n);
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1439, v));
}

function fromMinutes(total: number, use12Hour: boolean) {
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  if (!use12Hour) {
    return { hour: h24, minute: m, meridiem: null as 'am' | 'pm' | null };
  }
  const meridiem: 'am' | 'pm' = h24 >= 12 ? 'pm' : 'am';
  const h = h24 % 12;
  const hour12 = h === 0 ? 12 : h;
  return { hour: hour12, minute: m, meridiem };
}

function toMinutes24(hour: number, minute: number): number {
  return clampMinutes(hour * 60 + minute);
}

function toMinutes12(hour12: number, minute: number, meridiem: 'am' | 'pm'): number {
  let h24: number;
  if (meridiem === 'am') {
    h24 = hour12 === 12 ? 0 : hour12;
  } else {
    h24 = hour12 === 12 ? 12 : hour12 + 12;
  }
  return clampMinutes(h24 * 60 + minute);
}

export function TimePicker({
  value = 0,
  onChange,
  label,
  helperText,
  errorText,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  size = 'md',
  id,
  use12Hour = false,
  minuteStep = 15,
}: TimePickerProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const safe = clampMinutes(value);
  const parts = fromMinutes(safe, use12Hour);

  const minuteOptions = useMemo(() => {
    const opts: number[] = [];
    for (let m = 0; m < 60; m += minuteStep) opts.push(m);
    return opts;
  }, [minuteStep]);

  const hourOptions24 = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const hourOptions12 = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  function emit(nextTotal: number) {
    onChange(clampMinutes(nextTotal));
  }

  function onHourChange(h: number) {
    if (!use12Hour) {
      emit(toMinutes24(h, parts.minute));
      return;
    }
    emit(toMinutes12(h, parts.minute, parts.meridiem ?? 'am'));
  }

  function onMinuteChange(m: number) {
    if (!use12Hour) {
      emit(toMinutes24(parts.hour, m));
      return;
    }
    emit(toMinutes12(parts.hour, m, parts.meridiem ?? 'am'));
  }

  function onMeridiemChange(m: 'am' | 'pm') {
    emit(toMinutes12(parts.hour, parts.minute, m));
  }

  const displayHelper = hasError && errorText ? errorText : helperText;

  return (
    <FieldRoot>
      {label && (
        <FieldLabel id={`${inputId}-label`} htmlFor={`${inputId}-hour`}>
          {label}
          {isRequired && <span style={{ color: '#D22232', marginLeft: 2 }}>*</span>}
        </FieldLabel>
      )}

      <Row role="group" aria-labelledby={label ? `${inputId}-label` : undefined}>
        <Select
          id={`${inputId}-hour`}
          aria-label="Hour"
          $size={size}
          $hasError={hasError}
          $isDisabled={isDisabled}
          disabled={isDisabled}
          value={parts.hour}
          onChange={(e) => onHourChange(Number(e.target.value))}
        >
          {(use12Hour ? hourOptions12 : hourOptions24).map((h) => (
            <option key={h} value={h}>
              {use12Hour ? h : String(h).padStart(2, '0')}
            </option>
          ))}
        </Select>

        <Sep>:</Sep>

        <Select
          id={`${inputId}-minute`}
          aria-label="Minute"
          $size={size}
          $hasError={hasError}
          $isDisabled={isDisabled}
          disabled={isDisabled}
          value={parts.minute}
          onChange={(e) => onMinuteChange(Number(e.target.value))}
        >
          {minuteOptions.map((m) => (
            <option key={m} value={m}>
              {String(m).padStart(2, '0')}
            </option>
          ))}
        </Select>

        {use12Hour && (
          <Select
            id={`${inputId}-meridiem`}
            aria-label="AM or PM"
            $size={size}
            $hasError={hasError}
            $isDisabled={isDisabled}
            disabled={isDisabled}
            value={parts.meridiem ?? 'am'}
            onChange={(e) => onMeridiemChange(e.target.value as 'am' | 'pm')}
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </Select>
        )}
      </Row>

      {displayHelper && (
        <HelperText $isError={!!(hasError && errorText)}>{displayHelper}</HelperText>
      )}
    </FieldRoot>
  );
}
