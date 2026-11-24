const navigation = [
  ['overview', '◫', 'Обзор'],
  ['practice', '▷', 'Тренировка'],
  ['javascript', 'JS', 'JavaScript'],
  ['react', '◉', 'React'],
  ['tasks', '⌘', 'Практика'],
  ['interviews', '▤', 'Собеседования'],
  ['weak', '↻', 'Слабые темы'],
  ['errors', '✳', 'Ошибки'],
];

export default function Sidebar({ view, onChange, items, errors }) {
  const countFor = (key) => {
    if (key === 'weak') return items.filter((item) => item.weak).length;
    if (key === 'errors') return errors.filter((error) => !error.resolved).length;
    if (['javascript', 'react', 'tasks', 'interviews'].includes(key)) return items.filter((item) => item.section === key).length;
    return '';
  };

  return (
    <aside className="sidebar">
      <nav className="side-card" aria-label="Разделы трекера">
        <div className="nav-label">Мой план</div>
        {navigation.map(([key, icon, label]) => (
          <button className={`nav-btn ${view === key ? 'active' : ''}`} key={key} onClick={() => onChange(key)}>
            <span className="nav-icon" aria-hidden="true">{icon}</span>{label}
            {countFor(key) !== '' && <span className="nav-count">{countFor(key)}</span>}
          </button>
        ))}
        <div className="side-note"><b>Подсказка</b><br />После занятия объясни тему так, будто рассказываешь коллеге.</div>
      </nav>
    </aside>
  );
}
