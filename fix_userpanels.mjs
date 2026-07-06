import fs from 'fs';
let code = fs.readFileSync('src/components/UserPanels.tsx', 'utf-8');

// Fix 1: duplicate declarations in AuthModal
const dupTarget = `    const users = getRegisteredUsers();
    const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser && foundUser.banned) {
      setError('Akun Anda telah ditangguhkan (banned) oleh Administrator.');
      return;
    }`;
code = code.replace(dupTarget, ''); // Try replacing with exact spacing

// If not exact spacing, try regex
code = code.replace(/const users = getRegisteredUsers\(\);\s*const foundUser = users\.find\(\(u: any\) => u\.email\.toLowerCase\(\) === email\.toLowerCase\(\)\);\s*if \(foundUser && foundUser\.banned\) \{\s*setError\('Akun Anda telah ditangguhkan \(banned\) oleh Administrator\.'\);\s*return;\s*\}/g, '');
code = code.replace(/const users = getRegisteredUsers\(\);\s*const foundUser = users\.find\(\(u: any\) => u\.email\.toLowerCase\(\) === email\.toLowerCase\(\)\);/g, '');
// Wait, we need the FIRST declaration to stay!
