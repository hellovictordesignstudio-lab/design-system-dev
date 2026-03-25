import styled, { css, keyframes } from 'styled-components';
import type { FileUploadSize } from './FileUpload.types';

// ── Animations ────────────────────────────────────────────────────────────────

export const progressAnim = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Drag Zone heights ──────────────────────────────────────────────────────────

const zoneHeights: Record<FileUploadSize, string> = {
  sm: '0px', // sm = list-only, no drag zone
  md: '140px',
  lg: '200px',
};

// ── Root ──────────────────────────────────────────────────────────────────────

export const Root = styled.div<{ $isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  ${({ $isDisabled }) => $isDisabled && css`opacity: 0.4; pointer-events: none;`}
`;

// ── Drop Zone ─────────────────────────────────────────────────────────────────

export const DropZone = styled.div<{
  $isDragging: boolean;
  $size: FileUploadSize;
}>`
  display: ${({ $size }) => ($size === 'sm' ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: ${({ $size }) => zoneHeights[$size]};
  border-radius: 14px;
  border: 1.5px dashed
    ${({ theme, $isDragging }) =>
      $isDragging ? theme.colors['color-border-focus'] : theme.colors['color-border-strong']};
  background-color: ${({ theme, $isDragging }) =>
    $isDragging
      ? theme.mode === 'dark'
        ? 'rgba(10, 132, 255, 0.12)'
        : 'rgba(0, 85, 255, 0.04)'
      : theme.colors['color-bg-subtle']};
  cursor: pointer;
  transition: border-color 200ms ease, background-color 200ms ease;
  padding: 24px 16px;
`;

export const ZoneIcon = styled.div`
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  display: flex;
  align-items: center;
`;

export const ZoneLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors['color-text-link']};
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ZoneHint = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  text-align: center;
`;

// ── File List ─────────────────────────────────────────────────────────────────

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FileRow = styled.div<{ $status: 'uploading' | 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1.5px solid
    ${({ theme, $status }) =>
      $status === 'success'
        ? theme.colors['color-success-default']
        : $status === 'error'
          ? theme.colors['color-error-default']
          : theme.colors['color-border-default']};
  background-color: ${({ theme, $status }) =>
    $status === 'success'
      ? theme.colors['color-success-subtle']
      : $status === 'error'
        ? theme.colors['color-error-subtle']
        : theme.colors['color-bg-default']};
  animation: ${fadeIn} 200ms ease forwards;
  transition: border-color 300ms ease, background-color 300ms ease;
`;

export const FileIcon = styled.div<{ $status: 'uploading' | 'success' | 'error' }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme, $status }) =>
    $status === 'success'
      ? theme.colors['color-success-default']
      : $status === 'error'
        ? theme.colors['color-error-default']
        : theme.colors['color-text-secondary']};
`;

export const FileMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileSize = styled.p`
  margin: 2px 0 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
`;

export const ProgressBar = styled.div`
  margin-top: 6px;
  height: 3px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors['color-border-default']};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number; $animate: boolean }>`
  height: 100%;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors['color-brand-primary']};
  width: ${({ $progress }) => $progress}%;
  transition: width 200ms ease;

  ${({ $animate }) =>
    $animate &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${progressAnim} 1.4s ease forwards;
      }
    `}
`;

export const ErrorMsg = styled.p`
  margin: 3px 0 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors['color-error-default']};
`;

export const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  flex-shrink: 0;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-bg-muted']};
    color: ${({ theme }) => theme.colors['color-error-default']};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
  }
`;

// ── Hidden input ───────────────────────────────────────────────────────────────

export const HiddenInput = styled.input`
  display: none;
`;
