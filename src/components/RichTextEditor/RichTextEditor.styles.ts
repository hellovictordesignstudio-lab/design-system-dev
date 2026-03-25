import styled from 'styled-components';

export const EditorRoot = styled.div`
  border: 1.5px solid ${({ theme }) => theme.colors['color-border-strong']};
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors['color-bg-default']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors['color-border-focus']};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 8px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  background: ${({ theme }) => theme.colors['color-bg-subtle']};
`;

export const ToolbarBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors['color-brand-primary-subtle'] : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors['color-brand-primary'] : theme.colors['color-text-secondary']};
  cursor: pointer;
  transition: background-color 100ms ease, color 100ms ease;

  &:hover:not(:disabled) {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors['color-brand-primary-muted'] : theme.colors['color-bg-muted']};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    outline-offset: 1px;
  }
`;

export const ToolbarSep = styled.span`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => theme.colors['color-border-default']};
  margin: 0 4px;
  flex-shrink: 0;
`;

export const EditorArea = styled.div<{ $minHeight: number }>`
  .ProseMirror {
    min-height: ${({ $minHeight }) => $minHeight}px;
    padding: 14px 16px;
    outline: none;
    font-size: 14px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors['color-text-primary']};

    p {
      margin: 0 0 0.75em;
    }

    h2 {
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0.75em 0 0.5em;
      line-height: 1.25;
    }

    h3 {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0.75em 0 0.5em;
      line-height: 1.3;
    }

    ul,
    ol {
      margin: 0 0 0.75em;
      padding-left: 1.35em;
    }

    blockquote {
      margin: 0 0 0.75em;
      padding-left: 12px;
      border-left: 3px solid ${({ theme }) => theme.colors['color-brand-primary']};
      color: ${({ theme }) => theme.colors['color-text-secondary']};
    }

    hr {
      border: none;
      border-top: 1px solid ${({ theme }) => theme.colors['color-border-default']};
      margin: 1em 0;
    }

    a.rte-link {
      color: ${({ theme }) => theme.colors['color-text-link']};
      text-decoration: underline;
      cursor: pointer;
    }

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: ${({ theme }) => theme.colors['color-text-tertiary']};
      pointer-events: none;
      height: 0;
    }

    &:focus {
      outline: none;
    }
  }
`;
