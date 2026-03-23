import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
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
  blue: '#E6EEFF',
  green: '#E6F5EE',
  orange: '#FEF0E6',
  red: '#FCEAEC',
  purple: '#F0E9FF',
};

const iconFg: Record<StatCardIconColor, string> = {
  blue: '#0055FF',
  green: '#1A7A45',
  orange: '#C05B1A',
  red: '#A81B28',
  purple: '#6B1FC2',
};

const CardRoot = styled.div`
  border: 1px solid #E2E5ED;
  border-radius: 14px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 4px;

  [data-theme='dark'] &,
  .dark & {
    background-color: #1A1F35;
    border-color: #2E3550;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
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
  color: #9BA5BE;

  [data-theme='dark'] &,
  .dark & {
    color: #6B7694;
  }
`;

const Value = styled.p`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  line-height: 1;

  [data-theme='dark'] &,
  .dark & {
    color: #F0F2F5;
  }
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

  ${({ $trend }) => {
    if ($trend === 'up') return `background-color: #E6F5EE; color: #1A7A45;`;
    if ($trend === 'down') return `background-color: #FCEAEC; color: #A81B28;`;
    return `background-color: #F0F2F5; color: #4A5270;`;
  }}
`;

const ChangeLabel = styled.span`
  font-size: 12px;
  color: #9BA5BE;
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
