import { useSyncExternalStore } from 'react';
import type { ProjectCategory } from '../data/types';

export type VaultFilter = 'all' | ProjectCategory;

/** Tiny shared store so CTAs in any world can pre-filter the Project Vault. */
let filter: VaultFilter = 'all';
const listeners = new Set<() => void>();

const store = {
  get: () => filter,
  set: (next: VaultFilter) => {
    filter = next;
    listeners.forEach((l) => l());
  },
};

export function useVaultFilter<T>(select: (s: { filter: VaultFilter; set: (f: VaultFilter) => void }) => T): T {
  const current = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    store.get,
    store.get,
  );
  return select({ filter: current, set: store.set });
}
