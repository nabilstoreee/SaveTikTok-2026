const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/          <\/div>\n          \)}\n          \)}\n        <\/div>/, 
"          </div>\n          )}\n        </div>");
fs.writeFileSync('src/App.tsx', code);
