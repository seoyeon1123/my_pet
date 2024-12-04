declare module 'recoil-persist' {
  import { AtomEffect } from 'recoil';

  export function recoilPersist<T>(config?: { key?: string; storage?: Storage }): {
    persistAtom: AtomEffect<T>;
  };
}
