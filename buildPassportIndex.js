const fs = require('fs');
const path = require('path');

// Target the passports directory
const PASSPORTS_DIR = path.join(__dirname, 'src/config/passports');
const INDEX_FILE = path.join(PASSPORTS_DIR, 'index.ts');

console.log('⚡ Scanning Passports directory...');

// 1. Read all files, filter out anything that isn't a country config
const files = fs.readdirSync(PASSPORTS_DIR).filter(file =>
  file.endsWith('.ts') && file !== 'index.ts'
);

// 2. Dynamically generate import lines and array entries
let importLines = `// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY\nimport { VisaPassportConfig } from '../visas/types';\n\n`;
const arrayItems = [];

files.forEach(file => {
  const baseName = file.replace('.ts', '');
  // Convert kebab-case filename to camelCase export name, e.g. india-passport → indiaPassportConfig
  const exportName = baseName.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Config';

  importLines += `import { ${exportName} } from './${baseName}';\n`;
  arrayItems.push(`  ${exportName}`);
});

// 3. Construct the barrel file
const output = `${importLines}
export const passportStandards: VisaPassportConfig[] = [
${arrayItems.join(',\n')},
];

export const getPassportConfigById = (slug: string): VisaPassportConfig | undefined =>
  passportStandards.find((item) => item.id.toLowerCase() === slug.toLowerCase());
`;

// 4. Write to disk
fs.writeFileSync(INDEX_FILE, output);
console.log(`✅ Passport index generated: registered ${files.length} passport config(s).`);
