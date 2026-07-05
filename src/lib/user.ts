export interface UserState {
  isLoggedIn: boolean;
  username: string;
  email?: string;
  hasSeenTutorial?: boolean;
  avatar: string;
  points: number;
  premiumUntil: number | null; // timestamp
}

export const loadUser = (): UserState => {
  try {
    const saved = localStorage.getItem('user_state');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return { isLoggedIn: false, username: '', avatar: '', points: 0, premiumUntil: null };
};

export const saveUser = (state: UserState) => {
  localStorage.setItem('user_state', JSON.stringify(state));
  if (state.isLoggedIn && state.email) {
    try {
      const usersRaw = localStorage.getItem('registered_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const idx = users.findIndex((u: any) => u.email.toLowerCase() === state.email!.toLowerCase());
      if (idx !== -1) {
        users[idx].points = state.points;
        users[idx].premiumUntil = state.premiumUntil;
        users[idx].hasSeenTutorial = state.hasSeenTutorial;
        localStorage.setItem('registered_users', JSON.stringify(users));
      }
    } catch (e) {}
  }
};

export interface ActivityLog {
  email: string;
  username: string;
  points: number;
  loginTime: string;
}

export const logUserLogin = (email: string, username: string, points: number) => {
  try {
    const logsRaw = localStorage.getItem('savetik_activity_logs');
    const logs: ActivityLog[] = logsRaw ? JSON.parse(logsRaw) : [];
    
    const newLog: ActivityLog = {
      email,
      username,
      points,
      loginTime: new Date().toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    };
    
    // Add to start of list so newest logs are shown first
    logs.unshift(newLog);
    
    // Maintain maximum of 100 entries
    if (logs.length > 100) {
      logs.pop();
    }
    
    localStorage.setItem('savetik_activity_logs', JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to save activity log:', e);
  }
};

