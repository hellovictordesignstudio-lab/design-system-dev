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
  color: var(--color-text-primary, #0C0D10);

  span.required {
    color: #D22232;
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
  color: var(--color-text-primary, #0C0D10);
  background: var(--color-bg-primary, #FFFFFF);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  resize: ${({ $resize }) => $resize};

  border: 1.5px solid ${({ $hasError, $hasSuccess }) =>
    $hasError
      ? '#D22232'
      : $hasSuccess
      ? '#0A8853'
      : 'var(--color-border-default, #DDE1EA)'};

  ${({ $size }) => sizeStyles[$size]}

  &::placeholder {
    color: var(--color-text-tertiary, #9BA5BE);
  }

  &:hover:not(:disabled):not(:read-only) {
    border-color: ${({ $hasError, $hasSuccess }) =>
      $hasError ? '#A81B28' : $hasSuccess ? '#086B42' : 'var(--color-border-strong, #C5CBDA)'};
  }

  &:focus {
    border-color: ${({ $hasError, $hasSuccess }) =>
      $hasError ? '#D22232' : $hasSuccess ? '#0A8853' : 'var(--color-border-brand, #0055FF)'};
    box-shadow: 0 0 0 3px ${({ $hasError, $hasSuccess }) =>
      $hasError ? 'rgba(210,34,50,0.15)' : $hasSuccess ? 'rgba(10,136,83,0.15)' : 'var(--color-bg-brand-subtle, #E6EEFF)'};
  }

  &:disabled {
    background: var(--color-bg-tertiary, #EFF1F5);
    color: var(--color-text-disabled, #9BA5BE);
    cursor: not-allowed;
    opacity: 0.6;
    resize: none;
  }

  &:read-only {
    background: var(--color-bg-secondary, #F8F9FC);
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
  color: ${({ $hasError, $hasSuccess }) =>
    $hasError ? '#D22232' : $hasSuccess ? '#0A8853' : 'var(--color-text-secondary, #4A5270)'};
  line-height: 1.5;
`;

export const CharCount = styled.span<{ $isOver: boolean }>`
  font-family: 'Nunito Sans', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $isOver }) => ($isOver ? '#D22232' : 'var(--color-text-tertiary, #9BA5BE)')};
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: auto;
`;
