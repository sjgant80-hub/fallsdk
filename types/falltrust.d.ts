/**
 * falltrust — web-of-trust. DID attestations + graph queries.
 * Source: https://sjgant80-hub.github.io/falltrust/falltrust.js
 */

export interface Attestation {
  from: string;   // DID
  to: string;     // DID
  claim: string;  // e.g. "vouch", "know", "worked-with"
  weight?: number;
  ts: number;
  sig?: string;
}

export interface TrustPath {
  from: string;
  to: string;
  hops: Attestation[];
  score: number;
}

export function attest(from: string, to: string, claim: string, opts?: { weight?: number }): Promise<Attestation>;
export function revoke(attestationId: string): Promise<boolean>;
export function attestationsFor(did: string): Promise<Attestation[]>;
export function attestationsBy(did: string): Promise<Attestation[]>;

export function trustScore(from: string, to: string, opts?: { maxHops?: number; claim?: string }): Promise<number>;
export function findPath(from: string, to: string, opts?: { maxHops?: number }): Promise<TrustPath | null>;
export function neighbors(did: string, opts?: { minWeight?: number }): Promise<string[]>;
