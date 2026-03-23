import React, { Children, isValidElement, cloneElement } from 'react';
import styled, { css } from 'styled-components';

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
  online: '#0A8853',
  away: '#F07332',
  busy: '#D22232',
  offline: '#9BA5BE',
};

const AVATAR_PALETTES: [string, string][] = [
  ['#E8EEFF', '#2952CC'],
  ['#E6F5EE', '#1A7A45'],
  ['#FFF0E3', '#C05C00'],
  ['#F0EAFF', '#6D28D9'],
  ['#FCEAEC', '#A81B28'],
  ['#E1F5FB', '#0E7490'],
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
  background-color: ${({ $bg }) => $bg ?? '#F0F2F5'};
  color: ${({ $color }) => $color ?? '#4A5270'};
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
  border: 2px solid #ffffff;
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
  background-color: #f0f2f5;
  color: #4a5270;
  font-size: ${({ $size }) => FONT[$size]}px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  border: 2px solid #ffffff;
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
  const validChildren = Children.toArray(children).filter(isValidElement);
  const shown = validChildren.slice(0, max);
  const extra = validChildren.length - max;

  return (
    <GroupRoot $overlap={overlap}>
      {shown.map((child, i) =>
        cloneElement(child as React.ReactElement<AvatarProps>, {
          size,
          key: i,
          style: overlap ? { border: '2px solid #ffffff' } : undefined,
        } as AvatarProps & { style: React.CSSProperties; key: number })
      )}
      {extra > 0 && (
        <OverflowAvatar $size={size} style={overlap ? { border: '2px solid #ffffff' } : {}}>
          +{extra}
        </OverflowAvatar>
      )}
    </GroupRoot>
  );
}
