# FallSDK · `@ai-native-solutions/estate`

**One import for the whole AI-Native Solutions estate.**

Sovereign identity, WebRTC peer channels, content-addressed storage, CRDT sync, off-grid mesh — every estate library unified behind a single npm package with full TypeScript types.

- **Docs:** <https://sjgant80-hub.github.io/fallsdk/>
- **Source:** <https://github.com/sjgant80-hub/fallsdk>
- **License:** MIT

---

## Install

### npm / pnpm / bun

```bash
npm install @ai-native-solutions/estate
```

### Browser (ESM CDN — no build step)

```html
<script type="module">
  import { load } from 'https://sjgant80-hub.github.io/fallsdk/dist/estate.js';
  const estate = await load();
  console.log('KAPPA =', estate.foldkit.KAPPA);
</script>
```

### Deno

```ts
import { load } from 'npm:@ai-native-solutions/estate';
```

---

## Quick start

```js
import { load } from '@ai-native-solutions/estate';

const estate = await load();

// sovereign identity — Ed25519, persisted to IndexedDB
const me = await estate.fallid.getOrCreate({ label: 'my node' });

// open a WebRTC peer channel bound to that DID
const link = new estate.falllink.FallLink({ did: me.did });
link.on('message', ({ from, data }) => console.log(from, data));
await link.broadcast({ hello: 'estate' });
```

Or tree-shake:

```js
import { fallid, foldkit } from '@ai-native-solutions/estate';
const band = await foldkit.classifyKappaBand('the signal survives the fall');
```

---

## What's inside

Fourteen libraries, all shipped, all MIT, all served from GitHub Pages:

| Library      | Summary                                                       |
|--------------|---------------------------------------------------------------|
| `foldkit`    | Fold arithmetic · SPINE · KAPPA · OMEGA · OPS · band classifier |
| `foldshim`   | Shape adapters — `adopt()` + `RECIPES` for legacy state shapes |
| `fallid`     | Sovereign identity · Ed25519 DID · sign · verify              |
| `falllink`   | WebRTC peer channel · `FallLink` class · signaling optional   |
| `fallstore`  | Content-addressed storage · store · retrieve · verify · CID   |
| `fallcarrier`| Transport routing · WebRTC / BLE / relay picker               |
| `fallpod`    | Solid-style personal data pod · user-owned records            |
| `fallsync`   | CRDT sync · merge concurrent edits without a server           |
| `falldns`    | Sovereign name resolution · name → DID · no ICANN root        |
| `falltrust`  | Web-of-trust · attestations · graph queries                   |
| `fallcast`   | Federated broadcast · publish / subscribe over the mesh       |
| `fallmail`   | E2E encrypted mail · DID-addressed · offline queueable        |
| `fallbridge` | BLE dongle bridge · off-grid short-range mesh                 |
| `fallhop`    | Bitchat ↔ Konomi translator · cross-mesh compatibility        |

Full API tables + code samples in the [docs site](https://sjgant80-hub.github.io/fallsdk/).

---

## Core API

### `load(opts?) → Promise<Estate>`

Fetches every library in parallel and returns one object.

```js
const all  = await load();                                    // full estate
const mini = await load({ only: ['fallid', 'foldkit'] });     // subset
const alt  = await load({ base: 'https://mirror.example' });  // custom origin
```

### `loadOne(name, opts?) → Promise<Module>`

Load a single library on demand.

### `healthCheck(opts?) → Promise<Report[]>`

HEAD every library and report status — useful for a status page or CI probe.

### Lazy namespace re-exports

```js
import { foldkit, fallid } from '@ai-native-solutions/estate';
```

Each namespace is a proxy that dynamic-imports on first access — you pay the fetch cost only for what you touch.

---

## Examples

See [`examples/`](./examples/):

- `hello-world.js` — identity + peer channel
- `send-message.js` — signed E2E mail
- `konomi-classifier.js` — KAPPA band classification
- `mesh-connect.js` — carrier + WebRTC + BLE
- `store-and-cast.js` — CID storage + pub/sub
- `trust-graph.js` — web-of-trust queries

---

## TypeScript

Full `.d.ts` coverage in [`types/`](./types/). Each library ships its own declaration file with typed exports, interfaces, and function signatures. Subpath imports are typed too:

```ts
import type { KappaBand, OpMeta } from '@ai-native-solutions/estate/foldkit';
import type { FallIdentity, Signature } from '@ai-native-solutions/estate/fallid';
```

---

## Design principles

- **Sovereign** — nothing calls home. Every library runs on the user's device.
- **Tree-shakeable** — import one library or all fourteen. Bundle only what you use.
- **No runtime deps** — pure ES modules, browser-first.
- **Typed** — full `.d.ts` coverage of every public API.
- **MIT** — do whatever. Fork, remix, mint provenance NFTs.

---

## Lineage

FallSDK is Gen-1 estate — Simon Gant's build, released for the guild (Gen-2) and the wider commons (Gen-3+). Each wrapped library is its own repo under [`sjgant80-hub`](https://github.com/sjgant80-hub), independently MIT-licensed.

Part of the [AI-Native Solutions](https://ai-nativesolutions.com) estate.
