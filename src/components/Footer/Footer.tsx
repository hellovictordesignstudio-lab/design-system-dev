import React from 'react';
import styled from 'styled-components';
import { darkColorTokens } from '../../tokens/semantic';
import { Link } from '../Link/Link';
import type { FooterProps } from './Footer.types';

const D = darkColorTokens;

const Root = styled.footer`
  width: 100%;
  background: ${D['color-bg-canvas']};
  color: ${D['color-text-secondary']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 24px 24px;
`;

const Top = styled.div`
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(200px, 320px) 1fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Brand = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${D['color-text-primary']};
  letter-spacing: -0.02em;
`;

const Tagline = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: ${D['color-text-tertiary']};
`;

const ColGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const ColTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${D['color-text-tertiary']};
`;

const ColList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColItem = styled.li`
  display: block;
`;

const BottomBar = styled.div`
  padding: 12px 24px 0;
  padding-top: 20px;
  font-size: 13px;
  color: ${D['color-text-tertiary']};
`;

export function Footer({ columns, brand, tagline, bottom, children }: FooterProps) {
  return (
    <Root>
      <Inner>
        {children}
        <Top>
          <BrandBlock>
            {brand && <Brand>{brand}</Brand>}
            {tagline && <Tagline>{tagline}</Tagline>}
          </BrandBlock>
          <ColGrid>
            {columns.map((col) => (
              <div key={col.title}>
                <ColTitle>{col.title}</ColTitle>
                <ColList>
                  {col.links.map((l) => (
                    <ColItem key={l.href + l.label}>
                      <Link href={l.href} variant="inverse" underline="hover">
                        {l.label}
                      </Link>
                    </ColItem>
                  ))}
                </ColList>
              </div>
            ))}
          </ColGrid>
        </Top>
        {bottom && <BottomBar>{bottom}</BottomBar>}
      </Inner>
    </Root>
  );
}
