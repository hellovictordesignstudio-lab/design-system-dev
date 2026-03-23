import React from 'react';
import styled, { css, keyframes } from 'styled-components';

export type SkeletonAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SkeletonButtonSize = 'sm' | 'md' | 'lg';

export interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  isAnimated?: boolean;
}

export interface SkeletonTextProps {
  lines?: number;
  isAnimated?: boolean;
  width?: string;
}

export interface SkeletonAvatarProps {
  size?: SkeletonAvatarSize;
  shape?: 'circle' | 'square';
  isAnimated?: boolean;
}

export interface SkeletonButtonProps {
  size?: SkeletonButtonSize;
  width?: string;
  isAnimated?: boolean;
}

export interface SkeletonCardProps {
  isAnimated?: boolean;
}

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

const shimmerStyles = css`
  background: linear-gradient(90deg, #f0f2f5 25%, #e4e7ef 50%, #f0f2f5 75%);
  background-size: 1200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

const Base = styled.span<{
  $w?: string;
  $h?: string;
  $r?: string;
  $animated: boolean;
}>`
  display: block;
  background-color: #f0f2f5;
  width: ${({ $w }) => $w ?? '100%'};
  height: ${({ $h }) => $h ?? '14px'};
  border-radius: ${({ $r }) => $r ?? '6px'};
  flex-shrink: 0;
  ${({ $animated }) => $animated && shimmerStyles}
`;

const AVATAR_PX: Record<SkeletonAvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const BTN_HEIGHT: Record<SkeletonButtonSize, string> = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const BTN_WIDTH: Record<SkeletonButtonSize, string> = {
  sm: '80px',
  md: '100px',
  lg: '120px',
};

function SkeletonBase({ width, height, borderRadius, isAnimated = true }: SkeletonProps) {
  return (
    <Base
      $w={width}
      $h={height}
      $r={borderRadius}
      $animated={isAnimated}
    />
  );
}

const TextStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

function SkeletonText({ lines = 1, isAnimated = true, width }: SkeletonTextProps) {
  return (
    <TextStack>
      {Array.from({ length: lines }, (_, i) => (
        <Base
          key={i}
          $w={lines > 1 && i === lines - 1 ? '60%' : (width ?? '100%')}
          $h="14px"
          $r="6px"
          $animated={isAnimated}
        />
      ))}
    </TextStack>
  );
}

function SkeletonAvatar({ size = 'md', shape = 'circle', isAnimated = true }: SkeletonAvatarProps) {
  const px = AVATAR_PX[size];
  const radius = shape === 'circle' ? '50%' : '8px';
  return (
    <Base
      $w={`${px}px`}
      $h={`${px}px`}
      $r={radius}
      $animated={isAnimated}
    />
  );
}

function SkeletonButton({ size = 'md', width, isAnimated = true }: SkeletonButtonProps) {
  return (
    <Base
      $w={width ?? BTN_WIDTH[size]}
      $h={BTN_HEIGHT[size]}
      $r="9999px"
      $animated={isAnimated}
    />
  );
}

const CardShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #e2e5ed;
  background: #ffffff;
  width: 100%;
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

function SkeletonCard({ isAnimated = true }: SkeletonCardProps) {
  return (
    <CardShell>
      {/* Image area */}
      <Base $w="100%" $h="160px" $r="10px" $animated={isAnimated} />
      {/* Author row */}
      <CardRow>
        <Base $w="36px" $h="36px" $r="50%" $animated={isAnimated} />
        <CardMeta>
          <Base $w="120px" $h="13px" $r="6px" $animated={isAnimated} />
          <Base $w="80px" $h="11px" $r="6px" $animated={isAnimated} />
        </CardMeta>
      </CardRow>
      {/* Text lines */}
      <Base $w="100%" $h="14px" $r="6px" $animated={isAnimated} />
      <Base $w="100%" $h="14px" $r="6px" $animated={isAnimated} />
      <Base $w="60%" $h="14px" $r="6px" $animated={isAnimated} />
      {/* Button */}
      <Base $w="100px" $h="36px" $r="9999px" $animated={isAnimated} />
    </CardShell>
  );
}

export const Skeleton = Object.assign(SkeletonBase, {
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton,
  Card: SkeletonCard,
});
