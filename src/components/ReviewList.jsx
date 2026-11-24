export default function ReviewList({ errors, onResolve, onDelete }) {
  if (!errors.length) return <div className="empty">Ошибок пока нет. Пройди тренировочный вопрос и нажми «Записать ошибку».</div>;
  return errors.slice().reverse().map((error) => (
    <div className="list-row" key={error.id}>
      <div><strong>{error.question}</strong><small>{error.section} · {new Date(error.date).toLocaleDateString('ru-RU')}{error.answer ? ` · ответ: ${error.answer.slice(0, 70)}` : ''}</small></div>
      <div className="list-row-actions">{error.resolved ? <span className="badge status-done">Разобрано</span> : <button className="btn small" onClick={() => onResolve(error.id)}>Разобрал</button>}<button className="icon-btn" onClick={() => onDelete(error.id)} aria-label="Удалить запись">×</button></div>
    </div>
  ));
}
