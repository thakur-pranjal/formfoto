const fs = require('fs');
const path = require('path');

const EXAMS_DIR = path.join(__dirname, 'src/config/exams');
const INDEX_FILE = path.join(EXAMS_DIR, 'index.ts');

console.log('⚡ Scanning Exam directory...');

const files = fs.readdirSync(EXAMS_DIR).filter(file =>
  file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts'
);

let imports = `// 🚀 AUTO-GENERATED FILE - DO NOT EDIT MANUALLY\n\n`;
let arrayItems = [];

files.forEach(file => {
  const baseName = file.replace('.ts', '');
  const filePath = path.join(EXAMS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Read the actual export name from the file (e.g. "export const afmc_mbbsConfig")
  const match = content.match(/export const (\w+Config)/);
  if (!match) {
    console.warn(`⚠️  Could not find a Config export in ${file}, skipping.`);
    return;
  }
  const exportName = match[1];

  imports += `import { ${exportName} } from './${baseName}';\n`;
  arrayItems.push(`  ${exportName},`);
});

const output = `${imports}
export const examStandards = [
${arrayItems.join('\n')}
];

export const getExamConfigById = (slug: string) => {
  return examStandards.find(
    (item) => item.id.toLowerCase() === slug.toLowerCase()
  );
};
`;

fs.writeFileSync(INDEX_FILE, output);
console.log(`✅ Exam Registry Complete: Linked ${files.length} exams to src/config/exams/index.ts.`);