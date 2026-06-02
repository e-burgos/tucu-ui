import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type OptionsResetCache = {
  version: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

type CacheVersion = {
  version: number;
  lastUpdated: string;
};

interface CacheVersionsStore {
  versions: Record<string, CacheVersion>;
  setCacheVersion: (
    tableId: string,
    version: number,
    lastUpdated: string
  ) => void;
  getCacheVersion: (tableId: string) => CacheVersion | undefined;
  removeTableCache: (tableId: string) => void;
}

// Global store for cache versions using Zustand persist
const useCacheVersionsStore = create<CacheVersionsStore>()(
  persist(
    (set, get) => ({
      versions: {},
      setCacheVersion: (
        tableId: string,
        version: number,
        lastUpdated: string
      ) => {
        set((state) => ({
          versions: {
            ...state.versions,
            [tableId]: {
              version,
              lastUpdated,
            },
          },
        }));
      },
      getCacheVersion: (tableId: string) => {
        return get().versions[tableId];
      },
      removeTableCache: (tableId: string) => {
        // Remove Zustand persisted data by removing the localStorage key
        // Zustand persist uses the key: `${tableId}-datatable`
        // Note: We keep the version in the cache store, only remove the table data
        if (typeof window !== 'undefined') {
          localStorage.removeItem(`${tableId}-datatable`);
        }
      },
    }),
    {
      name: 'datatable-cache-versions',
      partialize: (state) => ({ versions: state.versions }),
    }
  )
);

/**
 * Reset cache in the datable storage.
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @param tableId - The table id
 * @param options - Options for resetting the cache version
 * @param options.version - The version to set for the cache
 * @param options.onSuccess - Callback function to execute on successful reset
 * @param options.onError - Callback function to execute on error
 * @returns {boolean} - Returns true if the cache was reset, false if the version was already up to date
 */
export function useResetCacheVersion(
  tableId: string,
  options: OptionsResetCache
): boolean {
  try {
    const { getCacheVersion, setCacheVersion, removeTableCache } =
      useCacheVersionsStore.getState();

    const cacheTable = getCacheVersion(tableId);

    // Check if version is already up to date
    if (cacheTable?.version === options?.version) {
      return false;
    }

    // Update cache version
    const lastUpdated = new Date().toISOString();
    setCacheVersion(tableId, options?.version || 0, lastUpdated);

    // Clear Zustand persisted data for this table
    removeTableCache(tableId);

    options?.onSuccess?.();
    return true;
  } catch (e) {
    console.error(e);
    options?.onError?.(e as Error);
    return false;
  }
}
