import React, { createContext, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Check, AlertCircle } from 'lucide-react';
import { colorPrimitives } from '../../tokens/primitives';

// ── Types ─────────────────────────────────────────────────────────────────────

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperVariant = 'default' | 'minimal';
export type StepState = 'completed' | 'active' | 'upcoming' | 'error';

export interface StepperProps {
  activeStep: number;
  orientation?: StepperOrientation;
  variant?: StepperVariant;
  children: React.ReactNode;
}

export interface StepperStepProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  isOptional?: boolean;
  state?: StepState; // override (e.g. 'error')
}

// ── Context ───────────────────────────────────────────────────────────────────

interface StepperContextValue {
  activeStep: number;
  totalSteps: number;
  orientation: StepperOrientation;
  variant: StepperVariant;
}

const StepperContext = createContext<StepperContextValue>({
  activeStep: 0,
  totalSteps: 0,
  orientation: 'horizontal',
  variant: 'default',
});

function useStepperContext() { return useContext(StepperContext); }

// ── Styled ────────────────────────────────────────────────────────────────────

const RootWrapper = styled.div<{ $orientation: StepperOrientation }>`
  display: flex;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'row' : 'column')};
  align-items: ${({ $orientation }) => ($orientation === 'horizontal' ? 'flex-start' : 'flex-start')};
  width: 100%;
`;

const StepWrapper = styled.div<{ $orientation: StepperOrientation }>`
  display: flex;
  flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'column' : 'row')};
  align-items: ${({ $orientation }) => ($orientation === 'horizontal' ? 'center' : 'flex-start')};
  flex: ${({ $orientation }) => ($orientation === 'horizontal' ? '1' : 'none')};
  position: relative;
`;

const StepHead = styled.div<{ $orientation: StepperOrientation }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'column' : 'row')};
  width: ${({ $orientation }) => ($orientation === 'horizontal' ? '100%' : 'auto')};
`;

// Circle

const circleStateStyles: Record<StepState, ReturnType<typeof css>> = {
  completed: css`
    background-color: ${({ theme }) => theme.colors['color-brand-primary']};
    border: 2px solid ${({ theme }) => theme.colors['color-brand-primary']};
    color: ${({ theme }) => theme.colors['color-brand-on-primary']};
  `,
  active: css`
    background-color: ${({ theme }) => theme.colors['color-brand-primary']};
    border: 2px solid ${({ theme }) => theme.colors['color-brand-primary']};
    color: ${({ theme }) => theme.colors['color-brand-on-primary']};
    box-shadow: 0 0 0 4px
      ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(10, 132, 255, 0.35)' : 'rgba(0, 85, 255, 0.15)'};
  `,
  upcoming: css`
    background-color: ${({ theme }) => theme.colors['color-bg-default']};
    border: 2px solid ${({ theme }) => theme.colors['color-border-default']};
    color: ${({ theme }) => theme.colors['color-text-disabled']};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors['color-error-default']};
    border: 2px solid ${({ theme }) => theme.colors['color-error-default']};
    color: ${colorPrimitives.white};
  `,
};

const Circle = styled.div<{ $state: StepState }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  transition: background-color 200ms ease, box-shadow 200ms ease;
  ${({ $state }) => circleStateStyles[$state]}
`;

// Connector

const HorizontalConnector = styled.div<{ $isCompleted: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ theme, $isCompleted }) =>
    $isCompleted ? theme.colors['color-brand-primary'] : theme.colors['color-border-default']};
  transition: background-color 200ms ease;
  margin: 0 -1px;
  align-self: center;
  position: relative;
  top: -16px; /* align with circle center */
`;

const VerticalConnector = styled.div<{ $isCompleted: boolean }>`
  width: 2px;
  height: 24px;
  background-color: ${({ theme, $isCompleted }) =>
    $isCompleted ? theme.colors['color-brand-primary'] : theme.colors['color-border-default']};
  margin-left: 15px; /* (32px circle / 2) - 1px */
  flex-shrink: 0;
  transition: background-color 200ms ease;
`;

// Labels

const LabelGroup = styled.div<{ $orientation: StepperOrientation }>`
  text-align: ${({ $orientation }) => ($orientation === 'horizontal' ? 'center' : 'left')};
  margin-top: ${({ $orientation }) => ($orientation === 'horizontal' ? '8px' : '0')};
  margin-left: ${({ $orientation }) => ($orientation === 'vertical' ? '12px' : '0')};
  padding-top: ${({ $orientation }) => ($orientation === 'vertical' ? '4px' : '0')};
`;

const StepLabel = styled.span<{ $state: StepState }>`
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme, $state }) =>
    $state === 'upcoming' ? theme.colors['color-text-tertiary'] : theme.colors['color-text-primary']};
  transition: color 200ms ease;
`;

const StepDescription = styled.span`
  display: block;
  font-size: 12px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin-top: 2px;
  line-height: 1.4;
`;

const OptionalLabel = styled.span`
  display: block;
  font-size: 11px;
  color: ${({ theme }) => theme.colors['color-text-tertiary']};
  margin-top: 1px;
`;

// ── Root ──────────────────────────────────────────────────────────────────────

function StepperRoot({
  activeStep,
  orientation = 'horizontal',
  variant = 'default',
  children,
}: StepperProps) {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;

  return (
    <StepperContext.Provider value={{ activeStep, totalSteps, orientation, variant }}>
      <RootWrapper $orientation={orientation}>
        {steps.map((child, index) => {
          const isLast = index === totalSteps - 1;
          const isCompletedConnector = index < activeStep;

          if (orientation === 'horizontal') {
            return (
              <React.Fragment key={index}>
                {React.isValidElement(child)
                  ? React.cloneElement(child as React.ReactElement<InternalStepProps>, {
                      _index: index,
                      _isLast: isLast,
                    })
                  : child}
                {!isLast && <HorizontalConnector $isCompleted={isCompletedConnector} />}
              </React.Fragment>
            );
          }

          // Vertical
          return (
            <React.Fragment key={index}>
              {React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<InternalStepProps>, {
                    _index: index,
                    _isLast: isLast,
                    _isCompletedConnector: isCompletedConnector,
                  })
                : child}
            </React.Fragment>
          );
        })}
      </RootWrapper>
    </StepperContext.Provider>
  );
}

// ── Step (internal props for index injection) ─────────────────────────────────

interface InternalStepProps extends StepperStepProps {
  _index?: number;
  _isLast?: boolean;
  _isCompletedConnector?: boolean;
}

function StepperStep({
  label,
  description,
  icon,
  isOptional,
  state: stateProp,
  _index = 0,
  _isLast = false,
  _isCompletedConnector = false,
}: InternalStepProps) {
  const { activeStep, orientation } = useStepperContext();

  const resolvedState: StepState =
    stateProp ??
    (_index < activeStep ? 'completed' : _index === activeStep ? 'active' : 'upcoming');

  const circleContent =
    resolvedState === 'completed' ? (
      icon ?? <Check size={16} strokeWidth={2.5} />
    ) : resolvedState === 'error' ? (
      <AlertCircle size={16} strokeWidth={2} />
    ) : (
      icon ?? <span>{_index + 1}</span>
    );

  if (orientation === 'vertical') {
    return (
      <StepWrapper $orientation="vertical">
        <StepHead $orientation="vertical">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Circle $state={resolvedState}>{circleContent}</Circle>
            {!_isLast && <VerticalConnector $isCompleted={_isCompletedConnector} />}
          </div>
          <LabelGroup $orientation="vertical">
            <StepLabel $state={resolvedState}>
              {label}
              {isOptional && <OptionalLabel>(Optional)</OptionalLabel>}
            </StepLabel>
            {description && <StepDescription>{description}</StepDescription>}
          </LabelGroup>
        </StepHead>
      </StepWrapper>
    );
  }

  return (
    <StepWrapper $orientation="horizontal">
      <StepHead $orientation="horizontal">
        <Circle $state={resolvedState}>{circleContent}</Circle>
        <LabelGroup $orientation="horizontal">
          <StepLabel $state={resolvedState}>{label}</StepLabel>
          {isOptional && <OptionalLabel>(Optional)</OptionalLabel>}
          {description && <StepDescription>{description}</StepDescription>}
        </LabelGroup>
      </StepHead>
    </StepWrapper>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────

export const Stepper = Object.assign(StepperRoot, {
  Step: StepperStep,
});
