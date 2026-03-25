import React from 'react';
import styled from 'styled-components';
import { Quote } from 'lucide-react';
import { Rating } from '../Rating/Rating';
import type { TestimonialProps } from './Testimonial.types';

const Block = styled.figure`
  margin: 0;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  background: ${({ theme }) => theme.colors['color-bg-default']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const QuoteIcon = styled.div`
  color: ${({ theme }) => theme.colors['color-text-link']};
  margin-bottom: 12px;
`;

const QuoteText = styled.blockquote`
  margin: 0 0 18px;
  font-size: 16px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors['color-text-primary']};
  font-weight: 500;
`;

const Footer = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AvatarSlot = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors['color-bg-muted']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors['color-text-primary']};
`;

const Role = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors['color-text-secondary']};
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export function Testimonial({ quote, author, role, avatar, rating, logo }: TestimonialProps) {
  const initial = author.trim().charAt(0).toUpperCase();

  return (
    <Block>
      <TopRow>
        <QuoteIcon aria-hidden>
          <Quote size={22} strokeWidth={2} />
        </QuoteIcon>
        {logo && <div>{logo}</div>}
      </TopRow>
      <QuoteText>{quote}</QuoteText>
      {typeof rating === 'number' && (
        <div style={{ marginBottom: 14 }}>
          <Rating value={rating} isReadOnly />
        </div>
      )}
      <Footer>
        <AvatarSlot>{avatar ?? initial}</AvatarSlot>
        <Meta>
          <Name>{author}</Name>
          {role && <Role>{role}</Role>}
        </Meta>
      </Footer>
    </Block>
  );
}

export const ReviewBlock = Testimonial;
