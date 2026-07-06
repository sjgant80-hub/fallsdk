/**
 * FallSDK · @ai-native-solutions/estate
 *
 * The central developer SDK for the entire AI-Native Solutions estate.
 * One import, unified access to every sovereign library.
 *
 * Usage:
 *   import { load } from '@ai-native-solutions/estate';
 *   const estate = await load();
 *   const id = await estate.fallid.getOrCreate();
 *   const band = estate.foldkit.classifyKappaBand('some text');
 *
 * Or tree-shakeable:
 *   import { foldkit, fallid } from '@ai-native-solutions/estate';
 *
 * MIT · sjgant80-hub/fallsdk
 */

export const VERSION = '1.0.0';
export const ESTATE_BASE = 'https://sjgant80-hub.github.io';

/**
 * Ordered list of every library the SDK wraps.
 * Order is stable — consumers can rely on it for enumeration.
 */
export const LIBRARIES = Object.freeze([
  'foldkit',
  'foldshim',
  'fallid',
  'falllink',
  'fallstore',
  'fallcarrier',
  'fallpod',
  'fallsync',
  'falldns',
  'falltrust',
  'fallcast',
  'fallmail',
  'fallbridge',
  'fallhop'
]);

/**
 * Metadata about each library — where it lives, one-line summary.
 */
export const CATALOG = Object.freeze({
  foldkit:    { path: 'foldkit/foldkit.js',       summary: 'Fold arithmetic · SPINE · KAPPA · OMEGA · OPS · classifyKappaBand' },
  foldshim:   { path: 'foldkit/foldshim.js',      summary: 'Fold shape adapters · adopt() · RECIPES for legacy state shapes' },
  fallid:     { path: 'fallid/fallid.js',         summary: 'Sovereign identity · Ed25519 DID · getOrCreate · sign · verify' },
  falllink:   { path: 'falllink/falllink.js',     summary: 'WebRTC peer channel · FallLink class · signal server optional' },
  fallstore:  { path: 'fallstore/fallstore.js',   summary: 'Content-addressed storage · store · retrieve · verify · CID' },
  fallcarrier:{ path: 'fallcarrier/fallcarrier.js', summary: 'Transport routing · pick best channel · WebRTC / BLE / relay' },
  fallpod:    { path: 'fallpod/fallpod.js',       summary: 'Solid-style personal data pod · user-owned records' },
  fallsync:   { path: 'fallsync/fallsync.js',     summary: 'CRDT sync · merge concurrent edits without a server' },
  falldns:    { path: 'falldns/falldns.js',       summary: 'Sovereign name resolution · name → DID · no ICANN' },
  falltrust:  { path: 'falltrust/falltrust.js',   summary: 'Web-of-trust · attestations · graph queries' },
  fallcast:   { path: 'fallcast/fallcast.js',     summary: 'Federated broadcast · publish / subscribe over the mesh' },
  fallmail:   { path: 'fallmail/fallmail.js',     summary: 'End-to-end encrypted mail · DID addressed · offline queueable' },
  fallbridge: { path: 'fallbridge/fallbridge.js', summary: 'BLE dongle bridge · off-grid short-range mesh' },
  fallhop:    { path: 'fallhop/fallhop.js',       summary: 'Bitchat → Konomi translator · cross-mesh compatibility' }
});

/**
 * Load the full estate at runtime.
 * Returns a single object with every library as a namespace.
 *
 * @param {object} [opts]
 * @param {string} [opts.base=ESTATE_BASE] - Base URL for module imports.
 * @param {string[]} [opts.only] - Load only these libraries (subset of LIBRARIES).
 * @param {(name:string,err:Error)=>void} [opts.onError] - Called if a module fails; that key is set to null.
 * @returns {Promise<Object>} - Object keyed by library name.
 */
export async function load({ base = ESTATE_BASE, only, onError } = {}) {
  const want = Array.isArray(only) && only.length ? only.filter(n => LIBRARIES.includes(n)) : LIBRARIES;

  const entries = await Promise.all(want.map(async (name) => {
    const url = `${base}/${CATALOG[name].path}`;
    try {
      const mod = await import(url);
      return [name, mod];
    } catch (err) {
      if (typeof onError === 'function') onError(name, err);
      else console.warn(`[fallsdk] failed to load ${name} from ${url}:`, err && err.message);
      return [name, null];
    }
  }));

  const estate = Object.fromEntries(entries);
  estate.$version = VERSION;
  estate.$base = base;
  estate.$catalog = CATALOG;
  return estate;
}

/**
 * Load a single library by name. Cheaper than load() when you only need one.
 * @param {string} name
 * @param {object} [opts]
 * @returns {Promise<any>}
 */
export async function loadOne(name, { base = ESTATE_BASE } = {}) {
  if (!LIBRARIES.includes(name)) {
    throw new Error(`[fallsdk] unknown library: ${name}. Known: ${LIBRARIES.join(', ')}`);
  }
  return import(`${base}/${CATALOG[name].path}`);
}

/**
 * Health check — HEAD each library and report status.
 * @returns {Promise<Array<{name:string,url:string,ok:boolean,status?:number}>>}
 */
export async function healthCheck({ base = ESTATE_BASE } = {}) {
  const results = await Promise.all(LIBRARIES.map(async (name) => {
    const url = `${base}/${CATALOG[name].path}`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return { name, url, ok: res.ok, status: res.status };
    } catch (err) {
      return { name, url, ok: false, status: 0, error: String(err) };
    }
  }));
  return results;
}

/* ------------------------------------------------------------------ *
 * Namespace re-exports (tree-shakeable dynamic-import wrappers).
 * Each export lazy-loads its module on first access.
 * ------------------------------------------------------------------ */

function lazy(name) {
  let cached = null;
  return new Proxy(Object.create(null), {
    get(_t, prop) {
      if (prop === 'then') return undefined; // not a thenable
      if (!cached) cached = loadOne(name);
      return cached.then(mod => mod[prop]);
    }
  });
}

export const foldkit     = lazy('foldkit');
export const foldshim    = lazy('foldshim');
export const fallid      = lazy('fallid');
export const falllink    = lazy('falllink');
export const fallstore   = lazy('fallstore');
export const fallcarrier = lazy('fallcarrier');
export const fallpod     = lazy('fallpod');
export const fallsync    = lazy('fallsync');
export const falldns     = lazy('falldns');
export const falltrust   = lazy('falltrust');
export const fallcast    = lazy('fallcast');
export const fallmail    = lazy('fallmail');
export const fallbridge  = lazy('fallbridge');
export const fallhop     = lazy('fallhop');

export default { VERSION, ESTATE_BASE, LIBRARIES, CATALOG, load, loadOne, healthCheck };
