const fs = require('fs');
const path = require('path');

const examsDir = path.join(__dirname, 'src/config/exams');
const files = fs.readdirSync(examsDir).filter(f => f.endsWith('.ts'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(examsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the start of FormatDocument
  const docIdx = content.indexOf('export interface FormatDocument');
  
  // Find the end of FormatConfig
  // Use [\r\n] to handle Windows line endings
  const configEndRegex = /documents:\s*FormatDocument\[\];[\r\n]+\}/;
  const match = content.match(configEndRegex);
  
  if (docIdx !== -1 && match) {
    const endIdx = match.index + match[0].length;
    
    const before = content.slice(0, docIdx);
    const after = content.slice(endIdx);
    
    // Check if import already exists
    let newImport = "import { FormatConfig } from '../formats';\n\n";
    if (before.includes('import { FormatConfig }')) {
        newImport = '';
    }
    
    content = before + newImport + after.trimStart();
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
  } else {
    // console.log(`Could not find interfaces in ${file}`);
  }
}

console.log(`Modified ${modifiedCount} files.`);
