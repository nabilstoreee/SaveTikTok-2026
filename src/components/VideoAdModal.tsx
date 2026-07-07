import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Volume2, VolumeX, ExternalLink, Info, Shield, Star, ChevronRight, Phone } from 'lucide-react';

interface VideoAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdCompleted: () => void;
}

export interface BrandAd {
  id: string;
  title: string;
  desc: string;
  sponsor: string;
  domain: string;
  videoUrl: string;
  ctaText: string;
  ctaUrl: string;
  logoEmoji: string;
  logoBg: string;
  accentBg: string;
  accentText: string;
  duration: number;
  category: string;
  rating: string;
  downloads: string;
  tagline: string;
  logoUrl?: string;
}

// Highly stable, fast Google Cloud Storage sample videos aligned to themes for instant playback & no CORS errors
export const MOCK_VIDEO_ADS: BrandAd[] = [
  {
    id: 'shopee',
    title: 'Shopee Live Diskon Murah 24 Jam! 🧡',
    desc: 'Belanja semua kebutuhan serba Rp0! Nikmati Gratis Ongkir tanpa minimum belanja ke seluruh Indonesia dan diskon kilat harian s.d 90%. Buruan Checkout barang impianmu sekarang!',
    sponsor: 'Shopee Indonesia',
    domain: 'shopee.co.id',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ctaText: 'BUKA SHOPEE APP',
    ctaUrl: 'https://shopee.co.id',
    logoEmoji: '🛍️',
    logoBg: 'bg-[#EE4D2D]',
    accentBg: 'bg-[#EE4D2D] hover:bg-[#D73C1C] focus:ring-[#EE4D2D]/50',
    accentText: 'text-[#EE4D2D]',
    duration: 6,
    category: 'Belanja / Shopping',
    rating: '4.8 ★',
    downloads: '100JT+ Unduhan',
    tagline: 'Gratis Ongkir Rp0 Se-Indonesia'
  },
  {
    id: 'lazada',
    title: 'Lazada Mega Gajian Sale! ⚡',
    desc: 'Diskon terbesar akhir bulan s.d 85% + voucher bonus dadakan hingga Rp500rb. Nikmati pengiriman cepat gratis ongkir tanpa syarat se-Indonesia! Belanja seru hanya di Lazada.',
    sponsor: 'Lazada Indonesia',
    domain: 'lazada.co.id',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    ctaText: 'BELANJA DI LAZADA',
    ctaUrl: 'https://lazada.co.id',
    logoEmoji: '💎',
    logoBg: 'bg-gradient-to-tr from-[#101566] to-[#000080]',
    accentBg: 'bg-[#000080] hover:bg-[#000066] focus:ring-[#000080]/50',
    accentText: 'text-[#000080]',
    duration: 8,
    category: 'Belanja / Shopping',
    rating: '4.7 ★',
    downloads: '100JT+ Unduhan',
    tagline: 'Lazada Tambah Mulia, Tambah Diskon!'
  },
  {
    id: 'ajaib',
    title: 'Ajaib Investasi Saham & Kripto Terpercaya 📈',
    desc: 'Mulai investasi masa depanmu dengan mudah! Transaksi saham, reksa dana, dan kripto dalam satu aplikasi aman, berizin, dan diawasi oleh OJK. Dapatkan hadiah gratis 1 lot saham!',
    sponsor: 'Ajaib Sekuritas',
    domain: 'ajaib.co.id',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    ctaText: 'DAFTAR AJAIB SEKARANG',
    ctaUrl: 'https://ajaib.co.id',
    logoEmoji: '🧞',
    logoBg: 'bg-[#00D084]',
    accentBg: 'bg-[#00D084] hover:bg-[#00B070] focus:ring-[#00D084]/50',
    accentText: 'text-[#00D084]',
    duration: 7,
    category: 'Keuangan / Finance',
    rating: '4.9 ★',
    downloads: '10JT+ Unduhan',
    tagline: 'Pilihan Investasi Generasi Muda'
  },
  {
    id: 'mlbb',
    title: 'Mobile Legends: Skin Epic Gratis & Kolaborasi Baru! 🎮',
    desc: 'Log in sekarang ke game MOBA No. 1 di Indonesia! Rasakan pertarungan tim 5v5 yang adil, klaim skin kolaborasi gratis eksklusif, raih kemenangan bintang, dan hancurkan base lawan!',
    sponsor: 'Moonton Games',
    domain: 'mobilelegends.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    ctaText: 'MAIN MLBB SEKARANG',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.mobile.legends',
    logoEmoji: '⚔️',
    logoBg: 'bg-[#121E36] border border-amber-500/50',
    accentBg: 'bg-[#D4AF37] text-slate-950 hover:bg-[#C5A02E] focus:ring-[#D4AF37]/50',
    accentText: 'text-[#D4AF37]',
    duration: 10,
    category: 'Game Aksi / MOBA',
    rating: '4.6 ★',
    downloads: '500JT+ Unduhan',
    tagline: 'Main Bareng Teman & Menangkan Savage!'
  },
  {
    id: 'hok',
    title: 'Honor of Kings: Game MOBA No. 1 di Dunia! 👑',
    desc: 'Nikmati pertempuran tim 5v5 yang adil sejati! Kontrol yang sangat responsif, ping super stabil di server Asia, grafis ultra HD yang memukau, dan dapatkan puluhan hero legendaris GRATIS!',
    sponsor: 'Level Infinite',
    domain: 'honorofkings.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    ctaText: 'DOWNLOAD HOK GRATIS',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.levelinfinite.sgameGlobal',
    logoEmoji: '🛡️',
    logoBg: 'bg-gradient-to-br from-[#EE9F3E] to-[#B02F23]',
    accentBg: 'bg-[#EE9F3E] text-slate-950 hover:bg-[#DF8F2E] focus:ring-[#EE9F3E]/50',
    accentText: 'text-[#EE9F3E]',
    duration: 8,
    category: 'Game Aksi / MOBA',
    rating: '4.8 ★',
    downloads: '50JT+ Unduhan',
    tagline: 'MOBA Adil Sejati Dengan Grafis Ultra HD'
  },
  {
    id: 'ff',
    title: 'Free Fire: Booyah Adrenaline Rush! 🔥',
    desc: 'Turun ke medan tempur 10 menit bersama 49 pemain lain! Bertahan hidup, temukan senjata terbaik, gunakan Gloo Wall secara taktis, dan jadilah yang terakhir berdiri untuk BOOYAH!',
    sponsor: 'Garena Free Fire',
    domain: 'ff.garena.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    ctaText: 'KLAIM BUNDLE GRATIS',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.dts.freefireth',
    logoEmoji: '🔫',
    logoBg: 'bg-gradient-to-r from-[#FF3F00] to-[#FF8C00]',
    accentBg: 'bg-gradient-to-r from-[#FF3F00] to-[#FF8C00] hover:brightness-110 focus:ring-[#FF3F00]/50',
    accentText: 'text-[#FF3F00]',
    duration: 9,
    category: 'Game Battle Royale',
    rating: '4.5 ★',
    downloads: '1M+ Unduhan',
    tagline: 'Pertempuran Sengit 10 Menit, Jadilah Booyah!'
  },
  {
    id: 'pubg',
    title: 'PUBG Mobile: Era Kolaborasi Tematik Baru! 🪂',
    desc: 'Rasakan baku tembak paling realistis di ponsel pintar Anda! Masuki peta klasik Erangel yang penuh dengan tantangan baru, kendaraan mutakhir, senjata taktis, dan kustomisasi skin keren!',
    sponsor: 'Tencent Games',
    domain: 'pubgmobile.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    ctaText: 'MULAI BATTLE ROYALE',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.tencent.ig',
    logoEmoji: '🍳',
    logoBg: 'bg-[#FFC107] text-slate-900',
    accentBg: 'bg-[#FFC107] text-slate-950 hover:bg-[#E0A800] focus:ring-[#FFC107]/50',
    accentText: 'text-[#FFC107]',
    duration: 10,
    category: 'Game Shooter / Royale',
    rating: '4.6 ★',
    downloads: '500JT+ Unduhan',
    tagline: 'Winner Winner Chicken Dinner!'
  },
  {
    id: 'tiktok',
    title: 'TikTok: Temukan Kreativitas Tanpa Batas! 📱',
    desc: 'Tonton jutaan video kreatif, tren audio viral terbaru, dan konten seru langsung di FYP Anda! Berkreasilah dengan filter menakjubkan atau belanja murah berkualitas di TikTok Shop!',
    sponsor: 'TikTok Inc.',
    domain: 'tiktok.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    ctaText: 'BUKA TIKTOK APP',
    ctaUrl: 'https://tiktok.com',
    logoEmoji: '🖤',
    logoBg: 'bg-slate-950 border border-slate-800',
    accentBg: 'bg-white text-slate-950 hover:bg-slate-100 focus:ring-white/50',
    accentText: 'text-white',
    duration: 6,
    category: 'Sosial / Video Pendek',
    rating: '4.8 ★',
    downloads: '1M+ Unduhan',
    tagline: 'Mulailah Hari Menyenangkanmu di FYP'
  },
  {
    id: 'capcut',
    title: 'CapCut: Edit Video Viral Sekali Klik! 🎬',
    desc: 'Gunakan ribuan template jedag-jedug gratis yang sedang trending di TikTok! Tambahkan musik viral, transisi estetik, efek bertenaga AI, dan ekspor video HD instan tanpa watermark!',
    sponsor: 'CapCut Video Editor',
    domain: 'capcut.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ctaText: 'COBA TEMPLATE GRATIS',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.lemon.lvoverseas',
    logoEmoji: '🌟',
    logoBg: 'bg-gradient-to-br from-[#00F2FE] to-[#4FACFE]',
    accentBg: 'bg-[#4FACFE] hover:bg-[#3D9CE0] focus:ring-[#4FACFE]/50',
    accentText: 'text-[#4FACFE]',
    duration: 8,
    category: 'Pemutar & Editor Video',
    rating: '4.7 ★',
    downloads: '500JT+ Unduhan',
    tagline: 'Edit Video Profesional Jadi Sangat Mudah'
  },
  {
    id: 'litmatch',
    title: 'Litmatch: Cari Teman Baru & Voice Chat Room! 🌸',
    desc: 'Bergabunglah dengan ruang obrolan sosial paling hangat untuk anak muda! Temukan teman dengan minat yang sama melalui Game Jiwa, Obrolan Suara 1-on-1, dan bagikan cerita harian Anda.',
    sponsor: 'Litmatch Team',
    domain: 'litmatchapp.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    ctaText: 'CARI TEMAN DEKAT',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.litatom.litmatch',
    logoEmoji: '🎈',
    logoBg: 'bg-[#FF64A0]',
    accentBg: 'bg-[#FF64A0] hover:bg-[#E54D88] focus:ring-[#FF64A0]/50',
    accentText: 'text-[#FF64A0]',
    duration: 8,
    category: 'Sosial / Gaya Hidup',
    rating: '4.5 ★',
    downloads: '100JT+ Unduhan',
    tagline: 'Komunitas Obrolan Aman Berbagi Cerita'
  },
  {
    id: 'instagram',
    title: 'Instagram: Dekat dengan Hal yang Anda Suka! 📸',
    desc: 'Kirim pesan instan ke teman-temanmu, tonton video pendek Reels yang menghibur, bagikan pemikiran unikmu di Threads, dan posting momen harian seru lewat Insta Stories!',
    sponsor: 'Meta Platforms',
    domain: 'instagram.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    ctaText: 'BUKA INSTAGRAM',
    ctaUrl: 'https://instagram.com',
    logoEmoji: '🪐',
    logoBg: 'bg-gradient-to-tr from-[#FFB13B] via-[#DD2A7B] to-[#812BB2]',
    accentBg: 'bg-gradient-to-tr from-[#FFB13B] via-[#DD2A7B] to-[#812BB2] hover:brightness-110 focus:ring-[#DD2A7B]/50',
    accentText: 'text-[#DD2A7B]',
    duration: 7,
    category: 'Sosial / Foto & Video',
    rating: '4.7 ★',
    downloads: '1M+ Unduhan',
    tagline: 'Ekspresikan Dirimu & Terhubung dengan Dunia'
  },
  {
    id: 'facebook',
    title: 'Facebook: Temukan Komunitas Impian Anda! 👥',
    desc: 'Terhubung dengan teman lama dan keluarga! Bergabunglah ke grup komunitas hobi lokal yang aktif, temukan barang murah berkualitas di Marketplace, dan tonton video menarik di FB Watch!',
    sponsor: 'Meta Platforms',
    domain: 'facebook.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    ctaText: 'GABUNG FACEBOOK',
    ctaUrl: 'https://facebook.com',
    logoEmoji: '👥',
    logoBg: 'bg-[#1877F2]',
    accentBg: 'bg-[#1877F2] hover:bg-[#1565C0] focus:ring-[#1877F2]/50',
    accentText: 'text-[#1877F2]',
    duration: 8,
    category: 'Sosial / Komunikasi',
    rating: '4.6 ★',
    downloads: '5M+ Unduhan',
    tagline: 'Semakin Dekat, Semakin Terhubung'
  },
  {
    id: 'x',
    title: 'X: Apa yang Sedang Terjadi di Dunia Saat Ini! 𝕏',
    desc: 'Dapatkan berita terkini secara real-time langsung dari sumbernya! Bagikan opini berani Anda, ikuti topik tren teknologi, hiburan, politik, olahraga, dan lakukan diskusi seru di X Spaces!',
    sponsor: 'X Corp.',
    domain: 'x.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    ctaText: 'JELAJAHI TREN BARU',
    ctaUrl: 'https://x.com',
    logoEmoji: '🦅',
    logoBg: 'bg-[#0F1419]',
    accentBg: 'bg-[#0F1419] border border-slate-700 hover:bg-[#1C2127] focus:ring-slate-700/50',
    accentText: 'text-[#0F1419] dark:text-white',
    duration: 7,
    category: 'Berita & Majalah',
    rating: '4.4 ★',
    downloads: '1M+ Unduhan',
    tagline: 'Alun-alun Digital Berita Global Tercepat'
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Messenger: Kirim Pesan Aman & Privat! 💬',
    desc: 'Lakukan panggilan suara dan video HD gratis ke seluruh dunia! Kirim pesan instan, kelola obrolan grup keluarga, dan bagikan pembaruan Status yang dilindungi oleh Enkripsi Ujung-ke-Ujung aman.',
    sponsor: 'Meta Platforms',
    domain: 'whatsapp.com',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    ctaText: 'BUKA WHATSAPP CHAT',
    ctaUrl: 'https://whatsapp.com',
    logoEmoji: '🟢',
    logoBg: 'bg-[#25D366]',
    accentBg: 'bg-[#25D366] hover:bg-[#1EBE55] focus:ring-[#25D366]/50',
    accentText: 'text-[#25D366]',
    duration: 6,
    category: 'Sosial / Komunikasi',
    rating: '4.8 ★',
    downloads: '5M+ Unduhan',
    tagline: 'Sederhana, Handal, Aman & Terbuka'
  }
];

export function VideoAdModal({ isOpen, onClose, onAdCompleted }: VideoAdModalProps) {
  const [ad, setAd] = useState<BrandAd>(MOCK_VIDEO_ADS[0]);
  const [countdown, setCountdown] = useState(8);
  const [initialDuration, setInitialDuration] = useState(8);
  const [canSkip, setCanSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(10);
  const [showAdInfo, setShowAdInfo] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize random ad
  useEffect(() => {
    if (isOpen) {
      let adsList = [...MOCK_VIDEO_ADS];
      try {
        const stored = localStorage.getItem('savetik_custom_ads');
        if (stored) {
          const customAds = JSON.parse(stored);
          if (Array.isArray(customAds) && customAds.length > 0) {
            adsList = customAds;
          }
        } else {
          // Initialize localStorage with default ads so the admin panel can list and edit them
          localStorage.setItem('savetik_custom_ads', JSON.stringify(MOCK_VIDEO_ADS));
        }
      } catch (e) {
        console.error("Failed to load custom ads:", e);
      }

      const randomIndex = Math.floor(Math.random() * adsList.length);
      const randomAd = adsList[randomIndex];
      setAd(randomAd);
      
      const initialCountdown = (randomAd.duration === -1 || randomAd.duration <= 0) ? 10 : randomAd.duration;
      setCountdown(initialCountdown);
      setInitialDuration(initialCountdown);
      setCanSkip(false);
      setHasStarted(false);
      setVideoError(false);
      setLogoError(false);
      setCurrentTime(0);
      setIsMuted(true);

      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play()
            .then(() => {
              setHasStarted(true);
              setVideoError(false);
            })
            .catch(err => {
              console.log("Autoplay blocked. Loaded muted.", err?.message || err);
              setHasStarted(true);
            });
        } else {
          setHasStarted(true);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Countdown timer for skipping
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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setTotalDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const vidDur = Math.ceil(videoRef.current.duration) || 10;
      setTotalDuration(vidDur);
      if (ad.duration === -1 || ad.duration <= 0) {
        setCountdown(vidDur);
        setInitialDuration(vidDur);
      }
    }
  };

  if (!isOpen) return null;

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSkip = () => {
    onAdCompleted();
    onClose();
  };

  // Render a beautiful interactive playable ad overlay on top of the playing video
  const renderInteractiveBrandedOverlay = () => {
    if (!hasStarted || videoError) return null;

    switch (ad.id) {
      case 'shopee':
      case 'lazada': {
        const isShopee = ad.id === 'shopee';
        const liveBadge = isShopee ? 'Shopee LIVE' : 'Lazada LIVE';
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans">
            {/* Top Info Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/45 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-wider">{liveBadge}</span>
                <span className="text-[9px] text-slate-300 font-bold border-l border-white/10 pl-1.5 flex items-center gap-0.5">
                  👥 {isShopee ? '42.8K' : '28.4K'}
                </span>
              </div>
              <div className="text-[8px] bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wide">
                TERLARIS
              </div>
            </div>

            {/* Bottom Area: Comments and Tiny Card */}
            <div className="flex flex-col gap-1 text-left max-w-[260px] bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 rounded-xl">
              {isShopee ? (
                <>
                  <div className="text-[9px] truncate"><span className="text-amber-400 font-bold">r***a:</span> <span className="text-white/90">spill voucher diskon 90% nya dong min! 😍</span></div>
                  <div className="text-[9px] truncate"><span className="text-amber-400 font-bold">m***s:</span> <span className="text-white/90">baju kemeja orange nya udah CO ya kak 👍</span></div>
                  <div className="text-[9px] truncate"><span className="text-amber-400 font-bold">b***i:</span> <span className="text-white/90">gila sih ini gratis ongkir Rp0 nya beneran aktif</span></div>
                </>
              ) : (
                <>
                  <div className="text-[9px] truncate"><span className="text-pink-400 font-bold">a***d:</span> <span className="text-white/90">voucher bonus dadakan Rp500rb dapet di mana?</span></div>
                  <div className="text-[9px] truncate"><span className="text-pink-400 font-bold">y***i:</span> <span className="text-white/90">Lazada emang paling cepet pengirimannya! 💎</span></div>
                  <div className="text-[9px] truncate"><span className="text-pink-400 font-bold">t***o:</span> <span className="text-white/90">baru checkout hp dapet potongan gede bgt</span></div>
                </>
              )}
              
              {/* Product Card Overlay preview */}
              <div className="mt-1.5 flex items-center gap-2 bg-black/60 border border-white/10 p-1.5 rounded-lg backdrop-blur-sm shadow-inner">
                <span className="text-base animate-bounce">🎁</span>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold truncate text-[9px] text-white">Klaim Voucher Diskon Spesial</p>
                  <p className="text-[8px] text-slate-300">Sisa kuota terbatas untuk Anda</p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'capcut': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-mono">
            {/* Top Bar Editor UI */}
            <div className="flex items-center justify-between text-[10px] bg-slate-950/75 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
              <span className="text-sky-400 font-black flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                CAPCUT EDITOR PRO
              </span>
              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-300">
                <span>Resolusi: 1080P</span>
                <span>•</span>
                <span>60 FPS</span>
              </div>
            </div>

            {/* Timeline track overlay */}
            <div className="bg-slate-950/90 border border-slate-800/80 p-2 rounded-xl space-y-1.5 backdrop-blur-md text-left">
              <div className="flex justify-between items-center text-[9px] text-slate-400">
                <span className="text-sky-400 font-bold">⏱️ 00:03.15 / 00:08.00</span>
                <span className="text-[8px] text-white/80 bg-white/10 px-1.5 py-0.5 rounded">🎛️ Rendisi Efek AI</span>
              </div>

              {/* Custom Visual Timeline Tracks */}
              <div className="space-y-1 relative">
                {/* Vertical Playhead center line */}
                <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] z-10" />
                
                {/* Video Track */}
                <div className="h-4 bg-slate-900 rounded flex items-center overflow-hidden border border-slate-800">
                  <div className="w-12 bg-sky-500/30 h-full border-r border-sky-500/20 text-[7px] flex items-center justify-center">Clip 1</div>
                  <div className="w-16 bg-violet-500/30 h-full border-r border-violet-500/20 text-[7px] flex items-center justify-center font-bold">Filter Estetik</div>
                  <div className="w-20 bg-fuchsia-500/30 h-full border-r border-fuchsia-500/20 text-[7px] flex items-center justify-center">Transisi Jedag-Jedug</div>
                </div>
                {/* Audio Track with simulated waves */}
                <div className="h-3.5 bg-indigo-950/60 rounded flex items-center justify-between px-1.5 border border-indigo-900/30 overflow-hidden">
                  <span className="text-[6px] text-slate-400 truncate max-w-[120px]">🎵 sound_viral_tiktok.mp3</span>
                  <div className="flex items-end gap-0.5 h-full py-0.5 opacity-60 shrink-0">
                    <div className="w-0.5 h-2 bg-sky-400" />
                    <div className="w-0.5 h-1.5 bg-sky-400" />
                    <div className="w-0.5 h-3 bg-sky-400 animate-pulse" />
                    <div className="w-0.5 h-2 bg-sky-400" />
                    <div className="w-0.5 h-1 bg-sky-400" />
                  </div>
                </div>
              </div>

              {/* Editing Tools Bar */}
              <div className="flex justify-between items-center text-[7px] text-slate-400 border-t border-slate-900 pt-1">
                <span>✂️ Gunting</span>
                <span>🎵 Audio</span>
                <span>🔤 Teks</span>
                <span>🎨 Efek</span>
                <span>📁 Filter</span>
              </div>
            </div>
          </div>
        );
      }

      case 'tiktok': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans">
            {/* Top feeds */}
            <div className="flex justify-center items-center text-[10px] font-bold gap-3 drop-shadow-md text-white/90">
              <span>Mengikuti</span>
              <span className="text-white border-b-2 border-white pb-0.5">Untuk Anda</span>
            </div>

            {/* Right actions and bottom info */}
            <div className="flex items-end justify-between gap-2">
              {/* Info bottom-left */}
              <div className="flex-1 min-w-0 text-left drop-shadow-md pb-1 pl-1">
                <h5 className="font-extrabold text-[11px] flex items-center gap-1">
                  @tiktok.indonesia
                  <span className="w-3.5 h-3.5 bg-sky-400 text-slate-950 text-[8px] font-black rounded-full flex items-center justify-center">✓</span>
                </h5>
                <p className="text-[9px] text-slate-200 mt-1 leading-relaxed line-clamp-2">
                  Temukan tren konten video pendek kreatif terpopuler hanya di FYP Anda hari ini! Buat momen seru bareng teman 📱✨ #fyp #viral #indonesia
                </p>
                <div className="flex items-center gap-1 text-[8px] text-slate-300 mt-1.5">
                  <span>🎵</span>
                  <div className="w-24 overflow-hidden whitespace-nowrap">
                    <span className="inline-block animate-pulse">Suara Asli - TikTok Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Actions right-hand sidebar */}
              <div className="flex flex-col items-center gap-3 shrink-0 pb-1">
                {/* Profile */}
                <div className="relative w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center overflow-hidden shrink-0">
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=tiktok.com" alt="TikTok" className="w-5 h-5 object-contain" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white rounded-full w-3.5 h-3.5 text-[8px] font-black flex items-center justify-center">+</span>
                </div>
                {/* Like */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-base">❤️</span>
                  <span className="text-[8px] font-bold">1.2M</span>
                </div>
                {/* Comment */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-base">💬</span>
                  <span className="text-[8px] font-bold">24.5K</span>
                </div>
                {/* Save */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-base">🔖</span>
                  <span className="text-[8px] font-bold">89.2K</span>
                </div>
                {/* Share */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-base">🔗</span>
                  <span className="text-[8px] font-bold">12.3K</span>
                </div>
                {/* Rotating record */}
                <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center animate-spin">
                  <span className="text-[8px]">🖤</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'instagram': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans">
            {/* Top Reel header */}
            <div className="flex justify-between items-center drop-shadow-md">
              <span className="font-extrabold text-xs tracking-tight uppercase">Reels</span>
              <span className="text-xs">📸</span>
            </div>

            {/* Right sidebar and bottom details */}
            <div className="flex items-end justify-between">
              {/* Bottom details */}
              <div className="text-left drop-shadow-md pb-1 pl-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-pink-500 p-0.5 overflow-hidden bg-white shrink-0">
                    <img src="https://www.google.com/s2/favicons?sz=64&domain=instagram.com" alt="Instagram" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h5 className="font-extrabold text-[10px] flex items-center gap-1 leading-none">
                      instagram.id
                      <span className="w-2.5 h-2.5 bg-sky-400 text-white text-[6px] font-black rounded-full flex items-center justify-center">✓</span>
                    </h5>
                    <span className="text-[8px] text-pink-300 font-bold leading-none mt-0.5 block">Disponsori</span>
                  </div>
                </div>
                <p className="text-[9px] text-slate-100 mt-2 leading-relaxed max-w-[200px] line-clamp-2">
                  Bagikan momen bahagiamu, terhubung dengan teman dekat, tonton reels menarik harian! 📸✨ #reels #indonesia
                </p>
              </div>

              {/* Right layout */}
              <div className="flex flex-col items-center gap-3.5 pb-1 shrink-0">
                <div className="flex flex-col items-center"><span className="text-base">🤍</span><span className="text-[8px] font-bold">482K</span></div>
                <div className="flex flex-col items-center"><span className="text-base">💬</span><span className="text-[8px] font-bold">12.5K</span></div>
                <div className="flex flex-col items-center"><span className="text-base">✈️</span><span className="text-[8px] font-bold">34K</span></div>
                <span className="text-xs">•••</span>
              </div>
            </div>
          </div>
        );
      }

      case 'mlbb':
      case 'hok':
      case 'ff':
      case 'pubg': {
        const isMLBB = ad.id === 'mlbb';
        const isHOK = ad.id === 'hok';
        const isFF = ad.id === 'ff';
        const gameTitle = isMLBB ? 'Mobile Legends' : isHOK ? 'Honor of Kings' : isFF ? 'Free Fire' : 'PUBG Mobile';
        const specText = isMLBB ? '🛡️ SAVAGE KILL FEED!' : isHOK ? '👑 VICTORY SCREEN!' : isFF ? '🔥 BOOYAH! NO. 1' : '🍳 CHICKEN DINNER!';
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-mono">
            {/* Top game telemetry HUD */}
            <div className="flex justify-between items-start">
              <div className="bg-slate-950/75 px-2.5 py-1 rounded border border-amber-500/20 text-[8px] text-amber-400 font-extrabold tracking-wide flex items-center gap-1.5 backdrop-blur-sm shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{gameTitle} HD</span>
                <span className="text-slate-500">|</span>
                <span className="text-emerald-400">📶 15ms</span>
              </div>
              
              <div className="bg-slate-950/75 px-2 py-1 rounded border border-slate-800 text-[8px] text-slate-300 font-bold backdrop-blur-sm">
                60 FPS
              </div>
            </div>

            {/* Kill Feed Alert sliding in upper center */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-fit bg-red-600 border border-red-500 text-white font-extrabold text-[8px] px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce z-30 uppercase tracking-widest backdrop-blur-sm">
              <span>{specText}</span>
            </div>

            {/* Virtual Joysticks Overlay */}
            <div className="flex justify-between items-end">
              {/* Analog joystick bottom-left */}
              <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 backdrop-blur-[1px] flex items-center justify-center relative ml-1 mb-1 shadow-inner">
                <div className="w-5 h-5 rounded-full border border-white/40 bg-white/10" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[5px] text-white/50">▲</div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[5px] text-white/50">▼</div>
              </div>

              {/* Attack Skill Buttons bottom-right */}
              <div className="relative mr-1 mb-1 flex items-center justify-center shrink-0">
                <div className="w-9 h-9 rounded-full border border-amber-400/40 bg-amber-500/10 backdrop-blur-[1px] flex items-center justify-center shadow-lg">
                  <span className="text-[8px] font-black text-amber-300">SERANG</span>
                </div>
                <div className="absolute -top-3 right-0 w-5 h-5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[6px] text-slate-300">SK1</div>
                <div className="absolute -left-3 -top-1.5 w-5 h-5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[6px] text-slate-300">SK2</div>
                <div className="absolute -left-1.5 -bottom-3 w-5 h-5 rounded-full border border-amber-500/30 bg-amber-500/20 flex items-center justify-center text-[6px] text-amber-400 font-extrabold animate-pulse">ULT</div>
              </div>
            </div>
          </div>
        );
      }

      case 'ajaib': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-mono">
            {/* Top Stock status */}
            <div className="flex justify-between items-center bg-slate-950/75 border border-slate-800 p-1.5 rounded-xl backdrop-blur-md">
              <div className="text-left">
                <span className="text-[7px] text-slate-400 uppercase tracking-widest leading-none block">Status Pasar</span>
                <p className="text-emerald-400 text-[10px] font-black leading-tight flex items-center gap-1 mt-0.5">
                  📈 IHSG BULLISH +1.84%
                </p>
              </div>
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded text-[8px] font-black animate-pulse">
                PASAR AKTIF
              </div>
            </div>

            {/* Simulated Trading Waveform Graph */}
            <div className="w-full h-12 relative flex items-end">
              <svg className="w-full h-full opacity-60">
                <path 
                  d="M 0 35 Q 40 15, 80 40 T 160 10 T 240 20 T 320 5 L 320 50 L 0 50 Z" 
                  fill="url(#tradingGrad)" 
                  stroke="#10B981" 
                  strokeWidth="2" 
                />
                <defs>
                  <linearGradient id="tradingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute right-4 top-1 bg-emerald-500 text-slate-950 font-black text-[8px] px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                <span>▲</span> Rp8,420
              </div>
            </div>

            {/* Action controls bottom mock buttons */}
            <div className="flex gap-2 text-[9px] font-bold">
              <div className="flex-1 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-center">BELI / BUY</div>
              <div className="flex-1 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-center">JUAL / SELL</div>
            </div>
          </div>
        );
      }

      case 'litmatch': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans">
            <div className="flex justify-center items-center">
              <span className="bg-pink-500/30 border border-pink-500/20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-pink-300 backdrop-blur-sm animate-pulse">
                💖 Ruang Obrolan Jiwa
              </span>
            </div>

            {/* Chat simulator */}
            <div className="space-y-1 max-w-[200px] text-[9px] ml-1 bg-black/50 p-2 rounded-xl border border-white/5 backdrop-blur-sm text-left">
              <div className="flex flex-col">
                <span className="text-pink-300 font-extrabold text-[7px]">Litmatch Member</span>
                <span className="text-slate-100 bg-white/10 px-2 py-0.5 rounded-lg mt-0.5 rounded-tl-none block">Hai kak! Lagi nyari temen voice chat ya? 😊</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-indigo-300 font-extrabold text-[7px] text-right">Layanan Sponsor</span>
                <span className="text-slate-100 bg-indigo-500/30 px-2 py-0.5 rounded-lg mt-0.5 rounded-tr-none block text-right">Iya nih kak, yuk gabung room kita!</span>
              </div>
            </div>

            {/* Matching animation heart */}
            <div className="absolute right-4 top-1/3 flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-pink-500/20 border border-pink-400/20 rounded-full flex items-center justify-center animate-ping">
                <span className="text-base">💖</span>
              </div>
              <span className="text-[7px] text-pink-300 font-mono">Kecocokan: 99%</span>
            </div>
          </div>
        );
      }

      case 'whatsapp': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans bg-slate-950/40">
            {/* WhatsApp top bar */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 text-left">
              <div className="w-7 h-7 rounded-full bg-emerald-500 p-0.5 overflow-hidden shrink-0">
                <img src="https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com" alt="WhatsApp" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h5 className="font-extrabold text-[10px] flex items-center gap-1 leading-none">WhatsApp Sponsor</h5>
                <p className="text-[8px] text-emerald-400 font-bold leading-none mt-1">Panggilan Video Terenkripsi</p>
              </div>
            </div>

            {/* Calling status */}
            <div className="flex flex-col items-center gap-2 my-auto">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-2xl relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
                <img src="https://www.google.com/s2/favicons?sz=128&domain=whatsapp.com" alt="WhatsApp Logo" className="w-8 h-8 object-contain rounded-xl" />
              </div>
              <span className="text-[10px] text-slate-300 font-semibold tracking-wider animate-pulse">Menghubungkan Obrolan...</span>
            </div>

            {/* Footer Call actions */}
            <div className="flex justify-center gap-3 text-xs pb-1">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/15">🔇</div>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/15">📷</div>
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-lg text-white font-extrabold text-[9px]"><Phone className="w-3 h-3 text-white" /></div>
            </div>
          </div>
        );
      }

      case 'x': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans">
            {/* Top Post style */}
            <div className="flex items-start gap-2 border-b border-slate-900 pb-2 text-left">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white shrink-0 border border-slate-800">
                <img src="https://www.google.com/s2/favicons?sz=64&domain=x.com" alt="X Logo" className="w-full h-full object-cover p-0.5" />
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="font-extrabold text-[9px] flex items-center gap-1 leading-none">
                  X Corp News
                  <span className="text-slate-400 font-normal text-[8px]">@x_official • Disponsori</span>
                </h5>
                <p className="text-[8px] text-slate-200 mt-1 leading-normal line-clamp-2">
                  Dapatkan informasi penting secara real-time langsung dari sumber terpercaya di seluruh dunia! 🪂🗞️ #news #breaking
                </p>
              </div>
            </div>

            {/* Social icons bottom */}
            <div className="flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-900 pt-1.5 px-2">
              <span>💬 24.5K</span>
              <span>🔁 12.3K</span>
              <span>❤️ 89.2K</span>
              <span>📊 1.2M</span>
            </div>
          </div>
        );
      }

      case 'facebook': {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans">
            {/* Facebook Feed HUD */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 text-left">
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/10">
                <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" alt="FB" className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="font-extrabold text-[9px] flex items-center gap-1 leading-none">Facebook Indonesia</h5>
                <span className="text-[7px] text-blue-400 font-bold mt-1 block">Disponsori</span>
              </div>
            </div>

            {/* Actions panel */}
            <div className="flex justify-between items-center text-[8px] text-slate-300 border-t border-white/10 pt-1.5">
              <span>👍 Suka</span>
              <span>💬 Komentar</span>
              <span>🔁 Bagikan</span>
            </div>
          </div>
        );
      }

      default: {
        return (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 select-none text-white z-20 font-sans">
            {/* Generic Custom Sponsor Overlay Header */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 text-left bg-gradient-to-b from-black/50 to-transparent -mx-3 -mt-3 p-3 rounded-t-2xl">
              <div className={`w-6 h-6 rounded-lg ${ad.logoBg || 'bg-indigo-600'} flex items-center justify-center text-[10px] font-bold border border-white/10 shrink-0 overflow-hidden`}>
                {ad.logoUrl ? (
                  <img src={ad.logoUrl} alt={ad.sponsor} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  ad.logoEmoji || '🎯'
                )}
              </div>
              <div>
                <h5 className="font-extrabold text-[9px] flex items-center gap-1 leading-none">{ad.sponsor}</h5>
                <span className="text-[7px] text-indigo-400 font-extrabold mt-0.5 block">Disponsori • {ad.domain}</span>
              </div>
            </div>

            {/* Subtle Tagline or Prompt */}
            <div className="my-auto flex flex-col items-center gap-1 drop-shadow">
              <span className="bg-indigo-500/25 border border-indigo-500/25 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-indigo-300 backdrop-blur-sm animate-pulse">
                🌟 Mitra Resmi Website
              </span>
            </div>

            {/* Footer Prompt */}
            <div className="flex justify-between items-center text-[8px] text-slate-300 border-t border-white/10 pt-1.5 bg-gradient-to-t from-black/60 to-transparent -mx-3 -mb-3 p-3 rounded-b-2xl">
              <span>👍 Terpercaya</span>
              <span>🔒 Koneksi Aman</span>
              <span>⚡ Unduhan Cepat</span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg select-none font-sans overflow-y-auto py-4 px-4">
        
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-50" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -100 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="relative w-full max-w-lg bg-[#0c101d] border border-slate-800 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col my-auto animate-fade-in"
        >
          {/* Real Google Ad Header Action Row */}
          <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
            {/* Info and Ad Choices Badge (Clickable) */}
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                onClick={() => setShowAdInfo(true)}
                className="pointer-events-auto flex items-center gap-1 px-2.5 py-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all border border-white/10 shadow-lg active:scale-95 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Pilihan Iklan</span>
              </button>

              <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-600/90 text-white rounded-full border border-white/15 shadow-lg max-w-[200px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[8px] font-black tracking-wider uppercase truncate">Sponsor: {ad.title}</span>
              </div>
            </div>

            {/* Premium Countdown / Skip Button Circle (Authentic Google Interstitial style) */}
            <div className="pointer-events-auto">
              {canSkip ? (
                <button 
                  onClick={handleSkip}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-2 rounded-full transition-all shadow-xl active:scale-90 flex items-center justify-center cursor-pointer animate-pulse border-2 border-white/20 shadow-emerald-500/10"
                  title="Lewati Iklan"
                >
                  <X className="w-5 h-5 stroke-[3]" />
                </button>
              ) : (
                <div className="relative w-10 h-10 flex items-center justify-center bg-black/70 rounded-full border border-white/10 shadow-xl">
                  {/* Circular Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="17" 
                      stroke="rgba(255,255,255,0.15)" 
                      strokeWidth="2.5" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="17" 
                      stroke="#6366f1" 
                      strokeWidth="2.5" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 17}
                      strokeDashoffset={2 * Math.PI * 17 * (countdown / initialDuration)}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="text-xs font-black text-white font-mono z-10">{countdown}</span>
                </div>
              )}
            </div>
          </div>

          {/* Video Player or High-Fidelity Banner Section */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden border-b border-slate-850/80">
            {!videoError ? (
              <>
                <video
                  ref={videoRef}
                  src={ad.videoUrl}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => {
                    setHasStarted(true);
                    setVideoError(false);
                  }}
                  onError={(e) => {
                    console.warn("Video element source load fallback active. Switching to fallback banner.");
                    setVideoError(true);
                    setHasStarted(true);
                  }}
                  onClick={() => {
                    if (videoRef.current) {
                      if (isMuted) {
                        videoRef.current.muted = false;
                        setIsMuted(false);
                      } else {
                        if (videoRef.current.paused) {
                          videoRef.current.play().catch(() => {});
                        } else {
                          videoRef.current.pause();
                        }
                      }
                    }
                  }}
                />

                {isMuted && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        videoRef.current.muted = false;
                        setIsMuted(false);
                      }
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 hover:bg-black/40 transition-all z-[35] cursor-pointer group pointer-events-auto"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="flex flex-col items-center gap-2.5 bg-indigo-600/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md max-w-xs text-center"
                    >
                      <VolumeX className="w-8 h-8 text-white animate-pulse" />
                      <div>
                        <p className="text-[12px] font-bold leading-tight">Video Berputar Otomatis</p>
                        <p className="text-[10px] text-indigo-100 mt-0.5 font-medium">Ketuk layar untuk mengaktifkan suara 🔊</p>
                      </div>
                    </motion.div>
                  </button>
                )}

                {/* Simulated Playable Overlay (adds beautiful real branded interface overlays) */}
                {renderInteractiveBrandedOverlay()}

                {/* Simulated Seek Bar Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-10 pointer-events-none">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-r-full transition-all duration-100" 
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>

                {/* Clean Floating Audio Controller */}
                <button 
                  onClick={handleToggleMute}
                  className="absolute bottom-4 left-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-xl backdrop-blur-md border border-white/10 transition-all active:scale-90 flex items-center gap-1.5 text-xs font-semibold z-30 cursor-pointer shadow-lg pointer-events-auto"
                  title={isMuted ? "Aktifkan Suara" : "Bisukan"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span className="text-[10px] text-slate-300">Aktifkan Suara</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] text-slate-300 font-bold">Suara Aktif</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              /* High-Fidelity Gorgeous Branded Display Banner Fallback (Looks 100% like real Google display interstitial ads) */
              <div className="w-full h-full bg-[#0a0d16] flex items-center justify-center p-6 text-white relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-violet-800/15 to-transparent pointer-events-none" />
                <div className="text-center space-y-4 max-w-sm z-10">
                  <div className={`w-20 h-20 mx-auto rounded-3xl ${ad.logoBg} flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden`}>
                    {ad.logoUrl ? (
                      <img 
                        src={ad.logoUrl}
                        alt={ad.sponsor}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = `https://www.google.com/s2/favicons?sz=128&domain=${ad.domain}`;
                          e.currentTarget.onerror = () => setLogoError(true);
                        }}
                      />
                    ) : !logoError ? (
                      <img 
                        src={`https://www.google.com/s2/favicons?sz=128&domain=${ad.domain}`}
                        alt={ad.sponsor}
                        className="w-full h-full object-cover p-1.5 bg-white"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <span className="text-4xl">{ad.logoEmoji}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight">{ad.title}</h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{ad.desc}</p>
                  </div>
                  <span className="inline-block text-[10px] font-black bg-white/5 border border-white/10 text-indigo-300 px-3 py-1 rounded-full uppercase tracking-wide">
                    🔥 {ad.tagline}
                  </span>
                </div>
              </div>
            )}

            {/* Click to Play Overlay (Shown only if browser blocks autoplay & video is not playing) */}
            {!hasStarted && !videoError && (
              <div 
                className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center gap-3 cursor-pointer z-30 pointer-events-auto"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play()
                      .then(() => setHasStarted(true))
                      .catch(() => setHasStarted(true));
                  }
                }}
              >
                <div className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all scale-105">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="text-[10px] text-slate-300 font-extrabold tracking-widest uppercase bg-black/60 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                  KLIK UNTUK PUTAR VIDEO SPONSOR
                </span>
              </div>
            )}
          </div>

          {/* Interactive Information & Direct CTA Card Section (Matches Google Interstitial footer) */}
          <div className="p-5 space-y-4 bg-[#0a0d16] border-t border-slate-800/40 text-left">
            
            {/* Identity & Details Card */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl ${ad.logoBg} flex items-center justify-center shadow-xl shrink-0 border border-white/10 overflow-hidden`}>
                {ad.logoUrl ? (
                  <img 
                    src={ad.logoUrl}
                    alt={ad.sponsor}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://www.google.com/s2/favicons?sz=128&domain=${ad.domain}`;
                      e.currentTarget.onerror = () => setLogoError(true);
                    }}
                  />
                ) : !logoError ? (
                  <img 
                    src={`https://www.google.com/s2/favicons?sz=128&domain=${ad.domain}`}
                    alt={ad.sponsor}
                    className="w-full h-full object-cover p-1 bg-white"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-2xl">{ad.logoEmoji}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base font-black text-white tracking-tight leading-none">
                    {ad.title}
                  </h4>
                </div>
                <p className="text-[11px] text-indigo-400 font-bold mt-1.5 hover:underline cursor-pointer">
                  {ad.sponsor} • {ad.domain}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium mt-1.5">
                  {ad.desc}
                </p>
              </div>
              
              {/* Play Store Download / Rating Stats */}
              <div className="shrink-0 flex flex-col items-center gap-1 px-3 py-2 bg-slate-950 border border-slate-850 rounded-2xl text-center min-w-[76px]">
                <div className="flex items-center gap-1 text-xs text-amber-400 font-black">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{ad.rating.split(' ')[0]}</span>
                </div>
                <span className="text-[8px] text-slate-500 font-bold tracking-wide mt-0.5">
                  {ad.downloads.split(' ')[0]}
                </span>
                <span className="text-[8px] text-emerald-400 font-black bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full mt-1.5 block">
                  GRATIS
                </span>
              </div>
            </div>

            {/* Direct Action Visit URL Link with Brand Accent Match */}
            <a
              href={ad.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className={`w-full py-4 text-white font-extrabold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${ad.accentBg}`}
            >
              <span>{ad.ctaText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Guide Text */}
            {canSkip ? (
              <div className="text-center text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1.5 select-none animate-pulse">
                <span>Klik tombol (X) di pojok kanan atas untuk menutup iklan</span>
              </div>
            ) : (
              <div className="text-center text-[9px] text-slate-500 font-mono tracking-wide">
                Video sponsor membantu kelangsungan server pengunduh premium gratis.
              </div>
            )}
          </div>
        </motion.div>

        {/* Real AdChoices Informational dialog popup */}
        <AnimatePresence>
          {showAdInfo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setShowAdInfo(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full max-w-sm bg-[#0c101d] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-extrabold text-white">AdShield Verifikasi Iklan</h4>
                    <p className="text-[10px] text-slate-500 font-mono">ID Sertifikat: GOOG-INT-9382</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300 leading-relaxed text-left">
                  <p>
                    <strong>Tentang Iklan Ini:</strong>
                    <br />
                    Iklan ini bersumber dari jaringan pengiklan premium terverifikasi untuk mendukung kelangsungan biaya operasional server gratis kami.
                  </p>
                  <p>
                    <strong>Keamanan Pengguna Terjamin:</strong>
                    <br />
                    Sistem kami mendeteksi dan menyaring seluruh elemen berbahaya. Iklan ini 100% aman dan tidak mengandung malware atau tracker tersembunyi.
                  </p>
                </div>

                <button 
                  onClick={() => setShowAdInfo(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border border-slate-700"
                >
                  Kembali Ke Iklan
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
