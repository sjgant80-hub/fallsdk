/**
 * fallid — sovereign identity. Ed25519 keypair persisted to IndexedDB, DID string.
 * Source: https://sjgant80-hub.github.io/fallid/fallid.js
 */

export interface FallIdentity {
  did: string;                // e.g. "did:fall:base58publickey"
  publicKey: Uint8Array;
  privateKey?: Uint8Array;    // held locally only
  created: number;            // epoch ms
  label?: string;
}

export interface Signature {
  did: string;
  sig: Uint8Array;
  alg: 'ed25519';
  ts: number;
}

export function getOrCreate(opts?: { label?: string }): Promise<FallIdentity>;
export function create(opts?: { label?: string }): Promise<FallIdentity>;
export function load(did: string): Promise<FallIdentity | null>;
export function listAll(): Promise<FallIdentity[]>;
export function remove(did: string): Promise<boolean>;

export function sign(payload: Uint8Array | string, identity?: FallIdentity): Promise<Signature>;
export function verify(payload: Uint8Array | string, sig: Signature | Uint8Array, publicKey?: Uint8Array | string): Promise<boolean>;

export function DID(publicKey: Uint8Array | string): string;
export function pubFromDID(did: string): Uint8Array;

export function exportIdentity(identity: FallIdentity): string; // JSON
export function importIdentity(json: string): Promise<FallIdentity>;
