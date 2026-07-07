const fs = require('fs');
let code = fs.readFileSync('src/components/Panels.tsx', 'utf8');

code = code.replace(/>Tampilan</g, ">{t('Tampilan')}<");
code = code.replace(/>Mode Gelap</g, ">{t('Mode Gelap')}<");
code = code.replace(/>Aplikasi</g, ">{t('Aplikasi')}<");
code = code.replace(/>Riwayat Download</g, ">{t('Riwayat Download')}<");
code = code.replace(/>Beri Kami Rating</g, ">{t('Beri Kami Rating')}<");
code = code.replace(/>Masukan & Lapor Bug</g, ">{t('Masukan & Lapor Bug')}<");
code = code.replace(/>Status Update</g, ">{t('Status Update')}<");
code = code.replace(/>Keamanan & Sistem</g, ">{t('Keamanan & Sistem')}<");
code = code.replace(/>Pengaturan Akun \(Admin\)</g, ">{t('Pengaturan Akun (Admin)')}<");
code = code.replace(/>Tentang</g, ">{t('Tentang')}<");
code = code.replace(/>Tentang Aplikasi</g, ">{t('Tentang Aplikasi')}<");
code = code.replace(/>Informasi Pengembang</g, ">{t('Informasi Pengembang')}<");
code = code.replace(/>Pengaturan</g, ">{t('Pengaturan')}<");

fs.writeFileSync('src/components/Panels.tsx', code);
