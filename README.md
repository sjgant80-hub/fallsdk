# FallSDK

**One import for every tool in the AI-Native Solutions estate.**

FallSDK is the central meta-package. If you want to build on top of the estate — from JavaScript, TypeScript, Node, Deno, Bun, or a browser via CDN — this is the single entry-point you install.

```bash
npm install @ai-native-solutions/fallsdk
```

```js
import { foldkit } from '@ai-native-solutions/fallsdk';

console.log(foldkit.SPINE);        // [2, 3, 5, 7, 11, 13, 17]
console.log(foldkit.foldNumber([1,1,0,1,0,0,0]));
```

Or via CDN:

```html
<script type="module">
  import fallsdk from 'https://esm.sh/@ai-native-solutions/fallsdk';
  const modules = await fallsdk.load();
  console.log(modules);
</script>
```

## Why one meta-package

The estate is dozens of small, focused, MIT-licensed tools — each with its own repo, its own website, and increasingly its own companion `-sdk` package. If you want three of them you shouldn't have to hunt down three npm names, three CDN URLs, and three README pages. FallSDK is the doorway.

- **Static re-exports** — companions that already exist on npm are re-exported by name, so tree-shakers see individual functions and bundle only what you use.
- **Dynamic registry** — companions that are still being generated appear in `registry.json` and can be loaded at runtime via `load()`. As `fall-sdk-generator` publishes more repos, the registry grows and everything is instantly reachable.
- **Estate discovery** — `discoverEstate()` pulls the [FallHarbor](https://sjgant80-hub.github.io/fallharbor/) manifest so you can list every tool in the estate, not just the ones with SDKs yet.

## What's shipping today

Only **[foldkit-sdk](https://sjgant80-hub.github.io/foldkit-sdk/)** is available as a standalone published SDK right now. It's the origami-mathematics substrate that everything else is built on: SPINE primes, kappa bands, six fold operations, Kawasaki and Maekawa validators. FallSDK re-exports it verbatim as `foldkit`.

Every other tool in the estate is still an HTML app or a raw library. `fall-sdk-generator` runs in-browser (WebLLM) and produces `-sdk` companion repos for the rest. As each one lands it's added to `registry.json` — no change needed on your side beyond a version bump.

## API

### Static

```js
import { foldkit } from '@ai-native-solutions/fallsdk';
```

Re-exports the full [foldkit-sdk](https://sjgant80-hub.github.io/foldkit-sdk/) namespace. See its docs for the full surface.

### Registry

```js
import { getRegistry, listSDKs } from '@ai-native-solutions/fallsdk';

const registry = await getRegistry();
// { version, generated, sdks: { foldkit: '...' }, mcps: {...} }
```

### Dynamic load

```js
import { load, loadOne } from '@ai-native-solutions/fallsdk';

const all = await load();          // { foldkit: Module, ... }
const fk  = await loadOne('foldkit');
```

Load pulls the current registry, dynamic-imports every listed entry-point, and collects the results. Failed imports are captured as `{ __error: '...' }` rather than throwing — the estate degrades gracefully.

### Estate discovery

```js
import { discoverEstate, listTools, listMCPs } from '@ai-native-solutions/fallsdk';

const harbor = await discoverEstate();   // full FallHarbor manifest
const tools  = await listTools();        // flat array of tool entries
const mcps   = await listMCPs();         // { name -> repo } for MCPs
```

## Adding a new -sdk to the registry

When `fall-sdk-generator` (or a human) publishes a new `<name>-sdk` repo:

1. Ensure the repo publishes ESM at `https://sjgant80-hub.github.io/<name>-sdk/src/index.js`.
2. Edit `registry.json` in this repo and add an entry under `sdks`:
   ```json
   "sdks": {
     "foldkit": {
       "cdn": "https://sjgant80-hub.github.io/foldkit-sdk/src/index.js",
       "npm": "@ai-native-solutions/foldkit-sdk",
       "types": "https://sjgant80-hub.github.io/foldkit-sdk/src/index.d.ts",
       "repo": "sjgant80-hub/foldkit-sdk"
     },
     "yournew": {
       "cdn": "https://sjgant80-hub.github.io/yournew-sdk/src/index.js",
       "npm": "@ai-native-solutions/yournew-sdk",
       "repo": "sjgant80-hub/yournew-sdk"
     }
   }
   ```
3. Commit and push. GitHub Pages redeploys within a minute. Every consumer of `load()` now sees the new SDK on their next call.
4. Optionally add a static re-export to `src/index.js` so it appears in the tree-shakeable namespace as well, then bump `package.json` version.

## License

MIT · Copyright (c) 2026 AI-Native Solutions

## Links

- [foldkit-sdk](https://sjgant80-hub.github.io/foldkit-sdk/) — the substrate SDK
- [FallHarbor](https://sjgant80-hub.github.io/fallharbor/) — the estate directory
- [ai-nativesolutions.com](https://ai-nativesolutions.com)
