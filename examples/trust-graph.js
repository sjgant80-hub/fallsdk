// trust-graph.js
// Build a small web-of-trust with FallTrust and query the score.

import { load } from 'https://sjgant80-hub.github.io/fallsdk/dist/estate.js';

const { fallid, falltrust } = await load({ only: ['fallid', 'falltrust'] });

// Three identities for the demo
const me     = await fallid.create({ label: 'me'     });
const alice  = await fallid.create({ label: 'alice'  });
const bob    = await fallid.create({ label: 'bob'    });

// me → alice (strong)   alice → bob (medium)
await falltrust.attest(me.did,    alice.did, 'vouch', { weight: 0.9 });
await falltrust.attest(alice.did, bob.did,   'know',  { weight: 0.5 });

const direct   = await falltrust.trustScore(me.did, alice.did);
const indirect = await falltrust.trustScore(me.did, bob.did, { maxHops: 2 });
console.log('direct me→alice:', direct);
console.log('indirect me→bob (via alice):', indirect);

const path = await falltrust.findPath(me.did, bob.did, { maxHops: 3 });
if (path) {
  console.log('path score:', path.score);
  for (const a of path.hops) console.log('  ', a.from, '→', a.to, `(${a.claim} w=${a.weight})`);
}
