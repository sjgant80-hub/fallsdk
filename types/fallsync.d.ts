/**
 * fallsync — CRDT sync. Merge concurrent edits without a central server.
 * Source: https://sjgant80-hub.github.io/fallsync/fallsync.js
 */

export type CRDTKind = 'lww' | 'gcounter' | 'orset' | 'rga' | 'automerge';

export interface CRDTDoc<T = any> {
  id: string;
  kind: CRDTKind;
  state: T;
  clock: Record<string, number>;
}

export interface Delta {
  from: string;
  ops: any[];
  clock: Record<string, number>;
}

export function create<T>(id: string, kind?: CRDTKind, initial?: T): CRDTDoc<T>;
export function apply<T>(doc: CRDTDoc<T>, op: any): CRDTDoc<T>;
export function merge<T>(a: CRDTDoc<T>, b: CRDTDoc<T>): CRDTDoc<T>;
export function diff<T>(a: CRDTDoc<T>, b: CRDTDoc<T>): Delta;
export function encode<T>(doc: CRDTDoc<T>): Uint8Array;
export function decode<T = any>(bytes: Uint8Array): CRDTDoc<T>;

export class SyncSession<T = any> {
  constructor(doc: CRDTDoc<T>, opts?: { peerId?: string });
  readonly doc: CRDTDoc<T>;
  push(op: any): void;
  pull(delta: Delta): void;
  on(event: 'change' | 'sync', handler: (arg: any) => void): this;
}
