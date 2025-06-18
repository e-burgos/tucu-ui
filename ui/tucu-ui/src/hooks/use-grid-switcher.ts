import { create } from 'zustand';

interface GridSwitcherStore {
  isGridCompact: boolean;
  setIsGridCompact: (isGridCompact: boolean) => void;
}

export const useGridSwitcher = create<GridSwitcherStore>((set) => ({
  isGridCompact: false,
  setIsGridCompact: (isGridCompact) => set({ isGridCompact }),
}));
