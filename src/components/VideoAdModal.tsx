import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Volume2, VolumeX, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface VideoAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdCompleted: () => void;
}

const MOCK_VIDEO_ADS = [
  {
    id: 'shopee',
    title: 'Shopee Mega Elektronik Sale 🚀',
    desc: 'Dapatkan diskon gila-gilaan s.d 90% + Gratis Ongkir Rp0 seluruh Indonesia. Klik untuk buka!',
    sponsor: 'Shopee Indonesia',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ctaText: 'Buka Shopee App',
    ctaUrl: 'https://shopee.co.id',
    logo: '🧡',
    duration: 15,
  },
  {
    id: 'lazada',
    title: 'Lazada Double Video Mega Sale ⚡',
    desc: 'Tonton 2 video promo spesial gajian akhir bulan dengan voucher gratis ongkir tanpa minimum belanja!',
    sponsor: 'Lazada Indonesia',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    ctaText: 'Belanja Sekarang',
    ctaUrl: 'https://lazada.co.id',
    logo: '💙',
    duration: 75,
  },
  {
    id: 'mlbb',
    title: 'Mobile Legends: Skin Epic Gratis & Diamond Cashback! 🎮',
    sponsor: 'Moonton Games',
    desc: 'Mainkan event terbatas hari ini dan menangkan skin gratis favoritmu sekarang!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    ctaText: 'Main MLBB Sekarang',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.mobile.legends',
    logo: '👑',
    duration: 15,
  },
  {
    id: 'coc',
    title: 'Clash of Clans: Balikkan Kejayaan Town Hall 16! 🏰',
    sponsor: 'Supercell',
    desc: 'Bangun pertahanan terkuat, latih pasukan naga, dan hancurkan base lawan dalam Clan Wars!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    ctaText: 'Update Clash of Clans',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.supercell.clashofclans',
    logo: '🛡️',
    duration: 15,
  },
  {
    id: 'ff',
    title: 'Free Fire: Booyah Adrenaline Rush! 🔥',
    sponsor: 'Garena Free Fire',
    desc: 'Turun ke medan tempur, bertahan dari 49 pemain lain, jadilah yang terakhir berdiri untuk BOOYAH!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    ctaText: 'Main FF Sekarang',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.dts.freefireth',
    logo: '🔫',
    duration: 15,
  },
  {
    id: 'hok',
    title: 'Honor of Kings: Game MOBA No. 1 di Dunia! ⚔️',
    sponsor: 'Level Infinite',
    desc: 'Nikmati pertempuran tim 5v5 yang adil, grafis ultra HD, dan puluhan hero legendaris gratis!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    ctaText: 'Download HOK Sekarang',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.levelinfinite.sgameGlobal',
    logo: '⚜️',
    duration: 15,
  },
  {
    id: 'tiktok',
    title: 'TikTok: Temukan Kreativitas Tanpa Batas! 📱',
    sponsor: 'TikTok Inc.',
    desc: 'Tonton jutaan video kreatif, tren terbaru, dan musik viral langsung dari ponsel pintar Anda.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    ctaText: 'Buka TikTok',
    ctaUrl: 'https://tiktok.com',
    logo: '🖤',
    duration: 15,
  },
  {
    id: 'pubg',
    title: 'PUBG Mobile: Pertempuran Battle Royale Terbaik! 🪂',
    sponsor: 'Tencent Games',
    desc: 'Tembak, bertahan hidup, dan kuasai medan perang 100 pemain di peta klasik Erangel!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    ctaText: 'Mainkan PUBG Mobile',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.tencent.ig',
    logo: '🍳',
    duration: 15,
  },
  {
    id: 'trending_apk',
    title: 'ApkCreator: Aplikasi Pembuat APK Trending! 📈',
    sponsor: 'APK Trending Studio',
    desc: 'Buat aplikasi Android-mu sendiri tanpa coding dan jadilah viral di Play Store hari ini!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ctaText: 'Coba ApkCreator Gratis',
    ctaUrl: 'https://play.google.com/store',
    logo: '⚙️',
    duration: 15,
  },
  {
    id: 'terabox',
    title: 'TeraBox: Penyimpanan Cloud Gratis 1024GB! 📦',
    sponsor: 'Flextech Inc.',
    desc: 'Tonton 2 video promo untuk klaim penyimpanan aman gratis 1TB untuk cadangan semua foto & videomu!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    ctaText: 'Ambil 1024GB Gratis',
    ctaUrl: 'https://www.terabox.com',
    logo: '☁️',
    duration: 75,
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT: Asisten AI Pintar di Saku Anda! 💬',
    sponsor: 'OpenAI',
    desc: 'Tanyakan apa saja, buat tulisan kreatif, terjemahkan bahasa, dan selesaikan tugas instan dengan GPT-4o!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ctaText: 'Coba ChatGPT AI',
    ctaUrl: 'https://chatgpt.com',
    logo: '🤖',
    duration: 15,
  },
  {
    id: 'kimi',
    title: 'Kimi AI: Analisis Dokumen & Chatbot Pintar! 🧪',
    sponsor: 'Moonshot AI',
    desc: 'Unggah file PDF tebal, ringkas dokumen panjang, dan dapatkan jawaban akurat dalam hitungan detik.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    ctaText: 'Gunakan Kimi AI',
    ctaUrl: 'https://kimi.moonshot.cn',
    logo: '✨',
    duration: 15,
  },
  {
    id: 'deepseek',
    title: 'DeepSeek AI: Generasi Baru Model Penalaran Cerdas! 🧠',
    sponsor: 'DeepSeek Inc.',
    desc: 'Teknologi AI open-source revolusioner dengan logika matematika kuat dan coding super asisten.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    ctaText: 'Coba DeepSeek AI',
    ctaUrl: 'https://deepseek.com',
    logo: '🐋',
    duration: 15,
  },
  {
    id: 'dola',
    title: 'Dola AI: Kelola Jadwal Via Chatbot WhatsApp! 📅',
    sponsor: 'Dola AI Team',
    desc: 'Kirim pesan suara atau teks ke Dola, asisten AI kalender otomatis menjadwalkan semua aktivitasmu!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    ctaText: 'Hubungkan ke WhatsApp',
    ctaUrl: 'https://dola.ai',
    logo: '🦉',
    duration: 15,
  },
  {
    id: 'gemini',
    title: 'Google Gemini: Era Baru Kreativitas AI! 🔮',
    sponsor: 'Google',
    desc: 'Integrasikan semua layanan Google Anda, buat gambar indah, dan kembangkan ide luar biasa bersama Gemini.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    ctaText: 'Mulai dengan Gemini',
    ctaUrl: 'https://gemini.google.com',
    logo: '✦',
    duration: 15,
  },
  {
    id: 'grok',
    title: 'Grok AI: Jawaban Cerdas Real-Time dengan Humor! ⚡',
    sponsor: 'xAI Corporation',
    desc: 'Terintegrasi langsung dengan platform X untuk berita terhangat, jawaban jujur, dan analitik cerdas.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    ctaText: 'Gunakan Grok AI',
    ctaUrl: 'https://x.com/i/grok',
    logo: '𝕏',
    duration: 15,
  },
  {
    id: 'meta_ai',
    title: 'Meta AI: AI Tercanggih di Instagram & WA! 👥',
    sponsor: 'Meta Platforms Inc.',
    desc: 'Buat stiker kustom, ubah teks menjadi foto secara instan, dan diskusikan segala hal di obrolan grup.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    ctaText: 'Coba Meta AI',
    ctaUrl: 'https://meta.ai',
    logo: '♾️',
    duration: 15,
  }
];

export function VideoAdModal({ isOpen, onClose, onAdCompleted }: VideoAdModalProps) {
  const [ad, setAd] = useState(MOCK_VIDEO_ADS[0]);
  const [countdown, setCountdown] = useState(15);
  const [initialDuration, setInitialDuration] = useState(15);
  const [canSkip, setCanSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Pick a random ad
      const randomAd = MOCK_VIDEO_ADS[Math.floor(Math.random() * MOCK_VIDEO_ADS.length)];
      setAd(randomAd);
      const duration = randomAd.duration || 15;
      setCountdown(duration);
      setInitialDuration(duration);
      setCanSkip(false);
      setHasStarted(false);
      setVideoError(false);

      // Play video with small delay
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setHasStarted(true);
          }).catch(err => {
            console.log("Autoplay blocked, waiting for user click.", err);
            // Even if autoplay is blocked, start countdown
            setHasStarted(true);
          });
        } else {
          // If ref is missing, start countdown anyway
          setHasStarted(true);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && hasStarted && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanSkip(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, hasStarted, countdown]);

  if (!isOpen) return null;

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSkip = () => {
    onAdCompleted();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md select-none">
        <motion.div 
          drag={canSkip ? "y" : false}
          dragConstraints={{ top: -800, bottom: 0 }}
          dragElastic={{ top: 0.6, bottom: 0.05 }}
          onDragEnd={(event, info) => {
            if (canSkip && (info.offset.y < -80 || info.velocity.y < -80)) {
              handleSkip();
            }
          }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -300 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col touch-pan-y"
        >
          {/* Header Banner */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                Video Ad
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                Sponsor harian • <span className="text-indigo-400 font-bold">{ad.sponsor}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {canSkip ? (
                <button 
                  onClick={handleSkip}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[11px] font-black px-3.5 py-1.5 rounded-xl transition-all shadow-lg flex items-center gap-1 active:scale-95"
                >
                  Lewati Iklan <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="bg-slate-800 text-slate-300 text-[11px] font-bold px-3.5 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-1.5">
                  Tunggu <span className="text-indigo-400 font-black">{countdown}s</span> untuk lewati
                </div>
              )}
            </div>
          </div>

          {/* Interactive Player Frame */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
            {!videoError ? (
              <video
                ref={videoRef}
                src={ad.videoUrl}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                onError={() => {
                  setVideoError(true);
                  setHasStarted(true);
                }}
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                      setHasStarted(true);
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 flex flex-col items-center justify-center p-6 text-center select-none">
                <div className="text-5xl mb-3.5 animate-bounce">{ad.logo}</div>
                <h5 className="font-extrabold text-white text-sm tracking-wide">{ad.title}</h5>
                <p className="text-xs text-slate-400 mt-1 max-w-[320px] leading-relaxed line-clamp-2">{ad.desc}</p>
                <div className="mt-4 w-40 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, ((initialDuration - countdown) / initialDuration) * 100)}%` }}></div>
                </div>
              </div>
            )}

            {/* Muted toggle floating */}
            {!videoError && (
              <button 
                onClick={handleToggleMute}
                className="absolute bottom-3 left-3 bg-slate-950/80 hover:bg-slate-950 text-white p-2.5 rounded-xl backdrop-blur-md border border-slate-800 transition-all active:scale-90"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            {/* Click to Play Overlay when blocked or paused */}
            {!hasStarted && !videoError && (
              <div 
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 cursor-pointer"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                    setHasStarted(true);
                  }
                }}
              >
                <div className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all scale-105">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="text-xs text-slate-300 font-bold tracking-wide">Klik untuk memutar video iklan</span>
              </div>
            )}
          </div>

          {/* Ad Content & Interactive CTA Card */}
          <div className="p-5 space-y-4 bg-slate-950/80 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xl shadow-md shrink-0 select-none">
                {ad.logo}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-extrabold text-white leading-snug">{ad.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{ad.desc}</p>
              </div>
            </div>

            {/* Premium CTA promotion banner */}
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-[10px] text-indigo-300 font-medium leading-tight">
                  Lelah menonton iklan? Dapatkan **Premium** untuk download instant!
                </span>
              </div>
            </div>

            {/* Direct Action Link button */}
            <a
              href={ad.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <span>{ad.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {canSkip && (
              <div className="text-center text-[10px] text-emerald-400 font-extrabold animate-bounce flex items-center justify-center gap-1 mt-1.5 cursor-ns-resize select-none">
                ▲ Geser / Swipe ke atas untuk menutup iklan ini ▲
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
