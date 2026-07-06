/**
 * fallcarrier — transport routing. Picks best available channel per destination.
 * Source: https://sjgant80-hub.github.io/fallcarrier/fallcarrier.js
 */

export type TransportKind = 'webrtc' | 'ble' | 'relay' | 'ws' | 'local';

export interface Transport {
  kind: TransportKind;
  ready: boolean;
  send(to: string, payload: Uint8Array | string): Promise<void>;
  close(): void;
}

export interface Route {
  to: string;
  transport: TransportKind;
  hops: number;
  latencyMs?: number;
}

export interface CarrierOptions {
  transports?: TransportKind[];
  did?: string;
  preferOffline?: boolean;
}

export class FallCarrier {
  constructor(opts?: CarrierOptions);
  register(transport: Transport): void;
  route(to: string): Promise<Route | null>;
  send(to: string, payload: Uint8Array | string): Promise<{ ok: boolean; route: Route | null }>;
  on(event: 'route' | 'send' | 'fail' | 'transport', handler: (arg: any) => void): this;
  close(): void;
}

export function createCarrier(opts?: CarrierOptions): FallCarrier;
export function pickTransport(available: TransportKind[], destination?: string): TransportKind;
