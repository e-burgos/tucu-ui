'use client';

import { useSyncExternalStore } from 'react';

type ColorScheme = 'light' | 'dark';

const subscribeToDocumentClass = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
};

const readDocumentColorScheme = (): ColorScheme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const readServerColorScheme = (): ColorScheme => 'light';

export function useDocumentColorScheme(): ColorScheme {
  return useSyncExternalStore(
    subscribeToDocumentClass,
    readDocumentColorScheme,
    readServerColorScheme
  );
}
