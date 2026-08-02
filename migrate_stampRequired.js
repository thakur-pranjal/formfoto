const fs = require('fs');
const path = require('path');

const examsDir = path.join(__dirname, 'src/config/exams');
const files = fs.readdirSync(examsDir).filter(f => f.endsWith('.ts'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(examsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let modified = false;
  // Replace `{ \n id: 'photo'` with `{ \n stampRequired: false, \n id: 'photo'` etc.
  // Actually, a better regex is to look for `maxKb: \d+,` and if the next line is not stampRequired, insert it.
  
  content = content.replace(/maxKb:\s*\d+,/g, (match, offset, str) => {
    // Check if the next non-whitespace characters are 'stampRequired'
    const afterMatch = str.slice(offset + match.length, offset + match.length + 50);
    if (!afterMatch.includes('stampRequired')) {
      modified = true;
      return `${match}\n      stampRequired: false,`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`Modified ${modifiedCount} files to add stampRequired: false.`);
