import React, { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import type { ColorPickerProps, HsvColor } from './ColorPicker.types';
import {
  TriggerBtn,
  Swatch,
  TriggerLabel,
  ChevronWrap,
  PopoverPanel,
  SLSquare,
  SLWhiteGradient,
  SLBlackGradient,
  SLThumb,
  HueTrack,
  HueThumb,
  ColorInput,
  PresetsRow,
  PresetSwatch,
} from './ColorPicker.styles';

// ── Color conversion utils ────────────────────────────────────────────────────

function hexToHsv(hex: string): HsvColor {
  const clean = hex.replace('#', '').padEnd(6, '0').slice(0, 6);
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = h * 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;
  return { h, s, v };
}

function hsvToHex(h: number, s: number, v: number): string {
  const sv = s / 100;
  const vv = v / 100;
  const c = vv * sv;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vv - c;
  let r = 0, g = 0, b = 0;
  if      (h < 60)  { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '').padEnd(6, '0').slice(0, 6);
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex: string): string {
  const clean = hex.replace('#', '').padEnd(6, '0').slice(0, 6);
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function isValidHex(hex: string) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

function normalizeHex(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return '#' + clean.split('').map((c) => c + c).join('');
  }
  return '#' + clean.toLowerCase();
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ColorPicker({
  value,
  onChange,
  format = 'hex',
  presets,
  isDisabled = false,
  showInput = true,
  size = 'md',
}: ColorPickerProps) {
  const safeValue = isValidHex(value) ? normalizeHex(value) : '#0055ff';
  const [isOpen, setIsOpen] = useState(false);
  const [hsv, setHsv] = useState<HsvColor>(() => hexToHsv(safeValue));
  const [inputVal, setInputVal] = useState(safeValue);
  const [inputError, setInputError] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const slRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const isDraggingSL = useRef(false);
  const isDraggingHue = useRef(false);

  // Sync HSV when value prop changes
  useEffect(() => {
    if (isValidHex(value)) {
      const normalized = normalizeHex(value);
      const newHsv = hexToHsv(normalized);
      setHsv(newHsv);
      setInputVal(normalized);
    }
  }, [value]);

  // Format display value
  const displayValue =
    format === 'rgb' ? hexToRgb(safeValue) :
    format === 'hsl' ? hexToHsl(safeValue) :
    safeValue;

  // Pure hue color for gradient
  const hueColor = hsvToHex(hsv.h, 100, 100);

  function open() {
    if (isDisabled || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const GAP = 6;
    const panelH = 320;
    const spaceBelow = window.innerHeight - rect.bottom - GAP;
    const top = spaceBelow >= panelH || rect.top < panelH
      ? rect.bottom + GAP
      : rect.top - panelH - GAP;
    setPanelStyle({ position: 'fixed', left: rect.left, top, zIndex: 9999 });
    setIsOpen(true);
  }

  function close() { setIsOpen(false); }

  // Outside click / ESC
  useEffect(() => {
    if (!isOpen) return;
    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) close();
    }
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') close(); }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  // Emit change
  const emitChange = useCallback((h: number, s: number, v: number) => {
    const hex = hsvToHex(h, s, v);
    setInputVal(hex);
    onChange(hex);
  }, [onChange]);

  // ── SL Square drag ────────────────────────────────────────────────────────

  function getSLFromEvent(e: MouseEvent | React.MouseEvent): { s: number; v: number } {
    if (!slRef.current) return { s: hsv.s, v: hsv.v };
    const rect = slRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    return { s: x * 100, v: (1 - y) * 100 };
  }

  function onSLMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    isDraggingSL.current = true;
    const { s, v } = getSLFromEvent(e);
    const next = { ...hsv, s, v };
    setHsv(next);
    emitChange(next.h, next.s, next.v);
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!isDraggingSL.current) return;
      const { s, v } = getSLFromEvent(e);
      setHsv((prev) => {
        const next = { ...prev, s, v };
        emitChange(next.h, next.s, next.v);
        return next;
      });
    }
    function onUp() { isDraggingSL.current = false; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [emitChange]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Hue slider drag ───────────────────────────────────────────────────────

  function getHueFromEvent(e: MouseEvent | React.MouseEvent): number {
    if (!hueRef.current) return hsv.h;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    return x * 360;
  }

  function onHueMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    isDraggingHue.current = true;
    const h = getHueFromEvent(e);
    const next = { ...hsv, h };
    setHsv(next);
    emitChange(next.h, next.s, next.v);
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!isDraggingHue.current) return;
      const h = getHueFromEvent(e);
      setHsv((prev) => {
        const next = { ...prev, h };
        emitChange(next.h, next.s, next.v);
        return next;
      });
    }
    function onUp() { isDraggingHue.current = false; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [emitChange]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Hex input ─────────────────────────────────────────────────────────────

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setInputVal(raw);
    const candidate = raw.startsWith('#') ? raw : '#' + raw;
    if (isValidHex(candidate)) {
      setInputError(false);
      const normalized = normalizeHex(candidate);
      const newHsv = hexToHsv(normalized);
      setHsv(newHsv);
      onChange(normalized);
    }
  }

  function onInputBlur() {
    const candidate = inputVal.startsWith('#') ? inputVal : '#' + inputVal;
    if (!isValidHex(candidate)) {
      setInputError(true);
      setInputVal(safeValue);
      setTimeout(() => setInputError(false), 1500);
    }
  }

  return (
    <>
      <TriggerBtn
        ref={triggerRef}
        type="button"
        $isDisabled={isDisabled}
        disabled={isDisabled}
        onClick={() => isOpen ? close() : open()}
        aria-label="Open color picker"
      >
        <Swatch $color={safeValue} />
        <TriggerLabel>{displayValue}</TriggerLabel>
        <ChevronWrap $isOpen={isOpen}>
          <ChevronDown size={14} />
        </ChevronWrap>
      </TriggerBtn>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div style={panelStyle} ref={panelRef}>
          <PopoverPanel>
            {/* SL Square */}
            <SLSquare
              ref={slRef}
              style={{ background: hueColor }}
              onMouseDown={onSLMouseDown}
            >
              <SLWhiteGradient />
              <SLBlackGradient />
              <SLThumb
                style={{
                  left: `${hsv.s}%`,
                  top: `${100 - hsv.v}%`,
                  background: safeValue,
                }}
              />
            </SLSquare>

            {/* Hue Slider */}
            <HueTrack ref={hueRef} onMouseDown={onHueMouseDown}>
              <HueThumb style={{ left: `${(hsv.h / 360) * 100}%` }} />
            </HueTrack>

            {/* Input */}
            {showInput && (
              <ColorInput
                value={inputVal}
                onChange={onInputChange}
                onBlur={onInputBlur}
                style={inputError ? { borderColor: '#D22232', boxShadow: '0 0 0 3px rgba(210,34,50,0.12)' } : undefined}
                spellCheck={false}
                aria-label="Color hex value"
              />
            )}

            {/* Presets */}
            {presets && presets.length > 0 && (
              <PresetsRow>
                {presets.map((preset) => (
                  <PresetSwatch
                    key={preset}
                    type="button"
                    $color={preset}
                    $isActive={safeValue === normalizeHex(preset)}
                    onClick={() => {
                      if (!isValidHex(preset)) return;
                      const n = normalizeHex(preset);
                      setHsv(hexToHsv(n));
                      setInputVal(n);
                      onChange(n);
                    }}
                    aria-label={preset}
                  />
                ))}
              </PresetsRow>
            )}
          </PopoverPanel>
        </div>,
        document.body,
      )}
    </>
  );
}
