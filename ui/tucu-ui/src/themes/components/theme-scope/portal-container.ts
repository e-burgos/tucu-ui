'use client';

import { createContext, useContext } from 'react';

export const PortalContainerContext = createContext<
  HTMLElement | null | undefined
>(undefined);

/** Element where overlays (modals, drawers, dropdowns, tooltips) mount. Inside a `ThemeScope` it is the scope's own portal host; elsewhere it is `document.body`. */
export function usePortalContainer(): HTMLElement | null {
  const container = useContext(PortalContainerContext);
  if (container !== undefined) return container;
  return typeof document === 'undefined' ? null : document.body;
}
