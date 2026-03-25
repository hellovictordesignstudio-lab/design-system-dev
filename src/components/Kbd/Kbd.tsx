import React from 'react';
import styled, { css } from 'styled-components';

export type KbdSize = 'sm' | 'md' | 'lg';

export interface KbdProps {
  children: React.ReactNode;
  size?: KbdSize;
}

export interface ShortcutProps {
  keys: string[];
  separator?: '+' | 'then';
  size?: KbdSize;
}

const sizeStyles: Record<KbdSize, ReturnType<typeof css>> = {
  sm: css`
    font-size: 10px;
    padding: 1px 5px;
    height: 18px;
  `,
  md: css`
    font-size: 11px;
    padding: 2px 7px;
    height: 22px;
  `,
  lg: css`
    font-size: 13px;
    padding: 3px 9px;
    height: 26px;
  `,
};

const StyledKbd = styled.kbd<{ $size: KbdSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-weight: 500;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  background-color: ${({ theme }) => theme.colors['color-bg-muted']};
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  border-bottom: 2px solid ${({ theme }) => theme.colors['color-border-strong']};
  border-radius: 6px;
  line-height: 1;
  white-space: nowrap;

  ${({ $size }) => sizeStyles[$size]}
`;

export function Kbd({ children, size = 'md' }: KbdProps) {
  return <StyledKbd $size={size}>{children}</StyledKbd>;
}

const ShortcutWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0;
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin: 0 3px;
  font-size: 11px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export function Shortcut({ keys, separator = '+', size = 'md' }: ShortcutProps) {
  return (
    <ShortcutWrapper>
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          <Kbd size={size}>{key}</Kbd>
          {i < keys.length - 1 && <Separator>{separator}</Separator>}
        </React.Fragment>
      ))}
    </ShortcutWrapper>
  );
}
