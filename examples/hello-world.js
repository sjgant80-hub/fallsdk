// hello-world.js
// Simplest possible FallSDK example: create an identity, open a peer channel,
// broadcast one message. Run in a browser (needs WebRTC + IndexedDB).
//
//   <script type="module" src="./hello-world.js"></script>

import { load } from 'https://sjgant80-hub.github.io/fallsdk/dist/estate.js';

const estate = await load({ only: ['fallid', 'falllink'] });

// 1. sovereign identity (persisted in IndexedDB)
const me = await estate.fallid.getOrCreate({ label: 'hello-world' });
console.log('my DID:', me.did);

// 2. open a WebRTC peer channel bound to that DID
const link = new estate.falllink.FallLink({ did: me.did });

link.on('open',    () => console.log('channel open, id =', link.id));
link.on('peer',    (pid) => console.log('peer joined:', pid));
link.on('message', ({ from, data }) => console.log('rx from', from, ':', data));

// 3. once the channel is ready, broadcast a hello
link.once('open', async () => {
  await link.broadcast({ hello: 'estate', at: Date.now() });
});
