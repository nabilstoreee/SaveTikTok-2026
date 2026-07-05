import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Download, LogIn, Save, Shield, Info, History, ChevronLeft, ChevronRight, Sun, Moon, Star, User, Zap, Check, Code, Github, Instagram, Youtube, Send, MessageCircle, Music } from 'lucide-react';
import { VideoResultData } from '../types';
import { getHistory, clearHistory, removeHistoryItem } from '../lib/history';
import { SiteSettings } from '../lib/settings';

// Common Modal Backdrop
function Modal({ isOpen, onClose, title, children }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-[2rem] max-w-md w-full relative shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-indigo-500/20 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 px-2">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HistoryPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [hist, setHist] = useState<VideoResultData[]>([]);

  useEffect(() => {
    if (isOpen) setHist(getHistory());
  }, [isOpen]);

  const handleClear = () => {
    if (confirm('Hapus semua riwayat?')) {
      clearHistory();
      setHist([]);
    }
  };

  const handleRemove = (id: string) => {
    removeHistoryItem(id);
    setHist(getHistory());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Riwayat Download">
      {hist.length > 0 && (
        <button onClick={handleClear} className="mb-4 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors">
          Hapus Semua
        </button>
      )}
      <div className="space-y-3">
        {hist.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">Belum ada riwayat download.</p>
        ) : (
          hist.map(item => (
            <div key={item.id} className="flex gap-3 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-slate-200 dark:bg-[#0b0f19] rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.cover || undefined} alt={item.title} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">{item.title}</p>
                <p className="text-[10px] text-slate-500 mt-1">{item.date}</p>
              </div>
              <div className="flex flex-col gap-2">
                <a href={item.playUrl} download className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-center">
                  <Download className="w-4 h-4 mx-auto" />
                </a>
                <button onClick={() => handleRemove(item.id)} className="p-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-center">
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}

export function InfoPanel({ isOpen, onClose, settings }: { isOpen: boolean; onClose: () => void, settings: SiteSettings }) {
  const features = settings.infoFeatures.split(',').map(s => s.trim()).filter(Boolean);
  const techStack = settings.infoTechStack.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Informasi">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-indigo-500 mx-auto rounded-[1.5rem] shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center mb-4 text-white font-bold text-4xl">
          {settings.infoProfileName.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{settings.infoProfileName}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{settings.infoProfileRole}</p>
      </div>
      
      <div className="space-y-8">
        {/* TENTANG WEBSITE */}
        <div>
          <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
            Tentang Website
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </h4>
          
          <div className="bg-slate-50 dark:bg-[#121212] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-200 dark:bg-[#1e1e1e] flex items-center justify-center rounded-xl flex-shrink-0 text-indigo-500">
               <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">{settings.brandTitle}</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{settings.infoAboutText}</p>
            </div>
          </div>
          
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-slate-700 dark:text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DEVELOPER */}
        <div>
          <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
            Developer
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </h4>
          
          <div className="bg-slate-50 dark:bg-[#121212] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-200 dark:bg-[#1e1e1e] flex items-center justify-center rounded-xl flex-shrink-0 text-blue-500">
               <User className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">{settings.infoDevName}</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{settings.infoDevDesc}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
             {settings.infoSocialGithub && (
                <a href={settings.infoSocialGithub} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                   <Github className="w-4 h-4" />
                </a>
             )}
             {settings.infoSocialTelegram && (
                <a href={settings.infoSocialTelegram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-colors">
                   <Send className="w-4 h-4" />
                </a>
             )}
             {settings.infoSocialInstagram && (
                <a href={settings.infoSocialInstagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-pink-500 hover:text-white transition-colors">
                   <Instagram className="w-4 h-4" />
                </a>
             )}
             {settings.infoSocialYoutube && (
                <a href={settings.infoSocialYoutube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-colors">
                   <Youtube className="w-4 h-4" />
                </a>
             )}
             {settings.infoSocialWhatsapp && (
                <a href={settings.infoSocialWhatsapp} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-green-500 hover:text-white transition-colors">
                   <MessageCircle className="w-4 h-4" />
                </a>
             )}
             {settings.infoSocialTiktok && (
                <a href={settings.infoSocialTiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-black hover:border-black hover:text-white transition-colors dark:hover:bg-white dark:hover:text-black">
                   <Music className="w-4 h-4" />
                </a>
             )}
          </div>
        </div>

        {/* TEKNOLOGI */}
        {techStack.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              Teknologi
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium">
                  <Code className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {settings.faqs && settings.faqs.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              FAQ (Pertanyaan Umum)
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            </h4>
            <div className="space-y-3">
              {settings.faqs.map(faq => (
                <div key={faq.id} className="bg-slate-50 dark:bg-[#121212] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-left">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">Q:</span> {faq.question}
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2 ml-[1.125rem]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export function AdminPanel({ isOpen, onClose, settings, onSave }: { isOpen: boolean; onClose: () => void, settings: SiteSettings, onSave: (s: SiteSettings) => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const [form, setForm] = useState(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleLogin = () => {
    if (user === 'admin' && pass === (settings.adminPassword || 'admin')) {
      setIsLoggedIn(true);
    } else {
      alert('Username atau Password salah!');
    }
  };

  const handleSave = () => {
    onSave(form);
    alert('Pengaturan disimpan!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isLoggedIn ? "Admin Settings" : "Login Admin"}>
      {!isLoggedIn ? (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Username</label>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <button onClick={handleLogin} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2">
            <LogIn className="w-4 h-4" /> Login
          </button>
        </div>
      ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 pb-2 scrollbar-none">
          <div className="pt-2">
            <h4 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-widest">Pengaturan Umum & Platform</h4>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Nama Website (TikTok)</label>
            <input type="text" value={form.brandTitle} onChange={e => setForm({...form, brandTitle: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Deskripsi Website (TikTok)</label>
            <input type="text" value={form.brandDesc} onChange={e => setForm({...form, brandDesc: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Placeholder Input (TikTok)</label>
            <input type="text" value={form.tiktokPlaceholder} onChange={e => setForm({...form, tiktokPlaceholder: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          
          <div className="mt-4 mb-2">
             <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-4"></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Nama Website (YouTube)</label>
            <input type="text" value={form.youtubeBrandTitle} onChange={e => setForm({...form, youtubeBrandTitle: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Deskripsi Website (YouTube)</label>
            <input type="text" value={form.youtubeBrandDesc} onChange={e => setForm({...form, youtubeBrandDesc: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Placeholder Input (YouTube)</label>
            <input type="text" value={form.youtubePlaceholder} onChange={e => setForm({...form, youtubePlaceholder: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>

          <div className="mt-4 mb-2">
             <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-4"></div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Nama Developer</label>
            <input type="text" value={form.devName} onChange={e => setForm({...form, devName: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Email Kontak</label>
            <input type="email" value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Pengumuman (Banner)</label>
            <input type="text" value={form.announcement} onChange={e => setForm({...form, announcement: e.target.value})} placeholder="Kosongkan jika tidak ada" className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Teks Footer</label>
            <input type="text" value={form.footerText} onChange={e => setForm({...form, footerText: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Teks Badge Video (Contoh: TikTok)</label>
            <input type="text" value={form.videoBadgeText} onChange={e => setForm({...form, videoBadgeText: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Kata Kunci SEO</label>
            <textarea value={form.seoKeywords} onChange={e => setForm({...form, seoKeywords: e.target.value})} rows={3} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
            <h4 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-widest">Pengaturan Info Panel</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Nama Profil (Header)</label>
                <input type="text" value={form.infoProfileName} onChange={e => setForm({...form, infoProfileName: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Peran Profil (Contoh: Full-Stack Developer)</label>
                <input type="text" value={form.infoProfileRole} onChange={e => setForm({...form, infoProfileRole: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Deskripsi Website di Info</label>
                <textarea value={form.infoAboutText} onChange={e => setForm({...form, infoAboutText: e.target.value})} rows={3} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Fitur Website (Pisahkan dengan koma)</label>
                <input type="text" value={form.infoFeatures} onChange={e => setForm({...form, infoFeatures: e.target.value})} placeholder="No Watermark, HD Quality, Gratis" className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Nama Developer (Kartu)</label>
                <input type="text" value={form.infoDevName} onChange={e => setForm({...form, infoDevName: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Deskripsi Developer</label>
                <textarea value={form.infoDevDesc} onChange={e => setForm({...form, infoDevDesc: e.target.value})} rows={3} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Link GitHub</label>
                   <input type="text" value={form.infoSocialGithub} onChange={e => setForm({...form, infoSocialGithub: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Link Telegram</label>
                   <input type="text" value={form.infoSocialTelegram} onChange={e => setForm({...form, infoSocialTelegram: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Link Instagram</label>
                   <input type="text" value={form.infoSocialInstagram} onChange={e => setForm({...form, infoSocialInstagram: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Link YouTube</label>
                   <input type="text" value={form.infoSocialYoutube} onChange={e => setForm({...form, infoSocialYoutube: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Link WhatsApp</label>
                   <input type="text" value={form.infoSocialWhatsapp} onChange={e => setForm({...form, infoSocialWhatsapp: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Link TikTok</label>
                   <input type="text" value={form.infoSocialTiktok} onChange={e => setForm({...form, infoSocialTiktok: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Teknologi (Pisahkan dengan koma)</label>
                <input type="text" value={form.infoTechStack} onChange={e => setForm({...form, infoTechStack: e.target.value})} placeholder="HTML5, Tailwind CSS" className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 mb-2">
            <h4 className="text-xs font-bold text-red-500 mb-4 uppercase tracking-widest">Sistem & Pemeliharaan</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Password Admin</label>
                <input type="text" value={form.adminPassword || ''} onChange={e => setForm({...form, adminPassword: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none transition-colors" />
                <p className="text-[10px] text-slate-500 mt-1">Username login adalah "admin"</p>
              </div>

              <label className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/30 cursor-pointer">
                <input type="checkbox" checked={form.maintenanceMode} onChange={e => setForm({...form, maintenanceMode: e.target.checked})} className="w-5 h-5 rounded border-red-300 text-red-500 focus:ring-red-500" />
                <span className="text-sm font-semibold text-red-700 dark:text-red-400">Aktifkan Maintenance Mode</span>
              </label>

              {form.maintenanceMode && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Judul Maintenance</label>
                  <input type="text" value={form.maintenanceTitle || 'Maintenance'} onChange={e => setForm({...form, maintenanceTitle: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none transition-colors mb-3" />
                  
                  <div className="mb-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Durasi Perbaikan Berjalan</label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <div className="relative">
                          <input 
                            type="number" 
                            min="0"
                            value={(() => {
                              if (!form.maintenanceEndTime) return '';
                              const remainingMins = Math.max(0, Math.ceil((form.maintenanceEndTime - Date.now()) / 60000));
                              return Math.floor(remainingMins / 60) || '';
                            })()} 
                            onChange={e => {
                              const hours = parseInt(e.target.value) || 0;
                              let mins = 0;
                              if (form.maintenanceEndTime) {
                                const remainingMins = Math.max(0, Math.ceil((form.maintenanceEndTime - Date.now()) / 60000));
                                mins = remainingMins % 60;
                              }
                              const totalMins = (hours * 60) + mins;
                              setForm({...form, maintenanceEndTime: totalMins > 0 ? Date.now() + totalMins * 60000 : undefined});
                            }}
                            placeholder="0"
                            className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-10 py-2 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none transition-colors" 
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">Jam</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="relative">
                          <input 
                            type="number" 
                            min="0"
                            value={(() => {
                              if (!form.maintenanceEndTime) return '';
                              const remainingMins = Math.max(0, Math.ceil((form.maintenanceEndTime - Date.now()) / 60000));
                              return remainingMins % 60 || '';
                            })()} 
                            onChange={e => {
                              const mins = parseInt(e.target.value) || 0;
                              let hours = 0;
                              if (form.maintenanceEndTime) {
                                const remainingMins = Math.max(0, Math.ceil((form.maintenanceEndTime - Date.now()) / 60000));
                                hours = Math.floor(remainingMins / 60);
                              }
                              const totalMins = (hours * 60) + mins;
                              setForm({...form, maintenanceEndTime: totalMins > 0 ? Date.now() + totalMins * 60000 : undefined});
                            }}
                            placeholder="0"
                            className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-12 py-2 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none transition-colors" 
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">Menit</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Kosongkan jika tidak ada batas waktu</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Pesan Maintenance</label>
                <textarea value={form.maintenanceMessage} onChange={e => setForm({...form, maintenanceMessage: e.target.value})} rows={2} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none transition-colors" />
              </div>

              <label className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-200 dark:border-amber-500/30 cursor-pointer">
                <input type="checkbox" checked={form.emergencyBannerActive} onChange={e => setForm({...form, emergencyBannerActive: e.target.checked})} className="w-5 h-5 rounded border-amber-300 text-amber-500 focus:ring-amber-500" />
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Tampilkan Banner Darurat</span>
              </label>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Pesan Banner Darurat</label>
                <input type="text" value={form.emergencyBannerMessage} onChange={e => setForm({...form, emergencyBannerMessage: e.target.value})} className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 mb-2">
            <h4 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-widest">Daftar API & FAQ</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Penyedia API TikTok</label>
                <input 
                  type="text"
                  value={form.apiProviders?.tiktok || ''} 
                  onChange={e => setForm({...form, apiProviders: { ...form.apiProviders, tiktok: e.target.value }})} 
                  className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors mb-3" 
                />
                
                <label className="block text-xs font-bold text-slate-500 mb-1">Penyedia API YouTube</label>
                <input 
                  type="text"
                  value={form.apiProviders?.youtube || ''} 
                  onChange={e => setForm({...form, apiProviders: { ...form.apiProviders, youtube: e.target.value }})} 
                  className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Edit Daftar Tanya Jawab - FAQ (JSON)</label>
                <textarea 
                  value={JSON.stringify(form.faqs, null, 2)} 
                  onChange={e => {
                    try {
                      setForm({...form, faqs: JSON.parse(e.target.value)});
                    } catch(err) {} 
                  }} 
                  rows={6} 
                  className="w-full font-mono text-xs bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 mb-2">
          <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
            <input type="checkbox" checked={form.enableHistory} onChange={e => setForm({...form, enableHistory: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Aktifkan Riwayat Download</span>
          </label>
          </div>
          <button onClick={handleSave} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4 sticky bottom-0">
            <Save className="w-4 h-4" /> Simpan Semua
          </button>
        </div>
      )}
    </Modal>
  );
}

export function RatingPanel({ isOpen, onClose }: any) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Beri Kami Rating">
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-emerald-500 fill-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Terima Kasih!</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Rating Anda sangat membantu kami untuk berkembang.</p>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">Bagaimana pengalaman Anda menggunakan aplikasi ini?</p>
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-slate-200 dark:text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all"
          >
            Kirim Rating
          </button>
        </div>
      )}
    </Modal>
  );
}

export function SidebarMenu({ isOpen, onClose, onOpenHistory, onOpenAdmin, onOpenInfo, isDark, setIsDark, onOpenRating, settings }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[400px] bg-white dark:bg-[#0a0a0a] border-l border-slate-200 dark:border-white/10 flex flex-col overflow-y-auto"
          >
            <div className="flex items-center p-4 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-10">
               <button onClick={onClose} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10">
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex-1 text-center pr-10">Pengaturan</h2>
            </div>
            
            <div className="p-4 space-y-6">
               <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Tampilan</h3>
                  <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     <button onClick={() => setIsDark(!isDark)} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">Mode Gelap</span>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${isDark ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                           <motion.div 
                             layout 
                             className={`w-4 h-4 bg-white rounded-full absolute top-1 ${isDark ? 'right-1' : 'left-1'}`} 
                           />
                        </div>
                     </button>
                  </div>
               </div>

               <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Aplikasi</h3>
                  <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     {settings?.enableHistory !== false && (
                       <button onClick={() => { onClose(); onOpenHistory(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 group">
                          <div className="flex items-center gap-4">
                             <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400">
                                <History className="w-5 h-5" />
                             </div>
                             <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">Riwayat Download</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                       </button>
                     )}
                     <button onClick={() => { onClose(); onOpenRating(); }} className={`w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group ${settings?.enableHistory === false ? '' : 'border-t border-slate-200 dark:border-white/5'}`}>
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 dark:text-amber-400">
                              <Star className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">Beri Kami Rating</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                  </div>
               </div>

               <div>
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Keamanan & Sistem</h3>
                 <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     <button onClick={() => { onClose(); onOpenAdmin(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                              <Shield className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">Pengaturan Akun (Admin)</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                 </div>
               </div>

               <div>
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Tentang</h3>
                 <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     <button onClick={() => { onClose(); onOpenInfo(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              <Info className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">Informasi Pengembang</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                 </div>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
