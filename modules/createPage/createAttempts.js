const STORAGE_KEY = 'sling-create-attempts';
const MAX_ATTEMPTS = 8;

export function loadCreateAttempts() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch (err) {
    return [];
  }
}

export function saveCreateAttempt(attempt) {
  if (typeof window === 'undefined' || !attempt) return loadCreateAttempts();
  const next = [
    attempt,
    ...loadCreateAttempts().filter((item) => item.id !== attempt.id),
  ].slice(0, MAX_ATTEMPTS);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
