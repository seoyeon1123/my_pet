declare module 'recoil-persist' {
  import { AtomEffect } from 'recoil';

  export function recoilPersist(config?: { key?: string; storage?: Storage }): {
    persistAtom: AtomEffect<any>;
  };
}
