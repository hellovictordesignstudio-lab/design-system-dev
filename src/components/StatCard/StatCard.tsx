import React from 'react';
import styled, { css } from 'styled-components';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { colorPrimitives } from '../../tokens/primitives';
import { Skeleton } from '../Skeleton';

export type StatCardIconColor = 'blue' | 'green' | 'orange' | 'red' | 'purple';
export type StatCardTrend = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconColor?: StatCardIconColor;
  trend?: StatCardTrend;
  isLoading?: boolean;
}

const iconBg: Record<StatCardIconColor, string> = {
  blue: colorPrimitives.blue[50],
  green: colorPrimitives.green[50],
  orange: colorPrimitives.orange[50],
  red: colorPrimitives.red[50],
  purple: colorPrimitives.violet[50],
};

const iconFg: Record<StatCardIconColor, string> = {
  blue: colorPrimitives.blue[500],
  green: colorPrimitives.green[400],
  orange: colorPrimitives.orange[500],
  red: colorPrimitives.red[500],
  purple: colorPrimitives.violet[600],
};

const CardRoot = styled.div`
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  border-radius: 14px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const IconCircle = styled.div<{ $color: StatCardIconColor }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ $color }) => iconBg[$color]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $color }) => iconFg[$color]};
`;

const Label = styled.p`
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
`;

const Value = styled.p`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  letter-spacing: -0.02em;
  line-height: 1;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const ChangePill = styled.span<{ $trend: StatCardTrend }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;

  ${({ theme, $trend }) => {
    if ($trend === 'up') {
      return css`
        background-color: ${theme.colors['color-success-subtle']};
        color: ${theme.colors['color-success-text']};
      `;
    }
    if ($trend === 'down') {
      return css`
        background-color: ${theme.colors['color-error-subtle']};
        color: ${theme.colors['color-error-text']};
      `;
    }
    return css`
      background-color: ${theme.colors['color-bg-muted']};
      color: ${theme.colors['color-text-secondary']};
    `;
  }}
`;

const ChangeLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
`;

function getTrend(change?: number, explicitTrend?: StatCardTrend): StatCardTrend {
  if (explicitTrend) return explicitTrend;
  if (change === undefined) return 'neutral';
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return 'neutral';
}

export function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  iconColor = 'blue',
  trend,
  isLoading = false,
}: StatCardProps) {
  const resolvedTrend = getTrend(change, trend);

  const changeText =
    change !== undefined
      ? `${change > 0 ? '+' : ''}${change}%`
      : null;

  return (
    <CardRoot>
      <TopRow>
        <div>
          <Label>{label}</Label>
          {isLoading ? (
            <Skeleton width="120px" height="34px" borderRadius="6px" />
          ) : (
            <Value>{value}</Value>
          )}
        </div>
        {icon && (
          <IconCircle $color={iconColor}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 20 })
              : icon}
          </IconCircle>
        )}
      </TopRow>

      {(change !== undefined || changeLabel) && (
        <BottomRow>
          {isLoading ? (
            <Skeleton width="80px" height="20px" borderRadius="9999px" />
          ) : (
            <>
              {change !== undefined && (
                <ChangePill $trend={resolvedTrend}>
                  {resolvedTrend === 'up' && <TrendingUp size={11} />}
                  {resolvedTrend === 'down' && <TrendingDown size={11} />}
                  {resolvedTrend === 'neutral' && <Minus size={11} />}
                  {changeText}
                </ChangePill>
              )}
              {changeLabel && <ChangeLabel>{changeLabel}</ChangeLabel>}
            </>
          )}
        </BottomRow>
      )}
    </CardRoot>
  );
}
