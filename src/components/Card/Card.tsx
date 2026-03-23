import React, { createContext, useContext } from 'react';
import {
  StyledCard,
  StyledCardHeader,
  HeaderContent,
  HeaderTitle,
  HeaderSubtitle,
  HeaderAction,
  StyledCardBody,
  StyledCardFooter,
  StyledCardImage,
  StyledImage,
  cardShadowMap,
} from './Card.styles';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardImageProps,
  CardContextValue,
} from './Card.types';

// ── Context ───────────────────────────────────────────────────────────────────

const CardContext = createContext<CardContextValue>({ padding: 'md' });

function useCardContext() {
  return useContext(CardContext);
}

// ── Card root ─────────────────────────────────────────────────────────────────

function CardRoot({
  padding = 'md',
  shadow = 'sm',
  hasBorder = true,
  isHoverable = false,
  isClickable = false,
  children,
  as: asProp,
  ...rest
}: CardProps) {
  return (
    <CardContext.Provider value={{ padding }}>
      <StyledCard
        as={asProp as React.ElementType}
        $shadow={shadow}
        $hasBorder={hasBorder}
        $isHoverable={isHoverable}
        $isClickable={isClickable}
        $shadow_val={cardShadowMap[shadow]}
        {...rest}
      >
        {children}
      </StyledCard>
    </CardContext.Provider>
  );
}

// ── Card.Header ───────────────────────────────────────────────────────────────

function CardHeader({ title, subtitle, action, hasDivider = true }: CardHeaderProps) {
  const { padding } = useCardContext();
  return (
    <StyledCardHeader $padding={padding} $hasDivider={hasDivider}>
      <HeaderContent>
        <HeaderTitle>{title}</HeaderTitle>
        {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
      </HeaderContent>
      {action && <HeaderAction>{action}</HeaderAction>}
    </StyledCardHeader>
  );
}

// ── Card.Body ─────────────────────────────────────────────────────────────────

function CardBody({ children, ...rest }: CardBodyProps) {
  const { padding } = useCardContext();
  return (
    <StyledCardBody $padding={padding} {...rest}>
      {children}
    </StyledCardBody>
  );
}

// ── Card.Footer ───────────────────────────────────────────────────────────────

function CardFooter({ children, hasDivider = true, align = 'right', ...rest }: CardFooterProps) {
  const { padding } = useCardContext();
  return (
    <StyledCardFooter $padding={padding} $hasDivider={hasDivider} $align={align} {...rest}>
      {children}
    </StyledCardFooter>
  );
}

// ── Card.Image ────────────────────────────────────────────────────────────────

function CardImage({ src, alt, aspectRatio = '16/9', objectFit = 'cover' }: CardImageProps) {
  return (
    <StyledCardImage $aspectRatio={aspectRatio}>
      <StyledImage src={src} alt={alt} $objectFit={objectFit} />
    </StyledCardImage>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
});
