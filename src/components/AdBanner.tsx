import { useState, useEffect } from 'react';
import { Sparkles, X, ExternalLink, ShieldAlert } from 'lucide-react';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'inline';
  onUpgradeClick: () => void;
}

const MOCK_ADS = [
  {
    title: '🚀 Poin Kurang? Klaim Premium Instan!',
    desc: 'Bebas iklan, kecepatan download 10x lipat, dan tanpa batas harian sekarang juga.',
    cta: 'Upgrade Premium',
    badge: 'Sponsor',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: '🎮 Main Game Gratis & Menangkan Poin!',
    desc: 'Kumpulkan ribuan poin tambahan dengan menyelesaikan misi harian seru.',
    cta: 'Mulai Main',
    badge: 'Iklan',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: '🔒 Lindungi Koneksi Internet Anda!',
    desc: 'Gunakan VPN sponsor kami untuk unduhan anonim yang super aman dan rahasia.',
    cta: 'Dapatkan VPN',
    badge: 'Sponsor',
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: '⚡ Kecepatan Download Menurun?',
    desc: 'Upgrade ke Premium Member sekarang untuk membuka limit bandwidth server internasional.',
    cta: 'Buka Speed Booster',
    badge: 'Sistem',
    color: 'from-emerald-500 to-teal-600',
  }
];

export function AdBanner({ position, onUpgradeClick }: AdBannerProps) {
  const [adIndex, setAdIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Rotasi iklan setiap 15 detik
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % MOCK_ADS.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const ad = MOCK_ADS[adIndex];

  if (position === 'top') {
    return (
      <div className="w-full mb-6 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-indigo-500/10 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between gap-4 relative overflow-hidden backdrop-blur-md animate-pulse">
        <div className="flex items-center gap-3 min-w-0">
          <span className="bg-slate-200 dark:bg-slate-800 text-[9px] font-black tracking-wider text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded uppercase">
            {ad.badge}
          </span>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{ad.title}</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{ad.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={onUpgradeClick} 
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-white dark:text-indigo-400 text-[10px] font-black rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            {ad.cta} <ExternalLink className="w-2.5 h-2.5" />
          </button>
          <button 
            onClick={() => setVisible(false)} 
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            title="Sembunyikan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  if (position === 'inline') {
    return (
      <div className="my-6 p-5 bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-slate-800/80 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <ShieldAlert className="w-16 h-16" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <span className="bg-indigo-500 text-white text-[8px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase">
              {ad.badge}
            </span>
            <button 
              onClick={() => setVisible(false)} 
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mb-1 leading-snug">
            {ad.title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {ad.desc}
          </p>
          <div className="flex gap-2">
            <button 
              onClick={onUpgradeClick} 
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> {ad.cta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // default bottom bar floating
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-xs bg-slate-900/90 dark:bg-slate-950/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 z-[49] backdrop-blur-md flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="bg-indigo-500 text-[8px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">AD</span>
          <span className="text-[10px] text-slate-400 font-medium">Bebas Iklan via Premium</span>
        </div>
        <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div>
        <h5 className="text-xs font-bold truncate">{ad.title}</h5>
        <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{ad.desc}</p>
      </div>
      <button 
        onClick={onUpgradeClick} 
        className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md shadow-indigo-500/20"
      >
        <Sparkles className="w-3 h-3" /> {ad.cta}
      </button>
    </div>
  );
}
