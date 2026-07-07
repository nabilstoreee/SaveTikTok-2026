const fs = require('fs');
let code = fs.readFileSync('src/components/Panels.tsx', 'utf8');
code = code.replace(
  /<button onClick=\{\(\) => \{ onClose\(\); onOpenAdmin\(\); \}\} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white\/5 transition-colors border-b border-slate-200 dark:border-white\/5 group">/,
  "{user?.email === 'jrnabil570@gmail.com' && (\n                     <button onClick={() => { onClose(); onOpenAdmin(); }} className=\"w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 group\">"
);
code = code.replace(
  /                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" \/>\n                     <\/button>/,
  "                        <ChevronRight className=\"w-5 h-5 text-slate-400 dark:text-slate-600\" />\n                     </button>\n                     )}"
);
fs.writeFileSync('src/components/Panels.tsx', code);
