/**
 * fallstore — content-addressed storage. Blake3/SHA-256 CIDs, IndexedDB backend.
 * Source: https://sjgant80-hub.github.io/fallstore/fallstore.js
 */

export interface StoreRecord {
  cid: string;
  size: number;
  mime?: string;
  created: number;
  meta?: Record<string, any>;
}

export function store(data: Uint8Array | string | Blob, opts?: { mime?: string; meta?: Record<string, any> }): Promise<StoreRecord>;
export function retrieve(cid: string): Promise<Uint8Array | null>;
export function retrieveText(cid: string): Promise<string | null>;
export function retrieveJson<T = any>(cid: string): Promise<T | null>;
export function has(cid: string): Promise<boolean>;
export function remove(cid: string): Promise<boolean>;
export function verify(cid: string, data: Uint8Array | string): Promise<boolean>;

export function list(opts?: { limit?: number; offset?: number }): Promise<StoreRecord[]>;
export function stats(): Promise<{ count: number; totalBytes: number }>;

export function CID(data: Uint8Array | string): Promise<string>;
