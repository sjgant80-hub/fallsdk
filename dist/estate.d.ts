/**
 * FallSDK · @ai-native-solutions/estate
 * Central developer SDK for the AI-Native Solutions estate.
 */

import * as FoldkitNS from '../types/foldkit';
import * as FoldshimNS from '../types/foldshim';
import * as FallidNS from '../types/fallid';
import * as FalllinkNS from '../types/falllink';
import * as FallstoreNS from '../types/fallstore';
import * as FallcarrierNS from '../types/fallcarrier';
import * as FallpodNS from '../types/fallpod';
import * as FallsyncNS from '../types/fallsync';
import * as FalldnsNS from '../types/falldns';
import * as FalltrustNS from '../types/falltrust';
import * as FallcastNS from '../types/fallcast';
import * as FallmailNS from '../types/fallmail';
import * as FallbridgeNS from '../types/fallbridge';
import * as FallhopNS from '../types/fallhop';

export const VERSION: string;
export const ESTATE_BASE: string;

export type LibraryName =
  | 'foldkit' | 'foldshim' | 'fallid' | 'falllink'
  | 'fallstore' | 'fallcarrier' | 'fallpod' | 'fallsync'
  | 'falldns' | 'falltrust' | 'fallcast' | 'fallmail'
  | 'fallbridge' | 'fallhop';

export const LIBRARIES: ReadonlyArray<LibraryName>;

export interface CatalogEntry {
  path: string;
  summary: string;
}
export const CATALOG: Readonly<Record<LibraryName, CatalogEntry>>;

export interface LoadOptions {
  base?: string;
  only?: LibraryName[];
  onError?: (name: LibraryName, err: Error) => void;
}

export interface Estate {
  foldkit:     typeof FoldkitNS     | null;
  foldshim:    typeof FoldshimNS    | null;
  fallid:      typeof FallidNS      | null;
  falllink:    typeof FalllinkNS    | null;
  fallstore:   typeof FallstoreNS   | null;
  fallcarrier: typeof FallcarrierNS | null;
  fallpod:     typeof FallpodNS     | null;
  fallsync:    typeof FallsyncNS    | null;
  falldns:     typeof FalldnsNS     | null;
  falltrust:   typeof FalltrustNS   | null;
  fallcast:    typeof FallcastNS    | null;
  fallmail:    typeof FallmailNS    | null;
  fallbridge:  typeof FallbridgeNS  | null;
  fallhop:     typeof FallhopNS     | null;
  $version: string;
  $base: string;
  $catalog: Readonly<Record<LibraryName, CatalogEntry>>;
}

export function load(opts?: LoadOptions): Promise<Estate>;
export function loadOne<K extends LibraryName>(name: K, opts?: { base?: string }): Promise<any>;
export function healthCheck(opts?: { base?: string }): Promise<Array<{
  name: LibraryName; url: string; ok: boolean; status?: number; error?: string;
}>>;

export const foldkit:     typeof FoldkitNS;
export const foldshim:    typeof FoldshimNS;
export const fallid:      typeof FallidNS;
export const falllink:    typeof FalllinkNS;
export const fallstore:   typeof FallstoreNS;
export const fallcarrier: typeof FallcarrierNS;
export const fallpod:     typeof FallpodNS;
export const fallsync:    typeof FallsyncNS;
export const falldns:     typeof FalldnsNS;
export const falltrust:   typeof FalltrustNS;
export const fallcast:    typeof FallcastNS;
export const fallmail:    typeof FallmailNS;
export const fallbridge:  typeof FallbridgeNS;
export const fallhop:     typeof FallhopNS;

declare const _default: {
  VERSION: string;
  ESTATE_BASE: string;
  LIBRARIES: ReadonlyArray<LibraryName>;
  CATALOG: Readonly<Record<LibraryName, CatalogEntry>>;
  load: typeof load;
  loadOne: typeof loadOne;
  healthCheck: typeof healthCheck;
};
export default _default;
