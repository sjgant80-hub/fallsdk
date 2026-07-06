/**
 * falllink — WebRTC peer channel with optional signaling.
 * Source: https://sjgant80-hub.github.io/falllink/falllink.js
 */

export interface FallLinkOptions {
  signalUrl?: string;
  iceServers?: RTCIceServer[];
  did?: string;
  label?: string;
}

export interface FallLinkMessage {
  from: string;
  data: any;
  ts: number;
}

export type FallLinkEvent =
  | 'open' | 'close' | 'message' | 'peer' | 'error' | 'signal';

export class FallLink {
  constructor(opts?: FallLinkOptions);

  readonly id: string;
  readonly peers: ReadonlyArray<string>;
  readonly ready: boolean;

  connect(peerId: string): Promise<void>;
  send(peerId: string, data: any): Promise<void>;
  broadcast(data: any): Promise<void>;
  disconnect(peerId?: string): void;
  close(): void;

  on(event: FallLinkEvent, handler: (arg: any) => void): this;
  off(event: FallLinkEvent, handler: (arg: any) => void): this;
  once(event: FallLinkEvent, handler: (arg: any) => void): this;
}

export function createLink(opts?: FallLinkOptions): FallLink;
