const fs = require('fs');
const files = ['src/App.tsx', 'src/components/Panels.tsx', 'src/components/UserPanels.tsx', 'src/components/VideoResult.tsx'];

// Simple dictionary
const dict = {
  'Tampilan': 'Appearance',
  'Mode Gelap': 'Dark Mode',
  'Aplikasi': 'Application',
  'Riwayat Download': 'Download History',
  'Beri Kami Rating': 'Rate Us',
  'Masukan & Lapor Bug': 'Feedback & Report Bug',
  'Status Update': 'Update Status',
  'Keamanan & Sistem': 'Security & System',
  'Pengaturan Akun (Admin)': 'Account Settings (Admin)',
  'Tentang': 'About',
  'Tentang Aplikasi': 'About App',
  'Informasi Pengembang': 'Developer Info',
  'Tempel link': 'Paste link',
  'Unduh': 'Download',
  'Sedang Memproses...': 'Processing...',
  'Riwayat kosong': 'History is empty',
  'Kualitas': 'Quality',
  'Simpan Pengaturan': 'Save Settings',
  'Pengaturan': 'Settings',
  'Keluar': 'Logout',
  'Masuk': 'Login',
  'Email': 'Email',
  'Password': 'Password',
  'Tutorial': 'Tutorial',
  'Selanjutnya': 'Next',
  'Selesai': 'Finish',
  'Mulai': 'Start',
  'Bahasa': 'Language'
};

let content = `import { useState, useEffect } from 'react';

const dict = ${JSON.stringify(dict, null, 2)};

export function useTranslation() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  
  useEffect(() => {
    localStorage.setItem('lang', lang);
    const handleLangChange = (e) => {
      if (e.key === 'lang') setLang(e.newValue);
    };
    window.addEventListener('storage', handleLangChange);
    return () => window.removeEventListener('storage', handleLangChange);
  }, [lang]);

  const t = (key) => {
    if (lang === 'id') return key;
    return dict[key] || key;
  };

  return { lang, setLang, t };
}
`;

fs.writeFileSync('src/lib/i18n.ts', content);
