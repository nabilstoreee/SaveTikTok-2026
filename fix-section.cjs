const fs = require('fs');
let code = fs.readFileSync('src/components/Panels.tsx', 'utf8');

code = code.replace(
  /               <div>\n                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Keamanan & Sistem<\/h3>\n                 <div className="bg-slate-50 dark:bg=\\[#121212\\] border border-slate-200 dark:border-white\/5 rounded-2xl overflow-hidden flex flex-col">\n                     \{user\?\.email === 'jrnabil570@gmail\.com' && \(\n                     <button onClick=\{\(\) => \{ onClose\(\); onOpenAdmin\(\); \}\}/,
  "               {user?.email === 'jrnabil570@gmail.com' && (\n               <div>\n                 <h3 className=\"text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2\">Keamanan & Sistem</h3>\n                 <div className=\"bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col\">\n                     <button onClick={() => { onClose(); onOpenAdmin(); }}"
);

code = code.replace(
  /                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" \/>\n                     <\/button>\n                     \)}\n                 <\/div>\n               <\/div>/,
  "                        <ChevronRight className=\"w-5 h-5 text-slate-400 dark:text-slate-600\" />\n                     </button>\n                 </div>\n               </div>\n               )}"
);

fs.writeFileSync('src/components/Panels.tsx', code);
