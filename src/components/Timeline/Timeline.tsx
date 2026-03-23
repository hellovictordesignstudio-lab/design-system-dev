import React from 'react';
import styled from 'styled-components';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TimelineVariant = 'default' | 'compact';
export type TimelineIconColor = 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray';

export interface TimelineProps {
  variant?: TimelineVariant;
  children: React.ReactNode;
}

export interface TimelineItemProps {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  iconColor?: TimelineIconColor;
  isLast?: boolean;
  _isFirst?: boolean;
  _variant?: TimelineVariant;
}

// ── Colors ────────────────────────────────────────────────────────────────────

const iconBgMap: Record<TimelineIconColor, string> = {
  blue: '#E6EEFF',
  green: '#E6F5EE',
  orange: '#FEF0E6',
  red: '#FCEAEC',
  purple: '#F0E9FF',
  gray: '#F0F2F5',
};

const iconFgMap: Record<TimelineIconColor, string> = {
  blue: '#0055FF',
  green: '#1A7A45',
  orange: '#C05B1A',
  red: '#A81B28',
  purple: '#6B1FC2',
  gray: '#6B7694',
};

// ── Styled ────────────────────────────────────────────────────────────────────

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const ItemRow = styled.div`
  display: flex;
  position: relative;
`;

const LeftCol = styled.div<{ $variant: TimelineVariant }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: ${({ $variant }) => ($variant === 'compact' ? '24px' : '32px')};
`;

const IconCircle = styled.div<{ $color: TimelineIconColor; $variant: TimelineVariant }>`
  width: ${({ $variant }) => ($variant === 'compact' ? '24px' : '32px')};
  height: ${({ $variant }) => ($variant === 'compact' ? '24px' : '32px')};
  border-radius: 50%;
  background-color: ${({ $color }) => iconBgMap[$color]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => iconFgMap[$color]};
  flex-shrink: 0;
  z-index: 1;
`;

const DotCircle = styled.div<{ $isFirst: boolean; $variant: TimelineVariant }>`
  width: ${({ $variant }) => ($variant === 'compact' ? '8px' : '10px')};
  height: ${({ $variant }) => ($variant === 'compact' ? '8px' : '10px')};
  border-radius: 50%;
  background-color: ${({ $isFirst }) => ($isFirst ? '#0055FF' : '#DDE1EA')};
  flex-shrink: 0;
  z-index: 1;
  margin: ${({ $variant }) => ($variant === 'compact' ? '8px 0' : '11px 0')};

  [data-theme='dark'] &, .dark & {
    background-color: ${({ $isFirst }) => ($isFirst ? '#0055FF' : '#2E3550')};
  }
`;

const ConnectorLine = styled.div<{ $variant: TimelineVariant }>`
  width: 2px;
  flex: 1;
  background-color: #E2E5ED;
  margin-top: 4px;
  min-height: ${({ $variant }) => ($variant === 'compact' ? '12px' : '16px')};

  [data-theme='dark'] &, .dark & {
    background-color: #2E3550;
  }
`;

const ContentCol = styled.div<{ $isLast: boolean; $variant: TimelineVariant }>`
  margin-left: ${({ $variant }) => ($variant === 'compact' ? '12px' : '16px')};
  padding-bottom: ${({ $isLast }) => ($isLast ? '0' : '24px')};
  padding-top: 4px;
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #111827;

  [data-theme='dark'] &, .dark & {
    color: #F0F2F5;
  }
`;

const Description = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: #6B7694;
  line-height: 1.6;

  [data-theme='dark'] &, .dark & {
    color: #9BA5BE;
  }
`;

const DateText = styled.p`
  margin: 4px 0 0;
  font-size: 11px;
  color: #9BA5BE;
`;

// ── Root ──────────────────────────────────────────────────────────────────────

function TimelineRoot({ variant = 'default', children }: TimelineProps) {
  const items = React.Children.toArray(children);
  return (
    <RootWrapper>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<TimelineItemProps>, {
          isLast: index === items.length - 1,
          _isFirst: index === 0,
          _variant: variant,
        });
      })}
    </RootWrapper>
  );
}

// ── Item ──────────────────────────────────────────────────────────────────────

function TimelineItem({
  title,
  description,
  date,
  icon,
  iconColor = 'gray',
  isLast = false,
  _isFirst = false,
  _variant = 'default',
}: TimelineItemProps) {
  const hasIcon = !!icon;

  return (
    <ItemRow>
      <LeftCol $variant={_variant}>
        {hasIcon ? (
          <IconCircle $color={iconColor} $variant={_variant}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
                  size: _variant === 'compact' ? 12 : 16,
                })
              : icon}
          </IconCircle>
        ) : (
          <DotCircle $isFirst={_isFirst} $variant={_variant} />
        )}
        {!isLast && <ConnectorLine $variant={_variant} />}
      </LeftCol>

      <ContentCol $isLast={isLast} $variant={_variant}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        {date && <DateText>{date}</DateText>}
      </ContentCol>
    </ItemRow>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
});
