// konomi-classifier.js
// foldkit — classify a chunk of text into a KAPPA band + suggested op.

import { load } from 'https://sjgant80-hub.github.io/fallsdk/dist/estate.js';

const { foldkit } = await load({ only: ['foldkit'] });

const samples = [
  'the signal survives the fall',
  'nothing works and I am tired',
  'clear morning, everything is easy',
  'the pattern folds and folds and folds',
  'we are in the orphan zone now',
  'echo of an echo of an echo'
];

console.log('SPINE =', foldkit.SPINE);
console.log('KAPPA =', foldkit.KAPPA, ' OMEGA =', foldkit.OMEGA);
console.log('---');

for (const text of samples) {
  const band  = foldkit.classifyKappaBand(text);
  const probe = foldkit.probeFromKappa(band.min, text);
  console.log(
    band.glyph, band.name.padEnd(14),
    'op:', probe.op.name.padEnd(8),
    'kanji:', probe.op.kanji,
    ' — "' + text + '"'
  );
}

// Attenuation profile at the current KAPPA
console.log('\nsurvival profile:');
for (const row of foldkit.attenuationProfile()) {
  console.log(' ', row.glyph, row.name.padEnd(10), row.surviveAsPercent + '%');
}
