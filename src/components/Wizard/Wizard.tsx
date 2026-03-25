import React, { createContext, useContext } from 'react';
import styled from 'styled-components';

const PanelCtx = createContext<{ activeStep: number }>({ activeStep: 0 });

const PanelRoot = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors['color-border-default']};
  background: ${({ theme }) => theme.colors['color-bg-subtle']};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

export interface WizardPanelProps {
  /** Zero-based index matching `activeStep` on the parent. */
  stepIndex: number;
  children: React.ReactNode;
}

/**
 * Shows content for the active wizard step. Pair with `Stepper` using the same `activeStep`.
 */
export function WizardPanel({ stepIndex, children }: WizardPanelProps) {
  const { activeStep } = useContext(PanelCtx);
  if (stepIndex !== activeStep) return null;
  return <PanelRoot role="region">{children}</PanelRoot>;
}

export interface WizardProps {
  activeStep: number;
  children: React.ReactNode;
}

/**
 * Lightweight wrapper that provides step context for `WizardPanel`.
 * Render `Stepper` inside with the same `activeStep` for the progress UI.
 */
function WizardRoot({ activeStep, children }: WizardProps) {
  return <PanelCtx.Provider value={{ activeStep }}>{children}</PanelCtx.Provider>;
}

export const Wizard = Object.assign(WizardRoot, {
  Panel: WizardPanel,
});
