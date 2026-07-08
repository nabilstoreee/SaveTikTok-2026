export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PremiumPlan {
  id: string;
  days: number;
  cost: number;
  label: string;
  desc: string;
}

export interface DirectPurchasePlan {
  id: string;
  label: string;
  days: number;
  price: string;
  originalPrice: string;
  discount: string;
  desc: string;
  popular?: boolean;
}

export interface SiteSettings {
  brandTitle: string;
  brandDesc: string;
  devName: string;
  contactEmail: string;
  announcement: string;
  seoKeywords: string;
  footerText: string;
  videoBadgeText: string;
  enableHistory: boolean;
  infoProfileName: string;
  infoProfileRole: string;
  infoAboutText: string;
  infoFeatures: string;
  infoDevName: string;
  infoDevDesc: string;
  infoSocialGithub: string;
  infoSocialTelegram: string;
  infoSocialInstagram: string;
  infoSocialYoutube: string;
  infoSocialWhatsapp: string;
  infoSocialTiktok: string;
  infoTechStack: string;
  youtubeBrandTitle: string;
  youtubeBrandDesc: string;
  tiktokPlaceholder: string;
  youtubePlaceholder: string;
  maintenanceMode: boolean;
  maintenanceTitle: string;
  maintenanceMessage: string;
  maintenanceEndTime?: number;
  emergencyBannerActive: boolean;
  emergencyBannerMessage: string;
  filenameFormat?: string;
  updateNotificationActive?: boolean;
  updateVersion?: string;
  updateTitle?: string;
  updateMessage?: string;
  broadcastAnnouncementActive?: boolean;
  broadcastAnnouncementMessage?: string;
  broadcastAnnouncementId?: string;
  faqs: FAQItem[];
  apiProviders: {
    tiktok: string;
    youtube: string;
  };
  adminPassword?: string;
  registerPointsReward: number;
  downloadPointsReward: number;
  premiumCost0Day: number;
  premiumCost1Day: number;
  premiumCost7Days: number;
  premiumCost30Days: number;
  showAdsForNonPremium: boolean;
  premiumPlans: PremiumPlan[];
  adminQrisUrl?: string;
  adminDanaNumber?: string;
  adminGopayNumber?: string;
  directPlans?: DirectPurchasePlan[];
  rateLimitEnabled: boolean;
  rateLimitMaxRequests: number;
  rateLimitWindowMinutes: number;
  botSpamProtectionEnabled: boolean;
  autoBlockSuspiciousIps: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
  brandTitle: 'SaveTik',
  brandDesc: 'Fast, Secure & No Watermark',
  devName: 'Nabil Assihidiqi',
  contactEmail: 'admin@example.com',
  announcement: '',
  seoKeywords: 'tiktok downloader, youtube downloader, ig downloader',
  footerText: 'Menggunakan API Publik',
  videoBadgeText: 'TikTok',
  enableHistory: true,
  infoProfileName: 'Nabil Assihidiqi',
  infoProfileRole: 'Full-Stack Developer',
  infoAboutText: 'Platform download video TikTok tanpa watermark dengan kualitas HD. Cepat, aman, dan tanpa login.',
  infoFeatures: 'No Watermark, HD Quality, Gratis, Aman',
  infoDevName: 'Nabil Assihidiqi',
  infoDevDesc: 'Pengembang web & mobile application. Fokus pada pengalaman pengguna yang modern dan intuitif.',
  infoSocialGithub: 'https://github.com',
  infoSocialTelegram: 'https://t.me',
  infoSocialInstagram: 'https://instagram.com',
  infoSocialYoutube: 'https://youtube.com',
  infoSocialWhatsapp: 'https://wa.me',
  infoSocialTiktok: 'https://tiktok.com',
  infoTechStack: 'HTML5, Tailwind CSS, JavaScript, API',
  youtubeBrandTitle: 'SaveTube',
  youtubeBrandDesc: 'Download Video YouTube HD',
  tiktokPlaceholder: 'Tempel link tiktok di sini...',
  youtubePlaceholder: 'Tempel link youtube di sini...',
  maintenanceMode: false,
  maintenanceTitle: 'Maintenance',
  maintenanceMessage: 'Mohon maaf, website sedang dalam perbaikan. Kami akan segera kembali.',
  emergencyBannerActive: false,
  emergencyBannerMessage: 'Pengumuman Penting: Server sedang mengalami kendala jaringan.',
  filenameFormat: '[Tanggal]_[Penulis]_[Judul]',
  updateNotificationActive: true,
  updateVersion: 'v2.5.0',
  updateTitle: 'Update Fitur Baru Tersedia!',
  updateMessage: 'Nikmati penamaan file otomatis yang bisa dikustomisasi, statistik kreator di profil, halaman Tentang aplikasi, dan pelaporan masukan/bug secara langsung!',
  broadcastAnnouncementActive: false,
  broadcastAnnouncementMessage: 'Promo Paket Premium Khusus Hari Ini! Dapatkan Premium Permanen hanya dengan 15.000 Poin!',
  broadcastAnnouncementId: 'bc_default_1',
  faqs: [
    { id: '1', question: 'Apakah layanan ini gratis?', answer: 'Ya, layanan 100% gratis tanpa batasan.' },
    { id: '2', question: 'Kenapa video gagal didownload?', answer: 'Pastikan URL valid dan video tidak di-private.' }
  ],
  apiProviders: {
    tiktok: 'siputzx',
    youtube: 'siputzx'
  },
  adminPassword: 'admin',
  registerPointsReward: 50,
  downloadPointsReward: 10,
  premiumCost0Day: 0,
  premiumCost1Day: 100,
  premiumCost7Days: 1000,
  premiumCost30Days: 5000,
  showAdsForNonPremium: true,
  premiumPlans: [
    { id: 'reset', days: 0, cost: 0, label: '0 Hari (Reset/Hapus Premium)', desc: 'Kembali ke Member Biasa (Untuk Test Iklan)' },
    { id: '1day', days: 1, cost: 100, label: '1 Hari Premium', desc: 'Bebas Iklan + Kecepatan Tinggi' },
    { id: '7days', days: 7, cost: 1000, label: '7 Hari Premium', desc: 'Bebas Iklan + Kecepatan Tinggi' },
    { id: '30days', days: 30, cost: 5000, label: '1 Bulan Premium', desc: 'Bebas Iklan + Kecepatan Tinggi' },
    { id: 'permanent', days: -1, cost: 15000, label: 'Premium Permanen', desc: 'Bebas Iklan Selamanya (Permanen)' }
  ],
  adminQrisUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='300' height='300'><rect width='100' height='100' fill='white'/><path d='M10 10h30v30H10zm5 5v20h20V15zm5 5h10v10H20zm40-10h30v30H60zm5 5v20h20V15zm5 5h10v10H70zM10 60h30v30H10zm5 5v20h20V65zm5 5h10v10H20zm45-10h10v10H65zm10 0h10v10H75zm-10 10h10v10H65zm10 0h15v10H75zm-15 10h10v10H60zm20 0h10v10H80zm-15-20h5v5h-5z' fill='%23111111'/></svg>",
  adminDanaNumber: '081234567890',
  adminGopayNumber: '081234567890',
  directPlans: [
    { id: 'buy_30_days', label: 'Premium 30 Hari', days: 30, price: 'Rp 15.000', originalPrice: 'Rp 30.000', discount: '50% OFF', desc: 'Akses tanpa iklan, dedicated server premium 10x lebih cepat selama 30 hari.' },
    { id: 'buy_90_days', label: 'Premium 90 Hari', days: 90, price: 'Rp 35.000', originalPrice: 'Rp 90.000', discount: '61% OFF', desc: 'Pilihan Populer! Nikmati server super cepat & bebas iklan selama 90 hari.', popular: true },
    { id: 'buy_lifetime', label: 'Premium Selamanya', days: -1, price: 'Rp 75.000', originalPrice: 'Rp 250.000', discount: '70% OFF', desc: 'Akses tanpa batas, server high-speed 10x dan bebas iklan selamanya (Permanen).' }
  ],
  rateLimitEnabled: true,
  rateLimitMaxRequests: 5,
  rateLimitWindowMinutes: 1,
  botSpamProtectionEnabled: true,
  autoBlockSuspiciousIps: true
};

export function getSettings(): SiteSettings {
  try {
    const saved = localStorage.getItem('savetik_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { 
        ...DEFAULT_SETTINGS, 
        ...parsed,
        premiumPlans: parsed.premiumPlans || DEFAULT_SETTINGS.premiumPlans,
        directPlans: parsed.directPlans || DEFAULT_SETTINGS.directPlans,
        rateLimitEnabled: parsed.rateLimitEnabled !== undefined ? parsed.rateLimitEnabled : DEFAULT_SETTINGS.rateLimitEnabled,
        rateLimitMaxRequests: parsed.rateLimitMaxRequests !== undefined ? parsed.rateLimitMaxRequests : DEFAULT_SETTINGS.rateLimitMaxRequests,
        rateLimitWindowMinutes: parsed.rateLimitWindowMinutes !== undefined ? parsed.rateLimitWindowMinutes : DEFAULT_SETTINGS.rateLimitWindowMinutes,
        botSpamProtectionEnabled: parsed.botSpamProtectionEnabled !== undefined ? parsed.botSpamProtectionEnabled : DEFAULT_SETTINGS.botSpamProtectionEnabled,
        autoBlockSuspiciousIps: parsed.autoBlockSuspiciousIps !== undefined ? parsed.autoBlockSuspiciousIps : DEFAULT_SETTINGS.autoBlockSuspiciousIps
      };
    }
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem('savetik_settings', JSON.stringify(settings));
}
