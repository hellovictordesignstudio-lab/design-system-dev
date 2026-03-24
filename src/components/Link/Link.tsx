import React, { forwardRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { StyledLink } from './Link.styles';
import type { LinkProps } from './Link.types';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      underline = 'hover',
      leftIcon,
      rightIcon,
      isExternal = false,
      isDisabled = false,
      as,
      href,
      ...rest
    },
    ref
  ) => {
    const externalProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <StyledLink
        ref={ref}
        as={as}
        href={isDisabled ? undefined : href}
        $variant={variant}
        $size={size}
        $underline={underline}
        $isDisabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        {...externalProps}
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon ?? (isExternal && <ExternalLink />)}
      </StyledLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
