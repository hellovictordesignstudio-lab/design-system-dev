import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { colorPrimitives } from '../tokens/primitives';

const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-border-default']};
`;

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 40px;
`;

const Swatch = styled.div<{ $color: string }>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors['color-border-subtle']};
`;

const SwatchColor = styled.div<{ $bg: string }>`
  height: 56px;
  background-color: ${({ $bg }) => $bg};
`;

const SwatchInfo = styled.div`
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.colors['color-bg-default']};
`;

const SwatchName = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  margin-bottom: 2px;
`;

const SwatchHex = styled.p`
  font-size: 0.6875rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
`;

function ColorScale({
  name,
  scale,
}: {
  name: string;
  scale: Record<string | number, string>;
}) {
  return (
    <section>
      <SectionTitle>{name}</SectionTitle>
      <SwatchGrid>
        {Object.entries(scale).map(([step, hex]) => (
          <Swatch key={step} $color={hex}>
            <SwatchColor $bg={hex} />
            <SwatchInfo>
              <SwatchName>{name}/{step}</SwatchName>
              <SwatchHex>{hex}</SwatchHex>
            </SwatchInfo>
          </Swatch>
        ))}
      </SwatchGrid>
    </section>
  );
}

function ColorsPage() {
  return (
    <Page>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Color Tokens</h1>
      <p style={{ marginBottom: '40px', opacity: 0.7 }}>
        Primitive color scales that feed semantic tokens in the VDS Design System.
      </p>
      <ColorScale name="Blue (Primary)" scale={colorPrimitives.blue} />
      <ColorScale name="Neutral" scale={colorPrimitives.neutral} />
      <ColorScale name="Green (Success)" scale={colorPrimitives.green} />
      <ColorScale name="Red (Error)" scale={colorPrimitives.red} />
      <ColorScale name="Orange (Warning)" scale={colorPrimitives.orange} />
    </Page>
  );
}

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorsPage,
  parameters: { layout: 'fullscreen', docs: { disable: true } },
};

export default meta;

export const ColorPalette: StoryObj = {
  render: () => <ColorsPage />,
};
