const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/\{user\?\.email === 'jrnabil570@gmail\.com' && \(\n          \{user\?\.email === 'jrnabil570@gmail\.com' && \(\n/, "{user?.email === 'jrnabil570@gmail.com' && (\n");
fs.writeFileSync('src/App.tsx', code);
