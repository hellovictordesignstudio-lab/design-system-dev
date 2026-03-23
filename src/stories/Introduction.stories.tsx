import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

// ── Styled components for the intro page ─────────────────────────────────────

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme }) => theme.colors['color-text-primary']};
`;

const HeroBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
  color: ${({ theme }) => theme.colors['color-brand-primary']};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #0055FF, #3370FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 560px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 48px;
`;

const Card = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  background-color: ${({ theme }) => theme.colors['color-bg-subtle']};
`;

const CardTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors['color-text-primary']};
`;

const CardBody = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-border-default']};
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors['color-bg-inverse']};
  color: ${({ theme }) => theme.colors['color-text-inverse']};
  padding: 20px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: 0.8125rem;
  line-height: 1.6;
  overflow-x: auto;
  margin-bottom: 32px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  margin: 40px 0;
`;

// ── Story ─────────────────────────────────────────────────────────────────────

function IntroductionPage() {
  return (
    <Page>
      <HeroBadge>v1.0.0</HeroBadge>
      <Title>Design System</Title>
      <Subtitle>
        A professional, accessible component library built with React 18, TypeScript,
        and Styled Components. Designed for consistency, scalability, and developer
        experience.
      </Subtitle>

      <Grid>
        {[
          { title: '🎨 Design Tokens', body: 'Primitive and semantic tokens for colors, spacing, typography and more.' },
          { title: '🌗 Dark Mode', body: 'Three color modes: light, dark, and system — with smooth 200ms transitions.' },
          { title: '🌍 i18n Ready', body: 'Full EN / ES / FR translations baked in — switch in the toolbar above.' },
          { title: '♿ Accessible', body: 'WCAG 2.1 AA compliant, keyboard navigable, screen-reader friendly.' },
          { title: '⚡ Fast', body: 'Tree-shakeable exports, zero runtime overhead for unused components.' },
          { title: '📖 Documented', body: 'Every component has props docs, live controls, and code examples.' },
        ].map(({ title, body }) => (
          <Card key={title}>
            <CardTitle>{title}</CardTitle>
            <CardBody>{body}</CardBody>
          </Card>
        ))}
      </Grid>

      <Divider />

      <SectionTitle>Installation</SectionTitle>
      <CodeBlock>{`npm install @design-system/core styled-components`}</CodeBlock>

      <SectionTitle>Quick Start</SectionTitle>
      <CodeBlock>{`import { ThemeProvider } from '@design-system/core/theme';
import { Button, Badge, Alert } from '@design-system/core';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary" size="md">
        Get started
      </Button>
    </ThemeProvider>
  );
}`}</CodeBlock>

      <SectionTitle>Theme Customization</SectionTitle>
      <CodeBlock>{`// Change color mode programmatically
import { useTheme } from '@design-system/core/theme';

function ThemeToggle() {
  const { colorMode, setColorMode } = useTheme();

  return (
    <button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
      Current: {colorMode}
    </button>
  );
}`}</CodeBlock>
    </Page>
  );
}

const meta: Meta = {
  title: 'Introduction',
  component: IntroductionPage,
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
};

export default meta;

export const Welcome: StoryObj = {
  name: 'Welcome',
  render: () => <IntroductionPage />,
};
