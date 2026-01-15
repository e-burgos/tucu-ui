import fs from 'fs';

export function wrapRealpathSyncNative(path: string): string {
  if (typeof fs.realpathSync.native === 'function') {
    try {
      return fs.realpathSync.native(path);
    } catch {
      // Ignore errors
    }
  }
  return fs.realpathSync(path);
}
