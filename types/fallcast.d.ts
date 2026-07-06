/**
 * fallcast — federated broadcast. Pub/sub over the mesh.
 * Source: https://sjgant80-hub.github.io/fallcast/fallcast.js
 */

export interface CastMessage {
  topic: string;
  from: string;   // DID
  data: any;
  ts: number;
  sig?: string;
}

export type CastHandler = (msg: CastMessage) => void;

export class FallCast {
  constructor(opts?: { did?: string; carrier?: any });
  publish(topic: string, data: any): Promise<CastMessage>;
  subscribe(topic: string, handler: CastHandler): () => void;
  unsubscribe(topic: string, handler?: CastHandler): void;
  topics(): string[];
  peers(topic: string): string[];
  close(): void;
}

export function createCast(opts?: { did?: string; carrier?: any }): FallCast;
