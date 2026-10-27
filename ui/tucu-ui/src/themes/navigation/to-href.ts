import type { TucuTo } from './types';

export function toHref(to: TucuTo): string {
  if (typeof to === 'string') return to;
  return `${to.pathname ?? ''}${to.search ?? ''}${to.hash ?? ''}`;
}
