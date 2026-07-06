/**
 * fallhop — Bitchat ↔ Konomi mesh translator. Cross-mesh compatibility layer.
 * Source: https://sjgant80-hub.github.io/fallhop/fallhop.js
 */

export interface BitchatFrame {
  id: string;
  from: string;
  to?: string;
  channel?: string;
  payload: Uint8Array;
  ttl: number;
}

export interface KonomiFrame {
  id: string;
  from: string;         // DID
  to?: string;          // DID
  topic?: string;
  payload: Uint8Array;
  hops: number;
  sig?: string;
}

export function bitchatToKonomi(frame: BitchatFrame): KonomiFrame;
export function konomiToBitchat(frame: KonomiFrame): BitchatFrame;

export class FallHop {
  constructor(opts?: { did?: string; carrier?: any });
  onBitchat(handler: (f: BitchatFrame) => void): () => void;
  onKonomi(handler: (f: KonomiFrame) => void): () => void;
  emitBitchat(frame: BitchatFrame): Promise<void>;
  emitKonomi(frame: KonomiFrame): Promise<void>;
  close(): void;
}

export function createHop(opts?: { did?: string; carrier?: any }): FallHop;
