const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const maintenanceRegex = /  if \(settings\.maintenanceMode && user\?\.email !== "jrnabil570@gmail\.com"\) \{[\s\S]*?    \);\n  \}\n/m;
const match = code.match(maintenanceRegex);

if (match) {
  code = code.replace(match[0], ''); // remove maintenance block
  // Find login block and insert maintenance block AFTER it
  const loginRegex = /  if \(!user\.isLoggedIn\) \{[\s\S]*?    \);\n  \}\n/m;
  const loginMatch = code.match(loginRegex);
  if (loginMatch) {
    code = code.replace(loginMatch[0], loginMatch[0] + '\n' + match[0]);
  }
}

fs.writeFileSync('src/App.tsx', code);
