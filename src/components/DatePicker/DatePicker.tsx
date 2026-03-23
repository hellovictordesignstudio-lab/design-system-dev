import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  hasError?: boolean;
  errorText?: string;
  helperText?: string;
  minDate?: Date;
  maxDate?: Date;
  size?: DatePickerSize;
  id?: string;
}

// ── Date utilities ────────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function formatDate(d: Date): string {
  return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isToday(d: Date): boolean {
  return sameDay(d, new Date());
}

function isDisabledDate(d: Date, min?: Date, max?: Date): boolean {
  const day = startOfDay(d);
  if (min && day < startOfDay(min)) return true;
  if (max && day > startOfDay(max)) return true;
  return false;
}

interface CalDay {
  date: Date;
  isCurrentMonth: boolean;
}

function getCalendarDays(year: number, month: number): CalDay[] {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalDay[] = [];

  // Previous month tail
  for (let i = firstDow - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month, -i), isCurrentMonth: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }
  // Next month head (fill to 42 = 6 rows)
  let next = 1;
  while (days.length < 42) {
    days.push({ date: new Date(year, month + 1, next++), isCurrentMonth: false });
  }
  return days;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const HEIGHTS: Record<DatePickerSize, string> = { sm: '32px', md: '40px', lg: '48px' };
const FONT_SIZE: Record<DatePickerSize, string> = { sm: '13px', md: '14px', lg: '16px' };

// ── Styled components ─────────────────────────────────────────────────────────

const scaleIn = keyframes`
  from { opacity: 0; transform: scaleY(0.96) translateY(-4px); }
  to   { opacity: 1; transform: scaleY(1)    translateY(0); }
`;

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

const Trigger = styled.button<{
  $size: DatePickerSize;
  $isOpen: boolean;
  $hasError: boolean;
  $isDisabled: boolean;
  $hasValue: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: ${({ $size }) => HEIGHTS[$size]};
  padding: 0 12px 0 16px;
  border-radius: 14px;
  border: 1.5px solid
    ${({ $hasError, $isOpen }) => ($hasError ? '#D22232' : $isOpen ? '#0055FF' : '#C8D4E8')};
  background: #ffffff;
  font-size: ${({ $size }) => FONT_SIZE[$size]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ $hasValue }) => ($hasValue ? '#111827' : '#9BA5BE')};
  cursor: pointer;
  text-align: left;
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-visible {
    border-color: #0055ff;
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.10);
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      border-color: #0055ff;
      box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.10);
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
      background: #f8f9fc;
      border-color: #dde1ea;
    `}
`;

const TriggerLabel = styled.span`
  flex: 1;
`;

const CalIcon = styled.span`
  display: flex;
  align-items: center;
  color: #9ba5be;
  flex-shrink: 0;
`;

const CalPanel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e5ed;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 16px;
  width: 280px;
  animation: ${scaleIn} 150ms ease forwards;
  transform-origin: top left;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const CalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const MonthTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #6b7694;
  cursor: pointer;
  outline: none;
  transition: background-color 150ms ease;

  &:hover {
    background: #f0f2f5;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.12);
  }
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`;

const WeekdayLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 11px;
  font-weight: 600;
  color: #9ba5be;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayBtn = styled.button<{
  $isSelected: boolean;
  $isToday: boolean;
  $isCurrentMonth: boolean;
  $isDisabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  font-size: 13px;
  font-family: inherit;
  font-weight: ${({ $isSelected, $isToday }) => ($isSelected || $isToday ? '600' : '400')};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.3 : 1)};
  outline: none;
  transition: background-color 100ms ease, color 100ms ease;

  background-color: ${({ $isSelected }) => ($isSelected ? '#0055FF' : 'transparent')};
  border: ${({ $isSelected, $isToday }) =>
    $isSelected ? 'none' : $isToday ? '1.5px solid #0055FF' : 'none'};
  color: ${({ $isSelected, $isToday, $isCurrentMonth }) =>
    $isSelected
      ? '#ffffff'
      : $isToday
      ? '#0055ff'
      : $isCurrentMonth
      ? '#111827'
      : '#c5cbda'};

  &:hover:not(:disabled) {
    background-color: ${({ $isSelected }) => ($isSelected ? '#0044CC' : '#f0f2f5')};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.12);
  }
`;

const HelperText = styled.p<{ $isError?: boolean }>`
  margin: 6px 0 0;
  font-size: 12px;
  color: ${({ $isError }) => ($isError ? '#D22232' : '#9BA5BE')};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

// ── Component ─────────────────────────────────────────────────────────────────

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select a date',
  isDisabled = false,
  hasError = false,
  errorText,
  helperText,
  minDate,
  maxDate,
  size = 'md',
  id,
}: DatePickerProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  const now = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value ? value.getFullYear() : now.getFullYear());
  const [viewMonth, setViewMonth] = useState(value ? value.getMonth() : now.getMonth());
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const days = getCalendarDays(viewYear, viewMonth);
  const displayHelper = hasError && errorText ? errorText : helperText;

  function open() {
    if (isDisabled) return;
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPanelStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, zIndex: 9999 });
    }
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function selectDay(d: Date) {
    if (isDisabledDate(d, minDate, maxDate)) return;
    onChange(d);
    close();
  }

  useEffect(() => {
    if (!isOpen) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <FieldRoot>
      {label && (
        <FieldLabel htmlFor={inputId}>
          {label}
        </FieldLabel>
      )}

      <Trigger
        ref={triggerRef}
        id={inputId}
        type="button"
        disabled={isDisabled}
        $size={size}
        $isOpen={isOpen}
        $hasError={hasError}
        $isDisabled={isDisabled}
        $hasValue={!!value}
        onClick={isOpen ? close : open}
      >
        <TriggerLabel>{value ? formatDate(value) : placeholder}</TriggerLabel>
        <CalIcon><Calendar size={16} /></CalIcon>
      </Trigger>

      {displayHelper && (
        <HelperText $isError={!!(hasError && errorText)}>{displayHelper}</HelperText>
      )}

      {isOpen &&
        createPortal(
          <div style={panelStyle} ref={panelRef}>
            <CalPanel>
              <CalHeader>
                <NavBtn type="button" onClick={prevMonth} aria-label="Previous month">
                  <ChevronLeft size={16} />
                </NavBtn>
                <MonthTitle>{MONTHS[viewMonth]} {viewYear}</MonthTitle>
                <NavBtn type="button" onClick={nextMonth} aria-label="Next month">
                  <ChevronRight size={16} />
                </NavBtn>
              </CalHeader>

              <WeekdaysRow>
                {WEEKDAYS.map((d) => (
                  <WeekdayLabel key={d}>{d}</WeekdayLabel>
                ))}
              </WeekdaysRow>

              <DayGrid>
                {days.map(({ date, isCurrentMonth }, i) => {
                  const disabled = isDisabledDate(date, minDate, maxDate);
                  const selected = value ? sameDay(date, value) : false;
                  const today = isToday(date);
                  return (
                    <DayBtn
                      key={i}
                      type="button"
                      disabled={disabled}
                      $isSelected={selected}
                      $isToday={today}
                      $isCurrentMonth={isCurrentMonth}
                      $isDisabled={disabled}
                      onClick={() => selectDay(date)}
                      aria-label={formatDate(date)}
                      aria-pressed={selected}
                    >
                      {date.getDate()}
                    </DayBtn>
                  );
                })}
              </DayGrid>
            </CalPanel>
          </div>,
          document.body
        )}
    </FieldRoot>
  );
}
