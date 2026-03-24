import React from 'react';
import {
  Body,
  Description,
  ItemLink,
  ItemOuter,
  ItemSurface,
  LeadingSlot,
  StyledList,
  StyledOrderedList,
  TitleText,
  TrailingSlot,
} from './List.styles';
import type { ListItemProps, ListProps } from './List.types';

function ListItemContent({
  children,
  description,
  leading,
  trailing,
  href,
  onClick,
  isDisabled = false,
  className,
}: ListItemProps) {
  const isInteractive = !!(href || onClick);
  const content = (
    <>
      {leading && <LeadingSlot>{leading}</LeadingSlot>}
      <Body>
        <TitleText>{children}</TitleText>
        {description && <Description>{description}</Description>}
      </Body>
      {trailing && <TrailingSlot>{trailing}</TrailingSlot>}
    </>
  );

  if (href && !isDisabled) {
    return (
      <ItemLink href={href} $isDisabled={isDisabled} className={className}>
        {content}
      </ItemLink>
    );
  }

  if (onClick) {
    return (
      <ItemSurface
        as="button"
        type="button"
        $isInteractive={isInteractive}
        $isDisabled={isDisabled}
        disabled={isDisabled}
        onClick={onClick}
        className={className}
      >
        {content}
      </ItemSurface>
    );
  }

  return (
    <ItemSurface $isInteractive={false} $isDisabled={isDisabled} className={className}>
      {content}
    </ItemSurface>
  );
}

function ListItemRow(props: ListItemProps & { _variant?: ListProps['variant'] }) {
  const { _variant = 'default', ...itemProps } = props;
  return (
    <ItemOuter $variant={_variant} role="listitem">
      <ListItemContent {...itemProps} />
    </ItemOuter>
  );
}

function ListRoot({
  variant = 'default',
  ordered = false,
  children,
  'aria-label': ariaLabel,
  className,
}: ListProps) {
  const ListTag = ordered ? StyledOrderedList : StyledList;

  return (
    <ListTag role="list" $variant={variant} className={className} aria-label={ariaLabel}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(
          child as React.ReactElement<ListItemProps & { _variant?: typeof variant }>,
          {
            _variant: variant,
            key: child.key ?? index,
          }
        );
      })}
    </ListTag>
  );
}

export const List = Object.assign(ListRoot, {
  Item: ListItemRow,
});

export default List;
