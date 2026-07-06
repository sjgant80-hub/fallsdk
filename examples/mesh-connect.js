// mesh-connect.js
// FallCarrier — register available transports, route to a peer over the best channel.

import { load } from 'https://sjgant80-hub.github.io/fallsdk/dist/estate.js';

const estate = await load({ only: ['fallid', 'fallcarrier', 'falllink', 'fallbridge'] });

const me = await estate.fallid.getOrCreate({ label: 'mesh-node' });
const carrier = estate.fallcarrier.createCarrier({
  did: me.did,
  transports: ['webrtc', 'ble', 'relay'],
  preferOffline: false
});

// Register a WebRTC transport backed by falllink
const link = new estate.falllink.FallLink({ did: me.did });
carrier.register({
  kind: 'webrtc',
  ready: true,
  send: (to, payload) => link.send(to, payload),
  close: () => link.close()
});

// Register a BLE transport if the browser supports it
if (estate.fallbridge.isSupported()) {
  const br = estate.fallbridge.createBridge({ did: me.did });
  carrier.register({
    kind: 'ble',
    get ready() { return br.connected; },
    send: (_to, payload) => br.send(payload),
    close: () => br.disconnect()
  });
}

carrier.on('route', (r) => console.log('route:', r.to, '→', r.transport, '(', r.hops, 'hops)'));
carrier.on('fail',  (e) => console.warn('send failed:', e));

const targetDID = 'did:fall:REPLACE_WITH_A_PEER_DID';
const result = await carrier.send(targetDID, JSON.stringify({ ping: Date.now() }));
console.log('carrier.send result:', result);
