import React from 'react';
import styled, { css } from 'styled-components';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'error' | 'warning';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const variantStyles = {
  info: css`
    background-color: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
    border-left-color: ${({ theme }) => theme.colors['color-brand-primary-muted']};
    color: ${({ theme }) => theme.colors['color-brand-primary']};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors['color-success-subtle']};
    border-left-color: ${({ theme }) => theme.colors['color-success-border']};
    color: ${({ theme }) => theme.colors['color-success-text']};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors['color-error-subtle']};
    border-left-color: ${({ theme }) => theme.colors['color-error-border']};
    color: ${({ theme }) => theme.colors['color-error-text']};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors['color-warning-subtle']};
    border-left-color: ${({ theme }) => theme.colors['color-warning-border']};
    color: ${({ theme }) => theme.colors['color-warning-text']};
  `,
};

const StyledAlert = styled.div<{ $variant: AlertVariant }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: 12px;
  /* Hairline perimeter + slim accent — avoids harsh “lit” edges in dark UI */
  border: 1px solid var(--color-border-subtle);
  border-left-width: 3px;
  border-left-style: solid;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  ${({ $variant }) => variantStyles[$variant]}
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Body = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: inherit;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: inherit;
  opacity: 0.7;
  transition: opacity 150ms ease, background-color 150ms ease;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.08);
  }
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }
`;

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info:    <Info size={18} />,
  success: <CheckCircle2 size={18} />,
  error:   <AlertCircle size={18} />,
  warning: <AlertTriangle size={18} />,
};

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  icon,
}: AlertProps) {
  return (
    <StyledAlert $variant={variant} role="alert">
      <IconWrapper>{icon ?? defaultIcons[variant]}</IconWrapper>
      <Content>
        {title && <Title>{title}</Title>}
        <Body>{children}</Body>
      </Content>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Dismiss alert">
          <X size={16} />
        </CloseButton>
      )}
    </StyledAlert>
  );
}
