/**
 * fallbridge — BLE dongle bridge for off-grid short-range mesh.
 * Source: https://sjgant80-hub.github.io/fallbridge/fallbridge.js
 */

export interface BridgeDevice {
  id: string;
  name: string;
  rssi?: number;
  connected: boolean;
}

export interface BridgeOptions {
  serviceUUID?: string;
  did?: string;
}

export class FallBridge {
  constructor(opts?: BridgeOptions);
  readonly connected: boolean;

  scan(opts?: { timeoutMs?: number }): Promise<BridgeDevice[]>;
  connect(deviceId: string): Promise<void>;
  disconnect(): Promise<void>;
  send(payload: Uint8Array | string): Promise<void>;
  on(event: 'device' | 'connect' | 'disconnect' | 'data' | 'error', handler: (arg: any) => void): this;
}

export function createBridge(opts?: BridgeOptions): FallBridge;
export function isSupported(): boolean;
