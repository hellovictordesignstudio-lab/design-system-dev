import styled, { css } from 'styled-components';
import type { CardPadding, CardShadow, FooterAlign, ImageAspectRatio, ImageObjectFit } from './Card.types';

// ── Static value maps ─────────────────────────────────────────────────────────

export const cardShadowMap: Record<CardShadow, string> = {
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 4px 16px rgba(0, 0, 0, 0.10)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.14)',
};

/** One shadow step up — used for the hover state of isHoverable cards */
const hoverShadowMap: Record<CardShadow, string> = {
  none: cardShadowMap.sm,
  sm: cardShadowMap.md,
  md: cardShadowMap.lg,
  lg: cardShadowMap.lg,
};

export const cardPaddingMap: Record<CardPadding, string> = {
  none: '0',
  sm: '12px',
  md: '20px',
  lg: '28px',
};

const footerJustifyMap: Record<FooterAlign, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  'space-between': 'space-between',
};

// ── Card root ─────────────────────────────────────────────────────────────────

export const StyledCard = styled.div<{
  $shadow: CardShadow;
  $hasBorder: boolean;
  $isHoverable: boolean;
  $isClickable: boolean;
  $shadow_val: string; // resolved value to avoid accessing map inside css
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
  border-radius: 12px;
  border: ${({ $hasBorder, theme }) =>
    $hasBorder ? `1px solid ${theme.colors['color-border-default']}` : 'none'};
  box-shadow: ${({ $shadow_val }) => $shadow_val};
  overflow: hidden;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition:
    box-shadow ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut},
    transform ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut};

  ${({ $isHoverable, $shadow }) =>
    $isHoverable &&
    css`
      &:hover {
        box-shadow: ${hoverShadowMap[$shadow]};
        transform: scale(1.01);
      }
    `}

  ${({ $isClickable }) =>
    $isClickable &&
    css`
      cursor: pointer;
      user-select: none;
      &:active {
        transform: scale(0.99);
      }
    `}
`;

// ── Card.Header ───────────────────────────────────────────────────────────────

export const StyledCardHeader = styled.div<{
  $padding: CardPadding;
  $hasDivider: boolean;
}>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: ${({ $padding }) => cardPaddingMap[$padding]};

  ${({ $hasDivider, theme }) =>
    $hasDivider &&
    css`
      border-bottom: 1px solid ${theme.colors['color-border-default']};
    `}
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
`;

export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors['color-text-primary']};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

// ── Card.Body ─────────────────────────────────────────────────────────────────

export const StyledCardBody = styled.div<{ $padding: CardPadding }>`
  flex: 1;
  padding: ${({ $padding }) => cardPaddingMap[$padding]};
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

// ── Card.Footer ───────────────────────────────────────────────────────────────

export const StyledCardFooter = styled.div<{
  $padding: CardPadding;
  $hasDivider: boolean;
  $align: FooterAlign;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ $padding }) => cardPaddingMap[$padding]};
  justify-content: ${({ $align }) => footerJustifyMap[$align]};

  ${({ $hasDivider, theme }) =>
    $hasDivider &&
    css`
      border-top: 1px solid ${theme.colors['color-border-default']};
    `}
`;

// ── Card.Image ────────────────────────────────────────────────────────────────

export const StyledCardImage = styled.div<{ $aspectRatio: ImageAspectRatio }>`
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  /* The Card's overflow:hidden + border-radius handles corner clipping */
`;

export const StyledImage = styled.img<{ $objectFit: ImageObjectFit }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit};
  display: block;
`;
