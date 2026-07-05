export const dict: Record<string, string> = {
  "Tampilan": "Appearance",
  "Mode Gelap": "Dark Mode",
  "Aplikasi": "Application",
  "Riwayat Download": "Download History",
  "Beri Kami Rating": "Rate Us",
  "Masukan & Lapor Bug": "Feedback & Report Bug",
  "Status Update": "Update Status",
  "Keamanan & Sistem": "Security & System",
  "Pengaturan Akun (Admin)": "Account Settings (Admin)",
  "Tentang": "About",
  "Tentang Aplikasi": "About App",
  "Informasi Pengembang": "Developer Info",
  "Tempel link tiktok di sini...": "Paste tiktok link here...",
  "Tempel link youtube di sini...": "Paste youtube link here...",
  "Tempel link": "Paste link",
  "Unduh": "Download",
  "Sedang Memproses...": "Processing...",
  "Riwayat kosong": "History is empty",
  "Kualitas": "Quality",
  "Simpan Pengaturan": "Save Settings",
  "Pengaturan": "Settings",
  "Keluar": "Logout",
  "Masuk": "Login",
  "Email": "Email",
  "Password": "Password",
  "Tutorial": "Tutorial",
  "Selanjutnya": "Next",
  "Selesai": "Finish",
  "Mulai": "Start",
  "Bahasa": "Language",
  "Indonesia": "Indonesian",
  "Inggris": "English",
  "Akses Admin Panel": "Access Admin Panel",
  "Detik": "Seconds",
  "Menit": "Minutes",
  "Jam": "Hours"
};

export function getLang(): string {
  if (typeof window === 'undefined') return 'id';
  return localStorage.getItem('lang') || 'id';
}

export function setLang(lang: string) {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

export function t(key: string): string {
  const lang = getLang();
  if (lang === 'id') return key;
  return dict[key] || key;
}
