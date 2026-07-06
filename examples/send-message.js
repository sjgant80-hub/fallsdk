// send-message.js
// FallID + FallMail — signed, end-to-end encrypted mail to a DID.

import { load } from 'https://sjgant80-hub.github.io/fallsdk/dist/estate.js';

const estate = await load({ only: ['fallid', 'fallmail'] });

const me = await estate.fallid.getOrCreate({ label: 'mail-sender' });
const mail = await estate.fallmail.openMail({ did: me.did });

const recipientDID = 'did:fall:REPLACE_WITH_A_REAL_DID';

mail.on('sent', (m) => console.log('sent:', m.id, '→', m.to));
mail.on('fail', (m) => console.warn('fail:', m.id));
mail.on('incoming', (m) => console.log('inbox:', m.subject, 'from', m.from));

const msg = await mail.send(
  recipientDID,
  'hello from the estate',
  'this message was signed by ' + me.did + ' and encrypted client-side.'
);

console.log('queued message id =', msg.id);

// Peek inbox / outbox
console.log('inbox:',  (await mail.inbox()).length);
console.log('outbox:', (await mail.outbox()).length);
