export type FileUploadSize = 'sm' | 'md' | 'lg';
export type FileUploadStatus = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export interface FileUploadProps {
  /** Accepted MIME types or extensions, e.g. "image/*,.pdf" */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files allowed (default: 1) */
  maxFiles?: number;
  /** Allow multiple files */
  multiple?: boolean;
  /** Called with valid files after user selects/drops them */
  onUpload: (files: File[]) => void;
  /** Called when validation fails */
  onError?: (error: string) => void;
  isDisabled?: boolean;
  /** Custom hint text shown below the icon (overrides auto-generated accept/size hint) */
  hint?: string;
  size?: FileUploadSize;
}
