/**
 * fallpod — Solid-style personal data pod, user-owned records.
 * Source: https://sjgant80-hub.github.io/fallpod/fallpod.js
 */

export interface PodRecord {
  path: string;
  data: any;
  owner: string; // DID
  updated: number;
  cid?: string;
}

export interface PodOptions {
  did?: string;
  root?: string;
}

export class FallPod {
  constructor(opts?: PodOptions);
  readonly owner: string;

  put(path: string, data: any): Promise<PodRecord>;
  get<T = any>(path: string): Promise<T | null>;
  del(path: string): Promise<boolean>;
  list(prefix?: string): Promise<PodRecord[]>;
  grant(path: string, toDID: string, mode?: 'read' | 'write'): Promise<void>;
  revoke(path: string, fromDID: string): Promise<void>;
}

export function openPod(opts?: PodOptions): Promise<FallPod>;
