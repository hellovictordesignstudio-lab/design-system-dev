import React from 'react';
import styled from 'styled-components';
import { Inbox, Search, AlertCircle, WifiOff } from 'lucide-react';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateVariant = 'default' | 'search' | 'error' | 'offline';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: EmptyStateSize;
  variant?: EmptyStateVariant;
}

const paddingMap: Record<EmptyStateSize, string> = {
  sm: '24px',
  md: '48px',
  lg: '64px',
};

const iconWrapperSize: Record<EmptyStateSize, number> = {
  sm: 48,
  md: 64,
  lg: 80,
};

const titleSize: Record<EmptyStateSize, string> = {
  sm: '15px',
  md: '17px',
  lg: '20px',
};

const descSize: Record<EmptyStateSize, string> = {
  sm: '13px',
  md: '14px',
  lg: '14px',
};

const Container = styled.div<{ $size: EmptyStateSize }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ $size }) => paddingMap[$size]};
`;

const IconWrapper = styled.div<{ $size: EmptyStateSize }>`
  width: ${({ $size }) => iconWrapperSize[$size]}px;
  height: ${({ $size }) => iconWrapperSize[$size]}px;
  border-radius: 50%;
  background-color: #F0F2F5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9BA5BE;
  flex-shrink: 0;

  [data-theme='dark'] &,
  .dark & {
    background-color: #2E3550;
    color: #6B7694;
  }
`;

const Title = styled.p<{ $size: EmptyStateSize }>`
  margin: 16px 0 0;
  font-size: ${({ $size }) => titleSize[$size]};
  font-weight: 700;
  color: #111827;

  [data-theme='dark'] &,
  .dark & {
    color: #F0F2F5;
  }
`;

const Description = styled.p<{ $size: EmptyStateSize }>`
  margin: 6px 0 0;
  font-size: ${({ $size }) => descSize[$size]};
  color: #9BA5BE;
  max-width: 320px;
  line-height: 1.6;

  [data-theme='dark'] &,
  .dark & {
    color: #6B7694;
  }
`;

const ActionSlot = styled.div`
  margin-top: 20px;
`;

const variantDefaults: Record<
  EmptyStateVariant,
  { icon: React.ReactNode; title: string; description: string }
> = {
  default: {
    icon: <Inbox />,
    title: 'Nothing here yet',
    description: 'Add something to get started.',
  },
  search: {
    icon: <Search />,
    title: 'No results found',
    description: 'Try adjusting your search.',
  },
  error: {
    icon: <AlertCircle />,
    title: 'Something went wrong',
    description: 'Please try again later.',
  },
  offline: {
    icon: <WifiOff />,
    title: "You're offline",
    description: 'Check your internet connection.',
  },
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'md',
  variant = 'default',
}: EmptyStateProps) {
  const defaults = variantDefaults[variant];
  const resolvedIcon = icon ?? defaults.icon;
  const resolvedTitle = title ?? defaults.title;
  const resolvedDesc = description ?? defaults.description;

  const iconSize = Math.round(iconWrapperSize[size] * 0.5);

  return (
    <Container $size={size}>
      <IconWrapper $size={size}>
        {React.isValidElement(resolvedIcon)
          ? React.cloneElement(resolvedIcon as React.ReactElement<{ size?: number }>, {
              size: iconSize,
            })
          : resolvedIcon}
      </IconWrapper>
      <Title $size={size}>{resolvedTitle}</Title>
      {resolvedDesc && <Description $size={size}>{resolvedDesc}</Description>}
      {action && <ActionSlot>{action}</ActionSlot>}
    </Container>
  );
}
