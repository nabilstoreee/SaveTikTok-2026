const fs = require('fs');
let code = fs.readFileSync('src/components/Panels.tsx', 'utf8');

code = code.replace(
  /                          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" \/>\n                       <\/button>\n                     <button onClick=\{\(\) => \{ onClose\(\); onOpenRating\(\); \}\}/,
  "                          <ChevronRight className=\"w-5 h-5 text-slate-400 dark:text-slate-600\" />\n                       </button>\n                     )}\n                     <button onClick={() => { onClose(); onOpenRating(); }}"
);

code = code.replace(
  /                          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" \/>\n                       <\/button>\n                  <\/div>/,
  "                          <ChevronRight className=\"w-5 h-5 text-slate-400 dark:text-slate-600\" />\n                       </button>\n                     )}\n                  </div>"
);

fs.writeFileSync('src/components/Panels.tsx', code);
