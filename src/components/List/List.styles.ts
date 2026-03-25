import styled, { css } from 'styled-components';
import type { ListVariant } from './List.types';

const listBase = css<{ $variant: ListVariant }>`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  width: 100%;

  ${({ $variant, theme }) =>
    $variant === 'bordered' &&
    css`
      border: 1px solid ${theme.colors['color-border-default']};
      border-radius: 10px;
      overflow: hidden;
    `}
`;

export const StyledList = styled.ul<{ $variant: ListVariant }>`
  ${listBase}
`;

export const StyledOrderedList = styled.ol<{ $variant: ListVariant }>`
  ${listBase}
`;

export const ItemOuter = styled.li<{ $variant: ListVariant }>`
  display: flex;
  align-items: stretch;

  ${({ $variant, theme }) =>
    $variant === 'bordered' &&
    css`
      & + & {
        border-top: 1px solid ${theme.colors['color-border-default']};
      }
    `}

  ${({ $variant }) =>
    $variant === 'default' &&
    css`
      & + & {
        margin-top: 4px;
      }
    `}
`;

const interactiveHover = css`
  &:hover {
    background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
  }
`;

export const ItemSurface = styled.div<{ $isInteractive: boolean; $isDisabled: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  transition: background-color 120ms ease;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background: transparent;
  font: inherit;
  color: inherit;

  ${({ $isInteractive, $isDisabled }) =>
    $isInteractive &&
    !$isDisabled &&
    css`
      cursor: pointer;
      ${interactiveHover}
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.45;
      pointer-events: none;
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    outline-offset: 2px;
  }
`;

export const ItemLink = styled.a<{ $isDisabled: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  transition: background-color 120ms ease;
  text-decoration: none;
  color: inherit;
  width: 100%;
  box-sizing: border-box;

  ${({ $isDisabled }) =>
    !$isDisabled &&
    css`
      cursor: pointer;
      ${interactiveHover}
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.45;
      pointer-events: none;
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    outline-offset: 2px;
  }
`;

export const LeadingSlot = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin-top: 2px;
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TitleText = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  line-height: 1.4;
`;

export const Description = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  line-height: 1.5;
`;

export const TrailingSlot = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  font-size: 12px;
  margin-top: 2px;
`;
