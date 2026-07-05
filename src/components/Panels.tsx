import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { t, getLang, setLang } from '../lib/i18n';
import { X, Trash2, Download, LogIn, Save, Shield, Info, History, ChevronLeft, ChevronRight, Sun, Moon, Star, User, Zap, Check, Code, Github, Instagram, Youtube, Send, MessageCircle, Music, HelpCircle, AlertCircle, Sparkles, Bell, FileText, CheckCircle2, Globe, Plus, Eye, EyeOff } from 'lucide-react';
import { VideoResultData } from '../types';
import { getHistory, clearHistory, removeHistoryItem } from '../lib/history';
import { SiteSettings } from '../lib/settings';
import { loadUser, ActivityLog } from '../lib/user';

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
    <Modal isOpen={isOpen} onClose={onClose} title={t('Riwayat Download')}>
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


      </div>
    </Modal>
  );
}

export function AdminPanel({ isOpen, onClose, settings, onSave }: { isOpen: boolean; onClose: () => void, settings: SiteSettings, onSave: (s: SiteSettings) => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [form, setForm] = useState(settings);
  const [activeTab, setActiveTab] = useState<'settings' | 'logs'>('settings');
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const currentUser = loadUser();
  const isAuthorizedAdmin = currentUser.isLoggedIn && (
    currentUser.email?.toLowerCase() === 'jrnabil570@gmail.com' ||
    currentUser.email?.toLowerCase() === 'admin@example.com' ||
    currentUser.email?.toLowerCase() === settings.contactEmail?.toLowerCase()
  );

  useEffect(() => {
    if (isLoggedIn && isOpen) {
      const logsRaw = localStorage.getItem('savetik_activity_logs');
      if (logsRaw) {
        try {
          setLogs(JSON.parse(logsRaw));
        } catch (e) {}
      }
    }
  }, [isLoggedIn, isOpen]);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  // Load saved credentials on open
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('savetik_admin_login');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.user && parsed.pass) {
            setUser(parsed.user);
            setPass(parsed.pass);
            // Auto-login if password matches current settings password
            if (parsed.user === 'admin' && parsed.pass === (settings.adminPassword || 'admin')) {
              setIsLoggedIn(true);
            }
          }
        } catch (e) {}
      }
    }
  }, [isOpen, settings.adminPassword]);

  const handleLogin = () => {
    if (user === 'admin' && pass === (settings.adminPassword || 'admin')) {
      setIsLoggedIn(true);
      if (rememberMe) {
        localStorage.setItem('savetik_admin_login', JSON.stringify({ user, pass }));
      } else {
        localStorage.removeItem('savetik_admin_login');
      }
    } else {
      alert('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPass('');
    localStorage.removeItem('savetik_admin_login');
  };

  const handleSave = () => {
    onSave(form);
    // If the admin password was changed, update our saved login too if rememberMe was active
    if (rememberMe && user === 'admin') {
      localStorage.setItem('savetik_admin_login', JSON.stringify({ user, pass: form.adminPassword }));
    }
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
            <div className="relative">
              <input 
                type={showPass ? "text" : "password"} 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleLogin()} 
                className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={e => setRememberMe(e.target.checked)} 
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Simpan Login (Jangan Tanya Lagi)</span>
          </label>

          <button onClick={handleLogin} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2">
            <LogIn className="w-4 h-4" /> Login
          </button>
        </div>
      ) : (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 pb-2 scrollbar-none">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                Pengaturan
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('logs')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'logs' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                Log Aktivitas
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20"
            >
              Keluar Admin
            </button>
          </div>

          {activeTab === 'settings' ? (
            <div className="space-y-4">
              <div className="pt-2">
                <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Pengaturan Umum & Platform</h4>
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
            <h4 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-widest">Daftar API</h4>
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
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
            <h4 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-widest">Penamaan File & Update Aplikasi</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Format Nama File Default</label>
                <input 
                  type="text"
                  value={form.filenameFormat || ''} 
                  onChange={e => setForm({...form, filenameFormat: e.target.value})} 
                  placeholder="[Tanggal]_[Penulis]_[Judul]"
                  className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 font-mono text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Versi Aplikasi</label>
                  <input 
                    type="text"
                    value={form.updateVersion || ''} 
                    onChange={e => setForm({...form, updateVersion: e.target.value})} 
                    placeholder="v2.5.0"
                    className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-200 dark:border-indigo-500/30 cursor-pointer w-full">
                    <input type="checkbox" checked={form.updateNotificationActive !== false} onChange={e => setForm({...form, updateNotificationActive: e.target.checked})} className="w-4 h-4 rounded border-indigo-300 text-indigo-500 focus:ring-indigo-500" />
                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">Aktifkan Banner Update</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Catatan Rilis (Changelog Update)</label>
                <textarea 
                  value={form.updateMessage || ''} 
                  onChange={e => setForm({...form, updateMessage: e.target.value})} 
                  rows={4} 
                  placeholder="Gunakan awalan berikut untuk format daftar otomatis:&#10;+ Tambah fitur baru&#10;- Hapus fitur lama&#10;* Update/perbaikan fitur"
                  className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors font-mono" 
                />
                <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                  Ketik pembaruan di atas. Baris baru yang diawali dengan <strong>+</strong> otomatis menjadi badge <span className="text-emerald-500">TAMBAH</span>, <strong>-</strong> menjadi <span className="text-rose-500">HAPUS</span>, dan <strong>*</strong> menjadi <span className="text-indigo-500">UPDATE</span> pada tampilan user.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 mb-2">
            <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input type="checkbox" checked={form.enableHistory} onChange={e => setForm({...form, enableHistory: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Aktifkan Riwayat Download</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 mb-2">
            <h4 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-widest">Sistem Poin, Premium & Iklan</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Poin Bonus Pendaftaran</label>
                  <input 
                    type="number"
                    value={form.registerPointsReward !== undefined ? form.registerPointsReward : 50} 
                    onChange={e => setForm({...form, registerPointsReward: parseInt(e.target.value) || 0})} 
                    className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Poin Bonus Download</label>
                  <input 
                    type="number"
                    value={form.downloadPointsReward !== undefined ? form.downloadPointsReward : 10} 
                    onChange={e => setForm({...form, downloadPointsReward: parseInt(e.target.value) || 0})} 
                    className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Daftar Produk Toko Poin & Premium</h5>
                  <button
                    type="button"
                    onClick={() => {
                      const newPlan = {
                        id: 'plan_' + Date.now(),
                        days: 1,
                        cost: 100,
                        label: '1 Hari Premium',
                        desc: 'Bebas Iklan + Kecepatan Tinggi'
                      };
                      setForm({
                        ...form,
                        premiumPlans: [...(form.premiumPlans || []), newPlan]
                      });
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Produk
                  </button>
                </div>
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
                  {(!form.premiumPlans || form.premiumPlans.length === 0) ? (
                    <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                      Belum ada produk toko poin. Klik "Tambah Produk" di atas.
                    </div>
                  ) : (
                    form.premiumPlans.map((plan, idx) => (
                      <div key={plan.id || idx} className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-2xl space-y-2 relative">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Produk #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setForm({
                                ...form,
                                premiumPlans: (form.premiumPlans || []).filter(p => p.id !== plan.id)
                              });
                            }}
                            className="p-1 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/15 rounded-lg text-slate-400 transition-colors"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">Nama Produk</label>
                            <input 
                              type="text"
                              value={plan.label} 
                              onChange={e => {
                                const updated = (form.premiumPlans || []).map(p => p.id === plan.id ? { ...p, label: e.target.value } : p);
                                setForm({...form, premiumPlans: updated});
                              }}
                              className="w-full bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                              placeholder="Contoh: 1 Hari Premium"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">Deskripsi</label>
                            <input 
                              type="text"
                              value={plan.desc} 
                              onChange={e => {
                                const updated = (form.premiumPlans || []).map(p => p.id === plan.id ? { ...p, desc: e.target.value } : p);
                                setForm({...form, premiumPlans: updated});
                              }}
                              className="w-full bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                              placeholder="Bebas Iklan + Kecepatan Tinggi"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">Durasi (Hari)</label>
                            <input 
                              type="number"
                              value={plan.days} 
                              onChange={e => {
                                const updated = (form.premiumPlans || []).map(p => p.id === plan.id ? { ...p, days: parseInt(e.target.value) || 0 } : p);
                                setForm({...form, premiumPlans: updated});
                              }}
                              className="w-full bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                              placeholder="e.g. 1"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">Harga (Poin)</label>
                            <input 
                              type="number"
                              value={plan.cost} 
                              onChange={e => {
                                const updated = (form.premiumPlans || []).map(p => p.id === plan.id ? { ...p, cost: parseInt(e.target.value) || 0 } : p);
                                setForm({...form, premiumPlans: updated});
                              }}
                              className="w-full bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors" 
                              placeholder="e.g. 100"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-200 dark:border-indigo-500/30 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={form.showAdsForNonPremium !== false} 
                    onChange={e => setForm({...form, showAdsForNonPremium: e.target.checked})} 
                    className="w-5 h-5 rounded border-indigo-300 text-indigo-500 focus:ring-indigo-500" 
                  />
                  <div>
                    <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 block">Tampilkan Iklan Untuk Non-Premium</span>
                    <span className="text-[10px] text-indigo-500/70 block mt-0.5">Iklan banner simulasi akan tampil di bagian atas & bawah jika user belum Premium.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

              <button onClick={handleSave} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4 sticky bottom-0">
                <Save className="w-4 h-4" /> Simpan Semua
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {!isAuthorizedAdmin ? (
                <div className="py-8 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Akses Dibatasi</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                    Log Aktivitas hanya bisa dilihat oleh email admin yang sah (<strong>jrnabil570@gmail.com</strong>). Silakan masuk ke akun Anda dengan email admin terlebih dahulu.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Login Pengguna</h4>
                    {logs.length > 0 && (
                      showClearConfirm ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              localStorage.removeItem('savetik_activity_logs');
                              setLogs([]);
                              setShowClearConfirm(false);
                            }}
                            className="text-[10px] font-extrabold text-white bg-red-600 hover:bg-red-700 px-2.5 py-1.5 rounded-lg transition-all shadow-sm"
                          >
                            Ya, Hapus
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowClearConfirm(false)}
                            className="text-[10px] font-bold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-all bg-white dark:bg-slate-900"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowClearConfirm(true)}
                          className="text-[10px] font-bold text-red-500 hover:text-red-600 hover:bg-red-500/5 px-2.5 py-1.5 rounded-lg border border-red-500/10 transition-all"
                        >
                          Hapus Semua
                        </button>
                      )
                    )}
                  </div>
                  
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
                    {logs.length === 0 ? (
                      <div className="text-center py-12 text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        Belum ada aktivitas login yang tercatat.
                      </div>
                    ) : (
                      logs.map((log, index) => (
                        <div key={index} className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold flex-shrink-0">
                              {log.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{log.username}</div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{log.email}</div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-mono text-[10px] text-amber-500 font-bold">{log.points} pts</div>
                            <div className="text-[9px] text-slate-400 mt-0.5">{log.loginTime}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
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
    <Modal isOpen={isOpen} onClose={onClose} title={t('Beri Kami Rating')}>
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

export function AboutPanel({ isOpen, onClose, settings, user }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Tentang Aplikasi')}>
      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <div className="text-center p-6 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-2xl border border-indigo-500/20">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{settings?.brandTitle || 'SaveTik'}</h3>
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-1">{settings?.brandDesc || 'Fast, Secure & No Watermark'}</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Misi & Pengenalan</h4>
          <p className="text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
            {settings?.infoAboutText || 'Aplikasi download video TikTok & YouTube beresolusi tinggi tanpa watermark. Dirancang dengan fokus pada kecepatan ekstraksi, keamanan privasi, dan kenyamanan pengguna tanpa perlu registrasi atau instalasi tambahan.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <div className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Cepat & Gratis
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Proses langsung dari server tanpa batas kuota.</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <div className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" /> Privasi Aman
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tanpa menyimpan data pribadi atau kredensial.</p>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700/50 pt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Versi Aplikasi: <strong className="text-indigo-500">{settings?.updateVersion || 'v2.5.0'}</strong></span>
          <span>© {new Date().getFullYear()} {settings?.devName || 'Nabil Assihidiqi'}</span>
        </div>
      </div>
    </Modal>
  );
}

export function FeedbackPanel({ isOpen, onClose }: any) {
  const [type, setType] = useState<'suggestion' | 'bug'>('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Buka aplikasi email pengguna dengan data yang diisi
    const subject = encodeURIComponent(`[${type === 'bug' ? 'Laporan Bug' : 'Saran Fitur'}] SaveTik`);
    const body = encodeURIComponent(`Kategori: ${type === 'bug' ? 'Laporan Bug' : 'Saran Fitur'}\n\nPesan:\n${message}\n\nEmail Pengirim: ${email || 'Tidak disertakan'}`);
    window.location.href = `mailto:jrnabil570@gmail.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setEmail('');
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Masukan & Lapor Bug')}>
      {submitted ? (
        <div className="py-10 text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Terima Kasih Atas Masukan Anda!</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Laporan Anda telah dicatat oleh sistem kami dan akan ditinjau untuk pengembangan selanjutnya.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-700 dark:text-slate-300">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Kategori Feedback</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('suggestion')}
                className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  type === 'suggestion'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Saran / Ide Fitur
              </button>
              <button
                type="button"
                onClick={() => setType('bug')}
                className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  type === 'bug'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <AlertCircle className="w-4 h-4" /> Laporan Bug / Error
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {type === 'suggestion' ? 'Deskripsikan Ide Fitur Anda:' : 'Jelaskan Kendala atau Error yang Terjadi:'}
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={type === 'suggestion' ? 'Contoh: Tambahkan fitur konversi ke GIF atau batch download...' : 'Contoh: Gagal mengunduh video dari link tertentu saat mengklik tombol...'}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Email / Kontak Anda <span className="text-slate-400 font-normal">(Opsional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nama@email.com (Untuk update balasan)"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
          >
            <Send className="w-4 h-4" /> Kirim Masukan
          </button>
        </form>
      )}
    </Modal>
  );
}

export function UpdateModal({ isOpen, onClose, settings, user }: any) {
  const renderUpdateContent = () => {
    if (!settings?.updateMessage) {
      return (
        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 font-medium text-xs">
          <li><strong>Kartu Profil Kreator:</strong> Menampilkan jumlah pengikut & total like secara akurat.</li>
          <li><strong>Auto-Rename Lanjutan:</strong> Format penamaan file yang sepenuhnya dapat dikustomisasi.</li>
          <li><strong>Halaman Tentang & Masukan:</strong> Pengalaman navigasi yang lebih transparan dan interaktif.</li>
        </ul>
      );
    }

    const lines = settings.updateMessage.split('\n').map((l: string) => l.trim()).filter(Boolean);

    return (
      <div className="space-y-2.5">
        {lines.map((line: string, idx: number) => {
          let type: 'add' | 'remove' | 'update' | 'normal' = 'normal';
          let text = line;

          if (line.startsWith('+') || line.toLowerCase().startsWith('[tambah]') || line.toLowerCase().startsWith('[add]')) {
            type = 'add';
            text = line.replace(/^\+/, '').replace(/^\[tambah\]/i, '').replace(/^\[add\]/i, '').trim();
          } else if (line.startsWith('-') || line.toLowerCase().startsWith('[hapus]') || line.toLowerCase().startsWith('[remove]')) {
            type = 'remove';
            text = line.replace(/^-/, '').replace(/^\[hapus\]/i, '').replace(/^\[remove\]/i, '').trim();
          } else if (line.startsWith('*') || line.startsWith('~') || line.toLowerCase().startsWith('[update]') || line.toLowerCase().startsWith('[perbaikan]') || line.toLowerCase().startsWith('[fix]')) {
            type = 'update';
            text = line.replace(/^[\*~]/, '').replace(/^\[update\]/i, '').replace(/^\[perbaikan\]/i, '').replace(/^\[fix\]/i, '').trim();
          }

          if (type === 'add') {
            return (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 uppercase tracking-wider">TAMBAH</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{text}</span>
              </div>
            );
          }
          if (type === 'remove') {
            return (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0 uppercase tracking-wider">HAPUS</span>
                <span className="font-semibold text-slate-500 dark:text-slate-400 line-through">{text}</span>
              </div>
            );
          }
          if (type === 'update') {
            return (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 uppercase tracking-wider font-extrabold">UPDATE</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{text}</span>
              </div>
            );
          }

          return (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <span className="text-indigo-500 shrink-0 mt-0.5">•</span>
              <span className="font-medium text-slate-600 dark:text-slate-300">{text}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={settings?.updateTitle || "Update Fitur Baru Tersedia!"}>
      <div className="space-y-5 text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-3.5 p-4 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md shadow-indigo-500/20">
            {settings?.updateVersion || 'v2.5.0'}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Versi Terbaru Telah Aktif!</h4>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5 font-medium">Sistem berjalan secara otomatis dengan pembaruan terkini.</p>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">Apa yang Baru di Versi Ini?</h5>
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 space-y-2.5 leading-relaxed">
            {renderUpdateContent()}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Mengerti & Lanjutkan
        </button>
      </div>
    </Modal>
  );
}

export function SidebarMenu({ isOpen, onClose, onOpenHistory, onOpenAdmin, onOpenInfo, onOpenAbout, onOpenFeedback, onOpenUpdate, isDark, setIsDark, onOpenRating, settings, user }: any) {
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
               <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex-1 text-center pr-10">{t('Pengaturan')}</h2>
            </div>
            
            <div className="p-4 space-y-6">
               <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">{t('Tampilan')}</h3>
                  <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     <button onClick={() => setIsDark(!isDark)} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{t('Mode Gelap')}</span>
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
               <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">{t('Aplikasi')}</h3>
                  <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     {settings?.enableHistory !== false && (
                       <button onClick={() => { onClose(); onOpenHistory(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 group">
                          <div className="flex items-center gap-4">
                             <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400">
                                <History className="w-5 h-5" />
                             </div>
                             <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{t('Riwayat Download')}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                       </button>
                     )}
                     <button onClick={() => { onClose(); onOpenRating(); }} className={`w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group ${settings?.enableHistory === false ? '' : 'border-t border-slate-200 dark:border-white/5'}`}>
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 dark:text-amber-400">
                              <Star className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{t('Beri Kami Rating')}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                     <button onClick={() => { onClose(); onOpenFeedback(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group border-t border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-500 dark:text-purple-400">
                              <MessageCircle className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{t('Masukan & Lapor Bug')}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                     {settings?.updateNotificationActive !== false && (
                       <button onClick={() => { onClose(); onOpenUpdate(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group border-t border-slate-200 dark:border-white/5">
                          <div className="flex items-center gap-4">
                             <div className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                             </div>
                             <div>
                                <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200 block">{t('Status Update')}</span>
                                <span className="text-[11px] text-indigo-500 font-bold">{settings?.updateVersion || 'v2.5.0'} Aktif</span>
                             </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                       </button>
                     )}
                  </div>
               </div>
               {user?.email === "jrnabil570@gmail.com" && (
               <div>
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">{t('Keamanan & Sistem')}</h3>
                 <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     <button onClick={() => { onClose(); onOpenAdmin(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border-b border-slate-200 dark:border-white/5 group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                              <Shield className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{t('Pengaturan Akun (Admin)')}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                 </div>
               </div>
               )}

               <div className="mt-6">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">{t('Tentang')}</h3>
                 <div className="bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col">
                     <button onClick={() => { onClose(); onOpenAbout(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group border-b border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                              <Sparkles className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{t('Tentang Aplikasi')}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                     </button>
                     <button onClick={() => { onClose(); onOpenInfo(); }} className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              <Info className="w-5 h-5" />
                           </div>
                           <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{t('Informasi Pengembang')}</span>
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
