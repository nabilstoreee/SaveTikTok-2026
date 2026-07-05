import { VideoResultData } from '../types';

const HISTORY_KEY = 'savetik_history';

export function getHistory(): VideoResultData[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addHistory(item: VideoResultData) {
  const hist = getHistory();
  const itemWithDate = { ...item, date: item.date || new Date().toLocaleString('id-ID') };
  const newHist = [itemWithDate, ...hist.filter(i => i.id !== item.id)].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHist));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function removeHistoryItem(id: string) {
  const hist = getHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(hist.filter(i => i.id !== id)));
}
