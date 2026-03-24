import type { ReactNode } from 'react';

export interface PricingFeature {
  label: ReactNode;
  /** Checkmark included / excluded */
  included?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: ReactNode;
  price: ReactNode;
  /** e.g. "/month" */
  period?: ReactNode;
  features: PricingFeature[];
  ctaLabel?: ReactNode;
  onCtaClick?: () => void;
  isHighlighted?: boolean;
  badge?: ReactNode;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  /** Optional comparison heading row */
  title?: ReactNode;
}
