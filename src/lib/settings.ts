export interface FAQItem {
  id: string;
  question: string;
  answer: string;
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
  faqs: FAQItem[];
  apiProviders: {
    tiktok: string;
    youtube: string;
  };
  adminPassword?: string;
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
  faqs: [
    { id: '1', question: 'Apakah layanan ini gratis?', answer: 'Ya, layanan 100% gratis tanpa batasan.' },
    { id: '2', question: 'Kenapa video gagal didownload?', answer: 'Pastikan URL valid dan video tidak di-private.' }
  ],
  apiProviders: {
    tiktok: 'siputzx',
    youtube: 'siputzx'
  },
  adminPassword: 'admin'
};

export function getSettings(): SiteSettings {
  try {
    const saved = localStorage.getItem('savetik_settings');
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem('savetik_settings', JSON.stringify(settings));
}
