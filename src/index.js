// fallsdk · central estate meta-package
// one import for every AI-Native Solutions tool
// registry pattern grows as fall-sdk-generator produces companions

// ---- Static re-exports (published to npm) ----------------------------
// foldkit-sdk is the exemplar · shipped standalone at
// https://sjgant80-hub.github.io/foldkit-sdk/
export * as foldkit from '@ai-native-solutions/foldkit-sdk';

// Placeholders for other SDKs as they publish:
// export * as fallid   from '@ai-native-solutions/fallid-sdk';
// export * as falllink from '@ai-native-solutions/falllink-sdk';
// export * as fallstore from '@ai-native-solutions/fallstore-sdk';
// export * as fallmesh from '@ai-native-solutions/fallmesh-sdk';
// ... batch generator will produce these · registry.json is the truth source

// ---- Registry defaults -----------------------------------------------
export const REGISTRY_URL = 'https://sjgant80-hub.github.io/fallsdk/registry.json';
export const HARBOR_URL   = 'https://sjgant80-hub.github.io/fallharbor/manifest.json';
export const HUB_BASE     = 'https://sjgant80-hub.github.io';

// ---- Registry fetch --------------------------------------------------
// Returns the estate registry object · single source of truth for which
// -sdk companions currently exist. Never fabricates entries.
export async function getRegistry({ url = REGISTRY_URL } = {}) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`fallsdk: registry fetch ${res.status} at ${url}`);
  return res.json();
}

// ---- Dynamic loader --------------------------------------------------
// Fetch registry.json and dynamic-import every listed SDK entry-point.
// Failed loads land in loaded[name].__error rather than throwing globally
// — the estate must degrade gracefully when a companion is missing.
export async function load({ base = HUB_BASE, registry, url } = {}) {
  const manifest = registry || await getRegistry({ url: url || `${base}/fallsdk/registry.json` });
  const loaded = {};
  const entries = Object.entries(manifest.sdks || {});
  await Promise.all(entries.map(async ([name, entry]) => {
    const sdkUrl = typeof entry === 'string' ? entry : (entry && entry.cdn);
    if (!sdkUrl) { loaded[name] = { __error: 'no cdn url in registry entry' }; return; }
    try {
      loaded[name] = await import(/* @vite-ignore */ sdkUrl);
    } catch (e) {
      loaded[name] = { __error: e && e.message ? e.message : String(e) };
    }
  }));
  return loaded;
}

// ---- Single-SDK loader -----------------------------------------------
// Convenience: load one SDK by name from the live registry.
export async function loadOne(name, opts = {}) {
  const manifest = opts.registry || await getRegistry(opts);
  const entry = manifest.sdks && manifest.sdks[name];
  if (!entry) throw new Error(`fallsdk: no SDK "${name}" in registry (have: ${Object.keys(manifest.sdks || {}).join(', ') || 'none'})`);
  const url = typeof entry === 'string' ? entry : entry.cdn;
  if (!url) throw new Error(`fallsdk: no cdn url for SDK "${name}"`);
  return import(/* @vite-ignore */ url);
}

// ---- List available SDKs / APIs -------------------------------------
export async function listSDKs(opts = {}) {
  const manifest = opts.registry || await getRegistry(opts);
  return manifest.sdks || {};
}

export async function listAPIs(opts = {}) {
  const manifest = opts.registry || await getRegistry(opts);
  return manifest.apis || {};
}

// ---- Estate discovery via FallHarbor ---------------------------------
// FallHarbor is the estate directory · returns the full manifest.
export async function discoverEstate({ base = HUB_BASE, url } = {}) {
  const target = url || `${base}/fallharbor/manifest.json`;
  const res = await fetch(target, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`fallsdk: harbor fetch ${res.status} at ${target}`);
  return res.json();
}

// ---- Tool listing helper ---------------------------------------------
// Flatten discoverEstate() → array of {slug, name, category, url, ...}.
export async function listTools(opts = {}) {
  const harbor = await discoverEstate(opts);
  const tools = Array.isArray(harbor.tools) ? harbor.tools
              : (harbor.tools && typeof harbor.tools === 'object') ? Object.entries(harbor.tools).map(([k, v]) => ({ slug: k, ...v }))
              : [];
  return tools;
}

// ---- MCP registry ----------------------------------------------------
// Returns { name → repo } for the MCP companions of estate tools.
export async function listMCPs(opts = {}) {
  const manifest = opts.registry || await getRegistry(opts);
  return manifest.mcps || {};
}

// ---- Meta ------------------------------------------------------------
export const VERSION = '1.0.0';
export const BRAND = 'AI-Native Solutions';
export const HUB = 'sjgant80-hub';

// ---- Default namespace object ----------------------------------------
// Convenience for `import fallsdk from '@ai-native-solutions/fallsdk'`.
const fallsdk = {
  VERSION, BRAND, HUB,
  REGISTRY_URL, HARBOR_URL, HUB_BASE,
  getRegistry, load, loadOne, discoverEstate, listTools, listMCPs, listSDKs, listAPIs,
};
export default fallsdk;
