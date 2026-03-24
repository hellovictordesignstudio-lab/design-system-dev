import type { ReactNode } from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  columns: FooterColumn[];
  brand?: ReactNode;
  tagline?: ReactNode;
  /** Bottom bar (copyright, etc.) */
  bottom?: ReactNode;
  /** Optional full-width slot above columns */
  children?: ReactNode;
}
