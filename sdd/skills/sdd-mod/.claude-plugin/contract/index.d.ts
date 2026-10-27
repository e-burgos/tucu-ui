export type GateMode = 'block' | 'warn';

export type ModSettings = { enabled: boolean; gate: GateMode };

export type CycleTask = { id: string; title: string; status: string };

export type ActiveCycle = {
  spec: string;
  title: string;
  cycle: string;
  flow: string;
  tasks: CycleTask[];
};

export type OpenFix = { id: string; title: string; status: string };

export type Snapshot = {
  settings: ModSettings;
  cycles: ActiveCycle[];
  fixes: OpenFix[];
  /** Set when sdd/ could not be read: the gate stays open and the band says why. */
  error?: string;
};

declare module 'claude-code' {
  interface PluginState {
    'sdd-mod': { snapshot: Snapshot | null };
  }
}
