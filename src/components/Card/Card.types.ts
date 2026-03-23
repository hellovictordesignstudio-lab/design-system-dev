import type React from 'react';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';
export type FooterAlign = 'left' | 'center' | 'right' | 'space-between';
export type ImageAspectRatio = '16/9' | '4/3' | '1/1';
export type ImageObjectFit = 'cover' | 'contain';

export interface CardProps {
  children?: React.ReactNode;
  padding?: CardPadding;
  shadow?: CardShadow;
  hasBorder?: boolean;
  isHoverable?: boolean;
  isClickable?: boolean;
  /** Render the card as a different HTML element, e.g. "article" or "section" */
  as?: keyof JSX.IntrinsicElements;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  /** Slot for a button, badge, or any action element — pinned to the right */
  action?: React.ReactNode;
  hasDivider?: boolean;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface CardFooterProps {
  children: React.ReactNode;
  hasDivider?: boolean;
  align?: FooterAlign;
  className?: string;
  style?: React.CSSProperties;
}

export interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  objectFit?: ImageObjectFit;
}

/** Shared context value passed from Card to sub-components */
export interface CardContextValue {
  padding: CardPadding;
}
