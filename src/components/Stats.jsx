import { getProgress } from '../lib/utils.js';

export default function Stats({ items, errors }) {
  const { done, total, percent } = getProgress(items);
  const weakCount = items.filter((item) => item.weak).length + errors.filter((error) => !error.resolved).length;
  const interviewCount = items.filter((item) => item.interview).length;
  const stats = [
    ['Общий прогресс', `${percent}%`, `${done} из ${total} тем`, percent],
    ['Тем завершено', `${done} / ${total}`, 'по всем разделам', null],
    ['Нужно повторить', weakCount, 'слабые темы и ошибки', null],
    ['Перед интервью', interviewCount, 'отмечено для повтора', null],
  ];
  return (
    <section className="stats" aria-label="Сводка прогресса">
      {stats.map(([label, value, sub, progress]) => (
        <div className="stat" key={label}>
          <div className="stat-label">{label}</div><div className="stat-value">{value}</div>
          {progress !== null ? <div className="progress-wrap"><div className="progress-fill" style={{ width: `${progress}%` }} /></div> : <div className="stat-sub">{sub}</div>}
        </div>
      ))}
    </section>
  );
}
