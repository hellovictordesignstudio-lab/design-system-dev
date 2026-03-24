import React from 'react';
import styled, { css } from 'styled-components';
import { Check, X } from 'lucide-react';
import { Button } from '../Button/Button';
import type { PricingPlan, PricingTableProps } from './PricingTable.types';

const Wrap = styled.section`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const Title = styled.h2`
  margin: 0 0 20px;
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-items: stretch;
`;

const Card = styled.article<{ $highlight: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 22px;
  border-radius: 18px;
  border: 1px solid #e2e5ed;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

  ${({ $highlight }) =>
    $highlight &&
    css`
      border-color: #0055ff;
      box-shadow: 0 12px 40px rgba(0, 85, 255, 0.12);
    `}
`;

const Badge = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #0055ff;
  background: #e8eeff;
  padding: 4px 10px;
  border-radius: 9999px;
`;

const PlanName = styled.h3`
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 800;
  color: #111827;
`;

const PlanDesc = styled.p`
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 1.5;
  color: #6b7694;
  min-height: 2.6em;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 18px;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
`;

const Period = styled.span`
  font-size: 14px;
  color: #9ba5be;
`;

const FeatList = styled.ul`
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const Feat = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
`;

const IconOk = styled.span`
  display: inline-flex;
  color: #0a9f6e;
  margin-top: 2px;
`;

const IconNo = styled.span`
  display: inline-flex;
  color: #d22232;
  margin-top: 2px;
`;

export function PricingTable({ plans, title }: PricingTableProps) {
  return (
    <Wrap>
      {title && <Title>{title}</Title>}
      <Grid>
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </Grid>
    </Wrap>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card $highlight={!!plan.isHighlighted}>
      {plan.badge && <Badge>{plan.badge}</Badge>}
      <PlanName>{plan.name}</PlanName>
      {plan.description && <PlanDesc>{plan.description}</PlanDesc>}
      <PriceRow>
        <Price>{plan.price}</Price>
        {plan.period && <Period>{plan.period}</Period>}
      </PriceRow>
      <FeatList>
        {plan.features.map((f, i) => (
          <Feat key={i}>
            {f.included === false ? (
              <IconNo>
                <X size={16} strokeWidth={2.5} />
              </IconNo>
            ) : (
              <IconOk>
                <Check size={16} strokeWidth={2.5} />
              </IconOk>
            )}
            <span>{f.label}</span>
          </Feat>
        ))}
      </FeatList>
      {plan.ctaLabel && (
        <Button
          variant={plan.isHighlighted ? 'primary' : 'secondary'}
          fullWidth
          onClick={plan.onCtaClick}
        >
          {plan.ctaLabel}
        </Button>
      )}
    </Card>
  );
}
