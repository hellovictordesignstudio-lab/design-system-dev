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
  sm: '0px',  // sm = list-only, no drag zone
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
  border: 1.5px dashed ${({ $isDragging }) => ($isDragging ? '#0055FF' : '#C8D4E8')};
  background-color: ${({ $isDragging }) =>
    $isDragging ? 'rgba(0,85,255,0.04)' : '#F8F9FC'};
  cursor: pointer;
  transition: border-color 200ms ease, background-color 200ms ease;
  padding: 24px 16px;

  [data-theme='dark'] &, .dark & {
    background-color: ${({ $isDragging }) =>
      $isDragging ? 'rgba(0,85,255,0.08)' : '#1A1F35'};
    border-color: ${({ $isDragging }) => ($isDragging ? '#0055FF' : '#2E3550')};
  }
`;

export const ZoneIcon = styled.div`
  color: #9BA5BE;
  display: flex;
  align-items: center;

  [data-theme='dark'] &, .dark & {
    color: #6B7694;
  }
`;

export const ZoneLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6B7694;
  text-align: center;

  span {
    color: #0055FF;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }

  [data-theme='dark'] &, .dark & {
    color: #9BA5BE;
    span { color: #7BA4FF; }
  }
`;

export const ZoneHint = styled.p`
  margin: 0;
  font-size: 12px;
  color: #9BA5BE;
  text-align: center;

  [data-theme='dark'] &, .dark & {
    color: #6B7694;
  }
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
    ${({ $status }) =>
      $status === 'success' ? '#16A34A' : $status === 'error' ? '#D22232' : '#E2E5ED'};
  background-color: ${({ $status }) =>
    $status === 'success'
      ? 'rgba(22,163,74,0.04)'
      : $status === 'error'
      ? 'rgba(210,34,50,0.04)'
      : '#ffffff'};
  animation: ${fadeIn} 200ms ease forwards;
  transition: border-color 300ms ease, background-color 300ms ease;

  [data-theme='dark'] &, .dark & {
    background-color: ${({ $status }) =>
      $status === 'success'
        ? 'rgba(22,163,74,0.08)'
        : $status === 'error'
        ? 'rgba(210,34,50,0.08)'
        : '#1A1F35'};
    border-color: ${({ $status }) =>
      $status === 'success' ? '#16A34A' : $status === 'error' ? '#D22232' : '#2E3550'};
  }
`;

export const FileIcon = styled.div<{ $status: 'uploading' | 'success' | 'error' }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ $status }) =>
    $status === 'success' ? '#16A34A' : $status === 'error' ? '#D22232' : '#6B7694'};
`;

export const FileMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
  }
`;

export const FileSize = styled.p`
  margin: 2px 0 0;
  font-size: 11px;
  color: #9BA5BE;
`;

export const ProgressBar = styled.div`
  margin-top: 6px;
  height: 3px;
  border-radius: 9999px;
  background-color: #E2E5ED;
  overflow: hidden;

  [data-theme='dark'] &, .dark & {
    background-color: #2E3550;
  }
`;

export const ProgressFill = styled.div<{ $progress: number; $animate: boolean }>`
  height: 100%;
  border-radius: 9999px;
  background-color: #0055FF;
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
  color: #D22232;
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
  color: #9BA5BE;
  flex-shrink: 0;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover { background-color: #F0F2F5; color: #D22232; }
  &:focus-visible { outline: 2px solid #0055FF; }

  [data-theme='dark'] &, .dark & {
    color: #6B7694;
    &:hover { background-color: #2E3550; color: #F87171; }
  }
`;

// ── Hidden input ───────────────────────────────────────────────────────────────

export const HiddenInput = styled.input`
  display: none;
`;
