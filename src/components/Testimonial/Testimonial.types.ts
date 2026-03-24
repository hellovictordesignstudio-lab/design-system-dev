import type { ReactNode } from 'react';

export interface TestimonialProps {
  quote: ReactNode;
  author: string;
  role?: ReactNode;
  avatar?: ReactNode;
  rating?: number;
  /** Optional logo or brand mark */
  logo?: ReactNode;
}
