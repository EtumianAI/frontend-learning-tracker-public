import { initialTopics } from '../data/topics.js';
import { initialQuestions } from '../data/questions.js';

const STORAGE_KEY = 'frontend-learning-tracker-v1';

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.items)) {
      return {
        items: saved.items,
        errors: saved.errors ?? [],
        answer: saved.answer ?? '',
        seen: saved.seen ?? [],
        questions: saved.questions ?? [],
      };
    }
  } catch {
    // Ignore corrupted browser data and start with the initial plan.
  }
  return { items: initialTopics, errors: [], answer: '', seen: [], questions: [] };
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportState(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'frontend-tracker-backup.json';
  link.click();
  URL.revokeObjectURL(url);
}

export { initialQuestions };
