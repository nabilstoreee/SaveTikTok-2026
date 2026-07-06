const fs = require('fs');
let code = fs.readFileSync('src/components/UserPanels.tsx', 'utf8');

code = code.replace(/import \{ motion, AnimatePresence \} from 'motion\/react';/, "import { motion, AnimatePresence } from 'motion/react';\nimport { t } from '../lib/i18n';");

const tutorialHtml = `
export function TutorialPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-white/10 rounded-3xl p-6 z-[101] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('Tutorial')}</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              {step === 1 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Copy Link</h3>
                  <p className="text-slate-600 dark:text-slate-400">Salin tautan video dari aplikasi TikTok atau YouTube.</p>
                </div>
              )}
              {step === 2 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Paste Link</h3>
                  <p className="text-slate-600 dark:text-slate-400"><Tempel tautan yang telah disalin ke kolom input di aplikasi ini./p>
                </div>
              )}
              {step === 3 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t('Unduh')}</h3>
                  <p className="text-slate-600 dark:text-slate-400">Klik unduh dan pilih kualitas video yang Anda inginkan.</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
                  {t('Selanjutnya')}
                </button>
              ) : (
                <button onClick={onClose} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors">
                  {t('Selesai')}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
`;

code = code + '\n' + tutorialHtml;
fs.writeFileSync('src/components/UserPanels.tsx', code);
