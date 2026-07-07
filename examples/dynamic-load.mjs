// dynamic-load · pull every -sdk companion listed in the live registry
// run: node dynamic-load.mjs
import { load, getRegistry } from '@ai-native-solutions/fallsdk';

const registry = await getRegistry();
console.log('registry generated:', registry.generated);
console.log('sdks in registry:', Object.keys(registry.sdks));

const loaded = await load({ registry });
for (const [name, mod] of Object.entries(loaded)) {
  if (mod.__error) {
    console.log(`  ${name} · failed:`, mod.__error);
  } else {
    console.log(`  ${name} · exports:`, Object.keys(mod).slice(0, 8).join(', '));
  }
}
