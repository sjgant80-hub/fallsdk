// discover-estate · pull the FallHarbor directory and list every tool
// run: node discover-estate.mjs
import { discoverEstate, listTools, listMCPs } from '@ai-native-solutions/fallsdk';

const harbor = await discoverEstate();
console.log('estate operator:', harbor.operator && harbor.operator.name);
console.log('categories:', harbor.categories && Object.keys(harbor.categories));

const tools = await listTools();
console.log(`\n${tools.length} tools in the estate:\n`);
for (const t of tools) {
  console.log(`  ${t.slug || t.name} · ${t.category || ''} · ${t.url || ''}`);
}

const mcps = await listMCPs();
console.log(`\n${Object.keys(mcps).length} MCP companion(s):`, mcps);
