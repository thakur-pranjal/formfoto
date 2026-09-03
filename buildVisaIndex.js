const fs = require('fs');
const path = require('path');

// Target the visas directory
const VISAS_DIR = path.join(__dirname, 'src/config/visas');
const INDEX_FILE = path.join(VISAS_DIR, 'index.ts');

console.log('⚡ Scanning Visas directory...');

// 1. Read all files, filter out anything that isn't a country config
const files = fs.readdirSync(VISAS_DIR).filter(file =>
  file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts'
);

// 2. Dynamically generate import lines and array entries
let importLines = `// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY\nimport { VisaPassportConfig } from './types';\n\n`;
const arrayItems = [];

files.forEach(file => {
  const baseName = file.replace('.ts', '');
  // Convert kebab-case filename to camelCase export name, e.g. us-visa → usVisaConfig
  const exportName = baseName.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Config';

  importLines += `import { ${exportName} } from './${baseName}';\n`;
  arrayItems.push(`  ${exportName}`);
});

// 3. Construct the barrel file
const arrayBody = arrayItems.length > 0 ? `\n${arrayItems.join(',\n')}\n` : '';
const output = `${importLines}
export const visaStandards: VisaPassportConfig[] = [${arrayBody}];

export const getVisaConfigById = (slug: string): VisaPassportConfig | undefined =>
  visaStandards.find((item) => item.id.toLowerCase() === slug.toLowerCase());

export * from './types';
`;

// 4. Write to disk
fs.writeFileSync(INDEX_FILE, output);
console.log(`✅ Visa index generated: registered ${files.length} visa config(s).`);