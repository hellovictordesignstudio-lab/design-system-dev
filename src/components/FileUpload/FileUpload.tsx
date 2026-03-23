import React, { useRef, useState, useCallback, useEffect } from 'react';
import { UploadCloud, File as FileIcon2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useLang } from '../../theme/LangContext';
import type { FileUploadProps, UploadFile } from './FileUpload.types';
import {
  Root,
  DropZone,
  ZoneIcon,
  ZoneLabel,
  ZoneHint,
  FileList,
  FileRow,
  FileIcon,
  FileMeta,
  FileName,
  FileSize,
  ProgressBar,
  ProgressFill,
  ErrorMsg,
  RemoveBtn,
  HiddenInput,
} from './FileUpload.styles';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function buildHint(accept?: string, maxSize?: number): string {
  const parts: string[] = [];
  if (accept) {
    const types = accept
      .split(',')
      .map((s) => s.trim().replace(/^\./, '').toUpperCase())
      .filter(Boolean)
      .slice(0, 5);
    parts.push(types.join(', '));
  }
  if (maxSize) parts.push(`up to ${formatBytes(maxSize)}`);
  return parts.join(' — ');
}

let idCounter = 0;
function uid() {
  return `fu-${Date.now()}-${++idCounter}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function FileUpload({
  accept,
  maxSize,
  maxFiles = 1,
  multiple = false,
  onUpload,
  onError,
  isDisabled = false,
  hint,
  size = 'md',
}: FileUploadProps) {
  const { t } = useLang();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const autoHint = hint ?? buildHint(accept, maxSize);

  // ── Validate & add files ──────────────────────────────────────────────────

  const processFiles = useCallback(
    (raw: File[]) => {
      const remaining = maxFiles - files.length;
      if (remaining <= 0) {
        onError?.(`Maximum ${maxFiles} file${maxFiles !== 1 ? 's' : ''} allowed.`);
        return;
      }
      const toAdd = raw.slice(0, remaining);
      const validated: UploadFile[] = [];

      for (const file of toAdd) {
        if (maxSize && file.size > maxSize) {
          onError?.(`"${file.name}" exceeds the ${formatBytes(maxSize)} size limit.`);
          validated.push({
            id: uid(),
            file,
            progress: 0,
            status: 'error',
            error: `File too large (max ${formatBytes(maxSize)})`,
          });
        } else {
          validated.push({ id: uid(), file, progress: 0, status: 'uploading' });
        }
      }

      setFiles((prev) => [...prev, ...validated]);

      // Simulate progress for valid files
      const valid = validated.filter((f) => f.status === 'uploading');
      if (valid.length > 0) {
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              valid.find((v) => v.id === f.id) ? { ...f, progress: 100 } : f,
            ),
          );
          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) =>
                valid.find((v) => v.id === f.id) ? { ...f, status: 'success' } : f,
              ),
            );
            onUpload(valid.map((v) => v.file));
          }, 300);
        }, 1400);
      }
    },
    [files.length, maxFiles, maxSize, onError, onUpload],
  );

  // ── Drag handlers ─────────────────────────────────────────────────────────

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);
      const raw = Array.from(e.dataTransfer.files);
      if (raw.length) processFiles(multiple ? raw : raw.slice(0, 1));
    },
    [multiple, processFiles],
  );

  // ── Input change ──────────────────────────────────────────────────────────

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = Array.from(e.target.files ?? []);
      if (raw.length) processFiles(raw);
      e.target.value = '';
    },
    [processFiles],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Cleanup on unmount
  useEffect(() => () => { dragCounter.current = 0; }, []);

  return (
    <Root $isDisabled={isDisabled}>
      {/* Drop Zone — hidden in 'sm' size via CSS */}
      <DropZone
        $isDragging={isDragging}
        $size={size}
        onClick={() => inputRef.current?.click()}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        aria-label={t('fileupload.dragOrBrowse')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
      >
        <ZoneIcon>
          <UploadCloud size={32} strokeWidth={1.5} />
        </ZoneIcon>
        <ZoneLabel>
          {isDragging ? (
            t('fileupload.dropHere')
          ) : (
            <>
              {t('fileupload.dragOrBrowse').split(' or ')[0]}{' '}
              <span onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
                {t('fileupload.browse')}
              </span>
            </>
          )}
        </ZoneLabel>
        {autoHint && <ZoneHint>{autoHint}</ZoneHint>}
      </DropZone>

      {/* File list */}
      {files.length > 0 && (
        <FileList>
          {files.map((f) => (
            <FileRow key={f.id} $status={f.status}>
              <FileIcon $status={f.status}>
                {f.status === 'success' ? (
                  <CheckCircle size={18} />
                ) : f.status === 'error' ? (
                  <AlertCircle size={18} />
                ) : (
                  <FileIcon2 size={18} />
                )}
              </FileIcon>

              <FileMeta>
                <FileName title={f.file.name}>{f.file.name}</FileName>
                <FileSize>{formatBytes(f.file.size)}</FileSize>
                {f.status === 'uploading' && (
                  <ProgressBar>
                    <ProgressFill $progress={f.progress} $animate={f.progress === 0} />
                  </ProgressBar>
                )}
                {f.status === 'error' && f.error && <ErrorMsg>{f.error}</ErrorMsg>}
              </FileMeta>

              <RemoveBtn
                type="button"
                onClick={() => removeFile(f.id)}
                aria-label={t('fileupload.removeFile')}
              >
                <X size={14} />
              </RemoveBtn>
            </FileRow>
          ))}
        </FileList>
      )}

      <HiddenInput
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onInputChange}
      />
    </Root>
  );
}
