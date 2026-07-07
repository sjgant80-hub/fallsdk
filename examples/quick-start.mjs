// quick-start · import foldkit through fallsdk and use it
// run: node quick-start.mjs
import { foldkit } from '@ai-native-solutions/fallsdk';

console.log('SPINE primes:', foldkit.SPINE);
console.log('PHI:', foldkit.PHI);
console.log('KAPPA:', foldkit.KAPPA);

const S = [1, 1, 0, 1, 0, 0, 0];
const F = foldkit.foldNumber(S);
console.log('fold number for', S, '=', F);

const back = foldkit.unfoldState(F);
console.log('unfold', F, '=', back);

const band = foldkit.depthBand(0.4);
console.log('kappa 0.4 band:', band && band.name, band && band.glyph);

const probe = foldkit.probeFromKappa(0.7, 'system feels stuck');
console.log('probe at 0.7:', probe);
