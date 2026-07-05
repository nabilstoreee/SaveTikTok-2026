const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/      <\/div>\n  }\n  }\n  return \(/, '      </div>\n    );\n  }\n\n  return (');
fs.writeFileSync('src/App.tsx', code);
