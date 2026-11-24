import { safeHttpUrl, statusLabels } from '../lib/utils.js';

export default function TopicCard({ item, onChange, onEdit, onDelete }) {
  const update = (patch) => onChange(item.id, patch);
  return (
    <article className="topic">
      <div className="topic-top">
        <div><h3>{item.name}</h3><div className="badges">
          <span className="badge level">{item.level}</span><span className={`badge status-${item.status}`}>{statusLabels[item.status]}</span>
          {item.weak && <span className="badge repeat">Повторить</span>}{item.interview && <span className="badge">К собеседованию</span>}
        </div></div>
        <div className="topic-tools">
          <button className="icon-btn" onClick={() => onEdit(item)} aria-label={`Изменить: ${item.name}`}>✎</button>
          <button className="icon-btn" onClick={() => onDelete(item.id)} aria-label={`Удалить: ${item.name}`}>×</button>
        </div>
      </div>
      <div className="topic-fields">
        <label className="field-label">ЗАМЕТКИ<textarea className="mini-textarea" value={item.notes} onChange={(event) => update({ notes: event.target.value })} placeholder="Добавь заметку…" /></label>
        <label className="field-label">ОБЪЯСНЕНИЕ СВОИМИ СЛОВАМИ<textarea className="mini-textarea" value={item.explain} onChange={(event) => update({ explain: event.target.value })} placeholder="Как ты объяснишь тему коллеге?" /></label>
      </div>
      <div className="topic-bottom">
        <div className="topic-links">{item.links?.length ? item.links.map((raw, index) => {
          const href = safeHttpUrl(raw);
          return href ? <a href={href} target="_blank" rel="noreferrer" key={`${href}-${index}`}>Материал {index + 1}</a> : null;
        }) : <span>Ссылок пока нет</span>}</div>
        <div className="topic-tools topic-controls">
          <label className="focus-label"><input type="checkbox" checked={Boolean(item.interview)} onChange={(event) => update({ interview: event.target.checked })} /> интервью</label>
          <select className="status-select" value={item.status} onChange={(event) => update({ status: event.target.value })} aria-label={`Статус: ${item.name}`}>
            <option value="planned">Запланировано</option><option value="progress">В работе</option><option value="done">Завершено</option>
          </select>
          <button className={`weak-toggle ${item.weak ? 'selected' : ''}`} onClick={() => update({ weak: !item.weak })}>{item.weak ? 'Повторить' : 'Слабая тема'}</button>
        </div>
      </div>
    </article>
  );
}
