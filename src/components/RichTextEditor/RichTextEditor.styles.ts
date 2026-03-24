import styled from 'styled-components';

export const EditorRoot = styled.div`
  border: 1.5px solid #c8d4e8;
  border-radius: 14px;
  overflow: hidden;
  background: #ffffff;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-within {
    border-color: #0055ff;
    box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.1);
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 8px 10px;
  border-bottom: 1px solid #e2e5ed;
  background: #fafbfc;
`;

export const ToolbarBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? '#e8eeff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#0055ff' : '#374151')};
  cursor: pointer;
  transition: background-color 100ms ease, color 100ms ease;

  &:hover:not(:disabled) {
    background-color: ${({ $active }) => ($active ? '#dce6ff' : '#f0f2f5')};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #0055ff;
    outline-offset: 1px;
  }
`;

export const ToolbarSep = styled.span`
  width: 1px;
  height: 20px;
  background: #dde1ea;
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
    color: #111827;

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
      border-left: 3px solid #0055ff;
      color: #4b5563;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e5ed;
      margin: 1em 0;
    }

    a.rte-link {
      color: #0055ff;
      text-decoration: underline;
      cursor: pointer;
    }

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: #9ba5be;
      pointer-events: none;
      height: 0;
    }

    &:focus {
      outline: none;
    }
  }
`;
