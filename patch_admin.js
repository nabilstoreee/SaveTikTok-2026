const fs = require('fs');

// 1. Update checkBanStatus in user.ts
let userCode = fs.readFileSync('src/lib/user.ts', 'utf-8');

const banCheckTarget = `export const isEmailBanned = (email?: string): boolean => {`;
const banCheckReplacement = `export const checkBanStatus = (user: any): string | null => {
  if (!user) return null;
  if (isEmailBanned(user.email) || isIpBanned(user.ip)) return 'Akun Anda diblokir secara permanen oleh sistem keamanan kami karena pelanggaran berat.';
  if (user.banned === true) return 'Akun Anda diblokir secara permanen oleh Administrator.';
  if (user.bannedUntil && user.bannedUntil > Date.now()) {
    const d = new Date(user.bannedUntil);
    return \`Akun Anda diblokir sementara hingga \${d.toLocaleString('id-ID')}.\`;
  }
  return null;
};

export const isEmailBanned = (email?: string): boolean => {`;
userCode = userCode.replace(banCheckTarget, banCheckReplacement);

// 2. Update loadUser in user.ts to use checkBanStatus
const loadUserTarget = `        // Blacklist/ban enforcement
        if (isEmailBanned(parsed.email) || isIpBanned(parsed.ip) || parsed.banned) {
          parsed.isLoggedIn = false;
          parsed.banned = true;
          localStorage.setItem('user_state', JSON.stringify(parsed));
        }`;
const loadUserReplacement = `        // Blacklist/ban enforcement
        const users = getRegisteredUsers();
        const found = users.find((u: any) => u.email.toLowerCase() === parsed.email.toLowerCase());
        const banReason = checkBanStatus(found || parsed);
        if (banReason) {
          parsed.isLoggedIn = false;
          parsed.banned = true;
          localStorage.setItem('user_state', JSON.stringify(parsed));
        }`;
userCode = userCode.replace(loadUserTarget, loadUserReplacement);

// 3. Update saveUser in user.ts to sync bannedUntil
const saveUserTarget = `        stateCopy.banned = users[idx].banned;`;
const saveUserReplacement = `        stateCopy.banned = users[idx].banned;
        if (users[idx].bannedUntil) stateCopy.bannedUntil = users[idx].bannedUntil;`;
userCode = userCode.replace(saveUserTarget, saveUserReplacement);

fs.writeFileSync('src/lib/user.ts', userCode);
