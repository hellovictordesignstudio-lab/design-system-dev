import React, { forwardRef } from 'react';
import { GroupWrapper, StyledButton } from './ButtonGroup.styles';
import type { ButtonGroupProps, ButtonGroupItemProps } from './ButtonGroup.types';

const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  ({ children, isActive = false, isDisabled = false, leftIcon, rightIcon, ..._rest }, ref) => {
    const { $variant, $size, $fullWidth, ...rest } = _rest as ButtonGroupItemProps & {
      $variant?: string;
      $size?: string;
      $fullWidth?: boolean;
    };

    return (
      <StyledButton
        ref={ref}
        $variant={($variant as any) ?? 'secondary'}
        $size={($size as any) ?? 'md'}
        $isActive={isActive}
        $fullWidth={$fullWidth ?? false}
        disabled={isDisabled}
        data-active={isActive}
        aria-pressed={isActive}
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </StyledButton>
    );
  }
);

ButtonGroupItem.displayName = 'ButtonGroup.Item';

const ButtonGroupRoot = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      variant = 'secondary',
      size = 'md',
      orientation = 'horizontal',
      isDisabled = false,
      isAttached = true,
      fullWidth = false,
      gap = 8,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child as React.ReactElement<any>, {
        $variant: variant,
        $size: size,
        $fullWidth: fullWidth,
        ...(isDisabled && { isDisabled: true }),
      });
    });

    return (
      <GroupWrapper
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        $orientation={orientation}
        $isAttached={isAttached}
        $fullWidth={fullWidth}
        $gap={gap}
      >
        {enhancedChildren}
      </GroupWrapper>
    );
  }
);

ButtonGroupRoot.displayName = 'ButtonGroup';

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Item: ButtonGroupItem,
});

export default ButtonGroup;
