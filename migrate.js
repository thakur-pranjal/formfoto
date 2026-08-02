const fs = require('fs');
const path = require('path');

// Target your exams config directory
const directoryPath = path.join(__dirname, 'src', 'config', 'exams');

// Fallback in case they are directly in config
// const directoryPath = path.join(__dirname, 'src', 'config'); 

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'formats.ts') {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // 1. Check if the file already has stampRequired at the top level to avoid double-injections
            if (content.includes('stampRequired: true,') || content.includes('stampRequired: false,')) {
                return;
            }

            // 2. Look for legacy stamp rules hidden inside the rules: {} object
            const hasLegacyStamp = /stampRequired:\s*['"]?(Yes|true)['"]?/i.test(content) ||
                /nameAndDateStampRequired:\s*['"]?(Yes|true)['"]?/i.test(content);

            // 3. Inject the strict boolean into the document object (right before the rules object or at the end of the doc properties)
            // We will inject it right after maxKb just to keep the schema organized
            if (hasLegacyStamp) {
                content = content.replace(/(maxKb:\s*\d+,)/g, '$1\n    stampRequired: true,');

                // Optional: clean up the old rule so we don't have duplicate data
                content = content.replace(/stampRequired:\s*['"]?(Yes|true|false)['"]?,?/gi, '');
                content = content.replace(/nameAndDateStampRequired:\s*['"]?(Yes|true|false)['"]?,?/gi, '');
            } else {
                content = content.replace(/(maxKb:\s*\d+,)/g, '$1\n    stampRequired: false,');
            }

            // Clean up any empty rules objects left behind
            content = content.replace(/rules:\s*{\s*},?/g, '');

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Migrated: ${file} -> stampRequired: ${hasLegacyStamp}`);
        }
    });
});