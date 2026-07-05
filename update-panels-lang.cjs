const fs = require('fs');
let code = fs.readFileSync('src/components/Panels.tsx', 'utf8');

// Add import
code = code.replace(/import \{ motion, AnimatePresence \} from 'motion\/react';/, "import { motion, AnimatePresence } from 'motion/react';\nimport { t, getLang, setLang } from '../lib/i18n';");

// Add language switcher in SidebarMenu
const langHtml = `
               <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">{t('Bahasa')}</h3>
                  <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     <button onClick={() => setLang(getLang() === 'id' ? 'en' : 'id')} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                              <Globe className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{getLang() === 'id' ? 'Indonesia' : 'English'}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                  </div>
               </div>
`;

code = code.replace(/<Globe className="w-5 h-5" \/>/, ""); // in case it's there
code = code.replace(/import \{ X, ChevronRight, Moon, Sun, History, Star, MessageCircle, Bell, Shield, Sparkles, Info, Trash2, Download, ExternalLink, Activity, Users, Settings, Plus, Play, ThumbsUp, TrendingUp \} from 'lucide-react';/, "import { X, ChevronRight, Moon, Sun, History, Star, MessageCircle, Bell, Shield, Sparkles, Info, Trash2, Download, ExternalLink, Activity, Users, Settings, Plus, Play, ThumbsUp, TrendingUp, Globe } from 'lucide-react';");

code = code.replace(/               <div>\n                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Aplikasi<\/h3>/, 
  langHtml + "               <div>\n                  <h3 className=\"text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2\">{t('Aplikasi')}</h3>");

// Replace some texts with t()
code = code.replace(/"Tampilan"/g, "{t('Tampilan')}");
code = code.replace(/"Mode Gelap"/g, "{t('Mode Gelap')}");
code = code.replace(/"Riwayat Download"/g, "{t('Riwayat Download')}");
code = code.replace(/"Beri Kami Rating"/g, "{t('Beri Kami Rating')}");
code = code.replace(/"Masukan & Lapor Bug"/g, "{t('Masukan & Lapor Bug')}");
code = code.replace(/"Status Update"/g, "{t('Status Update')}");
code = code.replace(/"Keamanan & Sistem"/g, "{t('Keamanan & Sistem')}");
code = code.replace(/"Pengaturan Akun \(Admin\)"/g, "{t('Pengaturan Akun (Admin)')}");
code = code.replace(/"Tentang"/g, "{t('Tentang')}");
code = code.replace(/"Tentang Aplikasi"/g, "{t('Tentang Aplikasi')}");
code = code.replace(/"Informasi Pengembang"/g, "{t('Informasi Pengembang')}");
code = code.replace(/"Pengaturan"/g, "{t('Pengaturan')}");

fs.writeFileSync('src/components/Panels.tsx', code);
