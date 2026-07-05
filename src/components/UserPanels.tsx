import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { t } from '../lib/i18n';
import { X, LogIn, User, Zap, Gift, Shield, CheckCircle2, Sparkles, Eye, EyeOff } from 'lucide-react';
import { UserState, logUserLogin } from '../lib/user';
import { getSettings } from '../lib/settings';

function Modal({ isOpen, onClose, title, children }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-white dark:bg-[#121212] rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800/50">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AuthModal({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: UserState) => void }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('saved_credentials');
      if (saved) {
        try {
          const { email: savedEmail, password: savedPassword } = JSON.parse(saved);
          if (savedEmail) setEmail(savedEmail);
          if (savedPassword) setPassword(savedPassword);
          setRememberMe(true);
        } catch (e) {}
      }
    }
  }, [isOpen]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isRegister && !name) return;

    if (password.length !== 6) {
      setError('Password harus tepat 6 karakter/angka!');
      return;
    }

    if (isRegister) {
      const usersRaw = localStorage.getItem('registered_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const exists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError('Email sudah terdaftar! Silakan gunakan email lain atau langsung masuk.');
        return;
      }
      const settings = getSettings();
      const initialPoints = settings.registerPointsReward !== undefined ? settings.registerPointsReward : 50;
      users.push({ name, email, password, points: initialPoints });
      localStorage.setItem('registered_users', JSON.stringify(users));

      setSuccess('Akun berhasil dibuat! Silakan masuk menggunakan email dan password Anda.');
      setError('');
      setIsRegister(false);
      setName('');
      setPassword('');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('saved_credentials', JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem('saved_credentials');
    }
    
    // Cari user di simulated database
    const usersRaw = localStorage.getItem('registered_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser && foundUser.password !== password) {
      setError('Password salah! Silakan masukkan password yang tepat.');
      return;
    }

    const settings = getSettings();
    const initialPoints = settings.registerPointsReward !== undefined ? settings.registerPointsReward : 50;

    const username = foundUser ? foundUser.name : email.split('@')[0];
    const userPoints = foundUser && foundUser.points !== undefined ? foundUser.points : initialPoints;
    const premiumUntil = foundUser && foundUser.premiumUntil !== undefined ? foundUser.premiumUntil : null;
    const hasSeenTutorial = foundUser && foundUser.hasSeenTutorial !== undefined ? foundUser.hasSeenTutorial : false;

    const mockUser: UserState = {
      isLoggedIn: true,
      username: username || `User${Math.floor(Math.random() * 1000)}`,
      email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      points: userPoints,
      premiumUntil,
      hasSeenTutorial
    };
    logUserLogin(email, mockUser.username, mockUser.points);
    onLogin(mockUser);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isRegister ? "Daftar Akun Baru" : "Masuk ke Akun"}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
          {isRegister ? "Buat Akun Baru" : "Simpan Tanpa Batas"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isRegister 
            ? "Daftar sekarang untuk mulai mengunduh video dan mengumpulkan poin gratis."
            : "Masuk untuk mendapatkan poin setiap kali mengunduh dan tukarkan dengan fitur Premium."}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-semibold p-3.5 rounded-xl text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-semibold p-3.5 rounded-xl text-center">
            {success}
          </div>
        )}

        {isRegister && (
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
            placeholder="Masukkan email Anda"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Password (6 Angka/Karakter)</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Masukkan password Anda"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Password harus tepat bernilai 6 karakter</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Simpan Info Login (Ingat Saya)
            </span>
          </label>
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md shadow-indigo-500/20 mt-2 flex items-center justify-center gap-2">
          {isRegister ? "Daftar Sekarang" : "Masuk"} <Zap className="w-4 h-4" />
        </button>

        <div className="text-center mt-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}
            <button 
              type="button" 
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setSuccess('');
              }} 
              className="ml-2 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isRegister ? "Masuk" : "Daftar disini"}
            </button>
          </p>
        </div>
      </form>
    </Modal>
  );
}

export function RewardsPanel({ isOpen, onClose, user, onRedeem }: { isOpen: boolean, onClose: () => void, user: UserState, onRedeem: (days: number, cost: number) => void }) {
  const settings = getSettings();
  const plans = settings.premiumPlans || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Toko Poin & Premium">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Gift className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <p className="text-indigo-100 font-medium text-sm mb-1">Poin Anda Saat Ini</p>
          <div className="flex items-end gap-2 mb-4">
            <motion.span 
              key={user.points}
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.25, 0.95, 1.05, 1],
                color: ["#ffffff", "#34d399", "#ffffff"],
                x: [0, -3, 3, -1.5, 1.5, 0]
              }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-black inline-block origin-left"
            >
              {user.points}
            </motion.span>
            <span className="text-lg font-medium pb-1">pts</span>
          </div>
          {user.premiumUntil && user.premiumUntil > Date.now() ? (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 text-emerald-300" />
              Premium aktif s.d {new Date(user.premiumUntil).toLocaleDateString()}
            </div>
          ) : (
            <p className="text-sm text-indigo-100">Kumpulkan poin dengan mengunduh video untuk ditukarkan dengan akun Premium.</p>
          )}
        </div>
      </div>

      <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Tukarkan Poin</h3>
      <div className="space-y-3">
        {plans.map((plan, i) => {
          const canAfford = user.points >= plan.cost;
          const displayLabel = plan.label.toLowerCase().includes('premium') ? plan.label : `${plan.label} Premium`;
          return (
            <div key={plan.id || i} className={`p-4 rounded-2xl border ${canAfford ? 'border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'} flex items-center justify-between`}>
              <div className="min-w-0 pr-3">
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{displayLabel}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 break-words">{plan.desc}</div>
              </div>
              <button 
                disabled={!canAfford}
                onClick={() => onRedeem(plan.days, plan.cost)}
                className={`px-4 py-2 rounded-xl text-sm font-bold flex-shrink-0 flex items-center gap-2 transition-all ${canAfford ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}
              >
                {plan.cost} pts
              </button>
            </div>
          )
        })}
      </div>
    </Modal>
  );
}

export function UserProfilePanel({ isOpen, onClose, user, onLogout, onOpenRewards }: { isOpen: boolean, onClose: () => void, user: UserState, onLogout: () => void, onOpenRewards: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profil Akun">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full border-4 border-indigo-100 dark:border-indigo-900 overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
          ) : (
            <User className="w-full h-full p-4 text-slate-400" />
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user.username}</h3>
        {user.premiumUntil && user.premiumUntil > Date.now() ? (
          <div className="mt-2 bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Member
          </div>
        ) : (
          <div className="mt-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-3 py-1 rounded-full">
            Pengguna Gratis
          </div>
        )}
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Poin Terkumpul</div>
            <motion.div 
              key={user.points}
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.25, 0.95, 1.05, 1],
                color: ["#4f46e5", "#10b981", "#4f46e5"],
                x: [0, -3, 3, -1.5, 1.5, 0]
              }}
              transition={{ duration: 0.6 }}
              className="text-xl font-black text-indigo-600 dark:text-indigo-400 origin-left"
            >
              {user.points} pts
            </motion.div>
          </div>
        </div>
        <button onClick={() => { onClose(); onOpenRewards(); }} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md shadow-indigo-500/20">
          Tukar
        </button>
      </div>

      <div className="space-y-2 mt-6">
        <button onClick={() => { onClose(); onLogout(); }} className="w-full py-3.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
          Keluar
        </button>
      </div>
    </Modal>
  );
}

export function LoginScreen({ onLogin }: { onLogin: (user: UserState) => void }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('saved_credentials');
    if (saved) {
      try {
        const { email: savedEmail, password: savedPassword } = JSON.parse(saved);
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
        setRememberMe(true);
      } catch (e) {}
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isRegister && !name) return;

    if (password.length !== 6) {
      setError('Password harus tepat 6 karakter/angka!');
      return;
    }

    if (isRegister) {
      const usersRaw = localStorage.getItem('registered_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const exists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError('Email sudah terdaftar! Silakan gunakan email lain atau langsung masuk.');
        return;
      }
      const settings = getSettings();
      const initialPoints = settings.registerPointsReward !== undefined ? settings.registerPointsReward : 50;
      users.push({ name, email, password, points: initialPoints });
      localStorage.setItem('registered_users', JSON.stringify(users));

      setSuccess('Akun berhasil dibuat! Silakan masuk menggunakan email dan password Anda.');
      setError('');
      setIsRegister(false);
      setName('');
      setPassword('');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('saved_credentials', JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem('saved_credentials');
    }
    
    // Cari user di simulated database
    const usersRaw = localStorage.getItem('registered_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser && foundUser.password !== password) {
      setError('Password salah! Silakan masukkan password yang tepat.');
      return;
    }

    const settings = getSettings();
    const initialPoints = settings.registerPointsReward !== undefined ? settings.registerPointsReward : 50;

    const username = foundUser ? foundUser.name : email.split('@')[0];
    const userPoints = foundUser && foundUser.points !== undefined ? foundUser.points : initialPoints;
    const premiumUntil = foundUser && foundUser.premiumUntil !== undefined ? foundUser.premiumUntil : null;
    const hasSeenTutorial = foundUser && foundUser.hasSeenTutorial !== undefined ? foundUser.hasSeenTutorial : false;

    const mockUser: UserState = {
      isLoggedIn: true,
      username: username || `User${Math.floor(Math.random() * 1000)}`,
      email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      points: userPoints,
      premiumUntil,
      hasSeenTutorial
    };
    logUserLogin(email, mockUser.username, mockUser.points);
    onLogin(mockUser);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
          <LogIn className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {isRegister ? 'Buat Akun Baru' : 'Selamat Datang'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isRegister 
            ? 'Daftar sekarang untuk mulai mengunduh video dan mengumpulkan poin gratis.' 
            : 'Silakan masuk ke akun Anda untuk melanjutkan.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-semibold p-3.5 rounded-xl text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-semibold p-3.5 rounded-xl text-center">
            {success}
          </div>
        )}

        {isRegister && (
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">Nama Lengkap</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
            placeholder="Masukkan email Anda"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">Password (6 Angka/Karakter)</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-5 pr-12 py-4 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Masukkan password Anda"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Password harus tepat bernilai 6 karakter</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Simpan Info Login (Ingat Saya)
            </span>
          </label>
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-indigo-500/25 mt-4 flex items-center justify-center gap-2">
          {isRegister ? 'Daftar Sekarang' : 'Masuk'} <Zap className="w-4 h-4" />
        </button>
        
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
            <button 
              type="button" 
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setSuccess('');
              }} 
              className="ml-2 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isRegister ? 'Masuk' : 'Daftar disini'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}


export function TutorialPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-white/10 rounded-3xl p-6 z-[101] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('Tutorial')}</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              {step === 1 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Copy Link</h3>
                  <p className="text-slate-600 dark:text-slate-400">Copy the video link from TikTok or YouTube app.</p>
                </div>
              )}
              {step === 2 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Paste Link</h3>
                  <p className="text-slate-600 dark:text-slate-400">Paste the copied link into the input field in this app.</p>
                </div>
              )}
              {step === 3 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t('Unduh')}</h3>
                  <p className="text-slate-600 dark:text-slate-400">Click download and choose your preferred video quality.</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
                  {t('Selanjutnya')}
                </button>
              ) : (
                <button onClick={onClose} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors">
                  {t('Selesai')}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
