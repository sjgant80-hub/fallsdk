// store-and-cast.js
// Content-address a blob, then broadcast the CID over FallCast.

import { load } from 'https://sjgant80-hub.github.io/fallsdk/dist/estate.js';

const estate = await load({ only: ['fallid', 'fallstore', 'fallcast'] });

const me   = await estate.fallid.getOrCreate({ label: 'publisher' });
const cast = estate.fallcast.createCast({ did: me.did });

// 1. store content and get a CID
const payload = JSON.stringify({
  title: 'estate live',
  body:  'the SDK ships. one import for the whole thing.',
  ts:    Date.now()
});
const rec = await estate.fallstore.store(payload, { mime: 'application/json' });
console.log('stored:', rec.cid, '(', rec.size, 'bytes )');

// 2. subscribe to the topic so we see our own broadcast
const unsub = cast.subscribe('estate/news', (msg) => {
  console.log('rx on estate/news:', msg.from, '→ cid', msg.data.cid);
});

// 3. publish the CID, not the content — receivers fetch it themselves
await cast.publish('estate/news', { cid: rec.cid, mime: rec.mime });

setTimeout(() => { unsub(); cast.close(); }, 5000);
