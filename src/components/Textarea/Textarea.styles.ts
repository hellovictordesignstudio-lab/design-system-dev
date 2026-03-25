import styled, { css } from 'styled-components';
import type { TextareaSize, TextareaResize } from './Textarea.types';

const sizeStyles = {
  sm: css`font-size: 13px; padding: 7px 12px; min-height: 80px;`,
  md: css`font-size: 14px; padding: 9px 14px; min-height: 100px;`,
  lg: css`font-size: 15px; padding: 11px 16px; min-height: 120px;`,
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const Label = styled.label`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-primary']};

  span.required {
    color: ${({ theme }) => theme.colors['color-error-default']};
    margin-left: 3px;
  }
`;

interface StyledTextareaProps {
  $size: TextareaSize;
  $resize: TextareaResize;
  $hasError: boolean;
  $hasSuccess: boolean;
  $isDisabled: boolean;
  $isReadOnly: boolean;
}

export const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 100%;
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  background: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 8px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  resize: ${({ $resize }) => $resize};

  border: 1.5px solid
    ${({ theme, $hasError, $hasSuccess }) =>
      $hasError
        ? theme.colors['color-error-default']
        : $hasSuccess
          ? theme.colors['color-success-default']
          : theme.colors['color-border-default']};

  ${({ $size }) => sizeStyles[$size]}

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-text-tertiary']};
  }

  &:hover:not(:disabled):not(:read-only) {
    border-color: ${({ theme, $hasError, $hasSuccess }) =>
      $hasError
        ? theme.colors['color-error-text']
        : $hasSuccess
          ? theme.colors['color-success-text']
          : theme.colors['color-border-strong']};
  }

  &:focus {
    border-color: ${({ theme, $hasError, $hasSuccess }) =>
      $hasError
        ? theme.colors['color-error-default']
        : $hasSuccess
          ? theme.colors['color-success-default']
          : theme.colors['color-border-focus']};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError, $hasSuccess }) =>
        $hasError
          ? theme.mode === 'dark'
            ? 'rgba(255, 69, 58, 0.2)'
            : 'rgba(210, 34, 50, 0.15)'
          : $hasSuccess
            ? theme.mode === 'dark'
              ? 'rgba(50, 215, 75, 0.2)'
              : 'rgba(10, 136, 83, 0.15)'
            : theme.colors['color-brand-primary-subtle']};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors['color-bg-muted']};
    color: ${({ theme }) => theme.colors['color-text-disabled']};
    cursor: not-allowed;
    opacity: 0.6;
    resize: none;
  }

  &:read-only {
    background: ${({ theme }) => theme.colors['color-bg-subtle']};
    cursor: default;
    resize: none;
  }
`;

interface FooterProps {
  $hasError: boolean;
}

export const Footer = styled.div<FooterProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

export const HelperText = styled.span<{ $hasError: boolean; $hasSuccess: boolean }>`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, $hasError, $hasSuccess }) =>
    $hasError
      ? theme.colors['color-error-default']
      : $hasSuccess
        ? theme.colors['color-success-default']
        : theme.colors['color-text-secondary']};
  line-height: 1.5;
`;

export const CharCount = styled.span<{ $isOver: boolean }>`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, $isOver }) =>
    $isOver ? theme.colors['color-error-default'] : theme.colors['color-text-tertiary']};
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: auto;
`;
