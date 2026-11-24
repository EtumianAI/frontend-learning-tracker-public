export const statusLabels = {
  planned: 'Запланировано',
  progress: 'В работе',
  done: 'Завершено',
};

export function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function safeHttpUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

export function getProgress(items) {
  const done = items.filter((item) => item.status === 'done').length;
  return { done, total: items.length, percent: items.length ? Math.round((done / items.length) * 100) : 0 };
}
