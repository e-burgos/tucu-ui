'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { TooltipColor, TooltipPlacement, TooltipSize } from './tooltip';

export interface TooltipDefaults {
  /** Default `placement` of every Tooltip below the provider. */
  placement?: TooltipPlacement;
  /** Default `size` of every Tooltip below the provider. */
  size?: TooltipSize;
  /** Default `color` of every Tooltip below the provider. */
  color?: TooltipColor;
  /** Default `arrow` of every Tooltip below the provider. */
  arrow?: boolean;
  /** Default `enterDelay` (ms) of every Tooltip below the provider. */
  enterDelay?: number;
  /** Default `leaveDelay` (ms) of every Tooltip below the provider. */
  leaveDelay?: number;
  /** Default `lazy` of every Tooltip below the provider. */
  lazy?: boolean;
  /** Default `maxWidth` of every Tooltip below the provider. */
  maxWidth?: number | string;
}

export interface TooltipDefaultsProviderProps extends TooltipDefaults {
  children: React.ReactNode;
}

const TooltipDefaultsContext = createContext<TooltipDefaults>({});

export function useTooltipDefaults(): TooltipDefaults {
  return useContext(TooltipDefaultsContext);
}

export function TooltipDefaultsProvider({
  children,
  placement,
  size,
  color,
  arrow,
  enterDelay,
  leaveDelay,
  lazy,
  maxWidth,
}: TooltipDefaultsProviderProps) {
  const parent = useTooltipDefaults();
  const value = useMemo<TooltipDefaults>(
    () => ({
      ...parent,
      ...definedEntries({
        placement,
        size,
        color,
        arrow,
        enterDelay,
        leaveDelay,
        lazy,
        maxWidth,
      }),
    }),
    [
      parent,
      placement,
      size,
      color,
      arrow,
      enterDelay,
      leaveDelay,
      lazy,
      maxWidth,
    ]
  );
  return (
    <TooltipDefaultsContext.Provider value={value}>
      {children}
    </TooltipDefaultsContext.Provider>
  );
}

function definedEntries(defaults: TooltipDefaults): TooltipDefaults {
  return Object.fromEntries(
    Object.entries(defaults).filter(([, value]) => value !== undefined)
  );
}

TooltipDefaultsProvider.displayName = 'TooltipDefaultsProvider';
