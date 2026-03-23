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
  color: #4A5270;
  background-color: #F0F2F5;
  border: 1px solid #DDE1EA;
  border-bottom: 2px solid #C5CBDA;
  border-radius: 6px;
  line-height: 1;
  white-space: nowrap;

  ${({ $size }) => sizeStyles[$size]}

  [data-theme='dark'] &,
  .dark & {
    background-color: #2E3550;
    border-color: #4A5270;
    border-bottom-color: #6B7694;
    color: #C5CBDA;
  }
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
  color: #9BA5BE;
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
