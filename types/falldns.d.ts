/**
 * falldns — sovereign name resolution. Name → DID lookup, no ICANN root.
 * Source: https://sjgant80-hub.github.io/falldns/falldns.js
 */

export interface DNSRecord {
  name: string;         // e.g. "simon.fall"
  did: string;
  updated: number;
  proof?: string;       // signature by DID owner
  ttl?: number;
}

export function resolve(name: string): Promise<DNSRecord | null>;
export function reverse(did: string): Promise<string[]>;
export function register(name: string, did: string, opts?: { proof?: string; ttl?: number }): Promise<DNSRecord>;
export function release(name: string, did: string): Promise<boolean>;
export function list(prefix?: string): Promise<DNSRecord[]>;
export function verifyRecord(record: DNSRecord): Promise<boolean>;

export const ROOT_ZONE: string;
