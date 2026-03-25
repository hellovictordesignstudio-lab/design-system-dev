import React, { Children, isValidElement, cloneElement } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { colorPrimitives } from '../../tokens/primitives';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  badge?: React.ReactNode;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  overlap?: boolean;
}

const PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
const FONT: Record<AvatarSize, number> = { xs: 10, sm: 12, md: 14, lg: 16, xl: 22 };
const RADIUS: Record<AvatarShape, Record<AvatarSize, string>> = {
  circle: { xs: '50%', sm: '50%', md: '50%', lg: '50%', xl: '50%' },
  square: { xs: '4px', sm: '6px', md: '8px', lg: '10px', xl: '13px' },
};

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: colorPrimitives.green[400],
  away: colorPrimitives.orange[400],
  busy: colorPrimitives.red[400],
  offline: colorPrimitives.neutral[400],
};

const AVATAR_PALETTES: [string, string][] = [
  [colorPrimitives.blue[50], colorPrimitives.blue[600]],
  [colorPrimitives.green[50], colorPrimitives.green[400]],
  [colorPrimitives.orange[50], colorPrimitives.orange[500]],
  [colorPrimitives.violet[50], colorPrimitives.violet[700]],
  [colorPrimitives.red[50], colorPrimitives.red[500]],
  [colorPrimitives.cyan[50], colorPrimitives.cyan[600]],
];

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function getPaletteIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % AVATAR_PALETTES.length;
}

const AvatarRoot = styled.span<{
  $size: AvatarSize;
  $shape: AvatarShape;
  $bg?: string;
  $color?: string;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => PX[$size]}px;
  height: ${({ $size }) => PX[$size]}px;
  border-radius: ${({ $shape, $size }) => RADIUS[$shape][$size]};
  overflow: visible;
  background-color: ${({ $bg, theme }) => $bg ?? theme.colors['color-bg-muted']};
  color: ${({ $color, theme }) => $color ?? theme.colors['color-text-secondary']};
  font-size: ${({ $size }) => FONT[$size]}px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  user-select: none;
`;

const AvatarImg = styled.img<{ $shape: AvatarShape; $size: AvatarSize }>`
  width: 100%;
  height: 100%;
  border-radius: ${({ $shape, $size }) => RADIUS[$shape][$size]};
  object-fit: cover;
  display: block;
`;

const StatusDot = styled.span<{ $status: AvatarStatus; $size: AvatarSize }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${({ $size }) => ($size === 'xs' ? 7 : 10)}px;
  height: ${({ $size }) => ($size === 'xs' ? 7 : 10)}px;
  border-radius: 50%;
  background-color: ${({ $status }) => STATUS_COLORS[$status]};
  border: 2px solid ${({ theme }) => theme.colors['color-bg-default']};
`;

const BadgeWrapper = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const GroupRoot = styled.div<{ $overlap: boolean }>`
  display: inline-flex;
  align-items: center;

  ${({ $overlap }) =>
    $overlap &&
    css`
      & > * + * {
        margin-left: -8px;
      }
    `}
`;

const OverflowAvatar = styled.span<{ $size: AvatarSize }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => PX[$size]}px;
  height: ${({ $size }) => PX[$size]}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors['color-bg-muted']};
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  font-size: ${({ $size }) => FONT[$size]}px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  border: 2px solid ${({ theme }) => theme.colors['color-bg-default']};
  user-select: none;
`;

const AvatarImgWrapper = styled.span<{ $shape: AvatarShape; $size: AvatarSize }>`
  display: inline-flex;
  width: 100%;
  height: 100%;
  border-radius: ${({ $shape, $size }) => RADIUS[$shape][$size]};
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;

export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  badge,
}: AvatarProps) {
  const paletteBg = name ? AVATAR_PALETTES[getPaletteIndex(name)][0] : undefined;
  const paletteColor = name ? AVATAR_PALETTES[getPaletteIndex(name)][1] : undefined;

  return (
    <AvatarRoot
      $size={size}
      $shape={shape}
      $bg={src ? 'transparent' : paletteBg}
      $color={paletteColor}
    >
      {src ? (
        <AvatarImgWrapper $shape={shape} $size={size}>
          <AvatarImg src={src} alt={name ?? ''} $shape={shape} $size={size} />
        </AvatarImgWrapper>
      ) : (
        name && getInitials(name)
      )}
      {status && !badge && <StatusDot $status={status} $size={size} />}
      {badge && <BadgeWrapper>{badge}</BadgeWrapper>}
    </AvatarRoot>
  );
}

export function AvatarGroup({ children, max = 4, size = 'md', overlap = true }: AvatarGroupProps) {
  const theme = useTheme();
  const validChildren = Children.toArray(children).filter(isValidElement);
  const shown = validChildren.slice(0, max);
  const extra = validChildren.length - max;
  const overlapBorder = overlap
    ? { border: `2px solid ${theme.colors['color-bg-default']}` }
    : undefined;

  return (
    <GroupRoot $overlap={overlap}>
      {shown.map((child, i) =>
        cloneElement(child as React.ReactElement<AvatarProps>, {
          size,
          key: i,
          style: overlapBorder,
        } as AvatarProps & { style: React.CSSProperties; key: number })
      )}
      {extra > 0 && (
        <OverflowAvatar $size={size} style={overlapBorder}>
          +{extra}
        </OverflowAvatar>
      )}
    </GroupRoot>
  );
}
