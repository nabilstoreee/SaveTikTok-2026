const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/>Unduh</g, ">{t('Unduh')}<");
code = code.replace(/>Sedang Memproses...</g, ">{t('Sedang Memproses...')}<");
code = code.replace(/>Riwayat kosong</g, ">{t('Riwayat kosong')}<");

fs.writeFileSync('src/App.tsx', code);
