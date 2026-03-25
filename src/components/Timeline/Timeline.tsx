import React from 'react';
import styled from 'styled-components';
import { colorPrimitives } from '../../tokens/primitives';

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

// ── Colors (fixed palette from primitives) ───────────────────────────────────

const iconBgMap: Record<TimelineIconColor, string> = {
  blue: colorPrimitives.blue[50],
  green: colorPrimitives.green[50],
  orange: colorPrimitives.orange[50],
  red: colorPrimitives.red[50],
  purple: colorPrimitives.violet[50],
  gray: colorPrimitives.neutral[100],
};

const iconFgMap: Record<TimelineIconColor, string> = {
  blue: colorPrimitives.blue[500],
  green: colorPrimitives.green[400],
  orange: colorPrimitives.orange[500],
  red: colorPrimitives.red[500],
  purple: colorPrimitives.violet[600],
  gray: colorPrimitives.neutral[500],
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
  background-color: ${({ theme, $isFirst }) =>
    $isFirst ? theme.colors['color-brand-primary'] : theme.colors['color-border-default']};
  flex-shrink: 0;
  z-index: 1;
  margin: ${({ $variant }) => ($variant === 'compact' ? '8px 0' : '11px 0')};
`;

const ConnectorLine = styled.div<{ $variant: TimelineVariant }>`
  width: 2px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors['color-border-default']};
  margin-top: 4px;
  min-height: ${({ $variant }) => ($variant === 'compact' ? '12px' : '16px')};
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
  color: ${({ theme }) => theme.colors['color-text-primary']};
`;

const Description = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  line-height: 1.6;
`;

const DateText = styled.p`
  margin: 4px 0 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
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
