export function resolveBasePath(basePath?: string): string {
  if (basePath) return basePath;
  if (typeof document === 'undefined') return '/';
  return document.querySelector('base')?.getAttribute('href') || '/';
}
