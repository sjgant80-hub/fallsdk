// fallsdk/registry · dedicated registry surface
// registry.json is the source of truth for which -sdk repos exist
// updates as fall-sdk-generator publishes new ones

export const REGISTRY_URL = 'https://sjgant80-hub.github.io/fallsdk/registry.json';

export async function getRegistry({ url = REGISTRY_URL } = {}) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`fallsdk/registry: fetch ${res.status} at ${url}`);
  return res.json();
}

// List sdk names currently registered · returns [] if none.
export async function listSDKs(opts = {}) {
  const r = await getRegistry(opts);
  return Object.keys(r.sdks || {});
}

// Resolve one entry · null if missing. Returns the full entry object.
export async function resolve(name, opts = {}) {
  const r = await getRegistry(opts);
  return (r.sdks && r.sdks[name]) || null;
}

// Resolve just the CDN url · null if missing.
export async function resolveCDN(name, opts = {}) {
  const entry = await resolve(name, opts);
  if (!entry) return null;
  return typeof entry === 'string' ? entry : (entry.cdn || null);
}

// Snapshot summary · size + growth hint.
export async function summary(opts = {}) {
  const r = await getRegistry(opts);
  return {
    version: r.version,
    generated: r.generated,
    sdkCount: Object.keys(r.sdks || {}).length,
    mcpCount: Object.keys(r.mcps || {}).length,
    apiCount: Object.keys(r.apis || {}).length,
    expected_growth: r.expected_growth || null,
  };
}
