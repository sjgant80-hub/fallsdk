// fallsdk · TypeScript declarations
// central estate meta-package

export * as foldkit from '@ai-native-solutions/foldkit-sdk';

export interface SDKEntry {
  cdn?: string;
  npm?: string;
  types?: string;
  repo?: string;
}

export interface MCPEntry {
  repo?: string;
  npm?: string;
}

export interface APIEntry {
  repo?: string;
}

export interface EstateManifest {
  version: string;
  generated: string;
  sdks: Record<string, SDKEntry | string>;
  mcps: Record<string, MCPEntry | string>;
  apis?: Record<string, APIEntry>;
  expected_growth?: string;
}

export interface LoadOptions {
  base?: string;
  registry?: EstateManifest;
  url?: string;
}

export interface DiscoverOptions {
  base?: string;
  url?: string;
}

export const REGISTRY_URL: string;
export const HARBOR_URL: string;
export const HUB_BASE: string;
export const VERSION: string;
export const BRAND: string;
export const HUB: string;

export function getRegistry(opts?: { url?: string }): Promise<EstateManifest>;
export function load(opts?: LoadOptions): Promise<Record<string, any>>;
export function loadOne(name: string, opts?: LoadOptions): Promise<any>;
export function discoverEstate(opts?: DiscoverOptions): Promise<any>;
export function listTools(opts?: DiscoverOptions): Promise<any[]>;
export function listMCPs(opts?: LoadOptions): Promise<Record<string, MCPEntry | string>>;
export function listSDKs(opts?: LoadOptions): Promise<Record<string, SDKEntry | string>>;
export function listAPIs(opts?: LoadOptions): Promise<Record<string, APIEntry>>;

declare const fallsdk: {
  VERSION: string;
  BRAND: string;
  HUB: string;
  REGISTRY_URL: string;
  HARBOR_URL: string;
  HUB_BASE: string;
  getRegistry: typeof getRegistry;
  load: typeof load;
  loadOne: typeof loadOne;
  discoverEstate: typeof discoverEstate;
  listTools: typeof listTools;
  listMCPs: typeof listMCPs;
  listSDKs: typeof listSDKs;
  listAPIs: typeof listAPIs;
};
export default fallsdk;
